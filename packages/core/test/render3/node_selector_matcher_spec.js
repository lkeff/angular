"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tnode_manipulation_1 = require("../../src/render3/tnode_manipulation");
const node_selector_matcher_1 = require("../../src/render3/node_selector_matcher");
function testLStaticData(tagName, attrs) {
    return (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, tagName, attrs);
}
describe('css selector matching', () => {
    function isMatching(tagName, attrsOrTNode, selector) {
        const tNode = !attrsOrTNode || Array.isArray(attrsOrTNode)
            ? (0, tnode_manipulation_1.createTNode)(null, null, 2 /* TNodeType.Element */, 0, tagName, attrsOrTNode)
            : attrsOrTNode;
        return (0, node_selector_matcher_1.isNodeMatchingSelector)(tNode, selector, true);
    }
    describe('isNodeMatchingSimpleSelector', () => {
        describe('element matching', () => {
            it('should match element name only if names are the same', () => {
                expect(isMatching('span', null, ['span'])).toBeTruthy(`Selector 'span' should match <span>`);
                expect(isMatching('span', null, ['div'])).toBeFalsy(`Selector 'div' should NOT match <span>`);
            });
            /**
             * We assume that compiler will lower-case tag names both in node
             * and in a selector.
             */
            it('should match element name case-sensitively', () => {
                expect(isMatching('span', null, ['SPAN'])).toBeFalsy(`Selector 'SPAN' should NOT match <span>`);
                expect(isMatching('SPAN', null, ['span'])).toBeFalsy(`Selector 'span' should NOT match <SPAN>'`);
            });
            it('should never match empty string selector', () => {
                expect(isMatching('span', null, [''])).toBeFalsy(`Selector '' should NOT match <span>`);
            });
        });
        describe('attributes matching', () => {
            // TODO: do we need to differentiate no value and empty value? that is: title vs. title="" ?
            it('should match single attribute without value', () => {
                expect(isMatching('span', ['title', ''], ['', 'title', ''])).toBeTruthy(`Selector '[title]' should match <span title>`);
                expect(isMatching('span', ['title', 'my title'], ['', 'title', ''])).toBeTruthy(`Selector '[title]' should match <span title="my title">`);
                expect(isMatching('span', ['name', 'name'], ['', 'title', ''])).toBeFalsy(`Selector '[title]' should NOT match <span name="name">`);
                expect(isMatching('span', null, ['', 'title', ''])).toBeFalsy(`Selector '[title]' should NOT match <span>`);
                expect(isMatching('span', ['title', ''], ['', 'other', ''])).toBeFalsy(`Selector '[other]' should NOT match <span title="">'`);
            });
            // TODO: this case will not work, need more discussion
            // https://github.com/angular/angular/pull/34625#discussion_r401791275
            xit('should match namespaced attributes', () => {
                expect(isMatching('span', [0 /* AttributeMarker.NamespaceURI */, 'http://some/uri', 'title', 'name'], ['', 'title', ''])).toBeTruthy();
            });
            it('should match selector with one attribute without value when element has several attributes', () => {
                expect(isMatching('span', ['id', 'my_id', 'title', 'test_title'], ['', 'title', ''])).toBeTruthy(`Selector '[title]' should match <span id="my_id" title="test_title">`);
            });
            /**
             * We assume that compiler will lower-case all selectors when generating code
             */
            it('should match single attribute with value', () => {
                expect(isMatching('span', ['title', 'My Title'], ['', 'title', 'my title'])).toBeTruthy(`Selector '[title="My Title"]' should match <span title="My Title">'`);
                expect(isMatching('span', ['title', 'My Title'], ['', 'title', 'other title'])).toBeFalsy(`Selector '[title="Other Title"]' should NOT match <span title="My Title">`);
            });
            it('should not match attribute when element name does not match', () => {
                expect(isMatching('span', ['title', 'My Title'], ['div', 'title', ''])).toBeFalsy(`Selector 'div[title]' should NOT match <span title="My Title">`);
                expect(isMatching('span', ['title', 'My Title'], ['div', 'title', 'my title'])).toBeFalsy(`Selector 'div[title="My Title"]' should NOT match <span title="My Title">`);
            });
            it('should match multiple attributes', () => {
                // selector: '[title=title][name=name]'
                const selector = ['', 'title', 'title', 'name', 'name'];
                // <span title="title" name="name">
                expect(isMatching('span', ['title', 'title', 'name', 'name'], selector)).toBeTruthy(`Selector '[title=title][name=name]' should NOT match <span title="title" name="name">`);
                // <span title="title">
                expect(isMatching('span', ['title', 'title'], selector)).toBeFalsy(`Selector '[title=title][name=name]' should NOT match <span title="title">`);
                // <span name="name">
                expect(isMatching('span', ['name', 'name'], selector)).toBeFalsy(`Selector '[title=title][name=name]' should NOT match <span name="name">`);
            });
            it('should handle attribute values that match attribute names', () => {
                // selector: [name=name]
                const selector = ['', 'name', 'name'];
                // <span title="name">
                expect(isMatching('span', ['title', 'name'], selector)).toBeFalsy(`Selector '[name=name]' should NOT match <span title="name">`);
                // <span title="name" name="name">
                expect(isMatching('span', ['title', 'name', 'name', 'name'], selector)).toBeTruthy(`Selector '[name=name]' should match <span title="name" name="name">`);
            });
            /**
             * We assume that compiler will lower-case all selectors and attribute names when generating
             * code
             */
            it('should match attribute name case-sensitively', () => {
                expect(isMatching('span', ['foo', ''], ['', 'foo', ''])).toBeTruthy(`Selector '[foo]' should match <span foo>`);
                expect(isMatching('span', ['foo', ''], ['', 'Foo', ''])).toBeFalsy(`Selector '[Foo]' should NOT match <span foo>`);
            });
            it('should match attribute values case-insensitively', () => {
                expect(isMatching('span', ['foo', 'Bar'], ['', 'foo', 'bar'])).toBeTruthy(`Selector '[foo="bar"]' should match <span foo="Bar">`);
            });
            it('should match class as an attribute', () => {
                expect(isMatching('span', ['class', 'foo'], ['', 'class', ''])).toBeTruthy(`Selector '[class]' should match <span class="foo">`);
                expect(isMatching('span', ['class', 'foo'], ['', 'class', 'foo'])).toBeTruthy(`Selector '[class="foo"]' should match <span class="foo">`);
            });
            it('should take optional binding attribute names into account', () => {
                expect(isMatching('span', [3 /* AttributeMarker.Bindings */, 'directive'], ['', 'directive', ''])).toBeTruthy(`Selector '[directive]' should match <span [directive]="exp">`);
            });
            it('should not match optional binding attribute names if attribute selector has value', () => {
                expect(isMatching('span', [3 /* AttributeMarker.Bindings */, 'directive'], ['', 'directive', 'value'])).toBeFalsy(`Selector '[directive=value]' should not match <span [directive]="exp">`);
            });
            it('should not match optional binding attribute names if attribute selector has value and next name equals to value', () => {
                expect(isMatching('span', [3 /* AttributeMarker.Bindings */, 'directive', 'value'], ['', 'directive', 'value'])).toBeFalsy(`Selector '[directive=value]' should not match <span [directive]="exp" [value]="otherExp">`);
            });
            it('should match bound attributes that come after classes', () => {
                expect(isMatching('span', [
                    1 /* AttributeMarker.Classes */,
                    'my-class',
                    'other-class',
                    3 /* AttributeMarker.Bindings */,
                    'title',
                    'directive',
                ], ['', 'directive', ''])).toBeTruthy(`Selector '[directive]' should match <span class="my-class other-class" [title]="title" [directive]="exp">`);
            });
            it('should match NOT match classes when looking for directives', () => {
                expect(isMatching('span', [
                    1 /* AttributeMarker.Classes */,
                    'directive',
                    'other-class',
                    3 /* AttributeMarker.Bindings */,
                    'title',
                ], ['', 'directive', ''])).toBeFalsy(`Selector '[directive]' should NOT match <span class="directive other-class" [title]="title">`);
            });
        });
        describe('class matching', () => {
            it('should match with a class selector when an element has multiple classes', () => {
                expect(isMatching('span', ['class', 'foo bar'], ['', 8 /* SelectorFlags.CLASS */, 'foo'])).toBeTruthy(`Selector '.foo' should match <span class="foo bar">`);
                expect(isMatching('span', ['class', 'foo bar'], ['', 8 /* SelectorFlags.CLASS */, 'bar'])).toBeTruthy(`Selector '.bar' should match <span class="foo bar">`);
                expect(isMatching('span', ['class', 'foo bar'], ['', 8 /* SelectorFlags.CLASS */, 'baz'])).toBeFalsy(`Selector '.baz' should NOT match <span class="foo bar">`);
            });
            it('should not match on partial class name', () => {
                expect(isMatching('span', ['class', 'foobar'], ['', 8 /* SelectorFlags.CLASS */, 'foo'])).toBeFalsy(`Selector '.foo' should NOT match <span class="foobar">`);
                expect(isMatching('span', ['class', 'foobar'], ['', 8 /* SelectorFlags.CLASS */, 'bar'])).toBeFalsy(`Selector '.bar' should NOT match <span class="foobar">`);
                expect(isMatching('span', ['class', 'foobar'], ['', 8 /* SelectorFlags.CLASS */, 'ob'])).toBeFalsy(`Selector '.ob' should NOT match <span class="foobar">`);
                expect(isMatching('span', ['class', 'foobar'], ['', 8 /* SelectorFlags.CLASS */, 'foobar'])).toBeTruthy(`Selector '.foobar' should match <span class="foobar">`);
            });
            it('should support selectors with multiple classes', () => {
                expect(isMatching('span', ['class', 'foo bar'], ['', 8 /* SelectorFlags.CLASS */, 'foo', 'bar'])).toBeTruthy(`Selector '.foo.bar' should match <span class="foo bar">`);
                expect(isMatching('span', ['class', 'foo'], ['', 8 /* SelectorFlags.CLASS */, 'foo', 'bar'])).toBeFalsy(`Selector '.foo.bar' should NOT match <span class="foo">`);
                expect(isMatching('span', ['class', 'bar'], ['', 8 /* SelectorFlags.CLASS */, 'foo', 'bar'])).toBeFalsy(`Selector '.foo.bar' should NOT match <span class="bar">`);
            });
            it('should support selectors with multiple classes regardless of class name order', () => {
                expect(isMatching('span', ['class', 'foo bar'], ['', 8 /* SelectorFlags.CLASS */, 'bar', 'foo'])).toBeTruthy(`Selector '.bar.foo' should match <span class="foo bar">`);
                expect(isMatching('span', ['class', 'bar foo'], ['', 8 /* SelectorFlags.CLASS */, 'foo', 'bar'])).toBeTruthy(`Selector '.foo.bar' should match <span class="bar foo">`);
                expect(isMatching('span', ['class', 'bar foo'], ['', 8 /* SelectorFlags.CLASS */, 'bar', 'foo'])).toBeTruthy(`Selector '.bar.foo' should match <span class="bar foo">`);
            });
            /**
             * We assume that compiler will lower-case all selectors when generating code
             */
            it('should match class name case-insensitively', () => {
                expect(isMatching('span', ['class', 'Foo'], ['', 8 /* SelectorFlags.CLASS */, 'foo'])).toBeTruthy(`Selector '.Foo' should match <span class="Foo">`);
            });
            it('should work without a class attribute', () => {
                // selector: '.foo'
                const selector = ['', 8 /* SelectorFlags.CLASS */, 'foo'];
                // <div title="title">
                expect(isMatching('div', ['title', 'title'], selector)).toBeFalsy(`Selector '.foo' should NOT match <div title="title">`);
                // <div>
                expect(isMatching('div', null, selector)).toBeFalsy(`Selector '.foo' should NOT match <div>`);
            });
            it('should work with elements, attributes, and classes', () => {
                // selector: 'div.foo[title=title]'
                const selector = ['div', 'title', 'title', 8 /* SelectorFlags.CLASS */, 'foo'];
                // <div class="foo" title="title">
                expect(isMatching('div', ['class', 'foo', 'title', 'title'], selector)).toBeTruthy();
                // <div title="title">
                expect(isMatching('div', ['title', 'title'], selector)).toBeFalsy();
                // <div class="foo">
                expect(isMatching('div', ['class', 'foo'], selector)).toBeFalsy();
            });
        });
    });
    describe('negations', () => {
        it('should match when negation part is null', () => {
            expect(isMatching('span', null, ['span'])).toBeTruthy(`Selector 'span' should match <span>`);
        });
        it('should not match when negation part does not match', () => {
            expect(isMatching('span', ['foo', ''], ['', 1 /* SelectorFlags.NOT */ | 4 /* SelectorFlags.ELEMENT */, 'span'])).toBeFalsy(`Selector ':not(span)' should NOT match <span foo="">`);
            expect(isMatching('span', ['foo', ''], ['span', 1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */, 'foo', ''])).toBeFalsy(`Selector 'span:not([foo])' should NOT match <span foo="">`);
        });
        it('should not match negative selector with tag name and attributes', () => {
            // selector: ':not(span[foo])'
            const selector = ['', 1 /* SelectorFlags.NOT */ | 4 /* SelectorFlags.ELEMENT */, 'span', 'foo', ''];
            // <span foo="">
            expect(isMatching('span', ['foo', ''], selector)).toBeFalsy();
            // <span bar="">
            expect(isMatching('span', ['bar', ''], selector)).toBeTruthy();
        });
        it('should not match negative classes', () => {
            // selector: ':not(.foo.bar)'
            const selector = ['', 1 /* SelectorFlags.NOT */ | 8 /* SelectorFlags.CLASS */, 'foo', 'bar'];
            // <span class="foo bar">
            expect(isMatching('span', ['class', 'foo bar'], selector)).toBeFalsy();
            // <span class="foo">
            expect(isMatching('span', ['class', 'foo'], selector)).toBeTruthy();
            // <span class="bar">
            expect(isMatching('span', ['class', 'bar'], selector)).toBeTruthy();
        });
        it('should not match negative selector with classes and attributes', () => {
            // selector: ':not(.baz[title])
            const selector = [
                '',
                1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */,
                'title',
                '',
                8 /* SelectorFlags.CLASS */,
                'baz',
            ];
            // <div class="baz">
            expect(isMatching('div', ['class', 'baz'], selector)).toBeTruthy();
            // <div title="title">
            expect(isMatching('div', ['title', 'title'], selector)).toBeTruthy();
            // <div class="baz" title="title">
            expect(isMatching('div', ['class', 'baz', 'title', 'title'], selector)).toBeFalsy();
        });
        it('should not match negative selector with attribute selector after', () => {
            // selector: ':not(.baz[title]):not([foo])'
            const selector = [
                '',
                1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */,
                'title',
                '',
                8 /* SelectorFlags.CLASS */,
                'baz',
                1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */,
                'foo',
                '',
            ];
            // <div class="baz">
            expect(isMatching('div', ['class', 'baz'], selector)).toBeTruthy();
            // <div class="baz" title="">
            expect(isMatching('div', ['class', 'baz', 'title', ''], selector)).toBeFalsy();
            // <div class="baz" foo="">
            expect(isMatching('div', ['class', 'baz', 'foo', ''], selector)).toBeFalsy();
        });
        it('should not match with multiple negative selectors', () => {
            // selector: ':not(span):not([foo])'
            const selector = [
                '',
                1 /* SelectorFlags.NOT */ | 4 /* SelectorFlags.ELEMENT */,
                'span',
                1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */,
                'foo',
                '',
            ];
            // <div foo="">
            expect(isMatching('div', ['foo', ''], selector)).toBeFalsy();
            // <span bar="">
            expect(isMatching('span', ['bar', ''], selector)).toBeFalsy();
            // <div bar="">
            expect(isMatching('div', ['bar', ''], selector)).toBeTruthy();
        });
        it('should evaluate complex selector with negative selectors', () => {
            // selector: 'div.foo.bar[name=name]:not(.baz):not([title])'
            const selector = [
                'div',
                'name',
                'name',
                8 /* SelectorFlags.CLASS */,
                'foo',
                'bar',
                1 /* SelectorFlags.NOT */ | 2 /* SelectorFlags.ATTRIBUTE */,
                'title',
                '',
                1 /* SelectorFlags.NOT */ | 8 /* SelectorFlags.CLASS */,
                'baz',
            ];
            // <div name="name" class="foo bar">
            expect(isMatching('div', ['name', 'name', 'class', 'foo bar'], selector)).toBeTruthy();
            // <div name="name" class="foo bar baz">
            expect(isMatching('div', ['name', 'name', 'class', 'foo bar baz'], selector)).toBeFalsy();
            // <div name="name" title class="foo bar">
            expect(isMatching('div', ['name', 'name', 'title', '', 'class', 'foo bar'], selector)).toBeFalsy();
        });
    });
    describe('isNodeMatchingSelectorList', () => {
        function isAnyMatching(tagName, attrs, selector) {
            return (0, node_selector_matcher_1.isNodeMatchingSelectorList)(testLStaticData(tagName, attrs), selector, false);
        }
        it('should match when there is only one simple selector without negations', () => {
            expect(isAnyMatching('span', null, [['span']])).toBeTruthy(`Selector 'span' should match <span>`);
            expect(isAnyMatching('span', null, [['div']])).toBeFalsy(`Selector 'div' should NOT match <span>`);
        });
        it('should match when there are multiple parts and only one is matching', () => {
            expect(isAnyMatching('span', ['foo', 'bar'], [['div'], ['', 'foo', 'bar']])).toBeTruthy(`Selector 'div, [foo=bar]' should match <span foo="bar">`);
        });
        it('should not match when there are multiple parts and none is matching', () => {
            expect(isAnyMatching('span', ['foo', 'bar'], [['div'], ['', 'foo', 'baz']])).toBeFalsy(`Selector 'div, [foo=baz]' should NOT match <span foo="bar">`);
        });
    });
    describe('reading the ngProjectAs attribute value', function () {
        function testTNode(attrs) {
            return testLStaticData('tag', attrs);
        }
        it('should get ngProjectAs value if present', function () {
            expect((0, node_selector_matcher_1.getProjectAsAttrValue)(testTNode([5 /* AttributeMarker.ProjectAs */, ['tag', 'foo', 'bar']]))).toEqual(['tag', 'foo', 'bar']);
        });
        it('should return null if there are no attributes', function () {
            expect((0, node_selector_matcher_1.getProjectAsAttrValue)(testTNode(null))).toBe(null);
        });
        it('should return if ngProjectAs is not present', function () {
            expect((0, node_selector_matcher_1.getProjectAsAttrValue)(testTNode(['foo', 'bar']))).toBe(null);
        });
        it('should not accidentally identify ngProjectAs in attribute values', function () {
            expect((0, node_selector_matcher_1.getProjectAsAttrValue)(testTNode(['foo', 5 /* AttributeMarker.ProjectAs */]))).toBe(null);
        });
    });
});
describe('stringifyCSSSelectorList', () => {
    it('should stringify selector with a tag name only', () => {
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button']])).toBe('button');
    });
    it('should stringify selector with attributes', () => {
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['', 'id', '']])).toBe('[id]');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button', 'id', '']])).toBe('button[id]');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button', 'id', 'value']])).toBe('button[id="value"]');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button', 'id', 'value', 'title', 'other']])).toBe('button[id="value"][title="other"]');
    });
    it('should stringify selector with class names', () => {
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['', 8 /* SelectorFlags.CLASS */, 'foo']])).toBe('.foo');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button', 8 /* SelectorFlags.CLASS */, 'foo']])).toBe('button.foo');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['button', 8 /* SelectorFlags.CLASS */, 'foo', 'bar']])).toBe('button.foo.bar');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['button', 'id', 'value', 'title', 'other', 8 /* SelectorFlags.CLASS */, 'foo', 'bar'],
        ])).toBe('button[id="value"][title="other"].foo.bar');
    });
    it('should stringify selector with `:not()` rules', () => {
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['', 8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */, 'foo', 'bar']])).toBe(':not(.foo.bar)');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['button', 2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */, 'foo', 'bar'],
        ])).toBe('button:not([foo="bar"])');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([['', 4 /* SelectorFlags.ELEMENT */ | 1 /* SelectorFlags.NOT */, 'foo']])).toBe(':not(foo)');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['span', 8 /* SelectorFlags.CLASS */, 'foo', 8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */, 'bar', 'baz'],
        ])).toBe('span.foo:not(.bar.baz)');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['span', 'id', 'value', 2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */, 'title', 'other'],
        ])).toBe('span[id="value"]:not([title="other"])');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            [
                '',
                8 /* SelectorFlags.CLASS */,
                'bar',
                2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */,
                'foo',
                '',
                4 /* SelectorFlags.ELEMENT */ | 1 /* SelectorFlags.NOT */,
                'div',
            ],
        ])).toBe('.bar:not([foo]):not(div)');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            [
                'div',
                2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */,
                'foo',
                '',
                8 /* SelectorFlags.CLASS */,
                'bar',
                8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */,
                'baz',
            ],
        ])).toBe('div:not([foo].bar):not(.baz)');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            [
                'div',
                4 /* SelectorFlags.ELEMENT */ | 1 /* SelectorFlags.NOT */,
                'p',
                8 /* SelectorFlags.CLASS */,
                'bar',
                8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */,
                'baz',
            ],
        ])).toBe('div:not(p.bar):not(.baz)');
    });
    it('should stringify multiple comma-separated selectors', () => {
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['', 'id', ''],
            ['button', 'id', 'value'],
        ])).toBe('[id],button[id="value"]');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['', 'id', ''],
            ['button', 'id', 'value'],
            ['div', 2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */, 'foo', ''],
        ])).toBe('[id],button[id="value"],div:not([foo])');
        expect((0, node_selector_matcher_1.stringifyCSSSelectorList)([
            ['', 'id', ''],
            ['button', 'id', 'value'],
            ['div', 2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */, 'foo', ''],
            [
                'div',
                4 /* SelectorFlags.ELEMENT */ | 1 /* SelectorFlags.NOT */,
                'p',
                8 /* SelectorFlags.CLASS */,
                'bar',
                8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */,
                'baz',
            ],
        ])).toBe('[id],button[id="value"],div:not([foo]),div:not(p.bar):not(.baz)');
    });
});
describe('extractAttrsAndClassesFromSelector', () => {
    const cases = [
        [['div', '', ''], [], []],
        [
            ['div', 'attr-a', 'a', 'attr-b', 'b', 'attr-c', ''],
            ['attr-a', 'a', 'attr-b', 'b', 'attr-c', ''],
            [],
        ],
        [
            ['div', 'attr-a', 'a', 8 /* SelectorFlags.CLASS */, 'class-a', 'class-b', 'class-c'],
            ['attr-a', 'a'],
            ['class-a', 'class-b', 'class-c'],
        ],
        [
            ['', 'attr-a', 'a', 8 /* SelectorFlags.CLASS */, 'class-a', 2 /* SelectorFlags.ATTRIBUTE */, 'attr-b', 'b'],
            ['attr-a', 'a', 'attr-b', 'b'],
            ['class-a'],
        ],
        [
            [
                '',
                '',
                '',
                2 /* SelectorFlags.ATTRIBUTE */,
                'attr-a',
                'a',
                8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */,
                'class-b',
            ],
            ['attr-a', 'a'],
            [],
        ],
        [
            [
                '',
                '',
                '',
                8 /* SelectorFlags.CLASS */ | 1 /* SelectorFlags.NOT */,
                'class-a',
                2 /* SelectorFlags.ATTRIBUTE */ | 1 /* SelectorFlags.NOT */,
                'attr-b',
                'b',
            ],
            [],
            [],
        ],
    ];
    cases.forEach(([selector, attrs, classes]) => {
        it(`should process ${JSON.stringify(selector)} selector`, () => {
            const extracted = (0, node_selector_matcher_1.extractAttrsAndClassesFromSelector)(selector);
            const cssClassMarker = extracted.indexOf(1 /* AttributeMarker.Classes */);
            const extractedAttrs = cssClassMarker > -1 ? extracted.slice(0, cssClassMarker) : extracted;
            const extractedClasses = cssClassMarker > -1 ? extracted.slice(cssClassMarker + 1) : [];
            expect(extractedAttrs).toEqual(attrs);
            expect(extractedClasses).toEqual(classes);
        });
    });
});
