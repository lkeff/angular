"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../../src/render3/interfaces/node");
describe('node interfaces', () => {
    describe('TNodeType', () => {
        it('should agree with toTNodeTypeAsString', () => {
            expect((0, node_1.toTNodeTypeAsString)(2 /* TNodeType.Element */)).toEqual('Element');
            expect((0, node_1.toTNodeTypeAsString)(1 /* TNodeType.Text */)).toEqual('Text');
            expect((0, node_1.toTNodeTypeAsString)(4 /* TNodeType.Container */)).toEqual('Container');
            expect((0, node_1.toTNodeTypeAsString)(16 /* TNodeType.Projection */)).toEqual('Projection');
            expect((0, node_1.toTNodeTypeAsString)(8 /* TNodeType.ElementContainer */)).toEqual('ElementContainer');
            expect((0, node_1.toTNodeTypeAsString)(32 /* TNodeType.Icu */)).toEqual('IcuContainer');
            expect((0, node_1.toTNodeTypeAsString)(64 /* TNodeType.Placeholder */)).toEqual('Placeholder');
            expect((0, node_1.toTNodeTypeAsString)(128 /* TNodeType.LetDeclaration */)).toEqual('LetDeclaration');
            expect((0, node_1.toTNodeTypeAsString)(4 /* TNodeType.Container */ |
                16 /* TNodeType.Projection */ |
                2 /* TNodeType.Element */ |
                8 /* TNodeType.ElementContainer */ |
                32 /* TNodeType.Icu */ |
                128 /* TNodeType.LetDeclaration */)).toEqual('Element|Container|ElementContainer|Projection|IcuContainer|LetDeclaration');
        });
    });
});
