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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const provider_collection_1 = require("../../src/di/provider_collection");
describe('environment injector and standalone components', () => {
    it('should see providers from modules imported by standalone components', () => {
        class ModuleService {
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [ModuleService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ imports: [Module] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)((0, provider_collection_1.internalImportProvidersFrom)(false, StandaloneComponent), parentEnvInjector);
        expect(envInjector.get(ModuleService)).toBeInstanceOf(ModuleService);
    });
    it('should see providers when exporting a standalone components', () => {
        class ModuleService {
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [ModuleService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let StandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ imports: [Module] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [StandaloneComponent], exports: [StandaloneComponent] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AppModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppModule = _classThis;
        })();
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([(0, core_1.importProvidersFrom)(AppModule)], parentEnvInjector);
        expect(envInjector.get(ModuleService)).toBeInstanceOf(ModuleService);
    });
    it('should not collect duplicate providers', () => {
        class ModuleService {
        }
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: ModuleService, useClass: ModuleService, multi: true }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Module = _classThis = class {
            };
            __setFunctionName(_classThis, "Module");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Module = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Module = _classThis;
        })();
        let StandaloneComponent1 = (() => {
            let _classDecorators = [(0, core_1.Component)({ imports: [Module] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent1 = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent1 = _classThis;
        })();
        let StandaloneComponent2 = (() => {
            let _classDecorators = [(0, core_1.Component)({ imports: [Module] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneComponent2 = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneComponent2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneComponent2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneComponent2 = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [StandaloneComponent1, StandaloneComponent2],
                    exports: [StandaloneComponent1, StandaloneComponent2],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AppModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppModule = _classThis;
        })();
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([(0, core_1.importProvidersFrom)(AppModule)], parentEnvInjector);
        const services = envInjector.get(ModuleService);
        expect(services.length).toBe(1);
    });
    it('should support nested arrays of providers', () => {
        const A = new core_1.InjectionToken('A');
        const B = new core_1.InjectionToken('B');
        const C = new core_1.InjectionToken('C');
        const MULTI = new core_1.InjectionToken('D');
        const providers = [
            { provide: MULTI, useValue: 1, multi: true },
            { provide: A, useValue: 'A' }, //
            [
                { provide: B, useValue: 'B' },
                [
                    { provide: C, useValue: 'C' },
                    { provide: MULTI, useValue: 2, multi: true },
                ],
            ],
        ];
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)(providers, parentEnvInjector);
        expect(envInjector.get(A)).toBe('A');
        expect(envInjector.get(B)).toBe('B');
        expect(envInjector.get(C)).toBe('C');
        expect(envInjector.get(MULTI)).toEqual([1, 2]);
    });
});
