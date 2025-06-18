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
exports.RadioControlValueAccessor = exports.RadioControlRegistry = void 0;
const core_1 = require("@angular/core");
const control_value_accessor_1 = require("./control_value_accessor");
const ng_control_1 = require("./ng_control");
const shared_1 = require("./shared");
const RADIO_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: (0, core_1.forwardRef)(() => RadioControlValueAccessor),
    multi: true,
};
function throwNameError() {
    throw new core_1.ɵRuntimeError(1202 /* RuntimeErrorCode.NAME_AND_FORM_CONTROL_NAME_MUST_MATCH */, `
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
/**
 * @description
 * Class used by Angular to track radio buttons. For internal use only.
 */
let RadioControlRegistry = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RadioControlRegistry = _classThis = class {
        constructor() {
            this._accessors = [];
        }
        /**
         * @description
         * Adds a control to the internal registry. For internal use only.
         */
        add(control, accessor) {
            this._accessors.push([control, accessor]);
        }
        /**
         * @description
         * Removes a control from the internal registry. For internal use only.
         */
        remove(accessor) {
            for (let i = this._accessors.length - 1; i >= 0; --i) {
                if (this._accessors[i][1] === accessor) {
                    this._accessors.splice(i, 1);
                    return;
                }
            }
        }
        /**
         * @description
         * Selects a radio button. For internal use only.
         */
        select(accessor) {
            this._accessors.forEach((c) => {
                if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
                    c[1].fireUncheck(accessor.value);
                }
            });
        }
        _isSameGroup(controlPair, accessor) {
            if (!controlPair[0].control)
                return false;
            return (controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name);
        }
    };
    __setFunctionName(_classThis, "RadioControlRegistry");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RadioControlRegistry = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RadioControlRegistry = _classThis;
})();
exports.RadioControlRegistry = RadioControlRegistry;
/**
 * @description
 * The `ControlValueAccessor` for writing radio control values and listening to radio control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using radio buttons with reactive form directives
 *
 * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
 * a reactive form, radio buttons in the same group should have the same `formControlName`.
 * Providing a `name` attribute is optional.
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let RadioControlValueAccessor = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
            host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
            providers: [RADIO_VALUE_ACCESSOR],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_value_accessor_1.BuiltInControlValueAccessor;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _formControlName_decorators;
    let _formControlName_initializers = [];
    let _formControlName_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    var RadioControlValueAccessor = _classThis = class extends _classSuper {
        constructor(renderer, elementRef, _registry, _injector) {
            var _a;
            super(renderer, elementRef);
            this._registry = _registry;
            this._injector = _injector;
            this.setDisabledStateFired = false;
            /**
             * The registered callback function called when a change event occurs on the input element.
             * Note: we declare `onChange` here (also used as host listener) as a function with no arguments
             * to override the `onChange` function (which expects 1 argument) in the parent
             * `BaseControlValueAccessor` class.
             * @nodoc
             */
            this.onChange = () => { };
            /**
             * @description
             * Tracks the name of the radio input element.
             */
            this.name = __runInitializers(this, _name_initializers, void 0);
            /**
             * @description
             * Tracks the name of the `FormControl` bound to the directive. The name corresponds
             * to a key in the parent `FormGroup` or `FormArray`.
             */
            this.formControlName = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _formControlName_initializers, void 0));
            /**
             * @description
             * Tracks the value of the radio input element
             */
            this.value = (__runInitializers(this, _formControlName_extraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.callSetDisabledState = (__runInitializers(this, _value_extraInitializers), (_a = (0, core_1.inject)(shared_1.CALL_SET_DISABLED_STATE, { optional: true })) !== null && _a !== void 0 ? _a : shared_1.setDisabledStateDefault);
        }
        /** @nodoc */
        ngOnInit() {
            this._control = this._injector.get(ng_control_1.NgControl);
            this._checkName();
            this._registry.add(this._control, this);
        }
        /** @nodoc */
        ngOnDestroy() {
            this._registry.remove(this);
        }
        /**
         * Sets the "checked" property value on the radio input element.
         * @nodoc
         */
        writeValue(value) {
            this._state = value === this.value;
            this.setProperty('checked', this._state);
        }
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        registerOnChange(fn) {
            this._fn = fn;
            this.onChange = () => {
                fn(this.value);
                this._registry.select(this);
            };
        }
        /** @nodoc */
        setDisabledState(isDisabled) {
            /**
             * `setDisabledState` is supposed to be called whenever the disabled state of a control changes,
             * including upon control creation. However, a longstanding bug caused the method to not fire
             * when an *enabled* control was attached. This bug was fixed in v15 in #47576.
             *
             * This had a side effect: previously, it was possible to instantiate a reactive form control
             * with `[attr.disabled]=true`, even though the corresponding control was enabled in the
             * model. This resulted in a mismatch between the model and the DOM. Now, because
             * `setDisabledState` is always called, the value in the DOM will be immediately overwritten
             * with the "correct" enabled value.
             *
             * However, the fix also created an exceptional case: radio buttons. Because Reactive Forms
             * models the entire group of radio buttons as a single `FormControl`, there is no way to
             * control the disabled state for individual radios, so they can no longer be configured as
             * disabled. Thus, we keep the old behavior for radio buttons, so that `[attr.disabled]`
             * continues to work. Specifically, we drop the first call to `setDisabledState` if `disabled`
             * is `false`, and we are not in legacy mode.
             */
            if (this.setDisabledStateFired ||
                isDisabled ||
                this.callSetDisabledState === 'whenDisabledForLegacyCode') {
                this.setProperty('disabled', isDisabled);
            }
            this.setDisabledStateFired = true;
        }
        /**
         * Sets the "value" on the radio input element and unchecks it.
         *
         * @param value
         */
        fireUncheck(value) {
            this.writeValue(value);
        }
        _checkName() {
            if (this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throwNameError();
            }
            if (!this.name && this.formControlName)
                this.name = this.formControlName;
        }
    };
    __setFunctionName(_classThis, "RadioControlValueAccessor");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, core_1.Input)()];
        _formControlName_decorators = [(0, core_1.Input)()];
        _value_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _formControlName_decorators, { kind: "field", name: "formControlName", static: false, private: false, access: { has: obj => "formControlName" in obj, get: obj => obj.formControlName, set: (obj, value) => { obj.formControlName = value; } }, metadata: _metadata }, _formControlName_initializers, _formControlName_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RadioControlValueAccessor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RadioControlValueAccessor = _classThis;
})();
exports.RadioControlValueAccessor = RadioControlValueAccessor;
