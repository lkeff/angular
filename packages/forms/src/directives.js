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
exports.InternalFormsSharedModule = exports.ɵInternalFormsSharedModule = exports.REACTIVE_DRIVEN_DIRECTIVES = exports.TEMPLATE_DRIVEN_DIRECTIVES = exports.SHARED_FORM_DIRECTIVES = exports.CALL_SET_DISABLED_STATE = exports.SelectMultipleControlValueAccessor = exports.NgSelectMultipleOption = exports.SelectControlValueAccessor = exports.NgSelectOption = exports.FormGroupName = exports.FormArrayName = exports.FormGroupDirective = exports.FormControlName = exports.NG_MODEL_WITH_FORM_CONTROL_WARNING = exports.FormControlDirective = exports.RangeValueAccessor = exports.RadioControlValueAccessor = exports.NumberValueAccessor = exports.NgModelGroup = exports.NgModel = exports.NgForm = exports.NgControlStatusGroup = exports.NgControlStatus = exports.NgControl = exports.DefaultValueAccessor = exports.CheckboxControlValueAccessor = void 0;
const core_1 = require("@angular/core");
const checkbox_value_accessor_1 = require("./directives/checkbox_value_accessor");
const default_value_accessor_1 = require("./directives/default_value_accessor");
const ng_control_status_1 = require("./directives/ng_control_status");
const ng_form_1 = require("./directives/ng_form");
const ng_model_1 = require("./directives/ng_model");
const ng_model_group_1 = require("./directives/ng_model_group");
const ng_no_validate_directive_1 = require("./directives/ng_no_validate_directive");
const number_value_accessor_1 = require("./directives/number_value_accessor");
const radio_control_value_accessor_1 = require("./directives/radio_control_value_accessor");
const range_value_accessor_1 = require("./directives/range_value_accessor");
const form_control_directive_1 = require("./directives/reactive_directives/form_control_directive");
const form_control_name_1 = require("./directives/reactive_directives/form_control_name");
const form_group_directive_1 = require("./directives/reactive_directives/form_group_directive");
const form_group_name_1 = require("./directives/reactive_directives/form_group_name");
const select_control_value_accessor_1 = require("./directives/select_control_value_accessor");
const select_multiple_control_value_accessor_1 = require("./directives/select_multiple_control_value_accessor");
const validators_1 = require("./directives/validators");
var checkbox_value_accessor_2 = require("./directives/checkbox_value_accessor");
Object.defineProperty(exports, "CheckboxControlValueAccessor", { enumerable: true, get: function () { return checkbox_value_accessor_2.CheckboxControlValueAccessor; } });
var default_value_accessor_2 = require("./directives/default_value_accessor");
Object.defineProperty(exports, "DefaultValueAccessor", { enumerable: true, get: function () { return default_value_accessor_2.DefaultValueAccessor; } });
var ng_control_1 = require("./directives/ng_control");
Object.defineProperty(exports, "NgControl", { enumerable: true, get: function () { return ng_control_1.NgControl; } });
var ng_control_status_2 = require("./directives/ng_control_status");
Object.defineProperty(exports, "NgControlStatus", { enumerable: true, get: function () { return ng_control_status_2.NgControlStatus; } });
Object.defineProperty(exports, "NgControlStatusGroup", { enumerable: true, get: function () { return ng_control_status_2.NgControlStatusGroup; } });
var ng_form_2 = require("./directives/ng_form");
Object.defineProperty(exports, "NgForm", { enumerable: true, get: function () { return ng_form_2.NgForm; } });
var ng_model_2 = require("./directives/ng_model");
Object.defineProperty(exports, "NgModel", { enumerable: true, get: function () { return ng_model_2.NgModel; } });
var ng_model_group_2 = require("./directives/ng_model_group");
Object.defineProperty(exports, "NgModelGroup", { enumerable: true, get: function () { return ng_model_group_2.NgModelGroup; } });
var number_value_accessor_2 = require("./directives/number_value_accessor");
Object.defineProperty(exports, "NumberValueAccessor", { enumerable: true, get: function () { return number_value_accessor_2.NumberValueAccessor; } });
var radio_control_value_accessor_2 = require("./directives/radio_control_value_accessor");
Object.defineProperty(exports, "RadioControlValueAccessor", { enumerable: true, get: function () { return radio_control_value_accessor_2.RadioControlValueAccessor; } });
var range_value_accessor_2 = require("./directives/range_value_accessor");
Object.defineProperty(exports, "RangeValueAccessor", { enumerable: true, get: function () { return range_value_accessor_2.RangeValueAccessor; } });
var form_control_directive_2 = require("./directives/reactive_directives/form_control_directive");
Object.defineProperty(exports, "FormControlDirective", { enumerable: true, get: function () { return form_control_directive_2.FormControlDirective; } });
Object.defineProperty(exports, "NG_MODEL_WITH_FORM_CONTROL_WARNING", { enumerable: true, get: function () { return form_control_directive_2.NG_MODEL_WITH_FORM_CONTROL_WARNING; } });
var form_control_name_2 = require("./directives/reactive_directives/form_control_name");
Object.defineProperty(exports, "FormControlName", { enumerable: true, get: function () { return form_control_name_2.FormControlName; } });
var form_group_directive_2 = require("./directives/reactive_directives/form_group_directive");
Object.defineProperty(exports, "FormGroupDirective", { enumerable: true, get: function () { return form_group_directive_2.FormGroupDirective; } });
var form_group_name_2 = require("./directives/reactive_directives/form_group_name");
Object.defineProperty(exports, "FormArrayName", { enumerable: true, get: function () { return form_group_name_2.FormArrayName; } });
Object.defineProperty(exports, "FormGroupName", { enumerable: true, get: function () { return form_group_name_2.FormGroupName; } });
var select_control_value_accessor_2 = require("./directives/select_control_value_accessor");
Object.defineProperty(exports, "NgSelectOption", { enumerable: true, get: function () { return select_control_value_accessor_2.NgSelectOption; } });
Object.defineProperty(exports, "SelectControlValueAccessor", { enumerable: true, get: function () { return select_control_value_accessor_2.SelectControlValueAccessor; } });
var select_multiple_control_value_accessor_2 = require("./directives/select_multiple_control_value_accessor");
Object.defineProperty(exports, "NgSelectMultipleOption", { enumerable: true, get: function () { return select_multiple_control_value_accessor_2.NgSelectMultipleOption; } });
Object.defineProperty(exports, "SelectMultipleControlValueAccessor", { enumerable: true, get: function () { return select_multiple_control_value_accessor_2.SelectMultipleControlValueAccessor; } });
var shared_1 = require("./directives/shared");
Object.defineProperty(exports, "CALL_SET_DISABLED_STATE", { enumerable: true, get: function () { return shared_1.CALL_SET_DISABLED_STATE; } });
exports.SHARED_FORM_DIRECTIVES = [
    ng_no_validate_directive_1.NgNoValidate,
    select_control_value_accessor_1.NgSelectOption,
    select_multiple_control_value_accessor_1.NgSelectMultipleOption,
    default_value_accessor_1.DefaultValueAccessor,
    number_value_accessor_1.NumberValueAccessor,
    range_value_accessor_1.RangeValueAccessor,
    checkbox_value_accessor_1.CheckboxControlValueAccessor,
    select_control_value_accessor_1.SelectControlValueAccessor,
    select_multiple_control_value_accessor_1.SelectMultipleControlValueAccessor,
    radio_control_value_accessor_1.RadioControlValueAccessor,
    ng_control_status_1.NgControlStatus,
    ng_control_status_1.NgControlStatusGroup,
    validators_1.RequiredValidator,
    validators_1.MinLengthValidator,
    validators_1.MaxLengthValidator,
    validators_1.PatternValidator,
    validators_1.CheckboxRequiredValidator,
    validators_1.EmailValidator,
    validators_1.MinValidator,
    validators_1.MaxValidator,
];
exports.TEMPLATE_DRIVEN_DIRECTIVES = [ng_model_1.NgModel, ng_model_group_1.NgModelGroup, ng_form_1.NgForm];
exports.REACTIVE_DRIVEN_DIRECTIVES = [
    form_control_directive_1.FormControlDirective,
    form_group_directive_1.FormGroupDirective,
    form_control_name_1.FormControlName,
    form_group_name_1.FormGroupName,
    form_group_name_1.FormArrayName,
];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */
let ɵInternalFormsSharedModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: exports.SHARED_FORM_DIRECTIVES,
            exports: exports.SHARED_FORM_DIRECTIVES,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ɵInternalFormsSharedModule = _classThis = class {
    };
    __setFunctionName(_classThis, "\u0275InternalFormsSharedModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ɵInternalFormsSharedModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ɵInternalFormsSharedModule = _classThis;
})();
exports.ɵInternalFormsSharedModule = ɵInternalFormsSharedModule;
exports.InternalFormsSharedModule = ɵInternalFormsSharedModule;
