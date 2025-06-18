"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_translation_serializer_1 = require("../../../src/extract/translation_files/json_translation_serializer");
const mock_message_1 = require("./mock_message");
describe('JsonTranslationSerializer', () => {
    describe('renderFile()', () => {
        it('should convert a set of parsed messages into a JSON string', () => {
            const messages = [
                (0, mock_message_1.mockMessage)('12345', ['a', 'b', 'c'], ['PH', 'PH_1'], { meaning: 'some meaning' }),
                (0, mock_message_1.mockMessage)('54321', ['a', 'b', 'c'], ['PH', 'PH_1'], {
                    customId: 'someId',
                }),
                (0, mock_message_1.mockMessage)('67890', ['a', '', 'c'], ['START_TAG_SPAN', 'CLOSE_TAG_SPAN'], {
                    description: 'some description',
                }),
                (0, mock_message_1.mockMessage)('13579', ['', 'b', ''], ['START_BOLD_TEXT', 'CLOSE_BOLD_TEXT'], {}),
                (0, mock_message_1.mockMessage)('24680', ['a'], [], { meaning: 'meaning', description: 'and description' }),
                (0, mock_message_1.mockMessage)('80808', ['multi\nlines'], [], {}),
                (0, mock_message_1.mockMessage)('90000', ['<escape', 'me>'], ['double-quotes-"'], {}),
                (0, mock_message_1.mockMessage)('100000', [
                    'pre-ICU {VAR_SELECT, select, a {a} b {{INTERPOLATION}} c {pre {INTERPOLATION_1} post}} post-ICU',
                ], [], {}),
                (0, mock_message_1.mockMessage)('100001', [
                    '{VAR_PLURAL, plural, one {{START_BOLD_TEXT}something bold{CLOSE_BOLD_TEXT}} other {pre {START_TAG_SPAN}middle{CLOSE_TAG_SPAN} post}}',
                ], [], {}),
            ];
            const serializer = new json_translation_serializer_1.SimpleJsonTranslationSerializer('xx');
            const output = serializer.serialize(messages);
            expect(output).toEqual([
                `{`,
                `  "locale": "xx",`,
                `  "translations": {`,
                `    "12345": "a{$PH}b{$PH_1}c",`,
                `    "13579": "{$START_BOLD_TEXT}b{$CLOSE_BOLD_TEXT}",`,
                `    "24680": "a",`,
                `    "67890": "a{$START_TAG_SPAN}{$CLOSE_TAG_SPAN}c",`,
                `    "80808": "multi\\nlines",`,
                `    "90000": "<escape{$double-quotes-\\"}me>",`,
                `    "100000": "pre-ICU {VAR_SELECT, select, a {a} b {{INTERPOLATION}} c {pre {INTERPOLATION_1} post}} post-ICU",`,
                `    "100001": "{VAR_PLURAL, plural, one {{START_BOLD_TEXT}something bold{CLOSE_BOLD_TEXT}} other {pre {START_TAG_SPAN}middle{CLOSE_TAG_SPAN} post}}",`,
                `    "someId": "a{$PH}b{$PH_1}c"`,
                `  }`,
                `}`,
            ].join('\n'));
        });
    });
});
