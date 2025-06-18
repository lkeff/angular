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
const platform_id_1 = require("@angular/common/src/platform_id");
const core_1 = require("../src/core");
const rxjs_interop_1 = require("../rxjs-interop");
const testing_1 = require("../testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/private/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const errors_1 = require("../src/errors");
const callback_scheduler_1 = require("../src/util/callback_scheduler");
const zoneless_scheduling_impl_1 = require("../src/change_detection/scheduling/zoneless_scheduling_impl");
const global_1 = require("../src/util/global");
const animations_1 = require("@angular/platform-browser/animations");
function isStable(injector = testing_1.TestBed.inject(core_1.EnvironmentInjector)) {
    return (0, rxjs_interop_1.toSignal)(injector.get(core_1.ApplicationRef).isStable, { requireSync: true, injector })();
}
describe('Angular with zoneless enabled', () => {
    function createFixture(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const fixture = testing_1.TestBed.createComponent(type);
            yield fixture.whenStable();
            return fixture;
        });
    }
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, core_1.provideZonelessChangeDetection)(),
                { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
            ],
        });
    });
    describe('notifies scheduler', () => {
        it('contributes to application stableness', () => __awaiter(void 0, void 0, void 0, function* () {
            const val = (0, core_1.signal)('initial');
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val()}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = val;
                    }
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
            const fixture = yield createFixture(TestComponent);
            // Cause another pending CD immediately after render and verify app has not stabilized
            yield fixture.whenStable().then(() => {
                val.set('new');
            });
            expect(fixture.isStable()).toBeFalse();
            yield fixture.whenStable();
            expect(fixture.isStable()).toBeTrue();
        }));
        it('when signal updates', () => __awaiter(void 0, void 0, void 0, function* () {
            const val = (0, core_1.signal)('initial');
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val()}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = val;
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            val.set('new');
            expect(fixture.isStable()).toBeFalse();
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('when using markForCheck()', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        this.val = 'initial';
                    }
                    setVal(val) {
                        this.val = val;
                        this.cdr.markForCheck();
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            fixture.componentInstance.setVal('new');
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('on input binding', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _val_decorators;
                let _val_initializers = [];
                let _val_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = __runInitializers(this, _val_initializers, 'initial');
                        __runInitializers(this, _val_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _val_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _val_decorators, { kind: "field", name: "val", static: false, private: false, access: { has: obj => "val" in obj, get: obj => obj.val, set: (obj, value) => { obj.val = value; } }, metadata: _metadata }, _val_initializers, _val_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            fixture.componentRef.setInput('val', 'new');
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('on event listener bound in template', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<div (click)="updateVal()">{{val}}</div>' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = 'initial';
                    }
                    updateVal() {
                        this.val = 'new';
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            fixture.debugElement
                .query((p) => p.nativeElement.tagName === 'DIV')
                .triggerEventHandler('click');
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('on event listener bound in host', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ host: { '(click)': 'updateVal()' }, template: '{{val}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = 'initial';
                    }
                    updateVal() {
                        this.val = 'new';
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            fixture.debugElement.triggerEventHandler('click');
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('with async pipe', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val | async}}', imports: [common_1.AsyncPipe] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = new rxjs_1.BehaviorSubject('initial');
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            fixture.componentInstance.val.next('new');
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('new');
        }));
        it('when creating a view', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template #ref>{{"binding"}}</ng-template>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                var TestComponent = _classThis = class {
                    createView() {
                        this.viewContainer.createEmbeddedView(this.template);
                    }
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.viewContainer = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _viewContainer_initializers, void 0));
                        __runInitializers(this, _viewContainer_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                    _viewContainer_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = yield createFixture(TestComponent);
            fixture.componentInstance.createView();
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('binding');
        }));
        it('when inserting a view', () => __awaiter(void 0, void 0, void 0, function* () {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{"binding"}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    }
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
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template #ref></ng-template>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                        __runInitializers(this, _viewContainer_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainer_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = yield createFixture(TestComponent);
            const otherComponent = (0, core_1.createComponent)(DynamicCmp, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            fixture.componentInstance.viewContainer.insert(otherComponent.hostView);
            expect(fixture.isStable()).toBe(false);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('binding');
        }));
        it('when destroying a view (with animations)', () => __awaiter(void 0, void 0, void 0, function* () {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{"binding"}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    }
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
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template #ref></ng-template>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                        __runInitializers(this, _viewContainer_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainer_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const fixture = yield createFixture(TestComponent);
            const component = (0, core_1.createComponent)(DynamicCmp, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            fixture.componentInstance.viewContainer.insert(component.hostView);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('binding');
            fixture.componentInstance.viewContainer.remove();
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('');
            const component2 = (0, core_1.createComponent)(DynamicCmp, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            fixture.componentInstance.viewContainer.insert(component2.hostView);
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('binding');
            component2.destroy();
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('');
        }));
        function whenStable() {
            return testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        }
        it('when destroying a view (*no* animations)', (0, testing_2.withBody)('<app></app>', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, core_1.destroyPlatform)();
            let doCheckCount = 0;
            let renderHookCalls = 0;
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{"binding"}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    }
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: '<ng-template #ref></ng-template>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                        this.unused = (__runInitializers(this, _viewContainer_extraInitializers), (0, core_1.afterEveryRender)(() => {
                            renderHookCalls++;
                        }));
                    }
                    ngDoCheck() {
                        doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainer_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const applicationRef = yield (0, platform_browser_1.bootstrapApplication)(App, {
                providers: [
                    (0, core_1.provideZonelessChangeDetection)(),
                    { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                ],
            });
            const appViewRef = applicationRef._views[0];
            yield applicationRef.whenStable();
            const component2 = (0, core_1.createComponent)(DynamicCmp, {
                environmentInjector: applicationRef.injector,
            });
            appViewRef.context.viewContainer.insert(component2.hostView);
            expect(isStable(applicationRef.injector)).toBe(false);
            yield applicationRef.whenStable();
            component2.destroy();
            // destroying the view synchronously removes element from DOM when not using animations
            expect(appViewRef.rootNodes[0].innerText).toEqual('');
            // Destroying the view notifies scheduler because render hooks need to run
            expect(isStable(applicationRef.injector)).toBe(false);
            let checkCountBeforeStable = doCheckCount;
            let renderCountBeforeStable = renderHookCalls;
            yield applicationRef.whenStable();
            // The view should not have refreshed
            expect(doCheckCount).toEqual(checkCountBeforeStable);
            // but render hooks should have run
            expect(renderHookCalls).toEqual(renderCountBeforeStable + 1);
            (0, core_1.destroyPlatform)();
        })));
        it('when attaching view to ApplicationRef', () => __awaiter(void 0, void 0, void 0, function* () {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmp',
                        template: '{{"binding"}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    }
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
            const environmentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const component = (0, core_1.createComponent)(DynamicCmp, { environmentInjector });
            const host = document.createElement('div');
            host.appendChild(component.instance.elementRef.nativeElement);
            expect(host.innerHTML).toEqual('<dynamic-cmp></dynamic-cmp>');
            appRef.attachView(component.hostView);
            yield whenStable();
            expect(host.innerHTML).toEqual('<dynamic-cmp>binding</dynamic-cmp>');
            const component2 = (0, core_1.createComponent)(DynamicCmp, { environmentInjector });
            appRef.attachView(component2.hostView);
            appRef.detachView(component.hostView);
            expect(isStable()).toBe(false);
            yield whenStable();
            expect(host.innerHTML).toEqual('');
            host.appendChild(component.instance.elementRef.nativeElement);
            // reattaching non-dirty view notifies scheduler because afterRender hooks must run
            appRef.attachView(component.hostView);
            expect(isStable()).toBe(false);
        }));
        it('when attaching view to ApplicationRef with animations', (0, testing_2.withBody)('<app></app>', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, core_1.destroyPlatform)();
            let DynamicComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        template: `<p>Component created</p>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicComponent = _classThis = class {
                    constructor() {
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                };
                __setFunctionName(_classThis, "DynamicComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicComponent = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        standalone: true,
                        template: `<main #outlet></main>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _outlet_decorators;
                let _outlet_initializers = [];
                let _outlet_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.outlet = __runInitializers(this, _outlet_initializers, void 0);
                        this.envInjector = (__runInitializers(this, _outlet_extraInitializers), (0, core_1.inject)(core_1.EnvironmentInjector));
                        this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
                        this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    }
                    createComponent() {
                        const host = document.createElement('div');
                        this.outlet.nativeElement.appendChild(host);
                        const ref = (0, core_1.createComponent)(DynamicComponent, {
                            environmentInjector: this.envInjector,
                            hostElement: host,
                        });
                        this.appRef.attachView(ref.hostView);
                        return ref;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _outlet_decorators = [(0, core_1.ViewChild)('outlet')];
                    __esDecorate(null, null, _outlet_decorators, { kind: "field", name: "outlet", static: false, private: false, access: { has: obj => "outlet" in obj, get: obj => obj.outlet, set: (obj, value) => { obj.outlet = value; } }, metadata: _metadata }, _outlet_initializers, _outlet_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const applicationRef = yield (0, platform_browser_1.bootstrapApplication)(App, {
                providers: [
                    (0, core_1.provideZonelessChangeDetection)(),
                    (0, animations_1.provideNoopAnimations)(),
                    { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                ],
            });
            const component = applicationRef.components[0];
            const appNativeElement = component.instance.elementRef.nativeElement;
            yield applicationRef.whenStable();
            expect(appNativeElement.innerHTML).toEqual('<main></main>');
            const ref = component.instance.createComponent();
            yield applicationRef.whenStable();
            expect(appNativeElement.innerHTML).toContain('<p>Component created</p>');
            // Similating a case where invoking destroy also schedules a CD.
            ref.instance.cdr.markForCheck();
            ref.destroy();
            // DOM is not synchronously removed because change detection hasn't run
            expect(appNativeElement.innerHTML).toContain('<p>Component created</p>');
            yield applicationRef.whenStable();
            expect(isStable()).toBe(true);
            expect(appNativeElement.innerHTML).toEqual('<main></main>');
        })));
        it('when a stable subscription synchronously causes another notification', () => __awaiter(void 0, void 0, void 0, function* () {
            const val = (0, core_1.signal)('initial');
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '{{val()}}' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.val = val;
                    }
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
            const fixture = yield createFixture(TestComponent);
            expect(fixture.nativeElement.innerText).toEqual('initial');
            val.set('new');
            yield testing_1.TestBed.inject(core_1.ApplicationRef)
                .isStable.pipe((0, operators_1.filter)((stable) => stable), (0, operators_1.take)(1), (0, operators_1.tap)(() => val.set('newer')))
                .toPromise();
            yield fixture.whenStable();
            expect(fixture.nativeElement.innerText).toEqual('newer');
        }));
        it('executes render hooks when a new one is registered', () => __awaiter(void 0, void 0, void 0, function* () {
            let resolveFn;
            let calledPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
            testing_1.TestBed.runInInjectionContext(() => {
                (0, core_1.afterNextRender)(() => {
                    resolveFn();
                });
            });
            yield expectAsync(calledPromise).toBeResolved();
        }));
        it('executes render hooks without refreshing CheckAlways views', () => __awaiter(void 0, void 0, void 0, function* () {
            let checks = 0;
            let Dummy = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dummy = _classThis = class {
                    ngDoCheck() {
                        checks++;
                    }
                };
                __setFunctionName(_classThis, "Dummy");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dummy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dummy = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Dummy);
            yield fixture.whenStable();
            expect(checks).toBe(1);
            let resolveFn;
            let calledPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
            testing_1.TestBed.runInInjectionContext(() => {
                (0, core_1.afterNextRender)(() => {
                    resolveFn();
                });
            });
            yield expectAsync(calledPromise).toBeResolved();
            // render hooks was called but component was not refreshed
            expect(checks).toBe(1);
        }));
    });
    it('can recover when an error is re-thrown by the ErrorHandler', () => __awaiter(void 0, void 0, void 0, function* () {
        const val = (0, core_1.signal)('initial');
        let throwError = false;
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{val()}}{{maybeThrow()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.val = val;
                }
                maybeThrow() {
                    if (throwError) {
                        throw new Error('e');
                    }
                    else {
                        return '';
                    }
                }
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
        testing_1.TestBed.configureTestingModule({
            providers: [
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
        const fixture = yield createFixture(TestComponent);
        expect(fixture.nativeElement.innerText).toEqual('initial');
        val.set('new');
        throwError = true;
        // error is thrown in a timeout and can't really be "caught".
        // Still need to wrap in expect so it happens in the expect context and doesn't fail the test.
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield fixture.whenStable(); })).not.toThrow();
        expect(fixture.nativeElement.innerText).toEqual('initial');
        throwError = false;
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toEqual('new');
    }));
    it('change detects embedded view when attached to a host on ApplicationRef and declaration is marked for check', () => __awaiter(void 0, void 0, void 0, function* () {
        let DynamicCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #template><div>{{thing}}</div></ng-template>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var DynamicCmp = _classThis = class {
                constructor() {
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.thing = (__runInitializers(this, _templateRef_extraInitializers), 'initial');
                }
            };
            __setFunctionName(_classThis, "DynamicCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)('template')];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicCmp = _classThis;
        })();
        let Host = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Host = _classThis = class {
                constructor() {
                    this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                }
            };
            __setFunctionName(_classThis, "Host");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Host = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Host = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(DynamicCmp);
        const host = (0, core_1.createComponent)(Host, { environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector) });
        testing_1.TestBed.inject(core_1.ApplicationRef).attachView(host.hostView);
        yield fixture.whenStable();
        const embeddedViewRef = fixture.componentInstance.templateRef.createEmbeddedView({});
        host.instance.vcr.insert(embeddedViewRef);
        yield fixture.whenStable();
        expect(embeddedViewRef.rootNodes[0].innerHTML).toContain('initial');
        fixture.componentInstance.thing = 'new';
        fixture.changeDetectorRef.markForCheck();
        yield fixture.whenStable();
        expect(embeddedViewRef.rootNodes[0].innerHTML).toContain('new');
    }));
    it('change detects embedded view when attached directly to ApplicationRef and declaration is marked for check', () => __awaiter(void 0, void 0, void 0, function* () {
        let DynamicCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #template><div>{{thing}}</div></ng-template>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var DynamicCmp = _classThis = class {
                constructor() {
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.thing = (__runInitializers(this, _templateRef_extraInitializers), 'initial');
                }
            };
            __setFunctionName(_classThis, "DynamicCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)('template')];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DynamicCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DynamicCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(DynamicCmp);
        yield fixture.whenStable();
        const embeddedViewRef = fixture.componentInstance.templateRef.createEmbeddedView({});
        testing_1.TestBed.inject(core_1.ApplicationRef).attachView(embeddedViewRef);
        yield fixture.whenStable();
        expect(embeddedViewRef.rootNodes[0].innerHTML).toContain('initial');
        fixture.componentInstance.thing = 'new';
        fixture.changeDetectorRef.markForCheck();
        yield fixture.whenStable();
        expect(embeddedViewRef.rootNodes[0].innerHTML).toContain('new');
    }));
    it('does not fail when global timing functions are patched and unpatched', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
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
        let patched = false;
        const originalSetTimeout = global_1.global.setTimeout;
        global_1.global.setTimeout = (handler) => {
            if (!patched) {
                throw new Error('no longer patched');
            }
            originalSetTimeout(handler);
        };
        patched = true;
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        global_1.global.setTimeout = originalSetTimeout;
        patched = false;
        expect(() => {
            // cause another scheduler notification. This should not fail due to `setTimeout` being
            // unpatched.
            fixture.componentInstance.cdr.markForCheck();
        }).not.toThrow();
        yield fixture.whenStable();
    }));
    it('should not run change detection twice if manual tick called when CD was scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
        let changeDetectionRuns = 0;
        testing_1.TestBed.runInInjectionContext(() => {
            (0, core_1.afterEveryRender)(() => {
                changeDetectionRuns++;
            });
        });
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
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
        yield fixture.whenStable();
        expect(changeDetectionRuns).toEqual(1);
        // notify the scheduler
        fixture.componentInstance.cdr.markForCheck();
        // call tick manually
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        yield fixture.whenStable();
        // ensure we only ran render hook 1 more time rather than once for tick and once for the
        // scheduled run
        expect(changeDetectionRuns).toEqual(2);
    }));
    it('coalesces microtasks that happen during change detection into a single paint', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!isBrowser) {
            return;
        }
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{thing}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = 'initial';
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                ngAfterViewInit() {
                    queueMicrotask(() => {
                        this.thing = 'new';
                        this.cdr.markForCheck();
                    });
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield new Promise((resolve) => (0, callback_scheduler_1.scheduleCallbackWithRafRace)(resolve));
        expect(fixture.nativeElement.innerText).toContain('new');
    }));
    it('throws a nice error when notifications prevent exiting the event loop (infinite CD)', () => __awaiter(void 0, void 0, void 0, function* () {
        let caughtError;
        let previousHandle = Zone.root._zoneDelegate.handleError;
        Zone.root._zoneDelegate.handleError = (zone, e) => {
            caughtError = e;
        };
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                ngDoCheck() {
                    queueMicrotask(() => {
                        this.cdr.markForCheck();
                    });
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(caughtError).toBeInstanceOf(errors_1.RuntimeError);
        const runtimeError = caughtError;
        expect(runtimeError.code).toEqual(103 /* RuntimeErrorCode.INFINITE_CHANGE_DETECTION */);
        expect(runtimeError.message).toContain('markForCheck');
        expect(runtimeError.message).toContain('notify');
        Zone.root._zoneDelegate.handleError = previousHandle;
    }));
    it('runs inside fakeAsync zone', (0, testing_1.fakeAsync)(() => {
        let didRun = false;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngOnInit() {
                    didRun = true;
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
        testing_1.TestBed.createComponent(App);
        expect(didRun).toBe(false);
        (0, testing_1.tick)();
        expect(didRun).toBe(true);
        didRun = false;
        testing_1.TestBed.createComponent(App);
        expect(didRun).toBe(false);
        (0, testing_1.flush)();
        expect(didRun).toBe(true);
    }));
    it('can run inside fakeAsync zone', (0, testing_1.fakeAsync)(() => {
        let didRun = false;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    didRun = true;
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
        // create component runs inside the zone and triggers CD as a result
        const fixture = testing_1.TestBed.createComponent(App);
        didRun = false;
        // schedules change detection
        fixture.debugElement.injector.get(core_1.ChangeDetectorRef).markForCheck();
        expect(didRun).toBe(false);
        (0, testing_1.tick)();
        expect(didRun).toBe(true);
    }));
});
describe('Angular with scheduler and ZoneJS', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: testing_1.ComponentFixtureAutoDetect, useValue: true },
                { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
            ],
        });
    });
    it('requires updates inside Angular zone when using ngZoneOnly', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, core_1.provideZoneChangeDetection)({ ignoreChangesOutsideZone: true })],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
        testing_1.TestBed.inject(core_1.NgZone).runOutsideAngular(() => {
            fixture.componentInstance.thing.set('new');
        });
        expect(fixture.isStable()).toBe(true);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
    }));
    it('will not schedule change detection if listener callback is outside the zone', () => __awaiter(void 0, void 0, void 0, function* () {
        let renders = 0;
        testing_1.TestBed.runInInjectionContext(() => {
            (0, core_1.afterEveryRender)(() => {
                renders++;
            });
        });
        let ComponentWithOutput = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'component-with-output', template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _out_decorators;
            let _out_initializers = [];
            let _out_extraInitializers = [];
            var ComponentWithOutput = _classThis = class {
                constructor() {
                    this.out = __runInitializers(this, _out_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _out_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ComponentWithOutput");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _out_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _out_decorators, { kind: "field", name: "out", static: false, private: false, access: { has: obj => "out" in obj, get: obj => obj.out, set: (obj, value) => { obj.out = value; } }, metadata: _metadata }, _out_initializers, _out_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentWithOutput = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentWithOutput = _classThis;
        })();
        let called = false;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [ComponentWithOutput],
                    template: '<component-with-output (out)="onOut()" />',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                onOut() {
                    called = true;
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        const outComponent = fixture.debugElement.query((debugNode) => debugNode.providerTokens.indexOf(ComponentWithOutput) !== -1).componentInstance;
        testing_1.TestBed.inject(core_1.NgZone).runOutsideAngular(() => {
            outComponent.out.emit();
        });
        yield fixture.whenStable();
        expect(renders).toBe(1);
        expect(called).toBe(true);
        expect(renders).toBe(1);
    }));
    it('updating signal outside of zone still schedules update when in hybrid mode', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
        testing_1.TestBed.inject(core_1.NgZone).runOutsideAngular(() => {
            fixture.componentInstance.thing.set('new');
        });
        expect(fixture.isStable()).toBe(false);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('new');
    }));
    it('updating signal in another "Angular" zone schedules update when in hybrid mode', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
        const differentAngularZone = Zone.root.run(() => new core_1.NgZone({}));
        differentAngularZone.run(() => {
            fixture.componentInstance.thing.set('new');
        });
        expect(fixture.isStable()).toBe(false);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('new');
    }));
    it('updating signal in a child zone of Angular does not schedule extra CD', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
        const childZone = testing_1.TestBed.inject(core_1.NgZone).run(() => Zone.current.fork({ name: 'child' }));
        childZone.run(() => {
            fixture.componentInstance.thing.set('new');
            expect(testing_1.TestBed.inject(zoneless_scheduling_impl_1.ChangeDetectionSchedulerImpl)['cancelScheduledCallback']).toBeNull();
        });
    }));
    it('updating signal in a child Angular zone of Angular does not schedule extra CD', () => __awaiter(void 0, void 0, void 0, function* () {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        expect(fixture.nativeElement.innerText).toContain('initial');
        const childAngularZone = testing_1.TestBed.inject(core_1.NgZone).run(() => new core_1.NgZone({}));
        childAngularZone.run(() => {
            fixture.componentInstance.thing.set('new');
            expect(testing_1.TestBed.inject(zoneless_scheduling_impl_1.ChangeDetectionSchedulerImpl)['cancelScheduledCallback']).toBeNull();
        });
    }));
    it('should not run change detection twice if notified during AppRef.tick', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, core_1.provideZoneChangeDetection)({ ignoreChangesOutsideZone: false }),
                { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
            ],
        });
        let changeDetectionRuns = 0;
        testing_1.TestBed.runInInjectionContext(() => {
            (0, core_1.afterEveryRender)(() => {
                changeDetectionRuns++;
            });
        });
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                ngDoCheck() {
                    // notify scheduler every time this component is checked
                    this.cdr.markForCheck();
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
        yield fixture.whenStable();
        expect(changeDetectionRuns).toEqual(1);
        // call tick manually
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        yield fixture.whenStable();
        // ensure we only ran render hook 1 more time rather than once for tick and once for the
        // scheduled run
        expect(changeDetectionRuns).toEqual(2);
    }));
    it('does not cause double change detection with run coalescing', () => __awaiter(void 0, void 0, void 0, function* () {
        if (isNode) {
            return;
        }
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, core_1.provideZoneChangeDetection)({ runCoalescing: true, ignoreChangesOutsideZone: false }),
            ],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        let ticks = 0;
        testing_1.TestBed.runInInjectionContext(() => {
            (0, core_1.afterEveryRender)(() => {
                ticks++;
            });
        });
        fixture.componentInstance.thing.set('new');
        yield fixture.whenStable();
        expect(ticks).toBe(1);
    }));
    it('does not cause double change detection with run coalescing when both schedulers are notified', () => __awaiter(void 0, void 0, void 0, function* () {
        if (isNode) {
            return;
        }
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, core_1.provideZoneChangeDetection)({ runCoalescing: true, ignoreChangesOutsideZone: false }),
            ],
        });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{thing()}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.thing = (0, core_1.signal)('initial');
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
        const fixture = testing_1.TestBed.createComponent(App);
        yield fixture.whenStable();
        let ticks = 0;
        testing_1.TestBed.runInInjectionContext(() => {
            (0, core_1.afterEveryRender)(() => {
                ticks++;
            });
        });
        // notifies the zoneless scheduler
        fixture.componentInstance.thing.set('new');
        // notifies the zone scheduler
        testing_1.TestBed.inject(core_1.NgZone).run(() => { });
        yield fixture.whenStable();
        expect(ticks).toBe(1);
    }));
    it('can run inside fakeAsync zone', (0, testing_1.fakeAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, core_1.provideZoneChangeDetection)({ scheduleInRootZone: false })],
        });
        let didRun = false;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                ngDoCheck() {
                    didRun = true;
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
        // create component runs inside the zone and triggers CD as a result
        const fixture = testing_1.TestBed.createComponent(App);
        didRun = false;
        // schedules change detection
        fixture.debugElement.injector.get(core_1.ChangeDetectorRef).markForCheck();
        expect(didRun).toBe(false);
        (0, testing_1.tick)();
        expect(didRun).toBe(true);
    }));
});
