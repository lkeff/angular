"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = parseHtml;
const i18n_parser_1 = require("../../src/i18n/i18n_parser");
const defaults_1 = require("../../src/ml_parser/defaults");
const html_parser_1 = require("../../src/ml_parser/html_parser");
describe('Message', () => {
    const messageFactory = (0, i18n_parser_1.createI18nMessageFactory)(defaults_1.DEFAULT_INTERPOLATION_CONFIG, defaults_1.DEFAULT_CONTAINER_BLOCKS, 
    /* retainEmptyTokens */ false, 
    /* preserveExpressionWhitespace */ true);
    describe('messageText()', () => {
        it('should serialize simple text', () => {
            const message = messageFactory(parseHtml('abc\ndef'), '', '', '');
            expect(message.messageString).toEqual('abc\ndef');
        });
        it('should serialize text with interpolations', () => {
            const message = messageFactory(parseHtml('abc {{ 123 }}{{ 456 }} def'), '', '', '');
            expect(message.messageString).toEqual('abc {$INTERPOLATION}{$INTERPOLATION_1} def');
        });
        it('should serialize HTML elements', () => {
            const message = messageFactory(parseHtml('abc <span>foo</span><span>bar</span> def'), '', '', '');
            expect(message.messageString).toEqual('abc {$START_TAG_SPAN}foo{$CLOSE_TAG_SPAN}{$START_TAG_SPAN}bar{$CLOSE_TAG_SPAN} def');
        });
        it('should serialize ICU placeholders', () => {
            const message = messageFactory(parseHtml('abc {value, select, case1 {value1} case2 {value2} case3 {value3}} def'), '', '', '');
            expect(message.messageString).toEqual('abc {$ICU} def');
        });
        it('should serialize ICU expressions', () => {
            const message = messageFactory(parseHtml('{value, select, case1 {value1} case2 {value2} case3 {value3}}'), '', '', '');
            expect(message.messageString).toEqual('{VAR_SELECT, select, case1 {value1} case2 {value2} case3 {value3}}');
        });
        it('should serialize nested ICU expressions', () => {
            const message = messageFactory(parseHtml(`{gender, select,
            male {male of age: {age, select, 10 {ten} 20 {twenty} 30 {thirty} other {other}}}
            female {female}
            other {other}
          }`), '', '', '');
            expect(message.messageString).toEqual(`{VAR_SELECT_1, select, male {male of age: {VAR_SELECT, select, 10 {ten} 20 {twenty} 30 {thirty} other {other}}} female {female} other {other}}`);
        });
        it('should serialize blocks', () => {
            const message = messageFactory(parseHtml('abc @if (foo) {foo} @else if (bar) {bar} @else {baz} def'), '', '', '');
            expect(message.messageString).toEqual('abc {$START_BLOCK_IF}foo{$CLOSE_BLOCK_IF} {$START_BLOCK_ELSE_IF}bar{$CLOSE_BLOCK_ELSE_IF} {$START_BLOCK_ELSE}baz{$CLOSE_BLOCK_ELSE} def');
        });
    });
});
function parseHtml(html) {
    const htmlParser = new html_parser_1.HtmlParser();
    const parseResult = htmlParser.parse(html, 'i18n_ast spec', { tokenizeExpansionForms: true });
    if (parseResult.errors.length > 0) {
        throw Error(`unexpected parse errors: ${parseResult.errors.join('\n')}`);
    }
    return parseResult.rootNodes;
}
