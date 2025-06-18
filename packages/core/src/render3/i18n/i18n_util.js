"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTIcu = getTIcu;
exports.setTIcu = setTIcu;
exports.setTNodeInsertBeforeIndex = setTNodeInsertBeforeIndex;
exports.createTNodePlaceholder = createTNodePlaceholder;
exports.getCurrentICUCaseIndex = getCurrentICUCaseIndex;
exports.getParentFromIcuCreateOpCode = getParentFromIcuCreateOpCode;
exports.getRefFromIcuCreateOpCode = getRefFromIcuCreateOpCode;
exports.getInstructionFromIcuCreateOpCode = getInstructionFromIcuCreateOpCode;
exports.icuCreateOpCode = icuCreateOpCode;
exports.isRootTemplateMessage = isRootTemplateMessage;
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const node_assert_1 = require("../node_assert");
const node_manipulation_1 = require("../node_manipulation");
const node_manipulation_i18n_1 = require("../node_manipulation_i18n");
const tnode_manipulation_1 = require("../tnode_manipulation");
const i18n_insert_before_index_1 = require("./i18n_insert_before_index");
/**
 * Retrieve `TIcu` at a given `index`.
 *
 * The `TIcu` can be stored either directly (if it is nested ICU) OR
 * it is stored inside tho `TIcuContainer` if it is top level ICU.
 *
 * The reason for this is that the top level ICU need a `TNode` so that they are part of the render
 * tree, but nested ICU's have no TNode, because we don't know ahead of time if the nested ICU is
 * expressed (parent ICU may have selected a case which does not contain it.)
 *
 * @param tView Current `TView`.
 * @param index Index where the value should be read from.
 */
function getTIcu(tView, index) {
    const value = tView.data[index];
    if (value === null || typeof value === 'string')
        return null;
    if (ngDevMode &&
        !(value.hasOwnProperty('tView') || value.hasOwnProperty('currentCaseLViewIndex'))) {
        (0, assert_1.throwError)("We expect to get 'null'|'TIcu'|'TIcuContainer', but got: " + value);
    }
    // Here the `value.hasOwnProperty('currentCaseLViewIndex')` is a polymorphic read as it can be
    // either TIcu or TIcuContainerNode. This is not ideal, but we still think it is OK because it
    // will be just two cases which fits into the browser inline cache (inline cache can take up to
    // 4)
    const tIcu = value.hasOwnProperty('currentCaseLViewIndex')
        ? value
        : value.value;
    ngDevMode && (0, assert_2.assertTIcu)(tIcu);
    return tIcu;
}
/**
 * Store `TIcu` at a give `index`.
 *
 * The `TIcu` can be stored either directly (if it is nested ICU) OR
 * it is stored inside tho `TIcuContainer` if it is top level ICU.
 *
 * The reason for this is that the top level ICU need a `TNode` so that they are part of the render
 * tree, but nested ICU's have no TNode, because we don't know ahead of time if the nested ICU is
 * expressed (parent ICU may have selected a case which does not contain it.)
 *
 * @param tView Current `TView`.
 * @param index Index where the value should be stored at in `Tview.data`
 * @param tIcu The TIcu to store.
 */
function setTIcu(tView, index, tIcu) {
    const tNode = tView.data[index];
    ngDevMode &&
        (0, assert_1.assertEqual)(tNode === null || tNode.hasOwnProperty('tView'), true, "We expect to get 'null'|'TIcuContainer'");
    if (tNode === null) {
        tView.data[index] = tIcu;
    }
    else {
        ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 32 /* TNodeType.Icu */);
        tNode.value = tIcu;
    }
}
/**
 * Set `TNode.insertBeforeIndex` taking the `Array` into account.
 *
 * See `TNode.insertBeforeIndex`
 */
function setTNodeInsertBeforeIndex(tNode, index) {
    ngDevMode && (0, assert_2.assertTNode)(tNode);
    let insertBeforeIndex = tNode.insertBeforeIndex;
    if (insertBeforeIndex === null) {
        (0, node_manipulation_1.setI18nHandling)(node_manipulation_i18n_1.getInsertInFrontOfRNodeWithI18n, node_manipulation_i18n_1.processI18nInsertBefore);
        insertBeforeIndex = tNode.insertBeforeIndex = [
            null /* may be updated to number later */,
            index,
        ];
    }
    else {
        (0, assert_1.assertEqual)(Array.isArray(insertBeforeIndex), true, 'Expecting array here');
        insertBeforeIndex.push(index);
    }
}
/**
 * Create `TNode.type=TNodeType.Placeholder` node.
 *
 * See `TNodeType.Placeholder` for more information.
 */
function createTNodePlaceholder(tView, previousTNodes, index) {
    const tNode = (0, tnode_manipulation_1.createTNodeAtIndex)(tView, index, 64 /* TNodeType.Placeholder */, null, null);
    (0, i18n_insert_before_index_1.addTNodeAndUpdateInsertBeforeIndex)(previousTNodes, tNode);
    return tNode;
}
/**
 * Returns current ICU case.
 *
 * ICU cases are stored as index into the `TIcu.cases`.
 * At times it is necessary to communicate that the ICU case just switched and that next ICU update
 * should update all bindings regardless of the mask. In such a case the we store negative numbers
 * for cases which have just been switched. This function removes the negative flag.
 */
function getCurrentICUCaseIndex(tIcu, lView) {
    const currentCase = lView[tIcu.currentCaseLViewIndex];
    return currentCase === null ? currentCase : currentCase < 0 ? ~currentCase : currentCase;
}
function getParentFromIcuCreateOpCode(mergedCode) {
    return mergedCode >>> 17 /* IcuCreateOpCode.SHIFT_PARENT */;
}
function getRefFromIcuCreateOpCode(mergedCode) {
    return (mergedCode & 131070 /* IcuCreateOpCode.MASK_REF */) >>> 1 /* IcuCreateOpCode.SHIFT_REF */;
}
function getInstructionFromIcuCreateOpCode(mergedCode) {
    return mergedCode & 1 /* IcuCreateOpCode.MASK_INSTRUCTION */;
}
function icuCreateOpCode(opCode, parentIdx, refIdx) {
    ngDevMode && (0, assert_1.assertGreaterThanOrEqual)(parentIdx, 0, 'Missing parent index');
    ngDevMode && (0, assert_1.assertGreaterThan)(refIdx, 0, 'Missing ref index');
    return (opCode | (parentIdx << 17 /* IcuCreateOpCode.SHIFT_PARENT */) | (refIdx << 1 /* IcuCreateOpCode.SHIFT_REF */));
}
// Returns whether the given value corresponds to a root template message,
// or a sub-template.
function isRootTemplateMessage(subTemplateIndex) {
    return subTemplateIndex === -1;
}
