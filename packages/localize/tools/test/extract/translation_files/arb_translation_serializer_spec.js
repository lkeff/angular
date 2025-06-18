"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const arb_translation_serializer_1 = require("../../../src/extract/translation_files/arb_translation_serializer");
const mock_message_1 = require("./mock_message");
(0, testing_1.runInEachFileSystem)(() => {
    let fs;
    describe('ArbTranslationSerializer', () => {
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
        });
        describe('renderFile()', () => {
            it('should convert a set of parsed messages into a JSON string', () => {
                const messages = [
                    (0, mock_message_1.mockMessage)('12345', ['a', 'b', 'c'], ['PH', 'PH_1'], {
                        meaning: 'some meaning',
                        location: (0, mock_message_1.location)('/project/file.ts', 5, 10, 5, 12),
                    }),
                    (0, mock_message_1.mockMessage)('54321', ['a', 'b', 'c'], ['PH', 'PH_1'], {
                        customId: 'someId',
                    }),
                    (0, mock_message_1.mockMessage)('67890', ['a', '', 'c'], ['START_TAG_SPAN', 'CLOSE_TAG_SPAN'], {
                        description: 'some description',
                        location: (0, mock_message_1.location)('/project/file.ts', 5, 10, 5, 12),
                    }),
                    (0, mock_message_1.mockMessage)('67890', ['a', '', 'c'], ['START_TAG_SPAN', 'CLOSE_TAG_SPAN'], {
                        description: 'some description',
                        location: (0, mock_message_1.location)('/project/other.ts', 2, 10, 3, 12),
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
                const serializer = new arb_translation_serializer_1.ArbTranslationSerializer('xx', fs.resolve('/project'), fs);
                const output = serializer.serialize(messages);
                expect(output.split('\n')).toEqual([
                    '{',
                    '  "@@locale": "xx",',
                    '  "someId": "a{$PH}b{$PH_1}c",',
                    '  "13579": "{$START_BOLD_TEXT}b{$CLOSE_BOLD_TEXT}",',
                    '  "24680": "a",',
                    '  "@24680": {',
                    '    "description": "and description",',
                    '    "x-meaning": "meaning"',
                    '  },',
                    '  "80808": "multi\\nlines",',
                    '  "90000": "<escape{$double-quotes-\\"}me>",',
                    '  "100000": "pre-ICU {VAR_SELECT, select, a {a} b {{INTERPOLATION}} c {pre {INTERPOLATION_1} post}} post-ICU",',
                    '  "100001": "{VAR_PLURAL, plural, one {{START_BOLD_TEXT}something bold{CLOSE_BOLD_TEXT}} other {pre {START_TAG_SPAN}middle{CLOSE_TAG_SPAN} post}}",',
                    '  "12345": "a{$PH}b{$PH_1}c",',
                    '  "@12345": {',
                    '    "x-meaning": "some meaning",',
                    '    "x-locations": [',
                    '      {',
                    '        "file": "file.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      }',
                    '    ]',
                    '  },',
                    '  "67890": "a{$START_TAG_SPAN}{$CLOSE_TAG_SPAN}c",',
                    '  "@67890": {',
                    '    "description": "some description",',
                    '    "x-locations": [',
                    '      {',
                    '        "file": "file.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "other.ts",',
                    '        "start": { "line": "2", "column": "10" },',
                    '        "end": { "line": "3", "column": "12" }',
                    '      }',
                    '    ]',
                    '  }',
                    '}',
                ]);
            });
            it('should consistently order serialized messages by location', () => {
                const messages = [
                    (0, mock_message_1.mockMessage)('1', ['message-1'], [], { location: (0, mock_message_1.location)('/root/c-1.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('2', ['message-1'], [], { location: (0, mock_message_1.location)('/root/c-2.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('1', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-1.ts', 8, 0, 10, 12) }),
                    (0, mock_message_1.mockMessage)('2', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-2.ts', 8, 0, 10, 12) }),
                    (0, mock_message_1.mockMessage)('1', ['message-1'], [], { location: (0, mock_message_1.location)('/root/a-1.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('2', ['message-1'], [], { location: (0, mock_message_1.location)('/root/a-2.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('1', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-1.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('2', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-2.ts', 5, 10, 5, 12) }),
                    (0, mock_message_1.mockMessage)('1', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-1.ts', 5, 20, 5, 12) }),
                    (0, mock_message_1.mockMessage)('2', ['message-1'], [], { location: (0, mock_message_1.location)('/root/b-2.ts', 5, 20, 5, 12) }),
                ];
                const serializer = new arb_translation_serializer_1.ArbTranslationSerializer('xx', fs.resolve('/root'), fs);
                const output = serializer.serialize(messages);
                expect(output.split('\n')).toEqual([
                    '{',
                    '  "@@locale": "xx",',
                    '  "1": "message-1",',
                    '  "@1": {',
                    '    "x-locations": [',
                    '      {',
                    '        "file": "a-1.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-1.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-1.ts",',
                    '        "start": { "line": "5", "column": "20" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-1.ts",',
                    '        "start": { "line": "8", "column": "0" },',
                    '        "end": { "line": "10", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "c-1.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      }',
                    '    ]',
                    '  },',
                    '  "2": "message-1",',
                    '  "@2": {',
                    '    "x-locations": [',
                    '      {',
                    '        "file": "a-2.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-2.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-2.ts",',
                    '        "start": { "line": "5", "column": "20" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "b-2.ts",',
                    '        "start": { "line": "8", "column": "0" },',
                    '        "end": { "line": "10", "column": "12" }',
                    '      },',
                    '      {',
                    '        "file": "c-2.ts",',
                    '        "start": { "line": "5", "column": "10" },',
                    '        "end": { "line": "5", "column": "12" }',
                    '      }',
                    '    ]',
                    '  }',
                    '}',
                ]);
            });
        });
    });
});
