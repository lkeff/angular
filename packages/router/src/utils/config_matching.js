"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchWithChecks = matchWithChecks;
exports.match = match;
exports.split = split;
exports.emptyPathMatch = emptyPathMatch;
exports.noLeftoversInUrl = noLeftoversInUrl;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const check_guards_1 = require("../operators/check_guards");
const shared_1 = require("../shared");
const url_tree_1 = require("../url_tree");
const collection_1 = require("./collection");
const config_1 = require("./config");
const noMatch = {
    matched: false,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
};
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer) {
    const result = match(segmentGroup, route, segments);
    if (!result.matched) {
        return (0, rxjs_1.of)(result);
    }
    // Only create the Route's `EnvironmentInjector` if it matches the attempted
    // navigation
    injector = (0, config_1.getOrCreateRouteInjectorIfNeeded)(route, injector);
    return (0, check_guards_1.runCanMatchGuards)(injector, route, segments, urlSerializer).pipe((0, operators_1.map)((v) => (v === true ? result : Object.assign({}, noMatch))));
}
function match(segmentGroup, route, segments) {
    var _a, _b;
    if (route.path === '**') {
        return createWildcardMatchResult(segments);
    }
    if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
            return Object.assign({}, noMatch);
        }
        return {
            matched: true,
            consumedSegments: [],
            remainingSegments: segments,
            parameters: {},
            positionalParamSegments: {},
        };
    }
    const matcher = route.matcher || shared_1.defaultUrlMatcher;
    const res = matcher(segments, segmentGroup, route);
    if (!res)
        return Object.assign({}, noMatch);
    const posParams = {};
    Object.entries((_a = res.posParams) !== null && _a !== void 0 ? _a : {}).forEach(([k, v]) => {
        posParams[k] = v.path;
    });
    const parameters = res.consumed.length > 0
        ? Object.assign(Object.assign({}, posParams), res.consumed[res.consumed.length - 1].parameters) : posParams;
    return {
        matched: true,
        consumedSegments: res.consumed,
        remainingSegments: segments.slice(res.consumed.length),
        // TODO(atscott): investigate combining parameters and positionalParamSegments
        parameters,
        positionalParamSegments: (_b = res.posParams) !== null && _b !== void 0 ? _b : {},
    };
}
function createWildcardMatchResult(segments) {
    return {
        matched: true,
        parameters: segments.length > 0 ? (0, collection_1.last)(segments).parameters : {},
        consumedSegments: segments,
        remainingSegments: [],
        positionalParamSegments: {},
    };
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        const s = new url_tree_1.UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(config, new url_tree_1.UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        return { segmentGroup: s, slicedSegments: [] };
    }
    if (slicedSegments.length === 0 &&
        containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        const s = new url_tree_1.UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        return { segmentGroup: s, slicedSegments };
    }
    const s = new url_tree_1.UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
    return { segmentGroup: s, slicedSegments };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
    const res = {};
    for (const r of routes) {
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[(0, config_1.getOutlet)(r)]) {
            const s = new url_tree_1.UrlSegmentGroup([], {});
            res[(0, config_1.getOutlet)(r)] = s;
        }
    }
    return Object.assign(Object.assign({}, children), res);
}
function createChildrenForEmptyPaths(routes, primarySegment) {
    const res = {};
    res[shared_1.PRIMARY_OUTLET] = primarySegment;
    for (const r of routes) {
        if (r.path === '' && (0, config_1.getOutlet)(r) !== shared_1.PRIMARY_OUTLET) {
            const s = new url_tree_1.UrlSegmentGroup([], {});
            res[(0, config_1.getOutlet)(r)] = s;
        }
    }
    return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r) && (0, config_1.getOutlet)(r) !== shared_1.PRIMARY_OUTLET);
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
    return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full') {
        return false;
    }
    return r.path === '';
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
    return segments.length === 0 && !segmentGroup.children[outlet];
}
