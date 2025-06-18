"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const parse_extracted_styles_1 = require("../../src/template/pipeline/src/phases/parse_extracted_styles");
describe('style parsing', () => {
    it('should parse empty or blank strings', () => {
        const result1 = (0, parse_extracted_styles_1.parse)('');
        expect(result1).toEqual([]);
        const result2 = (0, parse_extracted_styles_1.parse)('    ');
        expect(result2).toEqual([]);
    });
    it('should parse a string into a key/value map', () => {
        const result = (0, parse_extracted_styles_1.parse)('width:100px;height:200px;opacity:0');
        expect(result).toEqual(['width', '100px', 'height', '200px', 'opacity', '0']);
    });
    it('should allow empty values', () => {
        const result = (0, parse_extracted_styles_1.parse)('width:;height:   ;');
        expect(result).toEqual(['width', '', 'height', '']);
    });
    it('should trim values and properties', () => {
        const result = (0, parse_extracted_styles_1.parse)('width :333px ; height:666px    ; opacity: 0.5;');
        expect(result).toEqual(['width', '333px', 'height', '666px', 'opacity', '0.5']);
    });
    it('should not mess up with quoted strings that contain [:;] values', () => {
        const result = (0, parse_extracted_styles_1.parse)('content: "foo; man: guy"; width: 100px');
        expect(result).toEqual(['content', '"foo; man: guy"', 'width', '100px']);
    });
    it('should not mess up with quoted strings that contain inner quote values', () => {
        const quoteStr = '"one \'two\' three "four" five"';
        const result = (0, parse_extracted_styles_1.parse)(`content: ${quoteStr}; width: 123px`);
        expect(result).toEqual(['content', quoteStr, 'width', '123px']);
    });
    it('should respect parenthesis that are placed within a style', () => {
        const result = (0, parse_extracted_styles_1.parse)('background-image: url("foo.jpg")');
        expect(result).toEqual(['background-image', 'url("foo.jpg")']);
    });
    it('should respect multi-level parenthesis that contain special [:;] characters', () => {
        const result = (0, parse_extracted_styles_1.parse)('color: rgba(calc(50 * 4), var(--cool), :5;); height: 100px;');
        expect(result).toEqual(['color', 'rgba(calc(50 * 4), var(--cool), :5;)', 'height', '100px']);
    });
    it('should hyphenate style properties from camel case', () => {
        const result = (0, parse_extracted_styles_1.parse)('borderWidth: 200px');
        expect(result).toEqual(['border-width', '200px']);
    });
    describe('should not remove quotes', () => {
        it('from string data types', () => {
            const result = (0, parse_extracted_styles_1.parse)('content: "foo"');
            expect(result).toEqual(['content', '"foo"']);
        });
        it('that changes the value context from invalid to valid', () => {
            const result = (0, parse_extracted_styles_1.parse)('width: "1px"');
            expect(result).toEqual(['width', '"1px"']);
        });
    });
    describe('camelCasing => hyphenation', () => {
        it('should convert a camel-cased value to a hyphenated value', () => {
            expect((0, parse_extracted_styles_1.hyphenate)('fooBar')).toEqual('foo-bar');
            expect((0, parse_extracted_styles_1.hyphenate)('fooBarMan')).toEqual('foo-bar-man');
            expect((0, parse_extracted_styles_1.hyphenate)('-fooBar-man')).toEqual('-foo-bar-man');
        });
        it('should make everything lowercase', () => {
            expect((0, parse_extracted_styles_1.hyphenate)('-WebkitAnimation')).toEqual('-webkit-animation');
        });
    });
});
