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
exports.NgComponentOutlet = void 0;
const core_1 = require("@angular/core");
/**
 * Instantiates a {@link /api/core/Component Component} type and inserts its Host View into the current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will be destroyed.
 *
 * @usageNotes
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInputs`: Optional component inputs object, which will be bind to the
 * component.
 *
 * * `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if it exists.
 *
 * * `ngComponentOutletNgModule`: Optional NgModule class reference to allow loading another
 * module dynamically, then loading a component from that module.
 *
 * * `ngComponentOutletNgModuleFactory`: Deprecated config option that allows providing optional
 * NgModule factory to allow loading another module dynamically, then loading a component from that
 * module. Use `ngComponentOutletNgModule` instead.
 *
 * ### Syntax
 *
 * Simple
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * With inputs
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   inputs: inputsExpression;">
 * </ng-container>
 * ```
 *
 * Customized injector/content
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized NgModule reference
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModule: ngModuleClass;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}
 *
 * @publicApi
 * @ngModule CommonModule
 */
let NgComponentOutlet = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ngComponentOutlet]',
            exportAs: 'ngComponentOutlet',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _ngComponentOutlet_decorators;
    let _ngComponentOutlet_initializers = [];
    let _ngComponentOutlet_extraInitializers = [];
    let _ngComponentOutletInputs_decorators;
    let _ngComponentOutletInputs_initializers = [];
    let _ngComponentOutletInputs_extraInitializers = [];
    let _ngComponentOutletInjector_decorators;
    let _ngComponentOutletInjector_initializers = [];
    let _ngComponentOutletInjector_extraInitializers = [];
    let _ngComponentOutletContent_decorators;
    let _ngComponentOutletContent_initializers = [];
    let _ngComponentOutletContent_extraInitializers = [];
    let _ngComponentOutletNgModule_decorators;
    let _ngComponentOutletNgModule_initializers = [];
    let _ngComponentOutletNgModule_extraInitializers = [];
    let _ngComponentOutletNgModuleFactory_decorators;
    let _ngComponentOutletNgModuleFactory_initializers = [];
    let _ngComponentOutletNgModuleFactory_extraInitializers = [];
    var NgComponentOutlet = _classThis = class {
        /**
         * Gets the instance of the currently-rendered component.
         * Will be null if no component has been rendered.
         */
        get componentInstance() {
            var _a, _b;
            return (_b = (_a = this._componentRef) === null || _a === void 0 ? void 0 : _a.instance) !== null && _b !== void 0 ? _b : null;
        }
        constructor(_viewContainerRef) {
            this._viewContainerRef = _viewContainerRef;
            // TODO(crisbeto): this should be `Type<T>`, but doing so broke a few
            // targets in a TGP so we need to do it in a major version.
            /** Component that should be rendered in the outlet. */
            this.ngComponentOutlet = __runInitializers(this, _ngComponentOutlet_initializers, null);
            this.ngComponentOutletInputs = (__runInitializers(this, _ngComponentOutlet_extraInitializers), __runInitializers(this, _ngComponentOutletInputs_initializers, void 0));
            this.ngComponentOutletInjector = (__runInitializers(this, _ngComponentOutletInputs_extraInitializers), __runInitializers(this, _ngComponentOutletInjector_initializers, void 0));
            this.ngComponentOutletContent = (__runInitializers(this, _ngComponentOutletInjector_extraInitializers), __runInitializers(this, _ngComponentOutletContent_initializers, void 0));
            this.ngComponentOutletNgModule = (__runInitializers(this, _ngComponentOutletContent_extraInitializers), __runInitializers(this, _ngComponentOutletNgModule_initializers, void 0));
            /**
             * @deprecated This input is deprecated, use `ngComponentOutletNgModule` instead.
             */
            this.ngComponentOutletNgModuleFactory = (__runInitializers(this, _ngComponentOutletNgModule_extraInitializers), __runInitializers(this, _ngComponentOutletNgModuleFactory_initializers, void 0));
            this._componentRef = __runInitializers(this, _ngComponentOutletNgModuleFactory_extraInitializers);
            /**
             * A helper data structure that allows us to track inputs that were part of the
             * ngComponentOutletInputs expression. Tracking inputs is necessary for proper removal of ones
             * that are no longer referenced.
             */
            this._inputsUsed = new Map();
        }
        _needToReCreateNgModuleInstance(changes) {
            // Note: square brackets property accessor is safe for Closure compiler optimizations (the
            // `changes` argument of the `ngOnChanges` lifecycle hook retains the names of the fields that
            // were changed).
            return (changes['ngComponentOutletNgModule'] !== undefined ||
                changes['ngComponentOutletNgModuleFactory'] !== undefined);
        }
        _needToReCreateComponentInstance(changes) {
            // Note: square brackets property accessor is safe for Closure compiler optimizations (the
            // `changes` argument of the `ngOnChanges` lifecycle hook retains the names of the fields that
            // were changed).
            return (changes['ngComponentOutlet'] !== undefined ||
                changes['ngComponentOutletContent'] !== undefined ||
                changes['ngComponentOutletInjector'] !== undefined ||
                this._needToReCreateNgModuleInstance(changes));
        }
        /** @nodoc */
        ngOnChanges(changes) {
            var _a;
            if (this._needToReCreateComponentInstance(changes)) {
                this._viewContainerRef.clear();
                this._inputsUsed.clear();
                this._componentRef = undefined;
                if (this.ngComponentOutlet) {
                    const injector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
                    if (this._needToReCreateNgModuleInstance(changes)) {
                        (_a = this._moduleRef) === null || _a === void 0 ? void 0 : _a.destroy();
                        if (this.ngComponentOutletNgModule) {
                            this._moduleRef = (0, core_1.createNgModule)(this.ngComponentOutletNgModule, getParentInjector(injector));
                        }
                        else if (this.ngComponentOutletNgModuleFactory) {
                            this._moduleRef = this.ngComponentOutletNgModuleFactory.create(getParentInjector(injector));
                        }
                        else {
                            this._moduleRef = undefined;
                        }
                    }
                    this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
                        injector,
                        ngModuleRef: this._moduleRef,
                        projectableNodes: this.ngComponentOutletContent,
                    });
                }
            }
        }
        /** @nodoc */
        ngDoCheck() {
            if (this._componentRef) {
                if (this.ngComponentOutletInputs) {
                    for (const inputName of Object.keys(this.ngComponentOutletInputs)) {
                        this._inputsUsed.set(inputName, true);
                    }
                }
                this._applyInputStateDiff(this._componentRef);
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            (_a = this._moduleRef) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        _applyInputStateDiff(componentRef) {
            for (const [inputName, touched] of this._inputsUsed) {
                if (!touched) {
                    // The input that was previously active no longer exists and needs to be set to undefined.
                    componentRef.setInput(inputName, undefined);
                    this._inputsUsed.delete(inputName);
                }
                else {
                    // Since touched is true, it can be asserted that the inputs object is not empty.
                    componentRef.setInput(inputName, this.ngComponentOutletInputs[inputName]);
                    this._inputsUsed.set(inputName, false);
                }
            }
        }
    };
    __setFunctionName(_classThis, "NgComponentOutlet");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ngComponentOutlet_decorators = [(0, core_1.Input)()];
        _ngComponentOutletInputs_decorators = [(0, core_1.Input)()];
        _ngComponentOutletInjector_decorators = [(0, core_1.Input)()];
        _ngComponentOutletContent_decorators = [(0, core_1.Input)()];
        _ngComponentOutletNgModule_decorators = [(0, core_1.Input)()];
        _ngComponentOutletNgModuleFactory_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _ngComponentOutlet_decorators, { kind: "field", name: "ngComponentOutlet", static: false, private: false, access: { has: obj => "ngComponentOutlet" in obj, get: obj => obj.ngComponentOutlet, set: (obj, value) => { obj.ngComponentOutlet = value; } }, metadata: _metadata }, _ngComponentOutlet_initializers, _ngComponentOutlet_extraInitializers);
        __esDecorate(null, null, _ngComponentOutletInputs_decorators, { kind: "field", name: "ngComponentOutletInputs", static: false, private: false, access: { has: obj => "ngComponentOutletInputs" in obj, get: obj => obj.ngComponentOutletInputs, set: (obj, value) => { obj.ngComponentOutletInputs = value; } }, metadata: _metadata }, _ngComponentOutletInputs_initializers, _ngComponentOutletInputs_extraInitializers);
        __esDecorate(null, null, _ngComponentOutletInjector_decorators, { kind: "field", name: "ngComponentOutletInjector", static: false, private: false, access: { has: obj => "ngComponentOutletInjector" in obj, get: obj => obj.ngComponentOutletInjector, set: (obj, value) => { obj.ngComponentOutletInjector = value; } }, metadata: _metadata }, _ngComponentOutletInjector_initializers, _ngComponentOutletInjector_extraInitializers);
        __esDecorate(null, null, _ngComponentOutletContent_decorators, { kind: "field", name: "ngComponentOutletContent", static: false, private: false, access: { has: obj => "ngComponentOutletContent" in obj, get: obj => obj.ngComponentOutletContent, set: (obj, value) => { obj.ngComponentOutletContent = value; } }, metadata: _metadata }, _ngComponentOutletContent_initializers, _ngComponentOutletContent_extraInitializers);
        __esDecorate(null, null, _ngComponentOutletNgModule_decorators, { kind: "field", name: "ngComponentOutletNgModule", static: false, private: false, access: { has: obj => "ngComponentOutletNgModule" in obj, get: obj => obj.ngComponentOutletNgModule, set: (obj, value) => { obj.ngComponentOutletNgModule = value; } }, metadata: _metadata }, _ngComponentOutletNgModule_initializers, _ngComponentOutletNgModule_extraInitializers);
        __esDecorate(null, null, _ngComponentOutletNgModuleFactory_decorators, { kind: "field", name: "ngComponentOutletNgModuleFactory", static: false, private: false, access: { has: obj => "ngComponentOutletNgModuleFactory" in obj, get: obj => obj.ngComponentOutletNgModuleFactory, set: (obj, value) => { obj.ngComponentOutletNgModuleFactory = value; } }, metadata: _metadata }, _ngComponentOutletNgModuleFactory_initializers, _ngComponentOutletNgModuleFactory_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgComponentOutlet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgComponentOutlet = _classThis;
})();
exports.NgComponentOutlet = NgComponentOutlet;
// Helper function that returns an Injector instance of a parent NgModule.
function getParentInjector(injector) {
    const parentNgModule = injector.get(core_1.NgModuleRef);
    return parentNgModule.injector;
}
