"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../src/render3/state");
const static_styling_1 = require("../../../src/render3/styling/static_styling");
const tnode_manipulation_1 = require("../../../src/render3/tnode_manipulation");
describe('static styling', () => {
    const mockFirstCreatePassLView = [null, { firstCreatePass: true }];
    let tNode;
    beforeEach(() => {
        (0, state_1.enterView)(mockFirstCreatePassLView);
        tNode = (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, '', null);
    });
    it('should initialize when no attrs', () => {
        (0, static_styling_1.computeStaticStyling)(tNode, [], true);
        expect(tNode.classes).toEqual(null);
        expect(tNode.styles).toEqual(null);
    });
    it('should initialize from attrs', () => {
        const tAttrs = [
            'ignore', //
            1 /* AttributeMarker.Classes */,
            'my-class', //
            2 /* AttributeMarker.Styles */,
            'color',
            'red', //
        ];
        (0, static_styling_1.computeStaticStyling)(tNode, tAttrs, true);
        expect(tNode.classes).toEqual('my-class');
        expect(tNode.styles).toEqual('color: red;');
    });
    it('should initialize from attrs when multiple', () => {
        const tAttrs = [
            'ignore', //
            1 /* AttributeMarker.Classes */,
            'my-class',
            'other', //
            2 /* AttributeMarker.Styles */,
            'color',
            'red',
            'width',
            '100px', //
        ];
        (0, static_styling_1.computeStaticStyling)(tNode, tAttrs, true);
        expect(tNode.classes).toEqual('my-class other');
        expect(tNode.styles).toEqual('color: red; width: 100px;');
    });
});
