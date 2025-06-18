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
describe('NgTemplateOutlet', () => {
    let fixture;
    function setTplRef(value) {
        fixture.componentInstance.currentTplRef = value;
    }
    function detectChangesAndExpectText(text) {
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.nativeElement).toHaveText(text);
    }
    afterEach(() => {
        fixture = null;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                CaptureTplRefs,
                DestroyableCmpt,
                MultiContextComponent,
                InjectValueComponent,
            ],
            imports: [index_1.CommonModule],
            providers: [DestroyedSpyService],
        });
    });
    // https://github.com/angular/angular/issues/14778
    it('should accept the component as the context', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-container *ngTemplateOutlet="tpl; context: this"></ng-container>` +
            `<ng-template #tpl>{{context.foo}}</ng-template>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('bar');
    }));
    it('should do nothing if templateRef is `null`', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-container [ngTemplateOutlet]="null"></ng-container>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('');
    }));
    it('should insert content specified by TemplateRef', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template #tpl>foo</ng-template>` +
            `<ng-container [ngTemplateOutlet]="tpl"></ng-container>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('foo');
    }));
    it('should clear content if TemplateRef becomes `null`', (0, testing_1.waitForAsync)(() => {
        const template = `<tpl-refs #refs="tplRefs"><ng-template>foo</ng-template></tpl-refs>` +
            `<ng-container [ngTemplateOutlet]="currentTplRef"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        const refs = fixture.debugElement.children[0].references['refs'];
        setTplRef(refs.tplRefs.first);
        detectChangesAndExpectText('foo');
        setTplRef(null);
        detectChangesAndExpectText('');
    }));
    it('should swap content if TemplateRef changes', (0, testing_1.waitForAsync)(() => {
        const template = `<tpl-refs #refs="tplRefs"><ng-template>foo</ng-template><ng-template>bar</ng-template></tpl-refs>` +
            `<ng-container [ngTemplateOutlet]="currentTplRef"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        const refs = fixture.debugElement.children[0].references['refs'];
        setTplRef(refs.tplRefs.first);
        detectChangesAndExpectText('foo');
        setTplRef(refs.tplRefs.last);
        detectChangesAndExpectText('bar');
    }));
    it('should display template if context is `null`', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template #tpl>foo</ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; context: null"></ng-container>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('foo');
    }));
    it('should reflect initial context and changes', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template let-foo="foo" #tpl>{{foo}}</ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; context: context"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        detectChangesAndExpectText('bar');
        fixture.componentInstance.context.foo = 'alter-bar';
        detectChangesAndExpectText('alter-bar');
    }));
    it('should reflect user defined `$implicit` property in the context', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template let-ctx #tpl>{{ctx.foo}}</ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; context: context"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.context = { $implicit: { foo: 'bra' } };
        detectChangesAndExpectText('bra');
    }));
    it('should reflect context re-binding', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template let-shawshank="shawshank" #tpl>{{shawshank}}</ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; context: context"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.context = { shawshank: 'brooks' };
        detectChangesAndExpectText('brooks');
        fixture.componentInstance.context = { shawshank: 'was here' };
        detectChangesAndExpectText('was here');
    }));
    it('should update but not destroy embedded view when context values change', () => {
        const template = `<ng-template let-foo="foo" #tpl><destroyable-cmpt></destroyable-cmpt>:{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{foo: value}"></ng-template>`;
        fixture = createTestComponent(template);
        const spyService = fixture.debugElement.injector.get(DestroyedSpyService);
        detectChangesAndExpectText('Content to destroy:bar');
        (0, matchers_1.expect)(spyService.destroyed).toBeFalsy();
        fixture.componentInstance.value = 'baz';
        detectChangesAndExpectText('Content to destroy:baz');
        (0, matchers_1.expect)(spyService.destroyed).toBeFalsy();
    });
    it('should update but not destroy embedded view when context shape changes', () => {
        const template = `<ng-template let-foo="foo" #tpl><destroyable-cmpt></destroyable-cmpt>:{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="context"></ng-template>`;
        fixture = createTestComponent(template);
        const spyService = fixture.debugElement.injector.get(DestroyedSpyService);
        detectChangesAndExpectText('Content to destroy:bar');
        (0, matchers_1.expect)(spyService.destroyed).toBeFalsy();
        fixture.componentInstance.context = { foo: 'baz', other: true };
        detectChangesAndExpectText('Content to destroy:baz');
        (0, matchers_1.expect)(spyService.destroyed).toBeFalsy();
    });
    it('should destroy embedded view when context value changes and templateRef becomes undefined', () => {
        const template = `<ng-template let-foo="foo" #tpl><destroyable-cmpt></destroyable-cmpt>:{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="value === 'bar' ? tpl : undefined" [ngTemplateOutletContext]="{foo: value}"></ng-template>`;
        fixture = createTestComponent(template);
        const spyService = fixture.debugElement.injector.get(DestroyedSpyService);
        detectChangesAndExpectText('Content to destroy:bar');
        (0, matchers_1.expect)(spyService.destroyed).toBeFalsy();
        fixture.componentInstance.value = 'baz';
        detectChangesAndExpectText('');
        (0, matchers_1.expect)(spyService.destroyed).toBeTruthy();
    });
    it('should not try to update null / undefined context when context changes but template stays the same', () => {
        const template = `<ng-template let-foo="foo" #tpl>{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="value === 'bar' ? null : undefined"></ng-template>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('');
        fixture.componentInstance.value = 'baz';
        detectChangesAndExpectText('');
    });
    it('should not try to update null / undefined context when template changes', () => {
        const template = `<ng-template let-foo="foo" #tpl1>{{foo}}</ng-template>` +
            `<ng-template let-foo="foo" #tpl2>{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="value === 'bar' ? tpl1 : tpl2" [ngTemplateOutletContext]="value === 'bar' ? null : undefined"></ng-template>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('');
        fixture.componentInstance.value = 'baz';
        detectChangesAndExpectText('');
    });
    it('should not try to update context on undefined view', () => {
        const template = `<ng-template let-foo="foo" #tpl>{{foo}}</ng-template>` +
            `<ng-template [ngTemplateOutlet]="value === 'bar' ? null : undefined" [ngTemplateOutletContext]="{foo: value}"></ng-template>`;
        fixture = createTestComponent(template);
        detectChangesAndExpectText('');
        fixture.componentInstance.value = 'baz';
        detectChangesAndExpectText('');
    });
    // https://github.com/angular/angular/issues/30801
    it('should not throw if the context is left blank', () => {
        const template = `
      <ng-template #testTemplate>test</ng-template>
      <ng-template [ngTemplateOutlet]="testTemplate" [ngTemplateOutletContext]=""></ng-template>
    `;
        (0, matchers_1.expect)(() => {
            fixture = createTestComponent(template);
            detectChangesAndExpectText('test');
        }).not.toThrow();
    });
    it('should not throw when switching from template to null and back to template', (0, testing_1.waitForAsync)(() => {
        const template = `<tpl-refs #refs="tplRefs"><ng-template>foo</ng-template></tpl-refs>` +
            `<ng-container [ngTemplateOutlet]="currentTplRef"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();
        const refs = fixture.debugElement.children[0].references['refs'];
        setTplRef(refs.tplRefs.first);
        detectChangesAndExpectText('foo');
        setTplRef(null);
        detectChangesAndExpectText('');
        (0, matchers_1.expect)(() => {
            setTplRef(refs.tplRefs.first);
            detectChangesAndExpectText('foo');
        }).not.toThrow();
    }));
    it('should not mutate context object if two contexts with an identical shape are swapped', () => {
        fixture = testing_1.TestBed.createComponent(MultiContextComponent);
        const { componentInstance, nativeElement } = fixture;
        componentInstance.context1 = { name: 'one' };
        componentInstance.context2 = { name: 'two' };
        fixture.detectChanges();
        (0, matchers_1.expect)(nativeElement.textContent.trim()).toBe('one | two');
        (0, matchers_1.expect)(componentInstance.context1).toEqual({ name: 'one' });
        (0, matchers_1.expect)(componentInstance.context2).toEqual({ name: 'two' });
        const temp = componentInstance.context1;
        componentInstance.context1 = componentInstance.context2;
        componentInstance.context2 = temp;
        fixture.detectChanges();
        (0, matchers_1.expect)(nativeElement.textContent.trim()).toBe('two | one');
        (0, matchers_1.expect)(componentInstance.context1).toEqual({ name: 'two' });
        (0, matchers_1.expect)(componentInstance.context2).toEqual({ name: 'one' });
    });
    it('should be able to specify an injector', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template #tpl><inject-value></inject-value></ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; injector: injector"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: templateToken, useValue: 'world' }],
        });
        detectChangesAndExpectText('Hello world');
    }));
    it('should re-render if the injector changes', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template #tpl><inject-value></inject-value></ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; injector: injector"></ng-container>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: templateToken, useValue: 'world' }],
        });
        detectChangesAndExpectText('Hello world');
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: templateToken, useValue: 'there' }],
        });
        detectChangesAndExpectText('Hello there');
    }));
    it('should override providers from parent component using custom injector', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template #tpl><inject-value></inject-value></ng-template>` +
            `<ng-container *ngTemplateOutlet="tpl; injector: injector"></ng-container>`;
        fixture = createTestComponent(template, [{ provide: templateToken, useValue: 'parent' }]);
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: templateToken, useValue: 'world' }],
        });
        detectChangesAndExpectText('Hello world');
    }));
    it('should be available as a standalone directive', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.NgTemplateOutlet],
                    template: `
        <ng-template #tpl>Hello World</ng-template>
        <ng-container *ngTemplateOutlet="tpl"></ng-container>
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
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Hello World');
    });
    it('should properly bind context if context is unset initially', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [index_1.NgTemplateOutlet],
                    template: `
        <ng-template #tpl let-name>Name:{{ name }}</ng-template>
        <ng-template [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="ctx"></ng-template>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.ctx = undefined;
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
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Name:');
        fixture.componentInstance.ctx = { $implicit: 'Angular' };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Name:Angular');
    });
});
const templateToken = new core_1.InjectionToken('templateToken');
let DestroyedSpyService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DestroyedSpyService = _classThis = class {
        constructor() {
            this.destroyed = false;
        }
    };
    __setFunctionName(_classThis, "DestroyedSpyService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DestroyedSpyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DestroyedSpyService = _classThis;
})();
let DestroyableCmpt = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'destroyable-cmpt',
            template: 'Content to destroy',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DestroyableCmpt = _classThis = class {
        constructor(_spyService) {
            this._spyService = _spyService;
        }
        ngOnDestroy() {
            this._spyService.destroyed = true;
        }
    };
    __setFunctionName(_classThis, "DestroyableCmpt");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DestroyableCmpt = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DestroyableCmpt = _classThis;
})();
let CaptureTplRefs = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'tpl-refs',
            exportAs: 'tplRefs',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _tplRefs_decorators;
    let _tplRefs_initializers = [];
    let _tplRefs_extraInitializers = [];
    var CaptureTplRefs = _classThis = class {
        constructor() {
            this.tplRefs = __runInitializers(this, _tplRefs_initializers, void 0);
            __runInitializers(this, _tplRefs_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CaptureTplRefs");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tplRefs_decorators = [(0, core_1.ContentChildren)(core_1.TemplateRef)];
        __esDecorate(null, null, _tplRefs_decorators, { kind: "field", name: "tplRefs", static: false, private: false, access: { has: obj => "tplRefs" in obj, get: obj => obj.tplRefs, set: (obj, value) => { obj.tplRefs = value; } }, metadata: _metadata }, _tplRefs_initializers, _tplRefs_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CaptureTplRefs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CaptureTplRefs = _classThis;
})();
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
            this.context = { foo: 'bar' };
            this.value = 'bar';
            this.injector = null;
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
let InjectValueComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'inject-value',
            template: 'Hello {{tokenValue}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectValueComponent = _classThis = class {
        constructor(tokenValue) {
            this.tokenValue = tokenValue;
        }
    };
    __setFunctionName(_classThis, "InjectValueComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectValueComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectValueComponent = _classThis;
})();
let MultiContextComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <ng-template #template let-name="name">{{ name }}</ng-template>
    <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="context1"></ng-template>
    |
    <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="context2"></ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultiContextComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "MultiContextComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiContextComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiContextComponent = _classThis;
})();
function createTestComponent(template, providers = []) {
    return testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template, providers } })
        .configureTestingModule({ schemas: [core_1.NO_ERRORS_SCHEMA] })
        .createComponent(TestComponent);
}
