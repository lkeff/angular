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
exports.Location = void 0;
exports.createLocation = createLocation;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const location_strategy_1 = require("./location_strategy");
const util_1 = require("./util");
/**
 * @description
 *
 * A service that applications can use to interact with a browser's URL.
 *
 * Depending on the `LocationStrategy` used, `Location` persists
 * to the URL's path or the URL's hash segment.
 *
 * @usageNotes
 *
 * It's better to use the `Router.navigate()` service to trigger route changes. Use
 * `Location` only if you need to interact with or create normalized URLs outside of
 * routing.
 *
 * `Location` is responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
 *
 * ### Example
 *
 * {@example common/location/ts/path_location_component.ts region='LocationComponent'}
 *
 * @publicApi
 */
let Location = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
            // See #23917
            useFactory: createLocation,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Location = _classThis = class {
        constructor(locationStrategy) {
            /** @internal */
            this._subject = new rxjs_1.Subject();
            /** @internal */
            this._urlChangeListeners = [];
            /** @internal */
            this._urlChangeSubscription = null;
            this._locationStrategy = locationStrategy;
            const baseHref = this._locationStrategy.getBaseHref();
            // Note: This class's interaction with base HREF does not fully follow the rules
            // outlined in the spec https://www.freesoft.org/CIE/RFC/1808/18.htm.
            // Instead of trying to fix individual bugs with more and more code, we should
            // investigate using the URL constructor and providing the base as a second
            // argument.
            // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#parameters
            this._basePath = _stripOrigin((0, util_1.stripTrailingSlash)(_stripIndexHtml(baseHref)));
            this._locationStrategy.onPopState((ev) => {
                this._subject.next({
                    'url': this.path(true),
                    'pop': true,
                    'state': ev.state,
                    'type': ev.type,
                });
            });
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this._urlChangeListeners = [];
        }
        /**
         * Normalizes the URL path for this location.
         *
         * @param includeHash True to include an anchor fragment in the path.
         *
         * @returns The normalized URL path.
         */
        // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
        // removed.
        path(includeHash = false) {
            return this.normalize(this._locationStrategy.path(includeHash));
        }
        /**
         * Reports the current state of the location history.
         * @returns The current value of the `history.state` object.
         */
        getState() {
            return this._locationStrategy.getState();
        }
        /**
         * Normalizes the given path and compares to the current normalized path.
         *
         * @param path The given URL path.
         * @param query Query parameters.
         *
         * @returns True if the given URL path is equal to the current normalized path, false
         * otherwise.
         */
        isCurrentPathEqualTo(path, query = '') {
            return this.path() == this.normalize(path + (0, util_1.normalizeQueryParams)(query));
        }
        /**
         * Normalizes a URL path by stripping any trailing slashes.
         *
         * @param url String representing a URL.
         *
         * @returns The normalized URL string.
         */
        normalize(url) {
            return Location.stripTrailingSlash(_stripBasePath(this._basePath, _stripIndexHtml(url)));
        }
        /**
         * Normalizes an external URL path.
         * If the given URL doesn't begin with a leading slash (`'/'`), adds one
         * before normalizing. Adds a hash if `HashLocationStrategy` is
         * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
         *
         * @param url String representing a URL.
         *
         * @returns  A normalized platform-specific URL.
         */
        prepareExternalUrl(url) {
            if (url && url[0] !== '/') {
                url = '/' + url;
            }
            return this._locationStrategy.prepareExternalUrl(url);
        }
        // TODO: rename this method to pushState
        /**
         * Changes the browser's URL to a normalized version of a given URL, and pushes a
         * new item onto the platform's history.
         *
         * @param path  URL path to normalize.
         * @param query Query parameters.
         * @param state Location history state.
         *
         */
        go(path, query = '', state = null) {
            this._locationStrategy.pushState(state, '', path, query);
            this._notifyUrlChangeListeners(this.prepareExternalUrl(path + (0, util_1.normalizeQueryParams)(query)), state);
        }
        /**
         * Changes the browser's URL to a normalized version of the given URL, and replaces
         * the top item on the platform's history stack.
         *
         * @param path  URL path to normalize.
         * @param query Query parameters.
         * @param state Location history state.
         */
        replaceState(path, query = '', state = null) {
            this._locationStrategy.replaceState(state, '', path, query);
            this._notifyUrlChangeListeners(this.prepareExternalUrl(path + (0, util_1.normalizeQueryParams)(query)), state);
        }
        /**
         * Navigates forward in the platform's history.
         */
        forward() {
            this._locationStrategy.forward();
        }
        /**
         * Navigates back in the platform's history.
         */
        back() {
            this._locationStrategy.back();
        }
        /**
         * Navigate to a specific page from session history, identified by its relative position to the
         * current page.
         *
         * @param relativePosition  Position of the target page in the history relative to the current
         *     page.
         * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
         * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
         * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
         * when `relativePosition` equals 0.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
         */
        historyGo(relativePosition = 0) {
            var _a, _b;
            (_b = (_a = this._locationStrategy).historyGo) === null || _b === void 0 ? void 0 : _b.call(_a, relativePosition);
        }
        /**
         * Registers a URL change listener. Use to catch updates performed by the Angular
         * framework that are not detectible through "popstate" or "hashchange" events.
         *
         * @param fn The change handler function, which take a URL and a location history state.
         * @returns A function that, when executed, unregisters a URL change listener.
         */
        onUrlChange(fn) {
            var _a;
            this._urlChangeListeners.push(fn);
            (_a = this._urlChangeSubscription) !== null && _a !== void 0 ? _a : (this._urlChangeSubscription = this.subscribe((v) => {
                this._notifyUrlChangeListeners(v.url, v.state);
            }));
            return () => {
                var _a;
                const fnIndex = this._urlChangeListeners.indexOf(fn);
                this._urlChangeListeners.splice(fnIndex, 1);
                if (this._urlChangeListeners.length === 0) {
                    (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                    this._urlChangeSubscription = null;
                }
            };
        }
        /** @internal */
        _notifyUrlChangeListeners(url = '', state) {
            this._urlChangeListeners.forEach((fn) => fn(url, state));
        }
        /**
         * Subscribes to the platform's `popState` events.
         *
         * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
         * `Location.onUrlChange()` to subscribe to URL changes instead.
         *
         * @param value Event that is triggered when the state history changes.
         * @param exception The exception to throw.
         *
         * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
         *
         * @returns Subscribed events.
         */
        subscribe(onNext, onThrow, onReturn) {
            return this._subject.subscribe({
                next: onNext,
                error: onThrow !== null && onThrow !== void 0 ? onThrow : undefined,
                complete: onReturn !== null && onReturn !== void 0 ? onReturn : undefined,
            });
        }
    };
    __setFunctionName(_classThis, "Location");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Location = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * Normalizes URL parameters by prepending with `?` if needed.
     *
     * @param  params String of URL parameters.
     *
     * @returns The normalized URL parameters string.
     */
    _classThis.normalizeQueryParams = util_1.normalizeQueryParams;
    /**
     * Joins two parts of a URL with a slash if needed.
     *
     * @param start  URL string
     * @param end    URL string
     *
     *
     * @returns The joined URL string.
     */
    _classThis.joinWithSlash = util_1.joinWithSlash;
    /**
     * Removes a trailing slash from a URL string if needed.
     * Looks for the first occurrence of either `#`, `?`, or the end of the
     * line as `/` characters and removes the trailing slash if one exists.
     *
     * @param url URL string.
     *
     * @returns The URL string, modified if needed.
     */
    _classThis.stripTrailingSlash = util_1.stripTrailingSlash;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Location = _classThis;
})();
exports.Location = Location;
function createLocation() {
    return new Location((0, core_1.ɵɵinject)(location_strategy_1.LocationStrategy));
}
function _stripBasePath(basePath, url) {
    if (!basePath || !url.startsWith(basePath)) {
        return url;
    }
    const strippedUrl = url.substring(basePath.length);
    if (strippedUrl === '' || ['/', ';', '?', '#'].includes(strippedUrl[0])) {
        return strippedUrl;
    }
    return url;
}
function _stripIndexHtml(url) {
    return url.replace(/\/index.html$/, '');
}
function _stripOrigin(baseHref) {
    // DO NOT REFACTOR! Previously, this check looked like this:
    // `/^(https?:)?\/\//.test(baseHref)`, but that resulted in
    // syntactically incorrect code after Closure Compiler minification.
    // This was likely caused by a bug in Closure Compiler, but
    // for now, the check is rewritten to use `new RegExp` instead.
    const isAbsoluteUrl = new RegExp('^(https?:)?//').test(baseHref);
    if (isAbsoluteUrl) {
        const [, pathname] = baseHref.split(/\/\/[^\/]+/);
        return pathname;
    }
    return baseHref;
}
