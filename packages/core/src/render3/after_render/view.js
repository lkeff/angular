"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAfterRenderSequencesForView = addAfterRenderSequencesForView;
const view_1 = require("../interfaces/view");
function addAfterRenderSequencesForView(lView) {
    if (lView[view_1.AFTER_RENDER_SEQUENCES_TO_ADD] !== null) {
        for (const sequence of lView[view_1.AFTER_RENDER_SEQUENCES_TO_ADD]) {
            sequence.impl.addSequence(sequence);
        }
        lView[view_1.AFTER_RENDER_SEQUENCES_TO_ADD].length = 0;
    }
}
