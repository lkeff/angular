"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeStaticStyling = computeStaticStyling;
const stringify_1 = require("../../util/stringify");
const assert_1 = require("../assert");
const state_1 = require("../state");
/**
 * Compute the static styling (class/style) from `TAttributes`.
 *
 * This function should be called during `firstCreatePass` only.
 *
 * @param tNode The `TNode` into which the styling information should be loaded.
 * @param attrs `TAttributes` containing the styling information.
 * @param writeToHost Where should the resulting static styles be written?
 *   - `false` Write to `TNode.stylesWithoutHost` / `TNode.classesWithoutHost`
 *   - `true` Write to `TNode.styles` / `TNode.classes`
 */
function computeStaticStyling(tNode, attrs, writeToHost) {
    ngDevMode &&
        (0, assert_1.assertFirstCreatePass)((0, state_1.getTView)(), 'Expecting to be called in first template pass only');
    let styles = writeToHost ? tNode.styles : null;
    let classes = writeToHost ? tNode.classes : null;
    let mode = 0;
    if (attrs !== null) {
        for (let i = 0; i < attrs.length; i++) {
            const value = attrs[i];
            if (typeof value === 'number') {
                mode = value;
            }
            else if (mode == 1 /* AttributeMarker.Classes */) {
                classes = (0, stringify_1.concatStringsWithSpace)(classes, value);
            }
            else if (mode == 2 /* AttributeMarker.Styles */) {
                const style = value;
                const styleValue = attrs[++i];
                styles = (0, stringify_1.concatStringsWithSpace)(styles, style + ': ' + styleValue + ';');
            }
        }
    }
    writeToHost ? (tNode.styles = styles) : (tNode.stylesWithoutHost = styles);
    writeToHost ? (tNode.classes = classes) : (tNode.classesWithoutHost = classes);
}
