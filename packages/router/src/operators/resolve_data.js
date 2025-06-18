"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveData = resolveData;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const models_1 = require("../models");
const router_state_1 = require("../router_state");
const shared_1 = require("../shared");
const collection_1 = require("../utils/collection");
const config_1 = require("../utils/config");
const preactivation_1 = require("../utils/preactivation");
const type_guards_1 = require("../utils/type_guards");
const navigation_canceling_error_1 = require("../navigation_canceling_error");
const url_tree_1 = require("../url_tree");
function resolveData(paramsInheritanceStrategy, injector) {
    return (0, operators_1.mergeMap)((t) => {
        const { targetSnapshot, guards: { canActivateChecks }, } = t;
        if (!canActivateChecks.length) {
            return (0, rxjs_1.of)(t);
        }
        // Iterating a Set in javascript  happens in insertion order so it is safe to use a `Set` to
        // preserve the correct order that the resolvers should run in.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#description
        const routesWithResolversToRun = new Set(canActivateChecks.map((check) => check.route));
        const routesNeedingDataUpdates = new Set();
        for (const route of routesWithResolversToRun) {
            if (routesNeedingDataUpdates.has(route)) {
                continue;
            }
            // All children under the route with a resolver to run need to recompute inherited data.
            for (const newRoute of flattenRouteTree(route)) {
                routesNeedingDataUpdates.add(newRoute);
            }
        }
        let routesProcessed = 0;
        return (0, rxjs_1.from)(routesNeedingDataUpdates).pipe((0, operators_1.concatMap)((route) => {
            if (routesWithResolversToRun.has(route)) {
                return runResolve(route, targetSnapshot, paramsInheritanceStrategy, injector);
            }
            else {
                route.data = (0, router_state_1.getInherited)(route, route.parent, paramsInheritanceStrategy).resolve;
                return (0, rxjs_1.of)(void 0);
            }
        }), (0, operators_1.tap)(() => routesProcessed++), (0, operators_1.takeLast)(1), (0, operators_1.mergeMap)((_) => (routesProcessed === routesNeedingDataUpdates.size ? (0, rxjs_1.of)(t) : rxjs_1.EMPTY)));
    });
}
/**
 *  Returns the `ActivatedRouteSnapshot` tree as an array, using DFS to traverse the route tree.
 */
function flattenRouteTree(route) {
    const descendants = route.children.map((child) => flattenRouteTree(child)).flat();
    return [route, ...descendants];
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
    const config = futureARS.routeConfig;
    const resolve = futureARS._resolve;
    if ((config === null || config === void 0 ? void 0 : config.title) !== undefined && !(0, router_state_1.hasStaticTitle)(config)) {
        resolve[shared_1.RouteTitleKey] = config.title;
    }
    return (0, rxjs_1.defer)(() => {
        futureARS.data = (0, router_state_1.getInherited)(futureARS, futureARS.parent, paramsInheritanceStrategy).resolve;
        return resolveNode(resolve, futureARS, futureRSS, injector).pipe((0, operators_1.map)((resolvedData) => {
            futureARS._resolvedData = resolvedData;
            futureARS.data = Object.assign(Object.assign({}, futureARS.data), resolvedData);
            return null;
        }));
    });
}
function resolveNode(resolve, futureARS, futureRSS, injector) {
    const keys = (0, collection_1.getDataKeys)(resolve);
    if (keys.length === 0) {
        return (0, rxjs_1.of)({});
    }
    const data = {};
    return (0, rxjs_1.from)(keys).pipe((0, operators_1.mergeMap)((key) => getResolver(resolve[key], futureARS, futureRSS, injector).pipe((0, operators_1.first)(), (0, operators_1.tap)((value) => {
        if (value instanceof models_1.RedirectCommand) {
            throw (0, navigation_canceling_error_1.redirectingNavigationError)(new url_tree_1.DefaultUrlSerializer(), value);
        }
        data[key] = value;
    }))), (0, operators_1.takeLast)(1), (0, operators_1.map)(() => data), (0, operators_1.catchError)((e) => ((0, type_guards_1.isEmptyError)(e) ? rxjs_1.EMPTY : (0, rxjs_1.throwError)(e))));
}
function getResolver(injectionToken, futureARS, futureRSS, injector) {
    var _a;
    const closestInjector = (_a = (0, config_1.getClosestRouteInjector)(futureARS)) !== null && _a !== void 0 ? _a : injector;
    const resolver = (0, preactivation_1.getTokenOrFunctionIdentity)(injectionToken, closestInjector);
    const resolverValue = resolver.resolve
        ? resolver.resolve(futureARS, futureRSS)
        : (0, core_1.runInInjectionContext)(closestInjector, () => resolver(futureARS, futureRSS));
    return (0, collection_1.wrapIntoObservable)(resolverValue);
}
