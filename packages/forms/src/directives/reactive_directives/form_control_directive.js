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
exports.FormControlDirective = exports.NG_MODEL_WITH_FORM_CONTROL_WARNING = void 0;
const core_1 = require("@angular/core");
const ng_control_1 = require("../ng_control");
const reactive_errors_1 = require("../reactive_errors");
const shared_1 = require("../shared");
/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */
exports.NG_MODEL_WITH_FORM_CONTROL_WARNING = new core_1.InjectionToken(ngDevMode ? 'NgModelWithFormControlWarning' : '');
const formControlBinding = {
    provide: ng_control_1.NgControl,
    useExisting: (0, core_1.forwardRef)(() => FormControlDirective),
};
/**
 * @description
 * Synchronizes a standalone `FormControl` instance to a form control element.
 *
 * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives was deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 * @see {@link FormControl}
 * @see {@link AbstractControl}
 *
 * @usageNotes
 *
 * The following example shows how to register a standalone control and set its value.
 *
 * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormControlDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formControl]',
            providers: [formControlBinding],
            exportAs: 'ngForm',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ng_control_1.NgControl;
    let _instanceExtraInitializers = [];
    let _form_decorators;
    let _form_initializers = [];
    let _form_extraInitializers = [];
    let _set_isDisabled_decorators;
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _update_decorators;
    let _update_initializers = [];
    let _update_extraInitializers = [];
    var FormControlDirective = _classThis = class extends _classSuper {
        /**
         * @description
         * Triggers a warning in dev mode that this input should not be used with reactive forms.
         */
        set isDisabled(isDisabled) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.warn(reactive_errors_1.disabledAttrWarning);
            }
        }
        constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig, callSetDisabledState) {
            super();
            this._ngModelWarningConfig = (__runInitializers(this, _instanceExtraInitializers), _ngModelWarningConfig);
            this.callSetDisabledState = callSetDisabledState;
            /**
             * @description
             * Tracks the `FormControl` instance bound to the directive.
             */
            this.form = __runInitializers(this, _form_initializers, void 0);
            // TODO(kara): remove next 4 properties once deprecation period is over
            /** @deprecated as of v6 */
            this.model = (__runInitializers(this, _form_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            /** @deprecated as of v6 */
            this.update = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _update_initializers, new core_1.EventEmitter()));
            /**
             * @description
             * Instance property used to track whether an ngModel warning has been sent out for this
             * particular `FormControlDirective` instance. Used to support warning config of "always".
             *
             * @internal
             */
            this._ngModelWarningSent = (__runInitializers(this, _update_extraInitializers), false);
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
            this.valueAccessor = (0, shared_1.selectValueAccessor)(this, valueAccessors);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (this._isControlChanged(changes)) {
                const previousForm = changes['form'].previousValue;
                if (previousForm) {
                    (0, shared_1.cleanUpControl)(previousForm, this, /* validateControlPresenceOnChange */ false);
                }
                (0, shared_1.setUpControl)(this.form, this, this.callSetDisabledState);
                this.form.updateValueAndValidity({ emitEvent: false });
            }
            if ((0, shared_1.isPropertyUpdated)(changes, this.viewModel)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    (0, shared_1._ngModelWarning)('formControl', FormControlDirective, this, this._ngModelWarningConfig);
                }
                this.form.setValue(this.model);
                this.viewModel = this.model;
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.form) {
                (0, shared_1.cleanUpControl)(this.form, this, /* validateControlPresenceOnChange */ false);
            }
        }
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get path() {
            return [];
        }
        /**
         * @description
         * The `FormControl` bound to this directive.
         */
        get control() {
            return this.form;
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
        _isControlChanged(changes) {
            return changes.hasOwnProperty('form');
        }
    };
    __setFunctionName(_classThis, "FormControlDirective");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _form_decorators = [(0, core_1.Input)('formControl')];
        _set_isDisabled_decorators = [(0, core_1.Input)('disabled')];
        _model_decorators = [(0, core_1.Input)('ngModel')];
        _update_decorators = [(0, core_1.Output)('ngModelChange')];
        __esDecorate(_classThis, null, _set_isDisabled_decorators, { kind: "setter", name: "isDisabled", static: false, private: false, access: { has: obj => "isDisabled" in obj, set: (obj, value) => { obj.isDisabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _form_decorators, { kind: "field", name: "form", static: false, private: false, access: { has: obj => "form" in obj, get: obj => obj.form, set: (obj, value) => { obj.form = value; } }, metadata: _metadata }, _form_initializers, _form_extraInitializers);
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
        __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * @internal
     */
    _classThis._ngModelWarningSentOnce = false;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlDirective = _classThis;
})();
exports.FormControlDirective = FormControlDirective;
