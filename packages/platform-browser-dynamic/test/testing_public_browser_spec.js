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
const compiler_1 = require("@angular/compiler");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const resource_loader_impl_1 = require("../src/resource_loader/resource_loader_impl");
const testing_2 = require("../testing");
const testing_3 = require("@angular/platform-browser/testing");
const animations_1 = require("@angular/platform-browser/animations");
// Components for the tests.
class FancyService {
    constructor() {
        this.value = 'real value';
    }
    getAsyncValue() {
        return Promise.resolve('async value');
    }
    getTimeoutValue() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('timeout value');
            }, 10);
        });
    }
}
// Tests for angular/testing bundle specific to the browser environment.
// For general tests, see test/testing/testing_public_spec.ts.
if (isBrowser) {
    describe('test APIs for the browser', () => {
        describe('using the async helper', () => {
            let actuallyDone;
            beforeEach(() => {
                actuallyDone = false;
            });
            afterEach(() => {
                expect(actuallyDone).toEqual(true);
            });
            it('should run async tests with ResourceLoaders', (0, testing_1.waitForAsync)(() => {
                const resourceLoader = new resource_loader_impl_1.ResourceLoaderImpl();
                resourceLoader
                    .get('/base/angular/packages/platform-browser/test/static_assets/test.html')
                    .then(() => {
                    actuallyDone = true;
                });
            }), 10000); // Long timeout here because this test makes an actual ResourceLoader.
        });
        describe('using the test injector with the inject helper', () => {
            describe('setting up Providers', () => {
                beforeEach(() => {
                    var _a;
                    (_a = (0, core_1.getPlatform)()) === null || _a === void 0 ? void 0 : _a.destroy();
                    // We need to reset the test environment because
                    // browser_tests.init.ts doesn't use platformBrowserDynamicTesting
                    testing_1.TestBed.resetTestEnvironment();
                    testing_1.TestBed.initTestEnvironment([testing_2.BrowserDynamicTestingModule], (0, testing_2.platformBrowserDynamicTesting)());
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: FancyService, useValue: new FancyService() }],
                    });
                });
                it('provides a real ResourceLoader instance', (0, testing_1.inject)([compiler_1.ResourceLoader], (resourceLoader) => {
                    expect(resourceLoader instanceof resource_loader_impl_1.ResourceLoaderImpl).toBeTruthy();
                }));
                it('should allow the use of fakeAsync', (0, testing_1.fakeAsync)((0, testing_1.inject)([FancyService], (service) => {
                    let value;
                    service.getAsyncValue().then(function (val) {
                        value = val;
                    });
                    (0, testing_1.tick)();
                    expect(value).toEqual('async value');
                })));
                afterEach(() => {
                    var _a;
                    (_a = (0, core_1.getPlatform)()) === null || _a === void 0 ? void 0 : _a.destroy();
                    // We're reset the test environment to their default values, cf browser_tests.init.ts
                    testing_1.TestBed.resetTestEnvironment();
                    testing_1.TestBed.initTestEnvironment([testing_3.BrowserTestingModule, animations_1.NoopAnimationsModule], (0, testing_3.platformBrowserTesting)());
                });
            });
        });
        describe('Compiler', () => {
            it('should return NgModule id when asked', () => {
                let TestModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            id: 'test-module',
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
                const compiler = testing_1.TestBed.inject(core_1.Compiler);
                expect(compiler.getModuleId(TestModule)).toBe('test-module');
            });
        });
        describe('errors', () => {
            describe('should fail when an ResourceLoader fails', () => {
                // TODO(alxhub): figure out why this is failing on saucelabs
                xit('should fail with an error from a promise', () => __awaiter(void 0, void 0, void 0, function* () {
                    let BadTemplateUrl = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'bad-template-comp',
                                templateUrl: 'non-existent.html',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var BadTemplateUrl = _classThis = class {
                        };
                        __setFunctionName(_classThis, "BadTemplateUrl");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            BadTemplateUrl = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return BadTemplateUrl = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [BadTemplateUrl] });
                    yield expectAsync(testing_1.TestBed.compileComponents()).toBeRejectedWith('Failed to load non-existent.html');
                }), 10000);
            });
        });
        describe('TestBed createComponent', function () {
            // TODO(alxhub): disable while we figure out how this should work
            xit('should allow an external templateUrl', (0, testing_1.waitForAsync)(() => {
                let ExternalTemplateComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'external-template-comp',
                            templateUrl: '/base/angular/packages/platform-browser/test/static_assets/test.html',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ExternalTemplateComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ExternalTemplateComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ExternalTemplateComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ExternalTemplateComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [ExternalTemplateComp] });
                testing_1.TestBed.compileComponents().then(() => {
                    const componentFixture = testing_1.TestBed.createComponent(ExternalTemplateComp);
                    componentFixture.detectChanges();
                    expect(componentFixture.nativeElement.textContent).toEqual('from external template');
                });
            }), 10000); // Long timeout here because this test makes an actual ResourceLoader
            // request, and is slow on Edge.
        });
    });
}
