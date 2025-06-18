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
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('NgSwitch', () => {
    let fixture;
    function getComponent() {
        return fixture.componentInstance;
    }
    function detectChangesAndExpectText(text) {
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText(text);
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent, ComplexComponent],
            imports: [index_1.CommonModule],
        });
    });
    describe('switch value changes', () => {
        it('should switch amongst when values', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchCase="\'a\'">when a</li>' +
                '<li *ngSwitchCase="\'b\'">when b</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('');
            getComponent().switchValue = 'a';
            detectChangesAndExpectText('when a');
            getComponent().switchValue = 'b';
            detectChangesAndExpectText('when b');
        });
        it('should switch amongst when values with fallback to default', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchCase="\'a\'">when a</li>' +
                '<li *ngSwitchDefault>when default</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('when default');
            getComponent().switchValue = 'a';
            detectChangesAndExpectText('when a');
            getComponent().switchValue = 'b';
            detectChangesAndExpectText('when default');
            getComponent().switchValue = 'c';
            detectChangesAndExpectText('when default');
        });
        it('should support multiple whens with the same value', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchCase="\'a\'">when a1;</li>' +
                '<li *ngSwitchCase="\'b\'">when b1;</li>' +
                '<li *ngSwitchCase="\'a\'">when a2;</li>' +
                '<li *ngSwitchCase="\'b\'">when b2;</li>' +
                '<li *ngSwitchDefault>when default1;</li>' +
                '<li *ngSwitchDefault>when default2;</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('when default1;when default2;');
            getComponent().switchValue = 'a';
            detectChangesAndExpectText('when a1;when a2;');
            getComponent().switchValue = 'b';
            detectChangesAndExpectText('when b1;when b2;');
        });
        it('should use === to match cases', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchCase="1">when one</li>' +
                '<li *ngSwitchDefault>when default</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('when default');
            getComponent().switchValue = 1;
            detectChangesAndExpectText('when one');
            getComponent().switchValue = '1';
            detectChangesAndExpectText('when default');
        });
    });
    describe('when values changes', () => {
        it('should switch amongst when values', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchCase="when1">when 1;</li>' +
                '<li *ngSwitchCase="when2">when 2;</li>' +
                '<li *ngSwitchDefault>when default;</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            getComponent().when1 = 'a';
            getComponent().when2 = 'b';
            getComponent().switchValue = 'a';
            detectChangesAndExpectText('when 1;');
            getComponent().switchValue = 'b';
            detectChangesAndExpectText('when 2;');
            getComponent().switchValue = 'c';
            detectChangesAndExpectText('when default;');
            getComponent().when1 = 'c';
            detectChangesAndExpectText('when 1;');
            getComponent().when1 = 'd';
            detectChangesAndExpectText('when default;');
        });
    });
    it('should be available as standalone directives', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.NgSwitch, index_1.NgSwitchCase, index_1.NgSwitchDefault],
                    template: '<ul [ngSwitch]="switchValue">' +
                        '<li *ngSwitchCase="\'a\'">when a</li>' +
                        '<li *ngSwitchDefault>when default</li>' +
                        '</ul>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.switchValue = 'a';
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
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('when a');
        fixture.componentInstance.switchValue = 'b';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('when default');
        fixture.componentInstance.switchValue = 'c';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('when default');
    });
    describe('corner cases', () => {
        it('should not create the default case if another case matches', () => {
            const log = [];
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    constructor(test) {
                        log.push(test);
                    }
                };
                __setFunctionName(_classThis, "TestDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDirective = _classThis;
            })();
            const template = '<div [ngSwitch]="switchValue">' +
                '<div *ngSwitchCase="\'a\'" test="aCase"></div>' +
                '<div *ngSwitchDefault test="defaultCase"></div>' +
                '</div>';
            testing_1.TestBed.configureTestingModule({ declarations: [TestDirective] });
            const fixture = createTestComponent(template);
            fixture.componentInstance.switchValue = 'a';
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual(['aCase']);
        });
        it('should create the default case if there is no other case', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchDefault>when default1;</li>' +
                '<li *ngSwitchDefault>when default2;</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('when default1;when default2;');
        });
        it('should allow defaults before cases', () => {
            const template = '<ul [ngSwitch]="switchValue">' +
                '<li *ngSwitchDefault>when default1;</li>' +
                '<li *ngSwitchDefault>when default2;</li>' +
                '<li *ngSwitchCase="\'a\'">when a1;</li>' +
                '<li *ngSwitchCase="\'b\'">when b1;</li>' +
                '<li *ngSwitchCase="\'a\'">when a2;</li>' +
                '<li *ngSwitchCase="\'b\'">when b2;</li>' +
                '</ul>';
            fixture = createTestComponent(template);
            detectChangesAndExpectText('when default1;when default2;');
            getComponent().switchValue = 'a';
            detectChangesAndExpectText('when a1;when a2;');
            getComponent().switchValue = 'b';
            detectChangesAndExpectText('when b1;when b2;');
        });
        it('should throw error when ngSwitchCase is used outside of ngSwitch', (0, testing_1.waitForAsync)(() => {
            const template = '<div [ngSwitch]="switchValue"></div>' + '<div *ngSwitchCase="\'a\'"></div>';
            (0, matchers_1.expect)(() => createTestComponent(template)).toThrowError('NG02000: An element with the "ngSwitchCase" attribute (matching the "NgSwitchCase" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)');
        }));
        it('should throw error when ngSwitchDefault is used outside of ngSwitch', (0, testing_1.waitForAsync)(() => {
            const template = '<div [ngSwitch]="switchValue"></div>' + '<div *ngSwitchDefault></div>';
            (0, matchers_1.expect)(() => createTestComponent(template)).toThrowError('NG02000: An element with the "ngSwitchDefault" attribute (matching the "NgSwitchDefault" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)');
        }));
        it('should support nested NgSwitch on ng-container with ngTemplateOutlet', () => {
            fixture = testing_1.TestBed.createComponent(ComplexComponent);
            detectChangesAndExpectText('Foo');
            fixture.componentInstance.state = 'case2';
            detectChangesAndExpectText('Bar');
            fixture.componentInstance.state = 'notACase';
            detectChangesAndExpectText('Default');
            fixture.componentInstance.state = 'case1';
            detectChangesAndExpectText('Foo');
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
            this.switchValue = null;
            this.when1 = null;
            this.when2 = null;
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
let ComplexComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'complex-cmp',
            template: `
    <div [ngSwitch]="state">
      <ng-container *ngSwitchCase="'case1'" [ngSwitch]="true">
        <ng-container *ngSwitchCase="true" [ngTemplateOutlet]="foo"></ng-container>
        <span *ngSwitchDefault>Should never render</span>
      </ng-container>
      <ng-container *ngSwitchCase="'case2'" [ngSwitch]="true">
        <ng-container *ngSwitchCase="true" [ngTemplateOutlet]="bar"></ng-container>
        <span *ngSwitchDefault>Should never render</span>
      </ng-container>
      <ng-container *ngSwitchDefault [ngSwitch]="false">
        <ng-container *ngSwitchCase="true" [ngTemplateOutlet]="foo"></ng-container>
        <span *ngSwitchDefault>Default</span>
      </ng-container>
    </div>

    <ng-template #foo>
      <span>Foo</span>
    </ng-template>
    <ng-template #bar>
      <span>Bar</span>
    </ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foo_decorators;
    let _foo_initializers = [];
    let _foo_extraInitializers = [];
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    var ComplexComponent = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, void 0));
            this.state = (__runInitializers(this, _bar_extraInitializers), 'case1');
        }
    };
    __setFunctionName(_classThis, "ComplexComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.ViewChild)('foo', { static: true })];
        _bar_decorators = [(0, core_1.ViewChild)('bar', { static: true })];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComplexComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComplexComponent = _classThis;
})();
function createTestComponent(template) {
    return testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } }).createComponent(TestComponent);
}
