"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recognizer = void 0;
exports.recognize = recognize;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const apply_redirects_1 = require("./apply_redirects");
const create_url_tree_1 = require("./create_url_tree");
const check_guards_1 = require("./operators/check_guards");
const router_state_1 = require("./router_state");
const shared_1 = require("./shared");
const config_1 = require("./utils/config");
const config_matching_1 = require("./utils/config_matching");
const tree_1 = require("./utils/tree");
const type_guards_1 = require("./utils/type_guards");
/**
 * Class used to indicate there were no additional route config matches but that all segments of
 * the URL were consumed during matching so the route was URL matched. When this happens, we still
 * try to match child configs in case there are empty path children.
 */
class NoLeftoversInUrl {
}
function recognize(injector, configLoader, rootComponentType, config, urlTree, urlSerializer, paramsInheritanceStrategy = 'emptyOnly') {
    return new Recognizer(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer).recognize();
}
const MAX_ALLOWED_REDIRECTS = 31;
class Recognizer {
    constructor(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer) {
        this.injector = injector;
        this.configLoader = configLoader;
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.paramsInheritanceStrategy = paramsInheritanceStrategy;
        this.urlSerializer = urlSerializer;
        this.absoluteRedirectCount = 0;
        this.allowRedirects = true;
        this.applyRedirects = new apply_redirects_1.ApplyRedirects(this.urlSerializer, this.urlTree);
    }
    noMatchError(e) {
        return new core_1.ɵRuntimeError(4002 /* RuntimeErrorCode.NO_MATCH */, typeof ngDevMode === 'undefined' || ngDevMode
            ? `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
            : `'${e.segmentGroup}'`);
    }
    recognize() {
        const rootSegmentGroup = (0, config_matching_1.split)(this.urlTree.root, [], [], this.config).segmentGroup;
        return this.match(rootSegmentGroup).pipe((0, operators_1.map)(({ children, rootSnapshot }) => {
            const rootNode = new tree_1.TreeNode(rootSnapshot, children);
            const routeState = new router_state_1.RouterStateSnapshot('', rootNode);
            const tree = (0, create_url_tree_1.createUrlTreeFromSnapshot)(rootSnapshot, [], this.urlTree.queryParams, this.urlTree.fragment);
            // https://github.com/angular/angular/issues/47307
            // Creating the tree stringifies the query params
            // We don't want to do this here so reassign them to the original.
            tree.queryParams = this.urlTree.queryParams;
            routeState.url = this.urlSerializer.serialize(tree);
            return { state: routeState, tree };
        }));
    }
    match(rootSegmentGroup) {
        // Use Object.freeze to prevent readers of the Router state from modifying it outside
        // of a navigation, resulting in the router being out of sync with the browser.
        const rootSnapshot = new router_state_1.ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), shared_1.PRIMARY_OUTLET, this.rootComponentType, null, {});
        return this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, shared_1.PRIMARY_OUTLET, rootSnapshot).pipe((0, operators_1.map)((children) => {
            return { children, rootSnapshot };
        }), (0, operators_1.catchError)((e) => {
            if (e instanceof apply_redirects_1.AbsoluteRedirect) {
                this.urlTree = e.urlTree;
                return this.match(e.urlTree.root);
            }
            if (e instanceof apply_redirects_1.NoMatch) {
                throw this.noMatchError(e);
            }
            throw e;
        }));
    }
    processSegmentGroup(injector, config, segmentGroup, outlet, parentRoute) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return this.processChildren(injector, config, segmentGroup, parentRoute);
        }
        return this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet, true, parentRoute).pipe((0, operators_1.map)((child) => (child instanceof tree_1.TreeNode ? [child] : [])));
    }
    /**
     * Matches every child outlet in the `segmentGroup` to a `Route` in the config. Returns `null` if
     * we cannot find a match for _any_ of the children.
     *
     * @param config - The `Routes` to match against
     * @param segmentGroup - The `UrlSegmentGroup` whose children need to be matched against the
     *     config.
     */
    processChildren(injector, config, segmentGroup, parentRoute) {
        // Expand outlets one at a time, starting with the primary outlet. We need to do it this way
        // because an absolute redirect from the primary outlet takes precedence.
        const childOutlets = [];
        for (const child of Object.keys(segmentGroup.children)) {
            if (child === 'primary') {
                childOutlets.unshift(child);
            }
            else {
                childOutlets.push(child);
            }
        }
        return (0, rxjs_1.from)(childOutlets).pipe((0, operators_1.concatMap)((childOutlet) => {
            const child = segmentGroup.children[childOutlet];
            // Sort the config so that routes with outlets that match the one being activated
            // appear first, followed by routes for other outlets, which might match if they have
            // an empty path.
            const sortedConfig = (0, config_1.sortByMatchingOutlets)(config, childOutlet);
            return this.processSegmentGroup(injector, sortedConfig, child, childOutlet, parentRoute);
        }), (0, operators_1.scan)((children, outletChildren) => {
            children.push(...outletChildren);
            return children;
        }), (0, operators_1.defaultIfEmpty)(null), (0, operators_1.last)(), (0, operators_1.mergeMap)((children) => {
            if (children === null)
                return (0, apply_redirects_1.noMatch)(segmentGroup);
            // Because we may have matched two outlets to the same empty path segment, we can have
            // multiple activated results for the same outlet. We should merge the children of
            // these results so the final return value is only one `TreeNode` per outlet.
            const mergedChildren = mergeEmptyPathMatches(children);
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // This should really never happen - we are only taking the first match for each
                // outlet and merge the empty path matches.
                checkOutletNameUniqueness(mergedChildren);
            }
            sortActivatedRouteSnapshots(mergedChildren);
            return (0, rxjs_1.of)(mergedChildren);
        }));
    }
    processSegment(injector, routes, segmentGroup, segments, outlet, allowRedirects, parentRoute) {
        return (0, rxjs_1.from)(routes).pipe((0, operators_1.concatMap)((r) => {
            var _a;
            return this.processSegmentAgainstRoute((_a = r._injector) !== null && _a !== void 0 ? _a : injector, routes, r, segmentGroup, segments, outlet, allowRedirects, parentRoute).pipe((0, operators_1.catchError)((e) => {
                if (e instanceof apply_redirects_1.NoMatch) {
                    return (0, rxjs_1.of)(null);
                }
                throw e;
            }));
        }), (0, operators_1.first)((x) => !!x), (0, operators_1.catchError)((e) => {
            if ((0, type_guards_1.isEmptyError)(e)) {
                if ((0, config_matching_1.noLeftoversInUrl)(segmentGroup, segments, outlet)) {
                    return (0, rxjs_1.of)(new NoLeftoversInUrl());
                }
                return (0, apply_redirects_1.noMatch)(segmentGroup);
            }
            throw e;
        }));
    }
    processSegmentAgainstRoute(injector, routes, route, rawSegment, segments, outlet, allowRedirects, parentRoute) {
        // We allow matches to empty paths when the outlets differ so we can match a url like `/(b:b)` to
        // a config like
        // * `{path: '', children: [{path: 'b', outlet: 'b'}]}`
        // or even
        // * `{path: '', outlet: 'a', children: [{path: 'b', outlet: 'b'}]`
        //
        // The exception here is when the segment outlet is for the primary outlet. This would
        // result in a match inside the named outlet because all children there are written as primary
        // outlets. So we need to prevent child named outlet matches in a url like `/b` in a config like
        // * `{path: '', outlet: 'x' children: [{path: 'b'}]}`
        // This should only match if the url is `/(x:b)`.
        if ((0, config_1.getOutlet)(route) !== outlet &&
            (outlet === shared_1.PRIMARY_OUTLET || !(0, config_matching_1.emptyPathMatch)(rawSegment, segments, route))) {
            return (0, apply_redirects_1.noMatch)(rawSegment);
        }
        if (route.redirectTo === undefined) {
            return this.matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute);
        }
        if (this.allowRedirects && allowRedirects) {
            return this.expandSegmentAgainstRouteUsingRedirect(injector, rawSegment, routes, route, segments, outlet, parentRoute);
        }
        return (0, apply_redirects_1.noMatch)(rawSegment);
    }
    expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet, parentRoute) {
        var _a, _b;
        const { matched, parameters, consumedSegments, positionalParamSegments, remainingSegments } = (0, config_matching_1.match)(segmentGroup, route, segments);
        if (!matched)
            return (0, apply_redirects_1.noMatch)(segmentGroup);
        // TODO(atscott): Move all of this under an if(ngDevMode) as a breaking change and allow stack
        // size exceeded in production
        if (typeof route.redirectTo === 'string' && route.redirectTo[0] === '/') {
            this.absoluteRedirectCount++;
            if (this.absoluteRedirectCount > MAX_ALLOWED_REDIRECTS) {
                if (ngDevMode) {
                    throw new core_1.ɵRuntimeError(4016 /* RuntimeErrorCode.INFINITE_REDIRECT */, `Detected possible infinite redirect when redirecting from '${this.urlTree}' to '${route.redirectTo}'.\n` +
                        `This is currently a dev mode only error but will become a` +
                        ` call stack size exceeded error in production in a future major version.`);
                }
                this.allowRedirects = false;
            }
        }
        const currentSnapshot = new router_state_1.ActivatedRouteSnapshot(segments, parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), (0, config_1.getOutlet)(route), (_b = (_a = route.component) !== null && _a !== void 0 ? _a : route._loadedComponent) !== null && _b !== void 0 ? _b : null, route, getResolve(route));
        const inherited = (0, router_state_1.getInherited)(currentSnapshot, parentRoute, this.paramsInheritanceStrategy);
        currentSnapshot.params = Object.freeze(inherited.params);
        currentSnapshot.data = Object.freeze(inherited.data);
        const newTree$ = this.applyRedirects.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments, currentSnapshot, injector);
        return newTree$.pipe((0, operators_1.switchMap)((newTree) => this.applyRedirects.lineralizeSegments(route, newTree)), (0, operators_1.mergeMap)((newSegments) => {
            return this.processSegment(injector, routes, segmentGroup, newSegments.concat(remainingSegments), outlet, false, parentRoute);
        }));
    }
    matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute) {
        const matchResult = (0, config_matching_1.matchWithChecks)(rawSegment, route, segments, injector, this.urlSerializer);
        if (route.path === '**') {
            // Prior versions of the route matching algorithm would stop matching at the wildcard route.
            // We should investigate a better strategy for any existing children. Otherwise, these
            // child segments are silently dropped from the navigation.
            // https://github.com/angular/angular/issues/40089
            rawSegment.children = {};
        }
        return matchResult.pipe((0, operators_1.switchMap)((result) => {
            var _a;
            if (!result.matched) {
                return (0, apply_redirects_1.noMatch)(rawSegment);
            }
            // If the route has an injector created from providers, we should start using that.
            injector = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
            return this.getChildConfig(injector, route, segments).pipe((0, operators_1.switchMap)(({ routes: childConfig }) => {
                var _a, _b, _c;
                const childInjector = (_a = route._loadedInjector) !== null && _a !== void 0 ? _a : injector;
                const { parameters, consumedSegments, remainingSegments } = result;
                const snapshot = new router_state_1.ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), (0, config_1.getOutlet)(route), (_c = (_b = route.component) !== null && _b !== void 0 ? _b : route._loadedComponent) !== null && _c !== void 0 ? _c : null, route, getResolve(route));
                const inherited = (0, router_state_1.getInherited)(snapshot, parentRoute, this.paramsInheritanceStrategy);
                snapshot.params = Object.freeze(inherited.params);
                snapshot.data = Object.freeze(inherited.data);
                const { segmentGroup, slicedSegments } = (0, config_matching_1.split)(rawSegment, consumedSegments, remainingSegments, childConfig);
                if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
                    return this.processChildren(childInjector, childConfig, segmentGroup, snapshot).pipe((0, operators_1.map)((children) => {
                        return new tree_1.TreeNode(snapshot, children);
                    }));
                }
                if (childConfig.length === 0 && slicedSegments.length === 0) {
                    return (0, rxjs_1.of)(new tree_1.TreeNode(snapshot, []));
                }
                const matchedOnOutlet = (0, config_1.getOutlet)(route) === outlet;
                // If we matched a config due to empty path match on a different outlet, we need to
                // continue passing the current outlet for the segment rather than switch to PRIMARY.
                // Note that we switch to primary when we have a match because outlet configs look like
                // this: {path: 'a', outlet: 'a', children: [
                //  {path: 'b', component: B},
                //  {path: 'c', component: C},
                // ]}
                // Notice that the children of the named outlet are configured with the primary outlet
                return this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? shared_1.PRIMARY_OUTLET : outlet, true, snapshot).pipe((0, operators_1.map)((child) => {
                    return new tree_1.TreeNode(snapshot, child instanceof tree_1.TreeNode ? [child] : []);
                }));
            }));
        }));
    }
    getChildConfig(injector, route, segments) {
        if (route.children) {
            // The children belong to the same module
            return (0, rxjs_1.of)({ routes: route.children, injector });
        }
        if (route.loadChildren) {
            // lazy children belong to the loaded module
            if (route._loadedRoutes !== undefined) {
                return (0, rxjs_1.of)({ routes: route._loadedRoutes, injector: route._loadedInjector });
            }
            return (0, check_guards_1.runCanLoadGuards)(injector, route, segments, this.urlSerializer).pipe((0, operators_1.mergeMap)((shouldLoadResult) => {
                if (shouldLoadResult) {
                    return this.configLoader.loadChildren(injector, route).pipe((0, operators_1.tap)((cfg) => {
                        route._loadedRoutes = cfg.routes;
                        route._loadedInjector = cfg.injector;
                    }));
                }
                return (0, apply_redirects_1.canLoadFails)(route);
            }));
        }
        return (0, rxjs_1.of)({ routes: [], injector });
    }
}
exports.Recognizer = Recognizer;
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort((a, b) => {
        if (a.value.outlet === shared_1.PRIMARY_OUTLET)
            return -1;
        if (b.value.outlet === shared_1.PRIMARY_OUTLET)
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
function hasEmptyPathConfig(node) {
    const config = node.value.routeConfig;
    return config && config.path === '';
}
/**
 * Finds `TreeNode`s with matching empty path route configs and merges them into `TreeNode` with
 * the children from each duplicate. This is necessary because different outlets can match a
 * single empty path route config and the results need to then be merged.
 */
function mergeEmptyPathMatches(nodes) {
    const result = [];
    // The set of nodes which contain children that were merged from two duplicate empty path nodes.
    const mergedNodes = new Set();
    for (const node of nodes) {
        if (!hasEmptyPathConfig(node)) {
            result.push(node);
            continue;
        }
        const duplicateEmptyPathNode = result.find((resultNode) => node.value.routeConfig === resultNode.value.routeConfig);
        if (duplicateEmptyPathNode !== undefined) {
            duplicateEmptyPathNode.children.push(...node.children);
            mergedNodes.add(duplicateEmptyPathNode);
        }
        else {
            result.push(node);
        }
    }
    // For each node which has children from multiple sources, we need to recompute a new `TreeNode`
    // by also merging those children. This is necessary when there are multiple empty path configs
    // in a row. Put another way: whenever we combine children of two nodes, we need to also check
    // if any of those children can be combined into a single node as well.
    for (const mergedNode of mergedNodes) {
        const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
        result.push(new tree_1.TreeNode(mergedNode.value, mergedChildren));
    }
    return result.filter((n) => !mergedNodes.has(n));
}
function checkOutletNameUniqueness(nodes) {
    const names = {};
    nodes.forEach((n) => {
        const routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            const p = routeWithSameOutletName.url.map((s) => s.toString()).join('/');
            const c = n.value.url.map((s) => s.toString()).join('/');
            throw new core_1.ɵRuntimeError(4006 /* RuntimeErrorCode.TWO_SEGMENTS_WITH_SAME_OUTLET */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
        }
        names[n.value.outlet] = n.value;
    });
}
function getData(route) {
    return route.data || {};
}
function getResolve(route) {
    return route.resolve || {};
}
