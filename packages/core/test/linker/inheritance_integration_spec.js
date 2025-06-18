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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
let DirectiveA = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[directiveA]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveA = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectiveA");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveA = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveA = _classThis;
})();
let DirectiveB = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[directiveB]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    var DirectiveB = _classThis = class {
        constructor() {
            this.title = __runInitializers(this, _title_initializers, 'DirectiveB Title');
            __runInitializers(this, _title_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DirectiveB");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.HostBinding)('title')];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveB = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveB = _classThis;
})();
let ComponentA = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'component-a',
            template: 'ComponentA Template',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentA = _classThis = class {
    };
    __setFunctionName(_classThis, "ComponentA");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentA = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentA = _classThis;
})();
let ComponentExtendsDirective = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'component-extends-directive',
            template: 'ComponentExtendsDirective Template',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = DirectiveA;
    var ComponentExtendsDirective = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "ComponentExtendsDirective");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentExtendsDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentExtendsDirective = _classThis;
})();
class ComponentWithNoAnnotation extends ComponentA {
}
let DirectiveExtendsComponent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[directiveExtendsComponent]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ComponentA;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    var DirectiveExtendsComponent = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.title = __runInitializers(this, _title_initializers, 'DirectiveExtendsComponent Title');
            __runInitializers(this, _title_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DirectiveExtendsComponent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _title_decorators = [(0, core_1.HostBinding)('title')];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveExtendsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveExtendsComponent = _classThis;
})();
class DirectiveWithNoAnnotation extends DirectiveB {
}
let App = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-app',
            template: '...',
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
describe('Inheritance logic', () => {
    it('should handle Components that extend Directives', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [ComponentExtendsDirective, App] });
        const template = '<component-extends-directive></component-extends-directive>';
        testing_1.TestBed.overrideComponent(App, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.firstChild.innerHTML).toBe('ComponentExtendsDirective Template');
    });
    it('should handle classes with no annotations that extend Components', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [ComponentWithNoAnnotation, App] });
        const template = '<component-a></component-a>';
        testing_1.TestBed.overrideComponent(App, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.firstChild.innerHTML).toBe('ComponentA Template');
    });
    it('should handle classes with no annotations that extend Directives', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [DirectiveWithNoAnnotation, App] });
        const template = '<div directiveB></div>';
        testing_1.TestBed.overrideComponent(App, { set: { template } });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.firstChild.title).toBe('DirectiveB Title');
    });
    it('should throw in case a Directive tries to extend a Component', () => {
        testing_1.TestBed.configureTestingModule({ declarations: [DirectiveExtendsComponent, App] });
        const template = '<div directiveExtendsComponent>Some content</div>';
        testing_1.TestBed.overrideComponent(App, { set: { template } });
        expect(() => testing_1.TestBed.createComponent(App)).toThrowError('NG0903: Directives cannot inherit Components. Directive DirectiveExtendsComponent is attempting to extend component ComponentA');
    });
});
