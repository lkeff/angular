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
    describe('injection', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        it('should downgrade ng2 service to ng1', (0, testing_1.waitForAsync)(() => {
            // Tokens used in ng2 to identify services
            const Ng2Service = new core_1.InjectionToken('ng2-service');
            // Sample ng1 NgModule for tests
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                        providers: [{ provide: Ng2Service, useValue: 'ng2 service value' }],
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
            // create the ng1 module that will import an ng2 service
            const ng1Module = angular
                .module_('ng1Module', [])
                .factory('ng2Service', (0, index_1.downgradeInjectable)(Ng2Service));
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, (0, common_test_helpers_1.html)('<div>'), ng1Module).then((upgrade) => {
                const ng1Injector = upgrade.$injector;
                expect(ng1Injector.get('ng2Service')).toBe('ng2 service value');
            });
        }));
        it('should upgrade ng1 service to ng2', (0, testing_1.waitForAsync)(() => {
            // Tokens used in ng2 to identify services
            const Ng1Service = new core_1.InjectionToken('ng1-service');
            // Sample ng1 NgModule for tests
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                        providers: [
                            // the following line is the "upgrade" of an AngularJS service
                            {
                                provide: Ng1Service,
                                useFactory: (i) => i.get('ng1Service'),
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
            // create the ng1 module that will import an ng2 service
            const ng1Module = angular.module_('ng1Module', []).value('ng1Service', 'ng1 service value');
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, (0, common_test_helpers_1.html)('<div>'), ng1Module).then((upgrade) => {
                const ng2Injector = upgrade.injector;
                expect(ng2Injector.get(Ng1Service)).toBe('ng1 service value');
            });
        }));
        it('should initialize the upgraded injector before application run blocks are executed', (0, testing_1.waitForAsync)(() => {
            let runBlockTriggered = false;
            const ng1Module = angular.module_('ng1Module', []).run([
                constants_1.INJECTOR_KEY,
                function (injector) {
                    runBlockTriggered = true;
                    expect(injector.get(constants_1.$INJECTOR)).toBeDefined();
                },
            ]);
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule] })];
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
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, (0, common_test_helpers_1.html)('<div>'), ng1Module).then(() => {
                expect(runBlockTriggered).toBeTruthy();
            });
        }));
        it('should allow resetting angular at runtime', (0, testing_1.waitForAsync)(() => {
            let wrappedBootstrapCalled = false;
            const n = (0, index_1.getAngularJSGlobal)();
            (0, index_1.setAngularJSGlobal)({
                bootstrap: (...args) => {
                    wrappedBootstrapCalled = true;
                    n.bootstrap(...args);
                },
                module: n.module,
                element: n.element,
                version: n.version,
                resumeBootstrap: n.resumeBootstrap,
                getTestability: n.getTestability,
            });
            let Ng2Module = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule] })];
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
            const ng1Module = angular.module_('ng1Module', []);
            (0, static_test_helpers_1.bootstrap)((0, platform_browser_dynamic_1.platformBrowserDynamic)(), Ng2Module, (0, common_test_helpers_1.html)('<div>'), ng1Module)
                .then((upgrade) => expect(wrappedBootstrapCalled).toBe(true))
                .then(() => (0, index_1.setAngularJSGlobal)(n)); // Reset the AngularJS global.
        }));
    });
});
