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
exports.FormArrayName = exports.formArrayNameProvider = exports.FormGroupName = void 0;
const core_1 = require("@angular/core");
const abstract_form_group_directive_1 = require("../abstract_form_group_directive");
const control_container_1 = require("../control_container");
const reactive_errors_1 = require("../reactive_errors");
const shared_1 = require("../shared");
const form_group_directive_1 = require("./form_group_directive");
const formGroupNameProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: (0, core_1.forwardRef)(() => FormGroupName),
};
/**
 * @description
 *
 * Syncs a nested `FormGroup` or `FormRecord` to a DOM element.
 *
 * This directive can only be used with a parent `FormGroupDirective`.
 *
 * It accepts the string name of the nested `FormGroup` or `FormRecord` to link, and
 * looks for a `FormGroup` or `FormRecord` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * Use nested form groups to validate a sub-group of a
 * form separately from the rest or to group the values of certain
 * controls into their own nested object.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 *
 * @usageNotes
 *
 * ### Access the group by name
 *
 * The following example uses the `AbstractControl.get` method to access the
 * associated `FormGroup`
 *
 * ```ts
 *   this.form.get('name');
 * ```
 *
 * ### Access individual controls in the group
 *
 * The following example uses the `AbstractControl.get` method to access
 * individual controls within the group using dot syntax.
 *
 * ```ts
 *   this.form.get('name.first');
 * ```
 *
 * ### Register a nested `FormGroup`.
 *
 * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
 * and provides methods to retrieve the nested `FormGroup` and individual controls.
 *
 * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormGroupName = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formGroupName]',
            providers: [formGroupNameProvider],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = abstract_form_group_directive_1.AbstractFormGroupDirective;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    var FormGroupName = _classThis = class extends _classSuper {
        constructor(parent, validators, asyncValidators) {
            super();
            /**
             * @description
             * Tracks the name of the `FormGroup` bound to the directive. The name corresponds
             * to a key in the parent `FormGroup` or `FormArray`.
             * Accepts a name as a string or a number.
             * The name in the form of a string is useful for individual forms,
             * while the numerical form allows for form groups to be bound
             * to indices when iterating over groups in a `FormArray`.
             */
            this.name = __runInitializers(this, _name_initializers, null);
            __runInitializers(this, _name_extraInitializers);
            this._parent = parent;
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
        }
        /** @internal */
        _checkParentType() {
            if (hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw (0, reactive_errors_1.groupParentException)();
            }
        }
    };
    __setFunctionName(_classThis, "FormGroupName");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, core_1.Input)('formGroupName')];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormGroupName = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormGroupName = _classThis;
})();
exports.FormGroupName = FormGroupName;
exports.formArrayNameProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: (0, core_1.forwardRef)(() => FormArrayName),
};
/**
 * @description
 *
 * Syncs a nested `FormArray` to a DOM element.
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested `FormArray` you want to link, and
 * will look for a `FormArray` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormArrayName = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formArrayName]',
            providers: [exports.formArrayNameProvider],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_container_1.ControlContainer;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    var FormArrayName = _classThis = class extends _classSuper {
        constructor(parent, validators, asyncValidators) {
            super();
            /**
             * @description
             * Tracks the name of the `FormArray` bound to the directive. The name corresponds
             * to a key in the parent `FormGroup` or `FormArray`.
             * Accepts a name as a string or a number.
             * The name in the form of a string is useful for individual forms,
             * while the numerical form allows for form arrays to be bound
             * to indices when iterating over arrays in a `FormArray`.
             */
            this.name = __runInitializers(this, _name_initializers, null);
            __runInitializers(this, _name_extraInitializers);
            this._parent = parent;
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
        }
        /**
         * A lifecycle method called when the directive's inputs are initialized. For internal use only.
         * @throws If the directive does not have a valid parent.
         * @nodoc
         */
        ngOnInit() {
            if (hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw (0, reactive_errors_1.arrayParentException)();
            }
            this.formDirective.addFormArray(this);
        }
        /**
         * A lifecycle method called before the directive's instance is destroyed. For internal use only.
         * @nodoc
         */
        ngOnDestroy() {
            var _a;
            (_a = this.formDirective) === null || _a === void 0 ? void 0 : _a.removeFormArray(this);
        }
        /**
         * @description
         * The `FormArray` bound to this directive.
         */
        get control() {
            return this.formDirective.getFormArray(this);
        }
        /**
         * @description
         * The top-level directive for this group if present, otherwise null.
         */
        get formDirective() {
            return this._parent ? this._parent.formDirective : null;
        }
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get path() {
            return (0, shared_1.controlPath)(this.name == null ? this.name : this.name.toString(), this._parent);
        }
    };
    __setFunctionName(_classThis, "FormArrayName");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, core_1.Input)('formArrayName')];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormArrayName = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormArrayName = _classThis;
})();
exports.FormArrayName = FormArrayName;
function hasInvalidParent(parent) {
    return (!(parent instanceof FormGroupName) &&
        !(parent instanceof form_group_directive_1.FormGroupDirective) &&
        !(parent instanceof FormArrayName));
}
