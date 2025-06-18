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
const create_custom_element_1 = require("../src/create-custom-element");
describe('slots', () => {
    let testContainer;
    beforeAll((done) => {
        testContainer = document.createElement('div');
        document.body.appendChild(testContainer);
        (0, core_1.destroyPlatform)();
        (0, platform_browser_dynamic_1.platformBrowserDynamic)()
            .bootstrapModule(TestModule)
            .then((ref) => {
            const injector = ref.injector;
            const cfr = injector.get(core_1.ComponentFactoryResolver);
            testElements.forEach((comp) => {
                const compFactory = cfr.resolveComponentFactory(comp);
                customElements.define(compFactory.selector, (0, create_custom_element_1.createCustomElement)(comp, { injector }));
            });
        })
            .then(done, done.fail);
    });
    afterAll(() => {
        (0, core_1.destroyPlatform)();
        testContainer.remove();
        testContainer = null;
    });
    it('should use slots to project content', () => {
        const tpl = `<default-slot-el><span class="projected"></span></default-slot-el>`;
        testContainer.innerHTML = tpl;
        const testEl = testContainer.querySelector('default-slot-el');
        const content = testContainer.querySelector('span.projected');
        const slot = testEl.shadowRoot.querySelector('slot');
        const assignedNodes = slot.assignedNodes();
        expect(assignedNodes[0]).toBe(content);
    });
    it('should use a named slot to project content', () => {
        const tpl = `<named-slot-el><span class="projected" slot="header"></span></named-slot-el>`;
        testContainer.innerHTML = tpl;
        const testEl = testContainer.querySelector('named-slot-el');
        const content = testContainer.querySelector('span.projected');
        const slot = testEl.shadowRoot.querySelector('slot[name=header]');
        const assignedNodes = slot.assignedNodes();
        expect(assignedNodes[0]).toBe(content);
    });
    it('should use named slots to project content', () => {
        const tpl = `
    <named-slots-el>
      <span class="projected-header" slot="header"></span>
      <span class="projected-body" slot="body"></span>
    </named-slots-el>`;
        testContainer.innerHTML = tpl;
        const testEl = testContainer.querySelector('named-slots-el');
        const headerContent = testContainer.querySelector('span.projected-header');
        const bodyContent = testContainer.querySelector('span.projected-body');
        const headerSlot = testEl.shadowRoot.querySelector('slot[name=header]');
        const bodySlot = testEl.shadowRoot.querySelector('slot[name=body]');
        expect(headerContent.assignedSlot).toBe(headerSlot);
        expect(bodyContent.assignedSlot).toBe(bodySlot);
    });
    it('should listen to slotchange events', (done) => {
        const templateEl = document.createElement('template');
        const tpl = `
    <slot-events-el>
      <span class="projected">Content</span>
    </slot-events-el>`;
        templateEl.innerHTML = tpl;
        const template = templateEl.content.cloneNode(true);
        const testEl = template.querySelector('slot-events-el');
        testEl.addEventListener('slotEventsChange', (e) => {
            expect(testEl.slotEvents.length).toEqual(1);
            done();
        });
        testContainer.appendChild(template);
        expect(testEl.slotEvents.length).toEqual(0);
    });
});
// Helpers
let DefaultSlotComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'default-slot-el',
            template: '<div class="slotparent"><slot></slot></div>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DefaultSlotComponent = _classThis = class {
        constructor() { }
    };
    __setFunctionName(_classThis, "DefaultSlotComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DefaultSlotComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DefaultSlotComponent = _classThis;
})();
let NamedSlotComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'named-slot-el',
            template: '<div class="slotparent"><slot name="header"></slot></div>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NamedSlotComponent = _classThis = class {
        constructor() { }
    };
    __setFunctionName(_classThis, "NamedSlotComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NamedSlotComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NamedSlotComponent = _classThis;
})();
let NamedSlotsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'named-slots-el',
            template: '<div class="slotparent"><slot name="header"></slot><slot name="body"></slot></div>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NamedSlotsComponent = _classThis = class {
        constructor() { }
    };
    __setFunctionName(_classThis, "NamedSlotsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NamedSlotsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NamedSlotsComponent = _classThis;
})();
let SlotEventsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'slot-events-el',
            template: '<slot (slotchange)="onSlotChange($event)"></slot>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _slotEvents_decorators;
    let _slotEvents_initializers = [];
    let _slotEvents_extraInitializers = [];
    let _slotEventsChange_decorators;
    let _slotEventsChange_initializers = [];
    let _slotEventsChange_extraInitializers = [];
    var SlotEventsComponent = _classThis = class {
        constructor() {
            this.slotEvents = __runInitializers(this, _slotEvents_initializers, []);
            this.slotEventsChange = (__runInitializers(this, _slotEvents_extraInitializers), __runInitializers(this, _slotEventsChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _slotEventsChange_extraInitializers);
        }
        onSlotChange(event) {
            this.slotEvents.push(event);
            this.slotEventsChange.emit(event);
        }
    };
    __setFunctionName(_classThis, "SlotEventsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _slotEvents_decorators = [(0, core_1.Input)()];
        _slotEventsChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _slotEvents_decorators, { kind: "field", name: "slotEvents", static: false, private: false, access: { has: obj => "slotEvents" in obj, get: obj => obj.slotEvents, set: (obj, value) => { obj.slotEvents = value; } }, metadata: _metadata }, _slotEvents_initializers, _slotEvents_extraInitializers);
        __esDecorate(null, null, _slotEventsChange_decorators, { kind: "field", name: "slotEventsChange", static: false, private: false, access: { has: obj => "slotEventsChange" in obj, get: obj => obj.slotEventsChange, set: (obj, value) => { obj.slotEventsChange = value; } }, metadata: _metadata }, _slotEventsChange_initializers, _slotEventsChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SlotEventsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SlotEventsComponent = _classThis;
})();
const testElements = [
    DefaultSlotComponent,
    NamedSlotComponent,
    NamedSlotsComponent,
    SlotEventsComponent,
];
let TestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], declarations: testElements })];
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
