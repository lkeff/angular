"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripSourceMapAndNewLine = stripSourceMapAndNewLine;
const abstract_emitter_1 = require("../../src/output/abstract_emitter");
describe('AbstractEmitter', () => {
    describe('escapeIdentifier', () => {
        it('should escape single quotes', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)(`'`, false)).toEqual(`'\\''`);
        });
        it('should escape backslash', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('\\', false)).toEqual(`'\\\\'`);
        });
        it('should escape newlines', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('\n', false)).toEqual(`'\\n'`);
        });
        it('should escape carriage returns', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('\r', false)).toEqual(`'\\r'`);
        });
        it('should escape $', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('$', true)).toEqual(`'\\$'`);
        });
        it('should not escape $', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('$', false)).toEqual(`'$'`);
        });
        it('should add quotes for non-identifiers', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('==', false, false)).toEqual(`'=='`);
        });
        it('does not escape class (but it probably should)', () => {
            expect((0, abstract_emitter_1.escapeIdentifier)('class', false, false)).toEqual('class');
        });
    });
});
function stripSourceMapAndNewLine(source) {
    if (source.endsWith('\n')) {
        source = source.substring(0, source.length - 1);
    }
    const smi = source.lastIndexOf('\n//#');
    if (smi == -1)
        return source;
    return source.slice(0, smi);
}
