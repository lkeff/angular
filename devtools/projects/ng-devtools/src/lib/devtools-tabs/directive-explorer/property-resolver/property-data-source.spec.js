"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = require("@angular/cdk/tree");
const protocol_1 = require("protocol");
const flatten_1 = require("./flatten");
const property_data_source_1 = require("./property-data-source");
const flatTreeControl = new tree_1.FlatTreeControl((node) => node.level, (node) => node.expandable);
describe('PropertyDataSource', () => {
    it('should detect changes in the collection', () => {
        const source = new property_data_source_1.PropertyDataSource({
            foo: {
                editable: true,
                expandable: false,
                preview: '42',
                type: protocol_1.PropType.Number,
                value: 42,
                containerType: null,
            },
        }, (0, flatten_1.getTreeFlattener)(), flatTreeControl, { element: [1, 2, 3] }, null);
        source.update({
            foo: {
                editable: true,
                expandable: false,
                preview: '43',
                type: protocol_1.PropType.Number,
                value: 43,
                containerType: null,
            },
        });
        expect(source.data).toEqual([
            {
                expandable: false,
                level: 0,
                prop: {
                    descriptor: {
                        editable: true,
                        expandable: false,
                        preview: '43',
                        type: protocol_1.PropType.Number,
                        value: 43,
                        containerType: null,
                    },
                    name: 'foo',
                    parent: null,
                },
            },
        ]);
    });
});
