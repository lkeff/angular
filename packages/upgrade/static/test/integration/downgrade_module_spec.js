"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const static_1 = require("../../../static");
const angular = __importStar(require("../../../src/common/src/angular1"));
const constants_1 = require("../../../src/common/src/constants");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const angular1_providers_1 = require("../../src/angular1_providers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    [true, false].forEach((propagateDigest) => {
        describe(`lazy-load ng2 module (propagateDigest: ${propagateDigest})`, () => {
            beforeEach(() => (0, core_1.destroyPlatform)());
            afterEach(() => (0, core_1.destroyPlatform)());
            it('should support multiple downgraded modules', (0, testing_1.waitForAsync)(() => {
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'b',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => ((0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)).bootstrapModule(module);
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                const downModA = doDowngradeModule(Ng2ModuleA);
                const downModB = doDowngradeModule(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
                angular.bootstrap(element, [ng1Module.name]);
                // Wait for the module to be bootstrapped.
                setTimeout(() => expect(element.textContent).toBe('a | b'));
            }));
            it('should support downgrading modules by providing NgModule class to `downgradeModule` call', (0, testing_1.waitForAsync)(() => {
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'b',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                const downModA = (0, static_1.downgradeModule)(Ng2ModuleA);
                const downModB = (0, static_1.downgradeModule)(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
                angular.bootstrap(element, [ng1Module.name]);
                // Wait for the module to be bootstrapped.
                setTimeout(() => expect(element.textContent).toBe('a | b'));
            }));
            it('should support nesting components from different downgraded modules', (0, testing_1.waitForAsync)(() => {
                let Ng1ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = static_1.UpgradeComponent;
                    var Ng1ComponentA = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentA");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentA = _classThis;
                })();
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(<ng1A></ng1A>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'ng2B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentA, Ng2ComponentA],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => {
                        const platformRef = (0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders);
                        return platformRef.bootstrapModule(module);
                    };
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                const downModA = doDowngradeModule(Ng2ModuleA);
                const downModB = doDowngradeModule(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng1A', () => ({ template: 'ng1A(<ng2-b ng-if="showB"></ng2-b>)' }))
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for module A to be bootstrapped.
                setTimeout(() => {
                    // Wait for the upgraded component's `ngOnInit()`.
                    setTimeout(() => {
                        expect(element.textContent).toBe('ng2A(ng1A())');
                        $rootScope.$apply('showB = true');
                        // Wait for module B to be bootstrapped.
                        setTimeout(() => expect(element.textContent).toBe('ng2A(ng1A(ng2B))'));
                    });
                });
            }));
            it('should support nesting components from different downgraded modules (via projection)', (0, testing_1.waitForAsync)(() => {
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(<ng-content></ng-content>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'ng2B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => {
                        const platformRef = (0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders);
                        return platformRef.bootstrapModule(module);
                    };
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                const downModA = doDowngradeModule(Ng2ModuleA);
                const downModB = doDowngradeModule(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)('<ng2-a><ng2-b ng-if="showB"></ng2-b></ng2-a>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for module A to be bootstrapped.
                setTimeout(() => {
                    expect(element.textContent).toBe('ng2A()');
                    $rootScope.$apply('showB = true');
                    // Wait for module B to be bootstrapped.
                    setTimeout(() => expect(element.textContent).toBe('ng2A(ng2B)'));
                });
            }));
            it('should support manually setting up a root module for all downgraded modules', (0, testing_1.fakeAsync)(() => {
                let CounterService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CounterService = _classThis = class {
                        constructor() {
                            this.value = ++CounterService.counter;
                        }
                    };
                    __setFunctionName(_classThis, "CounterService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CounterService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })();
                    _classThis.counter = 0;
                    (() => {
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CounterService = _classThis;
                })();
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(Counter:{{ counter.value }} | <ng-content></ng-content>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor(counter) {
                            this.counter = counter;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'Counter:{{ counter.value }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                        constructor(counter) {
                            this.counter = counter;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                // "Empty" module that will serve as root for all downgraded modules,
                // ensuring there will only be one instance for all injectables provided in "root".
                let Ng2ModuleRoot = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleRoot = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleRoot");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleRoot = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleRoot = _classThis;
                })();
                let rootInjectorPromise = null;
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => {
                        if (!rootInjectorPromise) {
                            rootInjectorPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)
                                .bootstrapModule(Ng2ModuleRoot)
                                .then((ref) => ref.injector);
                        }
                        return rootInjectorPromise.then((rootInjector) => {
                            const compiler = rootInjector.get(core_1.Compiler);
                            const moduleFactory = compiler.compileModuleSync(module);
                            return moduleFactory.create(rootInjector);
                        });
                    };
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                const downModA = doDowngradeModule(Ng2ModuleA);
                const downModB = doDowngradeModule(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)(`
              <ng2-a><ng2-b ng-if="showB1"></ng2-b></ng2-a>
              <ng2-b ng-if="showB2"></ng2-b>
            `);
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                (0, testing_1.tick)(); // Wait for module A to be bootstrapped.
                expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(Counter:1 | )');
                // Nested component B should use the same `CounterService` instance.
                $rootScope.$apply('showB1 = true');
                (0, testing_1.tick)(); // Wait for module B to be bootstrapped.
                expect((0, common_test_helpers_1.multiTrim)(element.children[0].textContent)).toBe('ng2A(Counter:1 | Counter:1)');
                // Top-level component B should use the same `CounterService` instance.
                $rootScope.$apply('showB2 = true');
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(element.children[1].textContent)).toBe('Counter:1');
            }));
            it('should correctly traverse the injector tree of downgraded components', (0, testing_1.waitForAsync)(() => {
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(<ng-content></ng-content>)',
                            providers: [
                                { provide: 'FOO', useValue: 'CompA-foo' },
                                { provide: 'BAR', useValue: 'CompA-bar' },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: ` FOO:{{ foo }} BAR:{{ bar }} BAZ:{{ baz }} QUX:{{ qux }} `,
                            providers: [{ provide: 'FOO', useValue: 'CompB-foo' }],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                        constructor(foo, bar, baz, qux) {
                            this.foo = foo;
                            this.bar = bar;
                            this.baz = baz;
                            this.qux = qux;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA, Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                            providers: [
                                { provide: 'FOO', useValue: 'Mod-foo' },
                                { provide: 'BAR', useValue: 'Mod-bar' },
                                { provide: 'BAZ', useValue: 'Mod-baz' },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => {
                    const platformRef = (0, core_1.getPlatform)() ||
                        (0, platform_browser_dynamic_1.platformBrowserDynamic)([
                            ...extraProviders,
                            { provide: 'FOO', useValue: 'Plat-foo' },
                            { provide: 'BAR', useValue: 'Plat-bar' },
                            { provide: 'BAZ', useValue: 'Plat-baz' },
                            { provide: 'QUX', useValue: 'Plat-qux' },
                        ]);
                    return platformRef.bootstrapModule(Ng2Module);
                };
                const downMod = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [downMod])
                    .directive('ng2A', (0, static_1.downgradeComponent)({ component: Ng2ComponentA, propagateDigest }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({ component: Ng2ComponentB, propagateDigest }));
                const element = (0, common_test_helpers_1.html)(`
              <ng2-a><ng2-b ng-if="showB1"></ng2-b></ng2-a>
              <ng2-b ng-if="showB2"></ng2-b>
            `);
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A()');
                    // Nested component B.
                    $rootScope.$apply('showB1 = true');
                    expect((0, common_test_helpers_1.multiTrim)(element.children[0].textContent)).toBe('ng2A( FOO:CompB-foo BAR:CompA-bar BAZ:Mod-baz QUX:Plat-qux )');
                    // Standalone component B.
                    $rootScope.$apply('showB2 = true');
                    expect((0, common_test_helpers_1.multiTrim)(element.children[1].textContent)).toBe('FOO:CompB-foo BAR:Mod-bar BAZ:Mod-baz QUX:Plat-qux');
                });
            }));
            it('should correctly traverse the injector tree of downgraded components (from different modules)', (0, testing_1.waitForAsync)(() => {
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(<ng-content></ng-content>)',
                            providers: [
                                { provide: 'FOO', useValue: 'CompA-foo' },
                                { provide: 'BAR', useValue: 'CompA-bar' },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentA = _classThis;
                })();
                let Ng2ComponentB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: ` FOO:{{ foo }} BAR:{{ bar }} BAZ:{{ baz }} QUX:{{ qux }} QUUX:{{ quux }} `,
                            providers: [{ provide: 'FOO', useValue: 'CompB-foo' }],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                        constructor(foo, bar, baz, qux, quux) {
                            this.foo = foo;
                            this.bar = bar;
                            this.baz = baz;
                            this.qux = qux;
                            this.quux = quux;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2ComponentB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentB = _classThis;
                })();
                let Ng2ModuleA = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentA],
                            imports: [platform_browser_1.BrowserModule],
                            providers: [
                                { provide: 'FOO', useValue: 'ModA-foo' },
                                { provide: 'BAR', useValue: 'ModA-bar' },
                                { provide: 'BAZ', useValue: 'ModA-baz' },
                                { provide: 'QUX', useValue: 'ModA-qux' },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleA = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleA = _classThis;
                })();
                let Ng2ModuleB = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule],
                            providers: [
                                { provide: 'FOO', useValue: 'ModB-foo' },
                                { provide: 'BAR', useValue: 'ModB-bar' },
                                { provide: 'BAZ', useValue: 'ModB-baz' },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ModuleB = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2ModuleB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ModuleB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ModuleB = _classThis;
                })();
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => {
                        const platformRef = (0, core_1.getPlatform)() ||
                            (0, platform_browser_dynamic_1.platformBrowserDynamic)([
                                ...extraProviders,
                                { provide: 'FOO', useValue: 'Plat-foo' },
                                { provide: 'BAR', useValue: 'Plat-bar' },
                                { provide: 'BAZ', useValue: 'Plat-baz' },
                                { provide: 'QUX', useValue: 'Plat-qux' },
                                { provide: 'QUUX', useValue: 'Plat-quux' },
                            ]);
                        return platformRef.bootstrapModule(module);
                    };
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                const downModA = doDowngradeModule(Ng2ModuleA);
                const downModB = doDowngradeModule(Ng2ModuleB);
                const ng1Module = angular
                    .module_('ng1', [downModA, downModB])
                    .directive('ng2A', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentA,
                    downgradedModule: downModA,
                    propagateDigest,
                }))
                    .directive('ng2B', (0, static_1.downgradeComponent)({
                    component: Ng2ComponentB,
                    downgradedModule: downModB,
                    propagateDigest,
                }));
                const element = (0, common_test_helpers_1.html)(`
              <ng2-a><ng2-b ng-if="showB1"></ng2-b></ng2-a>
              <ng2-b ng-if="showB2"></ng2-b>
            `);
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for module A to be bootstrapped.
                setTimeout(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A()');
                    // Nested component B.
                    $rootScope.$apply('showB1 = true');
                    // Wait for module B to be bootstrapped.
                    setTimeout(() => {
                        // It is debatable, whether the order of traversal should be:
                        // CompB > CompA > ModB > ModA > Plat (similar to how lazy-loaded components
                        // work)
                        expect((0, common_test_helpers_1.multiTrim)(element.children[0].textContent)).toBe('ng2A( FOO:CompB-foo BAR:CompA-bar BAZ:ModB-baz QUX:Plat-qux QUUX:Plat-quux )');
                        // Standalone component B.
                        $rootScope.$apply('showB2 = true');
                        expect((0, common_test_helpers_1.multiTrim)(element.children[1].textContent)).toBe('FOO:CompB-foo BAR:ModB-bar BAZ:ModB-baz QUX:Plat-qux QUUX:Plat-quux');
                    });
                });
            }));
            it('should support downgrading a component and propagate inputs', (0, testing_1.waitForAsync)(() => {
                let Ng2AComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'a({{ value }}) | <ng2B [value]="value"></ng2B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _value_decorators;
                    let _value_initializers = [];
                    let _value_extraInitializers = [];
                    var Ng2AComponent = _classThis = class {
                        constructor() {
                            this.value = __runInitializers(this, _value_initializers, -1);
                            __runInitializers(this, _value_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2AComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _value_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2AComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2AComponent = _classThis;
                })();
                let Ng2BComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2B',
                            template: 'b({{ value }})',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _value_decorators;
                    let _value_initializers = [];
                    let _value_extraInitializers = [];
                    var Ng2BComponent = _classThis = class {
                        constructor() {
                            this.value = __runInitializers(this, _value_initializers, -2);
                            __runInitializers(this, _value_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2BComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _value_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2BComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2BComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2AComponent, Ng2BComponent],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2AComponent, propagateDigest }))
                    .run([
                    '$rootScope',
                    ($rootScope) => ($rootScope['value'] = 0),
                ]);
                const element = (0, common_test_helpers_1.html)('<div><ng2 [value]="value" ng-if="loadNg2"></ng2></div>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                expect(element.textContent).toBe('');
                expect(() => $injector.get(constants_1.INJECTOR_KEY)).toThrowError();
                $rootScope.$apply('value = 1');
                expect(element.textContent).toBe('');
                expect(() => $injector.get(constants_1.INJECTOR_KEY)).toThrowError();
                $rootScope.$apply('loadNg2 = true');
                expect(element.textContent).toBe('');
                expect(() => $injector.get(constants_1.INJECTOR_KEY)).toThrowError();
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    expect(() => $injector.get(constants_1.INJECTOR_KEY)).not.toThrow();
                    // Wait for `$evalAsync()` to propagate inputs.
                    setTimeout(() => expect(element.textContent).toBe('a(1) | b(1)'));
                });
            }));
            it('should support using an upgraded service', (0, testing_1.waitForAsync)(() => {
                let Ng2Service = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Service = _classThis = class {
                        constructor(ng1Value) {
                            this.ng1Value = ng1Value;
                            this.getValue = () => `${this.ng1Value}-bar`;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Service");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Service = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Service = _classThis;
                })();
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '{{ value }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor(ng2Service) {
                            this.value = ng2Service.getValue();
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                            providers: [
                                Ng2Service,
                                {
                                    provide: 'ng1Value',
                                    useFactory: (i) => i.get('ng1Value'),
                                    deps: ['$injector'],
                                },
                            ],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }))
                    .value('ng1Value', 'foo');
                const element = (0, common_test_helpers_1.html)('<div><ng2 ng-if="loadNg2"></ng2></div>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                expect(element.textContent).toBe('');
                expect(() => $injector.get(constants_1.INJECTOR_KEY)).toThrowError();
                $rootScope.$apply('loadNg2 = true');
                expect(element.textContent).toBe('');
                expect(() => $injector.get(constants_1.INJECTOR_KEY)).toThrowError();
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    expect(() => $injector.get(constants_1.INJECTOR_KEY)).not.toThrow();
                    // Wait for `$evalAsync()` to propagate inputs.
                    setTimeout(() => expect(element.textContent).toBe('foo-bar'));
                });
            }));
            it('should create components inside the Angular zone', (0, testing_1.waitForAsync)(() => {
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'In the zone: {{ inTheZone }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.inTheZone = false;
                            this.inTheZone = core_1.NgZone.isInAngularZone();
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                angular.bootstrap(element, [ng1Module.name]);
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    // Wait for `$evalAsync()` to propagate inputs.
                    setTimeout(() => expect(element.textContent).toBe('In the zone: true'));
                });
            }));
            it('should destroy components inside the Angular zone', (0, testing_1.waitForAsync)(() => {
                let destroyedInTheZone = false;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        ngOnDestroy() {
                            destroyedInTheZone = core_1.NgZone.isInAngularZone();
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<ng2 ng-if="!hideNg2"></ng2>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    $rootScope.$apply('hideNg2 = true');
                    expect(destroyedInTheZone).toBe(true);
                });
            }));
            it('should propagate input changes inside the Angular zone', (0, testing_1.waitForAsync)(() => {
                let ng2Component;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _attrInput_decorators;
                    let _attrInput_initializers = [];
                    let _attrInput_extraInitializers = [];
                    let _propInput_decorators;
                    let _propInput_initializers = [];
                    let _propInput_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.attrInput = __runInitializers(this, _attrInput_initializers, 'foo');
                            this.propInput = (__runInitializers(this, _attrInput_extraInitializers), __runInitializers(this, _propInput_initializers, 'foo'));
                            __runInitializers(this, _propInput_extraInitializers);
                            ng2Component = this;
                        }
                        ngOnChanges() { }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _attrInput_decorators = [(0, core_1.Input)()];
                        _propInput_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _attrInput_decorators, { kind: "field", name: "attrInput", static: false, private: false, access: { has: obj => "attrInput" in obj, get: obj => obj.attrInput, set: (obj, value) => { obj.attrInput = value; } }, metadata: _metadata }, _attrInput_initializers, _attrInput_extraInitializers);
                        __esDecorate(null, null, _propInput_decorators, { kind: "field", name: "propInput", static: false, private: false, access: { has: obj => "propInput" in obj, get: obj => obj.propInput, set: (obj, value) => { obj.propInput = value; } }, metadata: _metadata }, _propInput_initializers, _propInput_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }))
                    .run([
                    '$rootScope',
                    ($rootScope) => {
                        $rootScope['attrVal'] = 'bar';
                        $rootScope['propVal'] = 'bar';
                    },
                ]);
                const element = (0, common_test_helpers_1.html)('<ng2 attr-input="{{ attrVal }}" [prop-input]="propVal"></ng2>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                setTimeout(() => {
                    // Wait for the module to be bootstrapped.
                    setTimeout(() => {
                        // Wait for `$evalAsync()` to propagate inputs.
                        const expectToBeInNgZone = () => expect(core_1.NgZone.isInAngularZone()).toBe(true);
                        const changesSpy = spyOn(ng2Component, 'ngOnChanges').and.callFake(expectToBeInNgZone);
                        expect(ng2Component.attrInput).toBe('bar');
                        expect(ng2Component.propInput).toBe('bar');
                        $rootScope.$apply('attrVal = "baz"');
                        expect(ng2Component.attrInput).toBe('baz');
                        expect(ng2Component.propInput).toBe('bar');
                        expect(changesSpy).toHaveBeenCalledTimes(1);
                        $rootScope.$apply('propVal = "qux"');
                        expect(ng2Component.attrInput).toBe('baz');
                        expect(ng2Component.propInput).toBe('qux');
                        expect(changesSpy).toHaveBeenCalledTimes(2);
                    });
                });
            }));
            it('should create and destroy nested, asynchronously instantiated components inside the Angular zone', (0, testing_1.waitForAsync)(() => {
                let createdInTheZone = false;
                let destroyedInTheZone = false;
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            createdInTheZone = core_1.NgZone.isInAngularZone();
                        }
                        ngOnDestroy() {
                            destroyedInTheZone = core_1.NgZone.isInAngularZone();
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                let WrapperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'wrapper',
                            template: '<ng-content></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var WrapperComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "WrapperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        WrapperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return WrapperComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [TestComponent, WrapperComponent],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('test', (0, static_1.downgradeComponent)({ component: TestComponent, propagateDigest }))
                    .directive('wrapper', (0, static_1.downgradeComponent)({ component: WrapperComponent, propagateDigest }));
                // Important: `ng-if` makes `<test>` render asynchronously.
                const element = (0, common_test_helpers_1.html)('<wrapper><test ng-if="showNg2"></test></wrapper>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    // Create nested component asynchronously.
                    expect(createdInTheZone).toBe(false);
                    $rootScope.$apply('showNg2 = true');
                    expect(createdInTheZone).toBe(true);
                    // Destroy nested component asynchronously.
                    expect(destroyedInTheZone).toBe(false);
                    $rootScope.$apply('showNg2 = false');
                    expect(destroyedInTheZone).toBe(true);
                });
            }));
            it('should wire up the component for change detection', (0, testing_1.waitForAsync)(() => {
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '{{ count }}<button (click)="increment()"></button>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.count = 0;
                        }
                        increment() {
                            ++this.count;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                angular.bootstrap(element, [ng1Module.name]);
                setTimeout(() => {
                    // Wait for the module to be bootstrapped.
                    setTimeout(() => {
                        // Wait for `$evalAsync()` to propagate inputs.
                        const button = element.querySelector('button');
                        expect(element.textContent).toBe('0');
                        button.click();
                        expect(element.textContent).toBe('1');
                        button.click();
                        expect(element.textContent).toBe('2');
                    });
                });
            }));
            it('should wire up nested, asynchronously instantiated components for change detection', (0, testing_1.waitForAsync)(() => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test',
                            template: '{{ count }}<button (click)="increment()"></button>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.count = 0;
                        }
                        increment() {
                            ++this.count;
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                let WrapperComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'wrapper',
                            template: '<ng-content></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var WrapperComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "WrapperComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        WrapperComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return WrapperComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [TestComponent, WrapperComponent],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('test', (0, static_1.downgradeComponent)({ component: TestComponent, propagateDigest }))
                    .directive('wrapper', (0, static_1.downgradeComponent)({ component: WrapperComponent, propagateDigest }));
                // Important: `ng-if` makes `<test>` render asynchronously.
                const element = (0, common_test_helpers_1.html)('<wrapper><test ng-if="showNg2"></test></wrapper>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                // Wait for the module to be bootstrapped.
                setTimeout(() => {
                    // Create nested component asynchronously.
                    $rootScope.$apply('showNg2 = true');
                    const button = element.querySelector('button');
                    expect(element.textContent).toBe('0');
                    button.click();
                    expect(element.textContent).toBe('1');
                    button.click();
                    expect(element.textContent).toBe('2');
                });
            }));
            it('should run the lifecycle hooks in the correct order', (0, testing_1.waitForAsync)(() => {
                const logs = [];
                let rootScope;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            {{ value }}
            <button (click)="value = 'qux'"></button>
            <ng-content></ng-content>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _value_decorators;
                    let _value_initializers = [];
                    let _value_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        ngAfterContentChecked() {
                            this.log('AfterContentChecked');
                        }
                        ngAfterContentInit() {
                            this.log('AfterContentInit');
                        }
                        ngAfterViewChecked() {
                            this.log('AfterViewChecked');
                        }
                        ngAfterViewInit() {
                            this.log('AfterViewInit');
                        }
                        ngDoCheck() {
                            this.log('DoCheck');
                        }
                        ngOnChanges() {
                            this.log('OnChanges');
                        }
                        ngOnDestroy() {
                            this.log('OnDestroy');
                        }
                        ngOnInit() {
                            this.log('OnInit');
                        }
                        log(hook) {
                            logs.push(`${hook}(${this.value})`);
                        }
                        constructor() {
                            this.value = __runInitializers(this, _value_initializers, 'foo');
                            __runInitializers(this, _value_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _value_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }))
                    .run(($rootScope) => {
                    rootScope = $rootScope;
                    rootScope['value'] = 'bar';
                });
                const element = (0, common_test_helpers_1.html)('<div><ng2 value="{{ value }}" ng-if="!hideNg2">Content</ng2></div>');
                angular.bootstrap(element, [ng1Module.name]);
                setTimeout(() => {
                    // Wait for the module to be bootstrapped.
                    setTimeout(() => {
                        // Wait for `$evalAsync()` to propagate inputs.
                        const button = element.querySelector('button');
                        // Once initialized.
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('bar Content');
                        expect(logs).toEqual([
                            // `ngOnChanges()` call triggered directly through the `inputChanges`
                            // $watcher.
                            'OnChanges(bar)',
                            // Initial CD triggered directly through the `detectChanges()` or
                            // `inputChanges`
                            // $watcher (for `propagateDigest` true/false respectively).
                            'OnInit(bar)',
                            'DoCheck(bar)',
                            'AfterContentInit(bar)',
                            'AfterContentChecked(bar)',
                            'AfterViewInit(bar)',
                            'AfterViewChecked(bar)',
                            ...(propagateDigest
                                ? [
                                    // CD triggered directly through the `detectChanges()` $watcher (2nd
                                    // $digest).
                                    'DoCheck(bar)',
                                    'AfterContentChecked(bar)',
                                    'AfterViewChecked(bar)',
                                ]
                                : []),
                            // CD triggered due to entering/leaving the NgZone (in `downgradeFn()`).
                            'DoCheck(bar)',
                            'AfterContentChecked(bar)',
                            'AfterViewChecked(bar)',
                        ]);
                        logs.length = 0;
                        // Change inputs and run `$digest`.
                        rootScope.$apply('value = "baz"');
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('baz Content');
                        expect(logs).toEqual([
                            // `ngOnChanges()` call triggered directly through the `inputChanges`
                            // $watcher.
                            'OnChanges(baz)',
                            // `propagateDigest: true` (3 CD runs):
                            //   - CD triggered due to entering/leaving the NgZone (in `inputChanges`
                            //   $watcher).
                            //   - CD triggered directly through the `detectChanges()` $watcher.
                            //   - CD triggered due to entering/leaving the NgZone (in `detectChanges`
                            //   $watcher).
                            // `propagateDigest: false` (2 CD runs):
                            //   - CD triggered directly through the `inputChanges` $watcher.
                            //   - CD triggered due to entering/leaving the NgZone (in `inputChanges`
                            //   $watcher).
                            'DoCheck(baz)',
                            'AfterContentChecked(baz)',
                            'AfterViewChecked(baz)',
                            'DoCheck(baz)',
                            'AfterContentChecked(baz)',
                            'AfterViewChecked(baz)',
                            ...(propagateDigest
                                ? ['DoCheck(baz)', 'AfterContentChecked(baz)', 'AfterViewChecked(baz)']
                                : []),
                        ]);
                        logs.length = 0;
                        // Run `$digest` (without changing inputs).
                        rootScope.$digest();
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('baz Content');
                        expect(logs).toEqual(propagateDigest
                            ? [
                                // CD triggered directly through the `detectChanges()` $watcher.
                                'DoCheck(baz)',
                                'AfterContentChecked(baz)',
                                'AfterViewChecked(baz)',
                                // CD triggered due to entering/leaving the NgZone (in the above
                                // $watcher).
                                'DoCheck(baz)',
                                'AfterContentChecked(baz)',
                                'AfterViewChecked(baz)',
                            ]
                            : []);
                        logs.length = 0;
                        // Trigger change detection (without changing inputs).
                        button.click();
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('qux Content');
                        expect(logs).toEqual([
                            'DoCheck(qux)',
                            'AfterContentChecked(qux)',
                            'AfterViewChecked(qux)',
                        ]);
                        logs.length = 0;
                        // Destroy the component.
                        rootScope.$apply('hideNg2 = true');
                        expect(logs).toEqual(['OnDestroy(qux)']);
                        logs.length = 0;
                    });
                });
            }));
            it('should detach hostViews from the ApplicationRef once destroyed', (0, testing_1.waitForAsync)(() => {
                let ng2Component;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor(appRef) {
                            this.appRef = appRef;
                            ng2Component = this;
                            spyOn(appRef, 'attachView').and.callThrough();
                            spyOn(appRef, 'detachView').and.callThrough();
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<ng2 ng-if="!hideNg2"></ng2>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                setTimeout(() => {
                    // Wait for the module to be bootstrapped.
                    setTimeout(() => {
                        // Wait for the hostView to be attached (during the `$digest`).
                        const hostView = ng2Component.appRef.attachView.calls.mostRecent().args[0];
                        expect(hostView.destroyed).toBe(false);
                        $rootScope.$apply('hideNg2 = true');
                        expect(hostView.destroyed).toBe(true);
                        expect(ng2Component.appRef.detachView).toHaveBeenCalledWith(hostView);
                    });
                });
            }));
            it('should properly run cleanup when a downgraded component is destroyed', (0, testing_1.waitForAsync)(() => {
                let destroyed = false;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ul><li>test1</li><li>test2</li></ul>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        ngOnDestroy() {
                            destroyed = true;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<div><div ng-if="!hideNg2"><ng2></ng2></div></div>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                setTimeout(() => {
                    // Wait for the module to be bootstrapped.
                    const ng2Element = angular.element(element.querySelector('ng2'));
                    const ng2Descendants = Array.from(element.querySelectorAll('ng2 li')).map(angular.element);
                    let ng2ElementDestroyed = false;
                    let ng2DescendantsDestroyed = [false, false];
                    ng2Element.data('test', 42);
                    ng2Descendants.forEach((elem, i) => elem.data('test', i));
                    ng2Element.on('$destroy', () => (ng2ElementDestroyed = true));
                    ng2Descendants.forEach((elem, i) => elem.on('$destroy', () => (ng2DescendantsDestroyed[i] = true)));
                    expect(element.textContent).toBe('test1test2');
                    expect(destroyed).toBe(false);
                    expect(ng2Element.data('test')).toBe(42);
                    ng2Descendants.forEach((elem, i) => expect(elem.data('test')).toBe(i));
                    expect(ng2ElementDestroyed).toBe(false);
                    expect(ng2DescendantsDestroyed).toEqual([false, false]);
                    $rootScope.$apply('hideNg2 = true');
                    expect(element.textContent).toBe('');
                    expect(destroyed).toBe(true);
                    expect(ng2Element.data('test')).toBeUndefined();
                    ng2Descendants.forEach((elem) => expect(elem.data('test')).toBeUndefined());
                    expect(ng2ElementDestroyed).toBe(true);
                    expect(ng2DescendantsDestroyed).toEqual([true, true]);
                });
            }));
            it('should only retrieve the Angular zone once (and cache it for later use)', (0, testing_1.fakeAsync)(() => {
                let count = 0;
                let getNgZoneCount = 0;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'Count: {{ count }} | In the zone: {{ inTheZone }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.count = ++count;
                            this.inTheZone = false;
                            this.inTheZone = core_1.NgZone.isInAngularZone();
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        constructor(injector) {
                            const originalGet = injector.get;
                            injector.get = function (token) {
                                if (arguments[0] === core_1.NgZone)
                                    ++getNgZoneCount;
                                return originalGet.apply(injector, arguments);
                            };
                        }
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<div><ng2 ng-if="showNg2"></ng2></div>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                $rootScope.$apply('showNg2 = true');
                (0, testing_1.tick)(0); // Wait for the module to be bootstrapped and `$evalAsync()` to
                // propagate inputs.
                const injector = $injector.get(constants_1.LAZY_MODULE_REF).injector;
                const injectorGet = injector.get;
                spyOn(injector, 'get').and.callFake((...args) => {
                    expect(args[0]).not.toBe(core_1.NgZone);
                    return injectorGet.apply(injector, args);
                });
                expect(element.textContent).toBe('Count: 1 | In the zone: true');
                $rootScope.$apply('showNg2 = false');
                expect(element.textContent).toBe('');
                $rootScope.$apply('showNg2 = true');
                (0, testing_1.tick)(0); // Wait for `$evalAsync()` to propagate inputs.
                expect(element.textContent).toBe('Count: 2 | In the zone: true');
                $rootScope.$destroy();
            }));
            it("should give access to both injectors in the Angular module's constructor", (0, testing_1.waitForAsync)(() => {
                let $injectorFromNg2 = null;
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        constructor(injector) {
                            $injectorFromNg2 = injector.get('$injector');
                        }
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                const $injectorFromNg1 = angular.bootstrap(element, [ng1Module.name]);
                // Wait for the module to be bootstrapped.
                setTimeout(() => expect($injectorFromNg2).toBe($injectorFromNg1));
            }));
            it('should destroy the AngularJS app when `PlatformRef` is destroyed', (0, testing_1.waitForAsync)(() => {
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<span>NG2</span>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Module = _classThis;
                })();
                const bootstrapFn = (extraProviders) => (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders).bootstrapModule(Ng2Module);
                const lazyModuleName = (0, static_1.downgradeModule)(bootstrapFn);
                const ng1Module = angular
                    .module_('ng1', [lazyModuleName])
                    .component('ng1', { template: '<ng2></ng2>' })
                    .directive('ng2', (0, static_1.downgradeComponent)({ component: Ng2Component, propagateDigest }));
                const element = (0, common_test_helpers_1.html)('<div><ng1></ng1></div>');
                const $injector = angular.bootstrap(element, [ng1Module.name]);
                setTimeout(() => {
                    var _a;
                    // Wait for the module to be bootstrapped.
                    const $rootScope = $injector.get(constants_1.$ROOT_SCOPE);
                    const rootScopeDestroySpy = spyOn($rootScope, '$destroy');
                    const appElem = angular.element(element);
                    const ng1Elem = angular.element(element.querySelector('ng1'));
                    const ng2Elem = angular.element(element.querySelector('ng2'));
                    const ng2ChildElem = angular.element(element.querySelector('ng2 span'));
                    // Attach data to all elements.
                    appElem.data('testData', 1);
                    ng1Elem.data('testData', 2);
                    ng2Elem.data('testData', 3);
                    ng2ChildElem.data('testData', 4);
                    // Verify data can be retrieved.
                    expect(appElem.data('testData')).toBe(1);
                    expect(ng1Elem.data('testData')).toBe(2);
                    expect(ng2Elem.data('testData')).toBe(3);
                    expect(ng2ChildElem.data('testData')).toBe(4);
                    expect(rootScopeDestroySpy).not.toHaveBeenCalled();
                    // Destroy `PlatformRef`.
                    (_a = (0, core_1.getPlatform)()) === null || _a === void 0 ? void 0 : _a.destroy();
                    // Verify `$rootScope` has been destroyed and data has been cleaned up.
                    expect(rootScopeDestroySpy).toHaveBeenCalled();
                    expect(appElem.data('testData')).toBeUndefined();
                    expect(ng1Elem.data('testData')).toBeUndefined();
                    expect(ng2Elem.data('testData')).toBeUndefined();
                    expect(ng2ChildElem.data('testData')).toBeUndefined();
                });
            }));
            describe('(common error)', () => {
                let Ng2CompA;
                let Ng2CompB;
                let downModA;
                let downModB;
                let errorSpy;
                const doDowngradeModule = (module) => {
                    const bootstrapFn = (extraProviders) => ((0, core_1.getPlatform)() || (0, platform_browser_dynamic_1.platformBrowserDynamic)(extraProviders)).bootstrapModule(module);
                    return (0, static_1.downgradeModule)(bootstrapFn);
                };
                beforeEach(() => {
                    let Ng2ComponentA = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2A',
                                template: 'a',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2ComponentA = _classThis = class {
                        };
                        __setFunctionName(_classThis, "Ng2ComponentA");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng2ComponentA = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng2ComponentA = _classThis;
                    })();
                    let Ng2ComponentB = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2B',
                                template: 'b',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2ComponentB = _classThis = class {
                        };
                        __setFunctionName(_classThis, "Ng2ComponentB");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng2ComponentB = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng2ComponentB = _classThis;
                    })();
                    let Ng2ModuleA = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng2ComponentA],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2ModuleA = _classThis = class {
                            ngDoBootstrap() { }
                        };
                        __setFunctionName(_classThis, "Ng2ModuleA");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng2ModuleA = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng2ModuleA = _classThis;
                    })();
                    let Ng2ModuleB = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng2ComponentB],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2ModuleB = _classThis = class {
                            ngDoBootstrap() { }
                        };
                        __setFunctionName(_classThis, "Ng2ModuleB");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng2ModuleB = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng2ModuleB = _classThis;
                    })();
                    Ng2CompA = Ng2ComponentA;
                    Ng2CompB = Ng2ComponentB;
                    downModA = doDowngradeModule(Ng2ModuleA);
                    downModB = doDowngradeModule(Ng2ModuleB);
                    errorSpy = jasmine.createSpy(constants_1.$EXCEPTION_HANDLER);
                });
                // In the tests below, some of the components' bootstrap process is interrupted by an error.
                // If the bootstrap process for other components/modules is not completed in time, there is
                // a chance that some global state is retained, possibly messing subsequent tests.
                // Explicitly clean up after each test to prevent that.
                afterEach(() => (0, angular1_providers_1.setTempInjectorRef)(null));
                it('should throw if no downgraded module is included', (0, testing_1.waitForAsync)(() => {
                    const ng1Module = angular
                        .module_('ng1', [])
                        .value(constants_1.$EXCEPTION_HANDLER, errorSpy)
                        .directive('ng2A', (0, static_1.downgradeComponent)({
                        component: Ng2CompA,
                        downgradedModule: downModA,
                        propagateDigest,
                    }))
                        .directive('ng2B', (0, static_1.downgradeComponent)({
                        component: Ng2CompB,
                        propagateDigest,
                    }));
                    const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
                    angular.bootstrap(element, [ng1Module.name]);
                    expect(errorSpy).toHaveBeenCalledTimes(2);
                    expect(errorSpy).toHaveBeenCalledWith(new Error("Error while instantiating component 'Ng2ComponentA': Not a valid " +
                        "'@angular/upgrade' application.\n" +
                        'Did you forget to downgrade an Angular module or include it in the AngularJS ' +
                        'application?'), '<ng2-a>');
                    expect(errorSpy).toHaveBeenCalledWith(new Error("Error while instantiating component 'Ng2ComponentB': Not a valid " +
                        "'@angular/upgrade' application.\n" +
                        'Did you forget to downgrade an Angular module or include it in the AngularJS ' +
                        'application?'), '<ng2-b>');
                }));
                it('should throw if the corresponding downgraded module is not included', (0, testing_1.waitForAsync)(() => {
                    const ng1Module = angular
                        .module_('ng1', [downModA])
                        .value(constants_1.$EXCEPTION_HANDLER, errorSpy)
                        .directive('ng2A', (0, static_1.downgradeComponent)({
                        component: Ng2CompA,
                        downgradedModule: downModA,
                        propagateDigest,
                    }))
                        .directive('ng2B', (0, static_1.downgradeComponent)({
                        component: Ng2CompB,
                        downgradedModule: downModB,
                        propagateDigest,
                    }));
                    const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
                    angular.bootstrap(element, [ng1Module.name]);
                    expect(errorSpy).toHaveBeenCalledTimes(1);
                    expect(errorSpy).toHaveBeenCalledWith(new Error("Error while instantiating component 'Ng2ComponentB': Unable to find the " +
                        'specified downgraded module.\n' +
                        'Did you forget to downgrade an Angular module or include it in the AngularJS ' +
                        'application?'), '<ng2-b>');
                }));
                it('should throw if `downgradedModule` is not specified and there are multiple downgraded modules', (0, testing_1.waitForAsync)(() => {
                    const ng1Module = angular
                        .module_('ng1', [downModA, downModB])
                        .value(constants_1.$EXCEPTION_HANDLER, errorSpy)
                        .directive('ng2A', (0, static_1.downgradeComponent)({
                        component: Ng2CompA,
                        downgradedModule: downModA,
                        propagateDigest,
                    }))
                        .directive('ng2B', (0, static_1.downgradeComponent)({
                        component: Ng2CompB,
                        propagateDigest,
                    }));
                    const element = (0, common_test_helpers_1.html)('<ng2-a></ng2-a> | <ng2-b></ng2-b>');
                    angular.bootstrap(element, [ng1Module.name]);
                    expect(errorSpy).toHaveBeenCalledTimes(1);
                    expect(errorSpy).toHaveBeenCalledWith(new Error("Error while instantiating component 'Ng2ComponentB': 'downgradedModule' not " +
                        'specified.\n' +
                        'This application contains more than one downgraded Angular module, thus you need ' +
                        "to always specify 'downgradedModule' when downgrading components and " +
                        'injectables.'), '<ng2-b>');
                }));
            });
        });
    });
});
