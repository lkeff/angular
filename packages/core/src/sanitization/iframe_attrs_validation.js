"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵvalidateIframeAttribute = ɵɵvalidateIframeAttribute;
const errors_1 = require("../errors");
const element_validation_1 = require("../render3/instructions/element_validation");
const view_1 = require("../render3/interfaces/view");
const dom_node_manipulation_1 = require("../render3/dom_node_manipulation");
const state_1 = require("../render3/state");
const view_utils_1 = require("../render3/util/view_utils");
const trusted_types_1 = require("../util/security/trusted_types");
/**
 * Validation function invoked at runtime for each binding that might potentially
 * represent a security-sensitive attribute of an <iframe>.
 * See `IFRAME_SECURITY_SENSITIVE_ATTRS` in the
 * `packages/compiler/src/schema/dom_security_schema.ts` script for the full list
 * of such attributes.
 *
 * @codeGenApi
 */
function ɵɵvalidateIframeAttribute(attrValue, tagName, attrName) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getSelectedTNode)();
    const element = (0, view_utils_1.getNativeByTNode)(tNode, lView);
    // Restrict any dynamic bindings of security-sensitive attributes/properties
    // on an <iframe> for security reasons.
    if (tNode.type === 2 /* TNodeType.Element */ && tagName.toLowerCase() === 'iframe') {
        const iframe = element;
        // Unset previously applied `src` and `srcdoc` if we come across a situation when
        // a security-sensitive attribute is set later via an attribute/property binding.
        iframe.src = '';
        iframe.srcdoc = (0, trusted_types_1.trustedHTMLFromString)('');
        // Also remove the <iframe> from the document.
        (0, dom_node_manipulation_1.nativeRemoveNode)(lView[view_1.RENDERER], iframe);
        const errorMessage = ngDevMode &&
            `Angular has detected that the \`${attrName}\` was applied ` +
                `as a binding to an <iframe>${(0, element_validation_1.getTemplateLocationDetails)(lView)}. ` +
                `For security reasons, the \`${attrName}\` can be set on an <iframe> ` +
                `as a static attribute only. \n` +
                `To fix this, switch the \`${attrName}\` binding to a static attribute ` +
                `in a template or in host bindings section.`;
        throw new errors_1.RuntimeError(-910 /* RuntimeErrorCode.UNSAFE_IFRAME_ATTRS */, errorMessage);
    }
    return attrValue;
}
