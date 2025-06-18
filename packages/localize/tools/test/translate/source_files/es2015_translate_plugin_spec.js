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
const index_1 = require("../../../../index");
const core_1 = require("@babel/core");
const diagnostics_1 = require("../../../src/diagnostics");
const es2015_translate_plugin_1 = require("../../../src/translate/source_files/es2015_translate_plugin");
const helpers_1 = require("../../helpers");
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
    });
    describe('makeEs2015Plugin', () => {
        describe('(no translations)', () => {
            it('should transform `$localize` tags with binary expression', () => {
                const input = 'const b = 10;\n$localize`try\\n${40 + b}\\n  me`;';
                const output = transformCode(input);
                expect(output).toEqual('const b = 10;\n"try\\n" + (40 + b) + "\\n  me";');
            });
            it('should strip meta blocks', () => {
                const input = 'const b = 10;\n$localize `:description:try\\n${40 + b}\\n  me`;';
                const output = transformCode(input);
                expect(output).toEqual('const b = 10;\n"try\\n" + (40 + b) + "\\n  me";');
            });
            it('should not strip escaped meta blocks', () => {
                const input = 'const b = 10;\n$localize `\\:description:try\\n${40 + b}\\n  me`;';
                const output = transformCode(input);
                expect(output).toEqual('const b = 10;\n":description:try\\n" + (40 + b) + "\\n  me";');
            });
            it('should transform nested `$localize` tags', () => {
                const input = '$localize`a${1}b${$localize`x${5}y${6}z`}c`;';
                const output = transformCode(input);
                expect(output).toEqual('"a" + 1 + "b" + ("x" + 5 + "y" + 6 + "z") + "c";');
            });
            it('should transform tags inside functions', () => {
                const input = 'function foo() { $localize`a${1}b${2}c`; }';
                const output = transformCode(input);
                expect(output).toEqual('function foo() {\n  "a" + 1 + "b" + 2 + "c";\n}');
            });
            it('should ignore tags with the wrong name', () => {
                const input = 'other`a${1}b${2}c`;';
                const output = transformCode(input);
                expect(output).toEqual('other`a${1}b${2}c`;');
            });
            it('should transform tags with different tag name configured', () => {
                const input = 'other`a${1}b${2}c`;';
                const output = transformCode(input, {}, { localizeName: 'other' });
                expect(output).toEqual('"a" + 1 + "b" + 2 + "c";');
            });
            it('should ignore tags if the identifier is not global', () => {
                const input = 'function foo($localize) { $localize`a${1}b${2}c`; }';
                const output = transformCode(input);
                expect(output).toEqual('function foo($localize) {\n  $localize`a${1}b${2}c`;\n}');
            });
            it('should add missing translation to diagnostic errors if missingTranslation is set to "error"', () => {
                const input = 'const b = 10;\n$localize `try\\n${40 + b}\\n  me`;';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'error' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `No translation found for "${(0, index_1.ɵcomputeMsgId)('try\n{$PH}\n  me')}" ("try\n{$PH}\n  me").`,
                });
            });
            it('should add missing translation to diagnostic errors if missingTranslation is set to "warning"', () => {
                const input = 'const b = 10;\n$localize `try\\n${40 + b}\\n  me`;';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'warning' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(false);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'warning',
                    message: `No translation found for "${(0, index_1.ɵcomputeMsgId)('try\n{$PH}\n  me')}" ("try\n{$PH}\n  me").`,
                });
            });
            it('should add missing translation to diagnostic errors if missingTranslation is set to "ignore"', () => {
                const input = 'const b = 10;\n$localize `try\\n${40 + b}\\n  me`;';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'ignore' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(false);
                expect(diagnostics.messages).toEqual([]);
            });
        });
        describe('(with translations)', () => {
            it('should translate message parts (identity translations)', () => {
                const translations = {
                    [(0, index_1.ɵcomputeMsgId)('abc')]: (0, index_1.ɵparseTranslation)('abc'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}')]: (0, index_1.ɵparseTranslation)('abc{$PH}'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def')]: (0, index_1.ɵparseTranslation)('abc{$PH}def'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def{$PH_1}')]: (0, index_1.ɵparseTranslation)('abc{$PH}def{$PH_1}'),
                    [(0, index_1.ɵcomputeMsgId)('Hello, {$PH}!')]: (0, index_1.ɵparseTranslation)('Hello, {$PH}!'),
                };
                const input = '$localize `abc`;\n' +
                    '$localize `abc${1 + 2 + 3}`;\n' +
                    '$localize `abc${1 + 2 + 3}def`;\n' +
                    '$localize `abc${1 + 2 + 3}def${4 + 5 + 6}`;\n' +
                    '$localize `Hello, ${getName()}!`;';
                const output = transformCode(input, translations);
                expect(output).toEqual('"abc";\n' +
                    '"abc" + (1 + 2 + 3) + "";\n' +
                    '"abc" + (1 + 2 + 3) + "def";\n' +
                    '"abc" + (1 + 2 + 3) + "def" + (4 + 5 + 6) + "";\n' +
                    '"Hello, " + getName() + "!";');
            });
            it('should translate message parts (uppercase translations)', () => {
                const translations = {
                    [(0, index_1.ɵcomputeMsgId)('abc')]: (0, index_1.ɵparseTranslation)('ABC'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}')]: (0, index_1.ɵparseTranslation)('ABC{$PH}'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def')]: (0, index_1.ɵparseTranslation)('ABC{$PH}DEF'),
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def{$PH_1}')]: (0, index_1.ɵparseTranslation)('ABC{$PH}DEF{$PH_1}'),
                    [(0, index_1.ɵcomputeMsgId)('Hello, {$PH}!')]: (0, index_1.ɵparseTranslation)('HELLO, {$PH}!'),
                };
                const input = '$localize `abc`;\n' +
                    '$localize `abc${1 + 2 + 3}`;\n' +
                    '$localize `abc${1 + 2 + 3}def`;\n' +
                    '$localize `abc${1 + 2 + 3}def${4 + 5 + 6}`;\n' +
                    '$localize `Hello, ${getName()}!`;';
                const output = transformCode(input, translations);
                expect(output).toEqual('"ABC";\n' +
                    '"ABC" + (1 + 2 + 3) + "";\n' +
                    '"ABC" + (1 + 2 + 3) + "DEF";\n' +
                    '"ABC" + (1 + 2 + 3) + "DEF" + (4 + 5 + 6) + "";\n' +
                    '"HELLO, " + getName() + "!";');
            });
            it('should translate message parts (reversing placeholders)', () => {
                const translations = {
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def{$PH_1} - Hello, {$PH_2}!')]: (0, index_1.ɵparseTranslation)('abc{$PH_2}def{$PH_1} - Hello, {$PH}!'),
                };
                const input = '$localize `abc${1 + 2 + 3}def${4 + 5 + 6} - Hello, ${getName()}!`;';
                const output = transformCode(input, translations);
                expect(output).toEqual('"abc" + getName() + "def" + (4 + 5 + 6) + " - Hello, " + (1 + 2 + 3) + "!";');
            });
            it('should translate message parts (removing placeholders)', () => {
                const translations = {
                    [(0, index_1.ɵcomputeMsgId)('abc{$PH}def{$PH_1} - Hello, {$PH_2}!')]: (0, index_1.ɵparseTranslation)('abc{$PH} - Hello, {$PH_2}!'),
                };
                const input = '$localize `abc${1 + 2 + 3}def${4 + 5 + 6} - Hello, ${getName()}!`;';
                const output = transformCode(input, translations);
                expect(output).toEqual('"abc" + (1 + 2 + 3) + " - Hello, " + getName() + "!";');
            });
        });
    });
    function transformCode(input, translations = {}, pluginOptions, diagnostics = new diagnostics_1.Diagnostics()) {
        const cwd = fs.resolve('/');
        const filename = fs.resolve(cwd, 'app/dist/test.js');
        return (0, core_1.transformSync)(input, {
            plugins: [(0, es2015_translate_plugin_1.makeEs2015TranslatePlugin)(diagnostics, translations, pluginOptions)],
            filename,
            cwd,
        }).code;
    }
});
