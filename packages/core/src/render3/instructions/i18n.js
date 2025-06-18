"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵi18nStart = ɵɵi18nStart;
exports.ɵɵi18nEnd = ɵɵi18nEnd;
exports.ɵɵi18n = ɵɵi18n;
exports.ɵɵi18nAttributes = ɵɵi18nAttributes;
exports.ɵɵi18nExp = ɵɵi18nExp;
exports.ɵɵi18nApply = ɵɵi18nApply;
exports.ɵɵi18nPostprocess = ɵɵi18nPostprocess;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
require("../../util/ng_dev_mode");
require("../../util/ng_i18n_closure_mode");
const i18n_1 = require("../../hydration/i18n");
const assert_1 = require("../../util/assert");
const bindings_1 = require("../bindings");
const i18n_apply_1 = require("../i18n/i18n_apply");
const i18n_parse_1 = require("../i18n/i18n_parse");
const i18n_postprocess_1 = require("../i18n/i18n_postprocess");
const view_1 = require("../interfaces/view");
const node_manipulation_1 = require("../node_manipulation");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
/**
 * Marks a block of text as translatable.
 *
 * The instructions `i18nStart` and `i18nEnd` mark the translation block in the template.
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
function ɵɵi18nStart(index, messageIndex, subTemplateIndex = -1) {
    const tView = (0, state_1.getTView)();
    const lView = (0, state_1.getLView)();
    const adjustedIndex = view_1.HEADER_OFFSET + index;
    ngDevMode && (0, assert_1.assertDefined)(tView, `tView should be defined`);
    const message = (0, view_utils_1.getConstant)(tView.consts, messageIndex);
    const parentTNode = (0, state_1.getCurrentParentTNode)();
    if (tView.firstCreatePass) {
        (0, i18n_parse_1.i18nStartFirstCreatePass)(tView, parentTNode === null ? 0 : parentTNode.index, lView, adjustedIndex, message, subTemplateIndex);
    }
    // Set a flag that this LView has i18n blocks.
    // The flag is later used to determine whether this component should
    // be hydrated (currently hydration is not supported for i18n blocks).
    if (tView.type === 2 /* TViewType.Embedded */) {
        // Annotate host component's LView (not embedded view's LView),
        // since hydration can be skipped on per-component basis only.
        const componentLView = lView[view_1.DECLARATION_COMPONENT_VIEW];
        componentLView[view_1.FLAGS] |= 32 /* LViewFlags.HasI18n */;
    }
    else {
        lView[view_1.FLAGS] |= 32 /* LViewFlags.HasI18n */;
    }
    const tI18n = tView.data[adjustedIndex];
    const sameViewParentTNode = parentTNode === lView[view_1.T_HOST] ? null : parentTNode;
    const parentRNode = (0, node_manipulation_1.getClosestRElement)(tView, sameViewParentTNode, lView);
    // If `parentTNode` is an `ElementContainer` than it has `<!--ng-container--->`.
    // When we do inserts we have to make sure to insert in front of `<!--ng-container--->`.
    const insertInFrontOf = parentTNode && parentTNode.type & 8 /* TNodeType.ElementContainer */ ? lView[parentTNode.index] : null;
    (0, i18n_1.prepareI18nBlockForHydration)(lView, adjustedIndex, parentTNode, subTemplateIndex);
    (0, i18n_apply_1.applyCreateOpCodes)(lView, tI18n.create, parentRNode, insertInFrontOf);
    (0, state_1.setInI18nBlock)(true);
}
/**
 * Translates a translation block marked by `i18nStart` and `i18nEnd`. It inserts the text/ICU nodes
 * into the render tree, moves the placeholder nodes and removes the deleted nodes.
 *
 * @codeGenApi
 */
function ɵɵi18nEnd() {
    (0, state_1.setInI18nBlock)(false);
}
/**
 *
 * Use this instruction to create a translation block that doesn't contain any placeholder.
 * It calls both {@link i18nStart} and {@link i18nEnd} in one instruction.
 *
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
function ɵɵi18n(index, messageIndex, subTemplateIndex) {
    ɵɵi18nStart(index, messageIndex, subTemplateIndex);
    ɵɵi18nEnd();
}
/**
 * Marks a list of attributes as translatable.
 *
 * @param index A unique index in the static block
 * @param values
 *
 * @codeGenApi
 */
function ɵɵi18nAttributes(index, attrsIndex) {
    const tView = (0, state_1.getTView)();
    ngDevMode && (0, assert_1.assertDefined)(tView, `tView should be defined`);
    const attrs = (0, view_utils_1.getConstant)(tView.consts, attrsIndex);
    (0, i18n_parse_1.i18nAttributesFirstPass)(tView, index + view_1.HEADER_OFFSET, attrs);
}
/**
 * Stores the values of the bindings during each update cycle in order to determine if we need to
 * update the translated nodes.
 *
 * @param value The binding's value
 * @returns This function returns itself so that it may be chained
 * (e.g. `i18nExp(ctx.name)(ctx.title)`)
 *
 * @codeGenApi
 */
function ɵɵi18nExp(value) {
    const lView = (0, state_1.getLView)();
    (0, i18n_apply_1.setMaskBit)((0, bindings_1.bindingUpdated)(lView, (0, state_1.nextBindingIndex)(), value));
    return ɵɵi18nExp;
}
/**
 * Updates a translation block or an i18n attribute when the bindings have changed.
 *
 * @param index Index of either {@link i18nStart} (translation block) or {@link i18nAttributes}
 * (i18n attribute) on which it should update the content.
 *
 * @codeGenApi
 */
function ɵɵi18nApply(index) {
    (0, i18n_apply_1.applyI18n)((0, state_1.getTView)(), (0, state_1.getLView)(), index + view_1.HEADER_OFFSET);
}
/**
 * Handles message string post-processing for internationalization.
 *
 * Handles message string post-processing by transforming it from intermediate
 * format (that might contain some markers that we need to replace) to the final
 * form, consumable by i18nStart instruction. Post processing steps include:
 *
 * 1. Resolve all multi-value cases (like [�*1:1��#2:1�|�#4:1�|�5�])
 * 2. Replace all ICU vars (like "VAR_PLURAL")
 * 3. Replace all placeholders used inside ICUs in a form of {PLACEHOLDER}
 * 4. Replace all ICU references with corresponding values (like �ICU_EXP_ICU_1�)
 *    in case multiple ICUs have the same placeholder name
 *
 * @param message Raw translation string for post processing
 * @param replacements Set of replacements that should be applied
 *
 * @returns Transformed string that can be consumed by i18nStart instruction
 *
 * @codeGenApi
 */
function ɵɵi18nPostprocess(message, replacements = {}) {
    return (0, i18n_postprocess_1.i18nPostprocess)(message, replacements);
}
