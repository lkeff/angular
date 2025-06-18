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
const flamegraph_formatter_1 = require("./flamegraph-formatter");
const formatter = new flamegraph_formatter_1.FlamegraphFormatter();
describe('addFrame cases', () => {
    let entry;
    let timeSpent;
    beforeEach(() => {
        entry = {
            app: [],
            timeSpent: 0,
            source: '',
        };
    });
    it('add frame for simple case', () => {
        timeSpent = formatter.addFrame(entry.app, record_formatter_spec_constants_1.SIMPLE_RECORD);
        expect(timeSpent).toBe(17);
        expect(entry.app).toEqual(record_formatter_spec_constants_1.SIMPLE_FORMATTED_FLAMEGRAPH_RECORD);
    });
    it('add frame for deeply nested records', () => {
        timeSpent = formatter.addFrame(entry.app, record_formatter_spec_constants_1.NESTED_RECORD);
        expect(timeSpent).toBe(21);
        expect(entry.app).toEqual(record_formatter_spec_constants_1.NESTED_FORMATTED_FLAMEGRAPH_RECORD);
    });
});
