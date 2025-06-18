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
const html = __importStar(require("../../src/ml_parser/ast"));
const entities_1 = require("../../src/ml_parser/entities");
const html_parser_1 = require("../../src/ml_parser/html_parser");
const html_whitespaces_1 = require("../../src/ml_parser/html_whitespaces");
const ast_spec_utils_1 = require("./ast_spec_utils");
describe('removeWhitespaces', () => {
    function parseAndRemoveWS(template, options) {
        return (0, ast_spec_utils_1.humanizeDom)((0, html_whitespaces_1.removeWhitespaces)(new html_parser_1.HtmlParser().parse(template, 'TestComp', options), true /* preserveSignificantWhitespace */));
    }
    it('should remove blank text nodes', () => {
        expect(parseAndRemoveWS(' ')).toEqual([]);
        expect(parseAndRemoveWS('\n')).toEqual([]);
        expect(parseAndRemoveWS('\t')).toEqual([]);
        expect(parseAndRemoveWS('    \t    \n ')).toEqual([]);
    });
    it('should remove whitespaces (space, tab, new line) between elements', () => {
        expect(parseAndRemoveWS('<br>  <br>\t<br>\n<br>')).toEqual([
            [html.Element, 'br', 0],
            [html.Element, 'br', 0],
            [html.Element, 'br', 0],
            [html.Element, 'br', 0],
        ]);
    });
    it('should remove whitespaces from child text nodes', () => {
        expect(parseAndRemoveWS('<div><span> </span></div>')).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'span', 1],
        ]);
    });
    it('should remove whitespaces from the beginning and end of a template', () => {
        expect(parseAndRemoveWS(` <br>\t`)).toEqual([[html.Element, 'br', 0]]);
    });
    it('should convert &ngsp; to a space and preserve it', () => {
        expect(parseAndRemoveWS('<div><span>foo</span>&ngsp;<span>bar</span></div>')).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'span', 1],
            [html.Text, 'foo', 2, ['foo']],
            [html.Text, ' ', 1, [''], [entities_1.NGSP_UNICODE, '&ngsp;'], ['']],
            [html.Element, 'span', 1],
            [html.Text, 'bar', 2, ['bar']],
        ]);
    });
    it('should replace multiple whitespaces with one space', () => {
        expect(parseAndRemoveWS('\n\n\nfoo\t\t\t')).toEqual([[html.Text, ' foo ', 0, [' foo ']]]);
        expect(parseAndRemoveWS('   \n foo  \t ')).toEqual([[html.Text, ' foo ', 0, [' foo ']]]);
    });
    it('should remove whitespace inside of blocks', () => {
        const markup = '@if (cond) {<br>  <br>\t<br>\n<br>}';
        expect(parseAndRemoveWS(markup)).toEqual([
            [html.Block, 'if', 0],
            [html.BlockParameter, 'cond'],
            [html.Element, 'br', 1],
            [html.Element, 'br', 1],
            [html.Element, 'br', 1],
            [html.Element, 'br', 1],
        ]);
    });
    it('should not replace &nbsp;', () => {
        expect(parseAndRemoveWS('&nbsp;')).toEqual([
            [html.Text, '\u00a0', 0, [''], ['\u00a0', '&nbsp;'], ['']],
        ]);
    });
    it('should not replace sequences of &nbsp;', () => {
        expect(parseAndRemoveWS('&nbsp;&nbsp;foo&nbsp;&nbsp;')).toEqual([
            [
                html.Text,
                '\u00a0\u00a0foo\u00a0\u00a0',
                0,
                [''],
                ['\u00a0', '&nbsp;'],
                [''],
                ['\u00a0', '&nbsp;'],
                ['foo'],
                ['\u00a0', '&nbsp;'],
                [''],
                ['\u00a0', '&nbsp;'],
                [''],
            ],
        ]);
    });
    it('should not replace single tab and newline with spaces', () => {
        expect(parseAndRemoveWS('\nfoo')).toEqual([[html.Text, '\nfoo', 0, ['\nfoo']]]);
        expect(parseAndRemoveWS('\tfoo')).toEqual([[html.Text, '\tfoo', 0, ['\tfoo']]]);
    });
    it('should preserve single whitespaces between interpolations', () => {
        expect(parseAndRemoveWS(`{{fooExp}} {{barExp}}`)).toEqual([
            [
                html.Text,
                '{{fooExp}} {{barExp}}',
                0,
                [''],
                ['{{', 'fooExp', '}}'],
                [' '],
                ['{{', 'barExp', '}}'],
                [''],
            ],
        ]);
        expect(parseAndRemoveWS(`{{fooExp}}\t{{barExp}}`)).toEqual([
            [
                html.Text,
                '{{fooExp}}\t{{barExp}}',
                0,
                [''],
                ['{{', 'fooExp', '}}'],
                ['\t'],
                ['{{', 'barExp', '}}'],
                [''],
            ],
        ]);
        expect(parseAndRemoveWS(`{{fooExp}}\n{{barExp}}`)).toEqual([
            [
                html.Text,
                '{{fooExp}}\n{{barExp}}',
                0,
                [''],
                ['{{', 'fooExp', '}}'],
                ['\n'],
                ['{{', 'barExp', '}}'],
                [''],
            ],
        ]);
    });
    it('should preserve whitespaces around interpolations', () => {
        expect(parseAndRemoveWS(` {{exp}} `)).toEqual([
            [html.Text, ' {{exp}} ', 0, [' '], ['{{', 'exp', '}}'], [' ']],
        ]);
    });
    it('should preserve whitespaces around ICU expansions', () => {
        expect(parseAndRemoveWS(`<span> {a, b, =4 {c}} </span>`, { tokenizeExpansionForms: true })).toEqual([
            [html.Element, 'span', 0],
            [html.Text, ' ', 1, [' ']],
            [html.Expansion, 'a', 'b', 1],
            [html.ExpansionCase, '=4', 2],
            [html.Text, ' ', 1, [' ']],
        ]);
    });
    it('should preserve whitespaces inside <pre> elements', () => {
        expect(parseAndRemoveWS(`<pre><strong>foo</strong>\n<strong>bar</strong></pre>`)).toEqual([
            [html.Element, 'pre', 0],
            [html.Element, 'strong', 1],
            [html.Text, 'foo', 2, ['foo']],
            [html.Text, '\n', 1, ['\n']],
            [html.Element, 'strong', 1],
            [html.Text, 'bar', 2, ['bar']],
        ]);
    });
    it('should skip whitespace trimming in <textarea>', () => {
        expect(parseAndRemoveWS(`<textarea>foo\n\n  bar</textarea>`)).toEqual([
            [html.Element, 'textarea', 0],
            [html.Text, 'foo\n\n  bar', 1, ['foo\n\n  bar']],
        ]);
    });
    it(`should preserve whitespaces inside elements annotated with ${html_whitespaces_1.PRESERVE_WS_ATTR_NAME}`, () => {
        expect(parseAndRemoveWS(`<div ${html_whitespaces_1.PRESERVE_WS_ATTR_NAME}><img> <img></div>`)).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'img', 1],
            [html.Text, ' ', 1, [' ']],
            [html.Element, 'img', 1],
        ]);
    });
});
