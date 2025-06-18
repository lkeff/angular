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
const angular = __importStar(require("../../../src/common/src/angular1"));
const constants_1 = require("../../../src/common/src/constants");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const index_1 = require("../../index");
const static_test_helpers_1 = require("./static_test_helpers");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('upgrade ng1 component', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        describe('template/templateUrl', () => {
            it('should support `template` (string)', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { template: 'Hello, Angular!' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((upgrade) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            it('should support `template` (function)', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { template: () => 'Hello, Angular!' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            it('should pass $element to `template` function and not $attrs', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    template: ($attrs, $element) => {
                        expect($attrs).toBeUndefined();
                        expect($element).toBeDefined();
                        return 'Hello, Angular!';
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            it('should support `templateUrl` (string) fetched from `$templateCache`', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { templateUrl: 'ng1.component.html' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .run(($templateCache) => $templateCache.put('ng1.component.html', 'Hello, Angular!'));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            it('should support `templateUrl` (function) fetched from `$templateCache`', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { templateUrl: () => 'ng1.component.html' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .run(($templateCache) => $templateCache.put('ng1.component.html', 'Hello, Angular!'));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            it('should pass $element to `templateUrl` function and not $attrs', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    templateUrl: ($attrs, $element) => {
                        expect($attrs).toBeUndefined();
                        expect($element).toBeDefined();
                        return 'ng1.component.html';
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .run(($templateCache) => $templateCache.put('ng1.component.html', 'Hello, Angular!'));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello, Angular!');
                });
            }));
            // NOT SUPPORTED YET
            xit('should support `templateUrl` (string) fetched from the server', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { templateUrl: 'ng1.component.html' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .value('$httpBackend', (method, url, post, callback) => setTimeout(() => callback(200, `${method}:${url}`.toLowerCase()), 1000));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    (0, testing_1.tick)(500);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('');
                    (0, testing_1.tick)(500);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('get:ng1.component.html');
                });
            }));
            // NOT SUPPORTED YET
            xit('should support `templateUrl` (function) fetched from the server', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Component`
                const ng1Component = { templateUrl: () => 'ng1.component.html' };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .value('$httpBackend', (method, url, post, callback) => setTimeout(() => callback(200, `${method}:${url}`.toLowerCase()), 1000));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    (0, testing_1.tick)(500);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('');
                    (0, testing_1.tick)(500);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('get:ng1.component.html');
                });
            }));
            it('should support empty templates', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`s
                const ng1ComponentA = { template: '' };
                const ng1ComponentB = { template: () => '' };
                const ng1ComponentC = { templateUrl: 'ng1.component.html' };
                const ng1ComponentD = { templateUrl: () => 'ng1.component.html' };
                // Define `Ng1ComponentFacade`s
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(e, i) {
                            super('ng1A', e, i);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(e, i) {
                            super('ng1B', e, i);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                let Ng1ComponentCFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1C',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentCFacade = _classThis = class extends _classSuper {
                        constructor(e, i) {
                            super('ng1C', e, i);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentCFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentCFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentCFacade = _classThis;
                })();
                let Ng1ComponentDFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1D',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentDFacade = _classThis = class extends _classSuper {
                        constructor(e, i) {
                            super('ng1D', e, i);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentDFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentDFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentDFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1A>Ignore this</ng1A>
            <ng1B>Ignore this</ng1B>
            <ng1C>Ignore this</ng1C>
            <ng1D>Ignore this</ng1D>
          `,
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1A', ng1ComponentA)
                    .component('ng1B', ng1ComponentB)
                    .component('ng1C', ng1ComponentC)
                    .component('ng1D', ng1ComponentD)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .run(($templateCache) => $templateCache.put('ng1.component.html', ''));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [
                                Ng1ComponentAFacade,
                                Ng1ComponentBFacade,
                                Ng1ComponentCFacade,
                                Ng1ComponentDFacade,
                                Ng2Component,
                            ],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('');
                });
            }));
        });
        describe('bindings', () => {
            it('should support `@` bindings', (0, testing_1.fakeAsync)(() => {
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA }}, {{ $ctrl.inputB }}',
                    bindings: { inputA: '@inputAttrA', inputB: '@' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, '');
                            this.inputB = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputB_initializers, ''));
                            __runInitializers(this, _inputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)('inputAttrA')];
                        _inputB_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1 inputAttrA="{{ dataA }}" inputB="{{ dataB }}"></ng1>
            | Outside: {{ dataA }}, {{ dataB }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = 'foo';
                            this.dataB = 'bar';
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    var _a, _b;
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = (_b = (_a = angular.element(ng1)).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = 'baz';
                    ng1Controller.inputB = 'qux';
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: foo, bar');
                    ng2ComponentInstance.dataA = 'foo2';
                    ng2ComponentInstance.dataB = 'bar2';
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                });
            }));
            it('should support `<` bindings', (0, testing_1.fakeAsync)(() => {
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA.value }}, {{ $ctrl.inputB.value }}',
                    bindings: { inputA: '<inputAttrA', inputB: '<' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, '');
                            this.inputB = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputB_initializers, ''));
                            __runInitializers(this, _inputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)('inputAttrA')];
                        _inputB_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1 [inputAttrA]="dataA" [inputB]="dataB"></ng1>
            | Outside: {{ dataA.value }}, {{ dataB.value }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = { value: 'foo' };
                            this.dataB = { value: 'bar' };
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    var _a, _b;
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = (_b = (_a = angular.element(ng1)).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = { value: 'baz' };
                    ng1Controller.inputB = { value: 'qux' };
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: foo, bar');
                    ng2ComponentInstance.dataA = { value: 'foo2' };
                    ng2ComponentInstance.dataB = { value: 'bar2' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                });
            }));
            it('should support `=` bindings', (0, testing_1.fakeAsync)(() => {
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA.value }}, {{ $ctrl.inputB.value }}',
                    bindings: { inputA: '=inputAttrA', inputB: '=' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    let _inputAChange_decorators;
                    let _inputAChange_initializers = [];
                    let _inputAChange_extraInitializers = [];
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    let _inputBChange_decorators;
                    let _inputBChange_initializers = [];
                    let _inputBChange_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, '');
                            this.inputAChange = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputAChange_initializers, new core_1.EventEmitter()));
                            this.inputB = (__runInitializers(this, _inputAChange_extraInitializers), __runInitializers(this, _inputB_initializers, ''));
                            this.inputBChange = (__runInitializers(this, _inputB_extraInitializers), __runInitializers(this, _inputBChange_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _inputBChange_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)('inputAttrA')];
                        _inputAChange_decorators = [(0, core_1.Output)('inputAttrAChange')];
                        _inputB_decorators = [(0, core_1.Input)()];
                        _inputBChange_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, null, _inputAChange_decorators, { kind: "field", name: "inputAChange", static: false, private: false, access: { has: obj => "inputAChange" in obj, get: obj => obj.inputAChange, set: (obj, value) => { obj.inputAChange = value; } }, metadata: _metadata }, _inputAChange_initializers, _inputAChange_extraInitializers);
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, null, _inputBChange_decorators, { kind: "field", name: "inputBChange", static: false, private: false, access: { has: obj => "inputBChange" in obj, get: obj => obj.inputBChange, set: (obj, value) => { obj.inputBChange = value; } }, metadata: _metadata }, _inputBChange_initializers, _inputBChange_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1 [(inputAttrA)]="dataA" [(inputB)]="dataB"></ng1>
            | Outside: {{ dataA.value }}, {{ dataB.value }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = { value: 'foo' };
                            this.dataB = { value: 'bar' };
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    var _a, _b;
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = (_b = (_a = angular.element(ng1)).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = { value: 'baz' };
                    ng1Controller.inputB = { value: 'qux' };
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: baz, qux');
                    ng2ComponentInstance.dataA = { value: 'foo2' };
                    ng2ComponentInstance.dataB = { value: 'bar2' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                });
            }));
            it('should support `&` bindings', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: -',
                    bindings: { outputA: '&outputAttrA', outputB: '&' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _outputA_decorators;
                    let _outputA_initializers = [];
                    let _outputA_extraInitializers = [];
                    let _outputB_decorators;
                    let _outputB_initializers = [];
                    let _outputB_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.outputA = __runInitializers(this, _outputA_initializers, new core_1.EventEmitter());
                            this.outputB = (__runInitializers(this, _outputA_extraInitializers), __runInitializers(this, _outputB_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _outputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _outputA_decorators = [(0, core_1.Output)('outputAttrA')];
                        _outputB_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _outputA_decorators, { kind: "field", name: "outputA", static: false, private: false, access: { has: obj => "outputA" in obj, get: obj => obj.outputA, set: (obj, value) => { obj.outputA = value; } }, metadata: _metadata }, _outputA_initializers, _outputA_extraInitializers);
                        __esDecorate(null, null, _outputB_decorators, { kind: "field", name: "outputB", static: false, private: false, access: { has: obj => "outputB" in obj, get: obj => obj.outputB, set: (obj, value) => { obj.outputB = value; } }, metadata: _metadata }, _outputB_initializers, _outputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1 (outputAttrA)="dataA = $event" (outputB)="dataB = $event"></ng1>
            | Outside: {{ dataA }}, {{ dataB }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = 'foo';
                            this.dataB = 'bar';
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    var _a, _b;
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = (_b = (_a = angular.element(ng1)).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: - | Outside: foo, bar');
                    ng1Controller.outputA('baz');
                    ng1Controller.outputB('qux');
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: - | Outside: baz, qux');
                });
            }));
            it('should bind properties, events', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    template: `
               Hello {{ $ctrl.fullName }};
               A: {{ $ctrl.modelA }};
               B: {{ $ctrl.modelB }};
               C: {{ $ctrl.modelC }}
             `,
                    bindings: { fullName: '@', modelA: '<dataA', modelB: '=dataB', modelC: '=', event: '&' },
                    controller: function ($scope) {
                        $scope.$watch('$ctrl.modelB', (v) => {
                            if (v === 'Savkin') {
                                this.modelB = 'SAVKIN';
                                this.event('WORKS');
                                // Should not update because `modelA: '<dataA'` is uni-directional.
                                this.modelA = 'VICTOR';
                                // Should not update because `[modelC]` is uni-directional.
                                this.modelC = 'sf';
                            }
                        });
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _fullName_decorators;
                    let _fullName_initializers = [];
                    let _fullName_extraInitializers = [];
                    let _modelA_decorators;
                    let _modelA_initializers = [];
                    let _modelA_extraInitializers = [];
                    let _modelB_decorators;
                    let _modelB_initializers = [];
                    let _modelB_extraInitializers = [];
                    let _modelBChange_decorators;
                    let _modelBChange_initializers = [];
                    let _modelBChange_extraInitializers = [];
                    let _modelC_decorators;
                    let _modelC_initializers = [];
                    let _modelC_extraInitializers = [];
                    let _modelCChange_decorators;
                    let _modelCChange_initializers = [];
                    let _modelCChange_extraInitializers = [];
                    let _event_decorators;
                    let _event_initializers = [];
                    let _event_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.fullName = __runInitializers(this, _fullName_initializers, '');
                            this.modelA = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _modelA_initializers, void 0));
                            this.modelB = (__runInitializers(this, _modelA_extraInitializers), __runInitializers(this, _modelB_initializers, void 0));
                            this.modelBChange = (__runInitializers(this, _modelB_extraInitializers), __runInitializers(this, _modelBChange_initializers, new core_1.EventEmitter()));
                            this.modelC = (__runInitializers(this, _modelBChange_extraInitializers), __runInitializers(this, _modelC_initializers, void 0));
                            this.modelCChange = (__runInitializers(this, _modelC_extraInitializers), __runInitializers(this, _modelCChange_initializers, new core_1.EventEmitter()));
                            this.event = (__runInitializers(this, _modelCChange_extraInitializers), __runInitializers(this, _event_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _event_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _fullName_decorators = [(0, core_1.Input)()];
                        _modelA_decorators = [(0, core_1.Input)('dataA')];
                        _modelB_decorators = [(0, core_1.Input)('dataB')];
                        _modelBChange_decorators = [(0, core_1.Output)('dataBChange')];
                        _modelC_decorators = [(0, core_1.Input)()];
                        _modelCChange_decorators = [(0, core_1.Output)()];
                        _event_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: obj => "fullName" in obj, get: obj => obj.fullName, set: (obj, value) => { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
                        __esDecorate(null, null, _modelA_decorators, { kind: "field", name: "modelA", static: false, private: false, access: { has: obj => "modelA" in obj, get: obj => obj.modelA, set: (obj, value) => { obj.modelA = value; } }, metadata: _metadata }, _modelA_initializers, _modelA_extraInitializers);
                        __esDecorate(null, null, _modelB_decorators, { kind: "field", name: "modelB", static: false, private: false, access: { has: obj => "modelB" in obj, get: obj => obj.modelB, set: (obj, value) => { obj.modelB = value; } }, metadata: _metadata }, _modelB_initializers, _modelB_extraInitializers);
                        __esDecorate(null, null, _modelBChange_decorators, { kind: "field", name: "modelBChange", static: false, private: false, access: { has: obj => "modelBChange" in obj, get: obj => obj.modelBChange, set: (obj, value) => { obj.modelBChange = value; } }, metadata: _metadata }, _modelBChange_initializers, _modelBChange_extraInitializers);
                        __esDecorate(null, null, _modelC_decorators, { kind: "field", name: "modelC", static: false, private: false, access: { has: obj => "modelC" in obj, get: obj => obj.modelC, set: (obj, value) => { obj.modelC = value; } }, metadata: _metadata }, _modelC_initializers, _modelC_extraInitializers);
                        __esDecorate(null, null, _modelCChange_decorators, { kind: "field", name: "modelCChange", static: false, private: false, access: { has: obj => "modelCChange" in obj, get: obj => obj.modelCChange, set: (obj, value) => { obj.modelCChange = value; } }, metadata: _metadata }, _modelCChange_initializers, _modelCChange_extraInitializers);
                        __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1
              fullName="{{ last }}, {{ first }}, {{ city }}"
              [(dataA)]="first"
              [(dataB)]="last"
              [modelC]="city"
              (event)="event = $event"
            >
            </ng1>
            | <ng1 fullName="{{ 'TEST' }}" dataA="First" dataB="Last" modelC="City"></ng1> |
            {{ event }} - {{ last }}, {{ first }}, {{ city }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.first = 'Victor';
                            this.last = 'Savkin';
                            this.city = 'SF';
                            this.event = '?';
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello Savkin, Victor, SF; A: VICTOR; B: SAVKIN; C: sf | ' +
                        'Hello TEST; A: First; B: Last; C: City | ' +
                        'WORKS - SAVKIN, Victor, SF');
                    // Detect changes
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Hello SAVKIN, Victor, SF; A: VICTOR; B: SAVKIN; C: sf | ' +
                        'Hello TEST; A: First; B: Last; C: City | ' +
                        'WORKS - SAVKIN, Victor, SF');
                });
            }));
            it('should bind optional properties', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA.value }}, {{ $ctrl.inputB }}',
                    bindings: { inputA: '=?inputAttrA', inputB: '=?', outputA: '&?outputAttrA', outputB: '&?' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    let _inputAChange_decorators;
                    let _inputAChange_initializers = [];
                    let _inputAChange_extraInitializers = [];
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    let _inputBChange_decorators;
                    let _inputBChange_initializers = [];
                    let _inputBChange_extraInitializers = [];
                    let _outputA_decorators;
                    let _outputA_initializers = [];
                    let _outputA_extraInitializers = [];
                    let _outputB_decorators;
                    let _outputB_initializers = [];
                    let _outputB_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, '');
                            this.inputAChange = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputAChange_initializers, new core_1.EventEmitter()));
                            this.inputB = (__runInitializers(this, _inputAChange_extraInitializers), __runInitializers(this, _inputB_initializers, ''));
                            this.inputBChange = (__runInitializers(this, _inputB_extraInitializers), __runInitializers(this, _inputBChange_initializers, new core_1.EventEmitter()));
                            this.outputA = (__runInitializers(this, _inputBChange_extraInitializers), __runInitializers(this, _outputA_initializers, new core_1.EventEmitter()));
                            this.outputB = (__runInitializers(this, _outputA_extraInitializers), __runInitializers(this, _outputB_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _outputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)('inputAttrA')];
                        _inputAChange_decorators = [(0, core_1.Output)('inputAttrAChange')];
                        _inputB_decorators = [(0, core_1.Input)()];
                        _inputBChange_decorators = [(0, core_1.Output)()];
                        _outputA_decorators = [(0, core_1.Output)('outputAttrA')];
                        _outputB_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, null, _inputAChange_decorators, { kind: "field", name: "inputAChange", static: false, private: false, access: { has: obj => "inputAChange" in obj, get: obj => obj.inputAChange, set: (obj, value) => { obj.inputAChange = value; } }, metadata: _metadata }, _inputAChange_initializers, _inputAChange_extraInitializers);
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, null, _inputBChange_decorators, { kind: "field", name: "inputBChange", static: false, private: false, access: { has: obj => "inputBChange" in obj, get: obj => obj.inputBChange, set: (obj, value) => { obj.inputBChange = value; } }, metadata: _metadata }, _inputBChange_initializers, _inputBChange_extraInitializers);
                        __esDecorate(null, null, _outputA_decorators, { kind: "field", name: "outputA", static: false, private: false, access: { has: obj => "outputA" in obj, get: obj => obj.outputA, set: (obj, value) => { obj.outputA = value; } }, metadata: _metadata }, _outputA_initializers, _outputA_extraInitializers);
                        __esDecorate(null, null, _outputB_decorators, { kind: "field", name: "outputB", static: false, private: false, access: { has: obj => "outputB" in obj, get: obj => obj.outputB, set: (obj, value) => { obj.outputB = value; } }, metadata: _metadata }, _outputB_initializers, _outputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1 [(inputAttrA)]="dataA" [(inputB)]="dataB.value"></ng1> |
            <ng1 inputB="Bar" (outputAttrA)="dataA = $event"></ng1> |
            <ng1 (outputB)="updateDataB($event)"></ng1> | <ng1></ng1> | Outside: {{ dataA.value }},
            {{ dataB.value }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = { value: 'foo' };
                            this.dataB = { value: 'bar' };
                        }
                        updateDataB(value) {
                            this.dataB.value = value;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    var _a, _b, _c, _d, _e, _f;
                    const ng1s = element.querySelectorAll('ng1');
                    const ng1Controller0 = (_b = (_a = angular.element(ng1s[0])).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    const ng1Controller1 = (_d = (_c = angular.element(ng1s[1])).controller) === null || _d === void 0 ? void 0 : _d.call(_c, 'ng1');
                    const ng1Controller2 = (_f = (_e = angular.element(ng1s[2])).controller) === null || _f === void 0 ? void 0 : _f.call(_e, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Inside: , Bar | Inside: , | Inside: , | Outside: foo, bar');
                    ng1Controller0.inputA.value = 'baz';
                    ng1Controller0.inputB = 'qux';
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Inside: , Bar | Inside: , | Inside: , | Outside: baz, qux');
                    ng1Controller1.outputA({ value: 'foo again' });
                    ng1Controller2.outputB('bar again');
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(ng1Controller0.inputA).toEqual({ value: 'foo again' });
                    expect(ng1Controller0.inputB).toEqual('bar again');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo again, bar again | Inside: , Bar | Inside: , | Inside: , | ' +
                        'Outside: foo again, bar again');
                });
            }));
            it('should bind properties, events to scope when bindToController is not used', (0, testing_1.fakeAsync)(() => {
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '{{ someText }} - Data: {{ inputA }} - Length: {{ inputA.length }}',
                    scope: { inputA: '=', outputA: '&' },
                    controller: function ($scope) {
                        $scope['someText'] = 'ng1';
                        this.$scope = $scope;
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[ng1]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    let _inputAChange_decorators;
                    let _inputAChange_initializers = [];
                    let _inputAChange_extraInitializers = [];
                    let _outputA_decorators;
                    let _outputA_initializers = [];
                    let _outputA_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, '');
                            this.inputAChange = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputAChange_initializers, new core_1.EventEmitter()));
                            this.outputA = (__runInitializers(this, _inputAChange_extraInitializers), __runInitializers(this, _outputA_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _outputA_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)()];
                        _inputAChange_decorators = [(0, core_1.Output)()];
                        _outputA_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, null, _inputAChange_decorators, { kind: "field", name: "inputAChange", static: false, private: false, access: { has: obj => "inputAChange" in obj, get: obj => obj.inputAChange, set: (obj, value) => { obj.inputAChange = value; } }, metadata: _metadata }, _inputAChange_initializers, _inputAChange_extraInitializers);
                        __esDecorate(null, null, _outputA_decorators, { kind: "field", name: "outputA", static: false, private: false, access: { has: obj => "outputA" in obj, get: obj => obj.outputA, set: (obj, value) => { obj.outputA = value; } }, metadata: _metadata }, _outputA_initializers, _outputA_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <div ng1 [(inputA)]="dataA" (outputA)="dataA.push($event)"></div>
            | {{ someText }} - Data: {{ dataA }} - Length: {{ dataA.length }}
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.someText = 'ng2';
                            this.dataA = [1, 2, 3];
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    var _a, _b;
                    const ng1 = element.querySelector('[ng1]');
                    const ng1Controller = (_b = (_a = angular.element(ng1)).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1 - Data: [1,2,3] - Length: 3 | ng2 - Data: 1,2,3 - Length: 3');
                    ng1Controller.$scope.inputA = [4, 5];
                    (0, testing_1.tick)();
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1 - Data: [4,5] - Length: 2 | ng2 - Data: 4,5 - Length: 2');
                    ng1Controller.$scope.outputA(6);
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(ng1Controller.$scope.inputA).toEqual([4, 5, 6]);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1 - Data: [4,5,6] - Length: 3 | ng2 - Data: 4,5,6 - Length: 3');
                });
            }));
        });
        describe('compiling', () => {
            it('should compile the ng1 template in the correct DOM context', (0, testing_1.waitForAsync)(() => {
                let grandParentNodeName;
                // Define `ng1Component`
                const ng1ComponentA = { template: 'ng1A(<ng1-b></ng1-b>)' };
                const ng1DirectiveB = {
                    compile: (tElem) => {
                        grandParentNodeName = tElem.parent().parent()[0].nodeName;
                        return {};
                    },
                };
                // Define `Ng1ComponentAFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                // Define `Ng2ComponentX`
                let Ng2ComponentX = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2-x',
                            template: 'ng2X(<ng1A></ng1A>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentX = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2ComponentX");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2ComponentX = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2ComponentX = _classThis;
                })();
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .component('ng1A', ng1ComponentA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2X', (0, index_1.downgradeComponent)({ component: Ng2ComponentX }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentAFacade, Ng2ComponentX],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-x></ng2-x>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(grandParentNodeName).toBe('NG2-X');
                });
            }));
        });
        describe('linking', () => {
            it('should run the pre-linking after instantiating the controller', (0, testing_1.waitForAsync)(() => {
                const log = [];
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '',
                    link: { pre: () => log.push('ng1-pre') },
                    controller: class {
                        constructor() {
                            log.push('ng1-ctrl');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(log).toEqual(['ng1-ctrl', 'ng1-pre']);
                });
            }));
            it('should run the pre-linking function before linking', (0, testing_1.waitForAsync)(() => {
                const log = [];
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: '<ng1-b></ng1-b>',
                    link: { pre: () => log.push('ng1A-pre') },
                };
                const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                // Define `Ng1ComponentAFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentAFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(log).toEqual(['ng1A-pre', 'ng1B-post']);
                });
            }));
            it('should run the post-linking function after linking (link: object)', (0, testing_1.waitForAsync)(() => {
                const log = [];
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: '<ng1-b></ng1-b>',
                    link: { post: () => log.push('ng1A-post') },
                };
                const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                // Define `Ng1ComponentAFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentAFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(log).toEqual(['ng1B-post', 'ng1A-post']);
                });
            }));
            it('should run the post-linking function after linking (link: function)', (0, testing_1.waitForAsync)(() => {
                const log = [];
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: '<ng1-b></ng1-b>',
                    link: () => log.push('ng1A-post'),
                };
                const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                // Define `Ng1ComponentAFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentAFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(log).toEqual(['ng1B-post', 'ng1A-post']);
                });
            }));
            it('should run the post-linking function before `$postLink`', (0, testing_1.waitForAsync)(() => {
                const log = [];
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '',
                    link: () => log.push('ng1-post'),
                    controller: class {
                        $postLink() {
                            log.push('ng1-$post');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect(log).toEqual(['ng1-post', 'ng1-$post']);
                });
            }));
        });
        describe('controller', () => {
            it('should support `controllerAs`', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '{{ vm.scope }}; {{ vm.isClass }}; {{ vm.hasElement }}; {{ vm.isPublished() }}',
                    scope: true,
                    controllerAs: 'vm',
                    controller: class {
                        constructor($element, $scope) {
                            this.$element = $element;
                            this.isClass = '';
                            this.hasElement = $element[0].nodeName;
                            this.scope = $scope.$parent.$parent === $scope.$root ? 'scope' : 'wrong-scope';
                            this.verifyIAmAClass();
                        }
                        isPublished() {
                            var _a, _b;
                            return ((_b = (_a = this.$element).controller) === null || _b === void 0 ? void 0 : _b.call(_a, 'ng1')) === this ? 'published' : 'not-published';
                        }
                        verifyIAmAClass() {
                            this.isClass = 'isClass';
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('scope; isClass; NG1; published');
                });
            }));
            it('should support `bindToController` (boolean)', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'Scope: {{ title }}; Controller: {{ $ctrl.title }}',
                    scope: { title: '@' },
                    bindToController: false,
                    controllerAs: '$ctrl',
                    controller: class {
                    },
                };
                const ng1DirectiveB = {
                    template: 'Scope: {{ title }}; Controller: {{ $ctrl.title }}',
                    scope: { title: '@' },
                    bindToController: true,
                    controllerAs: '$ctrl',
                    controller: class {
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `
            <ng1A title="WORKS"></ng1A> |
            <ng1B title="WORKS"></ng1B>
          `,
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Scope: WORKS; Controller: | Scope: ; Controller: WORKS');
                });
            }));
            it('should support `bindToController` (object)', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '{{ $ctrl.title }}',
                    scope: {},
                    bindToController: { title: '@' },
                    controllerAs: '$ctrl',
                    controller: class {
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 title="WORKS"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.dataA = 'foo';
                            this.dataB = 'bar';
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('WORKS');
                });
            }));
            it('should support `controller` as string', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1Directive = {
                    template: '{{ $ctrl.title }} {{ $ctrl.text }}',
                    scope: { title: '@' },
                    bindToController: true,
                    controller: 'Ng1Controller as $ctrl',
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _title_decorators;
                    let _title_initializers = [];
                    let _title_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.title = __runInitializers(this, _title_initializers, '');
                            __runInitializers(this, _title_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _title_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 title="WORKS"></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .controller('Ng1Controller', class {
                    constructor() {
                        this.text = 'GREAT';
                    }
                })
                    .directive('ng1', () => ng1Directive)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('WORKS GREAT');
                });
            }));
            it('should insert the compiled content before instantiating the controller', (0, testing_1.waitForAsync)(() => {
                let compiledContent;
                let getCurrentContent;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Hello, {{ $ctrl.name }}!',
                    controller: class {
                        constructor($element) {
                            this.name = 'world';
                            getCurrentContent = () => $element.text();
                            compiledContent = getCurrentContent();
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(compiledContent)).toBe('Hello, {{ $ctrl.name }}!');
                    expect((0, common_test_helpers_1.multiTrim)(getCurrentContent())).toBe('Hello, world!');
                });
            }));
        });
        describe('require', () => {
            // NOT YET SUPPORTED
            xdescribe('in pre-/post-link', () => {
                it('should resolve to its own controller if falsy', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Directive`
                    const ng1Directive = {
                        template: 'Pre: {{ pre }} | Post: {{ post }}',
                        controller: class {
                            constructor() {
                                this.value = 'foo';
                            }
                        },
                        link: {
                            pre: function (scope, elem, attrs, ctrl) {
                                scope['pre'] = ctrl.value;
                            },
                            post: function (scope, elem, attrs, ctrl) {
                                scope['post'] = ctrl.value;
                            },
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1></ng1>',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .directive('ng1', () => ng1Directive)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('Pre: foo | Post: foo');
                    });
                }));
                // TODO: Add more tests
            });
            describe('in controller', () => {
                it('should be available to children', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = {
                        template: '<ng1-b></ng1-b>',
                        controller: class {
                            constructor() {
                                this.value = 'ng1A';
                            }
                        },
                    };
                    const ng1ComponentB = {
                        template: 'Required: {{ $ctrl.required.value }}',
                        require: { required: '^^ng1A' },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentAFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1A',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1A', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentAFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentAFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1A></ng1A>',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentAFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Required: ng1A');
                    });
                }));
                it('should throw if required controller cannot be found', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = { require: { foo: 'iDoNotExist' } };
                    const ng1ComponentB = { require: { foo: '^iDoNotExist' } };
                    const ng1ComponentC = { require: { foo: '^^iDoNotExist' } };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentAFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1A',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1A', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentAFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentAFacade = _classThis;
                    })();
                    let Ng1ComponentBFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1B',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1B', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentBFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentBFacade = _classThis;
                    })();
                    let Ng1ComponentCFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1C',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentCFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1C', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentCFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentCFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentCFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2ComponentA = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2-a',
                                template: '<ng1A></ng1A>',
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
                                selector: 'ng2-b',
                                template: '<ng1B></ng1B>',
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
                    let Ng2ComponentC = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2-c',
                                template: '<ng1C></ng1C>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2ComponentC = _classThis = class {
                        };
                        __setFunctionName(_classThis, "Ng2ComponentC");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng2ComponentC = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng2ComponentC = _classThis;
                    })();
                    // Define `ng1Module`
                    const mockExceptionHandler = jasmine.createSpy(constants_1.$EXCEPTION_HANDLER);
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .component('ng1C', ng1ComponentC)
                        .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }))
                        .directive('ng2B', (0, index_1.downgradeComponent)({ component: Ng2ComponentB }))
                        .directive('ng2C', (0, index_1.downgradeComponent)({ component: Ng2ComponentC }))
                        .value(constants_1.$EXCEPTION_HANDLER, mockExceptionHandler);
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    Ng1ComponentAFacade,
                                    Ng1ComponentBFacade,
                                    Ng1ComponentCFacade,
                                    Ng2ComponentA,
                                    Ng2ComponentB,
                                    Ng2ComponentC,
                                ],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const elementA = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                    const elementB = (0, common_test_helpers_1.html)(`<ng2-b></ng2-b>`);
                    const elementC = (0, common_test_helpers_1.html)(`<ng2-c></ng2-c>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, elementA, ng1Module).then(() => {
                        expect(mockExceptionHandler).toHaveBeenCalledWith(new Error("Unable to find required 'iDoNotExist' in upgraded directive 'ng1A'."));
                    });
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, elementB, ng1Module).then(() => {
                        expect(mockExceptionHandler).toHaveBeenCalledWith(new Error("Unable to find required '^iDoNotExist' in upgraded directive 'ng1B'."));
                    });
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, elementC, ng1Module).then(() => {
                        expect(mockExceptionHandler).toHaveBeenCalledWith(new Error("Unable to find required '^^iDoNotExist' in upgraded directive 'ng1C'."));
                    });
                }));
                it('should not throw if missing required controller is optional', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1Component = {
                        require: {
                            foo: '?iDoNotExist',
                            bar: '^?iDoNotExist',
                            baz: '?^^iDoNotExist',
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1></ng1>',
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
                    // Define `ng1Module`
                    const mockExceptionHandler = jasmine.createSpy(constants_1.$EXCEPTION_HANDLER);
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1', ng1Component)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                        .value(constants_1.$EXCEPTION_HANDLER, mockExceptionHandler);
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect(mockExceptionHandler).not.toHaveBeenCalled();
                    });
                }));
                it('should assign resolved values to the controller instance (if `require` is not object)', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = {
                        template: 'ng1A(<div><ng2></ng2></div>)',
                        controller: class {
                            constructor() {
                                this.value = 'A';
                            }
                        },
                    };
                    const ng1ComponentB = {
                        template: `ng1B({{ $ctrl.getProps() }})`,
                        require: '^ng1A',
                        controller: class {
                            getProps() {
                                // If all goes well, there should be no keys on `this`
                                return Object.keys(this).join(', ');
                            }
                        },
                    };
                    const ng1ComponentC = {
                        template: `ng1C({{ $ctrl.getProps() }})`,
                        require: ['?ng1A', '^ng1A', '^^ng1A', 'ng1C', '^ng1C', '?^^ng1C'],
                        controller: class {
                            getProps() {
                                // If all goes well, there should be no keys on `this`
                                return Object.keys(this).join(', ');
                            }
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentBFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1B',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1B', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentBFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentBFacade = _classThis;
                    })();
                    let Ng1ComponentCFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1C',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentCFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1C', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentCFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentCFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentCFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: 'ng2(<div><ng1B></ng1B> | <ng1C></ng1C></div>)',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .component('ng1C', ng1ComponentC)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentBFacade, Ng1ComponentCFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng1-a></ng1-a>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1A(ng2(ng1B() | ng1C()))');
                    });
                }));
                it('should assign resolved values to the controller instance (if `require` is object)', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = {
                        template: 'ng1A(<div><ng2></ng2></div>)',
                        controller: class {
                            constructor() {
                                this.value = 'A';
                            }
                        },
                    };
                    const ng1ComponentB = {
                        template: `ng1B(
                 ng1A: {{ $ctrl.ng1ASelf.value }} |
                 ^ng1A: {{ $ctrl.ng1ASelfUp.value }} |
                 ^^ng1A: {{ $ctrl.ng1AParentUp.value }} |
                 ng1B: {{ $ctrl.ng1BSelf.value }} |
                 ^ng1B: {{ $ctrl.ng1BSelfUp.value }} |
                 ^^ng1B: {{ $ctrl.ng1BParentUp.value }}
               )`,
                        require: {
                            ng1ASelf: '?ng1A',
                            ng1ASelfUp: '^ng1A',
                            ng1AParentUp: '^^ng1A',
                            ng1BSelf: 'ng1B',
                            ng1BSelfUp: '^ng1B',
                            ng1BParentUp: '?^^ng1B',
                        },
                        controller: class {
                            constructor() {
                                this.value = 'B';
                            }
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentBFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1B',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1B', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentBFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentBFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: 'ng2(<div><ng1B></ng1B></div>)',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentBFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng1-a></ng1-a>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1A(ng2(ng1B( ng1A: | ^ng1A: A | ^^ng1A: A | ng1B: B | ^ng1B: B | ^^ng1B: )))');
                    });
                }));
                it('should assign to controller before calling `$onInit()`', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = {
                        template: '<ng2></ng2>',
                        controller: class {
                            constructor() {
                                this.value = 'ng1A';
                            }
                        },
                    };
                    const ng1ComponentB = {
                        template: '$onInit: {{ $ctrl.onInitValue }}',
                        require: { required: '^^ng1A' },
                        controller: class {
                            $onInit() {
                                const self = this;
                                self.onInitValue = self.required.value;
                            }
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentBFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1B',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1B', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentBFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentBFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1B></ng1B>',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentBFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng1-a></ng1-a>`);
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('$onInit: ng1A');
                    });
                }));
                it('should use the key as name if the required controller name is omitted', (0, testing_1.waitForAsync)(() => {
                    // Define `ng1Component`
                    const ng1ComponentA = {
                        template: '<ng1-b></ng1-b>',
                        controller: class {
                            constructor() {
                                this.value = 'A';
                            }
                        },
                    };
                    const ng1ComponentB = {
                        template: '<ng2></ng2>',
                        controller: class {
                            constructor() {
                                this.value = 'B';
                            }
                        },
                    };
                    const ng1ComponentC = {
                        template: 'ng1A: {{ $ctrl.ng1A.value }} | ng1B: {{ $ctrl.ng1B.value }} | ng1C: {{ $ctrl.ng1C.value }}',
                        require: {
                            ng1A: '^^',
                            ng1B: '?^',
                            ng1C: '',
                        },
                        controller: class {
                            constructor() {
                                this.value = 'C';
                            }
                        },
                    };
                    // Define `Ng1ComponentFacade`
                    let Ng1ComponentCFacade = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: 'ng1C',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = index_1.UpgradeComponent;
                        var Ng1ComponentCFacade = _classThis = class extends _classSuper {
                            constructor(elementRef, injector) {
                                super('ng1C', elementRef, injector);
                            }
                        };
                        __setFunctionName(_classThis, "Ng1ComponentCFacade");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            Ng1ComponentCFacade = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return Ng1ComponentCFacade = _classThis;
                    })();
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1C></ng1C>',
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
                    // Define `ng1Module`
                    const ng1Module = angular
                        .module_('ng1Module', [])
                        .component('ng1A', ng1ComponentA)
                        .component('ng1B', ng1ComponentB)
                        .component('ng1C', ng1ComponentC)
                        .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [Ng1ComponentCFacade, Ng2Component],
                                imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)('<ng1-a></ng1-a>');
                    (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng1A: A | ng1B: B | ng1C: C');
                    });
                }));
            });
        });
        describe('transclusion', () => {
            it('should support single-slot transclusion', (0, testing_1.waitForAsync)(() => {
                let ng2ComponentAInstance;
                let ng2ComponentBInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1(<div ng-transclude></div>)',
                    transclude: true,
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: 'ng2A(<ng1>{{ value }} | <ng2B *ngIf="showB"></ng2B></ng1>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor() {
                            this.value = 'foo';
                            this.showB = false;
                            ng2ComponentAInstance = this;
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
                            template: 'ng2B({{ value }})',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentB = _classThis = class {
                        constructor() {
                            this.value = 'bar';
                            ng2ComponentBInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(foo | ))');
                    ng2ComponentAInstance.value = 'baz';
                    ng2ComponentAInstance.showB = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(baz | ng2B(bar)))');
                    ng2ComponentBInstance.value = 'qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(baz | ng2B(qux)))');
                });
            }));
            it('should support single-slot transclusion with fallback content', (0, testing_1.waitForAsync)(() => {
                let ng1ControllerInstances = [];
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1(<div ng-transclude>{{ $ctrl.value }}</div>)',
                    transclude: true,
                    controller: class {
                        constructor() {
                            this.value = 'from-ng1';
                            ng1ControllerInstances.push(this);
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'ng2(<ng1>{{ value }}</ng1> | <ng1></ng1>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.value = 'from-ng2';
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2(ng1(from-ng2) | ng1(from-ng1))');
                    ng1ControllerInstances.forEach((ctrl) => (ctrl.value = 'ng1-foo'));
                    ng2ComponentInstance.value = 'ng2-bar';
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2(ng1(ng2-bar) | ng1(ng1-foo))');
                });
            }));
            it('should support multi-slot transclusion', (0, testing_1.waitForAsync)(() => {
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1(x(<div ng-transclude="slotX"></div>) | y(<div ng-transclude="slotY"></div>))',
                    transclude: { slotX: 'contentX', slotY: 'contentY' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: ` ng2(
            <ng1>
              <content-x>{{ x }}1</content-x>
              <content-y>{{ y }}1</content-y>
              <content-x>{{ x }}2</content-x>
              <content-y>{{ y }}2</content-y>
            </ng1>
            )`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.x = 'foo';
                            this.y = 'bar';
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(foo1foo2)|y(bar1bar2)))');
                    ng2ComponentInstance.x = 'baz';
                    ng2ComponentInstance.y = 'qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz1baz2)|y(qux1qux2)))');
                });
            }));
            it('should support default slot (with fallback content)', (0, testing_1.waitForAsync)(() => {
                let ng1ControllerInstances = [];
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1(default(<div ng-transclude="">fallback-{{ $ctrl.value }}</div>))',
                    transclude: { slotX: 'contentX', slotY: 'contentY' },
                    controller: class {
                        constructor() {
                            this.value = 'ng1';
                            ng1ControllerInstances.push(this);
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: ` ng2(
            <ng1>
              ({{ x }})
              <content-x>ignored x</content-x>
              {{ x }}-<span>{{ y }}</span>
              <content-y>ignored y</content-y>
              <span>({{ y }})</span>
            </ng1>
            |
            <!--
                   Remove any whitespace, because in AngularJS versions prior to 1.6
                   even whitespace counts as transcluded content.
                 -->
            <ng1><content-x>ignored x</content-x><content-y>ignored y</content-y></ng1>
            )`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.x = 'foo';
                            this.y = 'bar';
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(default((foo)foo-bar(bar)))|ng1(default(fallback-ng1)))');
                    ng1ControllerInstances.forEach((ctrl) => (ctrl.value = 'ng1-plus'));
                    ng2ComponentInstance.x = 'baz';
                    ng2ComponentInstance.y = 'qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(default((baz)baz-qux(qux)))|ng1(default(fallback-ng1-plus)))');
                });
            }));
            it('should support optional transclusion slots (with fallback content)', (0, testing_1.waitForAsync)(() => {
                let ng1ControllerInstances = [];
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: `
               ng1(
                x(<div ng-transclude="slotX">{{ $ctrl.x }}</div>) |
                y(<div ng-transclude="slotY">{{ $ctrl.y }}</div>)
               )`,
                    transclude: { slotX: '?contentX', slotY: '?contentY' },
                    controller: class {
                        constructor() {
                            this.x = 'ng1X';
                            this.y = 'ng1Y';
                            ng1ControllerInstances.push(this);
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: ` ng2(
            <ng1
              ><content-x>{{ x }}</content-x></ng1
            >
            |
            <ng1
              ><content-y>{{ y }}</content-y></ng1
            >
            )`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.x = 'ng2X';
                            this.y = 'ng2Y';
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(ng2X)|y(ng1Y))|ng1(x(ng1X)|y(ng2Y)))');
                    ng1ControllerInstances.forEach((ctrl) => {
                        ctrl.x = 'ng1X-foo';
                        ctrl.y = 'ng1Y-bar';
                    });
                    ng2ComponentInstance.x = 'ng2X-baz';
                    ng2ComponentInstance.y = 'ng2Y-qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(ng2X-baz)|y(ng1Y-bar))|ng1(x(ng1X-foo)|y(ng2Y-qux)))');
                });
            }));
            it('should throw if a non-optional slot is not filled', (0, testing_1.waitForAsync)(() => {
                let errorMessage;
                // Define `ng1Component`
                const ng1Component = {
                    template: '',
                    transclude: { slotX: '?contentX', slotY: 'contentY' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .value(constants_1.$EXCEPTION_HANDLER, (error) => (errorMessage = error.message))
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect(errorMessage).toContain("Required transclusion slot 'slotY' on directive: ng1");
                });
            }));
            it('should support structural directives in transcluded content', (0, testing_1.waitForAsync)(() => {
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1(x(<div ng-transclude="slotX"></div>) | default(<div ng-transclude=""></div>))',
                    transclude: { slotX: 'contentX' },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: ` ng2(
            <ng1>
              <content-x
                ><div *ngIf="show">{{ x }}1</div></content-x
              >
              <div *ngIf="!show">{{ y }}1</div>
              <content-x
                ><div *ngIf="!show">{{ x }}2</div></content-x
              >
              <div *ngIf="show">{{ y }}2</div>
            </ng1>
            )`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.x = 'foo';
                            this.y = 'bar';
                            this.show = true;
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(foo1)|default(bar2)))');
                    ng2ComponentInstance.x = 'baz';
                    ng2ComponentInstance.y = 'qux';
                    ng2ComponentInstance.show = false;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz2)|default(qux1)))');
                    ng2ComponentInstance.show = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz1)|default(qux2)))');
                });
            }));
        });
        describe('lifecycle hooks', () => {
            it('should call `$onChanges()` on binding destination (prototype)', (0, testing_1.fakeAsync)(() => {
                const scopeOnChanges = jasmine.createSpy('scopeOnChanges');
                const controllerOnChangesA = jasmine.createSpy('controllerOnChangesA');
                const controllerOnChangesB = jasmine.createSpy('controllerOnChangesB');
                let ng2ComponentInstance;
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: '',
                    scope: { inputA: '<' },
                    bindToController: false,
                    controllerAs: '$ctrl',
                    controller: class {
                        $onChanges(changes) {
                            controllerOnChangesA(changes);
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: '',
                    scope: { inputB: '<' },
                    bindToController: true,
                    controllerAs: '$ctrl',
                    controller: class {
                        $onChanges(changes) {
                            controllerOnChangesB(changes);
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, void 0);
                            __runInitializers(this, _inputA_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                            this.inputB = __runInitializers(this, _inputB_initializers, void 0);
                            __runInitializers(this, _inputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputB_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A [inputA]="data"></ng1A> | <ng1B [inputB]="data"></ng1B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.data = { foo: 'bar' };
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }))
                    .run(($rootScope) => {
                    Object.getPrototypeOf($rootScope)['$onChanges'] = scopeOnChanges;
                });
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    // Initial change
                    expect(scopeOnChanges.calls.count()).toBe(1);
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(1);
                    expect(scopeOnChanges.calls.argsFor(0)[0]).toEqual({ inputA: jasmine.any(Object) });
                    expect(scopeOnChanges.calls.argsFor(0)[0].inputA.currentValue).toEqual({ foo: 'bar' });
                    expect(scopeOnChanges.calls.argsFor(0)[0].inputA.isFirstChange()).toBe(true);
                    expect(controllerOnChangesB.calls.argsFor(0)[0].inputB.currentValue).toEqual({
                        foo: 'bar',
                    });
                    expect(controllerOnChangesB.calls.argsFor(0)[0].inputB.isFirstChange()).toBe(true);
                    // Change: Re-assign `data`
                    ng2ComponentInstance.data = { foo: 'baz' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChanges.calls.count()).toBe(2);
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(2);
                    expect(scopeOnChanges.calls.argsFor(1)[0]).toEqual({ inputA: jasmine.any(Object) });
                    expect(scopeOnChanges.calls.argsFor(1)[0].inputA.previousValue).toEqual({ foo: 'bar' });
                    expect(scopeOnChanges.calls.argsFor(1)[0].inputA.currentValue).toEqual({ foo: 'baz' });
                    expect(scopeOnChanges.calls.argsFor(1)[0].inputA.isFirstChange()).toBe(false);
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.previousValue).toEqual({
                        foo: 'bar',
                    });
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.currentValue).toEqual({
                        foo: 'baz',
                    });
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.isFirstChange()).toBe(false);
                    // No change: Update internal property
                    ng2ComponentInstance.data.foo = 'qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChanges.calls.count()).toBe(2);
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(2);
                    // Change: Re-assign `data` (even if it looks the same)
                    ng2ComponentInstance.data = { foo: 'qux' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChanges.calls.count()).toBe(3);
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(3);
                    expect(scopeOnChanges.calls.argsFor(2)[0]).toEqual({ inputA: jasmine.any(Object) });
                    expect(scopeOnChanges.calls.argsFor(2)[0].inputA.previousValue).toEqual({ foo: 'qux' });
                    expect(scopeOnChanges.calls.argsFor(2)[0].inputA.currentValue).toEqual({ foo: 'qux' });
                    expect(scopeOnChanges.calls.argsFor(2)[0].inputA.isFirstChange()).toBe(false);
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.previousValue).toEqual({
                        foo: 'qux',
                    });
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.currentValue).toEqual({
                        foo: 'qux',
                    });
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.isFirstChange()).toBe(false);
                });
            }));
            it('should call `$onChanges()` on binding destination (instance)', (0, testing_1.fakeAsync)(() => {
                const scopeOnChangesA = jasmine.createSpy('scopeOnChangesA');
                const scopeOnChangesB = jasmine.createSpy('scopeOnChangesB');
                const controllerOnChangesA = jasmine.createSpy('controllerOnChangesA');
                const controllerOnChangesB = jasmine.createSpy('controllerOnChangesB');
                let ng2ComponentInstance;
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: '',
                    scope: { inputA: '<' },
                    bindToController: false,
                    controllerAs: '$ctrl',
                    controller: class {
                        constructor($scope) {
                            $scope['$onChanges'] = scopeOnChangesA;
                            this.$onChanges = controllerOnChangesA;
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: '',
                    scope: { inputB: '<' },
                    bindToController: true,
                    controllerAs: '$ctrl',
                    controller: class {
                        constructor($scope) {
                            $scope['$onChanges'] = scopeOnChangesB;
                            this.$onChanges = controllerOnChangesB;
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputA_decorators;
                    let _inputA_initializers = [];
                    let _inputA_extraInitializers = [];
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                            this.inputA = __runInitializers(this, _inputA_initializers, void 0);
                            __runInitializers(this, _inputA_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputA_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _inputB_decorators;
                    let _inputB_initializers = [];
                    let _inputB_extraInitializers = [];
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                            this.inputB = __runInitializers(this, _inputB_initializers, void 0);
                            __runInitializers(this, _inputB_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _inputB_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A [inputA]="data"></ng1A> | <ng1B [inputB]="data"></ng1B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.data = { foo: 'bar' };
                            ng2ComponentInstance = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    // Initial change
                    expect(scopeOnChangesA.calls.count()).toBe(1);
                    expect(scopeOnChangesB).not.toHaveBeenCalled();
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(1);
                    expect(scopeOnChangesA.calls.argsFor(0)[0].inputA.currentValue).toEqual({ foo: 'bar' });
                    expect(scopeOnChangesA.calls.argsFor(0)[0].inputA.isFirstChange()).toBe(true);
                    expect(controllerOnChangesB.calls.argsFor(0)[0].inputB.currentValue).toEqual({
                        foo: 'bar',
                    });
                    expect(controllerOnChangesB.calls.argsFor(0)[0].inputB.isFirstChange()).toBe(true);
                    // Change: Re-assign `data`
                    ng2ComponentInstance.data = { foo: 'baz' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChangesA.calls.count()).toBe(2);
                    expect(scopeOnChangesB).not.toHaveBeenCalled();
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(2);
                    expect(scopeOnChangesA.calls.argsFor(1)[0].inputA.previousValue).toEqual({ foo: 'bar' });
                    expect(scopeOnChangesA.calls.argsFor(1)[0].inputA.currentValue).toEqual({ foo: 'baz' });
                    expect(scopeOnChangesA.calls.argsFor(1)[0].inputA.isFirstChange()).toBe(false);
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.previousValue).toEqual({
                        foo: 'bar',
                    });
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.currentValue).toEqual({
                        foo: 'baz',
                    });
                    expect(controllerOnChangesB.calls.argsFor(1)[0].inputB.isFirstChange()).toBe(false);
                    // No change: Update internal property
                    ng2ComponentInstance.data.foo = 'qux';
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChangesA.calls.count()).toBe(2);
                    expect(scopeOnChangesB).not.toHaveBeenCalled();
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(2);
                    // Change: Re-assign `data` (even if it looks the same)
                    ng2ComponentInstance.data = { foo: 'qux' };
                    (0, static_test_helpers_1.$digest)(adapter);
                    (0, testing_1.tick)();
                    expect(scopeOnChangesA.calls.count()).toBe(3);
                    expect(scopeOnChangesB).not.toHaveBeenCalled();
                    expect(controllerOnChangesA).not.toHaveBeenCalled();
                    expect(controllerOnChangesB.calls.count()).toBe(3);
                    expect(scopeOnChangesA.calls.argsFor(2)[0].inputA.previousValue).toEqual({ foo: 'qux' });
                    expect(scopeOnChangesA.calls.argsFor(2)[0].inputA.currentValue).toEqual({ foo: 'qux' });
                    expect(scopeOnChangesA.calls.argsFor(2)[0].inputA.isFirstChange()).toBe(false);
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.previousValue).toEqual({
                        foo: 'qux',
                    });
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.currentValue).toEqual({
                        foo: 'qux',
                    });
                    expect(controllerOnChangesB.calls.argsFor(2)[0].inputB.isFirstChange()).toBe(false);
                });
            }));
            it('should call `$onInit()` on controller', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'Called: {{ called }}',
                    bindToController: false,
                    controller: class {
                        constructor($scope) {
                            this.$scope = $scope;
                            $scope['called'] = 'no';
                        }
                        $onInit() {
                            this.$scope['called'] = 'yes';
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'Called: {{ called }}',
                    bindToController: true,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            this['$onInit'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Called: yes | Called: yes');
                });
            }));
            it('should not call `$onInit()` on scope', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'Called: {{ called }}',
                    bindToController: false,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            $scope['$onInit'] = () => ($scope['called'] = 'yes');
                            Object.getPrototypeOf($scope)['$onInit'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'Called: {{ called }}',
                    bindToController: true,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            $scope['$onInit'] = () => ($scope['called'] = 'yes');
                            Object.getPrototypeOf($scope)['$onInit'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Called: no | Called: no');
                });
            }));
            it('should call `$postLink()` on controller', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'Called: {{ called }}',
                    bindToController: false,
                    controller: class {
                        constructor($scope) {
                            this.$scope = $scope;
                            $scope['called'] = 'no';
                        }
                        $postLink() {
                            this.$scope['called'] = 'yes';
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'Called: {{ called }}',
                    bindToController: true,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            this['$postLink'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Called: yes | Called: yes');
                });
            }));
            it('should not call `$postLink()` on scope', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'Called: {{ called }}',
                    bindToController: false,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            $scope['$postLink'] = () => ($scope['called'] = 'yes');
                            Object.getPrototypeOf($scope)['$postLink'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'Called: {{ called }}',
                    bindToController: true,
                    controller: class {
                        constructor($scope) {
                            $scope['called'] = 'no';
                            $scope['$postLink'] = () => ($scope['called'] = 'yes');
                            Object.getPrototypeOf($scope)['$postLink'] = () => ($scope['called'] = 'yes');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Called: no | Called: no');
                });
            }));
            it('should call `$doCheck()` on controller', (0, testing_1.waitForAsync)(() => {
                const controllerDoCheckA = jasmine.createSpy('controllerDoCheckA');
                const controllerDoCheckB = jasmine.createSpy('controllerDoCheckB');
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'ng1A',
                    bindToController: false,
                    controller: class {
                        $doCheck() {
                            controllerDoCheckA();
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'ng1B',
                    bindToController: true,
                    controller: class {
                        constructor() {
                            this['$doCheck'] = controllerDoCheckB;
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    // Get to a stable `$digest` state.
                    (0, static_test_helpers_1.$digest)(adapter);
                    // Initial change.
                    // (Do not use a specific number due to differences between AngularJS 1.5/1.6.)
                    expect(controllerDoCheckA.calls.count()).toBeGreaterThan(0);
                    expect(controllerDoCheckB.calls.count()).toBeGreaterThan(0);
                    controllerDoCheckA.calls.reset();
                    controllerDoCheckB.calls.reset();
                    // Run a `$digest`
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(controllerDoCheckA.calls.count()).toBe(1);
                    expect(controllerDoCheckB.calls.count()).toBe(1);
                    // Run another `$digest`
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(controllerDoCheckA.calls.count()).toBe(2);
                    expect(controllerDoCheckB.calls.count()).toBe(2);
                });
            }));
            it('should not call `$doCheck()` on scope', (0, testing_1.waitForAsync)(() => {
                const scopeDoCheck = jasmine.createSpy('scopeDoCheck');
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'ng1A',
                    bindToController: false,
                    controller: class {
                        constructor($scope) {
                            this.$scope = $scope;
                            $scope['$doCheck'] = scopeDoCheck;
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'ng1B',
                    bindToController: true,
                    controller: class {
                        constructor($scope) {
                            this.$scope = $scope;
                            $scope['$doCheck'] = scopeDoCheck;
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1A></ng1A> | <ng1B></ng1B>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    // Initial change
                    expect(scopeDoCheck).not.toHaveBeenCalled();
                    // Run a `$digest`
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(scopeDoCheck).not.toHaveBeenCalled();
                    // Run another `$digest`
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(scopeDoCheck).not.toHaveBeenCalled();
                });
            }));
            it('should call `$onDestroy()` on controller', (0, testing_1.waitForAsync)(() => {
                const controllerOnDestroyA = jasmine.createSpy('controllerOnDestroyA');
                const controllerOnDestroyB = jasmine.createSpy('controllerOnDestroyB');
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'ng1A',
                    scope: {},
                    bindToController: false,
                    controllerAs: '$ctrl',
                    controller: class {
                        $onDestroy() {
                            controllerOnDestroyA();
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'ng1B',
                    scope: {},
                    bindToController: true,
                    controllerAs: '$ctrl',
                    controller: class {
                        constructor() {
                            this['$onDestroy'] = controllerOnDestroyB;
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<div *ngIf="show"><ng1A></ng1A> | <ng1B></ng1B></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _show_decorators;
                    let _show_initializers = [];
                    let _show_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.show = __runInitializers(this, _show_initializers, false);
                            __runInitializers(this, _show_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _show_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)('<ng2 [show]="!destroyFromNg2" ng-if="!destroyFromNg1"></ng2>');
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    const $rootScope = adapter.$injector.get('$rootScope');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1A | ng1B');
                    expect(controllerOnDestroyA).not.toHaveBeenCalled();
                    expect(controllerOnDestroyB).not.toHaveBeenCalled();
                    $rootScope.$apply('destroyFromNg1 = true');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    expect(controllerOnDestroyA).toHaveBeenCalled();
                    expect(controllerOnDestroyB).toHaveBeenCalled();
                    controllerOnDestroyA.calls.reset();
                    controllerOnDestroyB.calls.reset();
                    $rootScope.$apply('destroyFromNg1 = false');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1A | ng1B');
                    expect(controllerOnDestroyA).not.toHaveBeenCalled();
                    expect(controllerOnDestroyB).not.toHaveBeenCalled();
                    $rootScope.$apply('destroyFromNg2 = true');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    expect(controllerOnDestroyA).toHaveBeenCalled();
                    expect(controllerOnDestroyB).toHaveBeenCalled();
                });
            }));
            it('should not call `$onDestroy()` on scope', (0, testing_1.waitForAsync)(() => {
                const scopeOnDestroy = jasmine.createSpy('scopeOnDestroy');
                // Define `ng1Directive`
                const ng1DirectiveA = {
                    template: 'ng1A',
                    scope: {},
                    bindToController: false,
                    controllerAs: '$ctrl',
                    controller: class {
                        constructor($scope) {
                            $scope['$onDestroy'] = scopeOnDestroy;
                            Object.getPrototypeOf($scope)['$onDestroy'] = scopeOnDestroy;
                        }
                    },
                };
                const ng1DirectiveB = {
                    template: 'ng1B',
                    scope: {},
                    bindToController: true,
                    controllerAs: '$ctrl',
                    controller: class {
                        constructor($scope) {
                            $scope['$onDestroy'] = scopeOnDestroy;
                            Object.getPrototypeOf($scope)['$onDestroy'] = scopeOnDestroy;
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentAFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1A',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1A', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentAFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentAFacade = _classThis;
                })();
                let Ng1ComponentBFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1B',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1B', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentBFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentBFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<div *ngIf="show"><ng1A></ng1A> | <ng1B></ng1B></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _show_decorators;
                    let _show_initializers = [];
                    let _show_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.show = __runInitializers(this, _show_initializers, false);
                            __runInitializers(this, _show_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _show_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .directive('ng1A', () => ng1DirectiveA)
                    .directive('ng1B', () => ng1DirectiveB)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)('<ng2 [show]="!destroyFromNg2" ng-if="!destroyFromNg1"></ng2>');
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    const $rootScope = adapter.$injector.get('$rootScope');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1A | ng1B');
                    expect(scopeOnDestroy).not.toHaveBeenCalled();
                    $rootScope.$apply('destroyFromNg1 = true');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    expect(scopeOnDestroy).not.toHaveBeenCalled();
                    $rootScope.$apply('destroyFromNg1 = false');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1A | ng1B');
                    expect(scopeOnDestroy).not.toHaveBeenCalled();
                    $rootScope.$apply('destroyFromNg2 = true');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    expect(scopeOnDestroy).not.toHaveBeenCalled();
                });
            }));
            it('should be called in order `$onChanges()` > `$onInit()` > `$doCheck()` > `$postLink()`', (0, testing_1.waitForAsync)(() => {
                // Define `ng1Component`
                const ng1Component = {
                    // `$doCheck()` will keep getting called as long as the interpolated value keeps
                    // changing (by appending `> $doCheck`). Only care about the first 4 values.
                    template: '{{ $ctrl.calls.slice(0, 4).join(" > ") }}',
                    bindings: { value: '<' },
                    controller: class {
                        constructor() {
                            this.calls = [];
                        }
                        $onChanges() {
                            this.calls.push('$onChanges');
                        }
                        $onInit() {
                            this.calls.push('$onInit');
                        }
                        $doCheck() {
                            this.calls.push('$doCheck');
                        }
                        $postLink() {
                            this.calls.push('$postLink');
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    let _value_decorators;
                    let _value_initializers = [];
                    let _value_extraInitializers = [];
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                            this.value = __runInitializers(this, _value_initializers, void 0);
                            __runInitializers(this, _value_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        _value_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 value="foo"></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('$onChanges > $onInit > $doCheck > $postLink');
                });
            }));
        });
        describe('destroying the upgraded component', () => {
            it('should destroy `$componentScope`', (0, testing_1.waitForAsync)(() => {
                const scopeDestroyListener = jasmine.createSpy('scopeDestroyListener');
                let ng2ComponentAInstance;
                // Define `ng1Component`
                const ng1Component = {
                    controller: class {
                        constructor($scope) {
                            $scope.$on('$destroy', scopeDestroyListener);
                        }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: '<ng2B *ngIf="!destroyIt"></ng2B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor() {
                            this.destroyIt = false;
                            ng2ComponentAInstance = this;
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
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect(scopeDestroyListener).not.toHaveBeenCalled();
                    ng2ComponentAInstance.destroyIt = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(scopeDestroyListener).toHaveBeenCalledTimes(1);
                });
            }));
            it('should emit `$destroy` on `$element` and descendants', (0, testing_1.waitForAsync)(() => {
                const elementDestroyListener = jasmine.createSpy('elementDestroyListener');
                const descendantDestroyListener = jasmine.createSpy('descendantDestroyListener');
                let ng2ComponentAInstance;
                // Define `ng1Component`
                const ng1Component = {
                    controller: class {
                        constructor($element) {
                            $element.on('$destroy', elementDestroyListener);
                            $element.contents().on('$destroy', descendantDestroyListener);
                        }
                    },
                    template: '<div></div>',
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: '<ng2B *ngIf="!destroyIt"></ng2B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor() {
                            this.destroyIt = false;
                            ng2ComponentAInstance = this;
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
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect(elementDestroyListener).not.toHaveBeenCalled();
                    expect(descendantDestroyListener).not.toHaveBeenCalled();
                    ng2ComponentAInstance.destroyIt = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(elementDestroyListener).toHaveBeenCalledTimes(1);
                    expect(descendantDestroyListener).toHaveBeenCalledTimes(1);
                });
            }));
            it('should clear data on `$element` and descendants`', (0, testing_1.waitForAsync)(() => {
                let ng1ComponentElement;
                let ng2ComponentAInstance;
                // Define `ng1Component`
                const ng1Component = {
                    controller: class {
                        constructor($element) {
                            $element.data('test', 1);
                            $element.contents().data('test', 2);
                            ng1ComponentElement = $element;
                        }
                    },
                    template: '<div></div>',
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: '<ng2B *ngIf="!destroyIt"></ng2B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor() {
                            this.destroyIt = false;
                            ng2ComponentAInstance = this;
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
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    expect(ng1ComponentElement.data('test')).toBe(1);
                    expect(ng1ComponentElement.contents().data('test')).toBe(2);
                    ng2ComponentAInstance.destroyIt = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect(ng1ComponentElement.data('test')).toBeUndefined();
                    expect(ng1ComponentElement.contents().data('test')).toBeUndefined();
                });
            }));
            it('should clear dom listeners on `$element` and descendants`', (0, testing_1.waitForAsync)(() => {
                const elementClickListener = jasmine.createSpy('elementClickListener');
                const descendantClickListener = jasmine.createSpy('descendantClickListener');
                let ng1DescendantElement;
                let ng2ComponentAInstance;
                // Define `ng1Component`
                const ng1Component = {
                    controller: class {
                        constructor($element) {
                            ng1DescendantElement = $element.contents();
                            $element.on('click', elementClickListener);
                            ng1DescendantElement.on('click', descendantClickListener);
                        }
                    },
                    template: '<div></div>',
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2ComponentA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2A',
                            template: '<ng2B *ngIf="!destroyIt"></ng2B>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2ComponentA = _classThis = class {
                        constructor() {
                            this.destroyIt = false;
                            ng2ComponentAInstance = this;
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
                            template: '<ng1></ng1>',
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    ng1DescendantElement[0].click();
                    expect(elementClickListener).toHaveBeenCalledTimes(1);
                    expect(descendantClickListener).toHaveBeenCalledTimes(1);
                    ng2ComponentAInstance.destroyIt = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    ng1DescendantElement[0].click();
                    expect(elementClickListener).toHaveBeenCalledTimes(1);
                    expect(descendantClickListener).toHaveBeenCalledTimes(1);
                });
            }));
            it('should clean up `$doCheck()` watchers from the parent scope', (0, testing_1.waitForAsync)(() => {
                let ng2Component;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'ng1',
                    controller: class {
                        $doCheck() { }
                    },
                };
                // Define `Ng1ComponentFacade`
                let Ng1ComponentFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'ng1',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 *ngIf="doShow"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Component = _classThis = class {
                        constructor($scope) {
                            this.$scope = $scope;
                            this.doShow = false;
                            ng2Component = this;
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            declarations: [Ng1ComponentFacade, Ng2Component],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                    const getWatcherCount = () => ng2Component.$scope.$$watchers.length;
                    const baseWatcherCount = getWatcherCount();
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    ng2Component.doShow = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1');
                    expect(getWatcherCount()).toBe(baseWatcherCount + 1);
                    ng2Component.doShow = false;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('');
                    expect(getWatcherCount()).toBe(baseWatcherCount);
                    ng2Component.doShow = true;
                    (0, static_test_helpers_1.$digest)(adapter);
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng1');
                    expect(getWatcherCount()).toBe(baseWatcherCount + 1);
                });
            }));
        });
        it('should support ng2 > ng1 > ng2 (no inputs/outputs)', (0, testing_1.waitForAsync)(() => {
            // Define `ng1Component`
            const ng1Component = { template: 'ng1X(<ng2-b></ng2-b>)' };
            // Define `Ng1ComponentFacade`
            let Ng1ComponentFacade = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1X',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = index_1.UpgradeComponent;
                var Ng1ComponentFacade = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1X', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1ComponentFacade");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1ComponentFacade = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1ComponentFacade = _classThis;
            })();
            // Define `Ng2Component`
            let Ng2ComponentA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2-a',
                        template: 'ng2A(<ng1X></ng1X>)',
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
                        selector: 'ng2-b',
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
            // Define `ng1Module`
            const ng1Module = angular
                .module_('ng1', [])
                .component('ng1X', ng1Component)
                .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }))
                .directive('ng2B', (0, index_1.downgradeComponent)({ component: Ng2ComponentB }));
            // Define `Ng2Module`
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng1ComponentFacade, Ng2ComponentA, Ng2ComponentB],
                        imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                        schemas: [core_1.NO_ERRORS_SCHEMA],
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
            // Bootstrap
            const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(ng1X(ng2B))');
            });
        }));
        it('should support ng2 > ng1 > ng2 (with inputs/outputs)', (0, testing_1.fakeAsync)(() => {
            let ng2ComponentAInstance;
            let ng2ComponentBInstance;
            let ng1ControllerXInstance;
            // Define `ng1Component`
            class Ng1ControllerX {
                constructor() {
                    this.ng1XInputA = '';
                    ng1ControllerXInstance = this;
                }
            }
            const ng1Component = {
                template: `
              ng1X({{ $ctrl.ng1XInputA }}, {{ $ctrl.ng1XInputB.value }}, {{ $ctrl.ng1XInputC.value }}) |
              <ng2-b
                [ng2-b-input1]="$ctrl.ng1XInputA"
                [ng2-b-input-c]="$ctrl.ng1XInputC.value"
                (ng2-b-output-c)="$ctrl.ng1XInputC = {value: $event}">
              </ng2-b>
            `,
                bindings: {
                    ng1XInputA: '@',
                    ng1XInputB: '<',
                    ng1XInputC: '=',
                    ng1XOutputA: '&',
                    ng1XOutputB: '&',
                },
                controller: Ng1ControllerX,
            };
            // Define `Ng1ComponentFacade`
            let Ng1ComponentXFacade = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1X',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = index_1.UpgradeComponent;
                let _ng1XInputA_decorators;
                let _ng1XInputA_initializers = [];
                let _ng1XInputA_extraInitializers = [];
                let _ng1XInputB_decorators;
                let _ng1XInputB_initializers = [];
                let _ng1XInputB_extraInitializers = [];
                let _ng1XInputC_decorators;
                let _ng1XInputC_initializers = [];
                let _ng1XInputC_extraInitializers = [];
                let _ng1XInputCChange_decorators;
                let _ng1XInputCChange_initializers = [];
                let _ng1XInputCChange_extraInitializers = [];
                let _ng1XOutputA_decorators;
                let _ng1XOutputA_initializers = [];
                let _ng1XOutputA_extraInitializers = [];
                let _ng1XOutputB_decorators;
                let _ng1XOutputB_initializers = [];
                let _ng1XOutputB_extraInitializers = [];
                var Ng1ComponentXFacade = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1X', elementRef, injector);
                        this.ng1XInputA = __runInitializers(this, _ng1XInputA_initializers, '');
                        this.ng1XInputB = (__runInitializers(this, _ng1XInputA_extraInitializers), __runInitializers(this, _ng1XInputB_initializers, void 0));
                        this.ng1XInputC = (__runInitializers(this, _ng1XInputB_extraInitializers), __runInitializers(this, _ng1XInputC_initializers, void 0));
                        this.ng1XInputCChange = (__runInitializers(this, _ng1XInputC_extraInitializers), __runInitializers(this, _ng1XInputCChange_initializers, new core_1.EventEmitter()));
                        this.ng1XOutputA = (__runInitializers(this, _ng1XInputCChange_extraInitializers), __runInitializers(this, _ng1XOutputA_initializers, new core_1.EventEmitter()));
                        this.ng1XOutputB = (__runInitializers(this, _ng1XOutputA_extraInitializers), __runInitializers(this, _ng1XOutputB_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _ng1XOutputB_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Ng1ComponentXFacade");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    _ng1XInputA_decorators = [(0, core_1.Input)()];
                    _ng1XInputB_decorators = [(0, core_1.Input)()];
                    _ng1XInputC_decorators = [(0, core_1.Input)()];
                    _ng1XInputCChange_decorators = [(0, core_1.Output)()];
                    _ng1XOutputA_decorators = [(0, core_1.Output)()];
                    _ng1XOutputB_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _ng1XInputA_decorators, { kind: "field", name: "ng1XInputA", static: false, private: false, access: { has: obj => "ng1XInputA" in obj, get: obj => obj.ng1XInputA, set: (obj, value) => { obj.ng1XInputA = value; } }, metadata: _metadata }, _ng1XInputA_initializers, _ng1XInputA_extraInitializers);
                    __esDecorate(null, null, _ng1XInputB_decorators, { kind: "field", name: "ng1XInputB", static: false, private: false, access: { has: obj => "ng1XInputB" in obj, get: obj => obj.ng1XInputB, set: (obj, value) => { obj.ng1XInputB = value; } }, metadata: _metadata }, _ng1XInputB_initializers, _ng1XInputB_extraInitializers);
                    __esDecorate(null, null, _ng1XInputC_decorators, { kind: "field", name: "ng1XInputC", static: false, private: false, access: { has: obj => "ng1XInputC" in obj, get: obj => obj.ng1XInputC, set: (obj, value) => { obj.ng1XInputC = value; } }, metadata: _metadata }, _ng1XInputC_initializers, _ng1XInputC_extraInitializers);
                    __esDecorate(null, null, _ng1XInputCChange_decorators, { kind: "field", name: "ng1XInputCChange", static: false, private: false, access: { has: obj => "ng1XInputCChange" in obj, get: obj => obj.ng1XInputCChange, set: (obj, value) => { obj.ng1XInputCChange = value; } }, metadata: _metadata }, _ng1XInputCChange_initializers, _ng1XInputCChange_extraInitializers);
                    __esDecorate(null, null, _ng1XOutputA_decorators, { kind: "field", name: "ng1XOutputA", static: false, private: false, access: { has: obj => "ng1XOutputA" in obj, get: obj => obj.ng1XOutputA, set: (obj, value) => { obj.ng1XOutputA = value; } }, metadata: _metadata }, _ng1XOutputA_initializers, _ng1XOutputA_extraInitializers);
                    __esDecorate(null, null, _ng1XOutputB_decorators, { kind: "field", name: "ng1XOutputB", static: false, private: false, access: { has: obj => "ng1XOutputB" in obj, get: obj => obj.ng1XOutputB, set: (obj, value) => { obj.ng1XOutputB = value; } }, metadata: _metadata }, _ng1XOutputB_initializers, _ng1XOutputB_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1ComponentXFacade = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1ComponentXFacade = _classThis;
            })();
            // Define `Ng2Component`
            let Ng2ComponentA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2-a',
                        template: `
          ng2A({{ ng2ADataA.value }}, {{ ng2ADataB.value }}, {{ ng2ADataC.value }}) |
          <ng1X
            ng1XInputA="{{ ng2ADataA.value }}"
            bind-ng1XInputB="ng2ADataB"
            [(ng1XInputC)]="ng2ADataC"
            (ng1XOutputA)="ng2ADataA = $event"
            on-ng1XOutputB="ng2ADataB.value = $event"
          >
          </ng1X>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Ng2ComponentA = _classThis = class {
                    constructor() {
                        this.ng2ADataA = { value: 'foo' };
                        this.ng2ADataB = { value: 'bar' };
                        this.ng2ADataC = { value: 'baz' };
                        ng2ComponentAInstance = this;
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
                        selector: 'ng2-b',
                        template: 'ng2B({{ ng2BInputA }}, {{ ng2BInputC }})',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _ng2BInputA_decorators;
                let _ng2BInputA_initializers = [];
                let _ng2BInputA_extraInitializers = [];
                let _ng2BInputC_decorators;
                let _ng2BInputC_initializers = [];
                let _ng2BInputC_extraInitializers = [];
                let _ng2BOutputC_decorators;
                let _ng2BOutputC_initializers = [];
                let _ng2BOutputC_extraInitializers = [];
                var Ng2ComponentB = _classThis = class {
                    constructor() {
                        this.ng2BInputA = __runInitializers(this, _ng2BInputA_initializers, void 0);
                        this.ng2BInputC = (__runInitializers(this, _ng2BInputA_extraInitializers), __runInitializers(this, _ng2BInputC_initializers, void 0));
                        this.ng2BOutputC = (__runInitializers(this, _ng2BInputC_extraInitializers), __runInitializers(this, _ng2BOutputC_initializers, new core_1.EventEmitter()));
                        __runInitializers(this, _ng2BOutputC_extraInitializers);
                        ng2ComponentBInstance = this;
                    }
                };
                __setFunctionName(_classThis, "Ng2ComponentB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _ng2BInputA_decorators = [(0, core_1.Input)('ng2BInput1')];
                    _ng2BInputC_decorators = [(0, core_1.Input)()];
                    _ng2BOutputC_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _ng2BInputA_decorators, { kind: "field", name: "ng2BInputA", static: false, private: false, access: { has: obj => "ng2BInputA" in obj, get: obj => obj.ng2BInputA, set: (obj, value) => { obj.ng2BInputA = value; } }, metadata: _metadata }, _ng2BInputA_initializers, _ng2BInputA_extraInitializers);
                    __esDecorate(null, null, _ng2BInputC_decorators, { kind: "field", name: "ng2BInputC", static: false, private: false, access: { has: obj => "ng2BInputC" in obj, get: obj => obj.ng2BInputC, set: (obj, value) => { obj.ng2BInputC = value; } }, metadata: _metadata }, _ng2BInputC_initializers, _ng2BInputC_extraInitializers);
                    __esDecorate(null, null, _ng2BOutputC_decorators, { kind: "field", name: "ng2BOutputC", static: false, private: false, access: { has: obj => "ng2BOutputC" in obj, get: obj => obj.ng2BOutputC, set: (obj, value) => { obj.ng2BOutputC = value; } }, metadata: _metadata }, _ng2BOutputC_initializers, _ng2BOutputC_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng2ComponentB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng2ComponentB = _classThis;
            })();
            // Define `ng1Module`
            const ng1Module = angular
                .module_('ng1', [])
                .component('ng1X', ng1Component)
                .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }))
                .directive('ng2B', (0, index_1.downgradeComponent)({ component: Ng2ComponentB }));
            // Define `Ng2Module`
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng1ComponentXFacade, Ng2ComponentA, Ng2ComponentB],
                        imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                        schemas: [core_1.NO_ERRORS_SCHEMA],
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
            // Bootstrap
            const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then((adapter) => {
                // Initial value propagation.
                // (ng2A > ng1X > ng2B)
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz) | ng1X(foo, bar, baz) | ng2B(foo, baz)');
                // Update `ng2BInputA`/`ng2BInputC`.
                // (Should not propagate upwards.)
                ng2ComponentBInstance.ng2BInputA = 'foo2';
                ng2ComponentBInstance.ng2BInputC = 'baz2';
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz) | ng1X(foo, bar, baz) | ng2B(foo2, baz2)');
                // Emit from `ng2BOutputC`.
                // (Should propagate all the way up to `ng1ADataC` and back all the way down to
                // `ng2BInputC`.)
                ng2ComponentBInstance.ng2BOutputC.emit('baz3');
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz3) | ng1X(foo, bar, baz3) | ng2B(foo2, baz3)');
                // Update `ng1XInputA`/`ng1XInputB`.
                // (Should not propagate upwards, only downwards.)
                ng1ControllerXInstance.ng1XInputA = 'foo4';
                ng1ControllerXInstance.ng1XInputB = { value: 'bar4' };
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz3) | ng1X(foo4, bar4, baz3) | ng2B(foo4, baz3)');
                // Update `ng1XInputC`.
                // (Should propagate upwards and downwards.)
                ng1ControllerXInstance.ng1XInputC = { value: 'baz5' };
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz5) | ng1X(foo4, bar4, baz5) | ng2B(foo4, baz5)');
                // Update a property on `ng1XInputC`.
                // (Should propagate upwards and downwards.)
                ng1ControllerXInstance.ng1XInputC.value = 'baz6';
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo, bar, baz6) | ng1X(foo4, bar4, baz6) | ng2B(foo4, baz6)');
                // Emit from `ng1XOutputA`.
                // (Should propagate upwards to `ng1ADataA` and back all the way down to
                // `ng2BInputA`.)
                ng1ControllerXInstance.ng1XOutputA({ value: 'foo7' });
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo7, bar, baz6) | ng1X(foo7, bar4, baz6) | ng2B(foo7, baz6)');
                // Emit from `ng1XOutputB`.
                // (Should propagate upwards to `ng1ADataB`, but not downwards,
                //  since `ng1XInputB` has been re-assigned (i.e. `ng2ADataB !== ng1XInputB`).)
                ng1ControllerXInstance.ng1XOutputB('bar8');
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo7, bar8, baz6) | ng1X(foo7, bar4, baz6) | ng2B(foo7, baz6)');
                // Update `ng2ADataA`/`ng2ADataB`/`ng2ADataC`.
                // (Should propagate everywhere.)
                ng2ComponentAInstance.ng2ADataA = { value: 'foo9' };
                ng2ComponentAInstance.ng2ADataB = { value: 'bar9' };
                ng2ComponentAInstance.ng2ADataC = { value: 'baz9' };
                (0, static_test_helpers_1.$digest)(adapter);
                (0, testing_1.tick)();
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(foo9, bar9, baz9) | ng1X(foo9, bar9, baz9) | ng2B(foo9, baz9)');
            });
        }));
        it('should support ng2 > ng1 > ng2 > ng1 (with `require`)', (0, testing_1.waitForAsync)(() => {
            // Define `ng1Component`
            const ng1ComponentA = {
                template: 'ng1A(<ng2-b></ng2-b>)',
                controller: class {
                    constructor() {
                        this.value = 'ng1A';
                    }
                },
            };
            const ng1ComponentB = {
                template: 'ng1B(^^ng1A: {{ $ctrl.ng1A.value }} | ?^^ng1B: {{ $ctrl.ng1B.value }} | ^ng1B: {{ $ctrl.ng1BSelf.value }})',
                require: { ng1A: '^^', ng1B: '?^^', ng1BSelf: '^ng1B' },
                controller: class {
                    constructor() {
                        this.value = 'ng1B';
                    }
                },
            };
            // Define `Ng1ComponentFacade`
            let Ng1ComponentAFacade = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1A',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = index_1.UpgradeComponent;
                var Ng1ComponentAFacade = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1A', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1ComponentAFacade");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1ComponentAFacade = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1ComponentAFacade = _classThis;
            })();
            let Ng1ComponentBFacade = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng1B',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = index_1.UpgradeComponent;
                var Ng1ComponentBFacade = _classThis = class extends _classSuper {
                    constructor(elementRef, injector) {
                        super('ng1B', elementRef, injector);
                    }
                };
                __setFunctionName(_classThis, "Ng1ComponentBFacade");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Ng1ComponentBFacade = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Ng1ComponentBFacade = _classThis;
            })();
            // Define `Ng2Component`
            let Ng2ComponentA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng2-a',
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
                        selector: 'ng2-b',
                        template: 'ng2B(<ng1B></ng1B>)',
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
            // Define `ng1Module`
            const ng1Module = angular
                .module_('ng1', [])
                .component('ng1A', ng1ComponentA)
                .component('ng1B', ng1ComponentB)
                .directive('ng2A', (0, index_1.downgradeComponent)({ component: Ng2ComponentA }))
                .directive('ng2B', (0, index_1.downgradeComponent)({ component: Ng2ComponentB }));
            // Define `Ng2Module`
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Ng1ComponentAFacade, Ng1ComponentBFacade, Ng2ComponentA, Ng2ComponentB],
                        imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                        schemas: [core_1.NO_ERRORS_SCHEMA],
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
            // Bootstrap
            const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2A(ng1A(ng2B(ng1B(^^ng1A: ng1A | ?^^ng1B: | ^ng1B: ng1B))))');
            });
        }));
        describe('standalone', () => {
            it('should upgrade to a standalone component in NgModule-bootstrapped application', (0, testing_1.waitForAsync)(() => {
                const ng1Component = { template: `I'm from AngularJS!` };
                // Define `Ng1ComponentFacade` (standalone)
                let Ng1ComponentStandaloneFacade = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ selector: 'ng1', standalone: true })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = index_1.UpgradeComponent;
                    var Ng1ComponentStandaloneFacade = _classThis = class extends _classSuper {
                        constructor(elementRef, injector) {
                            super('ng1', elementRef, injector);
                        }
                    };
                    __setFunctionName(_classThis, "Ng1ComponentStandaloneFacade");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng1ComponentStandaloneFacade = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng1ComponentStandaloneFacade = _classThis;
                })();
                // Define `Ng2Component`
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'ng2', template: '<ng1></ng1>', standalone: false })];
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
                // Define `ng1Module`
                const ng1Module = angular
                    .module_('ng1Module', [])
                    .component('ng1', ng1Component)
                    .directive('ng2', (0, index_1.downgradeComponent)({ component: Ng2Component }));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2Component],
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule, Ng1ComponentStandaloneFacade],
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
                // Bootstrap
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, element, ng1Module).then(() => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe(`I'm from AngularJS!`);
                });
            }));
        });
    });
});
