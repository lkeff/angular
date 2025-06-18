"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterStateSnapshot = exports.ActivatedRouteSnapshot = exports.ActivatedRoute = exports.RouterState = void 0;
exports.createEmptyState = createEmptyState;
exports.createEmptyStateSnapshot = createEmptyStateSnapshot;
exports.getInherited = getInherited;
exports.advanceActivatedRoute = advanceActivatedRoute;
exports.equalParamsAndUrlSegments = equalParamsAndUrlSegments;
exports.hasStaticTitle = hasStaticTitle;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const shared_1 = require("./shared");
const url_tree_1 = require("./url_tree");
const collection_1 = require("./utils/collection");
const tree_1 = require("./utils/tree");
/**
 * Represents the state of the router as a tree of activated routes.
 *
 * @usageNotes
 *
 * Every node in the route tree is an `ActivatedRoute` instance
 * that knows about the "consumed" URL segments, the extracted parameters,
 * and the resolved data.
 * Use the `ActivatedRoute` properties to traverse the tree from any node.
 *
 * The following fragment shows how a component gets the root node
 * of the current state to establish its own route tree:
 *
 * ```ts
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const root: ActivatedRoute = state.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * @see {@link ActivatedRoute}
 * @see [Getting route information](guide/routing/common-router-tasks#getting-route-information)
 *
 * @publicApi
 */
class RouterState extends tree_1.Tree {
    /** @internal */
    constructor(root, 
    /** The current snapshot of the router state */
    snapshot) {
        super(root);
        this.snapshot = snapshot;
        setRouterState(this, root);
    }
    toString() {
        return this.snapshot.toString();
    }
}
exports.RouterState = RouterState;
function createEmptyState(rootComponent) {
    const snapshot = createEmptyStateSnapshot(rootComponent);
    const emptyUrl = new rxjs_1.BehaviorSubject([new url_tree_1.UrlSegment('', {})]);
    const emptyParams = new rxjs_1.BehaviorSubject({});
    const emptyData = new rxjs_1.BehaviorSubject({});
    const emptyQueryParams = new rxjs_1.BehaviorSubject({});
    const fragment = new rxjs_1.BehaviorSubject('');
    const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, shared_1.PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new tree_1.TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(rootComponent) {
    const emptyParams = {};
    const emptyData = {};
    const emptyQueryParams = {};
    const fragment = '';
    const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, shared_1.PRIMARY_OUTLET, rootComponent, null, {});
    return new RouterStateSnapshot('', new tree_1.TreeNode(activated, []));
}
/**
 * Provides access to information about a route associated with a component
 * that is loaded in an outlet.
 * Use to traverse the `RouterState` tree and extract information from nodes.
 *
 * The following example shows how to construct a component using information from a
 * currently activated route.
 *
 * Note: the observables in this class only emit when the current and previous values differ based
 * on shallow equality. For example, changing deeply nested properties in resolved `data` will not
 * cause the `ActivatedRoute.data` `Observable` to emit a new value.
 *
 * {@example router/activated-route/module.ts region="activated-route"
 *     header="activated-route.component.ts"}
 *
 * @see [Getting route information](guide/routing/common-router-tasks#getting-route-information)
 *
 * @publicApi
 */
class ActivatedRoute {
    /** @internal */
    constructor(
    /** @internal */
    urlSubject, 
    /** @internal */
    paramsSubject, 
    /** @internal */
    queryParamsSubject, 
    /** @internal */
    fragmentSubject, 
    /** @internal */
    dataSubject, 
    /** The outlet name of the route, a constant. */
    outlet, 
    /** The component of the route, a constant. */
    component, futureSnapshot) {
        var _a, _b;
        this.urlSubject = urlSubject;
        this.paramsSubject = paramsSubject;
        this.queryParamsSubject = queryParamsSubject;
        this.fragmentSubject = fragmentSubject;
        this.dataSubject = dataSubject;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
        this.title = (_b = (_a = this.dataSubject) === null || _a === void 0 ? void 0 : _a.pipe((0, operators_1.map)((d) => d[shared_1.RouteTitleKey]))) !== null && _b !== void 0 ? _b : (0, rxjs_1.of)(undefined);
        // TODO(atscott): Verify that these can be changed to `.asObservable()` with TGP.
        this.url = urlSubject;
        this.params = paramsSubject;
        this.queryParams = queryParamsSubject;
        this.fragment = fragmentSubject;
        this.data = dataSubject;
    }
    /** The configuration used to match this route. */
    get routeConfig() {
        return this._futureSnapshot.routeConfig;
    }
    /** The root of the router state. */
    get root() {
        return this._routerState.root;
    }
    /** The parent of this route in the router state tree. */
    get parent() {
        return this._routerState.parent(this);
    }
    /** The first child of this route in the router state tree. */
    get firstChild() {
        return this._routerState.firstChild(this);
    }
    /** The children of this route in the router state tree. */
    get children() {
        return this._routerState.children(this);
    }
    /** The path from the root of the router state tree to this route. */
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
    }
    /**
     * An Observable that contains a map of the required and optional parameters
     * specific to the route.
     * The map supports retrieving single and multiple values from the same parameter.
     */
    get paramMap() {
        var _a;
        (_a = this._paramMap) !== null && _a !== void 0 ? _a : (this._paramMap = this.params.pipe((0, operators_1.map)((p) => (0, shared_1.convertToParamMap)(p))));
        return this._paramMap;
    }
    /**
     * An Observable that contains a map of the query parameters available to all routes.
     * The map supports retrieving single and multiple values from the query parameter.
     */
    get queryParamMap() {
        var _a;
        (_a = this._queryParamMap) !== null && _a !== void 0 ? _a : (this._queryParamMap = this.queryParams.pipe((0, operators_1.map)((p) => (0, shared_1.convertToParamMap)(p))));
        return this._queryParamMap;
    }
    toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
    }
}
exports.ActivatedRoute = ActivatedRoute;
/**
 * Returns the inherited params, data, and resolve for a given route.
 *
 * By default, we do not inherit parent data unless the current route is path-less or the parent
 * route is component-less.
 */
function getInherited(route, parent, paramsInheritanceStrategy = 'emptyOnly') {
    var _a, _b;
    let inherited;
    const { routeConfig } = route;
    if (parent !== null &&
        (paramsInheritanceStrategy === 'always' ||
            // inherit parent data if route is empty path
            (routeConfig === null || routeConfig === void 0 ? void 0 : routeConfig.path) === '' ||
            // inherit parent data if parent was componentless
            (!parent.component && !((_a = parent.routeConfig) === null || _a === void 0 ? void 0 : _a.loadComponent)))) {
        inherited = {
            params: Object.assign(Object.assign({}, parent.params), route.params),
            data: Object.assign(Object.assign({}, parent.data), route.data),
            resolve: Object.assign(Object.assign(Object.assign(Object.assign({}, route.data), parent.data), routeConfig === null || routeConfig === void 0 ? void 0 : routeConfig.data), route._resolvedData),
        };
    }
    else {
        inherited = {
            params: Object.assign({}, route.params),
            data: Object.assign({}, route.data),
            resolve: Object.assign(Object.assign({}, route.data), ((_b = route._resolvedData) !== null && _b !== void 0 ? _b : {})),
        };
    }
    if (routeConfig && hasStaticTitle(routeConfig)) {
        inherited.resolve[shared_1.RouteTitleKey] = routeConfig.title;
    }
    return inherited;
}
/**
 * @description
 *
 * Contains the information about a route associated with a component loaded in an
 * outlet at a particular moment in time. ActivatedRouteSnapshot can also be used to
 * traverse the router state tree.
 *
 * The following example initializes a component with route information extracted
 * from the snapshot of the root node at the time of creation.
 *
 * ```ts
 * @Component({templateUrl:'./my-component.html'})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const url: string = route.snapshot.url.join('');
 *     const user = route.snapshot.data.user;
 *   }
 * }
 * ```
 *
 * @publicApi
 */
class ActivatedRouteSnapshot {
    /** The resolved route title */
    get title() {
        var _a;
        // Note: This _must_ be a getter because the data is mutated in the resolvers. Title will not be
        // available at the time of class instantiation.
        return (_a = this.data) === null || _a === void 0 ? void 0 : _a[shared_1.RouteTitleKey];
    }
    /** @internal */
    constructor(
    /** The URL segments matched by this route */
    url, 
    /**
     *  The matrix parameters scoped to this route.
     *
     *  You can compute all params (or data) in the router state or to get params outside
     *  of an activated component by traversing the `RouterState` tree as in the following
     *  example:
     *  ```ts
     *  collectRouteParams(router: Router) {
     *    let params = {};
     *    let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
     *    while (stack.length > 0) {
     *      const route = stack.pop()!;
     *      params = {...params, ...route.params};
     *      stack.push(...route.children);
     *    }
     *    return params;
     *  }
     *  ```
     */
    params, 
    /** The query parameters shared by all the routes */
    queryParams, 
    /** The URL fragment shared by all the routes */
    fragment, 
    /** The static and resolved data of this route */
    data, 
    /** The outlet name of the route */
    outlet, 
    /** The component of the route */
    component, routeConfig, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this.routeConfig = routeConfig;
        this._resolve = resolve;
    }
    /** The root of the router state */
    get root() {
        return this._routerState.root;
    }
    /** The parent of this route in the router state tree */
    get parent() {
        return this._routerState.parent(this);
    }
    /** The first child of this route in the router state tree */
    get firstChild() {
        return this._routerState.firstChild(this);
    }
    /** The children of this route in the router state tree */
    get children() {
        return this._routerState.children(this);
    }
    /** The path from the root of the router state tree to this route */
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
        var _a;
        (_a = this._paramMap) !== null && _a !== void 0 ? _a : (this._paramMap = (0, shared_1.convertToParamMap)(this.params));
        return this._paramMap;
    }
    get queryParamMap() {
        var _a;
        (_a = this._queryParamMap) !== null && _a !== void 0 ? _a : (this._queryParamMap = (0, shared_1.convertToParamMap)(this.queryParams));
        return this._queryParamMap;
    }
    toString() {
        const url = this.url.map((segment) => segment.toString()).join('/');
        const matched = this.routeConfig ? this.routeConfig.path : '';
        return `Route(url:'${url}', path:'${matched}')`;
    }
}
exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
/**
 * @description
 *
 * Represents the state of the router at a moment in time.
 *
 * This is a tree of activated route snapshots. Every node in this tree knows about
 * the "consumed" URL segments, the extracted parameters, and the resolved data.
 *
 * The following example shows how a component is initialized with information
 * from the snapshot of the root node's state at the time of creation.
 *
 * ```ts
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const snapshot: RouterStateSnapshot = state.snapshot;
 *     const root: ActivatedRouteSnapshot = snapshot.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * @publicApi
 */
class RouterStateSnapshot extends tree_1.Tree {
    /** @internal */
    constructor(
    /** The url from which this snapshot was created */
    url, root) {
        super(root);
        this.url = url;
        setRouterState(this, root);
    }
    toString() {
        return serializeNode(this._root);
    }
}
exports.RouterStateSnapshot = RouterStateSnapshot;
function setRouterState(state, node) {
    node.value._routerState = state;
    node.children.forEach((c) => setRouterState(state, c));
}
function serializeNode(node) {
    const c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(', ')} } ` : '';
    return `${node.value}${c}`;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 */
function advanceActivatedRoute(route) {
    if (route.snapshot) {
        const currentSnapshot = route.snapshot;
        const nextSnapshot = route._futureSnapshot;
        route.snapshot = nextSnapshot;
        if (!(0, collection_1.shallowEqual)(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
            route.queryParamsSubject.next(nextSnapshot.queryParams);
        }
        if (currentSnapshot.fragment !== nextSnapshot.fragment) {
            route.fragmentSubject.next(nextSnapshot.fragment);
        }
        if (!(0, collection_1.shallowEqual)(currentSnapshot.params, nextSnapshot.params)) {
            route.paramsSubject.next(nextSnapshot.params);
        }
        if (!(0, collection_1.shallowEqualArrays)(currentSnapshot.url, nextSnapshot.url)) {
            route.urlSubject.next(nextSnapshot.url);
        }
        if (!(0, collection_1.shallowEqual)(currentSnapshot.data, nextSnapshot.data)) {
            route.dataSubject.next(nextSnapshot.data);
        }
    }
    else {
        route.snapshot = route._futureSnapshot;
        // this is for resolved data
        route.dataSubject.next(route._futureSnapshot.data);
    }
}
function equalParamsAndUrlSegments(a, b) {
    const equalUrlParams = (0, collection_1.shallowEqual)(a.params, b.params) && (0, url_tree_1.equalSegments)(a.url, b.url);
    const parentsMismatch = !a.parent !== !b.parent;
    return (equalUrlParams &&
        !parentsMismatch &&
        (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent)));
}
function hasStaticTitle(config) {
    return typeof config.title === 'string' || config.title === null;
}
