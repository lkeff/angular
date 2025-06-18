"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const html_tags_1 = require("../../src/ml_parser/html_tags");
const lexer_1 = require("../../src/ml_parser/lexer");
const parse_util_1 = require("../../src/parse_util");
describe('HtmlLexer', () => {
    describe('line/column numbers', () => {
        it('should work without newlines', () => {
            expect(tokenizeAndHumanizeLineColumn('<t>a</t>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '0:2'],
                [5 /* TokenType.TEXT */, '0:3'],
                [3 /* TokenType.TAG_CLOSE */, '0:4'],
                [41 /* TokenType.EOF */, '0:8'],
            ]);
        });
        it('should work with one newline', () => {
            expect(tokenizeAndHumanizeLineColumn('<t>\na</t>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '0:2'],
                [5 /* TokenType.TEXT */, '0:3'],
                [3 /* TokenType.TAG_CLOSE */, '1:1'],
                [41 /* TokenType.EOF */, '1:5'],
            ]);
        });
        it('should work with multiple newlines', () => {
            expect(tokenizeAndHumanizeLineColumn('<t\n>\na</t>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '1:0'],
                [5 /* TokenType.TEXT */, '1:1'],
                [3 /* TokenType.TAG_CLOSE */, '2:1'],
                [41 /* TokenType.EOF */, '2:5'],
            ]);
        });
        it('should work with CR and LF', () => {
            expect(tokenizeAndHumanizeLineColumn('<t\n>\r\na\r</t>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '1:0'],
                [5 /* TokenType.TEXT */, '1:1'],
                [3 /* TokenType.TAG_CLOSE */, '2:1'],
                [41 /* TokenType.EOF */, '2:5'],
            ]);
        });
        it('should skip over leading trivia for source-span start', () => {
            expect(tokenizeAndHumanizeFullStart('<t>\n \t a</t>', { leadingTriviaChars: ['\n', ' ', '\t'] })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0', '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '0:2', '0:2'],
                [5 /* TokenType.TEXT */, '1:3', '0:3'],
                [3 /* TokenType.TAG_CLOSE */, '1:4', '1:4'],
                [41 /* TokenType.EOF */, '1:8', '1:8'],
            ]);
        });
    });
    describe('content ranges', () => {
        it('should only process the text within the range', () => {
            expect(tokenizeAndHumanizeSourceSpans('pre 1\npre 2\npre 3 `line 1\nline 2\nline 3` post 1\n post 2\n post 3', { range: { startPos: 19, startLine: 2, startCol: 7, endPos: 39 } })).toEqual([
                [5 /* TokenType.TEXT */, 'line 1\nline 2\nline 3'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should take into account preceding (non-processed) lines and columns', () => {
            expect(tokenizeAndHumanizeLineColumn('pre 1\npre 2\npre 3 `line 1\nline 2\nline 3` post 1\n post 2\n post 3', { range: { startPos: 19, startLine: 2, startCol: 7, endPos: 39 } })).toEqual([
                [5 /* TokenType.TEXT */, '2:7'],
                [41 /* TokenType.EOF */, '4:6'],
            ]);
        });
    });
    describe('comments', () => {
        it('should parse comments', () => {
            expect(tokenizeAndHumanizeParts('<!--t\ne\rs\r\nt-->')).toEqual([
                [10 /* TokenType.COMMENT_START */],
                [7 /* TokenType.RAW_TEXT */, 't\ne\ns\nt'],
                [11 /* TokenType.COMMENT_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('<!--t\ne\rs\r\nt-->')).toEqual([
                [10 /* TokenType.COMMENT_START */, '<!--'],
                [7 /* TokenType.RAW_TEXT */, 't\ne\rs\r\nt'],
                [11 /* TokenType.COMMENT_END */, '-->'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report <!- without -', () => {
            expect(tokenizeAndHumanizeErrors('<!-a')).toEqual([
                [10 /* TokenType.COMMENT_START */, 'Unexpected character "a"', '0:3'],
            ]);
        });
        it('should report missing end comment', () => {
            expect(tokenizeAndHumanizeErrors('<!--')).toEqual([
                [7 /* TokenType.RAW_TEXT */, 'Unexpected character "EOF"', '0:4'],
            ]);
        });
        it('should accept comments finishing by too many dashes (even number)', () => {
            expect(tokenizeAndHumanizeSourceSpans('<!-- test ---->')).toEqual([
                [10 /* TokenType.COMMENT_START */, '<!--'],
                [7 /* TokenType.RAW_TEXT */, ' test --'],
                [11 /* TokenType.COMMENT_END */, '-->'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should accept comments finishing by too many dashes (odd number)', () => {
            expect(tokenizeAndHumanizeSourceSpans('<!-- test --->')).toEqual([
                [10 /* TokenType.COMMENT_START */, '<!--'],
                [7 /* TokenType.RAW_TEXT */, ' test -'],
                [11 /* TokenType.COMMENT_END */, '-->'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
    });
    describe('doctype', () => {
        it('should parse doctypes', () => {
            expect(tokenizeAndHumanizeParts('<!DOCTYPE html>')).toEqual([
                [18 /* TokenType.DOC_TYPE */, 'DOCTYPE html'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('<!DOCTYPE html>')).toEqual([
                [18 /* TokenType.DOC_TYPE */, '<!DOCTYPE html>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report missing end doctype', () => {
            expect(tokenizeAndHumanizeErrors('<!')).toEqual([
                [18 /* TokenType.DOC_TYPE */, 'Unexpected character "EOF"', '0:2'],
            ]);
        });
    });
    describe('CDATA', () => {
        it('should parse CDATA', () => {
            expect(tokenizeAndHumanizeParts('<![CDATA[t\ne\rs\r\nt]]>')).toEqual([
                [12 /* TokenType.CDATA_START */],
                [7 /* TokenType.RAW_TEXT */, 't\ne\ns\nt'],
                [13 /* TokenType.CDATA_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('<![CDATA[t\ne\rs\r\nt]]>')).toEqual([
                [12 /* TokenType.CDATA_START */, '<![CDATA['],
                [7 /* TokenType.RAW_TEXT */, 't\ne\rs\r\nt'],
                [13 /* TokenType.CDATA_END */, ']]>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report <![ without CDATA[', () => {
            expect(tokenizeAndHumanizeErrors('<![a')).toEqual([
                [12 /* TokenType.CDATA_START */, 'Unexpected character "a"', '0:3'],
            ]);
        });
        it('should report missing end cdata', () => {
            expect(tokenizeAndHumanizeErrors('<![CDATA[')).toEqual([
                [7 /* TokenType.RAW_TEXT */, 'Unexpected character "EOF"', '0:9'],
            ]);
        });
    });
    describe('open tags', () => {
        it('should parse open tags without prefix', () => {
            expect(tokenizeAndHumanizeParts('<test>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'test'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse namespace prefix', () => {
            expect(tokenizeAndHumanizeParts('<ns1:test>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, 'ns1', 'test'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse void tags', () => {
            expect(tokenizeAndHumanizeParts('<test/>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'test'],
                [2 /* TokenType.TAG_OPEN_END_VOID */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should allow whitespace after the tag name', () => {
            expect(tokenizeAndHumanizeParts('<test >')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'test'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('<test>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<test'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        describe('tags', () => {
            it('terminated with EOF', () => {
                expect(tokenizeAndHumanizeSourceSpans('<div')).toEqual([
                    [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<div'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('after tag name', () => {
                expect(tokenizeAndHumanizeSourceSpans('<div<span><div</span>')).toEqual([
                    [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<div'],
                    [0 /* TokenType.TAG_OPEN_START */, '<span'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<div'],
                    [3 /* TokenType.TAG_CLOSE */, '</span>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('in attribute', () => {
                expect(tokenizeAndHumanizeSourceSpans('<div class="hi" sty<span></span>')).toEqual([
                    [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<div'],
                    [14 /* TokenType.ATTR_NAME */, 'class'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'hi'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, 'sty'],
                    [0 /* TokenType.TAG_OPEN_START */, '<span'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [3 /* TokenType.TAG_CLOSE */, '</span>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('after quote', () => {
                expect(tokenizeAndHumanizeSourceSpans('<div "<span></span>')).toEqual([
                    [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<div'],
                    [5 /* TokenType.TEXT */, '"'],
                    [0 /* TokenType.TAG_OPEN_START */, '<span'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [3 /* TokenType.TAG_CLOSE */, '</span>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
        });
        describe('component tags', () => {
            const options = { selectorlessEnabled: true };
            it('should parse a basic component tag', () => {
                expect(tokenizeAndHumanizeParts('<MyComp>hello</MyComp>', options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', '', ''],
                    [34 /* TokenType.COMPONENT_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [36 /* TokenType.COMPONENT_CLOSE */, 'MyComp', '', ''],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a component tag with a tag name', () => {
                expect(tokenizeAndHumanizeParts('<MyComp:button>hello</MyComp:button>', options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', '', 'button'],
                    [34 /* TokenType.COMPONENT_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [36 /* TokenType.COMPONENT_CLOSE */, 'MyComp', '', 'button'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a component tag with a tag name and namespace', () => {
                expect(tokenizeAndHumanizeParts('<MyComp:svg:title>hello</MyComp:svg:title>', options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', 'svg', 'title'],
                    [34 /* TokenType.COMPONENT_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [36 /* TokenType.COMPONENT_CLOSE */, 'MyComp', 'svg', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a self-closing component tag', () => {
                expect(tokenizeAndHumanizeParts('<MyComp/>', options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', '', ''],
                    [35 /* TokenType.COMPONENT_OPEN_END_VOID */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should produce spans for component tags', () => {
                expect(tokenizeAndHumanizeSourceSpans('<MyComp:svg:title>hello</MyComp:svg:title>', options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, '<MyComp:svg:title'],
                    [34 /* TokenType.COMPONENT_OPEN_END */, '>'],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [36 /* TokenType.COMPONENT_CLOSE */, '</MyComp:svg:title>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('should parse an incomplete component open tag', () => {
                expect(tokenizeAndHumanizeParts('<MyComp:span class="hi" sty<span></span>', options)).toEqual([
                    [37 /* TokenType.INCOMPLETE_COMPONENT_OPEN */, 'MyComp', '', 'span'],
                    [14 /* TokenType.ATTR_NAME */, '', 'class'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'hi'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', 'sty'],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a component tag with raw text', () => {
                expect(tokenizeAndHumanizeParts(`<MyComp:script>t\ne\rs\r\nt</MyComp:script>`, options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', '', 'script'],
                    [34 /* TokenType.COMPONENT_OPEN_END */],
                    [7 /* TokenType.RAW_TEXT */, 't\ne\ns\nt'],
                    [36 /* TokenType.COMPONENT_CLOSE */, 'MyComp', '', 'script'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a component tag with escapable raw text', () => {
                expect(tokenizeAndHumanizeParts(`<MyComp:title>t\ne\rs\r\nt</MyComp:title>`, options)).toEqual([
                    [33 /* TokenType.COMPONENT_OPEN_START */, 'MyComp', '', 'title'],
                    [34 /* TokenType.COMPONENT_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 't\ne\ns\nt'],
                    [36 /* TokenType.COMPONENT_CLOSE */, 'MyComp', '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
        });
        describe('selectorless directives', () => {
            const options = { selectorlessEnabled: true };
            it('should parse a basic directive', () => {
                expect(tokenizeAndHumanizeParts('<div @MyDir></div>', options)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'MyDir'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a directive with parentheses, but no attributes', () => {
                expect(tokenizeAndHumanizeParts('<div @MyDir()></div>', options)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'MyDir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */],
                    [40 /* TokenType.DIRECTIVE_CLOSE */],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a directive with a single attribute without a value', () => {
                expect(tokenizeAndHumanizeParts('<div @MyDir(foo)></div>', options)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'MyDir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */],
                    [14 /* TokenType.ATTR_NAME */, '', 'foo'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a directive with attributes', () => {
                const tokens = tokenizeAndHumanizeParts('<div @MyDir(static="one" [bound]="expr" [(twoWay)]="expr" #ref="name" (click)="handler()")></div>', options);
                expect(tokens).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'MyDir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */],
                    [14 /* TokenType.ATTR_NAME */, '', 'static'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'one'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', '[bound]'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'expr'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', '[(twoWay)]'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'expr'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', '#ref'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'name'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', '(click)'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'handler()'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a directive mixed in with other attributes', () => {
                const tokens = tokenizeAndHumanizeParts('<div before="value" @OneDir([one]="1" two="2") middle @TwoDir @ThreeDir((three)="handleThree()") after="value"></div>', options);
                expect(tokens).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [14 /* TokenType.ATTR_NAME */, '', 'before'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'value'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'OneDir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */],
                    [14 /* TokenType.ATTR_NAME */, '', '[one]'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '1'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', 'two'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '2'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */],
                    [14 /* TokenType.ATTR_NAME */, '', 'middle'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'TwoDir'],
                    [38 /* TokenType.DIRECTIVE_NAME */, 'ThreeDir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */],
                    [14 /* TokenType.ATTR_NAME */, '', '(three)'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'handleThree()'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */],
                    [14 /* TokenType.ATTR_NAME */, '', 'after'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'value'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should not pick up selectorless-like text inside a tag', () => {
                expect(tokenizeAndHumanizeParts('<div>@MyDir()</div>', options)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'MyDir'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should not pick up selectorless-like text inside an attribute', () => {
                expect(tokenizeAndHumanizeParts('<div hello="@MyDir"></div>', options)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [14 /* TokenType.ATTR_NAME */, '', 'hello'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '@MyDir'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should produce spans for directives', () => {
                const tokens = tokenizeAndHumanizeSourceSpans('<div @Empty @NoAttrs() @WithAttr([one]="1" two="2") @WithSimpleAttr(simple)></div>', options);
                expect(tokens).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, '@Empty'],
                    [38 /* TokenType.DIRECTIVE_NAME */, '@NoAttrs'],
                    [39 /* TokenType.DIRECTIVE_OPEN */, '('],
                    [40 /* TokenType.DIRECTIVE_CLOSE */, ')'],
                    [38 /* TokenType.DIRECTIVE_NAME */, '@WithAttr'],
                    [39 /* TokenType.DIRECTIVE_OPEN */, '('],
                    [14 /* TokenType.ATTR_NAME */, '[one]'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '1'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, 'two'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '2'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */, ')'],
                    [38 /* TokenType.DIRECTIVE_NAME */, '@WithSimpleAttr'],
                    [39 /* TokenType.DIRECTIVE_OPEN */, '('],
                    [14 /* TokenType.ATTR_NAME */, 'simple'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */, ')'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [3 /* TokenType.TAG_CLOSE */, '</div>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('should not capture whitespace in directive spans', () => {
                const tokens = tokenizeAndHumanizeSourceSpans('<div    @Dir   (  one="1"    (two)="handleTwo()"     )     ></div>', options);
                expect(tokens).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<div'],
                    [38 /* TokenType.DIRECTIVE_NAME */, '@Dir'],
                    [39 /* TokenType.DIRECTIVE_OPEN */, '('],
                    [14 /* TokenType.ATTR_NAME */, 'one'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '1'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '(two)'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'handleTwo()'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [40 /* TokenType.DIRECTIVE_CLOSE */, ')'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [3 /* TokenType.TAG_CLOSE */, '</div>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
        });
        describe('escapable raw text', () => {
            it('should parse text', () => {
                expect(tokenizeAndHumanizeParts(`<title>t\ne\rs\r\nt</title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 't\ne\ns\nt'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should detect entities', () => {
                expect(tokenizeAndHumanizeParts(`<title>&amp;</title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, ''],
                    [9 /* TokenType.ENCODED_ENTITY */, '&', '&amp;'],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, ''],
                    [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should ignore other opening tags', () => {
                expect(tokenizeAndHumanizeParts(`<title>a<div></title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a<div>'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should ignore other closing tags', () => {
                expect(tokenizeAndHumanizeParts(`<title>a</test></title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a</test>'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should store the locations', () => {
                expect(tokenizeAndHumanizeSourceSpans(`<title>a</title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<title'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a'],
                    [3 /* TokenType.TAG_CLOSE */, '</title>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
        });
        describe('parsable data', () => {
            it('should parse an SVG <title> tag', () => {
                expect(tokenizeAndHumanizeParts(`<svg:title>test</svg:title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, 'svg', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'test'],
                    [3 /* TokenType.TAG_CLOSE */, 'svg', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an SVG <title> tag with children', () => {
                expect(tokenizeAndHumanizeParts(`<svg:title><f>test</f></svg:title>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, 'svg', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'f'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'test'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'f'],
                    [3 /* TokenType.TAG_CLOSE */, 'svg', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
        });
        describe('expansion forms', () => {
            it('should parse an expansion form', () => {
                expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four} =5 {five} foo {bar} }', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'four'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=5'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'five'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, 'foo'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'bar'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an expansion form with text elements surrounding it', () => {
                expect(tokenizeAndHumanizeParts('before{one.two, three, =4 {four}}after', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [5 /* TokenType.TEXT */, 'before'],
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'four'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [5 /* TokenType.TEXT */, 'after'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an expansion form as a tag single child', () => {
                expect(tokenizeAndHumanizeParts('<div><span>{a, b, =4 {c}}</span></div>', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'a'],
                    [7 /* TokenType.RAW_TEXT */, 'b'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'c'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an expansion form with whitespace surrounding it', () => {
                expect(tokenizeAndHumanizeParts('<div><span> {a, b, =4 {c}} </span></div>', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, ' '],
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'a'],
                    [7 /* TokenType.RAW_TEXT */, 'b'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'c'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [5 /* TokenType.TEXT */, ' '],
                    [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an expansion forms with elements in it', () => {
                expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four <b>a</b>}}', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'four '],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'b'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'a'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'b'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an expansion forms containing an interpolation', () => {
                expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four {{a}}}}', {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'four '],
                    [8 /* TokenType.INTERPOLATION */, '{{', 'a', '}}'],
                    [5 /* TokenType.TEXT */, ''],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse nested expansion forms', () => {
                expect(tokenizeAndHumanizeParts(`{one.two, three, =4 { {xx, yy, =x {one}} }}`, {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'xx'],
                    [7 /* TokenType.RAW_TEXT */, 'yy'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=x'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'one'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [5 /* TokenType.TEXT */, ' '],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            describe('[line ending normalization', () => {
                describe('{escapedString: true}', () => {
                    it('should normalize line-endings in expansion forms if `i18nNormalizeLineEndingsInICUs` is true', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `    messages.length,\r\n` +
                            `    plural,\r\n` +
                            `    =0 {You have \r\nno\r\n messages}\r\n` +
                            `    =1 {One {{message}}}}\r\n`, {
                            tokenizeExpansionForms: true,
                            escapedString: true,
                            i18nNormalizeLineEndingsInICUs: true,
                        });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\n    messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'One '],
                            [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                            [5 /* TokenType.TEXT */, ''],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n'],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions).toEqual([]);
                    });
                    it('should not normalize line-endings in ICU expressions when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `    messages.length,\r\n` +
                            `    plural,\r\n` +
                            `    =0 {You have \r\nno\r\n messages}\r\n` +
                            `    =1 {One {{message}}}}\r\n`, { tokenizeExpansionForms: true, escapedString: true });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n    messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'One '],
                            [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                            [5 /* TokenType.TEXT */, ''],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n'],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions.length).toBe(1);
                        expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n    messages.length');
                    });
                    it('should not normalize line endings in nested expansion forms when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `  messages.length, plural,\r\n` +
                            `  =0 { zero \r\n` +
                            `       {\r\n` +
                            `         p.gender, select,\r\n` +
                            `         male {m}\r\n` +
                            `       }\r\n` +
                            `     }\r\n` +
                            `}`, { tokenizeExpansionForms: true, escapedString: true });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n  messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'zero \n       '],
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n         p.gender'],
                            [7 /* TokenType.RAW_TEXT */, 'select'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, 'male'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'm'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n     '],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions.length).toBe(2);
                        expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n  messages.length');
                        expect(result.nonNormalizedIcuExpressions[1].sourceSpan.toString()).toEqual('\r\n         p.gender');
                    });
                });
                describe('{escapedString: false}', () => {
                    it('should normalize line-endings in expansion forms if `i18nNormalizeLineEndingsInICUs` is true', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `    messages.length,\r\n` +
                            `    plural,\r\n` +
                            `    =0 {You have \r\nno\r\n messages}\r\n` +
                            `    =1 {One {{message}}}}\r\n`, {
                            tokenizeExpansionForms: true,
                            escapedString: false,
                            i18nNormalizeLineEndingsInICUs: true,
                        });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\n    messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'One '],
                            [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                            [5 /* TokenType.TEXT */, ''],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n'],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions).toEqual([]);
                    });
                    it('should not normalize line-endings in ICU expressions when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `    messages.length,\r\n` +
                            `    plural,\r\n` +
                            `    =0 {You have \r\nno\r\n messages}\r\n` +
                            `    =1 {One {{message}}}}\r\n`, { tokenizeExpansionForms: true, escapedString: false });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n    messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'One '],
                            [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                            [5 /* TokenType.TEXT */, ''],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n'],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions.length).toBe(1);
                        expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n    messages.length');
                    });
                    it('should not normalize line endings in nested expansion forms when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                        const result = tokenizeWithoutErrors(`{\r\n` +
                            `  messages.length, plural,\r\n` +
                            `  =0 { zero \r\n` +
                            `       {\r\n` +
                            `         p.gender, select,\r\n` +
                            `         male {m}\r\n` +
                            `       }\r\n` +
                            `     }\r\n` +
                            `}`, { tokenizeExpansionForms: true });
                        expect(humanizeParts(result.tokens)).toEqual([
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n  messages.length'],
                            [7 /* TokenType.RAW_TEXT */, 'plural'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'zero \n       '],
                            [19 /* TokenType.EXPANSION_FORM_START */],
                            [7 /* TokenType.RAW_TEXT */, '\r\n         p.gender'],
                            [7 /* TokenType.RAW_TEXT */, 'select'],
                            [20 /* TokenType.EXPANSION_CASE_VALUE */, 'male'],
                            [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                            [5 /* TokenType.TEXT */, 'm'],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [5 /* TokenType.TEXT */, '\n     '],
                            [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                            [23 /* TokenType.EXPANSION_FORM_END */],
                            [41 /* TokenType.EOF */],
                        ]);
                        expect(result.nonNormalizedIcuExpressions.length).toBe(2);
                        expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n  messages.length');
                        expect(result.nonNormalizedIcuExpressions[1].sourceSpan.toString()).toEqual('\r\n         p.gender');
                    });
                });
            });
        });
        describe('errors', () => {
            it('should report unescaped "{" on error', () => {
                expect(tokenizeAndHumanizeErrors(`<p>before { after</p>`, { tokenizeExpansionForms: true })).toEqual([
                    [
                        7 /* TokenType.RAW_TEXT */,
                        `Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`,
                        '0:21',
                    ],
                ]);
            });
            it('should report unescaped "{" as an error, even after a prematurely terminated interpolation', () => {
                expect(tokenizeAndHumanizeErrors(`<code>{{b}<!---->}</code><pre>import {a} from 'a';</pre>`, {
                    tokenizeExpansionForms: true,
                })).toEqual([
                    [
                        7 /* TokenType.RAW_TEXT */,
                        `Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`,
                        '0:56',
                    ],
                ]);
            });
            it('should include 2 lines of context in message', () => {
                const src = '111\n222\n333\nE\n444\n555\n666\n';
                const file = new parse_util_1.ParseSourceFile(src, 'file://');
                const location = new parse_util_1.ParseLocation(file, 12, 123, 456);
                const span = new parse_util_1.ParseSourceSpan(location, location);
                const error = new lexer_1.TokenError('**ERROR**', null, span);
                expect(error.toString()).toEqual(`**ERROR** ("\n222\n333\n[ERROR ->]E\n444\n555\n"): file://@123:456`);
            });
        });
        describe('unicode characters', () => {
            it('should support unicode characters', () => {
                expect(tokenizeAndHumanizeSourceSpans(`<p>İ</p>`)).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<p'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [5 /* TokenType.TEXT */, 'İ'],
                    [3 /* TokenType.TAG_CLOSE */, '</p>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
        });
        describe('(processing escaped strings)', () => {
            it('should unescape standard escape sequences', () => {
                expect(tokenizeAndHumanizeParts("\\' \\' \\'", { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, "' ' '"],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\" \\" \\"', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '" " "'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\` \\` \\`', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '` ` `'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\\\ \\\\ \\\\', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\\ \\ \\'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\n \\n \\n', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\n \n \n'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\r{{\\r}}\\r', { escapedString: true })).toEqual([
                    // post processing converts `\r` to `\n`
                    [5 /* TokenType.TEXT */, '\n'],
                    [8 /* TokenType.INTERPOLATION */, '{{', '\n', '}}'],
                    [5 /* TokenType.TEXT */, '\n'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\v \\v \\v', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\v \v \v'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\t \\t \\t', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\t \t \t'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\b \\b \\b', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\b \b \b'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\f \\f \\f', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\f \f \f'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\\' \\" \\` \\\\ \\n \\r \\v \\t \\b \\f', {
                    escapedString: true,
                })).toEqual([[5 /* TokenType.TEXT */, '\' " ` \\ \n \n \v \t \b \f'], [41 /* TokenType.EOF */]]);
            });
            it('should unescape null sequences', () => {
                expect(tokenizeAndHumanizeParts('\\0', { escapedString: true })).toEqual([[41 /* TokenType.EOF */]]);
                // \09 is not an octal number so the \0 is taken as EOF
                expect(tokenizeAndHumanizeParts('\\09', { escapedString: true })).toEqual([[41 /* TokenType.EOF */]]);
            });
            it('should unescape octal sequences', () => {
                // \19 is read as an octal `\1` followed by a normal char `9`
                // \1234 is read as an octal `\123` followed by a normal char `4`
                // \999 is not an octal number so its backslash just gets removed.
                expect(tokenizeAndHumanizeParts('\\001 \\01 \\1 \\12 \\223 \\19 \\2234 \\999', {
                    escapedString: true,
                })).toEqual([[5 /* TokenType.TEXT */, '\x01 \x01 \x01 \x0A \x93 \x019 \x934 999'], [41 /* TokenType.EOF */]]);
            });
            it('should unescape hex sequences', () => {
                expect(tokenizeAndHumanizeParts('\\x12 \\x4F \\xDC', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\x12 \x4F \xDC'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should report an error on an invalid hex sequence', () => {
                expect(tokenizeAndHumanizeErrors('\\xGG', { escapedString: true })).toEqual([
                    [null, 'Invalid hexadecimal escape sequence', '0:2'],
                ]);
                expect(tokenizeAndHumanizeErrors('abc \\x xyz', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'Invalid hexadecimal escape sequence', '0:6'],
                ]);
                expect(tokenizeAndHumanizeErrors('abc\\x', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'Unexpected character "EOF"', '0:5'],
                ]);
            });
            it('should unescape fixed length Unicode sequences', () => {
                expect(tokenizeAndHumanizeParts('\\u0123 \\uABCD', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, '\u0123 \uABCD'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should error on an invalid fixed length Unicode sequence', () => {
                expect(tokenizeAndHumanizeErrors('\\uGGGG', { escapedString: true })).toEqual([
                    [null, 'Invalid hexadecimal escape sequence', '0:2'],
                ]);
            });
            it('should unescape variable length Unicode sequences', () => {
                expect(tokenizeAndHumanizeParts('\\u{01} \\u{ABC} \\u{1234} \\u{123AB}', { escapedString: true })).toEqual([[5 /* TokenType.TEXT */, '\u{01} \u{ABC} \u{1234} \u{123AB}'], [41 /* TokenType.EOF */]]);
            });
            it('should error on an invalid variable length Unicode sequence', () => {
                expect(tokenizeAndHumanizeErrors('\\u{GG}', { escapedString: true })).toEqual([
                    [null, 'Invalid hexadecimal escape sequence', '0:3'],
                ]);
            });
            it('should unescape line continuations', () => {
                expect(tokenizeAndHumanizeParts('abc\\\ndef', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'abcdef'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('\\\nx\\\ny\\\n', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'xy'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should remove backslash from "non-escape" sequences', () => {
                expect(tokenizeAndHumanizeParts('a g ~', { escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'a g ~'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should unescape sequences in plain text', () => {
                expect(tokenizeAndHumanizeParts('abc\ndef\\nghi\\tjkl\\`\\\'\\"mno', { escapedString: true })).toEqual([[5 /* TokenType.TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'], [41 /* TokenType.EOF */]]);
            });
            it('should unescape sequences in raw text', () => {
                expect(tokenizeAndHumanizeParts('<script>abc\ndef\\nghi\\tjkl\\`\\\'\\"mno</script>', {
                    escapedString: true,
                })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [7 /* TokenType.RAW_TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should unescape sequences in escapable raw text', () => {
                expect(tokenizeAndHumanizeParts('<title>abc\ndef\\nghi\\tjkl\\`\\\'\\"mno</title>', {
                    escapedString: true,
                })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse over escape sequences in tag definitions', () => {
                expect(tokenizeAndHumanizeParts('<t a=\\"b\\" \\n c=\\\'d\\\'>', { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [14 /* TokenType.ATTR_NAME */, '', 'a'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', 'c'],
                    [15 /* TokenType.ATTR_QUOTE */, "'"],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'd'],
                    [15 /* TokenType.ATTR_QUOTE */, "'"],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse over escaped new line in tag definitions', () => {
                const text = '<t\\n></t>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse over escaped characters in tag definitions', () => {
                const text = '<t\u{000013}></t>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should unescape characters in tag names', () => {
                const text = '<t\\x64></t\\x64>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'td'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'td'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeSourceSpans(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<t\\x64'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [3 /* TokenType.TAG_CLOSE */, '</t\\x64>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('should unescape characters in attributes', () => {
                const text = '<t \\x64="\\x65"></t>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [14 /* TokenType.ATTR_NAME */, '', 'd'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'e'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse over escaped new line in attribute values', () => {
                const text = '<t a=b\\n></t>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [14 /* TokenType.ATTR_NAME */, '', 'a'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should tokenize the correct span when there are escape sequences', () => {
                const text = 'selector: "app-root",\ntemplate: "line 1\\n\\"line 2\\"\\nline 3",\ninputs: []';
                const range = {
                    startPos: 33,
                    startLine: 1,
                    startCol: 10,
                    endPos: 59,
                };
                expect(tokenizeAndHumanizeParts(text, { range, escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'line 1\n"line 2"\nline 3'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeSourceSpans(text, { range, escapedString: true })).toEqual([
                    [5 /* TokenType.TEXT */, 'line 1\\n\\"line 2\\"\\nline 3'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
            it('should account for escape sequences when computing source spans ', () => {
                const text = '<t>line 1</t>\n' + // <- unescaped line break
                    '<t>line 2</t>\\n' + // <- escaped line break
                    '<t>line 3\\\n' + // <- line continuation
                    '</t>';
                expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'line 1'],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [5 /* TokenType.TEXT */, '\n'],
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'line 2'],
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [5 /* TokenType.TEXT */, '\n'],
                    [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'line 3'], // <- line continuation does not appear in token
                    [3 /* TokenType.TAG_CLOSE */, '', 't'],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeLineColumn(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                    [1 /* TokenType.TAG_OPEN_END */, '0:2'],
                    [5 /* TokenType.TEXT */, '0:3'],
                    [3 /* TokenType.TAG_CLOSE */, '0:9'],
                    [5 /* TokenType.TEXT */, '0:13'], // <- real newline increments the row
                    [0 /* TokenType.TAG_OPEN_START */, '1:0'],
                    [1 /* TokenType.TAG_OPEN_END */, '1:2'],
                    [5 /* TokenType.TEXT */, '1:3'],
                    [3 /* TokenType.TAG_CLOSE */, '1:9'],
                    [5 /* TokenType.TEXT */, '1:13'], // <- escaped newline does not increment the row
                    [0 /* TokenType.TAG_OPEN_START */, '1:15'],
                    [1 /* TokenType.TAG_OPEN_END */, '1:17'],
                    [5 /* TokenType.TEXT */, '1:18'], // <- the line continuation increments the row
                    [3 /* TokenType.TAG_CLOSE */, '2:0'],
                    [41 /* TokenType.EOF */, '2:4'],
                ]);
                expect(tokenizeAndHumanizeSourceSpans(text, { escapedString: true })).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '<t'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [5 /* TokenType.TEXT */, 'line 1'],
                    [3 /* TokenType.TAG_CLOSE */, '</t>'],
                    [5 /* TokenType.TEXT */, '\n'],
                    [0 /* TokenType.TAG_OPEN_START */, '<t'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [5 /* TokenType.TEXT */, 'line 2'],
                    [3 /* TokenType.TAG_CLOSE */, '</t>'],
                    [5 /* TokenType.TEXT */, '\\n'],
                    [0 /* TokenType.TAG_OPEN_START */, '<t'],
                    [1 /* TokenType.TAG_OPEN_END */, '>'],
                    [5 /* TokenType.TEXT */, 'line 3\\\n'],
                    [3 /* TokenType.TAG_CLOSE */, '</t>'],
                    [41 /* TokenType.EOF */, ''],
                ]);
            });
        });
        describe('blocks', () => {
            it('should parse a block without parameters', () => {
                const expected = [
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ];
                expect(tokenizeAndHumanizeParts('@foo {hello}')).toEqual(expected);
                expect(tokenizeAndHumanizeParts('@foo () {hello}')).toEqual(expected);
                expect(tokenizeAndHumanizeParts('@foo(){hello}')).toEqual(expected);
            });
            it('should parse a block with parameters', () => {
                expect(tokenizeAndHumanizeParts('@for (item of items; track item.id) {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'track item.id'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block with a trailing semicolon after the parameters', () => {
                expect(tokenizeAndHumanizeParts('@for (item of items;) {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block with a space in its name', () => {
                expect(tokenizeAndHumanizeParts('@else if {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'else if'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
                expect(tokenizeAndHumanizeParts('@else if (foo !== 2) {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'else if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'foo !== 2'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block with an arbitrary amount of spaces around the parentheses', () => {
                const expected = [
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'a'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'b'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'c'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ];
                expect(tokenizeAndHumanizeParts('@foo(a; b; c){hello}')).toEqual(expected);
                expect(tokenizeAndHumanizeParts('@foo      (a; b; c)      {hello}')).toEqual(expected);
                expect(tokenizeAndHumanizeParts('@foo(a; b; c)      {hello}')).toEqual(expected);
                expect(tokenizeAndHumanizeParts('@foo      (a; b; c){hello}')).toEqual(expected);
            });
            it('should parse a block with multiple trailing semicolons', () => {
                expect(tokenizeAndHumanizeParts('@for (item of items;;;;;) {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block with trailing whitespace', () => {
                expect(tokenizeAndHumanizeParts('@foo                        {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block with no trailing semicolon', () => {
                expect(tokenizeAndHumanizeParts('@for (item of items){hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should handle semicolons, braces and parentheses used in a block parameter', () => {
                const input = `@foo (a === ";"; b === ')'; c === "("; d === '}'; e === "{") {hello}`;
                expect(tokenizeAndHumanizeParts(input)).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [27 /* TokenType.BLOCK_PARAMETER */, `a === ";"`],
                    [27 /* TokenType.BLOCK_PARAMETER */, `b === ')'`],
                    [27 /* TokenType.BLOCK_PARAMETER */, `c === "("`],
                    [27 /* TokenType.BLOCK_PARAMETER */, `d === '}'`],
                    [27 /* TokenType.BLOCK_PARAMETER */, `e === "{"`],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should handle object literals and function calls in block parameters', () => {
                expect(tokenizeAndHumanizeParts(`@foo (on a({a: 1, b: 2}, false, {c: 3}); when b({d: 4})) {hello}`)).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'on a({a: 1, b: 2}, false, {c: 3})'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'when b({d: 4})'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse block with unclosed parameters', () => {
                expect(tokenizeAndHumanizeParts(`@foo (a === b {hello}`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'a === b {hello}'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse block with stray parentheses in the parameter position', () => {
                expect(tokenizeAndHumanizeParts(`@foo a === b) {hello}`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo a'],
                    [5 /* TokenType.TEXT */, '=== b) {hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse @ as an incomplete block', () => {
                expect(tokenizeAndHumanizeParts(`@`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse space followed by @ as an incomplete block', () => {
                expect(tokenizeAndHumanizeParts(` @`)).toEqual([
                    [5 /* TokenType.TEXT */, ' '],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse @ followed by space as an incomplete block', () => {
                expect(tokenizeAndHumanizeParts(`@ `)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [5 /* TokenType.TEXT */, ' '],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse @ followed by newline and text as an incomplete block', () => {
                expect(tokenizeAndHumanizeParts(`@\nfoo`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [5 /* TokenType.TEXT */, '\nfoo'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse incomplete block with no name', () => {
                expect(tokenizeAndHumanizeParts(`foo bar @ baz clink`)).toEqual([
                    [5 /* TokenType.TEXT */, 'foo bar '],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [5 /* TokenType.TEXT */, ' baz clink'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse incomplete block with space, then name', () => {
                expect(tokenizeAndHumanizeParts(`@ if`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, ''],
                    [5 /* TokenType.TEXT */, ' if'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should report invalid quotes in a parameter', () => {
                expect(tokenizeAndHumanizeErrors(`@foo (a === ") {hello}`)).toEqual([
                    [27 /* TokenType.BLOCK_PARAMETER */, 'Unexpected character "EOF"', '0:22'],
                ]);
                expect(tokenizeAndHumanizeErrors(`@foo (a === "hi') {hello}`)).toEqual([
                    [27 /* TokenType.BLOCK_PARAMETER */, 'Unexpected character "EOF"', '0:25'],
                ]);
            });
            it('should report unclosed object literal inside a parameter', () => {
                expect(tokenizeAndHumanizeParts(`@foo ({invalid: true) hello}`)).toEqual([
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo'],
                    [27 /* TokenType.BLOCK_PARAMETER */, '{invalid: true'],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should handle a semicolon used in a nested string inside a block parameter', () => {
                expect(tokenizeAndHumanizeParts(`@if (condition === "';'") {hello}`)).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, `condition === "';'"`],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should handle a semicolon next to an escaped quote used in a block parameter', () => {
                expect(tokenizeAndHumanizeParts('@if (condition === "\\";") {hello}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'condition === "\\";"'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse mixed text and html content in a block', () => {
                expect(tokenizeAndHumanizeParts('@if (a === 1) {foo <b>bar</b> baz}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'a === 1'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'foo '],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'b'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'bar'],
                    [3 /* TokenType.TAG_CLOSE */, '', 'b'],
                    [5 /* TokenType.TEXT */, ' baz'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse HTML tags with attributes containing curly braces inside blocks', () => {
                expect(tokenizeAndHumanizeParts('@if (a === 1) {<div a="}" b="{"></div>}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'a === 1'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [14 /* TokenType.ATTR_NAME */, '', 'a'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '}'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [14 /* TokenType.ATTR_NAME */, '', 'b'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '{'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse HTML tags with attribute containing block syntax', () => {
                expect(tokenizeAndHumanizeParts('<div a="@if (foo) {}"></div>')).toEqual([
                    [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                    [14 /* TokenType.ATTR_NAME */, '', 'a'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [16 /* TokenType.ATTR_VALUE_TEXT */, '@if (foo) {}'],
                    [15 /* TokenType.ATTR_QUOTE */, '"'],
                    [1 /* TokenType.TAG_OPEN_END */],
                    [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse nested blocks', () => {
                expect(tokenizeAndHumanizeParts('@if (a) {' +
                    'hello a' +
                    '@if {' +
                    'hello unnamed' +
                    '@if (b) {' +
                    'hello b' +
                    '@if (c) {' +
                    'hello c' +
                    '}' +
                    '}' +
                    '}' +
                    '}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'a'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello a'],
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello unnamed'],
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'b'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello b'],
                    [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                    [27 /* TokenType.BLOCK_PARAMETER */, 'c'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, 'hello c'],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block containing an expansion', () => {
                const result = tokenizeAndHumanizeParts('@foo {{one.two, three, =4 {four} =5 {five} foo {bar} }}', { tokenizeExpansionForms: true });
                expect(result).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [19 /* TokenType.EXPANSION_FORM_START */],
                    [7 /* TokenType.RAW_TEXT */, 'one.two'],
                    [7 /* TokenType.RAW_TEXT */, 'three'],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'four'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, '=5'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'five'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [20 /* TokenType.EXPANSION_CASE_VALUE */, 'foo'],
                    [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                    [5 /* TokenType.TEXT */, 'bar'],
                    [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                    [23 /* TokenType.EXPANSION_FORM_END */],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse a block containing an interpolation', () => {
                expect(tokenizeAndHumanizeParts('@foo {{{message}}}')).toEqual([
                    [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                    [25 /* TokenType.BLOCK_OPEN_END */],
                    [5 /* TokenType.TEXT */, ''],
                    [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                    [5 /* TokenType.TEXT */, ''],
                    [26 /* TokenType.BLOCK_CLOSE */],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an incomplete block start without parameters with surrounding text', () => {
                expect(tokenizeAndHumanizeParts('My email frodo@baggins.com')).toEqual([
                    [5 /* TokenType.TEXT */, 'My email frodo'],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'baggins'],
                    [5 /* TokenType.TEXT */, '.com'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an incomplete block start at the end of the input', () => {
                expect(tokenizeAndHumanizeParts('My username is @frodo')).toEqual([
                    [5 /* TokenType.TEXT */, 'My username is '],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'frodo'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an incomplete block start with parentheses but without params', () => {
                expect(tokenizeAndHumanizeParts('Use the @Input() decorator')).toEqual([
                    [5 /* TokenType.TEXT */, 'Use the '],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'Input'],
                    [5 /* TokenType.TEXT */, 'decorator'],
                    [41 /* TokenType.EOF */],
                ]);
            });
            it('should parse an incomplete block start with parentheses and params', () => {
                expect(tokenizeAndHumanizeParts('Use @Input({alias: "foo"}) to alias the input')).toEqual([
                    [5 /* TokenType.TEXT */, 'Use '],
                    [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'Input'],
                    [27 /* TokenType.BLOCK_PARAMETER */, '{alias: "foo"}'],
                    [5 /* TokenType.TEXT */, 'to alias the input'],
                    [41 /* TokenType.EOF */],
                ]);
            });
        });
    });
    describe('@let declarations', () => {
        it('should parse a @let declaration', () => {
            expect(tokenizeAndHumanizeParts('@let foo = 123 + 456;')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + 456'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declarations with arbitrary number of spaces', () => {
            const expected = [
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + 456'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ];
            expect(tokenizeAndHumanizeParts('@let               foo       =          123 + 456;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo=123 + 456;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo =123 + 456;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo=   123 + 456;')).toEqual(expected);
        });
        it('should parse a @let declaration with newlines before/after its name', () => {
            const expected = [
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ];
            expect(tokenizeAndHumanizeParts('@let\nfoo = 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let    \nfoo = 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let    \n              foo = 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo\n= 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo\n       = 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let foo   \n   = 123;')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@let  \n   foo   \n   = 123;')).toEqual(expected);
        });
        it('should parse a @let declaration with new lines in its value', () => {
            expect(tokenizeAndHumanizeParts('@let foo = \n123 + \n 456 + \n789\n;')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + \n 456 + \n789\n'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a @let declaration inside of a block', () => {
            expect(tokenizeAndHumanizeParts('@block {@let foo = 123 + 456;}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'block'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + 456'],
                [31 /* TokenType.LET_END */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declaration using semicolon inside of a string', () => {
            expect(tokenizeAndHumanizeParts(`@let foo = 'a; b';`)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, `'a; b'`],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts(`@let foo = "';'";`)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, `"';'"`],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declaration using escaped quotes in a string', () => {
            const markup = `@let foo = '\\';\\'' + "\\",";`;
            expect(tokenizeAndHumanizeParts(markup)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, `'\\';\\'' + "\\","`],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declaration using function calls in its value', () => {
            const markup = '@let foo = fn(a, b) + fn2(c, d, e);';
            expect(tokenizeAndHumanizeParts(markup)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, 'fn(a, b) + fn2(c, d, e)'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declarations using array literals in their value', () => {
            expect(tokenizeAndHumanizeParts('@let foo = [1, 2, 3];')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '[1, 2, 3]'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo = [0, [foo[1]], 3];')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '[0, [foo[1]], 3]'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse @let declarations using object literals', () => {
            expect(tokenizeAndHumanizeParts('@let foo = {a: 1, b: {c: something + 2}};')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '{a: 1, b: {c: something + 2}}'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo = {};')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '{}'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo = {foo: ";"};')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '{foo: ";"}'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a @let declaration containing complex expression', () => {
            const markup = '@let foo = fn({a: 1, b: [otherFn([{c: ";"}], 321, {d: [\',\']})]});';
            expect(tokenizeAndHumanizeParts(markup)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, 'fn({a: 1, b: [otherFn([{c: ";"}], 321, {d: [\',\']})]})'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle @let declaration with invalid syntax in the value', () => {
            expect(tokenizeAndHumanizeErrors(`@let foo = ";`)).toEqual([
                [30 /* TokenType.LET_VALUE */, 'Unexpected character "EOF"', '0:13'],
            ]);
            expect(tokenizeAndHumanizeParts(`@let foo = {a: 1,;`)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '{a: 1,'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts(`@let foo = [1, ;`)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '[1, '],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts(`@let foo = fn(;`)).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, 'fn('],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        // This case is a bit odd since an `@let` without a value is invalid,
        // but it will be validated further down in the parsing pipeline.
        it('should parse a @let declaration without a value', () => {
            expect(tokenizeAndHumanizeParts('@let foo =;')).toEqual([
                [29 /* TokenType.LET_START */, 'foo'],
                [30 /* TokenType.LET_VALUE */, ''],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle no space after @let', () => {
            expect(tokenizeAndHumanizeParts('@letFoo = 123;')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, '@let'],
                [5 /* TokenType.TEXT */, 'Foo = 123;'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle unsupported characters in the name of @let', () => {
            expect(tokenizeAndHumanizeParts('@let foo\\bar = 123;')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, 'foo'],
                [5 /* TokenType.TEXT */, '\\bar = 123;'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let #foo = 123;')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, ''],
                [5 /* TokenType.TEXT */, '#foo = 123;'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo\nbar = 123;')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, 'foo'],
                [5 /* TokenType.TEXT */, 'bar = 123;'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle digits in the name of an @let', () => {
            expect(tokenizeAndHumanizeParts('@let a123 = foo;')).toEqual([
                [29 /* TokenType.LET_START */, 'a123'],
                [30 /* TokenType.LET_VALUE */, 'foo'],
                [31 /* TokenType.LET_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let 123a = 123;')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, ''],
                [5 /* TokenType.TEXT */, '123a = 123;'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle an @let declaration without an ending token', () => {
            expect(tokenizeAndHumanizeParts('@let foo = 123 + 456')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + 456'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo = 123 + 456                  ')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123 + 456                  '],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@let foo = 123, bar = 456')).toEqual([
                [32 /* TokenType.INCOMPLETE_LET */, 'foo'],
                [30 /* TokenType.LET_VALUE */, '123, bar = 456'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should not parse @let inside an interpolation', () => {
            expect(tokenizeAndHumanizeParts('{{ @let foo = 123; }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' @let foo = 123; ', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
    });
    describe('attributes', () => {
        it('should parse attributes without prefix', () => {
            expect(tokenizeAndHumanizeParts('<t a>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with interpolation', () => {
            expect(tokenizeAndHumanizeParts('<t a="{{v}}" b="s{{m}}e" c="s{{m//c}}e">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', 'v', '}}'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [14 /* TokenType.ATTR_NAME */, '', 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 's'],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', 'm', '}}'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'e'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [14 /* TokenType.ATTR_NAME */, '', 'c'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 's'],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', 'm//c', '}}'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'e'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should end interpolation on an unescaped matching quote', () => {
            expect(tokenizeAndHumanizeParts('<t a="{{ a \\" \' b ">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', ' a \\" \' b '],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts("<t a='{{ a \" \\' b '>")).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', ' a " \\\' b '],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with prefix', () => {
            expect(tokenizeAndHumanizeParts('<t ns1:a>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, 'ns1', 'a'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes whose prefix is not valid', () => {
            expect(tokenizeAndHumanizeParts('<t (ns1:a)>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', '(ns1:a)'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with single quote value', () => {
            expect(tokenizeAndHumanizeParts("<t a='b'>")).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with double quote value', () => {
            expect(tokenizeAndHumanizeParts('<t a="b">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with unquoted value', () => {
            expect(tokenizeAndHumanizeParts('<t a=b>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with unquoted interpolation value', () => {
            expect(tokenizeAndHumanizeParts('<a a={{link.text}}>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'a'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [17 /* TokenType.ATTR_VALUE_INTERPOLATION */, '{{', 'link.text', '}}'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse bound inputs with expressions containing newlines', () => {
            expect(tokenizeAndHumanizeParts(`<app-component
        [attr]="[
        {text: 'some text',url:'//www.google.com'},
        {text:'other text',url:'//www.google.com'}]">`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'app-component'],
                [14 /* TokenType.ATTR_NAME */, '', '[attr]'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [
                    16 /* TokenType.ATTR_VALUE_TEXT */,
                    '[\n' +
                        "        {text: 'some text',url:'//www.google.com'},\n" +
                        "        {text:'other text',url:'//www.google.com'}]",
                ],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with empty quoted value', () => {
            expect(tokenizeAndHumanizeParts('<t a="">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse bound inputs with expressions containing newlines', () => {
            expect(tokenizeAndHumanizeParts(`<app-component
        [attr]="[
        {text: 'some text',url:'//www.google.com'},
        {text:'other text',url:'//www.google.com'}]">`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'app-component'],
                [14 /* TokenType.ATTR_NAME */, '', '[attr]'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [
                    16 /* TokenType.ATTR_VALUE_TEXT */,
                    '[\n' +
                        "        {text: 'some text',url:'//www.google.com'},\n" +
                        "        {text:'other text',url:'//www.google.com'}]",
                ],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should allow whitespace', () => {
            expect(tokenizeAndHumanizeParts('<t a = b >')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with entities in values', () => {
            expect(tokenizeAndHumanizeParts('<t a="&#65;&#x41;">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, 'A', '&#65;'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, 'A', '&#x41;'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, ''],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should not decode entities without trailing ";"', () => {
            expect(tokenizeAndHumanizeParts('<t a="&amp" b="c&&d">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, '&amp'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [14 /* TokenType.ATTR_NAME */, '', 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'c&&d'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse attributes with "&" in values', () => {
            expect(tokenizeAndHumanizeParts('<t a="b && c &">')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b && c &'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse values with CR and LF', () => {
            expect(tokenizeAndHumanizeParts("<t a='t\ne\rs\r\nt'>")).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 't\ne\ns\nt'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('<t a=b>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<t'],
                [14 /* TokenType.ATTR_NAME */, 'a'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report missing closing single quote', () => {
            expect(tokenizeAndHumanizeErrors("<t a='b>")).toEqual([
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'Unexpected character "EOF"', '0:8'],
            ]);
        });
        it('should report missing closing double quote', () => {
            expect(tokenizeAndHumanizeErrors('<t a="b>')).toEqual([
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'Unexpected character "EOF"', '0:8'],
            ]);
        });
    });
    describe('closing tags', () => {
        it('should parse closing tags without prefix', () => {
            expect(tokenizeAndHumanizeParts('</test>')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, '', 'test'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse closing tags with prefix', () => {
            expect(tokenizeAndHumanizeParts('</ns1:test>')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, 'ns1', 'test'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should allow whitespace', () => {
            expect(tokenizeAndHumanizeParts('</ test >')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, '', 'test'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('</test>')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, '</test>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report missing name after </', () => {
            expect(tokenizeAndHumanizeErrors('</')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, 'Unexpected character "EOF"', '0:2'],
            ]);
        });
        it('should report missing >', () => {
            expect(tokenizeAndHumanizeErrors('</test')).toEqual([
                [3 /* TokenType.TAG_CLOSE */, 'Unexpected character "EOF"', '0:6'],
            ]);
        });
    });
    describe('entities', () => {
        it('should parse named entities', () => {
            expect(tokenizeAndHumanizeParts('a&amp;b')).toEqual([
                [5 /* TokenType.TEXT */, 'a'],
                [9 /* TokenType.ENCODED_ENTITY */, '&', '&amp;'],
                [5 /* TokenType.TEXT */, 'b'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse hexadecimal entities', () => {
            expect(tokenizeAndHumanizeParts('&#x41;&#X41;')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, 'A', '&#x41;'],
                [5 /* TokenType.TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, 'A', '&#X41;'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse decimal entities', () => {
            expect(tokenizeAndHumanizeParts('&#65;')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, 'A', '&#65;'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('a&amp;b')).toEqual([
                [5 /* TokenType.TEXT */, 'a'],
                [9 /* TokenType.ENCODED_ENTITY */, '&amp;'],
                [5 /* TokenType.TEXT */, 'b'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should report malformed/unknown entities', () => {
            expect(tokenizeAndHumanizeErrors('&tbo;')).toEqual([
                [
                    9 /* TokenType.ENCODED_ENTITY */,
                    'Unknown entity "tbo" - use the "&#<decimal>;" or  "&#x<hex>;" syntax',
                    '0:0',
                ],
            ]);
            expect(tokenizeAndHumanizeErrors('&#3sdf;')).toEqual([
                [
                    9 /* TokenType.ENCODED_ENTITY */,
                    'Unable to parse entity "&#3s" - decimal character reference entities must end with ";"',
                    '0:4',
                ],
            ]);
            expect(tokenizeAndHumanizeErrors('&#xasdf;')).toEqual([
                [
                    9 /* TokenType.ENCODED_ENTITY */,
                    'Unable to parse entity "&#xas" - hexadecimal character reference entities must end with ";"',
                    '0:5',
                ],
            ]);
            expect(tokenizeAndHumanizeErrors('&#xABC')).toEqual([
                [9 /* TokenType.ENCODED_ENTITY */, 'Unexpected character "EOF"', '0:6'],
            ]);
        });
        it('should not parse js object methods', () => {
            expect(tokenizeAndHumanizeErrors('&valueOf;')).toEqual([
                [
                    9 /* TokenType.ENCODED_ENTITY */,
                    'Unknown entity "valueOf" - use the "&#<decimal>;" or  "&#x<hex>;" syntax',
                    '0:0',
                ],
            ]);
        });
    });
    describe('regular text', () => {
        it('should parse text', () => {
            expect(tokenizeAndHumanizeParts('a')).toEqual([[5 /* TokenType.TEXT */, 'a'], [41 /* TokenType.EOF */]]);
        });
        it('should parse interpolation', () => {
            expect(tokenizeAndHumanizeParts('{{ a }}b{{ c // comment }}d{{ e "}} \' " f }}g{{ h // " i }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a ', '}}'],
                [5 /* TokenType.TEXT */, 'b'],
                [8 /* TokenType.INTERPOLATION */, '{{', ' c // comment ', '}}'],
                [5 /* TokenType.TEXT */, 'd'],
                [8 /* TokenType.INTERPOLATION */, '{{', ' e "}} \' " f ', '}}'],
                [5 /* TokenType.TEXT */, 'g'],
                [8 /* TokenType.INTERPOLATION */, '{{', ' h // " i ', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans('{{ a }}b{{ c // comment }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{ a }}'],
                [5 /* TokenType.TEXT */, 'b'],
                [8 /* TokenType.INTERPOLATION */, '{{ c // comment }}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should parse interpolation with custom markers', () => {
            expect(tokenizeAndHumanizeParts('{% a %}', { interpolationConfig: { start: '{%', end: '%}' } })).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{%', ' a ', '%}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle CR & LF in text', () => {
            expect(tokenizeAndHumanizeParts('t\ne\rs\r\nt')).toEqual([
                [5 /* TokenType.TEXT */, 't\ne\ns\nt'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans('t\ne\rs\r\nt')).toEqual([
                [5 /* TokenType.TEXT */, 't\ne\rs\r\nt'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should handle CR & LF in interpolation', () => {
            expect(tokenizeAndHumanizeParts('{{t\ne\rs\r\nt}}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', 't\ne\ns\nt', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans('{{t\ne\rs\r\nt}}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{t\ne\rs\r\nt}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should parse entities', () => {
            expect(tokenizeAndHumanizeParts('a&amp;b')).toEqual([
                [5 /* TokenType.TEXT */, 'a'],
                [9 /* TokenType.ENCODED_ENTITY */, '&', '&amp;'],
                [5 /* TokenType.TEXT */, 'b'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans('a&amp;b')).toEqual([
                [5 /* TokenType.TEXT */, 'a'],
                [9 /* TokenType.ENCODED_ENTITY */, '&amp;'],
                [5 /* TokenType.TEXT */, 'b'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should parse text starting with "&"', () => {
            expect(tokenizeAndHumanizeParts('a && b &')).toEqual([
                [5 /* TokenType.TEXT */, 'a && b &'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans('a')).toEqual([
                [5 /* TokenType.TEXT */, 'a'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should allow "<" in text nodes', () => {
            expect(tokenizeAndHumanizeParts('{{ a < b ? c : d }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a < b ? c : d ', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans('<p>a<b</p>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<p'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [5 /* TokenType.TEXT */, 'a'],
                [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '<b'],
                [3 /* TokenType.TAG_CLOSE */, '</p>'],
                [41 /* TokenType.EOF */, ''],
            ]);
            expect(tokenizeAndHumanizeParts('< a>')).toEqual([[5 /* TokenType.TEXT */, '< a>'], [41 /* TokenType.EOF */]]);
        });
        it('should break out of interpolation in text token on valid start tag', () => {
            expect(tokenizeAndHumanizeParts('{{ a <b && c > d }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a '],
                [5 /* TokenType.TEXT */, ''],
                [0 /* TokenType.TAG_OPEN_START */, '', 'b'],
                [14 /* TokenType.ATTR_NAME */, '', '&&'],
                [14 /* TokenType.ATTR_NAME */, '', 'c'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, ' d '],
                [26 /* TokenType.BLOCK_CLOSE */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should break out of interpolation in text token on valid comment', () => {
            expect(tokenizeAndHumanizeParts('{{ a }<!---->}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a }'],
                [5 /* TokenType.TEXT */, ''],
                [10 /* TokenType.COMMENT_START */],
                [7 /* TokenType.RAW_TEXT */, ''],
                [11 /* TokenType.COMMENT_END */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should end interpolation on a valid closing tag', () => {
            expect(tokenizeAndHumanizeParts('<p>{{ a </p>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'p'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a '],
                [5 /* TokenType.TEXT */, ''],
                [3 /* TokenType.TAG_CLOSE */, '', 'p'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should break out of interpolation in text token on valid CDATA', () => {
            expect(tokenizeAndHumanizeParts('{{ a }<![CDATA[]]>}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' a }'],
                [5 /* TokenType.TEXT */, ''],
                [12 /* TokenType.CDATA_START */],
                [7 /* TokenType.RAW_TEXT */, ''],
                [13 /* TokenType.CDATA_END */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should ignore invalid start tag in interpolation', () => {
            // Note that if the `<=` is considered an "end of text" then the following `{` would
            // incorrectly be considered part of an ICU.
            expect(tokenizeAndHumanizeParts(`<code>{{'<={'}}</code>`, { tokenizeExpansionForms: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'code'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', "'<={'", '}}'],
                [5 /* TokenType.TEXT */, ''],
                [3 /* TokenType.TAG_CLOSE */, '', 'code'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse start tags quotes in place of an attribute name as text', () => {
            expect(tokenizeAndHumanizeParts('<t ">')).toEqual([
                [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '', 't'],
                [5 /* TokenType.TEXT */, '">'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts("<t '>")).toEqual([
                [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '', 't'],
                [5 /* TokenType.TEXT */, "'>"],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse start tags quotes in place of an attribute name (after a valid attribute)', () => {
            expect(tokenizeAndHumanizeParts('<t a="b" ">')).toEqual([
                [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                // TODO(ayazhafiz): the " symbol should be a synthetic attribute,
                // allowing us to complete the opening tag correctly.
                [5 /* TokenType.TEXT */, '">'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts("<t a='b' '>")).toEqual([
                [4 /* TokenType.INCOMPLETE_TAG_OPEN */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                // TODO(ayazhafiz): the ' symbol should be a synthetic attribute,
                // allowing us to complete the opening tag correctly.
                [5 /* TokenType.TEXT */, "'>"],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should be able to escape {', () => {
            expect(tokenizeAndHumanizeParts('{{ "{" }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' "{" ', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should be able to escape {{', () => {
            expect(tokenizeAndHumanizeParts('{{ "{{" }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' "{{" ', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should capture everything up to the end of file in the interpolation expression part if there are mismatched quotes', () => {
            expect(tokenizeAndHumanizeParts('{{ "{{a}}\' }}')).toEqual([
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', ' "{{a}}\' }}'],
                [5 /* TokenType.TEXT */, ''],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should treat expansion form as text when they are not parsed', () => {
            expect(tokenizeAndHumanizeParts('<span>{a, b, =4 {c}}</span>', {
                tokenizeExpansionForms: false,
                tokenizeBlocks: false,
            })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, '{a, b, =4 {c}}'],
                [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                [41 /* TokenType.EOF */],
            ]);
        });
    });
    describe('raw text', () => {
        it('should parse text', () => {
            expect(tokenizeAndHumanizeParts(`<script>t\ne\rs\r\nt</script>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                [1 /* TokenType.TAG_OPEN_END */],
                [7 /* TokenType.RAW_TEXT */, 't\ne\ns\nt'],
                [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should not detect entities', () => {
            expect(tokenizeAndHumanizeParts(`<script>&amp;</SCRIPT>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                [1 /* TokenType.TAG_OPEN_END */],
                [7 /* TokenType.RAW_TEXT */, '&amp;'],
                [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should ignore other opening tags', () => {
            expect(tokenizeAndHumanizeParts(`<script>a<div></script>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                [1 /* TokenType.TAG_OPEN_END */],
                [7 /* TokenType.RAW_TEXT */, 'a<div>'],
                [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should ignore other closing tags', () => {
            expect(tokenizeAndHumanizeParts(`<script>a</test></script>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                [1 /* TokenType.TAG_OPEN_END */],
                [7 /* TokenType.RAW_TEXT */, 'a</test>'],
                [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans(`<script>a</script>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<script'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [7 /* TokenType.RAW_TEXT */, 'a'],
                [3 /* TokenType.TAG_CLOSE */, '</script>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
    });
    describe('escapable raw text', () => {
        it('should parse text', () => {
            expect(tokenizeAndHumanizeParts(`<title>t\ne\rs\r\nt</title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 't\ne\ns\nt'],
                [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should detect entities', () => {
            expect(tokenizeAndHumanizeParts(`<title>&amp;</title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, ''],
                [9 /* TokenType.ENCODED_ENTITY */, '&', '&amp;'],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, ''],
                [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should ignore other opening tags', () => {
            expect(tokenizeAndHumanizeParts(`<title>a<div></title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a<div>'],
                [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should ignore other closing tags', () => {
            expect(tokenizeAndHumanizeParts(`<title>a</test></title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a</test>'],
                [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should store the locations', () => {
            expect(tokenizeAndHumanizeSourceSpans(`<title>a</title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<title'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'a'],
                [3 /* TokenType.TAG_CLOSE */, '</title>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
    });
    describe('parsable data', () => {
        it('should parse an SVG <title> tag', () => {
            expect(tokenizeAndHumanizeParts(`<svg:title>test</svg:title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, 'svg', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'test'],
                [3 /* TokenType.TAG_CLOSE */, 'svg', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an SVG <title> tag with children', () => {
            expect(tokenizeAndHumanizeParts(`<svg:title><f>test</f></svg:title>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, 'svg', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [0 /* TokenType.TAG_OPEN_START */, '', 'f'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'test'],
                [3 /* TokenType.TAG_CLOSE */, '', 'f'],
                [3 /* TokenType.TAG_CLOSE */, 'svg', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
    });
    describe('expansion forms', () => {
        it('should parse an expansion form', () => {
            expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four} =5 {five} foo {bar} }', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'four'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=5'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'five'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, 'foo'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'bar'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an expansion form with text elements surrounding it', () => {
            expect(tokenizeAndHumanizeParts('before{one.two, three, =4 {four}}after', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [5 /* TokenType.TEXT */, 'before'],
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'four'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [5 /* TokenType.TEXT */, 'after'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an expansion form as a tag single child', () => {
            expect(tokenizeAndHumanizeParts('<div><span>{a, b, =4 {c}}</span></div>', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                [1 /* TokenType.TAG_OPEN_END */],
                [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                [1 /* TokenType.TAG_OPEN_END */],
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'a'],
                [7 /* TokenType.RAW_TEXT */, 'b'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'c'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an expansion form with whitespace surrounding it', () => {
            expect(tokenizeAndHumanizeParts('<div><span> {a, b, =4 {c}} </span></div>', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                [1 /* TokenType.TAG_OPEN_END */],
                [0 /* TokenType.TAG_OPEN_START */, '', 'span'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, ' '],
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'a'],
                [7 /* TokenType.RAW_TEXT */, 'b'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'c'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [5 /* TokenType.TEXT */, ' '],
                [3 /* TokenType.TAG_CLOSE */, '', 'span'],
                [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an expansion forms with elements in it', () => {
            expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four <b>a</b>}}', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'four '],
                [0 /* TokenType.TAG_OPEN_START */, '', 'b'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'a'],
                [3 /* TokenType.TAG_CLOSE */, '', 'b'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an expansion forms containing an interpolation', () => {
            expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four {{a}}}}', {
                tokenizeExpansionForms: true,
            })).toEqual([
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'four '],
                [8 /* TokenType.INTERPOLATION */, '{{', 'a', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse nested expansion forms', () => {
            expect(tokenizeAndHumanizeParts(`{one.two, three, =4 { {xx, yy, =x {one}} }}`, {
                tokenizeExpansionForms: true,
            })).toEqual([
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'xx'],
                [7 /* TokenType.RAW_TEXT */, 'yy'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=x'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'one'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [5 /* TokenType.TEXT */, ' '],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        describe('[line ending normalization', () => {
            describe('{escapedString: true}', () => {
                it('should normalize line-endings in expansion forms if `i18nNormalizeLineEndingsInICUs` is true', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `    messages.length,\r\n` +
                        `    plural,\r\n` +
                        `    =0 {You have \r\nno\r\n messages}\r\n` +
                        `    =1 {One {{message}}}}\r\n`, {
                        tokenizeExpansionForms: true,
                        escapedString: true,
                        i18nNormalizeLineEndingsInICUs: true,
                    });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\n    messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'One '],
                        [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                        [5 /* TokenType.TEXT */, ''],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n'],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions).toEqual([]);
                });
                it('should not normalize line-endings in ICU expressions when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `    messages.length,\r\n` +
                        `    plural,\r\n` +
                        `    =0 {You have \r\nno\r\n messages}\r\n` +
                        `    =1 {One {{message}}}}\r\n`, { tokenizeExpansionForms: true, escapedString: true });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n    messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'One '],
                        [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                        [5 /* TokenType.TEXT */, ''],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n'],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions.length).toBe(1);
                    expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n    messages.length');
                });
                it('should not normalize line endings in nested expansion forms when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `  messages.length, plural,\r\n` +
                        `  =0 { zero \r\n` +
                        `       {\r\n` +
                        `         p.gender, select,\r\n` +
                        `         male {m}\r\n` +
                        `       }\r\n` +
                        `     }\r\n` +
                        `}`, { tokenizeExpansionForms: true, escapedString: true });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n  messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'zero \n       '],
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n         p.gender'],
                        [7 /* TokenType.RAW_TEXT */, 'select'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, 'male'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'm'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n     '],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions.length).toBe(2);
                    expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n  messages.length');
                    expect(result.nonNormalizedIcuExpressions[1].sourceSpan.toString()).toEqual('\r\n         p.gender');
                });
            });
            describe('{escapedString: false}', () => {
                it('should normalize line-endings in expansion forms if `i18nNormalizeLineEndingsInICUs` is true', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `    messages.length,\r\n` +
                        `    plural,\r\n` +
                        `    =0 {You have \r\nno\r\n messages}\r\n` +
                        `    =1 {One {{message}}}}\r\n`, {
                        tokenizeExpansionForms: true,
                        escapedString: false,
                        i18nNormalizeLineEndingsInICUs: true,
                    });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\n    messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'One '],
                        [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                        [5 /* TokenType.TEXT */, ''],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n'],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions).toEqual([]);
                });
                it('should not normalize line-endings in ICU expressions when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `    messages.length,\r\n` +
                        `    plural,\r\n` +
                        `    =0 {You have \r\nno\r\n messages}\r\n` +
                        `    =1 {One {{message}}}}\r\n`, { tokenizeExpansionForms: true, escapedString: false });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n    messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'You have \nno\n messages'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=1'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'One '],
                        [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                        [5 /* TokenType.TEXT */, ''],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n'],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions.length).toBe(1);
                    expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n    messages.length');
                });
                it('should not normalize line endings in nested expansion forms when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                    const result = tokenizeWithoutErrors(`{\r\n` +
                        `  messages.length, plural,\r\n` +
                        `  =0 { zero \r\n` +
                        `       {\r\n` +
                        `         p.gender, select,\r\n` +
                        `         male {m}\r\n` +
                        `       }\r\n` +
                        `     }\r\n` +
                        `}`, { tokenizeExpansionForms: true });
                    expect(humanizeParts(result.tokens)).toEqual([
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n  messages.length'],
                        [7 /* TokenType.RAW_TEXT */, 'plural'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, '=0'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'zero \n       '],
                        [19 /* TokenType.EXPANSION_FORM_START */],
                        [7 /* TokenType.RAW_TEXT */, '\r\n         p.gender'],
                        [7 /* TokenType.RAW_TEXT */, 'select'],
                        [20 /* TokenType.EXPANSION_CASE_VALUE */, 'male'],
                        [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                        [5 /* TokenType.TEXT */, 'm'],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [5 /* TokenType.TEXT */, '\n     '],
                        [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                        [23 /* TokenType.EXPANSION_FORM_END */],
                        [41 /* TokenType.EOF */],
                    ]);
                    expect(result.nonNormalizedIcuExpressions.length).toBe(2);
                    expect(result.nonNormalizedIcuExpressions[0].sourceSpan.toString()).toEqual('\r\n  messages.length');
                    expect(result.nonNormalizedIcuExpressions[1].sourceSpan.toString()).toEqual('\r\n         p.gender');
                });
            });
        });
    });
    describe('errors', () => {
        it('should report unescaped "{" on error', () => {
            expect(tokenizeAndHumanizeErrors(`<p>before { after</p>`, { tokenizeExpansionForms: true })).toEqual([
                [
                    7 /* TokenType.RAW_TEXT */,
                    `Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`,
                    '0:21',
                ],
            ]);
        });
        it('should report unescaped "{" as an error, even after a prematurely terminated interpolation', () => {
            expect(tokenizeAndHumanizeErrors(`<code>{{b}<!---->}</code><pre>import {a} from 'a';</pre>`, {
                tokenizeExpansionForms: true,
            })).toEqual([
                [
                    7 /* TokenType.RAW_TEXT */,
                    `Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`,
                    '0:56',
                ],
            ]);
        });
        it('should include 2 lines of context in message', () => {
            const src = '111\n222\n333\nE\n444\n555\n666\n';
            const file = new parse_util_1.ParseSourceFile(src, 'file://');
            const location = new parse_util_1.ParseLocation(file, 12, 123, 456);
            const span = new parse_util_1.ParseSourceSpan(location, location);
            const error = new lexer_1.TokenError('**ERROR**', null, span);
            expect(error.toString()).toEqual(`**ERROR** ("\n222\n333\n[ERROR ->]E\n444\n555\n"): file://@123:456`);
        });
    });
    describe('unicode characters', () => {
        it('should support unicode characters', () => {
            expect(tokenizeAndHumanizeSourceSpans(`<p>İ</p>`)).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<p'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [5 /* TokenType.TEXT */, 'İ'],
                [3 /* TokenType.TAG_CLOSE */, '</p>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
    });
    describe('(processing escaped strings)', () => {
        it('should unescape standard escape sequences', () => {
            expect(tokenizeAndHumanizeParts("\\' \\' \\'", { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, "' ' '"],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\" \\" \\"', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '" " "'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\` \\` \\`', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '` ` `'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\\\ \\\\ \\\\', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\\ \\ \\'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\n \\n \\n', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\n \n \n'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\r{{\\r}}\\r', { escapedString: true })).toEqual([
                // post processing converts `\r` to `\n`
                [5 /* TokenType.TEXT */, '\n'],
                [8 /* TokenType.INTERPOLATION */, '{{', '\n', '}}'],
                [5 /* TokenType.TEXT */, '\n'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\v \\v \\v', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\v \v \v'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\t \\t \\t', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\t \t \t'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\b \\b \\b', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\b \b \b'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\f \\f \\f', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\f \f \f'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\\' \\" \\` \\\\ \\n \\r \\v \\t \\b \\f', {
                escapedString: true,
            })).toEqual([[5 /* TokenType.TEXT */, '\' " ` \\ \n \n \v \t \b \f'], [41 /* TokenType.EOF */]]);
        });
        it('should unescape null sequences', () => {
            expect(tokenizeAndHumanizeParts('\\0', { escapedString: true })).toEqual([[41 /* TokenType.EOF */]]);
            // \09 is not an octal number so the \0 is taken as EOF
            expect(tokenizeAndHumanizeParts('\\09', { escapedString: true })).toEqual([[41 /* TokenType.EOF */]]);
        });
        it('should unescape octal sequences', () => {
            // \19 is read as an octal `\1` followed by a normal char `9`
            // \1234 is read as an octal `\123` followed by a normal char `4`
            // \999 is not an octal number so its backslash just gets removed.
            expect(tokenizeAndHumanizeParts('\\001 \\01 \\1 \\12 \\223 \\19 \\2234 \\999', {
                escapedString: true,
            })).toEqual([[5 /* TokenType.TEXT */, '\x01 \x01 \x01 \x0A \x93 \x019 \x934 999'], [41 /* TokenType.EOF */]]);
        });
        it('should unescape hex sequences', () => {
            expect(tokenizeAndHumanizeParts('\\x12 \\x4F \\xDC', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\x12 \x4F \xDC'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should report an error on an invalid hex sequence', () => {
            expect(tokenizeAndHumanizeErrors('\\xGG', { escapedString: true })).toEqual([
                [null, 'Invalid hexadecimal escape sequence', '0:2'],
            ]);
            expect(tokenizeAndHumanizeErrors('abc \\x xyz', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'Invalid hexadecimal escape sequence', '0:6'],
            ]);
            expect(tokenizeAndHumanizeErrors('abc\\x', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'Unexpected character "EOF"', '0:5'],
            ]);
        });
        it('should unescape fixed length Unicode sequences', () => {
            expect(tokenizeAndHumanizeParts('\\u0123 \\uABCD', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, '\u0123 \uABCD'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should error on an invalid fixed length Unicode sequence', () => {
            expect(tokenizeAndHumanizeErrors('\\uGGGG', { escapedString: true })).toEqual([
                [null, 'Invalid hexadecimal escape sequence', '0:2'],
            ]);
        });
        it('should unescape variable length Unicode sequences', () => {
            expect(tokenizeAndHumanizeParts('\\u{01} \\u{ABC} \\u{1234} \\u{123AB}', { escapedString: true })).toEqual([[5 /* TokenType.TEXT */, '\u{01} \u{ABC} \u{1234} \u{123AB}'], [41 /* TokenType.EOF */]]);
        });
        it('should error on an invalid variable length Unicode sequence', () => {
            expect(tokenizeAndHumanizeErrors('\\u{GG}', { escapedString: true })).toEqual([
                [null, 'Invalid hexadecimal escape sequence', '0:3'],
            ]);
        });
        it('should unescape line continuations', () => {
            expect(tokenizeAndHumanizeParts('abc\\\ndef', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'abcdef'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('\\\nx\\\ny\\\n', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'xy'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should remove backslash from "non-escape" sequences', () => {
            expect(tokenizeAndHumanizeParts('a g ~', { escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'a g ~'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should unescape sequences in plain text', () => {
            expect(tokenizeAndHumanizeParts('abc\ndef\\nghi\\tjkl\\`\\\'\\"mno', { escapedString: true })).toEqual([[5 /* TokenType.TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'], [41 /* TokenType.EOF */]]);
        });
        it('should unescape sequences in raw text', () => {
            expect(tokenizeAndHumanizeParts('<script>abc\ndef\\nghi\\tjkl\\`\\\'\\"mno</script>', {
                escapedString: true,
            })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'script'],
                [1 /* TokenType.TAG_OPEN_END */],
                [7 /* TokenType.RAW_TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'],
                [3 /* TokenType.TAG_CLOSE */, '', 'script'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should unescape sequences in escapable raw text', () => {
            expect(tokenizeAndHumanizeParts('<title>abc\ndef\\nghi\\tjkl\\`\\\'\\"mno</title>', {
                escapedString: true,
            })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'title'],
                [1 /* TokenType.TAG_OPEN_END */],
                [6 /* TokenType.ESCAPABLE_RAW_TEXT */, 'abc\ndef\nghi\tjkl`\'"mno'],
                [3 /* TokenType.TAG_CLOSE */, '', 'title'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse over escape sequences in tag definitions', () => {
            expect(tokenizeAndHumanizeParts('<t a=\\"b\\" \\n c=\\\'d\\\'>', { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [14 /* TokenType.ATTR_NAME */, '', 'c'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'd'],
                [15 /* TokenType.ATTR_QUOTE */, "'"],
                [1 /* TokenType.TAG_OPEN_END */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse over escaped new line in tag definitions', () => {
            const text = '<t\\n></t>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse over escaped characters in tag definitions', () => {
            const text = '<t\u{000013}></t>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should unescape characters in tag names', () => {
            const text = '<t\\x64></t\\x64>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'td'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 'td'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<t\\x64'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [3 /* TokenType.TAG_CLOSE */, '</t\\x64>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should unescape characters in attributes', () => {
            const text = '<t \\x64="\\x65"></t>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'd'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'e'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse over escaped new line in attribute values', () => {
            const text = '<t a=b\\n></t>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, 'b'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should tokenize the correct span when there are escape sequences', () => {
            const text = 'selector: "app-root",\ntemplate: "line 1\\n\\"line 2\\"\\nline 3",\ninputs: []';
            const range = {
                startPos: 33,
                startLine: 1,
                startCol: 10,
                endPos: 59,
            };
            expect(tokenizeAndHumanizeParts(text, { range, escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'line 1\n"line 2"\nline 3'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeSourceSpans(text, { range, escapedString: true })).toEqual([
                [5 /* TokenType.TEXT */, 'line 1\\n\\"line 2\\"\\nline 3'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
        it('should account for escape sequences when computing source spans ', () => {
            const text = '<t>line 1</t>\n' + // <- unescaped line break
                '<t>line 2</t>\\n' + // <- escaped line break
                '<t>line 3\\\n' + // <- line continuation
                '</t>';
            expect(tokenizeAndHumanizeParts(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'line 1'],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [5 /* TokenType.TEXT */, '\n'],
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'line 2'],
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [5 /* TokenType.TEXT */, '\n'],
                [0 /* TokenType.TAG_OPEN_START */, '', 't'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'line 3'], // <- line continuation does not appear in token
                [3 /* TokenType.TAG_CLOSE */, '', 't'],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeLineColumn(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '0:0'],
                [1 /* TokenType.TAG_OPEN_END */, '0:2'],
                [5 /* TokenType.TEXT */, '0:3'],
                [3 /* TokenType.TAG_CLOSE */, '0:9'],
                [5 /* TokenType.TEXT */, '0:13'], // <- real newline increments the row
                [0 /* TokenType.TAG_OPEN_START */, '1:0'],
                [1 /* TokenType.TAG_OPEN_END */, '1:2'],
                [5 /* TokenType.TEXT */, '1:3'],
                [3 /* TokenType.TAG_CLOSE */, '1:9'],
                [5 /* TokenType.TEXT */, '1:13'], // <- escaped newline does not increment the row
                [0 /* TokenType.TAG_OPEN_START */, '1:15'],
                [1 /* TokenType.TAG_OPEN_END */, '1:17'],
                [5 /* TokenType.TEXT */, '1:18'], // <- the line continuation increments the row
                [3 /* TokenType.TAG_CLOSE */, '2:0'],
                [41 /* TokenType.EOF */, '2:4'],
            ]);
            expect(tokenizeAndHumanizeSourceSpans(text, { escapedString: true })).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '<t'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [5 /* TokenType.TEXT */, 'line 1'],
                [3 /* TokenType.TAG_CLOSE */, '</t>'],
                [5 /* TokenType.TEXT */, '\n'],
                [0 /* TokenType.TAG_OPEN_START */, '<t'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [5 /* TokenType.TEXT */, 'line 2'],
                [3 /* TokenType.TAG_CLOSE */, '</t>'],
                [5 /* TokenType.TEXT */, '\\n'],
                [0 /* TokenType.TAG_OPEN_START */, '<t'],
                [1 /* TokenType.TAG_OPEN_END */, '>'],
                [5 /* TokenType.TEXT */, 'line 3\\\n'],
                [3 /* TokenType.TAG_CLOSE */, '</t>'],
                [41 /* TokenType.EOF */, ''],
            ]);
        });
    });
    describe('blocks', () => {
        it('should parse a block without parameters', () => {
            const expected = [
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ];
            expect(tokenizeAndHumanizeParts('@foo {hello}')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@foo () {hello}')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@foo(){hello}')).toEqual(expected);
        });
        it('should parse a block with parameters', () => {
            expect(tokenizeAndHumanizeParts('@for (item of items; track item.id) {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'track item.id'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block with a trailing semicolon after the parameters', () => {
            expect(tokenizeAndHumanizeParts('@for (item of items;) {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block with a space in its name', () => {
            expect(tokenizeAndHumanizeParts('@else if {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'else if'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
            expect(tokenizeAndHumanizeParts('@else if (foo !== 2) {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'else if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'foo !== 2'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block with an arbitrary amount of spaces around the parentheses', () => {
            const expected = [
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'a'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'b'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'c'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ];
            expect(tokenizeAndHumanizeParts('@foo(a; b; c){hello}')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@foo      (a; b; c)      {hello}')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@foo(a; b; c)      {hello}')).toEqual(expected);
            expect(tokenizeAndHumanizeParts('@foo      (a; b; c){hello}')).toEqual(expected);
        });
        it('should parse a block with multiple trailing semicolons', () => {
            expect(tokenizeAndHumanizeParts('@for (item of items;;;;;) {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block with trailing whitespace', () => {
            expect(tokenizeAndHumanizeParts('@foo                        {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block with no trailing semicolon', () => {
            expect(tokenizeAndHumanizeParts('@for (item of items){hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'for'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'item of items'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle semicolons, braces and parentheses used in a block parameter', () => {
            const input = `@foo (a === ";"; b === ')'; c === "("; d === '}'; e === "{") {hello}`;
            expect(tokenizeAndHumanizeParts(input)).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [27 /* TokenType.BLOCK_PARAMETER */, `a === ";"`],
                [27 /* TokenType.BLOCK_PARAMETER */, `b === ')'`],
                [27 /* TokenType.BLOCK_PARAMETER */, `c === "("`],
                [27 /* TokenType.BLOCK_PARAMETER */, `d === '}'`],
                [27 /* TokenType.BLOCK_PARAMETER */, `e === "{"`],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle object literals and function calls in block parameters', () => {
            expect(tokenizeAndHumanizeParts(`@foo (on a({a: 1, b: 2}, false, {c: 3}); when b({d: 4})) {hello}`)).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'on a({a: 1, b: 2}, false, {c: 3})'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'when b({d: 4})'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse block with unclosed parameters', () => {
            expect(tokenizeAndHumanizeParts(`@foo (a === b {hello}`)).toEqual([
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'a === b {hello}'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse block with stray parentheses in the parameter position', () => {
            expect(tokenizeAndHumanizeParts(`@foo a === b) {hello}`)).toEqual([
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo a'],
                [5 /* TokenType.TEXT */, '=== b) {hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should report invalid quotes in a parameter', () => {
            expect(tokenizeAndHumanizeErrors(`@foo (a === ") {hello}`)).toEqual([
                [27 /* TokenType.BLOCK_PARAMETER */, 'Unexpected character "EOF"', '0:22'],
            ]);
            expect(tokenizeAndHumanizeErrors(`@foo (a === "hi') {hello}`)).toEqual([
                [27 /* TokenType.BLOCK_PARAMETER */, 'Unexpected character "EOF"', '0:25'],
            ]);
        });
        it('should report unclosed object literal inside a parameter', () => {
            expect(tokenizeAndHumanizeParts(`@foo ({invalid: true) hello}`)).toEqual([
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'foo'],
                [27 /* TokenType.BLOCK_PARAMETER */, '{invalid: true'],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle a semicolon used in a nested string inside a block parameter', () => {
            expect(tokenizeAndHumanizeParts(`@if (condition === "';'") {hello}`)).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, `condition === "';'"`],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should handle a semicolon next to an escaped quote used in a block parameter', () => {
            expect(tokenizeAndHumanizeParts('@if (condition === "\\";") {hello}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'condition === "\\";"'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse mixed text and html content in a block', () => {
            expect(tokenizeAndHumanizeParts('@if (a === 1) {foo <b>bar</b> baz}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'a === 1'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'foo '],
                [0 /* TokenType.TAG_OPEN_START */, '', 'b'],
                [1 /* TokenType.TAG_OPEN_END */],
                [5 /* TokenType.TEXT */, 'bar'],
                [3 /* TokenType.TAG_CLOSE */, '', 'b'],
                [5 /* TokenType.TEXT */, ' baz'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse HTML tags with attributes containing curly braces inside blocks', () => {
            expect(tokenizeAndHumanizeParts('@if (a === 1) {<div a="}" b="{"></div>}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'a === 1'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, '}'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [14 /* TokenType.ATTR_NAME */, '', 'b'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, '{'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse HTML tags with attribute containing block syntax', () => {
            expect(tokenizeAndHumanizeParts('<div a="@if (foo) {}"></div>')).toEqual([
                [0 /* TokenType.TAG_OPEN_START */, '', 'div'],
                [14 /* TokenType.ATTR_NAME */, '', 'a'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [16 /* TokenType.ATTR_VALUE_TEXT */, '@if (foo) {}'],
                [15 /* TokenType.ATTR_QUOTE */, '"'],
                [1 /* TokenType.TAG_OPEN_END */],
                [3 /* TokenType.TAG_CLOSE */, '', 'div'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse nested blocks', () => {
            expect(tokenizeAndHumanizeParts('@if (a) {' +
                'hello a' +
                '@if {' +
                'hello unnamed' +
                '@if (b) {' +
                'hello b' +
                '@if (c) {' +
                'hello c' +
                '}' +
                '}' +
                '}' +
                '}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'a'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello a'],
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello unnamed'],
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'b'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello b'],
                [24 /* TokenType.BLOCK_OPEN_START */, 'if'],
                [27 /* TokenType.BLOCK_PARAMETER */, 'c'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, 'hello c'],
                [26 /* TokenType.BLOCK_CLOSE */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block containing an expansion', () => {
            const result = tokenizeAndHumanizeParts('@foo {{one.two, three, =4 {four} =5 {five} foo {bar} }}', { tokenizeExpansionForms: true });
            expect(result).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [19 /* TokenType.EXPANSION_FORM_START */],
                [7 /* TokenType.RAW_TEXT */, 'one.two'],
                [7 /* TokenType.RAW_TEXT */, 'three'],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=4'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'four'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, '=5'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'five'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [20 /* TokenType.EXPANSION_CASE_VALUE */, 'foo'],
                [21 /* TokenType.EXPANSION_CASE_EXP_START */],
                [5 /* TokenType.TEXT */, 'bar'],
                [22 /* TokenType.EXPANSION_CASE_EXP_END */],
                [23 /* TokenType.EXPANSION_FORM_END */],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse a block containing an interpolation', () => {
            expect(tokenizeAndHumanizeParts('@foo {{{message}}}')).toEqual([
                [24 /* TokenType.BLOCK_OPEN_START */, 'foo'],
                [25 /* TokenType.BLOCK_OPEN_END */],
                [5 /* TokenType.TEXT */, ''],
                [8 /* TokenType.INTERPOLATION */, '{{', 'message', '}}'],
                [5 /* TokenType.TEXT */, ''],
                [26 /* TokenType.BLOCK_CLOSE */],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an incomplete block start without parameters with surrounding text', () => {
            expect(tokenizeAndHumanizeParts('My email frodo@baggins.com')).toEqual([
                [5 /* TokenType.TEXT */, 'My email frodo'],
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'baggins'],
                [5 /* TokenType.TEXT */, '.com'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an incomplete block start at the end of the input', () => {
            expect(tokenizeAndHumanizeParts('My username is @frodo')).toEqual([
                [5 /* TokenType.TEXT */, 'My username is '],
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'frodo'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an incomplete block start with parentheses but without params', () => {
            expect(tokenizeAndHumanizeParts('Use the @Input() decorator')).toEqual([
                [5 /* TokenType.TEXT */, 'Use the '],
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'Input'],
                [5 /* TokenType.TEXT */, 'decorator'],
                [41 /* TokenType.EOF */],
            ]);
        });
        it('should parse an incomplete block start with parentheses and params', () => {
            expect(tokenizeAndHumanizeParts('Use @Input({alias: "foo"}) to alias the input')).toEqual([
                [5 /* TokenType.TEXT */, 'Use '],
                [28 /* TokenType.INCOMPLETE_BLOCK_OPEN */, 'Input'],
                [27 /* TokenType.BLOCK_PARAMETER */, '{alias: "foo"}'],
                [5 /* TokenType.TEXT */, 'to alias the input'],
                [41 /* TokenType.EOF */],
            ]);
        });
    });
});
function tokenizeWithoutErrors(input, options) {
    const tokenizeResult = (0, lexer_1.tokenize)(input, 'someUrl', html_tags_1.getHtmlTagDefinition, options);
    if (tokenizeResult.errors.length > 0) {
        const errorString = tokenizeResult.errors.join('\n');
        throw new Error(`Unexpected parse errors:\n${errorString}`);
    }
    return tokenizeResult;
}
function humanizeParts(tokens) {
    return tokens.map((token) => [token.type, ...token.parts]);
}
function tokenizeAndHumanizeParts(input, options) {
    return humanizeParts(tokenizeWithoutErrors(input, options).tokens);
}
function tokenizeAndHumanizeSourceSpans(input, options) {
    return tokenizeWithoutErrors(input, options).tokens.map((token) => [
        token.type,
        token.sourceSpan.toString(),
    ]);
}
function humanizeLineColumn(location) {
    return `${location.line}:${location.col}`;
}
function tokenizeAndHumanizeLineColumn(input, options) {
    return tokenizeWithoutErrors(input, options).tokens.map((token) => [
        token.type,
        humanizeLineColumn(token.sourceSpan.start),
    ]);
}
function tokenizeAndHumanizeFullStart(input, options) {
    return tokenizeWithoutErrors(input, options).tokens.map((token) => [
        token.type,
        humanizeLineColumn(token.sourceSpan.start),
        humanizeLineColumn(token.sourceSpan.fullStart),
    ]);
}
function tokenizeAndHumanizeErrors(input, options) {
    return (0, lexer_1.tokenize)(input, 'someUrl', html_tags_1.getHtmlTagDefinition, options).errors.map((e) => [
        e.tokenType,
        e.msg,
        humanizeLineColumn(e.span.start),
    ]);
}
