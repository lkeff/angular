"use strict";
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
const compiler_1 = require("@angular/compiler");
const translator_1 = require("../../../src/ngtsc/translator");
const typescript_1 = __importDefault(require("typescript"));
const ast_value_1 = require("../../src/ast/ast_value");
const typescript_ast_host_1 = require("../../src/ast/typescript/typescript_ast_host");
const host = new typescript_ast_host_1.TypeScriptAstHost();
const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
const nestedObj = factory.createObjectLiteral([
    { propertyName: 'x', quoted: false, value: factory.createLiteral(42) },
    { propertyName: 'y', quoted: false, value: factory.createLiteral('X') },
]);
const nestedArray = factory.createArrayLiteral([
    factory.createLiteral(1),
    factory.createLiteral(2),
]);
const obj = ast_value_1.AstObject.parse(factory.createObjectLiteral([
    { propertyName: 'a', quoted: false, value: factory.createLiteral(42) },
    { propertyName: 'b', quoted: false, value: factory.createLiteral('X') },
    { propertyName: 'c', quoted: false, value: factory.createLiteral(true) },
    { propertyName: 'd', quoted: false, value: nestedObj },
    { propertyName: 'e', quoted: false, value: nestedArray },
]), host);
describe('AstObject', () => {
    describe('has()', () => {
        it('should return true if the property exists on the object', () => {
            expect(obj.has('a')).toBe(true);
            expect(obj.has('b')).toBe(true);
            expect(obj.has('missing')).toBe(false);
            // @ts-expect-error
            expect(obj.has('x')).toBe(false);
        });
    });
    describe('getNumber()', () => {
        it('should return the number value of the property', () => {
            expect(obj.getNumber('a')).toEqual(42);
        });
        it('should throw an error if the property is not a number', () => {
            // @ts-expect-error
            expect(() => obj.getNumber('b')).toThrowError('Unsupported syntax, expected a numeric literal.');
        });
    });
    describe('getString()', () => {
        it('should return the string value of the property', () => {
            expect(obj.getString('b')).toEqual('X');
        });
        it('should throw an error if the property is not a string', () => {
            // @ts-expect-error
            expect(() => obj.getString('a')).toThrowError('Unsupported syntax, expected a string literal.');
        });
    });
    describe('getBoolean()', () => {
        it('should return the boolean value of the property', () => {
            expect(obj.getBoolean('c')).toEqual(true);
        });
        it('should throw an error if the property is not a boolean', () => {
            // @ts-expect-error
            expect(() => obj.getBoolean('b')).toThrowError('Unsupported syntax, expected a boolean literal.');
        });
    });
    describe('getObject()', () => {
        it('should return an AstObject instance parsed from the value of the property', () => {
            expect(obj.getObject('d')).toEqual(ast_value_1.AstObject.parse(nestedObj, host));
        });
        it('should throw an error if the property is not an object expression', () => {
            // @ts-expect-error
            expect(() => obj.getObject('b')).toThrowError('Unsupported syntax, expected an object literal.');
        });
    });
    describe('getArray()', () => {
        it('should return an array of AstValue instances of parsed from the value of the property', () => {
            expect(obj.getArray('e')).toEqual([
                new ast_value_1.AstValue(factory.createLiteral(1), host),
                new ast_value_1.AstValue(factory.createLiteral(2), host),
            ]);
        });
        it('should throw an error if the property is not an array of expressions', () => {
            // @ts-expect-error
            expect(() => obj.getArray('b')).toThrowError('Unsupported syntax, expected an array literal.');
        });
    });
    describe('getOpaque()', () => {
        it('should return the expression value of the property wrapped in a `WrappedNodeExpr`', () => {
            expect(obj.getOpaque('d')).toEqual(jasmine.any(compiler_1.WrappedNodeExpr));
            expect(obj.getOpaque('d').node).toEqual(obj.getNode('d'));
        });
        it('should throw an error if the property does not exist', () => {
            expect(() => obj.getOpaque('missing')).toThrowError(`Expected property 'missing' to be present.`);
            // @ts-expect-error
            expect(() => obj.getOpaque('x')).toThrowError(`Expected property 'x' to be present.`);
        });
    });
    describe('getNode()', () => {
        it('should return the original expression value of the property', () => {
            expect(obj.getNode('a')).toEqual(factory.createLiteral(42));
        });
        it('should throw an error if the property does not exist', () => {
            expect(() => obj.getNode('missing')).toThrowError(`Expected property 'missing' to be present.`);
            // @ts-expect-error
            expect(() => obj.getNode('x')).toThrowError(`Expected property 'x' to be present.`);
        });
    });
    describe('getValue()', () => {
        it('should return the expression value of the property wrapped in an `AstValue`', () => {
            expect(obj.getValue('a')).toEqual(jasmine.any(ast_value_1.AstValue));
            expect(obj.getValue('a').getNumber()).toEqual(42);
        });
        it('should throw an error if the property does not exist', () => {
            expect(() => obj.getValue('missing')).toThrowError(`Expected property 'missing' to be present.`);
            // @ts-expect-error
            expect(() => obj.getValue('x')).toThrowError(`Expected property 'x' to be present.`);
        });
    });
    describe('toLiteral()', () => {
        it('should convert the AstObject to a raw object with each property mapped', () => {
            expect(obj.toLiteral((value) => value.getOpaque())).toEqual({
                a: obj.getOpaque('a'),
                b: obj.getOpaque('b'),
                c: obj.getOpaque('c'),
                d: obj.getOpaque('d'),
                e: obj.getOpaque('e'),
            });
        });
    });
    describe('toMap()', () => {
        it('should convert the AstObject to a Map with each property mapped', () => {
            expect(obj.toMap((value) => value.getOpaque())).toEqual(new Map([
                ['a', obj.getOpaque('a')],
                ['b', obj.getOpaque('b')],
                ['c', obj.getOpaque('c')],
                ['d', obj.getOpaque('d')],
                ['e', obj.getOpaque('e')],
            ]));
        });
    });
});
describe('AstValue', () => {
    function createAstValue(node) {
        return new ast_value_1.AstValue(node, host);
    }
    describe('getSymbolName', () => {
        it('should return the name of an identifier', () => {
            expect(createAstValue(factory.createIdentifier('Foo')).getSymbolName()).toEqual('Foo');
        });
        it('should return the name of a property access', () => {
            const propertyAccess = factory.createPropertyAccess(factory.createIdentifier('Foo'), factory.createIdentifier('Bar'));
            expect(createAstValue(propertyAccess).getSymbolName()).toEqual('Bar');
        });
        it('should return null if no symbol name is available', () => {
            expect(createAstValue(factory.createLiteral('a')).getSymbolName()).toBeNull();
        });
    });
    describe('isNumber', () => {
        it('should return true if the value is a number', () => {
            expect(createAstValue(factory.createLiteral(42)).isNumber()).toEqual(true);
        });
        it('should return false if the value is not a number', () => {
            expect(createAstValue(factory.createLiteral('a')).isNumber()).toEqual(false);
        });
    });
    describe('getNumber', () => {
        it('should return the number value of the AstValue', () => {
            expect(createAstValue(factory.createLiteral(42)).getNumber()).toEqual(42);
        });
        it('should throw an error if the property is not a number', () => {
            // @ts-expect-error
            expect(() => createAstValue(factory.createLiteral('a')).getNumber()).toThrowError('Unsupported syntax, expected a numeric literal.');
        });
    });
    describe('isString', () => {
        it('should return true if the value is a string', () => {
            expect(createAstValue(factory.createLiteral('a')).isString()).toEqual(true);
        });
        it('should return false if the value is not a string', () => {
            expect(createAstValue(factory.createLiteral(42)).isString()).toEqual(false);
        });
    });
    describe('getString', () => {
        it('should return the string value of the AstValue', () => {
            expect(createAstValue(factory.createLiteral('X')).getString()).toEqual('X');
        });
        it('should throw an error if the property is not a string', () => {
            // @ts-expect-error
            expect(() => createAstValue(factory.createLiteral(42)).getString()).toThrowError('Unsupported syntax, expected a string literal.');
        });
    });
    describe('isBoolean', () => {
        it('should return true if the value is a boolean', () => {
            expect(createAstValue(factory.createLiteral(true)).isBoolean()).toEqual(true);
        });
        it('should return false if the value is not a boolean', () => {
            expect(createAstValue(factory.createLiteral(42)).isBoolean()).toEqual(false);
        });
    });
    describe('getBoolean', () => {
        it('should return the boolean value of the AstValue', () => {
            expect(createAstValue(factory.createLiteral(true)).getBoolean()).toEqual(true);
        });
        it('should throw an error if the property is not a boolean', () => {
            // @ts-expect-error
            expect(() => createAstValue(factory.createLiteral(42)).getBoolean()).toThrowError('Unsupported syntax, expected a boolean literal.');
        });
    });
    describe('isObject', () => {
        it('should return true if the value is an object literal', () => {
            expect(createAstValue(nestedObj).isObject()).toEqual(true);
        });
        it('should return false if the value is not an object literal', () => {
            expect(createAstValue(factory.createLiteral(42)).isObject()).toEqual(false);
        });
    });
    describe('getObject', () => {
        it('should return the AstObject value of the AstValue', () => {
            expect(createAstValue(nestedObj).getObject()).toEqual(ast_value_1.AstObject.parse(nestedObj, host));
        });
        it('should throw an error if the property is not an object literal', () => {
            // @ts-expect-error
            expect(() => createAstValue(factory.createLiteral(42)).getObject()).toThrowError('Unsupported syntax, expected an object literal.');
        });
    });
    describe('isArray', () => {
        it('should return true if the value is an array literal', () => {
            expect(createAstValue(nestedArray).isArray()).toEqual(true);
        });
        it('should return false if the value is not an object literal', () => {
            expect(createAstValue(factory.createLiteral(42)).isArray()).toEqual(false);
        });
    });
    describe('getArray', () => {
        it('should return an array of AstValue objects from the AstValue', () => {
            expect(createAstValue(nestedArray).getArray()).toEqual([
                createAstValue(factory.createLiteral(1)),
                createAstValue(factory.createLiteral(2)),
            ]);
        });
        it('should throw an error if the property is not an array', () => {
            // @ts-expect-error
            expect(() => createAstValue(factory.createLiteral(42)).getArray()).toThrowError('Unsupported syntax, expected an array literal.');
        });
    });
    describe('isFunction', () => {
        it('should return true if the value is a function expression', () => {
            const funcExpr = factory.createFunctionExpression('foo', [], factory.createBlock([factory.createReturnStatement(factory.createLiteral(42))]));
            expect(createAstValue(funcExpr).isFunction()).toEqual(true);
        });
        it('should return false if the value is not a function expression', () => {
            expect(createAstValue(factory.createLiteral(42)).isFunction()).toEqual(false);
        });
    });
    describe('getFunctionReturnValue', () => {
        it('should return the "return value" of the function expression', () => {
            const funcExpr = factory.createFunctionExpression('foo', [], factory.createBlock([factory.createReturnStatement(factory.createLiteral(42))]));
            expect(createAstValue(funcExpr).getFunctionReturnValue()).toEqual(createAstValue(factory.createLiteral(42)));
        });
        it('should throw an error if the property is not a function expression', () => {
            expect(() => 
            // @ts-expect-error
            createAstValue(factory.createLiteral(42)).getFunctionReturnValue()).toThrowError('Unsupported syntax, expected a function.');
        });
        it('should throw an error if the property is a function expression with no return value', () => {
            const funcExpr = factory.createFunctionExpression('foo', [], factory.createBlock([
                factory.createExpressionStatement(factory.createLiteral('do nothing')),
            ]));
            expect(() => createAstValue(funcExpr).getFunctionReturnValue()).toThrowError('Unsupported syntax, expected a function body with a single return statement.');
        });
    });
    describe('getFunctionParameters', () => {
        it('should return the parameters of a function expression', () => {
            const funcExpr = factory.createFunctionExpression('foo', ['a', 'b'], factory.createBlock([]));
            expect(createAstValue(funcExpr).getFunctionParameters()).toEqual(['a', 'b'].map((name) => createAstValue(factory.createIdentifier(name))));
        });
        it('should throw an error if the property is not a function declaration', () => {
            expect(() => 
            // @ts-expect-error
            createAstValue(factory.createLiteral(42)).getFunctionParameters()).toThrowError('Unsupported syntax, expected a function.');
        });
    });
    describe('isCallExpression', () => {
        it('should return true if the value represents a call expression', () => {
            const callExpr = factory.createCallExpression(factory.createIdentifier('foo'), [], false);
            expect(createAstValue(callExpr).isCallExpression()).toBe(true);
        });
        it('should return false if the value does not represent a call expression', () => {
            const fooExpr = factory.createIdentifier('foo');
            expect(createAstValue(fooExpr).isCallExpression()).toBe(false);
        });
    });
    describe('getCallee', () => {
        it('should return the callee expression as a value', () => {
            const callExpr = factory.createCallExpression(factory.createIdentifier('foo'), [], false);
            expect(createAstValue(callExpr).getCallee()).toEqual(createAstValue(factory.createIdentifier('foo')));
        });
        it('should throw an error if the value is not a call expression', () => {
            expect(() => createAstValue(factory.createLiteral(42)).getCallee()).toThrowError('Unsupported syntax, expected a call expression.');
        });
    });
    describe('getArguments', () => {
        it('should return the arguments as an array of values', () => {
            const callExpr = factory.createCallExpression(factory.createIdentifier('foo'), [factory.createLiteral(1), factory.createLiteral(2)], false);
            expect(createAstValue(callExpr).getArguments()).toEqual([
                createAstValue(factory.createLiteral(1)),
                createAstValue(factory.createLiteral(2)),
            ]);
        });
        it('should throw an error if the value is not a call expression', () => {
            expect(() => createAstValue(factory.createLiteral(42)).getArguments()).toThrowError('Unsupported syntax, expected a call expression.');
        });
    });
    describe('getOpaque()', () => {
        it('should return the value wrapped in a `WrappedNodeExpr`', () => {
            expect(createAstValue(factory.createLiteral(42)).getOpaque()).toEqual(jasmine.any(compiler_1.WrappedNodeExpr));
            expect(createAstValue(factory.createLiteral(42)).getOpaque().node).toEqual(factory.createLiteral(42));
        });
    });
    describe('getRange()', () => {
        it('should return the source range of the AST node', () => {
            const file = typescript_1.default.createSourceFile('test.ts', "// preamble\nx = 'moo';", typescript_1.default.ScriptTarget.ES2015, 
            /* setParentNodes */ true);
            // Grab the `'moo'` string literal from the generated AST
            const stmt = file.statements[0];
            const mooString = stmt.expression.right;
            // Check that this string literal has the expected range.
            expect(createAstValue(mooString).getRange()).toEqual({
                startLine: 1,
                startCol: 4,
                startPos: 16,
                endPos: 21,
            });
        });
    });
});
