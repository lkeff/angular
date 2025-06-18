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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const element_validation_1 = require("../../src/render3/instructions/element_validation");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const testing_2 = require("@angular/private/testing");
describe('NgModule', () => {
    let TestCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                template: 'hello',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestCmp = _classThis = class {
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
    let TestCmp2 = (() => {
        let _classDecorators = [(0, core_1.Component)({
                template: 'hello',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestCmp2 = _classThis = class {
        };
        __setFunctionName(_classThis, "TestCmp2");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TestCmp2 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return TestCmp2 = _classThis;
    })();
    describe('bootstrap', () => {
        it('should throw when specified bootstrap component is not added to a module', () => {
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ bootstrap: [TestCmp, [TestCmp2]] })];
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmp);
                testing_1.TestBed.createComponent(TestCmp2);
            }).toThrowError(/not part of any NgModule/);
        });
        it('should not throw when specified bootstrap component is added to a module', () => {
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [TestCmp, TestCmp2], bootstrap: [TestCmp, [TestCmp2]] })];
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmp);
                testing_1.TestBed.createComponent(TestCmp2);
            }).not.toThrow();
        });
    });
    it('initializes the module imports before the module itself', () => {
        let Service = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Service = _classThis = class {
                constructor() {
                    this.initializations = [];
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
        let RoutesModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [Service] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RoutesModule = _classThis = class {
                constructor(service) {
                    service.initializations.push('RoutesModule');
                }
            };
            __setFunctionName(_classThis, "RoutesModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RoutesModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RoutesModule = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [RoutesModule] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
                constructor(service) {
                    service.initializations.push('AppModule');
                }
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
        testing_1.TestBed.configureTestingModule({ imports: [AppModule] });
        expect(testing_1.TestBed.inject(Service).initializations).toEqual(['RoutesModule', 'AppModule']);
    });
    describe('standalone components, directives, and pipes', () => {
        it('should throw when a standalone component is added to NgModule declarations', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            expect(() => {
                testing_1.TestBed.createComponent(MyComp);
            }).toThrowError(`Unexpected "MyComp" found in the "declarations" array of the "MyModule" NgModule, "MyComp" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`);
        });
        it('should throw when a standalone directive is added to NgModule declarations', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-dir]',
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
                        selector: 'my-comp',
                        template: '',
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyDir],
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], imports: [MyModule] });
            expect(() => {
                testing_1.TestBed.createComponent(MyComp);
            }).toThrowError(`Unexpected "MyDir" found in the "declarations" array of the "MyModule" NgModule, "MyDir" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`);
        });
        it('should throw when a standalone pipe is added to NgModule declarations', () => {
            let MyPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'my-pipe',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyPipe = _classThis = class {
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
                        selector: 'my-comp',
                        template: '',
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyPipe],
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], imports: [MyModule] });
            expect(() => {
                testing_1.TestBed.createComponent(MyComp);
            }).toThrowError(`Unexpected "MyPipe" found in the "declarations" array of the "MyModule" NgModule, "MyPipe" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`);
        });
        it('should throw a testing specific error when a standalone component is added to the configureTestingModule declarations', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
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
            expect(() => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            }).toThrowError(`Unexpected "MyComp" found in the "declarations" array of the "TestBed.configureTestingModule" call, "MyComp" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`);
        });
    });
    describe('destroy', () => {
        beforeEach(core_1.destroyPlatform);
        afterEach(core_1.destroyPlatform);
        it('should clear bootstrapped component contents', (0, testing_2.withBody)('<div>before</div><button></button><div>after</div>', () => __awaiter(void 0, void 0, void 0, function* () {
            let wasOnDestroyCalled = false;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'button',
                        template: 'button content',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    ngOnDestroy() {
                        wasOnDestroyCalled = true;
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
            let AppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule],
                        declarations: [App],
                        bootstrap: [App],
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
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(AppModule);
            const button = document.body.querySelector('button');
            expect(button.textContent).toEqual('button content');
            expect(document.body.childNodes.length).toEqual(3);
            ngModuleRef.destroy();
            expect(wasOnDestroyCalled).toEqual(true);
            expect(document.body.querySelector('button')).toBeFalsy(); // host element is removed
            expect(document.body.childNodes.length).toEqual(2); // other elements are preserved
        })));
    });
    describe('schemas', () => {
        it('should log an error on unknown props if NO_ERRORS_SCHEMA is absent', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ng-container *ngIf="condition">
            <div [unknown-prop]="true"></div>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [common_1.CommonModule],
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'unknown-prop' since it isn't a known property of 'div' \(used in the 'MyComp' component template\)/);
        });
        it('should log an error on unknown props of `ng-template` if NO_ERRORS_SCHEMA is absent', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: ` <ng-template *ngIf="condition"></ng-template> `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'ngIf' since it isn't a known property of 'ng-template' \(used in the 'MyComp' component template\)/);
        });
        it('should log an error on unknown props of `ng-container` if NO_ERRORS_SCHEMA is absent', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: ` <ng-container *ngIf="condition"></ng-container> `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'ngIf' since it isn't a known property of 'ng-container' \(used in the 'MyComp' component template\)/);
        });
        it('should log an error on unknown props of `ng-content` if NO_ERRORS_SCHEMA is absent', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: ` <ng-content *ngIf="condition"></ng-content> `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/Can't bind to 'ngIf' since it isn't a known property of 'ng-content' \(used in the 'MyComp' component template\)/);
        });
        it('should throw an error with errorOnUnknownProperties on unknown props if NO_ERRORS_SCHEMA is absent', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ng-container *ngIf="condition">
            <div [unknown-prop]="true"></div>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [common_1.CommonModule],
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule], errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
            }).toThrowError(/NG0303: Can't bind to 'unknown-prop' since it isn't a known property of 'div' \(used in the 'MyComp' component template\)/g);
        });
        it('should not throw on unknown props if NO_ERRORS_SCHEMA is present', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ng-container *ngIf="condition">
            <div [unknown-prop]="true"></div>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [common_1.CommonModule],
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should not throw on unknown props with errorOnUnknownProperties if NO_ERRORS_SCHEMA is present', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          <ng-container *ngIf="condition">
            <div [unknown-prop]="true"></div>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [common_1.CommonModule],
                        schemas: [core_1.NO_ERRORS_SCHEMA],
                        declarations: [MyComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule], errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should log an error about unknown element without CUSTOM_ELEMENTS_SCHEMA for element with dash in tag name', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/'custom-el' is not a known element/);
        });
        it('should log an error about unknown element for a standalone component without CUSTOM_ELEMENTS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ imports: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/'custom-el' is not a known element/);
        });
        it('should not log an error about unknown element for a standalone component with CUSTOM_ELEMENTS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ imports: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should throw an error about unknown element without CUSTOM_ELEMENTS_SCHEMA for element with dash in tag name', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], errorOnUnknownElements: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
            }).toThrowError(/NG0304: 'custom-el' is not a known element/g);
        });
        it('should log an error about unknown element without CUSTOM_ELEMENTS_SCHEMA for element without dash in tag name', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom></custom>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy.calls.mostRecent().args[0]).toMatch(/'custom' is not a known element/);
        });
        it('should throw an error about unknown element without CUSTOM_ELEMENTS_SCHEMA for element without dash in tag name', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom></custom>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp], errorOnUnknownElements: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
            }).toThrowError(/NG0304: 'custom' is not a known element/g);
        });
        it('should report unknown property bindings on ng-content', () => {
            var _a;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-content *unknownProp="123"></ng-content>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect((_a = spy.calls.mostRecent()) === null || _a === void 0 ? void 0 : _a.args[0]).toMatch(/Can't bind to 'unknownProp' since it isn't a known property of 'ng-content' \(used in the 'App' component template\)/);
        });
        it('should throw an error on unknown property bindings on ng-content when errorOnUnknownProperties is enabled', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-content *unknownProp="123"></ng-content>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App], errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError(/NG0303: Can't bind to 'unknownProp' since it isn't a known property of 'ng-content' \(used in the 'App' component template\)/g);
        });
        it('should report unknown property bindings on ng-container', () => {
            var _a;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-container [unknown-prop]="123"></ng-container>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect((_a = spy.calls.mostRecent()) === null || _a === void 0 ? void 0 : _a.args[0]).toMatch(/Can't bind to 'unknown-prop' since it isn't a known property of 'ng-container' \(used in the 'App' component template\)/);
        });
        it('should throw error on unknown property bindings on ng-container when errorOnUnknownProperties is enabled', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-container [unknown-prop]="123"></ng-container>`,
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
            testing_1.TestBed.configureTestingModule({ declarations: [App], errorOnUnknownProperties: true });
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            }).toThrowError(/NG0303: Can't bind to 'unknown-prop' since it isn't a known property of 'ng-container' \(used in the 'App' component template\)/g);
        });
        it('should log an error on unknown props and include a note on Web Components', () => {
            let MaybeWebComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'may-be-web-component',
                        template: `...`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MaybeWebComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MaybeWebComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MaybeWebComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MaybeWebComp = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `<may-be-web-component [unknownProp]="condition"></may-be-web-component>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = true;
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [MyComp, MaybeWebComp],
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
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const spy = spyOn(console, 'error');
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            const errorMessage = spy.calls.mostRecent().args[0];
            // Split the error message into chunks, so it's easier to debug if needed.
            const lines = [
                `NG0303: Can't bind to 'unknownProp' since it isn't a known property of 'may-be-web-component' \\(used in the 'MyComp' component template\\).`,
                `1. If 'may-be-web-component' is an Angular component and it has the 'unknownProp' input, then verify that it is a part of an @NgModule where this component is declared.`,
                `2. If 'may-be-web-component' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.`,
                `3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.`,
            ];
            lines.forEach((line) => expect(errorMessage).toMatch(line));
        });
        element_validation_1.KNOWN_CONTROL_FLOW_DIRECTIVES.forEach((correspondingImport, directive) => {
            it(`should produce a warning when the '${directive}' directive ` +
                `is used in a template, but not imported in corresponding NgModule`, () => {
                var _a;
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div *${directive}="expr"></div>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.expr = true;
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
                let Module = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [App],
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
                const spy = spyOn(console, 'error');
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const errorMessage = (_a = spy.calls.mostRecent()) === null || _a === void 0 ? void 0 : _a.args[0];
                // Split the error message into chunks, so it's easier to debug if needed.
                const lines = [
                    `NG0303: Can't bind to '${directive}' since it isn't a known property of 'div' \\(used in the 'App' component template\\).`,
                    `If the '${directive}' is an Angular control flow directive, please make sure ` +
                        `that either the '${correspondingImport}' directive or the 'CommonModule' is a part of an @NgModule where this component is declared.`,
                ];
                lines.forEach((line) => expect(errorMessage).toMatch(line));
            });
            it(`should produce a warning when the '${directive}' directive ` +
                `is used in a template, but not imported in a standalone component`, () => {
                var _a;
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `<div *${directive}="expr"></div>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.expr = true;
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
                const spy = spyOn(console, 'error');
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                const errorMessage = (_a = spy.calls.mostRecent()) === null || _a === void 0 ? void 0 : _a.args[0];
                // Split the error message into chunks, so it's easier to debug if needed.
                const lines = [
                    `NG0303: Can't bind to '${directive}' since it isn't a known property of 'div' \\(used in the 'App' component template\\).`,
                    `If the '${directive}' is an Angular control flow directive, please make sure ` +
                        `that either the '${correspondingImport}' directive or the 'CommonModule' is included in the '@Component.imports' of this component.`,
                ];
                lines.forEach((line) => expect(errorMessage).toMatch(line));
            });
        });
        describe('AOT-compiled components', () => {
            function createComponent(template, vars, consts) {
                class Comp {
                }
                Comp.ɵfac = () => new Comp();
                Comp.ɵcmp = (0, core_1.ɵɵdefineComponent)({
                    type: Comp,
                    selectors: [['comp']],
                    decls: 1,
                    vars,
                    consts,
                    template,
                    encapsulation: 2,
                });
                (0, core_1.ɵsetClassMetadata)(Comp, [
                    {
                        type: core_1.Component,
                        args: [{ selector: 'comp', template: '...' }],
                    },
                ], null, null);
                return Comp;
            }
            function createNgModule(Comp) {
                class Module {
                }
                Module.ɵmod = (0, core_1.ɵɵdefineNgModule)({ type: Module });
                Module.ɵinj = (0, core_1.ɵɵdefineInjector)({});
                (0, core_1.ɵsetClassMetadata)(Module, [
                    {
                        type: core_1.NgModule,
                        args: [
                            {
                                declarations: [Comp],
                                schemas: [core_1.NO_ERRORS_SCHEMA],
                            },
                        ],
                    },
                ], null, null);
                return Module;
            }
            it('should not log unknown element warning for AOT-compiled components', () => {
                const spy = spyOn(console, 'warn');
                /*
                 *  @Component({
                 *    selector: 'comp',
                 *    template: '<custom-el></custom-el>',
                 *  })
                 *  class MyComp {}
                 */
                const MyComp = createComponent((rf) => {
                    if (rf & 1) {
                        (0, core_1.ɵɵelement)(0, 'custom-el');
                    }
                }, 0);
                /*
                 *  @NgModule({
                 *    declarations: [MyComp],
                 *    schemas: [NO_ERRORS_SCHEMA],
                 *  })
                 *  class MyModule {}
                 */
                const MyModule = createNgModule(MyComp);
                testing_1.TestBed.configureTestingModule({
                    imports: [MyModule],
                });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should not log unknown property warning for AOT-compiled components', () => {
                const spy = spyOn(console, 'warn');
                /*
                 *  @Component({
                 *    selector: 'comp',
                 *    template: '<div [foo]="1"></div>',
                 *  })
                 *  class MyComp {}
                 */
                const MyComp = createComponent((rf) => {
                    if (rf & 1) {
                        (0, core_1.ɵɵelement)(0, 'div', 0);
                    }
                    if (rf & 2) {
                        (0, core_1.ɵɵproperty)('foo', true);
                    }
                }, 1, [[3, 'foo']]);
                /*
                 *  @NgModule({
                 *    declarations: [MyComp],
                 *    schemas: [NO_ERRORS_SCHEMA],
                 *  })
                 *  class MyModule {}
                 */
                const MyModule = createNgModule(MyComp);
                testing_1.TestBed.configureTestingModule({
                    imports: [MyModule],
                });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                expect(spy).not.toHaveBeenCalled();
            });
        });
        it('should not log an error about unknown elements with CUSTOM_ELEMENTS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not throw an error about unknown elements with CUSTOM_ELEMENTS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                errorOnUnknownElements: true,
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // We do not expect any errors being thrown or logged in a console,
            // since the `CUSTOM_ELEMENTS_SCHEMA` is applied.
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not log an error about unknown elements with NO_ERRORS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not throw an error about unknown elements with NO_ERRORS_SCHEMA', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                schemas: [core_1.NO_ERRORS_SCHEMA],
                errorOnUnknownElements: true,
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // We do not expect any errors being thrown or logged in a console,
            // since the `NO_ERRORS_SCHEMA` is applied.
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not log an error about unknown elements if element matches a directive', () => {
            let CustomEl = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'custom-el',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CustomEl = _classThis = class {
                };
                __setFunctionName(_classThis, "CustomEl");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CustomEl = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CustomEl = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, CustomEl] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not throw an error about unknown elements if element matches a directive', () => {
            let CustomEl = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'custom-el',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CustomEl = _classThis = class {
                };
                __setFunctionName(_classThis, "CustomEl");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CustomEl = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CustomEl = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<custom-el></custom-el>`,
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, CustomEl],
                errorOnUnknownElements: true,
            });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // We do not expect any errors being thrown or logged in a console,
            // since the element matches a directive.
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not log an error for HTML elements inside an SVG foreignObject', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <svg>
            <svg:foreignObject>
              <xhtml:div>Hello</xhtml:div>
            </svg:foreignObject>
          </svg>
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComp] })];
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not throw an error for HTML elements inside an SVG foreignObject', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <svg>
            <svg:foreignObject>
              <xhtml:div>Hello</xhtml:div>
            </svg:foreignObject>
          </svg>
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
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComp] })];
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
            const spy = spyOn(console, 'error');
            testing_1.TestBed.configureTestingModule({ imports: [MyModule], errorOnUnknownElements: true });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // We do not expect any errors being thrown or logged in a console,
            // since the element is inside an SVG foreignObject.
            expect(spy).not.toHaveBeenCalled();
        });
    });
    describe('createNgModule function', () => {
        it('should create an NgModuleRef instance', () => {
            const TOKEN_A = new core_1.InjectionToken('A');
            const TOKEN_B = new core_1.InjectionToken('B');
            let AppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: TOKEN_A, useValue: 'TokenValueA' }],
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
            let ChildModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: TOKEN_B, useValue: 'TokenValueB' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildModule = _classThis;
            })();
            // Simple case, just passing NgModule class.
            const ngModuleRef = (0, core_1.createNgModule)(AppModule);
            expect(ngModuleRef).toBeInstanceOf(core_1.NgModuleRef);
            expect(ngModuleRef.injector.get(TOKEN_A)).toBe('TokenValueA');
            expect(ngModuleRef.injector.get(TOKEN_B, null)).toBe(null);
            // Both NgModule and parent Injector are present.
            const ngModuleRef2 = (0, core_1.createNgModule)(ChildModule, ngModuleRef.injector /* parent injector */);
            expect(ngModuleRef2).toBeInstanceOf(core_1.NgModuleRef);
            expect(ngModuleRef2.injector.get(TOKEN_A)).toBe('TokenValueA');
            expect(ngModuleRef2.injector.get(TOKEN_B)).toBe('TokenValueB');
        });
    });
    it('should be able to use DI through the NgModuleRef inside the module constructor', () => {
        const token = new core_1.InjectionToken('token');
        let value;
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [common_1.CommonModule],
                    providers: [{ provide: token, useValue: 'foo' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(ngRef) {
                    value = ngRef.injector.get(token);
                }
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
        testing_1.TestBed.configureTestingModule({ imports: [TestModule], declarations: [TestCmp] });
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(value).toBe('foo');
    });
    it('should be able to create a component through the ComponentFactoryResolver of an NgModuleRef in a module constructor', () => {
        let componentInstance;
        let MyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [TestCmp],
                    exports: [TestCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyModule = _classThis = class {
                constructor(ngModuleRef) {
                    const factory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(TestCmp);
                    componentInstance = factory.create(ngModuleRef.injector).instance;
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
        testing_1.TestBed.configureTestingModule({ imports: [MyModule] });
        testing_1.TestBed.createComponent(TestCmp);
        expect(componentInstance).toBeInstanceOf(TestCmp);
    });
});
