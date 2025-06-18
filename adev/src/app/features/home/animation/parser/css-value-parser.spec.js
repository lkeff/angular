"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const css_value_parser_1 = require("./css-value-parser");
describe('css-value-parser', () => {
    it('should parse a simple static value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('block');
        expect(value).toEqual({
            type: 'static',
            value: 'block',
        });
    });
    it('should parse a hex color value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('#ff7d00');
        expect(value).toEqual({
            type: 'color',
            value: ['rgb', 255, 125, 0],
        });
    });
    it('should parse a short hex color value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('#f0f');
        expect(value).toEqual({
            type: 'color',
            value: ['rgb', 255, 0, 255],
        });
    });
    it('should parse a hex color value with upper case letters', () => {
        const value = (0, css_value_parser_1.cssValueParser)('#AABBFF');
        expect(value).toEqual({
            type: 'color',
            value: ['rgb', 170, 187, 255],
        });
    });
    it('should parse an RGB color value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('rgb(255, 255, 0)');
        expect(value).toEqual({
            type: 'color',
            value: ['rgb', 255, 255, 0],
        });
    });
    it('should parse an RGBA color value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('rgba(255, 255, 0, 0.75)');
        expect(value).toEqual({
            type: 'color',
            value: ['rgba', 255, 255, 0, 0.75],
        });
    });
    it('should parse a single numeric integer value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('42px');
        expect(value).toEqual({
            type: 'numeric',
            values: [[42, 'px']],
        });
    });
    it('should parse a single numberic decimal value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('66.6%');
        expect(value).toEqual({
            type: 'numeric',
            values: [[66.6, '%']],
        });
    });
    it('should parse a single negative numberic value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('-50%');
        expect(value).toEqual({
            type: 'numeric',
            values: [[-50, '%']],
        });
    });
    it('should parse a single unitless numberic value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('1337');
        expect(value).toEqual({
            type: 'numeric',
            values: [[1337, '']],
        });
    });
    it('should parse a list of numeric values', () => {
        const value = (0, css_value_parser_1.cssValueParser)('42px 13.37rem 0%');
        expect(value).toEqual({
            type: 'numeric',
            values: [
                [42, 'px'],
                [13.37, 'rem'],
                [0, '%'],
            ],
        });
    });
    it('should parse a list of unitless numeric values', () => {
        const value = (0, css_value_parser_1.cssValueParser)('42 13.37 0');
        expect(value).toEqual({
            type: 'numeric',
            values: [
                [42, ''],
                [13.37, ''],
                [0, ''],
            ],
        });
    });
    it('should parse a list of negative and positive numeric values', () => {
        const value = (0, css_value_parser_1.cssValueParser)('42% -13.37px 0rem -100vw');
        expect(value).toEqual({
            type: 'numeric',
            values: [
                [42, '%'],
                [-13.37, 'px'],
                [0, 'rem'],
                [-100, 'vw'],
            ],
        });
    });
    it('should parse a list of negative and positive unitless numeric values', () => {
        const value = (0, css_value_parser_1.cssValueParser)('42 -13.37 0 -100');
        expect(value).toEqual({
            type: 'numeric',
            values: [
                [42, ''],
                [-13.37, ''],
                [0, ''],
                [-100, ''],
            ],
        });
    });
    it('should parse a list of numeric values with and without units', () => {
        const value = (0, css_value_parser_1.cssValueParser)('13 37px -3.14 66.6rem');
        expect(value).toEqual({
            type: 'numeric',
            values: [
                [13, ''],
                [37, 'px'],
                [-3.14, ''],
                [66.6, 'rem'],
            ],
        });
    });
    it('should parse a simple transform value', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translateX(42%)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([['translateX', [[42, '%']]]]),
        });
    });
    it('should parse a transform value with a single function with multiple parameters', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translate(42%, 0px)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([
                [
                    'translate',
                    [
                        [42, '%'],
                        [0, 'px'],
                    ],
                ],
            ]),
        });
    });
    it('should parse a transform value with a single function with a single unitless parameter', () => {
        const value = (0, css_value_parser_1.cssValueParser)('scale(1.5)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([['scale', [[1.5, '']]]]),
        });
    });
    it('should parse a transform value with a single function with multiple unitless parameter', () => {
        const value = (0, css_value_parser_1.cssValueParser)('scale(1.5, 42)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([
                [
                    'scale',
                    [
                        [1.5, ''],
                        [42, ''],
                    ],
                ],
            ]),
        });
    });
    it('should parse a transform value with multiple functions with multiple parameters', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translate(42%, 0px) scale(1.5) rotate(180deg)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([
                [
                    'translate',
                    [
                        [42, '%'],
                        [0, 'px'],
                    ],
                ],
                ['scale', [[1.5, '']]],
                ['rotate', [[180, 'deg']]],
            ]),
        });
    });
    it('should parse a transform value with multiple functions with multiple parameters and negative values', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translate(42%, -1px) scale(-1.5) rotate(180deg)');
        expect(value).toEqual({
            type: 'transform',
            values: new Map([
                [
                    'translate',
                    [
                        [42, '%'],
                        [-1, 'px'],
                    ],
                ],
                ['scale', [[-1.5, '']]],
                ['rotate', [[180, 'deg']]],
            ]),
        });
    });
    it('should parse an unsupported transform value as a static one', () => {
        const value = (0, css_value_parser_1.cssValueParser)('matrix(1, 2, 3)');
        expect(value).toEqual({
            type: 'static',
            value: 'matrix(1, 2, 3)',
        });
    });
    it('should parse a transform value which function have both unit and unitless values as static', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translate(42, 1337px)');
        expect(value).toEqual({
            type: 'static',
            value: 'translate(42, 1337px)',
        });
    });
    it('should parse a transform value with a function without parameters as a static one', () => {
        const value = (0, css_value_parser_1.cssValueParser)('translate()');
        expect(value).toEqual({
            type: 'static',
            value: 'translate()',
        });
    });
});
