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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const angular1_1 = require("../../../src/common/src/angular1");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const index_1 = require("../../index");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('UpgradeModule', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        describe('$injector', () => {
            it('should not be set initially', () => __awaiter(void 0, void 0, void 0, function* () {
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                expect(upgrade.$injector).toBeUndefined();
            }));
            it('should be set after calling `.bootstrap()`', () => __awaiter(void 0, void 0, void 0, function* () {
                // Define `ng1Module`.
                const ng1Module = (0, angular1_1.module_)('ng1Module', []).value('foo', 'ng1Foo');
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                // Bootstrap the hybrid app.
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                upgrade.bootstrap(element, [ng1Module.name]);
                expect(upgrade.$injector).toBeDefined();
                expect(upgrade.$injector.get('foo')).toBe('ng1Foo');
            }));
        });
        describe('injector', () => {
            it('should be set initially', () => __awaiter(void 0, void 0, void 0, function* () {
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule, index_1.UpgradeModule],
                            providers: [{ provide: 'foo', useValue: 'ng2Foo' }],
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                expect(upgrade.injector).toBeDefined();
                expect(upgrade.injector.get('foo')).toBe('ng2Foo');
            }));
        });
        describe('ngZone', () => {
            it('should be set initially', () => __awaiter(void 0, void 0, void 0, function* () {
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                expect(upgrade.ngZone).toBeDefined();
                expect(upgrade.ngZone).toBe(appRef.injector.get(core_1.NgZone));
            }));
        });
        describe('bootstrap()', () => {
            it('should call `angular.bootstrap()`', () => __awaiter(void 0, void 0, void 0, function* () {
                // Set up spies.
                const bootstrapSpy = spyOn((0, angular1_1.getAngularJSGlobal)(), 'bootstrap').and.callThrough();
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                // Bootstrap the hybrid app.
                const element = (0, common_test_helpers_1.html)(`<ng2></ng2>`);
                const config = { strictDi: true };
                upgrade.bootstrap(element, [], config);
                expect(bootstrapSpy).toHaveBeenCalledOnceWith(element, jasmine.any(Array), config);
            }));
            it('should forward the return value of `angular.bootstrap()`', () => __awaiter(void 0, void 0, void 0, function* () {
                // Set up spies.
                const bootstrapSpy = spyOn((0, angular1_1.getAngularJSGlobal)(), 'bootstrap').and.callThrough();
                // Define `Ng2Module`.
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
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
                // Bootstrap the ng2 app.
                const appRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(Ng2Module);
                const upgrade = appRef.injector.get(index_1.UpgradeModule);
                // Bootstrap the hybrid app.
                const retValue = upgrade.bootstrap((0, common_test_helpers_1.html)(`<ng2></ng2>`), []);
                expect(retValue).toBe(bootstrapSpy.calls.mostRecent().returnValue);
                expect(retValue).toBe(upgrade.$injector); // In most cases, it will be the ng1 injector.
            }));
        });
    });
});
