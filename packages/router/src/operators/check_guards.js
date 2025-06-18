"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGuards = checkGuards;
exports.runCanLoadGuards = runCanLoadGuards;
exports.runCanMatchGuards = runCanMatchGuards;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const events_1 = require("../events");
const navigation_canceling_error_1 = require("../navigation_canceling_error");
const collection_1 = require("../utils/collection");
const config_1 = require("../utils/config");
const preactivation_1 = require("../utils/preactivation");
const type_guards_1 = require("../utils/type_guards");
const prioritized_guard_value_1 = require("./prioritized_guard_value");
function checkGuards(injector, forwardEvent) {
    return (0, operators_1.mergeMap)((t) => {
        const { targetSnapshot, currentSnapshot, guards: { canActivateChecks, canDeactivateChecks }, } = t;
        if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
            return (0, rxjs_1.of)(Object.assign(Object.assign({}, t), { guardsResult: true }));
        }
        return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot, injector).pipe((0, operators_1.mergeMap)((canDeactivate) => {
            return canDeactivate && (0, type_guards_1.isBoolean)(canDeactivate)
                ? runCanActivateChecks(targetSnapshot, canActivateChecks, injector, forwardEvent)
                : (0, rxjs_1.of)(canDeactivate);
        }), (0, operators_1.map)((guardsResult) => (Object.assign(Object.assign({}, t), { guardsResult }))));
    });
}
function runCanDeactivateChecks(checks, futureRSS, currRSS, injector) {
    return (0, rxjs_1.from)(checks).pipe((0, operators_1.mergeMap)((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS, injector)), (0, operators_1.first)((result) => {
        return result !== true;
    }, true));
}
function runCanActivateChecks(futureSnapshot, checks, injector, forwardEvent) {
    return (0, rxjs_1.from)(checks).pipe((0, operators_1.concatMap)((check) => {
        return (0, rxjs_1.concat)(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path, injector), runCanActivate(futureSnapshot, check.route, injector));
    }), (0, operators_1.first)((result) => {
        return result !== true;
    }, true));
}
/**
 * This should fire off `ActivationStart` events for each route being activated at this
 * level.
 * In other words, if you're activating `a` and `b` below, `path` will contain the
 * `ActivatedRouteSnapshot`s for both and we will fire `ActivationStart` for both. Always
 * return
 * `true` so checks continue to run.
 */
function fireActivationStart(snapshot, forwardEvent) {
    if (snapshot !== null && forwardEvent) {
        forwardEvent(new events_1.ActivationStart(snapshot));
    }
    return (0, rxjs_1.of)(true);
}
/**
 * This should fire off `ChildActivationStart` events for each route being activated at this
 * level.
 * In other words, if you're activating `a` and `b` below, `path` will contain the
 * `ActivatedRouteSnapshot`s for both and we will fire `ChildActivationStart` for both. Always
 * return
 * `true` so checks continue to run.
 */
function fireChildActivationStart(snapshot, forwardEvent) {
    if (snapshot !== null && forwardEvent) {
        forwardEvent(new events_1.ChildActivationStart(snapshot));
    }
    return (0, rxjs_1.of)(true);
}
function runCanActivate(futureRSS, futureARS, injector) {
    const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
    if (!canActivate || canActivate.length === 0)
        return (0, rxjs_1.of)(true);
    const canActivateObservables = canActivate.map((canActivate) => {
        return (0, rxjs_1.defer)(() => {
            var _a;
            const closestInjector = (_a = (0, config_1.getClosestRouteInjector)(futureARS)) !== null && _a !== void 0 ? _a : injector;
            const guard = (0, preactivation_1.getTokenOrFunctionIdentity)(canActivate, closestInjector);
            const guardVal = (0, type_guards_1.isCanActivate)(guard)
                ? guard.canActivate(futureARS, futureRSS)
                : (0, core_1.runInInjectionContext)(closestInjector, () => guard(futureARS, futureRSS));
            return (0, collection_1.wrapIntoObservable)(guardVal).pipe((0, operators_1.first)());
        });
    });
    return (0, rxjs_1.of)(canActivateObservables).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)());
}
function runCanActivateChild(futureRSS, path, injector) {
    const futureARS = path[path.length - 1];
    const canActivateChildGuards = path
        .slice(0, path.length - 1)
        .reverse()
        .map((p) => (0, preactivation_1.getCanActivateChild)(p))
        .filter((_) => _ !== null);
    const canActivateChildGuardsMapped = canActivateChildGuards.map((d) => {
        return (0, rxjs_1.defer)(() => {
            const guardsMapped = d.guards.map((canActivateChild) => {
                var _a;
                const closestInjector = (_a = (0, config_1.getClosestRouteInjector)(d.node)) !== null && _a !== void 0 ? _a : injector;
                const guard = (0, preactivation_1.getTokenOrFunctionIdentity)(canActivateChild, closestInjector);
                const guardVal = (0, type_guards_1.isCanActivateChild)(guard)
                    ? guard.canActivateChild(futureARS, futureRSS)
                    : (0, core_1.runInInjectionContext)(closestInjector, () => guard(futureARS, futureRSS));
                return (0, collection_1.wrapIntoObservable)(guardVal).pipe((0, operators_1.first)());
            });
            return (0, rxjs_1.of)(guardsMapped).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)());
        });
    });
    return (0, rxjs_1.of)(canActivateChildGuardsMapped).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS, injector) {
    const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
    if (!canDeactivate || canDeactivate.length === 0)
        return (0, rxjs_1.of)(true);
    const canDeactivateObservables = canDeactivate.map((c) => {
        var _a;
        const closestInjector = (_a = (0, config_1.getClosestRouteInjector)(currARS)) !== null && _a !== void 0 ? _a : injector;
        const guard = (0, preactivation_1.getTokenOrFunctionIdentity)(c, closestInjector);
        const guardVal = (0, type_guards_1.isCanDeactivate)(guard)
            ? guard.canDeactivate(component, currARS, currRSS, futureRSS)
            : (0, core_1.runInInjectionContext)(closestInjector, () => guard(component, currARS, currRSS, futureRSS));
        return (0, collection_1.wrapIntoObservable)(guardVal).pipe((0, operators_1.first)());
    });
    return (0, rxjs_1.of)(canDeactivateObservables).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)());
}
function runCanLoadGuards(injector, route, segments, urlSerializer) {
    const canLoad = route.canLoad;
    if (canLoad === undefined || canLoad.length === 0) {
        return (0, rxjs_1.of)(true);
    }
    const canLoadObservables = canLoad.map((injectionToken) => {
        const guard = (0, preactivation_1.getTokenOrFunctionIdentity)(injectionToken, injector);
        const guardVal = (0, type_guards_1.isCanLoad)(guard)
            ? guard.canLoad(route, segments)
            : (0, core_1.runInInjectionContext)(injector, () => guard(route, segments));
        return (0, collection_1.wrapIntoObservable)(guardVal);
    });
    return (0, rxjs_1.of)(canLoadObservables).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)(), redirectIfUrlTree(urlSerializer));
}
function redirectIfUrlTree(urlSerializer) {
    return (0, rxjs_1.pipe)((0, operators_1.tap)((result) => {
        if (typeof result === 'boolean')
            return;
        throw (0, navigation_canceling_error_1.redirectingNavigationError)(urlSerializer, result);
    }), (0, operators_1.map)((result) => result === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer) {
    const canMatch = route.canMatch;
    if (!canMatch || canMatch.length === 0)
        return (0, rxjs_1.of)(true);
    const canMatchObservables = canMatch.map((injectionToken) => {
        const guard = (0, preactivation_1.getTokenOrFunctionIdentity)(injectionToken, injector);
        const guardVal = (0, type_guards_1.isCanMatch)(guard)
            ? guard.canMatch(route, segments)
            : (0, core_1.runInInjectionContext)(injector, () => guard(route, segments));
        return (0, collection_1.wrapIntoObservable)(guardVal);
    });
    return (0, rxjs_1.of)(canMatchObservables).pipe((0, prioritized_guard_value_1.prioritizedGuardValue)(), redirectIfUrlTree(urlSerializer));
}
