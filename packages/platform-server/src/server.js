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
exports.ServerModule = exports.PLATFORM_SERVER_PROVIDERS = exports.SERVER_RENDER_PROVIDERS = exports.INTERNAL_SERVER_PLATFORM_PROVIDERS = void 0;
exports.platformServer = platformServer;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const domino_adapter_1 = require("./domino_adapter");
const http_1 = require("./http");
const location_1 = require("./location");
const platform_state_1 = require("./platform_state");
const server_events_1 = require("./server_events");
const tokens_1 = require("./tokens");
const transfer_state_1 = require("./transfer_state");
exports.INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: common_1.DOCUMENT, useFactory: _document, deps: [core_1.Injector] },
    { provide: core_1.PLATFORM_ID, useValue: common_1.ɵPLATFORM_SERVER_ID },
    { provide: core_1.PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true, deps: [core_1.Injector] },
    {
        provide: common_1.PlatformLocation,
        useClass: location_1.ServerPlatformLocation,
        deps: [common_1.DOCUMENT, [core_1.Optional, tokens_1.INITIAL_CONFIG]],
    },
    { provide: platform_state_1.PlatformState, deps: [common_1.DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: core_1.ɵALLOW_MULTIPLE_PLATFORMS, useValue: true },
];
function initDominoAdapter(injector) {
    const _enableDomEmulation = (0, platform_state_1.enableDomEmulation)(injector);
    return () => {
        if (_enableDomEmulation) {
            domino_adapter_1.DominoAdapter.makeCurrent();
        }
        else {
            platform_browser_1.ɵBrowserDomAdapter.makeCurrent();
        }
    };
}
exports.SERVER_RENDER_PROVIDERS = [
    { provide: platform_browser_1.EVENT_MANAGER_PLUGINS, multi: true, useClass: server_events_1.ServerEventManagerPlugin },
];
exports.PLATFORM_SERVER_PROVIDERS = [
    transfer_state_1.TRANSFER_STATE_SERIALIZATION_PROVIDERS,
    exports.SERVER_RENDER_PROVIDERS,
    http_1.SERVER_HTTP_PROVIDERS,
    { provide: core_1.Testability, useValue: null }, // Keep for backwards-compatibility.
    { provide: core_1.ɵTESTABILITY, useValue: null },
    { provide: common_1.ViewportScroller, useClass: common_1.ɵNullViewportScroller },
];
/**
 * The ng module for the server.
 *
 * @publicApi
 */
let ServerModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            exports: [platform_browser_1.BrowserModule],
            providers: exports.PLATFORM_SERVER_PROVIDERS,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ServerModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ServerModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServerModule = _classThis;
})();
exports.ServerModule = ServerModule;
function _document(injector) {
    const config = injector.get(tokens_1.INITIAL_CONFIG, null);
    const _enableDomEmulation = (0, platform_state_1.enableDomEmulation)(injector);
    let document;
    if (config && config.document) {
        document =
            typeof config.document === 'string'
                ? _enableDomEmulation
                    ? (0, domino_adapter_1.parseDocument)(config.document, config.url)
                    : window.document
                : config.document;
    }
    else {
        document = (0, common_1.ɵgetDOM)().createHtmlDocument();
    }
    // Tell ivy about the global document
    (0, core_1.ɵsetDocument)(document);
    return document;
}
/**
 * @publicApi
 */
function platformServer(extraProviders) {
    const noServerModeSet = typeof ngServerMode === 'undefined';
    if (noServerModeSet) {
        globalThis['ngServerMode'] = true;
    }
    const platform = (0, core_1.createPlatformFactory)(core_1.platformCore, 'server', exports.INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
    if (noServerModeSet) {
        platform.onDestroy(() => {
            globalThis['ngServerMode'] = undefined;
        });
    }
    return platform;
}
