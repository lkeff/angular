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
const arrayify_props_1 = require("./arrayify-props");
describe('arrayify', () => {
    it('should return an array from prop object', () => {
        const arr = (0, arrayify_props_1.arrayifyProps)({
            foo: {
                editable: true,
                expandable: true,
                preview: '',
                type: protocol_1.PropType.Array,
                containerType: null,
            },
            bar: {
                editable: true,
                expandable: true,
                preview: '',
                type: protocol_1.PropType.Array,
                containerType: null,
            },
        });
        expect(arr).toEqual([
            {
                name: 'bar',
                descriptor: {
                    editable: true,
                    expandable: true,
                    preview: '',
                    type: protocol_1.PropType.Array,
                    containerType: null,
                },
                parent: null,
            },
            {
                name: 'foo',
                descriptor: {
                    editable: true,
                    expandable: true,
                    preview: '',
                    type: protocol_1.PropType.Array,
                    containerType: null,
                },
                parent: null,
            },
        ]);
    });
    it('should properly sort array objects', () => {
        const arr = (0, arrayify_props_1.arrayifyProps)({
            11: {
                editable: true,
                expandable: true,
                preview: '',
                type: protocol_1.PropType.Array,
                containerType: null,
            },
            2: {
                editable: true,
                expandable: true,
                preview: '',
                type: protocol_1.PropType.Array,
                containerType: null,
            },
        });
        expect(arr).toEqual([
            {
                name: '2',
                descriptor: {
                    editable: true,
                    expandable: true,
                    preview: '',
                    type: protocol_1.PropType.Array,
                    containerType: null,
                },
                parent: null,
            },
            {
                name: '11',
                descriptor: {
                    editable: true,
                    expandable: true,
                    preview: '',
                    type: protocol_1.PropType.Array,
                    containerType: null,
                },
                parent: null,
            },
        ]);
    });
});
