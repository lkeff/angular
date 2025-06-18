"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormControlName = void 0;
const core_1 = require("@angular/core");
const abstract_form_group_directive_1 = require("../abstract_form_group_directive");
const ng_control_1 = require("../ng_control");
const reactive_errors_1 = require("../reactive_errors");
const shared_1 = require("../shared");
const form_group_directive_1 = require("./form_group_directive");
const form_group_name_1 = require("./form_group_name");
const controlNameBinding = {
    provide: ng_control_1.NgControl,
    useExisting: (0, core_1.forwardRef)(() => FormControlName),
};
/**
 * @description
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 * @see {@link FormControl}
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * ### Register `FormControl` within a group
 *
 * The following example shows how to register multiple form controls within a form group
 * and set their value.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: `RadioControlValueAccessor`
 * * Selects: `SelectControlValueAccessor`
 *
 * ### Use with ngModel is deprecated
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormControlName = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formControlName]',
            providers: [controlNameBinding],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ng_control_1.NgControl;
    let _instanceExtraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _set_isDisabled_decorators;
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _update_decorators;
    let _update_initializers = [];
    let _update_extraInitializers = [];
    var FormControlName = _classThis = class extends _classSuper {
        /**
         * @description
         * Triggers a warning in dev mode that this input should not be used with reactive forms.
         */
        set isDisabled(isDisabled) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.warn(reactive_errors_1.disabledAttrWarning);
            }
        }
        constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
            super();
            this._ngModelWarningConfig = (__runInitializers(this, _instanceExtraInitializers), _ngModelWarningConfig);
            this._added = false;
            /**
             * @description
             * Tracks the name of the `FormControl` bound to the directive. The name corresponds
             * to a key in the parent `FormGroup` or `FormArray`.
             * Accepts a name as a string or a number.
             * The name in the form of a string is useful for individual forms,
             * while the numerical form allows for form controls to be bound
             * to indices when iterating over controls in a `FormArray`.
             */
            this.name = __runInitializers(this, _name_initializers, null);
            // TODO(kara): remove next 4 properties once deprecation period is over
            /** @deprecated as of v6 */
            this.model = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            /** @deprecated as of v6 */
            this.update = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _update_initializers, new core_1.EventEmitter()));
            /**
             * @description
             * Instance property used to track whether an ngModel warning has been sent out for this
             * particular FormControlName instance. Used to support warning config of "always".
             *
             * @internal
             */
            this._ngModelWarningSent = (__runInitializers(this, _update_extraInitializers), false);
            this._parent = parent;
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
            this.valueAccessor = (0, shared_1.selectValueAccessor)(this, valueAccessors);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (!this._added)
                this._setUpControl();
            if ((0, shared_1.isPropertyUpdated)(changes, this.viewModel)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    (0, shared_1._ngModelWarning)('formControlName', FormControlName, this, this._ngModelWarningConfig);
                }
                this.viewModel = this.model;
                this.formDirective.updateModel(this, this.model);
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.formDirective) {
                this.formDirective.removeControl(this);
            }
        }
        /**
         * @description
         * Sets the new value for the view model and emits an `ngModelChange` event.
         *
         * @param newValue The new value for the view model.
         */
        viewToModelUpdate(newValue) {
            this.viewModel = newValue;
            this.update.emit(newValue);
        }
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get path() {
            return (0, shared_1.controlPath)(this.name == null ? this.name : this.name.toString(), this._parent);
        }
        /**
         * @description
         * The top-level directive for this group if present, otherwise null.
         */
        get formDirective() {
            return this._parent ? this._parent.formDirective : null;
        }
        _setUpControl() {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                checkParentType(this._parent, this.name);
            }
            this.control = this.formDirective.addControl(this);
            this._added = true;
        }
    };
    __setFunctionName(_classThis, "FormControlName");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, core_1.Input)('formControlName')];
        _set_isDisabled_decorators = [(0, core_1.Input)('disabled')];
        _model_decorators = [(0, core_1.Input)('ngModel')];
        _update_decorators = [(0, core_1.Output)('ngModelChange')];
        __esDecorate(_classThis, null, _set_isDisabled_decorators, { kind: "setter", name: "isDisabled", static: false, private: false, access: { has: obj => "isDisabled" in obj, set: (obj, value) => { obj.isDisabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
        __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlName = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * @internal
     */
    _classThis._ngModelWarningSentOnce = false;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlName = _classThis;
})();
exports.FormControlName = FormControlName;
function checkParentType(parent, name) {
    if (!(parent instanceof form_group_name_1.FormGroupName) && parent instanceof abstract_form_group_directive_1.AbstractFormGroupDirective) {
        throw (0, reactive_errors_1.ngModelGroupException)();
    }
    else if (!(parent instanceof form_group_name_1.FormGroupName) &&
        !(parent instanceof form_group_directive_1.FormGroupDirective) &&
        !(parent instanceof form_group_name_1.FormArrayName)) {
        throw (0, reactive_errors_1.controlParentException)(name);
    }
}
