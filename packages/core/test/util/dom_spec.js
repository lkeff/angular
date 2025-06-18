"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../../src/util/dom");
describe('comment node text escaping', () => {
    describe('escapeCommentText', () => {
        it('should not change anything on basic text', () => {
            expect((0, dom_1.escapeCommentText)('text')).toEqual('text');
        });
        it('should escape "<" or ">"', () => {
            expect((0, dom_1.escapeCommentText)('<!--')).toEqual('\u200b<\u200b!--');
            expect((0, dom_1.escapeCommentText)('<!--<!--')).toEqual('\u200b<\u200b!--\u200b<\u200b!--');
            expect((0, dom_1.escapeCommentText)('>')).toEqual('\u200b>\u200b');
            expect((0, dom_1.escapeCommentText)('>-->')).toEqual('\u200b>\u200b--\u200b>\u200b');
        });
        it('should escape end marker', () => {
            expect((0, dom_1.escapeCommentText)('before-->after')).toEqual('before--\u200b>\u200bafter');
        });
        it('should escape multiple markers', () => {
            expect((0, dom_1.escapeCommentText)('before-->inline-->after')).toEqual('before--\u200b>\u200binline--\u200b>\u200bafter');
        });
        it('should caver the spec', () => {
            // https://html.spec.whatwg.org/multipage/syntax.html#comments
            expect((0, dom_1.escapeCommentText)('>')).toEqual('\u200b>\u200b');
            expect((0, dom_1.escapeCommentText)('->')).toEqual('-\u200b>\u200b');
            expect((0, dom_1.escapeCommentText)('<!--')).toEqual('\u200b<\u200b!--');
            expect((0, dom_1.escapeCommentText)('-->')).toEqual('--\u200b>\u200b');
            expect((0, dom_1.escapeCommentText)('--!>')).toEqual('--!\u200b>\u200b');
            expect((0, dom_1.escapeCommentText)('<!-')).toEqual('\u200b<\u200b!-');
            // Things which are OK
            expect((0, dom_1.escapeCommentText)('.>')).toEqual('.>');
            expect((0, dom_1.escapeCommentText)('.->')).toEqual('.->');
            expect((0, dom_1.escapeCommentText)('<!-.')).toEqual('<!-.');
        });
    });
});
