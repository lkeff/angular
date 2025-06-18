"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const definition_1 = require("../../../src/render3/definition");
const styling_1 = require("../../../src/render3/instructions/styling");
const styling_2 = require("../../../src/render3/interfaces/styling");
const view_1 = require("../../../src/render3/interfaces/view");
const state_1 = require("../../../src/render3/state");
const view_utils_1 = require("../../../src/render3/util/view_utils");
const array_utils_1 = require("../../../src/util/array_utils");
const styling_3 = require("../../../testing/src/styling");
const shared_spec_1 = require("./shared_spec");
describe('styling', () => {
    beforeEach(shared_spec_1.enterViewWithOneDiv);
    afterEach(state_1.leaveView);
    let div;
    beforeEach(() => (div = (0, view_utils_1.getNativeByIndex)(view_1.HEADER_OFFSET, (0, state_1.getLView)())));
    it('should do set basic style', () => {
        (0, styling_1.ɵɵstyleProp)('color', 'red');
        expectStyle(div).toEqual({ color: 'red' });
    });
    it('should search across multiple instructions backwards', () => {
        (0, styling_1.ɵɵstyleProp)('color', 'red');
        (0, styling_1.ɵɵstyleProp)('color', undefined);
        (0, styling_1.ɵɵstyleProp)('color', 'blue');
        expectStyle(div).toEqual({ color: 'blue' });
        (0, shared_spec_1.clearFirstUpdatePass)();
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', 'red');
        (0, styling_1.ɵɵstyleProp)('color', undefined);
        (0, styling_1.ɵɵstyleProp)('color', undefined);
        expectStyle(div).toEqual({ color: 'red' });
    });
    it('should search across multiple instructions forwards', () => {
        (0, styling_1.ɵɵstyleProp)('color', 'red');
        (0, styling_1.ɵɵstyleProp)('color', 'green');
        (0, styling_1.ɵɵstyleProp)('color', 'blue');
        expectStyle(div).toEqual({ color: 'blue' });
        (0, shared_spec_1.clearFirstUpdatePass)();
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', 'white');
        expectStyle(div).toEqual({ color: 'blue' });
    });
    it('should set style based on priority', () => {
        (0, styling_1.ɵɵstyleProp)('color', 'red');
        (0, styling_1.ɵɵstyleProp)('color', 'blue'); // Higher priority, should win.
        expectStyle(div).toEqual({ color: 'blue' });
        (0, shared_spec_1.clearFirstUpdatePass)();
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', 'red'); // no change
        (0, styling_1.ɵɵstyleProp)('color', 'green'); // change to green
        expectStyle(div).toEqual({ color: 'green' });
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', 'black'); // First binding update
        expectStyle(div).toEqual({ color: 'green' }); // Green still has priority.
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', 'black'); // no change
        (0, styling_1.ɵɵstyleProp)('color', undefined); // Clear second binding
        expectStyle(div).toEqual({ color: 'black' }); // default to first binding
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵstyleProp)('color', null);
        expectStyle(div).toEqual({}); // default to first binding
    });
    it('should set class based on priority', () => {
        (0, styling_1.ɵɵclassProp)('foo', false);
        (0, styling_1.ɵɵclassProp)('foo', true); // Higher priority, should win.
        expectClass(div).toEqual({ foo: true });
        (0, shared_spec_1.clearFirstUpdatePass)();
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵclassProp)('foo', false); // no change
        (0, styling_1.ɵɵclassProp)('foo', undefined); // change (have no opinion)
        expectClass(div).toEqual({});
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵclassProp)('foo', false); // no change
        (0, styling_1.ɵɵclassProp)('foo', 'truthy');
        expectClass(div).toEqual({ foo: true });
        (0, shared_spec_1.rewindBindingIndex)();
        (0, styling_1.ɵɵclassProp)('foo', true); // change
        (0, styling_1.ɵɵclassProp)('foo', undefined); // change
        expectClass(div).toEqual({ foo: true });
    });
    describe('styleMap', () => {
        it('should work with maps', () => {
            (0, styling_1.ɵɵstyleMap)({});
            expectStyle(div).toEqual({});
            (0, shared_spec_1.clearFirstUpdatePass)();
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)({ color: 'blue' });
            expectStyle(div).toEqual({ color: 'blue' });
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)({ color: 'red' });
            expectStyle(div).toEqual({ color: 'red' });
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)({ color: null, width: '100px' });
            expectStyle(div).toEqual({ width: '100px' });
        });
        it('should work with object literal and strings', () => {
            (0, styling_1.ɵɵstyleMap)('');
            expectStyle(div).toEqual({});
            (0, shared_spec_1.clearFirstUpdatePass)();
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)('color: blue');
            expectStyle(div).toEqual({ color: 'blue' });
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)('color: red');
            expectStyle(div).toEqual({ color: 'red' });
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)('width: 100px');
            expectStyle(div).toEqual({ width: '100px' });
        });
        it('should collaborate with properties', () => {
            (0, styling_1.ɵɵstyleProp)('color', 'red');
            (0, styling_1.ɵɵstyleMap)({ color: 'blue', width: '100px' });
            expectStyle(div).toEqual({ color: 'blue', width: '100px' });
            (0, shared_spec_1.clearFirstUpdatePass)();
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleProp)('color', 'red');
            (0, styling_1.ɵɵstyleMap)({ width: '200px' });
            expectStyle(div).toEqual({ color: 'red', width: '200px' });
        });
        it('should collaborate with other maps', () => {
            (0, styling_1.ɵɵstyleMap)('color: red');
            (0, styling_1.ɵɵstyleMap)({ color: 'blue', width: '100px' });
            expectStyle(div).toEqual({ color: 'blue', width: '100px' });
            (0, shared_spec_1.clearFirstUpdatePass)();
            (0, shared_spec_1.rewindBindingIndex)();
            (0, styling_1.ɵɵstyleMap)('color: red');
            (0, styling_1.ɵɵstyleMap)({ width: '200px' });
            expectStyle(div).toEqual({ color: 'red', width: '200px' });
        });
        describe('suffix', () => {
            it('should append suffix', () => {
                (0, styling_1.ɵɵstyleProp)('width', 200, 'px');
                (0, styling_1.ɵɵstyleProp)('width', 100, 'px');
                expectStyle(div).toEqual({ width: '100px' });
                (0, shared_spec_1.clearFirstUpdatePass)();
                (0, shared_spec_1.rewindBindingIndex)();
                (0, styling_1.ɵɵstyleProp)('width', 200, 'px');
                (0, styling_1.ɵɵstyleProp)('width', undefined, 'px');
                expectStyle(div).toEqual({ width: '200px' });
            });
            it('should append suffix and non-suffix bindings', () => {
                (0, styling_1.ɵɵstyleProp)('width', 200, 'px');
                (0, styling_1.ɵɵstyleProp)('width', '100px');
                expectStyle(div).toEqual({ width: '100px' });
                (0, shared_spec_1.clearFirstUpdatePass)();
                (0, shared_spec_1.rewindBindingIndex)();
                (0, styling_1.ɵɵstyleProp)('width', 200, 'px');
                (0, styling_1.ɵɵstyleProp)('width', undefined, 'px');
                expectStyle(div).toEqual({ width: '200px' });
            });
        });
    });
    describe('static', () => {
        describe('template only', () => {
            it('should capture static values in TStylingKey', () => {
                givenTemplateAttrs([2 /* AttributeMarker.Styles */, 'content', '"TEMPLATE"']);
                (0, styling_1.ɵɵstyleProp)('content', '"dynamic"');
                expectTStylingKeys('style').toEqual([
                    ['', 'content', 'content', '"TEMPLATE"'],
                    'prev', // contains statics
                    null, // residual
                ]);
                expectStyle(div).toEqual({ content: '"dynamic"' });
                (0, styling_1.ɵɵstyleProp)('content', undefined);
                expectTStylingKeys('style').toEqual([
                    ['', 'content', 'content', '"TEMPLATE"'],
                    'both', // contains statics
                    'content',
                    'prev', // Making sure that second instruction does not have statics again.
                    null, // residual
                ]);
                expectStyle(div).toEqual({ content: '"dynamic"' });
            });
        });
        describe('directives only', () => {
            it('should update residual on second directive', () => {
                givenDirectiveAttrs([
                    [2 /* AttributeMarker.Styles */, 'content', '"lowest"'], // 0
                    [2 /* AttributeMarker.Styles */, 'content', '"middle"'], // 1
                ]);
                expectStyle(div).toEqual({ content: '"middle"' });
                activateHostBindings(0);
                (0, styling_1.ɵɵstyleProp)('content', '"dynamic"');
                expectTStylingKeys('style').toEqual([
                    ['', 'content', 'content', '"lowest"'],
                    'both', // 1: contains statics
                    ['content', '"middle"'], // residual
                ]);
                expectStyle(div).toEqual({ content: '"middle"' });
                // second binding should not get statics
                (0, styling_1.ɵɵstyleProp)('content', '"dynamic2"');
                expectTStylingKeys('style').toEqual([
                    ['', 'content', 'content', '"lowest"'],
                    'both', // 1: contains statics
                    'content',
                    'both', // 1: Should not get statics
                    ['content', '"middle"'], // residual
                ]);
                expectStyle(div).toEqual({ content: '"middle"' });
                activateHostBindings(1);
                (0, styling_1.ɵɵstyleProp)('content', '"dynamic3"');
                expectTStylingKeys('style').toEqual([
                    ['', 'content', 'content', '"lowest"'],
                    'both', // 1: contains statics
                    'content',
                    'both', // 1: Should not get statics
                    ['', 'content', 'content', '"middle"'],
                    'prev', // 0: contains statics
                    null, // residual
                ]);
                expectStyle(div).toEqual({ content: '"dynamic3"' });
            });
        });
        describe('template and directives', () => {
            it('should combine property and map', () => {
                givenDirectiveAttrs([
                    [2 /* AttributeMarker.Styles */, 'content', '"lowest"', 'color', 'blue'], // 0
                    [2 /* AttributeMarker.Styles */, 'content', '"middle"', 'width', '100px'], // 1
                ]);
                givenTemplateAttrs([2 /* AttributeMarker.Styles */, 'content', '"TEMPLATE"', 'color', 'red']);
                // TEMPLATE
                (0, styling_1.ɵɵstyleProp)('content', undefined);
                expectTStylingKeys('style').toEqual([
                    // TEMPLATE
                    ['', 'content', 'color', 'red', 'content', '"TEMPLATE"', 'width', '100px'],
                    'prev',
                    // RESIDUAL
                    null,
                ]);
                expectStyle(div).toEqual({ content: '"TEMPLATE"', color: 'red', width: '100px' });
                // Directive 0
                activateHostBindings(0);
                (0, styling_1.ɵɵstyleMap)('color: red; width: 0px; height: 50px');
                expectTStylingKeys('style').toEqual([
                    // Host Binding 0
                    ['', null, 'color', 'blue', 'content', '"lowest"'],
                    'both',
                    // TEMPLATE
                    ['', 'content', 'color', 'red', 'content', '"TEMPLATE"', 'width', '100px'],
                    'prev',
                    // RESIDUAL
                    null,
                ]);
                expectStyle(div).toEqual({
                    content: '"TEMPLATE"',
                    color: 'red',
                    width: '100px',
                    height: '50px',
                });
                // Directive 1
                activateHostBindings(1);
                (0, styling_1.ɵɵstyleMap)('color: red; width: 0px; height: 50px');
                expectTStylingKeys('style').toEqual([
                    // Host Binding 0
                    ['', null, 'color', 'blue', 'content', '"lowest"'],
                    'both',
                    // Host Binding 1
                    ['', null, 'content', '"middle"', 'width', '100px'],
                    'both',
                    // TEMPLATE
                    ['', 'content', 'color', 'red', 'content', '"TEMPLATE"'],
                    'prev',
                    // RESIDUAL
                    null,
                ]);
                expectStyle(div).toEqual({
                    content: '"TEMPLATE"',
                    color: 'red',
                    width: '0px',
                    height: '50px',
                });
            });
            it('should read value from residual', () => {
                givenDirectiveAttrs([
                    [2 /* AttributeMarker.Styles */, 'content', '"lowest"', 'color', 'blue'], // 0
                    [2 /* AttributeMarker.Styles */, 'content', '"middle"', 'width', '100px'], // 1
                ]);
                givenTemplateAttrs([2 /* AttributeMarker.Styles */, 'content', '"TEMPLATE"', 'color', 'red']);
                // Directive 1
                activateHostBindings(1);
                (0, styling_1.ɵɵstyleProp)('color', 'white');
                expectTStylingKeys('style').toEqual([
                    // Host Binding 0 + 1
                    ['', 'color', 'color', 'blue', 'content', '"middle"', 'width', '100px'],
                    'both',
                    // RESIDUAL
                    ['color', 'red', 'content', '"TEMPLATE"'],
                ]);
                expectStyle(div).toEqual({ content: '"TEMPLATE"', color: 'red', width: '100px' });
            });
        });
    });
    describe('toStylingArray', () => {
        describe('falsy', () => {
            it('should return empty KeyValueArray', () => {
                expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, '')).toEqual([]);
                expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, null)).toEqual([]);
                expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, undefined)).toEqual([]);
                expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, [])).toEqual([]);
                expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, {})).toEqual([]);
            });
            describe('string', () => {
                it('should parse classes', () => {
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, styling_1.classStringParser, '  ')).toEqual([]);
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, styling_1.classStringParser, ' X A ')).toEqual([
                        'A',
                        true,
                        'X',
                        true,
                    ]);
                });
                it('should parse styles', () => {
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, styling_1.styleStringParser, '  ')).toEqual([]);
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, styling_1.styleStringParser, 'B:b;A:a')).toEqual([
                        'A',
                        'a',
                        'B',
                        'b',
                    ]);
                });
            });
            describe('array', () => {
                it('should parse', () => {
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, ['X', 'A'])).toEqual([
                        'A',
                        true,
                        'X',
                        true,
                    ]);
                });
            });
            describe('object', () => {
                it('should parse', () => {
                    expect((0, styling_1.toStylingKeyValueArray)(array_utils_1.keyValueArraySet, null, { X: 'x', A: 'a' })).toEqual([
                        'A',
                        'a',
                        'X',
                        'x',
                    ]);
                });
            });
        });
    });
    describe('TStylingRange', () => {
        const MAX_VALUE = 32767 /* StylingRange.UNSIGNED_MASK */;
        it('should throw on negative values', () => {
            expect(() => (0, styling_2.toTStylingRange)(0, -1)).toThrow();
            expect(() => (0, styling_2.toTStylingRange)(-1, 0)).toThrow();
        });
        it('should throw on overflow', () => {
            expect(() => (0, styling_2.toTStylingRange)(0, MAX_VALUE + 1)).toThrow();
            expect(() => (0, styling_2.toTStylingRange)(MAX_VALUE + 1, 0)).toThrow();
        });
        it('should retrieve the same value which went in just below overflow', () => {
            const range = (0, styling_2.toTStylingRange)(MAX_VALUE, MAX_VALUE);
            expect((0, styling_2.getTStylingRangePrev)(range)).toEqual(MAX_VALUE);
            expect((0, styling_2.getTStylingRangeNext)(range)).toEqual(MAX_VALUE);
        });
        it('should correctly increment', () => {
            let range = (0, styling_2.toTStylingRange)(0, 0);
            for (let i = 0; i <= MAX_VALUE; i++) {
                range = (0, styling_2.setTStylingRangeNext)(range, i);
                range = (0, styling_2.setTStylingRangePrev)(range, i);
                expect((0, styling_2.getTStylingRangeNext)(range)).toEqual(i);
                expect((0, styling_2.getTStylingRangePrev)(range)).toEqual(i);
                if (i == 10) {
                    // Skip the boring stuff in the middle.
                    i = MAX_VALUE - 10;
                }
            }
        });
    });
});
function expectStyle(element) {
    return expect((0, styling_3.getElementStyles)(element));
}
function expectClass(element) {
    return expect((0, styling_3.getElementClasses)(element));
}
function givenTemplateAttrs(tAttrs) {
    const tNode = getTNode();
    tNode.attrs = tAttrs;
    applyTAttributes(tAttrs);
}
function getTNode() {
    return (0, state_1.getLView)()[view_1.TVIEW].firstChild;
}
function getTData() {
    return (0, state_1.getLView)()[view_1.TVIEW].data;
}
class MockDir {
}
function givenDirectiveAttrs(tAttrs) {
    const tNode = getTNode();
    const tData = getTData();
    tNode.directiveStart = getTDataIndexFromDirectiveIndex(0);
    tNode.directiveEnd = getTDataIndexFromDirectiveIndex(tAttrs.length);
    for (let i = 0; i < tAttrs.length; i++) {
        const tAttr = tAttrs[i];
        const directiveDef = (0, definition_1.ɵɵdefineDirective)({ type: MockDir, hostAttrs: tAttr });
        applyTAttributes(directiveDef.hostAttrs);
        tData[getTDataIndexFromDirectiveIndex(i)] = directiveDef;
    }
}
function applyTAttributes(attrs) {
    if (attrs === null)
        return;
    const div = (0, state_1.getLView)()[view_1.HEADER_OFFSET];
    let mode = -1 /* AttributeMarker.ImplicitAttributes */;
    for (let i = 0; i < attrs.length; i++) {
        const item = attrs[i];
        if (typeof item === 'number') {
            mode = item;
        }
        else if (typeof item === 'string') {
            if (mode == -1 /* AttributeMarker.ImplicitAttributes */) {
                div.setAttribute(item, attrs[++i]);
            }
            else if (mode == 1 /* AttributeMarker.Classes */) {
                div.classList.add(item);
            }
            else if (mode == 2 /* AttributeMarker.Styles */) {
                div.style.setProperty(item, attrs[++i]);
            }
        }
    }
}
function activateHostBindings(directiveIndex) {
    const bindingRootIndex = getBindingRootIndexFromDirectiveIndex(directiveIndex);
    const currentDirectiveIndex = getTDataIndexFromDirectiveIndex(directiveIndex);
    (0, state_1.setBindingRootForHostBindings)(bindingRootIndex, currentDirectiveIndex);
}
function getBindingRootIndexFromDirectiveIndex(index) {
    // For simplicity assume that each directive has 10 vars.
    // We need to offset 1 for template, and 1 for expando.
    return view_1.HEADER_OFFSET + (index + 2) * 10;
}
function getTDataIndexFromDirectiveIndex(index) {
    return view_1.HEADER_OFFSET + index + 10; // offset to give template bindings space.
}
function expectTStylingKeys(styling) {
    const tNode = getTNode();
    const tData = getTData();
    const isClassBased = styling === 'class';
    const headIndex = (0, styling_2.getTStylingRangePrev)(isClassBased ? tNode.classBindings : tNode.styleBindings);
    const tStylingKeys = [];
    let index = headIndex;
    let prevIndex = index;
    // rewind to beginning of list.
    while ((prevIndex = (0, styling_2.getTStylingRangePrev)(tData[index + 1])) !== 0) {
        index = prevIndex;
    }
    // insert into array.
    while (index !== 0) {
        const tStylingKey = tData[index];
        const prevDup = (0, styling_2.getTStylingRangePrevDuplicate)(tData[index + 1]);
        const nextDup = (0, styling_2.getTStylingRangeNextDuplicate)(tData[index + 1]);
        tStylingKeys.push(tStylingKey);
        tStylingKeys.push(prevDup ? (nextDup ? 'both' : 'prev') : nextDup ? 'next' : '');
        index = (0, styling_2.getTStylingRangeNext)(tData[index + 1]);
    }
    tStylingKeys.push((isClassBased ? tNode.residualClasses : tNode.residualStyles));
    return expect(tStylingKeys);
}
