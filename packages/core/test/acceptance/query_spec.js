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
exports.QueryCompWithStrictChangeEmitParent = exports.QueryCompWithNoChanges = exports.QueryCompWithChanges = void 0;
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
describe('query logic', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                AppComp,
                QueryComp,
                SimpleCompA,
                SimpleCompB,
                StaticViewQueryComp,
                TextDirective,
                SubclassStaticViewQueryComp,
                StaticContentQueryComp,
                SubclassStaticContentQueryComp,
                QueryCompWithChanges,
                StaticContentQueryDir,
                SuperDirectiveQueryTarget,
                SuperDirective,
                SubComponent,
                TestComponentWithToken,
                TestInjectionTokenContentQueries,
                TestInjectionTokenQueries,
            ],
        });
    });
    describe('view queries', () => {
        it('should return Component instances when Components are labeled and retrieved', () => {
            const template = `
           <div><simple-comp-a #viewQuery></simple-comp-a></div>
           <div><simple-comp-b #viewQuery></simple-comp-b></div>
         `;
            const fixture = initWithTemplate(QueryComp, template);
            const comp = fixture.componentInstance;
            expect(comp.viewChild).toBeInstanceOf(SimpleCompA);
            expect(comp.viewChildren.first).toBeInstanceOf(SimpleCompA);
            expect(comp.viewChildren.last).toBeInstanceOf(SimpleCompB);
        });
        it('should return ElementRef when HTML element is labeled and retrieved', () => {
            const template = `
      <div #viewQuery></div>
    `;
            const fixture = initWithTemplate(QueryComp, template);
            const comp = fixture.componentInstance;
            expect(comp.viewChild).toBeInstanceOf(core_1.ElementRef);
            expect(comp.viewChildren.first).toBeInstanceOf(core_1.ElementRef);
        });
        it('should return ElementRefs when HTML elements are labeled and retrieved', () => {
            const template = `
              <div #viewQuery #first>A</div>
              <div #viewQuery #second>B</div>
            `;
            const fixture = initWithTemplate(QueryComp, template);
            const comp = fixture.componentInstance;
            expect(comp.viewChild).toBeInstanceOf(core_1.ElementRef);
            expect(comp.viewChild.nativeElement).toBe(fixture.debugElement.children[0].nativeElement);
            expect(comp.viewChildren.first).toBeInstanceOf(core_1.ElementRef);
            expect(comp.viewChildren.last).toBeInstanceOf(core_1.ElementRef);
            expect(comp.viewChildren.length).toBe(2);
        });
        it('should return TemplateRef when template is labeled and retrieved', () => {
            const template = `
      <ng-template #viewQuery></ng-template>
    `;
            const fixture = initWithTemplate(QueryComp, template);
            const comp = fixture.componentInstance;
            expect(comp.viewChildren.first).toBeInstanceOf(core_1.TemplateRef);
        });
        it('should support selecting InjectionToken', () => {
            const fixture = testing_1.TestBed.createComponent(TestInjectionTokenQueries);
            const instance = fixture.componentInstance;
            fixture.detectChanges();
            expect(instance.viewFirstOption).toBeDefined();
            expect(instance.viewFirstOption instanceof TestComponentWithToken).toBe(true);
            expect(instance.viewOptions).toBeDefined();
            expect(instance.viewOptions.length).toBe(2);
            expect(instance.contentFirstOption).toBeUndefined();
            expect(instance.contentOptions).toBeDefined();
            expect(instance.contentOptions.length).toBe(0);
        });
        it('should return TemplateRefs when templates are labeled and retrieved', () => {
            const template = `
              <ng-template #viewQuery></ng-template>
              <ng-template #viewQuery></ng-template>
            `;
            const fixture = initWithTemplate(QueryComp, template);
            const comp = fixture.componentInstance;
            expect(comp.viewChild).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.viewChild.elementRef.nativeElement).toBe(fixture.debugElement.childNodes[0].nativeNode);
            expect(comp.viewChildren.first).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.viewChildren.last).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.viewChildren.length).toBe(2);
        });
        it('should set static view child queries in creation mode (and just in creation mode)', () => {
            const fixture = testing_1.TestBed.createComponent(StaticViewQueryComp);
            const component = fixture.componentInstance;
            // static ViewChild query should be set in creation mode, before CD runs
            expect(component.textDir).toBeInstanceOf(TextDirective);
            expect(component.textDir.text).toEqual('');
            expect(component.setEvents).toEqual(['textDir set']);
            // dynamic ViewChild query should not have been resolved yet
            expect(component.foo).not.toBeDefined();
            const span = fixture.nativeElement.querySelector('span');
            fixture.detectChanges();
            expect(component.textDir.text).toEqual('some text');
            expect(component.foo.nativeElement).toBe(span);
            expect(component.setEvents).toEqual(['textDir set', 'foo set']);
        });
        it('should support static view child queries inherited from superclasses', () => {
            const fixture = testing_1.TestBed.createComponent(SubclassStaticViewQueryComp);
            const component = fixture.componentInstance;
            const divs = fixture.nativeElement.querySelectorAll('div');
            const spans = fixture.nativeElement.querySelectorAll('span');
            // static ViewChild queries should be set in creation mode, before CD runs
            expect(component.textDir).toBeInstanceOf(TextDirective);
            expect(component.textDir.text).toEqual('');
            expect(component.bar.nativeElement).toEqual(divs[1]);
            // dynamic ViewChild queries should not have been resolved yet
            expect(component.foo).not.toBeDefined();
            expect(component.baz).not.toBeDefined();
            fixture.detectChanges();
            expect(component.textDir.text).toEqual('some text');
            expect(component.foo.nativeElement).toBe(spans[0]);
            expect(component.baz.nativeElement).toBe(spans[1]);
        });
        it('should support multiple static view queries (multiple template passes)', () => {
            const template = `
           <static-view-query-comp></static-view-query-comp>
           <static-view-query-comp></static-view-query-comp>
         `;
            testing_1.TestBed.overrideComponent(AppComp, { set: new core_1.Component({ template }) });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            const firstComponent = fixture.debugElement.children[0].injector.get(StaticViewQueryComp);
            const secondComponent = fixture.debugElement.children[1].injector.get(StaticViewQueryComp);
            // static ViewChild query should be set in creation mode, before CD runs
            expect(firstComponent.textDir).toBeInstanceOf(TextDirective);
            expect(secondComponent.textDir).toBeInstanceOf(TextDirective);
            expect(firstComponent.textDir.text).toEqual('');
            expect(secondComponent.textDir.text).toEqual('');
            expect(firstComponent.setEvents).toEqual(['textDir set']);
            expect(secondComponent.setEvents).toEqual(['textDir set']);
            // dynamic ViewChild query should not have been resolved yet
            expect(firstComponent.foo).not.toBeDefined();
            expect(secondComponent.foo).not.toBeDefined();
            const spans = fixture.nativeElement.querySelectorAll('span');
            fixture.detectChanges();
            expect(firstComponent.textDir.text).toEqual('some text');
            expect(secondComponent.textDir.text).toEqual('some text');
            expect(firstComponent.foo.nativeElement).toBe(spans[0]);
            expect(secondComponent.foo.nativeElement).toBe(spans[1]);
            expect(firstComponent.setEvents).toEqual(['textDir set', 'foo set']);
            expect(secondComponent.setEvents).toEqual(['textDir set', 'foo set']);
        });
        it('should allow for view queries to be inherited from a directive', () => {
            const fixture = testing_1.TestBed.createComponent(SubComponent);
            const comp = fixture.componentInstance;
            fixture.detectChanges();
            expect(comp.headers).toBeTruthy();
            expect(comp.headers.length).toBe(2);
            expect(comp.headers.toArray().every((result) => result instanceof SuperDirectiveQueryTarget)).toBe(true);
        });
        it('should support ViewChild query inherited from undecorated superclasses', () => {
            let MyComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MyComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ViewChild)('foo')];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<div #foo></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SubComp] });
            const fixture = testing_1.TestBed.createComponent(SubComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.foo).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support ViewChild query inherited from undecorated grand superclasses', () => {
            let MySuperComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MySuperComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ViewChild)('foo')];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            class MyComp extends MySuperComp {
            }
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<div #foo></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SubComp] });
            const fixture = testing_1.TestBed.createComponent(SubComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.foo).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support ViewChildren query inherited from undecorated superclasses', () => {
            let SomeDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[some-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDir = _classThis;
            })();
            let MyComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MyComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ViewChildren)(SomeDir)];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: `
          <div some-dir></div>
          <div some-dir></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SubComp, SomeDir] });
            const fixture = testing_1.TestBed.createComponent(SubComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.foo).toBeInstanceOf(core_1.QueryList);
            expect(fixture.componentInstance.foo.length).toBe(2);
        });
        it('should support ViewChildren query inherited from undecorated grand superclasses', () => {
            let SomeDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[some-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDir = _classThis;
            })();
            let MySuperComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MySuperComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ViewChildren)(SomeDir)];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            class MyComp extends MySuperComp {
            }
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: `
          <div some-dir></div>
          <div some-dir></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SubComp, SomeDir] });
            const fixture = testing_1.TestBed.createComponent(SubComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.foo).toBeInstanceOf(core_1.QueryList);
            expect(fixture.componentInstance.foo.length).toBe(2);
        });
        it('should support ViewChild query where template is inserted in child component', () => {
            let Required = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'required',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Required = _classThis = class {
                };
                __setFunctionName(_classThis, "Required");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Required = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Required = _classThis;
            })();
            let Insertion = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'insertion',
                        template: `<ng-container [ngTemplateOutlet]="content"></ng-container>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _content_decorators;
                let _content_initializers = [];
                let _content_extraInitializers = [];
                var Insertion = _classThis = class {
                    constructor() {
                        this.content = __runInitializers(this, _content_initializers, void 0);
                        __runInitializers(this, _content_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Insertion");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _content_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Insertion = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Insertion = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #template>
            <required></required>
          </ng-template>
          <insertion [content]="template"></insertion>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _requiredEl_decorators;
                let _requiredEl_initializers = [];
                let _requiredEl_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.requiredEl = __runInitializers(this, _requiredEl_initializers, void 0);
                        this.viewChildAvailableInAfterViewInit = __runInitializers(this, _requiredEl_extraInitializers);
                    }
                    ngAfterViewInit() {
                        this.viewChildAvailableInAfterViewInit = this.requiredEl !== undefined;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _requiredEl_decorators = [(0, core_1.ViewChild)(Required)];
                    __esDecorate(null, null, _requiredEl_decorators, { kind: "field", name: "requiredEl", static: false, private: false, access: { has: obj => "requiredEl" in obj, get: obj => obj.requiredEl, set: (obj, value) => { obj.requiredEl = value; } }, metadata: _metadata }, _requiredEl_initializers, _requiredEl_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [App, Insertion, Required],
            }).createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.viewChildAvailableInAfterViewInit).toBe(true);
        });
        it('should destroy QueryList when the containing view is destroyed', () => {
            let queryInstance;
            let ComponentWithViewQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp-with-view-query',
                        template: '<div #foo>Content</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_foo_decorators;
                var ComponentWithViewQuery = _classThis = class {
                    set foo(value) {
                        queryInstance = value;
                    }
                    get foo() {
                        return queryInstance;
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ComponentWithViewQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_foo_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(_classThis, null, _set_foo_decorators, { kind: "setter", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentWithViewQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentWithViewQuery = _classThis;
            })();
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: `
          <ng-container *ngIf="condition">
            <comp-with-view-query></comp-with-view-query>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                    constructor() {
                        this.condition = true;
                    }
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Root, ComponentWithViewQuery],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(Root);
            fixture.detectChanges();
            expect(queryInstance.changes.closed).toBeFalsy();
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            expect(queryInstance.changes.closed).toBeTruthy();
        });
    });
    describe('content queries', () => {
        it('should return Component instance when Component is labeled and retrieved', () => {
            const template = `
           <local-ref-query-component #q>
             <simple-comp-a #contentQuery></simple-comp-a>
           </local-ref-query-component>
         `;
            const fixture = initWithTemplate(AppComp, template);
            const comp = fixture.debugElement.children[0].references['q'];
            expect(comp.contentChild).toBeInstanceOf(SimpleCompA);
            expect(comp.contentChildren.first).toBeInstanceOf(SimpleCompA);
        });
        it('should support selecting InjectionToken', () => {
            const fixture = testing_1.TestBed.createComponent(TestInjectionTokenContentQueries);
            const instance = fixture.debugElement.query(platform_browser_1.By.directive(TestInjectionTokenQueries)).componentInstance;
            fixture.detectChanges();
            expect(instance.contentFirstOption).toBeDefined();
            expect(instance.contentFirstOption instanceof TestComponentWithToken).toBe(true);
            expect(instance.contentOptions).toBeDefined();
            expect(instance.contentOptions.length).toBe(2);
        });
        it('should return Component instances when Components are labeled and retrieved', () => {
            const template = `
                <local-ref-query-component #q>
                  <simple-comp-a #contentQuery></simple-comp-a>
                  <simple-comp-b #contentQuery></simple-comp-b>
                </local-ref-query-component>
              `;
            const fixture = initWithTemplate(AppComp, template);
            const comp = fixture.debugElement.children[0].references['q'];
            expect(comp.contentChild).toBeInstanceOf(SimpleCompA);
            expect(comp.contentChildren.first).toBeInstanceOf(SimpleCompA);
            expect(comp.contentChildren.last).toBeInstanceOf(SimpleCompB);
            expect(comp.contentChildren.length).toBe(2);
        });
        it('should return ElementRef when HTML element is labeled and retrieved', () => {
            const template = `
         <local-ref-query-component #q>
           <div #contentQuery></div>
         </local-ref-query-component>
       `;
            const fixture = initWithTemplate(AppComp, template);
            const comp = fixture.debugElement.children[0].references['q'];
            expect(comp.contentChildren.first).toBeInstanceOf(core_1.ElementRef);
        });
        it('should return ElementRefs when HTML elements are labeled and retrieved', () => {
            const template = `
              <local-ref-query-component #q>
                <div #contentQuery></div>
                <div #contentQuery></div>
              </local-ref-query-component>
            `;
            const fixture = initWithTemplate(AppComp, template);
            const firstChild = fixture.debugElement.children[0];
            const comp = firstChild.references['q'];
            expect(comp.contentChild).toBeInstanceOf(core_1.ElementRef);
            expect(comp.contentChild.nativeElement).toBe(firstChild.children[0].nativeElement);
            expect(comp.contentChildren.first).toBeInstanceOf(core_1.ElementRef);
            expect(comp.contentChildren.last).toBeInstanceOf(core_1.ElementRef);
            expect(comp.contentChildren.length).toBe(2);
        });
        it('should return TemplateRef when template is labeled and retrieved', () => {
            const template = `
       <local-ref-query-component #q>
         <ng-template #contentQuery></ng-template>
       </local-ref-query-component>
     `;
            const fixture = initWithTemplate(AppComp, template);
            const comp = fixture.debugElement.children[0].references['q'];
            expect(comp.contentChildren.first).toBeInstanceOf(core_1.TemplateRef);
        });
        it('should return TemplateRefs when templates are labeled and retrieved', () => {
            const template = `
              <local-ref-query-component #q>
                <ng-template #contentQuery></ng-template>
                <ng-template #contentQuery></ng-template>
              </local-ref-query-component>
            `;
            const fixture = initWithTemplate(AppComp, template);
            const firstChild = fixture.debugElement.children[0];
            const comp = firstChild.references['q'];
            expect(comp.contentChild).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.contentChild.elementRef.nativeElement).toBe(firstChild.childNodes[0].nativeNode);
            expect(comp.contentChildren.first).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.contentChildren.last).toBeInstanceOf(core_1.TemplateRef);
            expect(comp.contentChildren.length).toBe(2);
        });
        it('should set static content child queries in creation mode (and just in creation mode)', () => {
            const template = `
              <static-content-query-comp>
                  <div [text]="text"></div>
                  <span #foo></span>
              </static-content-query-comp>
            `;
            testing_1.TestBed.overrideComponent(AppComp, { set: new core_1.Component({ template }) });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            const component = fixture.debugElement.children[0].injector.get(StaticContentQueryComp);
            // static ContentChild query should be set in creation mode, before CD runs
            expect(component.textDir).toBeInstanceOf(TextDirective);
            expect(component.textDir.text).toEqual('');
            expect(component.setEvents).toEqual(['textDir set']);
            // dynamic ContentChild query should not have been resolved yet
            expect(component.foo).not.toBeDefined();
            const span = fixture.nativeElement.querySelector('span');
            fixture.componentInstance.text = 'some text';
            fixture.detectChanges();
            expect(component.textDir.text).toEqual('some text');
            expect(component.foo.nativeElement).toBe(span);
            expect(component.setEvents).toEqual(['textDir set', 'foo set']);
        });
        it('should support static content child queries inherited from superclasses', () => {
            const template = `
              <subclass-static-content-query-comp>
                  <div [text]="text"></div>
                  <span #foo></span>
                  <div #bar></div>
                  <span #baz></span>
              </subclass-static-content-query-comp>
            `;
            testing_1.TestBed.overrideComponent(AppComp, { set: new core_1.Component({ template }) });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            const component = fixture.debugElement.children[0].injector.get(SubclassStaticContentQueryComp);
            const divs = fixture.nativeElement.querySelectorAll('div');
            const spans = fixture.nativeElement.querySelectorAll('span');
            // static ContentChild queries should be set in creation mode, before CD runs
            expect(component.textDir).toBeInstanceOf(TextDirective);
            expect(component.textDir.text).toEqual('');
            expect(component.bar.nativeElement).toEqual(divs[1]);
            // dynamic ContentChild queries should not have been resolved yet
            expect(component.foo).not.toBeDefined();
            expect(component.baz).not.toBeDefined();
            fixture.componentInstance.text = 'some text';
            fixture.detectChanges();
            expect(component.textDir.text).toEqual('some text');
            expect(component.foo.nativeElement).toBe(spans[0]);
            expect(component.baz.nativeElement).toBe(spans[1]);
        });
        it('should set static content child queries on directives', () => {
            const template = `
              <div staticContentQueryDir>
                  <div [text]="text"></div>
                  <span #foo></span>
              </div>
            `;
            testing_1.TestBed.overrideComponent(AppComp, { set: new core_1.Component({ template }) });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            const component = fixture.debugElement.children[0].injector.get(StaticContentQueryDir);
            // static ContentChild query should be set in creation mode, before CD runs
            expect(component.textDir).toBeInstanceOf(TextDirective);
            expect(component.textDir.text).toEqual('');
            expect(component.setEvents).toEqual(['textDir set']);
            // dynamic ContentChild query should not have been resolved yet
            expect(component.foo).not.toBeDefined();
            const span = fixture.nativeElement.querySelector('span');
            fixture.componentInstance.text = 'some text';
            fixture.detectChanges();
            expect(component.textDir.text).toEqual('some text');
            expect(component.foo.nativeElement).toBe(span);
            expect(component.setEvents).toEqual(['textDir set', 'foo set']);
        });
        it('should support multiple content query components (multiple template passes)', () => {
            const template = `
              <static-content-query-comp>
                  <div [text]="text"></div>
                  <span #foo></span>
              </static-content-query-comp>
              <static-content-query-comp>
                  <div [text]="text"></div>
                  <span #foo></span>
              </static-content-query-comp>
            `;
            testing_1.TestBed.overrideComponent(AppComp, { set: new core_1.Component({ template }) });
            const fixture = testing_1.TestBed.createComponent(AppComp);
            const firstComponent = fixture.debugElement.children[0].injector.get(StaticContentQueryComp);
            const secondComponent = fixture.debugElement.children[1].injector.get(StaticContentQueryComp);
            // static ContentChild query should be set in creation mode, before CD runs
            expect(firstComponent.textDir).toBeInstanceOf(TextDirective);
            expect(secondComponent.textDir).toBeInstanceOf(TextDirective);
            expect(firstComponent.textDir.text).toEqual('');
            expect(secondComponent.textDir.text).toEqual('');
            expect(firstComponent.setEvents).toEqual(['textDir set']);
            expect(secondComponent.setEvents).toEqual(['textDir set']);
            // dynamic ContentChild query should not have been resolved yet
            expect(firstComponent.foo).not.toBeDefined();
            expect(secondComponent.foo).not.toBeDefined();
            const spans = fixture.nativeElement.querySelectorAll('span');
            fixture.componentInstance.text = 'some text';
            fixture.detectChanges();
            expect(firstComponent.textDir.text).toEqual('some text');
            expect(secondComponent.textDir.text).toEqual('some text');
            expect(firstComponent.foo.nativeElement).toBe(spans[0]);
            expect(secondComponent.foo.nativeElement).toBe(spans[1]);
            expect(firstComponent.setEvents).toEqual(['textDir set', 'foo set']);
            expect(secondComponent.setEvents).toEqual(['textDir set', 'foo set']);
        });
        it('should support ContentChild query inherited from undecorated superclasses', () => {
            let MyComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MyComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ContentChild)('foo')];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<sub-comp><div #foo></div></sub-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _subComp_decorators;
                let _subComp_initializers = [];
                let _subComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.subComp = __runInitializers(this, _subComp_initializers, void 0);
                        __runInitializers(this, _subComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _subComp_decorators = [(0, core_1.ViewChild)(SubComp)];
                    __esDecorate(null, null, _subComp_decorators, { kind: "field", name: "subComp", static: false, private: false, access: { has: obj => "subComp" in obj, get: obj => obj.subComp, set: (obj, value) => { obj.subComp = value; } }, metadata: _metadata }, _subComp_initializers, _subComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SubComp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.subComp.foo).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support ContentChild query inherited from undecorated grand superclasses', () => {
            let MySuperComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MySuperComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ContentChild)('foo')];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            class MyComp extends MySuperComp {
            }
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<sub-comp><div #foo></div></sub-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _subComp_decorators;
                let _subComp_initializers = [];
                let _subComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.subComp = __runInitializers(this, _subComp_initializers, void 0);
                        __runInitializers(this, _subComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _subComp_decorators = [(0, core_1.ViewChild)(SubComp)];
                    __esDecorate(null, null, _subComp_decorators, { kind: "field", name: "subComp", static: false, private: false, access: { has: obj => "subComp" in obj, get: obj => obj.subComp, set: (obj, value) => { obj.subComp = value; } }, metadata: _metadata }, _subComp_initializers, _subComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SubComp] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.subComp.foo).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support ContentChildren query inherited from undecorated superclasses', () => {
            let SomeDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[some-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDir = _classThis;
            })();
            let MyComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MyComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ContentChildren)(SomeDir)];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <sub-comp>
          <div some-dir></div>
          <div some-dir></div>
        </sub-comp>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _subComp_decorators;
                let _subComp_initializers = [];
                let _subComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.subComp = __runInitializers(this, _subComp_initializers, void 0);
                        __runInitializers(this, _subComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _subComp_decorators = [(0, core_1.ViewChild)(SubComp)];
                    __esDecorate(null, null, _subComp_decorators, { kind: "field", name: "subComp", static: false, private: false, access: { has: obj => "subComp" in obj, get: obj => obj.subComp, set: (obj, value) => { obj.subComp = value; } }, metadata: _metadata }, _subComp_initializers, _subComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SubComp, SomeDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.subComp.foo).toBeInstanceOf(core_1.QueryList);
            expect(fixture.componentInstance.subComp.foo.length).toBe(2);
        });
        it('should support ContentChildren query inherited from undecorated grand superclasses', () => {
            let SomeDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[some-dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDir = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDir = _classThis;
            })();
            let MySuperComp = (() => {
                var _a;
                let _foo_decorators;
                let _foo_initializers = [];
                let _foo_extraInitializers = [];
                return _a = class MySuperComp {
                        constructor() {
                            this.foo = __runInitializers(this, _foo_initializers, void 0);
                            __runInitializers(this, _foo_extraInitializers);
                        }
                    },
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foo_decorators = [(0, core_1.ContentChildren)(SomeDir)];
                        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
                        if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })(),
                    _a;
            })();
            class MyComp extends MySuperComp {
            }
            let SubComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'sub-comp',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = MyComp;
                var SubComp = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "SubComp");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SubComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SubComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <sub-comp>
          <div some-dir></div>
          <div some-dir></div>
        </sub-comp>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _subComp_decorators;
                let _subComp_initializers = [];
                let _subComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.subComp = __runInitializers(this, _subComp_initializers, void 0);
                        __runInitializers(this, _subComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _subComp_decorators = [(0, core_1.ViewChild)(SubComp)];
                    __esDecorate(null, null, _subComp_decorators, { kind: "field", name: "subComp", static: false, private: false, access: { has: obj => "subComp" in obj, get: obj => obj.subComp, set: (obj, value) => { obj.subComp = value; } }, metadata: _metadata }, _subComp_initializers, _subComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, SubComp, SomeDir] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.subComp.foo).toBeInstanceOf(core_1.QueryList);
            expect(fixture.componentInstance.subComp.foo.length).toBe(2);
        });
        it('should match shallow content queries in views inserted / removed by ngIf', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-comp',
                        template: `
          <shallow-comp>
            <div *ngIf="showing" #foo></div>
          </shallow-comp>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.showing = false;
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
            let ShallowComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'shallow-comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foos_decorators;
                let _foos_initializers = [];
                let _foos_extraInitializers = [];
                var ShallowComp = _classThis = class {
                    constructor() {
                        this.foos = __runInitializers(this, _foos_initializers, void 0);
                        __runInitializers(this, _foos_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ShallowComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foos_decorators = [(0, core_1.ContentChildren)('foo', { descendants: false })];
                    __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ShallowComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ShallowComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComponent, ShallowComp],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const shallowComp = fixture.debugElement.query(platform_browser_1.By.directive(ShallowComp)).componentInstance;
            const queryList = shallowComp.foos;
            expect(queryList.length).toBe(0);
            fixture.componentInstance.showing = true;
            fixture.detectChanges();
            expect(queryList.length).toBe(1);
            fixture.componentInstance.showing = false;
            fixture.detectChanges();
            expect(queryList.length).toBe(0);
        });
        it('should support content queries for directives within repeated embedded views', () => {
            const withContentInstances = [];
            let DirWithContentQuery = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[with-content]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foos_decorators;
                let _foos_initializers = [];
                let _foos_extraInitializers = [];
                var DirWithContentQuery = _classThis = class {
                    constructor() {
                        this.foos = __runInitializers(this, _foos_initializers, void 0);
                        this.contentInitQuerySnapshot = (__runInitializers(this, _foos_extraInitializers), 0);
                        this.contentCheckedQuerySnapshot = 0;
                        withContentInstances.push(this);
                    }
                    ngAfterContentInit() {
                        this.contentInitQuerySnapshot = this.foos ? this.foos.length : 0;
                    }
                    ngAfterContentChecked() {
                        this.contentCheckedQuerySnapshot = this.foos ? this.foos.length : 0;
                    }
                };
                __setFunctionName(_classThis, "DirWithContentQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foos_decorators = [(0, core_1.ContentChildren)('foo', { descendants: false })];
                    __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirWithContentQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirWithContentQuery = _classThis;
            })();
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `
          <ng-container *ngFor="let item of items">
            <div with-content>
              <span #foo></span>
            </div>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Root, DirWithContentQuery],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(Root);
            fixture.detectChanges();
            for (let i = 0; i < 3; i++) {
                expect(withContentInstances[i].foos.length).toBe(1, `Expected content query to match <span #foo>.`);
                expect(withContentInstances[i].contentInitQuerySnapshot).toBe(1, `Expected content query results to be available when ngAfterContentInit was called.`);
                expect(withContentInstances[i].contentCheckedQuerySnapshot).toBe(1, `Expected content query results to be available when ngAfterContentChecked was called.`);
            }
        });
        it('should not match directive host with content queries', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[content-query]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foos_decorators;
                let _foos_initializers = [];
                let _foos_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.foos = __runInitializers(this, _foos_initializers, void 0);
                        __runInitializers(this, _foos_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foos_decorators = [(0, core_1.ContentChildren)('foo', { descendants: true })];
                    __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ContentQueryDirective],
                        template: `<div content-query #foo></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _contentQueryDirective_decorators;
                let _contentQueryDirective_initializers = [];
                let _contentQueryDirective_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.contentQueryDirective = __runInitializers(this, _contentQueryDirective_initializers, void 0);
                        __runInitializers(this, _contentQueryDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _contentQueryDirective_decorators = [(0, core_1.ViewChild)(ContentQueryDirective, { static: true })];
                    __esDecorate(null, null, _contentQueryDirective_decorators, { kind: "field", name: "contentQueryDirective", static: false, private: false, access: { has: obj => "contentQueryDirective" in obj, get: obj => obj.contentQueryDirective, set: (obj, value) => { obj.contentQueryDirective = value; } }, metadata: _metadata }, _contentQueryDirective_initializers, _contentQueryDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.contentQueryDirective.foos;
            expect(qList.length).toBe(0);
        });
        it('should report results to appropriate queries where deep content queries are nested', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[content-query]', exportAs: 'query' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _qlist_decorators;
                let _qlist_initializers = [];
                let _qlist_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.qlist = __runInitializers(this, _qlist_initializers, void 0);
                        __runInitializers(this, _qlist_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _qlist_decorators = [(0, core_1.ContentChildren)('foo, bar, baz', { descendants: true })];
                    __esDecorate(null, null, _qlist_decorators, { kind: "field", name: "qlist", static: false, private: false, access: { has: obj => "qlist" in obj, get: obj => obj.qlist, set: (obj, value) => { obj.qlist = value; } }, metadata: _metadata }, _qlist_initializers, _qlist_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ContentQueryDirective],
                        template: `
          <div content-query #out="query">
            <span #foo></span>
            <div content-query #in="query">
              <span #bar></span>
            </div>
            <span #baz></span>
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _in_decorators;
                let _in_initializers = [];
                let _in_extraInitializers = [];
                let _out_decorators;
                let _out_initializers = [];
                let _out_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.in = __runInitializers(this, _in_initializers, void 0);
                        this.out = (__runInitializers(this, _in_extraInitializers), __runInitializers(this, _out_initializers, void 0));
                        __runInitializers(this, _out_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _in_decorators = [(0, core_1.ViewChild)('in', { static: true })];
                    _out_decorators = [(0, core_1.ViewChild)('out', { static: true })];
                    __esDecorate(null, null, _in_decorators, { kind: "field", name: "in", static: false, private: false, access: { has: obj => "in" in obj, get: obj => obj.in, set: (obj, value) => { obj.in = value; } }, metadata: _metadata }, _in_initializers, _in_extraInitializers);
                    __esDecorate(null, null, _out_decorators, { kind: "field", name: "out", static: false, private: false, access: { has: obj => "out" in obj, get: obj => obj.out, set: (obj, value) => { obj.out = value; } }, metadata: _metadata }, _out_initializers, _out_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const inQList = fixture.componentInstance.in.qlist;
            expect(inQList.length).toBe(1);
            const outQList = fixture.componentInstance.out.qlist;
            expect(outQList.length).toBe(3);
        });
        it('should support nested shallow content queries', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[content-query]', exportAs: 'query' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _qlist_decorators;
                let _qlist_initializers = [];
                let _qlist_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.qlist = __runInitializers(this, _qlist_initializers, void 0);
                        __runInitializers(this, _qlist_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _qlist_decorators = [(0, core_1.ContentChildren)('foo')];
                    __esDecorate(null, null, _qlist_decorators, { kind: "field", name: "qlist", static: false, private: false, access: { has: obj => "qlist" in obj, get: obj => obj.qlist, set: (obj, value) => { obj.qlist = value; } }, metadata: _metadata }, _qlist_initializers, _qlist_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ContentQueryDirective],
                        template: `
          <div content-query #out="query">
            <div content-query #in="query" #foo>
              <span #foo></span>
            </div>
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _in_decorators;
                let _in_initializers = [];
                let _in_extraInitializers = [];
                let _out_decorators;
                let _out_initializers = [];
                let _out_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.in = __runInitializers(this, _in_initializers, void 0);
                        this.out = (__runInitializers(this, _in_extraInitializers), __runInitializers(this, _out_initializers, void 0));
                        __runInitializers(this, _out_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _in_decorators = [(0, core_1.ViewChild)('in', { static: true })];
                    _out_decorators = [(0, core_1.ViewChild)('out', { static: true })];
                    __esDecorate(null, null, _in_decorators, { kind: "field", name: "in", static: false, private: false, access: { has: obj => "in" in obj, get: obj => obj.in, set: (obj, value) => { obj.in = value; } }, metadata: _metadata }, _in_initializers, _in_extraInitializers);
                    __esDecorate(null, null, _out_decorators, { kind: "field", name: "out", static: false, private: false, access: { has: obj => "out" in obj, get: obj => obj.out, set: (obj, value) => { obj.out = value; } }, metadata: _metadata }, _out_initializers, _out_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const inQList = fixture.componentInstance.in.qlist;
            expect(inQList.length).toBe(1);
            const outQList = fixture.componentInstance.out.qlist;
            expect(outQList.length).toBe(1);
        });
        it('should respect shallow flag on content queries when mixing deep and shallow queries', () => {
            let ShallowContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[shallow-content-query]', exportAs: 'shallow-query' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _qlist_decorators;
                let _qlist_initializers = [];
                let _qlist_extraInitializers = [];
                var ShallowContentQueryDirective = _classThis = class {
                    constructor() {
                        this.qlist = __runInitializers(this, _qlist_initializers, void 0);
                        __runInitializers(this, _qlist_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ShallowContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _qlist_decorators = [(0, core_1.ContentChildren)('foo')];
                    __esDecorate(null, null, _qlist_decorators, { kind: "field", name: "qlist", static: false, private: false, access: { has: obj => "qlist" in obj, get: obj => obj.qlist, set: (obj, value) => { obj.qlist = value; } }, metadata: _metadata }, _qlist_initializers, _qlist_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ShallowContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ShallowContentQueryDirective = _classThis;
            })();
            let DeepContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[deep-content-query]', exportAs: 'deep-query' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _qlist_decorators;
                let _qlist_initializers = [];
                let _qlist_extraInitializers = [];
                var DeepContentQueryDirective = _classThis = class {
                    constructor() {
                        this.qlist = __runInitializers(this, _qlist_initializers, void 0);
                        __runInitializers(this, _qlist_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DeepContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _qlist_decorators = [(0, core_1.ContentChildren)('foo', { descendants: true })];
                    __esDecorate(null, null, _qlist_decorators, { kind: "field", name: "qlist", static: false, private: false, access: { has: obj => "qlist" in obj, get: obj => obj.qlist, set: (obj, value) => { obj.qlist = value; } }, metadata: _metadata }, _qlist_initializers, _qlist_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DeepContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DeepContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ShallowContentQueryDirective, DeepContentQueryDirective],
                        template: `
          <div shallow-content-query #shallow="shallow-query" deep-content-query #deep="deep-query">
            <span #foo></span>
            <div>
              <span #foo></span>
            </div>
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _shallow_decorators;
                let _shallow_initializers = [];
                let _shallow_extraInitializers = [];
                let _deep_decorators;
                let _deep_initializers = [];
                let _deep_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.shallow = __runInitializers(this, _shallow_initializers, void 0);
                        this.deep = (__runInitializers(this, _shallow_extraInitializers), __runInitializers(this, _deep_initializers, void 0));
                        __runInitializers(this, _deep_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _shallow_decorators = [(0, core_1.ViewChild)('shallow', { static: true })];
                    _deep_decorators = [(0, core_1.ViewChild)('deep', { static: true })];
                    __esDecorate(null, null, _shallow_decorators, { kind: "field", name: "shallow", static: false, private: false, access: { has: obj => "shallow" in obj, get: obj => obj.shallow, set: (obj, value) => { obj.shallow = value; } }, metadata: _metadata }, _shallow_initializers, _shallow_extraInitializers);
                    __esDecorate(null, null, _deep_decorators, { kind: "field", name: "deep", static: false, private: false, access: { has: obj => "deep" in obj, get: obj => obj.deep, set: (obj, value) => { obj.deep = value; } }, metadata: _metadata }, _deep_initializers, _deep_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const inQList = fixture.componentInstance.shallow.qlist;
            expect(inQList.length).toBe(1);
            const outQList = fixture.componentInstance.deep.qlist;
            expect(outQList.length).toBe(2);
        });
        it('should support shallow ContentChild queries', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[query-dir]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _shallow_decorators;
                let _shallow_initializers = [];
                let _shallow_extraInitializers = [];
                let _deep_decorators;
                let _deep_initializers = [];
                let _deep_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.shallow = __runInitializers(this, _shallow_initializers, void 0);
                        // ContentChild queries have {descendants: true} option by default
                        this.deep = (__runInitializers(this, _shallow_extraInitializers), __runInitializers(this, _deep_initializers, void 0));
                        __runInitializers(this, _deep_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _shallow_decorators = [(0, core_1.ContentChild)('foo', { descendants: false })];
                    _deep_decorators = [(0, core_1.ContentChild)('foo')];
                    __esDecorate(null, null, _shallow_decorators, { kind: "field", name: "shallow", static: false, private: false, access: { has: obj => "shallow" in obj, get: obj => obj.shallow, set: (obj, value) => { obj.shallow = value; } }, metadata: _metadata }, _shallow_initializers, _shallow_extraInitializers);
                    __esDecorate(null, null, _deep_decorators, { kind: "field", name: "deep", static: false, private: false, access: { has: obj => "deep" in obj, get: obj => obj.deep, set: (obj, value) => { obj.deep = value; } }, metadata: _metadata }, _deep_initializers, _deep_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ContentQueryDirective],
                        template: `
          <div query-dir>
            <div>
              <span #foo></span>
            </div>
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryDir_decorators;
                let _queryDir_initializers = [];
                let _queryDir_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.queryDir = __runInitializers(this, _queryDir_initializers, void 0);
                        __runInitializers(this, _queryDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryDir_decorators = [(0, core_1.ViewChild)(ContentQueryDirective, { static: true })];
                    __esDecorate(null, null, _queryDir_decorators, { kind: "field", name: "queryDir", static: false, private: false, access: { has: obj => "queryDir" in obj, get: obj => obj.queryDir, set: (obj, value) => { obj.queryDir = value; } }, metadata: _metadata }, _queryDir_initializers, _queryDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryDir.shallow).toBeUndefined();
            expect(fixture.componentInstance.queryDir.deep).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support view and content queries matching the same element', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[content-query]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _foos_decorators;
                let _foos_initializers = [];
                let _foos_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.foos = __runInitializers(this, _foos_initializers, void 0);
                        __runInitializers(this, _foos_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _foos_decorators = [(0, core_1.ContentChildren)('foo')];
                    __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ContentQueryDirective],
                        template: `
          <div content-query>
            <div id="contentAndView" #foo></div>
          </div>
          <div id="contentOnly" #bar></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _contentQueryDir_decorators;
                let _contentQueryDir_initializers = [];
                let _contentQueryDir_extraInitializers = [];
                let _fooBars_decorators;
                let _fooBars_initializers = [];
                let _fooBars_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.contentQueryDir = __runInitializers(this, _contentQueryDir_initializers, void 0);
                        this.fooBars = (__runInitializers(this, _contentQueryDir_extraInitializers), __runInitializers(this, _fooBars_initializers, void 0));
                        __runInitializers(this, _fooBars_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _contentQueryDir_decorators = [(0, core_1.ViewChild)(ContentQueryDirective, { static: true })];
                    _fooBars_decorators = [(0, core_1.ViewChildren)('foo, bar')];
                    __esDecorate(null, null, _contentQueryDir_decorators, { kind: "field", name: "contentQueryDir", static: false, private: false, access: { has: obj => "contentQueryDir" in obj, get: obj => obj.contentQueryDir, set: (obj, value) => { obj.contentQueryDir = value; } }, metadata: _metadata }, _contentQueryDir_initializers, _contentQueryDir_extraInitializers);
                    __esDecorate(null, null, _fooBars_decorators, { kind: "field", name: "fooBars", static: false, private: false, access: { has: obj => "fooBars" in obj, get: obj => obj.fooBars, set: (obj, value) => { obj.fooBars = value; } }, metadata: _metadata }, _fooBars_initializers, _fooBars_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const contentQList = fixture.componentInstance.contentQueryDir.foos;
            expect(contentQList.length).toBe(1);
            expect(contentQList.first.nativeElement.getAttribute('id')).toBe('contentAndView');
            const viewQList = fixture.componentInstance.fooBars;
            expect(viewQList.length).toBe(2);
            expect(viewQList.first.nativeElement.getAttribute('id')).toBe('contentAndView');
            expect(viewQList.last.nativeElement.getAttribute('id')).toBe('contentOnly');
        });
    });
    describe('query order', () => {
        let TextDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[text]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _text_decorators;
            let _text_initializers = [];
            let _text_extraInitializers = [];
            var TextDirective = _classThis = class {
                constructor() {
                    this.text = __runInitializers(this, _text_initializers, void 0);
                    __runInitializers(this, _text_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TextDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _text_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TextDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TextDirective = _classThis;
        })();
        it('should register view query matches from top to bottom', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TextDirective],
                        template: `
          <span text="A"></span>
          <div text="B">
            <span text="C">
              <span text="D"></span>
            </span>
          </div>
          <span text="E"></span>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _texts_decorators;
                let _texts_initializers = [];
                let _texts_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.texts = __runInitializers(this, _texts_initializers, void 0);
                        __runInitializers(this, _texts_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _texts_decorators = [(0, core_1.ViewChildren)(TextDirective)];
                    __esDecorate(null, null, _texts_decorators, { kind: "field", name: "texts", static: false, private: false, access: { has: obj => "texts" in obj, get: obj => obj.texts, set: (obj, value) => { obj.texts = value; } }, metadata: _metadata }, _texts_initializers, _texts_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.texts.map((item) => item.text)).toEqual([
                'A',
                'B',
                'C',
                'D',
                'E',
            ]);
        });
        it('should register content query matches from top to bottom', () => {
            let ContentQueryDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[content-query]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _texts_decorators;
                let _texts_initializers = [];
                let _texts_extraInitializers = [];
                var ContentQueryDirective = _classThis = class {
                    constructor() {
                        this.texts = __runInitializers(this, _texts_initializers, void 0);
                        __runInitializers(this, _texts_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ContentQueryDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _texts_decorators = [(0, core_1.ContentChildren)(TextDirective, { descendants: true })];
                    __esDecorate(null, null, _texts_decorators, { kind: "field", name: "texts", static: false, private: false, access: { has: obj => "texts" in obj, get: obj => obj.texts, set: (obj, value) => { obj.texts = value; } }, metadata: _metadata }, _texts_initializers, _texts_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ContentQueryDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ContentQueryDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TextDirective, ContentQueryDirective],
                        template: `
          <div content-query>
            <span text="A"></span>
            <div text="B">
              <span text="C">
                <span text="D"></span>
              </span>
            </div>
            <span text="E"></span>
          </div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _contentQueryDirective_decorators;
                let _contentQueryDirective_initializers = [];
                let _contentQueryDirective_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.contentQueryDirective = __runInitializers(this, _contentQueryDirective_initializers, void 0);
                        __runInitializers(this, _contentQueryDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _contentQueryDirective_decorators = [(0, core_1.ViewChild)(ContentQueryDirective, { static: true })];
                    __esDecorate(null, null, _contentQueryDirective_decorators, { kind: "field", name: "contentQueryDirective", static: false, private: false, access: { has: obj => "contentQueryDirective" in obj, get: obj => obj.contentQueryDirective, set: (obj, value) => { obj.contentQueryDirective = value; } }, metadata: _metadata }, _contentQueryDirective_initializers, _contentQueryDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.contentQueryDirective.texts.map((item) => item.text)).toEqual(['A', 'B', 'C', 'D', 'E']);
        });
    });
    // Some root components may have ContentChildren queries if they are also
    // usable as a child component. We should still generate an empty QueryList
    // for these queries when they are at root for backwards compatibility with
    // ViewEngine.
    it('should generate an empty QueryList for root components', () => {
        const fixture = testing_1.TestBed.createComponent(QueryComp);
        fixture.detectChanges();
        expect(fixture.componentInstance.contentChildren).toBeInstanceOf(core_1.QueryList);
        expect(fixture.componentInstance.contentChildren.length).toBe(0);
    });
    describe('descendants: false (default)', () => {
        /**
         * A helper function to check if a given object looks like ElementRef. It is used in place of
         * the `instanceof ElementRef` check since ivy returns a type that looks like ElementRef (have
         * the same properties but doesn't pass the instanceof ElementRef test)
         */
        function isElementRefLike(result) {
            return result.nativeElement != null;
        }
        it('should match directives on elements that used to be wrapped by a required parent in HTML parser', () => {
            let MyDef = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDef]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDef = _classThis = class {
                };
                __setFunctionName(_classThis, "MyDef");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDef = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDef = _classThis;
            })();
            let MyContainer = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-container',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myDefs_decorators;
                let _myDefs_initializers = [];
                let _myDefs_extraInitializers = [];
                var MyContainer = _classThis = class {
                    constructor() {
                        this.myDefs = __runInitializers(this, _myDefs_initializers, void 0);
                        __runInitializers(this, _myDefs_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyContainer");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myDefs_decorators = [(0, core_1.ContentChildren)(MyDef)];
                    __esDecorate(null, null, _myDefs_decorators, { kind: "field", name: "myDefs", static: false, private: false, access: { has: obj => "myDefs" in obj, get: obj => obj.myDefs, set: (obj, value) => { obj.myDefs = value; } }, metadata: _metadata }, _myDefs_initializers, _myDefs_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyContainer = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyContainer = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<my-container><tr myDef></tr></my-container>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, MyContainer, MyDef] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(MyContainer);
            fixture.detectChanges();
            expect(cmptWithQuery.myDefs.length).toBe(1);
        });
        it('should match elements with local refs inside <ng-container>', () => {
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)('target')];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container>
              <tr #target></tr>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(1);
            expect(isElementRefLike(cmptWithQuery.targets.first)).toBeTruthy();
        });
        it('should match elements with local refs inside nested <ng-container>', () => {
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)('target')];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container>
              <ng-container>
                <ng-container>
                  <tr #target></tr>
                </ng-container>
              </ng-container>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(1);
            expect(isElementRefLike(cmptWithQuery.targets.first)).toBeTruthy();
        });
        it('should match directives inside <ng-container>', () => {
            let TargetDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[targetDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TargetDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TargetDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TargetDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TargetDir = _classThis;
            })();
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)(TargetDir)];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container>
              <tr targetDir></tr>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget, TargetDir] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(1);
            expect(cmptWithQuery.targets.first).toBeInstanceOf(TargetDir);
        });
        it('should match directives inside nested <ng-container>', () => {
            let TargetDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[targetDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TargetDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TargetDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TargetDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TargetDir = _classThis;
            })();
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)(TargetDir)];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container>
              <ng-container>
                <ng-container>
                  <tr targetDir></tr>
                </ng-container>
              </ng-container>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget, TargetDir] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(1);
            expect(cmptWithQuery.targets.first).toBeInstanceOf(TargetDir);
        });
        it('should cross child ng-container when query is declared on ng-container', () => {
            let TargetDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[targetDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TargetDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TargetDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TargetDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TargetDir = _classThis;
            })();
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[needs-target]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)(TargetDir)];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <ng-container targetDir>
            <ng-container needs-target>
              <ng-container>
                <tr targetDir></tr>
              </ng-container>
            </ng-container>
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget, TargetDir] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(1);
            expect(cmptWithQuery.targets.first).toBeInstanceOf(TargetDir);
        });
        it('should match nodes when using structural directives (*syntax) on <ng-container>', () => {
            let TargetDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[targetDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TargetDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TargetDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TargetDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TargetDir = _classThis;
            })();
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dirTargets_decorators;
                let _dirTargets_initializers = [];
                let _dirTargets_extraInitializers = [];
                let _localRefsTargets_decorators;
                let _localRefsTargets_initializers = [];
                let _localRefsTargets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.dirTargets = __runInitializers(this, _dirTargets_initializers, void 0);
                        this.localRefsTargets = (__runInitializers(this, _dirTargets_extraInitializers), __runInitializers(this, _localRefsTargets_initializers, void 0));
                        __runInitializers(this, _localRefsTargets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dirTargets_decorators = [(0, core_1.ContentChildren)(TargetDir)];
                    _localRefsTargets_decorators = [(0, core_1.ContentChildren)('target')];
                    __esDecorate(null, null, _dirTargets_decorators, { kind: "field", name: "dirTargets", static: false, private: false, access: { has: obj => "dirTargets" in obj, get: obj => obj.dirTargets, set: (obj, value) => { obj.dirTargets = value; } }, metadata: _metadata }, _dirTargets_initializers, _dirTargets_extraInitializers);
                    __esDecorate(null, null, _localRefsTargets_decorators, { kind: "field", name: "localRefsTargets", static: false, private: false, access: { has: obj => "localRefsTargets" in obj, get: obj => obj.localRefsTargets, set: (obj, value) => { obj.localRefsTargets = value; } }, metadata: _metadata }, _localRefsTargets_initializers, _localRefsTargets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container *ngIf="true">
              <div targetDir></div>
              <div #target></div>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget, TargetDir] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.dirTargets.length).toBe(1);
            expect(cmptWithQuery.dirTargets.first).toBeInstanceOf(TargetDir);
            expect(cmptWithQuery.localRefsTargets.length).toBe(1);
            expect(isElementRefLike(cmptWithQuery.localRefsTargets.first)).toBeTruthy();
        });
        it('should match directives on <ng-container> when crossing nested <ng-container>', () => {
            let TargetDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[targetDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TargetDir = _classThis = class {
                };
                __setFunctionName(_classThis, "TargetDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TargetDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TargetDir = _classThis;
            })();
            let NeedsTarget = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'needs-target',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _targets_decorators;
                let _targets_initializers = [];
                let _targets_extraInitializers = [];
                var NeedsTarget = _classThis = class {
                    constructor() {
                        this.targets = __runInitializers(this, _targets_initializers, void 0);
                        __runInitializers(this, _targets_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NeedsTarget");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _targets_decorators = [(0, core_1.ContentChildren)(TargetDir)];
                    __esDecorate(null, null, _targets_decorators, { kind: "field", name: "targets", static: false, private: false, access: { has: obj => "targets" in obj, get: obj => obj.targets, set: (obj, value) => { obj.targets = value; } }, metadata: _metadata }, _targets_initializers, _targets_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedsTarget = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedsTarget = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <needs-target>
            <ng-container>
              <ng-container targetDir>
                <ng-container targetDir>
                  <tr targetDir></tr>
                </ng-container>
              </ng-container>
            </ng-container>
          </needs-target>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, NeedsTarget, TargetDir] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const cmptWithQuery = fixture.debugElement.children[0].injector.get(NeedsTarget);
            fixture.detectChanges();
            expect(cmptWithQuery.targets.length).toBe(3);
        });
    });
    describe('read option', () => {
        let Child = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[child]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let OtherChild = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[otherChild]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherChild = _classThis = class {
            };
            __setFunctionName(_classThis, "OtherChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherChild = _classThis;
        })();
        it('should query using type predicate and read ElementRef', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child],
                        template: `<div child></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(Child, { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            const elToQuery = fixture.nativeElement.querySelector('div');
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement).toBe(elToQuery);
        });
        it('should query using type predicate and read another directive type', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child, OtherChild],
                        template: `<div child otherChild></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(Child, { read: OtherChild })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(OtherChild);
        });
        it('should not add results to query if a requested token cant be read', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child],
                        template: `<div child></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(Child, { read: OtherChild })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(0);
        });
        it('should query using local ref and read ElementRef by default', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #foo></div>
          <div></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            const elToQuery = fixture.nativeElement.querySelector('div');
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement).toBe(elToQuery);
        });
        it('should query for multiple elements and read ElementRef by default', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #foo></div>
          <div></div>
          <div #bar></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo,bar')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            const elToQuery = fixture.nativeElement.querySelectorAll('div');
            expect(qList.length).toBe(2);
            expect(qList.first.nativeElement).toBe(elToQuery[0]);
            expect(qList.last.nativeElement).toBe(elToQuery[2]);
        });
        it('should read ElementRef from an element when explicitly asked for', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div #foo></div>
          <div></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            const elToQuery = fixture.nativeElement.querySelector('div');
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement).toBe(elToQuery);
        });
        it('should query for <ng-container> and read ElementRef with a native element pointing to comment node', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-container #foo></ng-container>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement.nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should query for <ng-container> and read ElementRef without explicit read option', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-container #foo></ng-container>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement.nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should read ViewContainerRef from element nodes when explicitly asked for', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div #foo></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(core_1.ViewContainerRef);
        });
        it('should read ViewContainerRef from ng-template nodes when explicitly asked for', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #foo></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(core_1.ViewContainerRef);
        });
        it('should read ElementRef with a native element pointing to comment DOM node from ng-template', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #foo></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first.nativeElement.nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should read TemplateRef from ng-template by default', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #foo></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(core_1.TemplateRef);
        });
        it('should read TemplateRef from ng-template when explicitly asked for', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #foo></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(core_1.TemplateRef);
        });
        it('should read component instance if element queried for is a component host', () => {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'child-cmp', template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp #foo></child-cmp>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(ChildCmp);
        });
        it('should read component instance with explicit exportAs', () => {
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-cmp',
                        exportAs: 'child',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `<child-cmp #foo="child"></child-cmp>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(ChildCmp);
        });
        it('should read directive instance if element queried for has an exported directive with a matching name', () => {
            let ChildDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]', exportAs: 'child' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildDirective],
                        template: `<div #foo="child" child></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(ChildDirective);
        });
        it('should read all matching directive instances from a given element', () => {
            let Child1Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child1]', exportAs: 'child1' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child1Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Child1Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child1Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child1Dir = _classThis;
            })();
            let Child2Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child2]', exportAs: 'child2' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child2Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Child2Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child2Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child2Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child1Dir, Child2Dir],
                        template: `<div #foo="child1" child1 #bar="child2" child2></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo, bar')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(2);
            expect(qList.first).toBeInstanceOf(Child1Dir);
            expect(qList.last).toBeInstanceOf(Child2Dir);
        });
        it('should read multiple locals exporting the same directive from a given element', () => {
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]', exportAs: 'child' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildDir],
                        template: `<div child #foo="child" #bar="child"></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo, bar')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(2);
            expect(qList.first).toBeInstanceOf(ChildDir);
            expect(qList.last).toBeInstanceOf(ChildDir);
        });
        it('should query multiple locals on the same element', () => {
            let MultipleLocalRefsComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'multiple-local-refs',
                        template: `
          <div #foo #bar id="target"></div>
          <div></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _fooQuery_decorators;
                let _fooQuery_initializers = [];
                let _fooQuery_extraInitializers = [];
                let _barQuery_decorators;
                let _barQuery_initializers = [];
                let _barQuery_extraInitializers = [];
                var MultipleLocalRefsComp = _classThis = class {
                    constructor() {
                        this.fooQuery = __runInitializers(this, _fooQuery_initializers, void 0);
                        this.barQuery = (__runInitializers(this, _fooQuery_extraInitializers), __runInitializers(this, _barQuery_initializers, void 0));
                        __runInitializers(this, _barQuery_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MultipleLocalRefsComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _fooQuery_decorators = [(0, core_1.ViewChildren)('foo')];
                    _barQuery_decorators = [(0, core_1.ViewChildren)('bar')];
                    __esDecorate(null, null, _fooQuery_decorators, { kind: "field", name: "fooQuery", static: false, private: false, access: { has: obj => "fooQuery" in obj, get: obj => obj.fooQuery, set: (obj, value) => { obj.fooQuery = value; } }, metadata: _metadata }, _fooQuery_initializers, _fooQuery_extraInitializers);
                    __esDecorate(null, null, _barQuery_decorators, { kind: "field", name: "barQuery", static: false, private: false, access: { has: obj => "barQuery" in obj, get: obj => obj.barQuery, set: (obj, value) => { obj.barQuery = value; } }, metadata: _metadata }, _barQuery_initializers, _barQuery_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MultipleLocalRefsComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MultipleLocalRefsComp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MultipleLocalRefsComp);
            fixture.detectChanges();
            const cmptInstance = fixture.componentInstance;
            const targetElement = fixture.nativeElement.querySelector('#target');
            const fooList = cmptInstance.fooQuery;
            expect(fooList.length).toBe(1);
            expect(fooList.first.nativeElement).toEqual(targetElement);
            const barList = cmptInstance.barQuery;
            expect(barList.length).toBe(1);
            expect(barList.first.nativeElement).toEqual(targetElement);
        });
        it('should match on exported directive name and read a requested token', () => {
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]', exportAs: 'child' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildDir],
                        template: `<div child #foo="child"></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(core_1.ElementRef);
        });
        it('should support reading a mix of ElementRef and directive instances', () => {
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]', exportAs: 'child' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildDir],
                        template: `<div #foo #bar="child" child></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo, bar')];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(2);
            expect(qList.first).toBeInstanceOf(core_1.ElementRef);
            expect(qList.last).toBeInstanceOf(ChildDir);
        });
        it('should not add results to selector-based query if a requested token cant be read', () => {
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [],
                        template: `<div #foo></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: ChildDir })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(0);
        });
        it('should not add results to directive-based query if only read token matches', () => {
            let ChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[child]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildDir = _classThis;
            })();
            let OtherChildDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[otherChild]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OtherChildDir = _classThis = class {
                };
                __setFunctionName(_classThis, "OtherChildDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OtherChildDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OtherChildDir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child],
                        template: `<div child></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(OtherChild, { read: Child })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(0);
        });
        it('should not add results to TemplateRef-based query if only read token matches', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef, { read: core_1.ElementRef })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(0);
        });
        it('should not add results to the query in case no match found (via TemplateRef)', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef)];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(0);
        });
        it('should query templates if the type is TemplateRef (and respect "read" option)', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #foo><div>Test</div></ng-template>
          <ng-template #bar><div>Test</div></ng-template>
          <ng-template #baz><div>Test</div></ng-template>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tplQuery_decorators;
                let _tplQuery_initializers = [];
                let _tplQuery_extraInitializers = [];
                let _elRefQuery_decorators;
                let _elRefQuery_initializers = [];
                let _elRefQuery_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.tplQuery = __runInitializers(this, _tplQuery_initializers, void 0);
                        this.elRefQuery = (__runInitializers(this, _tplQuery_extraInitializers), __runInitializers(this, _elRefQuery_initializers, void 0));
                        __runInitializers(this, _elRefQuery_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tplQuery_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef)];
                    _elRefQuery_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef, { read: core_1.ElementRef })];
                    __esDecorate(null, null, _tplQuery_decorators, { kind: "field", name: "tplQuery", static: false, private: false, access: { has: obj => "tplQuery" in obj, get: obj => obj.tplQuery, set: (obj, value) => { obj.tplQuery = value; } }, metadata: _metadata }, _tplQuery_initializers, _tplQuery_extraInitializers);
                    __esDecorate(null, null, _elRefQuery_decorators, { kind: "field", name: "elRefQuery", static: false, private: false, access: { has: obj => "elRefQuery" in obj, get: obj => obj.elRefQuery, set: (obj, value) => { obj.elRefQuery = value; } }, metadata: _metadata }, _elRefQuery_initializers, _elRefQuery_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const tplQuery = fixture.componentInstance.tplQuery;
            const elRefQuery = fixture.componentInstance.elRefQuery;
            expect(tplQuery.length).toBe(3);
            expect(tplQuery.first).toBeInstanceOf(core_1.TemplateRef);
            expect(elRefQuery.length).toBe(3);
            expect(elRefQuery.first).toBeInstanceOf(core_1.ElementRef);
        });
        it('should match using string selector and directive as a read argument', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child],
                        template: `<div child #foo></div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.query = __runInitializers(this, _query_initializers, void 0);
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _query_decorators = [(0, core_1.ViewChildren)('foo', { read: Child })];
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const qList = fixture.componentInstance.query;
            expect(qList.length).toBe(1);
            expect(qList.first).toBeInstanceOf(Child);
        });
    });
    describe('observable interface', () => {
        it('should allow observing changes to query list', () => {
            const fixture = testing_1.TestBed.createComponent(QueryCompWithChanges);
            let changes = 0;
            fixture.detectChanges();
            fixture.componentInstance.foos.changes.subscribe((value) => {
                changes += 1;
                expect(value).toBe(fixture.componentInstance.foos);
            });
            // refresh without setting dirty - no emit
            fixture.detectChanges();
            expect(changes).toBe(0);
            // refresh with setting dirty - emit
            fixture.componentInstance.showing = true;
            fixture.detectChanges();
            expect(changes).toBe(1);
        });
        it('should only fire if the content of the query changes', () => {
            // When views are inserted/removed the content query need to be recomputed.
            // Recomputing the query may result in no changes to the query (the item added/removed was
            // not part of the query). This tests asserts that the query does not fire when no changes
            // occur.
            testing_1.TestBed.configureTestingModule({
                declarations: [QueryCompWithStrictChangeEmitParent, QueryCompWithNoChanges],
            });
            const fixture = testing_1.TestBed.createComponent(QueryCompWithNoChanges);
            let changesStrict = 0;
            const componentInstance = fixture.componentInstance.queryComp;
            fixture.detectChanges();
            componentInstance.foos.changes.subscribe((value) => {
                // subscribe to the changes and record when changes occur.
                changesStrict += 1;
            });
            // First verify that the subscription is working.
            fixture.componentInstance.innerShowing = false;
            fixture.detectChanges();
            expect(changesStrict).toBe(1); // We detected a change
            expect(componentInstance.foos.toArray().length).toEqual(1);
            // now verify that removing a view does not needlessly fire subscription
            fixture.componentInstance.showing = false;
            fixture.detectChanges();
            expect(changesStrict).toBe(1); // We detected a change
            expect(componentInstance.foos.toArray().length).toEqual(1);
            // now verify that adding a view does not needlessly fire subscription
            fixture.componentInstance.showing = true;
            fixture.detectChanges();
            expect(changesStrict).toBe(1); // We detected a change
            // Note: even though the `showing` is `true` and the second `<div>` is displayed, the
            // child element of that <div> is hidden because the `innerShowing` flag is still `false`,
            // so we expect only one element to be present in the `foos` array.
            expect(componentInstance.foos.toArray().length).toEqual(1);
        });
    });
    describe('view boundaries', () => {
        describe('ViewContainerRef', () => {
            let ViewContainerManipulatorDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[vc]',
                        exportAs: 'vc',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ViewContainerManipulatorDirective = _classThis = class {
                    constructor(_vcRef) {
                        this._vcRef = _vcRef;
                    }
                    insertTpl(tpl, ctx, idx) {
                        return this._vcRef.createEmbeddedView(tpl, ctx, idx);
                    }
                    remove(index) {
                        this._vcRef.remove(index);
                    }
                    move(viewRef, index) {
                        this._vcRef.move(viewRef, index);
                    }
                };
                __setFunctionName(_classThis, "ViewContainerManipulatorDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ViewContainerManipulatorDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ViewContainerManipulatorDirective = _classThis;
            })();
            it('should report results in views inserted / removed by ngIf', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
            <ng-template [ngIf]="value">
              <div #foo></div>
            </ng-template>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.value = false;
                            this.query = __runInitializers(this, _query_initializers, void 0);
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                expect(queryList.length).toBe(0);
                fixture.componentInstance.value = true;
                fixture.detectChanges();
                expect(queryList.length).toBe(1);
                fixture.componentInstance.value = false;
                fixture.detectChanges();
                expect(queryList.length).toBe(0);
            });
            it('should report results in views inserted / removed by ngFor', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
            <ng-template ngFor let-item [ngForOf]="value">
              <div #foo [id]="item"></div>
            </ng-template>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.query = __runInitializers(this, _query_initializers, void 0);
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                expect(queryList.length).toBe(0);
                fixture.componentInstance.value = ['a', 'b', 'c'];
                fixture.detectChanges();
                expect(queryList.length).toBe(3);
                // Remove the "b" element from the value.
                fixture.componentInstance.value.splice(1, 1);
                fixture.detectChanges();
                expect(queryList.length).toBe(2);
                // make sure that the "b" element has been removed from query results
                expect(queryList.first.nativeElement.id).toBe('a');
                expect(queryList.last.nativeElement.id).toBe('c');
            });
            /**
             * ViewContainerRef API allows "moving" a view to the same (previous) index. Such operation
             * has no observable effect on the rendered UI (displays stays the same) but internally we've
             * got 2 implementation choices when it comes to "moving" a view:
             * - systematically detach and insert a view - this would result in unnecessary processing
             * when the previous and new indexes for the move operation are the same;
             * - detect the situation where the indexes are the same and do no processing in such case.
             */
            it('should NOT notify on changes when a given view is removed and re-inserted at the same index', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
              <ng-template #tpl><div #foo>match</div></ng-template>
              <ng-template vc></ng-template>
            `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vc_decorators;
                    let _vc_initializers = [];
                    let _vc_extraInitializers = [];
                    let _tpl_decorators;
                    let _tpl_initializers = [];
                    let _tpl_extraInitializers = [];
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var TestComponent = _classThis = class {
                        ngAfterViewInit() {
                            this.query.changes.subscribe(() => this.queryListNotificationCounter++);
                        }
                        constructor() {
                            this.queryListNotificationCounter = 0;
                            this.vc = __runInitializers(this, _vc_initializers, void 0);
                            this.tpl = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _tpl_initializers, void 0));
                            this.query = (__runInitializers(this, _tpl_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vc_decorators = [(0, core_1.ViewChild)(ViewContainerManipulatorDirective)];
                        _tpl_decorators = [(0, core_1.ViewChild)('tpl')];
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
                        __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [ViewContainerManipulatorDirective, TestComponent],
                });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                const { tpl, vc } = fixture.componentInstance;
                const viewRef = vc.insertTpl(tpl, {}, 0);
                fixture.detectChanges();
                expect(queryList.length).toBe(1);
                expect(fixture.componentInstance.queryListNotificationCounter).toBe(1);
                vc.move(viewRef, 0);
                fixture.detectChanges();
                expect(queryList.length).toBe(1);
                expect(fixture.componentInstance.queryListNotificationCounter).toBe(1);
            });
            it('should support a mix of content queries from the declaration and embedded view', () => {
                let QueryForLotsOfContent = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[query-for-lots-of-content]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foos1_decorators;
                    let _foos1_initializers = [];
                    let _foos1_extraInitializers = [];
                    let _foos2_decorators;
                    let _foos2_initializers = [];
                    let _foos2_extraInitializers = [];
                    var QueryForLotsOfContent = _classThis = class {
                        constructor() {
                            this.foos1 = __runInitializers(this, _foos1_initializers, void 0);
                            this.foos2 = (__runInitializers(this, _foos1_extraInitializers), __runInitializers(this, _foos2_initializers, void 0));
                            __runInitializers(this, _foos2_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "QueryForLotsOfContent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foos1_decorators = [(0, core_1.ContentChildren)('foo', { descendants: true })];
                        _foos2_decorators = [(0, core_1.ContentChildren)('foo', { descendants: true })];
                        __esDecorate(null, null, _foos1_decorators, { kind: "field", name: "foos1", static: false, private: false, access: { has: obj => "foos1" in obj, get: obj => obj.foos1, set: (obj, value) => { obj.foos1 = value; } }, metadata: _metadata }, _foos1_initializers, _foos1_extraInitializers);
                        __esDecorate(null, null, _foos2_decorators, { kind: "field", name: "foos2", static: false, private: false, access: { has: obj => "foos2" in obj, get: obj => obj.foos2, set: (obj, value) => { obj.foos2 = value; } }, metadata: _metadata }, _foos2_initializers, _foos2_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        QueryForLotsOfContent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return QueryForLotsOfContent = _classThis;
                })();
                let QueryForContent = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[query-for-content]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _foos_decorators;
                    let _foos_initializers = [];
                    let _foos_extraInitializers = [];
                    var QueryForContent = _classThis = class {
                        constructor() {
                            this.foos = __runInitializers(this, _foos_initializers, void 0);
                            __runInitializers(this, _foos_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "QueryForContent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _foos_decorators = [(0, core_1.ContentChildren)('foo')];
                        __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        QueryForContent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return QueryForContent = _classThis;
                })();
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
            <div query-for-lots-of-content>
              <ng-template ngFor let-item [ngForOf]="items">
                <div query-for-content>
                  <span #foo></span>
                </div>
              </ng-template>
            </div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.items = [1, 2];
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
                testing_1.TestBed.configureTestingModule({
                    declarations: [TestComponent, QueryForContent, QueryForLotsOfContent],
                });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const lotsOfContentEl = fixture.debugElement.query(platform_browser_1.By.directive(QueryForLotsOfContent));
                const lotsOfContentInstance = lotsOfContentEl.injector.get(QueryForLotsOfContent);
                const contentEl = fixture.debugElement.query(platform_browser_1.By.directive(QueryForContent));
                const contentInstance = contentEl.injector.get(QueryForContent);
                expect(lotsOfContentInstance.foos1.length).toBe(2);
                expect(lotsOfContentInstance.foos2.length).toBe(2);
                expect(contentInstance.foos.length).toBe(1);
                fixture.componentInstance.items = [];
                fixture.detectChanges();
                expect(lotsOfContentInstance.foos1.length).toBe(0);
                expect(lotsOfContentInstance.foos2.length).toBe(0);
            });
            // https://stackblitz.com/edit/angular-rrmmuf?file=src/app/app.component.ts
            it('should report results when different instances of TemplateRef are inserted into one ViewContainerRefs', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
               <ng-template #tpl1 let-idx="idx">
                 <div #foo [id]="'foo1_' + idx"></div>
               </ng-template>

               <div #foo id="middle"></div>

               <ng-template #tpl2 let-idx="idx">
                 <div #foo [id]="'foo2_' + idx"></div>
               </ng-template>

               <ng-template vc></ng-template>
             `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _vc_decorators;
                    let _vc_initializers = [];
                    let _vc_extraInitializers = [];
                    let _tpl1_decorators;
                    let _tpl1_initializers = [];
                    let _tpl1_extraInitializers = [];
                    let _tpl2_decorators;
                    let _tpl2_initializers = [];
                    let _tpl2_extraInitializers = [];
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.vc = __runInitializers(this, _vc_initializers, void 0);
                            this.tpl1 = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _tpl1_initializers, void 0));
                            this.tpl2 = (__runInitializers(this, _tpl1_extraInitializers), __runInitializers(this, _tpl2_initializers, void 0));
                            this.query = (__runInitializers(this, _tpl2_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _vc_decorators = [(0, core_1.ViewChild)(ViewContainerManipulatorDirective)];
                        _tpl1_decorators = [(0, core_1.ViewChild)('tpl1')];
                        _tpl2_decorators = [(0, core_1.ViewChild)('tpl2')];
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
                        __esDecorate(null, null, _tpl1_decorators, { kind: "field", name: "tpl1", static: false, private: false, access: { has: obj => "tpl1" in obj, get: obj => obj.tpl1, set: (obj, value) => { obj.tpl1 = value; } }, metadata: _metadata }, _tpl1_initializers, _tpl1_extraInitializers);
                        __esDecorate(null, null, _tpl2_decorators, { kind: "field", name: "tpl2", static: false, private: false, access: { has: obj => "tpl2" in obj, get: obj => obj.tpl2, set: (obj, value) => { obj.tpl2 = value; } }, metadata: _metadata }, _tpl2_initializers, _tpl2_extraInitializers);
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [ViewContainerManipulatorDirective, TestComponent],
                });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                const { tpl1, tpl2, vc } = fixture.componentInstance;
                expect(queryList.length).toBe(1);
                expect(queryList.first.nativeElement.getAttribute('id')).toBe('middle');
                vc.insertTpl(tpl1, { idx: 0 }, 0);
                vc.insertTpl(tpl2, { idx: 1 }, 1);
                fixture.detectChanges();
                expect(queryList.length).toBe(3);
                let qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo1_0');
                expect(qListArr[1].nativeElement.getAttribute('id')).toBe('middle');
                expect(qListArr[2].nativeElement.getAttribute('id')).toBe('foo2_1');
                vc.insertTpl(tpl1, { idx: 1 }, 1);
                fixture.detectChanges();
                expect(queryList.length).toBe(4);
                qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo1_0');
                expect(qListArr[1].nativeElement.getAttribute('id')).toBe('foo1_1');
                expect(qListArr[2].nativeElement.getAttribute('id')).toBe('middle');
                expect(qListArr[3].nativeElement.getAttribute('id')).toBe('foo2_1');
                vc.remove(1);
                fixture.detectChanges();
                expect(queryList.length).toBe(3);
                qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo1_0');
                expect(qListArr[1].nativeElement.getAttribute('id')).toBe('middle');
                expect(qListArr[2].nativeElement.getAttribute('id')).toBe('foo2_1');
                vc.remove(1);
                fixture.detectChanges();
                expect(queryList.length).toBe(2);
                qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo1_0');
                expect(qListArr[1].nativeElement.getAttribute('id')).toBe('middle');
            });
            // https://stackblitz.com/edit/angular-7vvo9j?file=src%2Fapp%2Fapp.component.ts
            // https://stackblitz.com/edit/angular-xzwp6n
            it('should report results when the same TemplateRef is inserted into different ViewContainerRefs', () => {
                let TestComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-comp',
                            template: `
               <ng-template #tpl let-idx="idx" let-container_idx="container_idx">
                 <div #foo [id]="'foo_' + container_idx + '_' + idx"></div>
               </ng-template>

               <ng-template vc #vi0="vc"></ng-template>
               <ng-template vc #vi1="vc"></ng-template>
             `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tpl_decorators;
                    let _tpl_initializers = [];
                    let _tpl_extraInitializers = [];
                    let _vi0_decorators;
                    let _vi0_initializers = [];
                    let _vi0_extraInitializers = [];
                    let _vi1_decorators;
                    let _vi1_initializers = [];
                    let _vi1_extraInitializers = [];
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var TestComponent = _classThis = class {
                        constructor() {
                            this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                            this.vi0 = (__runInitializers(this, _tpl_extraInitializers), __runInitializers(this, _vi0_initializers, void 0));
                            this.vi1 = (__runInitializers(this, _vi0_extraInitializers), __runInitializers(this, _vi1_initializers, void 0));
                            this.query = (__runInitializers(this, _vi1_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "TestComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tpl_decorators = [(0, core_1.ViewChild)('tpl')];
                        _vi0_decorators = [(0, core_1.ViewChild)('vi0')];
                        _vi1_decorators = [(0, core_1.ViewChild)('vi1')];
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                        __esDecorate(null, null, _vi0_decorators, { kind: "field", name: "vi0", static: false, private: false, access: { has: obj => "vi0" in obj, get: obj => obj.vi0, set: (obj, value) => { obj.vi0 = value; } }, metadata: _metadata }, _vi0_initializers, _vi0_extraInitializers);
                        __esDecorate(null, null, _vi1_decorators, { kind: "field", name: "vi1", static: false, private: false, access: { has: obj => "vi1" in obj, get: obj => obj.vi1, set: (obj, value) => { obj.vi1 = value; } }, metadata: _metadata }, _vi1_initializers, _vi1_extraInitializers);
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestComponent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [ViewContainerManipulatorDirective, TestComponent],
                });
                const fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                const { tpl, vi0, vi1 } = fixture.componentInstance;
                expect(queryList.length).toBe(0);
                vi0.insertTpl(tpl, { idx: 0, container_idx: 0 }, 0);
                vi1.insertTpl(tpl, { idx: 0, container_idx: 1 }, 0);
                fixture.detectChanges();
                expect(queryList.length).toBe(2);
                let qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo_0_0');
                expect(qListArr[1].nativeElement.getAttribute('id')).toBe('foo_1_0');
                vi0.remove();
                fixture.detectChanges();
                expect(queryList.length).toBe(1);
                qListArr = queryList.toArray();
                expect(qListArr[0].nativeElement.getAttribute('id')).toBe('foo_1_0');
                vi1.remove();
                fixture.detectChanges();
                expect(queryList.length).toBe(0);
            });
            // https://stackblitz.com/edit/angular-wpd6gv?file=src%2Fapp%2Fapp.component.ts
            it('should report results from views inserted in a lifecycle hook', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-app',
                            template: `
            <ng-template #tpl>
              <span #foo id="from_tpl"></span>
            </ng-template>

            <ng-template [ngTemplateOutlet]="show ? tpl : null"></ng-template>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _query_decorators;
                    let _query_initializers = [];
                    let _query_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.show = false;
                            this.query = __runInitializers(this, _query_initializers, void 0);
                            __runInitializers(this, _query_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _query_decorators = [(0, core_1.ViewChildren)('foo')];
                        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp], imports: [common_1.CommonModule] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const queryList = fixture.componentInstance.query;
                expect(queryList.length).toBe(0);
                fixture.componentInstance.show = true;
                fixture.detectChanges();
                expect(queryList.length).toBe(1);
                expect(queryList.first.nativeElement.id).toBe('from_tpl');
                fixture.componentInstance.show = false;
                fixture.detectChanges();
                expect(queryList.length).toBe(0);
            });
        });
    });
    describe('non-regression', () => {
        it('should query by provider super-type in an embedded view', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[child]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[parent]',
                        providers: [{ provide: Child, useExisting: Parent }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = Child;
                var Parent = _classThis = class extends _classSuper {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<ng-template [ngIf]="true"><ng-template [ngIf]="true"><div parent></div></ng-template></ng-template>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instances_decorators;
                let _instances_initializers = [];
                let _instances_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.instances = __runInitializers(this, _instances_initializers, void 0);
                        __runInitializers(this, _instances_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _instances_decorators = [(0, core_1.ViewChildren)(Child)];
                    __esDecorate(null, null, _instances_decorators, { kind: "field", name: "instances", static: false, private: false, access: { has: obj => "instances" in obj, get: obj => obj.instances, set: (obj, value) => { obj.instances = value; } }, metadata: _metadata }, _instances_initializers, _instances_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, Parent, Child] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            expect(fixture.componentInstance.instances.length).toBe(1);
        });
        it('should flatten multi-provider results', () => {
            class MyClass {
            }
            let WithMultiProvider = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-multi-provider',
                        template: '',
                        providers: [
                            { provide: MyClass, useExisting: (0, core_1.forwardRef)(() => WithMultiProvider), multi: true },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithMultiProvider = _classThis = class {
                };
                __setFunctionName(_classThis, "WithMultiProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithMultiProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithMultiProvider = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `<with-multi-provider></with-multi-provider>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryResults_decorators;
                let _queryResults_initializers = [];
                let _queryResults_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.queryResults = __runInitializers(this, _queryResults_initializers, void 0);
                        __runInitializers(this, _queryResults_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryResults_decorators = [(0, core_1.ViewChildren)(MyClass)];
                    __esDecorate(null, null, _queryResults_decorators, { kind: "field", name: "queryResults", static: false, private: false, access: { has: obj => "queryResults" in obj, get: obj => obj.queryResults, set: (obj, value) => { obj.queryResults = value; } }, metadata: _metadata }, _queryResults_initializers, _queryResults_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, WithMultiProvider] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryResults.length).toBe(1);
            expect(fixture.componentInstance.queryResults.first).toBeInstanceOf(WithMultiProvider);
        });
        it('should flatten multi-provider results when crossing ng-template', () => {
            class MyClass {
            }
            let WithMultiProvider = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-multi-provider',
                        template: '',
                        providers: [
                            { provide: MyClass, useExisting: (0, core_1.forwardRef)(() => WithMultiProvider), multi: true },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithMultiProvider = _classThis = class {
                };
                __setFunctionName(_classThis, "WithMultiProvider");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithMultiProvider = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithMultiProvider = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <ng-template [ngIf]="true"><with-multi-provider></with-multi-provider></ng-template>
          <with-multi-provider></with-multi-provider>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryResults_decorators;
                let _queryResults_initializers = [];
                let _queryResults_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.queryResults = __runInitializers(this, _queryResults_initializers, void 0);
                        __runInitializers(this, _queryResults_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryResults_decorators = [(0, core_1.ViewChildren)(MyClass)];
                    __esDecorate(null, null, _queryResults_decorators, { kind: "field", name: "queryResults", static: false, private: false, access: { has: obj => "queryResults" in obj, get: obj => obj.queryResults, set: (obj, value) => { obj.queryResults = value; } }, metadata: _metadata }, _queryResults_initializers, _queryResults_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, WithMultiProvider] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryResults.length).toBe(2);
            expect(fixture.componentInstance.queryResults.first).toBeInstanceOf(WithMultiProvider);
            expect(fixture.componentInstance.queryResults.last).toBeInstanceOf(WithMultiProvider);
        });
        it('should allow undefined provider value in a [View/Content]Child queries', () => {
            let GroupDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[group]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GroupDir = _classThis = class {
                };
                __setFunctionName(_classThis, "GroupDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GroupDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GroupDir = _classThis;
            })();
            let UndefinedGroup = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[undefinedGroup]',
                        providers: [{ provide: GroupDir, useValue: undefined }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var UndefinedGroup = _classThis = class {
                };
                __setFunctionName(_classThis, "UndefinedGroup");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UndefinedGroup = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UndefinedGroup = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div group></div>
          <ng-template [ngIf]="true">
            <div undefinedGroup></div>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _group_decorators;
                let _group_initializers = [];
                let _group_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.group = __runInitializers(this, _group_initializers, void 0);
                        __runInitializers(this, _group_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _group_decorators = [(0, core_1.ViewChild)(GroupDir)];
                    __esDecorate(null, null, _group_decorators, { kind: "field", name: "group", static: false, private: false, access: { has: obj => "group" in obj, get: obj => obj.group, set: (obj, value) => { obj.group = value; } }, metadata: _metadata }, _group_initializers, _group_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, GroupDir, UndefinedGroup],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.group).toBeInstanceOf(GroupDir);
        });
        it('should allow null / undefined provider value in a [View/Content]Children queries', () => {
            let GroupDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[group]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GroupDir = _classThis = class {
                };
                __setFunctionName(_classThis, "GroupDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GroupDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GroupDir = _classThis;
            })();
            let NullGroup = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[nullGroup]',
                        providers: [{ provide: GroupDir, useValue: null }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NullGroup = _classThis = class {
                };
                __setFunctionName(_classThis, "NullGroup");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NullGroup = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NullGroup = _classThis;
            })();
            let UndefinedGroup = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[undefinedGroup]',
                        providers: [{ provide: GroupDir, useValue: undefined }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var UndefinedGroup = _classThis = class {
                };
                __setFunctionName(_classThis, "UndefinedGroup");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    UndefinedGroup = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return UndefinedGroup = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template [ngIf]="true">
            <div nullGroup></div>
          </ng-template>
          <div group></div>
          <ng-template [ngIf]="true">
            <div undefinedGroup></div>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _groups_decorators;
                let _groups_initializers = [];
                let _groups_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.groups = __runInitializers(this, _groups_initializers, void 0);
                        __runInitializers(this, _groups_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _groups_decorators = [(0, core_1.ViewChildren)(GroupDir)];
                    __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, GroupDir, NullGroup, UndefinedGroup],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const queryList = fixture.componentInstance.groups;
            expect(queryList.length).toBe(3);
            const groups = queryList.toArray();
            expect(groups[0]).toBeNull();
            expect(groups[1]).toBeInstanceOf(GroupDir);
            expect(groups[2]).toBeUndefined();
        });
    });
    describe('querying for string token providers', () => {
        let TextTokenDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[text-token]',
                    providers: [{ provide: 'Token', useExisting: TextTokenDirective }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TextTokenDirective = _classThis = class {
            };
            __setFunctionName(_classThis, "TextTokenDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TextTokenDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TextTokenDirective = _classThis;
        })();
        it('should match string injection token in a ViewChild query', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div text-token></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ViewChild)('Token')];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.token).toBeInstanceOf(TextTokenDirective);
        });
        it('should give precedence to local reference if both a reference and a string injection token provider match a ViewChild query', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div text-token #Token></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ViewChild)('Token')];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.token).toBeInstanceOf(core_1.ElementRef);
        });
        it('should match string injection token in a ViewChildren query', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div text-token></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tokens_decorators;
                let _tokens_initializers = [];
                let _tokens_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.tokens = __runInitializers(this, _tokens_initializers, void 0);
                        __runInitializers(this, _tokens_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tokens_decorators = [(0, core_1.ViewChildren)('Token')];
                    __esDecorate(null, null, _tokens_decorators, { kind: "field", name: "tokens", static: false, private: false, access: { has: obj => "tokens" in obj, get: obj => obj.tokens, set: (obj, value) => { obj.tokens = value; } }, metadata: _metadata }, _tokens_initializers, _tokens_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const tokens = fixture.componentInstance.tokens;
            expect(tokens.length).toBe(1);
            expect(tokens.first).toBeInstanceOf(TextTokenDirective);
        });
        it('should match both string injection token and local reference inside a ViewChildren query', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div text-token #Token></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tokens_decorators;
                let _tokens_initializers = [];
                let _tokens_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.tokens = __runInitializers(this, _tokens_initializers, void 0);
                        __runInitializers(this, _tokens_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tokens_decorators = [(0, core_1.ViewChildren)('Token')];
                    __esDecorate(null, null, _tokens_decorators, { kind: "field", name: "tokens", static: false, private: false, access: { has: obj => "tokens" in obj, get: obj => obj.tokens, set: (obj, value) => { obj.tokens = value; } }, metadata: _metadata }, _tokens_initializers, _tokens_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.tokens.toArray()).toEqual([
                jasmine.any(core_1.ElementRef),
                jasmine.any(TextTokenDirective),
            ]);
        });
        it('should match string injection token in a ContentChild query', () => {
            let HasQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-query',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var HasQuery = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HasQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ContentChild)('Token')];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasQuery = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<has-query><div text-token></div></has-query>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryComp_decorators;
                let _queryComp_initializers = [];
                let _queryComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.queryComp = __runInitializers(this, _queryComp_initializers, void 0);
                        __runInitializers(this, _queryComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryComp_decorators = [(0, core_1.ViewChild)(HasQuery)];
                    __esDecorate(null, null, _queryComp_decorators, { kind: "field", name: "queryComp", static: false, private: false, access: { has: obj => "queryComp" in obj, get: obj => obj.queryComp, set: (obj, value) => { obj.queryComp = value; } }, metadata: _metadata }, _queryComp_initializers, _queryComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HasQuery, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryComp.token).toBeInstanceOf(TextTokenDirective);
        });
        it('should give precedence to local reference if both a reference and a string injection token provider match a ContentChild query', () => {
            let HasQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-query',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var HasQuery = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HasQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ContentChild)('Token')];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasQuery = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<has-query><div text-token #Token></div></has-query>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryComp_decorators;
                let _queryComp_initializers = [];
                let _queryComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.queryComp = __runInitializers(this, _queryComp_initializers, void 0);
                        __runInitializers(this, _queryComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryComp_decorators = [(0, core_1.ViewChild)(HasQuery)];
                    __esDecorate(null, null, _queryComp_decorators, { kind: "field", name: "queryComp", static: false, private: false, access: { has: obj => "queryComp" in obj, get: obj => obj.queryComp, set: (obj, value) => { obj.queryComp = value; } }, metadata: _metadata }, _queryComp_initializers, _queryComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HasQuery, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryComp.token).toBeInstanceOf(core_1.ElementRef);
        });
        it('should match string injection token in a ContentChildren query', () => {
            let HasQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-query',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tokens_decorators;
                let _tokens_initializers = [];
                let _tokens_extraInitializers = [];
                var HasQuery = _classThis = class {
                    constructor() {
                        this.tokens = __runInitializers(this, _tokens_initializers, void 0);
                        __runInitializers(this, _tokens_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HasQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tokens_decorators = [(0, core_1.ContentChildren)('Token')];
                    __esDecorate(null, null, _tokens_decorators, { kind: "field", name: "tokens", static: false, private: false, access: { has: obj => "tokens" in obj, get: obj => obj.tokens, set: (obj, value) => { obj.tokens = value; } }, metadata: _metadata }, _tokens_initializers, _tokens_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasQuery = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<has-query><div text-token></div></has-query>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryComp_decorators;
                let _queryComp_initializers = [];
                let _queryComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.queryComp = __runInitializers(this, _queryComp_initializers, void 0);
                        __runInitializers(this, _queryComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryComp_decorators = [(0, core_1.ViewChild)(HasQuery)];
                    __esDecorate(null, null, _queryComp_decorators, { kind: "field", name: "queryComp", static: false, private: false, access: { has: obj => "queryComp" in obj, get: obj => obj.queryComp, set: (obj, value) => { obj.queryComp = value; } }, metadata: _metadata }, _queryComp_initializers, _queryComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HasQuery, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const tokens = fixture.componentInstance.queryComp.tokens;
            expect(tokens.length).toBe(1);
            expect(tokens.first).toBeInstanceOf(TextTokenDirective);
        });
        it('should match both string injection token and local reference inside a ContentChildren query', () => {
            let HasQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-query',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tokens_decorators;
                let _tokens_initializers = [];
                let _tokens_extraInitializers = [];
                var HasQuery = _classThis = class {
                    constructor() {
                        this.tokens = __runInitializers(this, _tokens_initializers, void 0);
                        __runInitializers(this, _tokens_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HasQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tokens_decorators = [(0, core_1.ContentChildren)('Token')];
                    __esDecorate(null, null, _tokens_decorators, { kind: "field", name: "tokens", static: false, private: false, access: { has: obj => "tokens" in obj, get: obj => obj.tokens, set: (obj, value) => { obj.tokens = value; } }, metadata: _metadata }, _tokens_initializers, _tokens_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasQuery = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<has-query><div text-token #Token></div></has-query>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryComp_decorators;
                let _queryComp_initializers = [];
                let _queryComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.queryComp = __runInitializers(this, _queryComp_initializers, void 0);
                        __runInitializers(this, _queryComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryComp_decorators = [(0, core_1.ViewChild)(HasQuery)];
                    __esDecorate(null, null, _queryComp_decorators, { kind: "field", name: "queryComp", static: false, private: false, access: { has: obj => "queryComp" in obj, get: obj => obj.queryComp, set: (obj, value) => { obj.queryComp = value; } }, metadata: _metadata }, _queryComp_initializers, _queryComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HasQuery, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryComp.tokens.toArray()).toEqual([
                jasmine.any(core_1.ElementRef),
                jasmine.any(TextTokenDirective),
            ]);
        });
        it('should match string token specified through the `read` option of a view query', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div text-token #Token></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ViewChild)('Token', { read: 'Token' })];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.token).toBeInstanceOf(TextTokenDirective);
        });
        it('should match string token specified through the `read` option of a content query', () => {
            let HasQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-query',
                        template: '<ng-content></ng-content>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _token_decorators;
                let _token_initializers = [];
                let _token_extraInitializers = [];
                var HasQuery = _classThis = class {
                    constructor() {
                        this.token = __runInitializers(this, _token_initializers, void 0);
                        __runInitializers(this, _token_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "HasQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _token_decorators = [(0, core_1.ContentChild)('Token', { read: 'Token' })];
                    __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasQuery = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<has-query><div text-token #Token></div></has-query>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _queryComp_decorators;
                let _queryComp_initializers = [];
                let _queryComp_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.queryComp = __runInitializers(this, _queryComp_initializers, void 0);
                        __runInitializers(this, _queryComp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _queryComp_decorators = [(0, core_1.ViewChild)(HasQuery)];
                    __esDecorate(null, null, _queryComp_decorators, { kind: "field", name: "queryComp", static: false, private: false, access: { has: obj => "queryComp" in obj, get: obj => obj.queryComp, set: (obj, value) => { obj.queryComp = value; } }, metadata: _metadata }, _queryComp_initializers, _queryComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, HasQuery, TextTokenDirective] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.componentInstance.queryComp.token).toBeInstanceOf(TextTokenDirective);
        });
    });
});
function initWithTemplate(compType, template) {
    testing_1.TestBed.overrideComponent(compType, { set: new core_1.Component({ template }) });
    const fixture = testing_1.TestBed.createComponent(compType);
    fixture.detectChanges();
    return fixture;
}
let QueryComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'local-ref-query-component',
            template: '<ng-content></ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _viewChild_decorators;
    let _viewChild_initializers = [];
    let _viewChild_extraInitializers = [];
    let _contentChild_decorators;
    let _contentChild_initializers = [];
    let _contentChild_extraInitializers = [];
    let _viewChildren_decorators;
    let _viewChildren_initializers = [];
    let _viewChildren_extraInitializers = [];
    let _contentChildren_decorators;
    let _contentChildren_initializers = [];
    let _contentChildren_extraInitializers = [];
    var QueryComp = _classThis = class {
        constructor() {
            this.viewChild = __runInitializers(this, _viewChild_initializers, void 0);
            this.contentChild = (__runInitializers(this, _viewChild_extraInitializers), __runInitializers(this, _contentChild_initializers, void 0));
            this.viewChildren = (__runInitializers(this, _contentChild_extraInitializers), __runInitializers(this, _viewChildren_initializers, void 0));
            this.contentChildren = (__runInitializers(this, _viewChildren_extraInitializers), __runInitializers(this, _contentChildren_initializers, void 0));
            __runInitializers(this, _contentChildren_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "QueryComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _viewChild_decorators = [(0, core_1.ViewChild)('viewQuery')];
        _contentChild_decorators = [(0, core_1.ContentChild)('contentQuery')];
        _viewChildren_decorators = [(0, core_1.ViewChildren)('viewQuery')];
        _contentChildren_decorators = [(0, core_1.ContentChildren)('contentQuery')];
        __esDecorate(null, null, _viewChild_decorators, { kind: "field", name: "viewChild", static: false, private: false, access: { has: obj => "viewChild" in obj, get: obj => obj.viewChild, set: (obj, value) => { obj.viewChild = value; } }, metadata: _metadata }, _viewChild_initializers, _viewChild_extraInitializers);
        __esDecorate(null, null, _contentChild_decorators, { kind: "field", name: "contentChild", static: false, private: false, access: { has: obj => "contentChild" in obj, get: obj => obj.contentChild, set: (obj, value) => { obj.contentChild = value; } }, metadata: _metadata }, _contentChild_initializers, _contentChild_extraInitializers);
        __esDecorate(null, null, _viewChildren_decorators, { kind: "field", name: "viewChildren", static: false, private: false, access: { has: obj => "viewChildren" in obj, get: obj => obj.viewChildren, set: (obj, value) => { obj.viewChildren = value; } }, metadata: _metadata }, _viewChildren_initializers, _viewChildren_extraInitializers);
        __esDecorate(null, null, _contentChildren_decorators, { kind: "field", name: "contentChildren", static: false, private: false, access: { has: obj => "contentChildren" in obj, get: obj => obj.contentChildren, set: (obj, value) => { obj.contentChildren = value; } }, metadata: _metadata }, _contentChildren_initializers, _contentChildren_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryComp = _classThis;
})();
let AppComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-comp',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComp = _classThis = class {
    };
    __setFunctionName(_classThis, "AppComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComp = _classThis;
})();
let SimpleCompA = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-comp-a',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCompA = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleCompA");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleCompA = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleCompA = _classThis;
})();
let SimpleCompB = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-comp-b',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCompB = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleCompB");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleCompB = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleCompB = _classThis;
})();
let TextDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[text]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    var TextDirective = _classThis = class {
        constructor() {
            this.text = __runInitializers(this, _text_initializers, '');
            __runInitializers(this, _text_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TextDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _text_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TextDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TextDirective = _classThis;
})();
let StaticViewQueryComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'static-view-query-comp',
            template: `
    <div [text]="text"></div>
    <span #foo></span>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _get_textDir_decorators;
    let _get_foo_decorators;
    var StaticViewQueryComp = _classThis = class {
        constructor() {
            this._textDir = __runInitializers(this, _instanceExtraInitializers);
            this.setEvents = [];
            this.text = 'some text';
        }
        get textDir() {
            return this._textDir;
        }
        set textDir(value) {
            this.setEvents.push('textDir set');
            this._textDir = value;
        }
        get foo() {
            return this._foo;
        }
        set foo(value) {
            this.setEvents.push('foo set');
            this._foo = value;
        }
    };
    __setFunctionName(_classThis, "StaticViewQueryComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _get_textDir_decorators = [(0, core_1.ViewChild)(TextDirective, { static: true })];
        _get_foo_decorators = [(0, core_1.ViewChild)('foo')];
        __esDecorate(_classThis, null, _get_textDir_decorators, { kind: "getter", name: "textDir", static: false, private: false, access: { has: obj => "textDir" in obj, get: obj => obj.textDir }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_foo_decorators, { kind: "getter", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaticViewQueryComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaticViewQueryComp = _classThis;
})();
let SubclassStaticViewQueryComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'subclass-static-view-query-comp',
            template: `
    <div [text]="text"></div>
    <span #foo></span>

    <div #bar></div>
    <span #baz></span>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StaticViewQueryComp;
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    let _baz_decorators;
    let _baz_initializers = [];
    let _baz_extraInitializers = [];
    var SubclassStaticViewQueryComp = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.bar = __runInitializers(this, _bar_initializers, void 0);
            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, void 0));
            __runInitializers(this, _baz_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SubclassStaticViewQueryComp");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _bar_decorators = [(0, core_1.ViewChild)('bar', { static: true })];
        _baz_decorators = [(0, core_1.ViewChild)('baz')];
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubclassStaticViewQueryComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubclassStaticViewQueryComp = _classThis;
})();
let StaticContentQueryComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'static-content-query-comp',
            template: `<ng-content></ng-content>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _get_textDir_decorators;
    let _get_foo_decorators;
    var StaticContentQueryComp = _classThis = class {
        constructor() {
            this._textDir = __runInitializers(this, _instanceExtraInitializers);
            this.setEvents = [];
        }
        get textDir() {
            return this._textDir;
        }
        set textDir(value) {
            this.setEvents.push('textDir set');
            this._textDir = value;
        }
        get foo() {
            return this._foo;
        }
        set foo(value) {
            this.setEvents.push('foo set');
            this._foo = value;
        }
    };
    __setFunctionName(_classThis, "StaticContentQueryComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _get_textDir_decorators = [(0, core_1.ContentChild)(TextDirective, { static: true })];
        _get_foo_decorators = [(0, core_1.ContentChild)('foo')];
        __esDecorate(_classThis, null, _get_textDir_decorators, { kind: "getter", name: "textDir", static: false, private: false, access: { has: obj => "textDir" in obj, get: obj => obj.textDir }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_foo_decorators, { kind: "getter", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaticContentQueryComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaticContentQueryComp = _classThis;
})();
let StaticContentQueryDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[staticContentQueryDir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _get_textDir_decorators;
    let _get_foo_decorators;
    var StaticContentQueryDir = _classThis = class {
        constructor() {
            this._textDir = __runInitializers(this, _instanceExtraInitializers);
            this.setEvents = [];
        }
        get textDir() {
            return this._textDir;
        }
        set textDir(value) {
            this.setEvents.push('textDir set');
            this._textDir = value;
        }
        get foo() {
            return this._foo;
        }
        set foo(value) {
            this.setEvents.push('foo set');
            this._foo = value;
        }
    };
    __setFunctionName(_classThis, "StaticContentQueryDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _get_textDir_decorators = [(0, core_1.ContentChild)(TextDirective, { static: true })];
        _get_foo_decorators = [(0, core_1.ContentChild)('foo')];
        __esDecorate(_classThis, null, _get_textDir_decorators, { kind: "getter", name: "textDir", static: false, private: false, access: { has: obj => "textDir" in obj, get: obj => obj.textDir }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_foo_decorators, { kind: "getter", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaticContentQueryDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaticContentQueryDir = _classThis;
})();
let SubclassStaticContentQueryComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'subclass-static-content-query-comp',
            template: `<ng-content></ng-content>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StaticContentQueryComp;
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    let _baz_decorators;
    let _baz_initializers = [];
    let _baz_extraInitializers = [];
    var SubclassStaticContentQueryComp = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.bar = __runInitializers(this, _bar_initializers, void 0);
            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, void 0));
            __runInitializers(this, _baz_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SubclassStaticContentQueryComp");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _bar_decorators = [(0, core_1.ContentChild)('bar', { static: true })];
        _baz_decorators = [(0, core_1.ContentChild)('baz')];
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubclassStaticContentQueryComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubclassStaticContentQueryComp = _classThis;
})();
let QueryCompWithChanges = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'query-with-changes',
            template: `
    <div *ngIf="showing" #foo></div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foos_decorators;
    let _foos_initializers = [];
    let _foos_extraInitializers = [];
    var QueryCompWithChanges = _classThis = class {
        constructor() {
            this.foos = __runInitializers(this, _foos_initializers, void 0);
            this.showing = (__runInitializers(this, _foos_extraInitializers), false);
        }
    };
    __setFunctionName(_classThis, "QueryCompWithChanges");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foos_decorators = [(0, core_1.ViewChildren)('foo')];
        __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryCompWithChanges = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryCompWithChanges = _classThis;
})();
exports.QueryCompWithChanges = QueryCompWithChanges;
let QueryCompWithNoChanges = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'query-with-no-changes',
            template: `
    <query-component>
      <div *ngIf="true" #foo></div>
      <div *ngIf="showing">
        Showing me should not change the content of the query
        <div *ngIf="innerShowing" #foo></div>
      </div>
    </query-component>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QueryCompWithNoChanges = _classThis = class {
        constructor() {
            this.showing = true;
            this.innerShowing = true;
        }
    };
    __setFunctionName(_classThis, "QueryCompWithNoChanges");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryCompWithNoChanges = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryCompWithNoChanges = _classThis;
})();
exports.QueryCompWithNoChanges = QueryCompWithNoChanges;
let QueryCompWithStrictChangeEmitParent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'query-component',
            template: `<ng-content></ng-content>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foos_decorators;
    let _foos_initializers = [];
    let _foos_extraInitializers = [];
    var QueryCompWithStrictChangeEmitParent = _classThis = class {
        constructor(queryCompWithNoChanges) {
            this.queryCompWithNoChanges = queryCompWithNoChanges;
            this.foos = __runInitializers(this, _foos_initializers, void 0);
            __runInitializers(this, _foos_extraInitializers);
            this.queryCompWithNoChanges = queryCompWithNoChanges;
            queryCompWithNoChanges.queryComp = this;
        }
    };
    __setFunctionName(_classThis, "QueryCompWithStrictChangeEmitParent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foos_decorators = [(0, core_1.ContentChildren)('foo', {
                descendants: true,
                emitDistinctChangesOnly: true,
            })];
        __esDecorate(null, null, _foos_decorators, { kind: "field", name: "foos", static: false, private: false, access: { has: obj => "foos" in obj, get: obj => obj.foos, set: (obj, value) => { obj.foos = value; } }, metadata: _metadata }, _foos_initializers, _foos_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryCompWithStrictChangeEmitParent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryCompWithStrictChangeEmitParent = _classThis;
})();
exports.QueryCompWithStrictChangeEmitParent = QueryCompWithStrictChangeEmitParent;
let SuperDirectiveQueryTarget = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'query-target',
            template: '<ng-content></ng-content>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SuperDirectiveQueryTarget = _classThis = class {
    };
    __setFunctionName(_classThis, "SuperDirectiveQueryTarget");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SuperDirectiveQueryTarget = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SuperDirectiveQueryTarget = _classThis;
})();
let SuperDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[super-directive]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _headers_decorators;
    let _headers_initializers = [];
    let _headers_extraInitializers = [];
    var SuperDirective = _classThis = class {
        constructor() {
            this.headers = __runInitializers(this, _headers_initializers, void 0);
            __runInitializers(this, _headers_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SuperDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _headers_decorators = [(0, core_1.ViewChildren)(SuperDirectiveQueryTarget)];
        __esDecorate(null, null, _headers_decorators, { kind: "field", name: "headers", static: false, private: false, access: { has: obj => "headers" in obj, get: obj => obj.headers, set: (obj, value) => { obj.headers = value; } }, metadata: _metadata }, _headers_initializers, _headers_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SuperDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SuperDirective = _classThis;
})();
let SubComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <query-target>One</query-target>
    <query-target>Two</query-target>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SuperDirective;
    var SubComponent = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "SubComponent");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubComponent = _classThis;
})();
const MY_OPTION_TOKEN = new core_1.InjectionToken('ComponentWithToken');
let TestComponentWithToken = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-option',
            template: 'Option',
            providers: [{ provide: MY_OPTION_TOKEN, useExisting: TestComponentWithToken }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestComponentWithToken = _classThis = class {
    };
    __setFunctionName(_classThis, "TestComponentWithToken");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestComponentWithToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestComponentWithToken = _classThis;
})();
let TestInjectionTokenQueries = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-injection-token',
            template: `
    <my-option></my-option>
    <my-option></my-option>
    <ng-content></ng-content>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _viewFirstOption_decorators;
    let _viewFirstOption_initializers = [];
    let _viewFirstOption_extraInitializers = [];
    let _viewOptions_decorators;
    let _viewOptions_initializers = [];
    let _viewOptions_extraInitializers = [];
    let _contentFirstOption_decorators;
    let _contentFirstOption_initializers = [];
    let _contentFirstOption_extraInitializers = [];
    let _contentOptions_decorators;
    let _contentOptions_initializers = [];
    let _contentOptions_extraInitializers = [];
    var TestInjectionTokenQueries = _classThis = class {
        constructor() {
            this.viewFirstOption = __runInitializers(this, _viewFirstOption_initializers, void 0);
            this.viewOptions = (__runInitializers(this, _viewFirstOption_extraInitializers), __runInitializers(this, _viewOptions_initializers, void 0));
            this.contentFirstOption = (__runInitializers(this, _viewOptions_extraInitializers), __runInitializers(this, _contentFirstOption_initializers, void 0));
            this.contentOptions = (__runInitializers(this, _contentFirstOption_extraInitializers), __runInitializers(this, _contentOptions_initializers, void 0));
            __runInitializers(this, _contentOptions_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TestInjectionTokenQueries");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _viewFirstOption_decorators = [(0, core_1.ViewChild)(MY_OPTION_TOKEN)];
        _viewOptions_decorators = [(0, core_1.ViewChildren)(MY_OPTION_TOKEN)];
        _contentFirstOption_decorators = [(0, core_1.ContentChild)(MY_OPTION_TOKEN)];
        _contentOptions_decorators = [(0, core_1.ContentChildren)(MY_OPTION_TOKEN)];
        __esDecorate(null, null, _viewFirstOption_decorators, { kind: "field", name: "viewFirstOption", static: false, private: false, access: { has: obj => "viewFirstOption" in obj, get: obj => obj.viewFirstOption, set: (obj, value) => { obj.viewFirstOption = value; } }, metadata: _metadata }, _viewFirstOption_initializers, _viewFirstOption_extraInitializers);
        __esDecorate(null, null, _viewOptions_decorators, { kind: "field", name: "viewOptions", static: false, private: false, access: { has: obj => "viewOptions" in obj, get: obj => obj.viewOptions, set: (obj, value) => { obj.viewOptions = value; } }, metadata: _metadata }, _viewOptions_initializers, _viewOptions_extraInitializers);
        __esDecorate(null, null, _contentFirstOption_decorators, { kind: "field", name: "contentFirstOption", static: false, private: false, access: { has: obj => "contentFirstOption" in obj, get: obj => obj.contentFirstOption, set: (obj, value) => { obj.contentFirstOption = value; } }, metadata: _metadata }, _contentFirstOption_initializers, _contentFirstOption_extraInitializers);
        __esDecorate(null, null, _contentOptions_decorators, { kind: "field", name: "contentOptions", static: false, private: false, access: { has: obj => "contentOptions" in obj, get: obj => obj.contentOptions, set: (obj, value) => { obj.contentOptions = value; } }, metadata: _metadata }, _contentOptions_initializers, _contentOptions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestInjectionTokenQueries = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestInjectionTokenQueries = _classThis;
})();
let TestInjectionTokenContentQueries = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <test-injection-token>
      <my-option></my-option>
      <my-option></my-option>
    </test-injection-token>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestInjectionTokenContentQueries = _classThis = class {
    };
    __setFunctionName(_classThis, "TestInjectionTokenContentQueries");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestInjectionTokenContentQueries = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestInjectionTokenContentQueries = _classThis;
})();
