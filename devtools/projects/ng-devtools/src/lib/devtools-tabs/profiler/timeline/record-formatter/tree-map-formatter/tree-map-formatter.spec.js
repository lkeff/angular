"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const record_formatter_spec_constants_1 = require("../record-formatter-spec-constants");
const tree_map_formatter_1 = require("./tree-map-formatter");
const formatter = new tree_map_formatter_1.TreeMapFormatter();
describe('addFrame cases', () => {
    let entry;
    beforeEach(() => {
        entry = {
            app: [],
            timeSpent: 0,
            source: '',
        };
    });
    it('add frame for simple case', () => {
        formatter.addFrame(entry.app, record_formatter_spec_constants_1.SIMPLE_RECORD);
        expect(entry.app).toEqual(record_formatter_spec_constants_1.SIMPLE_FORMATTED_TREE_MAP_RECORD);
    });
});
