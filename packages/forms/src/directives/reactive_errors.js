"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncValidatorsDroppedWithOptsWarning = exports.disabledAttrWarning = void 0;
exports.controlParentException = controlParentException;
exports.ngModelGroupException = ngModelGroupException;
exports.missingFormException = missingFormException;
exports.groupParentException = groupParentException;
exports.arrayParentException = arrayParentException;
exports.ngModelWarning = ngModelWarning;
exports.noControlsError = noControlsError;
exports.missingControlError = missingControlError;
exports.missingControlValueError = missingControlValueError;
const core_1 = require("@angular/core");
const error_examples_1 = require("./error_examples");
function controlParentException(nameOrIndex) {
    return new core_1.ɵRuntimeError(1050 /* RuntimeErrorCode.FORM_CONTROL_NAME_MISSING_PARENT */, `formControlName must be used with a parent formGroup directive. You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      ${describeFormControl(nameOrIndex)}

    Example:

    ${error_examples_1.formControlNameExample}`);
}
function describeFormControl(nameOrIndex) {
    if (nameOrIndex == null || nameOrIndex === '') {
        return '';
    }
    const valueType = typeof nameOrIndex === 'string' ? 'name' : 'index';
    return `Affected Form Control ${valueType}: "${nameOrIndex}"`;
}
function ngModelGroupException() {
    return new core_1.ɵRuntimeError(1051 /* RuntimeErrorCode.FORM_CONTROL_NAME_INSIDE_MODEL_GROUP */, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${error_examples_1.formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${error_examples_1.ngModelGroupExample}`);
}
function missingFormException() {
    return new core_1.ɵRuntimeError(1052 /* RuntimeErrorCode.FORM_GROUP_MISSING_INSTANCE */, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${error_examples_1.formControlNameExample}`);
}
function groupParentException() {
    return new core_1.ɵRuntimeError(1053 /* RuntimeErrorCode.FORM_GROUP_NAME_MISSING_PARENT */, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${error_examples_1.formGroupNameExample}`);
}
function arrayParentException() {
    return new core_1.ɵRuntimeError(1054 /* RuntimeErrorCode.FORM_ARRAY_NAME_MISSING_PARENT */, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${error_examples_1.formArrayNameExample}`);
}
exports.disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
exports.asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
    return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName'}#use-with-ngmodel
  `;
}
function describeKey(isFormGroup, key) {
    return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
    return `
    There are no form controls registered with this ${isFormGroup ? 'group' : 'array'} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
    return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
    return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
