"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMaskBit = setMaskBit;
exports.applyI18n = applyI18n;
exports.enableLocateOrCreateI18nNodeImpl = enableLocateOrCreateI18nNodeImpl;
exports.applyCreateOpCodes = applyCreateOpCodes;
exports.applyMutableOpCodes = applyMutableOpCodes;
exports.applyUpdateOpCodes = applyUpdateOpCodes;
const errors_1 = require("../../errors");
const i18n_1 = require("../../hydration/i18n");
const node_lookup_utils_1 = require("../../hydration/node_lookup_utils");
const utils_1 = require("../../hydration/utils");
const localization_1 = require("../../i18n/localization");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const shared_1 = require("../instructions/shared");
const i18n_2 = require("../interfaces/i18n");
const view_1 = require("../interfaces/view");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const state_1 = require("../state");
const stringify_utils_1 = require("../util/stringify_utils");
const view_utils_1 = require("../util/view_utils");
const i18n_locale_id_1 = require("./i18n_locale_id");
const i18n_util_1 = require("./i18n_util");
/**
 * Keep track of which input bindings in `ɵɵi18nExp` have changed.
 *
 * This is used to efficiently update expressions in i18n only when the corresponding input has
 * changed.
 *
 * 1) Each bit represents which of the `ɵɵi18nExp` has changed.
 * 2) There are 32 bits allowed in JS.
 * 3) Bit 32 is special as it is shared for all changes past 32. (In other words if you have more
 * than 32 `ɵɵi18nExp` then all changes past 32nd `ɵɵi18nExp` will be mapped to same bit. This means
 * that we may end up changing more than we need to. But i18n expressions with 32 bindings is rare
 * so in practice it should not be an issue.)
 */
let changeMask = 0b0;
/**
 * Keeps track of which bit needs to be updated in `changeMask`
 *
 * This value gets incremented on every call to `ɵɵi18nExp`
 */
let changeMaskCounter = 0;
/**
 * Keep track of which input bindings in `ɵɵi18nExp` have changed.
 *
 * `setMaskBit` gets invoked by each call to `ɵɵi18nExp`.
 *
 * @param hasChange did `ɵɵi18nExp` detect a change.
 */
function setMaskBit(hasChange) {
    if (hasChange) {
        changeMask = changeMask | (1 << Math.min(changeMaskCounter, 31));
    }
    changeMaskCounter++;
}
function applyI18n(tView, lView, index) {
    if (changeMaskCounter > 0) {
        ngDevMode && (0, assert_1.assertDefined)(tView, `tView should be defined`);
        const tI18n = tView.data[index];
        // When `index` points to an `ɵɵi18nAttributes` then we have an array otherwise `TI18n`
        const updateOpCodes = Array.isArray(tI18n)
            ? tI18n
            : tI18n.update;
        const bindingsStartIndex = (0, state_1.getBindingIndex)() - changeMaskCounter - 1;
        applyUpdateOpCodes(tView, lView, updateOpCodes, bindingsStartIndex, changeMask);
    }
    // Reset changeMask & maskBit to default for the next update cycle
    changeMask = 0b0;
    changeMaskCounter = 0;
}
function createNodeWithoutHydration(lView, textOrName, nodeType) {
    const renderer = lView[view_1.RENDERER];
    switch (nodeType) {
        case Node.COMMENT_NODE:
            return (0, dom_node_manipulation_1.createCommentNode)(renderer, textOrName);
        case Node.TEXT_NODE:
            return (0, dom_node_manipulation_1.createTextNode)(renderer, textOrName);
        case Node.ELEMENT_NODE:
            return (0, dom_node_manipulation_1.createElementNode)(renderer, textOrName, null);
    }
}
let _locateOrCreateNode = (lView, index, textOrName, nodeType) => {
    (0, state_1.lastNodeWasCreated)(true);
    return createNodeWithoutHydration(lView, textOrName, nodeType);
};
function locateOrCreateNodeImpl(lView, index, textOrName, nodeType) {
    const hydrationInfo = lView[view_1.HYDRATION];
    const noOffsetIndex = index - view_1.HEADER_OFFSET;
    const isNodeCreationMode = !(0, i18n_1.isI18nHydrationSupportEnabled)() ||
        !hydrationInfo ||
        (0, state_1.isInSkipHydrationBlock)() ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, noOffsetIndex);
    (0, state_1.lastNodeWasCreated)(isNodeCreationMode);
    if (isNodeCreationMode) {
        return createNodeWithoutHydration(lView, textOrName, nodeType);
    }
    const native = (0, node_lookup_utils_1.locateI18nRNodeByIndex)(hydrationInfo, noOffsetIndex);
    // TODO: Improve error handling
    //
    // Other hydration paths use validateMatchingNode() in order to provide
    // detailed information in development mode about the expected DOM.
    // However, not every node in an i18n block has a TNode. Instead, we
    // need to be able to use the AST to generate a similar message.
    ngDevMode && (0, assert_1.assertDefined)(native, 'expected native element');
    ngDevMode && (0, assert_1.assertEqual)(native.nodeType, nodeType, 'expected matching nodeType');
    ngDevMode &&
        nodeType === Node.ELEMENT_NODE &&
        (0, assert_1.assertEqual)(native.tagName.toLowerCase(), textOrName.toLowerCase(), 'expecting matching tagName');
    ngDevMode && (0, utils_1.markRNodeAsClaimedByHydration)(native);
    return native;
}
function enableLocateOrCreateI18nNodeImpl() {
    _locateOrCreateNode = locateOrCreateNodeImpl;
}
/**
 * Apply `I18nCreateOpCodes` op-codes as stored in `TI18n.create`.
 *
 * Creates text (and comment) nodes which are internationalized.
 *
 * @param lView Current lView
 * @param createOpCodes Set of op-codes to apply
 * @param parentRNode Parent node (so that direct children can be added eagerly) or `null` if it is
 *     a root node.
 * @param insertInFrontOf DOM node that should be used as an anchor.
 */
function applyCreateOpCodes(lView, createOpCodes, parentRNode, insertInFrontOf) {
    const renderer = lView[view_1.RENDERER];
    for (let i = 0; i < createOpCodes.length; i++) {
        const opCode = createOpCodes[i++];
        const text = createOpCodes[i];
        const isComment = (opCode & i18n_2.I18nCreateOpCode.COMMENT) === i18n_2.I18nCreateOpCode.COMMENT;
        const appendNow = (opCode & i18n_2.I18nCreateOpCode.APPEND_EAGERLY) === i18n_2.I18nCreateOpCode.APPEND_EAGERLY;
        const index = opCode >>> i18n_2.I18nCreateOpCode.SHIFT;
        let rNode = lView[index];
        let lastNodeWasCreated = false;
        if (rNode === null) {
            // We only create new DOM nodes if they don't already exist: If ICU switches case back to a
            // case which was already instantiated, no need to create new DOM nodes.
            rNode = lView[index] = _locateOrCreateNode(lView, index, text, isComment ? Node.COMMENT_NODE : Node.TEXT_NODE);
            lastNodeWasCreated = (0, state_1.wasLastNodeCreated)();
        }
        if (appendNow && parentRNode !== null && lastNodeWasCreated) {
            (0, dom_node_manipulation_1.nativeInsertBefore)(renderer, parentRNode, rNode, insertInFrontOf, false);
        }
    }
}
/**
 * Apply `I18nMutateOpCodes` OpCodes.
 *
 * @param tView Current `TView`
 * @param mutableOpCodes Mutable OpCodes to process
 * @param lView Current `LView`
 * @param anchorRNode place where the i18n node should be inserted.
 */
function applyMutableOpCodes(tView, mutableOpCodes, lView, anchorRNode) {
    ngDevMode && (0, assert_1.assertDomNode)(anchorRNode);
    const renderer = lView[view_1.RENDERER];
    // `rootIdx` represents the node into which all inserts happen.
    let rootIdx = null;
    // `rootRNode` represents the real node into which we insert. This can be different from
    // `lView[rootIdx]` if we have projection.
    //  - null we don't have a parent (as can be the case in when we are inserting into a root of
    //    LView which has no parent.)
    //  - `RElement` The element representing the root after taking projection into account.
    let rootRNode;
    for (let i = 0; i < mutableOpCodes.length; i++) {
        const opCode = mutableOpCodes[i];
        if (typeof opCode == 'string') {
            const textNodeIndex = mutableOpCodes[++i];
            if (lView[textNodeIndex] === null) {
                ngDevMode && (0, assert_1.assertIndexInRange)(lView, textNodeIndex);
                lView[textNodeIndex] = _locateOrCreateNode(lView, textNodeIndex, opCode, Node.TEXT_NODE);
            }
        }
        else if (typeof opCode == 'number') {
            switch (opCode & 1 /* IcuCreateOpCode.MASK_INSTRUCTION */) {
                case 0 /* IcuCreateOpCode.AppendChild */:
                    const parentIdx = (0, i18n_util_1.getParentFromIcuCreateOpCode)(opCode);
                    if (rootIdx === null) {
                        // The first operation should save the `rootIdx` because the first operation
                        // must insert into the root. (Only subsequent operations can insert into a dynamic
                        // parent)
                        rootIdx = parentIdx;
                        rootRNode = renderer.parentNode(anchorRNode);
                    }
                    let insertInFrontOf;
                    let parentRNode;
                    if (parentIdx === rootIdx) {
                        insertInFrontOf = anchorRNode;
                        parentRNode = rootRNode;
                    }
                    else {
                        insertInFrontOf = null;
                        parentRNode = (0, view_utils_1.unwrapRNode)(lView[parentIdx]);
                    }
                    // FIXME(misko): Refactor with `processI18nText`
                    if (parentRNode !== null) {
                        // This can happen if the `LView` we are adding to is not attached to a parent `LView`.
                        // In such a case there is no "root" we can attach to. This is fine, as we still need to
                        // create the elements. When the `LView` gets later added to a parent these "root" nodes
                        // get picked up and added.
                        ngDevMode && (0, assert_1.assertDomNode)(parentRNode);
                        const refIdx = (0, i18n_util_1.getRefFromIcuCreateOpCode)(opCode);
                        ngDevMode && (0, assert_1.assertGreaterThan)(refIdx, view_1.HEADER_OFFSET, 'Missing ref');
                        // `unwrapRNode` is not needed here as all of these point to RNodes as part of the i18n
                        // which can't have components.
                        const child = lView[refIdx];
                        ngDevMode && (0, assert_1.assertDomNode)(child);
                        (0, dom_node_manipulation_1.nativeInsertBefore)(renderer, parentRNode, child, insertInFrontOf, false);
                        const tIcu = (0, i18n_util_1.getTIcu)(tView, refIdx);
                        if (tIcu !== null && typeof tIcu === 'object') {
                            // If we just added a comment node which has ICU then that ICU may have already been
                            // rendered and therefore we need to re-add it here.
                            ngDevMode && (0, assert_2.assertTIcu)(tIcu);
                            const caseIndex = (0, i18n_util_1.getCurrentICUCaseIndex)(tIcu, lView);
                            if (caseIndex !== null) {
                                applyMutableOpCodes(tView, tIcu.create[caseIndex], lView, lView[tIcu.anchorIdx]);
                            }
                        }
                    }
                    break;
                case 1 /* IcuCreateOpCode.Attr */:
                    const elementNodeIndex = opCode >>> 1 /* IcuCreateOpCode.SHIFT_REF */;
                    const attrName = mutableOpCodes[++i];
                    const attrValue = mutableOpCodes[++i];
                    // This code is used for ICU expressions only, since we don't support
                    // directives/components in ICUs, we don't need to worry about inputs here
                    (0, shared_1.setElementAttribute)(renderer, (0, view_utils_1.getNativeByIndex)(elementNodeIndex, lView), null, null, attrName, attrValue, null);
                    break;
                default:
                    if (ngDevMode) {
                        throw new errors_1.RuntimeError(700 /* RuntimeErrorCode.INVALID_I18N_STRUCTURE */, `Unable to determine the type of mutate operation for "${opCode}"`);
                    }
            }
        }
        else {
            switch (opCode) {
                case i18n_2.ICU_MARKER:
                    const commentValue = mutableOpCodes[++i];
                    const commentNodeIndex = mutableOpCodes[++i];
                    if (lView[commentNodeIndex] === null) {
                        ngDevMode &&
                            (0, assert_1.assertEqual)(typeof commentValue, 'string', `Expected "${commentValue}" to be a comment node value`);
                        ngDevMode && (0, assert_2.assertIndexInExpandoRange)(lView, commentNodeIndex);
                        const commentRNode = (lView[commentNodeIndex] = _locateOrCreateNode(lView, commentNodeIndex, commentValue, Node.COMMENT_NODE));
                        // FIXME(misko): Attaching patch data is only needed for the root (Also add tests)
                        (0, context_discovery_1.attachPatchData)(commentRNode, lView);
                    }
                    break;
                case i18n_2.ELEMENT_MARKER:
                    const tagName = mutableOpCodes[++i];
                    const elementNodeIndex = mutableOpCodes[++i];
                    if (lView[elementNodeIndex] === null) {
                        ngDevMode &&
                            (0, assert_1.assertEqual)(typeof tagName, 'string', `Expected "${tagName}" to be an element node tag name`);
                        ngDevMode && (0, assert_2.assertIndexInExpandoRange)(lView, elementNodeIndex);
                        const elementRNode = (lView[elementNodeIndex] = _locateOrCreateNode(lView, elementNodeIndex, tagName, Node.ELEMENT_NODE));
                        // FIXME(misko): Attaching patch data is only needed for the root (Also add tests)
                        (0, context_discovery_1.attachPatchData)(elementRNode, lView);
                    }
                    break;
                default:
                    ngDevMode &&
                        (0, assert_1.throwError)(`Unable to determine the type of mutate operation for "${opCode}"`);
            }
        }
    }
}
/**
 * Apply `I18nUpdateOpCodes` OpCodes
 *
 * @param tView Current `TView`
 * @param lView Current `LView`
 * @param updateOpCodes OpCodes to process
 * @param bindingsStartIndex Location of the first `ɵɵi18nApply`
 * @param changeMask Each bit corresponds to a `ɵɵi18nExp` (Counting backwards from
 *     `bindingsStartIndex`)
 */
function applyUpdateOpCodes(tView, lView, updateOpCodes, bindingsStartIndex, changeMask) {
    for (let i = 0; i < updateOpCodes.length; i++) {
        // bit code to check if we should apply the next update
        const checkBit = updateOpCodes[i];
        // Number of opCodes to skip until next set of update codes
        const skipCodes = updateOpCodes[++i];
        if (checkBit & changeMask) {
            // The value has been updated since last checked
            let value = '';
            for (let j = i + 1; j <= i + skipCodes; j++) {
                const opCode = updateOpCodes[j];
                if (typeof opCode == 'string') {
                    value += opCode;
                }
                else if (typeof opCode == 'number') {
                    if (opCode < 0) {
                        // Negative opCode represent `i18nExp` values offset.
                        value += (0, stringify_utils_1.renderStringify)(lView[bindingsStartIndex - opCode]);
                    }
                    else {
                        const nodeIndex = opCode >>> 2 /* I18nUpdateOpCode.SHIFT_REF */;
                        switch (opCode & 3 /* I18nUpdateOpCode.MASK_OPCODE */) {
                            case 1 /* I18nUpdateOpCode.Attr */:
                                const propName = updateOpCodes[++j];
                                const sanitizeFn = updateOpCodes[++j];
                                const tNodeOrTagName = tView.data[nodeIndex];
                                ngDevMode && (0, assert_1.assertDefined)(tNodeOrTagName, 'Experting TNode or string');
                                if (typeof tNodeOrTagName === 'string') {
                                    // IF we don't have a `TNode`, then we are an element in ICU (as ICU content does
                                    // not have TNode), in which case we know that there are no directives, and hence
                                    // we use attribute setting.
                                    (0, shared_1.setElementAttribute)(lView[view_1.RENDERER], lView[nodeIndex], null, tNodeOrTagName, propName, value, sanitizeFn);
                                }
                                else {
                                    (0, shared_1.setPropertyAndInputs)(tNodeOrTagName, lView, propName, value, lView[view_1.RENDERER], sanitizeFn);
                                }
                                break;
                            case 0 /* I18nUpdateOpCode.Text */:
                                const rText = lView[nodeIndex];
                                rText !== null && (0, dom_node_manipulation_1.updateTextNode)(lView[view_1.RENDERER], rText, value);
                                break;
                            case 2 /* I18nUpdateOpCode.IcuSwitch */:
                                applyIcuSwitchCase(tView, (0, i18n_util_1.getTIcu)(tView, nodeIndex), lView, value);
                                break;
                            case 3 /* I18nUpdateOpCode.IcuUpdate */:
                                applyIcuUpdateCase(tView, (0, i18n_util_1.getTIcu)(tView, nodeIndex), bindingsStartIndex, lView);
                                break;
                        }
                    }
                }
            }
        }
        else {
            const opCode = updateOpCodes[i + 1];
            if (opCode > 0 && (opCode & 3 /* I18nUpdateOpCode.MASK_OPCODE */) === 3 /* I18nUpdateOpCode.IcuUpdate */) {
                // Special case for the `icuUpdateCase`. It could be that the mask did not match, but
                // we still need to execute `icuUpdateCase` because the case has changed recently due to
                // previous `icuSwitchCase` instruction. (`icuSwitchCase` and `icuUpdateCase` always come in
                // pairs.)
                const nodeIndex = opCode >>> 2 /* I18nUpdateOpCode.SHIFT_REF */;
                const tIcu = (0, i18n_util_1.getTIcu)(tView, nodeIndex);
                const currentIndex = lView[tIcu.currentCaseLViewIndex];
                if (currentIndex < 0) {
                    applyIcuUpdateCase(tView, tIcu, bindingsStartIndex, lView);
                }
            }
        }
        i += skipCodes;
    }
}
/**
 * Apply OpCodes associated with updating an existing ICU.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param bindingsStartIndex Location of the first `ɵɵi18nApply`
 * @param lView Current `LView`
 */
function applyIcuUpdateCase(tView, tIcu, bindingsStartIndex, lView) {
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, tIcu.currentCaseLViewIndex);
    let activeCaseIndex = lView[tIcu.currentCaseLViewIndex];
    if (activeCaseIndex !== null) {
        let mask = changeMask;
        if (activeCaseIndex < 0) {
            // Clear the flag.
            // Negative number means that the ICU was freshly created and we need to force the update.
            activeCaseIndex = lView[tIcu.currentCaseLViewIndex] = ~activeCaseIndex;
            // -1 is same as all bits on, which simulates creation since it marks all bits dirty
            mask = -1;
        }
        applyUpdateOpCodes(tView, lView, tIcu.update[activeCaseIndex], bindingsStartIndex, mask);
    }
}
/**
 * Apply OpCodes associated with switching a case on ICU.
 *
 * This involves tearing down existing case and than building up a new case.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param lView Current `LView`
 * @param value Value of the case to update to.
 */
function applyIcuSwitchCase(tView, tIcu, lView, value) {
    // Rebuild a new case for this ICU
    const caseIndex = getCaseIndex(tIcu, value);
    let activeCaseIndex = (0, i18n_util_1.getCurrentICUCaseIndex)(tIcu, lView);
    if (activeCaseIndex !== caseIndex) {
        applyIcuSwitchCaseRemove(tView, tIcu, lView);
        lView[tIcu.currentCaseLViewIndex] = caseIndex === null ? null : ~caseIndex;
        if (caseIndex !== null) {
            // Add the nodes for the new case
            const anchorRNode = lView[tIcu.anchorIdx];
            if (anchorRNode) {
                ngDevMode && (0, assert_1.assertDomNode)(anchorRNode);
                applyMutableOpCodes(tView, tIcu.create[caseIndex], lView, anchorRNode);
            }
            (0, i18n_1.claimDehydratedIcuCase)(lView, tIcu.anchorIdx, caseIndex);
        }
    }
}
/**
 * Apply OpCodes associated with tearing ICU case.
 *
 * This involves tearing down existing case and than building up a new case.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param lView Current `LView`
 */
function applyIcuSwitchCaseRemove(tView, tIcu, lView) {
    let activeCaseIndex = (0, i18n_util_1.getCurrentICUCaseIndex)(tIcu, lView);
    if (activeCaseIndex !== null) {
        const removeCodes = tIcu.remove[activeCaseIndex];
        for (let i = 0; i < removeCodes.length; i++) {
            const nodeOrIcuIndex = removeCodes[i];
            if (nodeOrIcuIndex > 0) {
                // Positive numbers are `RNode`s.
                const rNode = (0, view_utils_1.getNativeByIndex)(nodeOrIcuIndex, lView);
                rNode !== null && (0, dom_node_manipulation_1.nativeRemoveNode)(lView[view_1.RENDERER], rNode);
            }
            else {
                // Negative numbers are ICUs
                applyIcuSwitchCaseRemove(tView, (0, i18n_util_1.getTIcu)(tView, ~nodeOrIcuIndex), lView);
            }
        }
    }
}
/**
 * Returns the index of the current case of an ICU expression depending on the main binding value
 *
 * @param icuExpression
 * @param bindingValue The value of the main binding used by this ICU expression
 */
function getCaseIndex(icuExpression, bindingValue) {
    let index = icuExpression.cases.indexOf(bindingValue);
    if (index === -1) {
        switch (icuExpression.type) {
            case 1 /* IcuType.plural */: {
                const resolvedCase = (0, localization_1.getPluralCase)(bindingValue, (0, i18n_locale_id_1.getLocaleId)());
                index = icuExpression.cases.indexOf(resolvedCase);
                if (index === -1 && resolvedCase !== 'other') {
                    index = icuExpression.cases.indexOf('other');
                }
                break;
            }
            case 0 /* IcuType.select */: {
                index = icuExpression.cases.indexOf('other');
                break;
            }
        }
    }
    return index === -1 ? null : index;
}
