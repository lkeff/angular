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
const core_1 = require("@angular/core");
const i18n = __importStar(require("../../src/i18n/i18n_ast"));
const translation_bundle_1 = require("../../src/i18n/translation_bundle");
const html = __importStar(require("../../src/ml_parser/ast"));
const parse_util_1 = require("../../src/parse_util");
const util_1 = require("../ml_parser/util/util");
const i18n_parser_spec_1 = require("./i18n_parser_spec");
describe('TranslationBundle', () => {
    const file = new parse_util_1.ParseSourceFile('content', 'url');
    const startLocation = new parse_util_1.ParseLocation(file, 0, 0, 0);
    const endLocation = new parse_util_1.ParseLocation(file, 0, 0, 7);
    const span = new parse_util_1.ParseSourceSpan(startLocation, endLocation);
    const srcNode = new i18n.Text('src', span);
    it('should translate a plain text', () => {
        const msgMap = { foo: [new i18n.Text('bar', null)] };
        const tb = new translation_bundle_1.TranslationBundle(msgMap, null, (_) => 'foo');
        const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
        expect((0, util_1.serializeNodes)(tb.get(msg))).toEqual(['bar']);
    });
    it('should translate html-like plain text', () => {
        const msgMap = { foo: [new i18n.Text('<p>bar</p>', null)] };
        const tb = new translation_bundle_1.TranslationBundle(msgMap, null, (_) => 'foo');
        const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
        const nodes = tb.get(msg);
        expect(nodes.length).toEqual(1);
        const textNode = nodes[0];
        expect(textNode instanceof html.Text).toEqual(true);
        expect(textNode.value).toBe('<p>bar</p>');
    });
    it('should translate a message with placeholder', () => {
        const msgMap = {
            foo: [new i18n.Text('bar', null), new i18n.Placeholder('', 'ph1', null)],
        };
        const phMap = {
            ph1: createPlaceholder('*phContent*'),
        };
        const tb = new translation_bundle_1.TranslationBundle(msgMap, null, (_) => 'foo');
        const msg = new i18n.Message([srcNode], phMap, {}, 'm', 'd', 'i');
        expect((0, util_1.serializeNodes)(tb.get(msg))).toEqual(['bar*phContent*']);
    });
    it('should translate a message with placeholder referencing messages', () => {
        const msgMap = {
            foo: [
                new i18n.Text('--', null),
                new i18n.Placeholder('', 'ph1', null),
                new i18n.Text('++', null),
            ],
            ref: [new i18n.Text('*refMsg*', null)],
        };
        const refMsg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
        const msg = new i18n.Message([srcNode], {}, { ph1: refMsg }, 'm', 'd', 'i');
        let count = 0;
        const digest = (_) => (count++ ? 'ref' : 'foo');
        const tb = new translation_bundle_1.TranslationBundle(msgMap, null, digest);
        expect((0, util_1.serializeNodes)(tb.get(msg))).toEqual(['--*refMsg*++']);
    });
    it('should use the original message or throw when a translation is not found', () => {
        const src = `<some-tag>some text{{ some_expression }}</some-tag>{count, plural, =0 {no} few {a <b>few</b>}}`;
        const messages = (0, i18n_parser_spec_1._extractMessages)(`<div i18n>${src}</div>`);
        const digest = (_) => `no matching id`;
        // Empty message map -> use source messages in Ignore mode
        let tb = new translation_bundle_1.TranslationBundle({}, null, digest, null, core_1.MissingTranslationStrategy.Ignore);
        expect((0, util_1.serializeNodes)(tb.get(messages[0])).join('')).toEqual(src);
        // Empty message map -> use source messages in Warning mode
        tb = new translation_bundle_1.TranslationBundle({}, null, digest, null, core_1.MissingTranslationStrategy.Warning);
        expect((0, util_1.serializeNodes)(tb.get(messages[0])).join('')).toEqual(src);
        // Empty message map -> throw in Error mode
        tb = new translation_bundle_1.TranslationBundle({}, null, digest, null, core_1.MissingTranslationStrategy.Error);
        expect(() => (0, util_1.serializeNodes)(tb.get(messages[0])).join('')).toThrow();
    });
    describe('errors reporting', () => {
        it('should report unknown placeholders', () => {
            const msgMap = {
                foo: [new i18n.Text('bar', null), new i18n.Placeholder('', 'ph1', span)],
            };
            const tb = new translation_bundle_1.TranslationBundle(msgMap, null, (_) => 'foo');
            const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
            expect(() => tb.get(msg)).toThrowError(/Unknown placeholder/);
        });
        it('should report missing translation', () => {
            const tb = new translation_bundle_1.TranslationBundle({}, null, (_) => 'foo', null, core_1.MissingTranslationStrategy.Error);
            const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
            expect(() => tb.get(msg)).toThrowError(/Missing translation for message "foo"/);
        });
        it('should report missing translation with MissingTranslationStrategy.Warning', () => {
            const log = [];
            const console = {
                log: (msg) => {
                    throw `unexpected`;
                },
                warn: (msg) => log.push(msg),
            };
            const tb = new translation_bundle_1.TranslationBundle({}, 'en', (_) => 'foo', null, core_1.MissingTranslationStrategy.Warning, console);
            const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
            expect(() => tb.get(msg)).not.toThrowError();
            expect(log.length).toEqual(1);
            expect(log[0]).toMatch(/Missing translation for message "foo" for locale "en"/);
        });
        it('should not report missing translation with MissingTranslationStrategy.Ignore', () => {
            const tb = new translation_bundle_1.TranslationBundle({}, null, (_) => 'foo', null, core_1.MissingTranslationStrategy.Ignore);
            const msg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
            expect(() => tb.get(msg)).not.toThrowError();
        });
        it('should report missing referenced message', () => {
            const msgMap = {
                foo: [new i18n.Placeholder('', 'ph1', span)],
            };
            const refMsg = new i18n.Message([srcNode], {}, {}, 'm', 'd', 'i');
            const msg = new i18n.Message([srcNode], {}, { ph1: refMsg }, 'm', 'd', 'i');
            let count = 0;
            const digest = (_) => (count++ ? 'ref' : 'foo');
            const tb = new translation_bundle_1.TranslationBundle(msgMap, null, digest, null, core_1.MissingTranslationStrategy.Error);
            expect(() => tb.get(msg)).toThrowError(/Missing translation for message "ref"/);
        });
        it('should report invalid translated html', () => {
            const msgMap = {
                foo: [new i18n.Text('text', null), new i18n.Placeholder('', 'ph1', null)],
            };
            const phMap = {
                ph1: createPlaceholder('</b>'),
            };
            const tb = new translation_bundle_1.TranslationBundle(msgMap, null, (_) => 'foo');
            const msg = new i18n.Message([srcNode], phMap, {}, 'm', 'd', 'i');
            expect(() => tb.get(msg)).toThrowError(/Unexpected closing tag "b"/);
        });
    });
});
function createPlaceholder(text) {
    const file = new parse_util_1.ParseSourceFile(text, 'file://test');
    const start = new parse_util_1.ParseLocation(file, 0, 0, 0);
    const end = new parse_util_1.ParseLocation(file, text.length, 0, text.length);
    return {
        text,
        sourceSpan: new parse_util_1.ParseSourceSpan(start, end),
    };
}
