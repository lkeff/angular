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
exports.TypeScriptAstHost = void 0;
const typescript_1 = __importDefault(require("typescript"));
const fatal_linker_error_1 = require("../../fatal_linker_error");
const utils_1 = require("../utils");
/**
 * This implementation of `AstHost` is able to get information from TypeScript AST nodes.
 *
 * This host is not actually used at runtime in the current code.
 *
 * It is implemented here to ensure that the `AstHost` abstraction is not unfairly skewed towards
 * the Babel implementation. It could also provide a basis for a 3rd TypeScript compiler plugin to
 * do linking in the future.
 */
class TypeScriptAstHost {
    constructor() {
        this.isStringLiteral = typescript_1.default.isStringLiteral;
        this.isNumericLiteral = typescript_1.default.isNumericLiteral;
        this.isArrayLiteral = typescript_1.default.isArrayLiteralExpression;
        this.isObjectLiteral = typescript_1.default.isObjectLiteralExpression;
        this.isCallExpression = typescript_1.default.isCallExpression;
    }
    getSymbolName(node) {
        if (typescript_1.default.isIdentifier(node)) {
            return node.text;
        }
        else if (typescript_1.default.isPropertyAccessExpression(node) && typescript_1.default.isIdentifier(node.name)) {
            return node.name.text;
        }
        else {
            return null;
        }
    }
    parseStringLiteral(str) {
        (0, utils_1.assert)(str, this.isStringLiteral, 'a string literal');
        return str.text;
    }
    isNull(node) {
        return node.kind === typescript_1.default.SyntaxKind.NullKeyword;
    }
    parseNumericLiteral(num) {
        (0, utils_1.assert)(num, this.isNumericLiteral, 'a numeric literal');
        return parseInt(num.text);
    }
    isBooleanLiteral(node) {
        return isBooleanLiteral(node) || isMinifiedBooleanLiteral(node);
    }
    parseBooleanLiteral(bool) {
        if (isBooleanLiteral(bool)) {
            return bool.kind === typescript_1.default.SyntaxKind.TrueKeyword;
        }
        else if (isMinifiedBooleanLiteral(bool)) {
            return !+bool.operand.text;
        }
        else {
            throw new fatal_linker_error_1.FatalLinkerError(bool, 'Unsupported syntax, expected a boolean literal.');
        }
    }
    parseArrayLiteral(array) {
        (0, utils_1.assert)(array, this.isArrayLiteral, 'an array literal');
        return array.elements.map((element) => {
            (0, utils_1.assert)(element, isNotEmptyElement, 'element in array not to be empty');
            (0, utils_1.assert)(element, isNotSpreadElement, 'element in array not to use spread syntax');
            return element;
        });
    }
    parseObjectLiteral(obj) {
        (0, utils_1.assert)(obj, this.isObjectLiteral, 'an object literal');
        const result = new Map();
        for (const property of obj.properties) {
            (0, utils_1.assert)(property, typescript_1.default.isPropertyAssignment, 'a property assignment');
            (0, utils_1.assert)(property.name, isPropertyName, 'a property name');
            result.set(property.name.text, property.initializer);
        }
        return result;
    }
    isFunctionExpression(node) {
        return typescript_1.default.isFunctionExpression(node) || typescript_1.default.isArrowFunction(node);
    }
    parseReturnValue(fn) {
        (0, utils_1.assert)(fn, this.isFunctionExpression, 'a function');
        if (!typescript_1.default.isBlock(fn.body)) {
            // it is a simple array function expression: `(...) => expr`
            return fn.body;
        }
        // it is a function (arrow or normal) with a body. E.g.:
        // * `(...) => { stmt; ... }`
        // * `function(...) { stmt; ... }`
        if (fn.body.statements.length !== 1) {
            throw new fatal_linker_error_1.FatalLinkerError(fn.body, 'Unsupported syntax, expected a function body with a single return statement.');
        }
        const stmt = fn.body.statements[0];
        (0, utils_1.assert)(stmt, typescript_1.default.isReturnStatement, 'a function body with a single return statement');
        if (stmt.expression === undefined) {
            throw new fatal_linker_error_1.FatalLinkerError(stmt, 'Unsupported syntax, expected function to return a value.');
        }
        return stmt.expression;
    }
    parseParameters(fn) {
        (0, utils_1.assert)(fn, this.isFunctionExpression, 'a function');
        return fn.parameters.map((param) => {
            (0, utils_1.assert)(param.name, typescript_1.default.isIdentifier, 'an identifier');
            if (param.dotDotDotToken) {
                throw new fatal_linker_error_1.FatalLinkerError(fn.body, 'Unsupported syntax, expected an identifier.');
            }
            return param.name;
        });
    }
    parseCallee(call) {
        (0, utils_1.assert)(call, typescript_1.default.isCallExpression, 'a call expression');
        return call.expression;
    }
    parseArguments(call) {
        (0, utils_1.assert)(call, typescript_1.default.isCallExpression, 'a call expression');
        return call.arguments.map((arg) => {
            (0, utils_1.assert)(arg, isNotSpreadElement, 'argument not to use spread syntax');
            return arg;
        });
    }
    getRange(node) {
        const file = node.getSourceFile();
        if (file === undefined) {
            throw new fatal_linker_error_1.FatalLinkerError(node, 'Unable to read range for node - it is missing parent information.');
        }
        const startPos = node.getStart();
        const endPos = node.getEnd();
        const { line: startLine, character: startCol } = typescript_1.default.getLineAndCharacterOfPosition(file, startPos);
        return { startLine, startCol, startPos, endPos };
    }
}
exports.TypeScriptAstHost = TypeScriptAstHost;
/**
 * Return true if the expression does not represent an empty element in an array literal.
 * For example in `[,foo]` the first element is "empty".
 */
function isNotEmptyElement(e) {
    return !typescript_1.default.isOmittedExpression(e);
}
/**
 * Return true if the expression is not a spread element of an array literal.
 * For example in `[x, ...rest]` the `...rest` expression is a spread element.
 */
function isNotSpreadElement(e) {
    return !typescript_1.default.isSpreadElement(e);
}
/**
 * Return true if the expression can be considered a text based property name.
 */
function isPropertyName(e) {
    return typescript_1.default.isIdentifier(e) || typescript_1.default.isStringLiteral(e) || typescript_1.default.isNumericLiteral(e);
}
/**
 * Return true if the node is either `true` or `false` literals.
 */
function isBooleanLiteral(node) {
    return node.kind === typescript_1.default.SyntaxKind.TrueKeyword || node.kind === typescript_1.default.SyntaxKind.FalseKeyword;
}
/**
 * Return true if the node is either `!0` or `!1`.
 */
function isMinifiedBooleanLiteral(node) {
    return (typescript_1.default.isPrefixUnaryExpression(node) &&
        node.operator === typescript_1.default.SyntaxKind.ExclamationToken &&
        typescript_1.default.isNumericLiteral(node.operand) &&
        (node.operand.text === '0' || node.operand.text === '1'));
}
