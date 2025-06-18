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
exports.resolveEnumValue = resolveEnumValue;
exports.resolveEncapsulationEnumValueLocally = resolveEncapsulationEnumValueLocally;
exports.isStringArray = isStringArray;
exports.isClassReferenceArray = isClassReferenceArray;
exports.isArray = isArray;
exports.resolveLiteral = resolveLiteral;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const imports_1 = require("../../../imports");
const partial_evaluator_1 = require("../../../partial_evaluator");
const diagnostics_2 = require("./diagnostics");
const util_1 = require("./util");
function resolveEnumValue(evaluator, metadata, field, enumSymbolName, isCore) {
    let resolved = null;
    if (metadata.has(field)) {
        const expr = metadata.get(field);
        const value = evaluator.evaluate(expr);
        if (value instanceof partial_evaluator_1.EnumValue &&
            (0, util_1.isAngularCoreReferenceWithPotentialAliasing)(value.enumRef, enumSymbolName, isCore)) {
            resolved = value.resolved;
        }
        else {
            throw (0, diagnostics_2.createValueHasWrongTypeError)(expr, value, `${field} must be a member of ${enumSymbolName} enum from @angular/core`);
        }
    }
    return resolved;
}
/**
 * Resolves a EncapsulationEnum expression locally on best effort without having to calculate the
 * reference. This suites local compilation mode where each file is compiled individually.
 *
 * The static analysis is still needed in local compilation mode since the value of this enum will
 * be used later to decide the generated code for styles.
 */
function resolveEncapsulationEnumValueLocally(expr) {
    if (!expr) {
        return null;
    }
    const exprText = expr.getText().trim();
    for (const key in compiler_1.ViewEncapsulation) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        const suffix = `ViewEncapsulation.${key}`;
        // Check whether the enum is imported by name or used by import namespace (e.g.,
        // core.ViewEncapsulation.None)
        if (exprText === suffix || exprText.endsWith(`.${suffix}`)) {
            const ans = Number(compiler_1.ViewEncapsulation[key]);
            return ans;
        }
    }
    return null;
}
/** Determines if the result of an evaluation is a string array. */
function isStringArray(resolvedValue) {
    return Array.isArray(resolvedValue) && resolvedValue.every((elem) => typeof elem === 'string');
}
function isClassReferenceArray(resolvedValue) {
    return (Array.isArray(resolvedValue) &&
        resolvedValue.every((elem) => elem instanceof imports_1.Reference && typescript_1.default.isClassDeclaration(elem.node)));
}
function isArray(value) {
    return Array.isArray(value);
}
function resolveLiteral(decorator, literalCache) {
    if (literalCache.has(decorator)) {
        return literalCache.get(decorator);
    }
    if (decorator.args === null || decorator.args.length !== 1) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `Incorrect number of arguments to @${decorator.name} decorator`);
    }
    const meta = (0, util_1.unwrapExpression)(decorator.args[0]);
    if (!typescript_1.default.isObjectLiteralExpression(meta)) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, `Decorator argument must be literal.`);
    }
    literalCache.set(decorator, meta);
    return meta;
}
