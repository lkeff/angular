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
exports.HttpClientInMemoryWebApiModule = void 0;
exports.httpClientInMemBackendServiceFactory = httpClientInMemBackendServiceFactory;
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const http_client_backend_service_1 = require("./http-client-backend-service");
const interfaces_1 = require("./interfaces");
// Internal - Creates the in-mem backend for the HttpClient module
// AoT requires factory to be exported
function httpClientInMemBackendServiceFactory(dbService, options, xhrFactory) {
    return new http_client_backend_service_1.HttpClientBackendService(dbService, options, xhrFactory);
}
let HttpClientInMemoryWebApiModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientInMemoryWebApiModule = _classThis = class {
        /**
         *  Redirect the Angular `HttpClient` XHR calls
         *  to in-memory data store that implements `InMemoryDbService`.
         *  with class that implements InMemoryDbService and creates an in-memory database.
         *
         *  Usually imported in the root application module.
         *  Can import in a lazy feature module too, which will shadow modules loaded earlier
         *
         *  Note: If you use the `FetchBackend`, make sure forRoot is invoked after in the providers list
         *
         * @param dbCreator - Class that creates seed data for in-memory database. Must implement
         *     InMemoryDbService.
         * @param [options]
         *
         * @example
         * HttpInMemoryWebApiModule.forRoot(dbCreator);
         * HttpInMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
         */
        static forRoot(dbCreator, options) {
            return {
                ngModule: HttpClientInMemoryWebApiModule,
                providers: [
                    { provide: interfaces_1.InMemoryDbService, useClass: dbCreator },
                    { provide: interfaces_1.InMemoryBackendConfig, useValue: options },
                    {
                        provide: http_1.HttpBackend,
                        useFactory: httpClientInMemBackendServiceFactory,
                        deps: [interfaces_1.InMemoryDbService, interfaces_1.InMemoryBackendConfig, common_1.XhrFactory],
                    },
                ],
            };
        }
        /**
         *
         * Enable and configure the in-memory web api in a lazy-loaded feature module.
         * Same as `forRoot`.
         * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
         */
        static forFeature(dbCreator, options) {
            return HttpClientInMemoryWebApiModule.forRoot(dbCreator, options);
        }
    };
    __setFunctionName(_classThis, "HttpClientInMemoryWebApiModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientInMemoryWebApiModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientInMemoryWebApiModule = _classThis;
})();
exports.HttpClientInMemoryWebApiModule = HttpClientInMemoryWebApiModule;
