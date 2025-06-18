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
exports.NgSelectMultipleOption = exports.ɵNgSelectMultipleOption = exports.SelectMultipleControlValueAccessor = void 0;
const core_1 = require("@angular/core");
const control_value_accessor_1 = require("./control_value_accessor");
const SELECT_MULTIPLE_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: (0, core_1.forwardRef)(() => SelectMultipleControlValueAccessor),
    multi: true,
};
function _buildValueString(id, value) {
    if (id == null)
        return `${value}`;
    if (typeof value === 'string')
        value = `'${value}'`;
    if (value && typeof value === 'object')
        value = 'Object';
    return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/**
 * @description
 * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
 * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @see {@link SelectControlValueAccessor}
 *
 * @usageNotes
 *
 * ### Using a multi-select control
 *
 * The follow example shows you how to use a multi-select control with a reactive form.
 *
 * ```ts
 * const countryControl = new FormControl();
 * ```
 *
 * ```html
 * <select multiple name="countries" [formControl]="countryControl">
 *   <option *ngFor="let country of countries" [ngValue]="country">
 *     {{ country.name }}
 *   </option>
 * </select>
 * ```
 *
 * ### Customizing option selection
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * See the `SelectControlValueAccessor` for usage.
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let SelectMultipleControlValueAccessor = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
            host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
            providers: [SELECT_MULTIPLE_VALUE_ACCESSOR],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_value_accessor_1.BuiltInControlValueAccessor;
    let _instanceExtraInitializers = [];
    let _set_compareWith_decorators;
    var SelectMultipleControlValueAccessor = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            /**
             * The current value.
             * @nodoc
             */
            this.value = __runInitializers(this, _instanceExtraInitializers);
            /** @internal */
            this._optionMap = new Map();
            /** @internal */
            this._idCounter = 0;
            this._compareWith = Object.is;
        }
        /**
         * @description
         * Tracks the option comparison algorithm for tracking identities when
         * checking for changes.
         */
        set compareWith(fn) {
            if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw new core_1.ɵRuntimeError(1201 /* RuntimeErrorCode.COMPAREWITH_NOT_A_FN */, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
            }
            this._compareWith = fn;
        }
        /**
         * Sets the "value" property on one or of more of the select's options.
         * @nodoc
         */
        writeValue(value) {
            this.value = value;
            let optionSelectedStateSetter;
            if (Array.isArray(value)) {
                // convert values to ids
                const ids = value.map((v) => this._getOptionId(v));
                optionSelectedStateSetter = (opt, o) => {
                    opt._setSelected(ids.indexOf(o.toString()) > -1);
                };
            }
            else {
                optionSelectedStateSetter = (opt, o) => {
                    opt._setSelected(false);
                };
            }
            this._optionMap.forEach(optionSelectedStateSetter);
        }
        /**
         * Registers a function called when the control value changes
         * and writes an array of the selected options.
         * @nodoc
         */
        registerOnChange(fn) {
            this.onChange = (element) => {
                const selected = [];
                const selectedOptions = element.selectedOptions;
                if (selectedOptions !== undefined) {
                    const options = selectedOptions;
                    for (let i = 0; i < options.length; i++) {
                        const opt = options[i];
                        const val = this._getOptionValue(opt.value);
                        selected.push(val);
                    }
                }
                // Degrade to use `options` when `selectedOptions` property is not available.
                // Note: the `selectedOptions` is available in all supported browsers, but the Domino lib
                // doesn't have it currently, see https://github.com/fgnass/domino/issues/177.
                else {
                    const options = element.options;
                    for (let i = 0; i < options.length; i++) {
                        const opt = options[i];
                        if (opt.selected) {
                            const val = this._getOptionValue(opt.value);
                            selected.push(val);
                        }
                    }
                }
                this.value = selected;
                fn(selected);
            };
        }
        /** @internal */
        _registerOption(value) {
            const id = (this._idCounter++).toString();
            this._optionMap.set(id, value);
            return id;
        }
        /** @internal */
        _getOptionId(value) {
            for (const id of this._optionMap.keys()) {
                if (this._compareWith(this._optionMap.get(id)._value, value))
                    return id;
            }
            return null;
        }
        /** @internal */
        _getOptionValue(valueString) {
            const id = _extractId(valueString);
            return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
        }
    };
    __setFunctionName(_classThis, "SelectMultipleControlValueAccessor");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _set_compareWith_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_compareWith_decorators, { kind: "setter", name: "compareWith", static: false, private: false, access: { has: obj => "compareWith" in obj, set: (obj, value) => { obj.compareWith = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectMultipleControlValueAccessor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectMultipleControlValueAccessor = _classThis;
})();
exports.SelectMultipleControlValueAccessor = SelectMultipleControlValueAccessor;
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see {@link SelectMultipleControlValueAccessor}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let ɵNgSelectMultipleOption = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'option',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_ngValue_decorators;
    let _set_value_decorators;
    var ɵNgSelectMultipleOption = _classThis = class {
        constructor(_element, _renderer, _select) {
            this._element = (__runInitializers(this, _instanceExtraInitializers), _element);
            this._renderer = _renderer;
            this._select = _select;
            if (this._select) {
                this.id = this._select._registerOption(this);
            }
        }
        /**
         * @description
         * Tracks the value bound to the option element. Unlike the value binding,
         * ngValue supports binding to objects.
         */
        set ngValue(value) {
            if (this._select == null)
                return;
            this._value = value;
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        }
        /**
         * @description
         * Tracks simple string values bound to the option element.
         * For objects, use the `ngValue` input binding.
         */
        set value(value) {
            if (this._select) {
                this._value = value;
                this._setElementValue(_buildValueString(this.id, value));
                this._select.writeValue(this._select.value);
            }
            else {
                this._setElementValue(value);
            }
        }
        /** @internal */
        _setElementValue(value) {
            this._renderer.setProperty(this._element.nativeElement, 'value', value);
        }
        /** @internal */
        _setSelected(selected) {
            this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this._select) {
                this._select._optionMap.delete(this.id);
                this._select.writeValue(this._select.value);
            }
        }
    };
    __setFunctionName(_classThis, "\u0275NgSelectMultipleOption");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_ngValue_decorators = [(0, core_1.Input)('ngValue')];
        _set_value_decorators = [(0, core_1.Input)('value')];
        __esDecorate(_classThis, null, _set_ngValue_decorators, { kind: "setter", name: "ngValue", static: false, private: false, access: { has: obj => "ngValue" in obj, set: (obj, value) => { obj.ngValue = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ɵNgSelectMultipleOption = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ɵNgSelectMultipleOption = _classThis;
})();
exports.ɵNgSelectMultipleOption = ɵNgSelectMultipleOption;
exports.NgSelectMultipleOption = ɵNgSelectMultipleOption;
