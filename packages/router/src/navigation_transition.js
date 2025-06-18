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
exports.NavigationTransitions = exports.NAVIGATION_ERROR_HANDLER = void 0;
exports.isBrowserTriggeredNavigation = isBrowserTriggeredNavigation;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const create_router_state_1 = require("./create_router_state");
const router_outlet_1 = require("./directives/router_outlet");
const events_1 = require("./events");
const models_1 = require("./models");
const navigation_canceling_error_1 = require("./navigation_canceling_error");
const activate_routes_1 = require("./operators/activate_routes");
const check_guards_1 = require("./operators/check_guards");
const recognize_1 = require("./operators/recognize");
const resolve_data_1 = require("./operators/resolve_data");
const switch_tap_1 = require("./operators/switch_tap");
const page_title_strategy_1 = require("./page_title_strategy");
const router_config_1 = require("./router_config");
const router_config_loader_1 = require("./router_config_loader");
const router_outlet_context_1 = require("./router_outlet_context");
const router_state_1 = require("./router_state");
const url_handling_strategy_1 = require("./url_handling_strategy");
const url_tree_1 = require("./url_tree");
const preactivation_1 = require("./utils/preactivation");
const view_transition_1 = require("./utils/view_transition");
exports.NAVIGATION_ERROR_HANDLER = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'navigation error handler' : '');
let NavigationTransitions = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NavigationTransitions = _classThis = class {
        get hasRequestedNavigation() {
            return this.navigationId !== 0;
        }
        constructor() {
            this.currentNavigation = null;
            this.currentTransition = null;
            this.lastSuccessfulNavigation = null;
            /**
             * These events are used to communicate back to the Router about the state of the transition. The
             * Router wants to respond to these events in various ways. Because the `NavigationTransition`
             * class is not public, this event subject is not publicly exposed.
             */
            this.events = new rxjs_1.Subject();
            /**
             * Used to abort the current transition with an error.
             */
            this.transitionAbortWithErrorSubject = new rxjs_1.Subject();
            this.configLoader = (0, core_1.inject)(router_config_loader_1.RouterConfigLoader);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.urlSerializer = (0, core_1.inject)(url_tree_1.UrlSerializer);
            this.rootContexts = (0, core_1.inject)(router_outlet_context_1.ChildrenOutletContexts);
            this.location = (0, core_1.inject)(common_1.Location);
            this.inputBindingEnabled = (0, core_1.inject)(router_outlet_1.INPUT_BINDER, { optional: true }) !== null;
            this.titleStrategy = (0, core_1.inject)(page_title_strategy_1.TitleStrategy);
            this.options = (0, core_1.inject)(router_config_1.ROUTER_CONFIGURATION, { optional: true }) || {};
            this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly';
            this.urlHandlingStrategy = (0, core_1.inject)(url_handling_strategy_1.UrlHandlingStrategy);
            this.createViewTransition = (0, core_1.inject)(view_transition_1.CREATE_VIEW_TRANSITION, { optional: true });
            this.navigationErrorHandler = (0, core_1.inject)(exports.NAVIGATION_ERROR_HANDLER, { optional: true });
            this.navigationId = 0;
            /**
             * Hook that enables you to pause navigation after the preactivation phase.
             * Used by `RouterModule`.
             *
             * @internal
             */
            this.afterPreactivation = () => (0, rxjs_1.of)(void 0);
            /** @internal */
            this.rootComponentType = null;
            this.destroyed = false;
            const onLoadStart = (r) => this.events.next(new events_1.RouteConfigLoadStart(r));
            const onLoadEnd = (r) => this.events.next(new events_1.RouteConfigLoadEnd(r));
            this.configLoader.onLoadEndListener = onLoadEnd;
            this.configLoader.onLoadStartListener = onLoadStart;
            this.destroyRef.onDestroy(() => {
                this.destroyed = true;
            });
        }
        complete() {
            var _a;
            (_a = this.transitions) === null || _a === void 0 ? void 0 : _a.complete();
        }
        handleNavigationRequest(request) {
            var _a;
            const id = ++this.navigationId;
            (_a = this.transitions) === null || _a === void 0 ? void 0 : _a.next(Object.assign(Object.assign({}, request), { extractedUrl: this.urlHandlingStrategy.extract(request.rawUrl), targetSnapshot: null, targetRouterState: null, guards: { canActivateChecks: [], canDeactivateChecks: [] }, guardsResult: null, abortController: new AbortController(), id }));
        }
        setupNavigations(router) {
            this.transitions = new rxjs_1.BehaviorSubject(null);
            return this.transitions.pipe((0, operators_1.filter)((t) => t !== null), 
            // Using switchMap so we cancel executing navigations when a new one comes in
            (0, operators_1.switchMap)((overallTransitionState) => {
                let completedOrAborted = false;
                return (0, rxjs_1.of)(overallTransitionState).pipe((0, operators_1.switchMap)((t) => {
                    var _a;
                    // It is possible that `switchMap` fails to cancel previous navigations if a new one happens synchronously while the operator
                    // is processing the `next` notification of that previous navigation. This can happen when a new navigation (say 2) cancels a
                    // previous one (1) and yet another navigation (3) happens synchronously in response to the `NavigationCancel` event for (1).
                    // https://github.com/ReactiveX/rxjs/issues/7455
                    if (this.navigationId > overallTransitionState.id) {
                        const cancellationReason = typeof ngDevMode === 'undefined' || ngDevMode
                            ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}`
                            : '';
                        this.cancelNavigationTransition(overallTransitionState, cancellationReason, events_1.NavigationCancellationCode.SupersededByNewNavigation);
                        return rxjs_1.EMPTY;
                    }
                    this.currentTransition = overallTransitionState;
                    // Store the Navigation object
                    this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.rawUrl,
                        extractedUrl: t.extractedUrl,
                        targetBrowserUrl: typeof t.extras.browserUrl === 'string'
                            ? this.urlSerializer.parse(t.extras.browserUrl)
                            : t.extras.browserUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: !this.lastSuccessfulNavigation
                            ? null
                            : Object.assign(Object.assign({}, this.lastSuccessfulNavigation), { previousNavigation: null }),
                        abort: () => t.abortController.abort(),
                    };
                    const urlTransition = !router.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
                    const onSameUrlNavigation = (_a = t.extras.onSameUrlNavigation) !== null && _a !== void 0 ? _a : router.onSameUrlNavigation;
                    if (!urlTransition && onSameUrlNavigation !== 'reload') {
                        const reason = typeof ngDevMode === 'undefined' || ngDevMode
                            ? `Navigation to ${t.rawUrl} was ignored because it is the same as the current Router URL.`
                            : '';
                        this.events.next(new events_1.NavigationSkipped(t.id, this.urlSerializer.serialize(t.rawUrl), reason, events_1.NavigationSkippedCode.IgnoredSameUrlNavigation));
                        t.resolve(false);
                        return rxjs_1.EMPTY;
                    }
                    if (this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) {
                        return (0, rxjs_1.of)(t).pipe(
                        // Fire NavigationStart event
                        (0, operators_1.switchMap)((t) => {
                            this.events.next(new events_1.NavigationStart(t.id, this.urlSerializer.serialize(t.extractedUrl), t.source, t.restoredState));
                            if (t.id !== this.navigationId) {
                                return rxjs_1.EMPTY;
                            }
                            // This delay is required to match old behavior that forced
                            // navigation to always be async
                            return Promise.resolve(t);
                        }), 
                        // Recognize
                        (0, recognize_1.recognize)(this.environmentInjector, this.configLoader, this.rootComponentType, router.config, this.urlSerializer, this.paramsInheritanceStrategy), 
                        // Update URL if in `eager` update mode
                        (0, operators_1.tap)((t) => {
                            overallTransitionState.targetSnapshot = t.targetSnapshot;
                            overallTransitionState.urlAfterRedirects = t.urlAfterRedirects;
                            this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), { finalUrl: t.urlAfterRedirects });
                            // Fire RoutesRecognized
                            const routesRecognized = new events_1.RoutesRecognized(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                            this.events.next(routesRecognized);
                        }));
                    }
                    else if (urlTransition &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.currentRawUrl)) {
                        /* When the current URL shouldn't be processed, but the previous one
                         * was, we handle this "error condition" by navigating to the
                         * previously successful URL, but leaving the URL intact.*/
                        const { id, extractedUrl, source, restoredState, extras } = t;
                        const navStart = new events_1.NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
                        this.events.next(navStart);
                        const targetSnapshot = (0, router_state_1.createEmptyState)(this.rootComponentType).snapshot;
                        this.currentTransition = overallTransitionState = Object.assign(Object.assign({}, t), { targetSnapshot, urlAfterRedirects: extractedUrl, extras: Object.assign(Object.assign({}, extras), { skipLocationChange: false, replaceUrl: false }) });
                        this.currentNavigation.finalUrl = extractedUrl;
                        return (0, rxjs_1.of)(overallTransitionState);
                    }
                    else {
                        /* When neither the current or previous URL can be processed, do
                         * nothing other than update router's internal reference to the
                         * current "settled" URL. This way the next navigation will be coming
                         * from the current URL in the browser.
                         */
                        const reason = typeof ngDevMode === 'undefined' || ngDevMode
                            ? `Navigation was ignored because the UrlHandlingStrategy` +
                                ` indicated neither the current URL ${t.currentRawUrl} nor target URL ${t.rawUrl} should be processed.`
                            : '';
                        this.events.next(new events_1.NavigationSkipped(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, events_1.NavigationSkippedCode.IgnoredByUrlHandlingStrategy));
                        t.resolve(false);
                        return rxjs_1.EMPTY;
                    }
                }), 
                // --- GUARDS ---
                (0, operators_1.tap)((t) => {
                    const guardsStart = new events_1.GuardsCheckStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                    this.events.next(guardsStart);
                }), (0, operators_1.map)((t) => {
                    this.currentTransition = overallTransitionState = Object.assign(Object.assign({}, t), { guards: (0, preactivation_1.getAllRouteGuards)(t.targetSnapshot, t.currentSnapshot, this.rootContexts) });
                    return overallTransitionState;
                }), (0, check_guards_1.checkGuards)(this.environmentInjector, (evt) => this.events.next(evt)), (0, operators_1.tap)((t) => {
                    overallTransitionState.guardsResult = t.guardsResult;
                    if (t.guardsResult && typeof t.guardsResult !== 'boolean') {
                        throw (0, navigation_canceling_error_1.redirectingNavigationError)(this.urlSerializer, t.guardsResult);
                    }
                    const guardsEnd = new events_1.GuardsCheckEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                    this.events.next(guardsEnd);
                }), (0, operators_1.filter)((t) => {
                    if (!t.guardsResult) {
                        this.cancelNavigationTransition(t, '', events_1.NavigationCancellationCode.GuardRejected);
                        return false;
                    }
                    return true;
                }), 
                // --- RESOLVE ---
                (0, switch_tap_1.switchTap)((t) => {
                    if (t.guards.canActivateChecks.length === 0) {
                        return undefined;
                    }
                    return (0, rxjs_1.of)(t).pipe((0, operators_1.tap)((t) => {
                        const resolveStart = new events_1.ResolveStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                        this.events.next(resolveStart);
                    }), (0, operators_1.switchMap)((t) => {
                        let dataResolved = false;
                        return (0, rxjs_1.of)(t).pipe((0, resolve_data_1.resolveData)(this.paramsInheritanceStrategy, this.environmentInjector), (0, operators_1.tap)({
                            next: () => (dataResolved = true),
                            complete: () => {
                                if (!dataResolved) {
                                    this.cancelNavigationTransition(t, typeof ngDevMode === 'undefined' || ngDevMode
                                        ? `At least one route resolver didn't emit any value.`
                                        : '', events_1.NavigationCancellationCode.NoDataFromResolver);
                                }
                            },
                        }));
                    }), (0, operators_1.tap)((t) => {
                        const resolveEnd = new events_1.ResolveEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                        this.events.next(resolveEnd);
                    }));
                }), 
                // --- LOAD COMPONENTS ---
                (0, switch_tap_1.switchTap)((t) => {
                    const loadComponents = (route) => {
                        var _a;
                        const loaders = [];
                        if (((_a = route.routeConfig) === null || _a === void 0 ? void 0 : _a.loadComponent) && !route.routeConfig._loadedComponent) {
                            loaders.push(this.configLoader.loadComponent(route.routeConfig).pipe((0, operators_1.tap)((loadedComponent) => {
                                route.component = loadedComponent;
                            }), (0, operators_1.map)(() => void 0)));
                        }
                        for (const child of route.children) {
                            loaders.push(...loadComponents(child));
                        }
                        return loaders;
                    };
                    return (0, rxjs_1.combineLatest)(loadComponents(t.targetSnapshot.root)).pipe((0, operators_1.defaultIfEmpty)(null), (0, operators_1.take)(1));
                }), (0, switch_tap_1.switchTap)(() => this.afterPreactivation()), (0, operators_1.switchMap)(() => {
                    var _a;
                    const { currentSnapshot, targetSnapshot } = overallTransitionState;
                    const viewTransitionStarted = (_a = this.createViewTransition) === null || _a === void 0 ? void 0 : _a.call(this, this.environmentInjector, currentSnapshot.root, targetSnapshot.root);
                    // If view transitions are enabled, block the navigation until the view
                    // transition callback starts. Otherwise, continue immediately.
                    return viewTransitionStarted
                        ? (0, rxjs_1.from)(viewTransitionStarted).pipe((0, operators_1.map)(() => overallTransitionState))
                        : (0, rxjs_1.of)(overallTransitionState);
                }), (0, operators_1.map)((t) => {
                    const targetRouterState = (0, create_router_state_1.createRouterState)(router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                    this.currentTransition = overallTransitionState = Object.assign(Object.assign({}, t), { targetRouterState });
                    this.currentNavigation.targetRouterState = targetRouterState;
                    return overallTransitionState;
                }), (0, operators_1.tap)(() => {
                    this.events.next(new events_1.BeforeActivateRoutes());
                }), (0, activate_routes_1.activateRoutes)(this.rootContexts, router.routeReuseStrategy, (evt) => this.events.next(evt), this.inputBindingEnabled), 
                // Ensure that if some observable used to drive the transition doesn't
                // complete, the navigation still finalizes This should never happen, but
                // this is done as a safety measure to avoid surfacing this error (#49567).
                (0, operators_1.take)(1), (0, operators_1.takeUntil)(new rxjs_1.Observable((subscriber) => {
                    const abortSignal = overallTransitionState.abortController.signal;
                    const handler = () => subscriber.next();
                    abortSignal.addEventListener('abort', handler);
                    return () => abortSignal.removeEventListener('abort', handler);
                }).pipe(
                // Ignore aborts if we are already completed, canceled, or are in the activation stage (we have targetRouterState)
                (0, operators_1.filter)(() => !completedOrAborted && !overallTransitionState.targetRouterState), (0, operators_1.tap)(() => {
                    this.cancelNavigationTransition(overallTransitionState, overallTransitionState.abortController.signal.reason + '', events_1.NavigationCancellationCode.Aborted);
                }))), (0, operators_1.tap)({
                    next: (t) => {
                        var _a;
                        completedOrAborted = true;
                        this.lastSuccessfulNavigation = this.currentNavigation;
                        this.events.next(new events_1.NavigationEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects)));
                        (_a = this.titleStrategy) === null || _a === void 0 ? void 0 : _a.updateTitle(t.targetRouterState.snapshot);
                        t.resolve(true);
                    },
                    complete: () => {
                        completedOrAborted = true;
                    },
                }), 
                // There used to be a lot more logic happening directly within the
                // transition Observable. Some of this logic has been refactored out to
                // other places but there may still be errors that happen there. This gives
                // us a way to cancel the transition from the outside. This may also be
                // required in the future to support something like the abort signal of the
                // Navigation API where the navigation gets aborted from outside the
                // transition.
                (0, operators_1.takeUntil)(this.transitionAbortWithErrorSubject.pipe((0, operators_1.tap)((err) => {
                    throw err;
                }))), (0, operators_1.finalize)(() => {
                    var _a;
                    /* When the navigation stream finishes either through error or success,
                     * we set the `completed` or `errored` flag. However, there are some
                     * situations where we could get here without either of those being set.
                     * For instance, a redirect during NavigationStart. Therefore, this is a
                     * catch-all to make sure the NavigationCancel event is fired when a
                     * navigation gets cancelled but not caught by other means. */
                    if (!completedOrAborted) {
                        const cancelationReason = typeof ngDevMode === 'undefined' || ngDevMode
                            ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}`
                            : '';
                        this.cancelNavigationTransition(overallTransitionState, cancelationReason, events_1.NavigationCancellationCode.SupersededByNewNavigation);
                    }
                    // Only clear current navigation if it is still set to the one that
                    // finalized.
                    if (((_a = this.currentTransition) === null || _a === void 0 ? void 0 : _a.id) === overallTransitionState.id) {
                        this.currentNavigation = null;
                        this.currentTransition = null;
                    }
                }), (0, operators_1.catchError)((e) => {
                    var _a;
                    // If the application is already destroyed, the catch block should not
                    // execute anything in practice because other resources have already
                    // been released and destroyed.
                    if (this.destroyed) {
                        overallTransitionState.resolve(false);
                        return rxjs_1.EMPTY;
                    }
                    completedOrAborted = true;
                    /* This error type is issued during Redirect, and is handled as a
                     * cancellation rather than an error. */
                    if ((0, navigation_canceling_error_1.isNavigationCancelingError)(e)) {
                        this.events.next(new events_1.NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e.message, e.cancellationCode));
                        // When redirecting, we need to delay resolving the navigation
                        // promise and push it to the redirect navigation
                        if (!(0, navigation_canceling_error_1.isRedirectingNavigationCancelingError)(e)) {
                            overallTransitionState.resolve(false);
                        }
                        else {
                            this.events.next(new events_1.RedirectRequest(e.url, e.navigationBehaviorOptions));
                        }
                        /* All other errors should reset to the router's internal URL reference
                         * to the pre-error state. */
                    }
                    else {
                        const navigationError = new events_1.NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e, (_a = overallTransitionState.targetSnapshot) !== null && _a !== void 0 ? _a : undefined);
                        try {
                            const navigationErrorHandlerResult = (0, core_1.runInInjectionContext)(this.environmentInjector, () => { var _a; return (_a = this.navigationErrorHandler) === null || _a === void 0 ? void 0 : _a.call(this, navigationError); });
                            if (navigationErrorHandlerResult instanceof models_1.RedirectCommand) {
                                const { message, cancellationCode } = (0, navigation_canceling_error_1.redirectingNavigationError)(this.urlSerializer, navigationErrorHandlerResult);
                                this.events.next(new events_1.NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), message, cancellationCode));
                                this.events.next(new events_1.RedirectRequest(navigationErrorHandlerResult.redirectTo, navigationErrorHandlerResult.navigationBehaviorOptions));
                            }
                            else {
                                this.events.next(navigationError);
                                throw e;
                            }
                        }
                        catch (ee) {
                            // TODO(atscott): consider flipping the default behavior of
                            // resolveNavigationPromiseOnError to be `resolve(false)` when
                            // undefined. This is the most sane thing to do given that
                            // applications very rarely handle the promise rejection and, as a
                            // result, would get "unhandled promise rejection" console logs.
                            // The vast majority of applications would not be affected by this
                            // change so omitting a migration seems reasonable. Instead,
                            // applications that rely on rejection can specifically opt-in to the
                            // old behavior.
                            if (this.options.resolveNavigationPromiseOnError) {
                                overallTransitionState.resolve(false);
                            }
                            else {
                                overallTransitionState.reject(ee);
                            }
                        }
                    }
                    return rxjs_1.EMPTY;
                }));
                // casting because `pipe` returns observable({}) when called with 8+ arguments
            }));
        }
        cancelNavigationTransition(t, reason, code) {
            const navCancel = new events_1.NavigationCancel(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, code);
            this.events.next(navCancel);
            t.resolve(false);
        }
        /**
         * @returns Whether we're navigating to somewhere that is not what the Router is
         * currently set to.
         */
        isUpdatingInternalState() {
            var _a, _b;
            // TODO(atscott): The serializer should likely be used instead of
            // `UrlTree.toString()`. Custom serializers are often written to handle
            // things better than the default one (objects, for example will be
            // [Object object] with the custom serializer and be "the same" when they
            // aren't).
            // (Same for isUpdatedBrowserUrl)
            return (((_a = this.currentTransition) === null || _a === void 0 ? void 0 : _a.extractedUrl.toString()) !==
                ((_b = this.currentTransition) === null || _b === void 0 ? void 0 : _b.currentUrlTree.toString()));
        }
        /**
         * @returns Whether we're updating the browser URL to something new (navigation is going
         * to somewhere not displayed in the URL bar and we will update the URL
         * bar if navigation succeeds).
         */
        isUpdatedBrowserUrl() {
            var _a, _b, _c, _d;
            // The extracted URL is the part of the URL that this application cares about. `extract` may
            // return only part of the browser URL and that part may have not changed even if some other
            // portion of the URL did.
            const currentBrowserUrl = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true)));
            const targetBrowserUrl = (_b = (_a = this.currentNavigation) === null || _a === void 0 ? void 0 : _a.targetBrowserUrl) !== null && _b !== void 0 ? _b : (_c = this.currentNavigation) === null || _c === void 0 ? void 0 : _c.extractedUrl;
            return (currentBrowserUrl.toString() !== (targetBrowserUrl === null || targetBrowserUrl === void 0 ? void 0 : targetBrowserUrl.toString()) &&
                !((_d = this.currentNavigation) === null || _d === void 0 ? void 0 : _d.extras.skipLocationChange));
        }
    };
    __setFunctionName(_classThis, "NavigationTransitions");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavigationTransitions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavigationTransitions = _classThis;
})();
exports.NavigationTransitions = NavigationTransitions;
function isBrowserTriggeredNavigation(source) {
    return source !== events_1.IMPERATIVE_NAVIGATION;
}
