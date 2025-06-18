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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('TemplateRef', () => {
    describe('rootNodes', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<ng-template #templateRef></ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.minutes = (__runInitializers(this, _templateRef_extraInitializers), 0);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)('templateRef', { static: true })];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        function getRootNodes(template) {
            testing_1.TestBed.configureTestingModule({
                declarations: [App],
            });
            testing_1.TestBed.overrideTemplate(App, template);
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const embeddedView = fixture.componentInstance.templateRef.createEmbeddedView({});
            embeddedView.detectChanges();
            return embeddedView.rootNodes;
        }
        it('should return root render nodes for an embedded view instance', () => {
            const rootNodes = getRootNodes(`<ng-template #templateRef><div></div>some text<span></span></ng-template>`);
            expect(rootNodes.length).toBe(3);
        });
        it('should return an empty array for embedded view with no nodes', () => {
            const rootNodes = getRootNodes('<ng-template #templateRef></ng-template>');
            expect(rootNodes.length).toBe(0);
        });
        it('should include projected nodes and their children', () => {
            let MenuContent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'menu-content',
                        template: `
              <ng-template>
                Header
                <ng-content></ng-content>
              </ng-template>
            `,
                        exportAs: 'menuContent',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var MenuContent = _classThis = class {
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MenuContent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MenuContent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MenuContent = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <menu-content #menu="menuContent">
                <button>Item one</button>
                <button>Item two</button>
                <ng-template [ngIf]="true"><button>Item three</button></ng-template>
              </menu-content>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _content_decorators;
                let _content_initializers = [];
                let _content_extraInitializers = [];
                var App = _classThis = class {
                    constructor(viewContainerRef) {
                        this.viewContainerRef = viewContainerRef;
                        this.content = __runInitializers(this, _content_initializers, void 0);
                        __runInitializers(this, _content_extraInitializers);
                        this.viewContainerRef = viewContainerRef;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _content_decorators = [(0, core_1.ViewChild)(MenuContent)];
                    __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [MenuContent, App],
                providers: [(0, core_1.provideNgReflectAttributes)()],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const instance = fixture.componentInstance;
            const viewRef = instance.viewContainerRef.createEmbeddedView(instance.content.template);
            const rootNodeTextContent = viewRef.rootNodes
                .map((node) => node && node.textContent.trim())
                .filter((text) => text !== '' && text.indexOf('ng-reflect-ng-if') === -1);
            expect(rootNodeTextContent).toEqual(['Header', 'Item one', 'Item two', 'Item three']);
        });
        it('should descend into view containers on ng-template', () => {
            const rootNodes = getRootNodes(`
      <ng-template #templateRef>
        <ng-template [ngIf]="true">text|</ng-template>SUFFIX
      </ng-template>`);
            expect(rootNodes.length).toBe(3);
            expect(rootNodes[0].nodeType).toBe(Node.COMMENT_NODE);
            expect(rootNodes[1].nodeType).toBe(Node.TEXT_NODE);
            expect(rootNodes[2].nodeType).toBe(Node.TEXT_NODE);
        });
        it('should descend into view containers on an element', () => {
            /**
             * Expected DOM structure:
             * ```
             * <div ng-reflect-ng-template-outlet="[object Object]"></div>
             * text
             * <!--container-->
             * SUFFIX
             * ```
             */
            const rootNodes = getRootNodes(`
        <ng-template #dynamicTpl>text</ng-template>
        <ng-template #templateRef>
          <div [ngTemplateOutlet]="dynamicTpl"></div>SUFFIX
        </ng-template>
      `);
            expect(rootNodes.length).toBe(4);
            expect(rootNodes[0].nodeType).toBe(Node.ELEMENT_NODE);
            expect(rootNodes[1].nodeType).toBe(Node.TEXT_NODE);
            // This comment node is an anchor for the `ViewContainerRef`
            // created within the `NgTemplateOutlet` class.
            expect(rootNodes[2].nodeType).toBe(Node.COMMENT_NODE);
            expect(rootNodes[3].nodeType).toBe(Node.TEXT_NODE);
        });
        it('should descend into view containers on ng-container', () => {
            const rootNodes = getRootNodes(`
          <ng-template #dynamicTpl>text</ng-template>
          <ng-template #templateRef><ng-container [ngTemplateOutlet]="dynamicTpl"></ng-container>SUFFIX</ng-template>
        `);
            expect(rootNodes.length).toBe(3);
            expect(rootNodes[0].nodeType).toBe(Node.COMMENT_NODE);
            expect(rootNodes[1].nodeType).toBe(Node.TEXT_NODE);
            expect(rootNodes[2].nodeType).toBe(Node.TEXT_NODE);
        });
        it('should descend into element containers', () => {
            const rootNodes = getRootNodes(`
          <ng-template #templateRef>
            <ng-container>text</ng-container>
          </ng-template>
        `);
            expect(rootNodes.length).toBe(2);
            expect(rootNodes[0].nodeType).toBe(Node.COMMENT_NODE);
            expect(rootNodes[1].nodeType).toBe(Node.TEXT_NODE);
        });
        xit('should descend into ICU containers', () => {
            const rootNodes = getRootNodes(`
          <ng-template #templateRef>
            <ng-container i18n>Updated {minutes, select, =0 {just now} other {some time ago}}</ng-container>
          </ng-template>
        `);
            expect(rootNodes.length).toBe(4);
            expect(rootNodes[0].nodeType).toBe(Node.COMMENT_NODE); // ng-container
            expect(rootNodes[1].nodeType).toBe(Node.TEXT_NODE); // "Updated " text
            expect(rootNodes[2].nodeType).toBe(Node.COMMENT_NODE); // ICU container
            expect(rootNodes[3].nodeType).toBe(Node.TEXT_NODE); // "one minute ago" text
        });
        it('should return an empty array for an embedded view with projection and no projectable nodes', () => {
            const rootNodes = getRootNodes(`<ng-template #templateRef><ng-content></ng-content></ng-template>`);
            expect(rootNodes.length).toBe(0);
        });
        it('should return an empty array for an embedded view with multiple projections and no projectable nodes', () => {
            const rootNodes = getRootNodes(`<ng-template #templateRef><ng-content></ng-content><ng-content select="foo"></ng-content></ng-template>`);
            expect(rootNodes.length).toBe(0);
        });
        describe('projectable nodes provided to a dynamically created component', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _templateRef_decorators;
                let _templateRef_initializers = [];
                let _templateRef_extraInitializers = [];
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                        __runInitializers(this, _templateRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _templateRef_decorators = [(0, core_1.ViewChild)('templateRef', { static: true })];
                    __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(vcr) {
                        this.vcr = vcr;
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
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({ declarations: [TestCmp, DynamicCmp] });
            });
            it('should return projectable nodes when provided', () => {
                testing_1.TestBed.overrideTemplate(DynamicCmp, `<ng-template #templateRef><ng-content></ng-content></ng-template>`);
                const fixture = testing_1.TestBed.createComponent(TestCmp);
                // Number of projectable nodes matches the number of slots - all nodes should be returned
                const projectableNodes = [[document.createTextNode('textNode')]];
                const cmptRef = fixture.componentInstance.vcr.createComponent(DynamicCmp, {
                    injector: core_1.Injector.NULL,
                    projectableNodes,
                });
                const viewRef = cmptRef.instance.templateRef.createEmbeddedView({});
                expect(viewRef.rootNodes.length).toBe(1);
            });
            it('should return an empty collection when no projectable nodes were provided', () => {
                testing_1.TestBed.overrideTemplate(DynamicCmp, `<ng-template #templateRef><ng-content></ng-content></ng-template>`);
                const fixture = testing_1.TestBed.createComponent(TestCmp);
                // There are slots but projectable nodes were not provided - nothing should be returned
                const cmptRef = fixture.componentInstance.vcr.createComponent(DynamicCmp, {
                    injector: core_1.Injector.NULL,
                    projectableNodes: [],
                });
                const viewRef = cmptRef.instance.templateRef.createEmbeddedView({});
                expect(viewRef.rootNodes.length).toBe(0);
            });
            it('should return an empty collection when projectable nodes were provided but there are no slots', () => {
                testing_1.TestBed.overrideTemplate(DynamicCmp, `<ng-template #templateRef></ng-template>`);
                const fixture = testing_1.TestBed.createComponent(TestCmp);
                // There are no slots but projectable were provided - nothing should be returned
                const projectableNodes = [[document.createTextNode('textNode')]];
                const cmptRef = fixture.componentInstance.vcr.createComponent(DynamicCmp, {
                    injector: core_1.Injector.NULL,
                    projectableNodes,
                });
                const viewRef = cmptRef.instance.templateRef.createEmbeddedView({});
                expect(viewRef.rootNodes.length).toBe(0);
            });
        });
    });
    describe('context', () => {
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <ng-template #templateRef let-name="name">{{name}}</ng-template>
      <ng-container #containerRef></ng-container>
    `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            let _containerRef_decorators;
            let _containerRef_initializers = [];
            let _containerRef_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.containerRef = (__runInitializers(this, _templateRef_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                    __runInitializers(this, _containerRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)('templateRef')];
                _containerRef_decorators = [(0, core_1.ViewChild)('containerRef', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        it('should update if the context of a view ref is mutated', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const context = { name: 'Frodo' };
            const viewRef = fixture.componentInstance.templateRef.createEmbeddedView(context);
            fixture.componentInstance.containerRef.insert(viewRef);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Frodo');
            context.name = 'Bilbo';
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Bilbo');
        });
        it('should update if the context of a view ref is replaced', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const viewRef = fixture.componentInstance.templateRef.createEmbeddedView({ name: 'Frodo' });
            fixture.componentInstance.containerRef.insert(viewRef);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Frodo');
            viewRef.context = { name: 'Bilbo' };
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Bilbo');
        });
        it('should use the latest context information inside template listeners', () => {
            const events = [];
            let ListenerTest = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #templateRef let-name="name">
            <button (click)="log(name)"></button>
          </ng-template>
          <ng-container #containerRef></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _templateRef_decorators;
                let _templateRef_initializers = [];
                let _templateRef_extraInitializers = [];
                let _containerRef_decorators;
                let _containerRef_initializers = [];
                let _containerRef_extraInitializers = [];
                var ListenerTest = _classThis = class {
                    log(name) {
                        events.push(name);
                    }
                    constructor() {
                        this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                        this.containerRef = (__runInitializers(this, _templateRef_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                        __runInitializers(this, _containerRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ListenerTest");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _templateRef_decorators = [(0, core_1.ViewChild)('templateRef')];
                    _containerRef_decorators = [(0, core_1.ViewChild)('containerRef', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                    __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ListenerTest = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ListenerTest = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [ListenerTest] });
            const fixture = testing_1.TestBed.createComponent(ListenerTest);
            fixture.detectChanges();
            const viewRef = fixture.componentInstance.templateRef.createEmbeddedView({ name: 'Frodo' });
            fixture.componentInstance.containerRef.insert(viewRef);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            expect(events).toEqual(['Frodo']);
            viewRef.context = { name: 'Bilbo' };
            fixture.detectChanges();
            button.click();
            expect(events).toEqual(['Frodo', 'Bilbo']);
        });
        it('should warn if the context of an embedded view ref is replaced', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [App] });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            const viewRef = fixture.componentInstance.templateRef.createEmbeddedView({ name: 'Frodo' });
            fixture.componentInstance.containerRef.insert(viewRef);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Frodo');
            spyOn(console, 'warn');
            viewRef.context = { name: 'Bilbo' };
            fixture.detectChanges();
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining('Replacing the `context` object of an `EmbeddedViewRef` is deprecated'));
            expect(fixture.nativeElement.textContent).toBe('Bilbo');
        });
    });
});
