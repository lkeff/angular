"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BabelAstHost = void 0;
const core_1 = require("@babel/core");
const linker_1 = require("../../../../linker");
/**
 * This implementation of `AstHost` is able to get information from Babel AST nodes.
 */
class BabelAstHost {
    constructor() {
        this.isStringLiteral = core_1.types.isStringLiteral;
        this.isNumericLiteral = core_1.types.isNumericLiteral;
        this.isArrayLiteral = core_1.types.isArrayExpression;
        this.isObjectLiteral = core_1.types.isObjectExpression;
        this.isCallExpression = core_1.types.isCallExpression;
    }
    getSymbolName(node) {
        if (core_1.types.isIdentifier(node)) {
            return node.name;
        }
        else if (core_1.types.isMemberExpression(node) && core_1.types.isIdentifier(node.property)) {
            return node.property.name;
        }
        else {
            return null;
        }
    }
    parseStringLiteral(str) {
        (0, linker_1.assert)(str, core_1.types.isStringLiteral, 'a string literal');
        return str.value;
    }
    parseNumericLiteral(num) {
        (0, linker_1.assert)(num, core_1.types.isNumericLiteral, 'a numeric literal');
        return num.value;
    }
    isBooleanLiteral(bool) {
        return core_1.types.isBooleanLiteral(bool) || isMinifiedBooleanLiteral(bool);
    }
    parseBooleanLiteral(bool) {
        if (core_1.types.isBooleanLiteral(bool)) {
            return bool.value;
        }
        else if (isMinifiedBooleanLiteral(bool)) {
            return !bool.argument.value;
        }
        else {
            throw new linker_1.FatalLinkerError(bool, 'Unsupported syntax, expected a boolean literal.');
        }
    }
    isNull(node) {
        return core_1.types.isNullLiteral(node);
    }
    parseArrayLiteral(array) {
        (0, linker_1.assert)(array, core_1.types.isArrayExpression, 'an array literal');
        return array.elements.map((element) => {
            (0, linker_1.assert)(element, isNotEmptyElement, 'element in array not to be empty');
            (0, linker_1.assert)(element, isNotSpreadElement, 'element in array not to use spread syntax');
            return element;
        });
    }
    parseObjectLiteral(obj) {
        (0, linker_1.assert)(obj, core_1.types.isObjectExpression, 'an object literal');
        const result = new Map();
        for (const property of obj.properties) {
            (0, linker_1.assert)(property, core_1.types.isObjectProperty, 'a property assignment');
            (0, linker_1.assert)(property.value, core_1.types.isExpression, 'an expression');
            (0, linker_1.assert)(property.key, isObjectExpressionPropertyName, 'a property name');
            const key = core_1.types.isIdentifier(property.key) ? property.key.name : property.key.value;
            result.set(`${key}`, property.value);
        }
        return result;
    }
    isFunctionExpression(node) {
        return core_1.types.isFunction(node) || core_1.types.isArrowFunctionExpression(node);
    }
    parseReturnValue(fn) {
        (0, linker_1.assert)(fn, this.isFunctionExpression, 'a function');
        if (!core_1.types.isBlockStatement(fn.body)) {
            // it is a simple array function expression: `(...) => expr`
            return fn.body;
        }
        // it is a function (arrow or normal) with a body. E.g.:
        // * `(...) => { stmt; ... }`
        // * `function(...) { stmt; ... }`
        if (fn.body.body.length !== 1) {
            throw new linker_1.FatalLinkerError(fn.body, 'Unsupported syntax, expected a function body with a single return statement.');
        }
        const stmt = fn.body.body[0];
        (0, linker_1.assert)(stmt, core_1.types.isReturnStatement, 'a function body with a single return statement');
        // Babel declares `argument` as optional and nullable, so we account for both scenarios.
        if (stmt.argument === null || stmt.argument === undefined) {
            throw new linker_1.FatalLinkerError(stmt, 'Unsupported syntax, expected function to return a value.');
        }
        return stmt.argument;
    }
    parseParameters(fn) {
        (0, linker_1.assert)(fn, this.isFunctionExpression, 'a function');
        return fn.params.map((param) => {
            (0, linker_1.assert)(param, core_1.types.isIdentifier, 'an identifier');
            return param;
        });
    }
    parseCallee(call) {
        (0, linker_1.assert)(call, core_1.types.isCallExpression, 'a call expression');
        (0, linker_1.assert)(call.callee, core_1.types.isExpression, 'an expression');
        return call.callee;
    }
    parseArguments(call) {
        (0, linker_1.assert)(call, core_1.types.isCallExpression, 'a call expression');
        return call.arguments.map((arg) => {
            (0, linker_1.assert)(arg, isNotSpreadArgument, 'argument not to use spread syntax');
            (0, linker_1.assert)(arg, core_1.types.isExpression, 'argument to be an expression');
            return arg;
        });
    }
    getRange(node) {
        if (node.loc == null || node.start == null || node.end == null) {
            throw new linker_1.FatalLinkerError(node, 'Unable to read range for node - it is missing location information.');
        }
        return {
            startLine: node.loc.start.line - 1, // Babel lines are 1-based
            startCol: node.loc.start.column,
            startPos: node.start,
            endPos: node.end,
        };
    }
}
exports.BabelAstHost = BabelAstHost;
/**
 * Return true if the expression does not represent an empty element in an array literal.
 * For example in `[,foo]` the first element is "empty".
 */
function isNotEmptyElement(e) {
    return e !== null;
}
/**
 * Return true if the expression is not a spread element of an array literal.
 * For example in `[x, ...rest]` the `...rest` expression is a spread element.
 */
function isNotSpreadElement(e) {
    return !core_1.types.isSpreadElement(e);
}
/**
 * Return true if the node can be considered a text based property name for an
 * object expression.
 *
 * Notably in the Babel AST, object patterns (for destructuring) could be of type
 * `t.PrivateName` so we need a distinction between object expressions and patterns.
 */
function isObjectExpressionPropertyName(n) {
    return core_1.types.isIdentifier(n) || core_1.types.isStringLiteral(n) || core_1.types.isNumericLiteral(n);
}
/**
 * Return true if the argument is not a spread element.
 */
function isNotSpreadArgument(arg) {
    return !core_1.types.isSpreadElement(arg);
}
/**
 * Return true if the node is either `!0` or `!1`.
 */
function isMinifiedBooleanLiteral(node) {
    return (core_1.types.isUnaryExpression(node) &&
        node.prefix &&
        node.operator === '!' &&
        core_1.types.isNumericLiteral(node.argument) &&
        (node.argument.value === 0 || node.argument.value === 1));
}
