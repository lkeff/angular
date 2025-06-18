"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵadvance = ɵɵadvance;
exports.selectIndexInternal = selectIndexInternal;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const hooks_1 = require("../hooks");
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
/**
 * Advances to an element for later binding instructions.
 *
 * Used in conjunction with instructions like {@link property} to act on elements with specified
 * indices, for example those created with {@link element} or {@link elementStart}.
 *
 * ```ts
 * (rf: RenderFlags, ctx: any) => {
 *   if (rf & 1) {
 *     text(0, 'Hello');
 *     text(1, 'Goodbye')
 *     element(2, 'div');
 *   }
 *   if (rf & 2) {
 *     advance(2); // Advance twice to the <div>.
 *     property('title', 'test');
 *   }
 *  }
 * ```
 * @param delta Number of elements to advance forwards by.
 *
 * @codeGenApi
 */
function ɵɵadvance(delta = 1) {
    ngDevMode && (0, assert_1.assertGreaterThan)(delta, 0, 'Can only advance forward');
    selectIndexInternal((0, state_1.getTView)(), (0, state_1.getLView)(), (0, state_1.getSelectedIndex)() + delta, !!ngDevMode && (0, state_1.isInCheckNoChangesMode)());
}
function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
    ngDevMode && (0, assert_2.assertIndexInDeclRange)(lView[view_1.TVIEW], index);
    // Flush the initial hooks for elements in the view that have been added up to this point.
    // PERF WARNING: do NOT extract this to a separate function without running benchmarks
    if (!checkNoChangesMode) {
        const hooksInitPhaseCompleted = (lView[view_1.FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === 3 /* InitPhaseState.InitPhaseCompleted */;
        if (hooksInitPhaseCompleted) {
            const preOrderCheckHooks = tView.preOrderCheckHooks;
            if (preOrderCheckHooks !== null) {
                (0, hooks_1.executeCheckHooks)(lView, preOrderCheckHooks, index);
            }
        }
        else {
            const preOrderHooks = tView.preOrderHooks;
            if (preOrderHooks !== null) {
                (0, hooks_1.executeInitAndCheckHooks)(lView, preOrderHooks, 0 /* InitPhaseState.OnInitHooksToBeRun */, index);
            }
        }
    }
    // We must set the selected index *after* running the hooks, because hooks may have side-effects
    // that cause other template functions to run, thus updating the selected index, which is global
    // state. If we run `setSelectedIndex` *before* we run the hooks, in some cases the selected index
    // will be altered by the time we leave the `ɵɵadvance` instruction.
    (0, state_1.setSelectedIndex)(index);
}
