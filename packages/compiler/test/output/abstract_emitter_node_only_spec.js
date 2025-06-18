"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const abstract_emitter_1 = require("../../src/output/abstract_emitter");
const source_map_util_1 = require("./source_map_util");
describe('AbstractEmitter', () => {
    describe('EmitterVisitorContext', () => {
        const fileA = new __1.ParseSourceFile('a0a1a2a3a4a5a6a7a8a9', 'a.js');
        const fileB = new __1.ParseSourceFile('b0b1b2b3b4b5b6b7b8b9', 'b.js');
        let ctx;
        beforeEach(() => {
            ctx = abstract_emitter_1.EmitterVisitorContext.createRoot();
        });
        it('should add source files to the source map', () => {
            ctx.print(createSourceSpan(fileA, 0), 'o0');
            ctx.print(createSourceSpan(fileA, 1), 'o1');
            ctx.print(createSourceSpan(fileB, 0), 'o2');
            ctx.print(createSourceSpan(fileB, 1), 'o3');
            const sm = ctx.toSourceMapGenerator('o.ts').toJSON();
            expect(sm.sources).toEqual([fileA.url, fileB.url]);
            expect(sm.sourcesContent).toEqual([fileA.content, fileB.content]);
        });
        it('should generate a valid mapping', () => {
            ctx.print(createSourceSpan(fileA, 0), 'fileA-0');
            ctx.println(createSourceSpan(fileB, 1), 'fileB-1');
            ctx.print(createSourceSpan(fileA, 2), 'fileA-2');
            expectMap(ctx, 0, 0, 'a.js', 0, 0);
            expectMap(ctx, 0, 7, 'b.js', 0, 2);
            expectMap(ctx, 1, 0, 'a.js', 0, 4);
        });
        it('should be able to shift the content', () => __awaiter(void 0, void 0, void 0, function* () {
            ctx.print(createSourceSpan(fileA, 0), 'fileA-0');
            const sm = ctx.toSourceMapGenerator('o.ts', 10).toJSON();
            expect(yield (0, source_map_util_1.originalPositionFor)(sm, { line: 11, column: 0 })).toEqual({
                line: 1,
                column: 0,
                source: 'a.js',
            });
        }));
        it('should use the default source file for the first character', () => {
            ctx.print(null, 'fileA-0');
            expectMap(ctx, 0, 0, 'o.ts', 0, 0);
        });
        it('should use an explicit mapping for the first character', () => {
            ctx.print(createSourceSpan(fileA, 0), 'fileA-0');
            expectMap(ctx, 0, 0, 'a.js', 0, 0);
        });
        it('should map leading segment without span', () => {
            ctx.print(null, '....');
            ctx.print(createSourceSpan(fileA, 0), 'fileA-0');
            expectMap(ctx, 0, 0, 'o.ts', 0, 0);
            expectMap(ctx, 0, 4, 'a.js', 0, 0);
            expect(nbSegmentsPerLine(ctx)).toEqual([2]);
        });
        it('should handle indent', () => {
            ctx.incIndent();
            ctx.println(createSourceSpan(fileA, 0), 'fileA-0');
            ctx.incIndent();
            ctx.println(createSourceSpan(fileA, 1), 'fileA-1');
            ctx.decIndent();
            ctx.println(createSourceSpan(fileA, 2), 'fileA-2');
            expectMap(ctx, 0, 0, 'o.ts', 0, 0);
            expectMap(ctx, 0, 2, 'a.js', 0, 0);
            expectMap(ctx, 1, 0);
            expectMap(ctx, 1, 2);
            expectMap(ctx, 1, 4, 'a.js', 0, 2);
            expectMap(ctx, 2, 0);
            expectMap(ctx, 2, 2, 'a.js', 0, 4);
            expect(nbSegmentsPerLine(ctx)).toEqual([2, 1, 1]);
        });
        it('should coalesce identical span', () => {
            const span = createSourceSpan(fileA, 0);
            ctx.print(span, 'fileA-0');
            ctx.print(null, '...');
            ctx.print(span, 'fileA-0');
            ctx.print(createSourceSpan(fileB, 0), 'fileB-0');
            expectMap(ctx, 0, 0, 'a.js', 0, 0);
            expectMap(ctx, 0, 7, 'a.js', 0, 0);
            expectMap(ctx, 0, 10, 'a.js', 0, 0);
            expectMap(ctx, 0, 17, 'b.js', 0, 0);
            expect(nbSegmentsPerLine(ctx)).toEqual([2]);
        });
    });
});
// All lines / columns indexes are 0-based
// Note: source-map line indexes are 1-based, column 0-based
function expectMap(ctx_1, genLine_1, genCol_1) {
    return __awaiter(this, arguments, void 0, function* (ctx, genLine, genCol, source = null, srcLine = null, srcCol = null) {
        const sm = ctx.toSourceMapGenerator('o.ts').toJSON();
        const genPosition = { line: genLine + 1, column: genCol };
        const origPosition = yield (0, source_map_util_1.originalPositionFor)(sm, genPosition);
        expect(origPosition.source).toEqual(source);
        expect(origPosition.line).toEqual(srcLine === null ? null : srcLine + 1);
        expect(origPosition.column).toEqual(srcCol);
    });
}
// returns the number of segments per line
function nbSegmentsPerLine(ctx) {
    const sm = ctx.toSourceMapGenerator('o.ts').toJSON();
    const lines = sm.mappings.split(';');
    return lines.map((l) => {
        const m = l.match(/,/g);
        return m === null ? 1 : m.length + 1;
    });
}
function createSourceSpan(file, idx) {
    const col = 2 * idx;
    const start = new __1.ParseLocation(file, col, 0, col);
    const end = new __1.ParseLocation(file, col + 2, 0, col + 2);
    const sourceSpan = new __1.ParseSourceSpan(start, end);
    return { sourceSpan };
}
