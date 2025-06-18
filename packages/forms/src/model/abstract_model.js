"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractControl = exports.FormResetEvent = exports.FormSubmittedEvent = exports.StatusChangeEvent = exports.TouchedChangeEvent = exports.PristineChangeEvent = exports.ValueChangeEvent = exports.ControlEvent = exports.DISABLED = exports.PENDING = exports.INVALID = exports.VALID = void 0;
exports.pickValidators = pickValidators;
exports.pickAsyncValidators = pickAsyncValidators;
exports.isOptionsObj = isOptionsObj;
exports.assertControlPresent = assertControlPresent;
exports.assertAllValuesPresent = assertAllValuesPresent;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const reactive_errors_1 = require("../directives/reactive_errors");
const validators_1 = require("../validators");
/**
 * Reports that a control is valid, meaning that no errors exist in the input value.
 *
 * @see {@link status}
 */
exports.VALID = 'VALID';
/**
 * Reports that a control is invalid, meaning that an error exists in the input value.
 *
 * @see {@link status}
 */
exports.INVALID = 'INVALID';
/**
 * Reports that a control is pending, meaning that async validation is occurring and
 * errors are not yet available for the input value.
 *
 * @see {@link markAsPending}
 * @see {@link status}
 */
exports.PENDING = 'PENDING';
/**
 * Reports that a control is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 *
 * @see {@link markAsDisabled}
 * @see {@link status}
 */
exports.DISABLED = 'DISABLED';
/**
 * Base class for every event sent by `AbstractControl.events()`
 *
 * @publicApi
 */
class ControlEvent {
}
exports.ControlEvent = ControlEvent;
/**
 * Event fired when the value of a control changes.
 *
 * @publicApi
 */
class ValueChangeEvent extends ControlEvent {
    constructor(value, source) {
        super();
        this.value = value;
        this.source = source;
    }
}
exports.ValueChangeEvent = ValueChangeEvent;
/**
 * Event fired when the control's pristine state changes (pristine <=> dirty).
 *
 * @publicApi */
class PristineChangeEvent extends ControlEvent {
    constructor(pristine, source) {
        super();
        this.pristine = pristine;
        this.source = source;
    }
}
exports.PristineChangeEvent = PristineChangeEvent;
/**
 * Event fired when the control's touched status changes (touched <=> untouched).
 *
 * @publicApi
 */
class TouchedChangeEvent extends ControlEvent {
    constructor(touched, source) {
        super();
        this.touched = touched;
        this.source = source;
    }
}
exports.TouchedChangeEvent = TouchedChangeEvent;
/**
 * Event fired when the control's status changes.
 *
 * @publicApi
 */
class StatusChangeEvent extends ControlEvent {
    constructor(status, source) {
        super();
        this.status = status;
        this.source = source;
    }
}
exports.StatusChangeEvent = StatusChangeEvent;
/**
 * Event fired when a form is submitted
 *
 * @publicApi
 */
class FormSubmittedEvent extends ControlEvent {
    constructor(source) {
        super();
        this.source = source;
    }
}
exports.FormSubmittedEvent = FormSubmittedEvent;
/**
 * Event fired when a form is reset.
 *
 * @publicApi
 */
class FormResetEvent extends ControlEvent {
    constructor(source) {
        super();
        this.source = source;
    }
}
exports.FormResetEvent = FormResetEvent;
/**
 * Gets validators from either an options object or given validators.
 */
function pickValidators(validatorOrOpts) {
    return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
/**
 * Creates validator function by combining provided validators.
 */
function coerceToValidator(validator) {
    return Array.isArray(validator) ? (0, validators_1.composeValidators)(validator) : validator || null;
}
/**
 * Gets async validators from either an options object or given validators.
 */
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (isOptionsObj(validatorOrOpts) && asyncValidator) {
            console.warn(reactive_errors_1.asyncValidatorsDroppedWithOptsWarning);
        }
    }
    return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
/**
 * Creates async validator function by combining provided async validators.
 */
function coerceToAsyncValidator(asyncValidator) {
    return Array.isArray(asyncValidator)
        ? (0, validators_1.composeAsyncValidators)(asyncValidator)
        : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
    return (validatorOrOpts != null &&
        !Array.isArray(validatorOrOpts) &&
        typeof validatorOrOpts === 'object');
}
function assertControlPresent(parent, isGroup, key) {
    const controls = parent.controls;
    const collection = isGroup ? Object.keys(controls) : controls;
    if (!collection.length) {
        throw new core_1.ɵRuntimeError(1000 /* RuntimeErrorCode.NO_CONTROLS */, typeof ngDevMode === 'undefined' || ngDevMode ? (0, reactive_errors_1.noControlsError)(isGroup) : '');
    }
    if (!controls[key]) {
        throw new core_1.ɵRuntimeError(1001 /* RuntimeErrorCode.MISSING_CONTROL */, typeof ngDevMode === 'undefined' || ngDevMode ? (0, reactive_errors_1.missingControlError)(isGroup, key) : '');
    }
}
function assertAllValuesPresent(control, isGroup, value) {
    control._forEachChild((_, key) => {
        if (value[key] === undefined) {
            throw new core_1.ɵRuntimeError(1002 /* RuntimeErrorCode.MISSING_CONTROL_VALUE */, typeof ngDevMode === 'undefined' || ngDevMode ? (0, reactive_errors_1.missingControlValueError)(isGroup, key) : '');
        }
    });
}
/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * The first type parameter TValue represents the value type of the control (`control.value`).
 * The optional type parameter TRawValue  represents the raw value type (`control.getRawValue()`).
 *
 * @see [Forms Guide](guide/forms)
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 * @see [Dynamic Forms Guide](guide/forms/dynamic-forms)
 *
 * @publicApi
 */
class AbstractControl {
    /**
     * Initialize the AbstractControl instance.
     *
     * @param validators The function or array of functions that is used to determine the validity of
     *     this control synchronously.
     * @param asyncValidators The function or array of functions that is used to determine validity of
     *     this control asynchronously.
     */
    constructor(validators, asyncValidators) {
        /** @internal */
        this._pendingDirty = false;
        /**
         * Indicates that a control has its own pending asynchronous validation in progress.
         * It also stores if the control should emit events when the validation status changes.
         *
         * @internal
         */
        this._hasOwnPendingAsyncValidator = null;
        /** @internal */
        this._pendingTouched = false;
        /** @internal */
        this._onCollectionChange = () => { };
        this._parent = null;
        /** @internal */
        this._status = (0, core_1.computed)(() => this.statusReactive());
        this.statusReactive = (0, core_1.signal)(undefined);
        /** @internal */
        this._pristine = (0, core_1.computed)(() => this.pristineReactive());
        this.pristineReactive = (0, core_1.signal)(true);
        /** @internal */
        this._touched = (0, core_1.computed)(() => this.touchedReactive());
        this.touchedReactive = (0, core_1.signal)(false);
        /**
         * Exposed as observable, see below.
         *
         * @internal
         */
        this._events = new rxjs_1.Subject();
        /**
         * A multicasting observable that emits an event every time the state of the control changes.
         * It emits for value, status, pristine or touched changes.
         *
         * **Note**: On value change, the emit happens right after a value of this control is updated. The
         * value of a parent control (for example if this FormControl is a part of a FormGroup) is updated
         * later, so accessing a value of a parent control (using the `value` property) from the callback
         * of this event might result in getting a value that has not been updated yet. Subscribe to the
         * `events` of the parent control instead.
         * For other event types, the events are emitted after the parent control has been updated.
         *
         */
        this.events = this._events.asObservable();
        /** @internal */
        this._onDisabledChange = [];
        this._assignValidators(validators);
        this._assignAsyncValidators(asyncValidators);
    }
    /**
     * Returns the function that is used to determine the validity of this control synchronously.
     * If multiple validators have been added, this will be a single composed function.
     * See `Validators.compose()` for additional information.
     */
    get validator() {
        return this._composedValidatorFn;
    }
    set validator(validatorFn) {
        this._rawValidators = this._composedValidatorFn = validatorFn;
    }
    /**
     * Returns the function that is used to determine the validity of this control asynchronously.
     * If multiple validators have been added, this will be a single composed function.
     * See `Validators.compose()` for additional information.
     */
    get asyncValidator() {
        return this._composedAsyncValidatorFn;
    }
    set asyncValidator(asyncValidatorFn) {
        this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
    }
    /**
     * The parent control.
     */
    get parent() {
        return this._parent;
    }
    /**
     * The validation status of the control.
     *
     * @see {@link FormControlStatus}
     *
     * These status values are mutually exclusive, so a control cannot be
     * both valid AND invalid or invalid AND disabled.
     */
    get status() {
        return (0, core_1.untracked)(this.statusReactive);
    }
    set status(v) {
        (0, core_1.untracked)(() => this.statusReactive.set(v));
    }
    /**
     * A control is `valid` when its `status` is `VALID`.
     *
     * @see {@link AbstractControl.status}
     *
     * @returns True if the control has passed all of its validation tests,
     * false otherwise.
     */
    get valid() {
        return this.status === exports.VALID;
    }
    /**
     * A control is `invalid` when its `status` is `INVALID`.
     *
     * @see {@link AbstractControl.status}
     *
     * @returns True if this control has failed one or more of its validation checks,
     * false otherwise.
     */
    get invalid() {
        return this.status === exports.INVALID;
    }
    /**
     * A control is `pending` when its `status` is `PENDING`.
     *
     * @see {@link AbstractControl.status}
     *
     * @returns True if this control is in the process of conducting a validation check,
     * false otherwise.
     */
    get pending() {
        return this.status == exports.PENDING;
    }
    /**
     * A control is `disabled` when its `status` is `DISABLED`.
     *
     * Disabled controls are exempt from validation checks and
     * are not included in the aggregate value of their ancestor
     * controls.
     *
     * @see {@link AbstractControl.status}
     *
     * @returns True if the control is disabled, false otherwise.
     */
    get disabled() {
        return this.status === exports.DISABLED;
    }
    /**
     * A control is `enabled` as long as its `status` is not `DISABLED`.
     *
     * @returns True if the control has any status other than 'DISABLED',
     * false if the status is 'DISABLED'.
     *
     * @see {@link AbstractControl.status}
     *
     */
    get enabled() {
        return this.status !== exports.DISABLED;
    }
    /**
     * A control is `pristine` if the user has not yet changed
     * the value in the UI.
     *
     * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
     * Programmatic changes to a control's value do not mark it dirty.
     */
    get pristine() {
        return (0, core_1.untracked)(this.pristineReactive);
    }
    set pristine(v) {
        (0, core_1.untracked)(() => this.pristineReactive.set(v));
    }
    /**
     * A control is `dirty` if the user has changed the value
     * in the UI.
     *
     * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
     * Programmatic changes to a control's value do not mark it dirty.
     */
    get dirty() {
        return !this.pristine;
    }
    /**
     * True if the control is marked as `touched`.
     *
     * A control is marked `touched` once the user has triggered
     * a `blur` event on it.
     */
    get touched() {
        return (0, core_1.untracked)(this.touchedReactive);
    }
    set touched(v) {
        (0, core_1.untracked)(() => this.touchedReactive.set(v));
    }
    /**
     * True if the control has not been marked as touched
     *
     * A control is `untouched` if the user has not yet triggered
     * a `blur` event on it.
     */
    get untouched() {
        return !this.touched;
    }
    /**
     * Reports the update strategy of the `AbstractControl` (meaning
     * the event on which the control updates itself).
     * Possible values: `'change'` | `'blur'` | `'submit'`
     * Default value: `'change'`
     */
    get updateOn() {
        return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
    }
    /**
     * Sets the synchronous validators that are active on this control.  Calling
     * this overwrites any existing synchronous validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * If you want to add a new validator without affecting existing ones, consider
     * using `addValidators()` method instead.
     */
    setValidators(validators) {
        this._assignValidators(validators);
    }
    /**
     * Sets the asynchronous validators that are active on this control. Calling this
     * overwrites any existing asynchronous validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * If you want to add a new validator without affecting existing ones, consider
     * using `addAsyncValidators()` method instead.
     */
    setAsyncValidators(validators) {
        this._assignAsyncValidators(validators);
    }
    /**
     * Add a synchronous validator or validators to this control, without affecting other validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * Adding a validator that already exists will have no effect. If duplicate validator functions
     * are present in the `validators` array, only the first instance would be added to a form
     * control.
     *
     * @param validators The new validator function or functions to add to this control.
     */
    addValidators(validators) {
        this.setValidators((0, validators_1.addValidators)(validators, this._rawValidators));
    }
    /**
     * Add an asynchronous validator or validators to this control, without affecting other
     * validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * Adding a validator that already exists will have no effect.
     *
     * @param validators The new asynchronous validator function or functions to add to this control.
     */
    addAsyncValidators(validators) {
        this.setAsyncValidators((0, validators_1.addValidators)(validators, this._rawAsyncValidators));
    }
    /**
     * Remove a synchronous validator from this control, without affecting other validators.
     * Validators are compared by function reference; you must pass a reference to the exact same
     * validator function as the one that was originally set. If a provided validator is not found,
     * it is ignored.
     *
     * @usageNotes
     *
     * ### Reference to a ValidatorFn
     *
     * ```
     * // Reference to the RequiredValidator
     * const ctrl = new FormControl<string | null>('', Validators.required);
     * ctrl.removeValidators(Validators.required);
     *
     * // Reference to anonymous function inside MinValidator
     * const minValidator = Validators.min(3);
     * const ctrl = new FormControl<string | null>('', minValidator);
     * expect(ctrl.hasValidator(minValidator)).toEqual(true)
     * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
     *
     * ctrl.removeValidators(minValidator);
     * ```
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * @param validators The validator or validators to remove.
     */
    removeValidators(validators) {
        this.setValidators((0, validators_1.removeValidators)(validators, this._rawValidators));
    }
    /**
     * Remove an asynchronous validator from this control, without affecting other validators.
     * Validators are compared by function reference; you must pass a reference to the exact same
     * validator function as the one that was originally set. If a provided validator is not found, it
     * is ignored.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * @param validators The asynchronous validator or validators to remove.
     */
    removeAsyncValidators(validators) {
        this.setAsyncValidators((0, validators_1.removeValidators)(validators, this._rawAsyncValidators));
    }
    /**
     * Check whether a synchronous validator function is present on this control. The provided
     * validator must be a reference to the exact same function that was provided.
     *
     * @usageNotes
     *
     * ### Reference to a ValidatorFn
     *
     * ```
     * // Reference to the RequiredValidator
     * const ctrl = new FormControl<number | null>(0, Validators.required);
     * expect(ctrl.hasValidator(Validators.required)).toEqual(true)
     *
     * // Reference to anonymous function inside MinValidator
     * const minValidator = Validators.min(3);
     * const ctrl = new FormControl<number | null>(0, minValidator);
     * expect(ctrl.hasValidator(minValidator)).toEqual(true)
     * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
     * ```
     *
     * @param validator The validator to check for presence. Compared by function reference.
     * @returns Whether the provided validator was found on this control.
     */
    hasValidator(validator) {
        return (0, validators_1.hasValidator)(this._rawValidators, validator);
    }
    /**
     * Check whether an asynchronous validator function is present on this control. The provided
     * validator must be a reference to the exact same function that was provided.
     *
     * @param validator The asynchronous validator to check for presence. Compared by function
     *     reference.
     * @returns Whether the provided asynchronous validator was found on this control.
     */
    hasAsyncValidator(validator) {
        return (0, validators_1.hasValidator)(this._rawAsyncValidators, validator);
    }
    /**
     * Empties out the synchronous validator list.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     */
    clearValidators() {
        this.validator = null;
    }
    /**
     * Empties out the async validator list.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     */
    clearAsyncValidators() {
        this.asyncValidator = null;
    }
    markAsTouched(opts = {}) {
        var _a;
        const changed = this.touched === false;
        this.touched = true;
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsTouched(Object.assign(Object.assign({}, opts), { sourceControl }));
        }
        if (changed && opts.emitEvent !== false) {
            this._events.next(new TouchedChangeEvent(true, sourceControl));
        }
    }
    /**
     * Marks the control and all its descendant controls as `dirty`.
     * @see {@link markAsDirty()}
     *
     * @param opts Configuration options that determine how the control propagates changes
     * and emits events after marking is applied.
     * * `emitEvent`: When true or not supplied (the default), the `events`
     * observable emits a `PristineChangeEvent` with the `pristine` property being `false`.
     * When false, no events are emitted.
     */
    markAllAsDirty(opts = {}) {
        this.markAsDirty({ onlySelf: true, emitEvent: opts.emitEvent, sourceControl: this });
        this._forEachChild((control) => control.markAllAsDirty(opts));
    }
    /**
     * Marks the control and all its descendant controls as `touched`.
     * @see {@link markAsTouched()}
     *
     * @param opts Configuration options that determine how the control propagates changes
     * and emits events after marking is applied.
     * * `emitEvent`: When true or not supplied (the default), the `events`
     * observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
     * When false, no events are emitted.
     */
    markAllAsTouched(opts = {}) {
        this.markAsTouched({ onlySelf: true, emitEvent: opts.emitEvent, sourceControl: this });
        this._forEachChild((control) => control.markAllAsTouched(opts));
    }
    markAsUntouched(opts = {}) {
        var _a;
        const changed = this.touched === true;
        this.touched = false;
        this._pendingTouched = false;
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        this._forEachChild((control) => {
            control.markAsUntouched({ onlySelf: true, emitEvent: opts.emitEvent, sourceControl });
        });
        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts, sourceControl);
        }
        if (changed && opts.emitEvent !== false) {
            this._events.next(new TouchedChangeEvent(false, sourceControl));
        }
    }
    markAsDirty(opts = {}) {
        var _a;
        const changed = this.pristine === true;
        this.pristine = false;
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsDirty(Object.assign(Object.assign({}, opts), { sourceControl }));
        }
        if (changed && opts.emitEvent !== false) {
            this._events.next(new PristineChangeEvent(false, sourceControl));
        }
    }
    markAsPristine(opts = {}) {
        var _a;
        const changed = this.pristine === false;
        this.pristine = true;
        this._pendingDirty = false;
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        this._forEachChild((control) => {
            /** We don't propagate the source control downwards */
            control.markAsPristine({ onlySelf: true, emitEvent: opts.emitEvent });
        });
        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts, sourceControl);
        }
        if (changed && opts.emitEvent !== false) {
            this._events.next(new PristineChangeEvent(true, sourceControl));
        }
    }
    markAsPending(opts = {}) {
        var _a;
        this.status = exports.PENDING;
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        if (opts.emitEvent !== false) {
            this._events.next(new StatusChangeEvent(this.status, sourceControl));
            this.statusChanges.emit(this.status);
        }
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsPending(Object.assign(Object.assign({}, opts), { sourceControl }));
        }
    }
    disable(opts = {}) {
        var _a;
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
        this.status = exports.DISABLED;
        this.errors = null;
        this._forEachChild((control) => {
            /** We don't propagate the source control downwards */
            control.disable(Object.assign(Object.assign({}, opts), { onlySelf: true }));
        });
        this._updateValue();
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        if (opts.emitEvent !== false) {
            this._events.next(new ValueChangeEvent(this.value, sourceControl));
            this._events.next(new StatusChangeEvent(this.status, sourceControl));
            this.valueChanges.emit(this.value);
            this.statusChanges.emit(this.status);
        }
        this._updateAncestors(Object.assign(Object.assign({}, opts), { skipPristineCheck }), this);
        this._onDisabledChange.forEach((changeFn) => changeFn(true));
    }
    /**
     * Enables the control. This means the control is included in validation checks and
     * the aggregate value of its parent. Its status recalculates based on its value and
     * its validators.
     *
     * By default, if the control has children, all children are enabled.
     *
     * @see {@link AbstractControl.status}
     *
     * @param opts Configure options that control how the control propagates changes and
     * emits events when marked as untouched
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     * * `emitEvent`: When true or not supplied (the default), the `statusChanges`,
     * `valueChanges` and `events`
     * observables emit events with the latest status and value when the control is enabled.
     * When false, no events are emitted.
     */
    enable(opts = {}) {
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
        this.status = exports.VALID;
        this._forEachChild((control) => {
            control.enable(Object.assign(Object.assign({}, opts), { onlySelf: true }));
        });
        this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
        this._updateAncestors(Object.assign(Object.assign({}, opts), { skipPristineCheck }), this);
        this._onDisabledChange.forEach((changeFn) => changeFn(false));
    }
    _updateAncestors(opts, sourceControl) {
        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidity(opts);
            if (!opts.skipPristineCheck) {
                this._parent._updatePristine({}, sourceControl);
            }
            this._parent._updateTouched({}, sourceControl);
        }
    }
    /**
     * Sets the parent of the control
     *
     * @param parent The new parent.
     */
    setParent(parent) {
        this._parent = parent;
    }
    /**
     * The raw value of this control. For most control implementations, the raw value will include
     * disabled children.
     */
    getRawValue() {
        return this.value;
    }
    updateValueAndValidity(opts = {}) {
        var _a;
        this._setInitialStatus();
        this._updateValue();
        if (this.enabled) {
            const shouldHaveEmitted = this._cancelExistingSubscription();
            this.errors = this._runValidator();
            this.status = this._calculateStatus();
            if (this.status === exports.VALID || this.status === exports.PENDING) {
                // If the canceled subscription should have emitted
                // we make sure the async validator emits the status change on completion
                this._runAsyncValidator(shouldHaveEmitted, opts.emitEvent);
            }
        }
        const sourceControl = (_a = opts.sourceControl) !== null && _a !== void 0 ? _a : this;
        if (opts.emitEvent !== false) {
            this._events.next(new ValueChangeEvent(this.value, sourceControl));
            this._events.next(new StatusChangeEvent(this.status, sourceControl));
            this.valueChanges.emit(this.value);
            this.statusChanges.emit(this.status);
        }
        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidity(Object.assign(Object.assign({}, opts), { sourceControl }));
        }
    }
    /** @internal */
    _updateTreeValidity(opts = { emitEvent: true }) {
        this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
        this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
    }
    _setInitialStatus() {
        this.status = this._allControlsDisabled() ? exports.DISABLED : exports.VALID;
    }
    _runValidator() {
        return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(shouldHaveEmitted, emitEvent) {
        if (this.asyncValidator) {
            this.status = exports.PENDING;
            this._hasOwnPendingAsyncValidator = {
                emitEvent: emitEvent !== false,
                shouldHaveEmitted: shouldHaveEmitted !== false,
            };
            const obs = (0, validators_1.toObservable)(this.asyncValidator(this));
            this._asyncValidationSubscription = obs.subscribe((errors) => {
                this._hasOwnPendingAsyncValidator = null;
                // This will trigger the recalculation of the validation status, which depends on
                // the state of the asynchronous validation (whether it is in progress or not). So, it is
                // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
                this.setErrors(errors, { emitEvent, shouldHaveEmitted });
            });
        }
    }
    _cancelExistingSubscription() {
        var _a, _b, _c;
        if (this._asyncValidationSubscription) {
            this._asyncValidationSubscription.unsubscribe();
            // we're cancelling the validator subscribtion, we keep if it should have emitted
            // because we want to emit eventually if it was required at least once.
            const shouldHaveEmitted = (_c = (((_a = this._hasOwnPendingAsyncValidator) === null || _a === void 0 ? void 0 : _a.emitEvent) ||
                ((_b = this._hasOwnPendingAsyncValidator) === null || _b === void 0 ? void 0 : _b.shouldHaveEmitted))) !== null && _c !== void 0 ? _c : false;
            this._hasOwnPendingAsyncValidator = null;
            return shouldHaveEmitted;
        }
        return false;
    }
    setErrors(errors, opts = {}) {
        this.errors = errors;
        this._updateControlsErrors(opts.emitEvent !== false, this, opts.shouldHaveEmitted);
    }
    /**
     * Retrieves a child control given the control's name or path.
     *
     * @param path A dot-delimited string or array of string/number values that define the path to the
     * control. If a string is provided, passing it as a string literal will result in improved type
     * information. Likewise, if an array is provided, passing it `as const` will cause improved type
     * information to be available.
     *
     * @usageNotes
     * ### Retrieve a nested control
     *
     * For example, to get a `name` control nested within a `person` sub-group:
     *
     * * `this.form.get('person.name');`
     *
     * -OR-
     *
     * * `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings
     *
     * ### Retrieve a control in a FormArray
     *
     * When accessing an element inside a FormArray, you can use an element index.
     * For example, to get a `price` control from the first element in an `items` array you can use:
     *
     * * `this.form.get('items.0.price');`
     *
     * -OR-
     *
     * * `this.form.get(['items', 0, 'price']);`
     */
    get(path) {
        let currPath = path;
        if (currPath == null)
            return null;
        if (!Array.isArray(currPath))
            currPath = currPath.split('.');
        if (currPath.length === 0)
            return null;
        return currPath.reduce((control, name) => control && control._find(name), this);
    }
    /**
     * @description
     * Reports error data for the control with the given path.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```ts
     * form = new FormGroup({
     *   address: new FormGroup({ street: new FormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * @returns error data for that particular error. If the control or error is not present,
     * null is returned.
     */
    getError(errorCode, path) {
        const control = path ? this.get(path) : this;
        return control && control.errors ? control.errors[errorCode] : null;
    }
    /**
     * @description
     * Reports whether the control with the given path has the error specified.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```ts
     * form = new FormGroup({
     *   address: new FormGroup({ street: new FormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * If no path is given, this method checks for the error on the current control.
     *
     * @returns whether the given error is present in the control at the given path.
     *
     * If the control is not present, false is returned.
     */
    hasError(errorCode, path) {
        return !!this.getError(errorCode, path);
    }
    /**
     * Retrieves the top-level ancestor of this control.
     */
    get root() {
        let x = this;
        while (x._parent) {
            x = x._parent;
        }
        return x;
    }
    /** @internal */
    _updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted) {
        this.status = this._calculateStatus();
        if (emitEvent) {
            this.statusChanges.emit(this.status);
        }
        // The Events Observable expose a slight different bevahior than the statusChanges obs
        // An async validator will still emit a StatusChangeEvent is a previously cancelled
        // async validator has emitEvent set to true
        if (emitEvent || shouldHaveEmitted) {
            this._events.next(new StatusChangeEvent(this.status, changedControl));
        }
        if (this._parent) {
            this._parent._updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted);
        }
    }
    /** @internal */
    _initObservables() {
        // TODO: this should be piped from events() but is breaking in G3
        this.valueChanges = new core_1.EventEmitter();
        this.statusChanges = new core_1.EventEmitter();
    }
    _calculateStatus() {
        if (this._allControlsDisabled())
            return exports.DISABLED;
        if (this.errors)
            return exports.INVALID;
        if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(exports.PENDING))
            return exports.PENDING;
        if (this._anyControlsHaveStatus(exports.INVALID))
            return exports.INVALID;
        return exports.VALID;
    }
    /** @internal */
    _anyControlsHaveStatus(status) {
        return this._anyControls((control) => control.status === status);
    }
    /** @internal */
    _anyControlsDirty() {
        return this._anyControls((control) => control.dirty);
    }
    /** @internal */
    _anyControlsTouched() {
        return this._anyControls((control) => control.touched);
    }
    /** @internal */
    _updatePristine(opts, changedControl) {
        const newPristine = !this._anyControlsDirty();
        const changed = this.pristine !== newPristine;
        this.pristine = newPristine;
        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts, changedControl);
        }
        if (changed) {
            this._events.next(new PristineChangeEvent(this.pristine, changedControl));
        }
    }
    /** @internal */
    _updateTouched(opts = {}, changedControl) {
        this.touched = this._anyControlsTouched();
        this._events.next(new TouchedChangeEvent(this.touched, changedControl));
        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts, changedControl);
        }
    }
    /** @internal */
    _registerOnCollectionChange(fn) {
        this._onCollectionChange = fn;
    }
    /** @internal */
    _setUpdateStrategy(opts) {
        if (isOptionsObj(opts) && opts.updateOn != null) {
            this._updateOn = opts.updateOn;
        }
    }
    /**
     * Check to see if parent has been marked artificially dirty.
     *
     * @internal
     */
    _parentMarkedDirty(onlySelf) {
        const parentDirty = this._parent && this._parent.dirty;
        return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
    }
    /** @internal */
    _find(name) {
        return null;
    }
    /**
     * Internal implementation of the `setValidators` method. Needs to be separated out into a
     * different method, because it is called in the constructor and it can break cases where
     * a control is extended.
     */
    _assignValidators(validators) {
        this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
        this._composedValidatorFn = coerceToValidator(this._rawValidators);
    }
    /**
     * Internal implementation of the `setAsyncValidators` method. Needs to be separated out into a
     * different method, because it is called in the constructor and it can break cases where
     * a control is extended.
     */
    _assignAsyncValidators(validators) {
        this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
        this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
    }
}
exports.AbstractControl = AbstractControl;
