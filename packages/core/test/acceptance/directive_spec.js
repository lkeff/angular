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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('directives', () => {
    describe('matching', () => {
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'ng-template[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestDirective = _classThis = class {
                constructor(templateRef) {
                    this.templateRef = templateRef;
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
        let TitleDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[title]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TitleDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "TitleDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TitleDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TitleDirective = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmpt',
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
        it('should match directives with attribute selectors on bindings', () => {
            let TestDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_test_decorators;
                var TestDir = _classThis = class {
                    constructor() {
                        this.testValue = __runInitializers(this, _instanceExtraInitializers);
                    }
                    /** Setter to assert that a binding is not invoked with stringified attribute value */
                    set test(value) {
                        // Assert that the binding is processed correctly. The property should be set
                        // to a "false" boolean and never to the "false" string literal.
                        this.testValue = value;
                        if (value !== false) {
                            fail('Should only be called with a false Boolean value, got a non-falsy value');
                        }
                    }
                };
                __setFunctionName(_classThis, "TestDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_test_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_test_decorators, { kind: "setter", name: "test", static: false, private: false, access: { has: obj => "test" in obj, set: (obj, value) => { obj.test = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestDir] });
            testing_1.TestBed.overrideTemplate(TestComponent, `<span class="fade" [test]="false"></span>`);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const testDir = fixture.debugElement.query(platform_browser_1.By.directive(TestDir)).injector.get(TestDir);
            const spanEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            // the "test" attribute should not be reflected in the DOM as it is here only
            // for directive matching purposes
            expect(spanEl.hasAttribute('test')).toBe(false);
            expect(spanEl.getAttribute('class')).toBe('fade');
            expect(testDir.testValue).toBe(false);
        });
        it('should not accidentally set inputs from attributes extracted from bindings / outputs', () => {
            let TestDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _prop1_decorators;
                let _prop1_initializers = [];
                let _prop1_extraInitializers = [];
                let _prop2_decorators;
                let _prop2_initializers = [];
                let _prop2_extraInitializers = [];
                let _set_test_decorators;
                var TestDir = _classThis = class {
                    constructor() {
                        this.prop1 = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _prop1_initializers, void 0));
                        this.prop2 = (__runInitializers(this, _prop1_extraInitializers), __runInitializers(this, _prop2_initializers, void 0));
                        this.testValue = __runInitializers(this, _prop2_extraInitializers);
                    }
                    /** Setter to assert that a binding is not invoked with stringified attribute value */
                    set test(value) {
                        // Assert that the binding is processed correctly. The property should be set
                        // to a "false" boolean and never to the "false" string literal.
                        this.testValue = value;
                        if (value !== false) {
                            fail('Should only be called with a false Boolean value, got a non-falsy value');
                        }
                    }
                };
                __setFunctionName(_classThis, "TestDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _prop1_decorators = [(0, core_1.Input)()];
                    _prop2_decorators = [(0, core_1.Input)()];
                    _set_test_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_test_decorators, { kind: "setter", name: "test", static: false, private: false, access: { has: obj => "test" in obj, set: (obj, value) => { obj.test = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _prop1_decorators, { kind: "field", name: "prop1", static: false, private: false, access: { has: obj => "prop1" in obj, get: obj => obj.prop1, set: (obj, value) => { obj.prop1 = value; } }, metadata: _metadata }, _prop1_initializers, _prop1_extraInitializers);
                    __esDecorate(null, null, _prop2_decorators, { kind: "field", name: "prop2", static: false, private: false, access: { has: obj => "prop2" in obj, get: obj => obj.prop2, set: (obj, value) => { obj.prop2 = value; } }, metadata: _metadata }, _prop2_initializers, _prop2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestDir] });
            testing_1.TestBed.overrideTemplate(TestComponent, `<span class="fade" [prop1]="true" [test]="false" [prop2]="true"></span>`);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const testDir = fixture.debugElement.query(platform_browser_1.By.directive(TestDir)).injector.get(TestDir);
            const spanEl = fixture.nativeElement.children[0];
            fixture.detectChanges();
            // the "test" attribute should not be reflected in the DOM as it is here only
            // for directive matching purposes
            expect(spanEl.hasAttribute('test')).toBe(false);
            expect(spanEl.hasAttribute('prop1')).toBe(false);
            expect(spanEl.hasAttribute('prop2')).toBe(false);
            expect(spanEl.getAttribute('class')).toBe('fade');
            expect(testDir.testValue).toBe(false);
        });
        it('should match directives on ng-template', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `<ng-template test></ng-template>`);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TestDirective));
            expect(nodesWithDirective.length).toBe(1);
            expect(nodesWithDirective[0].injector.get(TestDirective).templateRef instanceof core_1.TemplateRef).toBe(true);
        });
        it('should match directives on ng-template created by * syntax', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `<div *test></div>`);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TestDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should match directives on <ng-container>', () => {
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'ng-container[directiveA]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor(viewContainerRef) {
                        this.viewContainerRef = viewContainerRef;
                    }
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
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-component',
                        template: `
          <ng-container *ngIf="visible" directiveA>
            <span>Some content</span>
          </ng-container>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                    constructor() {
                        this.visible = true;
                    }
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComponent, DirectiveA],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(MyComponent);
            fixture.detectChanges();
            const directiveA = fixture.debugElement.query(platform_browser_1.By.css('span')).injector.get(DirectiveA);
            expect(directiveA.viewContainerRef).toBeTruthy();
        });
        it('should match directives on i18n-annotated attributes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <div title="My title" i18n-title="Title translation description"></div>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should match a mix of bound directives and classes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <div class="one two" [id]="someId" [title]="title"></div>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should match classes to directive selectors without case sensitivity', () => {
            let TitleClassDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '.Titledir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TitleClassDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "TitleClassDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleClassDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleClassDirective = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleClassDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <div class="titleDir" [id]="someId"></div>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleClassDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should match class selectors on ng-template', () => {
            let TitleClassDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '.titleDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TitleClassDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "TitleClassDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleClassDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleClassDirective = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleClassDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <ng-template class="titleDir"></ng-template>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleClassDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should NOT match class selectors on ng-template created by * syntax', () => {
            let TitleClassDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '.titleDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TitleClassDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "TitleClassDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleClassDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleClassDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: `<div *ngIf="condition" class="titleDir"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.condition = false;
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmp, TitleClassDirective] });
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const initialNodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleClassDirective));
            expect(initialNodesWithDirective.length).toBe(0);
            fixture.componentInstance.condition = true;
            fixture.detectChanges();
            const changedNodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleClassDirective));
            expect(changedNodesWithDirective.length).toBe(1);
        });
        it('should NOT match classes to directive selectors', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <div class="title" [id]="someId"></div>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleDirective));
            expect(nodesWithDirective.length).toBe(0);
        });
        it('should match attributes to directive selectors without case sensitivity', () => {
            let TitleAttributeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[title=Titledir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TitleAttributeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "TitleAttributeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleAttributeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleAttributeDirective = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TitleAttributeDirective] });
            testing_1.TestBed.overrideTemplate(TestComponent, `
        <div title="titleDir" [id]="someId"></div>
      `);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const nodesWithDirective = fixture.debugElement.queryAllNodes(platform_browser_1.By.directive(TitleAttributeDirective));
            expect(nodesWithDirective.length).toBe(1);
        });
        it('should match directives with attribute selectors on outputs', () => {
            let TestDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[out]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _out_decorators;
                let _out_initializers = [];
                let _out_extraInitializers = [];
                var TestDir = _classThis = class {
                    constructor() {
                        this.out = __runInitializers(this, _out_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _out_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _out_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _out_decorators, { kind: "field", name: "out", static: false, private: false, access: { has: obj => "out" in obj, get: obj => obj.out, set: (obj, value) => { obj.out = value; } }, metadata: _metadata }, _out_initializers, _out_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDir = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, TestDir] });
            testing_1.TestBed.overrideTemplate(TestComponent, `<span class="span" (out)="someVar = true"></span>`);
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const spanEl = fixture.nativeElement.children[0];
            // "out" should not be part of reflected attributes
            expect(spanEl.hasAttribute('out')).toBe(false);
            expect(spanEl.getAttribute('class')).toBe('span');
            expect(fixture.debugElement.query(platform_browser_1.By.directive(TestDir))).toBeTruthy();
        });
        it('should not match directives based on attribute bindings', () => {
            const calls = [];
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    ngOnInit() {
                        calls.push('MyDir.ngOnInit');
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: `my-comp`,
                        template: `<p [attr.dir]="direction"></p><p dir="rtl"></p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.direction = 'auto';
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            // Expect only one directive to be instantiated.
            expect(calls).toEqual(['MyDir.ngOnInit']);
        });
        it('should match directives on elements with namespace', () => {
            const calls = [];
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'svg[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(el) {
                        this.el = el;
                    }
                    ngOnInit() {
                        calls.push(`MyDir.ngOnInit: ${this.el.nativeElement.tagName}`);
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: `my-comp`,
                        template: `<svg dir><text dir></text></svg>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(calls).toEqual(['MyDir.ngOnInit: svg']);
        });
        it('should match directives on descendant elements with namespace', () => {
            const calls = [];
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'text[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(el) {
                        this.el = el;
                    }
                    ngOnInit() {
                        calls.push(`MyDir.ngOnInit: ${this.el.nativeElement.tagName}`);
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: `my-comp`,
                        template: `<svg dir><text dir></text></svg>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir, MyComp] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(calls).toEqual(['MyDir.ngOnInit: text']);
        });
        it('should match directives when the node has "class", "style" and a binding', () => {
            const logs = [];
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myInput_decorators;
                let _myInput_initializers = [];
                let _myInput_extraInitializers = [];
                let _myInput2_decorators;
                let _myInput2_initializers = [];
                let _myInput2_extraInitializers = [];
                var MyDir = _classThis = class {
                    constructor() {
                        this.myInput = __runInitializers(this, _myInput_initializers, '');
                        this.myInput2 = (__runInitializers(this, _myInput_extraInitializers), __runInitializers(this, _myInput2_initializers, ''));
                        __runInitializers(this, _myInput2_extraInitializers);
                        logs.push('MyDir.constructor');
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myInput_decorators = [(0, core_1.Input)('test')];
                    _myInput2_decorators = [(0, core_1.Input)('disabled')];
                    __esDecorate(null, null, _myInput_decorators, { kind: "field", name: "myInput", static: false, private: false, access: { has: obj => "myInput" in obj, get: obj => obj.myInput, set: (obj, value) => { obj.myInput = value; } }, metadata: _metadata }, _myInput_initializers, _myInput_extraInitializers);
                    __esDecorate(null, null, _myInput2_decorators, { kind: "field", name: "myInput2", static: false, private: false, access: { has: obj => "myInput2" in obj, get: obj => obj.myInput2, set: (obj, value) => { obj.myInput2 = value; } }, metadata: _metadata }, _myInput2_initializers, _myInput2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        // Note that below we're checking the case where the `test` attribute is after
                        // one `class`, one `attribute` and one other binding.
                        template: `
          <div class="a" style="font-size: 10px;" [disabled]="true" [test]="test"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.test = '';
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComp, MyDir] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(logs).toEqual(['MyDir.constructor']);
        });
    });
    describe('inputs', () => {
        it('should allow directive inputs (as a prop binding) on <ng-template>', () => {
            let dirInstance;
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var WithInput = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, '');
                        __runInitializers(this, _dir_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<ng-template [dir]="message"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.message = 'Hello';
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, WithInput] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(dirInstance.dir).toBe('Hello');
        });
        it('should allow directive inputs (as an interpolated prop) on <ng-template>', () => {
            let dirInstance;
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var WithInput = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, '');
                        __runInitializers(this, _dir_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<ng-template dir="{{ message }}"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.message = 'Hello';
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, WithInput] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(dirInstance.dir).toBe('Hello');
        });
        it('should allow directive inputs (as an interpolated prop) on <ng-template> with structural directives', () => {
            let dirInstance;
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var WithInput = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, '');
                        __runInitializers(this, _dir_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<ng-template *ngIf="true" dir="{{ message }}"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.message = 'Hello';
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, WithInput] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(dirInstance.dir).toBe('Hello');
        });
        it('should not set structural directive inputs from static element attrs', () => {
            const dirInstances = [];
            let StructuralDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirOf_decorators;
                let _dirOf_initializers = [];
                let _dirOf_extraInitializers = [];
                let _dirUnboundInput_decorators;
                let _dirUnboundInput_initializers = [];
                let _dirUnboundInput_extraInitializers = [];
                var StructuralDir = _classThis = class {
                    constructor() {
                        this.dirOf = __runInitializers(this, _dirOf_initializers, void 0);
                        this.dirUnboundInput = (__runInitializers(this, _dirOf_extraInitializers), __runInitializers(this, _dirUnboundInput_initializers, void 0));
                        __runInitializers(this, _dirUnboundInput_extraInitializers);
                        dirInstances.push(this);
                    }
                };
                __setFunctionName(_classThis, "StructuralDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirOf_decorators = [(0, core_1.Input)()];
                    _dirUnboundInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dirOf_decorators, { kind: "field", name: "dirOf", static: false, private: false, access: { has: obj => "dirOf" in obj, get: obj => obj.dirOf, set: (obj, value) => { obj.dirOf = value; } }, metadata: _metadata }, _dirOf_initializers, _dirOf_extraInitializers);
                    __esDecorate(null, null, _dirUnboundInput_decorators, { kind: "field", name: "dirUnboundInput", static: false, private: false, access: { has: obj => "dirUnboundInput" in obj, get: obj => obj.dirUnboundInput, set: (obj, value) => { obj.dirUnboundInput = value; } }, metadata: _metadata }, _dirUnboundInput_initializers, _dirUnboundInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StructuralDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StructuralDir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <!-- Regular form of structural directive -->
          <div *dir="let item of items" dirUnboundInput>Some content</div>

          <!-- De-sugared version of the same structural directive -->
          <ng-template dir let-item [dirOf]="items" dirUnboundInput>
            <div>Some content</div>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, StructuralDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const [regularDir, desugaredDir] = dirInstances;
            // When directive is used as a structural one, the `dirUnboundInput` should not be treated as
            // an input.
            expect(regularDir.dirUnboundInput).toBe(undefined);
            // In de-sugared version the `dirUnboundInput` acts as a regular input, so it should be set
            // to an empty string.
            expect(desugaredDir.dirUnboundInput).toBe('');
        });
        it('should not set structural directive inputs from element bindings', () => {
            const dirInstances = [];
            let StructuralDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirOf_decorators;
                let _dirOf_initializers = [];
                let _dirOf_extraInitializers = [];
                let _title_decorators;
                let _title_initializers = [];
                let _title_extraInitializers = [];
                var StructuralDir = _classThis = class {
                    constructor() {
                        this.dirOf = __runInitializers(this, _dirOf_initializers, void 0);
                        this.title = (__runInitializers(this, _dirOf_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                        __runInitializers(this, _title_extraInitializers);
                        dirInstances.push(this);
                    }
                };
                __setFunctionName(_classThis, "StructuralDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirOf_decorators = [(0, core_1.Input)()];
                    _title_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dirOf_decorators, { kind: "field", name: "dirOf", static: false, private: false, access: { has: obj => "dirOf" in obj, get: obj => obj.dirOf, set: (obj, value) => { obj.dirOf = value; } }, metadata: _metadata }, _dirOf_initializers, _dirOf_extraInitializers);
                    __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StructuralDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StructuralDir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <!-- Regular form of structural directive -->
          <div *dir="let item of items" [title]="title">Some content</div>

          <!-- De-sugared version of the same structural directive -->
          <ng-template dir let-item [dirOf]="items" [title]="title">
            <div>Some content</div>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                        this.title = 'element title';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, StructuralDir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const [regularDir, desugaredDir] = dirInstances;
            // When directive is used as a structural one, the `title` should not be treated as an input.
            expect(regularDir.title).toBe(undefined);
            // In de-sugared version the `title` acts as a regular input, so it should be set.
            expect(desugaredDir.title).toBe('element title');
        });
        it('should allow directive inputs specified using the object literal syntax in @Input', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _plainInput_decorators;
                let _plainInput_initializers = [];
                let _plainInput_extraInitializers = [];
                let _aliasedInput_decorators;
                let _aliasedInput_initializers = [];
                let _aliasedInput_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.plainInput = __runInitializers(this, _plainInput_initializers, void 0);
                        this.aliasedInput = (__runInitializers(this, _plainInput_extraInitializers), __runInitializers(this, _aliasedInput_initializers, void 0));
                        __runInitializers(this, _aliasedInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _plainInput_decorators = [(0, core_1.Input)()];
                    _aliasedInput_decorators = [(0, core_1.Input)({ alias: 'alias' })];
                    __esDecorate(null, null, _plainInput_decorators, { kind: "field", name: "plainInput", static: false, private: false, access: { has: obj => "plainInput" in obj, get: obj => obj.plainInput, set: (obj, value) => { obj.plainInput = value; } }, metadata: _metadata }, _plainInput_initializers, _plainInput_extraInitializers);
                    __esDecorate(null, null, _aliasedInput_decorators, { kind: "field", name: "aliasedInput", static: false, private: false, access: { has: obj => "aliasedInput" in obj, get: obj => obj.aliasedInput, set: (obj, value) => { obj.aliasedInput = value; } }, metadata: _metadata }, _aliasedInput_initializers, _aliasedInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [plainInput]="plainValue" [alias]="aliasedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirInstance_decorators;
                let _dirInstance_initializers = [];
                let _dirInstance_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dirInstance = __runInitializers(this, _dirInstance_initializers, void 0);
                        this.plainValue = (__runInitializers(this, _dirInstance_extraInitializers), 123);
                        this.aliasedValue = 321;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirInstance_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dirInstance_decorators, { kind: "field", name: "dirInstance", static: false, private: false, access: { has: obj => "dirInstance" in obj, get: obj => obj.dirInstance, set: (obj, value) => { obj.dirInstance = value; } }, metadata: _metadata }, _dirInstance_initializers, _dirInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { dirInstance, plainValue, aliasedValue } = fixture.componentInstance;
            expect(dirInstance.plainInput).toBe(plainValue);
            expect(dirInstance.aliasedInput).toBe(aliasedValue);
        });
        it('should allow directive inputs specified using the object literal syntax in the `inputs` array', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        inputs: [{ name: 'plainInput' }, { name: 'aliasedInput', alias: 'alias' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [plainInput]="plainValue" [alias]="aliasedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirInstance_decorators;
                let _dirInstance_initializers = [];
                let _dirInstance_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.dirInstance = __runInitializers(this, _dirInstance_initializers, void 0);
                        this.plainValue = (__runInitializers(this, _dirInstance_extraInitializers), 123);
                        this.aliasedValue = 321;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirInstance_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dirInstance_decorators, { kind: "field", name: "dirInstance", static: false, private: false, access: { has: obj => "dirInstance" in obj, get: obj => obj.dirInstance, set: (obj, value) => { obj.dirInstance = value; } }, metadata: _metadata }, _dirInstance_initializers, _dirInstance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const { dirInstance, plainValue, aliasedValue } = fixture.componentInstance;
            expect(dirInstance.plainInput).toBe(plainValue);
            expect(dirInstance.aliasedInput).toBe(aliasedValue);
        });
        it('should transform incoming input values', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [value]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _dir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(0);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(1);
        });
        it('should transform incoming input values when declared through the `inputs` array', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        inputs: [{ name: 'value', transform: (value) => (value ? 1 : 0) }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.value = -1;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [value]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _dir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(0);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(1);
        });
        it('should transform incoming static input values', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir value="staticValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(1);
        });
        it('should transform incoming values for aliased inputs', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ alias: 'valueAlias', transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [valueAlias]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _dir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(0);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(1);
        });
        it('should transform incoming inherited input values', () => {
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Parent = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Parent;
                var Dir = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [value]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _dir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(0);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe(1);
        });
        it('should transform aliased inputs coming from host directives', () => {
            let HostDir = (() => {
                let _classDecorators = [(0, core_1.Directive)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var HostDir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HostDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostDir = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        hostDirectives: [{ directive: HostDir, inputs: ['value: valueAlias'] }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [valueAlias]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _hostDir_decorators;
                let _hostDir_initializers = [];
                let _hostDir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.hostDir = __runInitializers(this, _hostDir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _hostDir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostDir_decorators = [(0, core_1.ViewChild)(HostDir)];
                    __esDecorate(null, null, _hostDir_decorators, { kind: "field", name: "hostDir", static: false, private: false, access: { has: obj => "hostDir" in obj, get: obj => obj.hostDir, set: (obj, value) => { obj.hostDir = value; } }, metadata: _metadata }, _hostDir_initializers, _hostDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.value).toBe(0);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(fixture.componentInstance.hostDir.value).toBe(1);
        });
        it('should use the transformed input values in ngOnChanges', () => {
            const trackedChanges = [];
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    ngOnChanges(changes) {
                        if (changes['value']) {
                            trackedChanges.push(changes['value']);
                        }
                    }
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir [value]="assignedValue"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        this.assignedValue = (__runInitializers(this, _dir_extraInitializers), '');
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(trackedChanges).toEqual([
                jasmine.objectContaining({ previousValue: undefined, currentValue: 0 }),
            ]);
            fixture.componentInstance.assignedValue = 'hello';
            fixture.detectChanges();
            expect(trackedChanges).toEqual([
                jasmine.objectContaining({ previousValue: undefined, currentValue: 0 }),
                jasmine.objectContaining({ previousValue: 0, currentValue: 1 }),
            ]);
        });
        it('should invoke the transform function with the directive instance as the context', () => {
            let instance;
            function transform(_value) {
                instance = this;
                return 0;
            }
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div dir value="foo"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Dir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(instance).toBe(fixture.componentInstance.dir);
        });
        it('should transform value assigned using setInput', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, -1);
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)({ transform: (value) => (value ? 1 : 0) })];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container #location/>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                        __runInitializers(this, _vcr_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcr_decorators = [(0, core_1.ViewChild)('location', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, Comp] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const ref = fixture.componentInstance.vcr.createComponent(Comp);
            ref.setInput('value', '');
            expect(ref.instance.value).toBe(0);
            ref.setInput('value', 'hello');
            expect(ref.instance.value).toBe(1);
        });
    });
    describe('outputs', () => {
        let TestDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[out]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _out_decorators;
            let _out_initializers = [];
            let _out_extraInitializers = [];
            var TestDir = _classThis = class {
                constructor() {
                    this.out = __runInitializers(this, _out_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _out_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _out_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _out_decorators, { kind: "field", name: "out", static: false, private: false, access: { has: obj => "out" in obj, get: obj => obj.out, set: (obj, value) => { obj.out = value; } }, metadata: _metadata }, _out_initializers, _out_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDir = _classThis;
        })();
        it('should allow outputs of directive on ng-template', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template (out)="value = true"></ng-template>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDir_decorators;
                let _testDir_initializers = [];
                let _testDir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.testDir = __runInitializers(this, _testDir_initializers, void 0);
                        this.value = (__runInitializers(this, _testDir_extraInitializers), false);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDir_decorators = [(0, core_1.ViewChild)(TestDir, { static: true })];
                    __esDecorate(null, null, _testDir_decorators, { kind: "field", name: "testDir", static: false, private: false, access: { has: obj => "testDir" in obj, get: obj => obj.testDir, set: (obj, value) => { obj.testDir = value; } }, metadata: _metadata }, _testDir_initializers, _testDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, TestDir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.testDir).toBeTruthy();
            expect(fixture.componentInstance.value).toBe(false);
            fixture.componentInstance.testDir.out.emit();
            fixture.detectChanges();
            expect(fixture.componentInstance.value).toBe(true);
        });
        it('should allow outputs of directive on ng-container', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-container (out)="value = true">
            <span>Hello</span>
          </ng-container>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.value = false;
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, TestDir] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const testDir = fixture.debugElement.query(platform_browser_1.By.css('span')).injector.get(TestDir);
            expect(fixture.componentInstance.value).toBe(false);
            testDir.out.emit();
            fixture.detectChanges();
            expect(fixture.componentInstance.value).toBeTruthy();
        });
    });
    describe('attribute shadowing behaviors', () => {
        /**
         * To match ViewEngine, we need to ensure the following behaviors
         */
        let DirWithTitle = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir-with-title]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _title_decorators;
            let _title_initializers = [];
            let _title_extraInitializers = [];
            var DirWithTitle = _classThis = class {
                constructor() {
                    this.title = __runInitializers(this, _title_initializers, '');
                    __runInitializers(this, _title_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "DirWithTitle");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _title_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirWithTitle = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirWithTitle = _classThis;
        })();
        it('should set both the div attribute and the directive input for `title="value"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title title="a"></div>`,
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('title')).toBe('a');
        });
        it('should set the directive input only, shadowing the title property of the div, for `[title]="value"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title [title]="value"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            // We are checking the property here, not the attribute, because in the case of
            // [key]="value" we are always setting the property of the instance, and actually setting
            // the attribute is just a side-effect of the DOM implementation.
            expect(dirWithTitle.title).toBe('a');
            expect(div.title).toBe('');
        });
        it('should allow setting directive `title` input with `[title]="value"` and a "attr.title" attribute with `attr.title="test"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title [title]="value" attr.title="test"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('attr.title')).toBe('test');
            expect(div.title).toBe('');
        });
        it('should allow setting directive `title` input with `[title]="value1"` and attribute with `[attr.title]="value2"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title [title]="value1" [attr.title]="value2"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value1 = 'a';
                        this.value2 = 'b';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('title')).toBe('b');
        });
        it('should allow setting directive `title` input with `[title]="value1"` and attribute with `attr.title="{{value2}}"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title [title]="value1" attr.title="{{value2}}"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value1 = 'a';
                        this.value2 = 'b';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('title')).toBe('b');
        });
        it('should allow setting directive `title` input with `title="{{value}}"` and a "attr.title" attribute with `attr.title="test"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title title="{{value}}" attr.title="test"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('attr.title')).toBe('test');
            expect(div.title).toBe('');
        });
        it('should allow setting directive `title` input with `title="{{value1}}"` and attribute with `[attr.title]="value2"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title title="{{value1}}" [attr.title]="value2"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value1 = 'a';
                        this.value2 = 'b';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('title')).toBe('b');
        });
        it('should allow setting directive `title` input with `title="{{value1}}"` and attribute with `attr.title="{{value2}}"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title title="{{value1}}" attr.title="{{value2}}"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value1 = 'a';
                        this.value2 = 'b';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.getAttribute('title')).toBe('b');
        });
        it('should set the directive input only, shadowing the title property on the div, for `title="{{value}}"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title title="{{value}}"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('a');
            expect(div.title).toBe('');
        });
        it('should set the title attribute only, not directive input, for `attr.title="{{value}}"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title attr.title="{{value}}"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('');
            expect(div.getAttribute('title')).toBe('a');
        });
        it('should set the title attribute only, not directive input, for `[attr.title]="value"`', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div dir-with-title [attr.title]="value"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.value = 'a';
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, DirWithTitle],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const dirWithTitle = fixture.debugElement
                .query(platform_browser_1.By.directive(DirWithTitle))
                .injector.get(DirWithTitle);
            const div = fixture.nativeElement.querySelector('div');
            expect(dirWithTitle.title).toBe('');
            expect(div.getAttribute('title')).toBe('a');
        });
    });
    describe('directives with the same selector', () => {
        it('should process Directives from `declarations` list after imported ones', () => {
            const log = [];
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor() {
                        log.push('DirectiveA.constructor');
                    }
                    ngOnInit() {
                        log.push('DirectiveA.ngOnInit');
                    }
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
            let ModuleA = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [DirectiveA],
                        exports: [DirectiveA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleA = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleA = _classThis;
            })();
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor() {
                        log.push('DirectiveB.constructor');
                    }
                    ngOnInit() {
                        log.push('DirectiveB.ngOnInit');
                    }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({
                imports: [ModuleA],
                declarations: [DirectiveB, App],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual([
                'DirectiveA.constructor',
                'DirectiveB.constructor',
                'DirectiveA.ngOnInit',
                'DirectiveB.ngOnInit',
            ]);
        });
        it('should respect imported module order', () => {
            const log = [];
            let DirectiveA = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveA = _classThis = class {
                    constructor() {
                        log.push('DirectiveA.constructor');
                    }
                    ngOnInit() {
                        log.push('DirectiveA.ngOnInit');
                    }
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
            let ModuleA = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [DirectiveA],
                        exports: [DirectiveA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleA = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleA = _classThis;
            })();
            let DirectiveB = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DirectiveB = _classThis = class {
                    constructor() {
                        log.push('DirectiveB.constructor');
                    }
                    ngOnInit() {
                        log.push('DirectiveB.ngOnInit');
                    }
                };
                __setFunctionName(_classThis, "DirectiveB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirectiveB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirectiveB = _classThis;
            })();
            let ModuleB = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [DirectiveB],
                        exports: [DirectiveB],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleB = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleB = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: '<div dir></div>',
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
            testing_1.TestBed.configureTestingModule({
                imports: [ModuleA, ModuleB],
                declarations: [App],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(log).toEqual([
                'DirectiveA.constructor',
                'DirectiveB.constructor',
                'DirectiveA.ngOnInit',
                'DirectiveB.ngOnInit',
            ]);
        });
    });
});
