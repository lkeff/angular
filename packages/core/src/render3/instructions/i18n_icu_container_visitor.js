"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadIcuContainerVisitor = loadIcuContainerVisitor;
exports.createIcuIterator = createIcuIterator;
const assert_1 = require("../../util/assert");
const empty_1 = require("../../util/empty");
const assert_2 = require("../assert");
const i18n_util_1 = require("../i18n/i18n_util");
const view_1 = require("../interfaces/view");
function enterIcu(state, tIcu, lView) {
    state.index = 0;
    const currentCase = (0, i18n_util_1.getCurrentICUCaseIndex)(tIcu, lView);
    if (currentCase !== null) {
        ngDevMode && (0, assert_1.assertNumberInRange)(currentCase, 0, tIcu.cases.length - 1);
        state.removes = tIcu.remove[currentCase];
    }
    else {
        state.removes = empty_1.EMPTY_ARRAY;
    }
}
function icuContainerIteratorNext(state) {
    if (state.index < state.removes.length) {
        const removeOpCode = state.removes[state.index++];
        ngDevMode && (0, assert_1.assertNumber)(removeOpCode, 'Expecting OpCode number');
        if (removeOpCode > 0) {
            const rNode = state.lView[removeOpCode];
            ngDevMode && (0, assert_1.assertDomNode)(rNode);
            return rNode;
        }
        else {
            state.stack.push(state.index, state.removes);
            // ICUs are represented by negative indices
            const tIcuIndex = ~removeOpCode;
            const tIcu = state.lView[view_1.TVIEW].data[tIcuIndex];
            ngDevMode && (0, assert_2.assertTIcu)(tIcu);
            enterIcu(state, tIcu, state.lView);
            return icuContainerIteratorNext(state);
        }
    }
    else {
        if (state.stack.length === 0) {
            return null;
        }
        else {
            state.removes = state.stack.pop();
            state.index = state.stack.pop();
            return icuContainerIteratorNext(state);
        }
    }
}
function loadIcuContainerVisitor() {
    const _state = {
        stack: [],
        index: -1,
    };
    /**
     * Retrieves a set of root nodes from `TIcu.remove`. Used by `TNodeType.ICUContainer`
     * to determine which root belong to the ICU.
     *
     * Example of usage.
     * ```ts
     * const nextRNode = icuContainerIteratorStart(tIcuContainerNode, lView);
     * let rNode: RNode|null;
     * while(rNode = nextRNode()) {
     *   console.log(rNode);
     * }
     * ```
     *
     * @param tIcuContainerNode Current `TIcuContainerNode`
     * @param lView `LView` where the `RNode`s should be looked up.
     */
    function icuContainerIteratorStart(tIcuContainerNode, lView) {
        _state.lView = lView;
        while (_state.stack.length)
            _state.stack.pop();
        ngDevMode && (0, assert_2.assertTNodeForLView)(tIcuContainerNode, lView);
        enterIcu(_state, tIcuContainerNode.value, lView);
        return icuContainerIteratorNext.bind(null, _state);
    }
    return icuContainerIteratorStart;
}
function createIcuIterator(tIcu, lView) {
    const state = {
        stack: [],
        index: -1,
        lView,
    };
    ngDevMode && (0, assert_2.assertTIcu)(tIcu);
    enterIcu(state, tIcu, lView);
    return icuContainerIteratorNext.bind(null, state);
}
