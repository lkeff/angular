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
exports.StructDir = void 0;
const common_1 = require("@angular/common");
const compiler_1 = require("@angular/compiler");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const localize_1 = require("@angular/localize");
const platform_browser_1 = require("@angular/platform-browser");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('ViewContainerRef', () => {
    /**
     * Gets the inner HTML of the given element with all HTML comments and Angular internal
     * reflect attributes omitted. This makes HTML comparisons easier and less verbose.
     */
    function getElementHtml(element) {
        return element.innerHTML
            .replace(/<!--(\W|\w)*?-->/g, '')
            .replace(/\sng-reflect-\S*="[^"]*"/g, '');
    }
    /**
     * Helper method to retrieve the text content of the given element. This method also strips all
     * leading and trailing whitespace and removes all newlines. This makes element content
     * comparisons easier and less verbose.
     */
    function getElementText(element) {
        return element.textContent.trim().replace(/\r?\n/g, ' ').replace(/ +/g, ' ');
    }
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                StructDir,
                ViewContainerRefComp,
                ViewContainerRefApp,
                DestroyCasesComp,
                ConstructorDir,
                ConstructorApp,
                ConstructorAppWithQueries,
            ],
        });
    });
    afterEach(() => (0, localize_1.clearTranslations)());
    describe('create', () => {
        it('should support view queries inside embedded views created in dir constructors', () => {
            const fixture = testing_1.TestBed.createComponent(ConstructorApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.foo).toBeInstanceOf(core_1.ElementRef);
            (0, matchers_1.expect)(fixture.componentInstance.foo.nativeElement).toEqual(fixture.debugElement.nativeElement.querySelector('span'));
        });
        it('should ensure results in views created in constructors do not appear before template node results', () => {
            const fixture = testing_1.TestBed.createComponent(ConstructorAppWithQueries);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.foo).toBeInstanceOf(core_1.TemplateRef);
        });
        it('should construct proper TNode / DOM tree when embedded views are created in a directive constructor', () => {
            let ViewInsertionTestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'view-insertion-test-cmpt',
                        template: `<div>before<ng-template constructorDir><span>|middle|</span></ng-template>after</div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ViewInsertionTestCmpt = _classThis = class {
                };
                __setFunctionName(_classThis, "ViewInsertionTestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ViewInsertionTestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ViewInsertionTestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ViewInsertionTestCmpt, ConstructorDir] });
            const fixture = testing_1.TestBed.createComponent(ViewInsertionTestCmpt);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('before|middle|after');
        });
        it('should use comment node of host ng-container as insertion marker', () => {
            let HelloComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'hello',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HelloComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HelloComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HelloComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HelloComp = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-container vcref></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRefDir_decorators;
                let _vcRefDir_initializers = [];
                let _vcRefDir_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor() {
                        this.vcRefDir = __runInitializers(this, _vcRefDir_initializers, void 0);
                        __runInitializers(this, _vcRefDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRefDir_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRefDir_decorators, { kind: "field", name: "vcRefDir", static: false, private: false, access: { has: obj => "vcRefDir" in obj, get: obj => obj.vcRefDir, set: (obj, value) => { obj.vcRefDir = value; } }, metadata: _metadata }, _vcRefDir_initializers, _vcRefDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, VCRefDirective, HelloComp] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const { vcref, elementRef } = fixture.componentInstance.vcRefDir;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toMatch(/<!--(ng-container)?-->/, 'Expected only one comment node to be generated.');
            const testParent = document.createElement('div');
            testParent.appendChild(elementRef.nativeElement);
            (0, matchers_1.expect)(testParent.textContent).toBe('');
            (0, matchers_1.expect)(testParent.childNodes.length).toBe(1);
            (0, matchers_1.expect)(testParent.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
            // Add a test component to the view container ref to ensure that
            // the "ng-container" comment was used as marker for the insertion.
            const ref = vcref.createComponent(HelloComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(testParent.textContent).toBe('hello');
            (0, matchers_1.expect)(testParent.childNodes.length).toBe(2);
            (0, matchers_1.expect)(testParent.childNodes[0].nodeType).toBe(Node.ELEMENT_NODE);
            (0, matchers_1.expect)(testParent.childNodes[0].textContent).toBe('hello');
            (0, matchers_1.expect)(testParent.childNodes[1].nodeType).toBe(Node.COMMENT_NODE);
            ref.destroy();
        });
        it('should support attribute selectors in dynamically created components', () => {
            let HelloComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: '[hello]',
                        template: 'Hello',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HelloComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HelloComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HelloComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HelloComp = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-container #container></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRef_decorators;
                let _vcRef_initializers = [];
                let _vcRef_extraInitializers = [];
                var TestComp = _classThis = class {
                    createComponent() {
                        return this.vcRef.createComponent(HelloComp);
                    }
                    constructor() {
                        this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                        __runInitializers(this, _vcRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRef_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, HelloComp] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).not.toContain('Hello');
            const ref = fixture.componentInstance.createComponent();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('Hello');
            ref.destroy();
        });
        it('should view queries in dynamically created components', () => {
            let DynamicCompWithViewQueries = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt-with-view-queries',
                        template: `<div #foo></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _fooList_decorators;
                let _fooList_initializers = [];
                let _fooList_extraInitializers = [];
                var DynamicCompWithViewQueries = _classThis = class {
                    constructor() {
                        this.fooList = __runInitializers(this, _fooList_initializers, void 0);
                        __runInitializers(this, _fooList_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCompWithViewQueries");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _fooList_decorators = [(0, core_1.ViewChildren)('foo')];
                    __esDecorate(null, null, _fooList_decorators, { kind: "field", name: "fooList", static: false, private: false, access: { has: obj => "fooList" in obj, get: obj => obj.fooList, set: (obj, value) => { obj.fooList = value; } }, metadata: _metadata }, _fooList_initializers, _fooList_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCompWithViewQueries = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCompWithViewQueries = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(vcRf) {
                        this.vcRf = vcRf;
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
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const cmpRef = fixture.componentInstance.vcRf.createComponent(DynamicCompWithViewQueries);
            fixture.detectChanges();
            (0, matchers_1.expect)(cmpRef.instance.fooList.length).toBe(1);
            (0, matchers_1.expect)(cmpRef.instance.fooList.first).toBeInstanceOf(core_1.ElementRef);
        });
        describe('element namespaces', () => {
            function runTestWithSelectors(svgSelector, mathMLSelector) {
                it('should be set correctly for host elements of dynamically created components', () => {
                    let SvgComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: svgSelector,
                                template: '<svg><g></g></svg>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var SvgComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "SvgComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            SvgComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return SvgComp = _classThis;
                    })();
                    let MathMLComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: mathMLSelector,
                                template: '<math><matrix></matrix></math>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var MathMLComp = _classThis = class {
                        };
                        __setFunctionName(_classThis, "MathMLComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MathMLComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MathMLComp = _classThis;
                    })();
                    let TestComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `
              <ng-container #svg></ng-container>
              <ng-container #mathml></ng-container>
            `,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _svgVCRef_decorators;
                        let _svgVCRef_initializers = [];
                        let _svgVCRef_extraInitializers = [];
                        let _mathMLVCRef_decorators;
                        let _mathMLVCRef_initializers = [];
                        let _mathMLVCRef_extraInitializers = [];
                        var TestComp = _classThis = class {
                            constructor() {
                                this.svgVCRef = __runInitializers(this, _svgVCRef_initializers, void 0);
                                this.mathMLVCRef = (__runInitializers(this, _svgVCRef_extraInitializers), __runInitializers(this, _mathMLVCRef_initializers, void 0));
                                __runInitializers(this, _mathMLVCRef_extraInitializers);
                            }
                            createDynamicComponents() {
                                this.svgVCRef.createComponent(SvgComp);
                                this.mathMLVCRef.createComponent(MathMLComp);
                            }
                        };
                        __setFunctionName(_classThis, "TestComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _svgVCRef_decorators = [(0, core_1.ViewChild)('svg', { read: core_1.ViewContainerRef })];
                            _mathMLVCRef_decorators = [(0, core_1.ViewChild)('mathml', { read: core_1.ViewContainerRef })];
                            __esDecorate(null, null, _svgVCRef_decorators, { kind: "field", name: "svgVCRef", static: false, private: false, access: { has: obj => "svgVCRef" in obj, get: obj => obj.svgVCRef, set: (obj, value) => { obj.svgVCRef = value; } }, metadata: _metadata }, _svgVCRef_initializers, _svgVCRef_extraInitializers);
                            __esDecorate(null, null, _mathMLVCRef_decorators, { kind: "field", name: "mathMLVCRef", static: false, private: false, access: { has: obj => "mathMLVCRef" in obj, get: obj => obj.mathMLVCRef, set: (obj, value) => { obj.mathMLVCRef = value; } }, metadata: _metadata }, _mathMLVCRef_initializers, _mathMLVCRef_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            TestComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return TestComp = _classThis;
                    })();
                    function _document() {
                        // Tell Ivy about the global document
                        (0, core_1.ɵsetDocument)(document);
                        return document;
                    }
                    testing_1.TestBed.configureTestingModule({
                        declarations: [TestComp, SvgComp, MathMLComp],
                        providers: [{ provide: common_1.DOCUMENT, useFactory: _document, deps: [] }],
                    });
                    const fixture = testing_1.TestBed.createComponent(TestComp);
                    fixture.detectChanges();
                    fixture.componentInstance.createDynamicComponents();
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.querySelector('svg').namespaceURI).toEqual('http://www.w3.org/2000/svg');
                    (0, matchers_1.expect)(fixture.nativeElement.querySelector('math').namespaceURI).toEqual('http://www.w3.org/1998/Math/MathML');
                });
            }
            runTestWithSelectors('svg[some-attr]', 'math[some-attr]');
            // Also test with selector that has element name in uppercase
            runTestWithSelectors('SVG[some-attr]', 'MATH[some-attr]');
        });
        it('should apply attributes and classes to host element based on selector', () => {
            let HelloComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: '[attr-a=a].class-a:not(.class-b):not([attr-b=b]).class-c[attr-c]',
                        template: 'Hello',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HelloComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HelloComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HelloComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HelloComp = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div id="factory" attr-a="a-original" class="class-original"></div>
          <div id="vcr">
            <ng-container #container></ng-container>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRef_decorators;
                let _vcRef_initializers = [];
                let _vcRef_extraInitializers = [];
                var TestComp = _classThis = class {
                    constructor(injector, elementRef) {
                        this.injector = injector;
                        this.elementRef = elementRef;
                        this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                        __runInitializers(this, _vcRef_extraInitializers);
                        this.injector = injector;
                        this.elementRef = elementRef;
                    }
                    createComponentViaVCRef() {
                        return this.vcRef.createComponent(HelloComp);
                    }
                    createComponentViaFactory() {
                        return (0, core_1.createComponent)(HelloComp, {
                            environmentInjector: this.injector,
                            hostElement: this.elementRef.nativeElement.querySelector('#factory'),
                        });
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRef_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, HelloComp] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            const firstRef = fixture.componentInstance.createComponentViaVCRef();
            const secondRef = fixture.componentInstance.createComponentViaFactory();
            fixture.detectChanges();
            // Verify host element for a component created via  `vcRef.createComponent` method
            const vcrHostElement = fixture.nativeElement.querySelector('#vcr > div');
            (0, matchers_1.expect)(vcrHostElement.classList.contains('class-a')).toBe(true);
            // `class-b` should not be present, since it's wrapped in `:not()` selector
            (0, matchers_1.expect)(vcrHostElement.classList.contains('class-b')).toBe(false);
            (0, matchers_1.expect)(vcrHostElement.classList.contains('class-c')).toBe(true);
            (0, matchers_1.expect)(vcrHostElement.getAttribute('attr-a')).toBe('a');
            // `attr-b` should not be present, since it's wrapped in `:not()` selector
            (0, matchers_1.expect)(vcrHostElement.getAttribute('attr-b')).toBe(null);
            (0, matchers_1.expect)(vcrHostElement.getAttribute('attr-c')).toBe('');
            // Verify host element for a component created using `factory.createComponent` method when
            // also passing element selector as an argument
            const factoryHostElement = fixture.nativeElement.querySelector('#factory');
            //  Verify original attrs and classes are still present
            (0, matchers_1.expect)(factoryHostElement.classList.contains('class-original')).toBe(true);
            (0, matchers_1.expect)(factoryHostElement.getAttribute('attr-a')).toBe('a-original');
            // Make sure selector-based attrs and classes were not added to the host element
            (0, matchers_1.expect)(factoryHostElement.classList.contains('class-a')).toBe(false);
            (0, matchers_1.expect)(factoryHostElement.getAttribute('attr-c')).toBe(null);
            firstRef.destroy();
            secondRef.destroy();
        });
    });
    describe('insert', () => {
        it('should not blow up on destroy when inserting a view that is already attached', () => {
            const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
            fixture.detectChanges();
            const template0 = fixture.componentInstance.vcrComp.templates.first;
            const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
            const ref0 = viewContainerRef.createEmbeddedView(template0);
            // Insert the view again at the same index
            viewContainerRef.insert(ref0, 0);
            (0, matchers_1.expect)(() => {
                fixture.destroy();
            }).not.toThrow();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('0');
        });
        it('should move views if they are already attached', () => {
            const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
            fixture.detectChanges();
            const templates = fixture.componentInstance.vcrComp.templates.toArray();
            const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
            const ref0 = viewContainerRef.createEmbeddedView(templates[0]);
            const ref1 = viewContainerRef.createEmbeddedView(templates[1]);
            const ref2 = viewContainerRef.createEmbeddedView(templates[2]);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('012');
            // Insert the view again at a different index
            viewContainerRef.insert(ref0, 2);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('120');
        });
        it('should do nothing when a view is re-inserted / moved at the same index', () => {
            const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
            fixture.detectChanges();
            const templates = fixture.componentInstance.vcrComp.templates.toArray();
            const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
            const ref0 = viewContainerRef.createEmbeddedView(templates[0]);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('0');
            // insert again at the same place but without specifying any index
            viewContainerRef.insert(ref0);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('0');
        });
        it('should insert a view already inserted into another container', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: `
          <ng-template #t>content</ng-template>
          before|<ng-template #c1></ng-template>|middle|<ng-template #c2></ng-template>|after
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _t_decorators;
                let _t_initializers = [];
                let _t_extraInitializers = [];
                let _c1_decorators;
                let _c1_initializers = [];
                let _c1_extraInitializers = [];
                let _c2_decorators;
                let _c2_initializers = [];
                let _c2_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.t = __runInitializers(this, _t_initializers, void 0);
                        this.c1 = (__runInitializers(this, _t_extraInitializers), __runInitializers(this, _c1_initializers, void 0));
                        this.c2 = (__runInitializers(this, _c1_extraInitializers), __runInitializers(this, _c2_initializers, void 0));
                        __runInitializers(this, _c2_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _t_decorators = [(0, core_1.ViewChild)('t', { static: true })];
                    _c1_decorators = [(0, core_1.ViewChild)('c1', { static: true, read: core_1.ViewContainerRef })];
                    _c2_decorators = [(0, core_1.ViewChild)('c2', { static: true, read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _t_decorators, { kind: "field", name: "t", static: false, private: false, access: { has: obj => "t" in obj, get: obj => obj.t, set: (obj, value) => { obj.t = value; } }, metadata: _metadata }, _t_initializers, _t_extraInitializers);
                    __esDecorate(null, null, _c1_decorators, { kind: "field", name: "c1", static: false, private: false, access: { has: obj => "c1" in obj, get: obj => obj.c1, set: (obj, value) => { obj.c1 = value; } }, metadata: _metadata }, _c1_initializers, _c1_extraInitializers);
                    __esDecorate(null, null, _c2_decorators, { kind: "field", name: "c2", static: false, private: false, access: { has: obj => "c2" in obj, get: obj => obj.c2, set: (obj, value) => { obj.c2 = value; } }, metadata: _metadata }, _c2_initializers, _c2_extraInitializers);
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
            const cmpt = fixture.componentInstance;
            const native = fixture.nativeElement;
            (0, matchers_1.expect)(native.textContent.trim()).toEqual('before||middle||after');
            // create and insert an embedded view into the c1 container
            const viewRef = cmpt.c1.createEmbeddedView(cmpt.t, {});
            (0, matchers_1.expect)(native.textContent.trim()).toEqual('before|content|middle||after');
            (0, matchers_1.expect)(cmpt.c1.indexOf(viewRef)).toBe(0);
            (0, matchers_1.expect)(cmpt.c2.indexOf(viewRef)).toBe(-1);
            // move the existing embedded view into the c2 container
            cmpt.c2.insert(viewRef);
            (0, matchers_1.expect)(native.textContent.trim()).toEqual('before||middle|content|after');
            (0, matchers_1.expect)(cmpt.c1.indexOf(viewRef)).toBe(-1);
            (0, matchers_1.expect)(cmpt.c2.indexOf(viewRef)).toBe(0);
        });
        it('should add embedded views at the right position in the DOM tree (ng-template next to other ng-template)', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `before|<ng-template #a>A</ng-template><ng-template #b>B</ng-template>|after`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _ta_decorators;
                let _ta_initializers = [];
                let _ta_extraInitializers = [];
                let _tb_decorators;
                let _tb_initializers = [];
                let _tb_extraInitializers = [];
                let _ca_decorators;
                let _ca_initializers = [];
                let _ca_extraInitializers = [];
                let _cb_decorators;
                let _cb_initializers = [];
                let _cb_extraInitializers = [];
                var TestCmp = _classThis = class {
                    constructor() {
                        this.ta = __runInitializers(this, _ta_initializers, void 0);
                        this.tb = (__runInitializers(this, _ta_extraInitializers), __runInitializers(this, _tb_initializers, void 0));
                        this.ca = (__runInitializers(this, _tb_extraInitializers), __runInitializers(this, _ca_initializers, void 0));
                        this.cb = (__runInitializers(this, _ca_extraInitializers), __runInitializers(this, _cb_initializers, void 0));
                        __runInitializers(this, _cb_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _ta_decorators = [(0, core_1.ViewChild)('a', { static: true })];
                    _tb_decorators = [(0, core_1.ViewChild)('b', { static: true })];
                    _ca_decorators = [(0, core_1.ViewChild)('a', { static: true, read: core_1.ViewContainerRef })];
                    _cb_decorators = [(0, core_1.ViewChild)('b', { static: true, read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _ta_decorators, { kind: "field", name: "ta", static: false, private: false, access: { has: obj => "ta" in obj, get: obj => obj.ta, set: (obj, value) => { obj.ta = value; } }, metadata: _metadata }, _ta_initializers, _ta_extraInitializers);
                    __esDecorate(null, null, _tb_decorators, { kind: "field", name: "tb", static: false, private: false, access: { has: obj => "tb" in obj, get: obj => obj.tb, set: (obj, value) => { obj.tb = value; } }, metadata: _metadata }, _tb_initializers, _tb_extraInitializers);
                    __esDecorate(null, null, _ca_decorators, { kind: "field", name: "ca", static: false, private: false, access: { has: obj => "ca" in obj, get: obj => obj.ca, set: (obj, value) => { obj.ca = value; } }, metadata: _metadata }, _ca_initializers, _ca_extraInitializers);
                    __esDecorate(null, null, _cb_decorators, { kind: "field", name: "cb", static: false, private: false, access: { has: obj => "cb" in obj, get: obj => obj.cb, set: (obj, value) => { obj.cb = value; } }, metadata: _metadata }, _cb_initializers, _cb_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const testCmpInstance = fixture.componentInstance;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('before||after');
            testCmpInstance.cb.createEmbeddedView(testCmpInstance.tb);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('before|B|after');
            testCmpInstance.ca.createEmbeddedView(testCmpInstance.ta);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('before|AB|after');
        });
    });
    describe('move', () => {
        it('should insert detached views in move()', () => {
            const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
            fixture.detectChanges();
            const templates = fixture.componentInstance.vcrComp.templates.toArray();
            const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
            const ref0 = viewContainerRef.createEmbeddedView(templates[0]);
            const ref1 = viewContainerRef.createEmbeddedView(templates[1]);
            const ref2 = viewContainerRef.createEmbeddedView(templates[2]);
            viewContainerRef.detach(0);
            viewContainerRef.move(ref0, 0);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('012');
        });
    });
    it('should not throw when calling remove() on an empty container', () => {
        const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
        fixture.detectChanges();
        const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
        (0, matchers_1.expect)(viewContainerRef.length).toBe(0);
        (0, matchers_1.expect)(() => viewContainerRef.remove()).not.toThrow();
    });
    it('should not throw when calling detach() on an empty container', () => {
        const fixture = testing_1.TestBed.createComponent(ViewContainerRefApp);
        fixture.detectChanges();
        const viewContainerRef = fixture.componentInstance.vcrComp.vcr;
        (0, matchers_1.expect)(viewContainerRef.length).toBe(0);
        (0, matchers_1.expect)(() => viewContainerRef.detach()).not.toThrow();
    });
    describe('destroy should clean the DOM in all cases:', () => {
        function executeTest(template) {
            testing_1.TestBed.overrideTemplate(DestroyCasesComp, template).configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
            });
            const fixture = testing_1.TestBed.createComponent(DestroyCasesComp);
            fixture.detectChanges();
            const initial = fixture.nativeElement.innerHTML;
            const structDirs = fixture.componentInstance.structDirs.toArray();
            structDirs.forEach((structDir) => structDir.create());
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Foo');
            structDirs.forEach((structDir) => structDir.destroy());
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(initial);
        }
        it('when nested ng-container', () => {
            executeTest(`
        <ng-template structDir>
          <before></before>
          <ng-container>
            <before></before>
            <ng-container>
              <inside>Foo</inside>
            </ng-container>
            <after></after>
          </ng-container>
          <after></after>
        </ng-template>`);
        });
        it('when ViewContainerRef is on a ng-container', () => {
            executeTest(`
        <ng-template #foo>
          <span>Foo</span>
        </ng-template>

        <ng-template structDir>
          <before></before>
          <ng-container [ngTemplateOutlet]="foo">
            <inside></inside>
          </ng-container>
          <after></after>
        </ng-template>`);
        });
        it('when ViewContainerRef is on an element', () => {
            executeTest(`
      <ng-template #foo>
        <span>Foo</span>
      </ng-template>

      <ng-template structDir>
        <before></before>
        <div [ngTemplateOutlet]="foo">
          <inside></inside>
        </div>
        <after></after>
      </ng-template>`);
        });
        it('when ViewContainerRef is on a ng-template', () => {
            executeTest(`
      <ng-template #foo>
        <span>Foo</span>
      </ng-template>

      <ng-template structDir>
        <before></before>
        <ng-template [ngTemplateOutlet]="foo"></ng-template>
        <after></after>
      </ng-template>`);
        });
        it('when ViewContainerRef is on an element inside a ng-container', () => {
            executeTest(`
      <ng-template #foo>
        <span>Foo</span>
      </ng-template>

      <ng-template structDir>
        <before></before>
        <ng-container>
          <before></before>
          <div [ngTemplateOutlet]="foo">
            <inside></inside>
          </div>
          <after></after>
        </ng-container>
        <after></after>
      </ng-template>`);
        });
        it('when ViewContainerRef is on an element inside a ng-container with i18n', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Bar')]: 'o',
                [(0, compiler_1.computeMsgId)('{$START_TAG_BEFORE}{$CLOSE_TAG_BEFORE}{$START_TAG_DIV}{$START_TAG_INSIDE}{$CLOSE_TAG_INSIDE}{$CLOSE_TAG_DIV}{$START_TAG_AFTER}{$CLOSE_TAG_AFTER}')]: 'F{$START_TAG_DIV}{$CLOSE_TAG_DIV}o',
            });
            executeTest(`
      <ng-template #foo>
        <span i18n>Bar</span>
      </ng-template>

      <ng-template structDir>
        <before></before>
        <ng-container i18n>
          <before></before>
          <div [ngTemplateOutlet]="foo">
            <inside></inside>
          </div>
          <after></after>
        </ng-container>
        <after></after>
      </ng-template>`);
        });
        it('when ViewContainerRef is on an element, and i18n is on the parent ViewContainerRef', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_BEFORE}{$CLOSE_TAG_BEFORE}{$START_TAG_DIV}{$START_TAG_IN}{$CLOSE_TAG_IN}{$CLOSE_TAG_DIV}{$START_TAG_AFTER}{$CLOSE_TAG_AFTER}')]: '{$START_TAG_DIV}{$CLOSE_TAG_DIV}{$START_TAG_BEFORE}oo{$CLOSE_TAG_BEFORE}',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, other {|{INTERPOLATION}|}}')]: '{VAR_SELECT, select, other {|{INTERPOLATION}|}}',
            });
            executeTest(`
      <ng-template #foo>
        <span>F</span>
      </ng-template>

      <ng-template structDir i18n>
        <before></before>
        <div [ngTemplateOutlet]="foo">
          <in></in>
        </div>
        <after></after>
      </ng-template>`);
        });
    });
    describe('length', () => {
        it('should return the number of embedded views', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [EmbeddedViewInsertionComp, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.length).toEqual(0);
            vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.length).toEqual(3);
            vcRefDir.vcref.detach(1);
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.length).toEqual(2);
            vcRefDir.vcref.clear();
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.length).toEqual(0);
        });
    });
    describe('get and indexOf', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [EmbeddedViewInsertionComp, VCRefDirective] });
        });
        it('should retrieve a ViewRef from its index, and vice versa', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            fixture.detectChanges();
            let viewRef = vcRefDir.vcref.get(0);
            (0, matchers_1.expect)(vcRefDir.vcref.indexOf(viewRef)).toEqual(0);
            viewRef = vcRefDir.vcref.get(1);
            (0, matchers_1.expect)(vcRefDir.vcref.indexOf(viewRef)).toEqual(1);
            viewRef = vcRefDir.vcref.get(2);
            (0, matchers_1.expect)(vcRefDir.vcref.indexOf(viewRef)).toEqual(2);
        });
        it('should handle out of bounds cases', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.createView('A');
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.get(-1)).toBeNull();
            (0, matchers_1.expect)(vcRefDir.vcref.get(42)).toBeNull();
            const viewRef = vcRefDir.vcref.get(0);
            vcRefDir.vcref.remove(0);
            (0, matchers_1.expect)(vcRefDir.vcref.indexOf(viewRef)).toEqual(-1);
        });
        it('should return -1 as indexOf when no views were inserted', () => {
            const fixture = testing_1.TestBed.createComponent(ViewContainerRefComp);
            fixture.detectChanges();
            const cmpt = fixture.componentInstance;
            const viewRef = cmpt.templates.first.createEmbeddedView({});
            // ViewContainerRef is empty and we've got a reference to a view that was not attached
            // anywhere
            (0, matchers_1.expect)(cmpt.vcr.indexOf(viewRef)).toBe(-1);
            cmpt.vcr.insert(viewRef);
            (0, matchers_1.expect)(cmpt.vcr.indexOf(viewRef)).toBe(0);
            cmpt.vcr.remove(0);
            (0, matchers_1.expect)(cmpt.vcr.indexOf(viewRef)).toBe(-1);
        });
    });
    describe('move', () => {
        it('should move embedded views and associated DOM nodes without recreating them', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [EmbeddedViewInsertionComp, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABC');
            // The DOM is manually modified here to ensure that the text node is actually moved
            fixture.nativeElement.childNodes[2].nodeValue = '**A**';
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>**A**BC');
            let viewRef = vcRefDir.vcref.get(0);
            vcRefDir.vcref.move(viewRef, 2);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>BC**A**');
            vcRefDir.vcref.move(viewRef, 0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>**A**BC');
            vcRefDir.vcref.move(viewRef, 1);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>B**A**C');
            (0, matchers_1.expect)(() => vcRefDir.vcref.move(viewRef, -1)).toThrow();
            (0, matchers_1.expect)(() => vcRefDir.vcref.move(viewRef, 42)).toThrow();
        });
    });
    describe('getters for the anchor node', () => {
        it('should work on templates', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template vcref let-name>{{name}}</ng-template>
          <footer></footer>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRefDir_decorators;
                let _vcRefDir_initializers = [];
                let _vcRefDir_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.vcRefDir = __runInitializers(this, _vcRefDir_initializers, void 0);
                        __runInitializers(this, _vcRefDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRefDir_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRefDir_decorators, { kind: "field", name: "vcRefDir", static: false, private: false, access: { has: obj => "vcRefDir" in obj, get: obj => obj.vcRefDir, set: (obj, value) => { obj.vcRefDir = value; } }, metadata: _metadata }, _vcRefDir_initializers, _vcRefDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [VCRefDirective, TestComponent] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const { vcRefDir } = fixture.componentInstance;
            fixture.detectChanges();
            (0, matchers_1.expect)(vcRefDir.vcref.element.nativeElement.nodeType).toBe(Node.COMMENT_NODE);
            // In Ivy, the comment for the view container ref has text that implies
            // that the comment is a placeholder for a container.
            (0, matchers_1.expect)(vcRefDir.vcref.element.nativeElement.textContent).toEqual('container');
            (0, matchers_1.expect)(vcRefDir.vcref.injector.get(core_1.ElementRef).nativeElement.textContent).toEqual('container');
            (0, matchers_1.expect)(getElementHtml(vcRefDir.vcref.parentInjector.get(core_1.ElementRef).nativeElement)).toBe('<footer></footer>');
        });
        it('should work on elements', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <header vcref></header>
          <footer></footer>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRefDir_decorators;
                let _vcRefDir_initializers = [];
                let _vcRefDir_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.vcRefDir = __runInitializers(this, _vcRefDir_initializers, void 0);
                        __runInitializers(this, _vcRefDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRefDir_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRefDir_decorators, { kind: "field", name: "vcRefDir", static: false, private: false, access: { has: obj => "vcRefDir" in obj, get: obj => obj.vcRefDir, set: (obj, value) => { obj.vcRefDir = value; } }, metadata: _metadata }, _vcRefDir_initializers, _vcRefDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [VCRefDirective, TestComponent] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const vcref = fixture.componentInstance.vcRefDir.vcref;
            (0, matchers_1.expect)(vcref.element.nativeElement.tagName.toLowerCase()).toEqual('header');
            (0, matchers_1.expect)(vcref.injector.get(core_1.ElementRef).nativeElement.tagName.toLowerCase()).toEqual('header');
        });
        it('should work on components', () => {
            let HeaderCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'header-cmp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HeaderCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "HeaderCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HeaderCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HeaderCmp = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <header-cmp vcref></header-cmp>
          <footer></footer>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRefDir_decorators;
                let _vcRefDir_initializers = [];
                let _vcRefDir_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.vcRefDir = __runInitializers(this, _vcRefDir_initializers, void 0);
                        __runInitializers(this, _vcRefDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRefDir_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRefDir_decorators, { kind: "field", name: "vcRefDir", static: false, private: false, access: { has: obj => "vcRefDir" in obj, get: obj => obj.vcRefDir, set: (obj, value) => { obj.vcRefDir = value; } }, metadata: _metadata }, _vcRefDir_initializers, _vcRefDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [HeaderCmp, VCRefDirective, TestComponent] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const vcref = fixture.componentInstance.vcRefDir.vcref;
            (0, matchers_1.expect)(vcref.element.nativeElement.tagName.toLowerCase()).toEqual('header-cmp');
            (0, matchers_1.expect)(vcref.injector.get(core_1.ElementRef).nativeElement.tagName.toLowerCase()).toEqual('header-cmp');
        });
    });
    describe('detach', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [EmbeddedViewInsertionComp, VCRefDirective] });
        });
        it('should detach the right embedded view when an index is specified', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            const viewA = vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            const viewD = vcRefDir.createView('D');
            vcRefDir.createView('E');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCDE');
            vcRefDir.vcref.detach(3);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCE');
            (0, matchers_1.expect)(viewD.destroyed).toBeFalsy();
            vcRefDir.vcref.detach(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>BCE');
            (0, matchers_1.expect)(viewA.destroyed).toBeFalsy();
            (0, matchers_1.expect)(() => vcRefDir.vcref.detach(-1)).toThrow();
            (0, matchers_1.expect)(() => vcRefDir.vcref.detach(42)).toThrow();
        });
        it('should detach the last embedded view when no index is specified', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            vcRefDir.createView('D');
            const viewE = vcRefDir.createView('E');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCDE');
            vcRefDir.vcref.detach();
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCD');
            (0, matchers_1.expect)(viewE.destroyed).toBeFalsy();
        });
        it('should not throw when destroying a detached component view', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmp',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(vcRef) {
                        this.vcRef = vcRef;
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
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            const vcRef = fixture.componentInstance.vcRef;
            const cmpRef = vcRef.createComponent(DynamicCmp);
            fixture.detectChanges();
            vcRef.detach(vcRef.indexOf(cmpRef.hostView));
            (0, matchers_1.expect)(() => {
                cmpRef.destroy();
            }).not.toThrow();
        });
    });
    describe('remove', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [EmbeddedViewInsertionComp, VCRefDirective] });
            const _origRendererFactory = testing_1.TestBed.inject(core_1.RendererFactory2);
            const _origCreateRenderer = _origRendererFactory.createRenderer;
            _origRendererFactory.createRenderer = function (element, type) {
                const renderer = _origCreateRenderer.call(_origRendererFactory, element, type);
                renderer.destroyNode = () => { };
                return renderer;
            };
        });
        it('should remove the right embedded view when an index is specified', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            const viewA = vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            const viewD = vcRefDir.createView('D');
            vcRefDir.createView('E');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCDE');
            vcRefDir.vcref.remove(3);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCE');
            (0, matchers_1.expect)(viewD.destroyed).toBeTruthy();
            vcRefDir.vcref.remove(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>BCE');
            (0, matchers_1.expect)(viewA.destroyed).toBeTruthy();
            (0, matchers_1.expect)(() => vcRefDir.vcref.remove(-1)).toThrow();
            (0, matchers_1.expect)(() => vcRefDir.vcref.remove(42)).toThrow();
        });
        it('should remove the last embedded view when no index is specified', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.createView('A');
            vcRefDir.createView('B');
            vcRefDir.createView('C');
            vcRefDir.createView('D');
            const viewE = vcRefDir.createView('E');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCDE');
            vcRefDir.vcref.remove();
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>ABCD');
            (0, matchers_1.expect)(viewE.destroyed).toBeTruthy();
        });
        it('should throw when trying to insert a removed or destroyed view', () => {
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            const viewA = vcRefDir.createView('A');
            const viewB = vcRefDir.createView('B');
            fixture.detectChanges();
            vcRefDir.vcref.remove();
            fixture.detectChanges();
            (0, matchers_1.expect)(() => vcRefDir.vcref.insert(viewB)).toThrow();
            viewA.destroy();
            fixture.detectChanges();
            (0, matchers_1.expect)(() => vcRefDir.vcref.insert(viewA)).toThrow();
        });
    });
    describe('dependant views', () => {
        it('should not throw when view removes another view upon removal', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div *ngIf="visible" [template]="parent">I host a template</div>
          <ng-template #parent>
              <div [template]="child">I host a child template</div>
          </ng-template>
          <ng-template #child>
              I am child template
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor(vcr) {
                        this.vcr = vcr;
                        this.visible = true;
                    }
                    add(template) {
                        return this.vcr.createEmbeddedView(template);
                    }
                    remove(viewRef) {
                        this.vcr.remove(this.vcr.indexOf(viewRef));
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            let TemplateDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[template]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var TemplateDirective = _classThis = class {
                    constructor(host) {
                        this.host = host;
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.ref = __runInitializers(this, _template_extraInitializers);
                    }
                    ngOnInit() {
                        this.ref = this.host.add(this.template);
                        this.ref.detectChanges();
                    }
                    ngOnDestroy() {
                        this.host.remove(this.ref);
                    }
                };
                __setFunctionName(_classThis, "TemplateDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TemplateDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TemplateDirective = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [common_1.CommonModule],
                declarations: [AppComponent, TemplateDirective],
            });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            fixture.componentRef.instance.visible = false;
            fixture.detectChanges();
        });
    });
    describe('createEmbeddedView (incl. insert)', () => {
        it('should work on elements', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
        <ng-template #tplRef let-name>{{name}}</ng-template>
        <header vcref [tplRef]="tplRef"></header>
        <footer></footer>
      `,
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
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const vcRef = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header vcref=""></header><footer></footer>');
            vcRef.createView('A');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header vcref=""></header>A<footer></footer>');
            vcRef.createView('B');
            vcRef.createView('C');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header vcref=""></header>ABC<footer></footer>');
            vcRef.createView('Y', 0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header vcref=""></header>YABC<footer></footer>');
            (0, matchers_1.expect)(() => vcRef.createView('Z', -1)).toThrow();
            (0, matchers_1.expect)(() => vcRef.createView('Z', 5)).toThrow();
        });
        it('should work on components', () => {
            let HeaderComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'header-cmp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HeaderComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "HeaderComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HeaderComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HeaderComponent = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #tplRef let-name>{{name}}</ng-template>
          <header-cmp vcref [tplRef]="tplRef"></header-cmp>
          <footer></footer>
          `,
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComponent, HeaderComponent, VCRefDirective],
            });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const vcRef = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header-cmp vcref=""></header-cmp><footer></footer>');
            vcRef.createView('A');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header-cmp vcref=""></header-cmp>A<footer></footer>');
            vcRef.createView('B');
            vcRef.createView('C');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header-cmp vcref=""></header-cmp>ABC<footer></footer>');
            vcRef.createView('Y', 0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<header-cmp vcref=""></header-cmp>YABC<footer></footer>');
            (0, matchers_1.expect)(() => vcRef.createView('Z', -1)).toThrow();
            (0, matchers_1.expect)(() => vcRef.createView('Z', 5)).toThrow();
        });
        it('should work with multiple instances of view container refs', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #tplRef let-name>{{name}}</ng-template>
          <div vcref [tplRef]="tplRef"></div>
          <div vcref [tplRef]="tplRef"></div>
        `,
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
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const vcRefs = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(VCRefDirective))
                .map((debugEl) => debugEl.injector.get(VCRefDirective));
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<div vcref=""></div><div vcref=""></div>');
            vcRefs[0].createView('A');
            vcRefs[1].createView('B');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<div vcref=""></div>A<div vcref=""></div>B');
        });
        it('should work on templates', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template vcref #tplRef [tplRef]="tplRef" let-name>{{name}}</ng-template>
          <footer></footer>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRef_decorators;
                let _vcRef_initializers = [];
                let _vcRef_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                        __runInitializers(this, _vcRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRef_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComponent, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const { vcRef } = fixture.componentInstance;
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<footer></footer>');
            vcRef.createView('A');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('A<footer></footer>');
            vcRef.createView('B');
            vcRef.createView('C');
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('ABC<footer></footer>');
            vcRef.createView('Y', 0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('YABC<footer></footer>');
            (0, matchers_1.expect)(() => vcRef.createView('Z', -1)).toThrow();
            (0, matchers_1.expect)(() => vcRef.createView('Z', 5)).toThrow();
        });
        it('should apply directives and pipes of the host view to the TemplateRef', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `{{name}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _name_decorators;
                let _name_initializers = [];
                let _name_extraInitializers = [];
                var Child = _classThis = class {
                    constructor() {
                        this.name = __runInitializers(this, _name_initializers, void 0);
                        __runInitializers(this, _name_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _name_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let StarPipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'starPipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var StarPipe = _classThis = class {
                    transform(value) {
                        return `**${value}**`;
                    }
                };
                __setFunctionName(_classThis, "StarPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    StarPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return StarPipe = _classThis;
            })();
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <ng-template #foo>
              <child [name]="'C' | starPipe"></child>
            </ng-template>
            <child vcref [tplRef]="foo" [name]="'A' | starPipe"></child>
            <child [name]="'B' | starPipe"></child>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Child, StarPipe, SomeComponent, VCRefDirective],
            });
            const fixture = testing_1.TestBed.createComponent(SomeComponent);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
            vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child vcref="">**A**</child><child>**C**</child><child>**C**</child><child>**B**</child>');
        });
    });
    describe('createComponent', () => {
        let templateExecutionCounter = 0;
        beforeEach(() => (templateExecutionCounter = 0));
        it('should work without Injector and NgModuleRef', () => {
            let EmbeddedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'embedded-cmp',
                        template: `foo`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var EmbeddedComponent = _classThis = class {
                    ngOnInit() {
                        templateExecutionCounter++;
                    }
                    ngDoCheck() {
                        templateExecutionCounter++;
                    }
                };
                __setFunctionName(_classThis, "EmbeddedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EmbeddedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EmbeddedComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [EmbeddedViewInsertionComp, VCRefDirective, EmbeddedComponent],
            });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(0);
            const componentRef = vcRefDir.vcref.createComponent(EmbeddedComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp>foo</embedded-cmp>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(2);
            vcRefDir.vcref.detach(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(2);
            vcRefDir.vcref.insert(componentRef.hostView);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp>foo</embedded-cmp>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(3);
        });
        it('should work with NgModuleRef and Injector', () => {
            let EmbeddedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'embedded-cmp',
                        template: `foo`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var EmbeddedComponent = _classThis = class {
                    constructor(s) {
                        this.s = s;
                    }
                    ngOnInit() {
                        templateExecutionCounter++;
                    }
                    ngDoCheck() {
                        templateExecutionCounter++;
                    }
                };
                __setFunctionName(_classThis, "EmbeddedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EmbeddedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EmbeddedComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [EmbeddedViewInsertionComp, VCRefDirective, EmbeddedComponent],
            });
            let MyAppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [
                            { provide: String, useValue: 'root_module' },
                            // We need to provide the following tokens because otherwise view engine
                            // will throw when creating a component factory in debug mode.
                            { provide: core_1.Sanitizer, useValue: testing_1.TestBed.inject(platform_browser_1.DomSanitizer) },
                            { provide: core_1.ErrorHandler, useValue: testing_1.TestBed.inject(core_1.ErrorHandler) },
                            { provide: core_1.RendererFactory2, useValue: testing_1.TestBed.inject(core_1.RendererFactory2) },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyAppModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyAppModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyAppModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyAppModule = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ providers: [{ provide: String, useValue: 'some_module' }] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeModule = _classThis;
            })();
            // Compile test modules in order to be able to pass the NgModuleRef or the
            // module injector to the ViewContainerRef create component method.
            const compiler = testing_1.TestBed.inject(core_1.Compiler);
            const appModuleFactory = compiler.compileModuleSync(MyAppModule);
            const someModuleFactory = compiler.compileModuleSync(SomeModule);
            const appModuleRef = appModuleFactory.create(null);
            const someModuleRef = someModuleFactory.create(null);
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(0);
            let componentRef = vcRefDir.vcref.createComponent(EmbeddedComponent, {
                index: 0,
                injector: someModuleRef.injector,
            });
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp>foo</embedded-cmp>');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(2);
            (0, matchers_1.expect)(componentRef.instance.s).toEqual('some_module');
            componentRef = vcRefDir.vcref.createComponent(EmbeddedComponent, {
                index: 0,
                ngModuleRef: appModuleRef,
            });
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp>foo</embedded-cmp><embedded-cmp>foo</embedded-cmp>');
            (0, matchers_1.expect)(componentRef.instance.s).toEqual('root_module');
            (0, matchers_1.expect)(templateExecutionCounter).toEqual(5);
        });
        it('should support projectable nodes', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [EmbeddedViewInsertionComp, VCRefDirective, EmbeddedComponentWithNgContent],
            });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            const myNode = document.createElement('div');
            const myText = document.createTextNode('bar');
            const myText2 = document.createTextNode('baz');
            myNode.appendChild(myText);
            myNode.appendChild(myText2);
            vcRefDir.vcref.createComponent(EmbeddedComponentWithNgContent, {
                index: 0,
                projectableNodes: [[myNode]],
            });
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp-with-ngcontent><div>barbaz</div><hr></embedded-cmp-with-ngcontent>');
        });
        it('should support reprojection of projectable nodes', () => {
            let Reprojector = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'reprojector',
                        template: `<embedded-cmp-with-ngcontent><ng-content></ng-content></embedded-cmp-with-ngcontent>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Reprojector = _classThis = class {
                };
                __setFunctionName(_classThis, "Reprojector");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Reprojector = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Reprojector = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    EmbeddedViewInsertionComp,
                    VCRefDirective,
                    Reprojector,
                    EmbeddedComponentWithNgContent,
                ],
            });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            const myNode = document.createElement('div');
            const myText = document.createTextNode('bar');
            const myText2 = document.createTextNode('baz');
            myNode.appendChild(myText);
            myNode.appendChild(myText2);
            vcRefDir.vcref.createComponent(Reprojector, { index: 0, projectableNodes: [[myNode]] });
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><reprojector><embedded-cmp-with-ngcontent><hr><div>barbaz</div></embedded-cmp-with-ngcontent></reprojector>');
        });
        it('should support many projectable nodes with many slots', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [EmbeddedViewInsertionComp, VCRefDirective, EmbeddedComponentWithNgContent],
            });
            const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
            vcRefDir.vcref.createComponent(EmbeddedComponentWithNgContent, {
                index: 0,
                projectableNodes: [
                    [document.createTextNode('1'), document.createTextNode('2')],
                    [document.createTextNode('3'), document.createTextNode('4')],
                ],
            });
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><embedded-cmp-with-ngcontent>12<hr>34</embedded-cmp-with-ngcontent>');
        });
        it('should not throw when calling destroy() multiple times for a ComponentRef', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
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
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            fixture.componentRef.destroy();
            (0, matchers_1.expect)(() => fixture.componentRef.destroy()).not.toThrow();
        });
        it('should create the root node in the correct namespace when previous node is SVG', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div>Some random content</div>
          <!-- Note that it's important for the test that the <svg> element is last. -->
          <svg></svg>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor(viewContainerRef) {
                        this.viewContainerRef = viewContainerRef;
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
            let DynamicComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-comp',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "DynamicComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [DynamicComponent] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            // Note: it's important that we **don't** call `fixture.detectChanges` between here and
            // the component being created, because running change detection will reset Ivy's
            // namespace state which will make the test pass.
            const componentRef = fixture.componentInstance.viewContainerRef.createComponent(DynamicComponent);
            const element = componentRef.location.nativeElement;
            (0, matchers_1.expect)((element.namespaceURI || '').toLowerCase()).not.toContain('svg');
            componentRef.destroy();
        });
        it('should be compatible with componentRef generated via TestBed.createComponent in component factory', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `Child Component`,
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
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<ng-template #ref></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainerRef_decorators;
                let _viewContainerRef_initializers = [];
                let _viewContainerRef_extraInitializers = [];
                var Comp = _classThis = class {
                    ngOnInit() {
                        const makeComponentFactory = (componentType) => ({
                            create: () => testing_1.TestBed.createComponent(componentType).componentRef,
                        });
                        this.viewContainerRef.createComponent(makeComponentFactory(Child));
                    }
                    constructor() {
                        this.viewContainerRef = __runInitializers(this, _viewContainerRef_initializers, void 0);
                        __runInitializers(this, _viewContainerRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainerRef_decorators = [(0, core_1.ViewChild)('ref', { read: core_1.ViewContainerRef, static: true })];
                    __esDecorate(null, null, _viewContainerRef_decorators, { kind: "field", name: "viewContainerRef", static: false, private: false, access: { has: obj => "viewContainerRef" in obj, get: obj => obj.viewContainerRef, set: (obj, value) => { obj.viewContainerRef = value; } }, metadata: _metadata }, _viewContainerRef_initializers, _viewContainerRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Comp, Child] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('Child Component');
        });
        it('should return ComponentRef with ChangeDetectorRef attached to root view', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmp',
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.doCheckCount = 0;
                    }
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(viewContainerRef) {
                        this.viewContainerRef = viewContainerRef;
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
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            const testCmpInstance = fixture.componentInstance;
            const dynamicCmpRef = testCmpInstance.viewContainerRef.createComponent(DynamicCmp);
            // change detection didn't run at all
            (0, matchers_1.expect)(dynamicCmpRef.instance.doCheckCount).toBe(0);
            // running change detection on the dynamicCmpRef level
            dynamicCmpRef.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(dynamicCmpRef.instance.doCheckCount).toBe(1);
            // running change detection on the TestBed fixture level
            fixture.changeDetectorRef.detectChanges();
            (0, matchers_1.expect)(dynamicCmpRef.instance.doCheckCount).toBe(2);
            // The injector should retrieve the change detector ref for DynamicComp. As such,
            // the doCheck hook for DynamicComp should NOT run upon ref.detectChanges().
            const changeDetector = dynamicCmpRef.injector.get(core_1.ChangeDetectorRef);
            changeDetector.detectChanges();
            (0, matchers_1.expect)(dynamicCmpRef.instance.doCheckCount).toBe(2);
        });
        describe('createComponent using Type', () => {
            const TOKEN_A = new core_1.InjectionToken('A');
            const TOKEN_B = new core_1.InjectionToken('B');
            let ChildA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-a',
                        template: `[Child Component A]`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildA = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildA = _classThis;
            })();
            let ChildB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-b',
                        template: `
          [Child Component B]
          <ng-content></ng-content>
          {{ tokenA }}
          {{ tokenB }}
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildB = _classThis = class {
                    constructor(injector, renderer) {
                        this.injector = injector;
                        this.renderer = renderer;
                    }
                    get tokenA() {
                        return this.injector.get(TOKEN_A);
                    }
                    get tokenB() {
                        return this.injector.get(TOKEN_B);
                    }
                };
                __setFunctionName(_classThis, "ChildB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildB = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: '',
                        providers: [{ provide: TOKEN_B, useValue: '[TokenB - Value]' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor(viewContainerRef, ngModuleRef, injector) {
                        this.viewContainerRef = viewContainerRef;
                        this.ngModuleRef = ngModuleRef;
                        this.injector = injector;
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
            let AppModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [App, ChildA, ChildB],
                        providers: [{ provide: TOKEN_A, useValue: '[TokenA - Value]' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppModule = _classThis = class {
                };
                __setFunctionName(_classThis, "AppModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppModule = _classThis;
            })();
            let fixture;
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({ imports: [AppModule] });
                fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
            });
            it('should be able to create a component when Type is provided', () => {
                fixture.componentInstance.viewContainerRef.createComponent(ChildA);
                (0, matchers_1.expect)(fixture.nativeElement.parentNode.textContent).toContain('[Child Component A]');
            });
            it('should maintain connection with module injector when custom injector is provided', () => {
                const comp = fixture.componentInstance;
                const environmentInjector = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN_B, useValue: '[TokenB - CustomValue]' }], testing_1.TestBed.inject(core_1.EnvironmentInjector));
                // Use factory-less way of creating a component.
                comp.viewContainerRef.createComponent(ChildB, { injector: environmentInjector });
                fixture.detectChanges();
                // Custom injector provides only `TOKEN_B`,
                // so `TOKEN_A` should be retrieved from the module injector.
                (0, matchers_1.expect)(getElementText(fixture.nativeElement.parentNode)).toContain('[TokenA - Value] [TokenB - CustomValue]');
                // Use factory-based API to compare the output with the factory-less one.
                const factoryBasedChildB = (0, core_1.createComponent)(ChildB, { environmentInjector });
                fixture.detectChanges();
                // Custom injector provides only `TOKEN_B`,
                // so `TOKEN_A` should be retrieved from the module injector
                (0, matchers_1.expect)(getElementText(fixture.nativeElement.parentNode)).toContain('[TokenA - Value] [TokenB - CustomValue]');
            });
            it('should throw if class without @Component decorator is used as Component type', () => {
                class MyClassWithoutComponentDecorator {
                }
                const createComponent = () => {
                    fixture.componentInstance.viewContainerRef.createComponent(MyClassWithoutComponentDecorator);
                };
                (0, matchers_1.expect)(createComponent).toThrowError(/Provided Component class doesn't contain Component definition./);
            });
            it('should support attaching directives when creating the component', () => {
                const logs = [];
                let Dir1 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[dir-one]',
                            host: {
                                'class': 'class-1',
                                'attr-one': 'one',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir1 = _classThis = class {
                        constructor() {
                            logs.push('Dir1');
                        }
                    };
                    __setFunctionName(_classThis, "Dir1");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir1 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir1 = _classThis;
                })();
                let Dir2 = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: 'dir-two',
                            host: {
                                'class': 'class-2',
                                'attr-two': 'two',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir2 = _classThis = class {
                        constructor() {
                            logs.push('Dir2');
                        }
                    };
                    __setFunctionName(_classThis, "Dir2");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir2 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir2 = _classThis;
                })();
                let HostComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'host-component',
                            template: '',
                            standalone: false,
                            host: {
                                'class': 'host',
                                'attr-three': 'host',
                            },
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var HostComponent = _classThis = class {
                        constructor() {
                            logs.push('HostComponent');
                        }
                    };
                    __setFunctionName(_classThis, "HostComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComponent = _classThis;
                })();
                testing_1.TestBed.resetTestingModule();
                testing_1.TestBed.configureTestingModule({
                    declarations: [EmbeddedViewInsertionComp, VCRefDirective, HostComponent],
                });
                const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
                const vcRefDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(VCRefDirective))
                    .injector.get(VCRefDirective);
                fixture.detectChanges();
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p>');
                vcRefDir.vcref.createComponent(HostComponent, {
                    index: 0,
                    directives: [Dir1, Dir2],
                });
                fixture.detectChanges();
                (0, matchers_1.expect)(logs).toEqual(['HostComponent', 'Dir1', 'Dir2']);
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<p vcref=""></p><host-component attr-three="host" attr-one="one" ' +
                    'attr-two="two" class="host class-1 class-2"></host-component>');
            });
            it('should support binding to inputs of a component', () => {
                let dirInstance;
                let Dir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _dirInput_decorators;
                    let _dirInput_initializers = [];
                    let _dirInput_extraInitializers = [];
                    var Dir = _classThis = class {
                        constructor() {
                            this.dirInput = __runInitializers(this, _dirInput_initializers, '');
                            __runInitializers(this, _dirInput_extraInitializers);
                            dirInstance = this;
                        }
                    };
                    __setFunctionName(_classThis, "Dir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _dirInput_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _dirInput_decorators, { kind: "field", name: "dirInput", static: false, private: false, access: { has: obj => "dirInput" in obj, get: obj => obj.dirInput, set: (obj, value) => { obj.dirInput = value; } }, metadata: _metadata }, _dirInput_initializers, _dirInput_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir = _classThis;
                })();
                let HostComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: 'Value: {{hostInput}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _hostInput_decorators;
                    let _hostInput_initializers = [];
                    let _hostInput_extraInitializers = [];
                    var HostComponent = _classThis = class {
                        constructor() {
                            this.hostInput = __runInitializers(this, _hostInput_initializers, '');
                            __runInitializers(this, _hostInput_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _hostInput_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _hostInput_decorators, { kind: "field", name: "hostInput", static: false, private: false, access: { has: obj => "hostInput" in obj, get: obj => obj.hostInput, set: (obj, value) => { obj.hostInput = value; } }, metadata: _metadata }, _hostInput_initializers, _hostInput_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostComponent = _classThis;
                })();
                testing_1.TestBed.resetTestingModule();
                testing_1.TestBed.configureTestingModule({
                    declarations: [EmbeddedViewInsertionComp, VCRefDirective, HostComponent],
                });
                const hostValue = (0, core_1.signal)('initial');
                let dirValue = 'initial';
                const fixture = testing_1.TestBed.createComponent(EmbeddedViewInsertionComp);
                const vcRefDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(VCRefDirective))
                    .injector.get(VCRefDirective);
                fixture.detectChanges();
                const ref = vcRefDir.vcref.createComponent(HostComponent, {
                    index: 0,
                    bindings: [(0, core_1.inputBinding)('hostInput', hostValue)],
                    directives: [
                        {
                            type: Dir,
                            bindings: [(0, core_1.inputBinding)('dirInput', () => dirValue)],
                        },
                    ],
                });
                fixture.detectChanges();
                (0, matchers_1.expect)(ref.instance.hostInput).toBe('initial');
                (0, matchers_1.expect)(dirInstance.dirInput).toBe('initial');
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Value: initial');
                hostValue.set('host changed');
                fixture.detectChanges();
                (0, matchers_1.expect)(ref.instance.hostInput).toBe('host changed');
                (0, matchers_1.expect)(dirInstance.dirInput).toBe('initial');
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Value: host changed');
                dirValue = 'dir changed';
                fixture.detectChanges();
                (0, matchers_1.expect)(ref.instance.hostInput).toBe('host changed');
                (0, matchers_1.expect)(dirInstance.dirInput).toBe('dir changed');
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('Value: host changed');
            });
            describe('`options` argument handling', () => {
                it('should work correctly when an empty object is provided', () => {
                    fixture.componentInstance.viewContainerRef.createComponent(ChildA, {});
                    (0, matchers_1.expect)(fixture.nativeElement.parentNode.textContent).toContain('[Child Component A]');
                });
                it('should take provided `options` arguments into account', () => {
                    const { viewContainerRef, ngModuleRef, injector } = fixture.componentInstance;
                    viewContainerRef.createComponent(ChildA);
                    const projectableNode = document.createElement('div');
                    const textNode = document.createTextNode('[Projectable Node]');
                    projectableNode.appendChild(textNode);
                    const projectableNodes = [[projectableNode]];
                    // Insert ChildB in front of ChildA (since index = 0)
                    viewContainerRef.createComponent(ChildB, {
                        index: 0,
                        injector,
                        ngModuleRef,
                        projectableNodes,
                    });
                    fixture.detectChanges();
                    (0, matchers_1.expect)(getElementText(fixture.nativeElement.parentNode)).toContain('[Child Component B] ' +
                        '[Projectable Node] ' +
                        '[TokenA - Value] ' +
                        '[TokenB - Value] ' +
                        '[Child Component A]');
                });
            });
        });
    });
    describe('insertion points and declaration points', () => {
        let InsertionDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[tplDir]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_tplDir_decorators;
            var InsertionDir = _classThis = class {
                set tplDir(tpl) {
                    tpl ? this.vcr.createEmbeddedView(tpl) : this.vcr.clear();
                }
                constructor(vcr) {
                    this.vcr = (__runInitializers(this, _instanceExtraInitializers), vcr);
                }
            };
            __setFunctionName(_classThis, "InsertionDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_tplDir_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _set_tplDir_decorators, { kind: "setter", name: "tplDir", static: false, private: false, access: { has: obj => "tplDir" in obj, set: (obj, value) => { obj.tplDir = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InsertionDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InsertionDir = _classThis;
        })();
        // see running stackblitz example: https://stackblitz.com/edit/angular-w3myy6
        it('should work with a template declared in a different component view from insertion', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div [tplDir]="tpl">{{name}}</div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tpl_decorators;
                let _tpl_initializers = [];
                let _tpl_extraInitializers = [];
                var Child = _classThis = class {
                    constructor() {
                        this.tpl = __runInitializers(this, _tpl_initializers, null);
                        this.name = (__runInitializers(this, _tpl_extraInitializers), 'Child');
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tpl_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #foo>
            <div>{{name}}</div>
          </ng-template>

          <child [tpl]="foo"></child>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent, InsertionDir] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            const child = fixture.debugElement.query(platform_browser_1.By.directive(Child)).componentInstance;
            fixture.detectChanges();
            // Context should be inherited from the declaration point, not the
            // insertion point, so the template should read 'Parent'.
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual(`<child><div>Child</div><div>Parent</div></child>`);
            child.tpl = null;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual(`<child><div>Child</div></child>`);
        });
        // see running stackblitz example: https://stackblitz.com/edit/angular-3vplec
        it('should work with nested for loops with different declaration / insertion points', () => {
            let LoopComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'loop-comp',
                        template: `
          <ng-template ngFor [ngForOf]="rows" [ngForTemplate]="tpl">
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _tpl_decorators;
                let _tpl_initializers = [];
                let _tpl_extraInitializers = [];
                let _rows_decorators;
                let _rows_initializers = [];
                let _rows_extraInitializers = [];
                var LoopComp = _classThis = class {
                    constructor() {
                        this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                        this.rows = (__runInitializers(this, _tpl_extraInitializers), __runInitializers(this, _rows_initializers, void 0));
                        this.name = (__runInitializers(this, _rows_extraInitializers), 'Loop');
                    }
                };
                __setFunctionName(_classThis, "LoopComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tpl_decorators = [(0, core_1.Input)()];
                    _rows_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                    __esDecorate(null, null, _rows_decorators, { kind: "field", name: "rows", static: false, private: false, access: { has: obj => "rows" in obj, get: obj => obj.rows, set: (obj, value) => { obj.rows = value; } }, metadata: _metadata }, _rows_initializers, _rows_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoopComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoopComp = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #rowTemplate let-row>
            <ng-template #cellTemplate let-cell>
              <div>{{cell}} - {{row.value}} - {{name}}</div>
            </ng-template>

            <loop-comp [tpl]="cellTemplate" [rows]="row.data"></loop-comp>
          </ng-template>

          <loop-comp [tpl]="rowTemplate" [rows]="rows"></loop-comp>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                        this.rows = [
                            { data: ['1', '2'], value: 'one' },
                            { data: ['3', '4'], value: 'two' },
                        ];
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [LoopComp, Parent], imports: [common_1.CommonModule] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<loop-comp>' +
                '<loop-comp><div>1 - one - Parent</div><div>2 - one - Parent</div></loop-comp>' +
                '<loop-comp><div>3 - two - Parent</div><div>4 - two - Parent</div></loop-comp>' +
                '</loop-comp>');
            fixture.componentInstance.rows = [
                { data: ['5', '6'], value: 'three' },
                { data: ['7'], value: 'four' },
            ];
            fixture.componentInstance.name = 'New name!';
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<loop-comp>' +
                '<loop-comp><div>5 - three - New name!</div><div>6 - three - New name!</div></loop-comp>' +
                '<loop-comp><div>7 - four - New name!</div></loop-comp>' +
                '</loop-comp>');
        });
        it('should insert elements in the proper order when template root is an ng-container', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-container *ngFor="let item of items">|{{ item }}|</ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = ['one', 'two', 'three'];
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
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|one||two||three|');
            fixture.componentInstance.items.unshift('zero');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three|');
            fixture.componentInstance.items.push('four');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three||four|');
            fixture.componentInstance.items.splice(3, 0, 'two point five');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||two point five||three||four|');
        });
        it('should insert elements in the proper order when template root is an ng-container and is wrapped by an ng-container', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <ng-container>
                <ng-container *ngFor="let item of items">|{{ item }}|</ng-container>
              </ng-container>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = ['one', 'two', 'three'];
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
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|one||two||three|');
            fixture.componentInstance.items.unshift('zero');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three|');
            fixture.componentInstance.items.push('four');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three||four|');
            fixture.componentInstance.items.splice(3, 0, 'two point five');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||two point five||three||four|');
        });
        it('should insert elements in the proper order when template root is an ng-container and first node is a ng-container', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <ng-container *ngFor="let item of items"><ng-container>|{{ item }}|</ng-container></ng-container>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = ['one', 'two', 'three'];
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
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|one||two||three|');
            fixture.componentInstance.items.unshift('zero');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three|');
            fixture.componentInstance.items.push('four');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three||four|');
            fixture.componentInstance.items.splice(3, 0, 'two point five');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||two point five||three||four|');
        });
        it('should insert elements in the proper order when template root is an ng-container, wrapped in an ng-container with the root node as an ng-container', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <ng-container>
              <ng-container *ngFor="let item of items"><ng-container>|{{ item }}|</ng-container></ng-container>
            </ng-container>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = ['one', 'two', 'three'];
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
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|one||two||three|');
            fixture.componentInstance.items.unshift('zero');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three|');
            fixture.componentInstance.items.push('four');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three||four|');
            fixture.componentInstance.items.splice(3, 0, 'two point five');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||two point five||three||four|');
        });
        it('should insert elements in the proper order when the first child node is an ICU expression', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-container *ngFor="let item of items">{count, select, other {|{{ item }}|}}</ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = ['one', 'two', 'three'];
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
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|one||two||three|');
            fixture.componentInstance.items.unshift('zero');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three|');
            fixture.componentInstance.items.push('four');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||three||four|');
            fixture.componentInstance.items.splice(3, 0, 'two point five');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('|zero||one||two||two point five||three||four|');
        });
    });
    describe('lifecycle hooks', () => {
        // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
        const log = [];
        let ComponentWithHooks = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'hooks',
                    template: `{{name}}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var ComponentWithHooks = _classThis = class {
                log(msg) {
                    log.push(msg);
                }
                ngOnChanges() {
                    this.log('onChanges-' + this.name);
                }
                ngOnInit() {
                    this.log('onInit-' + this.name);
                }
                ngDoCheck() {
                    this.log('doCheck-' + this.name);
                }
                ngAfterContentInit() {
                    this.log('afterContentInit-' + this.name);
                }
                ngAfterContentChecked() {
                    this.log('afterContentChecked-' + this.name);
                }
                ngAfterViewInit() {
                    this.log('afterViewInit-' + this.name);
                }
                ngAfterViewChecked() {
                    this.log('afterViewChecked-' + this.name);
                }
                ngOnDestroy() {
                    this.log('onDestroy-' + this.name);
                }
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, void 0);
                    __runInitializers(this, _name_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ComponentWithHooks");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentWithHooks = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentWithHooks = _classThis;
        })();
        it('should call all hooks in correct order when creating with createEmbeddedView', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #foo>
            <hooks [name]="'C'"></hooks>
          </ng-template>
          <hooks vcref [tplRef]="foo" [name]="'A'"></hooks>
          <hooks [name]="'B'"></hooks>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            log.length = 0;
            testing_1.TestBed.configureTestingModule({
                declarations: [SomeComponent, ComponentWithHooks, VCRefDirective],
            });
            const fixture = testing_1.TestBed.createComponent(SomeComponent);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'onChanges-A',
                'onInit-A',
                'doCheck-A',
                'onChanges-B',
                'onInit-B',
                'doCheck-B',
                'afterContentInit-A',
                'afterContentChecked-A',
                'afterContentInit-B',
                'afterContentChecked-B',
                'afterViewInit-A',
                'afterViewChecked-A',
                'afterViewInit-B',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<hooks vcref="">A</hooks><hooks></hooks><hooks>B</hooks>');
            (0, matchers_1.expect)(log).toEqual([]);
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<hooks vcref="">A</hooks><hooks>C</hooks><hooks>B</hooks>');
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'onChanges-C',
                'onInit-C',
                'doCheck-C',
                'afterContentInit-C',
                'afterContentChecked-C',
                'afterViewInit-C',
                'afterViewChecked-C',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'doCheck-C',
                'afterContentChecked-C',
                'afterViewChecked-C',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            const viewRef = vcRefDir.vcref.detach(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            vcRefDir.vcref.insert(viewRef);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'doCheck-C',
                'afterContentChecked-C',
                'afterViewChecked-C',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            vcRefDir.vcref.remove(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'onDestroy-C',
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
        });
        it('should call all hooks in correct order when creating with createComponent', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <hooks vcref [name]="'A'"></hooks>
          <hooks [name]="'B'"></hooks>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            log.length = 0;
            testing_1.TestBed.configureTestingModule({
                declarations: [SomeComponent, VCRefDirective, ComponentWithHooks],
            });
            const fixture = testing_1.TestBed.createComponent(SomeComponent);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'onChanges-A',
                'onInit-A',
                'doCheck-A',
                'onChanges-B',
                'onInit-B',
                'doCheck-B',
                'afterContentInit-A',
                'afterContentChecked-A',
                'afterContentInit-B',
                'afterContentChecked-B',
                'afterViewInit-A',
                'afterViewChecked-A',
                'afterViewInit-B',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            const componentRef = vcRefDir.vcref.createComponent(ComponentWithHooks);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<hooks vcref="">A</hooks><hooks></hooks><hooks>B</hooks>');
            (0, matchers_1.expect)(log).toEqual([]);
            componentRef.instance.name = 'D';
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<hooks vcref="">A</hooks><hooks>D</hooks><hooks>B</hooks>');
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'onInit-D',
                'doCheck-D',
                'afterContentInit-D',
                'afterContentChecked-D',
                'afterViewInit-D',
                'afterViewChecked-D',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'doCheck-D',
                'afterContentChecked-D',
                'afterViewChecked-D',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            const viewRef = vcRefDir.vcref.detach(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            vcRefDir.vcref.insert(viewRef);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'doCheck-A',
                'doCheck-B',
                'doCheck-D',
                'afterContentChecked-D',
                'afterViewChecked-D',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
            log.length = 0;
            vcRefDir.vcref.remove(0);
            fixture.detectChanges();
            (0, matchers_1.expect)(log).toEqual([
                'onDestroy-D',
                'doCheck-A',
                'doCheck-B',
                'afterContentChecked-A',
                'afterContentChecked-B',
                'afterViewChecked-A',
                'afterViewChecked-B',
            ]);
        });
    });
    describe('host bindings', () => {
        it('should support host bindings on dynamically created components', () => {
            let HostBindingCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host-bindings',
                        host: { 'id': 'attribute', '[title]': 'title' },
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostBindingCmpt = _classThis = class {
                    constructor() {
                        this.title = 'initial';
                    }
                };
                __setFunctionName(_classThis, "HostBindingCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostBindingCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostBindingCmpt = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template vcref></ng-template>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRefDir_decorators;
                let _vcRefDir_initializers = [];
                let _vcRefDir_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.vcRefDir = __runInitializers(this, _vcRefDir_initializers, void 0);
                        __runInitializers(this, _vcRefDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRefDir_decorators = [(0, core_1.ViewChild)(VCRefDirective, { static: true })];
                    __esDecorate(null, null, _vcRefDir_decorators, { kind: "field", name: "vcRefDir", static: false, private: false, access: { has: obj => "vcRefDir" in obj, get: obj => obj.vcRefDir, set: (obj, value) => { obj.vcRefDir = value; } }, metadata: _metadata }, _vcRefDir_initializers, _vcRefDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComponent, VCRefDirective, HostBindingCmpt],
            });
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            const { vcRefDir } = fixture.componentInstance;
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toBe('');
            const componentRef = vcRefDir.vcref.createComponent(HostBindingCmpt);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.children[0].tagName).toBe('HOST-BINDINGS');
            (0, matchers_1.expect)(fixture.nativeElement.children[0].getAttribute('id')).toBe('attribute');
            (0, matchers_1.expect)(fixture.nativeElement.children[0].getAttribute('title')).toBe('initial');
            componentRef.instance.title = 'changed';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.children[0].tagName).toBe('HOST-BINDINGS');
            (0, matchers_1.expect)(fixture.nativeElement.children[0].getAttribute('id')).toBe('attribute');
            (0, matchers_1.expect)(fixture.nativeElement.children[0].getAttribute('title')).toBe('changed');
        });
    });
    describe('projection', () => {
        it('should project the ViewContainerRef content along its host, in an element', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<div><ng-content></ng-content></div>',
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
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
          <ng-template #foo>
            <span>{{name}}</span>
          </ng-template>

          <child>
            <header vcref [tplRef]="foo" [name]="name">blah</header>
          </child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'bar';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Child, Parent, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div><header vcref="">blah</header></div></child>');
            vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child><div><header vcref="">blah</header><span>bar</span></div></child>');
        });
        it('should project the ViewContainerRef content along its host, in a view', () => {
            let ChildWithView = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-with-view',
                        template: `Before (inside)-<ng-content *ngIf="show"></ng-content>-After (inside)`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildWithView = _classThis = class {
                    constructor() {
                        this.show = true;
                    }
                };
                __setFunctionName(_classThis, "ChildWithView");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildWithView = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildWithView = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
          <ng-template #foo>
            <span>{{name}}</span>
          </ng-template>
          <child-with-view>
            Before projected
            <header vcref [tplRef]="foo" [name]="name">blah</header>
            After projected
          </child-with-view>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'bar';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ChildWithView, Parent, VCRefDirective] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            const vcRefDir = fixture.debugElement
                .query(platform_browser_1.By.directive(VCRefDirective))
                .injector.get(VCRefDirective);
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-view>Before (inside)- Before projected <header vcref="">blah</header> After projected -After (inside)</child-with-view>');
            vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
            fixture.detectChanges();
            (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-view>Before (inside)- Before projected <header vcref="">blah</header><span>bar</span> After projected -After (inside)</child-with-view>');
        });
        it('should handle empty re-projection into the root of a view', () => {
            let RootComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-comp',
                        template: `<ng-template [ngIf]="show"><ng-content></ng-content></ng-template>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _show_decorators;
                let _show_initializers = [];
                let _show_extraInitializers = [];
                var RootComp = _classThis = class {
                    constructor() {
                        this.show = __runInitializers(this, _show_initializers, true);
                        __runInitializers(this, _show_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _show_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _show_decorators, { kind: "field", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootComp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: `<root-comp [show]="show"><ng-content></ng-content><div></div></root-comp>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                    constructor() {
                        this.show = true;
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, RootComp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(1);
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.querySelectorAll('div').length).toBe(0);
        });
        describe('with select', () => {
            let ChildWithSelector = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-with-selector',
                        template: `
          <p class="a"><ng-content select="header"></ng-content></p>
          <p class="b"><ng-content></ng-content></p>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildWithSelector = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildWithSelector");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildWithSelector = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildWithSelector = _classThis;
            })();
            it('should project the ViewContainerRef content along its host, when the host matches a selector', () => {
                let Parent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: `
            <ng-template #foo>
              <span>{{name}}</span>
            </ng-template>
            <child-with-selector>
              <header vcref [tplRef]="foo" [name]="name">blah</header>
            </child-with-selector>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Parent = _classThis = class {
                        constructor() {
                            this.name = 'bar';
                        }
                    };
                    __setFunctionName(_classThis, "Parent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Parent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Parent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Parent, ChildWithSelector, VCRefDirective] });
                const fixture = testing_1.TestBed.createComponent(Parent);
                const vcRefDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(VCRefDirective))
                    .injector.get(VCRefDirective);
                fixture.detectChanges();
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-selector><p class="a"><header vcref="">blah</header></p><p class="b"></p></child-with-selector>');
                vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
                fixture.detectChanges();
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-selector><p class="a"><header vcref="">blah</header><span>bar</span></p><p class="b"></p></child-with-selector>');
            });
            it('should create embedded view when ViewContainerRef is inside projection', () => {
                let ContentComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'content-comp',
                            template: '<ng-content></ng-content>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ContentComp = _classThis = class {
                    };
                    __setFunctionName(_classThis, "ContentComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ContentComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ContentComp = _classThis;
                })();
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: `
          <content-comp>
            <div #target></div>
          </content-comp>

          <ng-template #source>My Content</ng-template>
        `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _source_decorators;
                    let _source_initializers = [];
                    let _source_extraInitializers = [];
                    let _target_decorators;
                    let _target_initializers = [];
                    let _target_extraInitializers = [];
                    var MyComp = _classThis = class {
                        ngOnInit() {
                            this.target.createEmbeddedView(this.source);
                        }
                        constructor() {
                            this.source = __runInitializers(this, _source_initializers, void 0);
                            this.target = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _target_initializers, void 0));
                            __runInitializers(this, _target_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _source_decorators = [(0, core_1.ViewChild)('source', { static: true })];
                        _target_decorators = [(0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef, static: true })];
                        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
                        __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ContentComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('My Content');
            });
            it('should not project the ViewContainerRef content, when the host does not match a selector', () => {
                let Parent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: `
            <ng-template #foo>
              <span>{{name}}</span>
            </ng-template>
            <child-with-selector>
              <footer vcref [tplRef]="foo" [name]="name">blah</footer>
            </child-with-selector>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Parent = _classThis = class {
                        constructor() {
                            this.name = 'bar';
                        }
                    };
                    __setFunctionName(_classThis, "Parent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Parent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Parent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Parent, ChildWithSelector, VCRefDirective] });
                const fixture = testing_1.TestBed.createComponent(Parent);
                const vcRefDir = fixture.debugElement
                    .query(platform_browser_1.By.directive(VCRefDirective))
                    .injector.get(VCRefDirective);
                fixture.detectChanges();
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-selector><p class="a"></p><p class="b"><footer vcref="">blah</footer></p></child-with-selector>');
                vcRefDir.vcref.createEmbeddedView(vcRefDir.tplRef);
                fixture.detectChanges();
                (0, matchers_1.expect)(getElementHtml(fixture.nativeElement)).toEqual('<child-with-selector><p class="a"></p><p class="b"><footer vcref="">blah</footer><span>bar</span></p></child-with-selector>');
            });
        });
    });
    describe('root view container ref', () => {
        let containerEl = null;
        beforeEach(() => (containerEl = null));
        /**
         * Creates a new test component renderer instance that wraps the root element
         * in another element. This allows us to test if elements have been inserted into
         * the parent element of the root component.
         */
        function createTestComponentRenderer(document) {
            return {
                insertRootElement(rootElementId) {
                    const rootEl = document.createElement('div');
                    rootEl.id = rootElementId;
                    containerEl = document.createElement('div');
                    document.body.appendChild(containerEl);
                    containerEl.appendChild(rootEl);
                },
                removeAllRootElements() {
                    containerEl === null || containerEl === void 0 ? void 0 : containerEl.remove();
                },
            };
        }
        const TEST_COMPONENT_RENDERER = {
            provide: testing_1.TestComponentRenderer,
            useFactory: createTestComponentRenderer,
            deps: [common_1.DOCUMENT],
        };
        it('should check bindings for components dynamically created by root component', () => {
            let DynamicCompWithBindings = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt-with-bindings',
                        template: `check count: {{checkCount}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCompWithBindings = _classThis = class {
                    constructor() {
                        this.checkCount = 0;
                    }
                    ngDoCheck() {
                        this.checkCount++;
                    }
                };
                __setFunctionName(_classThis, "DynamicCompWithBindings");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCompWithBindings = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCompWithBindings = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor(vcRef) {
                        this.vcRef = vcRef;
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComp, DynamicCompWithBindings],
                providers: [TEST_COMPONENT_RENDERER],
            });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const { vcRef } = fixture.componentInstance;
            fixture.detectChanges();
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(2);
            (0, matchers_1.expect)(containerEl.childNodes[1].nodeType).toBe(Node.COMMENT_NODE);
            (0, matchers_1.expect)(containerEl.childNodes[0].tagName).toBe('DIV');
            vcRef.createComponent(DynamicCompWithBindings);
            fixture.detectChanges();
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(3);
            (0, matchers_1.expect)(containerEl.childNodes[1].textContent).toBe('check count: 1');
            fixture.detectChanges();
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(3);
            (0, matchers_1.expect)(containerEl.childNodes[1].textContent).toBe('check count: 2');
        });
        it('should create deep DOM tree immediately for dynamically created components', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor(vcRef) {
                        this.vcRef = vcRef;
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
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div>{{name}}</div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor() {
                        this.name = 'text';
                    }
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
            let DynamicCompWithChildren = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt-with-children',
                        template: `<child></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicCompWithChildren = _classThis = class {
                };
                __setFunctionName(_classThis, "DynamicCompWithChildren");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCompWithChildren = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCompWithChildren = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestComp, DynamicCompWithChildren, Child],
                providers: [TEST_COMPONENT_RENDERER],
            });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const { vcRef } = fixture.componentInstance;
            fixture.detectChanges();
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(2);
            (0, matchers_1.expect)(containerEl.childNodes[1].nodeType).toBe(Node.COMMENT_NODE);
            (0, matchers_1.expect)(containerEl.childNodes[0].tagName).toBe('DIV');
            vcRef.createComponent(DynamicCompWithChildren);
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(3);
            (0, matchers_1.expect)(getElementHtml(containerEl.childNodes[1])).toBe('<child><div></div></child>');
            fixture.detectChanges();
            (0, matchers_1.expect)(containerEl.childNodes.length).toBe(3);
            (0, matchers_1.expect)(getElementHtml(containerEl.childNodes[1])).toBe(`<child><div>text</div></child>`);
        });
    });
});
let EmbeddedViewInsertionComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <ng-template #tplRef let-name>{{name}}</ng-template>
    <p vcref [tplRef]="tplRef"></p>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmbeddedViewInsertionComp = _classThis = class {
    };
    __setFunctionName(_classThis, "EmbeddedViewInsertionComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmbeddedViewInsertionComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmbeddedViewInsertionComp = _classThis;
})();
let VCRefDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[vcref]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _tplRef_decorators;
    let _tplRef_initializers = [];
    let _tplRef_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    var VCRefDirective = _classThis = class {
        // Injecting the ViewContainerRef to create a dynamic container in which
        // embedded views will be created
        constructor(vcref, elementRef) {
            this.vcref = vcref;
            this.elementRef = elementRef;
            this.tplRef = __runInitializers(this, _tplRef_initializers, void 0);
            this.name = (__runInitializers(this, _tplRef_extraInitializers), __runInitializers(this, _name_initializers, ''));
            __runInitializers(this, _name_extraInitializers);
            this.vcref = vcref;
            this.elementRef = elementRef;
        }
        createView(s, index) {
            if (!this.tplRef) {
                throw new Error('No template reference passed to directive.');
            }
            return this.vcref.createEmbeddedView(this.tplRef, { $implicit: s }, index);
        }
    };
    __setFunctionName(_classThis, "VCRefDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tplRef_decorators = [(0, core_1.Input)()];
        _name_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _tplRef_decorators, { kind: "field", name: "tplRef", static: false, private: false, access: { has: obj => "tplRef" in obj, get: obj => obj.tplRef, set: (obj, value) => { obj.tplRef = value; } }, metadata: _metadata }, _tplRef_initializers, _tplRef_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VCRefDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VCRefDirective = _classThis;
})();
let EmbeddedComponentWithNgContent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: `embedded-cmp-with-ngcontent`,
            template: `<ng-content></ng-content><hr><ng-content></ng-content>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmbeddedComponentWithNgContent = _classThis = class {
    };
    __setFunctionName(_classThis, "EmbeddedComponentWithNgContent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmbeddedComponentWithNgContent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmbeddedComponentWithNgContent = _classThis;
})();
let ViewContainerRefComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-container-ref-comp',
            template: `
    <ng-template #ref0>0</ng-template>
    <ng-template #ref1>1</ng-template>
    <ng-template #ref2>2</ng-template>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _templates_decorators;
    let _templates_initializers = [];
    let _templates_extraInitializers = [];
    var ViewContainerRefComp = _classThis = class {
        constructor(vcr) {
            this.vcr = vcr;
            this.templates = __runInitializers(this, _templates_initializers, void 0);
            __runInitializers(this, _templates_extraInitializers);
            this.vcr = vcr;
        }
    };
    __setFunctionName(_classThis, "ViewContainerRefComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _templates_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef)];
        __esDecorate(null, null, _templates_decorators, { kind: "field", name: "templates", static: false, private: false, access: { has: obj => "templates" in obj, get: obj => obj.templates, set: (obj, value) => { obj.templates = value; } }, metadata: _metadata }, _templates_initializers, _templates_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewContainerRefComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewContainerRefComp = _classThis;
})();
let ViewContainerRefApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-container-ref-app',
            template: `
    <view-container-ref-comp></view-container-ref-comp>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _vcrComp_decorators;
    let _vcrComp_initializers = [];
    let _vcrComp_extraInitializers = [];
    var ViewContainerRefApp = _classThis = class {
        constructor() {
            this.vcrComp = __runInitializers(this, _vcrComp_initializers, void 0);
            __runInitializers(this, _vcrComp_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewContainerRefApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _vcrComp_decorators = [(0, core_1.ViewChild)(ViewContainerRefComp)];
        __esDecorate(null, null, _vcrComp_decorators, { kind: "field", name: "vcrComp", static: false, private: false, access: { has: obj => "vcrComp" in obj, get: obj => obj.vcrComp, set: (obj, value) => { obj.vcrComp = value; } }, metadata: _metadata }, _vcrComp_initializers, _vcrComp_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewContainerRefApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewContainerRefApp = _classThis;
})();
let StructDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[structDir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StructDir = _classThis = class {
        constructor(vcref, tplRef) {
            this.vcref = vcref;
            this.tplRef = tplRef;
        }
        create() {
            this.vcref.createEmbeddedView(this.tplRef);
        }
        destroy() {
            this.vcref.clear();
        }
    };
    __setFunctionName(_classThis, "StructDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StructDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StructDir = _classThis;
})();
exports.StructDir = StructDir;
let DestroyCasesComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'destroy-cases',
            template: `  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _structDirs_decorators;
    let _structDirs_initializers = [];
    let _structDirs_extraInitializers = [];
    var DestroyCasesComp = _classThis = class {
        constructor() {
            this.structDirs = __runInitializers(this, _structDirs_initializers, void 0);
            __runInitializers(this, _structDirs_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DestroyCasesComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _structDirs_decorators = [(0, core_1.ViewChildren)(StructDir)];
        __esDecorate(null, null, _structDirs_decorators, { kind: "field", name: "structDirs", static: false, private: false, access: { has: obj => "structDirs" in obj, get: obj => obj.structDirs, set: (obj, value) => { obj.structDirs = value; } }, metadata: _metadata }, _structDirs_initializers, _structDirs_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DestroyCasesComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DestroyCasesComp = _classThis;
})();
let ConstructorDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[constructorDir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConstructorDir = _classThis = class {
        constructor(vcref, tplRef) {
            vcref.createEmbeddedView(tplRef);
        }
    };
    __setFunctionName(_classThis, "ConstructorDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConstructorDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConstructorDir = _classThis;
})();
let ConstructorApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'constructor-app',
            template: `
    <div *constructorDir>
      <span *constructorDir #foo></span>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foo_decorators;
    let _foo_initializers = [];
    let _foo_extraInitializers = [];
    var ConstructorApp = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            __runInitializers(this, _foo_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ConstructorApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.ViewChild)('foo', { static: true })];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConstructorApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConstructorApp = _classThis;
})();
let ConstructorAppWithQueries = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'constructor-app-with-queries',
            template: `
    <ng-template constructorDir #foo>
      <div #foo></div>
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
    var ConstructorAppWithQueries = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            __runInitializers(this, _foo_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ConstructorAppWithQueries");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.ViewChild)('foo', { static: true })];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConstructorAppWithQueries = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConstructorAppWithQueries = _classThis;
})();
