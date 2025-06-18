"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterViewWithOneDiv = enterViewWithOneDiv;
exports.clearFirstUpdatePass = clearFirstUpdatePass;
exports.rewindBindingIndex = rewindBindingIndex;
const view_1 = require("../../../src/render3/interfaces/view");
const state_1 = require("../../../src/render3/state");
const mock_renderer_factory_1 = require("./mock_renderer_factory");
const tnode_manipulation_1 = require("../../../src/render3/tnode_manipulation");
const construction_1 = require("../../../src/render3/view/construction");
/**
 * Setups a simple `LView` so that it is possible to do unit tests on instructions.
 *
 * ```ts
 * describe('styling', () => {
 *  beforeEach(enterViewWithOneDiv);
 *  afterEach(leaveView);
 *
 *  it('should ...', () => {
 *     expect(getLView()).toBeDefined();
 *     const div = getNativeByIndex(1, getLView());
 *   });
 * });
 * ```
 */
function enterViewWithOneDiv() {
    const rendererFactory = new mock_renderer_factory_1.MockRendererFactory();
    const renderer = rendererFactory.createRenderer(null, null);
    const div = renderer.createElement('div');
    const consts = 1;
    const vars = 60; // Space for directive expando,  template, component + 3 directives if we assume
    // that each consume 10 slots.
    const tView = (0, construction_1.createTView)(1 /* TViewType.Component */, null, emptyTemplate, consts, vars, null, null, null, null, null, null);
    // Just assume that the expando starts after 10 initial bindings.
    tView.expandoStartIndex = view_1.HEADER_OFFSET + 10;
    const tNode = (tView.firstChild = (0, tnode_manipulation_1.createTNode)(tView, null, 2 /* TNodeType.Element */, 0, 'div', null));
    const lView = (0, construction_1.createLView)(null, tView, null, 16 /* LViewFlags.CheckAlways */, null, null, {
        rendererFactory,
        sanitizer: null,
        changeDetectionScheduler: null,
        ngReflect: false,
    }, renderer, null, null, null);
    lView[view_1.HEADER_OFFSET] = div;
    tView.data[view_1.HEADER_OFFSET] = tNode;
    (0, state_1.enterView)(lView);
    (0, state_1.setSelectedIndex)(view_1.HEADER_OFFSET);
}
function clearFirstUpdatePass() {
    (0, state_1.getLView)()[view_1.TVIEW].firstUpdatePass = false;
}
function rewindBindingIndex() {
    (0, state_1.setBindingIndex)((0, state_1.getBindingRoot)());
}
function emptyTemplate() { }
