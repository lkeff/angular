"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const attrs_utils_1 = require("../../../src/render3/util/attrs_utils");
describe('attr_util', () => {
    describe('mergeHostAttribute', () => {
        it('should add new attributes', () => {
            const attrs = [];
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'Key', null, 'value');
            expect(attrs).toEqual(['Key', 'value']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'A', null, 'a');
            expect(attrs).toEqual(['Key', 'value', 'A', 'a']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'X', null, 'x');
            expect(attrs).toEqual(['Key', 'value', 'A', 'a', 'X', 'x']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'Key', null, 'new');
            expect(attrs).toEqual(['Key', 'new', 'A', 'a', 'X', 'x']);
        });
        it('should add new classes', () => {
            const attrs = [];
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'CLASS', null, null);
            expect(attrs).toEqual([1 /* AttributeMarker.Classes */, 'CLASS']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'A', null, null);
            expect(attrs).toEqual([1 /* AttributeMarker.Classes */, 'CLASS', 'A']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'X', null, null);
            expect(attrs).toEqual([1 /* AttributeMarker.Classes */, 'CLASS', 'A', 'X']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'CLASS', null, null);
            expect(attrs).toEqual([1 /* AttributeMarker.Classes */, 'CLASS', 'A', 'X']);
        });
        it('should add new styles', () => {
            const attrs = [];
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'Style', null, 'v1');
            expect(attrs).toEqual([2 /* AttributeMarker.Styles */, 'Style', 'v1']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'A', null, 'v2');
            expect(attrs).toEqual([2 /* AttributeMarker.Styles */, 'Style', 'v1', 'A', 'v2']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'X', null, 'v3');
            expect(attrs).toEqual([2 /* AttributeMarker.Styles */, 'Style', 'v1', 'A', 'v2', 'X', 'v3']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'Style', null, 'new');
            expect(attrs).toEqual([2 /* AttributeMarker.Styles */, 'Style', 'new', 'A', 'v2', 'X', 'v3']);
        });
        it('should keep different types together', () => {
            const attrs = [];
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'Key', null, 'value');
            expect(attrs).toEqual(['Key', 'value']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'CLASS', null, null);
            expect(attrs).toEqual(['Key', 'value', 1 /* AttributeMarker.Classes */, 'CLASS']);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'Style', null, 'v1');
            expect(attrs).toEqual([
                'Key',
                'value',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
            ]);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, -1, 'Key2', null, 'value2');
            expect(attrs).toEqual([
                'Key',
                'value',
                'Key2',
                'value2',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
            ]);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 1 /* AttributeMarker.Classes */, 'CLASS2', null, null);
            expect(attrs).toEqual([
                'Key',
                'value',
                'Key2',
                'value2',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                'CLASS2',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
            ]);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 2 /* AttributeMarker.Styles */, 'Style2', null, 'v2');
            expect(attrs).toEqual([
                'Key',
                'value',
                'Key2',
                'value2',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                'CLASS2',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
                'Style2',
                'v2',
            ]);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 0 /* AttributeMarker.NamespaceURI */, 'uri', 'key', 'value');
            expect(attrs).toEqual([
                'Key',
                'value',
                'Key2',
                'value2',
                0 /* AttributeMarker.NamespaceURI */,
                'uri',
                'key',
                'value',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                'CLASS2',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
                'Style2',
                'v2',
            ]);
            (0, attrs_utils_1.mergeHostAttribute)(attrs, 0 /* AttributeMarker.NamespaceURI */, 'uri', 'key', 'new value');
            expect(attrs).toEqual([
                'Key',
                'value',
                'Key2',
                'value2',
                0 /* AttributeMarker.NamespaceURI */,
                'uri',
                'key',
                'new value',
                1 /* AttributeMarker.Classes */,
                'CLASS',
                'CLASS2',
                2 /* AttributeMarker.Styles */,
                'Style',
                'v1',
                'Style2',
                'v2',
            ]);
        });
    });
    describe('mergeHostAttrs', () => {
        it('should ignore nulls/empty', () => {
            expect((0, attrs_utils_1.mergeHostAttrs)(null, null)).toEqual(null);
            expect((0, attrs_utils_1.mergeHostAttrs)([], null)).toEqual([]);
            expect((0, attrs_utils_1.mergeHostAttrs)(null, [])).toEqual(null);
        });
        it('should copy if dst is null', () => {
            expect((0, attrs_utils_1.mergeHostAttrs)(null, ['K', 'v'])).toEqual(['K', 'v']);
            expect((0, attrs_utils_1.mergeHostAttrs)(['K', '', 'X', 'x'], ['K', 'v'])).toEqual(['K', 'v', 'X', 'x']);
        });
    });
});
