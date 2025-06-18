"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertStandaloneComponentType = assertStandaloneComponentType;
exports.assertComponentDef = assertComponentDef;
exports.throwMultipleComponentError = throwMultipleComponentError;
exports.throwErrorIfNoChangesMode = throwErrorIfNoChangesMode;
exports.getExpressionChangedErrorDetails = getExpressionChangedErrorDetails;
const errors_1 = require("../errors");
const def_getters_1 = require("./def_getters");
const element_validation_1 = require("./instructions/element_validation");
const view_1 = require("./interfaces/view");
const misc_utils_1 = require("./util/misc_utils");
const stringify_utils_1 = require("./util/stringify_utils");
/**
 * The max length of the string representation of a value in an error message
 */
const VALUE_STRING_LENGTH_LIMIT = 200;
/** Verifies that a given type is a Standalone Component. */
function assertStandaloneComponentType(type) {
    assertComponentDef(type);
    const componentDef = (0, def_getters_1.getComponentDef)(type);
    if (!componentDef.standalone) {
        throw new errors_1.RuntimeError(907 /* RuntimeErrorCode.TYPE_IS_NOT_STANDALONE */, `The ${(0, stringify_utils_1.stringifyForError)(type)} component is not marked as standalone, ` +
            `but Angular expects to have a standalone component here. ` +
            `Please make sure the ${(0, stringify_utils_1.stringifyForError)(type)} component has ` +
            `the \`standalone: true\` flag in the decorator.`);
    }
}
/** Verifies whether a given type is a component */
function assertComponentDef(type) {
    if (!(0, def_getters_1.getComponentDef)(type)) {
        throw new errors_1.RuntimeError(906 /* RuntimeErrorCode.MISSING_GENERATED_DEF */, `The ${(0, stringify_utils_1.stringifyForError)(type)} is not an Angular component, ` +
            `make sure it has the \`@Component\` decorator.`);
    }
}
/** Called when there are multiple component selectors that match a given node */
function throwMultipleComponentError(tNode, first, second) {
    throw new errors_1.RuntimeError(-300 /* RuntimeErrorCode.MULTIPLE_COMPONENTS_MATCH */, `Multiple components match node with tagname ${tNode.value}: ` +
        `${(0, stringify_utils_1.stringifyForError)(first)} and ` +
        `${(0, stringify_utils_1.stringifyForError)(second)}`);
}
/** Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on. */
function throwErrorIfNoChangesMode(creationMode, oldValue, currValue, propName, lView) {
    var _a;
    const hostComponentDef = (0, element_validation_1.getDeclarationComponentDef)(lView);
    const componentClassName = (_a = hostComponentDef === null || hostComponentDef === void 0 ? void 0 : hostComponentDef.type) === null || _a === void 0 ? void 0 : _a.name;
    const field = propName ? ` for '${propName}'` : '';
    let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${field}: '${formatValue(oldValue)}'. Current value: '${formatValue(currValue)}'.${componentClassName ? ` Expression location: ${componentClassName} component` : ''}`;
    if (creationMode) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook?`;
    }
    throw new errors_1.RuntimeError(-100 /* RuntimeErrorCode.EXPRESSION_CHANGED_AFTER_CHECKED */, msg);
}
function formatValue(value) {
    let strValue = String(value);
    // JSON.stringify will throw on circular references
    try {
        if (Array.isArray(value) || strValue === '[object Object]') {
            strValue = JSON.stringify(value);
        }
    }
    catch (error) { }
    return strValue.length > VALUE_STRING_LENGTH_LIMIT
        ? strValue.substring(0, VALUE_STRING_LENGTH_LIMIT) + '…'
        : strValue;
}
function constructDetailsForInterpolation(lView, rootIndex, expressionIndex, meta, changedValue) {
    const [propName, prefix, ...chunks] = meta.split(misc_utils_1.INTERPOLATION_DELIMITER);
    let oldValue = prefix, newValue = prefix;
    for (let i = 0; i < chunks.length; i++) {
        const slotIdx = rootIndex + i;
        oldValue += `${lView[slotIdx]}${chunks[i]}`;
        newValue += `${slotIdx === expressionIndex ? changedValue : lView[slotIdx]}${chunks[i]}`;
    }
    return { propName, oldValue, newValue };
}
/**
 * Constructs an object that contains details for the ExpressionChangedAfterItHasBeenCheckedError:
 * - property name (for property bindings or interpolations)
 * - old and new values, enriched using information from metadata
 *
 * More information on the metadata storage format can be found in `storePropertyBindingMetadata`
 * function description.
 */
function getExpressionChangedErrorDetails(lView, bindingIndex, oldValue, newValue) {
    const tData = lView[view_1.TVIEW].data;
    const metadata = tData[bindingIndex];
    if (typeof metadata === 'string') {
        // metadata for property interpolation
        if (metadata.indexOf(misc_utils_1.INTERPOLATION_DELIMITER) > -1) {
            return constructDetailsForInterpolation(lView, bindingIndex, bindingIndex, metadata, newValue);
        }
        // metadata for property binding
        return { propName: metadata, oldValue, newValue };
    }
    // metadata is not available for this expression, check if this expression is a part of the
    // property interpolation by going from the current binding index left and look for a string that
    // contains INTERPOLATION_DELIMITER, the layout in tView.data for this case will look like this:
    // [..., 'id�Prefix � and � suffix', null, null, null, ...]
    if (metadata === null) {
        let idx = bindingIndex - 1;
        while (typeof tData[idx] !== 'string' && tData[idx + 1] === null) {
            idx--;
        }
        const meta = tData[idx];
        if (typeof meta === 'string') {
            const matches = meta.match(new RegExp(misc_utils_1.INTERPOLATION_DELIMITER, 'g'));
            // first interpolation delimiter separates property name from interpolation parts (in case of
            // property interpolations), so we subtract one from total number of found delimiters
            if (matches && matches.length - 1 > bindingIndex - idx) {
                return constructDetailsForInterpolation(lView, idx, bindingIndex, meta, newValue);
            }
        }
    }
    return { propName: undefined, oldValue, newValue };
}
