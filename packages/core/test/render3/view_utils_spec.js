"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const type_checks_1 = require("../../src/render3/interfaces/type_checks");
const view_fixture_1 = require("./view_fixture");
const tnode_manipulation_1 = require("../../src/render3/tnode_manipulation");
const container_1 = require("../../src/render3/view/container");
describe('view_utils', () => {
    it('should verify unwrap methods (isLView and isLContainer)', () => {
        const viewFixture = new view_fixture_1.ViewFixture();
        const tNode = (0, tnode_manipulation_1.createTNode)(null, null, 3, 0, 'div', []);
        const lContainer = (0, container_1.createLContainer)(viewFixture.lView, viewFixture.lView, viewFixture.host, tNode);
        expect((0, type_checks_1.isLView)(viewFixture.lView)).toBe(true);
        expect((0, type_checks_1.isLView)(lContainer)).toBe(false);
        expect((0, type_checks_1.isLContainer)(viewFixture.lView)).toBe(false);
        expect((0, type_checks_1.isLContainer)(lContainer)).toBe(true);
    });
});
