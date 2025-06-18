"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const __1 = require("..");
describe('messages utils', () => {
    describe('parseMessage', () => {
        it('should use the custom id parsed from the metadata for the message id, if available', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':@@custom-message-id:a', ':one:b', ':two:c'], [':@@custom-message-id:a', ':one:b', ':two:c']), [1, 2]);
            expect(message.customId).toEqual('custom-message-id');
            expect(message.id).toEqual(message.customId);
        });
        it('should compute the translation key if no metadata', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['a', ':one:b', ':two:c'], ['a', ':one:b', ':two:c']), [1, 2]);
            expect(message.id).toEqual('8865273085679272414');
        });
        it('should compute the translation key if no custom id in the metadata', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':description:a', ':one:b', ':two:c'], [':description:a', ':one:b', ':two:c']), [1, 2]);
            expect(message.id).toEqual('8865273085679272414');
        });
        it('should compute a different id if the meaning changes', () => {
            const message1 = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['abc'], ['abc']), []);
            const message2 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':meaning1|:abc'], [':meaning1|:abc']), []);
            const message3 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':meaning2|:abc'], [':meaning2|:abc']), []);
            expect(message1.id).not.toEqual(message2.id);
            expect(message2.id).not.toEqual(message3.id);
            expect(message3.id).not.toEqual(message1.id);
        });
        it('should capture legacy ids if available', () => {
            const message1 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':␟legacy-1␟legacy-2␟legacy-3:a', ':one:b', ':two:c'], [':␟legacy-1␟legacy-2␟legacy-3:a', ':one:b', ':two:c']), [1, 2]);
            expect(message1.id).toEqual('8865273085679272414');
            expect(message1.legacyIds).toEqual(['legacy-1', 'legacy-2', 'legacy-3']);
            const message2 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':@@custom-message-id␟legacy-message-id:a', ':one:b', ':two:c'], [':@@custom-message-id␟legacy-message-id:a', ':one:b', ':two:c']), [1, 2]);
            expect(message2.id).toEqual('custom-message-id');
            expect(message2.legacyIds).toEqual(['legacy-message-id']);
            const message3 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':@@custom-message-id:a', ':one:b', ':two:c'], [':@@custom-message-id:a', ':one:b', ':two:c']), [1, 2]);
            expect(message3.id).toEqual('custom-message-id');
            expect(message3.legacyIds).toEqual([]);
        });
        it('should infer placeholder names if not given', () => {
            const parts1 = ['a', 'b', 'c'];
            const message1 = (0, __1.parseMessage)((0, __1.makeTemplateObject)(parts1, parts1), [1, 2]);
            expect(message1.id).toEqual('8107531564991075946');
            const parts2 = ['a', ':custom1:b', ':custom2:c'];
            const message2 = (0, __1.parseMessage)((0, __1.makeTemplateObject)(parts2, parts2), [1, 2]);
            expect(message2.id).toEqual('1822117095464505589');
            // Note that the placeholder names are part of the message so affect the message id.
            expect(message1.id).not.toEqual(message2.id);
            expect(message1.text).not.toEqual(message2.text);
        });
        it('should ignore placeholder blocks whose markers have been escaped', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['a', ':one:b', ':two:c'], ['a', '\\:one:b', '\\:two:c']), [1, 2]);
            expect(message.id).toEqual('2623373088949454037');
        });
        it('should extract the meaning, description and placeholder names', () => {
            const message1 = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['abc'], ['abc']), []);
            expect(message1.messageParts).toEqual(['abc']);
            expect(message1.meaning).toEqual('');
            expect(message1.description).toEqual('');
            expect(message1.placeholderNames).toEqual([]);
            const message2 = (0, __1.parseMessage)((0, __1.makeTemplateObject)([':meaning|description:abc'], [':meaning|description:abc']), []);
            expect(message2.messageParts).toEqual(['abc']);
            expect(message2.meaning).toEqual('meaning');
            expect(message2.description).toEqual('description');
            expect(message2.placeholderNames).toEqual([]);
            const message3 = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['a', ':custom:b', 'c'], ['a', ':custom:b', 'c']), [0, 1]);
            expect(message3.messageParts).toEqual(['a', 'b', 'c']);
            expect(message3.meaning).toEqual('');
            expect(message3.description).toEqual('');
            expect(message3.placeholderNames).toEqual(['custom', 'PH_1']);
        });
        it('should build a map of named placeholders to expressions', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['a', ':one:b', ':two:c'], ['a', ':one:b', ':two:c']), [1, 2]);
            expect(message.substitutions).toEqual({ one: 1, two: 2 });
        });
        it('should build a map of implied placeholders to expressions', () => {
            const message = (0, __1.parseMessage)((0, __1.makeTemplateObject)(['a', 'b', 'c'], ['a', 'b', 'c']), [1, 2]);
            expect(message.substitutions).toEqual({ PH: 1, PH_1: 2 });
        });
    });
    describe('splitBlock()', () => {
        it('should return just the text if there is no block', () => {
            expect((0, __1.splitBlock)('abc def', 'abc def')).toEqual({ text: 'abc def' });
        });
        it('should return just the text and block if there is one', () => {
            expect((0, __1.splitBlock)(':block info:abc def', ':block info:abc def')).toEqual({
                text: 'abc def',
                block: 'block info',
            });
        });
        it('should handle an empty block if there is one', () => {
            expect((0, __1.splitBlock)('::abc def', '::abc def')).toEqual({ text: 'abc def', block: '' });
        });
        it('should error on an unterminated block', () => {
            expect(() => (0, __1.splitBlock)(':abc def', ':abc def')).toThrowError('Unterminated $localize metadata block in ":abc def".');
        });
        it('should handle escaped block markers', () => {
            expect((0, __1.splitBlock)(':part of the message:abc def', '\\:part of the message:abc def')).toEqual({
                text: ':part of the message:abc def',
            });
            expect((0, __1.splitBlock)(':block with escaped : in it:abc def', ':block with escaped \\: in it:abc def')).toEqual({ text: 'abc def', block: 'block with escaped : in it' });
        });
    });
    describe('findEndOfBlock()', () => {
        it('should throw error if there is no end of block marker', () => {
            expect(() => (0, __1.findEndOfBlock)(':some text', ':some text')).toThrowError('Unterminated $localize metadata block in ":some text".');
            expect(() => (0, __1.findEndOfBlock)(':escaped colon:', ':escaped colon\\:')).toThrowError('Unterminated $localize metadata block in ":escaped colon\\:".');
        });
        it('should return index of the end of block marker', () => {
            expect((0, __1.findEndOfBlock)(':block:', ':block:')).toEqual(6);
            expect((0, __1.findEndOfBlock)(':block::', ':block::')).toEqual(6);
            expect((0, __1.findEndOfBlock)(':block:some text', ':block:some text')).toEqual(6);
            expect((0, __1.findEndOfBlock)(':block:some text:more text', ':block:some text:more text')).toEqual(6);
            expect((0, __1.findEndOfBlock)('::::', ':\\:\\::')).toEqual(3);
            expect((0, __1.findEndOfBlock)(':block::', ':block\\::')).toEqual(7);
            expect((0, __1.findEndOfBlock)(':block:more:some text', ':block\\:more:some text')).toEqual(11);
            expect((0, __1.findEndOfBlock)(':block:more:and-more:some text', ':block\\:more\\:and-more:some text')).toEqual(20);
        });
    });
    describe('parseMetadata()', () => {
        it('should return just the text if there is no block', () => {
            expect((0, __1.parseMetadata)('abc def', 'abc def')).toEqual({ text: 'abc def' });
        });
        it('should extract the metadata if provided', () => {
            expect((0, __1.parseMetadata)(':description:abc def', ':description:abc def')).toEqual({
                text: 'abc def',
                description: 'description',
                meaning: undefined,
                customId: undefined,
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':meaning|:abc def', ':meaning|:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: 'meaning',
                customId: undefined,
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':@@message-id:abc def', ':@@message-id:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: undefined,
                customId: 'message-id',
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':meaning|description:abc def', ':meaning|description:abc def')).toEqual({
                text: 'abc def',
                description: 'description',
                meaning: 'meaning',
                customId: undefined,
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':description@@message-id:abc def', ':description@@message-id:abc def')).toEqual({
                text: 'abc def',
                description: 'description',
                meaning: undefined,
                customId: 'message-id',
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':meaning|@@message-id:abc def', ':meaning|@@message-id:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: 'meaning',
                customId: 'message-id',
                legacyIds: [],
            });
            expect((0, __1.parseMetadata)(':description@@message-id␟legacy-1␟legacy-2␟legacy-3:abc def', ':description@@message-id␟legacy-1␟legacy-2␟legacy-3:abc def')).toEqual({
                text: 'abc def',
                description: 'description',
                meaning: undefined,
                customId: 'message-id',
                legacyIds: ['legacy-1', 'legacy-2', 'legacy-3'],
            });
            expect((0, __1.parseMetadata)(':meaning|@@message-id␟legacy-message-id:abc def', ':meaning|@@message-id␟legacy-message-id:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: 'meaning',
                customId: 'message-id',
                legacyIds: ['legacy-message-id'],
            });
            expect((0, __1.parseMetadata)(':meaning|␟legacy-message-id:abc def', ':meaning|␟legacy-message-id:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: 'meaning',
                customId: undefined,
                legacyIds: ['legacy-message-id'],
            });
            expect((0, __1.parseMetadata)(':␟legacy-message-id:abc def', ':␟legacy-message-id:abc def')).toEqual({
                text: 'abc def',
                description: undefined,
                meaning: undefined,
                customId: undefined,
                legacyIds: ['legacy-message-id'],
            });
        });
        it('should handle an empty block if there is one', () => {
            expect((0, __1.parseMetadata)('::abc def', '::abc def')).toEqual({
                text: 'abc def',
                meaning: undefined,
                description: undefined,
                customId: undefined,
                legacyIds: [],
            });
        });
        it('should handle escaped block markers', () => {
            expect((0, __1.parseMetadata)(':part of the message:abc def', '\\:part of the message:abc def')).toEqual({ text: ':part of the message:abc def' });
        });
    });
});
