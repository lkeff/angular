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
exports.HistoryStateManager = exports.StateManager = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const events_1 = require("../events");
const router_config_1 = require("../router_config");
const router_state_1 = require("../router_state");
const url_handling_strategy_1 = require("../url_handling_strategy");
const url_tree_1 = require("../url_tree");
let StateManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useFactory: () => (0, core_1.inject)(HistoryStateManager) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StateManager = _classThis = class {
        constructor() {
            this.urlSerializer = (0, core_1.inject)(url_tree_1.UrlSerializer);
            this.options = (0, core_1.inject)(router_config_1.ROUTER_CONFIGURATION, { optional: true }) || {};
            this.canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
            this.location = (0, core_1.inject)(common_1.Location);
            this.urlHandlingStrategy = (0, core_1.inject)(url_handling_strategy_1.UrlHandlingStrategy);
            this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
            this.currentUrlTree = new url_tree_1.UrlTree();
            this.rawUrlTree = this.currentUrlTree;
            this.routerState = (0, router_state_1.createEmptyState)(null);
            this.stateMemento = this.createStateMemento();
        }
        /**
         * Returns the currently activated `UrlTree`.
         *
         * This `UrlTree` shows only URLs that the `Router` is configured to handle (through
         * `UrlHandlingStrategy`).
         *
         * The value is set after finding the route config tree to activate but before activating the
         * route.
         */
        getCurrentUrlTree() {
            return this.currentUrlTree;
        }
        /**
         * Returns a `UrlTree` that is represents what the browser is actually showing.
         *
         * In the life of a navigation transition:
         * 1. When a navigation begins, the raw `UrlTree` is updated to the full URL that's being
         * navigated to.
         * 2. During a navigation, redirects are applied, which might only apply to _part_ of the URL (due
         * to `UrlHandlingStrategy`).
         * 3. Just before activation, the raw `UrlTree` is updated to include the redirects on top of the
         * original raw URL.
         *
         * Note that this is _only_ here to support `UrlHandlingStrategy.extract` and
         * `UrlHandlingStrategy.shouldProcessUrl`. Without those APIs, the current `UrlTree` would not
         * deviated from the raw `UrlTree`.
         *
         * For `extract`, a raw `UrlTree` is needed because `extract` may only return part
         * of the navigation URL. Thus, the current `UrlTree` may only represent _part_ of the browser
         * URL. When a navigation gets cancelled and the router needs to reset the URL or a new navigation
         * occurs, it needs to know the _whole_ browser URL, not just the part handled by
         * `UrlHandlingStrategy`.
         * For `shouldProcessUrl`, when the return is `false`, the router ignores the navigation but
         * still updates the raw `UrlTree` with the assumption that the navigation was caused by the
         * location change listener due to a URL update by the AngularJS router. In this case, the router
         * still need to know what the browser's URL is for future navigations.
         */
        getRawUrlTree() {
            return this.rawUrlTree;
        }
        createBrowserPath({ finalUrl, initialUrl, targetBrowserUrl }) {
            const rawUrl = finalUrl !== undefined ? this.urlHandlingStrategy.merge(finalUrl, initialUrl) : initialUrl;
            const url = targetBrowserUrl !== null && targetBrowserUrl !== void 0 ? targetBrowserUrl : rawUrl;
            const path = url instanceof url_tree_1.UrlTree ? this.urlSerializer.serialize(url) : url;
            return path;
        }
        commitTransition({ targetRouterState, finalUrl, initialUrl }) {
            // If we are committing the transition after having a final URL and target state, we're updating
            // all pieces of the state. Otherwise, we likely skipped the transition (due to URL handling strategy)
            // and only want to update the rawUrlTree, which represents the browser URL (and doesn't necessarily match router state).
            if (finalUrl && targetRouterState) {
                this.currentUrlTree = finalUrl;
                this.rawUrlTree = this.urlHandlingStrategy.merge(finalUrl, initialUrl);
                this.routerState = targetRouterState;
            }
            else {
                this.rawUrlTree = initialUrl;
            }
        }
        /** Returns the current RouterState. */
        getRouterState() {
            return this.routerState;
        }
        updateStateMemento() {
            this.stateMemento = this.createStateMemento();
        }
        createStateMemento() {
            return {
                rawUrlTree: this.rawUrlTree,
                currentUrlTree: this.currentUrlTree,
                routerState: this.routerState,
            };
        }
        resetInternalState({ finalUrl }) {
            this.routerState = this.stateMemento.routerState;
            this.currentUrlTree = this.stateMemento.currentUrlTree;
            // Note here that we use the urlHandlingStrategy to get the reset `rawUrlTree` because it may be
            // configured to handle only part of the navigation URL. This means we would only want to reset
            // the part of the navigation handled by the Angular router rather than the whole URL. In
            // addition, the URLHandlingStrategy may be configured to specifically preserve parts of the URL
            // when merging, such as the query params so they are not lost on a refresh.
            this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl !== null && finalUrl !== void 0 ? finalUrl : this.rawUrlTree);
        }
    };
    __setFunctionName(_classThis, "StateManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StateManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StateManager = _classThis;
})();
exports.StateManager = StateManager;
let HistoryStateManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StateManager;
    var HistoryStateManager = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            /**
             * The id of the currently active page in the router.
             * Updated to the transition's target id on a successful navigation.
             *
             * This is used to track what page the router last activated. When an attempted navigation fails,
             * the router can then use this to compute how to restore the state back to the previously active
             * page.
             */
            this.currentPageId = 0;
            this.lastSuccessfulId = -1;
        }
        restoredState() {
            return this.location.getState();
        }
        /**
         * The ɵrouterPageId of whatever page is currently active in the browser history. This is
         * important for computing the target page id for new navigations because we need to ensure each
         * page id in the browser history is 1 more than the previous entry.
         */
        get browserPageId() {
            var _a, _b;
            if (this.canceledNavigationResolution !== 'computed') {
                return this.currentPageId;
            }
            return (_b = (_a = this.restoredState()) === null || _a === void 0 ? void 0 : _a.ɵrouterPageId) !== null && _b !== void 0 ? _b : this.currentPageId;
        }
        registerNonRouterCurrentEntryChangeListener(listener) {
            return this.location.subscribe((event) => {
                if (event['type'] === 'popstate') {
                    // The `setTimeout` was added in #12160 and is likely to support Angular/AngularJS
                    // hybrid apps.
                    setTimeout(() => {
                        listener(event['url'], event.state, 'popstate');
                    });
                }
            });
        }
        handleRouterEvent(e, currentTransition) {
            if (e instanceof events_1.NavigationStart) {
                this.updateStateMemento();
            }
            else if (e instanceof events_1.NavigationSkipped) {
                this.commitTransition(currentTransition);
            }
            else if (e instanceof events_1.RoutesRecognized) {
                if (this.urlUpdateStrategy === 'eager') {
                    if (!currentTransition.extras.skipLocationChange) {
                        this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
                    }
                }
            }
            else if (e instanceof events_1.BeforeActivateRoutes) {
                this.commitTransition(currentTransition);
                if (this.urlUpdateStrategy === 'deferred' && !currentTransition.extras.skipLocationChange) {
                    this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
                }
            }
            else if (e instanceof events_1.NavigationCancel &&
                e.code !== events_1.NavigationCancellationCode.SupersededByNewNavigation &&
                e.code !== events_1.NavigationCancellationCode.Redirect) {
                this.restoreHistory(currentTransition);
            }
            else if (e instanceof events_1.NavigationError) {
                this.restoreHistory(currentTransition, true);
            }
            else if (e instanceof events_1.NavigationEnd) {
                this.lastSuccessfulId = e.id;
                this.currentPageId = this.browserPageId;
            }
        }
        setBrowserUrl(path, { extras, id }) {
            const { replaceUrl, state } = extras;
            if (this.location.isCurrentPathEqualTo(path) || !!replaceUrl) {
                // replacements do not update the target page
                const currentBrowserPageId = this.browserPageId;
                const newState = Object.assign(Object.assign({}, state), this.generateNgRouterState(id, currentBrowserPageId));
                this.location.replaceState(path, '', newState);
            }
            else {
                const newState = Object.assign(Object.assign({}, state), this.generateNgRouterState(id, this.browserPageId + 1));
                this.location.go(path, '', newState);
            }
        }
        /**
         * Performs the necessary rollback action to restore the browser URL to the
         * state before the transition.
         */
        restoreHistory(navigation, restoringFromCaughtError = false) {
            if (this.canceledNavigationResolution === 'computed') {
                const currentBrowserPageId = this.browserPageId;
                const targetPagePosition = this.currentPageId - currentBrowserPageId;
                if (targetPagePosition !== 0) {
                    this.location.historyGo(targetPagePosition);
                }
                else if (this.getCurrentUrlTree() === navigation.finalUrl && targetPagePosition === 0) {
                    // We got to the activation stage (where currentUrlTree is set to the navigation's
                    // finalUrl), but we weren't moving anywhere in history (skipLocationChange or replaceUrl).
                    // We still need to reset the router state back to what it was when the navigation started.
                    this.resetInternalState(navigation);
                    this.resetUrlToCurrentUrlTree();
                }
                else {
                    // The browser URL and router state was not updated before the navigation cancelled so
                    // there's no restoration needed.
                }
            }
            else if (this.canceledNavigationResolution === 'replace') {
                // TODO(atscott): It seems like we should _always_ reset the state here. It would be a no-op
                // for `deferred` navigations that haven't change the internal state yet because guards
                // reject. For 'eager' navigations, it seems like we also really should reset the state
                // because the navigation was cancelled. Investigate if this can be done by running TGP.
                if (restoringFromCaughtError) {
                    this.resetInternalState(navigation);
                }
                this.resetUrlToCurrentUrlTree();
            }
        }
        resetUrlToCurrentUrlTree() {
            this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), '', this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
        }
        generateNgRouterState(navigationId, routerPageId) {
            if (this.canceledNavigationResolution === 'computed') {
                return { navigationId, ɵrouterPageId: routerPageId };
            }
            return { navigationId };
        }
    };
    __setFunctionName(_classThis, "HistoryStateManager");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HistoryStateManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HistoryStateManager = _classThis;
})();
exports.HistoryStateManager = HistoryStateManager;
