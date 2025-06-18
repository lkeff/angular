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
describe('ViewRef', () => {
    it('should remove nodes from DOM when the view is detached from app ref', () => {
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'dynamic-cpt',
                    template: '<div></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
                constructor(elRef) {
                    this.elRef = elRef;
                }
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<span></span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(appRef, injector) {
                    this.appRef = appRef;
                    this.injector = injector;
                }
                create() {
                    this.componentRef = (0, core_1.createComponent)(DynamicComponent, { environmentInjector: this.injector });
                    this.componentRef.hostView.attachToAppRef(this.appRef);
                    document.body.appendChild(this.componentRef.instance.elRef.nativeElement);
                }
                destroy() {
                    this.componentRef.hostView.detachFromAppRef();
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, DynamicComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const appComponent = fixture.componentInstance;
        appComponent.create();
        fixture.detectChanges();
        expect(document.body.querySelector('dynamic-cpt')).not.toBeFalsy();
        appComponent.destroy();
        fixture.detectChanges();
        expect(document.body.querySelector('dynamic-cpt')).toBeFalsy();
    });
    it('should invoke the onDestroy callback of a view ref', () => {
        let called = false;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor(changeDetectorRef) {
                    changeDetectorRef.onDestroy(() => (called = true));
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
        testing_1.TestBed.configureTestingModule({ declarations: [App] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.destroy();
        expect(called).toBe(true);
    });
    it('should remove view ref from view container when destroyed', () => {
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
                constructor(viewContainerRef) {
                    this.viewContainerRef = viewContainerRef;
                }
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<ng-template>Hello</ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var App = _classThis = class {
                constructor(_viewContainerRef) {
                    this._viewContainerRef = _viewContainerRef;
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.componentRef = __runInitializers(this, _templateRef_extraInitializers);
                }
                create() {
                    this.viewRef = this.templateRef.createEmbeddedView(null);
                    this.componentRef = this._viewContainerRef.createComponent(DynamicComponent);
                    this.componentRef.instance.viewContainerRef.insert(this.viewRef);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, DynamicComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.create();
        const viewContainerRef = fixture.componentInstance.componentRef.instance.viewContainerRef;
        expect(viewContainerRef.length).toBe(1);
        fixture.componentInstance.viewRef.destroy();
        expect(viewContainerRef.length).toBe(0);
    });
    it('should mark a ViewRef as destroyed when the host view is destroyed', () => {
        let DynamicComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DynamicComponent = _classThis = class {
                constructor(viewContainerRef) {
                    this.viewContainerRef = viewContainerRef;
                }
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<ng-template>Hello</ng-template>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var App = _classThis = class {
                constructor(_viewContainerRef) {
                    this._viewContainerRef = _viewContainerRef;
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.componentRef = __runInitializers(this, _templateRef_extraInitializers);
                }
                create() {
                    this.viewRef = this.templateRef.createEmbeddedView(null);
                    this.componentRef = this._viewContainerRef.createComponent(DynamicComponent);
                    this.componentRef.instance.viewContainerRef.insert(this.viewRef);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, DynamicComponent] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        fixture.componentInstance.create();
        const { componentRef, viewRef } = fixture.componentInstance;
        expect(viewRef.destroyed).toBe(false);
        componentRef.hostView.destroy();
        expect(viewRef.destroyed).toBe(true);
    });
});
