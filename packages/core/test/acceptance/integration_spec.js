"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("@angular/animations");
const browser_1 = require("@angular/animations/browser");
const testing_1 = require("@angular/animations/browser/testing");
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const context_discovery_1 = require("../../src/render3/context_discovery");
const lview_tracking_1 = require("../../src/render3/interfaces/lview_tracking");
const type_checks_1 = require("../../src/render3/interfaces/type_checks");
const view_1 = require("../../src/render3/interfaces/view");
const state_1 = require("../../src/render3/state");
const testing_2 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const animations_2 = require("@angular/platform-browser/animations");
describe('acceptance integration tests', () => {
    function stripHtmlComments(str) {
        return str.replace(/<!--[\s\S]*?-->/g, '');
    }
    describe('render', () => {
        it('should render basic template', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<span title="Hello">Greetings</span>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(fixture.nativeElement.innerHTML).toEqual('<span title="Hello">Greetings</span>');
        });
    });
    describe('ng-container', () => {
        it('should insert as a child of a regular element', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div>before|<ng-container>Greetings<span></span></ng-container>|after</div>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            // Strip comments since VE and Ivy put them in different places.
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('<div>before|Greetings<span></span>|after</div>');
        });
        it('should add and remove DOM nodes when ng-container is a child of a regular element', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template [ngIf]="render"><div><ng-container>content</ng-container></div></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.render = false;
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
            testing_2.TestBed.configureTestingModule({ declarations: [App], imports: [common_1.CommonModule] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
            fixture.componentInstance.render = true;
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<div>content</div>');
            fixture.componentInstance.render = false;
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
        });
        it('should add and remove DOM nodes when ng-container is a child of an embedded view', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container *ngIf="render">content</ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.render = false;
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
            testing_2.TestBed.configureTestingModule({ declarations: [App], imports: [common_1.CommonModule] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
            fixture.componentInstance.render = true;
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('content');
            fixture.componentInstance.render = false;
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
        });
        // https://stackblitz.com/edit/angular-tfhcz1?file=src%2Fapp%2Fapp.component.ts
        it('should add and remove DOM nodes when ng-container is a child of a delayed embedded view', () => {
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[testDirective]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    constructor(_tplRef, _vcRef) {
                        this._tplRef = _tplRef;
                        this._vcRef = _vcRef;
                    }
                    createAndInsert() {
                        this._vcRef.insert(this._tplRef.createEmbeddedView({}));
                    }
                    clear() {
                        this._vcRef.clear();
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template testDirective><ng-container>content</ng-container></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDirective_decorators;
                let _testDirective_initializers = [];
                let _testDirective_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.testDirective = __runInitializers(this, _testDirective_initializers, void 0);
                        __runInitializers(this, _testDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDirective_decorators = [(0, core_1.ViewChild)(TestDirective, { static: true })];
                    __esDecorate(null, null, _testDirective_decorators, { kind: "field", name: "testDirective", static: false, private: false, access: { has: obj => "testDirective" in obj, get: obj => obj.testDirective, set: (obj, value) => { obj.testDirective = value; } }, metadata: _metadata }, _testDirective_initializers, _testDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('');
            fixture.componentInstance.testDirective.createAndInsert();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('content');
            fixture.componentInstance.testDirective.clear();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('');
        });
        it('should render at the component view root', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: '<ng-container>component template</ng-container>',
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<test-cmpt></test-cmpt>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestCmpt] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('<test-cmpt>component template</test-cmpt>');
        });
        it('should render inside another ng-container', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: '<ng-container><ng-container><ng-container>content</ng-container></ng-container></ng-container>',
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<test-cmpt></test-cmpt>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestCmpt] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('<test-cmpt>content</test-cmpt>');
        });
        it('should render inside another ng-container at the root of a delayed view', () => {
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[testDirective]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    constructor(_tplRef, _vcRef) {
                        this._tplRef = _tplRef;
                        this._vcRef = _vcRef;
                    }
                    createAndInsert() {
                        this._vcRef.insert(this._tplRef.createEmbeddedView({}));
                    }
                    clear() {
                        this._vcRef.clear();
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template testDirective><ng-container><ng-container><ng-container>content</ng-container></ng-container></ng-container></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDirective_decorators;
                let _testDirective_initializers = [];
                let _testDirective_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.testDirective = __runInitializers(this, _testDirective_initializers, void 0);
                        __runInitializers(this, _testDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDirective_decorators = [(0, core_1.ViewChild)(TestDirective, { static: true })];
                    __esDecorate(null, null, _testDirective_decorators, { kind: "field", name: "testDirective", static: false, private: false, access: { has: obj => "testDirective" in obj, get: obj => obj.testDirective, set: (obj, value) => { obj.testDirective = value; } }, metadata: _metadata }, _testDirective_initializers, _testDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('');
            fixture.componentInstance.testDirective.createAndInsert();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('content');
            fixture.componentInstance.testDirective.createAndInsert();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('contentcontent');
            fixture.componentInstance.testDirective.clear();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toBe('');
        });
        it('should support directives and inject ElementRef', () => {
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    constructor(elRef) {
                        this.elRef = elRef;
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div><ng-container dir></ng-container></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDirective_decorators;
                let _testDirective_initializers = [];
                let _testDirective_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.testDirective = __runInitializers(this, _testDirective_initializers, void 0);
                        __runInitializers(this, _testDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDirective_decorators = [(0, core_1.ViewChild)(TestDirective)];
                    __esDecorate(null, null, _testDirective_decorators, { kind: "field", name: "testDirective", static: false, private: false, access: { has: obj => "testDirective" in obj, get: obj => obj.testDirective, set: (obj, value) => { obj.testDirective = value; } }, metadata: _metadata }, _testDirective_initializers, _testDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<div></div>');
            expect(fixture.componentInstance.testDirective.elRef.nativeElement.nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should support ViewContainerRef when ng-container is at the root of a view', () => {
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _contentTpl_decorators;
                let _contentTpl_initializers = [];
                let _contentTpl_extraInitializers = [];
                var TestDirective = _classThis = class {
                    constructor(_vcRef) {
                        this._vcRef = _vcRef;
                        this.contentTpl = __runInitializers(this, _contentTpl_initializers, null);
                        __runInitializers(this, _contentTpl_extraInitializers);
                        this._vcRef = _vcRef;
                    }
                    insertView() {
                        this._vcRef.createEmbeddedView(this.contentTpl);
                    }
                    clear() {
                        this._vcRef.clear();
                    }
                };
                __setFunctionName(_classThis, "TestDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _contentTpl_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _contentTpl_decorators, { kind: "field", name: "contentTpl", static: false, private: false, access: { has: obj => "contentTpl" in obj, get: obj => obj.contentTpl, set: (obj, value) => { obj.contentTpl = value; } }, metadata: _metadata }, _contentTpl_initializers, _contentTpl_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container dir [contentTpl]="content"><ng-template #content>Content</ng-template></ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDirective_decorators;
                let _testDirective_initializers = [];
                let _testDirective_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.testDirective = __runInitializers(this, _testDirective_initializers, void 0);
                        __runInitializers(this, _testDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDirective_decorators = [(0, core_1.ViewChild)(TestDirective)];
                    __esDecorate(null, null, _testDirective_decorators, { kind: "field", name: "testDirective", static: false, private: false, access: { has: obj => "testDirective" in obj, get: obj => obj.testDirective, set: (obj, value) => { obj.testDirective = value; } }, metadata: _metadata }, _testDirective_initializers, _testDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
            fixture.componentInstance.testDirective.insertView();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('Content');
            fixture.componentInstance.testDirective.clear();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
        });
        it('should support ViewContainerRef on <ng-template> inside <ng-container>', () => {
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    constructor(_tplRef, _vcRef) {
                        this._tplRef = _tplRef;
                        this._vcRef = _vcRef;
                    }
                    insertView() {
                        this._vcRef.createEmbeddedView(this._tplRef);
                    }
                    clear() {
                        this._vcRef.clear();
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-container><ng-template dir>Content</ng-template></ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _testDirective_decorators;
                let _testDirective_initializers = [];
                let _testDirective_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.testDirective = __runInitializers(this, _testDirective_initializers, void 0);
                        __runInitializers(this, _testDirective_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _testDirective_decorators = [(0, core_1.ViewChild)(TestDirective)];
                    __esDecorate(null, null, _testDirective_decorators, { kind: "field", name: "testDirective", static: false, private: false, access: { has: obj => "testDirective" in obj, get: obj => obj.testDirective, set: (obj, value) => { obj.testDirective = value; } }, metadata: _metadata }, _testDirective_initializers, _testDirective_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
            fixture.componentInstance.testDirective.insertView();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('Content');
            fixture.componentInstance.testDirective.clear();
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('');
        });
        it('should not set any attributes', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div><ng-container id="foo"></ng-container></div>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<div></div>');
        });
    });
    describe('text bindings', () => {
        it('should render "undefined" as ""', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{name}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'benoit';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('benoit');
            fixture.componentInstance.name = undefined;
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('');
        });
        it('should render "null" as ""', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{name}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'benoit';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('benoit');
            fixture.componentInstance.name = null;
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('');
        });
        it('should be able to render the result of a function called $any by using this', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{this.$any(1, 2)}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    $any(value, multiplier) {
                        return value * multiplier;
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('2');
        });
    });
    describe('ngNonBindable handling', () => {
        function stripNgNonBindable(str) {
            return str.replace(/ ngnonbindable=""/i, '');
        }
        it('should keep local ref for host element', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <b ngNonBindable #myRef id="my-id">
            <i>Hello {{ name }}!</i>
          </b>
          {{ myRef.id }}
        `,
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripNgNonBindable(fixture.nativeElement.innerHTML)).toEqual('<b id="my-id"><i>Hello {{ name }}!</i></b> my-id ');
        });
        it('should invoke directives for host element', () => {
            let directiveInvoked = false;
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[directive]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    ngOnInit() {
                        directiveInvoked = true;
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <b ngNonBindable directive>
            <i>Hello {{ name }}!</i>
          </b>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'World';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripNgNonBindable(fixture.nativeElement.innerHTML)).toEqual('<b directive=""><i>Hello {{ name }}!</i></b>');
            expect(directiveInvoked).toEqual(true);
        });
        it('should not invoke directives for nested elements', () => {
            let directiveInvoked = false;
            let TestDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[directive]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestDirective = _classThis = class {
                    ngOnInit() {
                        directiveInvoked = true;
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <b ngNonBindable>
            <i directive>Hello {{ name }}!</i>
          </b>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = 'World';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TestDirective] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(stripNgNonBindable(fixture.nativeElement.innerHTML)).toEqual('<b><i directive="">Hello {{ name }}!</i></b>');
            expect(directiveInvoked).toEqual(false);
        });
    });
    describe('Siblings update', () => {
        it('should handle a flat list of static/bound text nodes', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'Hello {{name}}!',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.componentInstance.name = 'world';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('Hello world!');
            fixture.componentInstance.name = 'monde';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('Hello monde!');
        });
        it('should handle a list of static/bound text nodes as element children', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<b>Hello {{name}}!</b>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.componentInstance.name = 'world';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b>Hello world!</b>');
            fixture.componentInstance.name = 'mundo';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b>Hello mundo!</b>');
        });
        it('should render/update text node as a child of a deep list of elements', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<b><b><b><b>Hello {{name}}!</b></b></b></b>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.componentInstance.name = 'world';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b><b><b><b>Hello world!</b></b></b></b>');
            fixture.componentInstance.name = 'mundo';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b><b><b><b>Hello mundo!</b></b></b></b>');
        });
        it('should update 2 sibling elements', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<b><span></span><span class="foo" [id]="id"></span></b>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.id = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.componentInstance.id = 'foo';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b><span></span><span class="foo" id="foo"></span></b>');
            fixture.componentInstance.id = 'bar';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<b><span></span><span class="foo" id="bar"></span></b>');
        });
        it('should handle sibling text node after element with child text node', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<p>hello</p>{{name}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.componentInstance.name = 'world';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<p>hello</p>world');
            fixture.componentInstance.name = 'mundo';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<p>hello</p>mundo');
        });
    });
    describe('basic components', () => {
        let TodoComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'todo',
                    template: '<p>Todo{{value}}</p>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TodoComponent = _classThis = class {
                constructor() {
                    this.value = ' one';
                }
            };
            __setFunctionName(_classThis, "TodoComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TodoComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TodoComponent = _classThis;
        })();
        it('should support a basic component template', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<todo></todo>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TodoComponent] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<todo><p>Todo one</p></todo>');
        });
        it('should support a component template with sibling', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<todo></todo>two',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TodoComponent] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<todo><p>Todo one</p></todo>two');
        });
        it('should support a component template with component sibling', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<todo></todo><todo></todo>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, TodoComponent] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<todo><p>Todo one</p></todo><todo><p>Todo one</p></todo>');
        });
        it('should support a component with binding on host element', () => {
            let TodoComponentHostBinding = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'todo',
                        template: '{{title}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _title_decorators;
                let _title_initializers = [];
                let _title_extraInitializers = [];
                var TodoComponentHostBinding = _classThis = class {
                    constructor() {
                        this.title = __runInitializers(this, _title_initializers, 'one');
                        __runInitializers(this, _title_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TodoComponentHostBinding");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _title_decorators = [(0, core_1.HostBinding)()];
                    __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TodoComponentHostBinding = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TodoComponentHostBinding = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<todo></todo>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _todoComponentHostBinding_decorators;
                let _todoComponentHostBinding_initializers = [];
                let _todoComponentHostBinding_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.todoComponentHostBinding = __runInitializers(this, _todoComponentHostBinding_initializers, void 0);
                        __runInitializers(this, _todoComponentHostBinding_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _todoComponentHostBinding_decorators = [(0, core_1.ViewChild)(TodoComponentHostBinding)];
                    __esDecorate(null, null, _todoComponentHostBinding_decorators, { kind: "field", name: "todoComponentHostBinding", static: false, private: false, access: { has: obj => "todoComponentHostBinding" in obj, get: obj => obj.todoComponentHostBinding, set: (obj, value) => { obj.todoComponentHostBinding = value; } }, metadata: _metadata }, _todoComponentHostBinding_initializers, _todoComponentHostBinding_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [App, TodoComponentHostBinding] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<todo title="one">one</todo>');
            fixture.componentInstance.todoComponentHostBinding.title = 'two';
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<todo title="two">two</todo>');
        });
        it('should support root component with host attribute', () => {
            let HostAttributeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'host-attr-comp',
                        template: '',
                        host: { 'role': 'button' },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostAttributeComp = _classThis = class {
                };
                __setFunctionName(_classThis, "HostAttributeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostAttributeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostAttributeComp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [HostAttributeComp] });
            const fixture = testing_2.TestBed.createComponent(HostAttributeComp);
            fixture.detectChanges();
            expect(fixture.nativeElement.getAttribute('role')).toEqual('button');
        });
        it('should support component with bindings in template', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<p>{{ name }}</p>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor() {
                        this.name = 'Bess';
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp></comp>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, MyComp] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('<comp><p>Bess</p></comp>');
        });
        it('should support a component with sub-views', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<div *ngIf="condition">text</div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _condition_decorators;
                let _condition_initializers = [];
                let _condition_extraInitializers = [];
                var MyComp = _classThis = class {
                    constructor() {
                        this.condition = __runInitializers(this, _condition_initializers, void 0);
                        __runInitializers(this, _condition_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _condition_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _condition_decorators, { kind: "field", name: "condition", static: false, private: false, access: { has: obj => "condition" in obj, get: obj => obj.condition, set: (obj, value) => { obj.condition = value; } }, metadata: _metadata }, _condition_initializers, _condition_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<comp [condition]="condition"></comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.condition = false;
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, MyComp], imports: [common_1.CommonModule] });
            const fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
            const compElement = fixture.nativeElement.querySelector('comp');
            fixture.componentInstance.condition = true;
            fixture.detectChanges();
            expect(stripHtmlComments(compElement.innerHTML)).toEqual('<div>text</div>');
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            expect(stripHtmlComments(compElement.innerHTML)).toEqual('');
        });
    });
    describe('element bindings', () => {
        describe('elementAttribute', () => {
            it('should support attribute bindings', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<button [attr.title]="title"></button>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.title = '';
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.title = 'Hello';
                fixture.detectChanges();
                // initial binding
                expect(fixture.nativeElement.innerHTML).toEqual('<button title="Hello"></button>');
                // update binding
                fixture.componentInstance.title = 'Hi!';
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<button title="Hi!"></button>');
                // remove attribute
                fixture.componentInstance.title = null;
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<button></button>');
            });
            it('should stringify values used attribute bindings', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<button [attr.title]="title"></button>',
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.title = NaN;
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<button title="NaN"></button>');
                fixture.componentInstance.title = { toString: () => 'Custom toString' };
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<button title="Custom toString"></button>');
            });
            it('should update bindings', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: [
                                'a:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[8]}}{{c[9]}}{{c[10]}}{{c[11]}}{{c[12]}}{{c[13]}}{{c[14]}}{{c[15]}}{{c[16]}}',
                                'a0:{{c[1]}}',
                                'a1:{{c[0]}}{{c[1]}}{{c[16]}}',
                                'a2:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[16]}}',
                                'a3:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[16]}}',
                                'a4:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[16]}}',
                                'a5:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[8]}}{{c[9]}}{{c[16]}}',
                                'a6:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[8]}}{{c[9]}}{{c[10]}}{{c[11]}}{{c[16]}}',
                                'a7:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[8]}}{{c[9]}}{{c[10]}}{{c[11]}}{{c[12]}}{{c[13]}}{{c[16]}}',
                                'a8:{{c[0]}}{{c[1]}}{{c[2]}}{{c[3]}}{{c[4]}}{{c[5]}}{{c[6]}}{{c[7]}}{{c[8]}}{{c[9]}}{{c[10]}}{{c[11]}}{{c[12]}}{{c[13]}}{{c[14]}}{{c[15]}}{{c[16]}}',
                            ].join('\n'),
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.c = ['(', 0, 'a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5, 'f', 6, 'g', 7, ')'];
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent.trim()).toEqual([
                    'a:(0a1b2c3d4e5f6g7)',
                    'a0:0',
                    'a1:(0)',
                    'a2:(0a1)',
                    'a3:(0a1b2)',
                    'a4:(0a1b2c3)',
                    'a5:(0a1b2c3d4)',
                    'a6:(0a1b2c3d4e5)',
                    'a7:(0a1b2c3d4e5f6)',
                    'a8:(0a1b2c3d4e5f6g7)',
                ].join('\n'));
                fixture.componentInstance.c.reverse();
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent.trim()).toEqual([
                    'a:)7g6f5e4d3c2b1a0(',
                    'a0:7',
                    'a1:)7(',
                    'a2:)7g6(',
                    'a3:)7g6f5(',
                    'a4:)7g6f5e4(',
                    'a5:)7g6f5e4d3(',
                    'a6:)7g6f5e4d3c2(',
                    'a7:)7g6f5e4d3c2b1(',
                    'a8:)7g6f5e4d3c2b1a0(',
                ].join('\n'));
                fixture.componentInstance.c.reverse();
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent.trim()).toEqual([
                    'a:(0a1b2c3d4e5f6g7)',
                    'a0:0',
                    'a1:(0)',
                    'a2:(0a1)',
                    'a3:(0a1b2)',
                    'a4:(0a1b2c3)',
                    'a5:(0a1b2c3d4)',
                    'a6:(0a1b2c3d4e5)',
                    'a7:(0a1b2c3d4e5f6)',
                    'a8:(0a1b2c3d4e5f6g7)',
                ].join('\n'));
            });
            it('should not update DOM if context has not changed', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
            <span [attr.title]="title">
              <b [attr.title]="title" *ngIf="shouldRender"></b>
            </span>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.title = '';
                            this.shouldRender = true;
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const span = fixture.nativeElement.querySelector('span');
                const bold = span.querySelector('b');
                fixture.componentInstance.title = 'Hello';
                fixture.detectChanges();
                // initial binding
                expect(span.getAttribute('title')).toBe('Hello');
                expect(bold.getAttribute('title')).toBe('Hello');
                // update DOM manually
                bold.setAttribute('title', 'Goodbye');
                // refresh with same binding
                fixture.detectChanges();
                expect(span.getAttribute('title')).toBe('Hello');
                expect(bold.getAttribute('title')).toBe('Goodbye');
                // refresh again with same binding
                fixture.detectChanges();
                expect(span.getAttribute('title')).toBe('Hello');
                expect(bold.getAttribute('title')).toBe('Goodbye');
            });
            it('should support host attribute bindings', () => {
                let HostBindingDir = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[hostBindingDir]',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _label_decorators;
                    let _label_initializers = [];
                    let _label_extraInitializers = [];
                    var HostBindingDir = _classThis = class {
                        constructor() {
                            this.label = __runInitializers(this, _label_initializers, 'some label');
                            __runInitializers(this, _label_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "HostBindingDir");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _label_decorators = [(0, core_1.HostBinding)('attr.aria-label')];
                        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        HostBindingDir = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return HostBindingDir = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div hostBindingDir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _hostBindingDir_decorators;
                    let _hostBindingDir_initializers = [];
                    let _hostBindingDir_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.hostBindingDir = __runInitializers(this, _hostBindingDir_initializers, void 0);
                            __runInitializers(this, _hostBindingDir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _hostBindingDir_decorators = [(0, core_1.ViewChild)(HostBindingDir)];
                        __esDecorate(null, null, _hostBindingDir_decorators, { kind: "field", name: "hostBindingDir", static: false, private: false, access: { has: obj => "hostBindingDir" in obj, get: obj => obj.hostBindingDir, set: (obj, value) => { obj.hostBindingDir = value; } }, metadata: _metadata }, _hostBindingDir_initializers, _hostBindingDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, HostBindingDir] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const hostBindingEl = fixture.nativeElement.querySelector('div');
                // Needs `toLowerCase`, because different browsers produce
                // attributes either in camel case or lower case.
                expect(hostBindingEl.getAttribute('aria-label')).toBe('some label');
                fixture.componentInstance.hostBindingDir.label = 'other label';
                fixture.detectChanges();
                expect(hostBindingEl.getAttribute('aria-label')).toBe('other label');
            });
        });
        describe('elementStyle', () => {
            it('should support binding to styles', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<span [style.font-size]="size"></span>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.size = '';
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.size = '10px';
                fixture.detectChanges();
                const span = fixture.nativeElement.querySelector('span');
                expect(span.style.fontSize).toBe('10px');
                fixture.componentInstance.size = '16px';
                fixture.detectChanges();
                expect(span.style.fontSize).toBe('16px');
                fixture.componentInstance.size = null;
                fixture.detectChanges();
                expect(span.style.fontSize).toBeFalsy();
            });
            it('should support binding to styles with suffix', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<span [style.font-size.px]="size"></span>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var App = _classThis = class {
                        constructor() {
                            this.size = '';
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.size = '100';
                fixture.detectChanges();
                const span = fixture.nativeElement.querySelector('span');
                expect(span.style.fontSize).toEqual('100px');
                fixture.componentInstance.size = 200;
                fixture.detectChanges();
                expect(span.style.fontSize).toEqual('200px');
                fixture.componentInstance.size = 0;
                fixture.detectChanges();
                expect(span.style.fontSize).toEqual('0px');
                fixture.componentInstance.size = null;
                fixture.detectChanges();
                expect(span.style.fontSize).toBeFalsy();
            });
        });
        describe('class-based styling', () => {
            it('should support CSS class toggle', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<span [class.active]="value"></span>',
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = true;
                fixture.detectChanges();
                const span = fixture.nativeElement.querySelector('span');
                expect(span.getAttribute('class')).toEqual('active');
                fixture.componentInstance.value = false;
                fixture.detectChanges();
                expect(span.getAttribute('class')).toBeFalsy();
                // truthy values
                fixture.componentInstance.value = 'a_string';
                fixture.detectChanges();
                expect(span.getAttribute('class')).toEqual('active');
                fixture.componentInstance.value = 10;
                fixture.detectChanges();
                expect(span.getAttribute('class')).toEqual('active');
                // falsy values
                fixture.componentInstance.value = '';
                fixture.detectChanges();
                expect(span.getAttribute('class')).toBeFalsy();
                fixture.componentInstance.value = 0;
                fixture.detectChanges();
                expect(span.getAttribute('class')).toBeFalsy();
            });
            it('should work correctly with existing static classes', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<span class="existing" [class.active]="value"></span>',
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
                testing_2.TestBed.configureTestingModule({ declarations: [App] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = true;
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<span class="existing active"></span>');
                fixture.componentInstance.value = false;
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toEqual('<span class="existing"></span>');
            });
            it('should apply classes properly when nodes are components', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'my-comp',
                            template: 'Comp Content',
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
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp [class.active]="value"></my-comp>',
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
                testing_2.TestBed.configureTestingModule({ declarations: [App, MyComp] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = true;
                fixture.detectChanges();
                const compElement = fixture.nativeElement.querySelector('my-comp');
                expect(fixture.nativeElement.textContent).toContain('Comp Content');
                expect(compElement.getAttribute('class')).toBe('active');
                fixture.componentInstance.value = false;
                fixture.detectChanges();
                expect(compElement.getAttribute('class')).toBeFalsy();
            });
            it('should apply classes properly when nodes have containers', () => {
                let StructuralComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'structural-comp',
                            template: 'Comp Content',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmp_decorators;
                    let _tmp_initializers = [];
                    let _tmp_extraInitializers = [];
                    var StructuralComp = _classThis = class {
                        constructor(vcr) {
                            this.vcr = vcr;
                            this.tmp = __runInitializers(this, _tmp_initializers, void 0);
                            __runInitializers(this, _tmp_extraInitializers);
                            this.vcr = vcr;
                        }
                        create() {
                            this.vcr.createEmbeddedView(this.tmp);
                        }
                    };
                    __setFunctionName(_classThis, "StructuralComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmp_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _tmp_decorators, { kind: "field", name: "tmp", static: false, private: false, access: { has: obj => "tmp" in obj, get: obj => obj.tmp, set: (obj, value) => { obj.tmp = value; } }, metadata: _metadata }, _tmp_initializers, _tmp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        StructuralComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return StructuralComp = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
            <ng-template #foo>Temp Content</ng-template>
            <structural-comp [class.active]="value" [tmp]="foo"></structural-comp>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _structuralComp_decorators;
                    let _structuralComp_initializers = [];
                    let _structuralComp_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.structuralComp = __runInitializers(this, _structuralComp_initializers, void 0);
                            this.value = __runInitializers(this, _structuralComp_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _structuralComp_decorators = [(0, core_1.ViewChild)(StructuralComp)];
                        __esDecorate(null, null, _structuralComp_decorators, { kind: "field", name: "structuralComp", static: false, private: false, access: { has: obj => "structuralComp" in obj, get: obj => obj.structuralComp, set: (obj, value) => { obj.structuralComp = value; } }, metadata: _metadata }, _structuralComp_initializers, _structuralComp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, StructuralComp] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = true;
                fixture.detectChanges();
                const structuralCompEl = fixture.nativeElement.querySelector('structural-comp');
                expect(structuralCompEl.getAttribute('class')).toEqual('active');
                fixture.componentInstance.structuralComp.create();
                fixture.detectChanges();
                expect(structuralCompEl.getAttribute('class')).toEqual('active');
                fixture.componentInstance.value = false;
                fixture.detectChanges();
                expect(structuralCompEl.getAttribute('class')).toBeFalsy();
            });
            let DirWithClassDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[DirWithClass]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_klass_decorators;
                var DirWithClassDirective = _classThis = class {
                    constructor() {
                        this.classesVal = (__runInitializers(this, _instanceExtraInitializers), '');
                    }
                    set klass(value) {
                        this.classesVal = value;
                    }
                };
                __setFunctionName(_classThis, "DirWithClassDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_klass_decorators = [(0, core_1.Input)('class')];
                    __esDecorate(_classThis, null, _set_klass_decorators, { kind: "setter", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirWithClassDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirWithClassDirective = _classThis;
            })();
            let DirWithStyleDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[DirWithStyle]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_style_decorators;
                var DirWithStyleDirective = _classThis = class {
                    constructor() {
                        this.stylesVal = (__runInitializers(this, _instanceExtraInitializers), '');
                    }
                    set style(value) {
                        this.stylesVal = value;
                    }
                };
                __setFunctionName(_classThis, "DirWithStyleDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_style_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_style_decorators, { kind: "setter", name: "style", static: false, private: false, access: { has: obj => "style" in obj, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DirWithStyleDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DirWithStyleDirective = _classThis;
            })();
            it('should delegate initial classes to a [class] input binding if present on a directive on the same element', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div class="apple orange banana" DirWithClass></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _mockClassDirective_decorators;
                    let _mockClassDirective_initializers = [];
                    let _mockClassDirective_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.mockClassDirective = __runInitializers(this, _mockClassDirective_initializers, void 0);
                            __runInitializers(this, _mockClassDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _mockClassDirective_decorators = [(0, core_1.ViewChild)(DirWithClassDirective)];
                        __esDecorate(null, null, _mockClassDirective_decorators, { kind: "field", name: "mockClassDirective", static: false, private: false, access: { has: obj => "mockClassDirective" in obj, get: obj => obj.mockClassDirective, set: (obj, value) => { obj.mockClassDirective = value; } }, metadata: _metadata }, _mockClassDirective_initializers, _mockClassDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithClassDirective] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                // the initial values always get sorted in non VE code
                // but there is no sorting guarantee within VE code
                expect(fixture.componentInstance.mockClassDirective.classesVal.split(/\s+/).sort()).toEqual(['apple', 'banana', 'orange']);
            });
            it('should delegate initial styles to a [style] input binding if present on a directive on the same element', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div style="width: 100px; height: 200px" DirWithStyle></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _mockStyleDirective_decorators;
                    let _mockStyleDirective_initializers = [];
                    let _mockStyleDirective_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.mockStyleDirective = __runInitializers(this, _mockStyleDirective_initializers, void 0);
                            __runInitializers(this, _mockStyleDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _mockStyleDirective_decorators = [(0, core_1.ViewChild)(DirWithStyleDirective)];
                        __esDecorate(null, null, _mockStyleDirective_decorators, { kind: "field", name: "mockStyleDirective", static: false, private: false, access: { has: obj => "mockStyleDirective" in obj, get: obj => obj.mockStyleDirective, set: (obj, value) => { obj.mockStyleDirective = value; } }, metadata: _metadata }, _mockStyleDirective_initializers, _mockStyleDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithStyleDirective] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const styles = fixture.componentInstance.mockStyleDirective.stylesVal;
                expect(styles).toEqual('width: 100px; height: 200px;');
            });
            it('should update `[class]` and bindings in the provided directive if the input is matched', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div DirWithClass [class]="value"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _mockClassDirective_decorators;
                    let _mockClassDirective_initializers = [];
                    let _mockClassDirective_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.mockClassDirective = __runInitializers(this, _mockClassDirective_initializers, void 0);
                            this.value = (__runInitializers(this, _mockClassDirective_extraInitializers), '');
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _mockClassDirective_decorators = [(0, core_1.ViewChild)(DirWithClassDirective)];
                        __esDecorate(null, null, _mockClassDirective_decorators, { kind: "field", name: "mockClassDirective", static: false, private: false, access: { has: obj => "mockClassDirective" in obj, get: obj => obj.mockClassDirective, set: (obj, value) => { obj.mockClassDirective = value; } }, metadata: _metadata }, _mockClassDirective_initializers, _mockClassDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithClassDirective] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = 'cucumber grape';
                fixture.detectChanges();
                expect(fixture.componentInstance.mockClassDirective.classesVal).toEqual('cucumber grape');
            });
            it('should update `[style]` and bindings in the provided directive if the input is matched', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div DirWithStyle [style]="value"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _mockStyleDirective_decorators;
                    let _mockStyleDirective_initializers = [];
                    let _mockStyleDirective_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.mockStyleDirective = __runInitializers(this, _mockStyleDirective_initializers, void 0);
                            this.value = __runInitializers(this, _mockStyleDirective_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _mockStyleDirective_decorators = [(0, core_1.ViewChild)(DirWithStyleDirective)];
                        __esDecorate(null, null, _mockStyleDirective_decorators, { kind: "field", name: "mockStyleDirective", static: false, private: false, access: { has: obj => "mockStyleDirective" in obj, get: obj => obj.mockStyleDirective, set: (obj, value) => { obj.mockStyleDirective = value; } }, metadata: _metadata }, _mockStyleDirective_initializers, _mockStyleDirective_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithStyleDirective] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.componentInstance.value = { width: '200px', height: '500px' };
                fixture.detectChanges();
                expect(fixture.componentInstance.mockStyleDirective.stylesVal).toEqual({
                    width: '200px',
                    height: '500px',
                });
            });
            it('should apply initial styling to the element that contains the directive with host styling', () => {
                let DirWithInitialStyling = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[DirWithInitialStyling]',
                            host: {
                                'title': 'foo',
                                'class': 'heavy golden',
                                'style': 'color: purple',
                                '[style.font-weight]': '"bold"',
                            },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirWithInitialStyling = _classThis = class {
                    };
                    __setFunctionName(_classThis, "DirWithInitialStyling");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirWithInitialStyling = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirWithInitialStyling = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
                <div DirWithInitialStyling
                  class="big"
                  style="color:black; font-size:200px"></div>
             `,
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
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithInitialStyling] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const target = fixture.nativeElement.querySelector('div');
                const classes = target.getAttribute('class').split(/\s+/).sort();
                expect(classes).toEqual(['big', 'golden', 'heavy']);
                expect(target.getAttribute('title')).toEqual('foo');
                expect(target.style.getPropertyValue('color')).toEqual('black');
                expect(target.style.getPropertyValue('font-size')).toEqual('200px');
                expect(target.style.getPropertyValue('font-weight')).toEqual('bold');
            });
            it("should apply single styling bindings present within a directive onto the same element and defer the element's initial styling values when missing", () => {
                let DirWithSingleStylingBindings = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[DirWithSingleStylingBindings]',
                            host: {
                                'class': 'def',
                                '[class.xyz]': 'activateXYZClass',
                                '[style.width]': 'width',
                                '[style.height]': 'height',
                            },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DirWithSingleStylingBindings = _classThis = class {
                        constructor() {
                            this.width = undefined;
                            this.height = undefined;
                            this.activateXYZClass = false;
                        }
                    };
                    __setFunctionName(_classThis, "DirWithSingleStylingBindings");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DirWithSingleStylingBindings = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DirWithSingleStylingBindings = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
              <div DirWithSingleStylingBindings class="abc" style="width:100px;"></div>
            `,
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
                            __runInitializers(this, _dirInstance_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _dirInstance_decorators = [(0, core_1.ViewChild)(DirWithSingleStylingBindings)];
                        __esDecorate(null, null, _dirInstance_decorators, { kind: "field", name: "dirInstance", static: false, private: false, access: { has: obj => "dirInstance" in obj, get: obj => obj.dirInstance, set: (obj, value) => { obj.dirInstance = value; } }, metadata: _metadata }, _dirInstance_initializers, _dirInstance_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, DirWithSingleStylingBindings] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const dirInstance = fixture.componentInstance.dirInstance;
                const target = fixture.nativeElement.querySelector('div');
                expect(target.style.getPropertyValue('width')).toEqual('100px');
                expect(target.style.getPropertyValue('height')).toEqual('');
                expect(target.classList.contains('abc')).toBeTruthy();
                expect(target.classList.contains('def')).toBeTruthy();
                expect(target.classList.contains('xyz')).toBeFalsy();
                dirInstance.width = '444px';
                dirInstance.height = '999px';
                dirInstance.activateXYZClass = true;
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('100px');
                expect(target.style.getPropertyValue('height')).toEqual('999px');
                expect(target.classList.contains('abc')).toBeTruthy();
                expect(target.classList.contains('def')).toBeTruthy();
                expect(target.classList.contains('xyz')).toBeTruthy();
                dirInstance.width = undefined;
                dirInstance.height = undefined;
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('100px');
                expect(target.style.getPropertyValue('height')).toEqual('');
                expect(target.classList.contains('abc')).toBeTruthy();
                expect(target.classList.contains('def')).toBeTruthy();
                expect(target.classList.contains('xyz')).toBeTruthy();
            });
            it('should properly prioritize single style binding collisions when they exist on multiple directives', () => {
                let Dir1WithStyle = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[Dir1WithStyle]',
                            host: { '[style.width]': 'width' },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir1WithStyle = _classThis = class {
                        constructor() {
                            this.width = undefined;
                        }
                    };
                    __setFunctionName(_classThis, "Dir1WithStyle");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir1WithStyle = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir1WithStyle = _classThis;
                })();
                let Dir2WithStyle = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[Dir2WithStyle]',
                            host: { 'style': 'width: 111px', '[style.width]': 'width' },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir2WithStyle = _classThis = class {
                        constructor() {
                            this.width = undefined;
                        }
                    };
                    __setFunctionName(_classThis, "Dir2WithStyle");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir2WithStyle = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir2WithStyle = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div Dir1WithStyle Dir2WithStyle [style.width]="width"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _dir1Instance_decorators;
                    let _dir1Instance_initializers = [];
                    let _dir1Instance_extraInitializers = [];
                    let _dir2Instance_decorators;
                    let _dir2Instance_initializers = [];
                    let _dir2Instance_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.dir1Instance = __runInitializers(this, _dir1Instance_initializers, void 0);
                            this.dir2Instance = (__runInitializers(this, _dir1Instance_extraInitializers), __runInitializers(this, _dir2Instance_initializers, void 0));
                            this.width = (__runInitializers(this, _dir2Instance_extraInitializers), undefined);
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _dir1Instance_decorators = [(0, core_1.ViewChild)(Dir1WithStyle)];
                        _dir2Instance_decorators = [(0, core_1.ViewChild)(Dir2WithStyle)];
                        __esDecorate(null, null, _dir1Instance_decorators, { kind: "field", name: "dir1Instance", static: false, private: false, access: { has: obj => "dir1Instance" in obj, get: obj => obj.dir1Instance, set: (obj, value) => { obj.dir1Instance = value; } }, metadata: _metadata }, _dir1Instance_initializers, _dir1Instance_extraInitializers);
                        __esDecorate(null, null, _dir2Instance_decorators, { kind: "field", name: "dir2Instance", static: false, private: false, access: { has: obj => "dir2Instance" in obj, get: obj => obj.dir2Instance, set: (obj, value) => { obj.dir2Instance = value; } }, metadata: _metadata }, _dir2Instance_initializers, _dir2Instance_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, Dir2WithStyle, Dir1WithStyle] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const { dir1Instance, dir2Instance } = fixture.componentInstance;
                const target = fixture.nativeElement.querySelector('div');
                expect(target.style.getPropertyValue('width')).toEqual('111px');
                fixture.componentInstance.width = '999px';
                dir1Instance.width = '222px';
                dir2Instance.width = '333px';
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('999px');
                fixture.componentInstance.width = undefined;
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('222px');
                dir1Instance.width = undefined;
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('333px');
                dir2Instance.width = undefined;
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('111px');
                dir1Instance.width = '666px';
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('666px');
                fixture.componentInstance.width = '777px';
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('777px');
            });
            it('should properly prioritize multi style binding collisions when they exist on multiple directives', () => {
                let Dir1WithStyling = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[Dir1WithStyling]',
                            host: { '[style]': 'stylesExp', '[class]': 'classesExp' },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir1WithStyling = _classThis = class {
                        constructor() {
                            this.classesExp = {};
                            this.stylesExp = {};
                        }
                    };
                    __setFunctionName(_classThis, "Dir1WithStyling");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir1WithStyling = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir1WithStyling = _classThis;
                })();
                let Dir2WithStyling = (() => {
                    let _classDecorators = [(0, core_1.Directive)({
                            selector: '[Dir2WithStyling]',
                            host: { 'style': 'width: 111px', '[style]': 'stylesExp' },
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Dir2WithStyling = _classThis = class {
                        constructor() {
                            this.stylesExp = {};
                        }
                    };
                    __setFunctionName(_classThis, "Dir2WithStyling");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Dir2WithStyling = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Dir2WithStyling = _classThis;
                })();
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<div Dir1WithStyling Dir2WithStyling [style]="stylesExp" [class]="classesExp"></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _dir1Instance_decorators;
                    let _dir1Instance_initializers = [];
                    let _dir1Instance_extraInitializers = [];
                    let _dir2Instance_decorators;
                    let _dir2Instance_initializers = [];
                    let _dir2Instance_extraInitializers = [];
                    var App = _classThis = class {
                        constructor() {
                            this.dir1Instance = __runInitializers(this, _dir1Instance_initializers, void 0);
                            this.dir2Instance = (__runInitializers(this, _dir1Instance_extraInitializers), __runInitializers(this, _dir2Instance_initializers, void 0));
                            this.stylesExp = (__runInitializers(this, _dir2Instance_extraInitializers), {});
                            this.classesExp = {};
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _dir1Instance_decorators = [(0, core_1.ViewChild)(Dir1WithStyling)];
                        _dir2Instance_decorators = [(0, core_1.ViewChild)(Dir2WithStyling)];
                        __esDecorate(null, null, _dir1Instance_decorators, { kind: "field", name: "dir1Instance", static: false, private: false, access: { has: obj => "dir1Instance" in obj, get: obj => obj.dir1Instance, set: (obj, value) => { obj.dir1Instance = value; } }, metadata: _metadata }, _dir1Instance_initializers, _dir1Instance_extraInitializers);
                        __esDecorate(null, null, _dir2Instance_decorators, { kind: "field", name: "dir2Instance", static: false, private: false, access: { has: obj => "dir2Instance" in obj, get: obj => obj.dir2Instance, set: (obj, value) => { obj.dir2Instance = value; } }, metadata: _metadata }, _dir2Instance_initializers, _dir2Instance_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_2.TestBed.configureTestingModule({ declarations: [App, Dir2WithStyling, Dir1WithStyling] });
                const fixture = testing_2.TestBed.createComponent(App);
                fixture.detectChanges();
                const { dir1Instance, dir2Instance } = fixture.componentInstance;
                const target = fixture.nativeElement.querySelector('div');
                expect(target.style.getPropertyValue('width')).toEqual('111px');
                const compInstance = fixture.componentInstance;
                compInstance.stylesExp = { width: '999px', height: undefined };
                compInstance.classesExp = { one: true, two: false };
                dir1Instance.stylesExp = { width: '222px' };
                dir1Instance.classesExp = { two: true, three: false };
                dir2Instance.stylesExp = { width: '333px', height: '100px' };
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('999px');
                expect(target.style.getPropertyValue('height')).toEqual('100px');
                expect(target.classList.contains('one')).toBeTruthy();
                expect(target.classList.contains('two')).toBeFalsy();
                expect(target.classList.contains('three')).toBeFalsy();
                compInstance.stylesExp = {};
                compInstance.classesExp = {};
                dir1Instance.stylesExp = { width: '222px', height: '200px' };
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('222px');
                expect(target.style.getPropertyValue('height')).toEqual('200px');
                expect(target.classList.contains('one')).toBeFalsy();
                expect(target.classList.contains('two')).toBeTruthy();
                expect(target.classList.contains('three')).toBeFalsy();
                dir1Instance.stylesExp = {};
                dir1Instance.classesExp = {};
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('333px');
                expect(target.style.getPropertyValue('height')).toEqual('100px');
                expect(target.classList.contains('one')).toBeFalsy();
                expect(target.classList.contains('two')).toBeFalsy();
                expect(target.classList.contains('three')).toBeFalsy();
                dir2Instance.stylesExp = {};
                compInstance.stylesExp = { height: '900px' };
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('111px');
                expect(target.style.getPropertyValue('height')).toEqual('900px');
                dir1Instance.stylesExp = { width: '666px', height: '600px' };
                dir1Instance.classesExp = { four: true, one: true };
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('666px');
                expect(target.style.getPropertyValue('height')).toEqual('900px');
                expect(target.classList.contains('one')).toBeTruthy();
                expect(target.classList.contains('two')).toBeFalsy();
                expect(target.classList.contains('three')).toBeFalsy();
                expect(target.classList.contains('four')).toBeTruthy();
                compInstance.stylesExp = { width: '777px' };
                compInstance.classesExp = { four: false };
                fixture.detectChanges();
                expect(target.style.getPropertyValue('width')).toEqual('777px');
                expect(target.style.getPropertyValue('height')).toEqual('600px');
                expect(target.classList.contains('one')).toBeTruthy();
                expect(target.classList.contains('two')).toBeFalsy();
                expect(target.classList.contains('three')).toBeFalsy();
                expect(target.classList.contains('four')).toBeFalsy();
            });
        });
        it('should properly handle and render interpolation for class attribute bindings', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div class="-{{name}}-{{age}}-"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.name = '';
                        this.age = '';
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
            testing_2.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_2.TestBed.createComponent(App);
            const target = fixture.nativeElement.querySelector('div');
            expect(target.classList.contains('-fred-36-')).toBeFalsy();
            fixture.componentInstance.name = 'fred';
            fixture.componentInstance.age = '36';
            fixture.detectChanges();
            expect(target.classList.contains('-fred-36-')).toBeTruthy();
        });
    });
    describe('NgModule assertions', () => {
        it('should throw with descriptive error message when a module imports itself', () => {
            let FixtureComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FixtureComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "FixtureComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FixtureComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FixtureComponent = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [SomeModule], declarations: [FixtureComponent] })];
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
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [SomeModule] }).createComponent(FixtureComponent);
            }).toThrowError(`'SomeModule' module can't import itself`);
        });
        it('should throw with descriptive error message when a directive is passed to imports', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
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
            let ModuleWithImportedComponent = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [SomeComponent] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleWithImportedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleWithImportedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleWithImportedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleWithImportedComponent = _classThis;
            })();
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [ModuleWithImportedComponent] }).createComponent(SomeComponent);
            }).toThrowError(/^Unexpected directive 'SomeComponent' imported by the module 'ModuleWithImportedComponent'\. Please add an @NgModule annotation\.$/);
        });
        it('should throw with descriptive error message when a pipe is passed to imports', () => {
            let FixtureComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FixtureComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "FixtureComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FixtureComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FixtureComponent = _classThis;
            })();
            let SomePipe = (() => {
                let _classDecorators = [(0, core_1.Pipe)({
                        name: 'somePipe',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomePipe = _classThis = class {
                };
                __setFunctionName(_classThis, "SomePipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomePipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomePipe = _classThis;
            })();
            let ModuleWithImportedPipe = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [SomePipe], declarations: [FixtureComponent] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleWithImportedPipe = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleWithImportedPipe");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleWithImportedPipe = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleWithImportedPipe = _classThis;
            })();
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [ModuleWithImportedPipe] }).createComponent(FixtureComponent);
            }).toThrowError(/^Unexpected pipe 'SomePipe' imported by the module 'ModuleWithImportedPipe'\. Please add an @NgModule annotation\.$/);
        });
        it('should throw with descriptive error message when a module is passed to declarations', () => {
            let FixtureComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FixtureComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "FixtureComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FixtureComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FixtureComponent = _classThis;
            })();
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({})];
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
            let ModuleWithDeclaredModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeModule, FixtureComponent] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleWithDeclaredModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleWithDeclaredModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleWithDeclaredModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleWithDeclaredModule = _classThis;
            })();
            const expectedErrorMessage = `Unexpected value 'SomeModule' declared by the module 'ModuleWithDeclaredModule'. Please add a @Pipe/@Directive/@Component annotation.`;
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [ModuleWithDeclaredModule] }).createComponent(FixtureComponent);
            }).toThrowError(expectedErrorMessage);
        });
        it('should throw with descriptive error message when a declaration is missing annotation', () => {
            let FixtureComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FixtureComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "FixtureComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FixtureComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FixtureComponent = _classThis;
            })();
            class SomeClass {
            }
            let SomeModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [SomeClass, FixtureComponent] })];
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
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [SomeModule] }).createComponent(FixtureComponent);
            }).toThrowError(`Unexpected value 'SomeClass' declared by the module 'SomeModule'. Please add a @Pipe/@Directive/@Component annotation.`);
        });
        it('should throw with descriptive error message when an imported module is missing annotation', () => {
            let FixtureComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FixtureComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "FixtureComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FixtureComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FixtureComponent = _classThis;
            })();
            class SomeModule {
            }
            let ModuleWithImportedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [SomeModule], declarations: [FixtureComponent] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ModuleWithImportedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ModuleWithImportedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ModuleWithImportedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ModuleWithImportedModule = _classThis;
            })();
            expect(() => {
                testing_2.TestBed.configureTestingModule({ imports: [ModuleWithImportedModule] }).createComponent(FixtureComponent);
            }).toThrowError(/^Unexpected value 'SomeModule' imported by the module 'ModuleWithImportedModule'\. Please add an @NgModule annotation\.$/);
        });
    });
    describe('self-closing tags', () => {
        it('should allow a self-closing tag for a custom tag name', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: 'hello',
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp/>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, MyComp] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(fixture.nativeElement.innerHTML).toEqual('<my-comp>hello</my-comp>');
        });
        it('should not confuse self-closing tag for an end tag', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '<ng-content/>',
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<my-comp title="a">Before<my-comp title="b"/>After</my-comp>',
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
            testing_2.TestBed.configureTestingModule({ declarations: [App, MyComp] });
            const fixture = testing_2.TestBed.createComponent(App);
            expect(fixture.nativeElement.innerHTML).toEqual('<my-comp title="a">Before<my-comp title="b"></my-comp>After</my-comp>');
        });
    });
    it('should only call inherited host listeners once', () => {
        let clicks = 0;
        let ButtonSuperClass = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _clicked_decorators;
            var ButtonSuperClass = _classThis = class {
                clicked() {
                    clicks++;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "ButtonSuperClass");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _clicked_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _clicked_decorators, { kind: "method", name: "clicked", static: false, private: false, access: { has: obj => "clicked" in obj, get: obj => obj.clicked }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ButtonSuperClass = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ButtonSuperClass = _classThis;
        })();
        let ButtonSubClass = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'button[custom-button]',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = ButtonSuperClass;
            var ButtonSubClass = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "ButtonSubClass");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ButtonSubClass = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ButtonSubClass = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button custom-button></button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
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
        testing_2.TestBed.configureTestingModule({ declarations: [MyApp, ButtonSuperClass, ButtonSubClass] });
        const fixture = testing_2.TestBed.createComponent(MyApp);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(ButtonSubClass));
        fixture.detectChanges();
        button.nativeElement.click();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should support inherited view queries', () => {
        let SomeDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[someDir]',
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
        let SuperComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div someDir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dirs_decorators;
            let _dirs_initializers = [];
            let _dirs_extraInitializers = [];
            var SuperComp = _classThis = class {
                constructor() {
                    this.dirs = __runInitializers(this, _dirs_initializers, void 0);
                    __runInitializers(this, _dirs_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "SuperComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dirs_decorators = [(0, core_1.ViewChildren)(SomeDir)];
                __esDecorate(null, null, _dirs_decorators, { kind: "field", name: "dirs", static: false, private: false, access: { has: obj => "dirs" in obj, get: obj => obj.dirs, set: (obj, value) => { obj.dirs = value; } }, metadata: _metadata }, _dirs_initializers, _dirs_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperComp = _classThis;
        })();
        let SubComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'button[custom-button]',
                    template: '<div someDir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperComp;
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
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button custom-button></button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
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
        testing_2.TestBed.configureTestingModule({ declarations: [MyApp, SuperComp, SubComp, SomeDir] });
        const fixture = testing_2.TestBed.createComponent(MyApp);
        const subInstance = fixture.debugElement.query(platform_browser_1.By.directive(SubComp)).componentInstance;
        fixture.detectChanges();
        expect(subInstance.dirs.length).toBe(1);
        expect(subInstance.dirs.first).toBeInstanceOf(SomeDir);
    });
    it('should not set inputs after destroy', () => {
        let NoAssignAfterDestroy = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[no-assign-after-destroy]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _get_value_decorators;
            var NoAssignAfterDestroy = _classThis = class {
                constructor() {
                    this._isDestroyed = (__runInitializers(this, _instanceExtraInitializers), false);
                }
                get value() {
                    return this._value;
                }
                set value(newValue) {
                    if (this._isDestroyed) {
                        throw Error('Cannot assign to value after destroy.');
                    }
                    this._value = newValue;
                }
                ngOnDestroy() {
                    this._isDestroyed = true;
                }
            };
            __setFunctionName(_classThis, "NoAssignAfterDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _get_value_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NoAssignAfterDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NoAssignAfterDestroy = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div no-assign-after-destroy [value]="directiveValue"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.directiveValue = 'initial-value';
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
        testing_2.TestBed.configureTestingModule({ declarations: [NoAssignAfterDestroy, App] });
        let fixture = testing_2.TestBed.createComponent(App);
        fixture.destroy();
        expect(() => {
            fixture = testing_2.TestBed.createComponent(App);
            fixture.detectChanges();
        }).not.toThrow();
    });
    it('should support host attribute and @ContentChild on the same component', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    template: `foo`,
                    host: { '[attr.aria-disabled]': 'true' },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _tpl_decorators;
            let _tpl_initializers = [];
            let _tpl_extraInitializers = [];
            var TestComponent = _classThis = class {
                constructor() {
                    this.tpl = __runInitializers(this, _tpl_initializers, void 0);
                    __runInitializers(this, _tpl_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _tpl_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
                __esDecorate(null, null, _tpl_decorators, { kind: "field", name: "tpl", static: false, private: false, access: { has: obj => "tpl" in obj, get: obj => obj.tpl, set: (obj, value) => { obj.tpl = value; } }, metadata: _metadata }, _tpl_initializers, _tpl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [TestComponent] });
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.tpl).not.toBeNull();
        expect(fixture.debugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });
    it('should inherit inputs from undecorated superclasses', () => {
        let ButtonSuperClass = (() => {
            var _a;
            let _isDisabled_decorators;
            let _isDisabled_initializers = [];
            let _isDisabled_extraInitializers = [];
            return _a = class ButtonSuperClass {
                    constructor() {
                        this.isDisabled = __runInitializers(this, _isDisabled_initializers, void 0);
                        __runInitializers(this, _isDisabled_extraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _isDisabled_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _isDisabled_decorators, { kind: "field", name: "isDisabled", static: false, private: false, access: { has: obj => "isDisabled" in obj, get: obj => obj.isDisabled, set: (obj, value) => { obj.isDisabled = value; } }, metadata: _metadata }, _isDisabled_initializers, _isDisabled_extraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        let ButtonSubClass = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'button[custom-button]',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = ButtonSuperClass;
            var ButtonSubClass = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "ButtonSubClass");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ButtonSubClass = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ButtonSubClass = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button custom-button [isDisabled]="disableButton"></button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.disableButton = false;
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
        testing_2.TestBed.configureTestingModule({ declarations: [MyApp, ButtonSubClass] });
        const fixture = testing_2.TestBed.createComponent(MyApp);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(ButtonSubClass)).componentInstance;
        fixture.detectChanges();
        expect(button.isDisabled).toBe(false);
        fixture.componentInstance.disableButton = true;
        fixture.detectChanges();
        expect(button.isDisabled).toBe(true);
    });
    it('should inherit outputs from undecorated superclasses', () => {
        let clicks = 0;
        let ButtonSuperClass = (() => {
            var _a;
            let _clicked_decorators;
            let _clicked_initializers = [];
            let _clicked_extraInitializers = [];
            return _a = class ButtonSuperClass {
                    emitClick() {
                        this.clicked.emit();
                    }
                    constructor() {
                        this.clicked = __runInitializers(this, _clicked_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _clicked_extraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _clicked_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _clicked_decorators, { kind: "field", name: "clicked", static: false, private: false, access: { has: obj => "clicked" in obj, get: obj => obj.clicked, set: (obj, value) => { obj.clicked = value; } }, metadata: _metadata }, _clicked_initializers, _clicked_extraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        let ButtonSubClass = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'button[custom-button]',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = ButtonSuperClass;
            var ButtonSubClass = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "ButtonSubClass");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ButtonSubClass = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ButtonSubClass = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button custom-button (clicked)="handleClick()"></button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                handleClick() {
                    clicks++;
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
        testing_2.TestBed.configureTestingModule({ declarations: [MyApp, ButtonSubClass] });
        const fixture = testing_2.TestBed.createComponent(MyApp);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(ButtonSubClass)).componentInstance;
        button.emitClick();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should inherit host bindings from undecorated superclasses', () => {
        let BaseButton = (() => {
            var _a;
            let _tabindex_decorators;
            let _tabindex_initializers = [];
            let _tabindex_extraInitializers = [];
            return _a = class BaseButton {
                    constructor() {
                        this.tabindex = __runInitializers(this, _tabindex_initializers, -1);
                        __runInitializers(this, _tabindex_extraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tabindex_decorators = [(0, core_1.HostBinding)('attr.tabindex')];
                    __esDecorate(null, null, _tabindex_decorators, { kind: "field", name: "tabindex", static: false, private: false, access: { has: obj => "tabindex" in obj, get: obj => obj.tabindex, set: (obj, value) => { obj.tabindex = value; } }, metadata: _metadata }, _tabindex_initializers, _tabindex_extraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[sub-button]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button sub-button>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [SubButton, App] });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton));
        fixture.detectChanges();
        expect(button.nativeElement.getAttribute('tabindex')).toBe('-1');
        button.componentInstance.tabindex = 2;
        fixture.detectChanges();
        expect(button.nativeElement.getAttribute('tabindex')).toBe('2');
    });
    it('should inherit host bindings from undecorated grand superclasses', () => {
        let SuperBaseButton = (() => {
            var _a;
            let _tabindex_decorators;
            let _tabindex_initializers = [];
            let _tabindex_extraInitializers = [];
            return _a = class SuperBaseButton {
                    constructor() {
                        this.tabindex = __runInitializers(this, _tabindex_initializers, -1);
                        __runInitializers(this, _tabindex_extraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _tabindex_decorators = [(0, core_1.HostBinding)('attr.tabindex')];
                    __esDecorate(null, null, _tabindex_decorators, { kind: "field", name: "tabindex", static: false, private: false, access: { has: obj => "tabindex" in obj, get: obj => obj.tabindex, set: (obj, value) => { obj.tabindex = value; } }, metadata: _metadata }, _tabindex_initializers, _tabindex_extraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        class BaseButton extends SuperBaseButton {
        }
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[sub-button]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button sub-button>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [SubButton, App] });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton));
        fixture.detectChanges();
        expect(button.nativeElement.getAttribute('tabindex')).toBe('-1');
        button.componentInstance.tabindex = 2;
        fixture.detectChanges();
        expect(button.nativeElement.getAttribute('tabindex')).toBe('2');
    });
    it('should inherit host listeners from undecorated superclasses', () => {
        let clicks = 0;
        let BaseButton = (() => {
            var _a;
            let _instanceExtraInitializers = [];
            let _handleClick_decorators;
            return _a = class BaseButton {
                    handleClick() {
                        clicks++;
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _handleClick_decorators = [(0, core_1.HostListener)('click')];
                    __esDecorate(_a, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[sub-button]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button sub-button>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [SubButton, App] });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should inherit host listeners from superclasses once', () => {
        let clicks = 0;
        let BaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[baseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _handleClick_decorators;
            var BaseButton = _classThis = class {
                handleClick() {
                    clicks++;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "BaseButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _handleClick_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BaseButton = _classThis;
        })();
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[subButton]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button subButton>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [SubButton, BaseButton, App] });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should inherit host listeners from grand superclasses once', () => {
        let clicks = 0;
        let SuperBaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[superBaseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _handleClick_decorators;
            var SuperBaseButton = _classThis = class {
                handleClick() {
                    clicks++;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "SuperBaseButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _handleClick_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperBaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperBaseButton = _classThis;
        })();
        let BaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[baseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperBaseButton;
            var BaseButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "BaseButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BaseButton = _classThis;
        })();
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[subButton]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button subButton>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [SubButton, SuperBaseButton, BaseButton, App] });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should inherit host listeners from grand grand superclasses once', () => {
        let clicks = 0;
        let SuperSuperBaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[superSuperBaseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _handleClick_decorators;
            var SuperSuperBaseButton = _classThis = class {
                handleClick() {
                    clicks++;
                }
                constructor() {
                    __runInitializers(this, _instanceExtraInitializers);
                }
            };
            __setFunctionName(_classThis, "SuperSuperBaseButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _handleClick_decorators = [(0, core_1.HostListener)('click')];
                __esDecorate(_classThis, null, _handleClick_decorators, { kind: "method", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperSuperBaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperSuperBaseButton = _classThis;
        })();
        let SuperBaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[superBaseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperSuperBaseButton;
            var SuperBaseButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SuperBaseButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SuperBaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SuperBaseButton = _classThis;
        })();
        let BaseButton = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[baseButton]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = SuperBaseButton;
            var BaseButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "BaseButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BaseButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BaseButton = _classThis;
        })();
        let SubButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: '[subButton]',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseButton;
            var SubButton = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "SubButton");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SubButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SubButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button subButton>Click me</button>',
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
        testing_2.TestBed.configureTestingModule({
            declarations: [SubButton, SuperBaseButton, SuperSuperBaseButton, BaseButton, App],
        });
        const fixture = testing_2.TestBed.createComponent(App);
        const button = fixture.debugElement.query(platform_browser_1.By.directive(SubButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(clicks).toBe(1);
    });
    it('should not mask errors thrown during lifecycle hooks', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    inputs: ['dir'],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                get dir() {
                    return null;
                }
                set dir(value) {
                    throw new Error('this error is expected');
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
        let Cmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [dir]="3"></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Cmp = _classThis = class {
                ngAfterViewInit() {
                    // This lifecycle hook should never run, since attempting to bind to Dir's input will throw
                    // an error. If the runtime continues to run lifecycle hooks after that error, then it will
                    // execute this hook and throw this error, which will mask the real problem. This test
                    // verifies this don't happen.
                    throw new Error('this error is unexpected');
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
        testing_2.TestBed.configureTestingModule({
            declarations: [Cmp, Dir],
        });
        const fixture = testing_2.TestBed.createComponent(Cmp);
        expect(() => fixture.detectChanges()).toThrowError('this error is expected');
    });
    it('should handle nullish coalescing inside templates', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <span [title]="'Your last name is ' + (lastName ?? lastNameFallback ?? 'unknown')">
          Hello, {{ firstName ?? 'Frodo' }}!
          You are a Balrog: {{ falsyValue ?? true }}
        </span>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.firstName = null;
                    this.lastName = null;
                    this.lastNameFallback = 'Baggins';
                    this.falsyValue = false;
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const content = fixture.nativeElement.innerHTML;
        expect(content).toContain('Hello, Frodo!');
        expect(content).toContain('You are a Balrog: false');
        expect(content).toContain(`<span title="Your last name is Baggins">`);
    });
    it('should handle safe keyed reads inside templates', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <span [title]="'Your last name is ' + (unknownNames?.[0] || 'unknown')">
        Hello, {{ knownNames?.[0]?.[1] }}!
        You are a Balrog: {{ species?.[0]?.[1]?.[2]?.[3]?.[4]?.[5] || 'unknown' }}
        You are an Elf: {{ speciesMap?.[keys?.[0] ?? 'key'] }}
        You are an Orc: {{ speciesMap?.['key'] }}
      </span>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.unknownNames = null;
                    this.knownNames = [['Frodo', 'Bilbo']];
                    this.species = null;
                    this.keys = null;
                    this.speciesMap = { key: 'unknown' };
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const content = fixture.nativeElement.innerHTML;
        expect(content).toContain('Hello, Bilbo!');
        expect(content).toContain('You are a Balrog: unknown');
        expect(content).toContain('You are an Elf: unknown');
        expect(content).toContain(`<span title="Your last name is unknown">`);
    });
    it('should handle safe keyed reads inside templates', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <span [title]="'Your last name is ' + (person.getLastName?.() ?? 'unknown')">
          Hello, {{ person.getName?.() }}!
          You are a Balrog: {{ person.getSpecies?.()?.()?.()?.()?.() || 'unknown' }}
        </span>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = { getName: () => 'Bilbo' };
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const content = fixture.nativeElement.innerHTML;
        expect(content).toContain('Hello, Bilbo!');
        expect(content).toContain('You are a Balrog: unknown');
        expect(content).toContain(`<span title="Your last name is unknown">`);
    });
    it('should not invoke safe calls more times than plain calls', () => {
        const returnValue = () => () => () => () => 'hi';
        let plainCalls = 0;
        let safeCalls = 0;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{ safe?.()?.()?.()?.()?.() }} {{ plain()()()()() }}`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                plain() {
                    plainCalls++;
                    return returnValue;
                }
                safe() {
                    safeCalls++;
                    return returnValue;
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(safeCalls).toBeGreaterThan(0);
        expect(safeCalls).toBe(plainCalls);
    });
    it('should handle nullish coalescing inside host bindings', () => {
        const logs = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[some-dir]',
                    host: {
                        '[attr.first-name]': `'Hello, ' + (firstName ?? 'Frodo') + '!'`,
                        '(click)': `logLastName(lastName ?? lastNameFallback ?? 'unknown')`,
                    },
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.firstName = null;
                    this.lastName = null;
                    this.lastNameFallback = 'Baggins';
                }
                logLastName(name) {
                    logs.push(name);
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<button some-dir>Click me</button>`,
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
        testing_2.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(button.getAttribute('first-name')).toBe('Hello, Frodo!');
        expect(logs).toEqual(['Baggins']);
    });
    it('should render SVG nodes placed inside ng-template', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <svg>
          <ng-template [ngIf]="condition">
            <text>Hello</text>
          </ng-template>
        </svg>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.condition = true;
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
        testing_2.TestBed.configureTestingModule({ declarations: [MyComp], imports: [common_1.CommonModule] });
        const fixture = testing_2.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('<text>Hello</text>');
    });
    it('should handle shorthand property declarations in templates', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir]',
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
                _value_decorators = [(0, core_1.Input)('my-dir')];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div [my-dir]="{a, b: 2, someProp}"></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _directive_decorators;
            let _directive_initializers = [];
            let _directive_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.directive = __runInitializers(this, _directive_initializers, void 0);
                    this.a = (__runInitializers(this, _directive_extraInitializers), 1);
                    this.someProp = 3;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _directive_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _directive_decorators, { kind: "field", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, _directive_initializers, _directive_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [App, Dir] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.componentInstance.directive.value).toEqual({ a: 1, b: 2, someProp: 3 });
    });
    it('should handle numeric separators in templates', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Balance: ${{ 1_000_000 * multiplier }}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.multiplier = 5;
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Balance: $5000000');
    });
    it('should handle calls to a safe access in templates', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <span>Hello, {{ (person?.getName() || 'unknown') }}!</span>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = null;
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Hello, unknown!');
    });
    it('should handle nested calls to a safe access methods in templates', () => {
        const log = [];
        class Person {
            constructor(name, title) {
                this.name = name;
                this.title = title;
            }
            getName(includeTitle) {
                log.push(`person.getName(${includeTitle})`);
                return includeTitle ? `${this.title} ${this.name}` : this.name;
            }
        }
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <span>Hello, {{ (person?.getName(getConfig('showTitle')?.enabled ?? getDefaultShowTitle()) ?? getFallbackName()) }}!</span>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.person = null;
                    this.showTitle = null;
                }
                getConfig(name) {
                    log.push(`getConfig(${name})`);
                    return this.showTitle !== null ? { enabled: this.showTitle } : null;
                }
                getDefaultShowTitle() {
                    log.push(`getDefaultShowTitle()`);
                    return false;
                }
                getFallbackName() {
                    log.push(`getFallbackName()`);
                    return 'unknown';
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges(/* checkNoChanges */ false);
        expect(fixture.nativeElement.textContent).toContain('Hello, unknown!');
        expect(log).toEqual(['getFallbackName()']);
        log.length = 0;
        fixture.componentInstance.person = new Person('Penelope', 'Lady');
        fixture.detectChanges(/* checkNoChanges */ false);
        expect(fixture.nativeElement.textContent).toContain('Hello, Penelope!');
        expect(log).toEqual(['getConfig(showTitle)', 'getDefaultShowTitle()', 'person.getName(false)']);
        log.length = 0;
        fixture.componentInstance.showTitle = true;
        fixture.detectChanges(/* checkNoChanges */ false);
        expect(fixture.nativeElement.textContent).toContain('Hello, Lady Penelope!');
        expect(log).toEqual(['getConfig(showTitle)', 'person.getName(true)']);
        log.length = 0;
        fixture.componentInstance.showTitle = false;
        fixture.detectChanges(/* checkNoChanges */ false);
        expect(fixture.nativeElement.textContent).toContain('Hello, Penelope!');
        expect(log).toEqual(['getConfig(showTitle)', 'person.getName(false)']);
        log.length = 0;
    });
    it('should remove child LView from the registry when the root view is destroyed', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<child></child>',
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
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: '<grand-child></grand-child>',
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
        let GrandChild = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'grand-child',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GrandChild = _classThis = class {
            };
            __setFunctionName(_classThis, "GrandChild");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GrandChild = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GrandChild = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [App, Child, GrandChild] });
        const fixture = testing_2.TestBed.createComponent(App);
        const grandChild = fixture.debugElement.query(platform_browser_1.By.directive(GrandChild)).componentInstance;
        fixture.detectChanges();
        const leafLView = (0, context_discovery_1.readPatchedLView)(grandChild);
        const lViewIds = [];
        let current = leafLView;
        while (current) {
            (0, type_checks_1.isLView)(current) && lViewIds.push(current[view_1.ID]);
            current = current[view_1.PARENT];
        }
        // We expect 3 views: `GrandChild`, `Child` and `App`.
        expect(lViewIds).toEqual([leafLView[view_1.ID], leafLView[view_1.ID] - 1, leafLView[view_1.ID] - 2]);
        expect(lViewIds.every((id) => (0, lview_tracking_1.getLViewById)(id) !== null)).toBe(true);
        fixture.destroy();
        // Expect all 3 views to be removed from the registry once the root is destroyed.
        expect(lViewIds.map(lview_tracking_1.getLViewById)).toEqual([null, null, null]);
    });
    it('should handle content inside <template> elements', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<template><strong>Hello</strong><em>World</em></template>',
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const template = fixture.nativeElement.querySelector('template');
        // `content` won't exist in browsers that don't support `template`.
        const root = template.content || template;
        expect(root.childNodes.length).toBe(2);
        expect(root.childNodes[0].textContent).toBe('Hello');
        expect(root.childNodes[0].tagName).toBe('STRONG');
        expect(root.childNodes[1].textContent).toBe('World');
        expect(root.childNodes[1].tagName).toBe('EM');
    });
    it('should be able to insert and remove elements inside <template>', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<template><strong *ngIf="render">Hello</strong></template>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.render = true;
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
        testing_2.TestBed.configureTestingModule({ declarations: [App], imports: [common_1.CommonModule] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const template = fixture.nativeElement.querySelector('template');
        // `content` won't exist in browsers that don't support `template`.
        const root = template.content || template;
        expect(root.querySelector('strong')).toBeTruthy();
        fixture.componentInstance.render = false;
        fixture.detectChanges();
        expect(root.querySelector('strong')).toBeFalsy();
        fixture.componentInstance.render = true;
        fixture.detectChanges();
        expect(root.querySelector('strong')).toBeTruthy();
    });
    it('should handle data binding inside <template> elements', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<template><strong>Hello {{name}}</strong></template>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.name = 'Bilbo';
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
        testing_2.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_2.TestBed.createComponent(App);
        fixture.detectChanges();
        const template = fixture.nativeElement.querySelector('template');
        // `content` won't exist in browsers that don't support `template`.
        const root = template.content || template;
        const strong = root.querySelector('strong');
        expect(strong.textContent).toBe('Hello Bilbo');
        fixture.componentInstance.name = 'Frodo';
        fixture.detectChanges();
        expect(strong.textContent).toBe('Hello Frodo');
    });
    it('should not throw for a non-null assertion after a safe access', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        {{ val?.foo!.bar }}
        {{ val?.[0].foo!.bar }}
        {{ foo(val)?.foo!.bar }}
        {{ $any(val)?.foo!.bar }}
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor() {
                    this.val = null;
                }
                foo(val) {
                    return val;
                }
            };
            __setFunctionName(_classThis, "Comp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Comp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Comp = _classThis;
        })();
        testing_2.TestBed.configureTestingModule({ declarations: [Comp] });
        expect(() => testing_2.TestBed.createComponent(Comp).detectChanges()).not.toThrow();
    });
    it('should support template literals in expressions', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Message: {{`Hello, ${name} - ${value}`}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.name = 'Frodo';
                    this.value = 0;
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Message: Hello, Frodo - 0');
        fixture.componentInstance.value++;
        fixture.componentInstance.name = 'Bilbo';
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Message: Hello, Bilbo - 1');
    });
    it('should support void expressions', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    host: {
                        '(click)': 'void doStuff($event)',
                    },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.e = null;
                }
                doStuff(e) {
                    this.e = e;
                    return false;
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        fixture.nativeElement.click();
        expect(fixture.componentInstance.e).not.toBeNull();
        expect(fixture.componentInstance.e.defaultPrevented).toBe(false);
    });
    it('should have correct operator precedence', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{1 + 10 ** -2 * 3}}',
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toEqual('1.03');
    });
    it('should throw on ambiguous unary operator in exponentiation expression', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{1 + -10 ** -2 * 3}}',
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
        expect(() => testing_2.TestBed.createComponent(TestComponent)).toThrowError(/Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence/);
    });
    it('should not throw on unambiguous unary operator in exponentiation expression', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{1 + (-10) ** -2 * 3}} | {{1 + -(10 ** -2) * 3}}',
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toEqual('1.03 | 0.97');
    });
    it('should have right-to-left associativity for exponentiation', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{2 ** 2 ** 3}}',
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toEqual('256');
    });
    it('should support tagged template literals with no interpolations in expressions', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    template: `
        <p>:{{ caps\`Hello, World!\` }}:{{ excited?.caps(3)\`Uncomfortably excited\` }}:</p> 
        <p>{{ greet\`Hi, I'm \${name}, and I'm \${age}\` }}</p>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.name = 'Frodo';
                    this.age = 50;
                    this.excited = {
                        caps: (excitementLevel) => {
                            return (strings) => {
                                return strings.join('').toUpperCase() + '!'.repeat(excitementLevel);
                            };
                        },
                    };
                }
                greet(strings, person, age) {
                    return `${strings[0]}${person}${strings[1]}${age} years old${strings[2]}`;
                }
                caps(strings) {
                    return strings.join('').toUpperCase();
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const text = fixture.nativeElement.textContent;
        expect(text).toContain(':HELLO, WORLD!:');
        expect(text).toContain(':UNCOMFORTABLY EXCITED!!!:');
        expect(text).toContain(`Hi, I'm Frodo, and I'm 50 years old`);
    });
    it('should not confuse operators for template literal tags', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    template: '{{ typeof`test` }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.typeof = (...args) => 'fail';
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe(`string`);
    });
    it('should support "in" expressions', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: true,
                    template: `{{'foo' in obj ? 'OK' : 'KO'}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.obj = { foo: 'bar' };
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
        const fixture = testing_2.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('OK');
        fixture.componentInstance.obj = { bar: 'foo' };
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('KO');
    });
    describe('tView.firstUpdatePass', () => {
        function isFirstUpdatePass() {
            const lView = (0, state_1.getLView)();
            const tView = lView[view_1.TVIEW];
            return tView.firstUpdatePass;
        }
        function assertAttrValues(element, value) {
            expect(element.getAttribute('data-comp')).toEqual(value);
            expect(element.getAttribute('data-dir')).toEqual(value);
        }
        it('should be marked with `firstUpdatePass` up until the template and host bindings are evaluated', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_text_decorators;
                var Dir = _classThis = class {
                    get text() {
                        return isFirstUpdatePass() ? 'first-update-pass' : 'post-update-pass';
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_text_decorators = [(0, core_1.HostBinding)('attr.data-dir')];
                    __esDecorate(_classThis, null, _get_text_decorators, { kind: "getter", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div [attr.data-comp]="text" dir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    get text() {
                        return isFirstUpdatePass() ? 'first-update-pass' : 'post-update-pass';
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
            testing_2.TestBed.configureTestingModule({
                declarations: [Cmp, Dir],
            });
            const fixture = testing_2.TestBed.createComponent(Cmp);
            fixture.detectChanges(false);
            const element = fixture.nativeElement.querySelector('div');
            assertAttrValues(element, 'first-update-pass');
            fixture.detectChanges(false);
            assertAttrValues(element, 'post-update-pass');
        });
        it('tView.firstUpdatePass should be applied immediately after the first embedded view is processed', () => {
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_text_decorators;
                var Dir = _classThis = class {
                    get text() {
                        return isFirstUpdatePass() ? 'first-update-pass' : 'post-update-pass';
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_text_decorators = [(0, core_1.HostBinding)('attr.data-dir')];
                    __esDecorate(_classThis, null, _get_text_decorators, { kind: "getter", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div *ngFor="let item of items" dir [attr.data-comp]="text">
            ...
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
                    get text() {
                        return isFirstUpdatePass() ? 'first-update-pass' : 'post-update-pass';
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
            testing_2.TestBed.configureTestingModule({
                declarations: [Cmp, Dir],
            });
            const fixture = testing_2.TestBed.createComponent(Cmp);
            fixture.detectChanges(false);
            const elements = fixture.nativeElement.querySelectorAll('div');
            assertAttrValues(elements[0], 'first-update-pass');
            assertAttrValues(elements[1], 'post-update-pass');
            assertAttrValues(elements[2], 'post-update-pass');
            fixture.detectChanges(false);
            assertAttrValues(elements[0], 'post-update-pass');
            assertAttrValues(elements[1], 'post-update-pass');
            assertAttrValues(elements[2], 'post-update-pass');
        });
    });
    describe('animations', () => {
        it('should apply triggers for a list of items when they are sorted and reSorted', (0, testing_2.fakeAsync)(() => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div *ngIf="showWarningMessage; else listOfItems">
            Nooo!
          </div>

          <ng-template #listOfItems>
            <animation-comp *ngFor="let item of items; trackBy: itemTrackFn">
              {{ item.value }}
            </animation-comp>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.showWarningMessage = false;
                        this.items = [
                            { value: 1, id: 1 },
                            { value: 2, id: 2 },
                            { value: 3, id: 3 },
                            { value: 4, id: 4 },
                            { value: 5, id: 5 },
                        ];
                    }
                    itemTrackFn(value) {
                        return value.id;
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
            let AnimationComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'animation-comp',
                        animations: [
                            (0, animations_1.trigger)('host', [
                                (0, animations_1.state)('void', (0, animations_1.style)({ height: '0px' })),
                                (0, animations_1.transition)('* => *', [(0, animations_1.animate)('1s')]),
                            ]),
                        ],
                        template: `
                  <ng-content></ng-content>
                `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _hostState_decorators;
                let _hostState_initializers = [];
                let _hostState_extraInitializers = [];
                let _onLeaveStart_decorators;
                var AnimationComp = _classThis = class {
                    onLeaveStart(event) {
                        // we just want to register the listener
                    }
                    constructor() {
                        this.hostState = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _hostState_initializers, ''));
                        __runInitializers(this, _hostState_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AnimationComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostState_decorators = [(0, core_1.HostBinding)('@host')];
                    _onLeaveStart_decorators = [(0, core_1.HostListener)('@host.start', ['$event'])];
                    __esDecorate(_classThis, null, _onLeaveStart_decorators, { kind: "method", name: "onLeaveStart", static: false, private: false, access: { has: obj => "onLeaveStart" in obj, get: obj => obj.onLeaveStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _hostState_decorators, { kind: "field", name: "hostState", static: false, private: false, access: { has: obj => "hostState" in obj, get: obj => obj.hostState, set: (obj, value) => { obj.hostState = value; } }, metadata: _metadata }, _hostState_initializers, _hostState_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnimationComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnimationComp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Cmp, AnimationComp],
                imports: [animations_2.NoopAnimationsModule],
                providers: [{ provide: browser_1.AnimationDriver, useClass: testing_1.MockAnimationDriver }],
            });
            const fixture = testing_2.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            let elements = queryAll(fixture.nativeElement, 'animation-comp');
            expect(elements.length).toEqual(5);
            expect(elements.map((e) => { var _a; return (_a = e.textContent) === null || _a === void 0 ? void 0 : _a.trim(); })).toEqual(['1', '2', '3', '4', '5']);
            const items = fixture.componentInstance.items;
            arraySwap(items, 2, 0); // 3 2 1 4 5
            arraySwap(items, 2, 1); // 3 1 2 4 5
            const first = items.shift();
            items.push(first); // 1 2 4 5 3
            fixture.detectChanges();
            elements = queryAll(fixture.nativeElement, 'animation-comp');
            expect(elements.length).toEqual(5);
            expect(elements.map((e) => { var _a; return (_a = e.textContent) === null || _a === void 0 ? void 0 : _a.trim(); })).toEqual(['1', '2', '4', '5', '3']);
            completeAnimations();
            fixture.componentInstance.showWarningMessage = true;
            fixture.detectChanges();
            completeAnimations();
            elements = queryAll(fixture.nativeElement, 'animation-comp');
            expect(elements.length).toEqual(0);
            expect(fixture.nativeElement.textContent.trim()).toEqual('Nooo!');
            fixture.componentInstance.showWarningMessage = false;
            fixture.detectChanges();
            elements = queryAll(fixture.nativeElement, 'animation-comp');
            expect(elements.length).toEqual(5);
        }));
        it('should insert and remove views in the correct order when animations are present', (0, testing_2.fakeAsync)(() => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        animations: [
                            (0, animations_1.trigger)('root', [(0, animations_1.transition)('* => *', [])]),
                            (0, animations_1.trigger)('outer', [(0, animations_1.transition)('* => *', [])]),
                            (0, animations_1.trigger)('inner', [(0, animations_1.transition)('* => *', [])]),
                        ],
                        template: `
          <div *ngIf="showRoot" (@root.start)="track('root', $event)" @root>
            <div *ngIf="showIfContents; else innerCompList" (@outer.start)="track('outer', $event)" @outer>
              Nooo!
            </div>

            <ng-template #innerCompList>
              <inner-comp *ngFor="let item of items; trackBy: itemTrackFn" (@inner.start)="track('inner', $event)" @inner>
                {{ item.value }}
              </inner-comp>
            </ng-template>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.showRoot = true;
                        this.showIfContents = true;
                        this.items = [1];
                        this.log = [];
                    }
                    track(name, event) {
                        this.log.push(name);
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
            let InnerComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'inner-comp',
                        animations: [(0, animations_1.trigger)('host', [(0, animations_1.transition)('* => *', [])])],
                        template: `
                  <ng-content></ng-content>
                `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _hostState_decorators;
                let _hostState_initializers = [];
                let _hostState_extraInitializers = [];
                let _onLeaveStart_decorators;
                var InnerComp = _classThis = class {
                    constructor(parent) {
                        this.parent = (__runInitializers(this, _instanceExtraInitializers), parent);
                        this.hostState = __runInitializers(this, _hostState_initializers, '');
                        __runInitializers(this, _hostState_extraInitializers);
                        this.parent = parent;
                    }
                    onLeaveStart(event) {
                        this.parent.log.push('host');
                    }
                };
                __setFunctionName(_classThis, "InnerComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _hostState_decorators = [(0, core_1.HostBinding)('@host')];
                    _onLeaveStart_decorators = [(0, core_1.HostListener)('@host.start', ['$event'])];
                    __esDecorate(_classThis, null, _onLeaveStart_decorators, { kind: "method", name: "onLeaveStart", static: false, private: false, access: { has: obj => "onLeaveStart" in obj, get: obj => obj.onLeaveStart }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, null, _hostState_decorators, { kind: "field", name: "hostState", static: false, private: false, access: { has: obj => "hostState" in obj, get: obj => obj.hostState, set: (obj, value) => { obj.hostState = value; } }, metadata: _metadata }, _hostState_initializers, _hostState_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InnerComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InnerComp = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({
                declarations: [Cmp, InnerComp],
                imports: [animations_2.NoopAnimationsModule],
                providers: [{ provide: browser_1.AnimationDriver, useClass: testing_1.MockAnimationDriver }],
            });
            const fixture = testing_2.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            completeAnimations();
            const comp = fixture.componentInstance;
            expect(comp.log).toEqual([
                'root', // insertion of the inner-comp content
                'outer', // insertion of the default ngIf
            ]);
            comp.log = [];
            comp.showIfContents = false;
            fixture.detectChanges();
            completeAnimations();
            expect(comp.log).toEqual([
                'host', // insertion of the inner-comp content
                'outer', // insertion of the template into the ngIf
                'inner', // insertion of the inner comp element
            ]);
            comp.log = [];
            comp.showRoot = false;
            fixture.detectChanges();
            completeAnimations();
            expect(comp.log).toEqual([
                'root', // removal the root div container
                'host', // removal of the inner-comp content
                'inner', // removal of the inner comp element
            ]);
        }));
    });
});
function completeAnimations() {
    (0, testing_2.flushMicrotasks)();
    const log = testing_1.MockAnimationDriver.log;
    log.forEach((player) => player.finish());
    (0, testing_2.flushMicrotasks)();
}
function arraySwap(arr, indexA, indexB) {
    const item = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = item;
}
/**
 * Queries the provided `root` element for sub elements by the selector and casts the result as an
 * array of elements
 */
function queryAll(root, selector) {
    return Array.from(root.querySelectorAll(selector));
}
