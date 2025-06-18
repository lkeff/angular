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
exports.QUERY_INITIALIZER_FNS = void 0;
exports.tryParseSignalQueryFromInitializer = tryParseSignalQueryFromInitializer;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const reflection_1 = require("../../../reflection");
const common_1 = require("../../common");
const initializer_function_access_1 = require("./initializer_function_access");
const initializer_functions_1 = require("./initializer_functions");
/** Possible names of query initializer APIs. */
const queryFunctionNames = [
    'viewChild',
    'viewChildren',
    'contentChild',
    'contentChildren',
];
/** Possible query initializer API functions. */
exports.QUERY_INITIALIZER_FNS = queryFunctionNames.map((fnName) => ({
    functionName: fnName,
    owningModule: '@angular/core',
    // Queries are accessed from within static blocks, via the query definition functions.
    // Conceptually, the fields could access private members— even ES private fields.
    // Support for ES private fields requires special caution and complexity when partial
    // output is linked— hence not supported. TS private members are allowed in static blocks.
    allowedAccessLevels: [
        reflection_1.ClassMemberAccessLevel.PublicWritable,
        reflection_1.ClassMemberAccessLevel.PublicReadonly,
        reflection_1.ClassMemberAccessLevel.Protected,
        reflection_1.ClassMemberAccessLevel.Private,
    ],
}));
// The `descendants` option is enabled by default, except for content children.
const defaultDescendantsValue = (type) => type !== 'contentChildren';
/**
 * Attempts to detect a possible query definition for the given class member.
 *
 * This function checks for all possible variants of queries and matches the
 * first one. The query is then analyzed and its resolved metadata is returned.
 *
 * @returns Resolved query metadata, or null if no query is declared.
 */
function tryParseSignalQueryFromInitializer(member, reflector, importTracker) {
    if (member.value === null) {
        return null;
    }
    const query = (0, initializer_functions_1.tryParseInitializerApi)(exports.QUERY_INITIALIZER_FNS, member.value, reflector, importTracker);
    if (query === null) {
        return null;
    }
    (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(query, member);
    const { functionName } = query.api;
    const isSingleQuery = functionName === 'viewChild' || functionName === 'contentChild';
    const predicateNode = query.call.arguments[0];
    if (predicateNode === undefined) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_HAS_WRONG_TYPE, query.call, 'No locator specified.');
    }
    const optionsNode = query.call.arguments[1];
    if (optionsNode !== undefined && !typescript_1.default.isObjectLiteralExpression(optionsNode)) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_HAS_WRONG_TYPE, optionsNode, 'Argument needs to be an object literal.');
    }
    const options = optionsNode && (0, reflection_1.reflectObjectLiteral)(optionsNode);
    const read = (options === null || options === void 0 ? void 0 : options.has('read')) ? parseReadOption(options.get('read')) : null;
    const descendants = (options === null || options === void 0 ? void 0 : options.has('descendants'))
        ? parseDescendantsOption(options.get('descendants'))
        : defaultDescendantsValue(functionName);
    return {
        name: functionName,
        call: query.call,
        metadata: {
            isSignal: true,
            propertyName: member.name,
            static: false,
            emitDistinctChangesOnly: true,
            predicate: parseLocator(predicateNode, reflector),
            first: isSingleQuery,
            read,
            descendants,
        },
    };
}
/** Parses the locator/predicate of the query. */
function parseLocator(expression, reflector) {
    // Attempt to unwrap `forwardRef` calls.
    const unwrappedExpression = (0, common_1.tryUnwrapForwardRef)(expression, reflector);
    if (unwrappedExpression !== null) {
        expression = unwrappedExpression;
    }
    if (typescript_1.default.isStringLiteralLike(expression)) {
        return [expression.text];
    }
    return (0, compiler_1.createMayBeForwardRefExpression)(new compiler_1.outputAst.WrappedNodeExpr(expression), unwrappedExpression !== null ? compiler_1.ForwardRefHandling.Unwrapped : compiler_1.ForwardRefHandling.None);
}
/**
 * Parses the `read` option of a query.
 *
 * We only support the following patterns for the `read` option:
 *     - `read: someImport.BLA`,
 *     - `read: BLA`
 *
 * That is because we cannot trivially support complex expressions,
 * especially those referencing `this`. The read provider token will
 * live outside of the class in the static class definition.
 */
function parseReadOption(value) {
    if (typescript_1.default.isExpressionWithTypeArguments(value) ||
        typescript_1.default.isParenthesizedExpression(value) ||
        typescript_1.default.isAsExpression(value)) {
        return parseReadOption(value.expression);
    }
    if ((typescript_1.default.isPropertyAccessExpression(value) && typescript_1.default.isIdentifier(value.expression)) ||
        typescript_1.default.isIdentifier(value)) {
        return new compiler_1.outputAst.WrappedNodeExpr(value);
    }
    throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_NOT_LITERAL, value, `Query "read" option expected a literal class reference.`);
}
/** Parses the `descendants` option of a query. */
function parseDescendantsOption(value) {
    if (value.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
        return true;
    }
    else if (value.kind === typescript_1.default.SyntaxKind.FalseKeyword) {
        return false;
    }
    throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_HAS_WRONG_TYPE, value, `Expected "descendants" option to be a boolean literal.`);
}
