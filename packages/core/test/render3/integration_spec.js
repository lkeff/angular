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
const context_discovery_1 = require("../../src/render3/context_discovery");
const view_1 = require("../../src/render3/interfaces/view");
const sanitizer_1 = require("../../src/sanitization/sanitizer");
describe('element discovery', () => {
    it('should only monkey-patch immediate child nodes in a component', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div><p></p></div>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const host = fixture.nativeElement;
        const parent = host.querySelector('div');
        const child = host.querySelector('p');
        expect((0, context_discovery_1.readPatchedData)(parent)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(child)).toBeFalsy();
    });
    it('should only monkey-patch immediate child nodes in a sub component', () => {
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    template: `
        <div></div>
        <div></div>
        <div></div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    imports: [ChildComp],
                    template: `
        <section>
          <child-comp></child-comp>
        </section>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const host = fixture.nativeElement;
        const child = host.querySelector('child-comp');
        expect((0, context_discovery_1.readPatchedData)(child)).toBeTruthy();
        const [kid1, kid2, kid3] = Array.from(host.querySelectorAll('child-comp > *'));
        expect((0, context_discovery_1.readPatchedData)(kid1)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(kid2)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(kid3)).toBeTruthy();
    });
    it('should only monkey-patch immediate child nodes in an embedded template container', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    imports: [common_1.CommonModule],
                    template: `
        <section>
          <ng-container *ngIf="true">
            <div><p></p></div>
            <div></div>
          </ng-container>
        </section>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const host = fixture.nativeElement;
        const [section, div1, p, div2] = Array.from(host.querySelectorAll('section, div, p'));
        expect(section.nodeName.toLowerCase()).toBe('section');
        expect((0, context_discovery_1.readPatchedData)(section)).toBeTruthy();
        expect(div1.nodeName.toLowerCase()).toBe('div');
        expect((0, context_discovery_1.readPatchedData)(div1)).toBeTruthy();
        expect(p.nodeName.toLowerCase()).toBe('p');
        expect((0, context_discovery_1.readPatchedData)(p)).toBeFalsy();
        expect(div2.nodeName.toLowerCase()).toBe('div');
        expect((0, context_discovery_1.readPatchedData)(div2)).toBeTruthy();
    });
    it('should return a context object from a given dom node', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: `
        <section></section>
        <div></div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const section = fixture.nativeElement.querySelector('section');
        const sectionContext = (0, context_discovery_1.getLContext)(section);
        expect(sectionContext.nodeIndex).toEqual(view_1.HEADER_OFFSET);
        expect(sectionContext.lView.length).toBeGreaterThan(view_1.HEADER_OFFSET);
        expect(sectionContext.native).toBe(section);
        const div = fixture.nativeElement.querySelector('div');
        const divContext = (0, context_discovery_1.getLContext)(div);
        expect(divContext.nodeIndex).toEqual(view_1.HEADER_OFFSET + 1);
        expect(divContext.lView.length).toBeGreaterThan(view_1.HEADER_OFFSET);
        expect(divContext.native).toBe(div);
        expect(divContext.lView).toBe(sectionContext.lView);
    });
    it('should cache the element context on a element was preemptively monkey-patched', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: `
        <section></section>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const section = fixture.nativeElement.querySelector('section');
        const result1 = (0, context_discovery_1.readPatchedData)(section);
        expect(Array.isArray(result1)).toBeTruthy();
        const context = (0, context_discovery_1.getLContext)(section);
        const result2 = (0, context_discovery_1.readPatchedData)(section);
        expect(Array.isArray(result2)).toBeFalsy();
        expect(result2).toBe(context);
        expect(result2.lView).toBe(result1);
    });
    it("should cache the element context on an intermediate element that isn't preemptively monkey-patched", () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: `
            <section>
              <p></p>
            </section>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const section = fixture.nativeElement.querySelector('section');
        expect((0, context_discovery_1.readPatchedData)(section)).toBeTruthy();
        const p = fixture.nativeElement.querySelector('p');
        expect((0, context_discovery_1.readPatchedData)(p)).toBeFalsy();
        const pContext = (0, context_discovery_1.getLContext)(p);
        expect(pContext.native).toBe(p);
        expect((0, context_discovery_1.readPatchedData)(p)).toBe(pContext);
    });
    it('should be able to pull in element context data even if the element is decorated using styling', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: `
            <section></section>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const section = fixture.nativeElement.querySelector('section');
        const result1 = (0, context_discovery_1.readPatchedData)(section);
        expect(Array.isArray(result1)).toBeTruthy();
        const elementResult = result1[view_1.HEADER_OFFSET]; // first element
        expect(elementResult).toBe(section);
        const context = (0, context_discovery_1.getLContext)(section);
        const result2 = (0, context_discovery_1.readPatchedData)(section);
        expect(Array.isArray(result2)).toBeFalsy();
        expect(context.native).toBe(section);
    });
    it('should monkey-patch immediate child nodes in a content-projected region with a reference to the parent component', () => {
        /*
             <!-- DOM view -->
             <section>
               <projection-comp>
                 welcome
                 <header>
                   <h1>
                     <p>this content is projected</p>
                     this content is projected also
                   </h1>
                 </header>
               </projection-comp>
             </section>
           */
        let ProjectorComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'projector-comp',
                    template: `
            welcome
            <header>
              <h1>
                <ng-content></ng-content>
              </h1>
            </header>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProjectorComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ProjectorComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProjectorComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProjectorComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    imports: [ProjectorComp],
                    template: `
            <section>
              <projector-comp>
                <p>this content is projected</p>
                this content is projected also
              </projector-comp>
            </section>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const host = fixture.nativeElement;
        const textNode = host.firstChild;
        const section = host.querySelector('section');
        const projectorComp = host.querySelector('projector-comp');
        const header = host.querySelector('header');
        const h1 = host.querySelector('h1');
        const p = host.querySelector('p');
        const pText = p.firstChild;
        const projectedTextNode = p.nextSibling;
        expect(projectorComp.children).toContain(header);
        expect(h1.children).toContain(p);
        expect((0, context_discovery_1.readPatchedData)(textNode)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(section)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(projectorComp)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(header)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(h1)).toBeFalsy();
        expect((0, context_discovery_1.readPatchedData)(p)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(pText)).toBeFalsy();
        expect((0, context_discovery_1.readPatchedData)(projectedTextNode)).toBeTruthy();
        const parentContext = (0, context_discovery_1.getLContext)(section);
        const shadowContext = (0, context_discovery_1.getLContext)(header);
        const projectedContext = (0, context_discovery_1.getLContext)(p);
        const parentComponentData = parentContext.lView;
        const shadowComponentData = shadowContext.lView;
        const projectedComponentData = projectedContext.lView;
        expect(projectedComponentData).toBe(parentComponentData);
        expect(shadowComponentData).not.toBe(parentComponentData);
    });
    it("should return `null` when an element context is retrieved that isn't situated in Angular", () => {
        const elm1 = document.createElement('div');
        const context1 = (0, context_discovery_1.getLContext)(elm1);
        expect(context1).toBeFalsy();
        const elm2 = document.createElement('div');
        document.body.appendChild(elm2);
        const context2 = (0, context_discovery_1.getLContext)(elm2);
        expect(context2).toBeFalsy();
    });
    it('should return `null` when an element context is retrieved that is a DOM node that was not created by Angular', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: `
             <section></section>
           `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const section = fixture.nativeElement.querySelector('section');
        const manuallyCreatedElement = document.createElement('div');
        section.appendChild(manuallyCreatedElement);
        const context = (0, context_discovery_1.getLContext)(manuallyCreatedElement);
        expect(context).toBeFalsy();
    });
    it('should by default monkey-patch the bootstrap component with context details', () => {
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    template: ``,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const hostElm = fixture.nativeElement;
        const component = fixture.componentInstance;
        const componentLView = (0, context_discovery_1.readPatchedData)(component);
        expect(Array.isArray(componentLView)).toBeTruthy();
        const hostLView = (0, context_discovery_1.readPatchedData)(hostElm);
        expect(hostLView).toBe(componentLView);
        const context1 = (0, context_discovery_1.getLContext)(hostElm);
        expect(context1.lView).toBe(hostLView);
        expect(context1.native).toEqual(hostElm);
        const context2 = (0, context_discovery_1.getLContext)(component);
        expect(context2).toBe(context1);
        expect(context2.lView).toBe(hostLView);
        expect(context2.native).toEqual(hostElm);
    });
    it('should by default monkey-patch the directives with LView so that they can be examined', () => {
        let myDir1Instance = null;
        let myDir2Instance = null;
        let myDir3Instance = null;
        let MyDir1 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir-1]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir1 = _classThis = class {
                constructor() {
                    myDir1Instance = this;
                }
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
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir2 = _classThis = class {
                constructor() {
                    myDir2Instance = this;
                }
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
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir3 = _classThis = class {
                constructor() {
                    myDir3Instance = this;
                }
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
        let StructuredComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'structured-comp',
                    imports: [MyDir1, MyDir2, MyDir3],
                    template: `
            <div my-dir-1 my-dir-2></div>
            <div my-dir-3></div>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StructuredComp = _classThis = class {
            };
            __setFunctionName(_classThis, "StructuredComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StructuredComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StructuredComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(StructuredComp);
        fixture.detectChanges();
        const hostElm = fixture.nativeElement;
        const div1 = hostElm.querySelector('div:first-child');
        const div2 = hostElm.querySelector('div:last-child');
        const context = (0, context_discovery_1.getLContext)(hostElm);
        const componentView = context.lView[context.nodeIndex];
        expect(componentView).toContain(myDir1Instance);
        expect(componentView).toContain(myDir2Instance);
        expect(componentView).toContain(myDir3Instance);
        expect(Array.isArray((0, context_discovery_1.readPatchedData)(myDir1Instance))).toBeTruthy();
        expect(Array.isArray((0, context_discovery_1.readPatchedData)(myDir2Instance))).toBeTruthy();
        expect(Array.isArray((0, context_discovery_1.readPatchedData)(myDir3Instance))).toBeTruthy();
        const d1Context = (0, context_discovery_1.getLContext)(myDir1Instance);
        const d2Context = (0, context_discovery_1.getLContext)(myDir2Instance);
        const d3Context = (0, context_discovery_1.getLContext)(myDir3Instance);
        expect(d1Context.lView).toEqual(componentView);
        expect(d2Context.lView).toEqual(componentView);
        expect(d3Context.lView).toEqual(componentView);
        expect((0, context_discovery_1.readPatchedData)(myDir1Instance)).toBe(d1Context);
        expect((0, context_discovery_1.readPatchedData)(myDir2Instance)).toBe(d2Context);
        expect((0, context_discovery_1.readPatchedData)(myDir3Instance)).toBe(d3Context);
        expect(d1Context.nodeIndex).toEqual(view_1.HEADER_OFFSET);
        expect(d1Context.native).toBe(div1);
        expect(d1Context.directives).toEqual([myDir1Instance, myDir2Instance]);
        expect(d2Context.nodeIndex).toEqual(view_1.HEADER_OFFSET);
        expect(d2Context.native).toBe(div1);
        expect(d2Context.directives).toEqual([myDir1Instance, myDir2Instance]);
        expect(d3Context.nodeIndex).toEqual(view_1.HEADER_OFFSET + 1);
        expect(d3Context.native).toBe(div2);
        expect(d3Context.directives).toEqual([myDir3Instance]);
    });
    it('should monkey-patch the exact same context instance of the DOM node, component and any directives on the same element', () => {
        let myDir1Instance = null;
        let myDir2Instance = null;
        let childComponentInstance = null;
        let MyDir1 = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-dir-1]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir1 = _classThis = class {
                constructor() {
                    myDir1Instance = this;
                }
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
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyDir2 = _classThis = class {
                constructor() {
                    myDir2Instance = this;
                }
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
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    template: `
             <div></div>
           `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComp = _classThis = class {
                constructor() {
                    childComponentInstance = this;
                }
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    imports: [ChildComp, MyDir1, MyDir2],
                    template: `
             <child-comp my-dir-1 my-dir-2></child-comp>
           `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const childCompHostElm = fixture.nativeElement.querySelector('child-comp');
        const lView = (0, context_discovery_1.readPatchedData)(childCompHostElm);
        expect(Array.isArray(lView)).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(myDir1Instance)).toBe(lView);
        expect((0, context_discovery_1.readPatchedData)(myDir2Instance)).toBe(lView);
        expect((0, context_discovery_1.readPatchedData)(childComponentInstance)).toBe(lView);
        const childNodeContext = (0, context_discovery_1.getLContext)(childCompHostElm);
        expect(childNodeContext.component).toBeFalsy();
        expect(childNodeContext.directives).toBeFalsy();
        assertMonkeyPatchValueIsLView(myDir1Instance);
        assertMonkeyPatchValueIsLView(myDir2Instance);
        assertMonkeyPatchValueIsLView(childComponentInstance);
        expect((0, context_discovery_1.getLContext)(myDir1Instance)).toBe(childNodeContext);
        expect(childNodeContext.component).toBeFalsy();
        expect(childNodeContext.directives.length).toEqual(2);
        assertMonkeyPatchValueIsLView(myDir1Instance, false);
        assertMonkeyPatchValueIsLView(myDir2Instance, false);
        assertMonkeyPatchValueIsLView(childComponentInstance);
        expect((0, context_discovery_1.getLContext)(myDir2Instance)).toBe(childNodeContext);
        expect(childNodeContext.component).toBeFalsy();
        expect(childNodeContext.directives.length).toEqual(2);
        assertMonkeyPatchValueIsLView(myDir1Instance, false);
        assertMonkeyPatchValueIsLView(myDir2Instance, false);
        assertMonkeyPatchValueIsLView(childComponentInstance);
        expect((0, context_discovery_1.getLContext)(childComponentInstance)).toBe(childNodeContext);
        expect(childNodeContext.component).toBeTruthy();
        expect(childNodeContext.directives.length).toEqual(2);
        assertMonkeyPatchValueIsLView(myDir1Instance, false);
        assertMonkeyPatchValueIsLView(myDir2Instance, false);
        assertMonkeyPatchValueIsLView(childComponentInstance, false);
        function assertMonkeyPatchValueIsLView(value, yesOrNo = true) {
            expect(Array.isArray((0, context_discovery_1.readPatchedData)(value))).toBe(yesOrNo);
        }
    });
    it('should monkey-patch sub components with the view data and then replace them with the context result once a lookup occurs', () => {
        let ChildComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child-comp',
                    template: `
            <div></div>
            <div></div>
            <div></div>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComp = _classThis;
        })();
        let ParentComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent-comp',
                    imports: [ChildComp],
                    template: `
            <section>
              <child-comp></child-comp>
            </section>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentComp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const host = fixture.nativeElement;
        const child = host.querySelector('child-comp');
        expect((0, context_discovery_1.readPatchedData)(child)).toBeTruthy();
        const context = (0, context_discovery_1.getLContext)(child);
        expect((0, context_discovery_1.readPatchedData)(child)).toBeTruthy();
        const componentData = context.lView[context.nodeIndex];
        const component = componentData[view_1.CONTEXT];
        expect(component instanceof ChildComp).toBeTruthy();
        expect((0, context_discovery_1.readPatchedData)(component)).toBe(context.lView);
        const componentContext = (0, context_discovery_1.getLContext)(component);
        expect((0, context_discovery_1.readPatchedData)(component)).toBe(componentContext);
        expect(componentContext.nodeIndex).toEqual(context.nodeIndex);
        expect(componentContext.native).toEqual(context.native);
        expect(componentContext.lView).toEqual(context.lView);
    });
});
describe('sanitization', () => {
    it('should sanitize data using the provided sanitization interface', () => {
        let SanitizationComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sanitize-this',
                    template: `
        <a [href]="href"></a>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SanitizationComp = _classThis = class {
                constructor() {
                    this.href = '';
                }
                updateLink(href) {
                    this.href = href;
                }
            };
            __setFunctionName(_classThis, "SanitizationComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SanitizationComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SanitizationComp = _classThis;
        })();
        const sanitizer = new LocalSanitizer((value) => {
            return 'http://bar';
        });
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: sanitizer_1.Sanitizer,
                    useValue: sanitizer,
                },
            ],
        });
        const fixture = testing_1.TestBed.createComponent(SanitizationComp);
        fixture.componentInstance.updateLink('http://foo');
        fixture.detectChanges();
        const anchor = fixture.nativeElement.querySelector('a');
        expect(anchor.getAttribute('href')).toEqual('http://bar');
        fixture.componentInstance.updateLink(sanitizer.bypassSecurityTrustUrl('http://foo'));
        fixture.detectChanges();
        expect(anchor.getAttribute('href')).toEqual('http://foo');
    });
    it('should sanitize HostBindings data using provided sanitization interface', () => {
        let hostBindingDir;
        let UnsafeUrlHostBindingDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[unsafeUrlHostBindingDir]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _cite_decorators;
            let _cite_initializers = [];
            let _cite_extraInitializers = [];
            var UnsafeUrlHostBindingDir = _classThis = class {
                constructor() {
                    this.cite = __runInitializers(this, _cite_initializers, 'http://cite-dir-value');
                    __runInitializers(this, _cite_extraInitializers);
                    hostBindingDir = this;
                }
            };
            __setFunctionName(_classThis, "UnsafeUrlHostBindingDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _cite_decorators = [(0, core_1.HostBinding)()];
                __esDecorate(null, null, _cite_decorators, { kind: "field", name: "cite", static: false, private: false, access: { has: obj => "cite" in obj, get: obj => obj.cite, set: (obj, value) => { obj.cite = value; } }, metadata: _metadata }, _cite_initializers, _cite_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                UnsafeUrlHostBindingDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return UnsafeUrlHostBindingDir = _classThis;
        })();
        let SimpleComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sanitize-this',
                    imports: [UnsafeUrlHostBindingDir],
                    template: `
        <blockquote unsafeUrlHostBindingDir></blockquote>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SimpleComp = _classThis = class {
            };
            __setFunctionName(_classThis, "SimpleComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SimpleComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SimpleComp = _classThis;
        })();
        const sanitizer = new LocalSanitizer((value) => 'http://bar');
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: sanitizer_1.Sanitizer,
                    useValue: sanitizer,
                },
            ],
        });
        const fixture = testing_1.TestBed.createComponent(SimpleComp);
        hostBindingDir.cite = 'http://foo';
        fixture.detectChanges();
        const anchor = fixture.nativeElement.querySelector('blockquote');
        expect(anchor.getAttribute('cite')).toEqual('http://bar');
        hostBindingDir.cite = sanitizer.bypassSecurityTrustUrl('http://foo');
        fixture.detectChanges();
        expect(anchor.getAttribute('cite')).toEqual('http://foo');
    });
});
class LocalSanitizedValue {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
class LocalSanitizer {
    constructor(_interceptor) {
        this._interceptor = _interceptor;
    }
    sanitize(context, value) {
        if (value instanceof LocalSanitizedValue) {
            return value.toString();
        }
        return this._interceptor(value);
    }
    bypassSecurityTrustHtml(value) { }
    bypassSecurityTrustStyle(value) { }
    bypassSecurityTrustScript(value) { }
    bypassSecurityTrustResourceUrl(value) { }
    bypassSecurityTrustUrl(value) {
        return new LocalSanitizedValue(value);
    }
}
