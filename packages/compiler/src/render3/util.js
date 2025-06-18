"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeWithParameters = typeWithParameters;
exports.prepareSyntheticPropertyName = prepareSyntheticPropertyName;
exports.prepareSyntheticListenerName = prepareSyntheticListenerName;
exports.getSafePropertyAccessString = getSafePropertyAccessString;
exports.prepareSyntheticListenerFunctionName = prepareSyntheticListenerFunctionName;
exports.jitOnlyGuardedExpression = jitOnlyGuardedExpression;
exports.devOnlyGuardedExpression = devOnlyGuardedExpression;
exports.guardedExpression = guardedExpression;
exports.wrapReference = wrapReference;
exports.refsToArray = refsToArray;
exports.createMayBeForwardRefExpression = createMayBeForwardRefExpression;
exports.convertFromMaybeForwardRefExpression = convertFromMaybeForwardRefExpression;
exports.generateForwardRef = generateForwardRef;
const abstract_emitter_1 = require("../output/abstract_emitter");
const o = __importStar(require("../output/output_ast"));
const r3_identifiers_1 = require("./r3_identifiers");
function typeWithParameters(type, numParams) {
    if (numParams === 0) {
        return o.expressionType(type);
    }
    const params = [];
    for (let i = 0; i < numParams; i++) {
        params.push(o.DYNAMIC_TYPE);
    }
    return o.expressionType(type, undefined, params);
}
const ANIMATE_SYMBOL_PREFIX = '@';
function prepareSyntheticPropertyName(name) {
    return `${ANIMATE_SYMBOL_PREFIX}${name}`;
}
function prepareSyntheticListenerName(name, phase) {
    return `${ANIMATE_SYMBOL_PREFIX}${name}.${phase}`;
}
function getSafePropertyAccessString(accessor, name) {
    const escapedName = (0, abstract_emitter_1.escapeIdentifier)(name, false, false);
    return escapedName !== name ? `${accessor}[${escapedName}]` : `${accessor}.${name}`;
}
function prepareSyntheticListenerFunctionName(name, phase) {
    return `animation_${name}_${phase}`;
}
function jitOnlyGuardedExpression(expr) {
    return guardedExpression('ngJitMode', expr);
}
function devOnlyGuardedExpression(expr) {
    return guardedExpression('ngDevMode', expr);
}
function guardedExpression(guard, expr) {
    const guardExpr = new o.ExternalExpr({ name: guard, moduleName: null });
    const guardNotDefined = new o.BinaryOperatorExpr(o.BinaryOperator.Identical, new o.TypeofExpr(guardExpr), o.literal('undefined'));
    const guardUndefinedOrTrue = new o.BinaryOperatorExpr(o.BinaryOperator.Or, guardNotDefined, guardExpr, 
    /* type */ undefined, 
    /* sourceSpan */ undefined);
    return new o.BinaryOperatorExpr(o.BinaryOperator.And, guardUndefinedOrTrue, expr);
}
function wrapReference(value) {
    const wrapped = new o.WrappedNodeExpr(value);
    return { value: wrapped, type: wrapped };
}
function refsToArray(refs, shouldForwardDeclare) {
    const values = o.literalArr(refs.map((ref) => ref.value));
    return shouldForwardDeclare ? o.arrowFn([], values) : values;
}
function createMayBeForwardRefExpression(expression, forwardRef) {
    return { expression, forwardRef };
}
/**
 * Convert a `MaybeForwardRefExpression` to an `Expression`, possibly wrapping its expression in a
 * `forwardRef()` call.
 *
 * If `MaybeForwardRefExpression.forwardRef` is `ForwardRefHandling.Unwrapped` then the expression
 * was originally wrapped in a `forwardRef()` call to prevent the value from being eagerly evaluated
 * in the code.
 *
 * See `packages/compiler-cli/src/ngtsc/annotations/src/injectable.ts` and
 * `packages/compiler/src/jit_compiler_facade.ts` for more information.
 */
function convertFromMaybeForwardRefExpression({ expression, forwardRef, }) {
    switch (forwardRef) {
        case 0 /* ForwardRefHandling.None */:
        case 1 /* ForwardRefHandling.Wrapped */:
            return expression;
        case 2 /* ForwardRefHandling.Unwrapped */:
            return generateForwardRef(expression);
    }
}
/**
 * Generate an expression that has the given `expr` wrapped in the following form:
 *
 * ```ts
 * forwardRef(() => expr)
 * ```
 */
function generateForwardRef(expr) {
    return o.importExpr(r3_identifiers_1.Identifiers.forwardRef).callFn([o.arrowFn([], expr)]);
}
