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
exports.TestComponent = exports.CdTrackerDir = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const component_factory_strategy_1 = require("../src/component-factory-strategy");
describe('ComponentFactoryNgElementStrategy', () => {
    let strategy;
    let injector;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        injector = testing_1.TestBed.inject(core_1.Injector);
        const strategyFactory = new component_factory_strategy_1.ComponentNgElementStrategyFactory(TestComponent, injector);
        strategy = strategyFactory.create(injector);
    });
    function whenStable() {
        return __awaiter(this, void 0, void 0, function* () {
            const appRef = injector.get(core_1.ApplicationRef);
            yield (0, rxjs_1.firstValueFrom)(appRef.isStable.pipe((0, rxjs_1.filter)((stable) => stable)));
            return;
        });
    }
    it('should create a new strategy from the factory', () => {
        const strategyFactory = new component_factory_strategy_1.ComponentNgElementStrategyFactory(TestComponent, injector);
        expect(strategyFactory.create(injector)).toBeTruthy();
    });
    describe('before connected', () => {
        it('should allow subscribing to output events', () => {
            const events = [];
            strategy.events.subscribe((e) => events.push(e));
            // No events upon connecting (since events are not cached/played back).
            strategy.connect(document.createElement('div'));
            expect(events).toEqual([]);
            // Events emitted once connected.
            const componentRef = getComponentRef(strategy);
            componentRef.instance.output1.next('output-1c');
            componentRef.instance.output1.next('output-1d');
            componentRef.instance.output2.next('output-2b');
            expect(events).toEqual([
                { name: 'templateOutput1', value: 'output-1c' },
                { name: 'templateOutput1', value: 'output-1d' },
                { name: 'templateOutput2', value: 'output-2b' },
            ]);
        });
    });
    describe('after connected', () => {
        let componentRef;
        beforeEach(() => {
            // Set up an initial value to make sure it is passed to the component
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            strategy.setInputValue('falsyUndefined', undefined);
            strategy.setInputValue('falsyNull', null);
            strategy.setInputValue('falsyEmpty', '');
            strategy.setInputValue('falsyFalse', false);
            strategy.setInputValue('falsyZero', 0);
            strategy.connect(document.createElement('div'));
            componentRef = getComponentRef(strategy);
            expect(componentRef).not.toBeNull();
        });
        it('should attach the component to the view', () => {
            expect(testing_1.TestBed.inject(core_1.ApplicationRef).allViews).toContain(componentRef.hostView);
        });
        it('should detect changes', () => {
            expect(componentRef.instance.cdCalls).toBe(2);
        });
        it('should listen to output events', () => {
            const events = [];
            strategy.events.subscribe((e) => events.push(e));
            componentRef.instance.output1.next('output-1a');
            componentRef.instance.output1.next('output-1b');
            componentRef.instance.output2.next('output-2a');
            expect(events).toEqual([
                { name: 'templateOutput1', value: 'output-1a' },
                { name: 'templateOutput1', value: 'output-1b' },
                { name: 'templateOutput2', value: 'output-2a' },
            ]);
        });
        it('should listen to output() emitters', () => {
            const events = [];
            strategy.events.subscribe((e) => events.push(e));
            componentRef.instance.output3.emit('output-a');
            componentRef.instance.output3.emit('output-b');
            expect(events).toEqual([
                { name: 'templateOutput3', value: 'output-a' },
                { name: 'templateOutput3', value: 'output-b' },
            ]);
        });
        it('should initialize the component with initial values', () => {
            expect(strategy.getInputValue('fooFoo')).toBe('fooFoo-1');
            expect(componentRef.instance.fooFoo).toBe('fooFoo-1');
        });
        it('should initialize the component with falsy initial values', () => {
            expect(strategy.getInputValue('falsyUndefined')).toEqual(undefined);
            expect(componentRef.instance.falsyUndefined).toEqual(undefined);
            expect(strategy.getInputValue('falsyNull')).toEqual(null);
            expect(componentRef.instance.falsyNull).toEqual(null);
            expect(strategy.getInputValue('falsyEmpty')).toEqual('');
            expect(componentRef.instance.falsyEmpty).toEqual('');
            expect(strategy.getInputValue('falsyFalse')).toEqual(false);
            expect(componentRef.instance.falsyFalse).toEqual(false);
            expect(strategy.getInputValue('falsyZero')).toEqual(0);
            expect(componentRef.instance.falsyZero).toEqual(0);
        });
        it('should call ngOnChanges with the change', () => {
            expectSimpleChanges(componentRef.instance.simpleChanges[0], {
                fooFoo: new core_1.SimpleChange(undefined, 'fooFoo-1', true),
                falsyUndefined: new core_1.SimpleChange(undefined, undefined, true),
                falsyNull: new core_1.SimpleChange(undefined, null, true),
                falsyEmpty: new core_1.SimpleChange(undefined, '', true),
                falsyFalse: new core_1.SimpleChange(undefined, false, true),
                falsyZero: new core_1.SimpleChange(undefined, 0, true),
            });
        });
        // Disabled: this is not actually how `NgOnChanges` works. The test appears to encode correct
        // behavior, but the `ngOnChanges` implementation has a bug.
        xit('should call ngOnChanges with proper firstChange value', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.setInputValue('fooFoo', 'fooFoo-2');
            strategy.setInputValue('barBar', 'barBar-1');
            strategy.setInputValue('falsyUndefined', 'notanymore');
            yield whenStable();
            expectSimpleChanges(componentRef.instance.simpleChanges[1], {
                fooFoo: new core_1.SimpleChange('fooFoo-1', 'fooFoo-2', false),
                barBar: new core_1.SimpleChange(undefined, 'barBar-1', true),
                falsyUndefined: new core_1.SimpleChange(undefined, 'notanymore', false),
            });
        }));
    });
    describe('when inputs change and not connected', () => {
        it('should cache the value', () => {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            expect(strategy.getInputValue('fooFoo')).toBe('fooFoo-1');
            // Sanity check: componentRef doesn't exist.
            expect(getComponentRef(strategy)).toBeNull();
        });
        it('should not detect changes', () => {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            // Sanity check: componentRef doesn't exist.
            expect(getComponentRef(strategy)).toBeNull();
        });
    });
    describe('when inputs change and is connected', () => {
        let componentRef;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            strategy.connect(document.createElement('div'));
            componentRef = getComponentRef(strategy);
            expect(componentRef).not.toBeNull();
            yield whenStable();
            expect(componentRef.instance.cdCalls).toBe(2);
            componentRef.instance.cdCalls = 0;
        }));
        it('should be set on the component instance', () => {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            expect(componentRef.instance.fooFoo).toBe('fooFoo-1');
            expect(strategy.getInputValue('fooFoo')).toBe('fooFoo-1');
        });
        it('should detect changes', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(componentRef.instance.cdCalls).toBe(0);
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            yield whenStable();
            // Connect detected changes automatically
            expect(componentRef.instance.cdCalls).toBe(1);
        }));
        it('should detect changes even when updated during CD', () => __awaiter(void 0, void 0, void 0, function* () {
            let DriverCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DriverCmp = _classThis = class {
                    ngAfterViewChecked() {
                        // This runs within the Angular zone, within change detection.
                        core_1.NgZone.assertInAngularZone();
                        // Because we're inside the zone, setting the input won't cause a fresh tick() to be
                        // scheduled (the scheduler knows we're in the zone and in fact that a tick() is in
                        // progress). However, setting the input should cause the view to be marked for _refresh_
                        // as well as dirty, allowing CD to revisit this view and pick up the change.
                        strategy.setInputValue('fooFoo', 'fooFoo-2');
                    }
                };
                __setFunctionName(_classThis, "DriverCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DriverCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DriverCmp = _classThis;
            })();
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const cmpRef = (0, core_1.createComponent)(DriverCmp, { environmentInjector: appRef.injector });
            appRef.attachView(cmpRef.hostView);
            // Wait for CD of the application, which needs to check `TestComponent` twice since it only
            // becomes dirty after `DriverCmp.ngAfterViewChecked`.
            yield whenStable();
            expect(componentRef.instance.fooFoo).toBe('fooFoo-2');
            expect(componentRef.instance.cdCalls).toBe(2);
        }));
        // Disabled: when `setInputValue()` is called from outside the zone (like in this test), CD will
        // be forced to run after each `setInputValue()` call, thanks to `setInputValue()` running
        // `NgZone.run()`.
        //
        // Previously, this test spied on `.detectChanges()` and therefore did not detect that this was
        // happening, since the CD triggered from `ApplicationRef.tick()` didn't go through
        // `.detectChanges()`.
        xit('should detect changes once for multiple input changes', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            expect(componentRef.instance.cdCalls).toBe(0);
            strategy.setInputValue('barBar', 'barBar-1');
            yield whenStable();
            expect(componentRef.instance.cdCalls).toBe(1);
        }));
        it('should call ngOnChanges', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            yield whenStable();
            expectSimpleChanges(componentRef.instance.simpleChanges[0], {
                fooFoo: new core_1.SimpleChange(undefined, 'fooFoo-1', true),
            });
        }));
        // Disabled: as in "should detect changes once for multiple input changes" above, CD runs after
        // each `setInputValue`, with `ngOnChanges` delivered for each one.
        xit('should call ngOnChanges once for multiple input changes', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            strategy.setInputValue('barBar', 'barBar-1');
            yield whenStable();
            expectSimpleChanges(componentRef.instance.simpleChanges[0], {
                fooFoo: new core_1.SimpleChange(undefined, 'fooFoo-1', true),
                barBar: new core_1.SimpleChange(undefined, 'barBar-1', true),
            });
        }));
        // Disabled: as in "should detect changes once for multiple input changes" above, CD runs after
        // each `setInputValue`, with `ngOnChanges` delivered for each one.
        xit('should call ngOnChanges twice for changes in different rounds with previous values', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.setInputValue('fooFoo', 'fooFoo-1');
            strategy.setInputValue('barBar', 'barBar-1');
            yield whenStable();
            expectSimpleChanges(componentRef.instance.simpleChanges[0], {
                fooFoo: new core_1.SimpleChange(undefined, 'fooFoo-1', true),
                barBar: new core_1.SimpleChange(undefined, 'barBar-1', true),
            });
            strategy.setInputValue('fooFoo', 'fooFoo-2');
            strategy.setInputValue('barBar', 'barBar-2');
            yield whenStable();
            expectSimpleChanges(componentRef.instance.simpleChanges[1], {
                fooFoo: new core_1.SimpleChange('fooFoo-1', 'fooFoo-2', false),
                barBar: new core_1.SimpleChange('barBar-1', 'barBar-2', false),
            });
        }));
    });
    describe('disconnect', () => {
        it('should be able to call if not connected', () => {
            expect(() => strategy.disconnect()).not.toThrow();
            // Sanity check: componentRef doesn't exist.
            expect(getComponentRef(strategy)).toBeNull();
        });
        it('should destroy the component after the destroy delay', () => __awaiter(void 0, void 0, void 0, function* () {
            strategy.connect(document.createElement('div'));
            const componentRef = getComponentRef(strategy);
            let destroyed = false;
            componentRef.onDestroy(() => (destroyed = true));
            strategy.disconnect();
            expect(destroyed).toBeFalse();
            yield new Promise((resolve) => setTimeout(resolve, 10));
            expect(destroyed).toBeTrue();
        }));
    });
    describe('runInZone', () => {
        const param = 'foofoo';
        it("should run the callback directly when invoked in element's zone", () => {
            expect(strategy['runInZone'](() => {
                expect(Zone.current.name).toBe('angular');
                return param;
            })).toEqual('foofoo');
        });
        it("should run the callback inside the element's zone when invoked in a different zone", () => {
            expect(Zone.root.run(() => strategy['runInZone'](() => {
                expect(Zone.current.name).toBe('angular');
                return param;
            }))).toEqual('foofoo');
        });
        xit('should run the callback directly when called without zone.js loaded', () => {
            // simulate no zone.js loaded
            strategy['elementZone'] = null;
            expect(Zone.root.run(() => strategy['runInZone'](() => {
                return param;
            }))).toEqual('foofoo');
        });
    });
});
let CdTrackerDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            standalone: true,
            selector: '[cdTracker]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CdTrackerDir = _classThis = class {
        constructor() {
            this.parent = (0, core_1.inject)(TestComponent);
        }
        ngDoCheck() {
            this.parent.cdCalls++;
        }
    };
    __setFunctionName(_classThis, "CdTrackerDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CdTrackerDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CdTrackerDir = _classThis;
})();
exports.CdTrackerDir = CdTrackerDir;
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'fake-component',
            standalone: true,
            imports: [CdTrackerDir],
            template: `
    <ng-container cdTracker></ng-container>
    <ng-content select="content-1"></ng-content>
    <ng-content select="content-2"></ng-content>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _output1_decorators;
    let _output1_initializers = [];
    let _output1_extraInitializers = [];
    let _output2_decorators;
    let _output2_initializers = [];
    let _output2_extraInitializers = [];
    let _output3_decorators;
    let _output3_initializers = [];
    let _output3_extraInitializers = [];
    let _fooFoo_decorators;
    let _fooFoo_initializers = [];
    let _fooFoo_extraInitializers = [];
    let _barBar_decorators;
    let _barBar_initializers = [];
    let _barBar_extraInitializers = [];
    let _falsyUndefined_decorators;
    let _falsyUndefined_initializers = [];
    let _falsyUndefined_extraInitializers = [];
    let _falsyNull_decorators;
    let _falsyNull_initializers = [];
    let _falsyNull_extraInitializers = [];
    let _falsyEmpty_decorators;
    let _falsyEmpty_initializers = [];
    let _falsyEmpty_extraInitializers = [];
    let _falsyFalse_decorators;
    let _falsyFalse_initializers = [];
    let _falsyFalse_extraInitializers = [];
    let _falsyZero_decorators;
    let _falsyZero_initializers = [];
    let _falsyZero_extraInitializers = [];
    var TestComponent = _classThis = class {
        constructor() {
            this.output1 = __runInitializers(this, _output1_initializers, new rxjs_1.Subject());
            this.output2 = (__runInitializers(this, _output1_extraInitializers), __runInitializers(this, _output2_initializers, new rxjs_1.Subject()));
            this.output3 = (__runInitializers(this, _output2_extraInitializers), __runInitializers(this, _output3_initializers, new core_1.OutputEmitterRef()));
            this.fooFoo = (__runInitializers(this, _output3_extraInitializers), __runInitializers(this, _fooFoo_initializers, void 0));
            this.barBar = (__runInitializers(this, _fooFoo_extraInitializers), __runInitializers(this, _barBar_initializers, void 0));
            this.falsyUndefined = (__runInitializers(this, _barBar_extraInitializers), __runInitializers(this, _falsyUndefined_initializers, void 0));
            this.falsyNull = (__runInitializers(this, _falsyUndefined_extraInitializers), __runInitializers(this, _falsyNull_initializers, void 0));
            this.falsyEmpty = (__runInitializers(this, _falsyNull_extraInitializers), __runInitializers(this, _falsyEmpty_initializers, void 0));
            this.falsyFalse = (__runInitializers(this, _falsyEmpty_extraInitializers), __runInitializers(this, _falsyFalse_initializers, void 0));
            this.falsyZero = (__runInitializers(this, _falsyFalse_extraInitializers), __runInitializers(this, _falsyZero_initializers, void 0));
            // Keep track of the simple changes passed to ngOnChanges
            this.simpleChanges = (__runInitializers(this, _falsyZero_extraInitializers), []);
            this.cdCalls = 0;
        }
        ngOnChanges(simpleChanges) {
            this.simpleChanges.push(simpleChanges);
        }
    };
    __setFunctionName(_classThis, "TestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _output1_decorators = [(0, core_1.Output)('templateOutput1')];
        _output2_decorators = [(0, core_1.Output)('templateOutput2')];
        _output3_decorators = [(0, core_1.Output)('templateOutput3')];
        _fooFoo_decorators = [(0, core_1.Input)()];
        _barBar_decorators = [(0, core_1.Input)({ alias: 'my-bar-bar' })];
        _falsyUndefined_decorators = [(0, core_1.Input)()];
        _falsyNull_decorators = [(0, core_1.Input)()];
        _falsyEmpty_decorators = [(0, core_1.Input)()];
        _falsyFalse_decorators = [(0, core_1.Input)()];
        _falsyZero_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _output1_decorators, { kind: "field", name: "output1", static: false, private: false, access: { has: obj => "output1" in obj, get: obj => obj.output1, set: (obj, value) => { obj.output1 = value; } }, metadata: _metadata }, _output1_initializers, _output1_extraInitializers);
        __esDecorate(null, null, _output2_decorators, { kind: "field", name: "output2", static: false, private: false, access: { has: obj => "output2" in obj, get: obj => obj.output2, set: (obj, value) => { obj.output2 = value; } }, metadata: _metadata }, _output2_initializers, _output2_extraInitializers);
        __esDecorate(null, null, _output3_decorators, { kind: "field", name: "output3", static: false, private: false, access: { has: obj => "output3" in obj, get: obj => obj.output3, set: (obj, value) => { obj.output3 = value; } }, metadata: _metadata }, _output3_initializers, _output3_extraInitializers);
        __esDecorate(null, null, _fooFoo_decorators, { kind: "field", name: "fooFoo", static: false, private: false, access: { has: obj => "fooFoo" in obj, get: obj => obj.fooFoo, set: (obj, value) => { obj.fooFoo = value; } }, metadata: _metadata }, _fooFoo_initializers, _fooFoo_extraInitializers);
        __esDecorate(null, null, _barBar_decorators, { kind: "field", name: "barBar", static: false, private: false, access: { has: obj => "barBar" in obj, get: obj => obj.barBar, set: (obj, value) => { obj.barBar = value; } }, metadata: _metadata }, _barBar_initializers, _barBar_extraInitializers);
        __esDecorate(null, null, _falsyUndefined_decorators, { kind: "field", name: "falsyUndefined", static: false, private: false, access: { has: obj => "falsyUndefined" in obj, get: obj => obj.falsyUndefined, set: (obj, value) => { obj.falsyUndefined = value; } }, metadata: _metadata }, _falsyUndefined_initializers, _falsyUndefined_extraInitializers);
        __esDecorate(null, null, _falsyNull_decorators, { kind: "field", name: "falsyNull", static: false, private: false, access: { has: obj => "falsyNull" in obj, get: obj => obj.falsyNull, set: (obj, value) => { obj.falsyNull = value; } }, metadata: _metadata }, _falsyNull_initializers, _falsyNull_extraInitializers);
        __esDecorate(null, null, _falsyEmpty_decorators, { kind: "field", name: "falsyEmpty", static: false, private: false, access: { has: obj => "falsyEmpty" in obj, get: obj => obj.falsyEmpty, set: (obj, value) => { obj.falsyEmpty = value; } }, metadata: _metadata }, _falsyEmpty_initializers, _falsyEmpty_extraInitializers);
        __esDecorate(null, null, _falsyFalse_decorators, { kind: "field", name: "falsyFalse", static: false, private: false, access: { has: obj => "falsyFalse" in obj, get: obj => obj.falsyFalse, set: (obj, value) => { obj.falsyFalse = value; } }, metadata: _metadata }, _falsyFalse_initializers, _falsyFalse_extraInitializers);
        __esDecorate(null, null, _falsyZero_decorators, { kind: "field", name: "falsyZero", static: false, private: false, access: { has: obj => "falsyZero" in obj, get: obj => obj.falsyZero, set: (obj, value) => { obj.falsyZero = value; } }, metadata: _metadata }, _falsyZero_initializers, _falsyZero_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestComponent = _classThis;
})();
exports.TestComponent = TestComponent;
function expectSimpleChanges(actual, expected) {
    Object.keys(actual).forEach((key) => {
        expect(expected[key]).toBeTruthy(`Change included additional key ${key}`);
    });
    Object.keys(expected).forEach((key) => {
        expect(actual[key]).toBeTruthy(`Change should have included key ${key}`);
        if (actual[key]) {
            expect(actual[key].previousValue).toBe(expected[key].previousValue, `${key}.previousValue`);
            expect(actual[key].currentValue).toBe(expected[key].currentValue, `${key}.currentValue`);
            expect(actual[key].firstChange).toBe(expected[key].firstChange, `${key}.firstChange`);
        }
    });
}
function getComponentRef(strategy) {
    return strategy.componentRef;
}
