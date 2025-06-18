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
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('NgStyle', () => {
    let fixture;
    const supportsCssVariables = typeof getComputedStyle !== 'undefined' &&
        typeof CSS !== 'undefined' &&
        typeof CSS.supports !== 'undefined' &&
        CSS.supports('color', 'var(--fake-var)');
    function getComponent() {
        return fixture.componentInstance;
    }
    function expectNativeEl(fixture) {
        return expect(fixture.debugElement.children[0].nativeElement);
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComponent], imports: [index_1.CommonModule] });
    });
    it('should add styles specified in an object literal', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="{'max-width': '40px'}"></div>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
    }));
    it('should add and change styles specified in an object expression', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        let expr = getComponent().expr;
        expr['max-width'] = '30%';
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '30%' });
    }));
    it('should remove styles with a null expression', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        getComponent().expr = null;
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
    }));
    it('should remove styles with an undefined expression', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        getComponent().expr = undefined;
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
    }));
    it('should add and remove styles specified using style.unit notation', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="{'max-width.px': expr}"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = '40';
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        getComponent().expr = null;
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
    }));
    // https://github.com/angular/angular/issues/21064
    it('should add and remove styles which names are not dash-cased', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent(`<div [ngStyle]="{'color': expr}"></div>`);
        getComponent().expr = 'green';
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'color': 'green' });
        getComponent().expr = null;
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('color');
    }));
    it('should update styles using style.unit notation when unit changes', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width.px': '40' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        getComponent().expr = { 'max-width.em': '40' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40em' });
    }));
    // keyValueDiffer is sensitive to key order #9115
    it('should change styles specified in an object expression', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = {
            // height, width order is important here
            height: '10px',
            width: '10px',
        };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'height': '10px', 'width': '10px' });
        getComponent().expr = {
            // width, height order is important here
            width: '5px',
            height: '5px',
        };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'height': '5px', 'width': '5px' });
    }));
    it('should remove styles when deleting a key in an object expression', (0, testing_1.waitForAsync)(() => {
        const template = `<div [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px' });
        delete getComponent().expr['max-width'];
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
    }));
    it('should co-operate with the style attribute', (0, testing_1.waitForAsync)(() => {
        const template = `<div style="font-size: 12px" [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px', 'font-size': '12px' });
        delete getComponent().expr['max-width'];
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
        expectNativeEl(fixture).toHaveCssStyle({ 'font-size': '12px' });
    }));
    it('should co-operate with the style.[styleName]="expr" special-case in the compiler', (0, testing_1.waitForAsync)(() => {
        const template = `<div [style.font-size.px]="12" [ngStyle]="expr"></div>`;
        fixture = createTestComponent(template);
        getComponent().expr = { 'max-width': '40px' };
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'max-width': '40px', 'font-size': '12px' });
        delete getComponent().expr['max-width'];
        fixture.detectChanges();
        expectNativeEl(fixture).not.toHaveCssStyle('max-width');
        expectNativeEl(fixture).toHaveCssStyle({ 'font-size': '12px' });
    }));
    it('should not write to the native node unless the bound expression has changed', () => {
        const template = `<div [ngStyle]="{'color': expr}"></div>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.expr = 'red';
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'color': 'red' });
        // Overwrite native styles so that we can check if ngStyle has performed DOM manupulation to
        // update it.
        fixture.debugElement.children[0].nativeElement.style.color = 'blue';
        fixture.detectChanges();
        // Assert that the style hasn't been updated
        expectNativeEl(fixture).toHaveCssStyle({ 'color': 'blue' });
        fixture.componentInstance.expr = 'yellow';
        fixture.detectChanges();
        // Assert that the style has changed now that the model has changed
        expectNativeEl(fixture).toHaveCssStyle({ 'color': 'yellow' });
    });
    it('should correctly update style with units (.px) when the model is set to number', () => {
        const template = `<div [ngStyle]="{'width.px': expr}"></div>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.expr = 400;
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'width': '400px' });
    });
    it('should handle CSS variables', () => {
        if (!supportsCssVariables) {
            return;
        }
        const template = `<div style="width: var(--width)" [ngStyle]="{'--width': expr}"></div>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.expr = '100px';
        fixture.detectChanges();
        const target = fixture.nativeElement.querySelector('div');
        expect(getComputedStyle(target).getPropertyValue('width')).toEqual('100px');
    });
    it('should be available as a standalone directive', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.NgStyle],
                    template: `<div [ngStyle]="{'width.px': expr}"></div>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.expr = 400;
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
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({ 'width': '400px' });
    });
});
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestComponent = _classThis = class {
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
function createTestComponent(template) {
    return testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } }).createComponent(TestComponent);
}
