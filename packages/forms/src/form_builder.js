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
exports.UntypedFormBuilder = exports.NonNullableFormBuilder = exports.FormBuilder = void 0;
const core_1 = require("@angular/core");
const abstract_model_1 = require("./model/abstract_model");
const form_array_1 = require("./model/form_array");
const form_control_1 = require("./model/form_control");
const form_group_1 = require("./model/form_group");
function isAbstractControlOptions(options) {
    return (!!options &&
        (options.asyncValidators !== undefined ||
            options.validators !== undefined ||
            options.updateOn !== undefined));
}
/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a
 * `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
 * build complex forms.
 *
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 *
 * @publicApi
 */
let FormBuilder = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormBuilder = _classThis = class {
        constructor() {
            this.useNonNullable = false;
        }
        /**
         * @description
         * Returns a FormBuilder in which automatically constructed `FormControl` elements
         * have `{nonNullable: true}` and are non-nullable.
         *
         * **Constructing non-nullable controls**
         *
         * When constructing a control, it will be non-nullable, and will reset to its initial value.
         *
         * ```ts
         * let nnfb = new FormBuilder().nonNullable;
         * let name = nnfb.control('Alex'); // FormControl<string>
         * name.reset();
         * console.log(name); // 'Alex'
         * ```
         *
         * **Constructing non-nullable groups or arrays**
         *
         * When constructing a group or array, all automatically created inner controls will be
         * non-nullable, and will reset to their initial values.
         *
         * ```ts
         * let nnfb = new FormBuilder().nonNullable;
         * let name = nnfb.group({who: 'Alex'}); // FormGroup<{who: FormControl<string>}>
         * name.reset();
         * console.log(name); // {who: 'Alex'}
         * ```
         * **Constructing *nullable* fields on groups or arrays**
         *
         * It is still possible to have a nullable field. In particular, any `FormControl` which is
         * *already* constructed will not be altered. For example:
         *
         * ```ts
         * let nnfb = new FormBuilder().nonNullable;
         * // FormGroup<{who: FormControl<string|null>}>
         * let name = nnfb.group({who: new FormControl('Alex')});
         * name.reset(); console.log(name); // {who: null}
         * ```
         *
         * Because the inner control is constructed explicitly by the caller, the builder has
         * no control over how it is created, and cannot exclude the `null`.
         */
        get nonNullable() {
            const nnfb = new FormBuilder();
            nnfb.useNonNullable = true;
            return nnfb;
        }
        group(controls, options = null) {
            const reducedControls = this._reduceControls(controls);
            let newOptions = {};
            if (isAbstractControlOptions(options)) {
                // `options` are `AbstractControlOptions`
                newOptions = options;
            }
            else if (options !== null) {
                // `options` are legacy form group options
                newOptions.validators = options.validator;
                newOptions.asyncValidators = options.asyncValidator;
            }
            return new form_group_1.FormGroup(reducedControls, newOptions);
        }
        /**
         * @description
         * Constructs a new `FormRecord` instance. Accepts a single generic argument, which is an object
         * containing all the keys and corresponding inner control types.
         *
         * @param controls A collection of child controls. The key for each child is the name
         * under which it is registered.
         *
         * @param options Configuration options object for the `FormRecord`. The object should have the
         * `AbstractControlOptions` type and might contain the following fields:
         * * `validators`: A synchronous validator function, or an array of validator functions.
         * * `asyncValidators`: A single async validator or array of async validator functions.
         * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
         * | submit').
         */
        record(controls, options = null) {
            const reducedControls = this._reduceControls(controls);
            // Cast to `any` because the inferred types are not as specific as Element.
            return new form_group_1.FormRecord(reducedControls, options);
        }
        /**
         * @description
         * Constructs a new `FormControl` with the given state, validators and options. Sets
         * `{nonNullable: true}` in the options to get a non-nullable control. Otherwise, the
         * control will be nullable. Accepts a single generic argument, which is the type  of the
         * control's value.
         *
         * @param formState Initializes the control with an initial state value, or
         * with an object that contains both a value and a disabled status.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or a `FormControlOptions` object that contains
         * validation functions and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator
         * functions.
         *
         * @usageNotes
         *
         * ### Initialize a control as disabled
         *
         * The following example returns a control with an initial value in a disabled state.
         *
         * {@example forms/ts/formBuilder/form_builder_example.ts region='disabled-control'}
         */
        control(formState, validatorOrOpts, asyncValidator) {
            let newOptions = {};
            if (!this.useNonNullable) {
                return new form_control_1.FormControl(formState, validatorOrOpts, asyncValidator);
            }
            if (isAbstractControlOptions(validatorOrOpts)) {
                // If the second argument is options, then they are copied.
                newOptions = validatorOrOpts;
            }
            else {
                // If the other arguments are validators, they are copied into an options object.
                newOptions.validators = validatorOrOpts;
                newOptions.asyncValidators = asyncValidator;
            }
            return new form_control_1.FormControl(formState, Object.assign(Object.assign({}, newOptions), { nonNullable: true }));
        }
        /**
         * Constructs a new `FormArray` from the given array of configurations,
         * validators and options. Accepts a single generic argument, which is the type of each control
         * inside the array.
         *
         * @param controls An array of child controls or control configs. Each child control is given an
         *     index when it is registered.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of such functions, or an
         *     `AbstractControlOptions` object that contains
         * validation functions and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator functions.
         */
        array(controls, validatorOrOpts, asyncValidator) {
            const createdControls = controls.map((c) => this._createControl(c));
            // Cast to `any` because the inferred types are not as specific as Element.
            return new form_array_1.FormArray(createdControls, validatorOrOpts, asyncValidator);
        }
        /** @internal */
        _reduceControls(controls) {
            const createdControls = {};
            Object.keys(controls).forEach((controlName) => {
                createdControls[controlName] = this._createControl(controls[controlName]);
            });
            return createdControls;
        }
        /** @internal */
        _createControl(controls) {
            if (controls instanceof form_control_1.FormControl) {
                return controls;
            }
            else if (controls instanceof abstract_model_1.AbstractControl) {
                // A control; just return it
                return controls;
            }
            else if (Array.isArray(controls)) {
                // ControlConfig Tuple
                const value = controls[0];
                const validator = controls.length > 1 ? controls[1] : null;
                const asyncValidator = controls.length > 2 ? controls[2] : null;
                return this.control(value, validator, asyncValidator);
            }
            else {
                // T or FormControlState<T>
                return this.control(controls);
            }
        }
    };
    __setFunctionName(_classThis, "FormBuilder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormBuilder = _classThis;
})();
exports.FormBuilder = FormBuilder;
/**
 * @description
 * `NonNullableFormBuilder` is similar to {@link FormBuilder}, but automatically constructed
 * {@link FormControl} elements have `{nonNullable: true}` and are non-nullable.
 *
 * @publicApi
 */
let NonNullableFormBuilder = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
            useFactory: () => (0, core_1.inject)(FormBuilder).nonNullable,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NonNullableFormBuilder = _classThis = class {
    };
    __setFunctionName(_classThis, "NonNullableFormBuilder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NonNullableFormBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NonNullableFormBuilder = _classThis;
})();
exports.NonNullableFormBuilder = NonNullableFormBuilder;
/**
 * UntypedFormBuilder is the same as `FormBuilder`, but it provides untyped controls.
 */
let UntypedFormBuilder = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = FormBuilder;
    var UntypedFormBuilder = _classThis = class extends _classSuper {
        group(controlsConfig, options = null) {
            return super.group(controlsConfig, options);
        }
        /**
         * Like `FormBuilder#control`, except the resulting control is untyped.
         */
        control(formState, validatorOrOpts, asyncValidator) {
            return super.control(formState, validatorOrOpts, asyncValidator);
        }
        /**
         * Like `FormBuilder#array`, except the resulting array is untyped.
         */
        array(controlsConfig, validatorOrOpts, asyncValidator) {
            return super.array(controlsConfig, validatorOrOpts, asyncValidator);
        }
    };
    __setFunctionName(_classThis, "UntypedFormBuilder");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UntypedFormBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UntypedFormBuilder = _classThis;
})();
exports.UntypedFormBuilder = UntypedFormBuilder;
