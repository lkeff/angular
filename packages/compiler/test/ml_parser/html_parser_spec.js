"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanizeErrors = humanizeErrors;
const html = __importStar(require("../../src/ml_parser/ast"));
const html_parser_1 = require("../../src/ml_parser/html_parser");
const parser_1 = require("../../src/ml_parser/parser");
const ast_spec_utils_1 = require("./ast_spec_utils");
describe('HtmlParser', () => {
    let parser;
    beforeEach(() => {
        parser = new html_parser_1.HtmlParser();
    });
    describe('parse', () => {
        describe('text nodes', () => {
            it('should parse root level text nodes', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('a', 'TestComp'))).toEqual([[html.Text, 'a', 0, ['a']]]);
            });
            it('should parse text nodes inside regular elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div>a</div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, 'a', 1, ['a']],
                ]);
            });
            it('should parse text nodes inside <ng-template> elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<ng-template>a</ng-template>', 'TestComp'))).toEqual([
                    [html.Element, 'ng-template', 0],
                    [html.Text, 'a', 1, ['a']],
                ]);
            });
            it('should parse CDATA', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<![CDATA[text]]>', 'TestComp'))).toEqual([
                    [html.Text, 'text', 0, ['text']],
                ]);
            });
            it('should normalize line endings within CDATA', () => {
                const parsed = parser.parse('<![CDATA[ line 1 \r\n line 2 ]]>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Text, ' line 1 \n line 2 ', 0, [' line 1 \n line 2 ']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
        });
        describe('elements', () => {
            it('should parse root level elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                ]);
            });
            it('should parse elements inside of regular elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div><span></span></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Element, 'span', 1],
                ]);
            });
            it('should parse elements inside  <ng-template> elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<ng-template><span></span></ng-template>', 'TestComp'))).toEqual([
                    [html.Element, 'ng-template', 0],
                    [html.Element, 'span', 1],
                ]);
            });
            it('should support void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<link rel="author license" href="/about">', 'TestComp'))).toEqual([
                    [html.Element, 'link', 0],
                    [html.Attribute, 'rel', 'author license', ['author license']],
                    [html.Attribute, 'href', '/about', ['/about']],
                ]);
            });
            it('should not error on void elements from HTML5 spec', () => {
                // https://html.spec.whatwg.org/multipage/syntax.html#syntax-elements without:
                // <base> - it can be present in head only
                // <meta> - it can be present in head only
                // <command> - obsolete
                // <keygen> - obsolete
                [
                    '<map><area></map>',
                    '<div><br></div>',
                    '<colgroup><col></colgroup>',
                    '<div><embed></div>',
                    '<div><hr></div>',
                    '<div><img></div>',
                    '<div><input></div>',
                    '<object><param>/<object>',
                    '<audio><source></audio>',
                    '<audio><track></audio>',
                    '<p><wbr></p>',
                ].forEach((html) => {
                    expect(parser.parse(html, 'TestComp').errors).toEqual([]);
                });
            });
            it('should close void elements on text nodes', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<p>before<br>after</p>', 'TestComp'))).toEqual([
                    [html.Element, 'p', 0],
                    [html.Text, 'before', 1, ['before']],
                    [html.Element, 'br', 1],
                    [html.Text, 'after', 1, ['after']],
                ]);
            });
            it('should support optional end tags', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div><p>1<p>2</div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Element, 'p', 1],
                    [html.Text, '1', 2, ['1']],
                    [html.Element, 'p', 1],
                    [html.Text, '2', 2, ['2']],
                ]);
            });
            it('should support nested elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<ul><li><ul><li></li></ul></li></ul>', 'TestComp'))).toEqual([
                    [html.Element, 'ul', 0],
                    [html.Element, 'li', 1],
                    [html.Element, 'ul', 2],
                    [html.Element, 'li', 3],
                ]);
            });
            /**
             * Certain elements (like <tr> or <col>) require parent elements of a certain type (ex. <tr>
             * can only be inside <tbody> / <thead>). The Angular HTML parser doesn't validate those
             * HTML compliancy rules as "problematic" elements can be projected - in such case HTML (as
             * written in an Angular template) might be "invalid" (spec-wise) but the resulting DOM will
             * still be correct.
             */
            it('should not wraps elements in a required parent', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div><tr></tr></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Element, 'tr', 1],
                ]);
            });
            it('should support explicit namespace', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<myns:div></myns:div>', 'TestComp'))).toEqual([
                    [html.Element, ':myns:div', 0],
                ]);
            });
            it('should support implicit namespace', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg></svg>', 'TestComp'))).toEqual([
                    [html.Element, ':svg:svg', 0],
                ]);
            });
            it('should propagate the namespace', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<myns:div><p></p></myns:div>', 'TestComp'))).toEqual([
                    [html.Element, ':myns:div', 0],
                    [html.Element, ':myns:p', 1],
                ]);
            });
            it('should match closing tags case sensitive', () => {
                const errors = parser.parse('<DiV><P></p></dIv>', 'TestComp').errors;
                expect(errors.length).toEqual(2);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        'p',
                        'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:8',
                    ],
                    [
                        'dIv',
                        'Unexpected closing tag "dIv". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:12',
                    ],
                ]);
            });
            it('should support self closing void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<input />', 'TestComp'))).toEqual([
                    [html.Element, 'input', 0],
                ]);
            });
            it('should support self closing foreign elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<math />', 'TestComp'))).toEqual([
                    [html.Element, ':math:math', 0],
                ]);
            });
            it('should ignore LF immediately after textarea, pre and listing', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<p>\n</p><textarea>\n</textarea><pre>\n\n</pre><listing>\n\n</listing>', 'TestComp'))).toEqual([
                    [html.Element, 'p', 0],
                    [html.Text, '\n', 1, ['\n']],
                    [html.Element, 'textarea', 0],
                    [html.Element, 'pre', 0],
                    [html.Text, '\n', 1, ['\n']],
                    [html.Element, 'listing', 0],
                    [html.Text, '\n', 1, ['\n']],
                ]);
            });
            it('should normalize line endings in text', () => {
                let parsed;
                parsed = parser.parse('<title> line 1 \r\n line 2 </title>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'title', 0],
                    [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
                ]);
                expect(parsed.errors).toEqual([]);
                parsed = parser.parse('<script> line 1 \r\n line 2 </script>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'script', 0],
                    [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
                ]);
                expect(parsed.errors).toEqual([]);
                parsed = parser.parse('<div> line 1 \r\n line 2 </div>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
                ]);
                expect(parsed.errors).toEqual([]);
                parsed = parser.parse('<span> line 1 \r\n line 2 </span>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'span', 0],
                    [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should parse element with JavaScript keyword tag name', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<constructor></constructor>', 'TestComp'))).toEqual([
                    [html.Element, 'constructor', 0],
                ]);
            });
        });
        describe('attributes', () => {
            it('should parse attributes on regular elements case sensitive', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div kEy="v" key2=v2></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'kEy', 'v', ['v']],
                    [html.Attribute, 'key2', 'v2', ['v2']],
                ]);
            });
            it('should parse attributes containing interpolation', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div foo="1{{message}}2"></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'foo', '1{{message}}2', ['1'], ['{{', 'message', '}}'], ['2']],
                ]);
            });
            it('should parse attributes containing unquoted interpolation', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div foo={{message}}></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'foo', '{{message}}', [''], ['{{', 'message', '}}'], ['']],
                ]);
            });
            it('should parse bound inputs with expressions containing newlines', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse(`<app-component
                        [attr]="[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]"></app-component>`, 'TestComp'))).toEqual([
                    [html.Element, 'app-component', 0],
                    [
                        html.Attribute,
                        '[attr]',
                        `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                        [
                            `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                        ],
                    ],
                ]);
            });
            it('should parse attributes containing encoded entities', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div foo="&amp;"></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'foo', '&', [''], ['&', '&amp;'], ['']],
                ]);
            });
            it('should parse attributes containing unquoted interpolation', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div foo={{message}}></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'foo', '{{message}}', [''], ['{{', 'message', '}}'], ['']],
                ]);
            });
            it('should parse bound inputs with expressions containing newlines', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse(`<app-component
                        [attr]="[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]"></app-component>`, 'TestComp'))).toEqual([
                    [html.Element, 'app-component', 0],
                    [
                        html.Attribute,
                        '[attr]',
                        `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                        [
                            `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                        ],
                    ],
                ]);
            });
            it('should decode HTML entities in interpolated attributes', () => {
                // Note that the detail of decoding corner-cases is tested in the
                // "should decode HTML entities in interpolations" spec.
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div foo="{{&amp;}}"></div>', 'TestComp'))).toEqual([
                    [
                        html.Element,
                        'div',
                        0,
                        '<div foo="{{&amp;}}"></div>',
                        '<div foo="{{&amp;}}">',
                        '</div>',
                    ],
                    [html.Attribute, 'foo', '{{&}}', [''], ['{{', '&amp;', '}}'], [''], 'foo="{{&amp;}}"'],
                ]);
            });
            it('should normalize line endings within attribute values', () => {
                const result = parser.parse('<div key="  \r\n line 1 \r\n   line 2  "></div>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeDom)(result)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'key', '  \n line 1 \n   line 2  ', ['  \n line 1 \n   line 2  ']],
                ]);
                expect(result.errors).toEqual([]);
            });
            it('should parse attributes without values', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<div k></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'k', ''],
                ]);
            });
            it('should parse attributes on svg elements case sensitive', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg viewBox="0"></svg>', 'TestComp'))).toEqual([
                    [html.Element, ':svg:svg', 0],
                    [html.Attribute, 'viewBox', '0', ['0']],
                ]);
            });
            it('should parse attributes on <ng-template> elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<ng-template k="v"></ng-template>', 'TestComp'))).toEqual([
                    [html.Element, 'ng-template', 0],
                    [html.Attribute, 'k', 'v', ['v']],
                ]);
            });
            it('should support namespace', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg:use xlink:href="Port" />', 'TestComp'))).toEqual([
                    [html.Element, ':svg:use', 0],
                    [html.Attribute, ':xlink:href', 'Port', ['Port']],
                ]);
            });
            it('should support a prematurely terminated interpolation in attribute', () => {
                const { errors, rootNodes } = parser.parse('<div p="{{ abc"><span></span>', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeNodes)(rootNodes, true)).toEqual([
                    [html.Element, 'div', 0, '<div p="{{ abc">', '<div p="{{ abc">', null],
                    [html.Attribute, 'p', '{{ abc', [''], ['{{', ' abc'], [''], 'p="{{ abc"'],
                    [html.Element, 'span', 1, '<span></span>', '<span>', '</span>'],
                ]);
                expect(humanizeErrors(errors)).toEqual([]);
            });
        });
        describe('comments', () => {
            it('should preserve comments', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<!-- comment --><div></div>', 'TestComp'))).toEqual([
                    [html.Comment, 'comment', 0],
                    [html.Element, 'div', 0],
                ]);
            });
            it('should normalize line endings within comments', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<!-- line 1 \r\n line 2 -->', 'TestComp'))).toEqual([
                    [html.Comment, 'line 1 \n line 2', 0],
                ]);
            });
        });
        describe('expansion forms', () => {
            it('should parse out expansion forms', () => {
                const parsed = parser.parse(`<div>before{messages.length, plural, =0 {You have <b>no</b> messages} =1 {One {{message}}}}after</div>`, 'TestComp', { tokenizeExpansionForms: true });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, 'before', 1, ['before']],
                    [html.Expansion, 'messages.length', 'plural', 1],
                    [html.ExpansionCase, '=0', 2],
                    [html.ExpansionCase, '=1', 2],
                    [html.Text, 'after', 1, ['after']],
                ]);
                const cases = parsed.rootNodes[0].children[1].cases;
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[0].expression, []))).toEqual([
                    [html.Text, 'You have ', 0, ['You have ']],
                    [html.Element, 'b', 0],
                    [html.Text, 'no', 1, ['no']],
                    [html.Text, ' messages', 0, [' messages']],
                ]);
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[1].expression, []))).toEqual([
                    [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']],
                ]);
            });
            it('should normalize line-endings in expansion forms in inline templates if `i18nNormalizeLineEndingsInICUs` is true', () => {
                const parsed = parser.parse(`<div>\r\n` +
                    `  {\r\n` +
                    `    messages.length,\r\n` +
                    `    plural,\r\n` +
                    `    =0 {You have \r\nno\r\n messages}\r\n` +
                    `    =1 {One {{message}}}}\r\n` +
                    `</div>`, 'TestComp', {
                    tokenizeExpansionForms: true,
                    escapedString: true,
                    i18nNormalizeLineEndingsInICUs: true,
                });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, '\n  ', 1, ['\n  ']],
                    [html.Expansion, '\n    messages.length', 'plural', 1],
                    [html.ExpansionCase, '=0', 2],
                    [html.ExpansionCase, '=1', 2],
                    [html.Text, '\n', 1, ['\n']],
                ]);
                const cases = parsed.rootNodes[0].children[1].cases;
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[0].expression, []))).toEqual([
                    [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
                ]);
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[1].expression, []))).toEqual([
                    [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should not normalize line-endings in ICU expressions in external templates when `i18nNormalizeLineEndingsInICUs` is not set', () => {
                const parsed = parser.parse(`<div>\r\n` +
                    `  {\r\n` +
                    `    messages.length,\r\n` +
                    `    plural,\r\n` +
                    `    =0 {You have \r\nno\r\n messages}\r\n` +
                    `    =1 {One {{message}}}}\r\n` +
                    `</div>`, 'TestComp', { tokenizeExpansionForms: true, escapedString: true });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, '\n  ', 1, ['\n  ']],
                    [html.Expansion, '\r\n    messages.length', 'plural', 1],
                    [html.ExpansionCase, '=0', 2],
                    [html.ExpansionCase, '=1', 2],
                    [html.Text, '\n', 1, ['\n']],
                ]);
                const cases = parsed.rootNodes[0].children[1].cases;
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[0].expression, []))).toEqual([
                    [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
                ]);
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[1].expression, []))).toEqual([
                    [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should normalize line-endings in expansion forms in external templates if `i18nNormalizeLineEndingsInICUs` is true', () => {
                const parsed = parser.parse(`<div>\r\n` +
                    `  {\r\n` +
                    `    messages.length,\r\n` +
                    `    plural,\r\n` +
                    `    =0 {You have \r\nno\r\n messages}\r\n` +
                    `    =1 {One {{message}}}}\r\n` +
                    `</div>`, 'TestComp', {
                    tokenizeExpansionForms: true,
                    escapedString: false,
                    i18nNormalizeLineEndingsInICUs: true,
                });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, '\n  ', 1, ['\n  ']],
                    [html.Expansion, '\n    messages.length', 'plural', 1],
                    [html.ExpansionCase, '=0', 2],
                    [html.ExpansionCase, '=1', 2],
                    [html.Text, '\n', 1, ['\n']],
                ]);
                const cases = parsed.rootNodes[0].children[1].cases;
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[0].expression, []))).toEqual([
                    [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
                ]);
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[1].expression, []))).toEqual([
                    [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should not normalize line-endings in ICU expressions in external templates when `i18nNormalizeLineEndingsInICUs` is not set', () => {
                const parsed = parser.parse(`<div>\r\n` +
                    `  {\r\n` +
                    `    messages.length,\r\n` +
                    `    plural,\r\n` +
                    `    =0 {You have \r\nno\r\n messages}\r\n` +
                    `    =1 {One {{message}}}}\r\n` +
                    `</div>`, 'TestComp', { tokenizeExpansionForms: true, escapedString: false });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Text, '\n  ', 1, ['\n  ']],
                    [html.Expansion, '\r\n    messages.length', 'plural', 1],
                    [html.ExpansionCase, '=0', 2],
                    [html.ExpansionCase, '=1', 2],
                    [html.Text, '\n', 1, ['\n']],
                ]);
                const cases = parsed.rootNodes[0].children[1].cases;
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[0].expression, []))).toEqual([
                    [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
                ]);
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(cases[1].expression, []))).toEqual([
                    [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should parse out expansion forms', () => {
                const parsed = parser.parse(`<div><span>{a, plural, =0 {b}}</span></div>`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Element, 'div', 0],
                    [html.Element, 'span', 1],
                    [html.Expansion, 'a', 'plural', 2],
                    [html.ExpansionCase, '=0', 3],
                ]);
            });
            it('should parse out nested expansion forms', () => {
                const parsed = parser.parse(`{messages.length, plural, =0 { {p.gender, select, male {m}} }}`, 'TestComp', { tokenizeExpansionForms: true });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Expansion, 'messages.length', 'plural', 0],
                    [html.ExpansionCase, '=0', 1],
                ]);
                const firstCase = parsed.rootNodes[0].cases[0];
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(firstCase.expression, []))).toEqual([
                    [html.Expansion, 'p.gender', 'select', 0],
                    [html.ExpansionCase, 'male', 1],
                    [html.Text, ' ', 0, [' ']],
                ]);
            });
            it('should normalize line endings in nested expansion forms for inline templates, when `i18nNormalizeLineEndingsInICUs` is true', () => {
                const parsed = parser.parse(`{\r\n` +
                    `  messages.length, plural,\r\n` +
                    `  =0 { zero \r\n` +
                    `       {\r\n` +
                    `         p.gender, select,\r\n` +
                    `         male {m}\r\n` +
                    `       }\r\n` +
                    `     }\r\n` +
                    `}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                    escapedString: true,
                    i18nNormalizeLineEndingsInICUs: true,
                });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Expansion, '\n  messages.length', 'plural', 0],
                    [html.ExpansionCase, '=0', 1],
                ]);
                const expansion = parsed.rootNodes[0];
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
                    [html.Text, 'zero \n       ', 0, ['zero \n       ']],
                    [html.Expansion, '\n         p.gender', 'select', 0],
                    [html.ExpansionCase, 'male', 1],
                    [html.Text, '\n     ', 0, ['\n     ']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should not normalize line endings in nested expansion forms for inline templates, when `i18nNormalizeLineEndingsInICUs` is not defined', () => {
                const parsed = parser.parse(`{\r\n` +
                    `  messages.length, plural,\r\n` +
                    `  =0 { zero \r\n` +
                    `       {\r\n` +
                    `         p.gender, select,\r\n` +
                    `         male {m}\r\n` +
                    `       }\r\n` +
                    `     }\r\n` +
                    `}`, 'TestComp', { tokenizeExpansionForms: true, escapedString: true });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Expansion, '\r\n  messages.length', 'plural', 0],
                    [html.ExpansionCase, '=0', 1],
                ]);
                const expansion = parsed.rootNodes[0];
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
                    [html.Text, 'zero \n       ', 0, ['zero \n       ']],
                    [html.Expansion, '\r\n         p.gender', 'select', 0],
                    [html.ExpansionCase, 'male', 1],
                    [html.Text, '\n     ', 0, ['\n     ']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should not normalize line endings in nested expansion forms for external templates, when `i18nNormalizeLineEndingsInICUs` is not set', () => {
                const parsed = parser.parse(`{\r\n` +
                    `  messages.length, plural,\r\n` +
                    `  =0 { zero \r\n` +
                    `       {\r\n` +
                    `         p.gender, select,\r\n` +
                    `         male {m}\r\n` +
                    `       }\r\n` +
                    `     }\r\n` +
                    `}`, 'TestComp', { tokenizeExpansionForms: true });
                expect((0, ast_spec_utils_1.humanizeDom)(parsed)).toEqual([
                    [html.Expansion, '\r\n  messages.length', 'plural', 0],
                    [html.ExpansionCase, '=0', 1],
                ]);
                const expansion = parsed.rootNodes[0];
                expect((0, ast_spec_utils_1.humanizeDom)(new parser_1.ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
                    [html.Text, 'zero \n       ', 0, ['zero \n       ']],
                    [html.Expansion, '\r\n         p.gender', 'select', 0],
                    [html.ExpansionCase, 'male', 1],
                    [html.Text, '\n     ', 0, ['\n     ']],
                ]);
                expect(parsed.errors).toEqual([]);
            });
            it('should error when expansion form is not closed', () => {
                const p = parser.parse(`{messages.length, plural, =0 {one}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(humanizeErrors(p.errors)).toEqual([
                    [null, "Invalid ICU message. Missing '}'.", '0:34'],
                ]);
            });
            it('should support ICU expressions with cases that contain numbers', () => {
                const p = parser.parse(`{sex, select, male {m} female {f} 0 {other}}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(p.errors.length).toEqual(0);
            });
            it(`should support ICU expressions with cases that contain any character except '}'`, () => {
                const p = parser.parse(`{a, select, b {foo} % bar {% bar}}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(p.errors.length).toEqual(0);
            });
            it('should error when expansion case is not properly closed', () => {
                const p = parser.parse(`{a, select, b {foo} % { bar {% bar}}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(humanizeErrors(p.errors)).toEqual([
                    [
                        7 /* TokenType.RAW_TEXT */,
                        'Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ \'{\' }}") to escape it.)',
                        '0:36',
                    ],
                    [null, "Invalid ICU message. Missing '}'.", '0:22'],
                ]);
            });
            it('should error when expansion case is not closed', () => {
                const p = parser.parse(`{messages.length, plural, =0 {one`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(humanizeErrors(p.errors)).toEqual([
                    [null, "Invalid ICU message. Missing '}'.", '0:29'],
                ]);
            });
            it('should error when invalid html in the case', () => {
                const p = parser.parse(`{messages.length, plural, =0 {<b/>}`, 'TestComp', {
                    tokenizeExpansionForms: true,
                });
                expect(humanizeErrors(p.errors)).toEqual([
                    ['b', 'Only void, custom and foreign elements can be self closed "b"', '0:30'],
                ]);
            });
        });
        describe('blocks', () => {
            it('should parse a block', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@foo (a b; c d){hello}', 'TestComp'))).toEqual([
                    [html.Block, 'foo', 0],
                    [html.BlockParameter, 'a b'],
                    [html.BlockParameter, 'c d'],
                    [html.Text, 'hello', 1, ['hello']],
                ]);
            });
            it('should parse a block with an HTML element', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@defer {<my-cmp/>}', 'TestComp'))).toEqual([
                    [html.Block, 'defer', 0],
                    [html.Element, 'my-cmp', 1],
                ]);
            });
            it('should parse a block containing mixed plain text and HTML', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@switch (expr) {' +
                    '@case (1) {hello<my-cmp/>there}' +
                    '@case (two) {<p>Two...</p>}' +
                    '@case (isThree(3)) {T<strong>htr<i>e</i>e</strong>!}' +
                    '}', 'TestComp'))).toEqual([
                    [html.Block, 'switch', 0],
                    [html.BlockParameter, 'expr'],
                    [html.Block, 'case', 1],
                    [html.BlockParameter, '1'],
                    [html.Text, 'hello', 2, ['hello']],
                    [html.Element, 'my-cmp', 2],
                    [html.Text, 'there', 2, ['there']],
                    [html.Block, 'case', 1],
                    [html.BlockParameter, 'two'],
                    [html.Element, 'p', 2],
                    [html.Text, 'Two...', 3, ['Two...']],
                    [html.Block, 'case', 1],
                    [html.BlockParameter, 'isThree(3)'],
                    [html.Text, 'T', 2, ['T']],
                    [html.Element, 'strong', 2],
                    [html.Text, 'htr', 3, ['htr']],
                    [html.Element, 'i', 3],
                    [html.Text, 'e', 4, ['e']],
                    [html.Text, 'e', 3, ['e']],
                    [html.Text, '!', 2, ['!']],
                ]);
            });
            it('should parse nested blocks', () => {
                const markup = `<root-sibling-one/>` +
                    `@root {` +
                    `<outer-child-one/>` +
                    `<outer-child-two>` +
                    `@child (childParam === 1) {` +
                    `@innerChild (innerChild1 === foo) {` +
                    `<inner-child-one/>` +
                    `@grandChild {` +
                    `@innerGrandChild {` +
                    `<inner-grand-child-one/>` +
                    `}` +
                    `@innerGrandChild {` +
                    `<inner-grand-child-two/>` +
                    `}` +
                    `}` +
                    `}` +
                    `@innerChild {` +
                    `<inner-child-two/>` +
                    `}` +
                    `}` +
                    `</outer-child-two>` +
                    `@outerChild (outerChild1; outerChild2) {` +
                    `<outer-child-three/>` +
                    `}` +
                    `} <root-sibling-two/>`;
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse(markup, 'TestComp'))).toEqual([
                    [html.Element, 'root-sibling-one', 0],
                    [html.Block, 'root', 0],
                    [html.Element, 'outer-child-one', 1],
                    [html.Element, 'outer-child-two', 1],
                    [html.Block, 'child', 2],
                    [html.BlockParameter, 'childParam === 1'],
                    [html.Block, 'innerChild', 3],
                    [html.BlockParameter, 'innerChild1 === foo'],
                    [html.Element, 'inner-child-one', 4],
                    [html.Block, 'grandChild', 4],
                    [html.Block, 'innerGrandChild', 5],
                    [html.Element, 'inner-grand-child-one', 6],
                    [html.Block, 'innerGrandChild', 5],
                    [html.Element, 'inner-grand-child-two', 6],
                    [html.Block, 'innerChild', 3],
                    [html.Element, 'inner-child-two', 4],
                    [html.Block, 'outerChild', 1],
                    [html.BlockParameter, 'outerChild1'],
                    [html.BlockParameter, 'outerChild2'],
                    [html.Element, 'outer-child-three', 2],
                    [html.Text, ' ', 0, [' ']],
                    [html.Element, 'root-sibling-two', 0],
                ]);
            });
            it('should infer namespace through block boundary', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg>@if (cond) {<circle/>}</svg>', 'TestComp'))).toEqual([
                    [html.Element, ':svg:svg', 0],
                    [html.Block, 'if', 1],
                    [html.BlockParameter, 'cond'],
                    [html.Element, ':svg:circle', 2],
                ]);
            });
            it('should parse an empty block', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@foo{}', 'TestComp'))).toEqual([[html.Block, 'foo', 0]]);
            });
            it('should parse a block with void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@foo {<br>}', 'TestComp'))).toEqual([
                    [html.Block, 'foo', 0],
                    [html.Element, 'br', 1],
                ]);
            });
            it('should close void elements used right before a block', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('<img>@foo {hello}', 'TestComp'))).toEqual([
                    [html.Element, 'img', 0],
                    [html.Block, 'foo', 0],
                    [html.Text, 'hello', 1, ['hello']],
                ]);
            });
            it('should report an unclosed block', () => {
                const errors = parser.parse('@foo {hello', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([['foo', 'Unclosed block "foo"', '0:0']]);
            });
            it('should report an unexpected block close', () => {
                const errors = parser.parse('hello}', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        null,
                        'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.',
                        '0:5',
                    ],
                ]);
            });
            it('should report unclosed tags inside of a block', () => {
                const errors = parser.parse('@foo {<strong>hello}', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        null,
                        'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.',
                        '0:19',
                    ],
                ]);
            });
            it('should report an unexpected closing tag inside a block', () => {
                const errors = parser.parse('<div>@if (cond) {hello</div>}', 'TestComp').errors;
                expect(errors.length).toEqual(2);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        'div',
                        'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:22',
                    ],
                    [
                        null,
                        'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.',
                        '0:28',
                    ],
                ]);
            });
            it('should store the source locations of blocks', () => {
                const markup = '@switch (expr) {' +
                    '@case (1) {<div>hello</div>world}' +
                    '@case (two) {Two}' +
                    '@case (isThree(3)) {Placeholde<strong>r</strong>}' +
                    '}';
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse(markup, 'TestComp'))).toEqual([
                    [
                        html.Block,
                        'switch',
                        0,
                        '@switch (expr) {@case (1) {<div>hello</div>world}@case (two) {Two}@case (isThree(3)) {Placeholde<strong>r</strong>}}',
                        '@switch (expr) {',
                        '}',
                    ],
                    [html.BlockParameter, 'expr', 'expr'],
                    [html.Block, 'case', 1, '@case (1) {<div>hello</div>world}', '@case (1) {', '}'],
                    [html.BlockParameter, '1', '1'],
                    [html.Element, 'div', 2, '<div>hello</div>', '<div>', '</div>'],
                    [html.Text, 'hello', 3, ['hello'], 'hello'],
                    [html.Text, 'world', 2, ['world'], 'world'],
                    [html.Block, 'case', 1, '@case (two) {Two}', '@case (two) {', '}'],
                    [html.BlockParameter, 'two', 'two'],
                    [html.Text, 'Two', 2, ['Two'], 'Two'],
                    [
                        html.Block,
                        'case',
                        1,
                        '@case (isThree(3)) {Placeholde<strong>r</strong>}',
                        '@case (isThree(3)) {',
                        '}',
                    ],
                    [html.BlockParameter, 'isThree(3)', 'isThree(3)'],
                    [html.Text, 'Placeholde', 2, ['Placeholde'], 'Placeholde'],
                    [html.Element, 'strong', 2, '<strong>r</strong>', '<strong>', '</strong>'],
                    [html.Text, 'r', 3, ['r'], 'r'],
                ]);
            });
            it('should parse an incomplete block with no parameters', () => {
                const result = parser.parse('Use the @Input() decorator', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeNodes)(result.rootNodes, true)).toEqual([
                    [html.Text, 'Use the ', 0, ['Use the '], 'Use the '],
                    [html.Block, 'Input', 0, '@Input() ', '@Input() ', null],
                    [html.Text, 'decorator', 0, ['decorator'], 'decorator'],
                ]);
                expect(humanizeErrors(result.errors)).toEqual([
                    [
                        'Input',
                        'Incomplete block "Input". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.',
                        '0:8',
                    ],
                ]);
            });
            it('should parse an incomplete block with no parameters', () => {
                const result = parser.parse('Use @Input({alias: "foo"}) to alias your input', 'TestComp');
                expect((0, ast_spec_utils_1.humanizeNodes)(result.rootNodes, true)).toEqual([
                    [html.Text, 'Use ', 0, ['Use '], 'Use '],
                    [html.Block, 'Input', 0, '@Input({alias: "foo"}) ', '@Input({alias: "foo"}) ', null],
                    [html.BlockParameter, '{alias: "foo"}', '{alias: "foo"}'],
                    [html.Text, 'to alias your input', 0, ['to alias your input'], 'to alias your input'],
                ]);
                expect(humanizeErrors(result.errors)).toEqual([
                    [
                        'Input',
                        'Incomplete block "Input". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.',
                        '0:4',
                    ],
                ]);
            });
        });
        describe('let declaration', () => {
            it('should parse a let declaration', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@let foo = 123;', 'TestCmp'))).toEqual([
                    [html.LetDeclaration, 'foo', '123'],
                ]);
            });
            it('should parse a let declaration that is nested in a parent', () => {
                expect((0, ast_spec_utils_1.humanizeDom)(parser.parse('@grandparent {@parent {@let foo = 123;}}', 'TestCmp'))).toEqual([
                    [html.Block, 'grandparent', 0],
                    [html.Block, 'parent', 1],
                    [html.LetDeclaration, 'foo', '123'],
                ]);
            });
            it('should store the source location of a @let declaration', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('@let foo = 123 + 456;', 'TestCmp'))).toEqual([
                    [html.LetDeclaration, 'foo', '123 + 456', '@let foo = 123 + 456', 'foo', '123 + 456'],
                ]);
            });
            it('should report an error for an incomplete let declaration', () => {
                expect(humanizeErrors(parser.parse('@let foo =', 'TestCmp').errors)).toEqual([
                    [
                        'foo',
                        'Incomplete @let declaration "foo". @let declarations must be written as `@let <name> = <value>;`',
                        '0:0',
                    ],
                ]);
            });
            it('should store the locations of an incomplete let declaration', () => {
                const parseResult = parser.parse('@let foo =', 'TestCmp');
                // It's expected that errors will be reported for the incomplete declaration,
                // but we still want to check the spans since they're important even for broken templates.
                parseResult.errors = [];
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parseResult)).toEqual([
                    [html.LetDeclaration, 'foo', '', '@let foo =', 'foo =', ''],
                ]);
            });
        });
        describe('directive nodes', () => {
            const options = {
                selectorlessEnabled: true,
            };
            it('should parse a directive with no attributes', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<div @Dir></div>', '', options));
                expect(parsed).toEqual([
                    [html.Element, 'div', 0],
                    [html.Directive, 'Dir'],
                ]);
            });
            it('should parse a directive with attributes', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<div @Dir(a="1" [b]="two" (c)="c()")></div>', '', options));
                expect(parsed).toEqual([
                    [html.Element, 'div', 0],
                    [html.Directive, 'Dir'],
                    [html.Attribute, 'a', '1', ['1']],
                    [html.Attribute, '[b]', 'two', ['two']],
                    [html.Attribute, '(c)', 'c()', ['c()']],
                ]);
            });
            it('should parse directives on a component node', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp @Dir @OtherDir(a="1" [b]="two" (c)="c()")></MyComp>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', null, 'MyComp', 0],
                    [html.Directive, 'Dir'],
                    [html.Directive, 'OtherDir'],
                    [html.Attribute, 'a', '1', ['1']],
                    [html.Attribute, '[b]', 'two', ['two']],
                    [html.Attribute, '(c)', 'c()', ['c()']],
                ]);
            });
            it('should report a missing directive closing paren', () => {
                expect(humanizeErrors(parser.parse('<div @Dir(a="1" (b)="2"></div>', '', options).errors)).toEqual([[null, 'Unterminated directive definition', '0:5']]);
                expect(humanizeErrors(parser.parse('<MyComp @Dir(a="1" (b)="2"/>', '', options).errors)).toEqual([[null, 'Unterminated directive definition', '0:8']]);
            });
            it('should parse a directive mixed with other attributes', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<div before="foo" @Dir middle @OtherDir([a]="a" (b)="b()") after="123"></div>', '', options));
                expect(parsed).toEqual([
                    [html.Element, 'div', 0],
                    [html.Attribute, 'before', 'foo', ['foo']],
                    [html.Attribute, 'middle', ''],
                    [html.Attribute, 'after', '123', ['123']],
                    [html.Directive, 'Dir'],
                    [html.Directive, 'OtherDir'],
                    [html.Attribute, '[a]', 'a', ['a']],
                    [html.Attribute, '(b)', 'b()', ['b()']],
                ]);
            });
            it('should store the source locations of directives', () => {
                const markup = '<div @Dir @OtherDir(a="1" [b]="two" (c)="c()")></div>';
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse(markup, '', options))).toEqual([
                    [
                        html.Element,
                        'div',
                        0,
                        '<div @Dir @OtherDir(a="1" [b]="two" (c)="c()")></div>',
                        '<div @Dir @OtherDir(a="1" [b]="two" (c)="c()")>',
                        '</div>',
                    ],
                    [html.Directive, 'Dir', '@Dir', '@Dir', null],
                    [html.Directive, 'OtherDir', '@OtherDir(a="1" [b]="two" (c)="c()")', '@OtherDir(', ')'],
                    [html.Attribute, 'a', '1', ['1'], 'a="1"'],
                    [html.Attribute, '[b]', 'two', ['two'], '[b]="two"'],
                    [html.Attribute, '(c)', 'c()', ['c()'], '(c)="c()"'],
                ]);
            });
        });
        describe('component nodes', () => {
            const options = {
                selectorlessEnabled: true,
            };
            it('should parse a simple component node', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp>Hello</MyComp>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', null, 'MyComp', 0],
                    [html.Text, 'Hello', 1, ['Hello']],
                ]);
            });
            it('should parse a self-closing component node', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp/>Hello', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', null, 'MyComp', 0],
                    [html.Text, 'Hello', 0, ['Hello']],
                ]);
            });
            it('should parse a component node with a tag name', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp:button>Hello</MyComp:button>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', 'button', 'MyComp:button', 0],
                    [html.Text, 'Hello', 1, ['Hello']],
                ]);
            });
            it('should parse a component node with a tag name and namespace', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp:svg:title>Hello</MyComp:svg:title>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', ':svg:title', 'MyComp:svg:title', 0],
                    [html.Text, 'Hello', 1, ['Hello']],
                ]);
            });
            it('should parse a component node with an inferred namespace and no tag name', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg><MyComp>Hello</MyComp></svg>', '', options));
                expect(parsed).toEqual([
                    [html.Element, ':svg:svg', 0],
                    [html.Component, 'MyComp', ':svg:ng-component', 'MyComp:svg:ng-component', 1],
                    [html.Text, 'Hello', 2, ['Hello']],
                ]);
            });
            it('should parse a component node with an inferred namespace and a tag name', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<svg><MyComp:button>Hello</MyComp:button></svg>', '', options));
                expect(parsed).toEqual([
                    [html.Element, ':svg:svg', 0],
                    [html.Component, 'MyComp', ':svg:button', 'MyComp:svg:button', 1],
                    [html.Text, 'Hello', 2, ['Hello']],
                ]);
            });
            it('should parse a component node with an inferred namespace plus an explicit namespace and tag name', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<math><MyComp:svg:title>Hello</MyComp:svg:title></math>', '', options));
                expect(parsed).toEqual([
                    [html.Element, ':math:math', 0],
                    [html.Component, 'MyComp', ':svg:title', 'MyComp:svg:title', 1],
                    [html.Text, 'Hello', 2, ['Hello']],
                ]);
            });
            it('should distinguish components with tag names from ones without', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp:button><MyComp>Hello</MyComp></MyComp:button>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', 'button', 'MyComp:button', 0],
                    [html.Component, 'MyComp', null, 'MyComp', 1],
                    [html.Text, 'Hello', 2, ['Hello']],
                ]);
            });
            it('should implicitly close a component', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp>Hello', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', null, 'MyComp', 0],
                    [html.Text, 'Hello', 1, ['Hello']],
                ]);
            });
            it('should parse a component tag nested within other markup', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('@if (expr) {<div>Hello: <MyComp><span><OtherComp/></span></MyComp></div>}', '', options));
                expect(parsed).toEqual([
                    [html.Block, 'if', 0],
                    [html.BlockParameter, 'expr'],
                    [html.Element, 'div', 1],
                    [html.Text, 'Hello: ', 2, ['Hello: ']],
                    [html.Component, 'MyComp', null, 'MyComp', 2],
                    [html.Element, 'span', 3],
                    [html.Component, 'OtherComp', null, 'OtherComp', 4],
                ]);
            });
            it('should report closing tag whose tag name does not match the opening tag', () => {
                expect(humanizeErrors(parser.parse('<MyComp:button>Hello</MyComp>', '', options).errors)).toEqual([
                    ['MyComp', 'Unexpected closing tag "MyComp", did you mean "MyComp:button"?', '0:20'],
                ]);
                expect(humanizeErrors(parser.parse('<MyComp>Hello</MyComp:button>', '', options).errors)).toEqual([
                    [
                        'MyComp:button',
                        'Unexpected closing tag "MyComp:button", did you mean "MyComp"?',
                        '0:13',
                    ],
                ]);
            });
            it('should parse a component node with attributes and directives', () => {
                const parsed = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<MyComp before="foo" @Dir middle @OtherDir([a]="a" (b)="b()") after="123">Hello</MyComp>', '', options));
                expect(parsed).toEqual([
                    [html.Component, 'MyComp', null, 'MyComp', 0],
                    [html.Attribute, 'before', 'foo', ['foo']],
                    [html.Attribute, 'middle', ''],
                    [html.Attribute, 'after', '123', ['123']],
                    [html.Directive, 'Dir'],
                    [html.Directive, 'OtherDir'],
                    [html.Attribute, '[a]', 'a', ['a']],
                    [html.Attribute, '(b)', 'b()', ['b()']],
                    [html.Text, 'Hello', 1, ['Hello']],
                ]);
            });
            it('should store the source locations of a component with attributes and content', () => {
                const markup = '<MyComp one="1" two [three]="3">Hello</MyComp>';
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse(markup, '', options))).toEqual([
                    [
                        html.Component,
                        'MyComp',
                        null,
                        'MyComp',
                        0,
                        '<MyComp one="1" two [three]="3">Hello</MyComp>',
                        '<MyComp one="1" two [three]="3">',
                        '</MyComp>',
                    ],
                    [html.Attribute, 'one', '1', ['1'], 'one="1"'],
                    [html.Attribute, 'two', '', 'two'],
                    [html.Attribute, '[three]', '3', ['3'], '[three]="3"'],
                    [html.Text, 'Hello', 1, ['Hello'], 'Hello'],
                ]);
            });
            it('should store the source locations of self-closing components', () => {
                const markup = '<MyComp one="1" two [three]="3"/>Hello<MyOtherComp/><MyThirdComp:button/>';
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse(markup, '', options))).toEqual([
                    [
                        html.Component,
                        'MyComp',
                        null,
                        'MyComp',
                        0,
                        '<MyComp one="1" two [three]="3"/>',
                        '<MyComp one="1" two [three]="3"/>',
                        '<MyComp one="1" two [three]="3"/>',
                    ],
                    [html.Attribute, 'one', '1', ['1'], 'one="1"'],
                    [html.Attribute, 'two', '', 'two'],
                    [html.Attribute, '[three]', '3', ['3'], '[three]="3"'],
                    [html.Text, 'Hello', 0, ['Hello'], 'Hello'],
                    [
                        html.Component,
                        'MyOtherComp',
                        null,
                        'MyOtherComp',
                        0,
                        '<MyOtherComp/>',
                        '<MyOtherComp/>',
                        '<MyOtherComp/>',
                    ],
                    [
                        html.Component,
                        'MyThirdComp',
                        'button',
                        'MyThirdComp:button',
                        0,
                        '<MyThirdComp:button/>',
                        '<MyThirdComp:button/>',
                        '<MyThirdComp:button/>',
                    ],
                ]);
            });
        });
        describe('source spans', () => {
            it('should store the location', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div [prop]="v1" (e)="do()" attr="v2" noValue>\na\n</div>', ' TestComp'))).toEqual([
                    [
                        html.Element,
                        'div',
                        0,
                        '<div [prop]="v1" (e)="do()" attr="v2" noValue>\na\n</div>',
                        '<div [prop]="v1" (e)="do()" attr="v2" noValue>',
                        '</div>',
                    ],
                    [html.Attribute, '[prop]', 'v1', ['v1'], '[prop]="v1"'],
                    [html.Attribute, '(e)', 'do()', ['do()'], '(e)="do()"'],
                    [html.Attribute, 'attr', 'v2', ['v2'], 'attr="v2"'],
                    [html.Attribute, 'noValue', '', 'noValue'],
                    [html.Text, '\na\n', 1, ['\na\n'], '\na\n'],
                ]);
            });
            it('should set the start and end source spans', () => {
                const node = parser.parse('<div>a</div>', 'TestComp').rootNodes[0];
                expect(node.startSourceSpan.start.offset).toEqual(0);
                expect(node.startSourceSpan.end.offset).toEqual(5);
                expect(node.endSourceSpan.start.offset).toEqual(6);
                expect(node.endSourceSpan.end.offset).toEqual(12);
            });
            // This checks backward compatibility with a previous version of the lexer, which would
            // treat interpolation expressions as regular HTML escapable text.
            it('should decode HTML entities in interpolations', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('{{&amp;}}' +
                    '{{&#x25BE;}}' +
                    '{{&#9662;}}' +
                    '{{&unknown;}}' +
                    '{{&amp (no semi-colon)}}' +
                    '{{&#xyz; (invalid hex)}}' +
                    '{{&#25BE; (invalid decimal)}}', 'TestComp'))).toEqual([
                    [
                        html.Text,
                        '{{&}}' +
                            '{{\u25BE}}' +
                            '{{\u25BE}}' +
                            '{{&unknown;}}' +
                            '{{&amp (no semi-colon)}}' +
                            '{{&#xyz; (invalid hex)}}' +
                            '{{&#25BE; (invalid decimal)}}',
                        0,
                        [''],
                        ['{{', '&amp;', '}}'],
                        [''],
                        ['{{', '&#x25BE;', '}}'],
                        [''],
                        ['{{', '&#9662;', '}}'],
                        [''],
                        ['{{', '&unknown;', '}}'],
                        [''],
                        ['{{', '&amp (no semi-colon)', '}}'],
                        [''],
                        ['{{', '&#xyz; (invalid hex)', '}}'],
                        [''],
                        ['{{', '&#25BE; (invalid decimal)', '}}'],
                        [''],
                        '{{&amp;}}' +
                            '{{&#x25BE;}}' +
                            '{{&#9662;}}' +
                            '{{&unknown;}}' +
                            '{{&amp (no semi-colon)}}' +
                            '{{&#xyz; (invalid hex)}}' +
                            '{{&#25BE; (invalid decimal)}}',
                    ],
                ]);
            });
            it('should support interpolations in text', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div> pre {{ value }} post </div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div> pre {{ value }} post </div>', '<div>', '</div>'],
                    [
                        html.Text,
                        ' pre {{ value }} post ',
                        1,
                        [' pre '],
                        ['{{', ' value ', '}}'],
                        [' post '],
                        ' pre {{ value }} post ',
                    ],
                ]);
            });
            it('should not set the end source span for void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div><br></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div><br></div>', '<div>', '</div>'],
                    [html.Element, 'br', 1, '<br>', '<br>', null],
                ]);
            });
            it('should not set the end source span for multiple void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div><br><hr></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div><br><hr></div>', '<div>', '</div>'],
                    [html.Element, 'br', 1, '<br>', '<br>', null],
                    [html.Element, 'hr', 1, '<hr>', '<hr>', null],
                ]);
            });
            it('should not set the end source span for standalone void elements', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<br>', 'TestComp'))).toEqual([
                    [html.Element, 'br', 0, '<br>', '<br>', null],
                ]);
            });
            it('should set the end source span for standalone self-closing elements', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<br/>', 'TestComp'))).toEqual([
                    [html.Element, 'br', 0, '<br/>', '<br/>', '<br/>'],
                ]);
            });
            it('should set the end source span for self-closing elements', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div><br/></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div><br/></div>', '<div>', '</div>'],
                    [html.Element, 'br', 1, '<br/>', '<br/>', '<br/>'],
                ]);
            });
            it('should not include leading trivia from the following node of an element in the end source', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<input type="text" />\n\n\n  <span>\n</span>', 'TestComp', {
                    leadingTriviaChars: [' ', '\n', '\r', '\t'],
                }))).toEqual([
                    [
                        html.Element,
                        'input',
                        0,
                        '<input type="text" />',
                        '<input type="text" />',
                        '<input type="text" />',
                    ],
                    [html.Attribute, 'type', 'text', ['text'], 'type="text"'],
                    [html.Text, '\n\n\n  ', 0, ['\n\n\n  '], '', '\n\n\n  '],
                    [html.Element, 'span', 0, '<span>\n</span>', '<span>', '</span>'],
                    [html.Text, '\n', 1, ['\n'], '', '\n'],
                ]);
            });
            it('should not set the end source span for elements that are implicitly closed', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div><p></div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div><p></div>', '<div>', '</div>'],
                    [html.Element, 'p', 1, '<p>', '<p>', null],
                ]);
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div><li>A<li>B</div>', 'TestComp'))).toEqual([
                    [html.Element, 'div', 0, '<div><li>A<li>B</div>', '<div>', '</div>'],
                    [html.Element, 'li', 1, '<li>', '<li>', null],
                    [html.Text, 'A', 2, ['A'], 'A'],
                    [html.Element, 'li', 1, '<li>', '<li>', null],
                    [html.Text, 'B', 2, ['B'], 'B'],
                ]);
            });
            it('should support expansion form', () => {
                expect((0, ast_spec_utils_1.humanizeDomSourceSpans)(parser.parse('<div>{count, plural, =0 {msg}}</div>', 'TestComp', {
                    tokenizeExpansionForms: true,
                }))).toEqual([
                    [html.Element, 'div', 0, '<div>{count, plural, =0 {msg}}</div>', '<div>', '</div>'],
                    [html.Expansion, 'count', 'plural', 1, '{count, plural, =0 {msg}}'],
                    [html.ExpansionCase, '=0', 2, '=0 {msg}'],
                ]);
            });
            it('should not report a value span for an attribute without a value', () => {
                const ast = parser.parse('<div bar></div>', 'TestComp');
                expect(ast.rootNodes[0].attrs[0].valueSpan).toBeUndefined();
            });
            it('should report a value span for an attribute with a value', () => {
                const ast = parser.parse('<div bar="12"></div>', 'TestComp');
                const attr = ast.rootNodes[0].attrs[0];
                expect(attr.valueSpan.start.offset).toEqual(10);
                expect(attr.valueSpan.end.offset).toEqual(12);
            });
            it('should report a value span for an unquoted attribute value', () => {
                const ast = parser.parse('<div bar=12></div>', 'TestComp');
                const attr = ast.rootNodes[0].attrs[0];
                expect(attr.valueSpan.start.offset).toEqual(9);
                expect(attr.valueSpan.end.offset).toEqual(11);
            });
        });
        describe('visitor', () => {
            it('should visit text nodes', () => {
                const result = (0, ast_spec_utils_1.humanizeDom)(parser.parse('text', 'TestComp'));
                expect(result).toEqual([[html.Text, 'text', 0, ['text']]]);
            });
            it('should visit element nodes', () => {
                const result = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<div></div>', 'TestComp'));
                expect(result).toEqual([[html.Element, 'div', 0]]);
            });
            it('should visit attribute nodes', () => {
                const result = (0, ast_spec_utils_1.humanizeDom)(parser.parse('<div id="foo"></div>', 'TestComp'));
                expect(result).toContain([html.Attribute, 'id', 'foo', ['foo']]);
            });
            it('should visit all nodes', () => {
                const result = parser.parse('<div id="foo"><span id="bar">a</span><span>b</span></div>', 'TestComp');
                const accumulator = [];
                const visitor = new (class {
                    visit(node, context) {
                        accumulator.push(node);
                    }
                    visitElement(element, context) {
                        html.visitAll(this, element.attrs);
                        html.visitAll(this, element.directives);
                        html.visitAll(this, element.children);
                    }
                    visitAttribute(attribute, context) { }
                    visitText(text, context) { }
                    visitComment(comment, context) { }
                    visitExpansion(expansion, context) {
                        html.visitAll(this, expansion.cases);
                    }
                    visitExpansionCase(expansionCase, context) { }
                    visitBlock(block, context) {
                        html.visitAll(this, block.parameters);
                        html.visitAll(this, block.children);
                    }
                    visitBlockParameter(parameter, context) { }
                    visitLetDeclaration(decl, context) { }
                    visitComponent(component, context) {
                        html.visitAll(this, component.attrs);
                        html.visitAll(this, component.directives);
                        html.visitAll(this, component.children);
                    }
                    visitDirective(directive, context) {
                        html.visitAll(this, directive.attrs);
                    }
                })();
                html.visitAll(visitor, result.rootNodes);
                expect(accumulator.map((n) => n.constructor)).toEqual([
                    html.Element,
                    html.Attribute,
                    html.Element,
                    html.Attribute,
                    html.Text,
                    html.Element,
                    html.Text,
                ]);
            });
            it('should skip typed visit if visit() returns a truthy value', () => {
                const visitor = new (class {
                    visit(node, context) {
                        return true;
                    }
                    visitElement(element, context) {
                        throw Error('Unexpected');
                    }
                    visitAttribute(attribute, context) {
                        throw Error('Unexpected');
                    }
                    visitText(text, context) {
                        throw Error('Unexpected');
                    }
                    visitComment(comment, context) {
                        throw Error('Unexpected');
                    }
                    visitExpansion(expansion, context) {
                        throw Error('Unexpected');
                    }
                    visitExpansionCase(expansionCase, context) {
                        throw Error('Unexpected');
                    }
                    visitBlock(block, context) {
                        throw Error('Unexpected');
                    }
                    visitBlockParameter(parameter, context) {
                        throw Error('Unexpected');
                    }
                    visitLetDeclaration(decl, context) {
                        throw Error('Unexpected');
                    }
                    visitComponent(component, context) {
                        throw Error('Unexpected');
                    }
                    visitDirective(directive, context) {
                        throw Error('Unexpected');
                    }
                })();
                const result = parser.parse('<div id="foo"></div><div id="bar"></div>', 'TestComp');
                const traversal = html.visitAll(visitor, result.rootNodes);
                expect(traversal).toEqual([true, true]);
            });
        });
        describe('errors', () => {
            it('should report unexpected closing tags', () => {
                const errors = parser.parse('<div></p></div>', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        'p',
                        'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:5',
                    ],
                ]);
            });
            it('gets correct close tag for parent when a child is not closed', () => {
                const { errors, rootNodes } = parser.parse('<div><span></div>', 'TestComp');
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    [
                        'div',
                        'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:11',
                    ],
                ]);
                expect((0, ast_spec_utils_1.humanizeNodes)(rootNodes, true)).toEqual([
                    [html.Element, 'div', 0, '<div><span></div>', '<div>', '</div>'],
                    [html.Element, 'span', 1, '<span>', '<span>', null],
                ]);
            });
            describe('incomplete element tag', () => {
                it('should parse and report incomplete tags after the tag name', () => {
                    const { errors, rootNodes } = parser.parse('<div<span><div  </span>', 'TestComp');
                    expect((0, ast_spec_utils_1.humanizeNodes)(rootNodes, true)).toEqual([
                        [html.Element, 'div', 0, '<div', '<div', null],
                        [html.Element, 'span', 0, '<span><div  </span>', '<span>', '</span>'],
                        [html.Element, 'div', 1, '<div  ', '<div  ', null],
                    ]);
                    expect(humanizeErrors(errors)).toEqual([
                        ['div', 'Opening tag "div" not terminated.', '0:0'],
                        ['div', 'Opening tag "div" not terminated.', '0:10'],
                    ]);
                });
                it('should parse and report incomplete tags after attribute', () => {
                    const { errors, rootNodes } = parser.parse('<div class="hi" sty<span></span>', 'TestComp');
                    expect((0, ast_spec_utils_1.humanizeNodes)(rootNodes, true)).toEqual([
                        [html.Element, 'div', 0, '<div class="hi" sty', '<div class="hi" sty', null],
                        [html.Attribute, 'class', 'hi', ['hi'], 'class="hi"'],
                        [html.Attribute, 'sty', '', 'sty'],
                        [html.Element, 'span', 0, '<span></span>', '<span>', '</span>'],
                    ]);
                    expect(humanizeErrors(errors)).toEqual([
                        ['div', 'Opening tag "div" not terminated.', '0:0'],
                    ]);
                });
                it('should parse and report incomplete tags after quote', () => {
                    const { errors, rootNodes } = parser.parse('<div "<span></span>', 'TestComp');
                    expect((0, ast_spec_utils_1.humanizeNodes)(rootNodes, true)).toEqual([
                        [html.Element, 'div', 0, '<div ', '<div ', null],
                        [html.Text, '"', 0, ['"'], '"'],
                        [html.Element, 'span', 0, '<span></span>', '<span>', '</span>'],
                    ]);
                    expect(humanizeErrors(errors)).toEqual([
                        ['div', 'Opening tag "div" not terminated.', '0:0'],
                    ]);
                });
                it('should report subsequent open tags without proper close tag', () => {
                    const errors = parser.parse('<div</div>', 'TestComp').errors;
                    expect(errors.length).toEqual(2);
                    expect(humanizeErrors(errors)).toEqual([
                        ['div', 'Opening tag "div" not terminated.', '0:0'],
                        // TODO(ayazhafiz): the following error is unnecessary and can be pruned if we keep
                        // track of the incomplete tag names.
                        [
                            'div',
                            'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                            '0:4',
                        ],
                    ]);
                });
            });
            it('should report closing tag for void elements', () => {
                const errors = parser.parse('<input></input>', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    ['input', 'Void elements do not have end tags "input"', '0:7'],
                ]);
            });
            it('should report self closing html element', () => {
                const errors = parser.parse('<p />', 'TestComp').errors;
                expect(errors.length).toEqual(1);
                expect(humanizeErrors(errors)).toEqual([
                    ['p', 'Only void, custom and foreign elements can be self closed "p"', '0:0'],
                ]);
            });
            it('should not report self closing custom element', () => {
                expect(parser.parse('<my-cmp />', 'TestComp').errors).toEqual([]);
            });
            it('should also report lexer errors', () => {
                const errors = parser.parse('<!-err--><div></p></div>', 'TestComp').errors;
                expect(errors.length).toEqual(2);
                expect(humanizeErrors(errors)).toEqual([
                    [10 /* TokenType.COMMENT_START */, 'Unexpected character "e"', '0:3'],
                    [
                        'p',
                        'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                        '0:14',
                    ],
                ]);
            });
        });
    });
});
function humanizeErrors(errors) {
    return errors.map((e) => {
        if (e instanceof parser_1.TreeError) {
            // Parser errors
            return [e.elementName, e.msg, (0, ast_spec_utils_1.humanizeLineColumn)(e.span.start)];
        }
        // Tokenizer errors
        return [e.tokenType, e.msg, (0, ast_spec_utils_1.humanizeLineColumn)(e.span.start)];
    });
}
