"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const testing_2 = require("../../testing");
const adapter_1 = require("../src/adapter");
const expando_1 = require("../src/expando");
const reference_tagger_1 = require("../src/reference_tagger");
const util_1 = require("./util");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ShimReferenceTagger', () => {
        it('should tag a source file with its appropriate shims', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test1', 'test2']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
            const sf = makeArbitrarySf(fileName);
            expect(sf.referencedFiles).toEqual([]);
            tagger.tag(sf);
            expectReferencedFiles(sf, ['/file.test1.ts', '/file.test2.ts']);
        });
        it('should not tag .d.ts files', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test1', 'test2']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.d.ts');
            const sf = makeArbitrarySf(fileName);
            expectReferencedFiles(sf, []);
            tagger.tag(sf);
            expectReferencedFiles(sf, []);
        });
        it('should not tag .js files', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test1', 'test2']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.js');
            const sf = makeArbitrarySf(fileName);
            expectReferencedFiles(sf, []);
            tagger.tag(sf);
            expectReferencedFiles(sf, []);
        });
        it('should not tag shim files', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test1', 'test2']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
            const { host } = (0, testing_2.makeProgram)([
                { name: fileName, contents: 'export declare const UNIMPORTANT = true;' },
            ]);
            const shimAdapter = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], 
            /* oldProgram */ null);
            const shimSf = shimAdapter.maybeGenerate((0, file_system_1.absoluteFrom)('/file.testshim.ts'));
            expect(shimSf.referencedFiles).toEqual([]);
            tagger.tag(shimSf);
            expect(shimSf.referencedFiles).toEqual([]);
        });
        it('should not tag shims after finalization', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test1', 'test2']);
            tagger.finalize();
            const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
            const sf = makeArbitrarySf(fileName);
            tagger.tag(sf);
            expectReferencedFiles(sf, []);
        });
        it('should not overwrite original referencedFiles', () => {
            const tagger = new reference_tagger_1.ShimReferenceTagger(['test']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
            const sf = makeArbitrarySf(fileName);
            sf.referencedFiles = [
                {
                    fileName: (0, file_system_1.absoluteFrom)('/other.ts'),
                    pos: 0,
                    end: 0,
                },
            ];
            tagger.tag(sf);
            expectReferencedFiles(sf, ['/other.ts', '/file.test.ts']);
        });
        it('should always tag against the original referencedFiles', () => {
            const tagger1 = new reference_tagger_1.ShimReferenceTagger(['test1']);
            const tagger2 = new reference_tagger_1.ShimReferenceTagger(['test2']);
            const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
            const sf = makeArbitrarySf(fileName);
            tagger1.tag(sf);
            tagger2.tag(sf);
            expectReferencedFiles(sf, ['/file.test2.ts']);
        });
        describe('tagging and untagging', () => {
            it('should be able to untag references and retag them later', () => {
                const tagger = new reference_tagger_1.ShimReferenceTagger(['test']);
                const fileName = (0, file_system_1.absoluteFrom)('/file.ts');
                const sf = makeArbitrarySf(fileName);
                sf.referencedFiles = [
                    {
                        fileName: (0, file_system_1.absoluteFrom)('/other.ts'),
                        pos: 0,
                        end: 0,
                    },
                ];
                tagger.tag(sf);
                expectReferencedFiles(sf, ['/other.ts', '/file.test.ts']);
                (0, expando_1.untagTsFile)(sf);
                expectReferencedFiles(sf, ['/other.ts']);
                (0, expando_1.retagTsFile)(sf);
                expectReferencedFiles(sf, ['/other.ts', '/file.test.ts']);
            });
        });
    });
});
function makeSf(fileName, contents) {
    return typescript_1.default.createSourceFile(fileName, contents, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TS);
}
function makeArbitrarySf(fileName) {
    const declare = fileName.endsWith('.d.ts') ? 'declare ' : '';
    return makeSf(fileName, `export ${declare}const UNIMPORTANT = true;`);
}
function expectReferencedFiles(sf, files) {
    const actual = sf.referencedFiles.map((f) => (0, file_system_1.absoluteFrom)(f.fileName)).sort();
    const expected = files.map((fileName) => (0, file_system_1.absoluteFrom)(fileName)).sort();
    expect(actual).toEqual(expected);
}
