"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementStartFirstCreatePass = elementStartFirstCreatePass;
exports.elementEndFirstCreatePass = elementEndFirstCreatePass;
const assert_1 = require("../assert");
const hooks_1 = require("../hooks");
const type_checks_1 = require("../interfaces/type_checks");
const static_styling_1 = require("../styling/static_styling");
const tnode_manipulation_1 = require("../tnode_manipulation");
const attrs_utils_1 = require("../util/attrs_utils");
const view_utils_1 = require("../util/view_utils");
const directives_1 = require("./directives");
function elementStartFirstCreatePass(index, tView, lView, name, directiveMatcher, bindingsEnabled, attrsIndex, localRefsIndex) {
    ngDevMode && (0, assert_1.assertFirstCreatePass)(tView);
    const tViewConsts = tView.consts;
    const attrs = (0, view_utils_1.getConstant)(tViewConsts, attrsIndex);
    const tNode = (0, tnode_manipulation_1.getOrCreateTNode)(tView, index, 2 /* TNodeType.Element */, name, attrs);
    if (bindingsEnabled) {
        (0, directives_1.resolveDirectives)(tView, lView, tNode, (0, view_utils_1.getConstant)(tViewConsts, localRefsIndex), directiveMatcher);
    }
    // Merge the template attrs last so that they have the highest priority.
    tNode.mergedAttrs = (0, attrs_utils_1.mergeHostAttrs)(tNode.mergedAttrs, tNode.attrs);
    if (tNode.attrs !== null) {
        (0, static_styling_1.computeStaticStyling)(tNode, tNode.attrs, false);
    }
    if (tNode.mergedAttrs !== null) {
        (0, static_styling_1.computeStaticStyling)(tNode, tNode.mergedAttrs, true);
    }
    if (tView.queries !== null) {
        tView.queries.elementStart(tView, tNode);
    }
    return tNode;
}
function elementEndFirstCreatePass(tView, tNode) {
    ngDevMode && (0, assert_1.assertFirstCreatePass)(tView);
    (0, hooks_1.registerPostOrderHooks)(tView, tNode);
    if ((0, type_checks_1.isContentQueryHost)(tNode)) {
        tView.queries.elementEnd(tNode);
    }
}
