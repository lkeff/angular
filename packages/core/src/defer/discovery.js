"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeferBlocks = getDeferBlocks;
const container_1 = require("../render3/interfaces/container");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const utils_1 = require("./utils");
/**
 * Retrieves all defer blocks in a given LView.
 *
 * @param lView lView with defer blocks
 * @param deferBlocks defer block aggregator array
 */
function getDeferBlocks(lView, deferBlocks) {
    const tView = lView[view_1.TVIEW];
    for (let i = view_1.HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        if ((0, type_checks_1.isLContainer)(lView[i])) {
            const lContainer = lView[i];
            // An LContainer may represent an instance of a defer block, in which case
            // we store it as a result. Otherwise, keep iterating over LContainer views and
            // look for defer blocks.
            const isLast = i === tView.bindingStartIndex - 1;
            if (!isLast) {
                const tNode = tView.data[i];
                const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
                if ((0, utils_1.isTDeferBlockDetails)(tDetails)) {
                    deferBlocks.push({ lContainer, lView, tNode, tDetails });
                    // This LContainer represents a defer block, so we exit
                    // this iteration and don't inspect views in this LContainer.
                    continue;
                }
            }
            for (let i = container_1.CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
                getDeferBlocks(lContainer[i], deferBlocks);
            }
        }
        else if ((0, type_checks_1.isLView)(lView[i])) {
            // This is a component, enter the `getDeferBlocks` recursively.
            getDeferBlocks(lView[i], deferBlocks);
        }
    }
}
