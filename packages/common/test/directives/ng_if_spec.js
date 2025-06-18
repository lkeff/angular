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
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('ngIf directive', () => {
    let fixture;
    function getComponent() {
        return fixture.componentInstance;
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [index_1.CommonModule],
        });
    });
    it('should work in a template attribute', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngIf="booleanCondition">hello</span>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
    }));
    it('should work on a template element', (0, testing_1.waitForAsync)(() => {
        const template = '<ng-template [ngIf]="booleanCondition">hello2</ng-template>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello2');
    }));
    it('should toggle node when condition changes', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngIf="booleanCondition">hello</span>';
        fixture = createTestComponent(template);
        getComponent().booleanCondition = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(0);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        getComponent().booleanCondition = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
        getComponent().booleanCondition = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(0);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
    }));
    it('should handle nested if correctly', (0, testing_1.waitForAsync)(() => {
        const template = '<div *ngIf="booleanCondition"><span *ngIf="nestedBooleanCondition">hello</span></div>';
        fixture = createTestComponent(template);
        getComponent().booleanCondition = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(0);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        getComponent().booleanCondition = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
        getComponent().nestedBooleanCondition = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(0);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        getComponent().nestedBooleanCondition = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
        getComponent().booleanCondition = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(0);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
    }));
    it('should update several nodes with if', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngIf="numberCondition + 1 >= 2">helloNumber</span>' +
            '<span *ngIf="stringCondition == \'foo\'">helloString</span>' +
            '<span *ngIf="functionCondition(stringCondition, numberCondition)">helloFunction</span>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(3);
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('helloNumberhelloStringhelloFunction');
        getComponent().numberCondition = 0;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('helloString');
        getComponent().numberCondition = 1;
        getComponent().stringCondition = 'bar';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.queryAll(by_1.By.css('span')).length).toEqual(1);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('helloNumber');
    }));
    it('should not add the element twice if the condition goes from truthy to truthy', (0, testing_1.waitForAsync)(() => {
        const template = '<span *ngIf="numberCondition">hello</span>';
        fixture = createTestComponent(template);
        fixture.detectChanges();
        let els = fixture.debugElement.queryAll(by_1.By.css('span'));
        (0, matchers_1.expect)(els.length).toEqual(1);
        els[0].nativeElement.classList.add('marker');
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
        getComponent().numberCondition = 2;
        fixture.detectChanges();
        els = fixture.debugElement.queryAll(by_1.By.css('span'));
        (0, matchers_1.expect)(els.length).toEqual(1);
        (0, matchers_1.expect)(els[0].nativeElement.classList.contains('marker')).toBe(true);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('hello');
    }));
    describe('then/else templates', () => {
        it('should support else', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; else elseBlock">TRUE</span>' +
                '<ng-template #elseBlock>FALSE</ng-template>';
            fixture = createTestComponent(template);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('TRUE');
            getComponent().booleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('FALSE');
        }));
        it('should support then and else', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; then thenBlock; else elseBlock">IGNORE</span>' +
                '<ng-template #thenBlock>THEN</ng-template>' +
                '<ng-template #elseBlock>ELSE</ng-template>';
            fixture = createTestComponent(template);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('THEN');
            getComponent().booleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('ELSE');
        }));
        it('should support removing the then/else templates', () => {
            const template = `<span *ngIf="booleanCondition;
            then nestedBooleanCondition ? tplRef : null;
            else nestedBooleanCondition ? tplRef : null"></span>
        <ng-template #tplRef>Template</ng-template>`;
            fixture = createTestComponent(template);
            const comp = fixture.componentInstance;
            // then template
            comp.booleanCondition = true;
            comp.nestedBooleanCondition = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Template');
            comp.nestedBooleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
            // else template
            comp.booleanCondition = true;
            comp.nestedBooleanCondition = true;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Template');
            comp.nestedBooleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        });
        it('should support dynamic else', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; else nestedBooleanCondition ? b1 : b2">TRUE</span>' +
                '<ng-template #b1>FALSE1</ng-template>' +
                '<ng-template #b2>FALSE2</ng-template>';
            fixture = createTestComponent(template);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('TRUE');
            getComponent().booleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('FALSE1');
            getComponent().nestedBooleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('FALSE2');
        }));
        it('should support binding to variable using let', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; else elseBlock; let v">{{v}}</span>' +
                '<ng-template #elseBlock let-v>{{v}}</ng-template>';
            fixture = createTestComponent(template);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('true');
            getComponent().booleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('false');
        }));
        it('should support binding to variable using as', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition as v; else elseBlock">{{v}}</span>' +
                '<ng-template #elseBlock let-v>{{v}}</ng-template>';
            fixture = createTestComponent(template);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('true');
            getComponent().booleanCondition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('false');
        }));
        it('should be available as a standalone directive', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-component',
                        imports: [index_1.NgIf],
                        template: `
          <div *ngIf="true">Hello</div>
          <div *ngIf="false">World</div>
        `,
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
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Hello');
            (0, matchers_1.expect)(fixture.nativeElement.textContent).not.toBe('World');
        });
    });
    describe('Type guarding', () => {
        it('should throw when then block is not template', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; then thenBlock">IGNORE</span>' +
                '<div #thenBlock>THEN</div>';
            fixture = createTestComponent(template);
            (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ngIfThen must be a TemplateRef, but received/);
        }));
        it('should throw when else block is not template', (0, testing_1.waitForAsync)(() => {
            const template = '<span *ngIf="booleanCondition; else elseBlock">IGNORE</span>' +
                '<div #elseBlock>ELSE</div>';
            fixture = createTestComponent(template);
            (0, matchers_1.expect)(() => fixture.detectChanges()).toThrowError(/ngIfElse must be a TemplateRef, but received/);
        }));
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
            this.booleanCondition = true;
            this.nestedBooleanCondition = true;
            this.numberCondition = 1;
            this.stringCondition = 'foo';
            this.functionCondition = (s, n) => s == 'foo' && n == 1;
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
