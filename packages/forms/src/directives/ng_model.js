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
exports.NgModel = void 0;
const core_1 = require("@angular/core");
const form_control_1 = require("../model/form_control");
const abstract_form_group_directive_1 = require("./abstract_form_group_directive");
const ng_control_1 = require("./ng_control");
const ng_form_1 = require("./ng_form");
const ng_model_group_1 = require("./ng_model_group");
const shared_1 = require("./shared");
const template_driven_errors_1 = require("./template_driven_errors");
const formControlBinding = {
    provide: ng_control_1.NgControl,
    useExisting: (0, core_1.forwardRef)(() => NgModel),
};
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```html
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have an old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel`s have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */
const resolvedPromise = (() => Promise.resolve())();
/**
 * @description
 * Creates a `FormControl` instance from a [domain
 * model](https://en.wikipedia.org/wiki/Domain_model) and binds it to a form control element.
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the domain model's value in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-in-a-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * To inspect the properties of the associated `FormControl` (like the validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex:
 * `#myVar="ngModel"`). You can then access the control using the directive's `control` property.
 * However, the most commonly used properties (like `valid` and `dirty`) also exist on the control
 * for direct access. See a full list of properties directly available in
 * `AbstractControlDirective`.
 *
 * @see {@link RadioControlValueAccessor}
 * @see {@link SelectControlValueAccessor}
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * ### Using ngModel within a form
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel `name` attribute through options
 *
 * The following example shows you an alternate way to set the name attribute. Here,
 * an attribute identified as name is used within a custom form control component. To still be able
 * to specify the NgModel's name, you must specify it using the `ngModelOptions` input instead.
 *
 * ```html
 * <form>
 *   <my-custom-form-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-custom-form-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
let NgModel = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ngModel]:not([formControlName]):not([formControl])',
            providers: [formControlBinding],
            exportAs: 'ngModel',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ng_control_1.NgControl;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _isDisabled_decorators;
    let _isDisabled_initializers = [];
    let _isDisabled_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _update_decorators;
    let _update_initializers = [];
    let _update_extraInitializers = [];
    var NgModel = _classThis = class extends _classSuper {
        constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState) {
            super();
            this._changeDetectorRef = _changeDetectorRef;
            this.callSetDisabledState = callSetDisabledState;
            this.control = new form_control_1.FormControl();
            /** @internal */
            this._registered = false;
            /**
             * @description
             * Tracks the name bound to the directive. If a parent form exists, it
             * uses this name as a key to retrieve this control's value.
             */
            this.name = __runInitializers(this, _name_initializers, '');
            /**
             * @description
             * Tracks whether the control is disabled.
             */
            this.isDisabled = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _isDisabled_initializers, void 0));
            /**
             * @description
             * Tracks the value bound to this directive.
             */
            this.model = (__runInitializers(this, _isDisabled_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            /**
             * @description
             * Tracks the configuration options for this `ngModel` instance.
             *
             * **name**: An alternative to setting the name attribute on the form control element. See
             * the [example](api/forms/NgModel#using-ngmodel-on-a-standalone-control) for using `NgModel`
             * as a standalone control.
             *
             * **standalone**: When set to true, the `ngModel` will not register itself with its parent form,
             * and acts as if it's not in the form. Defaults to false. If no parent form exists, this option
             * has no effect.
             *
             * **updateOn**: Defines the event upon which the form control value and validity update.
             * Defaults to 'change'. Possible values: `'change'` | `'blur'` | `'submit'`.
             *
             */
            this.options = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _options_initializers, void 0));
            /**
             * @description
             * Event emitter for producing the `ngModelChange` event after
             * the view model updates.
             */
            this.update = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _update_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _update_extraInitializers);
            this._changeDetectorRef = _changeDetectorRef;
            this.callSetDisabledState = callSetDisabledState;
            this._parent = parent;
            this._setValidators(validators);
            this._setAsyncValidators(asyncValidators);
            this.valueAccessor = (0, shared_1.selectValueAccessor)(this, valueAccessors);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            this._checkForErrors();
            if (!this._registered || 'name' in changes) {
                if (this._registered) {
                    this._checkName();
                    if (this.formDirective) {
                        // We can't call `formDirective.removeControl(this)`, because the `name` has already been
                        // changed. We also can't reset the name temporarily since the logic in `removeControl`
                        // is inside a promise and it won't run immediately. We work around it by giving it an
                        // object with the same shape instead.
                        const oldName = changes['name'].previousValue;
                        this.formDirective.removeControl({ name: oldName, path: this._getPath(oldName) });
                    }
                }
                this._setUpControl();
            }
            if ('isDisabled' in changes) {
                this._updateDisabled(changes);
            }
            if ((0, shared_1.isPropertyUpdated)(changes, this.viewModel)) {
                this._updateValue(this.model);
                this.viewModel = this.model;
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
        }
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get path() {
            return this._getPath(this.name);
        }
        /**
         * @description
         * The top-level directive for this control if present, otherwise null.
         */
        get formDirective() {
            return this._parent ? this._parent.formDirective : null;
        }
        /**
         * @description
         * Sets the new value for the view model and emits an `ngModelChange` event.
         *
         * @param newValue The new value emitted by `ngModelChange`.
         */
        viewToModelUpdate(newValue) {
            this.viewModel = newValue;
            this.update.emit(newValue);
        }
        _setUpControl() {
            this._setUpdateStrategy();
            this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
            this._registered = true;
        }
        _setUpdateStrategy() {
            if (this.options && this.options.updateOn != null) {
                this.control._updateOn = this.options.updateOn;
            }
        }
        _isStandalone() {
            return !this._parent || !!(this.options && this.options.standalone);
        }
        _setUpStandalone() {
            (0, shared_1.setUpControl)(this.control, this, this.callSetDisabledState);
            this.control.updateValueAndValidity({ emitEvent: false });
        }
        _checkForErrors() {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._isStandalone()) {
                checkParentType(this._parent);
            }
            this._checkName();
        }
        _checkName() {
            if (this.options && this.options.name)
                this.name = this.options.name;
            if (!this._isStandalone() && !this.name && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw (0, template_driven_errors_1.missingNameException)();
            }
        }
        _updateValue(value) {
            resolvedPromise.then(() => {
                var _a;
                this.control.setValue(value, { emitViewToModelChange: false });
                (_a = this._changeDetectorRef) === null || _a === void 0 ? void 0 : _a.markForCheck();
            });
        }
        _updateDisabled(changes) {
            const disabledValue = changes['isDisabled'].currentValue;
            // checking for 0 to avoid breaking change
            const isDisabled = disabledValue !== 0 && (0, core_1.booleanAttribute)(disabledValue);
            resolvedPromise.then(() => {
                var _a;
                if (isDisabled && !this.control.disabled) {
                    this.control.disable();
                }
                else if (!isDisabled && this.control.disabled) {
                    this.control.enable();
                }
                (_a = this._changeDetectorRef) === null || _a === void 0 ? void 0 : _a.markForCheck();
            });
        }
        _getPath(controlName) {
            return this._parent ? (0, shared_1.controlPath)(controlName, this._parent) : [controlName];
        }
    };
    __setFunctionName(_classThis, "NgModel");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, core_1.Input)()];
        _isDisabled_decorators = [(0, core_1.Input)('disabled')];
        _model_decorators = [(0, core_1.Input)('ngModel')];
        _options_decorators = [(0, core_1.Input)('ngModelOptions')];
        _update_decorators = [(0, core_1.Output)('ngModelChange')];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _isDisabled_decorators, { kind: "field", name: "isDisabled", static: false, private: false, access: { has: obj => "isDisabled" in obj, get: obj => obj.isDisabled, set: (obj, value) => { obj.isDisabled = value; } }, metadata: _metadata }, _isDisabled_initializers, _isDisabled_extraInitializers);
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
        __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
        __esDecorate(null, null, _update_decorators, { kind: "field", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update, set: (obj, value) => { obj.update = value; } }, metadata: _metadata }, _update_initializers, _update_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModel = _classThis;
})();
exports.NgModel = NgModel;
function checkParentType(parent) {
    if (!(parent instanceof ng_model_group_1.NgModelGroup) && parent instanceof abstract_form_group_directive_1.AbstractFormGroupDirective) {
        throw (0, template_driven_errors_1.formGroupNameException)();
    }
    else if (!(parent instanceof ng_model_group_1.NgModelGroup) && !(parent instanceof ng_form_1.NgForm)) {
        throw (0, template_driven_errors_1.modelParentException)();
    }
}
