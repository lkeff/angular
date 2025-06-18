"use strict";
/*!
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
exports.AnalyticsService = void 0;
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const analytics_format_error_1 = require("./analytics-format-error");
let AnalyticsService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsService = _classThis = class {
        constructor() {
            this.environment = (0, core_1.inject)(docs_1.ENVIRONMENT);
            this.window = (0, core_1.inject)(docs_1.WINDOW);
            this.localStorage = (0, core_1.inject)(docs_1.LOCAL_STORAGE);
            this._installGlobalSiteTag();
            this._installWindowErrorHandler();
        }
        reportError(description, fatal = true) {
            // Limit descriptions to maximum of 150 characters.
            // See: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#exd.
            description = description.substring(0, 150);
            this._gtag('event', 'exception', { description, fatal });
        }
        sendEvent(name, parameters) {
            this._gtag('event', name, parameters);
        }
        _gtag(...args) {
            if (this.window.gtag) {
                this.window.gtag(...args);
            }
        }
        _installGlobalSiteTag() {
            const window = this.window;
            const url = `https://www.googletagmanager.com/gtag/js?id=${this.environment.googleAnalyticsId}`;
            // Note: This cannot be an arrow function as `gtag.js` expects an actual `Arguments`
            // instance with e.g. `callee` to be set. Do not attempt to change this and keep this
            // as much as possible in sync with the tracking code snippet suggested by the Google
            // Analytics 4 web UI under `Data Streams`.
            window.dataLayer = this.window.dataLayer || [];
            window.gtag = function () {
                var _a;
                (_a = window.dataLayer) === null || _a === void 0 ? void 0 : _a.push(arguments);
            };
            // Cookie banner consent initial state
            // This code is modified in the @angular/docs package in the cookie-popup component.
            // Docs: https://developers.google.com/tag-platform/security/guides/consent
            if (this.localStorage) {
                if (this.localStorage.getItem(docs_1.STORAGE_KEY) === 'true') {
                    (0, docs_1.setCookieConsent)('granted');
                }
                else {
                    (0, docs_1.setCookieConsent)('denied');
                }
            }
            else {
                // In case localStorage is not available, we default to denying cookies.
                (0, docs_1.setCookieConsent)('denied');
            }
            window.gtag('js', new Date());
            // Configure properties before loading the script. This is necessary to avoid
            // loading multiple instances of the gtag JS scripts.
            window.gtag('config', this.environment.googleAnalyticsId);
            // Only add the element if `gtag` is not loaded yet. It might already
            // be inlined into the `index.html` via SSR.
            if (window.document.querySelector('#gtag-script') === null) {
                const el = window.document.createElement('script');
                el.async = true;
                el.src = url;
                el.id = 'gtag-script';
                window.document.head.appendChild(el);
            }
        }
        _installWindowErrorHandler() {
            this.window.addEventListener('error', (event) => this.reportError((0, analytics_format_error_1.formatErrorEventForAnalytics)(event), true));
        }
    };
    __setFunctionName(_classThis, "AnalyticsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
})();
exports.AnalyticsService = AnalyticsService;
