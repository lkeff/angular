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
exports.PathLocationStrategy = exports.APP_BASE_HREF = exports.LocationStrategy = void 0;
const core_1 = require("@angular/core");
const util_1 = require("./util");
/**
 * Enables the `Location` service to read route state from the browser's URL.
 * Angular provides two strategies:
 * `HashLocationStrategy` and `PathLocationStrategy`.
 *
 * Applications should use the `Router` or `Location` services to
 * interact with application route state.
 *
 * For instance, `HashLocationStrategy` produces URLs like
 * <code class="no-auto-link">http://example.com/#/foo</code>,
 * and `PathLocationStrategy` produces
 * <code class="no-auto-link">http://example.com/foo</code> as an equivalent URL.
 *
 * See these two classes for more.
 *
 * @publicApi
 */
let LocationStrategy = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useFactory: () => (0, core_1.inject)(PathLocationStrategy) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LocationStrategy = _classThis = class {
        historyGo(relativePosition) {
            throw new Error(ngDevMode ? 'Not implemented' : '');
        }
    };
    __setFunctionName(_classThis, "LocationStrategy");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationStrategy = _classThis;
})();
exports.LocationStrategy = LocationStrategy;
/**
 * A predefined DI token for the base href
 * to be used with the `PathLocationStrategy`.
 * The base href is the URL prefix that should be preserved when generating
 * and recognizing URLs.
 *
 * @usageNotes
 *
 * The following example shows how to use this token to configure the root app injector
 * with a base href value, so that the DI framework can supply the dependency anywhere in the app.
 *
 * ```ts
 * import {NgModule} from '@angular/core';
 * import {APP_BASE_HREF} from '@angular/common';
 *
 * @NgModule({
 *   providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
exports.APP_BASE_HREF = new core_1.InjectionToken(ngDevMode ? 'appBaseHref' : '');
/**
 * @description
 * A {@link LocationStrategy} used to configure the {@link Location} service to
 * represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * If you're using `PathLocationStrategy`, you may provide a {@link APP_BASE_HREF}
 * or add a `<base href>` element to the document to override the default.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app/'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`. To ensure all relative URIs resolve correctly,
 * the `<base href>` and/or `APP_BASE_HREF` should end with a `/`.
 *
 * Similarly, if you add `<base href='/my/app/'/>` to the document and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * Note that when using `PathLocationStrategy`, neither the query nor
 * the fragment in the `<base href>` will be preserved, as outlined
 * by the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/location/ts/path_location_component.ts region='LocationComponent'}
 *
 * @publicApi
 */
let PathLocationStrategy = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = LocationStrategy;
    var PathLocationStrategy = _classThis = class extends _classSuper {
        constructor(_platformLocation, href) {
            var _a, _b, _c;
            super();
            this._platformLocation = _platformLocation;
            this._removeListenerFns = [];
            this._baseHref =
                (_c = (_a = href !== null && href !== void 0 ? href : this._platformLocation.getBaseHrefFromDOM()) !== null && _a !== void 0 ? _a : (_b = (0, core_1.inject)(core_1.DOCUMENT).location) === null || _b === void 0 ? void 0 : _b.origin) !== null && _c !== void 0 ? _c : '';
        }
        /** @nodoc */
        ngOnDestroy() {
            while (this._removeListenerFns.length) {
                this._removeListenerFns.pop()();
            }
        }
        onPopState(fn) {
            this._removeListenerFns.push(this._platformLocation.onPopState(fn), this._platformLocation.onHashChange(fn));
        }
        getBaseHref() {
            return this._baseHref;
        }
        prepareExternalUrl(internal) {
            return (0, util_1.joinWithSlash)(this._baseHref, internal);
        }
        path(includeHash = false) {
            const pathname = this._platformLocation.pathname + (0, util_1.normalizeQueryParams)(this._platformLocation.search);
            const hash = this._platformLocation.hash;
            return hash && includeHash ? `${pathname}${hash}` : pathname;
        }
        pushState(state, title, url, queryParams) {
            const externalUrl = this.prepareExternalUrl(url + (0, util_1.normalizeQueryParams)(queryParams));
            this._platformLocation.pushState(state, title, externalUrl);
        }
        replaceState(state, title, url, queryParams) {
            const externalUrl = this.prepareExternalUrl(url + (0, util_1.normalizeQueryParams)(queryParams));
            this._platformLocation.replaceState(state, title, externalUrl);
        }
        forward() {
            this._platformLocation.forward();
        }
        back() {
            this._platformLocation.back();
        }
        getState() {
            return this._platformLocation.getState();
        }
        historyGo(relativePosition = 0) {
            var _a, _b;
            (_b = (_a = this._platformLocation).historyGo) === null || _b === void 0 ? void 0 : _b.call(_a, relativePosition);
        }
    };
    __setFunctionName(_classThis, "PathLocationStrategy");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PathLocationStrategy = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PathLocationStrategy = _classThis;
})();
exports.PathLocationStrategy = PathLocationStrategy;
