"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = require("protocol");
const prop_type_1 = require("./prop-type");
describe('getPropType', () => {
    const testCases = [
        {
            expression: 123,
            propType: protocol_1.PropType.Number,
            propTypeName: 'Number',
        },
        {
            expression: 'John Lennon',
            propType: protocol_1.PropType.String,
            propTypeName: 'String',
        },
        {
            expression: null,
            propType: protocol_1.PropType.Null,
            propTypeName: 'Null',
        },
        {
            expression: undefined,
            propType: protocol_1.PropType.Undefined,
            propTypeName: 'Undefined',
        },
        {
            expression: Symbol.iterator,
            propType: protocol_1.PropType.Symbol,
            propTypeName: 'Symbol',
        },
        {
            expression: true,
            propType: protocol_1.PropType.Boolean,
            propTypeName: 'Boolean',
        },
        {
            expression: 123n,
            propType: protocol_1.PropType.BigInt,
            propTypeName: 'BigInt',
        },
        {
            expression: Math.random,
            propType: protocol_1.PropType.Function,
            propTypeName: 'Function',
        },
        {
            expression: Math,
            propType: protocol_1.PropType.Object,
            propTypeName: 'Object',
        },
        {
            expression: new Date(),
            propType: protocol_1.PropType.Date,
            propTypeName: 'Date',
        },
        {
            expression: ['John', 40],
            propType: protocol_1.PropType.Array,
            propTypeName: 'Array',
        },
        {
            expression: new Set([1, 2, 3, 4, 5]),
            propType: protocol_1.PropType.Set,
            propTypeName: 'Set',
        },
        {
            expression: new Map([
                ['name', 'John'],
                ['age', 40],
                [{ id: 123 }, undefined],
            ]),
            propType: protocol_1.PropType.Map,
            propTypeName: 'Map',
        },
    ];
    for (const { expression, propType, propTypeName } of testCases) {
        it(`should determine ${String(expression)} as PropType:${propTypeName}(${propType})`, () => {
            const actual = (0, prop_type_1.getPropType)(expression);
            expect(actual).toBe(actual);
        });
    }
});
