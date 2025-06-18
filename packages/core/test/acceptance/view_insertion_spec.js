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
describe('view insertion', () => {
    describe('of a simple template', () => {
        it('should insert into an empty container, at the front, in the middle, and at the end', () => {
            let _counter = 0;
            let IncrementComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'increment-comp',
                        template: `<span>created{{counter}}</span>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var IncrementComp = _classThis = class {
                    constructor() {
                        this.counter = _counter++;
                    }
                };
                __setFunctionName(_classThis, "IncrementComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    IncrementComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return IncrementComp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <ng-template #simple><increment-comp></increment-comp></ng-template>
              <div #container></div>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                let _simple_decorators;
                let _simple_initializers = [];
                let _simple_extraInitializers = [];
                var App = _classThis = class {
                    constructor(changeDetector) {
                        this.changeDetector = changeDetector;
                        this.container = __runInitializers(this, _container_initializers, null);
                        this.simple = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _simple_initializers, null));
                        this.view0 = (__runInitializers(this, _simple_extraInitializers), null);
                        this.view1 = null;
                        this.view2 = null;
                        this.view3 = null;
                    }
                    ngAfterViewInit() {
                        // insert at the front
                        this.view1 = this.container.createEmbeddedView(this.simple); // "created0"
                        // insert at the front again
                        this.view0 = this.container.createEmbeddedView(this.simple, {}, 0); // "created1"
                        // insert at the end
                        this.view3 = this.container.createEmbeddedView(this.simple); // "created2"
                        // insert in the middle
                        this.view2 = this.container.createEmbeddedView(this.simple, {}, 2); // "created3"
                        // We need to run change detection here to avoid
                        // ExpressionChangedAfterItHasBeenCheckedError because of the value updating in
                        // increment-comp
                        this.changeDetector.detectChanges();
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef, static: true })];
                    _simple_decorators = [(0, core_1.ViewChild)('simple', { read: core_1.TemplateRef, static: true })];
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, null, _simple_decorators, { kind: "field", name: "simple", static: false, private: false, access: { has: obj => "simple" in obj, get: obj => obj.simple, set: (obj, value) => { obj.simple = value; } }, metadata: _metadata }, _simple_initializers, _simple_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, IncrementComp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const app = fixture.componentInstance;
            expect(app.container.indexOf(app.view0)).toBe(0);
            expect(app.container.indexOf(app.view1)).toBe(1);
            expect(app.container.indexOf(app.view2)).toBe(2);
            expect(app.container.indexOf(app.view3)).toBe(3);
            // The text in each component differs based on *when* it was created.
            expect(fixture.nativeElement.textContent).toBe('created1created0created3created2');
        });
    });
    describe('of an empty template', () => {
        it('should insert into an empty container, at the front, in the middle, and at the end', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <ng-template #empty></ng-template>
              <div #container></div>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                let _empty_decorators;
                let _empty_initializers = [];
                let _empty_extraInitializers = [];
                var App = _classThis = class {
                    constructor() {
                        this.container = __runInitializers(this, _container_initializers, null);
                        this.empty = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _empty_initializers, null));
                        this.view0 = (__runInitializers(this, _empty_extraInitializers), null);
                        this.view1 = null;
                        this.view2 = null;
                        this.view3 = null;
                    }
                    ngAfterViewInit() {
                        // insert at the front
                        this.view1 = this.container.createEmbeddedView(this.empty);
                        // insert at the front again
                        this.view0 = this.container.createEmbeddedView(this.empty, {}, 0);
                        // insert at the end
                        this.view3 = this.container.createEmbeddedView(this.empty);
                        // insert in the middle
                        this.view2 = this.container.createEmbeddedView(this.empty, {}, 2);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                    _empty_decorators = [(0, core_1.ViewChild)('empty', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, null, _empty_decorators, { kind: "field", name: "empty", static: false, private: false, access: { has: obj => "empty" in obj, get: obj => obj.empty, set: (obj, value) => { obj.empty = value; } }, metadata: _metadata }, _empty_initializers, _empty_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const app = fixture.componentInstance;
            expect(app.container.indexOf(app.view0)).toBe(0);
            expect(app.container.indexOf(app.view1)).toBe(1);
            expect(app.container.indexOf(app.view2)).toBe(2);
            expect(app.container.indexOf(app.view3)).toBe(3);
        });
    });
    describe('of an ng-content projection', () => {
        it('should insert into an empty container, at the front, in the middle, and at the end', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `
                  <ng-template #projection><ng-content></ng-content></ng-template>
                  <div #container></div>
                `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                let _projection_decorators;
                let _projection_initializers = [];
                let _projection_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.container = __runInitializers(this, _container_initializers, null);
                        this.projection = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _projection_initializers, null));
                        this.view0 = (__runInitializers(this, _projection_extraInitializers), null);
                        this.view1 = null;
                        this.view2 = null;
                        this.view3 = null;
                    }
                    ngAfterViewInit() {
                        // insert at the front
                        this.view1 = this.container.createEmbeddedView(this.projection);
                        // insert at the front again
                        this.view0 = this.container.createEmbeddedView(this.projection, {}, 0);
                        // insert at the end
                        this.view3 = this.container.createEmbeddedView(this.projection);
                        // insert in the middle
                        this.view2 = this.container.createEmbeddedView(this.projection, {}, 2);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                    _projection_decorators = [(0, core_1.ViewChild)('projection', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, null, _projection_decorators, { kind: "field", name: "projection", static: false, private: false, access: { has: obj => "projection" in obj, get: obj => obj.projection, set: (obj, value) => { obj.projection = value; } }, metadata: _metadata }, _projection_initializers, _projection_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <comp>test</comp>
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
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Comp],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const comp = fixture.debugElement.query(platform_browser_1.By.directive(Comp)).injector.get(Comp);
            expect(comp.container.indexOf(comp.view0)).toBe(0);
            expect(comp.container.indexOf(comp.view1)).toBe(1);
            expect(comp.container.indexOf(comp.view2)).toBe(2);
            expect(comp.container.indexOf(comp.view3)).toBe(3);
            // Both ViewEngine and Ivy only honor one of the inserted ng-content components, even though
            // all are inserted.
            expect(fixture.nativeElement.textContent).toBe('test');
        });
    });
    describe('of another container like ngIf', () => {
        it('should insert into an empty container, at the front, in the middle, and at the end', () => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
                  <ng-template #subContainer><div class="dynamic" *ngIf="true">test</div></ng-template>
                  <div #container></div>
                `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                let _subContainer_decorators;
                let _subContainer_initializers = [];
                let _subContainer_extraInitializers = [];
                var App = _classThis = class {
                    constructor(changeDetectorRef) {
                        this.changeDetectorRef = changeDetectorRef;
                        this.container = __runInitializers(this, _container_initializers, null);
                        this.subContainer = (__runInitializers(this, _container_extraInitializers), __runInitializers(this, _subContainer_initializers, null));
                        this.view0 = (__runInitializers(this, _subContainer_extraInitializers), null);
                        this.view1 = null;
                        this.view2 = null;
                        this.view3 = null;
                    }
                    ngAfterViewInit() {
                        // insert at the front
                        this.view1 = this.container.createEmbeddedView(this.subContainer, null, 0);
                        // insert at the front again
                        this.view0 = this.container.createEmbeddedView(this.subContainer, null, 0);
                        // insert at the end
                        this.view3 = this.container.createEmbeddedView(this.subContainer, null, 2);
                        // insert in the middle
                        this.view2 = this.container.createEmbeddedView(this.subContainer, null, 2);
                        // We need to run change detection here to avoid
                        // ExpressionChangedAfterItHasBeenCheckedError because of the value getting passed to ngIf
                        // in the template.
                        this.changeDetectorRef.detectChanges();
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef })];
                    _subContainer_decorators = [(0, core_1.ViewChild)('subContainer', { read: core_1.TemplateRef })];
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, null, _subContainer_decorators, { kind: "field", name: "subContainer", static: false, private: false, access: { has: obj => "subContainer" in obj, get: obj => obj.subContainer, set: (obj, value) => { obj.subContainer = value; } }, metadata: _metadata }, _subContainer_initializers, _subContainer_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const app = fixture.componentInstance;
            expect(app.container.indexOf(app.view0)).toBe(0);
            expect(app.container.indexOf(app.view1)).toBe(1);
            expect(app.container.indexOf(app.view2)).toBe(2);
            expect(app.container.indexOf(app.view3)).toBe(3);
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('div.dynamic')).length).toBe(4);
        });
    });
    describe('before another view', () => {
        let ViewInsertingDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[viewInserting]',
                    exportAs: 'vi',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ViewInsertingDir = _classThis = class {
                constructor(_vcRef) {
                    this._vcRef = _vcRef;
                }
                insert(beforeView, insertTpl) {
                    this._vcRef.insert(beforeView, 0);
                    this._vcRef.createEmbeddedView(insertTpl, {}, 0);
                }
            };
            __setFunctionName(_classThis, "ViewInsertingDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ViewInsertingDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ViewInsertingDir = _classThis;
        })();
        describe('before embedded view', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _beforeTpl_decorators;
                let _beforeTpl_initializers = [];
                let _beforeTpl_extraInitializers = [];
                let _insertTpl_decorators;
                let _insertTpl_initializers = [];
                let _insertTpl_extraInitializers = [];
                let _viewInsertingDir_decorators;
                let _viewInsertingDir_initializers = [];
                let _viewInsertingDir_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.beforeTpl = __runInitializers(this, _beforeTpl_initializers, void 0);
                        this.insertTpl = (__runInitializers(this, _beforeTpl_extraInitializers), __runInitializers(this, _insertTpl_initializers, void 0));
                        this.viewInsertingDir = (__runInitializers(this, _insertTpl_extraInitializers), __runInitializers(this, _viewInsertingDir_initializers, void 0));
                        this.minutes = (__runInitializers(this, _viewInsertingDir_extraInitializers), 10);
                    }
                    insert() {
                        const beforeView = this.beforeTpl.createEmbeddedView({});
                        // change-detect the "before view" to create all child views
                        beforeView.detectChanges();
                        this.viewInsertingDir.insert(beforeView, this.insertTpl);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _beforeTpl_decorators = [(0, core_1.ViewChild)('before', { static: true })];
                    _insertTpl_decorators = [(0, core_1.ViewChild)('insert', { static: true })];
                    _viewInsertingDir_decorators = [(0, core_1.ViewChild)('vi', { static: true })];
                    __esDecorate(null, null, _beforeTpl_decorators, { kind: "field", name: "beforeTpl", static: false, private: false, access: { has: obj => "beforeTpl" in obj, get: obj => obj.beforeTpl, set: (obj, value) => { obj.beforeTpl = value; } }, metadata: _metadata }, _beforeTpl_initializers, _beforeTpl_extraInitializers);
                    __esDecorate(null, null, _insertTpl_decorators, { kind: "field", name: "insertTpl", static: false, private: false, access: { has: obj => "insertTpl" in obj, get: obj => obj.insertTpl, set: (obj, value) => { obj.insertTpl = value; } }, metadata: _metadata }, _insertTpl_initializers, _insertTpl_extraInitializers);
                    __esDecorate(null, null, _viewInsertingDir_decorators, { kind: "field", name: "viewInsertingDir", static: false, private: false, access: { has: obj => "viewInsertingDir" in obj, get: obj => obj.viewInsertingDir, set: (obj, value) => { obj.viewInsertingDir = value; } }, metadata: _metadata }, _viewInsertingDir_initializers, _viewInsertingDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [TestCmpt, ViewInsertingDir],
                    imports: [common_1.CommonModule],
                });
            });
            function createAndInsertViews(beforeTpl) {
                testing_1.TestBed.overrideTemplate(TestCmpt, `
          <ng-template #insert>insert</ng-template>
          <ng-template #before>${beforeTpl}</ng-template>

          <div><ng-template #vi="vi" viewInserting></ng-template></div>
        `);
                const fixture = testing_1.TestBed.createComponent(TestCmpt);
                fixture.detectChanges();
                fixture.componentInstance.insert();
                fixture.detectChanges();
                return fixture.nativeElement;
            }
            it('should insert before a view with the text node as the first root node', () => {
                expect(createAndInsertViews('|before').textContent).toBe('insert|before');
            });
            it('should insert before a view with the element as the first root node', () => {
                expect(createAndInsertViews('<span>|before</span>').textContent).toBe('insert|before');
            });
            it('should insert before a view with the ng-container as the first root node', () => {
                expect(createAndInsertViews(`
          <ng-container>
            <ng-container>|before</ng-container>
          </ng-container>
        `).textContent).toBe('insert|before');
            });
            it('should insert before a view with the empty ng-container as the first root node', () => {
                expect(createAndInsertViews(`<ng-container></ng-container>|before`).textContent).toBe('insert|before');
            });
            it('should insert before a view with ICU container inside a ng-container as the first root node', () => {
                expect(createAndInsertViews(`<ng-container i18n>{minutes, plural, =0 {just now} =1 {one minute ago} other {|before}}</ng-container>`).textContent).toBe('insert|before');
            });
            it('should insert before a view with a container as the first root node', () => {
                expect(createAndInsertViews(`<ng-template [ngIf]="true">|before</ng-template>`).textContent).toBe('insert|before');
            });
            it('should insert before a view with an empty container as the first root node', () => {
                expect(createAndInsertViews(`<ng-template [ngIf]="true"></ng-template>|before`).textContent).toBe('insert|before');
            });
            it('should insert before a view with a ng-container where ViewContainerRef is injected', () => {
                expect(createAndInsertViews(`
          <ng-container [ngTemplateOutlet]="after">|before</ng-container>
          <ng-template #after>|after</ng-template>
        `).textContent).toBe('insert|before|after');
            });
            it('should insert before a view with an element where ViewContainerRef is injected', () => {
                expect(createAndInsertViews(`
          <div [ngTemplateOutlet]="after">|before</div>
          <ng-template #after>|after</ng-template>
        `).textContent).toBe('insert|before|after');
            });
            it('should insert before a view with an empty projection as the first root node', () => {
                expect(createAndInsertViews(`<ng-content></ng-content>|before`).textContent).toBe('insert|before');
            });
            it('should insert before a view with complex node structure', () => {
                expect(createAndInsertViews(`
          <ng-template [ngIf]="true">
            <ng-container>
              <ng-container>
                <ng-template [ngIf]="true">|before</ng-template>
              </ng-container>
            </ng-container>
          </ng-template>
        `).textContent).toBe('insert|before');
            });
            it('should insert before a ng-container with a ViewContainerRef on it', () => {
                let AppComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app-root',
                            template: `
            <div>start|</div>
            <ng-container [ngTemplateOutlet]="insertTpl ? tpl : null"></ng-container>
            <ng-container [ngTemplateOutlet]="tpl"></ng-container>
            <div>|end</div>

            <ng-template #tpl>test</ng-template>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AppComponent = _classThis = class {
                        constructor() {
                            this.insertTpl = false;
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
                testing_1.TestBed.configureTestingModule({
                    declarations: [AppComponent],
                    imports: [common_1.CommonModule],
                });
                const fixture = testing_1.TestBed.createComponent(AppComponent);
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent).toBe('start|test|end');
                fixture.componentInstance.insertTpl = true;
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent).toBe('start|testtest|end');
            });
        });
        describe('before embedded view with projection', () => {
            let WithContentCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-content',
                        template: `
          <ng-template #insert>insert</ng-template>
          <ng-template #before><ng-content></ng-content></ng-template>
          <div><ng-template #vi="vi" viewInserting></ng-template></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _insertTpl_decorators;
                let _insertTpl_initializers = [];
                let _insertTpl_extraInitializers = [];
                let _beforeTpl_decorators;
                let _beforeTpl_initializers = [];
                let _beforeTpl_extraInitializers = [];
                let _viewInsertingDir_decorators;
                let _viewInsertingDir_initializers = [];
                let _viewInsertingDir_extraInitializers = [];
                var WithContentCmpt = _classThis = class {
                    insert() {
                        const beforeView = this.beforeTpl.createEmbeddedView({});
                        // change-detect the "before view" to create all child views
                        beforeView.detectChanges();
                        this.viewInsertingDir.insert(beforeView, this.insertTpl);
                    }
                    constructor() {
                        this.insertTpl = __runInitializers(this, _insertTpl_initializers, void 0);
                        this.beforeTpl = (__runInitializers(this, _insertTpl_extraInitializers), __runInitializers(this, _beforeTpl_initializers, void 0));
                        this.viewInsertingDir = (__runInitializers(this, _beforeTpl_extraInitializers), __runInitializers(this, _viewInsertingDir_initializers, void 0));
                        __runInitializers(this, _viewInsertingDir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "WithContentCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _insertTpl_decorators = [(0, core_1.ViewChild)('insert', { static: true })];
                    _beforeTpl_decorators = [(0, core_1.ViewChild)('before', { static: true })];
                    _viewInsertingDir_decorators = [(0, core_1.ViewChild)('vi', { static: true })];
                    __esDecorate(null, null, _insertTpl_decorators, { kind: "field", name: "insertTpl", static: false, private: false, access: { has: obj => "insertTpl" in obj, get: obj => obj.insertTpl, set: (obj, value) => { obj.insertTpl = value; } }, metadata: _metadata }, _insertTpl_initializers, _insertTpl_extraInitializers);
                    __esDecorate(null, null, _beforeTpl_decorators, { kind: "field", name: "beforeTpl", static: false, private: false, access: { has: obj => "beforeTpl" in obj, get: obj => obj.beforeTpl, set: (obj, value) => { obj.beforeTpl = value; } }, metadata: _metadata }, _beforeTpl_initializers, _beforeTpl_extraInitializers);
                    __esDecorate(null, null, _viewInsertingDir_decorators, { kind: "field", name: "viewInsertingDir", static: false, private: false, access: { has: obj => "viewInsertingDir" in obj, get: obj => obj.viewInsertingDir, set: (obj, value) => { obj.viewInsertingDir = value; } }, metadata: _metadata }, _viewInsertingDir_initializers, _viewInsertingDir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithContentCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithContentCmpt = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmpt',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _withContentCmpt_decorators;
                let _withContentCmpt_initializers = [];
                let _withContentCmpt_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.withContentCmpt = __runInitializers(this, _withContentCmpt_initializers, void 0);
                        __runInitializers(this, _withContentCmpt_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _withContentCmpt_decorators = [(0, core_1.ViewChild)('wc', { static: true })];
                    __esDecorate(null, null, _withContentCmpt_decorators, { kind: "field", name: "withContentCmpt", static: false, private: false, access: { has: obj => "withContentCmpt" in obj, get: obj => obj.withContentCmpt, set: (obj, value) => { obj.withContentCmpt = value; } }, metadata: _metadata }, _withContentCmpt_initializers, _withContentCmpt_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [ViewInsertingDir, WithContentCmpt, TestCmpt],
                    imports: [common_1.CommonModule],
                });
            });
            it('should insert before a view with projected text nodes', () => {
                testing_1.TestBed.overrideTemplate(TestCmpt, `<with-content #wc>|before</with-content>`);
                const fixture = testing_1.TestBed.createComponent(TestCmpt);
                fixture.detectChanges();
                fixture.componentInstance.withContentCmpt.insert();
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent).toBe('insert|before');
            });
            it('should insert before a view with projected container', () => {
                testing_1.TestBed.overrideTemplate(TestCmpt, `<with-content #wc><ng-template [ngIf]="true">|before</ng-template></with-content>`);
                const fixture = testing_1.TestBed.createComponent(TestCmpt);
                fixture.detectChanges();
                fixture.componentInstance.withContentCmpt.insert();
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent).toBe('insert|before');
            });
        });
        describe('before component view', () => {
            let ViewInsertingDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[viewInserting]',
                        exportAs: 'vi',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ViewInsertingDir = _classThis = class {
                    constructor(_vcRef) {
                        this._vcRef = _vcRef;
                    }
                    insert(beforeView, insertTpl) {
                        this._vcRef.insert(beforeView, 0);
                        this._vcRef.createEmbeddedView(insertTpl, {}, 0);
                    }
                };
                __setFunctionName(_classThis, "ViewInsertingDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ViewInsertingDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ViewInsertingDir = _classThis;
            })();
            let DynamicComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt',
                        template: '|before',
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
            it('should insert in front a dynamic component view', () => {
                let TestCmpt = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmpt',
                            template: `
                <ng-template #insert>insert</ng-template>
                <div><ng-template #vi="vi" viewInserting></ng-template></div>
              `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _insertTpl_decorators;
                    let _insertTpl_initializers = [];
                    let _insertTpl_extraInitializers = [];
                    let _viewInsertingDir_decorators;
                    let _viewInsertingDir_initializers = [];
                    let _viewInsertingDir_extraInitializers = [];
                    var TestCmpt = _classThis = class {
                        constructor(_vcr, _injector) {
                            this._vcr = _vcr;
                            this._injector = _injector;
                            this.insertTpl = __runInitializers(this, _insertTpl_initializers, void 0);
                            this.viewInsertingDir = (__runInitializers(this, _insertTpl_extraInitializers), __runInitializers(this, _viewInsertingDir_initializers, void 0));
                            __runInitializers(this, _viewInsertingDir_extraInitializers);
                            this._vcr = _vcr;
                            this._injector = _injector;
                        }
                        insert() {
                            // create a dynamic component view to act as an "insert before" view
                            const beforeView = this._vcr.createComponent(DynamicComponent, {
                                injector: this._injector,
                            }).hostView;
                            // change-detect the "before view" to create all child views
                            beforeView.detectChanges();
                            this.viewInsertingDir.insert(beforeView, this.insertTpl);
                        }
                    };
                    __setFunctionName(_classThis, "TestCmpt");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _insertTpl_decorators = [(0, core_1.ViewChild)('insert', { static: true })];
                        _viewInsertingDir_decorators = [(0, core_1.ViewChild)('vi', { static: true })];
                        __esDecorate(null, null, _insertTpl_decorators, { kind: "field", name: "insertTpl", static: false, private: false, access: { has: obj => "insertTpl" in obj, get: obj => obj.insertTpl, set: (obj, value) => { obj.insertTpl = value; } }, metadata: _metadata }, _insertTpl_initializers, _insertTpl_extraInitializers);
                        __esDecorate(null, null, _viewInsertingDir_decorators, { kind: "field", name: "viewInsertingDir", static: false, private: false, access: { has: obj => "viewInsertingDir" in obj, get: obj => obj.viewInsertingDir, set: (obj, value) => { obj.viewInsertingDir = value; } }, metadata: _metadata }, _viewInsertingDir_initializers, _viewInsertingDir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        TestCmpt = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return TestCmpt = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [TestCmpt, ViewInsertingDir, DynamicComponent],
                });
                const fixture = testing_1.TestBed.createComponent(TestCmpt);
                fixture.detectChanges();
                fixture.componentInstance.insert();
                fixture.detectChanges();
                expect(fixture.nativeElement.textContent).toBe('insert|before');
            });
        });
    });
    describe('non-regression', () => {
        // https://github.com/angular/angular/issues/31971
        it('should insert component views into ViewContainerRef injected by querying <ng-container>', () => {
            let DynamicComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt',
                        template: 'dynamic',
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
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `
            <div>start|</div>
            <ng-container #container></ng-container>
            <div>|end</div>

            <div (click)="click()" >|click</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                var AppComponent = _classThis = class {
                    click() {
                        this.vcr.createComponent(DynamicComponent);
                    }
                    constructor() {
                        this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                        __runInitializers(this, _vcr_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcr_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef, static: true })];
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [AppComponent, DynamicComponent],
            });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('start||end|click');
            fixture.componentInstance.click();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('start|dynamic|end|click');
        });
        // https://github.com/angular/angular/issues/33679
        it('should insert embedded views into ViewContainerRef injected by querying <ng-container>', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `
        <div>container start|</div>
        <ng-container #container></ng-container>
        <div>|container end</div>

        <ng-template #template >test</ng-template>
        <div (click)="click()" >|click</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var AppComponent = _classThis = class {
                    click() {
                        this.vcr.createEmbeddedView(this.template, undefined, 0);
                    }
                    constructor() {
                        this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                        this.template = (__runInitializers(this, _vcr_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcr_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ViewContainerRef, static: true })];
                    _template_decorators = [(0, core_1.ViewChild)('template', { read: core_1.TemplateRef, static: true })];
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [AppComponent],
            });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('container start||container end|click');
            fixture.componentInstance.click();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('container start|test|container end|click');
        });
        it('should properly insert before views in a ViewContainerRef injected on ng-container', () => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `
          <ng-template #parameterListItem let-parameter="parameter">
            {{parameter}}
          </ng-template>
          <ng-container *ngFor="let parameter of items;"
            [ngTemplateOutlet]="parameterListItem"
            [ngTemplateOutletContext]="{parameter:parameter}">
          </ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.items = [1];
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
            testing_1.TestBed.configureTestingModule({
                declarations: [AppComponent],
                imports: [common_1.CommonModule],
            });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toContain('1');
            fixture.componentInstance.items = [2, 1];
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toContain('2  1');
        });
    });
    describe('create mode error handling', () => {
        it('should consistently report errors raised a directive constructor', () => {
            let FailInConstructorAlways = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[failInConstructorAlways]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FailInConstructorAlways = _classThis = class {
                    constructor() {
                        throw new Error('Error in a constructor');
                    }
                };
                __setFunctionName(_classThis, "FailInConstructorAlways");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FailInConstructorAlways = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FailInConstructorAlways = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div failInConstructorAlways></div>`,
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, FailInConstructorAlways],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in a constructor');
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in a constructor');
        });
        it('should render even if a directive constructor throws in the first create pass', () => {
            let firstRun = true;
            let FailInConstructorOnce = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[failInConstructorOnce]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FailInConstructorOnce = _classThis = class {
                    constructor() {
                        if (firstRun) {
                            firstRun = false;
                            throw new Error('Error in a constructor');
                        }
                    }
                };
                __setFunctionName(_classThis, "FailInConstructorOnce");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FailInConstructorOnce = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FailInConstructorOnce = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div failInConstructorOnce>OK</div>`,
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, FailInConstructorOnce],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in a constructor');
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            expect(fixture.nativeElement.textContent).toContain('OK');
        });
        it('should consistently report errors raised a directive input setter', () => {
            let FailInInputAlways = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[failInInputAlways]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_failInInputAlways_decorators;
                var FailInInputAlways = _classThis = class {
                    set failInInputAlways(_) {
                        throw new Error('Error in an input');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "FailInInputAlways");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_failInInputAlways_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_failInInputAlways_decorators, { kind: "setter", name: "failInInputAlways", static: false, private: false, access: { has: obj => "failInInputAlways" in obj, set: (obj, value) => { obj.failInInputAlways = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FailInInputAlways = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FailInInputAlways = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div failInInputAlways="static"></div>`,
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, FailInInputAlways],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in an input');
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in an input');
        });
        it('should consistently report errors raised a static query setter', () => {
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[someDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div someDir></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_directive_decorators;
                var TestCmpt = _classThis = class {
                    set directive(_) {
                        throw new Error('Error in static query setter');
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_directive_decorators = [(0, core_1.ViewChild)(SomeDirective, { static: true })];
                    __esDecorate(_classThis, null, _set_directive_decorators, { kind: "setter", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, set: (obj, value) => { obj.directive = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, SomeDirective],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in static query setter');
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in static query setter');
        });
        it('should match a static query, even if its setter throws in the first create pass', () => {
            let hasThrown = false;
            let SomeDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[someDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeDirective = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeDirective = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div someDir></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _get_directive_decorators;
                var TestCmpt = _classThis = class {
                    constructor() {
                        this._directive = __runInitializers(this, _instanceExtraInitializers);
                    }
                    get directive() {
                        return this._directive;
                    }
                    set directive(directiveInstance) {
                        if (!hasThrown) {
                            hasThrown = true;
                            throw new Error('Error in static query setter');
                        }
                        this._directive = directiveInstance;
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _get_directive_decorators = [(0, core_1.ViewChild)(SomeDirective, { static: true })];
                    __esDecorate(_classThis, null, _get_directive_decorators, { kind: "getter", name: "directive", static: false, private: false, access: { has: obj => "directive" in obj, get: obj => obj.directive }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, SomeDirective],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in static query setter');
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            expect(fixture.componentInstance.directive).toBeInstanceOf(SomeDirective);
        });
        it('should render a recursive component if it throws during the first creation pass', () => {
            let hasThrown = false;
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: `<ng-content></ng-content>OK`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                    constructor() {
                        if (!hasThrown) {
                            hasThrown = true;
                            throw new Error('Error in a constructor');
                        }
                    }
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
                        template: `<test><test><test></test></test></test>`,
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
                declarations: [App, TestCmpt],
            });
            expect(() => {
                testing_1.TestBed.createComponent(App);
            }).toThrowError('Error in a constructor');
            const fixture = testing_1.TestBed.createComponent(App);
            expect(fixture.nativeElement.textContent).toContain('OKOKOK');
        });
        it('should continue detecting changes if a directive throws in its constructor', () => {
            let firstRun = true;
            let FailInConstructorOnce = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[failInConstructorOnce]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FailInConstructorOnce = _classThis = class {
                    constructor() {
                        if (firstRun) {
                            firstRun = false;
                            throw new Error('Error in a constructor');
                        }
                    }
                };
                __setFunctionName(_classThis, "FailInConstructorOnce");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FailInConstructorOnce = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FailInConstructorOnce = _classThis;
            })();
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<div failInConstructorOnce>{{value}}</div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmpt = _classThis = class {
                    constructor() {
                        this.value = 0;
                    }
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
            testing_1.TestBed.configureTestingModule({
                declarations: [TestCmpt, FailInConstructorOnce],
            });
            expect(() => {
                testing_1.TestBed.createComponent(TestCmpt);
            }).toThrowError('Error in a constructor');
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toContain('0');
            fixture.componentInstance.value = 1;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toContain('1');
            fixture.componentInstance.value = 2;
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toContain('2');
        });
        it('should consistently report errors raised by createEmbeddedView', () => {
            // Intentionally hasn't been added to `providers` so that it throws a DI error.
            let DoesNotExist = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DoesNotExist = _classThis = class {
                };
                __setFunctionName(_classThis, "DoesNotExist");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DoesNotExist = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DoesNotExist = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(willCauseError) { }
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
                        template: `
          <ng-template #broken>
            <dir></dir>
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var App = _classThis = class {
                    constructor(_viewContainerRef) {
                        this._viewContainerRef = _viewContainerRef;
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        __runInitializers(this, _template_extraInitializers);
                        this._viewContainerRef = _viewContainerRef;
                    }
                    insertTemplate() {
                        this._viewContainerRef.createEmbeddedView(this.template);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)('broken')];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, Dir] });
            const fixture = testing_1.TestBed.createComponent(App);
            const tryRender = () => {
                fixture.componentInstance.insertTemplate();
                fixture.detectChanges();
            };
            fixture.detectChanges();
            // We try to render the same template twice to ensure that we get consistent error messages.
            expect(tryRender).toThrowError(/No provider for DoesNotExist/);
            expect(tryRender).toThrowError(/No provider for DoesNotExist/);
        });
    });
});
