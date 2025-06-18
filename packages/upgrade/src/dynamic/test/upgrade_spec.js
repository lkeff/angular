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
const angular = __importStar(require("../../common/src/angular1"));
const constants_1 = require("../../common/src/constants");
const common_test_helpers_1 = require("../../common/test/helpers/common_test_helpers");
const upgrade_adapter_1 = require("../src/upgrade_adapter");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('adapter: ng1 to ng2', () => {
        beforeEach(() => (0, core_1.destroyPlatform)());
        afterEach(() => (0, core_1.destroyPlatform)());
        describe('(basic use)', () => {
            it('should have AngularJS loaded', () => expect(angular.getAngularJSGlobal().version.major).toBe(1));
            it('should instantiate ng2 in ng1 template and project content', (0, testing_1.waitForAsync)(() => {
                const ng1Module = angular.module_('ng1', []);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `{{ 'NG2' }}(<ng-content></ng-content>)`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const element = (0, common_test_helpers_1.html)("<div>{{ 'ng1[' }}<ng2>~{{ 'ng-content' }}~</ng2>{{ ']' }}</div>");
                const adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(document.body.textContent).toEqual('ng1[NG2(~ng-content~)]');
                    ref.dispose();
                });
            }));
            it('should instantiate ng1 in ng2 template and project content', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `{{ 'ng2(' }}<ng1>{{ 'transclude' }}</ng1
            >{{ ')' }}`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng1', () => {
                    return { transclude: true, template: '{{ "ng1" }}(<ng-transclude></ng-transclude>)' };
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)("<div>{{'ng1('}}<ng2></ng2>{{')'}}</div>");
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(document.body.textContent).toEqual('ng1(ng2(ng1(transclude)))');
                    ref.dispose();
                });
            }));
            it('should support the compilerOptions argument', (0, testing_1.waitForAsync)(() => {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                spyOn(platformRef, 'bootstrapModule').and.callThrough();
                spyOn(platformRef, 'bootstrapModuleFactory').and.callThrough();
                const ng1Module = angular.module_('ng1', []);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `{{ 'NG2' }}(<ng-content></ng-content>)`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                const element = (0, common_test_helpers_1.html)("<div>{{ 'ng1[' }}<ng2>~{{ 'ng-content' }}~</ng2>{{ ']' }}</div>");
                let Ng2AppModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2AppModule = _classThis = class {
                        ngDoBootstrap() { }
                    };
                    __setFunctionName(_classThis, "Ng2AppModule");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2AppModule = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2AppModule = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2AppModule, { providers: [] });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(platformRef.bootstrapModule).toHaveBeenCalledWith(jasmine.any(Function), [
                        { providers: [] },
                        jasmine.any(Object),
                    ]);
                    expect(platformRef.bootstrapModuleFactory).toHaveBeenCalledWith(jasmine.any(core_1.NgModuleFactory), jasmine.objectContaining({ ngZone: jasmine.any(core_1.NgZone), providers: [] }));
                    ref.dispose();
                });
            }));
            it('should destroy the AngularJS app when `PlatformRef` is destroyed', (0, testing_1.waitForAsync)(() => {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
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
                ng1Module.component('ng1', { template: '<ng2></ng2>' });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                const element = (0, common_test_helpers_1.html)('<div><ng1></ng1></div>');
                adapter.bootstrap(element, [ng1Module.name]).ready((ref) => {
                    const $rootScope = ref.ng1Injector.get(constants_1.$ROOT_SCOPE);
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
                    platformRef.destroy();
                    // Verify `$rootScope` has been destroyed and data has been cleaned up.
                    expect(rootScopeDestroySpy).toHaveBeenCalled();
                    expect(appElem.data('testData')).toBeUndefined();
                    expect(ng1Elem.data('testData')).toBeUndefined();
                    expect(ng2Elem.data('testData')).toBeUndefined();
                    expect(ng2ChildElem.data('testData')).toBeUndefined();
                });
            }));
        });
        describe('bootstrap errors', () => {
            let adapter;
            let zone;
            beforeEach(() => {
                angular.module_('ng1', []);
                let ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `<BAD TEMPLATE div></div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ng2Component = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                zone = testing_1.TestBed.inject(core_1.NgZone);
                adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
            });
            it('should throw an uncaught error', (0, testing_1.fakeAsync)(() => {
                const resolveSpy = jasmine.createSpy('resolveSpy');
                spyOn(console, 'error');
                expect(() => {
                    // Needs to be run inside the `NgZone` in order
                    // for the promises to be flushed correctly.
                    zone.run(() => {
                        adapter.bootstrap((0, common_test_helpers_1.html)('<ng2></ng2>'), ['ng1']).ready(resolveSpy);
                        (0, testing_1.flushMicrotasks)();
                    });
                }).toThrowError();
                expect(resolveSpy).not.toHaveBeenCalled();
            }));
            it('should output an error message to the console and re-throw', (0, testing_1.fakeAsync)(() => {
                const consoleErrorSpy = spyOn(console, 'error');
                expect(() => {
                    // Needs to be run inside the `NgZone` in order
                    // for the promises to be flushed correctly.
                    zone.run(() => {
                        adapter.bootstrap((0, common_test_helpers_1.html)('<ng2></ng2>'), ['ng1']);
                        (0, testing_1.flushMicrotasks)();
                    });
                }).toThrowError();
                const args = consoleErrorSpy.calls.mostRecent().args;
                expect(consoleErrorSpy).toHaveBeenCalled();
                expect(args.length).toBeGreaterThan(0);
                expect(args[0]).toEqual(jasmine.any(Error));
            }));
        });
        describe('change-detection', () => {
            it('should not break if a $digest is already in progress', (0, testing_1.waitForAsync)(() => {
                let AppComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AppComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "AppComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        AppComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return AppComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [AppComponent], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const ng1Module = angular.module_('ng1', []);
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const element = (0, common_test_helpers_1.html)('<my-app></my-app>');
                adapter.bootstrap(element, [ng1Module.name]).ready((ref) => {
                    const $rootScope = ref.ng1RootScope;
                    const ngZone = ref.ng2ModuleRef.injector.get(core_1.NgZone);
                    const digestSpy = spyOn($rootScope, '$digest').and.callThrough();
                    // Step 1: Ensure `$digest` is run on `onMicrotaskEmpty`.
                    ngZone.onMicrotaskEmpty.emit(null);
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                    digestSpy.calls.reset();
                    // Step 2: Cause the issue.
                    $rootScope.$apply(() => ngZone.onMicrotaskEmpty.emit(null));
                    // With the fix, `$digest` will only be run once (for `$apply()`).
                    // Without the fix, `$digest()` would have been run an extra time (`onMicrotaskEmpty`).
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                    digestSpy.calls.reset();
                    // Step 3: Ensure that `$digest()` is still executed on `onMicrotaskEmpty`.
                    ngZone.onMicrotaskEmpty.emit(null);
                    expect(digestSpy).toHaveBeenCalledTimes(1);
                });
            }));
            it('should interleave scope and component expressions', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const log = [];
                const l = (value) => {
                    log.push(value);
                    return value + ';';
                };
                ng1Module.directive('ng1a', () => ({ template: "{{ l('ng1a') }}" }));
                ng1Module.directive('ng1b', () => ({ template: "{{ l('ng1b') }}" }));
                ng1Module.run(($rootScope) => {
                    $rootScope.l = l;
                    $rootScope.reset = () => (log.length = 0);
                });
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `{{ l('2A') }}<ng1a></ng1a>{{ l('2B') }}<ng1b></ng1b>{{ l('2C') }}`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.l = l;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [
                                adapter.upgradeNg1Component('ng1a'),
                                adapter.upgradeNg1Component('ng1b'),
                                Ng2,
                            ],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)("<div>{{reset(); l('1A');}}<ng2>{{l('1B')}}</ng2>{{l('1C')}}</div>");
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(document.body.textContent).toEqual('1A;2A;ng1a;2B;ng1b;2C;1C;');
                    // https://github.com/angular/angular.js/issues/12983
                    expect(log).toEqual(['1A', '1C', '2A', '2B', '2C', 'ng1a', 'ng1b']);
                    ref.dispose();
                });
            }));
            it('should propagate changes to a downgraded component inside the ngZone', (0, testing_1.waitForAsync)(() => {
                let appComponent;
                let upgradeRef;
                let AppComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: '<my-child [value]="value"></my-child>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AppComponent = _classThis = class {
                        constructor() {
                            appComponent = this;
                        }
                    };
                    __setFunctionName(_classThis, "AppComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        AppComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return AppComponent = _classThis;
                })();
                let ChildComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-child',
                            template: '<div>{{valueFromPromise}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _instanceExtraInitializers = [];
                    let _set_value_decorators;
                    var ChildComponent = _classThis = class {
                        set value(v) {
                            expect(core_1.NgZone.isInAngularZone()).toBe(true);
                        }
                        constructor(zone) {
                            this.zone = (__runInitializers(this, _instanceExtraInitializers), zone);
                        }
                        ngOnChanges(changes) {
                            if (changes['value'].isFirstChange())
                                return;
                            this.zone.onMicrotaskEmpty.subscribe(() => {
                                expect(element.textContent).toEqual('5');
                                upgradeRef.dispose();
                            });
                            queueMicrotask(() => (this.valueFromPromise = changes['value'].currentValue));
                        }
                    };
                    __setFunctionName(_classThis, "ChildComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _set_value_decorators = [(0, core_1.Input)()];
                        __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ChildComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ChildComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [AppComponent, ChildComponent], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('myApp', adapter.downgradeNg2Component(AppComponent));
                const element = (0, common_test_helpers_1.html)('<my-app></my-app>');
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    upgradeRef = ref;
                    appComponent.value = 5;
                });
            }));
            // This test demonstrates https://github.com/angular/angular/issues/6385
            // which was invalidly fixed by https://github.com/angular/angular/pull/6386
            // it('should not trigger $digest from an async operation in a watcher', async(() => {
            //      @Component({selector: 'my-app', template: ''})
            //      class AppComponent {
            //      }
            //      @NgModule({declarations: [AppComponent], imports: [BrowserModule]})
            //      class Ng2Module {
            //      }
            //      const adapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => Ng2Module));
            //      const ng1Module = angular.module_('ng1', []).directive(
            //          'myApp', adapter.downgradeNg2Component(AppComponent));
            //      const element = html('<my-app></my-app>');
            //      adapter.bootstrap(element, ['ng1']).ready((ref) => {
            //        let doTimeout = false;
            //        let timeoutId: number;
            //        ref.ng1RootScope.$watch(() => {
            //          if (doTimeout && !timeoutId) {
            //            timeoutId = window.setTimeout(function() {
            //              timeoutId = null;
            //            }, 10);
            //          }
            //        });
            //        doTimeout = true;
            //      });
            //    }));
        });
        describe('downgrade ng2 component', () => {
            it('should allow non-element selectors for downgraded components', (0, testing_1.waitForAsync)(() => {
                let WorksComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: '[itWorks]',
                            template: 'It works',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var WorksComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "WorksComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        WorksComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return WorksComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [WorksComponent], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.directive('ng2', adapter.downgradeNg2Component(WorksComponent));
                const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('It works');
                });
            }));
            it('should bind properties, events', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []).value(constants_1.$EXCEPTION_HANDLER, (err) => {
                    throw err;
                });
                ng1Module.run(($rootScope) => {
                    $rootScope.name = 'world';
                    $rootScope.dataA = 'A';
                    $rootScope.dataB = 'B';
                    $rootScope.modelA = 'initModelA';
                    $rootScope.modelB = 'initModelB';
                    $rootScope.eventA = '?';
                    $rootScope.eventB = '?';
                });
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            inputs: ['literal', 'interpolate', 'oneWayA', 'oneWayB', 'twoWayA', 'twoWayB'],
                            outputs: [
                                'eventA',
                                'eventB',
                                'twoWayAEmitter: twoWayAChange',
                                'twoWayBEmitter: twoWayBChange',
                            ],
                            template: 'ignore: {{ignore}}; ' +
                                'literal: {{literal}}; interpolate: {{interpolate}}; ' +
                                'oneWayA: {{oneWayA}}; oneWayB: {{oneWayB}}; ' +
                                'twoWayA: {{twoWayA}}; twoWayB: {{twoWayB}}; ({{ngOnChangesCount}})',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.ngOnChangesCount = 0;
                            this.ignore = '-';
                            this.literal = '?';
                            this.interpolate = '?';
                            this.oneWayA = '?';
                            this.oneWayB = '?';
                            this.twoWayA = '?';
                            this.twoWayB = '?';
                            this.eventA = new core_1.EventEmitter();
                            this.eventB = new core_1.EventEmitter();
                            this.twoWayAEmitter = new core_1.EventEmitter();
                            this.twoWayBEmitter = new core_1.EventEmitter();
                        }
                        ngOnChanges(changes) {
                            const assert = (prop, value) => {
                                if (this[prop] != value) {
                                    throw new Error(`Expected: '${prop}' to be '${value}' but was '${this[prop]}'`);
                                }
                            };
                            const assertChange = (prop, value) => {
                                assert(prop, value);
                                if (!changes[prop]) {
                                    throw new Error(`Changes record for '${prop}' not found.`);
                                }
                                const actValue = changes[prop].currentValue;
                                if (actValue != value) {
                                    throw new Error(`Expected changes record for'${prop}' to be '${value}' but was '${actValue}'`);
                                }
                            };
                            switch (this.ngOnChangesCount++) {
                                case 0:
                                    assert('ignore', '-');
                                    assertChange('literal', 'Text');
                                    assertChange('interpolate', 'Hello world');
                                    assertChange('oneWayA', 'A');
                                    assertChange('oneWayB', 'B');
                                    assertChange('twoWayA', 'initModelA');
                                    assertChange('twoWayB', 'initModelB');
                                    this.twoWayAEmitter.emit('newA');
                                    this.twoWayBEmitter.emit('newB');
                                    this.eventA.emit('aFired');
                                    this.eventB.emit('bFired');
                                    break;
                                case 1:
                                    assertChange('twoWayA', 'newA');
                                    assertChange('twoWayB', 'newB');
                                    break;
                                case 2:
                                    assertChange('interpolate', 'Hello everyone');
                                    break;
                                default:
                                    throw new Error('Called too many times! ' + JSON.stringify(changes));
                            }
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const element = (0, common_test_helpers_1.html)(`<div>
              <ng2 literal="Text" interpolate="Hello {{name}}"
                   bind-one-way-a="dataA" [one-way-b]="dataB"
                   bindon-two-way-a="modelA" [(two-way-b)]="modelB"
                   on-event-a='eventA=$event' (event-b)="eventB=$event"></ng2>
              | modelA: {{modelA}}; modelB: {{modelB}}; eventA: {{eventA}}; eventB: {{eventB}};
              </div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ignore: -; ' +
                        'literal: Text; interpolate: Hello world; ' +
                        'oneWayA: A; oneWayB: B; twoWayA: newA; twoWayB: newB; (2) | ' +
                        'modelA: newA; modelB: newB; eventA: aFired; eventB: bFired;');
                    ref.ng1RootScope.$apply('name = "everyone"');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ignore: -; ' +
                        'literal: Text; interpolate: Hello everyone; ' +
                        'oneWayA: A; oneWayB: B; twoWayA: newA; twoWayB: newB; (3) | ' +
                        'modelA: newA; modelB: newB; eventA: aFired; eventB: bFired;');
                    ref.dispose();
                });
            }));
            it('should support two-way binding and event listener', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const listenerSpy = jasmine.createSpy('$rootScope.listener');
                const ng1Module = angular.module_('ng1', []).run(($rootScope) => {
                    $rootScope['value'] = 'world';
                    $rootScope['listener'] = listenerSpy;
                });
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: `model: {{ model }};`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _model_decorators;
                    let _model_initializers = [];
                    let _model_extraInitializers = [];
                    let _modelChange_decorators;
                    let _modelChange_initializers = [];
                    let _modelChange_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        ngOnChanges(changes) {
                            switch (this.ngOnChangesCount++) {
                                case 0:
                                    expect(changes['model'].currentValue).toBe('world');
                                    this.modelChange.emit('newC');
                                    break;
                                case 1:
                                    expect(changes['model'].currentValue).toBe('newC');
                                    break;
                                default:
                                    throw new Error('Called too many times! ' + JSON.stringify(changes));
                            }
                        }
                        constructor() {
                            this.ngOnChangesCount = 0;
                            this.model = __runInitializers(this, _model_initializers, '?');
                            this.modelChange = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _modelChange_initializers, new core_1.EventEmitter()));
                            __runInitializers(this, _modelChange_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _model_decorators = [(0, core_1.Input)()];
                        _modelChange_decorators = [(0, core_1.Output)()];
                        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
                        __esDecorate(null, null, _modelChange_decorators, { kind: "field", name: "modelChange", static: false, private: false, access: { has: obj => "modelChange" in obj, get: obj => obj.modelChange, set: (obj, value) => { obj.modelChange = value; } }, metadata: _metadata }, _modelChange_initializers, _modelChange_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Component], imports: [platform_browser_1.BrowserModule] })];
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
                const element = (0, common_test_helpers_1.html)(`
           <div>
             <ng2 [(model)]="value" (model-change)="listener($event)"></ng2>
             | value: {{value}}
           </div>
         `);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toEqual('model: newC; | value: newC');
                    expect(listenerSpy).toHaveBeenCalledWith('newC');
                    ref.dispose();
                });
            }));
            it('should initialize inputs in time for `ngOnChanges`', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: ` ngOnChangesCount: {{ ngOnChangesCount }} | firstChangesCount:
            {{ firstChangesCount }} | initialValue: {{ initialValue }}`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foo_decorators;
                    let _foo_initializers = [];
                    let _foo_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.ngOnChangesCount = 0;
                            this.firstChangesCount = 0;
                            this.foo = __runInitializers(this, _foo_initializers, '');
                            this.initialValue = (__runInitializers(this, _foo_extraInitializers), this.foo);
                        }
                        ngOnChanges(changes) {
                            this.ngOnChangesCount++;
                            if (this.ngOnChangesCount === 1) {
                                this.initialValue = this.foo;
                            }
                            if (changes['foo'] && changes['foo'].isFirstChange()) {
                                this.firstChangesCount++;
                            }
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [Ng2Component] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                const element = (0, common_test_helpers_1.html)(`
             <ng2 [foo]="'foo'"></ng2>
             <ng2 foo="bar"></ng2>
             <ng2 [foo]="'baz'" ng-if="true"></ng2>
             <ng2 foo="qux" ng-if="true"></ng2>
           `);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    const nodes = element.querySelectorAll('ng2');
                    const expectedTextWith = (value) => `ngOnChangesCount: 1 | firstChangesCount: 1 | initialValue: ${value}`;
                    expect((0, common_test_helpers_1.multiTrim)(nodes[0].textContent)).toBe(expectedTextWith('foo'));
                    expect((0, common_test_helpers_1.multiTrim)(nodes[1].textContent)).toBe(expectedTextWith('bar'));
                    expect((0, common_test_helpers_1.multiTrim)(nodes[2].textContent)).toBe(expectedTextWith('baz'));
                    expect((0, common_test_helpers_1.multiTrim)(nodes[3].textContent)).toBe(expectedTextWith('qux'));
                    ref.dispose();
                });
            }));
            it('should bind to ng-model', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.run(($rootScope) => {
                    $rootScope.modelA = 'A';
                });
                let ng2Instance;
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '{{_value}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this._value = '';
                            this._onChangeCallback = () => { };
                            this._onTouchedCallback = () => { };
                            ng2Instance = this;
                        }
                        writeValue(value) {
                            this._value = value;
                        }
                        registerOnChange(fn) {
                            this._onChangeCallback = fn;
                        }
                        registerOnTouched(fn) {
                            this._onTouchedCallback = fn;
                        }
                        doTouch() {
                            this._onTouchedCallback();
                        }
                        doChange(newValue) {
                            this._value = newValue;
                            this._onChangeCallback(newValue);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2 ng-model="modelA"></ng2> | {{modelA}}</div>`);
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2],
                            imports: [platform_browser_1.BrowserModule],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    let $rootScope = ref.ng1RootScope;
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('A | A');
                    $rootScope.modelA = 'B';
                    $rootScope.$apply();
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('B | B');
                    ng2Instance.doChange('C');
                    expect($rootScope.modelA).toBe('C');
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('C | C');
                    const downgradedElement = document.body.querySelector('ng2');
                    expect(downgradedElement.classList.contains('ng-touched')).toBe(false);
                    ng2Instance.doTouch();
                    $rootScope.$apply();
                    expect(downgradedElement.classList.contains('ng-touched')).toBe(true);
                    ref.dispose();
                });
            }));
            it('should properly run cleanup when ng1 directive is destroyed', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                let ng2ComponentDestroyed = false;
                ng1Module.directive('ng1', () => ({
                    template: '<div ng-if="!destroyIt"><ng2></ng2></div>',
                }));
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ul><li>test1</li><li>test2</li></ul>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        ngOnDestroy() {
                            ng2ComponentDestroyed = true;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)('<ng1></ng1>');
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    const ng2Element = angular.element(element.querySelector('ng2'));
                    const ng2Descendants = Array.from(element.querySelectorAll('ng2 li')).map(angular.element);
                    let ng2ElementDestroyed = false;
                    let ng2DescendantsDestroyed = ng2Descendants.map(() => false);
                    ng2Element.data('test', 42);
                    ng2Descendants.forEach((elem, i) => elem.data('test', i));
                    ng2Element.on('$destroy', () => (ng2ElementDestroyed = true));
                    ng2Descendants.forEach((elem, i) => elem.on('$destroy', () => (ng2DescendantsDestroyed[i] = true)));
                    expect(element.textContent).toBe('test1test2');
                    expect(ng2Element.data('test')).toBe(42);
                    ng2Descendants.forEach((elem, i) => expect(elem.data('test')).toBe(i));
                    expect(ng2ElementDestroyed).toBe(false);
                    expect(ng2DescendantsDestroyed).toEqual([false, false]);
                    expect(ng2ComponentDestroyed).toBe(false);
                    ref.ng1RootScope.$apply('destroyIt = true');
                    expect(element.textContent).toBe('');
                    expect(ng2Element.data('test')).toBeUndefined();
                    ng2Descendants.forEach((elem) => expect(elem.data('test')).toBeUndefined());
                    expect(ng2ElementDestroyed).toBe(true);
                    expect(ng2DescendantsDestroyed).toEqual([true, true]);
                    expect(ng2ComponentDestroyed).toBe(true);
                    ref.dispose();
                });
            }));
            it('should properly run cleanup with multiple levels of nesting', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                let destroyed = false;
                let Ng2OuterComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2-outer',
                            template: '<div *ngIf="!destroyIt"><ng1></ng1></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _destroyIt_decorators;
                    let _destroyIt_initializers = [];
                    let _destroyIt_extraInitializers = [];
                    var Ng2OuterComponent = _classThis = class {
                        constructor() {
                            this.destroyIt = __runInitializers(this, _destroyIt_initializers, false);
                            __runInitializers(this, _destroyIt_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2OuterComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _destroyIt_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _destroyIt_decorators, { kind: "field", name: "destroyIt", static: false, private: false, access: { has: obj => "destroyIt" in obj, get: obj => obj.destroyIt, set: (obj, value) => { obj.destroyIt = value; } }, metadata: _metadata }, _destroyIt_initializers, _destroyIt_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2OuterComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2OuterComponent = _classThis;
                })();
                let Ng2InnerComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2-inner',
                            template: 'test',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2InnerComponent = _classThis = class {
                        ngOnDestroy() {
                            destroyed = true;
                        }
                    };
                    __setFunctionName(_classThis, "Ng2InnerComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2InnerComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2InnerComponent = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            imports: [platform_browser_1.BrowserModule],
                            declarations: [Ng2InnerComponent, Ng2OuterComponent, adapter.upgradeNg1Component('ng1')],
                            schemas: [core_1.NO_ERRORS_SCHEMA],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng1', () => ({ template: '<ng2-inner></ng2-inner>' }))
                    .directive('ng2Inner', adapter.downgradeNg2Component(Ng2InnerComponent))
                    .directive('ng2Outer', adapter.downgradeNg2Component(Ng2OuterComponent));
                const element = (0, common_test_helpers_1.html)('<ng2-outer [destroy-it]="destroyIt"></ng2-outer>');
                adapter.bootstrap(element, [ng1Module.name]).ready((ref) => {
                    expect(element.textContent).toBe('test');
                    expect(destroyed).toBe(false);
                    $apply(ref, 'destroyIt = true');
                    expect(element.textContent).toBe('');
                    expect(destroyed).toBe(true);
                });
            }));
            it('should fallback to the root ng2.injector when compiled outside the dom', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.directive('ng1', [
                    '$compile',
                    ($compile) => {
                        return {
                            link: function ($scope, $element, $attrs) {
                                const compiled = $compile('<ng2></ng2>');
                                const template = compiled($scope);
                                $element.append(template);
                            },
                        };
                    },
                ]);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'test',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)('<ng1></ng1>');
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('test');
                    ref.dispose();
                });
            }));
            it('should support multi-slot projection', (0, testing_1.waitForAsync)(() => {
                const ng1Module = angular.module_('ng1', []);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '2a(<ng-content select=".ng1a"></ng-content>)' +
                                '2b(<ng-content select=".ng1b"></ng-content>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                // The ng-if on one of the projected children is here to make sure
                // the correct slot is targeted even with structural directives in play.
                const element = (0, common_test_helpers_1.html)('<ng2><div ng-if="true" class="ng1a">1a</div><div' + ' class="ng1b">1b</div></ng2>');
                const adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(document.body.textContent).toEqual('2a(1a)2b(1b)');
                    ref.dispose();
                });
            }));
            it('should correctly project structural directives', (0, testing_1.waitForAsync)(() => {
                let Ng2Component = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'ng2-{{ itemId }}(<ng-content></ng-content>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _itemId_decorators;
                    let _itemId_initializers = [];
                    let _itemId_extraInitializers = [];
                    var Ng2Component = _classThis = class {
                        constructor() {
                            this.itemId = __runInitializers(this, _itemId_initializers, '');
                            __runInitializers(this, _itemId_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Ng2Component");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _itemId_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _itemId_decorators, { kind: "field", name: "itemId", static: false, private: false, access: { has: obj => "itemId" in obj, get: obj => obj.itemId, set: (obj, value) => { obj.itemId = value; } }, metadata: _metadata }, _itemId_initializers, _itemId_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Component = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Component = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [Ng2Component] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
                const ng1Module = angular
                    .module_('ng1', [])
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component))
                    .run(($rootScope) => {
                    $rootScope['items'] = [
                        { id: 'a', subitems: [1, 2, 3] },
                        { id: 'b', subitems: [4, 5, 6] },
                        { id: 'c', subitems: [7, 8, 9] },
                    ];
                });
                const element = (0, common_test_helpers_1.html)(`
             <ng2 ng-repeat="item in items" [item-id]="item.id">
               <div ng-repeat="subitem in item.subitems">{{ subitem }}</div>
             </ng2>
           `);
                adapter.bootstrap(element, [ng1Module.name]).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toBe('ng2-a( 123 )ng2-b( 456 )ng2-c( 789 )');
                    ref.dispose();
                });
            }));
            it('should allow attribute selectors for components in ng2', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => MyNg2Module));
                const ng1Module = angular.module_('myExample', []);
                let WorksComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: '[works]',
                            template: 'works!',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var WorksComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "WorksComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        WorksComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return WorksComponent = _classThis;
                })();
                let RootComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'root-component',
                            template: 'It <div works></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var RootComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "RootComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        RootComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return RootComponent = _classThis;
                })();
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: [RootComponent, WorksComponent] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                ng1Module.directive('rootComponent', adapter.downgradeNg2Component(RootComponent));
                document.body.innerHTML = '<root-component></root-component>';
                adapter.bootstrap(document.body.firstElementChild, ['myExample']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('It works!');
                    ref.dispose();
                });
            }));
        });
        describe('upgrade ng1 component', () => {
            it('should support `@` bindings', (0, testing_1.fakeAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA }}, {{ $ctrl.inputB }}',
                    bindings: { inputA: '@inputAttrA', inputB: '@' },
                };
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
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = angular.element(ng1).controller('ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = 'baz';
                    ng1Controller.inputB = 'qux';
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: foo, bar');
                    ng2ComponentInstance.dataA = 'foo2';
                    ng2ComponentInstance.dataB = 'bar2';
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                    ref.dispose();
                });
            }));
            it('should support `<` bindings', (0, testing_1.fakeAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA.value }}, {{ $ctrl.inputB.value }}',
                    bindings: { inputA: '<inputAttrA', inputB: '<' },
                };
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
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = angular.element(ng1).controller('ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = { value: 'baz' };
                    ng1Controller.inputB = { value: 'qux' };
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: foo, bar');
                    ng2ComponentInstance.dataA = { value: 'foo2' };
                    ng2ComponentInstance.dataB = { value: 'bar2' };
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                    ref.dispose();
                });
            }));
            it('should support `=` bindings', (0, testing_1.fakeAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                let ng2ComponentInstance;
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: {{ $ctrl.inputA.value }}, {{ $ctrl.inputB.value }}',
                    bindings: { inputA: '=inputAttrA', inputB: '=' },
                };
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
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = angular.element(ng1).controller('ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo, bar | Outside: foo, bar');
                    ng1Controller.inputA = { value: 'baz' };
                    ng1Controller.inputB = { value: 'qux' };
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: baz, qux | Outside: baz, qux');
                    ng2ComponentInstance.dataA = { value: 'foo2' };
                    ng2ComponentInstance.dataB = { value: 'bar2' };
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: foo2, bar2 | Outside: foo2, bar2');
                    ref.dispose();
                });
            }));
            it('should support `&` bindings', (0, testing_1.fakeAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                // Define `ng1Component`
                const ng1Component = {
                    template: 'Inside: -',
                    bindings: { outputA: '&outputAttrA', outputB: '&' },
                };
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
                    .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                // Define `Ng2Module`
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                    const ng1 = element.querySelector('ng1');
                    const ng1Controller = angular.element(ng1).controller('ng1');
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: - | Outside: foo, bar');
                    ng1Controller.outputA('baz');
                    ng1Controller.outputB('qux');
                    $digest(ref);
                    expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('Inside: - | Outside: baz, qux');
                    ref.dispose();
                });
            }));
            it('should bind properties, events', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        template: 'Hello {{fullName}}; A: {{modelA}}; B: {{modelB}}; C: {{modelC}}; | ',
                        scope: { fullName: '@', modelA: '=dataA', modelB: '=dataB', modelC: '=', event: '&' },
                        link: function (scope) {
                            scope.$watch('modelB', (v) => {
                                if (v == 'Savkin') {
                                    scope.modelB = 'SAVKIN';
                                    scope.event('WORKS');
                                    // Should not update because [model-a] is uni directional
                                    scope.modelA = 'VICTOR';
                                }
                            });
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 fullName="{{last}}, {{first}}, {{city}}" [dataA]="first" [(dataB)]="last" [modelC]="city" ' +
                                '(event)="event=$event"></ng1>' +
                                '<ng1 fullName="{{\'TEST\'}}" dataA="First" dataB="Last" modelC="City"></ng1>' +
                                '{{event}}-{{last}}, {{first}}, {{city}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.first = 'Victor';
                            this.last = 'Savkin';
                            this.city = 'SF';
                            this.event = '?';
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(() => {
                        expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('Hello SAVKIN, Victor, SF; A: VICTOR; B: SAVKIN; C: SF; | Hello TEST; A: First; B: Last; C: City; | WORKS-SAVKIN, Victor, SF');
                        ref.dispose();
                    }, 0);
                });
            }));
            it('should bind optional properties', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        template: 'Hello; A: {{modelA}}; B: {{modelB}}; | ',
                        scope: { modelA: '=?dataA', modelB: '=?' },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 [dataA]="first" [modelB]="last"></ng1>' +
                                '<ng1 dataA="First" modelB="Last"></ng1>' +
                                '<ng1></ng1>' +
                                '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.first = 'Victor';
                            this.last = 'Savkin';
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(() => {
                        expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('Hello; A: Victor; B: Savkin; | Hello; A: First; B: Last; | Hello; A: ; B: ; | Hello; A: ; B: ; |');
                        ref.dispose();
                    }, 0);
                });
            }));
            it('should bind properties, events in controller when bindToController is not used', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        restrict: 'E',
                        template: '{{someText}} - Length: {{data.length}}',
                        scope: { data: '=' },
                        controller: function ($scope) {
                            $scope.someText = 'ng1 - Data: ' + $scope.data;
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '{{someText}} - Length: {{dataList.length}} | <ng1 [(data)]="dataList"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.dataList = [1, 2, 3];
                            this.someText = 'ng2';
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(() => {
                        expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ng2 - Length: 3 | ng1 - Data: 1,2,3 - Length: 3');
                        ref.dispose();
                    }, 0);
                });
            }));
            it('should bind properties, events in link function', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        restrict: 'E',
                        template: '{{someText}} - Length: {{data.length}}',
                        scope: { data: '=' },
                        link: function ($scope) {
                            $scope.someText = 'ng1 - Data: ' + $scope.data;
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '{{someText}} - Length: {{dataList.length}} | <ng1 [(data)]="dataList"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.dataList = [1, 2, 3];
                            this.someText = 'ng2';
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(() => {
                        expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ng2 - Length: 3 | ng1 - Data: 1,2,3 - Length: 3');
                        ref.dispose();
                    }, 0);
                });
            }));
            it('should support templateUrl fetched from $httpBackend', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.value('$httpBackend', (method, url, post, cbFn) => {
                    cbFn(200, `${method}:${url}`);
                });
                const ng1 = () => {
                    return { templateUrl: 'url.html' };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('GET:url.html');
                    ref.dispose();
                });
            }));
            it('should support templateUrl as a function', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.value('$httpBackend', (method, url, post, cbFn) => {
                    cbFn(200, `${method}:${url}`);
                });
                const ng1 = () => {
                    return {
                        templateUrl() {
                            return 'url.html';
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('GET:url.html');
                    ref.dispose();
                });
            }));
            it('should support empty template', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return { template: '' };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('');
                    ref.dispose();
                });
            }));
            it('should support template as a function', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        template() {
                            return '';
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('');
                    ref.dispose();
                });
            }));
            it('should support templateUrl fetched from $templateCache', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                ng1Module.run(($templateCache) => $templateCache.put('url.html', 'WORKS'));
                const ng1 = () => {
                    return { templateUrl: 'url.html' };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                });
            }));
            it('should support controller with controllerAs', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        scope: true,
                        template: '{{ctl.scope}}; {{ctl.isClass}}; {{ctl.hasElement}}; {{ctl.isPublished()}}',
                        controllerAs: 'ctl',
                        controller: class {
                            constructor($scope, $element) {
                                this.verifyIAmAClass();
                                this.scope = $scope.$parent.$parent == $scope.$root ? 'scope' : 'wrong-scope';
                                this.hasElement = $element[0].nodeName;
                                this.$element = $element;
                            }
                            verifyIAmAClass() {
                                this.isClass = 'isClass';
                            }
                            isPublished() {
                                return this.$element.controller('ng1') == this ? 'published' : 'not-published';
                            }
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('scope; isClass; NG1; published');
                    ref.dispose();
                });
            }));
            it('should support bindToController', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{ctl.title}}',
                        controllerAs: 'ctl',
                        controller: class {
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 title="WORKS"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                });
            }));
            it('should support bindToController with bindings', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = () => {
                    return {
                        scope: {},
                        bindToController: { title: '@' },
                        template: '{{ctl.title}}',
                        controllerAs: 'ctl',
                        controller: class {
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 title="WORKS"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                });
            }));
            it('should support single require in linking fn', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = ($rootScope) => {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{ctl.status}}',
                        require: 'ng1',
                        controllerAs: 'ctrl',
                        controller: class {
                            constructor() {
                                this.status = 'WORKS';
                            }
                        },
                        link: function (scope, element, attrs, linkController) {
                            expect(scope.$root).toEqual($rootScope);
                            expect(element[0].nodeName).toEqual('NG1');
                            expect(linkController.status).toEqual('WORKS');
                            scope.ctl = linkController;
                        },
                    };
                };
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                });
            }));
            it('should support array require in linking fn', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const parent = () => {
                    return {
                        controller: class {
                            constructor() {
                                this.parent = 'PARENT';
                            }
                        },
                    };
                };
                const ng1 = () => {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{parent.parent}}:{{ng1.status}}',
                        require: ['ng1', '^parent', '?^^notFound'],
                        controllerAs: 'ctrl',
                        controller: class {
                            constructor() {
                                this.status = 'WORKS';
                            }
                        },
                        link: function (scope, element, attrs, linkControllers) {
                            expect(linkControllers[0].status).toEqual('WORKS');
                            expect(linkControllers[1].parent).toEqual('PARENT');
                            expect(linkControllers[2]).toBe(undefined);
                            scope.ng1 = linkControllers[0];
                            scope.parent = linkControllers[1];
                        },
                    };
                };
                ng1Module.directive('parent', parent);
                ng1Module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><parent><ng2></ng2></parent></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('PARENT:WORKS');
                    ref.dispose();
                });
            }));
            describe('with life-cycle hooks', () => {
                it('should call `$onInit()` on controller', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $onInitSpyA = jasmine.createSpy('$onInitA');
                    const $onInitSpyB = jasmine.createSpy('$onInitB');
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: class {
                            $onInit() {
                                $onInitSpyA();
                            }
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function () {
                            this.$onInit = $onInitSpyB;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        expect($onInitSpyA).toHaveBeenCalled();
                        expect($onInitSpyB).toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should not call `$onInit()` on scope', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $onInitSpy = jasmine.createSpy('$onInit');
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            Object.getPrototypeOf($scope).$onInit = $onInitSpy;
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            $scope['$onInit'] = $onInitSpy;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        expect($onInitSpy).not.toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should call `$doCheck()` on controller', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $doCheckSpyA = jasmine.createSpy('$doCheckA');
                    const $doCheckSpyB = jasmine.createSpy('$doCheckB');
                    let changeDetector;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor(cd) {
                                changeDetector = cd;
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: class {
                            $doCheck() {
                                $doCheckSpyA();
                            }
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function () {
                            this.$doCheck = $doCheckSpyB;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        expect($doCheckSpyA).toHaveBeenCalled();
                        expect($doCheckSpyB).toHaveBeenCalled();
                        $doCheckSpyA.calls.reset();
                        $doCheckSpyB.calls.reset();
                        changeDetector.detectChanges();
                        expect($doCheckSpyA).toHaveBeenCalled();
                        expect($doCheckSpyB).toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should not call `$doCheck()` on scope', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $doCheckSpyA = jasmine.createSpy('$doCheckA');
                    const $doCheckSpyB = jasmine.createSpy('$doCheckB');
                    let changeDetector;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor(cd) {
                                changeDetector = cd;
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            Object.getPrototypeOf($scope).$doCheck = $doCheckSpyA;
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            $scope['$doCheck'] = $doCheckSpyB;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        $doCheckSpyA.calls.reset();
                        $doCheckSpyB.calls.reset();
                        changeDetector.detectChanges();
                        expect($doCheckSpyA).not.toHaveBeenCalled();
                        expect($doCheckSpyB).not.toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should call `$postLink()` on controller', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $postLinkSpyA = jasmine.createSpy('$postLinkA');
                    const $postLinkSpyB = jasmine.createSpy('$postLinkB');
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: class {
                            $postLink() {
                                $postLinkSpyA();
                            }
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function () {
                            this.$postLink = $postLinkSpyB;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        expect($postLinkSpyA).toHaveBeenCalled();
                        expect($postLinkSpyB).toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should not call `$postLink()` on scope', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $postLinkSpy = jasmine.createSpy('$postLink');
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a> | <ng1-b></ng1-b>',
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            Object.getPrototypeOf($scope).$postLink = $postLinkSpy;
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            $scope['$postLink'] = $postLinkSpy;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        expect($postLinkSpy).not.toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should call `$onChanges()` on binding destination', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $onChangesControllerSpyA = jasmine.createSpy('$onChangesControllerA');
                    const $onChangesControllerSpyB = jasmine.createSpy('$onChangesControllerB');
                    const $onChangesScopeSpy = jasmine.createSpy('$onChangesScope');
                    let ng2Instance;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a [valA]="val"></ng1-a> | <ng1-b [valB]="val"></ng1-b>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor() {
                                ng2Instance = this;
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
                    angular
                        .module_('ng1', [])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: { valA: '<' },
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            this.$onChanges = $onChangesControllerSpyA;
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: { valB: '<' },
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: class {
                            $onChanges(changes) {
                                $onChangesControllerSpyB(changes);
                            }
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component))
                        .run(($rootScope) => {
                        Object.getPrototypeOf($rootScope).$onChanges = $onChangesScopeSpy;
                    });
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        // Initial `$onChanges()` call
                        (0, testing_1.tick)();
                        expect($onChangesControllerSpyA.calls.count()).toBe(1);
                        expect($onChangesControllerSpyA.calls.argsFor(0)[0]).toEqual({
                            valA: jasmine.any(core_1.SimpleChange),
                        });
                        expect($onChangesControllerSpyB).not.toHaveBeenCalled();
                        expect($onChangesScopeSpy.calls.count()).toBe(1);
                        expect($onChangesScopeSpy.calls.argsFor(0)[0]).toEqual({
                            valB: jasmine.any(core_1.SimpleChange),
                        });
                        $onChangesControllerSpyA.calls.reset();
                        $onChangesControllerSpyB.calls.reset();
                        $onChangesScopeSpy.calls.reset();
                        // `$onChanges()` call after a change
                        ng2Instance.val = 'new value';
                        (0, testing_1.tick)();
                        ref.ng1RootScope.$digest();
                        expect($onChangesControllerSpyA.calls.count()).toBe(1);
                        expect($onChangesControllerSpyA.calls.argsFor(0)[0]).toEqual({
                            valA: jasmine.objectContaining({ currentValue: 'new value' }),
                        });
                        expect($onChangesControllerSpyB).not.toHaveBeenCalled();
                        expect($onChangesScopeSpy.calls.count()).toBe(1);
                        expect($onChangesScopeSpy.calls.argsFor(0)[0]).toEqual({
                            valB: jasmine.objectContaining({ currentValue: 'new value' }),
                        });
                        ref.dispose();
                    });
                }));
                it('should call `$onDestroy()` on controller', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $onDestroySpyA = jasmine.createSpy('$onDestroyA');
                    const $onDestroySpyB = jasmine.createSpy('$onDestroyB');
                    let ng2ComponentInstance;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: ` <div *ngIf="!ng2Destroy"><ng1-a></ng1-a> | <ng1-b></ng1-b></div> `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor() {
                                this.ng2Destroy = false;
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
                    // On browsers that don't support `requestAnimationFrame` (Android <= 4.3),
                    // `$animate` will use `setTimeout(..., 16.6)` instead. This timeout will still be
                    // on
                    // the queue at the end of the test, causing it to fail.
                    // Mocking animations (via `ngAnimateMock`) avoids the issue.
                    angular
                        .module_('ng1', ['ngAnimateMock'])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: class {
                            $onDestroy() {
                                $onDestroySpyA();
                            }
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function () {
                            this.$onDestroy = $onDestroySpyB;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div ng-if="!ng1Destroy"><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        $rootScope.ng1Destroy = false;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect($onDestroySpyA).not.toHaveBeenCalled();
                        expect($onDestroySpyB).not.toHaveBeenCalled();
                        $rootScope.ng1Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect($onDestroySpyA).toHaveBeenCalled();
                        expect($onDestroySpyB).toHaveBeenCalled();
                        $onDestroySpyA.calls.reset();
                        $onDestroySpyB.calls.reset();
                        $rootScope.ng1Destroy = false;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect($onDestroySpyA).not.toHaveBeenCalled();
                        expect($onDestroySpyB).not.toHaveBeenCalled();
                        ng2ComponentInstance.ng2Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect($onDestroySpyA).toHaveBeenCalled();
                        expect($onDestroySpyB).toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
                it('should not call `$onDestroy()` on scope', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const $onDestroySpy = jasmine.createSpy('$onDestroy');
                    let ng2ComponentInstance;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: ` <div *ngIf="!ng2Destroy"><ng1-a></ng1-a> | <ng1-b></ng1-b></div> `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor() {
                                this.ng2Destroy = false;
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
                    // On browsers that don't support `requestAnimationFrame` (Android <= 4.3),
                    // `$animate` will use `setTimeout(..., 16.6)` instead. This timeout will still be
                    // on
                    // the queue at the end of the test, causing it to fail.
                    // Mocking animations (via `ngAnimateMock`) avoids the issue.
                    angular
                        .module_('ng1', ['ngAnimateMock'])
                        .directive('ng1A', () => ({
                        template: '',
                        scope: {},
                        bindToController: true,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            Object.getPrototypeOf($scope).$onDestroy = $onDestroySpy;
                        },
                    }))
                        .directive('ng1B', () => ({
                        template: '',
                        scope: {},
                        bindToController: false,
                        controllerAs: '$ctrl',
                        controller: function ($scope) {
                            $scope['$onDestroy'] = $onDestroySpy;
                        },
                    }))
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [
                                    adapter.upgradeNg1Component('ng1A'),
                                    adapter.upgradeNg1Component('ng1B'),
                                    Ng2Component,
                                ],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)(`<div ng-if="!ng1Destroy"><ng2></ng2></div>`);
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        $rootScope.ng1Destroy = false;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        $rootScope.ng1Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        $rootScope.ng1Destroy = false;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        ng2ComponentInstance.ng2Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect($onDestroySpy).not.toHaveBeenCalled();
                        ref.dispose();
                    });
                }));
            });
            describe('destroying the upgraded component', () => {
                it('should destroy `componentScope`', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const scopeDestroyListener = jasmine.createSpy('scopeDestroyListener');
                    let ng2ComponentInstance;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<div *ngIf="!ng2Destroy"><ng1></ng1></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor() {
                                this.ng2Destroy = false;
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
                    // On browsers that don't support `requestAnimationFrame` (Android <= 4.3),
                    // `$animate` will use `setTimeout(..., 16.6)` instead. This timeout will still be
                    // on
                    // the queue at the end of the test, causing it to fail.
                    // Mocking animations (via `ngAnimateMock`) avoids the issue.
                    angular
                        .module_('ng1', ['ngAnimateMock'])
                        .component('ng1', {
                        controller: function ($scope) {
                            $scope.$on('$destroy', scopeDestroyListener);
                        },
                    })
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        expect(scopeDestroyListener).not.toHaveBeenCalled();
                        ng2ComponentInstance.ng2Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect(scopeDestroyListener).toHaveBeenCalledTimes(1);
                    });
                }));
                it('should emit `$destroy` on `$element` and descendants', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const elementDestroyListener = jasmine.createSpy('elementDestroyListener');
                    const descendantDestroyListener = jasmine.createSpy('descendantDestroyListener');
                    let ng2ComponentInstance;
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<div *ngIf="!ng2Destroy"><ng1></ng1></div>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Component = _classThis = class {
                            constructor() {
                                this.ng2Destroy = false;
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
                    // On browsers that don't support `requestAnimationFrame` (Android <= 4.3),
                    // `$animate` will use `setTimeout(..., 16.6)` instead. This timeout will still be
                    // on the queue at the end of the test, causing it to fail.
                    // Mocking animations (via `ngAnimateMock`) avoids the issue.
                    angular
                        .module_('ng1', ['ngAnimateMock'])
                        .component('ng1', {
                        controller: class {
                            constructor($element) {
                                this.$element = $element;
                            }
                            $onInit() {
                                this.$element.on('$destroy', elementDestroyListener);
                                this.$element.contents().on('$destroy', descendantDestroyListener);
                            }
                        },
                        template: '<div></div>',
                    })
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                imports: [platform_browser_1.BrowserModule],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    const element = (0, common_test_helpers_1.html)('<ng2></ng2>');
                    adapter.bootstrap(element, ['ng1']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect(elementDestroyListener).not.toHaveBeenCalled();
                        expect(descendantDestroyListener).not.toHaveBeenCalled();
                        ng2ComponentInstance.ng2Destroy = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect(elementDestroyListener).toHaveBeenCalledTimes(1);
                        expect(descendantDestroyListener).toHaveBeenCalledTimes(1);
                    });
                }));
                it('should clear data on `$element` and descendants', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    let ng1ComponentElement;
                    let ng2ComponentAInstance;
                    // Define `ng1Component`
                    const ng1Component = {
                        controller: class {
                            constructor($element) {
                                this.$element = $element;
                            }
                            $onInit() {
                                this.$element.data('test', 1);
                                this.$element.contents().data('test', 2);
                                ng1ComponentElement = this.$element;
                            }
                        },
                        template: '<div></div>',
                    };
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
                    angular
                        .module_('ng1Module', [])
                        .component('ng1', ng1Component)
                        .directive('ng2A', adapter.downgradeNg2Component(Ng2ComponentA));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2ComponentA, Ng2ComponentB],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect(ng1ComponentElement.data('test')).toBe(1);
                        expect(ng1ComponentElement.contents().data('test')).toBe(2);
                        ng2ComponentAInstance.destroyIt = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        expect(ng1ComponentElement.data('test')).toBeUndefined();
                        expect(ng1ComponentElement.contents().data('test')).toBeUndefined();
                    });
                }));
                it('should clear dom listeners on `$element` and descendants`', (0, testing_1.fakeAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const elementClickListener = jasmine.createSpy('elementClickListener');
                    const descendantClickListener = jasmine.createSpy('descendantClickListener');
                    let ng1DescendantElement;
                    let ng2ComponentAInstance;
                    // Define `ng1Component`
                    const ng1Component = {
                        controller: class {
                            constructor($element) {
                                this.$element = $element;
                            }
                            $onInit() {
                                ng1DescendantElement = this.$element.contents();
                                this.$element.on('click', elementClickListener);
                                ng1DescendantElement.on('click', descendantClickListener);
                            }
                        },
                        template: '<div></div>',
                    };
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
                    angular
                        .module_('ng1Module', [])
                        .component('ng1', ng1Component)
                        .directive('ng2A', adapter.downgradeNg2Component(Ng2ComponentA));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2ComponentA, Ng2ComponentB],
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
                    // Bootstrap
                    const element = (0, common_test_helpers_1.html)(`<ng2-a></ng2-a>`);
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        const $rootScope = ref.ng1RootScope;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        ng1DescendantElement[0].click();
                        expect(elementClickListener).toHaveBeenCalledTimes(1);
                        expect(descendantClickListener).toHaveBeenCalledTimes(1);
                        ng2ComponentAInstance.destroyIt = true;
                        (0, testing_1.tick)();
                        $rootScope.$digest();
                        ng1DescendantElement[0].click();
                        expect(elementClickListener).toHaveBeenCalledTimes(1);
                        expect(descendantClickListener).toHaveBeenCalledTimes(1);
                    });
                }));
            });
            describe('linking', () => {
                it('should run the pre-linking after instantiating the controller', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1']).ready(() => {
                        setTimeout(() => expect(log).toEqual(['ng1-ctrl', 'ng1-pre']), 1000);
                    });
                }));
                it('should run the pre-linking function before linking', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const log = [];
                    // Define `ng1Directive`
                    const ng1DirectiveA = {
                        template: '<ng1-b></ng1-b>',
                        link: { pre: () => log.push('ng1A-pre') },
                    };
                    const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a>',
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1A'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1']).ready(() => {
                        expect(log).toEqual(['ng1A-pre', 'ng1B-post']);
                    });
                }));
                it('should run the post-linking function after linking (link: object)', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const log = [];
                    // Define `ng1Directive`
                    const ng1DirectiveA = {
                        template: '<ng1-b></ng1-b>',
                        link: { post: () => log.push('ng1A-post') },
                    };
                    const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a>',
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1A'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1']).ready(() => {
                        expect(log).toEqual(['ng1B-post', 'ng1A-post']);
                    });
                }));
                it('should run the post-linking function after linking (link: function)', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    const log = [];
                    // Define `ng1Directive`
                    const ng1DirectiveA = {
                        template: '<ng1-b></ng1-b>',
                        link: () => log.push('ng1A-post'),
                    };
                    const ng1DirectiveB = { link: () => log.push('ng1B-post') };
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: '<ng1-a></ng1-a>',
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1A'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1']).ready(() => {
                        expect(log).toEqual(['ng1B-post', 'ng1A-post']);
                    });
                }));
                it('should run the post-linking function before `$postLink`', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1']).ready(() => {
                        expect(log).toEqual(['ng1-post', 'ng1-$post']);
                    });
                }));
            });
            describe('transclusion', () => {
                it('should support single-slot transclusion', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    let ng2ComponentAInstance;
                    let ng2ComponentBInstance;
                    // Define `ng1Component`
                    const ng1Component = {
                        template: 'ng1(<div ng-transclude></div>)',
                        transclude: true,
                    };
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
                        .directive('ng2A', adapter.downgradeNg2Component(Ng2ComponentA));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2ComponentA, Ng2ComponentB],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(foo | ))');
                        ng2ComponentAInstance.value = 'baz';
                        ng2ComponentAInstance.showB = true;
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(baz | ng2B(bar)))');
                        ng2ComponentBInstance.value = 'qux';
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent)).toBe('ng2A(ng1(baz | ng2B(qux)))');
                    });
                }));
                it('should support single-slot transclusion with fallback content', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
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
                    // Define `Ng2Component`
                    let Ng2Component = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'ng2',
                                template: ` ng2(
              <ng1
                ><div>{{ value }}</div></ng1
              >
              |

              <!-- Interpolation-only content should still be detected as transcluded content. -->
              <ng1>{{ value }}</ng1> |

              <ng1></ng1>
              )`,
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(from-ng2)|ng1(from-ng2)|ng1(from-ng1))');
                        ng1ControllerInstances.forEach((ctrl) => (ctrl.value = 'ng1-foo'));
                        ng2ComponentInstance.value = 'ng2-bar';
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(ng2-bar)|ng1(ng2-bar)|ng1(ng1-foo))');
                    });
                }));
                it('should support multi-slot transclusion', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    let ng2ComponentInstance;
                    // Define `ng1Component`
                    const ng1Component = {
                        template: 'ng1(x(<div ng-transclude="slotX"></div>) | y(<div ng-transclude="slotY"></div>))',
                        transclude: { slotX: 'contentX', slotY: 'contentY' },
                    };
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(foo1foo2)|y(bar1bar2)))');
                        ng2ComponentInstance.x = 'baz';
                        ng2ComponentInstance.y = 'qux';
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz1baz2)|y(qux1qux2)))');
                    });
                }));
                it('should support default slot (with fallback content)', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
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
              <ng1><content-x>ignored x</content-x><content-y>ignored y</content-y></ng1> |

              <!--
                    Interpolation-only content should still be detected as transcluded content.
                  -->
              <ng1
                >{{ x }}<content-x>ignored x</content-x>{{ y + x }}<content-y>ignored y</content-y
                >{{ y }}</ng1
              >
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(default((foo)foo-bar(bar)))|ng1(default(fallback-ng1))|ng1(default(foobarfoobar)))');
                        ng1ControllerInstances.forEach((ctrl) => (ctrl.value = 'ng1-plus'));
                        ng2ComponentInstance.x = 'baz';
                        ng2ComponentInstance.y = 'qux';
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(default((baz)baz-qux(qux)))|ng1(default(fallback-ng1-plus))|ng1(default(bazquxbazqux)))');
                    });
                }));
                it('should support optional transclusion slots (with fallback content)', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(ng2X)|y(ng1Y))|ng1(x(ng1X)|y(ng2Y)))');
                        ng1ControllerInstances.forEach((ctrl) => {
                            ctrl.x = 'ng1X-foo';
                            ctrl.y = 'ng1Y-bar';
                        });
                        ng2ComponentInstance.x = 'ng2X-baz';
                        ng2ComponentInstance.y = 'ng2Y-qux';
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(ng2X-baz)|y(ng1Y-bar))|ng1(x(ng1X-foo)|y(ng2Y-qux)))');
                    });
                }));
                it('should throw if a non-optional slot is not filled', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    let errorMessage;
                    // Define `ng1Component`
                    const ng1Component = {
                        template: '',
                        transclude: { slotX: '?contentX', slotY: 'contentY' },
                    };
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect(errorMessage).toContain("Required transclusion slot 'slotY' on directive: ng1");
                    });
                }));
                it('should support structural directives in transcluded content', (0, testing_1.waitForAsync)(() => {
                    const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                    let ng2ComponentInstance;
                    // Define `ng1Component`
                    const ng1Component = {
                        template: 'ng1(x(<div ng-transclude="slotX"></div>) | default(<div ng-transclude=""></div>))',
                        transclude: { slotX: 'contentX' },
                    };
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
                        .directive('ng2', adapter.downgradeNg2Component(Ng2Component));
                    // Define `Ng2Module`
                    let Ng2Module = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                imports: [platform_browser_1.BrowserModule],
                                declarations: [adapter.upgradeNg1Component('ng1'), Ng2Component],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var Ng2Module = _classThis = class {
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
                    adapter.bootstrap(element, ['ng1Module']).ready((ref) => {
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(foo1)|default(bar2)))');
                        ng2ComponentInstance.x = 'baz';
                        ng2ComponentInstance.y = 'qux';
                        ng2ComponentInstance.show = false;
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz2)|default(qux1)))');
                        ng2ComponentInstance.show = true;
                        $digest(ref);
                        expect((0, common_test_helpers_1.multiTrim)(element.textContent, true)).toBe('ng2(ng1(x(baz1)|default(qux2)))');
                    });
                }));
            });
            it('should bind input properties (<) of components', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = {
                    bindings: { personProfile: '<' },
                    template: 'Hello {{$ctrl.personProfile.firstName}} {{$ctrl.personProfile.lastName}}',
                    controller: class {
                    },
                };
                ng1Module.component('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: '<ng1 [personProfile]="goku"></ng1>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                        constructor() {
                            this.goku = { firstName: 'GOKU', lastName: 'SAN' };
                        }
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                const element = (0, common_test_helpers_1.html)(`<div><ng2></ng2></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual(`Hello GOKU SAN`);
                    ref.dispose();
                });
            }));
            it('should support ng2 > ng1 > ng2', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const ng1Module = angular.module_('ng1', []);
                const ng1 = {
                    template: 'ng1(<ng2b></ng2b>)',
                };
                ng1Module.component('ng1', ng1);
                let Ng2a = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2a',
                            template: 'ng2a(<ng1></ng1>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2a = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2a");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2a = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2a = _classThis;
                })();
                ng1Module.directive('ng2a', adapter.downgradeNg2Component(Ng2a));
                let Ng2b = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2b',
                            template: 'ng2b',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2b = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2b");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2b = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2b = _classThis;
                })();
                ng1Module.directive('ng2b', adapter.downgradeNg2Component(Ng2b));
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2a, Ng2b],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const element = (0, common_test_helpers_1.html)(`<div><ng2a></ng2a></div>`);
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ng2a(ng1(ng2b))');
                });
            }));
        });
        describe('injection', () => {
            function SomeToken() { }
            it('should export ng2 instance to ng1', (0, testing_1.waitForAsync)(() => {
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            providers: [{ provide: SomeToken, useValue: 'correct_value' }],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(MyNg2Module);
                const module = angular.module_('myExample', []);
                module.factory('someToken', adapter.downgradeNg2Provider(SomeToken));
                adapter.bootstrap((0, common_test_helpers_1.html)('<div>'), ['myExample']).ready((ref) => {
                    expect(ref.ng1Injector.get('someToken')).toBe('correct_value');
                    ref.dispose();
                });
            }));
            it('should export ng1 instance to ng2', (0, testing_1.waitForAsync)(() => {
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(MyNg2Module);
                const module = angular.module_('myExample', []);
                module.value('testValue', 'secreteToken');
                adapter.upgradeNg1Provider('testValue');
                adapter.upgradeNg1Provider('testValue', { asToken: 'testToken' });
                adapter.upgradeNg1Provider('testValue', { asToken: String });
                adapter.bootstrap((0, common_test_helpers_1.html)('<div>'), ['myExample']).ready((ref) => {
                    expect(ref.ng2Injector.get('testValue')).toBe('secreteToken');
                    expect(ref.ng2Injector.get(String)).toBe('secreteToken');
                    expect(ref.ng2Injector.get('testToken')).toBe('secreteToken');
                    ref.dispose();
                });
            }));
            it('should respect hierarchical dependency injection for ng2', (0, testing_1.waitForAsync)(() => {
                const ng1Module = angular.module_('ng1', []);
                let Ng2Parent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2-parent',
                            template: `ng2-parent(<ng-content></ng-content>)`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Parent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2Parent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Parent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Parent = _classThis;
                })();
                let Ng2Child = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2-child',
                            template: `ng2-child`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Child = _classThis = class {
                        constructor(parent) { }
                    };
                    __setFunctionName(_classThis, "Ng2Child");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2Child = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2Child = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2Parent, Ng2Child], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const element = (0, common_test_helpers_1.html)('<ng2-parent><ng2-child></ng2-child></ng2-parent>');
                const adapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
                ng1Module
                    .directive('ng2Parent', adapter.downgradeNg2Component(Ng2Parent))
                    .directive('ng2Child', adapter.downgradeNg2Component(Ng2Child));
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(document.body.textContent).toEqual('ng2-parent(ng2-child)');
                    ref.dispose();
                });
            }));
        });
        describe('testability', () => {
            it('should handle deferred bootstrap', (0, testing_1.waitForAsync)(() => {
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(MyNg2Module);
                angular.module_('ng1', []);
                let bootstrapResumed = false;
                const element = (0, common_test_helpers_1.html)('<div></div>');
                window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    expect(bootstrapResumed).toEqual(true);
                    ref.dispose();
                });
                setTimeout(() => {
                    bootstrapResumed = true;
                    window.angular.resumeBootstrap();
                }, 100);
            }));
            it('should propagate return value of resumeBootstrap', (0, testing_1.fakeAsync)(() => {
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(MyNg2Module);
                const ng1Module = angular.module_('ng1', []);
                let a1Injector;
                ng1Module.run([
                    '$injector',
                    function ($injector) {
                        a1Injector = $injector;
                    },
                ]);
                const element = (0, common_test_helpers_1.html)('<div></div>');
                window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
                adapter.bootstrap(element, [ng1Module.name]).ready((ref) => {
                    ref.dispose();
                });
                (0, testing_1.tick)(100);
                const value = window.angular.resumeBootstrap();
                expect(value).toBe(a1Injector);
            }));
            it('should wait for ng2 testability', (0, testing_1.waitForAsync)(() => {
                let MyNg2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyNg2Module = _classThis = class {
                    };
                    __setFunctionName(_classThis, "MyNg2Module");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyNg2Module = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyNg2Module = _classThis;
                })();
                const adapter = new upgrade_adapter_1.UpgradeAdapter(MyNg2Module);
                angular.module_('ng1', []);
                const element = (0, common_test_helpers_1.html)('<div></div>');
                adapter.bootstrap(element, ['ng1']).ready((ref) => {
                    const zone = ref.ng2Injector.get(core_1.NgZone);
                    let ng2Stable = false;
                    zone.run(() => {
                        setTimeout(() => {
                            ng2Stable = true;
                        }, 100);
                    });
                    angular.getTestability(element).whenStable(() => {
                        expect(ng2Stable).toEqual(true);
                        ref.dispose();
                    });
                });
            }));
        });
        describe('examples', () => {
            it('should verify UpgradeAdapter example', (0, testing_1.waitForAsync)(() => {
                const adapter = new upgrade_adapter_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2Module));
                const module = angular.module_('myExample', []);
                const ng1 = () => {
                    return {
                        scope: { title: '=' },
                        transclude: true,
                        template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)',
                    };
                };
                module.directive('ng1', ng1);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            inputs: ['name'],
                            template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [adapter.upgradeNg1Component('ng1'), Ng2],
                            imports: [platform_browser_1.BrowserModule],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                document.body.innerHTML = '<ng2 name="World">project</ng2>';
                adapter.bootstrap(document.body.firstElementChild, ['myExample']).ready((ref) => {
                    expect((0, common_test_helpers_1.multiTrim)(document.body.textContent)).toEqual('ng2[ng1[Hello World!](transclude)](project)');
                    ref.dispose();
                });
            }));
        });
        describe('registerForNg1Tests', () => {
            let upgradeAdapterRef;
            let $compile;
            let $rootScope;
            beforeEach(() => {
                const ng1Module = angular.module_('ng1', []);
                let Ng2 = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'ng2',
                            template: 'Hello World',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2 = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Ng2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Ng2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Ng2 = _classThis;
                })();
                let Ng2Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({ declarations: [Ng2], imports: [platform_browser_1.BrowserModule] })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Ng2Module = _classThis = class {
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
                const upgradeAdapter = new upgrade_adapter_1.UpgradeAdapter(Ng2Module);
                ng1Module.directive('ng2', upgradeAdapter.downgradeNg2Component(Ng2));
                upgradeAdapterRef = upgradeAdapter.registerForNg1Tests(['ng1']);
            });
            beforeEach(() => {
                inject((_$compile_, _$rootScope_) => {
                    $compile = _$compile_;
                    $rootScope = _$rootScope_;
                });
            });
            it('should be able to test ng1 components that use ng2 components', (0, testing_1.waitForAsync)(() => {
                upgradeAdapterRef.ready(() => {
                    const element = $compile('<ng2></ng2>')($rootScope);
                    $rootScope.$digest();
                    expect(element[0].textContent).toContain('Hello World');
                });
            }));
        });
    });
});
function $apply(adapter, exp) {
    const $rootScope = adapter.ng1Injector.get(constants_1.$ROOT_SCOPE);
    $rootScope.$apply(exp);
}
function $digest(adapter) {
    const $rootScope = adapter.ng1Injector.get(constants_1.$ROOT_SCOPE);
    $rootScope.$digest();
}
