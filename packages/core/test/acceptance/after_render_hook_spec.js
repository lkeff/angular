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
const platform_id_1 = require("@angular/common/src/platform_id");
const core_1 = require("../../src/core");
const ng_zone_1 = require("../../src/zone/ng_zone");
const testing_1 = require("../../testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const di_1 = require("../../src/di");
function createAndAttachComponent(component) {
    const componentRef = (0, core_1.createComponent)(component, {
        environmentInjector: testing_1.TestBed.inject(di_1.EnvironmentInjector),
    });
    testing_1.TestBed.inject(core_1.ApplicationRef).attachView(componentRef.hostView);
    return componentRef;
}
describe('after render hooks', () => {
    let prev;
    describe('browser', () => {
        const COMMON_PROVIDERS = [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID }];
        const COMMON_CONFIGURATION = {
            providers: [COMMON_PROVIDERS],
        };
        describe('afterRender', () => {
            it('should run with the correct timing', () => {
                let DynamicComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dynamic-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            (0, core_1.afterEveryRender)(() => {
                                this.afterRenderCount++;
                            });
                        }
                    };
                    __setFunctionName(_classThis, "DynamicComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComp = _classThis;
                })();
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                            this.viewContainerRef = (0, core_1.inject)(core_1.ViewContainerRef);
                            (0, core_1.afterEveryRender)(() => {
                                this.afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                const component = createAndAttachComponent(Comp);
                const compInstance = component.instance;
                const viewContainerRef = compInstance.viewContainerRef;
                const dynamicCompRef = viewContainerRef.createComponent(DynamicComp);
                // It hasn't run at all
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the dynamicCompRef level
                dynamicCompRef.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the compInstance level
                compInstance.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the Application level
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(1);
                // Running change detection after removing view.
                viewContainerRef.remove();
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(2);
            });
            it('should run with ComponentFixture.detectChanges', () => {
                let DynamicComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dynamic-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            (0, core_1.afterEveryRender)(() => {
                                this.afterRenderCount++;
                            });
                        }
                    };
                    __setFunctionName(_classThis, "DynamicComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComp = _classThis;
                })();
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                            this.viewContainerRef = (0, core_1.inject)(core_1.ViewContainerRef);
                            (0, core_1.afterEveryRender)(() => {
                                this.afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                const fixture = testing_1.TestBed.createComponent(Comp);
                const compInstance = fixture.componentInstance;
                const viewContainerRef = compInstance.viewContainerRef;
                const dynamicCompRef = viewContainerRef.createComponent(DynamicComp);
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the dynamicCompRef level
                dynamicCompRef.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the compInstance level
                compInstance.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the Application level
                fixture.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(1);
                // Running change detection after removing view.
                viewContainerRef.remove();
                fixture.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(2);
            });
            it('should run all hooks after outer change detection', () => {
                let log = [];
                let ChildComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildComp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)(() => {
                                log.push('child-comp');
                            });
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
                let ParentComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: `<child-comp></child-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentComp = _classThis = class {
                        constructor() {
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                            (0, core_1.afterEveryRender)(() => {
                                log.push('parent-comp');
                            });
                        }
                        ngOnInit() {
                            log.push('pre-cd');
                            this.changeDetectorRef.detectChanges();
                            log.push('post-cd');
                        }
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [ChildComp, ParentComp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(ParentComp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['pre-cd', 'post-cd', 'child-comp', 'parent-comp']);
            });
            it('should run hooks once after tick even if there are multiple root views', () => {
                let log = [];
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: ``,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)(() => {
                                log.push('render');
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
                testing_1.TestBed.configureTestingModule({
                    // NgZone can make counting hard because it runs ApplicationRef.tick automatically.
                    providers: [{ provide: core_1.NgZone, useClass: ng_zone_1.NoopNgZone }, ...COMMON_CONFIGURATION.providers],
                });
                expect(log).toEqual([]);
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                appRef.attachView(testing_1.TestBed.createComponent(MyComp).componentRef.hostView);
                appRef.attachView(testing_1.TestBed.createComponent(MyComp).componentRef.hostView);
                appRef.attachView(testing_1.TestBed.createComponent(MyComp).componentRef.hostView);
                appRef.tick();
                expect(log.length).toEqual(3);
            });
            it('should unsubscribe when calling destroy', () => {
                let hookRef = null;
                let afterRenderCount = 0;
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            hookRef = (0, core_1.afterEveryRender)(() => {
                                afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(afterRenderCount).toBe(0);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(1);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(2);
                hookRef.destroy();
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(2);
            });
            it('should run outside of the Angular zone', () => {
                const zoneLog = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)(() => {
                                zoneLog.push(core_1.NgZone.isInAngularZone());
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(zoneLog).toEqual([]);
                testing_1.TestBed.inject(core_1.NgZone).run(() => {
                    testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                    expect(zoneLog).toEqual([false]);
                });
            });
            it('should propagate errors to the ErrorHandler', () => {
                const log = [];
                let FakeErrorHandler = (() => {
                    let _classDecorators = [(0, di_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = core_1.ErrorHandler;
                    var FakeErrorHandler = _classThis = class extends _classSuper {
                        handleError(error) {
                            log.push(error.message);
                        }
                    };
                    __setFunctionName(_classThis, "FakeErrorHandler");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        FakeErrorHandler = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return FakeErrorHandler = _classThis;
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
                        constructor() {
                            (0, core_1.afterEveryRender)(() => {
                                log.push('pass 1');
                            });
                            (0, core_1.afterEveryRender)(() => {
                                throw new Error('fail 1');
                            });
                            (0, core_1.afterEveryRender)(() => {
                                log.push('pass 2');
                            });
                            (0, core_1.afterEveryRender)(() => {
                                throw new Error('fail 2');
                            });
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
                testing_1.TestBed.configureTestingModule({
                    declarations: [Comp],
                    providers: [COMMON_PROVIDERS, { provide: core_1.ErrorHandler, useClass: FakeErrorHandler }],
                });
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['pass 1', 'fail 1', 'pass 2', 'fail 2']);
            });
            it('should run callbacks in the correct phase and order', () => {
                const log = [];
                let Root = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'root',
                            template: `<comp-a></comp-a><comp-b></comp-b>`,
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
                let CompA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp-a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompA = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => {
                                    log.push('early-read-1');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                write: () => {
                                    log.push('write-1');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write-1');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                read: () => {
                                    log.push('read-1');
                                },
                            });
                        }
                    };
                    __setFunctionName(_classThis, "CompA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompA = _classThis;
                })();
                let CompB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp-b',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompB = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)({
                                read: () => {
                                    log.push('read-2');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write-2');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                write: () => {
                                    log.push('write-2');
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => {
                                    log.push('early-read-2');
                                },
                            });
                        }
                    };
                    __setFunctionName(_classThis, "CompB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompB = _classThis;
                })();
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Root, CompA, CompB] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Root);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'early-read-1',
                    'early-read-2',
                    'write-1',
                    'write-2',
                    'mixed-read-write-1',
                    'mixed-read-write-2',
                    'read-1',
                    'read-2',
                ]);
            });
            it('should schedule callbacks for multiple phases at once', () => {
                const log = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => {
                                    log.push('early-read-1');
                                },
                                write: () => {
                                    log.push('write-1');
                                },
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write-1');
                                },
                                read: () => {
                                    log.push('read-1');
                                },
                            });
                            (0, core_1.afterEveryRender)(() => {
                                log.push('mixed-read-write-2');
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'early-read-1',
                    'write-1',
                    'mixed-read-write-1',
                    'mixed-read-write-2',
                    'read-1',
                ]);
            });
            it('should pass data between phases', () => {
                const log = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => 'earlyRead result',
                                write: (results) => {
                                    log.push(`results for write: ${results}`);
                                    return 5;
                                },
                                mixedReadWrite: (results) => {
                                    log.push(`results for mixedReadWrite: ${results}`);
                                    return undefined;
                                },
                                read: (results) => {
                                    log.push(`results for read: ${results}`);
                                },
                            });
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => 'earlyRead 2 result',
                                read: (results) => {
                                    log.push(`results for read 2: ${results}`);
                                },
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'results for write: earlyRead result',
                    'results for mixedReadWrite: 5',
                    'results for read: undefined',
                    'results for read 2: earlyRead 2 result',
                ]);
            });
            describe('throw error inside reactive context', () => {
                it('inside template effect', () => {
                    let TestCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `{{someFn()}}`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var TestCmp = _classThis = class {
                            someFn() {
                                (0, core_1.afterEveryRender)(() => { });
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
                    expect(() => fixture.detectChanges()).toThrowError(/afterEveryRender\(\) cannot be called from within a reactive context/);
                });
                it('inside computed', () => {
                    const testComputed = (0, core_1.computed)(() => {
                        (0, core_1.afterEveryRender)(() => { });
                    });
                    expect(() => testComputed()).toThrowError(/afterEveryRender\(\) cannot be called from within a reactive context/);
                });
                it('inside effect', () => {
                    let TestCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: ``,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var TestCmp = _classThis = class {
                            constructor() {
                                (0, core_1.effect)(() => {
                                    this.someFnThatWillScheduleAfterRender();
                                });
                            }
                            someFnThatWillScheduleAfterRender() {
                                (0, core_1.afterEveryRender)(() => { });
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
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            {
                                provide: core_1.ErrorHandler,
                                useClass: class extends core_1.ErrorHandler {
                                    handleError(e) {
                                        throw e;
                                    }
                                },
                            },
                        ],
                    });
                    const fixture = testing_1.TestBed.createComponent(TestCmp);
                    expect(() => fixture.detectChanges()).toThrowError(/afterEveryRender\(\) cannot be called from within a reactive context/);
                });
            });
            it('should not destroy automatically if manualCleanup is set', () => {
                let afterRenderRef = null;
                let count = 0;
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ selector: 'comp', template: '', standalone: false })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            afterRenderRef = (0, core_1.afterEveryRender)(() => count++, { manualCleanup: true });
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
                            imports: [Comp],
                            standalone: false,
                            template: `
            @if (shouldShow) {
              <comp/>
            }
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.shouldShow = true;
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [App, Comp] }, COMMON_CONFIGURATION));
                const component = createAndAttachComponent(App);
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                expect(count).toBe(0);
                appRef.tick();
                expect(count).toBe(1);
                component.instance.shouldShow = false;
                component.changeDetectorRef.detectChanges();
                appRef.tick();
                expect(count).toBe(2);
                appRef.tick();
                expect(count).toBe(3);
                // Ensure that manual destruction still works.
                afterRenderRef.destroy();
                appRef.tick();
                expect(count).toBe(3);
            });
        });
        describe('afterNextRender', () => {
            it('should run with the correct timing', () => {
                let DynamicComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'dynamic-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DynamicComp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            (0, core_1.afterNextRender)(() => {
                                this.afterRenderCount++;
                            });
                        }
                    };
                    __setFunctionName(_classThis, "DynamicComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DynamicComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DynamicComp = _classThis;
                })();
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.afterRenderCount = 0;
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                            this.viewContainerRef = (0, core_1.inject)(core_1.ViewContainerRef);
                            (0, core_1.afterNextRender)(() => {
                                this.afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                const component = createAndAttachComponent(Comp);
                const compInstance = component.instance;
                const viewContainerRef = compInstance.viewContainerRef;
                const dynamicCompRef = viewContainerRef.createComponent(DynamicComp);
                // It hasn't run at all
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the dynamicCompRef level
                dynamicCompRef.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the compInstance level
                compInstance.changeDetectorRef.detectChanges();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(0);
                expect(compInstance.afterRenderCount).toBe(0);
                // Running change detection at the Application level
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(1);
                // Running change detection after removing view.
                viewContainerRef.remove();
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(dynamicCompRef.instance.afterRenderCount).toBe(1);
                expect(compInstance.afterRenderCount).toBe(1);
            });
            it('should not run until views have stabilized', () => __awaiter(void 0, void 0, void 0, function* () {
                // This test uses two components, a Reader and Writer, and arranges CD so that Reader
                // is checked, and then Writer makes Reader dirty again. An `afterNextRender` should not run
                // until Reader has been fully refreshed.
                testing_1.TestBed.configureTestingModule(COMMON_CONFIGURATION);
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                const counter = (0, core_1.signal)(0);
                let Reader = (() => {
                    let _classDecorators = [(0, core_1.Component)({ template: '{{counter()}}' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Reader = _classThis = class {
                        constructor() {
                            this.counter = counter;
                        }
                    };
                    __setFunctionName(_classThis, "Reader");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Reader = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Reader = _classThis;
                })();
                let Writer = (() => {
                    let _classDecorators = [(0, core_1.Component)({ template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Writer = _classThis = class {
                        ngAfterViewInit() {
                            counter.set(1);
                        }
                    };
                    __setFunctionName(_classThis, "Writer");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Writer = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Writer = _classThis;
                })();
                const ref = createAndAttachComponent(Reader);
                createAndAttachComponent(Writer);
                let textAtAfterRender = '';
                (0, core_1.afterNextRender)(() => {
                    // Reader should've been fully refreshed, so capture its template state at this moment.
                    textAtAfterRender = ref.location.nativeElement.innerHTML;
                }, { injector: appRef.injector });
                yield appRef.whenStable();
                expect(textAtAfterRender).toBe('1');
            }));
            it('should run all hooks after outer change detection', () => {
                let log = [];
                let ChildComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child-comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ChildComp = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)(() => {
                                log.push('child-comp');
                            });
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
                let ParentComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: `<child-comp></child-comp>`,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ParentComp = _classThis = class {
                        constructor() {
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                            (0, core_1.afterNextRender)(() => {
                                log.push('parent-comp');
                            });
                        }
                        ngOnInit() {
                            log.push('pre-cd');
                            this.changeDetectorRef.detectChanges();
                            log.push('post-cd');
                        }
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [ChildComp, ParentComp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(ParentComp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['pre-cd', 'post-cd', 'child-comp', 'parent-comp']);
            });
            it('should unsubscribe when calling destroy', () => {
                let hookRef = null;
                let afterRenderCount = 0;
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            hookRef = (0, core_1.afterNextRender)(() => {
                                afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(afterRenderCount).toBe(0);
                hookRef.destroy();
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(0);
            });
            it('should throw if called recursively', () => {
                class RethrowErrorHandler extends core_1.ErrorHandler {
                    handleError(error) {
                        throw error;
                    }
                }
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
                            this.injector = (0, core_1.inject)(di_1.EnvironmentInjector);
                        }
                        ngOnInit() {
                            (0, core_1.afterNextRender)(() => {
                                this.appRef.tick();
                            }, { injector: this.injector });
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
                testing_1.TestBed.configureTestingModule(Object.assign(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION), { providers: [
                        { provide: core_1.ErrorHandler, useClass: RethrowErrorHandler },
                        ...COMMON_CONFIGURATION.providers,
                    ] }));
                createAndAttachComponent(Comp);
                expect(() => testing_1.TestBed.inject(core_1.ApplicationRef).tick()).toThrowError(/ApplicationRef.tick is called recursively/);
            });
            it('should process inner hook within same tick with CD in between', () => {
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                            template: `{{outerHookCount()}}:{{innerHookCount}}`,
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            this.injector = (0, core_1.inject)(core_1.Injector);
                            this.outerHookCount = (0, core_1.signal)(0);
                            this.innerHookCount = 0;
                            (0, core_1.afterNextRender)(() => {
                                this.outerHookCount.update((v) => v + 1);
                                (0, core_1.afterNextRender)(() => {
                                    this.innerHookCount++;
                                }, { injector: this.injector });
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                const ref = createAndAttachComponent(Comp);
                const instance = ref.instance;
                // It hasn't run at all
                expect(instance.outerHookCount()).toBe(0);
                expect(instance.innerHookCount).toBe(0);
                // Running change detection (first time)
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(instance.outerHookCount()).toBe(1);
                expect(instance.innerHookCount).toBe(1);
                // In between the inner and outer hook, CD should have run for the component.
                expect(ref.location.nativeElement.innerHTML).toEqual('1:0');
                // Running change detection (second time)
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(instance.outerHookCount()).toBe(1);
                expect(instance.innerHookCount).toBe(1);
            });
            it('should defer view-associated hook until after view is rendered', () => {
                const log = [];
                let Inner = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'inner',
                            standalone: false,
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Inner = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)(() => {
                                log.push('comp hook');
                            });
                        }
                    };
                    __setFunctionName(_classThis, "Inner");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Inner = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Inner = _classThis;
                })();
                let Outer = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'outer',
                            standalone: false,
                            template: '<inner></inner>',
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Outer = _classThis = class {
                        constructor() {
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        }
                    };
                    __setFunctionName(_classThis, "Outer");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Outer = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Outer = _classThis;
                })();
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Inner, Outer] }, COMMON_CONFIGURATION));
                const ref = createAndAttachComponent(Outer);
                ref.instance.changeDetectorRef.detach();
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                (0, core_1.afterNextRender)(() => {
                    log.push('env hook');
                }, { injector: appRef.injector });
                // Initial change detection with component detached.
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['env hook']);
                // Re-attach component and run change detection.
                ref.instance.changeDetectorRef.reattach();
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['env hook', 'comp hook']);
            });
            it('should run outside of the Angular zone', () => {
                const zoneLog = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)(() => {
                                zoneLog.push(core_1.NgZone.isInAngularZone());
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(zoneLog).toEqual([]);
                testing_1.TestBed.inject(core_1.NgZone).run(() => {
                    testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                    expect(zoneLog).toEqual([false]);
                });
            });
            it('should propagate errors to the ErrorHandler', () => {
                const log = [];
                class FakeErrorHandler extends core_1.ErrorHandler {
                    handleError(error) {
                        log.push(error.message);
                    }
                }
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)(() => {
                                log.push('pass 1');
                            });
                            (0, core_1.afterNextRender)(() => {
                                throw new Error('fail 1');
                            });
                            (0, core_1.afterNextRender)(() => {
                                log.push('pass 2');
                            });
                            (0, core_1.afterNextRender)(() => {
                                throw new Error('fail 2');
                            });
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
                testing_1.TestBed.configureTestingModule({
                    declarations: [Comp],
                    providers: [COMMON_PROVIDERS, { provide: core_1.ErrorHandler, useClass: FakeErrorHandler }],
                });
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['pass 1', 'fail 1', 'pass 2', 'fail 2']);
            });
            it('should run callbacks in the correct phase and order', () => {
                const log = [];
                let Root = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'root',
                            template: `<comp-a></comp-a><comp-b></comp-b>`,
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
                let CompA = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp-a',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompA = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)({
                                earlyRead: () => {
                                    log.push('early-read-1');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                write: () => {
                                    log.push('write-1');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write-1');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                read: () => {
                                    log.push('read-1');
                                },
                            });
                        }
                    };
                    __setFunctionName(_classThis, "CompA");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompA = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompA = _classThis;
                })();
                let CompB = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp-b',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompB = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)({
                                read: () => {
                                    log.push('read-2');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write-2');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                write: () => {
                                    log.push('write-2');
                                },
                            });
                            (0, core_1.afterNextRender)({
                                earlyRead: () => {
                                    log.push('early-read-2');
                                },
                            });
                        }
                    };
                    __setFunctionName(_classThis, "CompB");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompB = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompB = _classThis;
                })();
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Root, CompA, CompB] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Root);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'early-read-1',
                    'early-read-2',
                    'write-1',
                    'write-2',
                    'mixed-read-write-1',
                    'mixed-read-write-2',
                    'read-1',
                    'read-2',
                ]);
            });
            it('should invoke all the callbacks once when they are registered at the same time', () => {
                const log = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)({
                                earlyRead: () => {
                                    log.push('early-read');
                                },
                                write: () => {
                                    log.push('write');
                                },
                                mixedReadWrite: () => {
                                    log.push('mixed-read-write');
                                },
                                read: () => {
                                    log.push('read');
                                },
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['early-read', 'write', 'mixed-read-write', 'read']);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual(['early-read', 'write', 'mixed-read-write', 'read']);
            });
            it('should invoke all the callbacks each time when they are registered at the same time', () => {
                const log = [];
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)({
                                earlyRead: () => {
                                    log.push('early-read');
                                    return 'early';
                                },
                                write: (previous) => {
                                    log.push(`previous was ${previous}, this is write`);
                                    return 'write';
                                },
                                mixedReadWrite: (previous) => {
                                    log.push(`previous was ${previous}, this is mixed-read-write`);
                                    return 'mixed';
                                },
                                read: (previous) => {
                                    log.push(`previous was ${previous}, this is read`);
                                    return 'read';
                                },
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                expect(log).toEqual([]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'early-read',
                    'previous was early, this is write',
                    'previous was write, this is mixed-read-write',
                    'previous was mixed, this is read',
                ]);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(log).toEqual([
                    'early-read',
                    'previous was early, this is write',
                    'previous was write, this is mixed-read-write',
                    'previous was mixed, this is read',
                    'early-read',
                    'previous was early, this is write',
                    'previous was write, this is mixed-read-write',
                    'previous was mixed, this is read',
                ]);
            });
        });
        it('allows writing to a signal in afterRender', () => {
            const counter = (0, core_1.signal)(0);
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        template: ` {{counter()}} `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.counter = counter;
                        this.injector = (0, core_1.inject)(di_1.EnvironmentInjector);
                    }
                    ngOnInit() {
                        (0, core_1.afterNextRender)(() => {
                            this.counter.set(1);
                        }, { injector: this.injector });
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
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID }],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            appRef.tick();
            expect(fixture.nativeElement.innerText).toBe('1');
        });
        it('allows updating state and calling markForCheck in afterRender', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        template: ` {{counter}} `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.counter = 0;
                        this.injector = (0, core_1.inject)(di_1.EnvironmentInjector);
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                    ngOnInit() {
                        (0, core_1.afterNextRender)(() => {
                            this.counter = 1;
                            this.cdr.markForCheck();
                        }, { injector: this.injector });
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
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID }],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            yield appRef.whenStable();
            expect(fixture.nativeElement.innerText).toBe('1');
        }));
        it('allows updating state and calling markForCheck in afterRender, outside of change detection', () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = (0, core_1.signal)(0);
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        template: `{{counter()}}`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.injector = (0, core_1.inject)(di_1.EnvironmentInjector);
                        this.counter = counter;
                    }
                    ngOnInit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            // push the render hook to a time outside of change detection
                            yield new Promise((resolve) => setTimeout(resolve));
                            (0, core_1.afterNextRender)(() => {
                                counter.set(1);
                            }, { injector: this.injector });
                        });
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
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID }],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            yield new Promise((resolve) => {
                testing_1.TestBed.runInInjectionContext(() => {
                    (0, core_1.effect)(() => {
                        if (counter() === 1) {
                            resolve();
                        }
                    });
                });
            });
            yield (0, rxjs_1.firstValueFrom)(appRef.isStable.pipe((0, operators_1.filter)((stable) => stable)));
            expect(fixture.nativeElement.innerText).toBe('1');
        }));
        it('throws error when causing infinite updates', () => {
            const counter = (0, core_1.signal)(0);
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        template: ` {{counter()}} `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.counter = counter;
                        this.injector = (0, core_1.inject)(di_1.EnvironmentInjector);
                    }
                    ngOnInit() {
                        (0, core_1.afterEveryRender)(() => {
                            this.counter.update((v) => v + 1);
                        }, { injector: this.injector });
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
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                    {
                        provide: core_1.ErrorHandler,
                        useClass: class extends core_1.ErrorHandler {
                            handleError(error) {
                                throw error;
                            }
                        },
                    },
                ],
            });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            expect(() => {
                appRef.tick();
            }).toThrowError(/NG0103.*(Infinite change detection while refreshing application views)/);
        });
        it('should destroy after the hook has run', () => {
            let hookRef = null;
            let afterRenderCount = 0;
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'comp', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        hookRef = (0, core_1.afterNextRender)(() => {
                            afterRenderCount++;
                        });
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
            testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
            createAndAttachComponent(Comp);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const destroySpy = spyOn(hookRef, 'destroy').and.callThrough();
            expect(afterRenderCount).toBe(0);
            expect(destroySpy).not.toHaveBeenCalled();
            // Run once and ensure that it was called and then cleaned up.
            appRef.tick();
            expect(afterRenderCount).toBe(1);
            expect(destroySpy).toHaveBeenCalledTimes(1);
            // Make sure we're not retaining it.
            appRef.tick();
            expect(afterRenderCount).toBe(1);
            expect(destroySpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('server', () => {
        const COMMON_CONFIGURATION = {
            providers: [{ provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID }],
        };
        beforeAll(() => {
            globalThis['ngServerMode'] = true;
        });
        afterAll(() => {
            globalThis['ngServerMode'] = undefined;
        });
        describe('afterRender', () => {
            it('should not run', () => {
                let afterRenderCount = 0;
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterEveryRender)(() => {
                                afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(0);
            });
        });
        describe('afterNextRender', () => {
            it('should not run', () => {
                let afterRenderCount = 0;
                let Comp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'comp',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Comp = _classThis = class {
                        constructor() {
                            (0, core_1.afterNextRender)(() => {
                                afterRenderCount++;
                            });
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
                testing_1.TestBed.configureTestingModule(Object.assign({ declarations: [Comp] }, COMMON_CONFIGURATION));
                createAndAttachComponent(Comp);
                testing_1.TestBed.inject(core_1.ApplicationRef).tick();
                expect(afterRenderCount).toBe(0);
            });
        });
    });
});
