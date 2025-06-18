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
exports.MultipleSelectorsAppModule = exports.MultipleSelectorsAppComponent = exports.IdSelectorAppModule = exports.IdSelectorAppComponent = void 0;
const core_1 = require("../../src/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const testing_1 = require("@angular/private/testing");
describe('bootstrap', () => {
    beforeEach(core_1.destroyPlatform);
    afterEach(core_1.destroyPlatform);
    it('should bootstrap using #id selector', (0, testing_1.withBody)('<div>before|</div><button id="my-app"></button>', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(IdSelectorAppModule);
            expect(document.body.textContent).toEqual('before|works!');
            ngModuleRef.destroy();
        }
        catch (err) {
            console.error(err);
        }
    })));
    it('should bootstrap using one of selectors from the list', (0, testing_1.withBody)('<div>before|</div><div class="bar"></div>', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(MultipleSelectorsAppModule);
            expect(document.body.textContent).toEqual('before|works!');
            ngModuleRef.destroy();
        }
        catch (err) {
            console.error(err);
        }
    })));
    it('should allow injecting VCRef into the root (bootstrapped) component', (0, testing_1.withBody)('before|<test-cmp></test-cmp>|after', () => __awaiter(void 0, void 0, void 0, function* () {
        let DynamicCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'dynamic-cmp', template: 'dynamic' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "DynamicCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicCmp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'test-cmp', template: '(test)' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(vcRef) {
                    this.vcRef = vcRef;
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
        expect(document.body.textContent).toEqual('before||after');
        const appRef = yield (0, platform_browser_1.bootstrapApplication)(TestCmp);
        expect(document.body.textContent).toEqual('before|(test)|after');
        appRef.components[0].instance.vcRef.createComponent(DynamicCmp);
        expect(document.body.textContent).toEqual('before|(test)dynamic|after');
        appRef.destroy();
        expect(document.body.textContent).toEqual('before||after');
    })));
    describe('options', () => {
        function createComponentAndModule(options = {}) {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: options.selector || 'my-app',
                        // styles must be non-empty to trigger `ViewEncapsulation.Emulated`
                        styles: 'span {color:red}',
                        template: '<span>a    b</span>',
                        encapsulation: options.encapsulation,
                        preserveWhitespaces: options.preserveWhitespaces,
                        jit: true,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule],
                        declarations: [TestComponent],
                        bootstrap: [TestComponent],
                        jit: true,
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
            return TestModule;
        }
        it('should use ViewEncapsulation.Emulated as default', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
            expect(document.body.innerHTML).toContain('<span _ngcontent-');
            ngModuleRef.destroy();
        })));
        it('should allow setting defaultEncapsulation using bootstrap option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule, {
                defaultEncapsulation: core_1.ViewEncapsulation.None,
            });
            expect(document.body.innerHTML).toContain('<span>');
            expect(document.body.innerHTML).not.toContain('_ngcontent-');
            ngModuleRef.destroy();
        })));
        it('should allow setting defaultEncapsulation using compiler option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([
                {
                    provide: core_1.COMPILER_OPTIONS,
                    useValue: { defaultEncapsulation: core_1.ViewEncapsulation.None },
                    multi: true,
                },
            ]).bootstrapModule(TestModule);
            expect(document.body.innerHTML).toContain('<span>');
            expect(document.body.innerHTML).not.toContain('_ngcontent-');
            ngModuleRef.destroy();
        })));
        it('should prefer encapsulation on component over bootstrap option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule({ encapsulation: core_1.ViewEncapsulation.Emulated });
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule, {
                defaultEncapsulation: core_1.ViewEncapsulation.None,
            });
            expect(document.body.innerHTML).toContain('<span _ngcontent-');
            ngModuleRef.destroy();
        })));
        it('should use preserveWhitespaces: false as default', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
            expect(document.body.innerHTML).toContain('a b');
            ngModuleRef.destroy();
        })));
        it('should allow setting preserveWhitespaces using bootstrap option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule, {
                preserveWhitespaces: true,
            });
            expect(document.body.innerHTML).toContain('a    b');
            ngModuleRef.destroy();
        })));
        it('should allow setting preserveWhitespaces using compiler option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([
                { provide: core_1.COMPILER_OPTIONS, useValue: { preserveWhitespaces: true }, multi: true },
            ]).bootstrapModule(TestModule);
            expect(document.body.innerHTML).toContain('a    b');
            ngModuleRef.destroy();
        })));
        it('should prefer preserveWhitespaces on component over bootstrap option', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
            const TestModule = createComponentAndModule({ preserveWhitespaces: false });
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule, {
                preserveWhitespaces: true,
            });
            expect(document.body.innerHTML).toContain('a b');
            ngModuleRef.destroy();
        })));
        describe('ApplicationRef cleanup', () => {
            it('should cleanup ApplicationRef when Injector is destroyed', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                const TestModule = createComponentAndModule();
                const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
                const appRef = ngModuleRef.injector.get(core_1.ApplicationRef);
                const testabilityRegistry = ngModuleRef.injector.get(core_1.TestabilityRegistry);
                expect(appRef.components.length).toBe(1);
                expect(testabilityRegistry.getAllRootElements().length).toBe(1);
                ngModuleRef.destroy(); // also destroys an Injector instance.
                expect(appRef.components.length).toBe(0);
                expect(testabilityRegistry.getAllRootElements().length).toBe(0);
            })));
            it('should cleanup ApplicationRef when ComponentRef is destroyed', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                const TestModule = createComponentAndModule();
                const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
                const appRef = ngModuleRef.injector.get(core_1.ApplicationRef);
                const testabilityRegistry = ngModuleRef.injector.get(core_1.TestabilityRegistry);
                const componentRef = appRef.components[0];
                expect(appRef.components.length).toBe(1);
                expect(testabilityRegistry.getAllRootElements().length).toBe(1);
                componentRef.destroy();
                expect(appRef.components.length).toBe(0);
                expect(testabilityRegistry.getAllRootElements().length).toBe(0);
            })));
            it('should not throw in case ComponentRef is destroyed and Injector is destroyed after that', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                const TestModule = createComponentAndModule();
                const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
                const appRef = ngModuleRef.injector.get(core_1.ApplicationRef);
                const testabilityRegistry = ngModuleRef.injector.get(core_1.TestabilityRegistry);
                const componentRef = appRef.components[0];
                expect(appRef.components.length).toBe(1);
                expect(testabilityRegistry.getAllRootElements().length).toBe(1);
                componentRef.destroy();
                ngModuleRef.destroy(); // also destroys an Injector instance.
                expect(appRef.components.length).toBe(0);
                expect(testabilityRegistry.getAllRootElements().length).toBe(0);
            })));
            it('should not throw in case Injector is destroyed and ComponentRef is destroyed after that', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                const TestModule = createComponentAndModule();
                const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
                const appRef = ngModuleRef.injector.get(core_1.ApplicationRef);
                const testabilityRegistry = ngModuleRef.injector.get(core_1.TestabilityRegistry);
                const componentRef = appRef.components[0];
                expect(appRef.components.length).toBe(1);
                expect(testabilityRegistry.getAllRootElements().length).toBe(1);
                ngModuleRef.destroy(); // also destroys an Injector instance.
                componentRef.destroy();
                expect(appRef.components.length).toBe(0);
                expect(testabilityRegistry.getAllRootElements().length).toBe(0);
            })));
            it('should throw when standalone component is used in @NgModule.bootstrap', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                let StandaloneComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'standalone-comp',
                            template: '...',
                        })];
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
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            bootstrap: [StandaloneComponent],
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
                try {
                    yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(MyModule);
                    // This test tries to bootstrap a standalone component using NgModule-based bootstrap
                    // mechanisms. We expect standalone components to be bootstrapped via
                    // `bootstrapApplication` API instead.
                    fail('Expected to throw');
                }
                catch (e) {
                    const expectedErrorMessage = 'The `StandaloneComponent` class is a standalone component, ' +
                        'which can not be used in the `@NgModule.bootstrap` array.';
                    expect(e).toBeInstanceOf(Error);
                    expect(e.message).toContain(expectedErrorMessage);
                }
            })));
            it('can configure zone with provideZoneChangeDetection', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: '...',
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
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [App],
                            providers: [(0, core_1.provideZoneChangeDetection)({ eventCoalescing: true })],
                            imports: [platform_browser_1.BrowserModule],
                            bootstrap: [App],
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
                const { injector } = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(MyModule);
                expect(injector.get(core_1.NgZone).shouldCoalesceEventChangeDetection).toBe(true);
            })));
            it('can configure zoneless correctly without `ngZone: "noop"`', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: '...',
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
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [App],
                            providers: [(0, core_1.provideZonelessChangeDetection)()],
                            imports: [platform_browser_1.BrowserModule],
                            bootstrap: [App],
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
                const { injector } = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(MyModule);
                expect(injector.get(core_1.NgZone)).toBeInstanceOf(core_1.ɵNoopNgZone);
                expect(injector.get(core_1.ɵZONELESS_ENABLED)).toBeTrue();
            })));
            it('should throw when standalone component wrapped in `forwardRef` is used in @NgModule.bootstrap', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                let StandaloneComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'standalone-comp',
                            template: '...',
                        })];
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
                let MyModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            bootstrap: [(0, core_1.forwardRef)(() => StandaloneComponent)],
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
                try {
                    yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(MyModule);
                    // This test tries to bootstrap a standalone component using NgModule-based bootstrap
                    // mechanisms. We expect standalone components to be bootstrapped via
                    // `bootstrapApplication` API instead.
                    fail('Expected to throw');
                }
                catch (e) {
                    const expectedErrorMessage = 'The `StandaloneComponent` class is a standalone component, which ' +
                        'can not be used in the `@NgModule.bootstrap` array. Use the `bootstrapApplication` ' +
                        'function for bootstrap instead.';
                    expect(e).toBeInstanceOf(Error);
                    expect(e.message).toContain(expectedErrorMessage);
                }
            })));
        });
        describe('PlatformRef cleanup', () => {
            it('should unsubscribe from `onError` when Injector is destroyed', (0, testing_1.withBody)('<my-app></my-app>', () => __awaiter(void 0, void 0, void 0, function* () {
                const TestModule = createComponentAndModule();
                const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
                const ngZone = ngModuleRef.injector.get(core_1.NgZone);
                expect(ngZone.onError.observers.length).toBe(1);
                ngModuleRef.destroy();
                expect(ngZone.onError.observers.length).toBe(0);
            })));
        });
        describe('changing bootstrap options', () => {
            beforeEach(() => {
                spyOn(console, 'error');
            });
            it('should log an error when changing defaultEncapsulation bootstrap options', (0, testing_1.withBody)('<my-app-a></my-app-a><my-app-b></my-app-b>', () => __awaiter(void 0, void 0, void 0, function* () {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const TestModuleA = createComponentAndModule({ selector: 'my-app-a' });
                const ngModuleRefA = yield platformRef.bootstrapModule(TestModuleA, {
                    defaultEncapsulation: core_1.ViewEncapsulation.None,
                });
                ngModuleRefA.destroy();
                const TestModuleB = createComponentAndModule({ selector: 'my-app-b' });
                const ngModuleRefB = yield platformRef.bootstrapModule(TestModuleB, {
                    defaultEncapsulation: core_1.ViewEncapsulation.ShadowDom,
                });
                expect(console.error).toHaveBeenCalledWith('Provided value for `defaultEncapsulation` can not be changed once it has been set.');
                // The options should not have been changed
                expect(document.body.innerHTML).not.toContain('_ngcontent-');
                ngModuleRefB.destroy();
            })));
            it('should log an error when changing preserveWhitespaces bootstrap options', (0, testing_1.withBody)('<my-app-a></my-app-a><my-app-b></my-app-b>', () => __awaiter(void 0, void 0, void 0, function* () {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const TestModuleA = createComponentAndModule({ selector: 'my-app-a' });
                const ngModuleRefA = yield platformRef.bootstrapModule(TestModuleA, {
                    preserveWhitespaces: true,
                });
                ngModuleRefA.destroy();
                const TestModuleB = createComponentAndModule({ selector: 'my-app-b' });
                const ngModuleRefB = yield platformRef.bootstrapModule(TestModuleB, {
                    preserveWhitespaces: false,
                });
                expect(console.error).toHaveBeenCalledWith('Provided value for `preserveWhitespaces` can not be changed once it has been set.');
                // The options should not have been changed
                expect(document.body.innerHTML).toContain('a    b');
                ngModuleRefB.destroy();
            })));
            it('should log an error when changing defaultEncapsulation to its default', (0, testing_1.withBody)('<my-app-a></my-app-a><my-app-b></my-app-b>', () => __awaiter(void 0, void 0, void 0, function* () {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const TestModuleA = createComponentAndModule({ selector: 'my-app-a' });
                const ngModuleRefA = yield platformRef.bootstrapModule(TestModuleA);
                ngModuleRefA.destroy();
                const TestModuleB = createComponentAndModule({ selector: 'my-app-b' });
                const ngModuleRefB = yield platformRef.bootstrapModule(TestModuleB, {
                    defaultEncapsulation: core_1.ViewEncapsulation.Emulated,
                });
                // Although the configured value may be identical to the default, the provided set of
                // options has still been changed compared to the previously provided options.
                expect(console.error).toHaveBeenCalledWith('Provided value for `defaultEncapsulation` can not be changed once it has been set.');
                ngModuleRefB.destroy();
            })));
            it('should log an error when changing preserveWhitespaces to its default', (0, testing_1.withBody)('<my-app-a></my-app-a><my-app-b></my-app-b>', () => __awaiter(void 0, void 0, void 0, function* () {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const TestModuleA = createComponentAndModule({ selector: 'my-app-a' });
                const ngModuleRefA = yield platformRef.bootstrapModule(TestModuleA);
                ngModuleRefA.destroy();
                const TestModuleB = createComponentAndModule({ selector: 'my-app-b' });
                const ngModuleRefB = yield platformRef.bootstrapModule(TestModuleB, {
                    preserveWhitespaces: false,
                });
                // Although the configured value may be identical to the default, the provided set of
                // options has still been changed compared to the previously provided options.
                expect(console.error).toHaveBeenCalledWith('Provided value for `preserveWhitespaces` can not be changed once it has been set.');
                ngModuleRefB.destroy();
            })));
            it('should not log an error when passing identical bootstrap options', (0, testing_1.withBody)('<my-app-a></my-app-a><my-app-b></my-app-b>', () => __awaiter(void 0, void 0, void 0, function* () {
                const platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                const TestModuleA = createComponentAndModule({ selector: 'my-app-a' });
                const ngModuleRefA = yield platformRef.bootstrapModule(TestModuleA, {
                    defaultEncapsulation: core_1.ViewEncapsulation.None,
                    preserveWhitespaces: true,
                });
                ngModuleRefA.destroy();
                // Bootstrapping multiple modules using the exact same options should be allowed.
                const TestModuleB = createComponentAndModule({ selector: 'my-app-b' });
                const ngModuleRefB = yield platformRef.bootstrapModule(TestModuleB, {
                    defaultEncapsulation: core_1.ViewEncapsulation.None,
                    preserveWhitespaces: true,
                });
                ngModuleRefB.destroy();
            })));
        });
    });
});
let IdSelectorAppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '#my-app',
            template: 'works!',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdSelectorAppComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "IdSelectorAppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IdSelectorAppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdSelectorAppComponent = _classThis;
})();
exports.IdSelectorAppComponent = IdSelectorAppComponent;
let IdSelectorAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [IdSelectorAppComponent],
            bootstrap: [IdSelectorAppComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdSelectorAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "IdSelectorAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IdSelectorAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdSelectorAppModule = _classThis;
})();
exports.IdSelectorAppModule = IdSelectorAppModule;
let MultipleSelectorsAppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[foo],span,.bar',
            template: 'works!',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultipleSelectorsAppComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "MultipleSelectorsAppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultipleSelectorsAppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultipleSelectorsAppComponent = _classThis;
})();
exports.MultipleSelectorsAppComponent = MultipleSelectorsAppComponent;
let MultipleSelectorsAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [MultipleSelectorsAppComponent],
            bootstrap: [MultipleSelectorsAppComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultipleSelectorsAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MultipleSelectorsAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultipleSelectorsAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultipleSelectorsAppModule = _classThis;
})();
exports.MultipleSelectorsAppModule = MultipleSelectorsAppModule;
