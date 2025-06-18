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
exports.FormGroupDirective = void 0;
const core_1 = require("@angular/core");
const form_control_1 = require("../../model/form_control");
const control_container_1 = require("../control_container");
const reactive_errors_1 = require("../reactive_errors");
const shared_1 = require("../shared");
const abstract_model_1 = require("../../model/abstract_model");
const formDirectiveProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: (0, core_1.forwardRef)(() => FormGroupDirective),
};
/**
 * @description
 *
 * Binds an existing `FormGroup` or `FormRecord` to a DOM element.
 *
 * This directive accepts an existing `FormGroup` instance. It will then use this
 * `FormGroup` instance to match any child `FormControl`, `FormGroup`/`FormRecord`,
 * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
 * and `FormArrayName` directives.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 * @see {@link AbstractControl}
 *
 * @usageNotes
 * ### Register Form Group
 *
 * The following example registers a `FormGroup` with first name and last name controls,
 * and listens for the *ngSubmit* event when the button is clicked.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
let FormGroupDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[formGroup]',
            providers: [formDirectiveProvider],
            host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
            exportAs: 'ngForm',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_container_1.ControlContainer;
    let _form_decorators;
    let _form_initializers = [];
    let _form_extraInitializers = [];
    let _ngSubmit_decorators;
    let _ngSubmit_initializers = [];
    let _ngSubmit_extraInitializers = [];
    var FormGroupDirective = _classThis = class extends _classSuper {
        /**
         * @description
         * Reports whether the form submission has been triggered.
         */
        get submitted() {
            return (0, core_1.untracked)(this._submittedReactive);
        }
        // TODO(atscott): Remove once invalid API usage is cleaned up internally
        set submitted(value) {
            this._submittedReactive.set(value);
        }
        constructor(validators, asyncValidators, callSetDisabledState) {
            super();
            this.callSetDisabledState = callSetDisabledState;
            /** @internal */
            this._submitted = (0, core_1.computed)(() => this._submittedReactive());
            this._submittedReactive = (0, core_1.signal)(false);
            /**
             * Callback that should be invoked when controls in FormGroup or FormArray collection change
             * (added or removed). This callback triggers corresponding DOM updates.
             */
            this._onCollectionChange = () => this._updateDomValue();
            /**
             * @description
             * Tracks the list of added `FormControlName` instances
             */
            this.directives = [];
            /**
             * @description
             * Tracks the `FormGroup` bound to this directive.
             */
            this.form = __runInitializers(this, _form_initializers, null);
            /**
             * @description
             * Emits an event when the form submission has been triggered.
             */
            this.ngSubmit = (__runInitializers(this, _form_extraInitializers), __runInitializers(this, _ngSubmit_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _ngSubmit_extraInitializers);
            this.callSetDisabledState = callSetDisabledState;
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this.form) {
                throw (0, reactive_errors_1.missingFormException)();
            }
            if (changes.hasOwnProperty('form')) {
                this._updateValidators();
                this._updateDomValue();
                this._updateRegistrations();
                this._oldForm = this.form;
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.form) {
                (0, shared_1.cleanUpValidators)(this.form, this);
                // Currently the `onCollectionChange` callback is rewritten each time the
                // `_registerOnCollectionChange` function is invoked. The implication is that cleanup should
                // happen *only* when the `onCollectionChange` callback was set by this directive instance.
                // Otherwise it might cause overriding a callback of some other directive instances. We should
                // consider updating this logic later to make it similar to how `onChange` callbacks are
                // handled, see https://github.com/angular/angular/issues/39732 for additional info.
                if (this.form._onCollectionChange === this._onCollectionChange) {
                    this.form._registerOnCollectionChange(() => { });
                }
            }
        }
        /**
         * @description
         * Returns this directive's instance.
         */
        get formDirective() {
            return this;
        }
        /**
         * @description
         * Returns the `FormGroup` bound to this directive.
         */
        get control() {
            return this.form;
        }
        /**
         * @description
         * Returns an array representing the path to this group. Because this directive
         * always lives at the top level of a form, it always an empty array.
         */
        get path() {
            return [];
        }
        /**
         * @description
         * Method that sets up the control directive in this group, re-calculates its value
         * and validity, and adds the instance to the internal list of directives.
         *
         * @param dir The `FormControlName` directive instance.
         */
        addControl(dir) {
            const ctrl = this.form.get(dir.path);
            (0, shared_1.setUpControl)(ctrl, dir, this.callSetDisabledState);
            ctrl.updateValueAndValidity({ emitEvent: false });
            this.directives.push(dir);
            return ctrl;
        }
        /**
         * @description
         * Retrieves the `FormControl` instance from the provided `FormControlName` directive
         *
         * @param dir The `FormControlName` directive instance.
         */
        getControl(dir) {
            return this.form.get(dir.path);
        }
        /**
         * @description
         * Removes the `FormControlName` instance from the internal list of directives
         *
         * @param dir The `FormControlName` directive instance.
         */
        removeControl(dir) {
            (0, shared_1.cleanUpControl)(dir.control || null, dir, /* validateControlPresenceOnChange */ false);
            (0, shared_1.removeListItem)(this.directives, dir);
        }
        /**
         * Adds a new `FormGroupName` directive instance to the form.
         *
         * @param dir The `FormGroupName` directive instance.
         */
        addFormGroup(dir) {
            this._setUpFormContainer(dir);
        }
        /**
         * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
         * view.
         *
         * @param dir The `FormGroupName` directive instance.
         */
        removeFormGroup(dir) {
            this._cleanUpFormContainer(dir);
        }
        /**
         * @description
         * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
         *
         * @param dir The `FormGroupName` directive instance.
         */
        getFormGroup(dir) {
            return this.form.get(dir.path);
        }
        /**
         * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        addFormArray(dir) {
            this._setUpFormContainer(dir);
        }
        /**
         * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
         * view.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        removeFormArray(dir) {
            this._cleanUpFormContainer(dir);
        }
        /**
         * @description
         * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        getFormArray(dir) {
            return this.form.get(dir.path);
        }
        /**
         * Sets the new value for the provided `FormControlName` directive.
         *
         * @param dir The `FormControlName` directive instance.
         * @param value The new value for the directive's control.
         */
        updateModel(dir, value) {
            const ctrl = this.form.get(dir.path);
            ctrl.setValue(value);
        }
        /**
         * @description
         * Method called with the "submit" event is triggered on the form.
         * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
         *
         * @param $event The "submit" event object
         */
        onSubmit($event) {
            var _a;
            this._submittedReactive.set(true);
            (0, shared_1.syncPendingControls)(this.form, this.directives);
            this.ngSubmit.emit($event);
            this.form._events.next(new abstract_model_1.FormSubmittedEvent(this.control));
            // Forms with `method="dialog"` have some special behavior that won't reload the page and that
            // shouldn't be prevented. Note that we need to null check the `event` and the `target`, because
            // some internal apps call this method directly with the wrong arguments.
            return ((_a = $event === null || $event === void 0 ? void 0 : $event.target) === null || _a === void 0 ? void 0 : _a.method) === 'dialog';
        }
        /**
         * @description
         * Method called when the "reset" event is triggered on the form.
         */
        onReset() {
            this.resetForm();
        }
        /**
         * @description
         * Resets the form to an initial value and resets its submitted status.
         *
         * @param value The new value for the form, `undefined` by default
         */
        resetForm(value = undefined, options = {}) {
            this.form.reset(value, options);
            this._submittedReactive.set(false);
            if ((options === null || options === void 0 ? void 0 : options.emitEvent) !== false) {
                this.form._events.next(new abstract_model_1.FormResetEvent(this.form));
            }
        }
        /** @internal */
        _updateDomValue() {
            this.directives.forEach((dir) => {
                const oldCtrl = dir.control;
                const newCtrl = this.form.get(dir.path);
                if (oldCtrl !== newCtrl) {
                    // Note: the value of the `dir.control` may not be defined, for example when it's a first
                    // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
                    (0, shared_1.cleanUpControl)(oldCtrl || null, dir);
                    // Check whether new control at the same location inside the corresponding `FormGroup` is an
                    // instance of `FormControl` and perform control setup only if that's the case.
                    // Note: we don't need to clear the list of directives (`this.directives`) here, it would be
                    // taken care of in the `removeControl` method invoked when corresponding `formControlName`
                    // directive instance is being removed (invoked from `FormControlName.ngOnDestroy`).
                    if ((0, form_control_1.isFormControl)(newCtrl)) {
                        (0, shared_1.setUpControl)(newCtrl, dir, this.callSetDisabledState);
                        dir.control = newCtrl;
                    }
                }
            });
            this.form._updateTreeValidity({ emitEvent: false });
        }
        _setUpFormContainer(dir) {
            const ctrl = this.form.get(dir.path);
            (0, shared_1.setUpFormContainer)(ctrl, dir);
            // NOTE: this operation looks unnecessary in case no new validators were added in
            // `setUpFormContainer` call. Consider updating this code to match the logic in
            // `_cleanUpFormContainer` function.
            ctrl.updateValueAndValidity({ emitEvent: false });
        }
        _cleanUpFormContainer(dir) {
            if (this.form) {
                const ctrl = this.form.get(dir.path);
                if (ctrl) {
                    const isControlUpdated = (0, shared_1.cleanUpFormContainer)(ctrl, dir);
                    if (isControlUpdated) {
                        // Run validity check only in case a control was updated (i.e. view validators were
                        // removed) as removing view validators might cause validity to change.
                        ctrl.updateValueAndValidity({ emitEvent: false });
                    }
                }
            }
        }
        _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange);
            if (this._oldForm) {
                this._oldForm._registerOnCollectionChange(() => { });
            }
        }
        _updateValidators() {
            (0, shared_1.setUpValidators)(this.form, this);
            if (this._oldForm) {
                (0, shared_1.cleanUpValidators)(this._oldForm, this);
            }
        }
    };
    __setFunctionName(_classThis, "FormGroupDirective");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _form_decorators = [(0, core_1.Input)('formGroup')];
        _ngSubmit_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _form_decorators, { kind: "field", name: "form", static: false, private: false, access: { has: obj => "form" in obj, get: obj => obj.form, set: (obj, value) => { obj.form = value; } }, metadata: _metadata }, _form_initializers, _form_extraInitializers);
        __esDecorate(null, null, _ngSubmit_decorators, { kind: "field", name: "ngSubmit", static: false, private: false, access: { has: obj => "ngSubmit" in obj, get: obj => obj.ngSubmit, set: (obj, value) => { obj.ngSubmit = value; } }, metadata: _metadata }, _ngSubmit_initializers, _ngSubmit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormGroupDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormGroupDirective = _classThis;
})();
exports.FormGroupDirective = FormGroupDirective;
