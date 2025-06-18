"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.subsetMatchOptions = exports.exactMatchOptions = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const create_url_tree_1 = require("./create_url_tree");
const router_outlet_1 = require("./directives/router_outlet");
const events_1 = require("./events");
const navigation_transition_1 = require("./navigation_transition");
const route_reuse_strategy_1 = require("./route_reuse_strategy");
const router_config_1 = require("./router_config");
const router_config_loader_1 = require("./router_config_loader");
const state_manager_1 = require("./statemanager/state_manager");
const url_handling_strategy_1 = require("./url_handling_strategy");
const url_tree_1 = require("./url_tree");
const config_1 = require("./utils/config");
const navigations_1 = require("./utils/navigations");
const empty_outlet_1 = require("./components/empty_outlet");
/**
 * The equivalent `IsActiveMatchOptions` options for `Router.isActive` is called with `true`
 * (exact = true).
 */
exports.exactMatchOptions = {
    paths: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'exact',
};
/**
 * The equivalent `IsActiveMatchOptions` options for `Router.isActive` is called with `false`
 * (exact = false).
 */
exports.subsetMatchOptions = {
    paths: 'subset',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'subset',
};
/**
 * @description
 *
 * A service that facilitates navigation among views and URL manipulation capabilities.
 * This service is provided in the root scope and configured with [provideRouter](api/router/provideRouter).
 *
 * @see {@link Route}
 * @see {@link provideRouter}
 * @see [Routing and Navigation Guide](guide/routing/common-router-tasks).
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
let Router = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Router = _classThis = class {
        get currentUrlTree() {
            return this.stateManager.getCurrentUrlTree();
        }
        get rawUrlTree() {
            return this.stateManager.getRawUrlTree();
        }
        /**
         * An event stream for routing events.
         */
        get events() {
            // TODO(atscott): This _should_ be events.asObservable(). However, this change requires internal
            // cleanup: tests are doing `(route.events as Subject<Event>).next(...)`. This isn't
            // allowed/supported but we still have to fix these or file bugs against the teams before making
            // the change.
            return this._events;
        }
        /**
         * The current state of routing in this NgModule.
         */
        get routerState() {
            return this.stateManager.getRouterState();
        }
        constructor() {
            var _a, _b;
            this.disposed = false;
            this.console = (0, core_1.inject)(core_1.ɵConsole);
            this.stateManager = (0, core_1.inject)(state_manager_1.StateManager);
            this.options = (0, core_1.inject)(router_config_1.ROUTER_CONFIGURATION, { optional: true }) || {};
            this.pendingTasks = (0, core_1.inject)(core_1.ɵPendingTasksInternal);
            this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
            this.navigationTransitions = (0, core_1.inject)(navigation_transition_1.NavigationTransitions);
            this.urlSerializer = (0, core_1.inject)(url_tree_1.UrlSerializer);
            this.location = (0, core_1.inject)(common_1.Location);
            this.urlHandlingStrategy = (0, core_1.inject)(url_handling_strategy_1.UrlHandlingStrategy);
            this.injector = (0, core_1.inject)(core_1.EnvironmentInjector);
            /**
             * The private `Subject` type for the public events exposed in the getter. This is used internally
             * to push events to. The separate field allows us to expose separate types in the public API
             * (i.e., an Observable rather than the Subject).
             */
            this._events = new rxjs_1.Subject();
            /**
             * True if at least one navigation event has occurred,
             * false otherwise.
             */
            this.navigated = false;
            /**
             * A strategy for re-using routes.
             *
             * @deprecated Configure using `providers` instead:
             *   `{provide: RouteReuseStrategy, useClass: MyStrategy}`.
             */
            this.routeReuseStrategy = (0, core_1.inject)(route_reuse_strategy_1.RouteReuseStrategy);
            /**
             * How to handle a navigation request to the current URL.
             *
             *
             * @deprecated Configure this through `provideRouter` or `RouterModule.forRoot` instead.
             * @see {@link withRouterConfig}
             * @see {@link provideRouter}
             * @see {@link RouterModule}
             */
            this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
            this.config = (_b = (_a = (0, core_1.inject)(router_config_loader_1.ROUTES, { optional: true })) === null || _a === void 0 ? void 0 : _a.flat()) !== null && _b !== void 0 ? _b : [];
            /**
             * Indicates whether the application has opted in to binding Router data to component inputs.
             *
             * This option is enabled by the `withComponentInputBinding` feature of `provideRouter` or
             * `bindToComponentInputs` in the `ExtraOptions` of `RouterModule.forRoot`.
             */
            this.componentInputBindingEnabled = !!(0, core_1.inject)(router_outlet_1.INPUT_BINDER, { optional: true });
            this.eventsSubscription = new rxjs_1.Subscription();
            this.resetConfig(this.config);
            this.navigationTransitions.setupNavigations(this).subscribe({
                error: (e) => {
                    this.console.warn(ngDevMode ? `Unhandled Navigation Error: ${e}` : e);
                },
            });
            this.subscribeToNavigationEvents();
        }
        subscribeToNavigationEvents() {
            const subscription = this.navigationTransitions.events.subscribe((e) => {
                try {
                    const currentTransition = this.navigationTransitions.currentTransition;
                    const currentNavigation = this.navigationTransitions.currentNavigation;
                    if (currentTransition !== null && currentNavigation !== null) {
                        this.stateManager.handleRouterEvent(e, currentNavigation);
                        if (e instanceof events_1.NavigationCancel &&
                            e.code !== events_1.NavigationCancellationCode.Redirect &&
                            e.code !== events_1.NavigationCancellationCode.SupersededByNewNavigation) {
                            // It seems weird that `navigated` is set to `true` when the navigation is rejected,
                            // however it's how things were written initially. Investigation would need to be done
                            // to determine if this can be removed.
                            this.navigated = true;
                        }
                        else if (e instanceof events_1.NavigationEnd) {
                            this.navigated = true;
                        }
                        else if (e instanceof events_1.RedirectRequest) {
                            const opts = e.navigationBehaviorOptions;
                            const mergedTree = this.urlHandlingStrategy.merge(e.url, currentTransition.currentRawUrl);
                            const extras = Object.assign({ browserUrl: currentTransition.extras.browserUrl, info: currentTransition.extras.info, skipLocationChange: currentTransition.extras.skipLocationChange, 
                                // The URL is already updated at this point if we have 'eager' URL
                                // updates or if the navigation was triggered by the browser (back
                                // button, URL bar, etc). We want to replace that item in history
                                // if the navigation is rejected.
                                replaceUrl: currentTransition.extras.replaceUrl ||
                                    this.urlUpdateStrategy === 'eager' ||
                                    (0, navigation_transition_1.isBrowserTriggeredNavigation)(currentTransition.source) }, opts);
                            this.scheduleNavigation(mergedTree, events_1.IMPERATIVE_NAVIGATION, null, extras, {
                                resolve: currentTransition.resolve,
                                reject: currentTransition.reject,
                                promise: currentTransition.promise,
                            });
                        }
                    }
                    // Note that it's important to have the Router process the events _before_ the event is
                    // pushed through the public observable. This ensures the correct router state is in place
                    // before applications observe the events.
                    if ((0, events_1.isPublicRouterEvent)(e)) {
                        this._events.next(e);
                    }
                }
                catch (e) {
                    this.navigationTransitions.transitionAbortWithErrorSubject.next(e);
                }
            });
            this.eventsSubscription.add(subscription);
        }
        /** @internal */
        resetRootComponentType(rootComponentType) {
            // TODO: vsavkin router 4.0 should make the root component set to null
            // this will simplify the lifecycle of the router.
            this.routerState.root.component = rootComponentType;
            this.navigationTransitions.rootComponentType = rootComponentType;
        }
        /**
         * Sets up the location change listener and performs the initial navigation.
         */
        initialNavigation() {
            this.setUpLocationChangeListener();
            if (!this.navigationTransitions.hasRequestedNavigation) {
                this.navigateToSyncWithBrowser(this.location.path(true), events_1.IMPERATIVE_NAVIGATION, this.stateManager.restoredState());
            }
        }
        /**
         * Sets up the location change listener. This listener detects navigations triggered from outside
         * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
         * navigation so that the correct events, guards, etc. are triggered.
         */
        setUpLocationChangeListener() {
            var _a;
            // Don't need to use Zone.wrap any more, because zone.js
            // already patch onPopState, so location change callback will
            // run into ngZone
            (_a = this.nonRouterCurrentEntryChangeSubscription) !== null && _a !== void 0 ? _a : (this.nonRouterCurrentEntryChangeSubscription = this.stateManager.registerNonRouterCurrentEntryChangeListener((url, state, source) => {
                this.navigateToSyncWithBrowser(url, source, state);
            }));
        }
        /**
         * Schedules a router navigation to synchronize Router state with the browser state.
         *
         * This is done as a response to a popstate event and the initial navigation. These
         * two scenarios represent times when the browser URL/state has been updated and
         * the Router needs to respond to ensure its internal state matches.
         */
        navigateToSyncWithBrowser(url, source, state) {
            const extras = { replaceUrl: true };
            // TODO: restoredState should always include the entire state, regardless
            // of navigationId. This requires a breaking change to update the type on
            // NavigationStart’s restoredState, which currently requires navigationId
            // to always be present. The Router used to only restore history state if
            // a navigationId was present.
            // The stored navigationId is used by the RouterScroller to retrieve the scroll
            // position for the page.
            const restoredState = (state === null || state === void 0 ? void 0 : state.navigationId) ? state : null;
            // Separate to NavigationStart.restoredState, we must also restore the state to
            // history.state and generate a new navigationId, since it will be overwritten
            if (state) {
                const stateCopy = Object.assign({}, state);
                delete stateCopy.navigationId;
                delete stateCopy.ɵrouterPageId;
                if (Object.keys(stateCopy).length !== 0) {
                    extras.state = stateCopy;
                }
            }
            const urlTree = this.parseUrl(url);
            this.scheduleNavigation(urlTree, source, restoredState, extras).catch((e) => {
                if (this.disposed) {
                    return;
                }
                this.injector.get(core_1.ɵINTERNAL_APPLICATION_ERROR_HANDLER)(e);
            });
        }
        /** The current URL. */
        get url() {
            return this.serializeUrl(this.currentUrlTree);
        }
        /**
         * Returns the current `Navigation` object when the router is navigating,
         * and `null` when idle.
         */
        getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
        }
        /**
         * The `Navigation` object of the most recent navigation to succeed and `null` if there
         *     has not been a successful navigation yet.
         */
        get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
        }
        /**
         * Resets the route configuration used for navigation and generating links.
         *
         * @param config The route array for the new configuration.
         *
         * @usageNotes
         *
         * ```ts
         * router.resetConfig([
         *  { path: 'team/:id', component: TeamCmp, children: [
         *    { path: 'simple', component: SimpleCmp },
         *    { path: 'user/:name', component: UserCmp }
         *  ]}
         * ]);
         * ```
         */
        resetConfig(config) {
            (typeof ngDevMode === 'undefined' || ngDevMode) && (0, config_1.validateConfig)(config);
            this.config = config.map(empty_outlet_1.standardizeConfig);
            this.navigated = false;
        }
        /** @nodoc */
        ngOnDestroy() {
            this.dispose();
        }
        /** Disposes of the router. */
        dispose() {
            // We call `unsubscribe()` to release observers, as users may forget to
            // unsubscribe manually when subscribing to `router.events`. We do not call
            // `complete()` because it is unsafe; if someone subscribes using the `first`
            // operator and the observable completes before emitting a value,
            // RxJS will throw an error.
            this._events.unsubscribe();
            this.navigationTransitions.complete();
            if (this.nonRouterCurrentEntryChangeSubscription) {
                this.nonRouterCurrentEntryChangeSubscription.unsubscribe();
                this.nonRouterCurrentEntryChangeSubscription = undefined;
            }
            this.disposed = true;
            this.eventsSubscription.unsubscribe();
        }
        /**
         * Appends URL segments to the current URL tree to create a new URL tree.
         *
         * @param commands An array of URL fragments with which to construct the new URL tree.
         * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
         * segments, followed by the parameters for each segment.
         * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
         * property of the options object, if supplied.
         * @param navigationExtras Options that control the navigation strategy.
         * @returns The new URL tree.
         *
         * @usageNotes
         *
         * ```
         * // create /team/33/user/11
         * router.createUrlTree(['/team', 33, 'user', 11]);
         *
         * // create /team/33;expand=true/user/11
         * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
         *
         * // you can collapse static segments like this (this works only with the first passed-in value):
         * router.createUrlTree(['/team/33/user', userId]);
         *
         * // If the first segment can contain slashes, and you do not want the router to split it,
         * // you can do the following:
         * router.createUrlTree([{segmentPath: '/one/two'}]);
         *
         * // create /team/33/(user/11//right:chat)
         * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
         *
         * // remove the right secondary node
         * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
         *
         * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
         *
         * // navigate to /team/33/user/11/details
         * router.createUrlTree(['details'], {relativeTo: route});
         *
         * // navigate to /team/33/user/22
         * router.createUrlTree(['../22'], {relativeTo: route});
         *
         * // navigate to /team/44/user/22
         * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
         *
         * Note that a value of `null` or `undefined` for `relativeTo` indicates that the
         * tree should be created relative to the root.
         * ```
         */
        createUrlTree(commands, navigationExtras = {}) {
            const { relativeTo, queryParams, fragment, queryParamsHandling, preserveFragment } = navigationExtras;
            const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
            let q = null;
            switch (queryParamsHandling !== null && queryParamsHandling !== void 0 ? queryParamsHandling : this.options.defaultQueryParamsHandling) {
                case 'merge':
                    q = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), queryParams);
                    break;
                case 'preserve':
                    q = this.currentUrlTree.queryParams;
                    break;
                default:
                    q = queryParams || null;
            }
            if (q !== null) {
                q = this.removeEmptyProps(q);
            }
            let relativeToUrlSegmentGroup;
            try {
                const relativeToSnapshot = relativeTo ? relativeTo.snapshot : this.routerState.snapshot.root;
                relativeToUrlSegmentGroup = (0, create_url_tree_1.createSegmentGroupFromRoute)(relativeToSnapshot);
            }
            catch (e) {
                // This is strictly for backwards compatibility with tests that create
                // invalid `ActivatedRoute` mocks.
                // Note: the difference between having this fallback for invalid `ActivatedRoute` setups and
                // just throwing is ~500 test failures. Fixing all of those tests by hand is not feasible at
                // the moment.
                if (typeof commands[0] !== 'string' || commands[0][0] !== '/') {
                    // Navigations that were absolute in the old way of creating UrlTrees
                    // would still work because they wouldn't attempt to match the
                    // segments in the `ActivatedRoute` to the `currentUrlTree` but
                    // instead just replace the root segment with the navigation result.
                    // Non-absolute navigations would fail to apply the commands because
                    // the logic could not find the segment to replace (so they'd act like there were no
                    // commands).
                    commands = [];
                }
                relativeToUrlSegmentGroup = this.currentUrlTree.root;
            }
            return (0, create_url_tree_1.createUrlTreeFromSegmentGroup)(relativeToUrlSegmentGroup, commands, q, f !== null && f !== void 0 ? f : null);
        }
        /**
         * Navigates to a view using an absolute route path.
         *
         * @param url An absolute path for a defined route. The function does not apply any delta to the
         *     current URL.
         * @param extras An object containing properties that modify the navigation strategy.
         *
         * @returns A Promise that resolves to 'true' when navigation succeeds,
         * to 'false' when navigation fails, or is rejected on error.
         *
         * @usageNotes
         *
         * The following calls request navigation to an absolute path.
         *
         * ```ts
         * router.navigateByUrl("/team/33/user/11");
         *
         * // Navigate without updating the URL
         * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
         * ```
         *
         * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
         *
         */
        navigateByUrl(url, extras = {
            skipLocationChange: false,
        }) {
            const urlTree = (0, url_tree_1.isUrlTree)(url) ? url : this.parseUrl(url);
            const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
            return this.scheduleNavigation(mergedTree, events_1.IMPERATIVE_NAVIGATION, null, extras);
        }
        /**
         * Navigate based on the provided array of commands and a starting point.
         * If no starting route is provided, the navigation is absolute.
         *
         * @param commands An array of URL fragments with which to construct the target URL.
         * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
         * segments, followed by the parameters for each segment.
         * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
         * of the options object, if supplied.
         * @param extras An options object that determines how the URL should be constructed or
         *     interpreted.
         *
         * @returns A Promise that resolves to `true` when navigation succeeds, or `false` when navigation
         *     fails. The Promise is rejected when an error occurs if `resolveNavigationPromiseOnError` is
         * not `true`.
         *
         * @usageNotes
         *
         * The following calls request navigation to a dynamic route path relative to the current URL.
         *
         * ```ts
         * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
         *
         * // Navigate without updating the URL, overriding the default behavior
         * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
         * ```
         *
         * @see [Routing and Navigation guide](guide/routing/common-router-tasks)
         *
         */
        navigate(commands, extras = { skipLocationChange: false }) {
            validateCommands(commands);
            return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
        }
        /** Serializes a `UrlTree` into a string */
        serializeUrl(url) {
            return this.urlSerializer.serialize(url);
        }
        /** Parses a string into a `UrlTree` */
        parseUrl(url) {
            try {
                return this.urlSerializer.parse(url);
            }
            catch (_a) {
                return this.urlSerializer.parse('/');
            }
        }
        isActive(url, matchOptions) {
            let options;
            if (matchOptions === true) {
                options = Object.assign({}, exports.exactMatchOptions);
            }
            else if (matchOptions === false) {
                options = Object.assign({}, exports.subsetMatchOptions);
            }
            else {
                options = matchOptions;
            }
            if ((0, url_tree_1.isUrlTree)(url)) {
                return (0, url_tree_1.containsTree)(this.currentUrlTree, url, options);
            }
            const urlTree = this.parseUrl(url);
            return (0, url_tree_1.containsTree)(this.currentUrlTree, urlTree, options);
        }
        removeEmptyProps(params) {
            return Object.entries(params).reduce((result, [key, value]) => {
                if (value !== null && value !== undefined) {
                    result[key] = value;
                }
                return result;
            }, {});
        }
        scheduleNavigation(rawUrl, source, restoredState, extras, priorPromise) {
            if (this.disposed) {
                return Promise.resolve(false);
            }
            let resolve;
            let reject;
            let promise;
            if (priorPromise) {
                resolve = priorPromise.resolve;
                reject = priorPromise.reject;
                promise = priorPromise.promise;
            }
            else {
                promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
            }
            // Indicate that the navigation is happening.
            const taskId = this.pendingTasks.add();
            (0, navigations_1.afterNextNavigation)(this, () => {
                // Remove pending task in a microtask to allow for cancelled
                // initial navigations and redirects within the same task.
                queueMicrotask(() => this.pendingTasks.remove(taskId));
            });
            this.navigationTransitions.handleNavigationRequest({
                source,
                restoredState,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl,
                extras,
                resolve: resolve,
                reject: reject,
                promise,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
            });
            // Make sure that the error is propagated even though `processNavigations` catch
            // handler does not rethrow
            return promise.catch((e) => {
                return Promise.reject(e);
            });
        }
    };
    __setFunctionName(_classThis, "Router");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Router = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Router = _classThis;
})();
exports.Router = Router;
function validateCommands(commands) {
    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        if (cmd == null) {
            throw new core_1.ɵRuntimeError(4008 /* RuntimeErrorCode.NULLISH_COMMAND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `The requested path contains ${cmd} segment at index ${i}`);
        }
    }
}
