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
const profiler_1 = require("../../src/render3/profiler");
const testing_1 = require("../../testing");
const core_1 = require("../../src/core");
describe('profiler', () => {
    class TestProfiler {
        profile() { }
    }
    let profilerSpy;
    beforeEach(() => {
        const profiler = new TestProfiler();
        profilerSpy = spyOn(profiler, 'profile').and.callThrough();
        (0, profiler_1.setProfiler)(profiler.profile);
    });
    afterAll(() => (0, profiler_1.setProfiler)(null));
    function findProfilerCall(condition) {
        let predicate = (_) => true;
        if (typeof condition !== 'function') {
            predicate = (args) => args[0] === condition;
        }
        else {
            predicate = condition;
        }
        return profilerSpy.calls
            .all()
            .map((call) => call.args)
            .find(predicate);
    }
    describe('change detection hooks', () => {
        it('should call the profiler for creation and change detection', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<button (click)="onClick()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    onClick() { }
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            expect(profilerSpy).toHaveBeenCalled();
            const templateCreateStart = findProfilerCall((args) => args[0] === 0 /* ProfilerEvent.TemplateCreateStart */ && args[1] === fixture.componentInstance);
            const templateCreateEnd = findProfilerCall((args) => args[0] === 1 /* ProfilerEvent.TemplateCreateEnd */ && args[1] === fixture.componentInstance);
            expect(templateCreateStart).toBeTruthy();
            expect(templateCreateEnd).toBeTruthy();
            fixture.detectChanges();
            const templateUpdateStart = findProfilerCall((args) => args[0] === 2 /* ProfilerEvent.TemplateUpdateStart */ && args[1] === fixture.componentInstance);
            const templateUpdateEnd = findProfilerCall((args) => args[0] === 3 /* ProfilerEvent.TemplateUpdateEnd */ && args[1] === fixture.componentInstance);
            expect(templateUpdateStart).toBeTruthy();
            expect(templateUpdateEnd).toBeTruthy();
        });
        it('should invoke the profiler when the template throws', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'my-comp', template: '{{ throw() }}', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    throw() {
                        throw new Error();
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
            let myComp;
            expect(() => {
                const fixture = testing_1.TestBed.createComponent(MyComponent);
                myComp = fixture.componentInstance;
                fixture.detectChanges();
            }).toThrow();
            expect(profilerSpy).toHaveBeenCalled();
            const templateCreateStart = findProfilerCall((args) => args[0] === 0 /* ProfilerEvent.TemplateCreateStart */ && args[1] === myComp);
            const templateCreateEnd = findProfilerCall((args) => args[0] === 1 /* ProfilerEvent.TemplateCreateEnd */ && args[1] === myComp);
            expect(templateCreateStart).toBeTruthy();
            expect(templateCreateEnd).toBeTruthy();
        });
    });
    describe('outputs and events', () => {
        it('should invoke the profiler on event handler', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<button (click)="onClick()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    onClick() { }
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            const myComp = fixture.componentInstance;
            const clickSpy = spyOn(myComp, 'onClick');
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(clickSpy).toHaveBeenCalled();
            const outputStart = findProfilerCall(6 /* ProfilerEvent.OutputStart */);
            const outputEnd = findProfilerCall(7 /* ProfilerEvent.OutputEnd */);
            expect(outputStart[1]).toEqual(myComp);
            expect(outputEnd[1]).toEqual(myComp);
        });
        it('should invoke the profiler on event handler even when it throws', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<button (click)="onClick()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    onClick() {
                        throw new Error();
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
            const handler = new core_1.ErrorHandler();
            const errorSpy = spyOn(handler, 'handleError');
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                declarations: [MyComponent],
                providers: [{ provide: core_1.ErrorHandler, useValue: handler }],
            });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            const myComp = fixture.componentInstance;
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(errorSpy).toHaveBeenCalled();
            const outputStart = findProfilerCall(6 /* ProfilerEvent.OutputStart */);
            const outputEnd = findProfilerCall(7 /* ProfilerEvent.OutputEnd */);
            expect(outputStart[1]).toEqual(myComp);
            expect(outputEnd[1]).toEqual(myComp);
        });
        it('should invoke the profiler on output handler execution', () => __awaiter(void 0, void 0, void 0, function* () {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'child', template: '', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _childEvent_decorators;
                let _childEvent_initializers = [];
                let _childEvent_extraInitializers = [];
                var Child = _classThis = class {
                    constructor() {
                        this.childEvent = __runInitializers(this, _childEvent_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _childEvent_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _childEvent_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _childEvent_decorators, { kind: "field", name: "childEvent", static: false, private: false, access: { has: obj => "childEvent" in obj, get: obj => obj.childEvent, set: (obj, value) => { obj.childEvent = value; } }, metadata: _metadata }, _childEvent_initializers, _childEvent_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<child (childEvent)="onEvent()"></child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _child_decorators;
                let _child_initializers = [];
                let _child_extraInitializers = [];
                var MyComponent = _classThis = class {
                    onEvent() { }
                    constructor() {
                        this.child = __runInitializers(this, _child_initializers, void 0);
                        __runInitializers(this, _child_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _child_decorators = [(0, core_1.ViewChild)(Child)];
                    __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, Child] });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            const myComp = fixture.componentInstance;
            fixture.detectChanges();
            myComp.child.childEvent.emit();
            const outputStart = findProfilerCall(6 /* ProfilerEvent.OutputStart */);
            const outputEnd = findProfilerCall(7 /* ProfilerEvent.OutputEnd */);
            expect(outputStart[1]).toEqual(myComp);
            expect(outputEnd[1]).toEqual(myComp);
        }));
    });
    describe('lifecycle hooks', () => {
        it('should call the profiler on lifecycle execution', () => {
            class Service {
                ngOnDestroy() { }
            }
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '{{prop}}',
                        providers: [Service],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _prop_decorators;
                let _prop_initializers = [];
                let _prop_extraInitializers = [];
                var MyComponent = _classThis = class {
                    constructor(service) {
                        this.service = service;
                        this.prop = __runInitializers(this, _prop_initializers, 1);
                        __runInitializers(this, _prop_extraInitializers);
                        this.service = service;
                    }
                    ngOnInit() { }
                    ngDoCheck() { }
                    ngOnDestroy() { }
                    ngOnChanges() { }
                    ngAfterViewInit() { }
                    ngAfterViewChecked() { }
                    ngAfterContentInit() { }
                    ngAfterContentChecked() { }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _prop_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _prop_decorators, { kind: "field", name: "prop", static: false, private: false, access: { has: obj => "prop" in obj, get: obj => obj.prop, set: (obj, value) => { obj.prop = value; } }, metadata: _metadata }, _prop_initializers, _prop_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            let MyParent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-parent',
                        template: '<my-comp [prop]="prop"></my-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _child_decorators;
                let _child_initializers = [];
                let _child_extraInitializers = [];
                var MyParent = _classThis = class {
                    constructor() {
                        this.prop = 1;
                        this.child = __runInitializers(this, _child_initializers, void 0);
                        __runInitializers(this, _child_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _child_decorators = [(0, core_1.ViewChild)(MyComponent)];
                    __esDecorate(null, null, _child_decorators, { kind: "field", name: "child", static: false, private: false, access: { has: obj => "child" in obj, get: obj => obj.child, set: (obj, value) => { obj.child = value; } }, metadata: _metadata }, _child_initializers, _child_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyParent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyParent, MyComponent] });
            const fixture = testing_1.TestBed.createComponent(MyParent);
            fixture.detectChanges();
            const myParent = fixture.componentInstance;
            const myComp = fixture.componentInstance.child;
            const ngOnInitStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngOnInit);
            const ngOnInitEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngOnInit);
            expect(ngOnInitStart).toBeTruthy();
            expect(ngOnInitEnd).toBeTruthy();
            const ngOnDoCheckStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngDoCheck);
            const ngOnDoCheckEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngDoCheck);
            expect(ngOnDoCheckStart).toBeTruthy();
            expect(ngOnDoCheckEnd).toBeTruthy();
            const ngAfterViewInitStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngAfterViewInit);
            const ngAfterViewInitEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngAfterViewInit);
            expect(ngAfterViewInitStart).toBeTruthy();
            expect(ngAfterViewInitEnd).toBeTruthy();
            const ngAfterViewCheckedStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngAfterViewChecked);
            const ngAfterViewCheckedEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngAfterViewChecked);
            expect(ngAfterViewCheckedStart).toBeTruthy();
            expect(ngAfterViewCheckedEnd).toBeTruthy();
            const ngAfterContentInitStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngAfterContentInit);
            const ngAfterContentInitEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngAfterContentInit);
            expect(ngAfterContentInitStart).toBeTruthy();
            expect(ngAfterContentInitEnd).toBeTruthy();
            const ngAfterContentCheckedStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngAfterContentChecked);
            const ngAfterContentChecked = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngAfterContentChecked);
            expect(ngAfterContentCheckedStart).toBeTruthy();
            expect(ngAfterContentChecked).toBeTruthy();
            // Verify we call `ngOnChanges` and the corresponding profiler hooks
            const onChangesSpy = spyOn(myComp, 'ngOnChanges');
            profilerSpy.calls.reset();
            myParent.prop = 2;
            fixture.detectChanges();
            const ngOnChangesStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ &&
                args[2] &&
                args[2].name &&
                args[2].name.indexOf('OnChangesHook') >= 0);
            const ngOnChangesEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ &&
                args[2] &&
                args[2].name &&
                args[2].name.indexOf('OnChangesHook') >= 0);
            expect(onChangesSpy).toHaveBeenCalled();
            expect(ngOnChangesStart).toBeTruthy();
            expect(ngOnChangesEnd).toBeTruthy();
            fixture.destroy();
            const ngOnDestroyStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === myComp.ngOnDestroy);
            const ngOnDestroyEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === myComp.ngOnDestroy);
            expect(ngOnDestroyStart).toBeTruthy();
            expect(ngOnDestroyEnd).toBeTruthy();
            const serviceNgOnDestroyStart = findProfilerCall((args) => args[0] === 4 /* ProfilerEvent.LifecycleHookStart */ && args[2] === Service.prototype.ngOnDestroy);
            const serviceNgOnDestroyEnd = findProfilerCall((args) => args[0] === 5 /* ProfilerEvent.LifecycleHookEnd */ && args[2] === Service.prototype.ngOnDestroy);
            expect(serviceNgOnDestroyStart).toBeTruthy();
            expect(serviceNgOnDestroyEnd).toBeTruthy();
        });
        it('should call the profiler on lifecycle execution even after error', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'my-comp', template: '', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    ngOnInit() {
                        throw new Error();
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
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            expect(() => {
                fixture.detectChanges();
            }).toThrow();
            const lifecycleStart = findProfilerCall(4 /* ProfilerEvent.LifecycleHookStart */);
            const lifecycleEnd = findProfilerCall(5 /* ProfilerEvent.LifecycleHookEnd */);
            expect(lifecycleStart).toBeTruthy();
            expect(lifecycleEnd).toBeTruthy();
        });
    });
    describe('entry point events', () => {
        class EventRecordingProfiler {
            constructor() {
                this.events = [];
                this.profile = (event, instance, eventFn) => {
                    this.events.push(event);
                };
            }
            clearEvents() {
                this.events.length = 0;
            }
            hasEvents(...events) {
                for (const e of events) {
                    if (this.events.indexOf(e) === -1) {
                        return false;
                    }
                }
                return true;
            }
        }
        let p;
        beforeEach(() => {
            p = new EventRecordingProfiler();
            (0, profiler_1.setProfiler)(p.profile);
        });
        afterEach(() => {
            (0, profiler_1.setProfiler)(null);
        });
        it('should capture component creation and change detection entry points', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'my-comp', template: '' })];
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
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            expect(p.events).toEqual([
                22 /* ProfilerEvent.DynamicComponentStart */,
                18 /* ProfilerEvent.ComponentStart */,
                0 /* ProfilerEvent.TemplateCreateStart */,
                1 /* ProfilerEvent.TemplateCreateEnd */,
                19 /* ProfilerEvent.ComponentEnd */,
                23 /* ProfilerEvent.DynamicComponentEnd */,
                12 /* ProfilerEvent.ChangeDetectionStart */,
                14 /* ProfilerEvent.ChangeDetectionSyncStart */,
                15 /* ProfilerEvent.ChangeDetectionSyncEnd */,
                13 /* ProfilerEvent.ChangeDetectionEnd */,
            ]);
            p.clearEvents();
            fixture.detectChanges(false);
            expect(p.hasEvents(2 /* ProfilerEvent.TemplateUpdateStart */, 3 /* ProfilerEvent.TemplateUpdateEnd */)).toBeTrue();
        });
        it('should invoke a profiler when host bindings are evaluated', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        host: {
                            '[id]': '"someId"',
                        },
                        template: '',
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
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            fixture.detectChanges();
            expect(p.hasEvents(24 /* ProfilerEvent.HostBindingsUpdateStart */, 25 /* ProfilerEvent.HostBindingsUpdateEnd */)).toBeTrue();
        });
        it('should invoke a profiler when after render hooks are executing', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor() {
                        this.arRef = (0, core_1.afterEveryRender)(() => { });
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
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            fixture.detectChanges();
            expect(p.hasEvents(16 /* ProfilerEvent.AfterRenderHooksStart */, 17 /* ProfilerEvent.AfterRenderHooksEnd */)).toBeTrue();
        });
        it('should invoke a profiler when defer block transitions between states', () => {
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: `
          @defer (on immediate) {
            nothing to see here...
          } 
        `,
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
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            fixture.detectChanges();
            expect(p.hasEvents(20 /* ProfilerEvent.DeferBlockStateStart */, 21 /* ProfilerEvent.DeferBlockStateEnd */)).toBeTrue();
        });
    });
});
describe('profiler activation and removal', () => {
    it('should allow adding and removing multiple profilers', () => {
        const events = [];
        const r1 = (0, profiler_1.setProfiler)((e) => events.push('P1: ' + e));
        const r2 = (0, profiler_1.setProfiler)((e) => events.push('P2: ' + e));
        (0, profiler_1.profiler)(0 /* ProfilerEvent.TemplateCreateStart */);
        expect(events).toEqual(['P1: 0', 'P2: 0']);
        r1();
        (0, profiler_1.profiler)(1 /* ProfilerEvent.TemplateCreateEnd */);
        expect(events).toEqual(['P1: 0', 'P2: 0', 'P2: 1']);
        r2();
        (0, profiler_1.profiler)(0 /* ProfilerEvent.TemplateCreateStart */);
        expect(events).toEqual(['P1: 0', 'P2: 0', 'P2: 1']);
    });
    it('should not add / remove the same profiler twice', () => {
        const events = [];
        const p1 = (e) => events.push('P1: ' + e);
        const r1 = (0, profiler_1.setProfiler)(p1);
        const r2 = (0, profiler_1.setProfiler)(p1);
        (0, profiler_1.profiler)(0 /* ProfilerEvent.TemplateCreateStart */);
        expect(events).toEqual(['P1: 0']);
        r1();
        (0, profiler_1.profiler)(0 /* ProfilerEvent.TemplateCreateStart */);
        expect(events).toEqual(['P1: 0']);
        // subsequent removals should be noop
        r1();
        r2();
    });
    it('should clear all profilers when passing null', () => {
        const events = [];
        (0, profiler_1.setProfiler)((e) => events.push('P1: ' + e));
        (0, profiler_1.setProfiler)((e) => events.push('P2: ' + e));
        (0, profiler_1.profiler)(0 /* ProfilerEvent.TemplateCreateStart */);
        expect(events).toEqual(['P1: 0', 'P2: 0']);
        // clear all profilers
        (0, profiler_1.setProfiler)(null);
        (0, profiler_1.profiler)(1 /* ProfilerEvent.TemplateCreateEnd */);
        expect(events).toEqual(['P1: 0', 'P2: 0']);
    });
});
