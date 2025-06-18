"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyRedirects = exports.AbsoluteRedirect = exports.NoMatch = void 0;
exports.noMatch = noMatch;
exports.absoluteRedirect = absoluteRedirect;
exports.namedOutletsRedirect = namedOutletsRedirect;
exports.canLoadFails = canLoadFails;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const events_1 = require("./events");
const navigation_canceling_error_1 = require("./navigation_canceling_error");
const shared_1 = require("./shared");
const url_tree_1 = require("./url_tree");
const collection_1 = require("./utils/collection");
class NoMatch {
    constructor(segmentGroup) {
        this.segmentGroup = segmentGroup || null;
    }
}
exports.NoMatch = NoMatch;
class AbsoluteRedirect extends Error {
    constructor(urlTree) {
        super();
        this.urlTree = urlTree;
    }
}
exports.AbsoluteRedirect = AbsoluteRedirect;
function noMatch(segmentGroup) {
    return (0, rxjs_1.throwError)(new NoMatch(segmentGroup));
}
function absoluteRedirect(newTree) {
    return (0, rxjs_1.throwError)(new AbsoluteRedirect(newTree));
}
function namedOutletsRedirect(redirectTo) {
    return (0, rxjs_1.throwError)(new core_1.ɵRuntimeError(4000 /* RuntimeErrorCode.NAMED_OUTLET_REDIRECT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
        `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`));
}
function canLoadFails(route) {
    return (0, rxjs_1.throwError)((0, navigation_canceling_error_1.navigationCancelingError)((typeof ngDevMode === 'undefined' || ngDevMode) &&
        `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, events_1.NavigationCancellationCode.GuardRejected));
}
class ApplyRedirects {
    constructor(urlSerializer, urlTree) {
        this.urlSerializer = urlSerializer;
        this.urlTree = urlTree;
    }
    lineralizeSegments(route, urlTree) {
        let res = [];
        let c = urlTree.root;
        while (true) {
            res = res.concat(c.segments);
            if (c.numberOfChildren === 0) {
                return (0, rxjs_1.of)(res);
            }
            if (c.numberOfChildren > 1 || !c.children[shared_1.PRIMARY_OUTLET]) {
                return namedOutletsRedirect(`${route.redirectTo}`);
            }
            c = c.children[shared_1.PRIMARY_OUTLET];
        }
    }
    applyRedirectCommands(segments, redirectTo, posParams, currentSnapshot, injector) {
        return getRedirectResult(redirectTo, currentSnapshot, injector).pipe((0, operators_1.map)((redirect) => {
            if (redirect instanceof url_tree_1.UrlTree) {
                throw new AbsoluteRedirect(redirect);
            }
            const newTree = this.applyRedirectCreateUrlTree(redirect, this.urlSerializer.parse(redirect), segments, posParams);
            if (redirect[0] === '/') {
                throw new AbsoluteRedirect(newTree);
            }
            return newTree;
        }));
    }
    applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
        const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
        return new url_tree_1.UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
    }
    createQueryParams(redirectToParams, actualParams) {
        const res = {};
        Object.entries(redirectToParams).forEach(([k, v]) => {
            const copySourceValue = typeof v === 'string' && v[0] === ':';
            if (copySourceValue) {
                const sourceName = v.substring(1);
                res[k] = actualParams[sourceName];
            }
            else {
                res[k] = v;
            }
        });
        return res;
    }
    createSegmentGroup(redirectTo, group, segments, posParams) {
        const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
        let children = {};
        Object.entries(group.children).forEach(([name, child]) => {
            children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
        });
        return new url_tree_1.UrlSegmentGroup(updatedSegments, children);
    }
    createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
        return redirectToSegments.map((s) => s.path[0] === ':'
            ? this.findPosParam(redirectTo, s, posParams)
            : this.findOrReturn(s, actualSegments));
    }
    findPosParam(redirectTo, redirectToUrlSegment, posParams) {
        const pos = posParams[redirectToUrlSegment.path.substring(1)];
        if (!pos)
            throw new core_1.ɵRuntimeError(4001 /* RuntimeErrorCode.MISSING_REDIRECT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
        return pos;
    }
    findOrReturn(redirectToUrlSegment, actualSegments) {
        let idx = 0;
        for (const s of actualSegments) {
            if (s.path === redirectToUrlSegment.path) {
                actualSegments.splice(idx);
                return s;
            }
            idx++;
        }
        return redirectToUrlSegment;
    }
}
exports.ApplyRedirects = ApplyRedirects;
function getRedirectResult(redirectTo, currentSnapshot, injector) {
    if (typeof redirectTo === 'string') {
        return (0, rxjs_1.of)(redirectTo);
    }
    const redirectToFn = redirectTo;
    const { queryParams, fragment, routeConfig, url, outlet, params, data, title } = currentSnapshot;
    return (0, collection_1.wrapIntoObservable)((0, core_1.runInInjectionContext)(injector, () => redirectToFn({ params, data, queryParams, fragment, routeConfig, url, outlet, title })));
}
