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
exports.NgForm = void 0;
const core_1 = require("@angular/core");
const abstract_model_1 = require("../model/abstract_model");
const form_group_1 = require("../model/form_group");
const validators_1 = require("../validators");
const control_container_1 = require("./control_container");
const shared_1 = require("./shared");
const formDirectiveProvider = {
    provide: control_container_1.ControlContainer,
    useExisting: (0, core_1.forwardRef)(() => NgForm),
};
const resolvedPromise = (() => Promise.resolve())();
/**
 * @description
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You optionally export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * gives you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, use `NgModel` with a `name`
 * attribute. You may use `NgModelGroup` to create sub-groups within the form.
 *
 * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event emits the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * To import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * @usageNotes
 *
 * ### Listening for form submission
 *
 * The following example shows how to capture the form values from the "ngSubmit" event.
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Setting the update options
 *
 * The following example shows you how to change the "updateOn" option from its default using
 * ngFormOptions.
 *
 * ```html
 * <form [ngFormOptions]="{updateOn: 'blur'}">
 *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
 * </form>
 * ```
 *
 * ### Native DOM validation UI
 *
 * In order to prevent the native DOM form validation UI from interfering with Angular's form
 * validation, Angular automatically adds the `novalidate` attribute on any `<form>` whenever
 * `FormModule` or `ReactiveFormModule` are imported into the application.
 * If you want to explicitly enable native DOM validation UI with Angular forms, you can add the
 * `ngNativeValidate` attribute to the `<form>` element:
 *
 * ```html
 * <form ngNativeValidate>
 *   ...
 * </form>
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
let NgForm = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]',
            providers: [formDirectiveProvider],
            host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
            outputs: ['ngSubmit'],
            exportAs: 'ngForm',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_container_1.ControlContainer;
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    var NgForm = _classThis = class extends _classSuper {
        /**
         * @description
         * Returns whether the form submission has been triggered.
         */
        get submitted() {
            return (0, core_1.untracked)(this.submittedReactive);
        }
        constructor(validators, asyncValidators, callSetDisabledState) {
            super();
            this.callSetDisabledState = callSetDisabledState;
            /** @internal */
            this._submitted = (0, core_1.computed)(() => this.submittedReactive());
            this.submittedReactive = (0, core_1.signal)(false);
            this._directives = new Set();
            /**
             * @description
             * Event emitter for the "ngSubmit" event
             */
            this.ngSubmit = new core_1.EventEmitter();
            /**
             * @description
             * Tracks options for the `NgForm` instance.
             *
             * **updateOn**: Sets the default `updateOn` value for all child `NgModels` below it
             * unless explicitly set by a child `NgModel` using `ngModelOptions`). Defaults to 'change'.
             * Possible values: `'change'` | `'blur'` | `'submit'`.
             *
             */
            this.options = __runInitializers(this, _options_initializers, void 0);
            __runInitializers(this, _options_extraInitializers);
            this.callSetDisabledState = callSetDisabledState;
            this.form = new form_group_1.FormGroup({}, (0, validators_1.composeValidators)(validators), (0, validators_1.composeAsyncValidators)(asyncValidators));
        }
        /** @nodoc */
        ngAfterViewInit() {
            this._setUpdateStrategy();
        }
        /**
         * @description
         * The directive instance.
         */
        get formDirective() {
            return this;
        }
        /**
         * @description
         * The internal `FormGroup` instance.
         */
        get control() {
            return this.form;
        }
        /**
         * @description
         * Returns an array representing the path to this group. Because this directive
         * always lives at the top level of a form, it is always an empty array.
         */
        get path() {
            return [];
        }
        /**
         * @description
         * Returns a map of the controls in this group.
         */
        get controls() {
            return this.form.controls;
        }
        /**
         * @description
         * Method that sets up the control directive in this group, re-calculates its value
         * and validity, and adds the instance to the internal list of directives.
         *
         * @param dir The `NgModel` directive instance.
         */
        addControl(dir) {
            resolvedPromise.then(() => {
                const container = this._findContainer(dir.path);
                dir.control = (container.registerControl(dir.name, dir.control));
                (0, shared_1.setUpControl)(dir.control, dir, this.callSetDisabledState);
                dir.control.updateValueAndValidity({ emitEvent: false });
                this._directives.add(dir);
            });
        }
        /**
         * @description
         * Retrieves the `FormControl` instance from the provided `NgModel` directive.
         *
         * @param dir The `NgModel` directive instance.
         */
        getControl(dir) {
            return this.form.get(dir.path);
        }
        /**
         * @description
         * Removes the `NgModel` instance from the internal list of directives
         *
         * @param dir The `NgModel` directive instance.
         */
        removeControl(dir) {
            resolvedPromise.then(() => {
                const container = this._findContainer(dir.path);
                if (container) {
                    container.removeControl(dir.name);
                }
                this._directives.delete(dir);
            });
        }
        /**
         * @description
         * Adds a new `NgModelGroup` directive instance to the form.
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        addFormGroup(dir) {
            resolvedPromise.then(() => {
                const container = this._findContainer(dir.path);
                const group = new form_group_1.FormGroup({});
                (0, shared_1.setUpFormContainer)(group, dir);
                container.registerControl(dir.name, group);
                group.updateValueAndValidity({ emitEvent: false });
            });
        }
        /**
         * @description
         * Removes the `NgModelGroup` directive instance from the form.
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        removeFormGroup(dir) {
            resolvedPromise.then(() => {
                const container = this._findContainer(dir.path);
                if (container) {
                    container.removeControl(dir.name);
                }
            });
        }
        /**
         * @description
         * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        getFormGroup(dir) {
            return this.form.get(dir.path);
        }
        /**
         * Sets the new value for the provided `NgControl` directive.
         *
         * @param dir The `NgControl` directive instance.
         * @param value The new value for the directive's control.
         */
        updateModel(dir, value) {
            resolvedPromise.then(() => {
                const ctrl = this.form.get(dir.path);
                ctrl.setValue(value);
            });
        }
        /**
         * @description
         * Sets the value for this `FormGroup`.
         *
         * @param value The new value
         */
        setValue(value) {
            this.control.setValue(value);
        }
        /**
         * @description
         * Method called when the "submit" event is triggered on the form.
         * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
         *
         * @param $event The "submit" event object
         */
        onSubmit($event) {
            var _a;
            this.submittedReactive.set(true);
            (0, shared_1.syncPendingControls)(this.form, this._directives);
            this.ngSubmit.emit($event);
            this.form._events.next(new abstract_model_1.FormSubmittedEvent(this.control));
            // Forms with `method="dialog"` have some special behavior
            // that won't reload the page and that shouldn't be prevented.
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
         * @param value The new value for the form.
         */
        resetForm(value = undefined) {
            this.form.reset(value);
            this.submittedReactive.set(false);
            this.form._events.next(new abstract_model_1.FormResetEvent(this.form));
        }
        _setUpdateStrategy() {
            if (this.options && this.options.updateOn != null) {
                this.form._updateOn = this.options.updateOn;
            }
        }
        _findContainer(path) {
            path.pop();
            return path.length ? this.form.get(path) : this.form;
        }
    };
    __setFunctionName(_classThis, "NgForm");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _options_decorators = [(0, core_1.Input)('ngFormOptions')];
        __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgForm = _classThis;
})();
exports.NgForm = NgForm;
