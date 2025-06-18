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
const matchers_1 = require("../testing/src/matchers");
// Services, and components for the tests.
let ChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-comp',
            template: `<span>Original {{childBinding}}</span>`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildComp = _classThis = class {
        constructor() {
            this.childBinding = 'Child';
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
let MockChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-comp',
            template: `<span>Mock</span>`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockChildComp = _classThis = class {
    };
    __setFunctionName(_classThis, "MockChildComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockChildComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockChildComp = _classThis;
})();
let ParentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'parent-comp',
            template: `Parent(<child-comp></child-comp>)`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ParentComp = _classThis = class {
    };
    __setFunctionName(_classThis, "ParentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParentComp = _classThis;
})();
let MyIfComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-if-comp',
            template: `MyIf(<span *ngIf="showMore">More</span>)`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyIfComp = _classThis = class {
        constructor() {
            this.showMore = false;
        }
    };
    __setFunctionName(_classThis, "MyIfComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyIfComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyIfComp = _classThis;
})();
let ChildChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-child-comp',
            template: `<span>ChildChild</span>`,
            standalone: false,
        }), (0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildChildComp = _classThis = class {
    };
    __setFunctionName(_classThis, "ChildChildComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildChildComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildChildComp = _classThis;
})();
class FancyService {
    constructor() {
        this.value = 'real value';
    }
    getAsyncValue() {
        return Promise.resolve('async value');
    }
    getTimeoutValue() {
        return new Promise((resolve, reject) => setTimeout(() => resolve('timeout value'), 10));
    }
}
class MockFancyService extends FancyService {
    constructor() {
        super(...arguments);
        this.value = 'mocked out value';
    }
}
let TestProvidersComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-service-comp',
            providers: [FancyService],
            template: `injected value: {{fancyService.value}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestProvidersComp = _classThis = class {
        constructor(fancyService) {
            this.fancyService = fancyService;
        }
    };
    __setFunctionName(_classThis, "TestProvidersComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestProvidersComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestProvidersComp = _classThis;
})();
let TestViewProvidersComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-service-comp',
            viewProviders: [FancyService],
            template: `injected value: {{fancyService.value}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestViewProvidersComp = _classThis = class {
        constructor(fancyService) {
            this.fancyService = fancyService;
        }
    };
    __setFunctionName(_classThis, "TestViewProvidersComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestViewProvidersComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestViewProvidersComp = _classThis;
})();
let SomeDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[someDir]',
            host: { '[title]': 'someDir' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _someDir_decorators;
    let _someDir_initializers = [];
    let _someDir_extraInitializers = [];
    var SomeDirective = _classThis = class {
        constructor() {
            this.someDir = __runInitializers(this, _someDir_initializers, void 0);
            __runInitializers(this, _someDir_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SomeDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _someDir_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _someDir_decorators, { kind: "field", name: "someDir", static: false, private: false, access: { has: obj => "someDir" in obj, get: obj => obj.someDir, set: (obj, value) => { obj.someDir = value; } }, metadata: _metadata }, _someDir_initializers, _someDir_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeDirective = _classThis;
})();
let SomePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'somePipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomePipe = _classThis = class {
        transform(value) {
            return `transformed ${value}`;
        }
    };
    __setFunctionName(_classThis, "SomePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomePipe = _classThis;
})();
let CompUsingModuleDirectiveAndPipe = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'comp',
            template: `<div  [someDir]="'someValue' | somePipe"></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CompUsingModuleDirectiveAndPipe = _classThis = class {
    };
    __setFunctionName(_classThis, "CompUsingModuleDirectiveAndPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompUsingModuleDirectiveAndPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompUsingModuleDirectiveAndPipe = _classThis;
})();
let SomeLibModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeLibModule = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeLibModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeLibModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeLibModule = _classThis;
})();
const aTok = new core_1.InjectionToken('a');
const bTok = new core_1.InjectionToken('b');
describe('public testing API', () => {
    describe('using the async helper with context passing', () => {
        beforeEach(function () {
            this.actuallyDone = false;
        });
        afterEach(function () {
            (0, matchers_1.expect)(this.actuallyDone).toEqual(true);
        });
        it('should run normal tests', function () {
            this.actuallyDone = true;
        });
        it('should run normal async tests', function (done) {
            setTimeout(() => {
                this.actuallyDone = true;
                done();
            }, 0);
        });
        it('should run async tests with tasks', (0, testing_1.waitForAsync)(function () {
            setTimeout(() => (this.actuallyDone = true), 0);
        }));
        it('should run async tests with promises', (0, testing_1.waitForAsync)(function () {
            const p = new Promise((resolve, reject) => setTimeout(resolve, 10));
            p.then(() => (this.actuallyDone = true));
        }));
    });
    describe('basic context passing to inject, fakeAsync and withModule helpers', () => {
        const moduleConfig = {
            providers: [FancyService],
        };
        beforeEach(function () {
            this.contextModified = false;
        });
        afterEach(function () {
            (0, matchers_1.expect)(this.contextModified).toEqual(true);
        });
        it('should pass context to inject helper', (0, testing_1.inject)([], function () {
            this.contextModified = true;
        }));
        it('should pass context to fakeAsync helper', (0, testing_1.fakeAsync)(function () {
            this.contextModified = true;
        }));
        it('should pass context to withModule helper - simple', (0, testing_1.withModule)(moduleConfig, function () {
            this.contextModified = true;
        }));
        it('should pass context to withModule helper - advanced', (0, testing_1.withModule)(moduleConfig).inject([FancyService], function (service) {
            (0, matchers_1.expect)(service.value).toBe('real value');
            this.contextModified = true;
        }));
        it('should preserve context when async and inject helpers are combined', (0, testing_1.waitForAsync)((0, testing_1.inject)([], function () {
            setTimeout(() => (this.contextModified = true), 0);
        })));
        it('should preserve context when fakeAsync and inject helpers are combined', (0, testing_1.fakeAsync)((0, testing_1.inject)([], function () {
            setTimeout(() => (this.contextModified = true), 0);
            (0, testing_1.tick)(1);
        })));
    });
    describe('using the test injector with the inject helper', () => {
        describe('setting up Providers', () => {
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: FancyService, useValue: new FancyService() }],
                });
            });
            it('should use set up providers', (0, testing_1.inject)([FancyService], (service) => {
                (0, matchers_1.expect)(service.value).toEqual('real value');
            }));
            it('should wait until returned promises', (0, testing_1.waitForAsync)((0, testing_1.inject)([FancyService], (service) => {
                service.getAsyncValue().then((value) => (0, matchers_1.expect)(value).toEqual('async value'));
                service.getTimeoutValue().then((value) => (0, matchers_1.expect)(value).toEqual('timeout value'));
            })));
            it('should allow the use of fakeAsync', (0, testing_1.fakeAsync)((0, testing_1.inject)([FancyService], (service) => {
                let value = undefined;
                service.getAsyncValue().then((val) => (value = val));
                (0, testing_1.tick)();
                (0, matchers_1.expect)(value).toEqual('async value');
            })));
            it('should allow use of "done"', (done) => {
                (0, testing_1.inject)([FancyService], (service) => {
                    let count = 0;
                    const id = setInterval(() => {
                        count++;
                        if (count > 2) {
                            clearInterval(id);
                            done();
                        }
                    }, 5);
                })(); // inject needs to be invoked explicitly with ().
            });
            describe('using beforeEach', () => {
                beforeEach((0, testing_1.inject)([FancyService], (service) => {
                    service.value = 'value modified in beforeEach';
                }));
                it('should use modified providers', (0, testing_1.inject)([FancyService], (service) => {
                    (0, matchers_1.expect)(service.value).toEqual('value modified in beforeEach');
                }));
            });
            describe('using async beforeEach', () => {
                beforeEach((0, testing_1.waitForAsync)((0, testing_1.inject)([FancyService], (service) => {
                    service.getAsyncValue().then((value) => (service.value = value));
                })));
                it('should use asynchronously modified value', (0, testing_1.inject)([FancyService], (service) => {
                    (0, matchers_1.expect)(service.value).toEqual('async value');
                }));
            });
        });
    });
    describe('using the test injector with modules', () => {
        const moduleConfig = {
            providers: [FancyService],
            imports: [SomeLibModule],
            declarations: [SomeDirective, SomePipe, CompUsingModuleDirectiveAndPipe],
        };
        describe('setting up a module', () => {
            beforeEach(() => testing_1.TestBed.configureTestingModule(moduleConfig));
            it('should use set up providers', (0, testing_1.inject)([FancyService], (service) => {
                (0, matchers_1.expect)(service.value).toEqual('real value');
            }));
            it('should be able to create any declared components', () => {
                const compFixture = testing_1.TestBed.createComponent(CompUsingModuleDirectiveAndPipe);
                (0, matchers_1.expect)(compFixture.componentInstance).toBeInstanceOf(CompUsingModuleDirectiveAndPipe);
            });
            it('should use set up directives and pipes', () => {
                const compFixture = testing_1.TestBed.createComponent(CompUsingModuleDirectiveAndPipe);
                const el = compFixture.debugElement;
                compFixture.detectChanges();
                (0, matchers_1.expect)(el.children[0].properties['title']).toBe('transformed someValue');
            });
            it('should use set up imported modules', (0, testing_1.inject)([SomeLibModule], (libModule) => {
                (0, matchers_1.expect)(libModule).toBeInstanceOf(SomeLibModule);
            }));
            describe('provided schemas', () => {
                let ComponentUsingInvalidProperty = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<some-element [someUnknownProp]="true"></some-element>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ComponentUsingInvalidProperty = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ComponentUsingInvalidProperty");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ComponentUsingInvalidProperty = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ComponentUsingInvalidProperty = _classThis;
                })();
                beforeEach(() => {
                    testing_1.TestBed.configureTestingModule({
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                        declarations: [ComponentUsingInvalidProperty],
                    });
                });
                it('should not error on unknown bound properties on custom elements when using the CUSTOM_ELEMENTS_SCHEMA', () => {
                    (0, matchers_1.expect)(testing_1.TestBed.createComponent(ComponentUsingInvalidProperty).componentInstance).toBeInstanceOf(ComponentUsingInvalidProperty);
                });
            });
        });
        describe('per test modules', () => {
            it('should use set up providers', (0, testing_1.withModule)(moduleConfig).inject([FancyService], (service) => {
                (0, matchers_1.expect)(service.value).toEqual('real value');
            }));
            it('should use set up directives and pipes', (0, testing_1.withModule)(moduleConfig, () => {
                const compFixture = testing_1.TestBed.createComponent(CompUsingModuleDirectiveAndPipe);
                const el = compFixture.debugElement;
                compFixture.detectChanges();
                (0, matchers_1.expect)(el.children[0].properties['title']).toBe('transformed someValue');
            }));
            it('should use set up library modules', (0, testing_1.withModule)(moduleConfig).inject([SomeLibModule], (libModule) => {
                (0, matchers_1.expect)(libModule).toBeInstanceOf(SomeLibModule);
            }));
        });
        xdescribe('components with template url', () => {
            let TestComponent;
            beforeEach((0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
                let CompWithUrlTemplate = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            templateUrl: '/base/angular/packages/platform-browser/test/static_assets/test.html',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompWithUrlTemplate = _classThis = class {
                    };
                    __setFunctionName(_classThis, "CompWithUrlTemplate");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompWithUrlTemplate = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompWithUrlTemplate = _classThis;
                })();
                TestComponent = CompWithUrlTemplate;
                testing_1.TestBed.configureTestingModule({ declarations: [CompWithUrlTemplate] });
                yield testing_1.TestBed.compileComponents();
            })));
            isBrowser &&
                it('should allow to createSync components with templateUrl after explicit async compilation', () => {
                    const fixture = testing_1.TestBed.createComponent(TestComponent);
                    (0, matchers_1.expect)(fixture.nativeElement).toHaveText('from external template');
                });
            it('should always pass to satisfy jasmine always wanting an `it` block under a `describe`', () => { });
        });
        describe('overwriting metadata', () => {
            let SomePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'undefined',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomePipe = _classThis = class {
                    transform(value) {
                        return `transformed ${value}`;
                    }
                };
                __setFunctionName(_classThis, "SomePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomePipe = _classThis;
            })();
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[undefined]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                    constructor() {
                        this.someProp = 'hello';
                    }
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: 'someText',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            let SomeOtherComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: 'someOtherText',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeOtherComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeOtherComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeOtherComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeOtherComponent = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeComponent, SomeDirective, SomePipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            beforeEach(() => testing_1.TestBed.configureTestingModule({ imports: [SomeModule] }));
            describe('module', () => {
                beforeEach(() => {
                    testing_1.TestBed.overrideModule(SomeModule, { set: { declarations: [SomeOtherComponent] } });
                });
                it('should work', () => {
                    (0, matchers_1.expect)(testing_1.TestBed.createComponent(SomeOtherComponent).componentInstance).toBeInstanceOf(SomeOtherComponent);
                });
            });
            describe('component', () => {
                beforeEach(() => {
                    testing_1.TestBed.overrideComponent(SomeComponent, { set: { selector: 'comp', template: 'newText' } });
                });
                it('should work', () => {
                    (0, matchers_1.expect)(testing_1.TestBed.createComponent(SomeComponent).nativeElement).toHaveText('newText');
                });
            });
            describe('directive', () => {
                beforeEach(() => {
                    testing_1.TestBed.overrideComponent(SomeComponent, {
                        set: { selector: 'comp', template: `<div someDir></div>` },
                    }).overrideDirective(SomeDirective, {
                        set: { selector: '[someDir]', host: { '[title]': 'someProp' } },
                    });
                });
                it('should work', () => {
                    const compFixture = testing_1.TestBed.createComponent(SomeComponent);
                    compFixture.detectChanges();
                    (0, matchers_1.expect)(compFixture.debugElement.children[0].properties['title']).toEqual('hello');
                });
            });
            describe('pipe', () => {
                beforeEach(() => {
                    testing_1.TestBed.overrideComponent(SomeComponent, {
                        set: { selector: 'comp', template: `{{'hello' | somePipe}}` },
                    })
                        .overridePipe(SomePipe, { set: { name: 'somePipe' } })
                        .overridePipe(SomePipe, { add: { pure: false } });
                });
                it('should work', () => {
                    const compFixture = testing_1.TestBed.createComponent(SomeComponent);
                    compFixture.detectChanges();
                    (0, matchers_1.expect)(compFixture.nativeElement).toHaveText('transformed hello');
                });
            });
            describe('template', () => {
                let testBedSpy;
                beforeEach(() => {
                    testBedSpy = spyOn((0, testing_1.getTestBed)(), 'overrideComponent').and.callThrough();
                    testing_1.TestBed.overrideTemplate(SomeComponent, 'newText');
                });
                it(`should override component's template`, () => {
                    const fixture = testing_1.TestBed.createComponent(SomeComponent);
                    (0, matchers_1.expect)(fixture.nativeElement).toHaveText('newText');
                    (0, matchers_1.expect)(testBedSpy).toHaveBeenCalledWith(SomeComponent, {
                        set: { template: 'newText', templateUrl: null },
                    });
                });
            });
        });
        describe('overriding providers', () => {
            describe('in core', () => {
                it('ComponentFactoryResolver', () => {
                    const componentFactoryMock = jasmine.createSpyObj('componentFactory', [
                        'resolveComponentFactory',
                    ]);
                    testing_1.TestBed.overrideProvider(core_1.ComponentFactoryResolver, { useValue: componentFactoryMock });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(core_1.ComponentFactoryResolver)).toEqual(componentFactoryMock);
                });
            });
            describe('in NgModules', () => {
                it('should support useValue', () => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: aTok, useValue: 'aValue' }],
                    });
                    testing_1.TestBed.overrideProvider(aTok, { useValue: 'mockValue' });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockValue');
                });
                it('should support useFactory', () => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            { provide: 'dep', useValue: 'depValue' },
                            { provide: aTok, useValue: 'aValue' },
                        ],
                    });
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: ['dep'],
                    });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockA: depValue');
                });
                it('should support @Optional without matches', () => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: aTok, useValue: 'aValue' }],
                    });
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.Optional(), 'dep']],
                    });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockA: null');
                });
                it('should support Optional with matches', () => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            { provide: 'dep', useValue: 'depValue' },
                            { provide: aTok, useValue: 'aValue' },
                        ],
                    });
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.Optional(), 'dep']],
                    });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockA: depValue');
                });
                it('should support SkipSelf', () => {
                    let MyModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                providers: [
                                    { provide: aTok, useValue: 'aValue' },
                                    { provide: 'dep', useValue: 'depValue' },
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
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.SkipSelf(), 'dep']],
                    });
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: 'dep', useValue: 'parentDepValue' }],
                    });
                    const compiler = testing_1.TestBed.inject(core_1.Compiler);
                    const modFactory = compiler.compileModuleSync(MyModule);
                    (0, matchers_1.expect)(modFactory.create(testing_1.TestBed.inject(core_1.Injector)).injector.get(aTok)).toBe('mockA: parentDepValue');
                });
                it('should keep imported NgModules eager', () => {
                    let someModule;
                    let SomeModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)()];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SomeModule = _classThis = class {
                            constructor() {
                                someModule = this;
                            }
                        };
                        __setFunctionName(_classThis, "SomeModule");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SomeModule = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SomeModule = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: aTok, useValue: 'aValue' }],
                        imports: [SomeModule],
                    });
                    testing_1.TestBed.overrideProvider(aTok, { useValue: 'mockValue' });
                    (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockValue');
                    (0, matchers_1.expect)(someModule).toBeInstanceOf(SomeModule);
                });
                describe('injecting eager providers into an eager overwritten provider', () => {
                    let MyModule = (() => {
                        let _classDecorators = [(0, core_1.NgModule)({
                                providers: [
                                    { provide: aTok, useFactory: () => 'aValue' },
                                    { provide: bTok, useFactory: () => 'bValue' },
                                ],
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyModule = _classThis = class {
                            // NgModule is eager, which makes all of its deps eager
                            constructor(a, b) { }
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
                    it('should inject providers that were declared before', () => {
                        testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
                        testing_1.TestBed.overrideProvider(bTok, {
                            useFactory: (a) => `mockB: ${a}`,
                            deps: [aTok],
                        });
                        (0, matchers_1.expect)(testing_1.TestBed.inject(bTok)).toBe('mockB: aValue');
                    });
                    it('should inject providers that were declared afterwards', () => {
                        testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
                        testing_1.TestBed.overrideProvider(aTok, {
                            useFactory: (b) => `mockA: ${b}`,
                            deps: [bTok],
                        });
                        (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('mockA: bValue');
                    });
                });
            });
            describe('in Components', () => {
                it('should support useValue', () => {
                    let MComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                providers: [{ provide: aTok, useValue: 'aValue' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MComp = _classThis;
                    })();
                    testing_1.TestBed.overrideProvider(aTok, { useValue: 'mockValue' });
                    const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MComp] }).createComponent(MComp);
                    (0, matchers_1.expect)(ctx.debugElement.injector.get(aTok)).toBe('mockValue');
                });
                it('should support useFactory', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                providers: [
                                    { provide: 'dep', useValue: 'depValue' },
                                    { provide: aTok, useValue: 'aValue' },
                                ],
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
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: ['dep'],
                    });
                    const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                    (0, matchers_1.expect)(ctx.debugElement.injector.get(aTok)).toBe('mockA: depValue');
                });
                it('should support @Optional without matches', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                providers: [{ provide: aTok, useValue: 'aValue' }],
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
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.Optional(), 'dep']],
                    });
                    const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                    (0, matchers_1.expect)(ctx.debugElement.injector.get(aTok)).toBe('mockA: null');
                });
                it('should support Optional with matches', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                providers: [
                                    { provide: 'dep', useValue: 'depValue' },
                                    { provide: aTok, useValue: 'aValue' },
                                ],
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
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.Optional(), 'dep']],
                    });
                    const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                    (0, matchers_1.expect)(ctx.debugElement.injector.get(aTok)).toBe('mockA: depValue');
                });
                it('should support SkipSelf', () => {
                    let MyDir = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[myDir]',
                                providers: [
                                    { provide: aTok, useValue: 'aValue' },
                                    { provide: 'dep', useValue: 'depValue' },
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyDir = _classThis = class {
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
                                template: '<div myDir></div>',
                                providers: [{ provide: 'dep', useValue: 'parentDepValue' }],
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
                    testing_1.TestBed.overrideProvider(aTok, {
                        useFactory: (dep) => `mockA: ${dep}`,
                        deps: [[new core_1.SkipSelf(), 'dep']],
                    });
                    const ctx = testing_1.TestBed.configureTestingModule({
                        declarations: [MyComp, MyDir],
                    }).createComponent(MyComp);
                    (0, matchers_1.expect)(ctx.debugElement.children[0].injector.get(aTok)).toBe('mockA: parentDepValue');
                });
                it('should support multiple providers in a template', () => {
                    let MyDir1 = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[myDir1]',
                                providers: [{ provide: aTok, useValue: 'aValue1' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyDir1 = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyDir1");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyDir1 = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyDir1 = _classThis;
                    })();
                    let MyDir2 = (() => {
                        let _classDecorators = [(0, core_1.Directive)({
                                selector: '[myDir2]',
                                providers: [{ provide: aTok, useValue: 'aValue2' }],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyDir2 = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MyDir2");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyDir2 = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyDir2 = _classThis;
                    })();
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<div myDir1></div><div myDir2></div>',
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
                    testing_1.TestBed.overrideProvider(aTok, { useValue: 'mockA' });
                    const ctx = testing_1.TestBed.configureTestingModule({
                        declarations: [MyComp, MyDir1, MyDir2],
                    }).createComponent(MyComp);
                    (0, matchers_1.expect)(ctx.debugElement.children[0].injector.get(aTok)).toBe('mockA');
                    (0, matchers_1.expect)(ctx.debugElement.children[1].injector.get(aTok)).toBe('mockA');
                });
                describe('injecting eager providers into an eager overwritten provider', () => {
                    let MyComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '',
                                providers: [
                                    { provide: aTok, useFactory: () => 'aValue' },
                                    { provide: bTok, useFactory: () => 'bValue' },
                                ],
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MyComp = _classThis = class {
                            // Component is eager, which makes all of its deps eager
                            constructor(a, b) { }
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
                    it('should inject providers that were declared before it', () => {
                        testing_1.TestBed.overrideProvider(bTok, {
                            useFactory: (a) => `mockB: ${a}`,
                            deps: [aTok],
                        });
                        const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                        (0, matchers_1.expect)(ctx.debugElement.injector.get(bTok)).toBe('mockB: aValue');
                    });
                    it('should inject providers that were declared after it', () => {
                        testing_1.TestBed.overrideProvider(aTok, {
                            useFactory: (b) => `mockA: ${b}`,
                            deps: [bTok],
                        });
                        const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                        (0, matchers_1.expect)(ctx.debugElement.injector.get(aTok)).toBe('mockA: bValue');
                    });
                });
            });
            it('should reset overrides when the testing modules is resetted', () => {
                testing_1.TestBed.overrideProvider(aTok, { useValue: 'mockValue' });
                testing_1.TestBed.resetTestingModule();
                testing_1.TestBed.configureTestingModule({ providers: [{ provide: aTok, useValue: 'aValue' }] });
                (0, matchers_1.expect)(testing_1.TestBed.inject(aTok)).toBe('aValue');
            });
        });
        describe('overrideTemplateUsingTestingModule', () => {
            it('should compile the template in the context of the testing module', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            template: 'a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComponent = _classThis = class {
                        constructor() {
                            this.prop = 'some prop';
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
                let testDir;
                let TestDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[test]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _test_decorators;
                    let _test_initializers = [];
                    let _test_extraInitializers = [];
                    var TestDir = _classThis = class {
                        constructor() {
                            this.test = __runInitializers(this, _test_initializers, void 0);
                            __runInitializers(this, _test_extraInitializers);
                            testDir = this;
                        }
                    };
                    __setFunctionName(_classThis, "TestDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _test_decorators = [(0, core_1.Input)('test')];
                        __esDecorate(null, null, _test_decorators, { kind: "field", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test, set: (obj, value) => { obj.test = value; } }, metadata: _metadata }, _test_initializers, _test_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestDir = _classThis;
                })();
                testing_1.TestBed.overrideTemplateUsingTestingModule(MyComponent, '<div [test]="prop">Hello world!</div>');
                const fixture = testing_1.TestBed.configureTestingModule({
                    declarations: [MyComponent, TestDir],
                }).createComponent(MyComponent);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Hello world!');
                (0, matchers_1.expect)(testDir).toBeInstanceOf(TestDir);
                (0, matchers_1.expect)(testDir.test).toBe('some prop');
            });
            it('should reset overrides when the testing module is resetted', () => {
                let MyComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            template: 'a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComponent = _classThis = class {
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
                testing_1.TestBed.overrideTemplateUsingTestingModule(MyComponent, 'b');
                const fixture = testing_1.TestBed.resetTestingModule()
                    .configureTestingModule({ declarations: [MyComponent] })
                    .createComponent(MyComponent);
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('a');
            });
        });
        describe('setting up the compiler', () => {
            describe('providers', () => {
                // TODO(alxhub): disable while we figure out how this should work
                xit('should use set up providers', (0, testing_1.fakeAsync)(() => {
                    // Keeping this component inside the test is needed to make sure it's not resolved
                    // prior to this test, thus having ɵcmp and a reference in resource
                    // resolution queue. This is done to check external resoution logic in isolation by
                    // configuring TestBed with the necessary ResourceLoader instance.
                    let InternalCompWithUrlTemplate = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'comp',
                                templateUrl: '/base/angular/packages/platform-browser/test/static_assets/test.html',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var InternalCompWithUrlTemplate = _classThis = class {
                        };
                        __setFunctionName(_classThis, "InternalCompWithUrlTemplate");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            InternalCompWithUrlTemplate = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return InternalCompWithUrlTemplate = _classThis;
                    })();
                    const resourceLoaderGet = jasmine
                        .createSpy('resourceLoaderGet')
                        .and.returnValue(Promise.resolve('Hello world!'));
                    testing_1.TestBed.configureTestingModule({ declarations: [InternalCompWithUrlTemplate] });
                    testing_1.TestBed.configureCompiler({
                        providers: [{ provide: compiler_1.ResourceLoader, useValue: { get: resourceLoaderGet } }],
                    });
                    testing_1.TestBed.compileComponents();
                    (0, testing_1.tick)();
                    const compFixture = testing_1.TestBed.createComponent(InternalCompWithUrlTemplate);
                    (0, matchers_1.expect)(compFixture.nativeElement).toHaveText('Hello world!');
                }));
            });
        });
    });
    describe('errors', () => {
        let originalJasmineIt;
        const patchJasmineIt = () => {
            let resolve;
            let reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            const jasmineEnv = jasmine.getEnv();
            originalJasmineIt = jasmineEnv.it;
            jasmineEnv.it = (description, fn) => {
                const done = (() => resolve(null));
                done.fail = (err) => reject(err);
                fn(done);
                return null;
            };
            return promise;
        };
        const restoreJasmineIt = () => (jasmine.getEnv().it = originalJasmineIt);
        it('should fail when an asynchronous error is thrown', (done) => {
            const itPromise = patchJasmineIt();
            const barError = new Error('bar');
            it('throws an async error', (0, testing_1.waitForAsync)((0, testing_1.inject)([], () => setTimeout(() => {
                throw barError;
            }, 0))));
            itPromise.then(() => done.fail('Expected test to fail, but it did not'), (err) => {
                (0, matchers_1.expect)(err).toEqual(barError);
                done();
            });
            restoreJasmineIt();
        });
        it('should fail when a returned promise is rejected', (done) => {
            const itPromise = patchJasmineIt();
            it('should fail with an error from a promise', (0, testing_1.waitForAsync)((0, testing_1.inject)([], () => {
                let reject = undefined;
                const promise = new Promise((_, rej) => (reject = rej));
                const p = promise.then(() => (0, matchers_1.expect)(1).toEqual(2));
                reject('baz');
                return p;
            })));
            itPromise.then(() => done.fail('Expected test to fail, but it did not'), (err) => {
                (0, matchers_1.expect)(err.message).toEqual('baz');
                done();
            });
            restoreJasmineIt();
        });
        describe('components', () => {
            let resourceLoaderGet;
            beforeEach(() => {
                resourceLoaderGet = jasmine
                    .createSpy('resourceLoaderGet')
                    .and.returnValue(Promise.resolve('Hello world!'));
                testing_1.TestBed.configureCompiler({
                    providers: [{ provide: compiler_1.ResourceLoader, useValue: { get: resourceLoaderGet } }],
                });
            });
            // TODO(alxhub): disable while we figure out how this should work
            xit('should report an error for declared components with templateUrl which never call TestBed.compileComponents', () => {
                let InlineCompWithUrlTemplate = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            templateUrl: '/base/angular/packages/platform-browser/test/static_assets/test.html',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InlineCompWithUrlTemplate = _classThis = class {
                    };
                    __setFunctionName(_classThis, "InlineCompWithUrlTemplate");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InlineCompWithUrlTemplate = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InlineCompWithUrlTemplate = _classThis;
                })();
                (0, matchers_1.expect)((0, testing_1.withModule)({ declarations: [InlineCompWithUrlTemplate] }, () => testing_1.TestBed.createComponent(InlineCompWithUrlTemplate))).toThrowError(`Component 'InlineCompWithUrlTemplate' is not resolved:
 - templateUrl: /base/angular/packages/platform-browser/test/static_assets/test.html
Did you run and wait for 'resolveComponentResources()'?`);
            });
        });
        it('should error on unknown bound properties on custom elements by default', () => {
            let ComponentUsingInvalidProperty = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div [someUnknownProp]="true"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentUsingInvalidProperty = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentUsingInvalidProperty");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentUsingInvalidProperty = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentUsingInvalidProperty = _classThis;
            })();
            const spy = spyOn(console, 'error');
            (0, testing_1.withModule)({ declarations: [ComponentUsingInvalidProperty] }, () => {
                const fixture = testing_1.TestBed.createComponent(ComponentUsingInvalidProperty);
                fixture.detectChanges();
            })();
            (0, matchers_1.expect)(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'someUnknownProp'/);
        });
    });
    describe('creating components', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    ChildComp,
                    MyIfComp,
                    ChildChildComp,
                    ParentComp,
                    TestProvidersComp,
                    TestViewProvidersComp,
                ],
            });
        });
        it('should instantiate a component with valid DOM', (0, testing_1.waitForAsync)(() => {
            const fixture = testing_1.TestBed.createComponent(ChildComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Original Child');
        }));
        it('should allow changing members of the component', (0, testing_1.waitForAsync)(() => {
            const componentFixture = testing_1.TestBed.createComponent(MyIfComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('MyIf()');
            componentFixture.componentInstance.showMore = true;
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('MyIf(More)');
        }));
        it('should override a template', (0, testing_1.waitForAsync)(() => {
            testing_1.TestBed.overrideComponent(ChildComp, { set: { template: '<span>Mock</span>' } });
            const componentFixture = testing_1.TestBed.createComponent(ChildComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('Mock');
        }));
        it('should override a provider', (0, testing_1.waitForAsync)(() => {
            testing_1.TestBed.overrideComponent(TestProvidersComp, {
                set: { providers: [{ provide: FancyService, useClass: MockFancyService }] },
            });
            const componentFixture = testing_1.TestBed.createComponent(TestProvidersComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('injected value: mocked out value');
        }));
        it('should override a viewProvider', (0, testing_1.waitForAsync)(() => {
            testing_1.TestBed.overrideComponent(TestViewProvidersComp, {
                set: { viewProviders: [{ provide: FancyService, useClass: MockFancyService }] },
            });
            const componentFixture = testing_1.TestBed.createComponent(TestViewProvidersComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('injected value: mocked out value');
        }));
    });
    describe('using alternate components', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MockChildComp, ParentComp],
            });
        });
        it('should override component dependencies', (0, testing_1.waitForAsync)(() => {
            const componentFixture = testing_1.TestBed.createComponent(ParentComp);
            componentFixture.detectChanges();
            (0, matchers_1.expect)(componentFixture.nativeElement).toHaveText('Parent(Mock)');
        }));
    });
    describe('calling override methods after TestBed initialization', () => {
        const getExpectedErrorMessage = (methodName, methodDescription) => `Cannot ${methodDescription} when the test module has already been instantiated. Make sure you are not using \`inject\` before \`${methodName}\`.`;
        it('should throw if TestBed.overrideProvider is called after TestBed initialization', () => {
            testing_1.TestBed.inject(core_1.Injector);
            (0, matchers_1.expect)(() => testing_1.TestBed.overrideProvider(aTok, {
                useValue: 'mockValue',
            })).toThrowError(getExpectedErrorMessage('overrideProvider', 'override provider'));
        });
        it('should throw if TestBed.overrideModule is called after TestBed initialization', () => {
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)()];
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
            testing_1.TestBed.inject(core_1.Injector);
            (0, matchers_1.expect)(() => testing_1.TestBed.overrideModule(MyModule, {})).toThrowError(getExpectedErrorMessage('overrideModule', 'override module metadata'));
        });
        it('should throw if TestBed.overridePipe is called after TestBed initialization', () => {
            let MyPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'myPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyPipe = _classThis = class {
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
            testing_1.TestBed.inject(core_1.Injector);
            (0, matchers_1.expect)(() => testing_1.TestBed.overridePipe(MyPipe, {})).toThrowError(getExpectedErrorMessage('overridePipe', 'override pipe metadata'));
        });
        it('should throw if TestBed.overrideDirective is called after TestBed initialization', () => {
            let MyDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDirective = _classThis = class {
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
            testing_1.TestBed.inject(core_1.Injector);
            (0, matchers_1.expect)(() => testing_1.TestBed.overrideDirective(MyDirective, {})).toThrowError(getExpectedErrorMessage('overrideDirective', 'override directive metadata'));
        });
        it('should throw if TestBed.overrideTemplateUsingTestingModule is called after TestBed initialization', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: 'a',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
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
            testing_1.TestBed.inject(core_1.Injector);
            (0, matchers_1.expect)(() => testing_1.TestBed.overrideTemplateUsingTestingModule(MyComponent, 'b')).toThrowError(/Cannot override template when the test module has already been instantiated/);
        });
    });
    it('TransferState re-export can be used as a type and contructor', () => {
        const transferState = new core_1.TransferState();
        (0, matchers_1.expect)(transferState).toBeDefined();
    });
});
