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
describe('binding to CSS class list', () => {
    let fixture;
    function normalizeClassNames(classes) {
        return classes.trim().split(' ').sort().join(' ');
    }
    function detectChangesAndExpectClassName(classes) {
        fixture.detectChanges();
        let nonNormalizedClassName = fixture.debugElement.children[0].nativeElement.className;
        expect(normalizeClassNames(nonNormalizedClassName)).toEqual(normalizeClassNames(classes));
    }
    function getComponent() {
        return fixture.debugElement.componentInstance;
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent],
        });
    });
    it('should clean up when the directive is destroyed', (0, testing_1.waitForAsync)(() => {
        fixture = createTestComponent('<div *ngFor="let item of items" [ngClass]="item"></div>');
        getComponent().items = [['0']];
        fixture.detectChanges();
        getComponent().items = [['1']];
        detectChangesAndExpectClassName('1');
    }));
    describe('expressions evaluating to objects', () => {
        it('should add classes specified in an object literal', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="{foo: true, bar: false}"></div>');
            detectChangesAndExpectClassName('foo');
        }));
        it('should add classes specified in an object literal without change in class names', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="{'foo-bar': true, 'fooBar': true}"></div>`);
            detectChangesAndExpectClassName('foo-bar fooBar');
        }));
        it('should add and remove classes based on changes in object literal values', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="{foo: condition, bar: !condition}"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().condition = false;
            detectChangesAndExpectClassName('bar');
        }));
        it('should add and remove classes based on changes to the expression object', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            const objExpr = getComponent().objExpr;
            detectChangesAndExpectClassName('foo');
            objExpr['bar'] = true;
            detectChangesAndExpectClassName('foo bar');
            objExpr['baz'] = true;
            detectChangesAndExpectClassName('foo bar baz');
            delete objExpr['bar'];
            detectChangesAndExpectClassName('foo baz');
        }));
        it('should add and remove classes based on reference changes to the expression object', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().objExpr = { foo: true, bar: true };
            detectChangesAndExpectClassName('foo bar');
            getComponent().objExpr = { baz: true };
            detectChangesAndExpectClassName('baz');
        }));
        it('should remove active classes when expression evaluates to null', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().objExpr = null;
            detectChangesAndExpectClassName('');
            getComponent().objExpr = { 'foo': false, 'bar': true };
            detectChangesAndExpectClassName('bar');
        }));
        it('should remove active classes when expression evaluates to undefined', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().objExpr = undefined;
            detectChangesAndExpectClassName('');
            getComponent().objExpr = { 'foo': false, 'bar': true };
            detectChangesAndExpectClassName('bar');
        }));
        it('should allow multiple classes per expression', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            getComponent().objExpr = { 'bar baz': true, 'bar1 baz1': true };
            detectChangesAndExpectClassName('bar baz bar1 baz1');
            getComponent().objExpr = { 'bar baz': false, 'bar1 baz1': true };
            detectChangesAndExpectClassName('bar1 baz1');
        }));
        it('should split by one or more spaces between classes', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr"></div>');
            getComponent().objExpr = { 'foo bar     baz': true };
            detectChangesAndExpectClassName('foo bar baz');
        }));
    });
    describe('expressions evaluating to lists', () => {
        it('should add classes specified in a list literal', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="['foo', 'bar', 'foo-bar', 'fooBar']"></div>`);
            detectChangesAndExpectClassName('foo bar foo-bar fooBar');
        }));
        it('should add and remove classes based on changes to the expression', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="arrExpr"></div>');
            const arrExpr = getComponent().arrExpr;
            detectChangesAndExpectClassName('foo');
            arrExpr.push('bar');
            detectChangesAndExpectClassName('foo bar');
            arrExpr[1] = 'baz';
            detectChangesAndExpectClassName('foo baz');
            getComponent().arrExpr = arrExpr.filter((v) => v !== 'baz');
            detectChangesAndExpectClassName('foo');
        }));
        it('should add and remove classes when a reference changes', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="arrExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().arrExpr = ['bar'];
            detectChangesAndExpectClassName('bar');
        }));
        it('should take initial classes into account when a reference changes', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div class="foo" [ngClass]="arrExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().arrExpr = ['bar'];
            detectChangesAndExpectClassName('foo bar');
        }));
        it('should ignore empty or blank class names', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div class="foo" [ngClass]="arrExpr"></div>');
            getComponent().arrExpr = ['', '  '];
            detectChangesAndExpectClassName('foo');
        }));
        it('should trim blanks from class names', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div class="foo" [ngClass]="arrExpr"></div>');
            getComponent().arrExpr = [' bar  '];
            detectChangesAndExpectClassName('foo bar');
        }));
        it('should allow multiple classes per item in arrays', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="arrExpr"></div>');
            getComponent().arrExpr = ['foo bar baz', 'foo1 bar1   baz1'];
            detectChangesAndExpectClassName('foo bar baz foo1 bar1 baz1');
            getComponent().arrExpr = ['foo bar   baz foobar'];
            detectChangesAndExpectClassName('foo bar baz foobar');
        }));
        it('should throw with descriptive error message when CSS class is not a string', () => {
            fixture = createTestComponent(`<div [ngClass]="['foo', {}]"></div>`);
            expect(() => fixture.detectChanges()).toThrowError(/NgClass can only toggle CSS classes expressed as strings, got \[object Object\]/);
        });
    });
    describe('expressions evaluating to sets', () => {
        it('should add and remove classes if the set instance changed', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="setExpr"></div>');
            let setExpr = new Set();
            setExpr.add('bar');
            getComponent().setExpr = setExpr;
            detectChangesAndExpectClassName('bar');
            setExpr = new Set();
            setExpr.add('baz');
            getComponent().setExpr = setExpr;
            detectChangesAndExpectClassName('baz');
        }));
    });
    describe('expressions evaluating to string', () => {
        it('should add classes specified in a string literal', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="'foo bar foo-bar fooBar'"></div>`);
            detectChangesAndExpectClassName('foo bar foo-bar fooBar');
        }));
        it('should add and remove classes based on changes to the expression', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="strExpr"></div>');
            detectChangesAndExpectClassName('foo');
            getComponent().strExpr = 'foo bar';
            detectChangesAndExpectClassName('foo bar');
            getComponent().strExpr = 'baz';
            detectChangesAndExpectClassName('baz');
        }));
        it('should remove active classes when switching from string to null', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="strExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            getComponent().strExpr = null;
            detectChangesAndExpectClassName('');
        }));
        it('should remove active classes when switching from string to undefined', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="strExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            getComponent().strExpr = undefined;
            detectChangesAndExpectClassName('');
        }));
        it('should take initial classes into account when switching from string to null', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div class="foo" [ngClass]="strExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            getComponent().strExpr = null;
            detectChangesAndExpectClassName('foo');
        }));
        it('should take initial classes into account when switching from string to undefined', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div class="foo" [ngClass]="strExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            getComponent().strExpr = undefined;
            detectChangesAndExpectClassName('foo');
        }));
        it('should ignore empty and blank strings', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div class="foo" [ngClass]="strExpr"></div>`);
            getComponent().strExpr = '';
            detectChangesAndExpectClassName('foo');
        }));
    });
    describe('cooperation with other class-changing constructs', () => {
        it('should co-operate with the class attribute', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent('<div [ngClass]="objExpr" class="init foo"></div>');
            const objExpr = getComponent().objExpr;
            objExpr['bar'] = true;
            detectChangesAndExpectClassName('init foo bar');
            objExpr['foo'] = false;
            detectChangesAndExpectClassName('init bar');
            getComponent().objExpr = null;
            detectChangesAndExpectClassName('init foo');
            getComponent().objExpr = undefined;
            detectChangesAndExpectClassName('init foo');
        }));
        it('should co-operate with the interpolated class attribute', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="objExpr" class="{{'init foo'}}"></div>`);
            const objExpr = getComponent().objExpr;
            objExpr['bar'] = true;
            detectChangesAndExpectClassName(`init foo bar`);
            objExpr['foo'] = false;
            detectChangesAndExpectClassName(`init bar`);
            getComponent().objExpr = null;
            detectChangesAndExpectClassName(`init foo`);
            getComponent().objExpr = undefined;
            detectChangesAndExpectClassName(`init foo`);
        }));
        it('should co-operate with the interpolated class attribute when interpolation changes', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="{large: false, small: true}" class="{{strExpr}}"></div>`);
            detectChangesAndExpectClassName(`foo small`);
            getComponent().strExpr = 'bar';
            detectChangesAndExpectClassName(`bar small`);
            getComponent().strExpr = undefined;
            detectChangesAndExpectClassName(`small`);
        }));
        it('should co-operate with the class attribute and binding to it', (0, testing_1.waitForAsync)(() => {
            fixture = createTestComponent(`<div [ngClass]="objExpr" class="init" [class]="'foo'"></div>`);
            const objExpr = getComponent().objExpr;
            objExpr['bar'] = true;
            detectChangesAndExpectClassName(`init foo bar`);
            objExpr['foo'] = false;
            detectChangesAndExpectClassName(`init bar`);
            getComponent().objExpr = null;
            detectChangesAndExpectClassName(`init foo`);
            getComponent().objExpr = undefined;
            detectChangesAndExpectClassName(`init foo`);
        }));
        it('should co-operate with the class attribute and class.name binding', (0, testing_1.waitForAsync)(() => {
            const template = '<div class="init foo" [ngClass]="objExpr" [class.baz]="condition"></div>';
            fixture = createTestComponent(template);
            const objExpr = getComponent().objExpr;
            detectChangesAndExpectClassName('init foo baz');
            objExpr['bar'] = true;
            detectChangesAndExpectClassName('init foo baz bar');
            objExpr['foo'] = false;
            detectChangesAndExpectClassName('init baz bar');
            getComponent().condition = false;
            detectChangesAndExpectClassName('init bar');
        }));
        it('should co-operate with initial class and class attribute binding when binding changes', (0, testing_1.waitForAsync)(() => {
            const template = '<div class="init" [ngClass]="objExpr" [class]="strExpr"></div>';
            fixture = createTestComponent(template);
            const cmp = getComponent();
            detectChangesAndExpectClassName('init foo');
            cmp.objExpr['bar'] = true;
            detectChangesAndExpectClassName('init foo bar');
            cmp.strExpr = 'baz';
            detectChangesAndExpectClassName('init bar baz foo');
            cmp.objExpr = null;
            detectChangesAndExpectClassName('init baz');
            cmp.objExpr = undefined;
            detectChangesAndExpectClassName('init baz');
        }));
    });
    describe('prevent regressions', () => {
        // https://github.com/angular/angular/issues/34336
        it('should not write to the native node unless the bound expression has changed', () => {
            fixture = createTestComponent(`<div [ngClass]="{'color-red': condition}"></div>`);
            detectChangesAndExpectClassName('color-red');
            // Overwrite CSS classes so that we can check if ngClass performed DOM manipulation to
            // update it
            fixture.debugElement.children[0].nativeElement.className = '';
            // Assert that the DOM node still has the same value after change detection
            detectChangesAndExpectClassName('');
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            fixture.componentInstance.condition = true;
            detectChangesAndExpectClassName('color-red');
        });
        it('should not write to the native node when values are the same (obj reference change)', () => {
            fixture = createTestComponent(`<div [ngClass]="objExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            // Overwrite CSS classes so that we can check if ngClass performed DOM manipulation to
            // update it
            fixture.debugElement.children[0].nativeElement.className = '';
            // Assert that the DOM node still has the same value after change detection
            detectChangesAndExpectClassName('');
            // change the object reference (without changing values)
            fixture.componentInstance.objExp = Object.assign({}, fixture.componentInstance.objExp);
            detectChangesAndExpectClassName('');
        });
        it('should not write to the native node when values are the same (array reference change)', () => {
            fixture = createTestComponent(`<div [ngClass]="arrExpr"></div>`);
            detectChangesAndExpectClassName('foo');
            // Overwrite CSS classes so that we can check if ngClass performed DOM manipulation to
            // update it
            fixture.debugElement.children[0].nativeElement.className = '';
            // Assert that the DOM node still has the same value after change detection
            detectChangesAndExpectClassName('');
            // change the object reference (without changing values)
            fixture.componentInstance.arrExpr = [...fixture.componentInstance.arrExpr];
            detectChangesAndExpectClassName('');
        });
        it('should not add css class when bound initial class is removed by ngClass binding', () => {
            fixture = createTestComponent(`<div [class]="'bar'" [ngClass]="objExpr"></div>`);
            detectChangesAndExpectClassName('foo');
        });
        it('should not add css class when static initial class is removed by ngClass binding', () => {
            fixture = createTestComponent(`<div class="bar" [ngClass]="objExpr"></div>`);
            detectChangesAndExpectClassName('foo');
        });
        it('should allow classes with trailing and leading spaces in [ngClass]', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div leading-space [ngClass]="{' foo': applyClasses}"></div>
          <div trailing-space [ngClass]="{'foo ': applyClasses}"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.applyClasses = true;
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Cmp] });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const leading = fixture.nativeElement.querySelector('[leading-space]');
            const trailing = fixture.nativeElement.querySelector('[trailing-space]');
            expect(leading.className).toBe('foo');
            expect(trailing.className).toBe('foo');
        });
        it('should mix class and ngClass bindings with the same value', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.NgClass],
                        template: `<div class="{{ 'option-' + level }}" [ngClass]="'option-' + level"></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.level = 1;
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
            expect(fixture.nativeElement.firstChild.className).toBe('option-1');
            fixture.componentInstance.level = 5;
            fixture.detectChanges();
            expect(fixture.nativeElement.firstChild.className).toBe('option-5');
        });
        it('should be available as a standalone directive', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.NgClass],
                        template: `<div trailing-space [ngClass]="{foo: applyClasses}"></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.applyClasses = true;
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
            expect(fixture.nativeElement.firstChild.className).toBe('foo');
        });
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
        constructor() {
            this.condition = true;
            this.arrExpr = ['foo'];
            this.setExpr = new Set();
            this.objExpr = { 'foo': true, 'bar': false };
            this.strExpr = 'foo';
            this.setExpr.add('foo');
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
function createTestComponent(template) {
    return testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } }).createComponent(TestComponent);
}
