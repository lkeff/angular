"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const index_1 = require("../../index");
const core_1 = __importStar(require("@babel/core"));
const generator_1 = __importDefault(require("@babel/generator"));
// Babel is a CJS package and misuses the `default` named binding:
// https://github.com/babel/babel/issues/15269.
const generate = generator_1.default['default'];
const source_file_utils_1 = require("../src/source_file_utils");
const helpers_1 = require("./helpers");
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    beforeEach(() => (fs = (0, file_system_1.getFileSystem)()));
    describe('utils', () => {
        describe('isNamedIdentifier()', () => {
            it('should return true if the expression is an identifier with name `$localize`', () => {
                const taggedTemplate = getTaggedTemplate('$localize ``;');
                expect((0, source_file_utils_1.isNamedIdentifier)(taggedTemplate.get('tag'), '$localize')).toBe(true);
            });
            it('should return false if the expression is an identifier without the name `$localize`', () => {
                const taggedTemplate = getTaggedTemplate('other ``;');
                expect((0, source_file_utils_1.isNamedIdentifier)(taggedTemplate.get('tag'), '$localize')).toBe(false);
            });
            it('should return false if the expression is not an identifier', () => {
                const taggedTemplate = getTaggedTemplate('$localize() ``;');
                expect((0, source_file_utils_1.isNamedIdentifier)(taggedTemplate.get('tag'), '$localize')).toBe(false);
            });
        });
        describe('isGlobalIdentifier()', () => {
            it('should return true if the identifier is at the top level and not declared', () => {
                const taggedTemplate = getTaggedTemplate('$localize ``;');
                expect((0, source_file_utils_1.isGlobalIdentifier)(taggedTemplate.get('tag'))).toBe(true);
            });
            it('should return true if the identifier is in a block scope and not declared', () => {
                const taggedTemplate = getTaggedTemplate('function foo() { $localize ``; } foo();');
                expect((0, source_file_utils_1.isGlobalIdentifier)(taggedTemplate.get('tag'))).toBe(true);
            });
            it('should return false if the identifier is declared locally', () => {
                const taggedTemplate = getTaggedTemplate('function $localize() {} $localize ``;');
                expect((0, source_file_utils_1.isGlobalIdentifier)(taggedTemplate.get('tag'))).toBe(false);
            });
            it('should return false if the identifier is a function parameter', () => {
                const taggedTemplate = getTaggedTemplate('function foo($localize) { $localize ``; }');
                expect((0, source_file_utils_1.isGlobalIdentifier)(taggedTemplate.get('tag'))).toBe(false);
            });
        });
        describe('buildLocalizeReplacement', () => {
            it('should interleave the `messageParts` with the `substitutions`', () => {
                const messageParts = (0, index_1.ɵmakeTemplateObject)(['a', 'b', 'c'], ['a', 'b', 'c']);
                const substitutions = [core_1.types.numericLiteral(1), core_1.types.numericLiteral(2)];
                const expression = (0, source_file_utils_1.buildLocalizeReplacement)(messageParts, substitutions);
                expect(generate(expression).code).toEqual('"a" + 1 + "b" + 2 + "c"');
            });
            it('should wrap "binary expression" substitutions in parentheses', () => {
                const messageParts = (0, index_1.ɵmakeTemplateObject)(['a', 'b'], ['a', 'b']);
                const binary = core_1.types.binaryExpression('+', core_1.types.numericLiteral(1), core_1.types.numericLiteral(2));
                const expression = (0, source_file_utils_1.buildLocalizeReplacement)(messageParts, [binary]);
                expect(generate(expression).code).toEqual('"a" + (1 + 2) + "b"');
            });
        });
        describe('unwrapMessagePartsFromLocalizeCall', () => {
            it('should return an array of string literals and locations from a direct call to a tag function', () => {
                const localizeCall = getLocalizeCall(`$localize(['a', 'b\\t', 'c'], 1, 2)`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 11 },
                        end: { line: 0, column: 14 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 0, column: 16 },
                        end: { line: 0, column: 21 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b\\t'`,
                    },
                    {
                        start: { line: 0, column: 23 },
                        end: { line: 0, column: 26 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should return an array of string literals and locations from a downleveled tagged template', () => {
                let localizeCall = getLocalizeCall(`$localize(__makeTemplateObject(['a', 'b\\t', 'c'], ['a', 'b\\\\t', 'c']), 1, 2)`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(parts.raw).toEqual(['a', 'b\\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 51 },
                        end: { line: 0, column: 54 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 0, column: 56 },
                        end: { line: 0, column: 62 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b\\\\t'`,
                    },
                    {
                        start: { line: 0, column: 64 },
                        end: { line: 0, column: 67 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should return an array of string literals and locations from a (Babel helper) downleveled tagged template', () => {
                let localizeCall = getLocalizeCall(`$localize(babelHelpers.taggedTemplateLiteral(['a', 'b\\t', 'c'], ['a', 'b\\\\t', 'c']), 1, 2)`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(parts.raw).toEqual(['a', 'b\\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 65 },
                        end: { line: 0, column: 68 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 0, column: 70 },
                        end: { line: 0, column: 76 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b\\\\t'`,
                    },
                    {
                        start: { line: 0, column: 78 },
                        end: { line: 0, column: 81 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should return an array of string literals and locations from a memoized downleveled tagged template', () => {
                let localizeCall = getLocalizeCall(`
                var _templateObject;
                $localize(_templateObject || (_templateObject = __makeTemplateObject(['a', 'b\\t', 'c'], ['a', 'b\\\\t', 'c'])), 1, 2)`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(parts.raw).toEqual(['a', 'b\\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 2, column: 105 },
                        end: { line: 2, column: 108 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 2, column: 110 },
                        end: { line: 2, column: 116 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b\\\\t'`,
                    },
                    {
                        start: { line: 2, column: 118 },
                        end: { line: 2, column: 121 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should return an array of string literals and locations from a memoized (inlined Babel helper) downleveled tagged template', () => {
                let localizeCall = getLocalizeCall(`
              var e,t,n;
              $localize(e ||
                (
                  t=["a","b\t","c"],
                  n || (n=t.slice(0)),
                  e = Object.freeze(
                    Object.defineProperties(t, { raw: { value: Object.freeze(n) } })
                  )
                ),
                1,2
              )`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(parts.raw).toEqual(['a', 'b\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 4, column: 21 },
                        end: { line: 4, column: 24 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `"a"`,
                    },
                    {
                        start: { line: 4, column: 25 },
                        end: { line: 4, column: 29 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `"b\t"`,
                    },
                    {
                        start: { line: 4, column: 30 },
                        end: { line: 4, column: 33 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `"c"`,
                    },
                ]);
            });
            it('should return an array of string literals and locations from a lazy load template helper', () => {
                let localizeCall = getLocalizeCall(`
        function _templateObject() {
          var e = _taggedTemplateLiteral(['a', 'b\\t', 'c'], ['a', 'b\\\\t', 'c']);
          return _templateObject = function() { return e }, e
        }
        $localize(_templateObject(), 1, 2)`);
                const [parts, locations] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(parts).toEqual(['a', 'b\t', 'c']);
                expect(parts.raw).toEqual(['a', 'b\\t', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 2, column: 61 },
                        end: { line: 2, column: 64 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 2, column: 66 },
                        end: { line: 2, column: 72 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b\\\\t'`,
                    },
                    {
                        start: { line: 2, column: 74 },
                        end: { line: 2, column: 77 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should remove a lazy load template helper', () => {
                let localizeCall = getLocalizeCall(`
        function _templateObject() {
          var e = _taggedTemplateLiteral(['a', 'b', 'c'], ['a', 'b', 'c']);
          return _templateObject = function() { return e }, e
        }
        $localize(_templateObject(), 1, 2)`);
                const localizeStatement = localizeCall.parentPath;
                const statements = localizeStatement.container;
                expect(statements.length).toEqual(2);
                (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(localizeCall, fs);
                expect(statements.length).toEqual(1);
                expect(statements[0]).toBe(localizeStatement.node);
            });
        });
        describe('unwrapSubstitutionsFromLocalizeCall', () => {
            it('should return the substitutions and locations from a direct call to a tag function', () => {
                const call = getLocalizeCall(`$localize(['a', 'b\t', 'c'], 1, 2)`);
                const [substitutions, locations] = (0, source_file_utils_1.unwrapSubstitutionsFromLocalizeCall)(call, fs);
                expect(substitutions.map((s) => s.value)).toEqual([1, 2]);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 28 },
                        end: { line: 0, column: 29 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: '1',
                    },
                    {
                        start: { line: 0, column: 31 },
                        end: { line: 0, column: 32 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: '2',
                    },
                ]);
            });
            it('should return the substitutions and locations from a downleveled tagged template', () => {
                const call = getLocalizeCall(`$localize(__makeTemplateObject(['a', 'b', 'c'], ['a', 'b', 'c']), 1, 2)`);
                const [substitutions, locations] = (0, source_file_utils_1.unwrapSubstitutionsFromLocalizeCall)(call, fs);
                expect(substitutions.map((s) => s.value)).toEqual([1, 2]);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 66 },
                        end: { line: 0, column: 67 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: '1',
                    },
                    {
                        start: { line: 0, column: 69 },
                        end: { line: 0, column: 70 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: '2',
                    },
                ]);
            });
        });
        describe('unwrapMessagePartsFromTemplateLiteral', () => {
            it('should return a TemplateStringsArray built from the template literal elements', () => {
                const taggedTemplate = getTaggedTemplate('$localize `a${1}b\\t${2}c`;');
                expect((0, source_file_utils_1.unwrapMessagePartsFromTemplateLiteral)(taggedTemplate.get('quasi').get('quasis'), fs)[0]).toEqual((0, index_1.ɵmakeTemplateObject)(['a', 'b\t', 'c'], ['a', 'b\\t', 'c']));
            });
        });
        describe('wrapInParensIfNecessary', () => {
            it('should wrap the expression in parentheses if it is binary', () => {
                const ast = core_1.template.ast `a + b`;
                const wrapped = (0, source_file_utils_1.wrapInParensIfNecessary)(ast.expression);
                expect(core_1.types.isParenthesizedExpression(wrapped)).toBe(true);
            });
            it('should return the expression untouched if it is not binary', () => {
                const ast = core_1.template.ast `a`;
                const wrapped = (0, source_file_utils_1.wrapInParensIfNecessary)(ast.expression);
                expect(core_1.types.isParenthesizedExpression(wrapped)).toBe(false);
            });
        });
        describe('unwrapStringLiteralArray', () => {
            it('should return an array of string from an array expression', () => {
                const array = getFirstExpression(`['a', 'b', 'c']`);
                const [expressions, locations] = (0, source_file_utils_1.unwrapStringLiteralArray)(array, fs);
                expect(expressions).toEqual(['a', 'b', 'c']);
                expect(locations).toEqual([
                    {
                        start: { line: 0, column: 1 },
                        end: { line: 0, column: 4 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'a'`,
                    },
                    {
                        start: { line: 0, column: 6 },
                        end: { line: 0, column: 9 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'b'`,
                    },
                    {
                        start: { line: 0, column: 11 },
                        end: { line: 0, column: 14 },
                        file: (0, file_system_1.absoluteFrom)('/test/file.js'),
                        text: `'c'`,
                    },
                ]);
            });
            it('should throw an error if any elements of the array are not literal strings', () => {
                const array = getFirstExpression(`['a', 2, 'c']`);
                expect(() => (0, source_file_utils_1.unwrapStringLiteralArray)(array, fs)).toThrowError('Unexpected messageParts for `$localize` (expected an array of strings).');
            });
        });
        describe('isStringLiteralArray()', () => {
            it('should return true if the ast is an array of strings', () => {
                const ast = core_1.template.ast `['a', 'b', 'c']`;
                expect((0, source_file_utils_1.isStringLiteralArray)(ast.expression)).toBe(true);
            });
            it('should return false if the ast is not an array', () => {
                const ast = core_1.template.ast `'a'`;
                expect((0, source_file_utils_1.isStringLiteralArray)(ast.expression)).toBe(false);
            });
            it('should return false if at least on of the array elements is not a string', () => {
                const ast = core_1.template.ast `['a', 1, 'b']`;
                expect((0, source_file_utils_1.isStringLiteralArray)(ast.expression)).toBe(false);
            });
        });
        describe('isArrayOfExpressions()', () => {
            it('should return true if all the nodes are expressions', () => {
                const call = getFirstExpression('foo(a, b, c);');
                expect((0, source_file_utils_1.isArrayOfExpressions)(call.get('arguments'))).toBe(true);
            });
            it('should return false if any of the nodes is not an expression', () => {
                const call = getFirstExpression('foo(a, b, ...c);');
                expect((0, source_file_utils_1.isArrayOfExpressions)(call.get('arguments'))).toBe(false);
            });
        });
        describe('getLocation()', () => {
            it('should return a plain object containing the start, end and file of a NodePath', () => {
                var _a;
                const taggedTemplate = getTaggedTemplate('const x = $localize `message`;', {
                    filename: 'src/test.js',
                    sourceRoot: fs.resolve('/project'),
                });
                const location = (0, source_file_utils_1.getLocation)(fs, taggedTemplate);
                expect(location).toBeDefined();
                expect(location.start).toEqual({ line: 0, column: 10 });
                expect(location.start.constructor.name).toEqual('Object');
                expect(location.end).toEqual({ line: 0, column: 29 });
                expect((_a = location.end) === null || _a === void 0 ? void 0 : _a.constructor.name).toEqual('Object');
                expect(location.file).toEqual(fs.resolve('/project/src/test.js'));
            });
            it('should return `undefined` if the NodePath has no filename', () => {
                const taggedTemplate = getTaggedTemplate('const x = $localize ``;', {
                    sourceRoot: fs.resolve('/project'),
                    filename: undefined,
                });
                const location = (0, source_file_utils_1.getLocation)(fs, taggedTemplate);
                expect(location).toBeUndefined();
            });
        });
    });
});
function getTaggedTemplate(code, options) {
    return getExpressions(code, options).find((e) => e.isTaggedTemplateExpression());
}
function getFirstExpression(code, options) {
    return getExpressions(code, options)[0];
}
function getExpressions(code, options) {
    const expressions = [];
    core_1.default.transformSync(code, Object.assign({ code: false, filename: 'test/file.js', cwd: '/', plugins: [
            {
                visitor: {
                    Expression: (path) => {
                        expressions.push(path);
                    },
                },
            },
        ] }, options));
    return expressions;
}
function getLocalizeCall(code) {
    let callPaths = [];
    core_1.default.transformSync(code, {
        code: false,
        filename: 'test/file.js',
        cwd: '/',
        plugins: [
            {
                visitor: {
                    CallExpression(path) {
                        callPaths.push(path);
                    },
                },
            },
        ],
    });
    const localizeCall = callPaths.find((p) => {
        const callee = p.get('callee');
        return callee.isIdentifier() && callee.node.name === '$localize';
    });
    if (!localizeCall) {
        throw new Error(`$localize cannot be found in ${code}`);
    }
    return localizeCall;
}
