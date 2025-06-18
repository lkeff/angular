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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const event_emitter_1 = require("../../src/event_emitter");
const type_checks_1 = require("../../src/render3/interfaces/type_checks");
const view_1 = require("../../src/render3/interfaces/view");
const testing_1 = require("../../testing");
const context_discovery_1 = require("../../src/render3/context_discovery");
const index_1 = require("../../src/render3/index");
const discovery_utils_1 = require("../../src/render3/util/discovery_utils");
describe('discovery utils', () => {
    let fixture;
    let myApp;
    let dirA;
    let childComponent;
    let child;
    let span;
    let div;
    let p;
    let log;
    beforeEach(() => {
        log = [];
        dirA = [];
        childComponent = [];
        testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule],
            declarations: [MyApp, DirectiveA, Child],
            providers: [{ provide: String, useValue: 'Module' }],
        });
        fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        child = fixture.nativeElement.querySelectorAll('child');
        span = fixture.nativeElement.querySelectorAll('span');
        div = fixture.nativeElement.querySelectorAll('div');
        p = fixture.nativeElement.querySelectorAll('p');
    });
    let Child = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'child',
                template: '<p></p>',
                providers: [{ provide: String, useValue: 'Child' }],
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var Child = _classThis = class {
            constructor() {
                childComponent.push(this);
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
    let DirectiveA = (() => {
        let _classDecorators = [(0, core_1.Directive)({
                selector: '[dirA]',
                exportAs: 'dirA',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _b_decorators;
        let _b_initializers = [];
        let _b_extraInitializers = [];
        let _d_decorators;
        let _d_initializers = [];
        let _d_extraInitializers = [];
        var DirectiveA = _classThis = class {
            constructor() {
                this.b = __runInitializers(this, _b_initializers, 2);
                this.d = (__runInitializers(this, _b_extraInitializers), __runInitializers(this, _d_initializers, new event_emitter_1.EventEmitter()));
                __runInitializers(this, _d_extraInitializers);
                dirA.push(this);
            }
        };
        __setFunctionName(_classThis, "DirectiveA");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _b_decorators = [(0, core_1.Input)('a')];
            _d_decorators = [(0, core_1.Output)('c')];
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, null, _d_decorators, { kind: "field", name: "d", static: false, private: false, access: { has: obj => "d" in obj, get: obj => obj.d, set: (obj, value) => { obj.d = value; } }, metadata: _metadata }, _d_initializers, _d_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DirectiveA = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DirectiveA = _classThis;
    })();
    let MyApp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'my-app',
                template: `
      <span (click)="log($event)" *ngIf="spanVisible">{{text}}</span>
      <div dirA #div #foo="dirA"></div>
      <child></child>
      <child dirA #child></child>
      <child dirA *ngIf="conditionalChildVisible"></child>
      <ng-container><p></p></ng-container>
      <b *ngIf="visible">Bold</b>
    `,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _b_decorators;
        let _b_initializers = [];
        let _b_extraInitializers = [];
        let _d_decorators;
        let _d_initializers = [];
        let _d_extraInitializers = [];
        var MyApp = _classThis = class {
            constructor() {
                this.text = 'INIT';
                this.spanVisible = true;
                this.conditionalChildVisible = true;
                this.b = __runInitializers(this, _b_initializers, 2);
                this.d = (__runInitializers(this, _b_extraInitializers), __runInitializers(this, _d_initializers, new event_emitter_1.EventEmitter()));
                __runInitializers(this, _d_extraInitializers);
                myApp = this;
            }
            log(event) {
                log.push(event);
            }
        };
        __setFunctionName(_classThis, "MyApp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _b_decorators = [(0, core_1.Input)('a')];
            _d_decorators = [(0, core_1.Output)('c')];
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, null, _d_decorators, { kind: "field", name: "d", static: false, private: false, access: { has: obj => "d" in obj, get: obj => obj.d, set: (obj, value) => { obj.d = value; } }, metadata: _metadata }, _d_initializers, _d_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyApp = _classThis;
    })();
    describe('getComponent', () => {
        it('should return null if no component', () => {
            expect((0, discovery_utils_1.getComponent)(span[0])).toEqual(null);
            expect((0, discovery_utils_1.getComponent)(div[0])).toEqual(null);
            expect((0, discovery_utils_1.getComponent)(p[0])).toEqual(null);
        });
        it('should throw when called on non-element', () => {
            expect(() => (0, discovery_utils_1.getComponent)(dirA[0])).toThrowError(/Expecting instance of DOM Element/);
            expect(() => (0, discovery_utils_1.getComponent)(dirA[1])).toThrowError(/Expecting instance of DOM Element/);
        });
        it('should return component from element', () => {
            expect((0, discovery_utils_1.getComponent)(fixture.nativeElement)).toEqual(myApp);
            expect((0, discovery_utils_1.getComponent)(child[0])).toEqual(childComponent[0]);
            expect((0, discovery_utils_1.getComponent)(child[1])).toEqual(childComponent[1]);
        });
        it('should not throw when called on a destroyed node', () => {
            expect((0, discovery_utils_1.getComponent)(span[0])).toEqual(null);
            expect((0, discovery_utils_1.getComponent)(child[2])).toEqual(childComponent[2]);
            fixture.componentInstance.spanVisible = false;
            fixture.componentInstance.conditionalChildVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getComponent)(span[0])).toEqual(null);
            expect((0, discovery_utils_1.getComponent)(child[2])).toEqual(childComponent[2]);
        });
    });
    describe('getComponentLView', () => {
        it('should retrieve component LView from element', () => {
            const childLView = (0, discovery_utils_1.getComponentLView)(child[0]);
            expect((0, type_checks_1.isLView)(childLView)).toBe(true);
            expect(childLView[view_1.CONTEXT] instanceof Child).toBe(true);
        });
        it('should retrieve component LView from component instance', () => {
            const childLView = (0, discovery_utils_1.getComponentLView)(childComponent[0]);
            expect((0, type_checks_1.isLView)(childLView)).toBe(true);
            expect(childLView[view_1.CONTEXT] instanceof Child).toBe(true);
        });
    });
    describe('getContext', () => {
        it('should throw when called on non-element', () => {
            expect(() => (0, discovery_utils_1.getContext)(dirA[0])).toThrowError(/Expecting instance of DOM Element/);
            expect(() => (0, discovery_utils_1.getContext)(dirA[1])).toThrowError(/Expecting instance of DOM Element/);
        });
        it('should return context from element', () => {
            expect((0, discovery_utils_1.getContext)(child[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getContext)(child[2]).$implicit).toEqual(true);
            expect((0, discovery_utils_1.getContext)(p[0])).toEqual(childComponent[0]);
        });
        it('should return null for destroyed node', () => {
            expect((0, discovery_utils_1.getContext)(span[0])).toBeTruthy();
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getContext)(span[0])).toBeNull();
        });
    });
    describe('getHostElement', () => {
        it('should return element on component', () => {
            expect((0, index_1.getHostElement)(myApp)).toEqual(fixture.nativeElement);
            expect((0, index_1.getHostElement)(childComponent[0])).toEqual(child[0]);
            expect((0, index_1.getHostElement)(childComponent[1])).toEqual(child[1]);
        });
        it('should return element on directive', () => {
            expect((0, index_1.getHostElement)(dirA[0])).toEqual(div[0]);
            expect((0, index_1.getHostElement)(dirA[1])).toEqual(child[1]);
        });
        it('should throw on unknown target', () => {
            expect(() => (0, index_1.getHostElement)({})).toThrowError(); //
        });
        it('should return element for destroyed node', () => {
            expect((0, index_1.getHostElement)(span[0])).toEqual(span[0]);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, index_1.getHostElement)(span[0])).toEqual(span[0]);
        });
    });
    describe('getInjector', () => {
        it('should return node-injector from element', () => {
            expect((0, discovery_utils_1.getInjector)(fixture.nativeElement).get(String)).toEqual('Module');
            expect((0, discovery_utils_1.getInjector)(child[0]).get(String)).toEqual('Child');
            expect((0, discovery_utils_1.getInjector)(p[0]).get(String)).toEqual('Child');
        });
        it('should return node-injector from component with providers', () => {
            expect((0, discovery_utils_1.getInjector)(myApp).get(String)).toEqual('Module');
            expect((0, discovery_utils_1.getInjector)(childComponent[0]).get(String)).toEqual('Child');
            expect((0, discovery_utils_1.getInjector)(childComponent[1]).get(String)).toEqual('Child');
        });
        it('should return node-injector from directive without providers', () => {
            expect((0, discovery_utils_1.getInjector)(dirA[0]).get(String)).toEqual('Module');
            expect((0, discovery_utils_1.getInjector)(dirA[1]).get(String)).toEqual('Child');
        });
        it('should retrieve injector from destroyed node', () => {
            expect((0, discovery_utils_1.getInjector)(span[0])).toBeTruthy();
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getInjector)(span[0])).toBeTruthy();
        });
    });
    describe('getDirectives', () => {
        it('should return empty array if no directives', () => {
            expect((0, discovery_utils_1.getDirectives)(fixture.nativeElement)).toEqual([]);
            expect((0, discovery_utils_1.getDirectives)(span[0])).toEqual([]);
            expect((0, discovery_utils_1.getDirectives)(child[0])).toEqual([]);
        });
        it('should return just directives', () => {
            expect((0, discovery_utils_1.getDirectives)(div[0])).toEqual([dirA[0]]);
            expect((0, discovery_utils_1.getDirectives)(child[1])).toEqual([dirA[1]]);
        });
        it('should return empty array for destroyed node', () => {
            expect((0, discovery_utils_1.getDirectives)(span[0])).toEqual([]);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getDirectives)(span[0])).toEqual([]);
        });
    });
    describe('getOwningComponent', () => {
        it('should return null when called on root component', () => {
            expect((0, discovery_utils_1.getOwningComponent)(fixture.nativeElement)).toEqual(null);
            expect((0, discovery_utils_1.getOwningComponent)(myApp)).toEqual(null);
        });
        it('should return containing component of child component', () => {
            expect((0, discovery_utils_1.getOwningComponent)(child[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(child[1])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(child[2])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(childComponent[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(childComponent[1])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(childComponent[2])).toEqual(myApp);
        });
        it('should return containing component of any view element', () => {
            expect((0, discovery_utils_1.getOwningComponent)(span[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(div[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(p[0])).toEqual(childComponent[0]);
            expect((0, discovery_utils_1.getOwningComponent)(p[1])).toEqual(childComponent[1]);
            expect((0, discovery_utils_1.getOwningComponent)(p[2])).toEqual(childComponent[2]);
        });
        it('should return containing component of child directive', () => {
            expect((0, discovery_utils_1.getOwningComponent)(dirA[0])).toEqual(myApp);
            expect((0, discovery_utils_1.getOwningComponent)(dirA[1])).toEqual(myApp);
        });
        it('should return null for destroyed node', () => {
            expect((0, discovery_utils_1.getOwningComponent)(span[0])).toEqual(myApp);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getOwningComponent)(span[0])).toEqual(null);
        });
    });
    describe('getLocalRefs', () => {
        it('should retrieve empty map', () => {
            expect((0, discovery_utils_1.getLocalRefs)(fixture.nativeElement)).toEqual({});
            expect((0, discovery_utils_1.getLocalRefs)(myApp)).toEqual({});
            expect((0, discovery_utils_1.getLocalRefs)(span[0])).toEqual({});
            expect((0, discovery_utils_1.getLocalRefs)(child[0])).toEqual({});
        });
        it('should retrieve the local map', () => {
            expect((0, discovery_utils_1.getLocalRefs)(div[0])).toEqual({ div: div[0], foo: dirA[0] });
            expect((0, discovery_utils_1.getLocalRefs)(dirA[0])).toEqual({ div: div[0], foo: dirA[0] });
            expect((0, discovery_utils_1.getLocalRefs)(child[1])).toEqual({ child: childComponent[1] });
            expect((0, discovery_utils_1.getLocalRefs)(dirA[1])).toEqual({ child: childComponent[1] });
        });
        it('should retrieve from a destroyed node', () => {
            expect((0, discovery_utils_1.getLocalRefs)(span[0])).toEqual({});
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getLocalRefs)(span[0])).toEqual({});
        });
    });
    describe('getRootComponents', () => {
        it('should return root components from component', () => {
            const rootComponents = [myApp];
            expect((0, discovery_utils_1.getRootComponents)(myApp)).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(childComponent[0])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(childComponent[1])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(dirA[0])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(dirA[1])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(child[0])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(child[1])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(div[0])).toEqual(rootComponents);
            expect((0, discovery_utils_1.getRootComponents)(p[0])).toEqual(rootComponents);
        });
        it('should return an empty array for a destroyed node', () => {
            expect((0, discovery_utils_1.getRootComponents)(span[0])).toEqual([myApp]);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getRootComponents)(span[0])).toEqual([]);
        });
    });
    describe('getListeners', () => {
        it('should return no listeners', () => {
            expect((0, discovery_utils_1.getListeners)(fixture.nativeElement)).toEqual([]);
            expect((0, discovery_utils_1.getListeners)(child[0])).toEqual([]);
        });
        it('should return the listeners', () => {
            const listeners = (0, discovery_utils_1.getListeners)(span[0]);
            expect(listeners.length).toEqual(1);
            expect(listeners[0].name).toEqual('click');
            expect(listeners[0].element).toEqual(span[0]);
            expect(listeners[0].useCapture).toEqual(false);
            expect(listeners[0].type).toEqual('dom');
            listeners[0].callback('CLICKED');
            expect(log).toEqual(['CLICKED']);
        });
        it('should return no listeners for destroyed node', () => {
            expect((0, discovery_utils_1.getListeners)(span[0]).length).toEqual(1);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getListeners)(span[0]).length).toEqual(0);
        });
    });
    describe('getInjectionTokens', () => {
        it('should retrieve tokens', () => {
            expect((0, discovery_utils_1.getInjectionTokens)(fixture.nativeElement)).toEqual([MyApp]);
            expect((0, discovery_utils_1.getInjectionTokens)(child[0])).toEqual([String, Child]);
            expect((0, discovery_utils_1.getInjectionTokens)(child[1])).toEqual([String, Child, DirectiveA]);
        });
        it('should retrieve tokens from destroyed node', () => {
            expect((0, discovery_utils_1.getInjectionTokens)(span[0])).toEqual([]);
            fixture.componentInstance.spanVisible = false;
            fixture.detectChanges();
            expect((0, discovery_utils_1.getInjectionTokens)(span[0])).toEqual([]);
        });
    });
    describe('getLContext', () => {
        it('should work on components', () => {
            const lContext = (0, context_discovery_1.getLContext)(child[0]);
            expect(lContext).toBeDefined();
            expect(lContext.native).toBe(child[0]);
        });
        it('should work on templates', () => {
            const templateComment = Array.from(fixture.nativeElement.childNodes).find((node) => node.nodeType === Node.COMMENT_NODE);
            const lContext = (0, context_discovery_1.getLContext)(templateComment);
            expect(lContext).toBeDefined();
            expect(lContext.native).toBe(templateComment);
        });
        it('should work on ng-container', () => {
            const ngContainerComment = Array.from(fixture.nativeElement.childNodes).find((node) => node.nodeType === Node.COMMENT_NODE && node.textContent === `ng-container`);
            const lContext = (0, context_discovery_1.getLContext)(ngContainerComment);
            expect(lContext).toBeDefined();
            expect(lContext.native).toBe(ngContainerComment);
        });
    });
    describe('getDirectiveMetadata', () => {
        it('should work with components', () => {
            const metadata = (0, discovery_utils_1.getDirectiveMetadata)(myApp);
            expect(metadata.inputs).toEqual({ a: 'b' });
            expect(metadata.outputs).toEqual({ c: 'd' });
            expect(metadata.changeDetection).toBe(core_1.ChangeDetectionStrategy.Default);
            expect(metadata.encapsulation).toBe(core_1.ViewEncapsulation.None);
        });
        it('should work with directives', () => {
            const metadata = (0, discovery_utils_1.getDirectiveMetadata)((0, discovery_utils_1.getDirectives)(div[0])[0]);
            expect(metadata.inputs).toEqual({ a: 'b' });
            expect(metadata.outputs).toEqual({ c: 'd' });
        });
    });
});
describe('discovery utils deprecated', () => {
    describe('getRootComponents()', () => {
        it('should return a list of the root components of the application from an element', () => {
            let InnerComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'inner-comp',
                        template: '<div></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var InnerComp = _classThis = class {
                };
                __setFunctionName(_classThis, "InnerComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    InnerComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return InnerComp = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<inner-comp></inner-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Comp, InnerComp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            const hostElm = fixture.nativeElement;
            const innerElm = hostElm.querySelector('inner-comp');
            const divElm = hostElm.querySelector('div');
            const component = fixture.componentInstance;
            expect((0, discovery_utils_1.getRootComponents)(hostElm)).toEqual([component]);
            expect((0, discovery_utils_1.getRootComponents)(innerElm)).toEqual([component]);
            expect((0, discovery_utils_1.getRootComponents)(divElm)).toEqual([component]);
        });
    });
    describe('getDirectives()', () => {
        it('should return a list of the directives that are on the given element', () => {
            let MyDir1 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-dir-1]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir1 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyDir1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir1 = _classThis;
            })();
            let MyDir2 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-dir-2]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir2 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyDir2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir2 = _classThis;
            })();
            let MyDir3 = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[my-dir-3]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir3 = _classThis = class {
                };
                __setFunctionName(_classThis, "MyDir3");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir3 = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `
          <div my-dir-1 my-dir-2></div>
          <div my-dir-3></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myDir1Instance_decorators;
                let _myDir1Instance_initializers = [];
                let _myDir1Instance_extraInitializers = [];
                let _myDir2Instance_decorators;
                let _myDir2Instance_initializers = [];
                let _myDir2Instance_extraInitializers = [];
                let _myDir3Instance_decorators;
                let _myDir3Instance_initializers = [];
                let _myDir3Instance_extraInitializers = [];
                var Comp = _classThis = class {
                    constructor() {
                        this.myDir1Instance = __runInitializers(this, _myDir1Instance_initializers, void 0);
                        this.myDir2Instance = (__runInitializers(this, _myDir1Instance_extraInitializers), __runInitializers(this, _myDir2Instance_initializers, void 0));
                        this.myDir3Instance = (__runInitializers(this, _myDir2Instance_extraInitializers), __runInitializers(this, _myDir3Instance_initializers, void 0));
                        __runInitializers(this, _myDir3Instance_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myDir1Instance_decorators = [(0, core_1.ViewChild)(MyDir1)];
                    _myDir2Instance_decorators = [(0, core_1.ViewChild)(MyDir2)];
                    _myDir3Instance_decorators = [(0, core_1.ViewChild)(MyDir3)];
                    __esDecorate(null, null, _myDir1Instance_decorators, { kind: "field", name: "myDir1Instance", static: false, private: false, access: { has: obj => "myDir1Instance" in obj, get: obj => obj.myDir1Instance, set: (obj, value) => { obj.myDir1Instance = value; } }, metadata: _metadata }, _myDir1Instance_initializers, _myDir1Instance_extraInitializers);
                    __esDecorate(null, null, _myDir2Instance_decorators, { kind: "field", name: "myDir2Instance", static: false, private: false, access: { has: obj => "myDir2Instance" in obj, get: obj => obj.myDir2Instance, set: (obj, value) => { obj.myDir2Instance = value; } }, metadata: _metadata }, _myDir2Instance_initializers, _myDir2Instance_extraInitializers);
                    __esDecorate(null, null, _myDir3Instance_decorators, { kind: "field", name: "myDir3Instance", static: false, private: false, access: { has: obj => "myDir3Instance" in obj, get: obj => obj.myDir3Instance, set: (obj, value) => { obj.myDir3Instance = value; } }, metadata: _metadata }, _myDir3Instance_initializers, _myDir3Instance_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Comp, MyDir1, MyDir2, MyDir3] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            const hostElm = fixture.nativeElement;
            const elements = hostElm.querySelectorAll('div');
            const elm1 = elements[0];
            const elm1Dirs = (0, discovery_utils_1.getDirectives)(elm1);
            expect(elm1Dirs).toContain(fixture.componentInstance.myDir1Instance);
            expect(elm1Dirs).toContain(fixture.componentInstance.myDir2Instance);
            const elm2 = elements[1];
            const elm2Dirs = (0, discovery_utils_1.getDirectives)(elm2);
            expect(elm2Dirs).toContain(fixture.componentInstance.myDir3Instance);
        });
        it('should not throw if it cannot find LContext', () => {
            let result;
            expect(() => {
                result = (0, discovery_utils_1.getDirectives)(document.createElement('div'));
            }).not.toThrow();
            expect(result).toEqual([]);
        });
    });
    describe('getInjector', () => {
        it('should return an injector that can return directive instances', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            const nodeInjector = (0, discovery_utils_1.getInjector)(fixture.nativeElement);
            expect(nodeInjector.get(Comp)).toEqual(jasmine.any(Comp));
        });
        it('should return an injector that falls-back to a module injector', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            class TestToken {
            }
            const token = new core_1.InjectionToken('test token');
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp],
                providers: [{ provide: token, useValue: new TestToken() }],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            const nodeInjector = (0, discovery_utils_1.getInjector)(fixture.nativeElement);
            expect(nodeInjector.get(token)).toEqual(jasmine.any(TestToken));
        });
    });
    describe('getLocalRefs', () => {
        it('should return a map of local refs for an element', () => {
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDir]',
                        exportAs: 'myDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
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
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div myDir #elRef #dirRef="myDir"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
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
            testing_1.TestBed.configureTestingModule({ declarations: [Comp, MyDir] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            const divEl = fixture.nativeElement.querySelector('div');
            const localRefs = (0, discovery_utils_1.getLocalRefs)(divEl);
            expect(localRefs['elRef'].tagName.toLowerCase()).toBe('div');
            expect(localRefs['dirRef'].constructor).toBe(MyDir);
        });
        it('should return a map of local refs for an element with styling context', () => {
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<div #elRef class="fooClass" [style.color]="color"></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        this.color = 'red';
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
            testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            const divEl = fixture.nativeElement.querySelector('div');
            const localRefs = (0, discovery_utils_1.getLocalRefs)(divEl);
            expect(localRefs['elRef'].tagName.toLowerCase()).toBe('div');
        });
    });
});
