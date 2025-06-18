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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const rxjs_1 = require("rxjs");
const create_custom_element_1 = require("../src/create-custom-element");
describe('createCustomElement', () => {
    let selectorUid = 0;
    let testContainer;
    let NgElementCtor;
    let strategy;
    let strategyFactory;
    let injector;
    beforeAll((done) => {
        testContainer = document.createElement('div');
        document.body.appendChild(testContainer);
        (0, core_1.destroyPlatform)();
        (0, platform_browser_dynamic_1.platformBrowserDynamic)()
            .bootstrapModule(TestModule)
            .then((ref) => {
            injector = ref.injector;
            strategyFactory = new TestStrategyFactory();
            strategy = strategyFactory.testStrategy;
            NgElementCtor = createAndRegisterTestCustomElement(strategyFactory);
        })
            .then(done, done.fail);
    });
    afterEach(() => strategy.reset());
    afterAll(() => {
        (0, core_1.destroyPlatform)();
        testContainer.remove();
        testContainer = null;
    });
    it('should use a default strategy for converting component inputs', () => {
        expect(NgElementCtor.observedAttributes).toEqual([
            'foo-foo',
            'barbar',
            'foo-transformed',
            'foo-signal',
        ]);
    });
    it('should send input values from attributes when connected', () => {
        const element = new NgElementCtor(injector);
        element.setAttribute('foo-foo', 'value-foo-foo');
        element.setAttribute('barbar', 'value-barbar');
        element.setAttribute('foo-transformed', 'truthy');
        element.setAttribute('foo-signal', 'value-signal');
        element.connectedCallback();
        expect(strategy.connectedElement).toBe(element);
        expect(strategy.getInputValue('fooFoo')).toBe('value-foo-foo');
        expect(strategy.getInputValue('barBar')).toBe('value-barbar');
        expect(strategy.getInputValue('fooTransformed')).toBe(true);
        expect(strategy.getInputValue('fooSignal')).toBe('value-signal');
    });
    it('should work even if the constructor is not called (due to polyfill)', () => {
        // Currently, all the constructor does is initialize the `injector` property. This
        // test simulates not having called the constructor by "unsetting" the property.
        //
        // NOTE:
        // If the constructor implementation changes in the future, this test needs to be adjusted
        // accordingly.
        const element = new NgElementCtor(injector);
        delete element.injector;
        element.setAttribute('foo-foo', 'value-foo-foo');
        element.setAttribute('barbar', 'value-barbar');
        element.setAttribute('foo-transformed', 'truthy');
        element.setAttribute('foo-signal', 'value-signal');
        element.connectedCallback();
        expect(strategy.connectedElement).toBe(element);
        expect(strategy.getInputValue('fooFoo')).toBe('value-foo-foo');
        expect(strategy.getInputValue('barBar')).toBe('value-barbar');
        expect(strategy.getInputValue('fooTransformed')).toBe(true);
        expect(strategy.getInputValue('fooSignal')).toBe('value-signal');
    });
    it('should listen to output events after connected', () => {
        const element = new NgElementCtor(injector);
        element.connectedCallback();
        let eventValue = null;
        element.addEventListener('some-event', (e) => (eventValue = e.detail));
        strategy.events.next({ name: 'some-event', value: 'event-value' });
        expect(eventValue).toEqual('event-value');
    });
    it('should not listen to output events after disconnected', () => {
        const element = new NgElementCtor(injector);
        element.connectedCallback();
        element.disconnectedCallback();
        expect(strategy.disconnectCalled).toBe(true);
        let eventValue = null;
        element.addEventListener('some-event', (e) => (eventValue = e.detail));
        strategy.events.next({ name: 'some-event', value: 'event-value' });
        expect(eventValue).toEqual(null);
    });
    it('should listen to output events during initialization', () => {
        const events = [];
        const element = new NgElementCtor(injector);
        element.addEventListener('strategy-event', (evt) => events.push(evt.detail));
        element.connectedCallback();
        expect(events).toEqual(['connect']);
    });
    it('should not break if `NgElementStrategy#events` is not available before calling `NgElementStrategy#connect()`', () => {
        class TestStrategyWithLateEvents extends TestStrategy {
            constructor() {
                super(...arguments);
                this.events = undefined;
            }
            connect(element) {
                this.connectedElement = element;
                this.events = new rxjs_1.Subject();
                this.events.next({ name: 'strategy-event', value: 'connect' });
            }
        }
        const strategyWithLateEvents = new TestStrategyWithLateEvents();
        const capturedEvents = [];
        const NgElementCtorWithLateEventsStrategy = createAndRegisterTestCustomElement({
            create: () => strategyWithLateEvents,
        });
        const element = new NgElementCtorWithLateEventsStrategy(injector);
        element.addEventListener('strategy-event', (evt) => capturedEvents.push(evt.detail));
        element.connectedCallback();
        // The "connect" event (emitted during initialization) was missed, but things didn't break.
        expect(capturedEvents).toEqual([]);
        // Subsequent events are still captured.
        strategyWithLateEvents.events.next({ name: 'strategy-event', value: 'after-connect' });
        expect(capturedEvents).toEqual(['after-connect']);
    });
    it('should properly set getters/setters on the element', () => {
        const element = new NgElementCtor(injector);
        element.fooFoo = 'foo-foo-value';
        element.barBar = 'barBar-value';
        element.fooTransformed = 'truthy';
        element.fooSignal = 'value-signal';
        expect(strategy.inputs.get('fooFoo')).toBe('foo-foo-value');
        expect(strategy.inputs.get('barBar')).toBe('barBar-value');
        expect(strategy.inputs.get('fooTransformed')).toBe(true);
        expect(strategy.inputs.get('fooSignal')).toBe('value-signal');
    });
    it('should properly handle getting/setting properties on the element even if the constructor is not called', () => {
        // Create a custom element while ensuring that the `NgElementStrategy` is not created
        // inside the constructor. This is done to emulate the behavior of some polyfills that do
        // not call the constructor.
        strategyFactory.create = () => undefined;
        const element = new NgElementCtor(injector);
        strategyFactory.create = TestStrategyFactory.prototype.create;
        element.fooFoo = 'foo-foo-value';
        element.barBar = 'barBar-value';
        element.fooTransformed = 'truthy';
        element.fooSignal = 'value-signal';
        expect(strategy.inputs.get('fooFoo')).toBe('foo-foo-value');
        expect(strategy.inputs.get('barBar')).toBe('barBar-value');
        expect(strategy.inputs.get('fooTransformed')).toBe(true);
        expect(strategy.inputs.get('fooSignal')).toBe('value-signal');
    });
    it('should capture properties set before upgrading the element', () => {
        // Create a regular element and set properties on it.
        const { selector, ElementCtor } = createTestCustomElement(strategyFactory);
        const element = Object.assign(document.createElement(selector), {
            fooFoo: 'foo-prop-value',
            barBar: 'bar-prop-value',
            fooTransformed: 'truthy',
            fooSignal: 'value-signal',
        });
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value');
        expect(element.fooTransformed).toBe('truthy');
        expect(element.fooSignal).toBe('value-signal');
        // Upgrade the element to a Custom Element and insert it into the DOM.
        customElements.define(selector, ElementCtor);
        testContainer.appendChild(element);
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value');
        expect(element.fooTransformed).toBe(true);
        expect(element.fooSignal).toBe('value-signal');
        expect(strategy.inputs.get('fooFoo')).toBe('foo-prop-value');
        expect(strategy.inputs.get('barBar')).toBe('bar-prop-value');
        expect(strategy.inputs.get('fooTransformed')).toBe(true);
        expect(strategy.inputs.get('fooSignal')).toBe('value-signal');
    });
    it('should capture properties set after upgrading the element but before inserting it into the DOM', () => {
        // Create a regular element and set properties on it.
        const { selector, ElementCtor } = createTestCustomElement(strategyFactory);
        const element = Object.assign(document.createElement(selector), {
            fooFoo: 'foo-prop-value',
            barBar: 'bar-prop-value',
            fooTransformed: 'truthy',
            fooSignal: 'value-signal',
        });
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value');
        expect(element.fooTransformed).toBe('truthy');
        expect(element.fooSignal).toBe('value-signal');
        // Upgrade the element to a Custom Element (without inserting it into the DOM) and update a
        // property.
        customElements.define(selector, ElementCtor);
        customElements.upgrade(element);
        element.barBar = 'bar-prop-value-2';
        element.fooTransformed = '';
        element.fooSignal = 'value-signal-changed';
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value-2');
        expect(element.fooTransformed).toBe('');
        expect(element.fooSignal).toBe('value-signal-changed');
        // Insert the element into the DOM.
        testContainer.appendChild(element);
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value-2');
        expect(element.fooTransformed).toBe(false);
        expect(element.fooSignal).toBe('value-signal-changed');
        expect(strategy.inputs.get('fooFoo')).toBe('foo-prop-value');
        expect(strategy.inputs.get('barBar')).toBe('bar-prop-value-2');
        expect(strategy.inputs.get('fooTransformed')).toBe(false);
        expect(strategy.inputs.get('fooSignal')).toBe('value-signal-changed');
    });
    it('should allow overwriting properties with attributes after upgrading the element but before inserting it into the DOM', () => {
        // Create a regular element and set properties on it.
        const { selector, ElementCtor } = createTestCustomElement(strategyFactory);
        const element = Object.assign(document.createElement(selector), {
            fooFoo: 'foo-prop-value',
            barBar: 'bar-prop-value',
            fooTransformed: 'truthy',
            fooSignal: 'value-signal',
        });
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-prop-value');
        expect(element.fooTransformed).toBe('truthy');
        expect(element.fooSignal).toBe('value-signal');
        // Upgrade the element to a Custom Element (without inserting it into the DOM) and set an
        // attribute.
        customElements.define(selector, ElementCtor);
        customElements.upgrade(element);
        element.setAttribute('barbar', 'bar-attr-value');
        element.setAttribute('foo-transformed', '');
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-attr-value');
        expect(element.fooTransformed).toBe(false);
        expect(element.fooSignal).toBe('value-signal');
        // Insert the element into the DOM.
        testContainer.appendChild(element);
        expect(element.fooFoo).toBe('foo-prop-value');
        expect(element.barBar).toBe('bar-attr-value');
        expect(element.fooTransformed).toBe(false);
        expect(element.fooSignal).toBe('value-signal');
        expect(strategy.inputs.get('fooFoo')).toBe('foo-prop-value');
        expect(strategy.inputs.get('barBar')).toBe('bar-attr-value');
        expect(strategy.inputs.get('fooTransformed')).toBe(false);
        expect(strategy.inputs.get('fooSignal')).toBe('value-signal');
    });
    // Helpers
    function createAndRegisterTestCustomElement(strategyFactory) {
        const { selector, ElementCtor } = createTestCustomElement(strategyFactory);
        customElements.define(selector, ElementCtor);
        return ElementCtor;
    }
    function createTestCustomElement(strategyFactory) {
        return {
            selector: `test-element-${++selectorUid}`,
            ElementCtor: (0, create_custom_element_1.createCustomElement)(TestComponent, { injector, strategyFactory }),
        };
    }
    let TestComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-component',
                template: 'TestComponent|foo({{ fooFoo }})|bar({{ barBar }})',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _fooFoo_decorators;
        let _fooFoo_initializers = [];
        let _fooFoo_extraInitializers = [];
        let _barBar_decorators;
        let _barBar_initializers = [];
        let _barBar_extraInitializers = [];
        let _fooTransformed_decorators;
        let _fooTransformed_initializers = [];
        let _fooTransformed_extraInitializers = [];
        let _fooSignal_decorators;
        let _fooSignal_initializers = [];
        let _fooSignal_extraInitializers = [];
        let _bazBaz_decorators;
        let _bazBaz_initializers = [];
        let _bazBaz_extraInitializers = [];
        let _quxQux_decorators;
        let _quxQux_initializers = [];
        let _quxQux_extraInitializers = [];
        var TestComponent = _classThis = class {
            constructor() {
                this.fooFoo = __runInitializers(this, _fooFoo_initializers, 'foo');
                this.barBar = (__runInitializers(this, _fooFoo_extraInitializers), __runInitializers(this, _barBar_initializers, void 0));
                this.fooTransformed = (__runInitializers(this, _barBar_extraInitializers), __runInitializers(this, _fooTransformed_initializers, void 0));
                // This needs to apply the decorator and pass `isSignal`, because
                // the compiler transform doesn't run against JIT tests.
                this.fooSignal = (__runInitializers(this, _fooTransformed_extraInitializers), __runInitializers(this, _fooSignal_initializers, (0, core_1.input)(null)));
                this.bazBaz = (__runInitializers(this, _fooSignal_extraInitializers), __runInitializers(this, _bazBaz_initializers, new core_1.EventEmitter()));
                this.quxQux = (__runInitializers(this, _bazBaz_extraInitializers), __runInitializers(this, _quxQux_initializers, new core_1.EventEmitter()));
                __runInitializers(this, _quxQux_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "TestComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fooFoo_decorators = [(0, core_1.Input)()];
            _barBar_decorators = [(0, core_1.Input)('barbar')];
            _fooTransformed_decorators = [(0, core_1.Input)({ transform: (value) => !!value })];
            _fooSignal_decorators = [(0, core_1.Input)({ isSignal: true })];
            _bazBaz_decorators = [(0, core_1.Output)()];
            _quxQux_decorators = [(0, core_1.Output)('quxqux')];
            __esDecorate(null, null, _fooFoo_decorators, { kind: "field", name: "fooFoo", static: false, private: false, access: { has: obj => "fooFoo" in obj, get: obj => obj.fooFoo, set: (obj, value) => { obj.fooFoo = value; } }, metadata: _metadata }, _fooFoo_initializers, _fooFoo_extraInitializers);
            __esDecorate(null, null, _barBar_decorators, { kind: "field", name: "barBar", static: false, private: false, access: { has: obj => "barBar" in obj, get: obj => obj.barBar, set: (obj, value) => { obj.barBar = value; } }, metadata: _metadata }, _barBar_initializers, _barBar_extraInitializers);
            __esDecorate(null, null, _fooTransformed_decorators, { kind: "field", name: "fooTransformed", static: false, private: false, access: { has: obj => "fooTransformed" in obj, get: obj => obj.fooTransformed, set: (obj, value) => { obj.fooTransformed = value; } }, metadata: _metadata }, _fooTransformed_initializers, _fooTransformed_extraInitializers);
            __esDecorate(null, null, _fooSignal_decorators, { kind: "field", name: "fooSignal", static: false, private: false, access: { has: obj => "fooSignal" in obj, get: obj => obj.fooSignal, set: (obj, value) => { obj.fooSignal = value; } }, metadata: _metadata }, _fooSignal_initializers, _fooSignal_extraInitializers);
            __esDecorate(null, null, _bazBaz_decorators, { kind: "field", name: "bazBaz", static: false, private: false, access: { has: obj => "bazBaz" in obj, get: obj => obj.bazBaz, set: (obj, value) => { obj.bazBaz = value; } }, metadata: _metadata }, _bazBaz_initializers, _bazBaz_extraInitializers);
            __esDecorate(null, null, _quxQux_decorators, { kind: "field", name: "quxQux", static: false, private: false, access: { has: obj => "quxQux" in obj, get: obj => obj.quxQux, set: (obj, value) => { obj.quxQux = value; } }, metadata: _metadata }, _quxQux_initializers, _quxQux_extraInitializers);
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
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestModule = _classThis = class {
            ngDoBootstrap() { }
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
    class TestStrategy {
        constructor() {
            this.connectedElement = null;
            this.disconnectCalled = false;
            this.inputs = new Map();
            this.events = new rxjs_1.Subject();
        }
        connect(element) {
            this.events.next({ name: 'strategy-event', value: 'connect' });
            this.connectedElement = element;
        }
        disconnect() {
            this.disconnectCalled = true;
        }
        getInputValue(propName) {
            return this.inputs.get(propName);
        }
        setInputValue(propName, value, transform) {
            this.inputs.set(propName, transform ? transform(value) : value);
        }
        reset() {
            this.connectedElement = null;
            this.disconnectCalled = false;
            this.inputs.clear();
        }
    }
    class TestStrategyFactory {
        constructor() {
            this.testStrategy = new TestStrategy();
        }
        create(injector) {
            // Although not used by the `TestStrategy`, verify that the injector is provided.
            if (!injector) {
                throw new Error('Expected injector to be passed to `TestStrategyFactory#create()`, but received ' +
                    `value of type ${typeof injector}: ${injector}`);
            }
            return this.testStrategy;
        }
    }
});
