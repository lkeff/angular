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
exports.NgTemplateOutlet = void 0;
const core_1 = require("@angular/core");
/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Inserts an embedded view from a prepared `TemplateRef`.
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
 * `[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
 * by the local template `let` declarations.
 *
 * @usageNotes
 * ```html
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 *
 * Using the key `$implicit` in the context object will set its value as default.
 *
 * ### Example
 *
 * {@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}
 *
 * @publicApi
 */
let NgTemplateOutlet = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ngTemplateOutlet]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _ngTemplateOutletContext_decorators;
    let _ngTemplateOutletContext_initializers = [];
    let _ngTemplateOutletContext_extraInitializers = [];
    let _ngTemplateOutlet_decorators;
    let _ngTemplateOutlet_initializers = [];
    let _ngTemplateOutlet_extraInitializers = [];
    let _ngTemplateOutletInjector_decorators;
    let _ngTemplateOutletInjector_initializers = [];
    let _ngTemplateOutletInjector_extraInitializers = [];
    var NgTemplateOutlet = _classThis = class {
        constructor(_viewContainerRef) {
            this._viewContainerRef = _viewContainerRef;
            this._viewRef = null;
            /**
             * A context object to attach to the {@link EmbeddedViewRef}. This should be an
             * object, the object's keys will be available for binding by the local template `let`
             * declarations.
             * Using the key `$implicit` in the context object will set its value as default.
             */
            this.ngTemplateOutletContext = __runInitializers(this, _ngTemplateOutletContext_initializers, null);
            /**
             * A string defining the template reference and optionally the context object for the template.
             */
            this.ngTemplateOutlet = (__runInitializers(this, _ngTemplateOutletContext_extraInitializers), __runInitializers(this, _ngTemplateOutlet_initializers, null));
            /** Injector to be used within the embedded view. */
            this.ngTemplateOutletInjector = (__runInitializers(this, _ngTemplateOutlet_extraInitializers), __runInitializers(this, _ngTemplateOutletInjector_initializers, null));
            __runInitializers(this, _ngTemplateOutletInjector_extraInitializers);
            this._viewContainerRef = _viewContainerRef;
        }
        ngOnChanges(changes) {
            var _a;
            if (this._shouldRecreateView(changes)) {
                const viewContainerRef = this._viewContainerRef;
                if (this._viewRef) {
                    viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
                }
                // If there is no outlet, clear the destroyed view ref.
                if (!this.ngTemplateOutlet) {
                    this._viewRef = null;
                    return;
                }
                // Create a context forward `Proxy` that will always bind to the user-specified context,
                // without having to destroy and re-create views whenever the context changes.
                const viewContext = this._createContextForwardProxy();
                this._viewRef = viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, viewContext, {
                    injector: (_a = this.ngTemplateOutletInjector) !== null && _a !== void 0 ? _a : undefined,
                });
            }
        }
        /**
         * We need to re-create existing embedded view if either is true:
         * - the outlet changed.
         * - the injector changed.
         */
        _shouldRecreateView(changes) {
            return !!changes['ngTemplateOutlet'] || !!changes['ngTemplateOutletInjector'];
        }
        /**
         * For a given outlet instance, we create a proxy object that delegates
         * to the user-specified context. This allows changing, or swapping out
         * the context object completely without having to destroy/re-create the view.
         */
        _createContextForwardProxy() {
            return new Proxy({}, {
                set: (_target, prop, newValue) => {
                    if (!this.ngTemplateOutletContext) {
                        return false;
                    }
                    return Reflect.set(this.ngTemplateOutletContext, prop, newValue);
                },
                get: (_target, prop, receiver) => {
                    if (!this.ngTemplateOutletContext) {
                        return undefined;
                    }
                    return Reflect.get(this.ngTemplateOutletContext, prop, receiver);
                },
            });
        }
    };
    __setFunctionName(_classThis, "NgTemplateOutlet");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ngTemplateOutletContext_decorators = [(0, core_1.Input)()];
        _ngTemplateOutlet_decorators = [(0, core_1.Input)()];
        _ngTemplateOutletInjector_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _ngTemplateOutletContext_decorators, { kind: "field", name: "ngTemplateOutletContext", static: false, private: false, access: { has: obj => "ngTemplateOutletContext" in obj, get: obj => obj.ngTemplateOutletContext, set: (obj, value) => { obj.ngTemplateOutletContext = value; } }, metadata: _metadata }, _ngTemplateOutletContext_initializers, _ngTemplateOutletContext_extraInitializers);
        __esDecorate(null, null, _ngTemplateOutlet_decorators, { kind: "field", name: "ngTemplateOutlet", static: false, private: false, access: { has: obj => "ngTemplateOutlet" in obj, get: obj => obj.ngTemplateOutlet, set: (obj, value) => { obj.ngTemplateOutlet = value; } }, metadata: _metadata }, _ngTemplateOutlet_initializers, _ngTemplateOutlet_extraInitializers);
        __esDecorate(null, null, _ngTemplateOutletInjector_decorators, { kind: "field", name: "ngTemplateOutletInjector", static: false, private: false, access: { has: obj => "ngTemplateOutletInjector" in obj, get: obj => obj.ngTemplateOutletInjector, set: (obj, value) => { obj.ngTemplateOutletInjector = value; } }, metadata: _metadata }, _ngTemplateOutletInjector_initializers, _ngTemplateOutletInjector_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgTemplateOutlet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgTemplateOutlet = _classThis;
})();
exports.NgTemplateOutlet = NgTemplateOutlet;
