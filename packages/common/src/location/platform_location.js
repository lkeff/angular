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
exports.BrowserPlatformLocation = exports.LOCATION_INITIALIZED = exports.PlatformLocation = void 0;
const core_1 = require("@angular/core");
const dom_adapter_1 = require("../dom_adapter");
/**
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * `PlatformLocation` encapsulates all calls to DOM APIs, which allows the Router to be
 * platform-agnostic.
 * This means that we can have different implementation of `PlatformLocation` for the different
 * platforms that Angular supports. For example, `@angular/platform-browser` provides an
 * implementation specific to the browser environment, while `@angular/platform-server` provides
 * one suitable for use with server-side rendering.
 *
 * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
 * when they need to interact with the DOM APIs like pushState, popState, etc.
 *
 * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
 * by the {@link /api/router/Router Router} in order to navigate between routes. Since all interactions between
 * {@link /api/router/Router Router} /
 * {@link Location} / {@link LocationStrategy} and DOM APIs flow through the `PlatformLocation`
 * class, they are all platform-agnostic.
 *
 * @publicApi
 */
let PlatformLocation = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'platform', useFactory: () => (0, core_1.inject)(BrowserPlatformLocation) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlatformLocation = _classThis = class {
        historyGo(relativePosition) {
            throw new Error(ngDevMode ? 'Not implemented' : '');
        }
    };
    __setFunctionName(_classThis, "PlatformLocation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlatformLocation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlatformLocation = _classThis;
})();
exports.PlatformLocation = PlatformLocation;
/**
 * @description
 * Indicates when a location is initialized.
 *
 * @publicApi
 */
exports.LOCATION_INITIALIZED = new core_1.InjectionToken(ngDevMode ? 'Location Initialized' : '');
/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * @publicApi
 */
let BrowserPlatformLocation = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'platform',
            useFactory: () => new BrowserPlatformLocation(),
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = PlatformLocation;
    var BrowserPlatformLocation = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._doc = (0, core_1.inject)(core_1.DOCUMENT);
            this._location = window.location;
            this._history = window.history;
        }
        getBaseHrefFromDOM() {
            return (0, dom_adapter_1.getDOM)().getBaseHref(this._doc);
        }
        onPopState(fn) {
            const window = (0, dom_adapter_1.getDOM)().getGlobalEventTarget(this._doc, 'window');
            window.addEventListener('popstate', fn, false);
            return () => window.removeEventListener('popstate', fn);
        }
        onHashChange(fn) {
            const window = (0, dom_adapter_1.getDOM)().getGlobalEventTarget(this._doc, 'window');
            window.addEventListener('hashchange', fn, false);
            return () => window.removeEventListener('hashchange', fn);
        }
        get href() {
            return this._location.href;
        }
        get protocol() {
            return this._location.protocol;
        }
        get hostname() {
            return this._location.hostname;
        }
        get port() {
            return this._location.port;
        }
        get pathname() {
            return this._location.pathname;
        }
        get search() {
            return this._location.search;
        }
        get hash() {
            return this._location.hash;
        }
        set pathname(newPath) {
            this._location.pathname = newPath;
        }
        pushState(state, title, url) {
            this._history.pushState(state, title, url);
        }
        replaceState(state, title, url) {
            this._history.replaceState(state, title, url);
        }
        forward() {
            this._history.forward();
        }
        back() {
            this._history.back();
        }
        historyGo(relativePosition = 0) {
            this._history.go(relativePosition);
        }
        getState() {
            return this._history.state;
        }
    };
    __setFunctionName(_classThis, "BrowserPlatformLocation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BrowserPlatformLocation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BrowserPlatformLocation = _classThis;
})();
exports.BrowserPlatformLocation = BrowserPlatformLocation;
