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
exports.NgSelectOption = exports.SelectControlValueAccessor = void 0;
const core_1 = require("@angular/core");
const control_value_accessor_1 = require("./control_value_accessor");
const SELECT_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: (0, core_1.forwardRef)(() => SelectControlValueAccessor),
    multi: true,
};
function _buildValueString(id, value) {
    if (id == null)
        return `${value}`;
    if (value && typeof value === 'object')
        value = 'Object';
    return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/**
 * @description
 * The `ControlValueAccessor` for writing select control values and listening to select control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using select controls in a reactive form
 *
 * The following examples show how to use a select control in a reactive form.
 *
 * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Using select controls in a template-driven form
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * ### Customizing option selection
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * ```ts
 * const selectedCountriesControl = new FormControl();
 * ```
 *
 * ```html
 * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * **Note:** We listen to the 'change' event because 'input' events aren't fired
 * for selects in IE, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event#browser_compatibility
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let SelectControlValueAccessor = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
            host: { '(change)': 'onChange($any($event.target).value)', '(blur)': 'onTouched()' },
            providers: [SELECT_VALUE_ACCESSOR],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = control_value_accessor_1.BuiltInControlValueAccessor;
    let _instanceExtraInitializers = [];
    let _set_compareWith_decorators;
    var SelectControlValueAccessor = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            /** @nodoc */
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
         * Sets the "value" property on the select element.
         * @nodoc
         */
        writeValue(value) {
            this.value = value;
            const id = this._getOptionId(value);
            const valueString = _buildValueString(id, value);
            this.setProperty('value', valueString);
        }
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        registerOnChange(fn) {
            this.onChange = (valueString) => {
                this.value = this._getOptionValue(valueString);
                fn(this.value);
            };
        }
        /** @internal */
        _registerOption() {
            return (this._idCounter++).toString();
        }
        /** @internal */
        _getOptionId(value) {
            for (const id of this._optionMap.keys()) {
                if (this._compareWith(this._optionMap.get(id), value))
                    return id;
            }
            return null;
        }
        /** @internal */
        _getOptionValue(valueString) {
            const id = _extractId(valueString);
            return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
        }
    };
    __setFunctionName(_classThis, "SelectControlValueAccessor");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _set_compareWith_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_compareWith_decorators, { kind: "setter", name: "compareWith", static: false, private: false, access: { has: obj => "compareWith" in obj, set: (obj, value) => { obj.compareWith = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectControlValueAccessor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectControlValueAccessor = _classThis;
})();
exports.SelectControlValueAccessor = SelectControlValueAccessor;
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see {@link SelectControlValueAccessor}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
let NgSelectOption = (() => {
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
    var NgSelectOption = _classThis = class {
        constructor(_element, _renderer, _select) {
            this._element = (__runInitializers(this, _instanceExtraInitializers), _element);
            this._renderer = _renderer;
            this._select = _select;
            if (this._select)
                this.id = this._select._registerOption();
        }
        /**
         * @description
         * Tracks the value bound to the option element. Unlike the value binding,
         * ngValue supports binding to objects.
         */
        set ngValue(value) {
            if (this._select == null)
                return;
            this._select._optionMap.set(this.id, value);
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        }
        /**
         * @description
         * Tracks simple string values bound to the option element.
         * For objects, use the `ngValue` input binding.
         */
        set value(value) {
            this._setElementValue(value);
            if (this._select)
                this._select.writeValue(this._select.value);
        }
        /** @internal */
        _setElementValue(value) {
            this._renderer.setProperty(this._element.nativeElement, 'value', value);
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this._select) {
                this._select._optionMap.delete(this.id);
                this._select.writeValue(this._select.value);
            }
        }
    };
    __setFunctionName(_classThis, "NgSelectOption");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_ngValue_decorators = [(0, core_1.Input)('ngValue')];
        _set_value_decorators = [(0, core_1.Input)('value')];
        __esDecorate(_classThis, null, _set_ngValue_decorators, { kind: "setter", name: "ngValue", static: false, private: false, access: { has: obj => "ngValue" in obj, set: (obj, value) => { obj.ngValue = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgSelectOption = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgSelectOption = _classThis;
})();
exports.NgSelectOption = NgSelectOption;
