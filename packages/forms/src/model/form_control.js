"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormControl = exports.UntypedFormControl = exports.FormControl = void 0;
const util_1 = require("../util");
const abstract_model_1 = require("./abstract_model");
function isFormControlState(formState) {
    return (typeof formState === 'object' &&
        formState !== null &&
        Object.keys(formState).length === 2 &&
        'value' in formState &&
        'disabled' in formState);
}
const FormControl = class FormControl extends abstract_model_1.AbstractControl {
    constructor(
    // formState and defaultValue will only be null if T is nullable
    formState = null, validatorOrOpts, asyncValidator) {
        super((0, abstract_model_1.pickValidators)(validatorOrOpts), (0, abstract_model_1.pickAsyncValidators)(asyncValidator, validatorOrOpts));
        /** @publicApi */
        this.defaultValue = null;
        /** @internal */
        this._onChange = [];
        /** @internal */
        this._pendingChange = false;
        this._applyFormState(formState);
        this._setUpdateStrategy(validatorOrOpts);
        this._initObservables();
        this.updateValueAndValidity({
            onlySelf: true,
            // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
            // `VALID` or `INVALID`.
            // The status should be broadcasted via the `statusChanges` observable, so we set
            // `emitEvent` to `true` to allow that during the control creation process.
            emitEvent: !!this.asyncValidator,
        });
        if ((0, abstract_model_1.isOptionsObj)(validatorOrOpts) &&
            (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
            if (isFormControlState(formState)) {
                this.defaultValue = formState.value;
            }
            else {
                this.defaultValue = formState;
            }
        }
    }
    setValue(value, options = {}) {
        this.value = this._pendingValue = value;
        if (this._onChange.length && options.emitModelToViewChange !== false) {
            this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
        }
        this.updateValueAndValidity(options);
    }
    patchValue(value, options = {}) {
        this.setValue(value, options);
    }
    reset(formState = this.defaultValue, options = {}) {
        this._applyFormState(formState);
        this.markAsPristine(options);
        this.markAsUntouched(options);
        this.setValue(this.value, options);
        this._pendingChange = false;
    }
    /**  @internal */
    _updateValue() { }
    /**  @internal */
    _anyControls(condition) {
        return false;
    }
    /**  @internal */
    _allControlsDisabled() {
        return this.disabled;
    }
    registerOnChange(fn) {
        this._onChange.push(fn);
    }
    /** @internal */
    _unregisterOnChange(fn) {
        (0, util_1.removeListItem)(this._onChange, fn);
    }
    registerOnDisabledChange(fn) {
        this._onDisabledChange.push(fn);
    }
    /** @internal */
    _unregisterOnDisabledChange(fn) {
        (0, util_1.removeListItem)(this._onDisabledChange, fn);
    }
    /** @internal */
    _forEachChild(cb) { }
    /** @internal */
    _syncPendingControls() {
        if (this.updateOn === 'submit') {
            if (this._pendingDirty)
                this.markAsDirty();
            if (this._pendingTouched)
                this.markAsTouched();
            if (this._pendingChange) {
                this.setValue(this._pendingValue, { onlySelf: true, emitModelToViewChange: false });
                return true;
            }
        }
        return false;
    }
    _applyFormState(formState) {
        if (isFormControlState(formState)) {
            this.value = this._pendingValue = formState.value;
            formState.disabled
                ? this.disable({ onlySelf: true, emitEvent: false })
                : this.enable({ onlySelf: true, emitEvent: false });
        }
        else {
            this.value = this._pendingValue = formState;
        }
    }
};
exports.FormControl = FormControl;
exports.UntypedFormControl = exports.FormControl;
/**
 * @description
 * Asserts that the given control is an instance of `FormControl`
 *
 * @publicApi
 */
const isFormControl = (control) => control instanceof exports.FormControl;
exports.isFormControl = isFormControl;
