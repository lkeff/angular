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
exports.BrowserModule = exports.platformBrowser = void 0;
exports.bootstrapApplication = bootstrapApplication;
exports.createApplication = createApplication;
exports.provideProtractorTestingSupport = provideProtractorTestingSupport;
exports.initDomAdapter = initDomAdapter;
exports.errorHandler = errorHandler;
exports._document = _document;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const browser_adapter_1 = require("./browser/browser_adapter");
const testability_1 = require("./browser/testability");
const xhr_1 = require("./browser/xhr");
const dom_renderer_1 = require("./dom/dom_renderer");
const dom_events_1 = require("./dom/events/dom_events");
const event_manager_1 = require("./dom/events/event_manager");
const key_events_1 = require("./dom/events/key_events");
const shared_styles_host_1 = require("./dom/shared_styles_host");
/**
 * Bootstraps an instance of an Angular application and renders a standalone component as the
 * application's root component. More information about standalone components can be found in [this
 * guide](guide/components/importing).
 *
 * @usageNotes
 * The root component passed into this function *must* be a standalone one (should have the
 * `standalone: true` flag in the `@Component` decorator config).
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   template: 'Hello world!'
 * })
 * class RootComponent {}
 *
 * const appRef: ApplicationRef = await bootstrapApplication(RootComponent);
 * ```
 *
 * You can add the list of providers that should be available in the application injector by
 * specifying the `providers` field in an object passed as the second argument:
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     {provide: BACKEND_URL, useValue: 'https://yourdomain.com/api'}
 *   ]
 * });
 * ```
 *
 * The `importProvidersFrom` helper method can be used to collect all providers from any
 * existing NgModule (and transitively from all NgModules that it imports):
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(SomeNgModule)
 *   ]
 * });
 * ```
 *
 * Note: the `bootstrapApplication` method doesn't include [Testability](api/core/Testability) by
 * default. You can add [Testability](api/core/Testability) by getting the list of necessary
 * providers using `provideProtractorTestingSupport()` function and adding them into the `providers`
 * array, for example:
 *
 * ```ts
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, {providers: [provideProtractorTestingSupport()]});
 * ```
 *
 * @param rootComponent A reference to a standalone component that should be rendered.
 * @param options Extra configuration for the bootstrap operation, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
function bootstrapApplication(rootComponent, options) {
    return (0, core_1.ɵinternalCreateApplication)(Object.assign({ rootComponent }, createProvidersConfig(options)));
}
/**
 * Create an instance of an Angular application without bootstrapping any components. This is useful
 * for the situation where one wants to decouple application environment creation (a platform and
 * associated injectors) from rendering components on a screen. Components can be subsequently
 * bootstrapped on the returned `ApplicationRef`.
 *
 * @param options Extra configuration for the application environment, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
function createApplication(options) {
    return (0, core_1.ɵinternalCreateApplication)(createProvidersConfig(options));
}
function createProvidersConfig(options) {
    var _a;
    return {
        appProviders: [...BROWSER_MODULE_PROVIDERS, ...((_a = options === null || options === void 0 ? void 0 : options.providers) !== null && _a !== void 0 ? _a : [])],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    };
}
/**
 * Returns a set of providers required to setup [Testability](api/core/Testability) for an
 * application bootstrapped using the `bootstrapApplication` function. The set of providers is
 * needed to support testing an application with Protractor (which relies on the Testability APIs
 * to be present).
 *
 * @returns An array of providers required to setup Testability for an application and make it
 *     available for testing using Protractor.
 *
 * @publicApi
 */
function provideProtractorTestingSupport() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideProtractorTestingSupport` call results in app
    // code.
    return [...TESTABILITY_PROVIDERS];
}
function initDomAdapter() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
    return new core_1.ErrorHandler();
}
function _document() {
    // Tell ivy about the global document
    (0, core_1.ɵsetDocument)(document);
    return document;
}
const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: core_1.PLATFORM_ID, useValue: common_1.ɵPLATFORM_BROWSER_ID },
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: common_1.DOCUMENT, useFactory: _document },
];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
exports.platformBrowser = (0, core_1.createPlatformFactory)(core_1.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
/**
 * Internal marker to signal whether providers from the `BrowserModule` are already present in DI.
 * This is needed to avoid loading `BrowserModule` providers twice. We can't rely on the
 * `BrowserModule` presence itself, since the standalone-based bootstrap just imports
 * `BrowserModule` providers without referencing the module itself.
 */
const BROWSER_MODULE_PROVIDERS_MARKER = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'BrowserModule Providers Marker' : '');
const TESTABILITY_PROVIDERS = [
    {
        provide: core_1.ɵTESTABILITY_GETTER,
        useClass: testability_1.BrowserGetTestability,
    },
    {
        provide: core_1.ɵTESTABILITY,
        useClass: core_1.Testability,
        deps: [core_1.NgZone, core_1.TestabilityRegistry, core_1.ɵTESTABILITY_GETTER],
    },
    {
        provide: core_1.Testability, // Also provide as `Testability` for backwards-compatibility.
        useClass: core_1.Testability,
        deps: [core_1.NgZone, core_1.TestabilityRegistry, core_1.ɵTESTABILITY_GETTER],
    },
];
const BROWSER_MODULE_PROVIDERS = [
    { provide: core_1.ɵINJECTOR_SCOPE, useValue: 'root' },
    { provide: core_1.ErrorHandler, useFactory: errorHandler },
    {
        provide: event_manager_1.EVENT_MANAGER_PLUGINS,
        useClass: dom_events_1.DomEventsPlugin,
        multi: true,
        deps: [common_1.DOCUMENT],
    },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true, deps: [common_1.DOCUMENT] },
    dom_renderer_1.DomRendererFactory2,
    shared_styles_host_1.SharedStylesHost,
    event_manager_1.EventManager,
    { provide: core_1.RendererFactory2, useExisting: dom_renderer_1.DomRendererFactory2 },
    { provide: common_1.XhrFactory, useClass: xhr_1.BrowserXhr },
    typeof ngDevMode === 'undefined' || ngDevMode
        ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true }
        : [],
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
let BrowserModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
            exports: [common_1.CommonModule, core_1.ApplicationModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BrowserModule = _classThis = class {
        constructor() {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                const providersAlreadyPresent = (0, core_1.inject)(BROWSER_MODULE_PROVIDERS_MARKER, {
                    optional: true,
                    skipSelf: true,
                });
                if (providersAlreadyPresent) {
                    throw new core_1.ɵRuntimeError(5100 /* RuntimeErrorCode.BROWSER_MODULE_ALREADY_LOADED */, `Providers from the \`BrowserModule\` have already been loaded. If you need access ` +
                        `to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
                }
            }
        }
    };
    __setFunctionName(_classThis, "BrowserModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BrowserModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BrowserModule = _classThis;
})();
exports.BrowserModule = BrowserModule;
