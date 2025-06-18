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
const es5_translate_plugin_1 = require("../../../src/translate/source_files/es5_translate_plugin");
const helpers_1 = require("../../helpers");
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    let testPath;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
        testPath = (0, file_system_1.relativeFrom)('app/dist/test.js');
    });
    describe('makeEs5Plugin', () => {
        describe('(no translations)', () => {
            it('should transform `$localize` calls with binary expression', () => {
                const input = 'const b = 10;\n$localize(["try\\n", "\\n  me"], 40 + b);';
                const output = transformCode(input);
                expect(output).toEqual('const b = 10;\n"try\\n" + (40 + b) + "\\n  me";');
            });
            it('should strip meta blocks', () => {
                const input = 'const b = 10;\n$localize([":description:try\\n", ":placeholder:\\n  me"], 40 + b);';
                const output = transformCode(input);
                expect(output).toEqual('const b = 10;\n"try\\n" + (40 + b) + "\\n  me";');
            });
            it('should not strip escaped meta blocks', () => {
                const input = `$localize(__makeTemplateObject([':desc:try', 'me'], ['\\\\\\:desc:try', 'me']), 40 + 2);`;
                const output = transformCode(input);
                expect(output).toEqual('":desc:try" + (40 + 2) + "me";');
            });
            it('should transform nested `$localize` calls', () => {
                const input = '$localize(["a", "b", "c"], 1, $localize(["x", "y", "z"], 5, 6));';
                const output = transformCode(input);
                expect(output).toEqual('"a" + 1 + "b" + ("x" + 5 + "y" + 6 + "z") + "c";');
            });
            it('should transform calls inside functions', () => {
                const input = 'function foo() { $localize(["a", "b", "c"], 1, 2); }';
                const output = transformCode(input);
                expect(output).toEqual('function foo() {\n  "a" + 1 + "b" + 2 + "c";\n}');
            });
            it('should ignore tags with the wrong name', () => {
                const input = 'other(["a", "b", "c"], 1, 2);';
                const output = transformCode(input);
                expect(output).toEqual('other(["a", "b", "c"], 1, 2);');
            });
            it('should transform calls with different function name configured', () => {
                const input = 'other(["a", "b", "c"], 1, 2);';
                const output = transformCode(input, {}, { localizeName: 'other' });
                expect(output).toEqual('"a" + 1 + "b" + 2 + "c";');
            });
            it('should ignore tags if the identifier is not global', () => {
                const input = 'function foo($localize) { $localize(["a", "b", "c"], 1, 2); }';
                const output = transformCode(input);
                expect(output).toEqual('function foo($localize) {\n  $localize(["a", "b", "c"], 1, 2);\n}');
            });
            it('should handle template object helper calls', () => {
                const input = `$localize(__makeTemplateObject(['try', 'me'], ['try', 'me']), 40 + 2);`;
                const output = transformCode(input);
                expect(output).toEqual('"try" + (40 + 2) + "me";');
            });
            it('should handle template object aliased helper calls', () => {
                const input = `$localize(m(['try', 'me'], ['try', 'me']), 40 + 2);`;
                const output = transformCode(input);
                expect(output).toEqual('"try" + (40 + 2) + "me";');
            });
            it('should handle template object inline helper calls', () => {
                const input = `$localize((this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e})(['try', 'me'], ['try', 'me']), 40 + 2);`;
                const output = transformCode(input);
                expect(output).toEqual('"try" + (40 + 2) + "me";');
            });
            it('should handle cached helper calls', () => {
                const input = `$localize(cachedObj||(cachedObj=__makeTemplateObject(['try', 'me'],['try', 'me'])),40 + 2)`;
                const output = transformCode(input);
                expect(output).toEqual('"try" + (40 + 2) + "me";');
            });
            it('should handle minified code', () => {
                const input = `$localize(
        cachedObj||
        (
          cookedParts=['try', 'me'],
          rawParts=['try', 'me'],
          Object.defineProperty?
            Object.defineProperty(cookedParts,"raw",{value:rawParts}):
            cookedParts.raw=rawParts,
          cachedObj=cookedParts
        ),40 + 2)`;
                const output = transformCode(input);
                expect(output).toEqual('"try" + (40 + 2) + "me";');
            });
            it('should handle lazy-load helper calls', () => {
                const input = `
      function _templateObject2() {
        var e = _taggedTemplateLiteral([':escaped-colons:Welcome to the i18n app.'], ['\\\\\\:escaped-colons:Welcome to the i18n app.']);
        return _templateObject2 = function() { return e }, e
      }
      function _templateObject() {
        var e = _taggedTemplateLiteral([' Hello ', ':INTERPOLATION:! ']);
        return _templateObject = function() { return e }, e
      }
      function _taggedTemplateLiteral(e, t) {
        return t || (t = e.slice(0)),
               Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
      }
      const message = $localize(_templateObject2());
      function foo() {
        console.log($localize(_templateObject(), '\ufffd0\ufffd'));
      }
      `;
                const output = transformCode(input);
                expect(output).toContain('const message = ":escaped-colons:Welcome to the i18n app."');
                expect(output).toContain('console.log(" Hello " + \'\ufffd0\ufffd\' + "! ");');
                expect(output).not.toContain('templateObject');
                expect(output).not.toContain('templateObject2');
            });
            it('should add diagnostic error with code-frame information if the arguments to `$localize` are missing', () => {
                const input = '$localize()';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: \`$localize\` called without any arguments.\n` +
                        '> 1 | $localize()\n' +
                        '    | ^^^^^^^^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if the arguments to `$localize` are invalid', () => {
                const input = '$localize(...x)';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected argument to \`$localize\` (expected an array).\n` +
                        '> 1 | $localize(...x)\n' +
                        '    |           ^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if the first argument to `$localize` is not an array', () => {
                const input = '$localize(null, [])';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected messageParts for \`$localize\` (expected an array of strings).\n` +
                        '> 1 | $localize(null, [])\n' +
                        '    |           ^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if raw message parts are not an expression', () => {
                const input = '$localize(__makeTemplateObject([], ...[]))';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected \`raw\` argument to the "makeTemplateObject()" function (expected an expression).\n` +
                        '> 1 | $localize(__makeTemplateObject([], ...[]))\n' +
                        '    |                                    ^^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if cooked message parts are not an expression', () => {
                const input = '$localize(__makeTemplateObject(...[], []))';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected \`cooked\` argument to the "makeTemplateObject()" function (expected an expression).\n` +
                        '> 1 | $localize(__makeTemplateObject(...[], []))\n' +
                        '    |                                ^^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if not all cooked message parts are strings', () => {
                const input = '$localize(__makeTemplateObject(["a", 12, "b"], ["a", "12", "b"]))';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected messageParts for \`$localize\` (expected an array of strings).\n` +
                        '> 1 | $localize(__makeTemplateObject(["a", 12, "b"], ["a", "12", "b"]))\n' +
                        '    |                                ^^^^^^^^^^^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if not all raw message parts are strings', () => {
                const input = '$localize(__makeTemplateObject(["a", "12", "b"], ["a", 12, "b"]))';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Unexpected messageParts for \`$localize\` (expected an array of strings).\n` +
                        '> 1 | $localize(__makeTemplateObject(["a", "12", "b"], ["a", 12, "b"]))\n' +
                        '    |                                                  ^^^^^^^^^^^^^^',
                });
            });
            it('should add diagnostic error with code-frame information if not all substitutions are expressions', () => {
                const input = '$localize(__makeTemplateObject(["a", "b"], ["a", "b"]), ...[])';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, {}, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `${testPath}: Invalid substitutions for \`$localize\` (expected all substitution arguments to be expressions).\n` +
                        '> 1 | $localize(__makeTemplateObject(["a", "b"], ["a", "b"]), ...[])\n' +
                        '    |                                                         ^^^^^',
                });
            });
            it('should add missing translation to diagnostic errors if missingTranslation is set to "error"', () => {
                const input = 'const b = 10;\n$localize(["try\\n", "\\n  me"], 40 + b);';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'error' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(true);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'error',
                    message: `No translation found for "${(0, index_1.ɵcomputeMsgId)('try\n{$PH}\n  me')}" ("try\n{$PH}\n  me").`,
                });
            });
            it('should add missing translation to diagnostic warnings if missingTranslation is set to "warning"', () => {
                const input = 'const b = 10;\n$localize(["try\\n", "\\n  me"], 40 + b);';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'warning' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(false);
                expect(diagnostics.messages[0]).toEqual({
                    type: 'warning',
                    message: `No translation found for "${(0, index_1.ɵcomputeMsgId)('try\n{$PH}\n  me')}" ("try\n{$PH}\n  me").`,
                });
            });
            it('should ignore missing translations if missingTranslation is set to "ignore"', () => {
                const input = 'const b = 10;\n$localize(["try\\n", "\\n  me"], 40 + b);';
                const diagnostics = new diagnostics_1.Diagnostics();
                transformCode(input, {}, { missingTranslation: 'ignore' }, diagnostics);
                expect(diagnostics.hasErrors).toBe(false);
                expect(diagnostics.messages).toEqual([]);
            });
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
            const input = '$localize(["abc"]);\n' +
                '$localize(["abc", ""], 1 + 2 + 3);\n' +
                '$localize(["abc", "def"], 1 + 2 + 3);\n' +
                '$localize(["abc", "def", ""], 1 + 2 + 3, 4 + 5 + 6);\n' +
                '$localize(["Hello, ", "!"], getName());';
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
            const input = '$localize(["abc"]);\n' +
                '$localize(["abc", ""], 1 + 2 + 3);\n' +
                '$localize(["abc", "def"], 1 + 2 + 3);\n' +
                '$localize(["abc", "def", ""], 1 + 2 + 3, 4 + 5 + 6);\n' +
                '$localize(["Hello, ", "!"], getName());';
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
            const input = '$localize(["abc", "def", " - Hello, ", "!"], 1 + 2 + 3, 4 + 5 + 6, getName());';
            const output = transformCode(input, translations);
            expect(output).toEqual('"abc" + getName() + "def" + (4 + 5 + 6) + " - Hello, " + (1 + 2 + 3) + "!";');
        });
        it('should translate message parts (removing placeholders)', () => {
            const translations = {
                [(0, index_1.ɵcomputeMsgId)('abc{$PH}def{$PH_1} - Hello, {$PH_2}!')]: (0, index_1.ɵparseTranslation)('abc{$PH} - Hello, {$PH_2}!'),
            };
            const input = '$localize(["abc", "def", " - Hello, ", "!"], 1 + 2 + 3, 4 + 5 + 6, getName());';
            const output = transformCode(input, translations);
            expect(output).toEqual('"abc" + (1 + 2 + 3) + " - Hello, " + getName() + "!";');
        });
    });
    function transformCode(input, translations = {}, pluginOptions, diagnostics = new diagnostics_1.Diagnostics()) {
        const cwd = fs.resolve('/');
        const filename = fs.resolve(cwd, testPath);
        return (0, core_1.transformSync)(input, {
            plugins: [(0, es5_translate_plugin_1.makeEs5TranslatePlugin)(diagnostics, translations, pluginOptions)],
            filename,
            cwd,
        }).code;
    }
});
