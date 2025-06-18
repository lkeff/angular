"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const digest_1 = require("../../src/i18n/digest");
const message_bundle_1 = require("../../src/i18n/message_bundle");
const serializer_1 = require("../../src/i18n/serializers/serializer");
const defaults_1 = require("../../src/ml_parser/defaults");
const html_parser_1 = require("../../src/ml_parser/html_parser");
describe('MessageBundle', () => {
    describe('Messages', () => {
        let messages;
        beforeEach(() => {
            messages = new message_bundle_1.MessageBundle(new html_parser_1.HtmlParser(), [], {});
        });
        it('should extract the message to the catalog', () => {
            messages.updateFromTemplate('<p i18n="m|d">Translate Me</p>', 'url', defaults_1.DEFAULT_INTERPOLATION_CONFIG);
            expect(humanizeMessages(messages)).toEqual(['Translate Me (m|d)']);
        });
        it('should extract and dedup messages', () => {
            messages.updateFromTemplate('<p i18n="m|d@@1">Translate Me</p><p i18n="@@2">Translate Me</p><p i18n="@@2">Translate Me</p>', 'url', defaults_1.DEFAULT_INTERPOLATION_CONFIG);
            expect(humanizeMessages(messages)).toEqual(['Translate Me (m|d)', 'Translate Me (|)']);
        });
    });
});
class _TestSerializer extends serializer_1.Serializer {
    write(messages) {
        return messages
            .map((msg) => `${(0, digest_1.serializeNodes)(msg.nodes)} (${msg.meaning}|${msg.description})`)
            .join('//');
    }
    load(content, url) {
        return { locale: null, i18nNodesByMsgId: {} };
    }
    digest(msg) {
        return msg.id || `default`;
    }
}
function humanizeMessages(catalog) {
    return catalog.write(new _TestSerializer()).split('//');
}
