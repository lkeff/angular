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
exports.tsCastToAny = tsCastToAny;
exports.tsCreateElement = tsCreateElement;
exports.tsDeclareVariable = tsDeclareVariable;
exports.tsCreateTypeQueryForCoercedInput = tsCreateTypeQueryForCoercedInput;
exports.tsCreateVariable = tsCreateVariable;
exports.tsCallMethod = tsCallMethod;
exports.isAccessExpression = isAccessExpression;
exports.tsNumericExpression = tsNumericExpression;
const typescript_1 = __importDefault(require("typescript"));
const comments_1 = require("./comments");
/**
 * A `Set` of `ts.SyntaxKind`s of `ts.Expression` which are safe to wrap in a `ts.AsExpression`
 * without needing to be wrapped in parentheses.
 *
 * For example, `foo.bar()` is a `ts.CallExpression`, and can be safely cast to `any` with
 * `foo.bar() as any`. however, `foo !== bar` is a `ts.BinaryExpression`, and attempting to cast
 * without the parentheses yields the expression `foo !== bar as any`. This is semantically
 * equivalent to `foo !== (bar as any)`, which is not what was intended. Thus,
 * `ts.BinaryExpression`s need to be wrapped in parentheses before casting.
 */
//
const SAFE_TO_CAST_WITHOUT_PARENS = new Set([
    // Expressions which are already parenthesized can be cast without further wrapping.
    typescript_1.default.SyntaxKind.ParenthesizedExpression,
    // Expressions which form a single lexical unit leave no room for precedence issues with the cast.
    typescript_1.default.SyntaxKind.Identifier,
    typescript_1.default.SyntaxKind.CallExpression,
    typescript_1.default.SyntaxKind.NonNullExpression,
    typescript_1.default.SyntaxKind.ElementAccessExpression,
    typescript_1.default.SyntaxKind.PropertyAccessExpression,
    typescript_1.default.SyntaxKind.ArrayLiteralExpression,
    typescript_1.default.SyntaxKind.ObjectLiteralExpression,
    // The same goes for various literals.
    typescript_1.default.SyntaxKind.StringLiteral,
    typescript_1.default.SyntaxKind.NumericLiteral,
    typescript_1.default.SyntaxKind.TrueKeyword,
    typescript_1.default.SyntaxKind.FalseKeyword,
    typescript_1.default.SyntaxKind.NullKeyword,
    typescript_1.default.SyntaxKind.UndefinedKeyword,
]);
function tsCastToAny(expr) {
    // Wrap `expr` in parentheses if needed (see `SAFE_TO_CAST_WITHOUT_PARENS` above).
    if (!SAFE_TO_CAST_WITHOUT_PARENS.has(expr.kind)) {
        expr = typescript_1.default.factory.createParenthesizedExpression(expr);
    }
    // The outer expression is always wrapped in parentheses.
    return typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createAsExpression(expr, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword)));
}
/**
 * Create an expression which instantiates an element by its HTML tagName.
 *
 * Thanks to narrowing of `document.createElement()`, this expression will have its type inferred
 * based on the tag name, including for custom elements that have appropriate .d.ts definitions.
 */
function tsCreateElement(...tagNames) {
    const createElement = typescript_1.default.factory.createPropertyAccessExpression(
    /* expression */ typescript_1.default.factory.createIdentifier('document'), 'createElement');
    let arg;
    if (tagNames.length === 1) {
        // If there's only one tag name, we can pass it in directly.
        arg = typescript_1.default.factory.createStringLiteral(tagNames[0]);
    }
    else {
        // If there's more than one name, we have to generate a union of all the tag names. To do so,
        // create an expression in the form of `null! as 'tag-1' | 'tag-2' | 'tag-3'`. This allows
        // TypeScript to infer the type as a union of the differnet tags.
        const assertedNullExpression = typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull());
        const type = typescript_1.default.factory.createUnionTypeNode(tagNames.map((tag) => typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral(tag))));
        arg = typescript_1.default.factory.createAsExpression(assertedNullExpression, type);
    }
    return typescript_1.default.factory.createCallExpression(
    /* expression */ createElement, 
    /* typeArguments */ undefined, 
    /* argumentsArray */ [arg]);
}
/**
 * Create a `ts.VariableStatement` which declares a variable without explicit initialization.
 *
 * The initializer `null!` is used to bypass strict variable initialization checks.
 *
 * Unlike with `tsCreateVariable`, the type of the variable is explicitly specified.
 */
function tsDeclareVariable(id, type) {
    // When we create a variable like `var _t1: boolean = null!`, TypeScript actually infers `_t1`
    // to be `never`, instead of a `boolean`. To work around it, we cast the value
    // in the initializer, e.g. `var _t1 = null! as boolean;`.
    (0, comments_1.addExpressionIdentifier)(type, comments_1.ExpressionIdentifier.VARIABLE_AS_EXPRESSION);
    const initializer = typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull()), type);
    const decl = typescript_1.default.factory.createVariableDeclaration(
    /* name */ id, 
    /* exclamationToken */ undefined, 
    /* type */ undefined, 
    /* initializer */ initializer);
    return typescript_1.default.factory.createVariableStatement(
    /* modifiers */ undefined, 
    /* declarationList */ [decl]);
}
/**
 * Creates a `ts.TypeQueryNode` for a coerced input.
 *
 * For example: `typeof MatInput.ngAcceptInputType_value`, where MatInput is `typeName` and `value`
 * is the `coercedInputName`.
 *
 * @param typeName The `EntityName` of the Directive where the static coerced input is defined.
 * @param coercedInputName The field name of the coerced input.
 */
function tsCreateTypeQueryForCoercedInput(typeName, coercedInputName) {
    return typescript_1.default.factory.createTypeQueryNode(typescript_1.default.factory.createQualifiedName(typeName, `ngAcceptInputType_${coercedInputName}`));
}
/**
 * Create a `ts.VariableStatement` that initializes a variable with a given expression.
 *
 * Unlike with `tsDeclareVariable`, the type of the variable is inferred from the initializer
 * expression.
 */
function tsCreateVariable(id, initializer, flags = null) {
    const decl = typescript_1.default.factory.createVariableDeclaration(
    /* name */ id, 
    /* exclamationToken */ undefined, 
    /* type */ undefined, 
    /* initializer */ initializer);
    return typescript_1.default.factory.createVariableStatement(
    /* modifiers */ undefined, 
    /* declarationList */ flags === null
        ? [decl]
        : typescript_1.default.factory.createVariableDeclarationList([decl], flags));
}
/**
 * Construct a `ts.CallExpression` that calls a method on a receiver.
 */
function tsCallMethod(receiver, methodName, args = []) {
    const methodAccess = typescript_1.default.factory.createPropertyAccessExpression(receiver, methodName);
    return typescript_1.default.factory.createCallExpression(
    /* expression */ methodAccess, 
    /* typeArguments */ undefined, 
    /* argumentsArray */ args);
}
function isAccessExpression(node) {
    return typescript_1.default.isPropertyAccessExpression(node) || typescript_1.default.isElementAccessExpression(node);
}
/**
 * Creates a TypeScript node representing a numeric value.
 */
function tsNumericExpression(value) {
    // As of TypeScript 5.3 negative numbers are represented as `prefixUnaryOperator` and passing a
    // negative number (even as a string) into `createNumericLiteral` will result in an error.
    if (value < 0) {
        const operand = typescript_1.default.factory.createNumericLiteral(Math.abs(value));
        return typescript_1.default.factory.createPrefixUnaryExpression(typescript_1.default.SyntaxKind.MinusToken, operand);
    }
    return typescript_1.default.factory.createNumericLiteral(value);
}
