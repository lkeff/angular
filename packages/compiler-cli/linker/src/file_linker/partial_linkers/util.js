"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_VERSION = void 0;
exports.wrapReference = wrapReference;
exports.parseEnum = parseEnum;
exports.getDependency = getDependency;
exports.extractForwardRef = extractForwardRef;
exports.getDefaultStandaloneValue = getDefaultStandaloneValue;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const fatal_linker_error_1 = require("../../fatal_linker_error");
const semver_1 = __importDefault(require("semver"));
exports.PLACEHOLDER_VERSION = '0.0.0-PLACEHOLDER';
function wrapReference(wrapped) {
    return { value: wrapped, type: wrapped };
}
/**
 * Parses the value of an enum from the AST value's symbol name.
 */
function parseEnum(value, Enum) {
    const symbolName = value.getSymbolName();
    if (symbolName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(value.expression, 'Expected value to have a symbol name');
    }
    const enumValue = Enum[symbolName];
    if (enumValue === undefined) {
        throw new fatal_linker_error_1.FatalLinkerError(value.expression, `Unsupported enum value for ${Enum}`);
    }
    return enumValue;
}
/**
 * Parse a dependency structure from an AST object.
 */
function getDependency(depObj) {
    const isAttribute = depObj.has('attribute') && depObj.getBoolean('attribute');
    const token = depObj.getOpaque('token');
    // Normally `attribute` is a string literal and so its `attributeNameType` is the same string
    // literal. If the `attribute` is some other expression, the `attributeNameType` would be the
    // `unknown` type. It is not possible to generate this when linking, since it only deals with JS
    // and not typings. When linking the existence of the `attributeNameType` only acts as a marker to
    // change the injection instruction that is generated, so we just pass the literal string
    // `"unknown"`.
    const attributeNameType = isAttribute ? compiler_1.outputAst.literal('unknown') : null;
    return {
        token,
        attributeNameType,
        host: depObj.has('host') && depObj.getBoolean('host'),
        optional: depObj.has('optional') && depObj.getBoolean('optional'),
        self: depObj.has('self') && depObj.getBoolean('self'),
        skipSelf: depObj.has('skipSelf') && depObj.getBoolean('skipSelf'),
    };
}
/**
 * Return an `R3ProviderExpression` that represents either the extracted type reference expression
 * from a `forwardRef` function call, or the type itself.
 *
 * For example, the expression `forwardRef(function() { return FooDir; })` returns `FooDir`. Note
 * that this expression is required to be wrapped in a closure, as otherwise the forward reference
 * would be resolved before initialization.
 *
 * If there is no forwardRef call expression then we just return the opaque type.
 */
function extractForwardRef(expr) {
    if (!expr.isCallExpression()) {
        return (0, compiler_1.createMayBeForwardRefExpression)(expr.getOpaque(), compiler_1.ForwardRefHandling.None);
    }
    const callee = expr.getCallee();
    if (callee.getSymbolName() !== 'forwardRef') {
        throw new fatal_linker_error_1.FatalLinkerError(callee.expression, 'Unsupported expression, expected a `forwardRef()` call or a type reference');
    }
    const args = expr.getArguments();
    if (args.length !== 1) {
        throw new fatal_linker_error_1.FatalLinkerError(expr, 'Unsupported `forwardRef(fn)` call, expected a single argument');
    }
    const wrapperFn = args[0];
    if (!wrapperFn.isFunction()) {
        throw new fatal_linker_error_1.FatalLinkerError(wrapperFn, 'Unsupported `forwardRef(fn)` call, expected its argument to be a function');
    }
    return (0, compiler_1.createMayBeForwardRefExpression)(wrapperFn.getFunctionReturnValue().getOpaque(), compiler_1.ForwardRefHandling.Unwrapped);
}
const STANDALONE_IS_DEFAULT_RANGE = new semver_1.default.Range(`>= 19.0.0 || ${exports.PLACEHOLDER_VERSION}`, {
    includePrerelease: true,
});
function getDefaultStandaloneValue(version) {
    return STANDALONE_IS_DEFAULT_RANGE.test(version);
}
