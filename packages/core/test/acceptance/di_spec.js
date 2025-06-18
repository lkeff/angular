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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const errors_1 = require("../../src/errors");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
const getProvidersByToken = (providers, token) => providers.filter((provider) => provider.provide === token);
const hasProviderWithToken = (providers, token) => getProvidersByToken(providers, token).length > 0;
const collectEnvironmentInitializerProviders = (providers) => getProvidersByToken(providers, core_1.ENVIRONMENT_INITIALIZER);
function unwrappedImportProvidersFrom(...sources) {
    const providers = (0, core_1.importProvidersFrom)(...sources)
        .ɵproviders;
    if (providers.some((provider) => 'ɵproviders' in provider)) {
        throw new Error(`Unexpected nested EnvironmentProviders in test`);
    }
    return providers;
}
describe('importProvidersFrom', () => {
    // Set of tokens used in various tests.
    const A = new core_1.InjectionToken('A');
    const B = new core_1.InjectionToken('B');
    const C = new core_1.InjectionToken('C');
    const D = new core_1.InjectionToken('D');
    it('should collect providers from NgModules', () => {
        let MyModule2 = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: C, useValue: 'C' },
                        { provide: D, useValue: 'D' },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule2 = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModule2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule2 = _classThis;
        })();
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [MyModule2],
                    providers: [
                        { provide: A, useValue: 'A' },
                        { provide: B, useValue: 'B' },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "MyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyModule = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom(MyModule);
        // 4 tokens (A, B, C, D) + 2 providers for each NgModule:
        // - the definition type itself
        // - `INJECTOR_DEF_TYPES`
        // - `ENVIRONMENT_INITIALIZER`
        expect(providers.length).toBe(10);
        expect(hasProviderWithToken(providers, A)).toBe(true);
        expect(hasProviderWithToken(providers, B)).toBe(true);
        expect(hasProviderWithToken(providers, C)).toBe(true);
        expect(hasProviderWithToken(providers, D)).toBe(true);
        // Expect 2 `ENVIRONMENT_INITIALIZER` providers: one for `MyModule`, another was `MyModule2`
        expect(collectEnvironmentInitializerProviders(providers).length).toBe(2);
    });
    it('should collect providers from directly imported ModuleWithProviders', () => {
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
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
        const providers = unwrappedImportProvidersFrom({
            ngModule: Module,
            providers: [{ provide: A, useValue: 'A' }],
        });
        expect(hasProviderWithToken(providers, A)).toBe(true);
    });
    it('should collect all providers when a module is used twice with different providers (via ModuleWithProviders)', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: A, useValue: 'A' }, //
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [ModuleA] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
                static forRoot() {
                    return { ngModule: ModuleB, providers: [{ provide: B, useValue: 'B' }] };
                }
                static forChild() {
                    return { ngModule: ModuleB, providers: [{ provide: C, useValue: 'C' }] };
                }
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom(ModuleB.forRoot(), ModuleB.forChild());
        // Expect 2 `ENVIRONMENT_INITIALIZER` providers: one for `ModuleA`, another one for `ModuleB`
        expect(collectEnvironmentInitializerProviders(providers).length).toBe(2);
        // Expect exactly 1 provider for each module: `ModuleA` and `ModuleB`
        expect(getProvidersByToken(providers, ModuleA).length).toBe(1);
        expect(getProvidersByToken(providers, ModuleB).length).toBe(1);
        // Expect all tokens to be collected.
        expect(hasProviderWithToken(providers, A)).toBe(true);
        expect(hasProviderWithToken(providers, B)).toBe(true);
        expect(hasProviderWithToken(providers, C)).toBe(true);
    });
    it('should process nested arrays within a provider set of ModuleWithProviders type', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: ModuleA,
                        providers: [
                            { provide: A, useValue: 'A' },
                            // Nested arrays inside the list of providers:
                            [{ provide: B, useValue: 'B' }, [{ provide: C, useValue: 'C' }]],
                        ],
                    };
                }
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom(ModuleA.forRoot());
        // Expect 1 `ENVIRONMENT_INITIALIZER` provider (for `ModuleA`)
        expect(collectEnvironmentInitializerProviders(providers).length).toBe(1);
        // Expect exactly 1 provider for `ModuleA`
        expect(getProvidersByToken(providers, ModuleA).length).toBe(1);
        // Expect all tokens to be collected.
        expect(hasProviderWithToken(providers, A)).toBe(true);
        expect(hasProviderWithToken(providers, B)).toBe(true);
        expect(hasProviderWithToken(providers, C)).toBe(true);
    });
    it('should process nested arrays within provider set of an imported ModuleWithProviders type', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: ModuleA,
                        providers: [
                            { provide: A, useValue: 'A' },
                            // Nested arrays inside the list of providers:
                            [{ provide: B, useValue: 'B' }, [{ provide: C, useValue: 'C' }]],
                        ],
                    };
                }
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [ModuleA.forRoot()] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom(ModuleB);
        // Expect 2 `ENVIRONMENT_INITIALIZER` providers: one for `ModuleA`, another one for `ModuleB`
        expect(collectEnvironmentInitializerProviders(providers).length).toBe(2);
        // Expect exactly 1 provider for each module: `ModuleA` and `ModuleB`
        expect(getProvidersByToken(providers, ModuleA).length).toBe(1);
        expect(getProvidersByToken(providers, ModuleB).length).toBe(1);
        // Expect all tokens to be collected.
        expect(hasProviderWithToken(providers, A)).toBe(true);
        expect(hasProviderWithToken(providers, B)).toBe(true);
        expect(hasProviderWithToken(providers, C)).toBe(true);
    });
    it('should collect providers defined via `@NgModule.providers` when ModuleWithProviders type is used', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        { provide: A, useValue: 'Original A' }, //
                        { provide: B, useValue: 'B' }, //
                        { provide: D, useValue: 'Original D', multi: true },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
                static forRoot() {
                    return {
                        ngModule: ModuleA,
                        providers: [
                            { provide: A, useValue: 'Overridden A' }, //
                            { provide: C, useValue: 'C' }, //
                            { provide: D, useValue: 'Extra D', multi: true },
                        ],
                    };
                }
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom(ModuleA.forRoot());
        // Expect all tokens to be collected.
        expect(hasProviderWithToken(providers, A)).toBe(true);
        expect(hasProviderWithToken(providers, B)).toBe(true);
        expect(hasProviderWithToken(providers, C)).toBe(true);
        expect(hasProviderWithToken(providers, D)).toBe(true);
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const injector = (0, core_1.createEnvironmentInjector)(providers, parentEnvInjector);
        // Verify that overridden token A has the right value.
        expect(injector.get(A)).toBe('Overridden A');
        // Verify that a multi-provider has both values.
        expect(injector.get(D)).toEqual(['Original D', 'Extra D']);
    });
    it('should not be allowed in component providers', () => {
        let Module = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
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
        expect(() => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '',
                        // The double array here is necessary to escape the compile-time error, via Provider's
                        // `any[]` option.
                        providers: [[(0, core_1.importProvidersFrom)(Module)]],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.createComponent(Cmp);
        }).toThrowError(/NG0207/);
    });
    it('should import providers from an array of NgModules (may be nested)', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: A, useValue: 'A' }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: B, useValue: 'B' }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        const providers = unwrappedImportProvidersFrom([ModuleA, [ModuleB]]);
        expect(hasProviderWithToken(providers, A)).toBeTrue();
        expect(hasProviderWithToken(providers, B)).toBeTrue();
    });
    it('should throw when trying to import providers from standalone components', () => {
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: A, useValue: 'A' }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    imports: [ModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        expect(() => {
            (0, core_1.importProvidersFrom)(StandaloneCmp);
        }).toThrowError('NG0800: Importing providers supports NgModule or ModuleWithProviders but got a standalone component "StandaloneCmp"');
    });
});
describe('EnvironmentProviders', () => {
    const TOKEN = new core_1.InjectionToken('TOKEN');
    const environmentProviders = (0, core_1.makeEnvironmentProviders)([
        {
            provide: TOKEN,
            useValue: 'token!',
        },
    ]);
    it('should be accepted by TestBed providers', () => {
        testing_1.TestBed.configureTestingModule({
            providers: [environmentProviders],
        });
        expect(testing_1.TestBed.inject(TOKEN)).toEqual('token!');
    });
    it('should be accepted by @NgModule & createNgModule', () => {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [environmentProviders],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const inj = (0, core_1.createNgModule)(TestModule).injector;
        expect(inj.get(TOKEN)).toEqual('token!');
    });
    it('should be accepted by @NgModule & TestBed imports', () => {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [environmentProviders],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [TestModule],
        });
        expect(testing_1.TestBed.inject(TOKEN)).toEqual('token!');
    });
    it('should be accepted in ModuleWithProviders & createNgModule', () => {
        let EmptyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EmptyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "EmptyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmptyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmptyModule = _classThis;
        })();
        const mwp = {
            ngModule: EmptyModule,
            providers: [environmentProviders],
        };
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [mwp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const inj = (0, core_1.createNgModule)(TestModule).injector;
        expect(inj.get(TOKEN)).toEqual('token!');
    });
    it('should be accepted by createEnvironmentInjector', () => {
        testing_1.TestBed.configureTestingModule({});
        const inj = (0, core_1.createEnvironmentInjector)([environmentProviders], testing_1.TestBed.inject(core_1.EnvironmentInjector));
        expect(inj.get(TOKEN)).toEqual('token!');
    });
    it('should be accepted as additional input to makeEnvironmentProviders', () => {
        const wrappedProviders = (0, core_1.makeEnvironmentProviders)([environmentProviders]);
        testing_1.TestBed.configureTestingModule({});
        const inj = (0, core_1.createEnvironmentInjector)([wrappedProviders], testing_1.TestBed.inject(core_1.EnvironmentInjector));
        expect(inj.get(TOKEN)).toEqual('token!');
    });
    it('should be overridable by TestBed overrides', () => {
        testing_1.TestBed.configureTestingModule({
            providers: [environmentProviders],
        });
        testing_1.TestBed.overrideProvider(TOKEN, {
            useValue: 'overridden!',
        });
        expect(testing_1.TestBed.inject(TOKEN)).toEqual('overridden!');
    });
    it('should be rejected by @Component.providers', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    providers: [environmentProviders],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.token = (0, core_1.inject)(TOKEN);
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        expect(() => testing_1.TestBed.createComponent(TestCmp)).toThrowError(/NG0207/);
    });
});
describe('di', () => {
    describe('no dependencies', () => {
        it('should create directive with no deps', () => {
            let MyDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        exportAs: 'dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDirective = _classThis = class {
                    constructor() {
                        this.value = 'Created';
                    }
                };
                __setFunctionName(_classThis, "MyDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDirective = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir #dir="dir">{{ dir.value }}</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDirective, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const divElement = fixture.nativeElement.querySelector('div');
            expect(divElement.textContent).toContain('Created');
        });
    });
    describe('multi providers', () => {
        it('should process ModuleWithProvider providers after module imports', () => {
            const testToken = new core_1.InjectionToken('test-multi');
            let TestModuleA = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: testToken, useValue: 'A', multi: true }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModuleA = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModuleA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModuleA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModuleA = _classThis;
            })();
            let TestModuleB = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: testToken, useValue: 'B', multi: true }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModuleB = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModuleB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModuleB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModuleB = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [
                    {
                        ngModule: TestModuleA,
                        providers: [{ provide: testToken, useValue: 'C', multi: true }],
                    },
                    TestModuleB,
                ],
            });
            expect(testing_1.TestBed.inject(testToken)).toEqual(['A', 'B', 'C']);
        });
    });
    describe('directive injection', () => {
        let log = [];
        let DirectiveB = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirB]',
                    exportAs: 'dirB',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            var DirectiveB = _classThis = class {
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, 'DirB');
                    __runInitializers(this, _value_extraInitializers);
                    log.push(this.value);
                }
            };
            __setFunctionName(_classThis, "DirectiveB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirectiveB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirectiveB = _classThis;
        })();
        beforeEach(() => (log = []));
        it('should create directive with intra view dependencies', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        exportAs: 'dirA',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor() {
                        this.value = 'DirA';
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let DirectiveC = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirC]',
                        exportAs: 'dirC',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveC = _classThis = class {
                    constructor(dirA, dirB) {
                        this.value = dirA.value + dirB.value;
                    }
                };
                __setFunctionName(_classThis, "DirectiveC");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveC = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveC = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <div dirA>
          <span dirB dirC #dir="dirC">{{ dir.value }}</span>
        </div>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, DirectiveC, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const divElement = fixture.nativeElement.querySelector('span');
            expect(divElement.textContent).toContain('DirADirB');
        });
        it('should instantiate injected directives in dependency order', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirB) {
                        this.value = 'dirA';
                        log.push(`DirA (dep: ${dirB.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA dirB></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(log).toEqual(['DirB', 'DirA (dep: DirB)']);
        });
        it('should fallback to the module injector', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirB) {
                        this.value = 'dirA';
                        log.push(`DirA (dep: ${dirB.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            // - dirB is know to the node injectors
            // - then when dirA tries to inject dirB, it will check the node injector first tree
            // - if not found, it will check the module injector tree
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirB></div><div dirA></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [DirectiveA, DirectiveB, MyComp],
                providers: [{ provide: DirectiveB, useValue: { value: 'module' } }],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(log).toEqual(['DirB', 'DirA (dep: module)']);
        });
        it('should instantiate injected directives before components', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(dirB) {
                        log.push(`Comp (dep: ${dirB.value})`);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp dirB></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveB, MyComp, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(log).toEqual(['DirB', 'Comp (dep: DirB)']);
        });
        it('should inject directives in the correct order in a for loop', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dir) {
                        log.push(`DirA (dep: ${dir.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA dirB *ngFor="let i of array"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.array = [1, 2, 3];
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(log).toEqual([
                'DirB',
                'DirA (dep: DirB)',
                'DirB',
                'DirA (dep: DirB)',
                'DirB',
                'DirA (dep: DirB)',
            ]);
        });
        it('should instantiate directives with multiple out-of-order dependencies', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor() {
                        this.value = 'DirA';
                        log.push(this.value);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let DirectiveC = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirC]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveC = _classThis = class {
                    constructor() {
                        this.value = 'DirC';
                        log.push(this.value);
                    }
                };
                __setFunctionName(_classThis, "DirectiveC");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveC = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveC = _classThis;
            })();
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor(dirA, dirC) {
                        log.push(`DirB (deps: ${dirA.value} and ${dirC.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA dirB dirC></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, DirectiveC, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(log).toEqual(['DirA', 'DirC', 'DirB (deps: DirA and DirC)']);
        });
        it('should instantiate in the correct order for complex case', () => {
            let DirectiveC = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirC]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveC = _classThis = class {
                    constructor(dirB) {
                        this.value = 'DirC';
                        log.push(`DirC (dep: ${dirB.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveC");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveC = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveC = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirC) {
                        this.value = 'DirA';
                        log.push(`DirA (dep: ${dirC.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let DirectiveD = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirD]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveD = _classThis = class {
                    constructor(dirA) {
                        this.value = 'DirD';
                        log.push(`DirD (dep: ${dirA.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveD");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveD = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveD = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(dirD) {
                        log.push(`Comp (dep: ${dirD.value})`);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp dirA dirB dirC dirD></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [DirectiveA, DirectiveB, DirectiveC, DirectiveD, MyComp, MyApp],
            });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(log).toEqual([
                'DirB',
                'DirC (dep: DirB)',
                'DirA (dep: DirC)',
                'DirD (dep: DirA)',
                'Comp (dep: DirD)',
            ]);
        });
        it('should instantiate in correct order with mixed parent and peer dependencies', () => {
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA dirB dirC></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                    constructor() {
                        this.value = 'App';
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirB, app) {
                        log.push(`DirA (deps: ${dirB.value} and ${app.value})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(log).toEqual(['DirB', 'DirA (deps: DirB and App)']);
        });
        it('should not use a parent when peer dep is available', () => {
            let count = 1;
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor() {
                        log.push(`DirB`);
                        this.count = count++;
                    }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirB) {
                        log.push(`DirA (dep: DirB - ${dirB.count})`);
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div dirA dirB></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp dirB></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            expect(log).toEqual(['DirB', 'DirB', 'DirA (dep: DirB - 2)']);
        });
        describe('dependencies in parent views', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        exportAs: 'dirA',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(dirB, vcr) {
                        this.dirB = dirB;
                        this.vcr = vcr;
                        this.injector = vcr.injector;
                    }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<div dirA #dir="dirA">{{ dir.dirB.value }}</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            it('should find dependencies on component hosts', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp dirB></my-comp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                expect(divElement.textContent).toEqual('DirB');
            });
            it('should find dependencies for directives in embedded views', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div dirB>
            <div *ngIf="showing">
              <div dirA #dir="dirA">{{ dir.dirB.value }}</div>
            </div>
          </div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor() {
                            this.showing = false;
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.componentInstance.showing = true;
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                expect(divElement.textContent).toEqual('DirB');
            });
            it('should find dependencies of directives nested deeply in inline views', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div dirB>
            <ng-container *ngIf="!skipContent">
              <ng-container *ngIf="!skipContent2">
                <div dirA #dir="dirA">{{ dir.dirB.value }}</div>
              </ng-container>
            </ng-container>
          </div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor() {
                            this.skipContent = false;
                            this.skipContent2 = false;
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                expect(divElement.textContent).toEqual('DirB');
            });
            it('should find dependencies in declaration tree of ng-template (not insertion tree)', () => {
                let StructuralDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[structuralDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmp_decorators;
                    let _tmp_initializers = [];
                    let _tmp_extraInitializers = [];
                    var StructuralDirective = _classThis = class {
                        constructor(vcr) {
                            this.vcr = vcr;
                            this.tmp = __runInitializers(this, _tmp_initializers, void 0);
                            __runInitializers(this, _tmp_extraInitializers);
                            this.vcr = vcr;
                        }
                        create() {
                            this.vcr.createEmbeddedView(this.tmp);
                        }
                    };
                    __setFunctionName(_classThis, "StructuralDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmp_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _tmp_decorators, { kind: "field", name: "tmp", static: false, private: false, access: { has: obj => "tmp" in obj, get: obj => obj.tmp, set: (obj, value) => { obj.tmp = value; } }, metadata: _metadata }, _tmp_initializers, _tmp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        StructuralDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return StructuralDirective = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div dirB value="declaration">
           <ng-template #foo>
               <div dirA #dir="dirA">{{ dir.dirB.value }}</div>
           </ng-template>
         </div>

         <div dirB value="insertion">
           <div structuralDir [tmp]="foo"></div>
           <!-- insertion point -->
         </div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _structuralDir_decorators;
                    let _structuralDir_initializers = [];
                    let _structuralDir_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.structuralDir = __runInitializers(this, _structuralDir_initializers, void 0);
                            __runInitializers(this, _structuralDir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _structuralDir_decorators = [(0, core_1.ViewChild)(StructuralDirective)];
                        __esDecorate(null, null, _structuralDir_decorators, { kind: "field", name: "structuralDir", static: false, private: false, access: { has: obj => "structuralDir" in obj, get: obj => obj.structuralDir, set: (obj, value) => { obj.structuralDir = value; } }, metadata: _metadata }, _structuralDir_initializers, _structuralDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [StructuralDirective, DirectiveA, DirectiveB, MyComp],
                });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                fixture.componentInstance.structuralDir.create();
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div[value=insertion]');
                expect(divElement.textContent).toEqual('declaration');
            });
            it('should create injectors on second template pass', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div>
            <my-comp dirB></my-comp>
            <my-comp dirB></my-comp>
          </div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                expect(divElement.textContent).toEqual('DirBDirB');
            });
            it('should create injectors and host bindings in same view', () => {
                let HostBindingDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[hostBindingDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _id_decorators;
                    let _id_initializers = [];
                    let _id_extraInitializers = [];
                    var HostBindingDirective = _classThis = class {
                        constructor() {
                            this.id = __runInitializers(this, _id_initializers, 'foo');
                            __runInitializers(this, _id_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostBindingDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _id_decorators = [(0, core_1.HostBinding)('id')];
                        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostBindingDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostBindingDirective = _classThis;
                })();
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div dirB hostBindingDir>
            <p dirA #dir="dirA">{{ dir.dirB.value }}</p>
          </div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _hostBindingDir_decorators;
                    let _hostBindingDir_initializers = [];
                    let _hostBindingDir_extraInitializers = [];
                    let _dirA_decorators;
                    let _dirA_initializers = [];
                    let _dirA_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                            this.dirA = (__runInitializers(this, _hostBindingDir_extraInitializers), __runInitializers(this, _dirA_initializers, void 0));
                            __runInitializers(this, _dirA_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingDirective)];
                        _dirA_decorators = [(0, core_1.ViewChild)(DirectiveA)];
                        __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                        __esDecorate(null, null, _dirA_decorators, { kind: "field", name: "dirA", static: false, private: false, access: { has: obj => "dirA" in obj, get: obj => obj.dirA, set: (obj, value) => { obj.dirA = value; } }, metadata: _metadata }, _dirA_initializers, _dirA_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [DirectiveA, DirectiveB, HostBindingDirective, MyApp],
                });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                expect(divElement.textContent).toEqual('DirB');
                expect(divElement.id).toEqual('foo');
                const dirA = fixture.componentInstance.dirA;
                expect(dirA.vcr.injector).toEqual(dirA.injector);
                const hostBindingDir = fixture.componentInstance.hostBindingDir;
                hostBindingDir.id = 'bar';
                fixture.detectChanges();
                expect(divElement.id).toBe('bar');
            });
            it('dynamic components should find dependencies when parent is projected', () => {
                let DirA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirA]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirA = _classThis;
                })();
                let DirB = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirB]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirB = _classThis;
                })();
                let Child = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Child = _classThis = class {
                        constructor(dirA, dirB) {
                            this.dirA = dirA;
                            this.dirB = dirB;
                        }
                    };
                    __setFunctionName(_classThis, "Child");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Child = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Child = _classThis;
                })();
                let Projector = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'projector',
                            template: '<ng-content></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Projector = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Projector");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Projector = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Projector = _classThis;
                })();
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
          <projector>
            <div dirA>
              <ng-container #childOrigin></ng-container>
              <ng-container #childOriginWithDirB dirB></ng-container>
            </div>
          </projector>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _childOrigin_decorators;
                    let _childOrigin_initializers = [];
                    let _childOrigin_extraInitializers = [];
                    let _childOriginWithDirB_decorators;
                    let _childOriginWithDirB_initializers = [];
                    let _childOriginWithDirB_extraInitializers = [];
                    var MyApp = _classThis = class {
                        addChild() {
                            return this.childOrigin.createComponent(Child);
                        }
                        addChildWithDirB() {
                            return this.childOriginWithDirB.createComponent(Child);
                        }
                        constructor() {
                            this.childOrigin = __runInitializers(this, _childOrigin_initializers, void 0);
                            this.childOriginWithDirB = (__runInitializers(this, _childOrigin_extraInitializers), __runInitializers(this, _childOriginWithDirB_initializers, void 0));
                            __runInitializers(this, _childOriginWithDirB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _childOrigin_decorators = [(0, core_1.ViewChild)('childOrigin', { read: core_1.ViewContainerRef, static: true })];
                        _childOriginWithDirB_decorators = [(0, core_1.ViewChild)('childOriginWithDirB', { read: core_1.ViewContainerRef, static: true })];
                        __esDecorate(null, null, _childOrigin_decorators, { kind: "field", name: "childOrigin", static: false, private: false, access: { has: obj => "childOrigin" in obj, get: obj => obj.childOrigin, set: (obj, value) => { obj.childOrigin = value; } }, metadata: _metadata }, _childOrigin_initializers, _childOrigin_extraInitializers);
                        __esDecorate(null, null, _childOriginWithDirB_decorators, { kind: "field", name: "childOriginWithDirB", static: false, private: false, access: { has: obj => "childOriginWithDirB" in obj, get: obj => obj.childOriginWithDirB, set: (obj, value) => { obj.childOriginWithDirB = value; } }, metadata: _metadata }, _childOriginWithDirB_initializers, _childOriginWithDirB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                const fixture = testing_1.TestBed.configureTestingModule({
                    declarations: [Child, DirA, DirB, Projector, MyApp],
                }).createComponent(MyApp);
                const child = fixture.componentInstance.addChild();
                expect(child).toBeDefined();
                expect(child.instance.dirA)
                    .withContext('dirA should be found. It is on the parent of the viewContainerRef.')
                    .not.toBeNull();
                const child2 = fixture.componentInstance.addChildWithDirB();
                expect(child2).toBeDefined();
                expect(child2.instance.dirA)
                    .withContext('dirA should be found. It is on the parent of the viewContainerRef.')
                    .not.toBeNull();
                expect(child2.instance.dirB)
                    .withContext('dirB appears on the ng-container and should not be found because the ' +
                    'viewContainerRef.createComponent node is inserted next to the container.')
                    .toBeNull();
            });
        });
        it('should throw if directive is not found anywhere', () => {
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor() { }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(siblingDir) { }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/No provider for DirectiveB/);
        });
        it('should throw if directive is not found in ancestor tree', () => {
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor() { }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(siblingDir) { }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA></div><div dirB></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/No provider for DirectiveB/);
        });
        it('should not have access to the directive injector in a standalone injector from within a directive-level provider factory', () => {
            // https://github.com/angular/angular/issues/42651
            class TestA {
                constructor(injector) {
                    this.injector = injector;
                }
            }
            class TestB {
                constructor(a) {
                    this.a = a;
                }
            }
            function createTestB() {
                // Setup a standalone injector that provides `TestA`, which is resolved from a
                // standalone child injector that requests `TestA` as a dependency for `TestB`.
                // Although we're inside a directive factory and therefore have access to the
                // directive-level injector, `TestA` has to be resolved from the standalone injector.
                const parent = core_1.Injector.create({
                    providers: [{ provide: TestA, useFactory: () => new TestA('standalone'), deps: [] }],
                    name: 'TestA',
                });
                const child = core_1.Injector.create({
                    providers: [{ provide: TestB, useClass: TestB, deps: [TestA] }],
                    parent,
                    name: 'TestB',
                });
                return child.get(TestB);
            }
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [
                            { provide: TestA, useFactory: () => new TestA('component'), deps: [] },
                            { provide: TestB, useFactory: createTestB },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(testB) {
                        this.testB = testB;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const cmp = testing_1.TestBed.createComponent(MyComp);
            expect(cmp.componentInstance.testB).toBeInstanceOf(TestB);
            expect(cmp.componentInstance.testB.a.injector).toBe('standalone');
        });
        it('should not have access to the directive injector in a standalone injector from within a directive-level provider factory', () => {
            class TestA {
                constructor(injector) {
                    this.injector = injector;
                }
            }
            class TestB {
                constructor(a) {
                    this.a = a;
                }
            }
            function createTestB() {
                // Setup a standalone injector that provides `TestB` with an optional dependency of
                // `TestA`. Since `TestA` is not provided by the standalone injector it should resolve
                // to null; both the NgModule providers and the component-level providers should not
                // be considered.
                const injector = core_1.Injector.create({
                    providers: [{ provide: TestB, useClass: TestB, deps: [[TestA, new core_1.Optional()]] }],
                    name: 'TestB',
                });
                return injector.get(TestB);
            }
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [
                            { provide: TestA, useFactory: () => new TestA('component'), deps: [] },
                            { provide: TestB, useFactory: createTestB },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(testB) {
                        this.testB = testB;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [{ provide: TestA, useFactory: () => new TestA('module'), deps: [] }],
            });
            const cmp = testing_1.TestBed.createComponent(MyComp);
            expect(cmp.componentInstance.testB).toBeInstanceOf(TestB);
            expect(cmp.componentInstance.testB.a).toBeNull();
        });
        it('should throw if directive tries to inject itself', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(siblingDir) { }
                };
                __setFunctionName(_classThis, "DirectiveA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveA = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dirA></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
            expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError('NG0200: Circular dependency in DI detected for DirectiveA. Find more at https://angular.dev/errors/NG0200');
        });
        describe('flags', () => {
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dirB]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var DirectiveB = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, '');
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)('dirB')];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            describe('Optional', () => {
                let DirectiveA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirA]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirectiveA = _classThis = class {
                        constructor(dirB) {
                            this.dirB = dirB;
                        }
                    };
                    __setFunctionName(_classThis, "DirectiveA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirectiveA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirectiveA = _classThis;
                })();
                it('should not throw if dependency is @Optional (module injector)', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirA></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirA_decorators;
                        let _dirA_initializers = [];
                        let _dirA_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirA = __runInitializers(this, _dirA_initializers, void 0);
                                __runInitializers(this, _dirA_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirA_decorators = [(0, core_1.ViewChild)(DirectiveA)];
                            __esDecorate(null, null, _dirA_decorators, { kind: "field", name: "dirA", static: false, private: false, access: { has: obj => "dirA" in obj, get: obj => obj.dirA, set: (obj, value) => { obj.dirA = value; } }, metadata: _metadata }, _dirA_initializers, _dirA_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    const dirA = fixture.componentInstance.dirA;
                    expect(dirA.dirB).toBeNull();
                });
                it('should return null if @Optional dependency has @Self flag', () => {
                    let DirectiveC = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirC]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveC = _classThis = class {
                            constructor(dirB) {
                                this.dirB = dirB;
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveC");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveC = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveC = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirC></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirC_decorators;
                        let _dirC_initializers = [];
                        let _dirC_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirC = __runInitializers(this, _dirC_initializers, void 0);
                                __runInitializers(this, _dirC_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirC_decorators = [(0, core_1.ViewChild)(DirectiveC)];
                            __esDecorate(null, null, _dirC_decorators, { kind: "field", name: "dirC", static: false, private: false, access: { has: obj => "dirC" in obj, get: obj => obj.dirC, set: (obj, value) => { obj.dirC = value; } }, metadata: _metadata }, _dirC_initializers, _dirC_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveC, MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    const dirC = fixture.componentInstance.dirC;
                    expect(dirC.dirB).toBeNull();
                });
                it('should not throw if dependency is @Optional but defined elsewhere', () => {
                    let DirectiveC = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirC]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveC = _classThis = class {
                            constructor(dirB) {
                                this.dirB = dirB;
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveC");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveC = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveC = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirB></div><div dirC></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirC_decorators;
                        let _dirC_initializers = [];
                        let _dirC_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirC = __runInitializers(this, _dirC_initializers, void 0);
                                __runInitializers(this, _dirC_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirC_decorators = [(0, core_1.ViewChild)(DirectiveC)];
                            __esDecorate(null, null, _dirC_decorators, { kind: "field", name: "dirC", static: false, private: false, access: { has: obj => "dirC" in obj, get: obj => obj.dirC, set: (obj, value) => { obj.dirC = value; } }, metadata: _metadata }, _dirC_initializers, _dirC_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveB, DirectiveC, MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    const dirC = fixture.componentInstance.dirC;
                    expect(dirC.dirB).toBeNull();
                });
                it('should imply @Optional in presence of a default value', () => {
                    const NON_EXISTING_PROVIDER = new core_1.InjectionToken('non-existing');
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor(injector) {
                                this.value = injector.get(NON_EXISTING_PROVIDER, 'default', { host: true });
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    const injector = core_1.Injector.create({ providers: [] });
                    expect(injector.get(NON_EXISTING_PROVIDER, 'default', { host: true })).toBe('default');
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    expect(fixture.componentInstance.value).toBe('default');
                });
            });
            it('should check only the current node with @Self', () => {
                let DirectiveA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirA]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirectiveA = _classThis = class {
                        constructor(dirB) {
                            this.dirB = dirB;
                        }
                    };
                    __setFunctionName(_classThis, "DirectiveA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirectiveA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirectiveA = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div dirB><div dirA></div></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp] });
                expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/NG0201: No provider for DirectiveB found in NodeInjector/);
            });
            describe('SkipSelf', () => {
                describe('Injectors', () => {
                    it('should support @SkipSelf when injecting Injectors', () => {
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<child></child>',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'PARENT',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(injector, parentInjector) {
                                    this.injector = injector;
                                    this.parentInjector = parentInjector;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        const childComponent = fixture.debugElement.query(platform_browser_1.By.directive(ChildComponent)).componentInstance;
                        expect(childComponent.injector.get('token')).toBe('CHILD');
                        expect(childComponent.parentInjector.get('token')).toBe('PARENT');
                    });
                    it('should lookup module injector in case @SkipSelf is used and no suitable Injector found in element injector tree', () => {
                        let componentInjector;
                        let moduleInjector;
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    componentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let MyModule = (() => {
                            let _classDecorators = [(0, core_1.NgModule)({
                                    declarations: [MyComponent],
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'NG_MODULE',
                                        },
                                    ],
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyModule = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    moduleInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyModule");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyModule = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyModule = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [MyModule],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComponent);
                        fixture.detectChanges();
                        expect(componentInjector.get('token')).toBe('NG_MODULE');
                        expect(moduleInjector.get('token')).toBe('NG_MODULE');
                    });
                    it('should respect @Host in case @SkipSelf is used and no suitable Injector found in element injector tree', () => {
                        let componentInjector;
                        let moduleInjector;
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    componentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let MyModule = (() => {
                            let _classDecorators = [(0, core_1.NgModule)({
                                    declarations: [MyComponent],
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'NG_MODULE',
                                        },
                                    ],
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyModule = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    moduleInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyModule");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyModule = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyModule = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [MyModule],
                        });
                        expect(() => testing_1.TestBed.createComponent(MyComponent)).toThrowError(/NG0201: No provider for Injector found in NodeInjector/);
                    });
                    it('should throw when injecting Injectors using @SkipSelf and @Host and no Injectors are available in a current view', () => {
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<child></child>',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'PARENT',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const expectedErrorMessage = /NG0201: No provider for Injector found in NodeInjector/;
                        expect(() => testing_1.TestBed.createComponent(ParentComponent)).toThrowError(expectedErrorMessage);
                    });
                    it('should not throw when injecting Injectors using @SkipSelf, @Host, and @Optional and no Injectors are available in a current view', () => {
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<child></child>',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'PARENT',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const expectedErrorMessage = /NG0201: No provider for Injector found in NodeInjector/;
                        expect(() => testing_1.TestBed.createComponent(ParentComponent)).not.toThrowError(expectedErrorMessage);
                    });
                });
                describe('ElementRef', () => {
                    // While tokens like `ElementRef` make sense only in a context of a NodeInjector,
                    // ViewEngine also used `ModuleInjector` tree to lookup such tokens. In Ivy we replicate
                    // this behavior for now to avoid breaking changes.
                    it('should lookup module injector in case @SkipSelf is used for `ElementRef` token and Component has no parent', () => {
                        let componentElement;
                        let moduleElement;
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div>component</div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(el) {
                                    this.el = el;
                                    componentElement = el;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let MyModule = (() => {
                            let _classDecorators = [(0, core_1.NgModule)({
                                    declarations: [MyComponent],
                                    providers: [
                                        {
                                            provide: core_1.ElementRef,
                                            useValue: { from: 'NG_MODULE' },
                                        },
                                    ],
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyModule = _classThis = class {
                                constructor(el) {
                                    this.el = el;
                                    moduleElement = el;
                                }
                            };
                            __setFunctionName(_classThis, "MyModule");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyModule = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyModule = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [MyModule],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComponent);
                        fixture.detectChanges();
                        expect(moduleElement.from).toBe('NG_MODULE');
                        expect(componentElement.from).toBe('NG_MODULE');
                    });
                    it('should return host node when @SkipSelf is used for `ElementRef` token and Component has no parent node', () => {
                        let parentElement;
                        let componentElement;
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(el) {
                                    this.el = el;
                                    componentElement = el;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<child></child>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                                constructor(el) {
                                    this.el = el;
                                    parentElement = el;
                                }
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [ParentComponent, MyComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(componentElement).toEqual(parentElement);
                    });
                    it('should @SkipSelf on child directive node when injecting ElementRef on nested parent directive', () => {
                        let parentRef;
                        let childRef;
                        let ParentDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[parent]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentDirective = _classThis = class {
                                constructor(elementRef) {
                                    parentRef = elementRef;
                                }
                            };
                            __setFunctionName(_classThis, "ParentDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentDirective = _classThis;
                        })();
                        let ChildDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[child]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildDirective = _classThis = class {
                                constructor(elementRef) {
                                    childRef = elementRef;
                                }
                            };
                            __setFunctionName(_classThis, "ChildDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div parent>parent <span child>child</span></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentDirective, ChildDirective, MyComp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        // Assert against the `nativeElement` since Ivy always returns a new ElementRef.
                        expect(childRef.nativeElement).toBe(parentRef.nativeElement);
                        expect(childRef.nativeElement.tagName).toBe('DIV');
                    });
                });
                describe('@SkipSelf when parent contains embedded views', () => {
                    it('should work for `ElementRef` token', () => {
                        let requestedElementRef;
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(elementRef) {
                                    this.elementRef = elementRef;
                                    requestedElementRef = elementRef;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<div><child *ngIf="true"></child></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(requestedElementRef.nativeElement).toEqual(fixture.nativeElement.firstChild);
                        expect(requestedElementRef.nativeElement.tagName).toEqual('DIV');
                    });
                    it('should work for `ElementRef` token with expanded *ngIf', () => {
                        let requestedElementRef;
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(elementRef) {
                                    this.elementRef = elementRef;
                                    requestedElementRef = elementRef;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<div><ng-template [ngIf]="true"><child></child></ng-template></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(requestedElementRef.nativeElement).toEqual(fixture.nativeElement.firstChild);
                        expect(requestedElementRef.nativeElement.tagName).toEqual('DIV');
                    });
                    it('should work for `ViewContainerRef` token', () => {
                        let requestedRef;
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(ref) {
                                    this.ref = ref;
                                    requestedRef = ref;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<div><child *ngIf="true"></child></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(requestedRef.element.nativeElement).toBe(fixture.nativeElement.firstChild);
                        expect(requestedRef.element.nativeElement.tagName).toBe('DIV');
                    });
                    it('should work for `ChangeDetectorRef` token', () => {
                        let requestedChangeDetectorRef;
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(changeDetectorRef) {
                                    this.changeDetectorRef = changeDetectorRef;
                                    requestedChangeDetectorRef = changeDetectorRef;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<child *ngIf="true"></child>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        const { context } = requestedChangeDetectorRef;
                        expect(context).toBe(fixture.componentInstance);
                    });
                    // this works consistently between VE and Ivy
                    it('should work for Injectors', () => {
                        let childComponentInjector;
                        let parentComponentInjector;
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<child *ngIf="true"></child>',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'PARENT',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    parentComponentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    childComponentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(childComponentInjector.get('token')).toBe(parentComponentInjector.get('token'));
                    });
                    it('should work for Injectors with expanded *ngIf', () => {
                        let childComponentInjector;
                        let parentComponentInjector;
                        let ParentComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<ng-template [ngIf]="true"><child></child></ng-template>',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'PARENT',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    parentComponentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ParentComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentComponent = _classThis;
                        })();
                        let ChildComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    providers: [
                                        {
                                            provide: 'token',
                                            useValue: 'CHILD',
                                        },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    childComponentInjector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComponent = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentComponent, ChildComponent],
                        });
                        const fixture = testing_1.TestBed.createComponent(ParentComponent);
                        fixture.detectChanges();
                        expect(childComponentInjector.get('token')).toBe(parentComponentInjector.get('token'));
                    });
                });
                describe('TemplateRef', () => {
                    // SkipSelf doesn't make sense to use with TemplateRef since you
                    // can't inject TemplateRef on a regular element and you can initialize
                    // a child component on a nested `<ng-template>` only when a component/directive
                    // on a parent `<ng-template>` is initialized.
                    it('should throw when using @SkipSelf for TemplateRef', () => {
                        let MyDir = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[dir]',
                                    exportAs: 'dir',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyDir = _classThis = class {
                                constructor(templateRef) {
                                    this.templateRef = templateRef;
                                }
                            };
                            __setFunctionName(_classThis, "MyDir");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyDir = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyDir = _classThis;
                        })();
                        let ChildComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: '[child]',
                                    template: '<ng-template dir></ng-template>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _directive_decorators;
                            let _directive_initializers = [];
                            let _directive_extraInitializers = [];
                            var ChildComp = _classThis = class {
                                constructor(templateRef) {
                                    this.templateRef = templateRef;
                                    this.directive = __runInitializers(this, _directive_initializers, void 0);
                                    __runInitializers(this, _directive_extraInitializers);
                                    this.templateRef = templateRef;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                                __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComp = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<div child></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _child_decorators;
                            let _child_initializers = [];
                            let _child_extraInitializers = [];
                            var MyComp = _classThis = class {
                                constructor() {
                                    this.child = __runInitializers(this, _child_initializers, void 0);
                                    __runInitializers(this, _child_extraInitializers);
                                }
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _child_decorators = [(0, core_1.ViewChild)(ChildComp)];
                                __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [MyDir, ChildComp, MyComp],
                        });
                        const expectedErrorMessage = /NG0201: No provider for TemplateRef found/;
                        expect(() => {
                            const fixture = testing_1.TestBed.createComponent(MyComp);
                            fixture.detectChanges();
                        }).toThrowError(expectedErrorMessage);
                    });
                    it('should throw when SkipSelf and no parent TemplateRef', () => {
                        let DirA = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[dirA]',
                                    exportAs: 'dirA',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DirA = _classThis = class {
                                constructor(templateRef) {
                                    this.templateRef = templateRef;
                                }
                            };
                            __setFunctionName(_classThis, "DirA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DirA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DirA = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<ng-template dirA></ng-template>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [DirA, MyComp],
                        });
                        const expectedErrorMessage = /NG0201: No provider for TemplateRef found/;
                        expect(() => {
                            const fixture = testing_1.TestBed.createComponent(MyComp);
                            fixture.detectChanges();
                        }).toThrowError(expectedErrorMessage);
                    });
                    it('should not throw when SkipSelf and Optional', () => {
                        let directiveTemplateRef;
                        let DirA = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[dirA]',
                                    exportAs: 'dirA',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DirA = _classThis = class {
                                constructor(templateRef) {
                                    directiveTemplateRef = templateRef;
                                }
                            };
                            __setFunctionName(_classThis, "DirA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DirA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DirA = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<ng-template dirA></ng-template>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [DirA, MyComp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        expect(directiveTemplateRef).toBeNull();
                    });
                    it('should not throw when SkipSelf, Optional, and Host', () => {
                        let DirA = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[dirA]',
                                    exportAs: 'dirA',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var DirA = _classThis = class {
                                constructor(templateRef) {
                                    this.templateRef = templateRef;
                                }
                            };
                            __setFunctionName(_classThis, "DirA");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                DirA = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return DirA = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'root',
                                    template: '<ng-template dirA></ng-template>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [common_1.CommonModule],
                            declarations: [DirA, MyComp],
                        });
                        expect(() => testing_1.TestBed.createComponent(MyComp)).not.toThrowError();
                    });
                });
                describe('ViewContainerRef', () => {
                    it('should support @SkipSelf when injecting ViewContainerRef', () => {
                        let parentViewContainer;
                        let childViewContainer;
                        let ParentDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[parent]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentDirective = _classThis = class {
                                constructor(vc) {
                                    parentViewContainer = vc;
                                }
                            };
                            __setFunctionName(_classThis, "ParentDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentDirective = _classThis;
                        })();
                        let ChildDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[child]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildDirective = _classThis = class {
                                constructor(vc) {
                                    childViewContainer = vc;
                                }
                            };
                            __setFunctionName(_classThis, "ChildDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div parent>parent <span child>child</span></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentDirective, ChildDirective, MyComp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        // Assert against the `element` since Ivy always returns a new ViewContainerRef.
                        expect(childViewContainer.element.nativeElement).toBe(parentViewContainer.element.nativeElement);
                        expect(parentViewContainer.element.nativeElement.tagName).toBe('DIV');
                    });
                    it('should get ViewContainerRef using @SkipSelf and @Host', () => {
                        let parentViewContainer;
                        let childViewContainer;
                        let ParentDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[parent]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentDirective = _classThis = class {
                                constructor(vc) {
                                    parentViewContainer = vc;
                                }
                            };
                            __setFunctionName(_classThis, "ParentDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentDirective = _classThis;
                        })();
                        let ChildDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[child]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildDirective = _classThis = class {
                                constructor(vc) {
                                    childViewContainer = vc;
                                }
                            };
                            __setFunctionName(_classThis, "ChildDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div parent>parent <span child>child</span></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentDirective, ChildDirective, MyComp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        expect(childViewContainer.element.nativeElement).toBe(parentViewContainer.element.nativeElement);
                        expect(parentViewContainer.element.nativeElement.tagName).toBe('DIV');
                    });
                    it('should get ViewContainerRef using @SkipSelf and @Host on parent', () => {
                        let parentViewContainer;
                        let ParentDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[parent]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentDirective = _classThis = class {
                                constructor(vc) {
                                    parentViewContainer = vc;
                                }
                            };
                            __setFunctionName(_classThis, "ParentDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div parent>parent</div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [ParentDirective, MyComp] });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        expect(parentViewContainer.element.nativeElement.tagName).toBe('DIV');
                    });
                    it('should throw when injecting ViewContainerRef using @SkipSelf and no ViewContainerRef are available in a current view', () => {
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<span>component</span>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                                constructor(vc) { }
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                        expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/No provider for ViewContainerRef/);
                    });
                });
                describe('ChangeDetectorRef', () => {
                    it('should support @SkipSelf when injecting ChangeDetectorRef', () => {
                        let parentRef;
                        let childRef;
                        let ParentDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[parent]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ParentDirective = _classThis = class {
                                constructor(cdr) {
                                    parentRef = cdr;
                                }
                            };
                            __setFunctionName(_classThis, "ParentDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ParentDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ParentDirective = _classThis;
                        })();
                        let ChildDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[child]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildDirective = _classThis = class {
                                constructor(cdr) {
                                    childRef = cdr;
                                }
                            };
                            __setFunctionName(_classThis, "ChildDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div parent>parent <span child>child</span></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [ParentDirective, ChildDirective, MyComp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        // Assert against the `rootNodes` since Ivy always returns a new ChangeDetectorRef.
                        expect(parentRef.rootNodes).toEqual(childRef.rootNodes);
                    });
                    it('should inject host component ChangeDetectorRef when @SkipSelf', () => {
                        let childRef;
                        let ChildComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ChildComp = _classThis = class {
                                constructor(cdr) {
                                    childRef = cdr;
                                }
                            };
                            __setFunctionName(_classThis, "ChildComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ChildComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ChildComp = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div><child></child></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                                constructor(cdr) {
                                    this.cdr = cdr;
                                }
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [ChildComp, MyComp] });
                        const fixture = testing_1.TestBed.createComponent(MyComp);
                        fixture.detectChanges();
                        // Assert against the `rootNodes` since Ivy always returns a new ChangeDetectorRef.
                        expect(childRef.rootNodes).toEqual(fixture.componentInstance.cdr.rootNodes);
                    });
                    it('should throw when ChangeDetectorRef and @SkipSelf and not found', () => {
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: '<div></div>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let MyModule = (() => {
                            let _classDecorators = [(0, core_1.NgModule)({
                                    declarations: [MyComponent],
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyModule = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyModule");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyModule = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyModule = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [MyModule],
                        });
                        expect(() => testing_1.TestBed.createComponent(MyComponent)).toThrowError(/No provider for ChangeDetectorRef/);
                    });
                    it('should lookup module injector in case @SkipSelf is used for `ChangeDetectorRef` token and Component has no parent', () => {
                        let componentCDR;
                        let moduleCDR;
                        let MyComponent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '...',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComponent = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    componentCDR = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyComponent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComponent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComponent = _classThis;
                        })();
                        let MyModule = (() => {
                            let _classDecorators = [(0, core_1.NgModule)({
                                    declarations: [MyComponent],
                                    providers: [
                                        {
                                            provide: core_1.ChangeDetectorRef,
                                            useValue: { from: 'NG_MODULE' },
                                        },
                                    ],
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyModule = _classThis = class {
                                constructor(injector) {
                                    this.injector = injector;
                                    moduleCDR = injector;
                                }
                            };
                            __setFunctionName(_classThis, "MyModule");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyModule = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyModule = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            imports: [MyModule],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyComponent);
                        fixture.detectChanges();
                        expect(moduleCDR.from).toBe('NG_MODULE');
                        expect(componentCDR.from).toBe('NG_MODULE');
                    });
                });
                describe('viewProviders', () => {
                    it('should support @SkipSelf when using viewProviders', () => {
                        let Child = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '{{ blah | json }}<br />{{ foo | json }}<br />{{ bar | json }}',
                                    providers: [{ provide: 'Blah', useValue: 'Blah as Provider' }],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Child = _classThis = class {
                                constructor(blah, foo, bar) {
                                    this.blah = blah;
                                    this.foo = foo;
                                    this.bar = bar;
                                }
                            };
                            __setFunctionName(_classThis, "Child");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Child = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Child = _classThis;
                        })();
                        let Parent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<ng-content></ng-content>',
                                    providers: [
                                        { provide: 'Blah', useValue: 'Blah as provider' },
                                        { provide: 'Bar', useValue: 'Bar as Provider' },
                                    ],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Parent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "Parent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Parent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Parent = _classThis;
                        })();
                        let MyApp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-app',
                                    template: '<parent><child></child></parent>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            let _parent_decorators;
                            let _parent_initializers = [];
                            let _parent_extraInitializers = [];
                            let _child_decorators;
                            let _child_initializers = [];
                            let _child_extraInitializers = [];
                            var MyApp = _classThis = class {
                                constructor() {
                                    this.parent = __runInitializers(this, _parent_initializers, void 0);
                                    this.child = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _child_initializers, void 0));
                                    __runInitializers(this, _child_extraInitializers);
                                }
                            };
                            __setFunctionName(_classThis, "MyApp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                _parent_decorators = [(0, core_1.ViewChild)(Parent)];
                                _child_decorators = [(0, core_1.ViewChild)(Child)];
                                __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                                __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyApp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyApp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent, MyApp] });
                        const fixture = testing_1.TestBed.createComponent(MyApp);
                        fixture.detectChanges();
                        const child = fixture.componentInstance.child;
                        expect(child.bar).toBe('Bar as Provider');
                    });
                    it('should throw when @SkipSelf and no accessible viewProvider', () => {
                        let Child = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '{{ blah | json }}<br />{{ foo | json }}<br />{{ bar | json }}',
                                    providers: [{ provide: 'Blah', useValue: 'Blah as Provider' }],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Child = _classThis = class {
                                constructor(blah, foo, bar) {
                                    this.blah = blah;
                                    this.foo = foo;
                                    this.bar = bar;
                                }
                            };
                            __setFunctionName(_classThis, "Child");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Child = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Child = _classThis;
                        })();
                        let Parent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<ng-content></ng-content>',
                                    providers: [{ provide: 'Blah', useValue: 'Blah as provider' }],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Parent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "Parent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Parent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Parent = _classThis;
                        })();
                        let MyApp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-app',
                                    template: '<parent><child></child></parent>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyApp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyApp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyApp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyApp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent, MyApp] });
                        expect(() => testing_1.TestBed.createComponent(MyApp)).toThrowError(/No provider for Bar/);
                    });
                    it('should not throw when @SkipSelf and @Optional with no accessible viewProvider', () => {
                        let Child = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'child',
                                    template: '{{ blah | json }}<br />{{ foo | json }}<br />{{ bar | json }}',
                                    providers: [{ provide: 'Blah', useValue: 'Blah as Provider' }],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Child = _classThis = class {
                                constructor(blah, foo, bar) {
                                    this.blah = blah;
                                    this.foo = foo;
                                    this.bar = bar;
                                }
                            };
                            __setFunctionName(_classThis, "Child");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Child = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Child = _classThis;
                        })();
                        let Parent = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'parent',
                                    template: '<ng-content></ng-content>',
                                    providers: [{ provide: 'Blah', useValue: 'Blah as provider' }],
                                    viewProviders: [
                                        { provide: 'Foo', useValue: 'Foo as ViewProvider' },
                                        { provide: 'Bar', useValue: 'Bar as ViewProvider' },
                                    ],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var Parent = _classThis = class {
                            };
                            __setFunctionName(_classThis, "Parent");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                Parent = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return Parent = _classThis;
                        })();
                        let MyApp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-app',
                                    template: '<parent><child></child></parent>',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyApp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyApp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyApp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyApp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent, MyApp] });
                        expect(() => testing_1.TestBed.createComponent(MyApp)).not.toThrowError(/No provider for Bar/);
                    });
                });
            });
            describe('@Host', () => {
                let DirectiveA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirA]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirectiveA = _classThis = class {
                        constructor(dirB) {
                            this.dirB = dirB;
                        }
                    };
                    __setFunctionName(_classThis, "DirectiveA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirectiveA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirectiveA = _classThis;
                })();
                let DirectiveString = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dirString]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirectiveString = _classThis = class {
                        constructor(s) {
                            this.s = s;
                        }
                    };
                    __setFunctionName(_classThis, "DirectiveString");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirectiveString = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirectiveString = _classThis;
                })();
                it('should find viewProviders on the host itself', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<div dirString></div>',
                                viewProviders: [{ provide: String, useValue: 'Foo' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirString_decorators;
                        let _dirString_initializers = [];
                        let _dirString_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirString = __runInitializers(this, _dirString_initializers, void 0);
                                __runInitializers(this, _dirString_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirString_decorators = [(0, core_1.ViewChild)(DirectiveString)];
                            __esDecorate(null, null, _dirString_decorators, { kind: "field", name: "dirString", static: false, private: false, access: { has: obj => "dirString" in obj, get: obj => obj.dirString, set: (obj, value) => { obj.dirString = value; } }, metadata: _metadata }, _dirString_initializers, _dirString_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp></my-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _myComp_decorators;
                        let _myComp_initializers = [];
                        let _myComp_extraInitializers = [];
                        var MyApp = _classThis = class {
                            constructor() {
                                this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                                __runInitializers(this, _myComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                            __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveString, MyComp, MyApp] });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    const dirString = fixture.componentInstance.myComp.dirString;
                    expect(dirString.s).toBe('Foo');
                });
                it('should not find providers on the host itself', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<div dirString></div>',
                                providers: [{ provide: String, useValue: 'Foo' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp></my-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyApp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveString, MyComp, MyApp] });
                    expect(() => testing_1.TestBed.createComponent(MyApp)).toThrowError('NG0201: No provider for String found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
                });
                it('should not find other directives on the host itself', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<div dirA></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp dirB></my-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyApp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
                    expect(() => testing_1.TestBed.createComponent(MyApp)).toThrowError(/NG0201: No provider for DirectiveB found in NodeInjector/);
                });
                it('should not find providers on the host itself if in inline view', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<ng-container *ngIf="showing"><div dirA></div></ng-container>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor() {
                                this.showing = false;
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp dirB></my-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _myComp_decorators;
                        let _myComp_initializers = [];
                        let _myComp_extraInitializers = [];
                        var MyApp = _classThis = class {
                            constructor() {
                                this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                                __runInitializers(this, _myComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                            __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyComp, MyApp] });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    expect(() => {
                        fixture.componentInstance.myComp.showing = true;
                        fixture.detectChanges();
                    }).toThrowError(/NG0201: No provider for DirectiveB found in NodeInjector/);
                });
                it('should find providers across embedded views if not passing component boundary', () => {
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirB><div *ngIf="showing" dirA></div></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirA_decorators;
                        let _dirA_initializers = [];
                        let _dirA_extraInitializers = [];
                        let _dirB_decorators;
                        let _dirB_initializers = [];
                        let _dirB_extraInitializers = [];
                        var MyApp = _classThis = class {
                            constructor() {
                                this.showing = false;
                                this.dirA = __runInitializers(this, _dirA_initializers, void 0);
                                this.dirB = (__runInitializers(this, _dirA_extraInitializers), __runInitializers(this, _dirB_initializers, void 0));
                                __runInitializers(this, _dirB_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirA_decorators = [(0, core_1.ViewChild)(DirectiveA)];
                            _dirB_decorators = [(0, core_1.ViewChild)(DirectiveB)];
                            __esDecorate(null, null, _dirA_decorators, { kind: "field", name: "dirA", static: false, private: false, access: { has: obj => "dirA" in obj, get: obj => obj.dirA, set: (obj, value) => { obj.dirA = value; } }, metadata: _metadata }, _dirA_initializers, _dirA_extraInitializers);
                            __esDecorate(null, null, _dirB_decorators, { kind: "field", name: "dirB", static: false, private: false, access: { has: obj => "dirB" in obj, get: obj => obj.dirB, set: (obj, value) => { obj.dirB = value; } }, metadata: _metadata }, _dirB_initializers, _dirB_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveA, DirectiveB, MyApp] });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    fixture.componentInstance.showing = true;
                    fixture.detectChanges();
                    const dirA = fixture.componentInstance.dirA;
                    const dirB = fixture.componentInstance.dirB;
                    expect(dirA.dirB).toBe(dirB);
                });
                it('should not find component above the host', () => {
                    let MyApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<my-comp></my-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyApp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyApp = _classThis;
                    })();
                    let DirectiveComp = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirComp]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveComp = _classThis = class {
                            constructor(comp) {
                                this.comp = comp;
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveComp = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'my-comp',
                                template: '<div dirComp></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveComp, MyComp, MyApp] });
                    expect(() => testing_1.TestBed.createComponent(MyApp)).toThrowError('NG0201: No provider for MyApp found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
                });
                describe('regression', () => {
                    // based on https://stackblitz.com/edit/angular-riss8k?file=src/app/app.component.ts
                    it('should allow directives with Host flag to inject view providers from containing component', () => {
                        class ControlContainer {
                        }
                        let controlContainers = [];
                        let injectedControlContainer = null;
                        let GroupDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[group]',
                                    providers: [{ provide: ControlContainer, useExisting: GroupDirective }],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var GroupDirective = _classThis = class {
                                constructor() {
                                    controlContainers.push(this);
                                }
                            };
                            __setFunctionName(_classThis, "GroupDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                GroupDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return GroupDirective = _classThis;
                        })();
                        let ControlDirective = (() => {
                            let _classDecorators = [(0, core_1.Directive)({
                                    selector: '[control]',
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var ControlDirective = _classThis = class {
                                constructor(parent) {
                                    injectedControlContainer = parent;
                                }
                            };
                            __setFunctionName(_classThis, "ControlDirective");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                ControlDirective = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return ControlDirective = _classThis;
                        })();
                        let MyComp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    selector: 'my-comp',
                                    template: '<input control>',
                                    viewProviders: [{ provide: ControlContainer, useExisting: GroupDirective }],
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyComp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyComp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyComp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyComp = _classThis;
                        })();
                        let MyApp = (() => {
                            let _classDecorators = [(0, core_1.Component)({
                                    template: `
                   <div group>
                     <my-comp></my-comp>
                   </div>
                 `,
                                    standalone: false,
                                })];
                            let _classDescriptor;
                            let _classExtraInitializers = [];
                            let _classThis;
                            var MyApp = _classThis = class {
                            };
                            __setFunctionName(_classThis, "MyApp");
                            (() => {
                                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                                MyApp = _classThis = _classDescriptor.value;
                                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                                __runInitializers(_classThis, _classExtraInitializers);
                            })();
                            return MyApp = _classThis;
                        })();
                        testing_1.TestBed.configureTestingModule({
                            declarations: [GroupDirective, ControlDirective, MyComp, MyApp],
                        });
                        const fixture = testing_1.TestBed.createComponent(MyApp);
                        expect(fixture.nativeElement.innerHTML).toBe('<div group=""><my-comp><input control=""></my-comp></div>');
                        expect(controlContainers).toEqual([injectedControlContainer]);
                    });
                });
            });
            describe('`InjectFlags` support in NodeInjector', () => {
                it('should support Optional flag in NodeInjector', () => {
                    const NON_EXISTING_PROVIDER = new core_1.InjectionToken('non-existing');
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '...',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            constructor(injector, tokenViaConstructor) {
                                this.injector = injector;
                                this.tokenViaConstructor = tokenViaConstructor;
                                this.tokenViaInjector = this.injector.get(NON_EXISTING_PROVIDER, null, {
                                    optional: true,
                                });
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    expect(fixture.componentInstance.tokenViaInjector).toBe(null);
                    expect(fixture.componentInstance.tokenViaInjector).toBe(fixture.componentInstance.tokenViaConstructor);
                });
                it('should support SkipSelf flag in NodeInjector', () => {
                    const TOKEN = new core_1.InjectionToken('token');
                    let ParentComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'parent',
                                template: '<child></child>',
                                providers: [
                                    {
                                        provide: TOKEN,
                                        useValue: 'PARENT',
                                    },
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentComponent = _classThis = class {
                        };
                        __setFunctionName(_classThis, "ParentComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentComponent = _classThis;
                    })();
                    let ChildComponent = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'child',
                                template: '...',
                                providers: [
                                    {
                                        provide: TOKEN,
                                        useValue: 'CHILD',
                                    },
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ChildComponent = _classThis = class {
                            constructor(injector, tokenViaConstructor) {
                                this.injector = injector;
                                this.tokenViaConstructor = tokenViaConstructor;
                                this.tokenViaInjector = this.injector.get(TOKEN, null, { skipSelf: true });
                            }
                        };
                        __setFunctionName(_classThis, "ChildComponent");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildComponent = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildComponent = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [ParentComponent, ChildComponent],
                    });
                    const fixture = testing_1.TestBed.createComponent(ParentComponent);
                    fixture.detectChanges();
                    const childComponent = fixture.debugElement.query(platform_browser_1.By.directive(ChildComponent)).componentInstance;
                    expect(childComponent.tokenViaInjector).toBe('PARENT');
                    expect(childComponent.tokenViaConstructor).toBe(childComponent.tokenViaInjector);
                });
                it('should support Host flag in NodeInjector', () => {
                    const TOKEN = new core_1.InjectionToken('token');
                    let DirectiveString = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirString]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveString = _classThis = class {
                            constructor(injector, tokenViaConstructor) {
                                this.injector = injector;
                                this.tokenViaConstructor = tokenViaConstructor;
                                this.tokenViaInjector = this.injector.get(TOKEN, null, { host: true });
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveString");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveString = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveString = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirString></div>',
                                viewProviders: [{ provide: TOKEN, useValue: 'Foo' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirString_decorators;
                        let _dirString_initializers = [];
                        let _dirString_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirString = __runInitializers(this, _dirString_initializers, void 0);
                                __runInitializers(this, _dirString_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirString_decorators = [(0, core_1.ViewChild)(DirectiveString)];
                            __esDecorate(null, null, _dirString_decorators, { kind: "field", name: "dirString", static: false, private: false, access: { has: obj => "dirString" in obj, get: obj => obj.dirString, set: (obj, value) => { obj.dirString = value; } }, metadata: _metadata }, _dirString_initializers, _dirString_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveString, MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    const dirString = fixture.componentInstance.dirString;
                    expect(dirString.tokenViaConstructor).toBe('Foo');
                    expect(dirString.tokenViaConstructor).toBe(dirString.tokenViaInjector);
                });
                it('should support multiple flags in NodeInjector', () => {
                    let DirectiveA = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirA]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveA = _classThis = class {
                        };
                        __setFunctionName(_classThis, "DirectiveA");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveA = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveA = _classThis;
                    })();
                    let DirectiveB = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[dirB]',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var DirectiveB = _classThis = class {
                            constructor(injector, tokenSelfViaConstructor, tokenHostViaConstructor) {
                                this.injector = injector;
                                this.tokenSelfViaConstructor = tokenSelfViaConstructor;
                                this.tokenHostViaConstructor = tokenHostViaConstructor;
                                this.tokenSelfViaInjector = this.injector.get(DirectiveA, null, {
                                    self: true,
                                    optional: true,
                                });
                                this.tokenHostViaInjector = this.injector.get(DirectiveA, null, {
                                    host: true,
                                    optional: true,
                                });
                            }
                        };
                        __setFunctionName(_classThis, "DirectiveB");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            DirectiveB = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return DirectiveB = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div dirB></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _dirB_decorators;
                        let _dirB_initializers = [];
                        let _dirB_extraInitializers = [];
                        var MyComp = _classThis = class {
                            constructor() {
                                this.dirB = __runInitializers(this, _dirB_initializers, void 0);
                                __runInitializers(this, _dirB_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _dirB_decorators = [(0, core_1.ViewChild)(DirectiveB)];
                            __esDecorate(null, null, _dirB_decorators, { kind: "field", name: "dirB", static: false, private: false, access: { has: obj => "dirB" in obj, get: obj => obj.dirB, set: (obj, value) => { obj.dirB = value; } }, metadata: _metadata }, _dirB_initializers, _dirB_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [DirectiveB, MyComp] });
                    const fixture = testing_1.TestBed.createComponent(MyComp);
                    fixture.detectChanges();
                    const dirB = fixture.componentInstance.dirB;
                    expect(dirB.tokenSelfViaInjector).toBeNull();
                    expect(dirB.tokenSelfViaInjector).toBe(dirB.tokenSelfViaConstructor);
                    expect(dirB.tokenHostViaInjector).toBeNull();
                    expect(dirB.tokenHostViaInjector).toBe(dirB.tokenHostViaConstructor);
                });
            });
        });
    });
    describe('Tree shakable injectors', () => {
        it('should support tree shakable injectors scopes', () => {
            let AnyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'any' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnyService = _classThis = class {
                    constructor(injector) {
                        this.injector = injector;
                    }
                };
                __setFunctionName(_classThis, "AnyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnyService = _classThis;
            })();
            let RootService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootService = _classThis = class {
                    constructor(injector) {
                        this.injector = injector;
                    }
                };
                __setFunctionName(_classThis, "RootService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootService = _classThis;
            })();
            let PlatformService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'platform' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var PlatformService = _classThis = class {
                    constructor(injector) {
                        this.injector = injector;
                    }
                };
                __setFunctionName(_classThis, "PlatformService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    PlatformService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return PlatformService = _classThis;
            })();
            const testBedInjector = testing_1.TestBed.inject(core_1.Injector);
            const childInjector = core_1.Injector.create({ providers: [], parent: testBedInjector });
            const anyService = childInjector.get(AnyService);
            expect(anyService.injector).toBe(childInjector);
            const rootService = childInjector.get(RootService);
            expect(rootService.injector.get(core_1.ɵINJECTOR_SCOPE)).toBe('root');
            const platformService = childInjector.get(PlatformService);
            expect(platformService.injector.get(core_1.ɵINJECTOR_SCOPE)).toBe('platform');
        });
        it('should create a provider that uses `forwardRef` inside `providedIn`', () => {
            let ProviderDep = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProviderDep = _classThis = class {
                    getNumber() {
                        return 3;
                    }
                };
                __setFunctionName(_classThis, "ProviderDep");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProviderDep = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProviderDep = _classThis;
            })();
            let Provider = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: (0, core_1.forwardRef)(() => Module) })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Provider = _classThis = class {
                    constructor(_dep) {
                        this._dep = _dep;
                        this.value = this._dep.getNumber() + 2;
                    }
                };
                __setFunctionName(_classThis, "Provider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Provider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Provider = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor(provider) {
                        this.provider = provider;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [Comp], exports: [Comp], providers: [ProviderDep] })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            expect(fixture.componentInstance.provider.value).toBe(5);
        });
    });
    describe('service injection', () => {
        it('should create instance even when no injector present', () => {
            let MyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyService = _classThis = class {
                    constructor() {
                        this.value = 'MyService';
                    }
                };
                __setFunctionName(_classThis, "MyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyService = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div>{{myService.value}}</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(myService) {
                        this.myService = myService;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const divElement = fixture.nativeElement.querySelector('div');
            expect(divElement.textContent).toEqual('MyService');
        });
        it('should support sub-classes with no @Injectable decorator', () => {
            let Dependency = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dependency = _classThis = class {
                };
                __setFunctionName(_classThis, "Dependency");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dependency = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dependency = _classThis;
            })();
            let SuperClass = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SuperClass = _classThis = class {
                    constructor(dep) {
                        this.dep = dep;
                    }
                };
                __setFunctionName(_classThis, "SuperClass");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SuperClass = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SuperClass = _classThis;
            })();
            // Note, no @Injectable decorators for these two classes
            class SubClass extends SuperClass {
            }
            class SubSubClass extends SubClass {
            }
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(myService) {
                        this.myService = myService;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [{ provide: SuperClass, useClass: SubSubClass }, Dependency],
            });
            const warnSpy = spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            expect(fixture.componentInstance.myService.dep instanceof Dependency).toBe(true);
            expect(warnSpy).toHaveBeenCalledWith(`DEPRECATED: DI is instantiating a token "SubSubClass" that inherits its @Injectable decorator but does not provide one itself.\n` +
                `This will become an error in a future version of Angular. Please add @Injectable() to the "SubSubClass" class.`);
        });
        it('should instantiate correct class when undecorated class extends an injectable', () => {
            let MyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyService = _classThis = class {
                    constructor() {
                        this.id = 1;
                    }
                };
                __setFunctionName(_classThis, "MyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyService = _classThis;
            })();
            class MyRootService extends MyService {
                constructor() {
                    super(...arguments);
                    this.id = 2;
                }
            }
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App], providers: [MyRootService] });
            const warnSpy = spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const provider = testing_1.TestBed.inject(MyRootService);
            expect(provider instanceof MyRootService).toBe(true);
            expect(provider.id).toBe(2);
            expect(warnSpy).toHaveBeenCalledWith(`DEPRECATED: DI is instantiating a token "MyRootService" that inherits its @Injectable decorator but does not provide one itself.\n` +
                `This will become an error in a future version of Angular. Please add @Injectable() to the "MyRootService" class.`);
        });
        it('should inject services in constructor with overloads', () => {
            let MyService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyService = _classThis = class {
                };
                __setFunctionName(_classThis, "MyService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyService = _classThis;
            })();
            let MyOtherService = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyOtherService = _classThis = class {
                };
                __setFunctionName(_classThis, "MyOtherService");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyOtherService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyOtherService = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(myService, myOtherService) {
                        this.myService = myService;
                        this.myOtherService = myOtherService;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.myService instanceof MyService).toBe(true);
            expect(fixture.componentInstance.myOtherService instanceof MyOtherService).toBe(true);
        });
    });
    describe('service injection with useClass', () => {
        let BarServiceDep = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BarServiceDep = _classThis = class {
                constructor() {
                    this.name = 'BarServiceDep';
                }
            };
            __setFunctionName(_classThis, "BarServiceDep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BarServiceDep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BarServiceDep = _classThis;
        })();
        let BarService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BarService = _classThis = class {
                constructor(dep) {
                    this.dep = dep;
                }
                getMessage() {
                    return 'bar';
                }
            };
            __setFunctionName(_classThis, "BarService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BarService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BarService = _classThis;
        })();
        let FooServiceDep = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var FooServiceDep = _classThis = class {
                constructor() {
                    this.name = 'FooServiceDep';
                }
            };
            __setFunctionName(_classThis, "FooServiceDep");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                FooServiceDep = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return FooServiceDep = _classThis;
        })();
        let FooService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useClass: BarService })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var FooService = _classThis = class {
                constructor(dep) {
                    this.dep = dep;
                }
                getMessage() {
                    return 'foo';
                }
            };
            __setFunctionName(_classThis, "FooService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                FooService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return FooService = _classThis;
        })();
        it('should use @Injectable useClass config when token is not provided', () => {
            let provider;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(service) {
                        provider = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(provider.getMessage()).toBe('bar');
            expect(provider.dep.name).toBe('BarServiceDep');
        });
        it('should use constructor config directly when token is explicitly provided via useClass', () => {
            let provider;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(service) {
                        provider = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
                providers: [{ provide: FooService, useClass: FooService }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(provider.getMessage()).toBe('foo');
        });
        it('should inject correct provider when re-providing an injectable that has useClass', () => {
            let directProvider;
            let overriddenProvider;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(overriddenService, service) {
                        overriddenProvider = overriddenService;
                        directProvider = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
                providers: [{ provide: 'stringToken', useClass: FooService }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(directProvider.getMessage()).toBe('bar');
            expect(overriddenProvider.getMessage()).toBe('foo');
            expect(directProvider.dep.name).toBe('BarServiceDep');
            expect(overriddenProvider.dep.name).toBe('FooServiceDep');
        });
        it('should use constructor config directly when token is explicitly provided as a type provider', () => {
            let provider;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(service) {
                        provider = service;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App], providers: [FooService] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(provider.getMessage()).toBe('foo');
            expect(provider.dep.name).toBe('FooServiceDep');
        });
    });
    describe('inject', () => {
        it('should inject from parent view', () => {
            let ParentDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[parentDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentDirective = _classThis;
            })();
            let ChildDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[childDir]',
                        exportAs: 'childDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDirective = _classThis = class {
                    constructor(parent) {
                        this.parent = parent;
                        this.value = parent.constructor.name;
                    }
                };
                __setFunctionName(_classThis, "ChildDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDirective = _classThis;
            })();
            let Child2Directive = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child2Dir]',
                        exportAs: 'child2Dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child2Directive = _classThis = class {
                    constructor(parent, child) {
                        this.value = parent === child.parent;
                    }
                };
                __setFunctionName(_classThis, "Child2Directive");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child2Directive = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child2Directive = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div parentDir>
          <ng-container *ngIf="showing">
            <span childDir child2Dir #child1="childDir" #child2="child2Dir">{{ child1.value }}-{{ child2.value }}</span>
          </ng-container>
        </div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.showing = true;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [ParentDirective, ChildDirective, Child2Directive, MyComp],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const divElement = fixture.nativeElement.querySelector('div');
            expect(divElement.textContent).toBe('ParentDirective-true');
        });
    });
    describe('Special tokens', () => {
        describe('Injector', () => {
            it('should inject the injector', () => {
                let InjectorDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[injectorDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InjectorDir = _classThis = class {
                        constructor(injector) {
                            this.injector = injector;
                        }
                    };
                    __setFunctionName(_classThis, "InjectorDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InjectorDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InjectorDir = _classThis;
                })();
                let OtherInjectorDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[otherInjectorDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OtherInjectorDir = _classThis = class {
                        constructor(otherDir, injector) {
                            this.otherDir = otherDir;
                            this.injector = injector;
                        }
                    };
                    __setFunctionName(_classThis, "OtherInjectorDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OtherInjectorDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OtherInjectorDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div injectorDir otherInjectorDir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _injectorDir_decorators;
                    let _injectorDir_initializers = [];
                    let _injectorDir_extraInitializers = [];
                    let _otherInjectorDir_decorators;
                    let _otherInjectorDir_initializers = [];
                    let _otherInjectorDir_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.injectorDir = __runInitializers(this, _injectorDir_initializers, void 0);
                            this.otherInjectorDir = (__runInitializers(this, _injectorDir_extraInitializers), __runInitializers(this, _otherInjectorDir_initializers, void 0));
                            __runInitializers(this, _otherInjectorDir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _injectorDir_decorators = [(0, core_1.ViewChild)(InjectorDir)];
                        _otherInjectorDir_decorators = [(0, core_1.ViewChild)(OtherInjectorDir)];
                        __esDecorate(null, null, _injectorDir_decorators, { kind: "field", name: "injectorDir", static: false, private: false, access: { has: obj => "injectorDir" in obj, get: obj => obj.injectorDir, set: (obj, value) => { obj.injectorDir = value; } }, metadata: _metadata }, _injectorDir_initializers, _injectorDir_extraInitializers);
                        __esDecorate(null, null, _otherInjectorDir_decorators, { kind: "field", name: "otherInjectorDir", static: false, private: false, access: { has: obj => "otherInjectorDir" in obj, get: obj => obj.otherInjectorDir, set: (obj, value) => { obj.otherInjectorDir = value; } }, metadata: _metadata }, _otherInjectorDir_initializers, _otherInjectorDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [InjectorDir, OtherInjectorDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                const injectorDir = fixture.componentInstance.injectorDir;
                const otherInjectorDir = fixture.componentInstance.otherInjectorDir;
                expect(injectorDir.injector.get(core_1.ElementRef).nativeElement).toBe(divElement);
                expect(otherInjectorDir.injector.get(core_1.ElementRef).nativeElement).toBe(divElement);
                expect(otherInjectorDir.injector.get(InjectorDir)).toBe(injectorDir);
                expect(injectorDir.injector).not.toBe(otherInjectorDir.injector);
            });
            it('should inject INJECTOR', () => {
                let InjectorDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[injectorDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InjectorDir = _classThis = class {
                        constructor(injector) {
                            this.injector = injector;
                        }
                    };
                    __setFunctionName(_classThis, "InjectorDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InjectorDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InjectorDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div injectorDir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _injectorDir_decorators;
                    let _injectorDir_initializers = [];
                    let _injectorDir_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.injectorDir = __runInitializers(this, _injectorDir_initializers, void 0);
                            __runInitializers(this, _injectorDir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _injectorDir_decorators = [(0, core_1.ViewChild)(InjectorDir)];
                        __esDecorate(null, null, _injectorDir_decorators, { kind: "field", name: "injectorDir", static: false, private: false, access: { has: obj => "injectorDir" in obj, get: obj => obj.injectorDir, set: (obj, value) => { obj.injectorDir = value; } }, metadata: _metadata }, _injectorDir_initializers, _injectorDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [InjectorDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                const injectorDir = fixture.componentInstance.injectorDir;
                expect(injectorDir.injector.get(core_1.ElementRef).nativeElement).toBe(divElement);
                expect(injectorDir.injector.get(core_1.Injector).get(core_1.ElementRef).nativeElement).toBe(divElement);
                expect(injectorDir.injector.get(core_1.INJECTOR).get(core_1.ElementRef).nativeElement).toBe(divElement);
            });
        });
        describe('ElementRef', () => {
            it('should create directive with ElementRef dependencies', () => {
                let MyDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyDir = _classThis = class {
                        constructor(elementRef) {
                            this.elementRef = elementRef;
                            this.value = elementRef.constructor.name;
                        }
                    };
                    __setFunctionName(_classThis, "MyDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyDir = _classThis;
                })();
                let MyOtherDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[otherDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyOtherDir = _classThis = class {
                        constructor(elementRef, directive) {
                            this.elementRef = elementRef;
                            this.directive = directive;
                            this.isSameInstance = elementRef === directive.elementRef;
                        }
                    };
                    __setFunctionName(_classThis, "MyOtherDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyOtherDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyOtherDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div dir otherDir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyOtherDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const divElement = fixture.nativeElement.querySelector('div');
                const directive = fixture.componentInstance.directive;
                const otherDirective = fixture.componentInstance.otherDirective;
                expect(directive.value).toContain('ElementRef');
                expect(directive.elementRef.nativeElement).toEqual(divElement);
                expect(otherDirective.elementRef.nativeElement).toEqual(divElement);
                // Each ElementRef instance should be unique
                expect(otherDirective.isSameInstance).toBe(false);
            });
            it('should create ElementRef with comment if requesting directive is on <ng-template> node', () => {
                let MyDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyDir = _classThis = class {
                        constructor(elementRef) {
                            this.elementRef = elementRef;
                            this.value = elementRef.constructor.name;
                        }
                    };
                    __setFunctionName(_classThis, "MyDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<ng-template dir></ng-template>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            __runInitializers(this, _directive_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const directive = fixture.componentInstance.directive;
                expect(directive.value).toContain('ElementRef');
                // the nativeElement should be a comment
                expect(directive.elementRef.nativeElement.nodeType).toEqual(Node.COMMENT_NODE);
            });
            it('should be available if used in conjunction with other tokens', () => {
                let ServiceA = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ServiceA = _classThis = class {
                        constructor(zone) {
                            this.zone = zone;
                            this.subject = new rxjs_1.BehaviorSubject(1);
                            // trigger change detection
                            zone.run(() => {
                                this.subject.next(2);
                            });
                        }
                    };
                    __setFunctionName(_classThis, "ServiceA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ServiceA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ServiceA = _classThis;
                })();
                let DirectiveA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirectiveA = _classThis = class {
                        constructor(service, elementRef) {
                            this.service = service;
                            this.elementRef = elementRef;
                        }
                    };
                    __setFunctionName(_classThis, "DirectiveA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirectiveA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirectiveA = _classThis;
                })();
                let ChildComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child',
                            template: `<div id="test-id" dir></div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    var ChildComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            __runInitializers(this, _directive_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "ChildComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(DirectiveA)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildComp = _classThis;
                })();
                let RootComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'root',
                            template: '...',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RootComp = _classThis = class {
                        constructor(vcr) {
                            this.vcr = vcr;
                        }
                        create() {
                            this.childCompRef = this.vcr.createComponent(ChildComp);
                            this.childCompRef.changeDetectorRef.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "RootComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RootComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RootComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [DirectiveA, RootComp, ChildComp],
                    providers: [ServiceA],
                });
                const fixture = testing_1.TestBed.createComponent(RootComp);
                fixture.autoDetectChanges();
                fixture.componentInstance.create();
                const { elementRef } = fixture.componentInstance.childCompRef.instance.directive;
                expect(elementRef.nativeElement.id).toBe('test-id');
            });
        });
        describe('TemplateRef', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        exportAs: 'dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(templateRef) {
                        this.templateRef = templateRef;
                        this.value = templateRef.constructor.name;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            it('should create directive with TemplateRef dependencies', () => {
                let MyOtherDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[otherDir]',
                            exportAs: 'otherDir',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyOtherDir = _classThis = class {
                        constructor(templateRef, directive) {
                            this.templateRef = templateRef;
                            this.directive = directive;
                            this.isSameInstance = templateRef === directive.templateRef;
                        }
                    };
                    __setFunctionName(_classThis, "MyOtherDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyOtherDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyOtherDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<ng-template dir otherDir #dir="dir" #otherDir="otherDir"></ng-template>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyOtherDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const directive = fixture.componentInstance.directive;
                const otherDirective = fixture.componentInstance.otherDirective;
                expect(directive.value).toContain('TemplateRef');
                expect(directive.templateRef).not.toBeNull();
                expect(otherDirective.templateRef).not.toBeNull();
                // Each TemplateRef instance should be unique
                expect(otherDirective.isSameInstance).toBe(false);
            });
            it('should throw if injected on an element', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div dir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
                expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/No provider for TemplateRef/);
            });
            it('should throw if injected on an ng-container', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<ng-container dir></ng-container>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
                expect(() => testing_1.TestBed.createComponent(MyComp)).toThrowError(/No provider for TemplateRef/);
            });
            it('should NOT throw if optional and injected on an element', () => {
                let OptionalDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[optionalDir]',
                            exportAs: 'optionalDir',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var OptionalDir = _classThis = class {
                        constructor(templateRef) {
                            this.templateRef = templateRef;
                        }
                    };
                    __setFunctionName(_classThis, "OptionalDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OptionalDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OptionalDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div optionalDir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            __runInitializers(this, _directive_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(OptionalDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [OptionalDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                expect(fixture.componentInstance.directive.templateRef).toBeNull();
            });
        });
        describe('ViewContainerRef', () => {
            it('should create directive with ViewContainerRef dependencies', () => {
                let MyDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir]',
                            exportAs: 'dir',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyDir = _classThis = class {
                        constructor(viewContainerRef) {
                            this.viewContainerRef = viewContainerRef;
                            this.value = viewContainerRef.constructor.name;
                        }
                    };
                    __setFunctionName(_classThis, "MyDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyDir = _classThis;
                })();
                let MyOtherDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[otherDir]',
                            exportAs: 'otherDir',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyOtherDir = _classThis = class {
                        constructor(viewContainerRef, directive) {
                            this.viewContainerRef = viewContainerRef;
                            this.directive = directive;
                            this.isSameInstance = viewContainerRef === directive.viewContainerRef;
                        }
                    };
                    __setFunctionName(_classThis, "MyOtherDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyOtherDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyOtherDir = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div dir otherDir #dir="dir" #otherDir="otherDir"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor() {
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyOtherDir, MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const directive = fixture.componentInstance.directive;
                const otherDirective = fixture.componentInstance.otherDirective;
                expect(directive.value).toContain('ViewContainerRef');
                expect(directive.viewContainerRef).not.toBeNull();
                expect(otherDirective.viewContainerRef).not.toBeNull();
                // Each ViewContainerRef instance should be unique
                expect(otherDirective.isSameInstance).toBe(false);
            });
            it('should sync ViewContainerRef state between all injected instances', () => {
                let Root = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'root',
                            template: `<ng-template #tmpl>Test</ng-template>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmpl_decorators;
                    let _tmpl_initializers = [];
                    let _tmpl_extraInitializers = [];
                    var Root = _classThis = class {
                        constructor(vcr, vcr2) {
                            this.vcr = vcr;
                            this.vcr2 = vcr2;
                            this.tmpl = __runInitializers(this, _tmpl_initializers, void 0);
                            __runInitializers(this, _tmpl_extraInitializers);
                            this.vcr = vcr;
                            this.vcr2 = vcr2;
                        }
                        ngOnInit() {
                            this.vcr.createEmbeddedView(this.tmpl);
                        }
                    };
                    __setFunctionName(_classThis, "Root");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmpl_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                        __esDecorate(null, null, _tmpl_decorators, { kind: "field", name: "tmpl", static: false, private: false, access: { has: obj => "tmpl" in obj, get: obj => obj.tmpl, set: (obj, value) => { obj.tmpl = value; } }, metadata: _metadata }, _tmpl_initializers, _tmpl_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Root = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Root = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [Root],
                });
                const fixture = testing_1.TestBed.createComponent(Root);
                fixture.detectChanges();
                const cmp = fixture.componentInstance;
                expect(cmp.vcr.length).toBe(1);
                expect(cmp.vcr2.length).toBe(1);
                expect(cmp.vcr2.get(0)).toEqual(cmp.vcr.get(0));
                cmp.vcr2.remove(0);
                expect(cmp.vcr.length).toBe(0);
                expect(cmp.vcr.get(0)).toBeNull();
            });
        });
        describe('ChangeDetectorRef', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        exportAs: 'dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.value = cdr.constructor.name;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyOtherDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[otherDir]',
                        exportAs: 'otherDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyOtherDir = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                    }
                };
                __setFunctionName(_classThis, "MyOtherDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyOtherDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyOtherDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            it('should inject host component ChangeDetectorRef into directives on templates', () => {
                let pipeInstance;
                let MyPipe = (() => {
                    let _classDecorators = [(0, core_1.Pipe)({
                            name: 'pipe',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyPipe = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            pipeInstance = this;
                        }
                        transform(value) {
                            return value;
                        }
                    };
                    __setFunctionName(_classThis, "MyPipe");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyPipe = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyPipe = _classThis;
                })();
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: `<div *ngIf="showing | pipe">Visible</div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.showing = true;
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyPipe], imports: [common_1.CommonModule] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                expect(pipeInstance.cdr.context).toBe(fixture.componentInstance);
            });
            it('should inject current component ChangeDetectorRef into directives on the same node as components', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: '<my-comp dir otherDir #dir="dir"></my-comp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _component_decorators;
                    let _component_initializers = [];
                    let _component_extraInitializers = [];
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.component = __runInitializers(this, _component_initializers, void 0);
                            this.directive = (__runInitializers(this, _component_extraInitializers), __runInitializers(this, _directive_initializers, void 0));
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _component_decorators = [(0, core_1.ViewChild)(MyComp)];
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _component_decorators, { kind: "field", name: "component", static: false, private: false, access: { has: obj => "component" in obj, get: obj => obj.component, set: (obj, value) => { obj.component = value; } }, metadata: _metadata }, _component_initializers, _component_extraInitializers);
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyComp, MyDir, MyOtherDir] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                const comp = fixture.componentInstance.component;
                expect(comp.cdr.context).toBe(comp);
                // ChangeDetectorRef is the token, ViewRef has historically been the constructor
                expect(app.directive.value).toContain('ViewRef');
                // Each ChangeDetectorRef instance should be unique
                expect(app.directive.cdr).not.toBe(comp.cdr);
                expect(app.directive.cdr).not.toBe(app.otherDirective.cdr);
            });
            it('should inject host component ChangeDetectorRef into directives on normal elements', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: '<div dir otherDir #dir="dir"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir, MyOtherDir] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const comp = fixture.componentInstance;
                expect(comp.cdr.context).toBe(comp);
                // ChangeDetectorRef is the token, ViewRef has historically been the constructor
                expect(comp.directive.value).toContain('ViewRef');
                // Each ChangeDetectorRef instance should be unique
                expect(comp.directive.cdr).not.toBe(comp.cdr);
                expect(comp.directive.cdr).not.toBe(comp.otherDirective.cdr);
            });
            it("should inject host component ChangeDetectorRef into directives in a component's ContentChildren", () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: `<my-comp>
               <div dir otherDir #dir="dir"></div>
             </my-comp>
              `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _component_decorators;
                    let _component_initializers = [];
                    let _component_extraInitializers = [];
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.component = __runInitializers(this, _component_initializers, void 0);
                            this.directive = (__runInitializers(this, _component_extraInitializers), __runInitializers(this, _directive_initializers, void 0));
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _component_decorators = [(0, core_1.ViewChild)(MyComp)];
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _component_decorators, { kind: "field", name: "component", static: false, private: false, access: { has: obj => "component" in obj, get: obj => obj.component, set: (obj, value) => { obj.component = value; } }, metadata: _metadata }, _component_initializers, _component_extraInitializers);
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyComp, MyDir, MyOtherDir] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const app = fixture.componentInstance;
                expect(app.cdr.context).toBe(app);
                const comp = fixture.componentInstance.component;
                // ChangeDetectorRef is the token, ViewRef has historically been the constructor
                expect(app.directive.value).toContain('ViewRef');
                // Each ChangeDetectorRef instance should be unique
                expect(app.directive.cdr).not.toBe(comp.cdr);
                expect(app.directive.cdr).not.toBe(app.otherDirective.cdr);
            });
            it('should inject host component ChangeDetectorRef into directives in embedded views', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `<ng-container *ngIf="showing">
            <div dir otherDir #dir="dir" *ngIf="showing"></div>
          </ng-container>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.showing = true;
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir, MyOtherDir] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const comp = fixture.componentInstance;
                expect(comp.cdr.context).toBe(comp);
                // ChangeDetectorRef is the token, ViewRef has historically been the constructor
                expect(comp.directive.value).toContain('ViewRef');
                // Each ChangeDetectorRef instance should be unique
                expect(comp.directive.cdr).not.toBe(comp.cdr);
                expect(comp.directive.cdr).not.toBe(comp.otherDirective.cdr);
            });
            it('should inject host component ChangeDetectorRef into directives on containers', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: '<div dir otherDir #dir="dir" *ngIf="showing"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _directive_decorators;
                    let _directive_initializers = [];
                    let _directive_extraInitializers = [];
                    let _otherDirective_decorators;
                    let _otherDirective_initializers = [];
                    let _otherDirective_extraInitializers = [];
                    var MyComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.showing = true;
                            this.directive = __runInitializers(this, _directive_initializers, void 0);
                            this.otherDirective = (__runInitializers(this, _directive_extraInitializers), __runInitializers(this, _otherDirective_initializers, void 0));
                            __runInitializers(this, _otherDirective_extraInitializers);
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _directive_decorators = [(0, core_1.ViewChild)(MyDir)];
                        _otherDirective_decorators = [(0, core_1.ViewChild)(MyOtherDir)];
                        __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                        __esDecorate(null, null, _otherDirective_decorators, { kind: "field", name: "otherDirective", static: false, private: false, access: { has: obj => "otherDirective" in obj, get: obj => obj.otherDirective, set: (obj, value) => { obj.otherDirective = value; } }, metadata: _metadata }, _otherDirective_initializers, _otherDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir, MyOtherDir] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                const comp = fixture.componentInstance;
                expect(comp.cdr.context).toBe(comp);
                // ChangeDetectorRef is the token, ViewRef has historically been the constructor
                expect(comp.directive.value).toContain('ViewRef');
                // Each ChangeDetectorRef instance should be unique
                expect(comp.directive.cdr).not.toBe(comp.cdr);
                expect(comp.directive.cdr).not.toBe(comp.otherDirective.cdr);
            });
            it('should inject host component ChangeDetectorRef into directives on ng-container', () => {
                let dirInstance;
                let MyDirective = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[getCDR]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyDirective = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            dirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "MyDirective");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyDirective = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyDirective = _classThis;
                })();
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: `<ng-container getCDR>Visible</ng-container>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyDirective] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                expect(dirInstance.cdr.context).toBe(fixture.componentInstance);
            });
        });
    });
    describe('string tokens', () => {
        it('should be able to provide a string token', () => {
            let InjectorDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[injectorDir]',
                        providers: [{ provide: 'test', useValue: 'provided' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InjectorDir = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "InjectorDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InjectorDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InjectorDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div injectorDir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _injectorDirInstance_decorators;
                let _injectorDirInstance_initializers = [];
                let _injectorDirInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.injectorDirInstance = __runInitializers(this, _injectorDirInstance_initializers, void 0);
                        __runInitializers(this, _injectorDirInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _injectorDirInstance_decorators = [(0, core_1.ViewChild)(InjectorDir)];
                    __esDecorate(null, null, _injectorDirInstance_decorators, { kind: "field", name: "injectorDirInstance", static: false, private: false, access: { has: obj => "injectorDirInstance" in obj, get: obj => obj.injectorDirInstance, set: (obj, value) => { obj.injectorDirInstance = value; } }, metadata: _metadata }, _injectorDirInstance_initializers, _injectorDirInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [InjectorDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const injectorDir = fixture.componentInstance.injectorDirInstance;
            expect(injectorDir.value).toBe('provided');
        });
    });
    describe('attribute tokens', () => {
        it('should be able to provide an attribute token', () => {
            const TOKEN = new core_1.InjectionToken('Some token');
            function factory(token) {
                return token + ' with factory';
            }
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '...',
                        providers: [
                            {
                                provide: TOKEN,
                                deps: [[new core_1.Attribute('token')]],
                                useFactory: factory,
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(token) {
                        this.token = token;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let WrapperComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<my-comp token='token'></my-comp>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myComp_decorators;
                let _myComp_initializers = [];
                let _myComp_extraInitializers = [];
                var WrapperComp = _classThis = class {
                    constructor() {
                        this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                        __runInitializers(this, _myComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "WrapperComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                    __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WrapperComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WrapperComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, WrapperComp] });
            const fixture = testing_1.TestBed.createComponent(WrapperComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.myComp.token).toBe('token with factory');
        });
    });
    describe('inject()', () => {
        it('should work in a directive constructor', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '{{value}}',
                        providers: [{ provide: TOKEN, useValue: 'injected value' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(TOKEN);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('injected value');
        });
        it('should work in a service constructor when the service is provided on a directive', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(TOKEN);
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '{{service.value}}',
                        providers: [Service, { provide: TOKEN, useValue: 'injected value' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('injected value');
        });
        it('should be able to inject special tokens like ChangeDetectorRef', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '{{value}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        this.value = 'before';
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.componentInstance.value = 'after';
            fixture.componentInstance.cdr.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('after');
        });
        it('should work in a service constructor', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'injected value',
            });
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(TOKEN);
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            const service = testing_1.TestBed.inject(Service);
            expect(service.value).toEqual('injected value');
        });
        it('should work in a useFactory definition for a service', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'injected value',
            });
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)({
                        providedIn: 'root',
                        useFactory: () => new Service((0, core_1.inject)(TOKEN)),
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            expect(testing_1.TestBed.inject(Service).value).toEqual('injected value');
        });
        it('should work for field injection', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'injected value',
            });
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(TOKEN);
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            const service = testing_1.TestBed.inject(Service);
            expect(service.value).toEqual('injected value');
        });
        it('should not give non-node services access to the node context', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        var _a;
                        this.value = (_a = (0, core_1.inject)(TOKEN, { optional: true })) !== null && _a !== void 0 ? _a : 'default value';
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '{{service.value}}',
                        providers: [{ provide: TOKEN, useValue: 'injected value' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        // `Service` is injected starting from the component context, where `inject` is
                        // `ɵɵdirectiveInject` under the hood. However, this should reach the root injector which
                        // should _not_ use `ɵɵdirectiveInject` to inject dependencies of `Service`, so `TOKEN`
                        // should not be visible to `Service`.
                        this.service = (0, core_1.inject)(Service);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('default value');
        });
        describe('with an options object argument', () => {
            it('should be able to optionally inject a service', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.inject)(TOKEN, { optional: true });
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                expect(testing_1.TestBed.createComponent(TestCmp).componentInstance.value).toBeNull();
            });
            it('should be able to use skipSelf injection', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN', {
                    providedIn: 'root',
                    factory: () => 'from root',
                });
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [{ provide: TOKEN, useValue: 'from component' }],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.inject)(TOKEN, { skipSelf: true });
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                expect(testing_1.TestBed.createComponent(TestCmp).componentInstance.value).toEqual('from root');
            });
            it('should be able to use self injection', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN', {
                    providedIn: 'root',
                    factory: () => 'from root',
                });
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.value = (0, core_1.inject)(TOKEN, { self: true, optional: true });
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                expect(testing_1.TestBed.createComponent(TestCmp).componentInstance.value).toBeNull();
            });
            it('should be able to use host injection', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                let ChildCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child',
                            template: '{{value}}',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildCmp = _classThis = class {
                        constructor() {
                            var _a;
                            this.value = (_a = (0, core_1.inject)(TOKEN, { host: true, optional: true })) !== null && _a !== void 0 ? _a : 'not found';
                        }
                    };
                    __setFunctionName(_classThis, "ChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildCmp = _classThis;
                })();
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [ChildCmp],
                            template: '<child></child>',
                            providers: [{ provide: TOKEN, useValue: 'from parent' }],
                            encapsulation: core_1.ViewEncapsulation.None,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ParentCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ParentCmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(ParentCmp);
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<child>not found</child>');
            });
            it('should not indicate it returns null when optional is explicitly false', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN', {
                    providedIn: 'root',
                    factory: () => 'from root',
                });
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            // TypeScript will check if this assignment is legal, which won't be the case if
                            // inject() erroneously returns a `string|null` type here.
                            this.value = (0, core_1.inject)(TOKEN, { optional: false });
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                expect(testing_1.TestBed.createComponent(TestCmp).componentInstance.value).toEqual('from root');
            });
        });
    });
    describe('injection flags', () => {
        describe('represented as an options object argument', () => {
            it('should be able to optionally inject a service', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                            this.envInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                const { nodeInjector, envInjector } = testing_1.TestBed.createComponent(TestCmp).componentInstance;
                expect(nodeInjector.get(TOKEN, undefined, { optional: true })).toBeNull();
                expect(envInjector.get(TOKEN, undefined, { optional: true })).toBeNull();
            });
            it('should include `null` into the result type when the optional flag is used', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                            this.envInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                const { nodeInjector, envInjector } = testing_1.TestBed.createComponent(TestCmp).componentInstance;
                const flags = { optional: true };
                let nodeInjectorResult = nodeInjector.get(TOKEN, undefined, flags);
                expect(nodeInjectorResult).toBe(null);
                // Verify that `null` can be a valid value (from typing standpoint),
                // the line below would fail a type check in case the result doesn't
                // have `null` in the type.
                nodeInjectorResult = null;
                let envInjectorResult = envInjector.get(TOKEN, undefined, flags);
                expect(envInjectorResult).toBe(null);
                // Verify that `null` can be a valid value (from typing standpoint),
                // the line below would fail a type check in case the result doesn't
                // have `null` in the type.
                envInjectorResult = null;
            });
            it('should be able to use skipSelf injection in NodeInjector', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN', {
                    providedIn: 'root',
                    factory: () => 'from root',
                });
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [{ provide: TOKEN, useValue: 'from component' }],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                const { nodeInjector } = testing_1.TestBed.createComponent(TestCmp).componentInstance;
                expect(nodeInjector.get(TOKEN, undefined, { skipSelf: true })).toEqual('from root');
            });
            it('should be able to use skipSelf injection in EnvironmentInjector', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                const parent = testing_1.TestBed.inject(core_1.EnvironmentInjector);
                const root = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from root' }], parent);
                const child = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from child' }], root);
                expect(child.get(TOKEN)).toEqual('from child');
                expect(child.get(TOKEN, undefined, { skipSelf: true })).toEqual('from root');
            });
            it('should be able to use self injection in NodeInjector', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN', {
                    providedIn: 'root',
                    factory: () => 'from root',
                });
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                        }
                    };
                    __setFunctionName(_classThis, "TestCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmp = _classThis;
                })();
                const { nodeInjector } = testing_1.TestBed.createComponent(TestCmp).componentInstance;
                expect(nodeInjector.get(TOKEN, undefined, { self: true, optional: true })).toBeNull();
            });
            it('should be able to use self injection in EnvironmentInjector', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                const parent = testing_1.TestBed.inject(core_1.EnvironmentInjector);
                const root = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from root' }], parent);
                const child = (0, core_1.createEnvironmentInjector)([], root);
                expect(child.get(TOKEN, undefined, { self: true, optional: true })).toBeNull();
            });
            it('should be able to use host injection', () => {
                const TOKEN = new core_1.InjectionToken('TOKEN');
                let ChildCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child',
                            template: '{{ value }}',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildCmp = _classThis = class {
                        constructor() {
                            this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                            this.value = this.nodeInjector.get(TOKEN, 'not found', { host: true, optional: true });
                        }
                    };
                    __setFunctionName(_classThis, "ChildCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildCmp = _classThis;
                })();
                let ParentCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            imports: [ChildCmp],
                            template: '<child></child>',
                            providers: [{ provide: TOKEN, useValue: 'from parent' }],
                            encapsulation: core_1.ViewEncapsulation.None,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ParentCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ParentCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ParentCmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(ParentCmp);
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<child>not found</child>');
            });
        });
    });
    describe('runInInjectionContext', () => {
        it("should return the function's return value", () => {
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const returnValue = (0, core_1.runInInjectionContext)(injector, () => 3);
            expect(returnValue).toBe(3);
        });
        it('should work with an NgModuleRef injector', () => {
            const ref = testing_1.TestBed.inject(core_1.NgModuleRef);
            const returnValue = (0, core_1.runInInjectionContext)(ref.injector, () => 3);
            expect(returnValue).toBe(3);
        });
        it('should return correct injector reference', () => {
            const ngModuleRef = testing_1.TestBed.inject(core_1.NgModuleRef);
            const ref1 = (0, core_1.runInInjectionContext)(ngModuleRef.injector, () => (0, core_1.inject)(core_1.Injector));
            const ref2 = ngModuleRef.injector.get(core_1.Injector);
            expect(ref1).toBe(ref2);
        });
        it('should make inject() available', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from injector' }], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const result = (0, core_1.runInInjectionContext)(injector, () => (0, core_1.inject)(TOKEN));
            expect(result).toEqual('from injector');
        });
        it('should properly clean up after the function returns', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            (0, core_1.runInInjectionContext)(injector, () => { });
            expect(() => (0, core_1.inject)(TOKEN, { optional: true })).toThrow();
        });
        it('should properly clean up after the function throws', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => (0, core_1.runInInjectionContext)(injector, () => {
                throw new Error('crashes!');
            })).toThrow();
            expect(() => (0, core_1.inject)(TOKEN, { optional: true })).toThrow();
        });
        it('should set the correct inject implementation', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'from root',
            });
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [{ provide: TOKEN, useValue: 'from component' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.envInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                        this.tokenFromComponent = (0, core_1.inject)(TOKEN);
                        this.tokenFromEnvContext = (0, core_1.runInInjectionContext)(this.envInjector, () => (0, core_1.inject)(TOKEN));
                        // Attempt to inject ViewContainerRef within the environment injector's context. This should
                        // not be available, so the result should be `null`.
                        this.vcrFromEnvContext = (0, core_1.runInInjectionContext)(this.envInjector, () => (0, core_1.inject)(core_1.ViewContainerRef, { optional: true }));
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const instance = testing_1.TestBed.createComponent(TestCmp).componentInstance;
            expect(instance.tokenFromComponent).toEqual('from component');
            expect(instance.tokenFromEnvContext).toEqual('from root');
            expect(instance.vcrFromEnvContext).toBeNull();
        });
        it('should support node injectors', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.injector = (0, core_1.inject)(core_1.Injector);
                        this.vcrFromEnvContext = (0, core_1.runInInjectionContext)(this.injector, () => (0, core_1.inject)(core_1.ViewContainerRef, { optional: true }));
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const instance = testing_1.TestBed.createComponent(TestCmp).componentInstance;
            expect(instance.vcrFromEnvContext).not.toBeNull();
        });
        it('should be reentrant', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'from root',
            });
            const parentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const childInjector = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from child' }], parentInjector);
            const results = (0, core_1.runInInjectionContext)(parentInjector, () => {
                const fromParentBefore = (0, core_1.inject)(TOKEN);
                const fromChild = (0, core_1.runInInjectionContext)(childInjector, () => (0, core_1.inject)(TOKEN));
                const fromParentAfter = (0, core_1.inject)(TOKEN);
                return { fromParentBefore, fromChild, fromParentAfter };
            });
            expect(results.fromParentBefore).toEqual('from root');
            expect(results.fromChild).toEqual('from child');
            expect(results.fromParentAfter).toEqual('from root');
        });
        it('should not function on a destroyed injector', () => {
            const injector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            injector.destroy();
            expect(() => (0, core_1.runInInjectionContext)(injector, () => { })).toThrow();
        });
    });
    describe('assertInInjectionContext', () => {
        function placeholder() { }
        it('should throw if not in an injection context', () => {
            expect(() => (0, core_1.assertInInjectionContext)(placeholder)).toThrowMatching((e) => e instanceof errors_1.RuntimeError && e.code === -203 /* RuntimeErrorCode.MISSING_INJECTION_CONTEXT */);
        });
        it('should not throw if in an EnvironmentInjector context', () => {
            expect(() => {
                testing_1.TestBed.runInInjectionContext(() => {
                    (0, core_1.assertInInjectionContext)(placeholder);
                });
            }).not.toThrow();
        });
        it('should not throw if in an element injector context', () => {
            expect(() => {
                let EmptyCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var EmptyCmp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "EmptyCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        EmptyCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return EmptyCmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(EmptyCmp);
                (0, core_1.runInInjectionContext)(fixture.componentRef.injector, () => {
                    (0, core_1.assertInInjectionContext)(placeholder);
                });
            }).not.toThrow();
        });
    });
    describe('useExisting and optional', () => {
        const token = new core_1.InjectionToken('token');
        const existing = new core_1.InjectionToken('existing');
        it('should return null when injecting a missing useExisting provider with optional: true in a node injector', () => {
            let value;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        value = (0, core_1.inject)(token, { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
                        imports: [Dir],
                        providers: [{ provide: token, useExisting: existing }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.createComponent(App);
            expect(value).toBe(null);
        });
        it('should throw when injecting a missing useExisting provider in a node injector', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(token, { optional: false });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir></div>',
                        imports: [Dir],
                        providers: [{ provide: token, useExisting: existing }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/No provider for InjectionToken existing/);
        });
        it('should return null when injecting a missing useExisting provider with optional: true in a module injector', () => {
            let value;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        value = (0, core_1.inject)(token, { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div dir></div>', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Dir],
                providers: [{ provide: token, useExisting: existing }],
            });
            testing_1.TestBed.createComponent(App);
            expect(value).toBe(null);
        });
        it('should throw when injecting a missing useExisting provider in a module injector', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(token);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div dir></div>', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Dir],
                providers: [{ provide: token, useExisting: existing }],
            });
            expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/No provider for InjectionToken existing/);
        });
    });
    it('should be able to use Host in `useFactory` dependency config', () => {
        // Scenario:
        // ---------
        // <root (provides token A)>
        //   <comp (provides token B via useFactory(@Host() @Inject(A))></comp>
        // </root>
        let Root = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root',
                    template: '<comp></comp>',
                    viewProviders: [
                        {
                            provide: 'A',
                            useValue: 'A from Root',
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Root = _classThis = class {
            };
            __setFunctionName(_classThis, "Root");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Root = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Root = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: '{{ token }}',
                    viewProviders: [
                        {
                            provide: 'B',
                            deps: [[new core_1.Inject('A'), new core_1.Host()]],
                            useFactory: (token) => `${token} (processed by useFactory)`,
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor(token) {
                    this.token = token;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<root></root>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Root, Comp, App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('A from Root (processed by useFactory)');
    });
    it('should not lookup outside of the host element when Host is used in `useFactory`', () => {
        // Scenario:
        // ---------
        // <root (provides token A)>
        //   <intermediate>
        //     <comp (provides token B via useFactory(@Host() @Inject(A))></comp>
        //   </intermediate>
        // </root>
        let Root = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'root',
                    template: '<intermediate></intermediate>',
                    viewProviders: [
                        {
                            provide: 'A',
                            useValue: 'A from Root',
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Root = _classThis = class {
            };
            __setFunctionName(_classThis, "Root");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Root = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Root = _classThis;
        })();
        let Intermediate = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'intermediate',
                    template: '<comp></comp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Intermediate = _classThis = class {
            };
            __setFunctionName(_classThis, "Intermediate");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Intermediate = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Intermediate = _classThis;
        })();
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'comp',
                    template: '{{ token }}',
                    viewProviders: [
                        {
                            provide: 'B',
                            deps: [[new core_1.Inject('A'), new core_1.Host(), new core_1.Optional()]],
                            useFactory: (token) => token ? `${token} (processed by useFactory)` : 'No token A found',
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor(token) {
                    this.token = token;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<root></root>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [Root, Comp, App, Intermediate] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        // Making sure that the `@Host` takes effect and token `A` becomes unavailable in DI since it's
        // defined one level up from the Comp's host view.
        expect(fixture.nativeElement.textContent).toBe('No token A found');
    });
    it('should not cause cyclic dependency if same token is requested in deps with @SkipSelf', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '...',
                    providers: [
                        {
                            provide: core_1.LOCALE_ID,
                            useFactory: () => 'ja-JP',
                            // Note: `LOCALE_ID` is also provided within APPLICATION_MODULE_PROVIDERS, so we use it
                            // here as a dep and making sure it doesn't cause cyclic dependency (since @SkipSelf is
                            // present)
                            deps: [[new core_1.Inject(core_1.LOCALE_ID), new core_1.Optional(), new core_1.SkipSelf()]],
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(localeId) {
                    this.localeId = localeId;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.componentInstance.localeId).toBe('ja-JP');
    });
    it('module-level deps should not access Component/Directive providers', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '...',
                    providers: [
                        {
                            provide: 'LOCALE_ID_DEP', //
                            useValue: 'LOCALE_ID_DEP_VALUE',
                        },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(localeId) {
                    this.localeId = localeId;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyComp],
            providers: [
                {
                    provide: core_1.LOCALE_ID,
                    // we expect `localeDepValue` to be undefined, since it's not provided at a module level
                    useFactory: (localeDepValue) => localeDepValue || 'en-GB',
                    deps: [[new core_1.Inject('LOCALE_ID_DEP'), new core_1.Optional()]],
                },
            ],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.componentInstance.localeId).toBe('en-GB');
    });
    it('should skip current level while retrieving tokens if @SkipSelf is defined', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '...',
                    providers: [{ provide: core_1.LOCALE_ID, useFactory: () => 'en-GB' }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(localeId) {
                    this.localeId = localeId;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        // takes `LOCALE_ID` from module injector, since we skip Component level with @SkipSelf
        expect(fixture.componentInstance.localeId).toBe(core_1.ɵDEFAULT_LOCALE_ID);
    });
    it('should work when injecting dependency in Directives', () => {
        let MyDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]', //
                    providers: [{ provide: core_1.LOCALE_ID, useValue: 'ja-JP' }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir = _classThis = class {
                constructor(localeId) {
                    this.localeId = localeId;
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '<div dir></div>',
                    providers: [{ provide: core_1.LOCALE_ID, useValue: 'en-GB' }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myDir_decorators;
            let _myDir_initializers = [];
            let _myDir_extraInitializers = [];
            var MyComp = _classThis = class {
                constructor(localeId) {
                    this.localeId = localeId;
                    this.myDir = __runInitializers(this, _myDir_initializers, void 0);
                    __runInitializers(this, _myDir_extraInitializers);
                    this.localeId = localeId;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myDir_decorators = [(0, core_1.ViewChild)(MyDir)];
                __esDecorate(null, null, _myDir_decorators, { kind: "field", name: "myDir", static: false, private: false, access: { has: obj => "myDir" in obj, get: obj => obj.myDir, set: (obj, value) => { obj.myDir = value; } }, metadata: _metadata }, _myDir_initializers, _myDir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp, MyComp] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.componentInstance.myDir.localeId).toBe('en-GB');
    });
    describe('@Attribute', () => {
        it('should inject attributes', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(exist, nonExist) {
                        this.exist = exist;
                        this.nonExist = nonExist;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir exist="existValue" other="ignore"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.exist).toBe('existValue');
            expect(directive.nonExist).toBeNull();
        });
        it('should inject attributes on <ng-template>', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(exist, myDirectiveAttrValue) {
                        this.exist = exist;
                        this.myDirectiveAttrValue = myDirectiveAttrValue;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template dir="initial" exist="existValue" other="ignore"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.exist).toBe('existValue');
            expect(directive.myDirectiveAttrValue).toBe('initial');
        });
        it('should inject attributes on <ng-container>', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(exist, myDirectiveAttrValue) {
                        this.exist = exist;
                        this.myDirectiveAttrValue = myDirectiveAttrValue;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container dir="initial" exist="existValue" other="ignore"></ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.exist).toBe('existValue');
            expect(directive.myDirectiveAttrValue).toBe('initial');
        });
        it('should be able to inject different kinds of attributes', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(className, inlineStyles, otherAttr) {
                        this.className = className;
                        this.inlineStyles = inlineStyles;
                        this.otherAttr = otherAttr;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir style="margin: 1px; color: red;" class="hello there" other-attr="value"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.otherAttr).toBe('value');
            expect(directive.className).toBe('hello there');
            expect(directive.inlineStyles).toMatch(/color:\s*red/);
            expect(directive.inlineStyles).toMatch(/margin:\s*1px/);
        });
        it('should not inject attributes with namespace', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(exist, namespacedExist, other) {
                        this.exist = exist;
                        this.namespacedExist = namespacedExist;
                        this.other = other;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir exist="existValue" svg:exist="testExistValue" other="otherValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.exist).toBe('existValue');
            expect(directive.namespacedExist).toBeNull();
            expect(directive.other).toBe('otherValue');
        });
        it('should not inject attributes representing bindings and outputs', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _binding_decorators;
                let _binding_initializers = [];
                let _binding_extraInitializers = [];
                let _output_decorators;
                let _output_initializers = [];
                let _output_extraInitializers = [];
                var MyDir = _classThis = class {
                    constructor(exist, bindingAttr, outputAttr, other) {
                        this.exist = exist;
                        this.bindingAttr = bindingAttr;
                        this.outputAttr = outputAttr;
                        this.other = other;
                        this.binding = __runInitializers(this, _binding_initializers, void 0);
                        this.output = (__runInitializers(this, _binding_extraInitializers), __runInitializers(this, _output_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _output_extraInitializers);
                        this.exist = exist;
                        this.bindingAttr = bindingAttr;
                        this.outputAttr = outputAttr;
                        this.other = other;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _binding_decorators = [(0, core_1.Input)()];
                    _output_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _binding_decorators, { kind: "field", name: "binding", static: false, private: false, access: { has: obj => "binding" in obj, get: obj => obj.binding, set: (obj, value) => { obj.binding = value; } }, metadata: _metadata }, _binding_initializers, _binding_extraInitializers);
                    __esDecorate(null, null, _output_decorators, { kind: "field", name: "output", static: false, private: false, access: { has: obj => "output" in obj, get: obj => obj.output, set: (obj, value) => { obj.output = value; } }, metadata: _metadata }, _output_initializers, _output_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir exist="existValue" [binding]="bindingValue" (output)="outputValue" other="otherValue" ignore="ignoreValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        __runInitializers(this, _directiveInstance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.directiveInstance;
            expect(directive.exist).toBe('existValue');
            expect(directive.bindingAttr).toBeNull();
            expect(directive.outputAttr).toBeNull();
            expect(directive.other).toBe('otherValue');
        });
        it('should inject `null` for attributes with data bindings', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(attrValue) {
                        this.attrValue = attrValue;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir title="title {{ value }}"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _directiveInstance_decorators;
                let _directiveInstance_initializers = [];
                let _directiveInstance_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.directiveInstance = __runInitializers(this, _directiveInstance_initializers, void 0);
                        this.value = (__runInitializers(this, _directiveInstance_extraInitializers), 'value');
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _directiveInstance_decorators = [(0, core_1.ViewChild)(MyDir)];
                    __esDecorate(null, null, _directiveInstance_decorators, { kind: "field", name: "directiveInstance", static: false, private: false, access: { has: obj => "directiveInstance" in obj, get: obj => obj.directiveInstance, set: (obj, value) => { obj.directiveInstance = value; } }, metadata: _metadata }, _directiveInstance_initializers, _directiveInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.directiveInstance.attrValue).toBeNull();
            expect(fixture.nativeElement.querySelector('div').getAttribute('title')).toBe('title value');
        });
    });
    describe('HostAttributeToken', () => {
        it('should inject an attribute on an element node', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir some-attr="foo" other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('foo');
        });
        it('should inject an attribute on <ng-template>', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template dir some-attr="foo" other="ignore"></ng-template>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('foo');
        });
        it('should inject an attribute on <ng-container>', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container dir some-attr="foo" other="ignore"></ng-container>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('foo');
        });
        it('should be able to inject different kinds of attributes', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.className = (0, core_1.inject)(new core_1.HostAttributeToken('class'));
                        this.inlineStyles = (0, core_1.inject)(new core_1.HostAttributeToken('style'));
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div
            dir
            style="margin: 1px; color: red;"
            class="hello there"
            some-attr="foo"
            other="ignore"></div>
        `,
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.dir;
            expect(directive.className).toBe('hello there');
            expect(directive.inlineStyles).toMatch(/color:\s*red/);
            expect(directive.inlineStyles).toMatch(/margin:\s*1px/);
            expect(directive.value).toBe('foo');
        });
        it('should throw a DI error when injecting a non-existent attribute', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            expect(() => testing_1.TestBed.createComponent(TestCmp)).toThrowError(/No provider for HostAttributeToken some-attr found/);
        });
        it('should not throw a DI error when injecting a non-existent attribute with optional: true', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'), { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(null);
        });
        it('should not inject attributes with namespace', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('some-attr'), { optional: true });
                        this.namespaceExists = (0, core_1.inject)(new core_1.HostAttributeToken('svg:exist'), { optional: true });
                        this.other = (0, core_1.inject)(new core_1.HostAttributeToken('other'), { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div dir some-attr="foo" svg:exists="testExistValue" other="otherValue"></div>
        `,
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.dir;
            expect(directive.value).toBe('foo');
            expect(directive.namespaceExists).toBe(null);
            expect(directive.other).toBe('otherValue');
        });
        it('should not inject attributes representing bindings and outputs', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _binding_decorators;
                let _binding_initializers = [];
                let _binding_extraInitializers = [];
                let _output_decorators;
                let _output_initializers = [];
                let _output_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.binding = __runInitializers(this, _binding_initializers, void 0);
                        this.output = (__runInitializers(this, _binding_extraInitializers), __runInitializers(this, _output_initializers, new core_1.EventEmitter()));
                        this.exists = (__runInitializers(this, _output_extraInitializers), (0, core_1.inject)(new core_1.HostAttributeToken('exists')));
                        this.bindingAttr = (0, core_1.inject)(new core_1.HostAttributeToken('binding'), { optional: true });
                        this.outputAttr = (0, core_1.inject)(new core_1.HostAttributeToken('output'), { optional: true });
                        this.other = (0, core_1.inject)(new core_1.HostAttributeToken('other'));
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _binding_decorators = [(0, core_1.Input)()];
                    _output_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _binding_decorators, { kind: "field", name: "binding", static: false, private: false, access: { has: obj => "binding" in obj, get: obj => obj.binding, set: (obj, value) => { obj.binding = value; } }, metadata: _metadata }, _binding_initializers, _binding_extraInitializers);
                    __esDecorate(null, null, _output_decorators, { kind: "field", name: "output", static: false, private: false, access: { has: obj => "output" in obj, get: obj => obj.output, set: (obj, value) => { obj.output = value; } }, metadata: _metadata }, _output_initializers, _output_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir],
                        template: `
          <div
            dir
            exists="existsValue"
            [binding]="bindingValue"
            (output)="noop()"
            other="otherValue"
            ignore="ignoreValue"></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.bindingValue = (__runInitializers(this, _dir_extraInitializers), 'hello');
                    }
                    noop() { }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const directive = fixture.componentInstance.dir;
            expect(directive.exists).toBe('existsValue');
            expect(directive.bindingAttr).toBe(null);
            expect(directive.outputAttr).toBe(null);
            expect(directive.other).toBe('otherValue');
        });
        it('should not inject data-bound attributes', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(new core_1.HostAttributeToken('title'), { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir title="foo {{value}}" other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.value = (__runInitializers(this, _dir_extraInitializers), 123);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(null);
            expect(fixture.nativeElement.querySelector('[dir]').getAttribute('title')).toBe('foo 123');
        });
        it('should inject an attribute using @Inject', () => {
            const TOKEN = new core_1.HostAttributeToken('some-attr');
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir some-attr="foo" other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('foo');
        });
        it('should throw when injecting a non-existent attribute using @Inject', () => {
            const TOKEN = new core_1.HostAttributeToken('some-attr');
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            expect(() => testing_1.TestBed.createComponent(TestCmp)).toThrowError(/No provider for HostAttributeToken some-attr found/);
        });
        it('should not throw when injecting a non-existent attribute using @Inject @Optional', () => {
            const TOKEN = new core_1.HostAttributeToken('some-attr');
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(value) {
                        this.value = value;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir other="ignore"></div>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(null);
        });
    });
    describe('HOST_TAG_NAME', () => {
        it('should inject the tag name on an element node', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(core_1.HOST_TAG_NAME);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div dir #v1></div>
          <span dir #v2></span>
          <svg dir #v3></svg>
          <custom-component dir #v4></custom-component>
          <video dir #v5></video>
        `,
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value1_decorators;
                let _value1_initializers = [];
                let _value1_extraInitializers = [];
                let _value2_decorators;
                let _value2_initializers = [];
                let _value2_extraInitializers = [];
                let _value3_decorators;
                let _value3_initializers = [];
                let _value3_extraInitializers = [];
                let _value4_decorators;
                let _value4_initializers = [];
                let _value4_extraInitializers = [];
                let _value5_decorators;
                let _value5_initializers = [];
                let _value5_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.value1 = __runInitializers(this, _value1_initializers, void 0);
                        this.value2 = (__runInitializers(this, _value1_extraInitializers), __runInitializers(this, _value2_initializers, void 0));
                        this.value3 = (__runInitializers(this, _value2_extraInitializers), __runInitializers(this, _value3_initializers, void 0));
                        this.value4 = (__runInitializers(this, _value3_extraInitializers), __runInitializers(this, _value4_initializers, void 0));
                        this.value5 = (__runInitializers(this, _value4_extraInitializers), __runInitializers(this, _value5_initializers, void 0));
                        __runInitializers(this, _value5_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value1_decorators = [(0, core_1.ViewChild)('v1', { read: Dir })];
                    _value2_decorators = [(0, core_1.ViewChild)('v2', { read: Dir })];
                    _value3_decorators = [(0, core_1.ViewChild)('v3', { read: Dir })];
                    _value4_decorators = [(0, core_1.ViewChild)('v4', { read: Dir })];
                    _value5_decorators = [(0, core_1.ViewChild)('v5', { read: Dir })];
                    __esDecorate(null, null, _value1_decorators, { kind: "field", name: "value1", static: false, private: false, access: { has: obj => "value1" in obj, get: obj => obj.value1, set: (obj, value) => { obj.value1 = value; } }, metadata: _metadata }, _value1_initializers, _value1_extraInitializers);
                    __esDecorate(null, null, _value2_decorators, { kind: "field", name: "value2", static: false, private: false, access: { has: obj => "value2" in obj, get: obj => obj.value2, set: (obj, value) => { obj.value2 = value; } }, metadata: _metadata }, _value2_initializers, _value2_extraInitializers);
                    __esDecorate(null, null, _value3_decorators, { kind: "field", name: "value3", static: false, private: false, access: { has: obj => "value3" in obj, get: obj => obj.value3, set: (obj, value) => { obj.value3 = value; } }, metadata: _metadata }, _value3_initializers, _value3_extraInitializers);
                    __esDecorate(null, null, _value4_decorators, { kind: "field", name: "value4", static: false, private: false, access: { has: obj => "value4" in obj, get: obj => obj.value4, set: (obj, value) => { obj.value4 = value; } }, metadata: _metadata }, _value4_initializers, _value4_extraInitializers);
                    __esDecorate(null, null, _value5_decorators, { kind: "field", name: "value5", static: false, private: false, access: { has: obj => "value5" in obj, get: obj => obj.value5, set: (obj, value) => { obj.value5 = value; } }, metadata: _metadata }, _value5_initializers, _value5_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.value1.value).toBe('div');
            expect(fixture.componentInstance.value2.value).toBe('span');
            expect(fixture.componentInstance.value3.value).toBe('svg');
            expect(fixture.componentInstance.value4.value).toBe('custom-component');
            expect(fixture.componentInstance.value5.value).toBe('video');
        });
        it('should throw a DI error when injecting into non-DOM nodes', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(core_1.HOST_TAG_NAME);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestNgContainer = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container dir></ng-container>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestNgContainer = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestNgContainer");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestNgContainer = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestNgContainer = _classThis;
            })();
            let TestNgTemplate = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template dir></ng-template>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestNgTemplate = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestNgTemplate");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestNgTemplate = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestNgTemplate = _classThis;
            })();
            expect(() => testing_1.TestBed.createComponent(TestNgContainer)).toThrowError(/HOST_TAG_NAME was used on an <ng-container> which doesn't have an underlying element in the DOM/);
            expect(() => testing_1.TestBed.createComponent(TestNgTemplate)).toThrowError(/HOST_TAG_NAME was used on an <ng-template> which doesn't have an underlying element in the DOM/);
        });
        it('should not throw a DI error when injecting into non-DOM nodes with optional: true', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.inject)(core_1.HOST_TAG_NAME, { optional: true });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container dir></ng-container>',
                        imports: [Dir],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(null);
        });
    });
    it('should support dependencies in Pipes used inside ICUs', () => {
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                transform(value) {
                    return `${value} (transformed)`;
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        let MyPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'somePipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyPipe = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
                transform(value) {
                    return this.service.transform(value);
                }
            };
            __setFunctionName(_classThis, "MyPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyPipe = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div i18n>{
          count, select,
          =1 {One}
          other {Other value is: {{count | somePipe}}}
        }</div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.count = '2';
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyPipe, MyComp],
            providers: [MyService],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('Other value is: 2 (transformed)');
    });
    it('should support dependencies in Pipes used inside i18n blocks', () => {
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                transform(value) {
                    return `${value} (transformed)`;
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        let MyPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({
                    name: 'somePipe',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyPipe = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
                transform(value) {
                    return this.service.transform(value);
                }
            };
            __setFunctionName(_classThis, "MyPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyPipe = _classThis;
        })();
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <ng-template #source i18n>
          {{count | somePipe}} <span>items</span>
        </ng-template>
        <ng-container #target></ng-container>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _target_decorators;
            let _target_initializers = [];
            let _target_extraInitializers = [];
            let _source_decorators;
            let _source_initializers = [];
            let _source_extraInitializers = [];
            var MyComp = _classThis = class {
                create() {
                    this.target.createEmbeddedView(this.source);
                }
                constructor() {
                    this.count = '2';
                    this.target = __runInitializers(this, _target_initializers, void 0);
                    this.source = (__runInitializers(this, _target_extraInitializers), __runInitializers(this, _source_initializers, void 0));
                    __runInitializers(this, _source_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _target_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef })];
                _source_decorators = [(0, core_1.ViewChild)('source', { read: core_1.TemplateRef })];
                __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [MyPipe, MyComp],
            providers: [MyService],
        });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        fixture.componentInstance.create();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toBe('2 (transformed) items');
    });
    // TODO: https://angular-team.atlassian.net/browse/FW-1779
    it('should prioritize useFactory over useExisting', () => {
        class Base {
        }
        let DirA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirA]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirA = _classThis = class {
            };
            __setFunctionName(_classThis, "DirA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirA = _classThis;
        })();
        let DirB = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirB]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirB = _classThis = class {
            };
            __setFunctionName(_classThis, "DirB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirB = _classThis;
        })();
        const PROVIDER = { provide: Base, useExisting: DirA, useFactory: () => new DirB() };
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '',
                    providers: [PROVIDER],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor(base) {
                    this.base = base;
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div dirA> <child></child> </div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dirA_decorators;
            let _dirA_initializers = [];
            let _dirA_extraInitializers = [];
            let _child_decorators;
            let _child_initializers = [];
            let _child_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dirA = __runInitializers(this, _dirA_initializers, void 0);
                    this.child = (__runInitializers(this, _dirA_extraInitializers), __runInitializers(this, _child_initializers, void 0));
                    __runInitializers(this, _child_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dirA_decorators = [(0, core_1.ViewChild)(DirA)];
                _child_decorators = [(0, core_1.ViewChild)(Child)];
                __esDecorate(null, null, _dirA_decorators, { kind: "field", name: "dirA", static: false, private: false, access: { has: obj => "dirA" in obj, get: obj => obj.dirA, set: (obj, value) => { obj.dirA = value; } }, metadata: _metadata }, _dirA_initializers, _dirA_extraInitializers);
                __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [DirA, DirB, App, Child],
        }).createComponent(App);
        fixture.detectChanges();
        expect(fixture.componentInstance.dirA).not.toEqual(fixture.componentInstance.child.base, 'should not get dirA from parent, but create new dirB from the useFactory provider');
    });
    describe('provider access on the same node', () => {
        const token = new core_1.InjectionToken('token');
        it('pipes should access providers from the component they are on', () => {
            let TokenPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'token',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TokenPipe = _classThis = class {
                    constructor(_token) {
                        this._token = _token;
                    }
                    transform(value) {
                        return value + this._token;
                    }
                };
                __setFunctionName(_classThis, "TokenPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TokenPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TokenPipe = _classThis;
            })();
            let ChildComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-comp',
                        template: '{{value}}',
                        providers: [{ provide: token, useValue: 'child' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var ChildComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<child-comp [value]="'' | token"></child-comp>`,
                        providers: [{ provide: token, useValue: 'parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ChildComp, TokenPipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('child');
        });
        it('pipes should not access viewProviders from the component they are on', () => {
            let TokenPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'token',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TokenPipe = _classThis = class {
                    constructor(_token) {
                        this._token = _token;
                    }
                    transform(value) {
                        return value + this._token;
                    }
                };
                __setFunctionName(_classThis, "TokenPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TokenPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TokenPipe = _classThis;
            })();
            let ChildComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-comp',
                        template: '{{value}}',
                        viewProviders: [{ provide: token, useValue: 'child' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var ChildComp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ChildComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<child-comp [value]="'' | token"></child-comp>`,
                        viewProviders: [{ provide: token, useValue: 'parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ChildComp, TokenPipe] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('parent');
        });
        it('directives should access providers from the component they are on', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(token) {
                        this.token = token;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let ChildComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-comp',
                        template: '',
                        providers: [{ provide: token, useValue: 'child' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildComp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<child-comp dir></child-comp>',
                        providers: [{ provide: token, useValue: 'parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ChildComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.token).toBe('child');
        });
        it('directives should not access viewProviders from the component they are on', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(token) {
                        this.token = token;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let ChildComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-comp',
                        template: '',
                        viewProviders: [{ provide: token, useValue: 'child' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildComp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<child-comp dir></child-comp>',
                        viewProviders: [{ provide: token, useValue: 'parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ChildComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.token).toBe('parent');
        });
    });
    it('should not be able to inject ViewRef', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(_viewRef) { }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/NullInjectorError/);
    });
    describe('injector when creating embedded view', () => {
        const token = new core_1.InjectionToken('greeting');
        let MenuTrigger = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'menu-trigger',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _menu_decorators;
            let _menu_initializers = [];
            let _menu_extraInitializers = [];
            var MenuTrigger = _classThis = class {
                constructor(viewContainerRef) {
                    this.viewContainerRef = viewContainerRef;
                    this.menu = __runInitializers(this, _menu_initializers, void 0);
                    __runInitializers(this, _menu_extraInitializers);
                    this.viewContainerRef = viewContainerRef;
                }
                open(injector) {
                    this.viewContainerRef.createEmbeddedView(this.menu, undefined, { injector });
                }
            };
            __setFunctionName(_classThis, "MenuTrigger");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _menu_decorators = [(0, core_1.Input)('triggerFor')];
                __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MenuTrigger = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MenuTrigger = _classThis;
        })();
        it('should be able to provide an injection token through a custom injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu] });
            const injector = core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello' }] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello');
        });
        it('should check only the current node with @Self when providing an injection token through an embedded view injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
        `,
                        providers: [{ provide: token, useValue: 'root' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu] });
            const injector = core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello' }] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBeNull();
        });
        it('should be able to provide an injection token to a nested template through a custom injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <menu-trigger #outerTrigger [triggerFor]="outerTemplate"></menu-trigger>
            <ng-template #outerTemplate>
              <menu></menu>

              <menu-trigger #innerTrigger [triggerFor]="innerTemplate"></menu-trigger>
              <ng-template #innerTemplate>
                <menu #innerMenu></menu>
              </ng-template>
            </ng-template>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _outerTrigger_decorators;
                let _outerTrigger_initializers = [];
                let _outerTrigger_extraInitializers = [];
                let _innerTrigger_decorators;
                let _innerTrigger_initializers = [];
                let _innerTrigger_extraInitializers = [];
                let _innerMenu_decorators;
                let _innerMenu_initializers = [];
                let _innerMenu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.outerTrigger = __runInitializers(this, _outerTrigger_initializers, void 0);
                        this.innerTrigger = (__runInitializers(this, _outerTrigger_extraInitializers), __runInitializers(this, _innerTrigger_initializers, void 0));
                        this.innerMenu = (__runInitializers(this, _innerTrigger_extraInitializers), __runInitializers(this, _innerMenu_initializers, void 0));
                        __runInitializers(this, _innerMenu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _outerTrigger_decorators = [(0, core_1.ViewChild)('outerTrigger', { read: MenuTrigger })];
                    _innerTrigger_decorators = [(0, core_1.ViewChild)('innerTrigger', { read: MenuTrigger })];
                    _innerMenu_decorators = [(0, core_1.ViewChild)('innerMenu', { read: Menu })];
                    __esDecorate(null, null, _outerTrigger_decorators, { kind: "field", name: "outerTrigger", static: false, private: false, access: { has: obj => "outerTrigger" in obj, get: obj => obj.outerTrigger, set: (obj, value) => { obj.outerTrigger = value; } }, metadata: _metadata }, _outerTrigger_initializers, _outerTrigger_extraInitializers);
                    __esDecorate(null, null, _innerTrigger_decorators, { kind: "field", name: "innerTrigger", static: false, private: false, access: { has: obj => "innerTrigger" in obj, get: obj => obj.innerTrigger, set: (obj, value) => { obj.innerTrigger = value; } }, metadata: _metadata }, _innerTrigger_initializers, _innerTrigger_extraInitializers);
                    __esDecorate(null, null, _innerMenu_decorators, { kind: "field", name: "innerMenu", static: false, private: false, access: { has: obj => "innerMenu" in obj, get: obj => obj.innerMenu, set: (obj, value) => { obj.innerMenu = value; } }, metadata: _metadata }, _innerMenu_initializers, _innerMenu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.outerTrigger.open(core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello' }] }));
            fixture.detectChanges();
            fixture.componentInstance.innerTrigger.open(undefined);
            fixture.detectChanges();
            expect(fixture.componentInstance.innerMenu.tokenValue).toBe('hello');
        });
        it('should be able to resolve a token from a custom grandparent injector if the token is not provided in the parent', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <menu-trigger #grandparentTrigger [triggerFor]="grandparentTemplate"></menu-trigger>
            <ng-template #grandparentTemplate>
              <menu></menu>

              <menu-trigger #parentTrigger [triggerFor]="parentTemplate"></menu-trigger>
              <ng-template #parentTemplate>
                <menu></menu>

                <menu-trigger #childTrigger [triggerFor]="childTemplate"></menu-trigger>
                <ng-template #childTemplate>
                  <menu #childMenu></menu>
                </ng-template>
              </ng-template>
            </ng-template>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _grandparentTrigger_decorators;
                let _grandparentTrigger_initializers = [];
                let _grandparentTrigger_extraInitializers = [];
                let _parentTrigger_decorators;
                let _parentTrigger_initializers = [];
                let _parentTrigger_extraInitializers = [];
                let _childTrigger_decorators;
                let _childTrigger_initializers = [];
                let _childTrigger_extraInitializers = [];
                let _childMenu_decorators;
                let _childMenu_initializers = [];
                let _childMenu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.grandparentTrigger = __runInitializers(this, _grandparentTrigger_initializers, void 0);
                        this.parentTrigger = (__runInitializers(this, _grandparentTrigger_extraInitializers), __runInitializers(this, _parentTrigger_initializers, void 0));
                        this.childTrigger = (__runInitializers(this, _parentTrigger_extraInitializers), __runInitializers(this, _childTrigger_initializers, void 0));
                        this.childMenu = (__runInitializers(this, _childTrigger_extraInitializers), __runInitializers(this, _childMenu_initializers, void 0));
                        __runInitializers(this, _childMenu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _grandparentTrigger_decorators = [(0, core_1.ViewChild)('grandparentTrigger', { read: MenuTrigger })];
                    _parentTrigger_decorators = [(0, core_1.ViewChild)('parentTrigger', { read: MenuTrigger })];
                    _childTrigger_decorators = [(0, core_1.ViewChild)('childTrigger', { read: MenuTrigger })];
                    _childMenu_decorators = [(0, core_1.ViewChild)('childMenu', { read: Menu })];
                    __esDecorate(null, null, _grandparentTrigger_decorators, { kind: "field", name: "grandparentTrigger", static: false, private: false, access: { has: obj => "grandparentTrigger" in obj, get: obj => obj.grandparentTrigger, set: (obj, value) => { obj.grandparentTrigger = value; } }, metadata: _metadata }, _grandparentTrigger_initializers, _grandparentTrigger_extraInitializers);
                    __esDecorate(null, null, _parentTrigger_decorators, { kind: "field", name: "parentTrigger", static: false, private: false, access: { has: obj => "parentTrigger" in obj, get: obj => obj.parentTrigger, set: (obj, value) => { obj.parentTrigger = value; } }, metadata: _metadata }, _parentTrigger_initializers, _parentTrigger_extraInitializers);
                    __esDecorate(null, null, _childTrigger_decorators, { kind: "field", name: "childTrigger", static: false, private: false, access: { has: obj => "childTrigger" in obj, get: obj => obj.childTrigger, set: (obj, value) => { obj.childTrigger = value; } }, metadata: _metadata }, _childTrigger_initializers, _childTrigger_extraInitializers);
                    __esDecorate(null, null, _childMenu_decorators, { kind: "field", name: "childMenu", static: false, private: false, access: { has: obj => "childMenu" in obj, get: obj => obj.childMenu, set: (obj, value) => { obj.childMenu = value; } }, metadata: _metadata }, _childMenu_initializers, _childMenu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.grandparentTrigger.open(core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello' }] }));
            fixture.detectChanges();
            fixture.componentInstance.parentTrigger.open(core_1.Injector.create({ providers: [] }));
            fixture.detectChanges();
            fixture.componentInstance.childTrigger.open(undefined);
            fixture.detectChanges();
            expect(fixture.componentInstance.childMenu.tokenValue).toBe('hello');
        });
        it('should resolve value from node injector if it is lower than embedded view injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let Wrapper = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'wrapper',
                        providers: [{ provide: token, useValue: 'hello from wrapper' }],
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var Wrapper = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Wrapper");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Wrapper = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Wrapper = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <wrapper></wrapper>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _wrapper_decorators;
                let _wrapper_initializers = [];
                let _wrapper_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.wrapper = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _wrapper_initializers, void 0));
                        __runInitializers(this, _wrapper_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _wrapper_decorators = [(0, core_1.ViewChild)(Wrapper)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _wrapper_decorators, { kind: "field", name: "wrapper", static: false, private: false, access: { has: obj => "wrapper" in obj, get: obj => obj.wrapper, set: (obj, value) => { obj.wrapper = value; } }, metadata: _metadata }, _wrapper_initializers, _wrapper_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu, Wrapper] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello from injector' }] }));
            fixture.detectChanges();
            fixture.componentInstance.wrapper.trigger.open(undefined);
            fixture.detectChanges();
            expect(fixture.componentInstance.wrapper.menu.tokenValue).toBe('hello from wrapper');
        });
        it('should be able to inject a value provided at the module level', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu],
                        exports: [App, MenuTrigger, Menu],
                        providers: [{ provide: token, useValue: 'hello' }],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({ providers: [] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello');
        });
        it('should have value from custom injector take precedence over module injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu],
                        exports: [App, MenuTrigger, Menu],
                        providers: [{ provide: token, useValue: 'hello from module' }],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from injector');
        });
        it('should have value from custom injector take precedence over parent injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu],
                        exports: [App, MenuTrigger, Menu],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from injector');
        });
        it('should be able to inject built-in tokens when a custom injector is provided', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(elementRef, changeDetectorRef) {
                        this.elementRef = elementRef;
                        this.changeDetectorRef = changeDetectorRef;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu] });
            const injector = core_1.Injector.create({ providers: [] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.elementRef.nativeElement).toBe(fixture.nativeElement.querySelector('menu'));
            expect(fixture.componentInstance.menu.changeDetectorRef).toBeTruthy();
        });
        it('should have value from parent component injector take precedence over module injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
            <ng-template #menuTemplate>
              <menu></menu>
            </ng-template>
          `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu],
                        exports: [App, MenuTrigger, Menu],
                        providers: [{ provide: token, useValue: 'hello from module' }],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({ providers: [] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from parent');
        });
        it('should be able to inject an injectable with dependencies', () => {
            let Greeter = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Greeter = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                    greet() {
                        return `hello from ${this.tokenValue}`;
                    }
                };
                __setFunctionName(_classThis, "Greeter");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Greeter = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Greeter = _classThis;
            })();
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(greeter) {
                        this.greeter = greeter;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu],
                        exports: [App, MenuTrigger, Menu],
                        providers: [{ provide: token, useValue: 'module' }],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [
                    { provide: Greeter, useClass: Greeter },
                    { provide: token, useValue: 'injector' },
                ],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.greeter.greet()).toBe('hello from injector');
        });
        it('should be able to inject a value from a grandparent component when a custom injector is provided', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
            <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
            <ng-template #menuTemplate>
              <menu></menu>
            </ng-template>
           `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var Parent = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let GrandParent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<parent></parent>',
                        providers: [{ provide: token, useValue: 'hello from grandparent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _parent_decorators;
                let _parent_initializers = [];
                let _parent_extraInitializers = [];
                var GrandParent = _classThis = class {
                    constructor() {
                        this.parent = __runInitializers(this, _parent_initializers, void 0);
                        __runInitializers(this, _parent_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "GrandParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _parent_decorators = [(0, core_1.ViewChild)(Parent)];
                    __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandParent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [GrandParent, Parent, MenuTrigger, Menu] });
            const injector = core_1.Injector.create({ providers: [] });
            const fixture = testing_1.TestBed.createComponent(GrandParent);
            fixture.detectChanges();
            fixture.componentInstance.parent.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.parent.menu.tokenValue).toBe('hello from grandparent');
        });
        it('should be able to use a custom injector when created through TemplateRef', () => {
            let injectedValue;
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        injectedValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template>
            <menu></menu>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, Menu],
                        exports: [App, Menu],
                        providers: [{ provide: token, useValue: 'hello from module' }],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.template.createEmbeddedView({}, injector);
            fixture.detectChanges();
            expect(injectedValue).toBe('hello from injector');
        });
        it('should use a custom injector when the view is created outside of the declaration view', () => {
            const declarerToken = new core_1.InjectionToken('declarerToken');
            const creatorToken = new core_1.InjectionToken('creatorToken');
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue, declarerTokenValue, creatorTokenValue) {
                        this.tokenValue = tokenValue;
                        this.declarerTokenValue = declarerTokenValue;
                        this.creatorTokenValue = creatorTokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let Declarer = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'declarer',
                        template: '<ng-template><menu></menu></ng-template>',
                        providers: [{ provide: declarerToken, useValue: 'hello from declarer' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var Declarer = _classThis = class {
                    constructor() {
                        this.menu = __runInitializers(this, _menu_initializers, void 0);
                        this.template = (__runInitializers(this, _menu_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Declarer");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Declarer = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Declarer = _classThis;
            })();
            let Creator = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'creator',
                        template: '<menu-trigger></menu-trigger>',
                        providers: [{ provide: creatorToken, useValue: 'hello from creator' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                var Creator = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        __runInitializers(this, _trigger_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Creator");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Creator = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Creator = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <declarer></declarer>
              <creator></creator>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _declarer_decorators;
                let _declarer_initializers = [];
                let _declarer_extraInitializers = [];
                let _creator_decorators;
                let _creator_initializers = [];
                let _creator_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.declarer = __runInitializers(this, _declarer_initializers, void 0);
                        this.creator = (__runInitializers(this, _declarer_extraInitializers), __runInitializers(this, _creator_initializers, void 0));
                        __runInitializers(this, _creator_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _declarer_decorators = [(0, core_1.ViewChild)(Declarer)];
                    _creator_decorators = [(0, core_1.ViewChild)(Creator)];
                    __esDecorate(null, null, _declarer_decorators, { kind: "field", name: "declarer", static: false, private: false, access: { has: obj => "declarer" in obj, get: obj => obj.declarer, set: (obj, value) => { obj.declarer = value; } }, metadata: _metadata }, _declarer_initializers, _declarer_extraInitializers);
                    __esDecorate(null, null, _creator_decorators, { kind: "field", name: "creator", static: false, private: false, access: { has: obj => "creator" in obj, get: obj => obj.creator, set: (obj, value) => { obj.creator = value; } }, metadata: _metadata }, _creator_initializers, _creator_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, MenuTrigger, Menu, Declarer, Creator] });
            const injector = core_1.Injector.create({ providers: [{ provide: token, useValue: 'hello' }] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { declarer, creator } = fixture.componentInstance;
            creator.trigger.menu = declarer.template;
            creator.trigger.open(injector);
            fixture.detectChanges();
            expect(declarer.menu.tokenValue).toBe('hello');
            expect(declarer.menu.declarerTokenValue).toBe('hello from declarer');
            expect(declarer.menu.creatorTokenValue).toBeNull();
        });
        it('should give precedence to value provided lower in the tree over custom injector', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let ProvideToken = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[provide-token]',
                        providers: [{ provide: token, useValue: 'hello from directive' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProvideToken = _classThis = class {
                };
                __setFunctionName(_classThis, "ProvideToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProvideToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProvideToken = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          <ng-template #menuTemplate>
            <section>
              <div provide-token>
                <menu></menu>
              </div>
            </section>
          </ng-template>
        `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu, ProvideToken],
                        exports: [App, MenuTrigger, Menu, ProvideToken],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from directive');
        });
        it('should give precedence to value provided in custom injector over one provided higher', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let ProvideToken = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[provide-token]',
                        providers: [{ provide: token, useValue: 'hello from directive' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProvideToken = _classThis = class {
                };
                __setFunctionName(_classThis, "ProvideToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProvideToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProvideToken = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
              <div provide-token>
                <ng-template #menuTemplate>
                  <menu></menu>
                </ng-template>
              </div>
            `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu, ProvideToken],
                        exports: [App, MenuTrigger, Menu, ProvideToken],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from injector');
        });
        it('should give precedence to value provided lower in the tree over custom injector when crossing view boundaries', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let ProvideToken = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[provide-token]',
                        providers: [{ provide: token, useValue: 'hello from directive' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProvideToken = _classThis = class {
                };
                __setFunctionName(_classThis, "ProvideToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProvideToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProvideToken = _classThis;
            })();
            let Wrapper = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'wrapper',
                        template: `<div><menu></menu></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var Wrapper = _classThis = class {
                    constructor() {
                        this.menu = __runInitializers(this, _menu_initializers, void 0);
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Wrapper");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Wrapper = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Wrapper = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
              <ng-template #menuTemplate>
                <section provide-token>
                  <wrapper></wrapper>
                </section>
              </ng-template>
            `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _wrapper_decorators;
                let _wrapper_initializers = [];
                let _wrapper_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.wrapper = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _wrapper_initializers, void 0));
                        __runInitializers(this, _wrapper_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _wrapper_decorators = [(0, core_1.ViewChild)(Wrapper)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _wrapper_decorators, { kind: "field", name: "wrapper", static: false, private: false, access: { has: obj => "wrapper" in obj, get: obj => obj.wrapper, set: (obj, value) => { obj.wrapper = value; } }, metadata: _metadata }, _wrapper_initializers, _wrapper_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu, ProvideToken, Wrapper],
                        exports: [App, MenuTrigger, Menu, ProvideToken, Wrapper],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.wrapper.menu.tokenValue).toBe('hello from directive');
        });
        it('should give precedence to value provided in custom injector over one provided higher when crossing view boundaries', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let ProvideToken = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[provide-token]',
                        providers: [{ provide: token, useValue: 'hello from directive' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProvideToken = _classThis = class {
                };
                __setFunctionName(_classThis, "ProvideToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProvideToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProvideToken = _classThis;
            })();
            let Wrapper = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'wrapper',
                        template: `<div><menu></menu></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var Wrapper = _classThis = class {
                    constructor() {
                        this.menu = __runInitializers(this, _menu_initializers, void 0);
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Wrapper");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Wrapper = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Wrapper = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
              <div provide-token>
                <ng-template #menuTemplate>
                  <wrapper></wrapper>
                </ng-template>
              </div>
            `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _wrapper_decorators;
                let _wrapper_initializers = [];
                let _wrapper_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.wrapper = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _wrapper_initializers, void 0));
                        __runInitializers(this, _wrapper_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _wrapper_decorators = [(0, core_1.ViewChild)(Wrapper)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _wrapper_decorators, { kind: "field", name: "wrapper", static: false, private: false, access: { has: obj => "wrapper" in obj, get: obj => obj.wrapper, set: (obj, value) => { obj.wrapper = value; } }, metadata: _metadata }, _wrapper_initializers, _wrapper_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu, ProvideToken, Wrapper],
                        exports: [App, MenuTrigger, Menu, ProvideToken, Wrapper],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            const injector = core_1.Injector.create({
                providers: [{ provide: token, useValue: 'hello from injector' }],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.wrapper.menu.tokenValue).toBe('hello from injector');
        });
        it('should not resolve value at insertion location', () => {
            let Menu = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'menu',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Menu = _classThis = class {
                    constructor(tokenValue) {
                        this.tokenValue = tokenValue;
                    }
                };
                __setFunctionName(_classThis, "Menu");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Menu = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Menu = _classThis;
            })();
            let ProvideToken = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[provide-token]',
                        providers: [{ provide: token, useValue: 'hello from directive' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ProvideToken = _classThis = class {
                };
                __setFunctionName(_classThis, "ProvideToken");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ProvideToken = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ProvideToken = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div provide-token>
            <menu-trigger [triggerFor]="menuTemplate"></menu-trigger>
          </div>

          <ng-template #menuTemplate>
            <menu></menu>
          </ng-template>
        `,
                        providers: [{ provide: token, useValue: 'hello from parent' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _trigger_decorators;
                let _trigger_initializers = [];
                let _trigger_extraInitializers = [];
                let _menu_decorators;
                let _menu_initializers = [];
                let _menu_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.trigger = __runInitializers(this, _trigger_initializers, void 0);
                        this.menu = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
                        __runInitializers(this, _menu_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _trigger_decorators = [(0, core_1.ViewChild)(MenuTrigger)];
                    _menu_decorators = [(0, core_1.ViewChild)(Menu)];
                    __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
                    __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, MenuTrigger, Menu, ProvideToken],
                        exports: [App, MenuTrigger, Menu, ProvideToken],
                    })];
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
            testing_1.TestBed.configureTestingModule({ imports: [Module] });
            // Provide an empty injector so we hit the new code path.
            const injector = core_1.Injector.create({ providers: [] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentInstance.trigger.open(injector);
            fixture.detectChanges();
            expect(fixture.componentInstance.menu.tokenValue).toBe('hello from parent');
        });
    });
    it('should prioritize module providers over additional providers', () => {
        const token = new core_1.InjectionToken('token');
        let ModuleWithProvider = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: token, useValue: 'module' }] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleWithProvider = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleWithProvider");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleWithProvider = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleWithProvider = _classThis;
        })();
        const injector = (0, core_1.ɵcreateInjector)(ModuleWithProvider, null, [
            { provide: token, useValue: 'additional' },
        ]);
        expect(injector.get(token)).toBe('module');
    });
    it('should be able to destroy programmatically created injectors', () => {
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                ngOnDestroy() { }
            };
            __setFunctionName(_classThis, "Service");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Service = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Service = _classThis;
        })();
        const parentInjector = core_1.Injector.create({
            providers: [Service],
            parent: testing_1.TestBed.inject(core_1.Injector),
        });
        const childInjector = core_1.Injector.create({ providers: [Service], parent: parentInjector });
        const instance = childInjector.get(Service);
        const destroySpy = spyOn(instance, 'ngOnDestroy');
        parentInjector.get(core_1.DestroyRef).onDestroy(() => childInjector.destroy());
        parentInjector.destroy();
        expect(destroySpy).toHaveBeenCalled();
    });
});
