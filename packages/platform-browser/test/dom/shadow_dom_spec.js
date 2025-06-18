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
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const matchers_1 = require("../../testing/src/matchers");
describe('ShadowDOM Support', () => {
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
    });
    it('should attach and use a shadowRoot when ViewEncapsulation.ShadowDom is set', () => {
        const compEl = testing_1.TestBed.createComponent(ShadowComponent).nativeElement;
        (0, matchers_1.expect)(compEl.shadowRoot.textContent).toEqual('Hello World');
    });
    it('should use the shadow root to encapsulate styles', () => {
        const compEl = testing_1.TestBed.createComponent(StyledShadowComponent).nativeElement;
        // Firefox and Chrome return different computed styles. Chrome supports CSS property
        // shorthands in the computed style object while Firefox expects explicit CSS properties.
        // e.g. we can't use the "border" CSS property for this test as "border" is a shorthand
        // property and therefore would not work within Firefox.
        (0, matchers_1.expect)(window.getComputedStyle(compEl).backgroundColor).toEqual('rgb(0, 0, 0)');
        const redDiv = compEl.shadowRoot.querySelector('div.red');
        (0, matchers_1.expect)(window.getComputedStyle(redDiv).backgroundColor).toEqual('rgb(255, 0, 0)');
    });
    it('should allow the usage of <slot> elements', () => {
        const el = testing_1.TestBed.createComponent(ShadowSlotComponent).nativeElement;
        const projectedContent = document.createTextNode('Hello Slot!');
        el.appendChild(projectedContent);
        const slot = el.shadowRoot.querySelector('slot');
        (0, matchers_1.expect)(slot.assignedNodes().length).toBe(1);
        (0, matchers_1.expect)(slot.assignedNodes()[0].textContent).toBe('Hello Slot!');
    });
    it('should allow the usage of named <slot> elements', () => {
        const el = testing_1.TestBed.createComponent(ShadowSlotsComponent).nativeElement;
        const headerContent = document.createElement('h1');
        headerContent.setAttribute('slot', 'header');
        headerContent.textContent = 'Header Text!';
        const articleContent = document.createElement('span');
        articleContent.setAttribute('slot', 'article');
        articleContent.textContent = 'Article Text!';
        const articleSubcontent = document.createElement('span');
        articleSubcontent.setAttribute('slot', 'article');
        articleSubcontent.textContent = 'Article Subtext!';
        el.appendChild(headerContent);
        el.appendChild(articleContent);
        el.appendChild(articleSubcontent);
        const headerSlot = el.shadowRoot.querySelector('slot[name=header]');
        const articleSlot = el.shadowRoot.querySelector('slot[name=article]');
        (0, matchers_1.expect)(headerSlot.assignedNodes().length).toBe(1);
        (0, matchers_1.expect)(headerSlot.assignedNodes()[0].textContent).toBe('Header Text!');
        (0, matchers_1.expect)(headerContent.assignedSlot).toBe(headerSlot);
        (0, matchers_1.expect)(articleSlot.assignedNodes().length).toBe(2);
        (0, matchers_1.expect)(articleSlot.assignedNodes()[0].textContent).toBe('Article Text!');
        (0, matchers_1.expect)(articleSlot.assignedNodes()[1].textContent).toBe('Article Subtext!');
        (0, matchers_1.expect)(articleContent.assignedSlot).toBe(articleSlot);
        (0, matchers_1.expect)(articleSubcontent.assignedSlot).toBe(articleSlot);
    });
});
let ShadowComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'shadow-comp',
            template: 'Hello World',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShadowComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ShadowComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShadowComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShadowComponent = _classThis;
})();
let StyledShadowComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'styled-shadow-comp',
            template: '<div class="red"></div>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            styles: [`:host { background: black; } .red { background: red; }`],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StyledShadowComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "StyledShadowComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StyledShadowComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StyledShadowComponent = _classThis;
})();
let ShadowSlotComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'shadow-slot-comp',
            template: '<slot></slot>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShadowSlotComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ShadowSlotComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShadowSlotComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShadowSlotComponent = _classThis;
})();
let ShadowSlotsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'shadow-slots-comp',
            template: '<header><slot name="header"></slot></header><article><slot name="article"></slot></article>',
            encapsulation: core_1.ViewEncapsulation.ShadowDom,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShadowSlotsComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ShadowSlotsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShadowSlotsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShadowSlotsComponent = _classThis;
})();
let TestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [index_1.BrowserModule],
            declarations: [ShadowComponent, ShadowSlotComponent, ShadowSlotsComponent, StyledShadowComponent],
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
