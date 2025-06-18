"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_debug_1 = require("../../src/render3/i18n/i18n_debug");
const i18n_1 = require("../../src/render3/interfaces/i18n");
describe('i18n debug', () => {
    describe('i18nUpdateOpCodesToString', () => {
        it('should print nothing', () => {
            expect((0, i18n_debug_1.i18nUpdateOpCodesToString)([])).toEqual([]);
        });
        it('should print text opCode', () => {
            expect((0, i18n_debug_1.i18nUpdateOpCodesToString)([
                0b11,
                4,
                'pre ',
                -4,
                ' post',
                (1 << 2 /* I18nUpdateOpCode.SHIFT_REF */) | 0 /* I18nUpdateOpCode.Text */,
            ])).toEqual([
                'if (mask & 0b11) { (lView[1] as Text).textContent = `pre ${lView[i-4]} post`; }',
            ]);
        });
        it('should print Attribute opCode', () => {
            // The `sanitizeFn` is written as actual function, compared to it being an arrow function.
            // This is done to make this test less reluctant to build process changes where e.g. an
            // arrow function might be transformed to a function declaration in ES5.
            const sanitizeFn = function (v) {
                return v;
            };
            expect((0, i18n_debug_1.i18nUpdateOpCodesToString)([
                0b01,
                8,
                'pre ',
                -4,
                ' in ',
                -3,
                ' post',
                (1 << 2 /* I18nUpdateOpCode.SHIFT_REF */) | 1 /* I18nUpdateOpCode.Attr */,
                'title',
                null,
                0b10,
                8,
                'pre ',
                -4,
                ' in ',
                -3,
                ' post',
                (1 << 2 /* I18nUpdateOpCode.SHIFT_REF */) | 1 /* I18nUpdateOpCode.Attr */,
                'title',
                sanitizeFn,
            ])).toEqual([
                "if (mask & 0b1) { (lView[1] as Element).setAttribute('title', `pre ${lView[i-4]} in ${lView[i-3]} post`); }",
                `if (mask & 0b10) { (lView[1] as Element).setAttribute('title', (${sanitizeFn.toString()})(\`pre $\{lView[i-4]} in $\{lView[i-3]} post\`)); }`,
            ]);
        });
        it('should print icuSwitch opCode', () => {
            expect((0, i18n_debug_1.i18nUpdateOpCodesToString)([
                0b100,
                2,
                -5,
                (12 << 2 /* I18nUpdateOpCode.SHIFT_REF */) | 2 /* I18nUpdateOpCode.IcuSwitch */,
            ])).toEqual(['if (mask & 0b100) { icuSwitchCase(12, `${lView[i-5]}`); }']);
        });
        it('should print icuUpdate opCode', () => {
            expect((0, i18n_debug_1.i18nUpdateOpCodesToString)([
                0b1000,
                1,
                (13 << 2 /* I18nUpdateOpCode.SHIFT_REF */) | 3 /* I18nUpdateOpCode.IcuUpdate */,
            ])).toEqual(['if (mask & 0b1000) { icuUpdateCase(13); }']);
        });
    });
    describe('i18nMutateOpCodesToString', () => {
        it('should print nothing', () => {
            expect((0, i18n_debug_1.icuCreateOpCodesToString)([])).toEqual([]);
        });
        it('should print text AppendChild', () => {
            expect((0, i18n_debug_1.icuCreateOpCodesToString)([
                'xyz',
                0,
                (1 << 17 /* IcuCreateOpCode.SHIFT_PARENT */) |
                    (0 << 1 /* IcuCreateOpCode.SHIFT_REF */) |
                    0 /* IcuCreateOpCode.AppendChild */,
            ])).toEqual([
                'lView[0] = document.createTextNode("xyz")',
                '(lView[1] as Element).appendChild(lView[0])',
            ]);
        });
        it('should print element AppendChild', () => {
            expect((0, i18n_debug_1.icuCreateOpCodesToString)([
                i18n_1.ELEMENT_MARKER,
                'xyz',
                0,
                (1 << 17 /* IcuCreateOpCode.SHIFT_PARENT */) |
                    (0 << 1 /* IcuCreateOpCode.SHIFT_REF */) |
                    0 /* IcuCreateOpCode.AppendChild */,
            ])).toEqual([
                'lView[0] = document.createElement("xyz")',
                '(lView[1] as Element).appendChild(lView[0])',
            ]);
        });
        it('should print comment AppendChild', () => {
            expect((0, i18n_debug_1.icuCreateOpCodesToString)([
                i18n_1.ICU_MARKER,
                'xyz',
                0,
                (1 << 17 /* IcuCreateOpCode.SHIFT_PARENT */) |
                    (0 << 1 /* IcuCreateOpCode.SHIFT_REF */) |
                    0 /* IcuCreateOpCode.AppendChild */,
            ])).toEqual([
                'lView[0] = document.createComment("xyz")',
                '(lView[1] as Element).appendChild(lView[0])',
            ]);
        });
        it('should print Remove', () => {
            expect((0, i18n_debug_1.i18nRemoveOpCodesToString)([123])).toEqual([
                'remove(lView[123])',
            ]);
        });
        it('should print Attr', () => {
            expect((0, i18n_debug_1.icuCreateOpCodesToString)([
                (1 << 1 /* IcuCreateOpCode.SHIFT_REF */) | 1 /* IcuCreateOpCode.Attr */,
                'attr',
                'value',
            ])).toEqual(['(lView[1] as Element).setAttribute("attr", "value")']);
        });
        it('should print RemoveNestedIcu', () => {
            expect((0, i18n_debug_1.i18nRemoveOpCodesToString)([~123])).toEqual([
                'removeNestedICU(123)',
            ]);
        });
    });
    describe('i18nCreateOpCodesToString', () => {
        it('should print nothing', () => {
            expect((0, i18n_debug_1.i18nCreateOpCodesToString)([])).toEqual([]);
        });
        it('should print text/comment creation', () => {
            expect((0, i18n_debug_1.i18nCreateOpCodesToString)([
                10 << i18n_1.I18nCreateOpCode.SHIFT,
                'text at 10', //
                (11 << i18n_1.I18nCreateOpCode.SHIFT) | i18n_1.I18nCreateOpCode.APPEND_EAGERLY,
                'text at 11, append', //
                (12 << i18n_1.I18nCreateOpCode.SHIFT) | i18n_1.I18nCreateOpCode.COMMENT,
                'comment at 12', //
                (13 << i18n_1.I18nCreateOpCode.SHIFT) |
                    i18n_1.I18nCreateOpCode.COMMENT |
                    i18n_1.I18nCreateOpCode.APPEND_EAGERLY,
                'comment at 13, append', //
            ])).toEqual([
                'lView[10] = document.createText("text at 10");',
                'lView[11] = document.createText("text at 11, append");',
                'parent.appendChild(lView[11]);',
                'lView[12] = document.createComment("comment at 12");',
                'lView[13] = document.createComment("comment at 13, append");',
                'parent.appendChild(lView[13]);',
            ]);
        });
    });
});
