"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormControl = exports.UntypedFormArray = exports.isFormArray = exports.FormArray = exports.ValueChangeEvent = exports.TouchedChangeEvent = exports.StatusChangeEvent = exports.PristineChangeEvent = exports.FormSubmittedEvent = exports.FormResetEvent = exports.ControlEvent = exports.AbstractControl = exports.UntypedFormBuilder = exports.NonNullableFormBuilder = exports.FormBuilder = exports.RequiredValidator = exports.PatternValidator = exports.MinValidator = exports.MinLengthValidator = exports.MaxValidator = exports.MaxLengthValidator = exports.EmailValidator = exports.CheckboxRequiredValidator = exports.ɵNgSelectMultipleOption = exports.SelectMultipleControlValueAccessor = exports.SelectControlValueAccessor = exports.NgSelectOption = exports.FormGroupName = exports.FormArrayName = exports.FormGroupDirective = exports.FormControlName = exports.FormControlDirective = exports.RangeValueAccessor = exports.RadioControlValueAccessor = exports.NumberValueAccessor = exports.ɵNgNoValidate = exports.NgModelGroup = exports.NgModel = exports.NgForm = exports.NgControlStatusGroup = exports.NgControlStatus = exports.NgControl = exports.DefaultValueAccessor = exports.COMPOSITION_BUFFER_MODE = exports.NG_VALUE_ACCESSOR = exports.ControlContainer = exports.CheckboxControlValueAccessor = exports.AbstractFormGroupDirective = exports.AbstractControlDirective = exports.ɵInternalFormsSharedModule = void 0;
exports.VERSION = exports.Validators = exports.NG_VALIDATORS = exports.NG_ASYNC_VALIDATORS = exports.UntypedFormGroup = exports.isFormRecord = exports.isFormGroup = exports.FormRecord = exports.FormGroup = exports.UntypedFormControl = exports.isFormControl = void 0;
/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a `FormGroup` that
 * consists of `FormControl` objects, and mapping them onto the DOM. `FormControl`
 * objects can then be used to read information from the form DOM elements.
 *
 * Forms providers are not included in default providers; you must import these providers
 * explicitly.
 */
var directives_1 = require("./directives");
Object.defineProperty(exports, "\u0275InternalFormsSharedModule", { enumerable: true, get: function () { return directives_1.ɵInternalFormsSharedModule; } });
var abstract_control_directive_1 = require("./directives/abstract_control_directive");
Object.defineProperty(exports, "AbstractControlDirective", { enumerable: true, get: function () { return abstract_control_directive_1.AbstractControlDirective; } });
var abstract_form_group_directive_1 = require("./directives/abstract_form_group_directive");
Object.defineProperty(exports, "AbstractFormGroupDirective", { enumerable: true, get: function () { return abstract_form_group_directive_1.AbstractFormGroupDirective; } });
var checkbox_value_accessor_1 = require("./directives/checkbox_value_accessor");
Object.defineProperty(exports, "CheckboxControlValueAccessor", { enumerable: true, get: function () { return checkbox_value_accessor_1.CheckboxControlValueAccessor; } });
var control_container_1 = require("./directives/control_container");
Object.defineProperty(exports, "ControlContainer", { enumerable: true, get: function () { return control_container_1.ControlContainer; } });
var control_value_accessor_1 = require("./directives/control_value_accessor");
Object.defineProperty(exports, "NG_VALUE_ACCESSOR", { enumerable: true, get: function () { return control_value_accessor_1.NG_VALUE_ACCESSOR; } });
var default_value_accessor_1 = require("./directives/default_value_accessor");
Object.defineProperty(exports, "COMPOSITION_BUFFER_MODE", { enumerable: true, get: function () { return default_value_accessor_1.COMPOSITION_BUFFER_MODE; } });
Object.defineProperty(exports, "DefaultValueAccessor", { enumerable: true, get: function () { return default_value_accessor_1.DefaultValueAccessor; } });
var ng_control_1 = require("./directives/ng_control");
Object.defineProperty(exports, "NgControl", { enumerable: true, get: function () { return ng_control_1.NgControl; } });
var ng_control_status_1 = require("./directives/ng_control_status");
Object.defineProperty(exports, "NgControlStatus", { enumerable: true, get: function () { return ng_control_status_1.NgControlStatus; } });
Object.defineProperty(exports, "NgControlStatusGroup", { enumerable: true, get: function () { return ng_control_status_1.NgControlStatusGroup; } });
var ng_form_1 = require("./directives/ng_form");
Object.defineProperty(exports, "NgForm", { enumerable: true, get: function () { return ng_form_1.NgForm; } });
var ng_model_1 = require("./directives/ng_model");
Object.defineProperty(exports, "NgModel", { enumerable: true, get: function () { return ng_model_1.NgModel; } });
var ng_model_group_1 = require("./directives/ng_model_group");
Object.defineProperty(exports, "NgModelGroup", { enumerable: true, get: function () { return ng_model_group_1.NgModelGroup; } });
var ng_no_validate_directive_1 = require("./directives/ng_no_validate_directive");
Object.defineProperty(exports, "\u0275NgNoValidate", { enumerable: true, get: function () { return ng_no_validate_directive_1.ɵNgNoValidate; } });
var number_value_accessor_1 = require("./directives/number_value_accessor");
Object.defineProperty(exports, "NumberValueAccessor", { enumerable: true, get: function () { return number_value_accessor_1.NumberValueAccessor; } });
var radio_control_value_accessor_1 = require("./directives/radio_control_value_accessor");
Object.defineProperty(exports, "RadioControlValueAccessor", { enumerable: true, get: function () { return radio_control_value_accessor_1.RadioControlValueAccessor; } });
var range_value_accessor_1 = require("./directives/range_value_accessor");
Object.defineProperty(exports, "RangeValueAccessor", { enumerable: true, get: function () { return range_value_accessor_1.RangeValueAccessor; } });
var form_control_directive_1 = require("./directives/reactive_directives/form_control_directive");
Object.defineProperty(exports, "FormControlDirective", { enumerable: true, get: function () { return form_control_directive_1.FormControlDirective; } });
var form_control_name_1 = require("./directives/reactive_directives/form_control_name");
Object.defineProperty(exports, "FormControlName", { enumerable: true, get: function () { return form_control_name_1.FormControlName; } });
var form_group_directive_1 = require("./directives/reactive_directives/form_group_directive");
Object.defineProperty(exports, "FormGroupDirective", { enumerable: true, get: function () { return form_group_directive_1.FormGroupDirective; } });
var form_group_name_1 = require("./directives/reactive_directives/form_group_name");
Object.defineProperty(exports, "FormArrayName", { enumerable: true, get: function () { return form_group_name_1.FormArrayName; } });
Object.defineProperty(exports, "FormGroupName", { enumerable: true, get: function () { return form_group_name_1.FormGroupName; } });
var select_control_value_accessor_1 = require("./directives/select_control_value_accessor");
Object.defineProperty(exports, "NgSelectOption", { enumerable: true, get: function () { return select_control_value_accessor_1.NgSelectOption; } });
Object.defineProperty(exports, "SelectControlValueAccessor", { enumerable: true, get: function () { return select_control_value_accessor_1.SelectControlValueAccessor; } });
var select_multiple_control_value_accessor_1 = require("./directives/select_multiple_control_value_accessor");
Object.defineProperty(exports, "SelectMultipleControlValueAccessor", { enumerable: true, get: function () { return select_multiple_control_value_accessor_1.SelectMultipleControlValueAccessor; } });
Object.defineProperty(exports, "\u0275NgSelectMultipleOption", { enumerable: true, get: function () { return select_multiple_control_value_accessor_1.ɵNgSelectMultipleOption; } });
var validators_1 = require("./directives/validators");
Object.defineProperty(exports, "CheckboxRequiredValidator", { enumerable: true, get: function () { return validators_1.CheckboxRequiredValidator; } });
Object.defineProperty(exports, "EmailValidator", { enumerable: true, get: function () { return validators_1.EmailValidator; } });
Object.defineProperty(exports, "MaxLengthValidator", { enumerable: true, get: function () { return validators_1.MaxLengthValidator; } });
Object.defineProperty(exports, "MaxValidator", { enumerable: true, get: function () { return validators_1.MaxValidator; } });
Object.defineProperty(exports, "MinLengthValidator", { enumerable: true, get: function () { return validators_1.MinLengthValidator; } });
Object.defineProperty(exports, "MinValidator", { enumerable: true, get: function () { return validators_1.MinValidator; } });
Object.defineProperty(exports, "PatternValidator", { enumerable: true, get: function () { return validators_1.PatternValidator; } });
Object.defineProperty(exports, "RequiredValidator", { enumerable: true, get: function () { return validators_1.RequiredValidator; } });
var form_builder_1 = require("./form_builder");
Object.defineProperty(exports, "FormBuilder", { enumerable: true, get: function () { return form_builder_1.FormBuilder; } });
Object.defineProperty(exports, "NonNullableFormBuilder", { enumerable: true, get: function () { return form_builder_1.NonNullableFormBuilder; } });
Object.defineProperty(exports, "UntypedFormBuilder", { enumerable: true, get: function () { return form_builder_1.UntypedFormBuilder; } });
var abstract_model_1 = require("./model/abstract_model");
Object.defineProperty(exports, "AbstractControl", { enumerable: true, get: function () { return abstract_model_1.AbstractControl; } });
Object.defineProperty(exports, "ControlEvent", { enumerable: true, get: function () { return abstract_model_1.ControlEvent; } });
Object.defineProperty(exports, "FormResetEvent", { enumerable: true, get: function () { return abstract_model_1.FormResetEvent; } });
Object.defineProperty(exports, "FormSubmittedEvent", { enumerable: true, get: function () { return abstract_model_1.FormSubmittedEvent; } });
Object.defineProperty(exports, "PristineChangeEvent", { enumerable: true, get: function () { return abstract_model_1.PristineChangeEvent; } });
Object.defineProperty(exports, "StatusChangeEvent", { enumerable: true, get: function () { return abstract_model_1.StatusChangeEvent; } });
Object.defineProperty(exports, "TouchedChangeEvent", { enumerable: true, get: function () { return abstract_model_1.TouchedChangeEvent; } });
Object.defineProperty(exports, "ValueChangeEvent", { enumerable: true, get: function () { return abstract_model_1.ValueChangeEvent; } });
var form_array_1 = require("./model/form_array");
Object.defineProperty(exports, "FormArray", { enumerable: true, get: function () { return form_array_1.FormArray; } });
Object.defineProperty(exports, "isFormArray", { enumerable: true, get: function () { return form_array_1.isFormArray; } });
Object.defineProperty(exports, "UntypedFormArray", { enumerable: true, get: function () { return form_array_1.UntypedFormArray; } });
var form_control_1 = require("./model/form_control");
Object.defineProperty(exports, "FormControl", { enumerable: true, get: function () { return form_control_1.FormControl; } });
Object.defineProperty(exports, "isFormControl", { enumerable: true, get: function () { return form_control_1.isFormControl; } });
Object.defineProperty(exports, "UntypedFormControl", { enumerable: true, get: function () { return form_control_1.UntypedFormControl; } });
var form_group_1 = require("./model/form_group");
Object.defineProperty(exports, "FormGroup", { enumerable: true, get: function () { return form_group_1.FormGroup; } });
Object.defineProperty(exports, "FormRecord", { enumerable: true, get: function () { return form_group_1.FormRecord; } });
Object.defineProperty(exports, "isFormGroup", { enumerable: true, get: function () { return form_group_1.isFormGroup; } });
Object.defineProperty(exports, "isFormRecord", { enumerable: true, get: function () { return form_group_1.isFormRecord; } });
Object.defineProperty(exports, "UntypedFormGroup", { enumerable: true, get: function () { return form_group_1.UntypedFormGroup; } });
var validators_2 = require("./validators");
Object.defineProperty(exports, "NG_ASYNC_VALIDATORS", { enumerable: true, get: function () { return validators_2.NG_ASYNC_VALIDATORS; } });
Object.defineProperty(exports, "NG_VALIDATORS", { enumerable: true, get: function () { return validators_2.NG_VALIDATORS; } });
Object.defineProperty(exports, "Validators", { enumerable: true, get: function () { return validators_2.Validators; } });
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
__exportStar(require("./form_providers"), exports);
