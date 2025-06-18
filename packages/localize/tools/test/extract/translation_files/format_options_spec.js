"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const format_options_1 = require("../../../src/extract/translation_files/format_options");
describe('format_options', () => {
    describe('validateOptions()', () => {
        it('should do nothing if there are no options', () => {
            expect(() => (0, format_options_1.validateOptions)('TestSerializer', [['key', ['value1', 'value2']]], {})).not.toThrow();
        });
        it('should do nothing if the options are valid', () => {
            expect(() => (0, format_options_1.validateOptions)('TestSerializer', [['key', ['value1', 'value2']]], { key: 'value1' })).not.toThrow();
        });
        it('should error if there is an unexpected option', () => {
            expect(() => (0, format_options_1.validateOptions)('TestSerializer', [['key', ['value1', 'value2']]], { wrong: 'xxx' })).toThrowError('Invalid format option for TestSerializer: "wrong".\n' + 'Allowed options are ["key"].');
        });
        it('should error if there is an unexpected option value', () => {
            expect(() => (0, format_options_1.validateOptions)('TestSerializer', [['key', ['value1', 'value2']]], { key: 'other' })).toThrowError('Invalid format option value for TestSerializer: "key".\n' +
                'Allowed option values are ["value1","value2"] but received "other".');
        });
    });
    describe('parseFormatOptions()', () => {
        it('should parse the string as JSON', () => {
            expect((0, format_options_1.parseFormatOptions)('{"a": "1", "b": "2"}')).toEqual({ a: '1', b: '2' });
        });
        it('should parse undefined into an empty object', () => {
            expect((0, format_options_1.parseFormatOptions)(undefined)).toEqual({});
        });
    });
});
