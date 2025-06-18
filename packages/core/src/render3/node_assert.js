"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertTNodeType = assertTNodeType;
exports.assertPureTNodeType = assertPureTNodeType;
const assert_1 = require("../util/assert");
const node_1 = require("./interfaces/node");
function assertTNodeType(tNode, expectedTypes, message) {
    (0, assert_1.assertDefined)(tNode, 'should be called with a TNode');
    if ((tNode.type & expectedTypes) === 0) {
        (0, assert_1.throwError)(message ||
            `Expected [${(0, node_1.toTNodeTypeAsString)(expectedTypes)}] but got ${(0, node_1.toTNodeTypeAsString)(tNode.type)}.`);
    }
}
function assertPureTNodeType(type) {
    if (!(type === 2 /* TNodeType.Element */ ||
        type === 1 /* TNodeType.Text */ ||
        type === 4 /* TNodeType.Container */ ||
        type === 8 /* TNodeType.ElementContainer */ ||
        type === 32 /* TNodeType.Icu */ ||
        type === 16 /* TNodeType.Projection */ ||
        type === 64 /* TNodeType.Placeholder */ ||
        type === 128 /* TNodeType.LetDeclaration */)) {
        (0, assert_1.throwError)(`Expected TNodeType to have only a single type selected, but got ${(0, node_1.toTNodeTypeAsString)(type)}.`);
    }
}
