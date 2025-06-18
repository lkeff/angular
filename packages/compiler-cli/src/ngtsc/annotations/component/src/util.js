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
exports.animationTriggerResolver = void 0;
exports.collectAnimationNames = collectAnimationNames;
exports.isAngularAnimationsReference = isAngularAnimationsReference;
exports.validateAndFlattenComponentImports = validateAndFlattenComponentImports;
const ng_module_1 = require("../../ng_module");
const diagnostics_1 = require("../../../diagnostics");
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../../imports");
const partial_evaluator_1 = require("../../../partial_evaluator");
const reflection_1 = require("../../../reflection");
const common_1 = require("../../common");
/**
 * Collect the animation names from the static evaluation result.
 * @param value the static evaluation result of the animations
 * @param animationTriggerNames the animation names collected and whether some names could not be
 *     statically evaluated.
 */
function collectAnimationNames(value, animationTriggerNames) {
    if (value instanceof Map) {
        const name = value.get('name');
        if (typeof name === 'string') {
            animationTriggerNames.staticTriggerNames.push(name);
        }
        else {
            animationTriggerNames.includesDynamicAnimations = true;
        }
    }
    else if (Array.isArray(value)) {
        for (const resolvedValue of value) {
            collectAnimationNames(resolvedValue, animationTriggerNames);
        }
    }
    else {
        animationTriggerNames.includesDynamicAnimations = true;
    }
}
function isAngularAnimationsReference(reference, symbolName) {
    return (reference.ownedByModuleGuess === '@angular/animations' && reference.debugName === symbolName);
}
const animationTriggerResolver = (fn, node, resolve, unresolvable) => {
    const animationTriggerMethodName = 'trigger';
    if (!isAngularAnimationsReference(fn, animationTriggerMethodName)) {
        return unresolvable;
    }
    const triggerNameExpression = node.arguments[0];
    if (!triggerNameExpression) {
        return unresolvable;
    }
    const res = new Map();
    res.set('name', resolve(triggerNameExpression));
    return res;
};
exports.animationTriggerResolver = animationTriggerResolver;
function validateAndFlattenComponentImports(imports, expr, isDeferred) {
    const flattened = [];
    const errorMessage = isDeferred
        ? `'deferredImports' must be an array of components, directives, or pipes.`
        : `'imports' must be an array of components, directives, pipes, or NgModules.`;
    if (!Array.isArray(imports)) {
        const error = (0, common_1.createValueHasWrongTypeError)(expr, imports, errorMessage).toDiagnostic();
        return {
            imports: [],
            diagnostics: [error],
        };
    }
    const diagnostics = [];
    for (let i = 0; i < imports.length; i++) {
        const ref = imports[i];
        if (Array.isArray(ref)) {
            const { imports: childImports, diagnostics: childDiagnostics } = validateAndFlattenComponentImports(ref, expr, isDeferred);
            flattened.push(...childImports);
            diagnostics.push(...childDiagnostics);
        }
        else if (ref instanceof imports_1.Reference) {
            if ((0, reflection_1.isNamedClassDeclaration)(ref.node)) {
                flattened.push(ref);
            }
            else {
                diagnostics.push((0, common_1.createValueHasWrongTypeError)(ref.getOriginForDiagnostics(expr), ref, errorMessage).toDiagnostic());
            }
        }
        else if (isLikelyModuleWithProviders(ref)) {
            let origin = expr;
            if (ref instanceof partial_evaluator_1.SyntheticValue) {
                // The `ModuleWithProviders` type originated from a foreign function declaration, in which
                // case the original foreign call is available which is used to get a more accurate origin
                // node that points at the specific call expression.
                origin = (0, common_1.getOriginNodeForDiagnostics)(ref.value.mwpCall, expr);
            }
            diagnostics.push((0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.COMPONENT_UNKNOWN_IMPORT, origin, `Component imports contains a ModuleWithProviders value, likely the result of a 'Module.forRoot()'-style call. ` +
                `These calls are not used to configure components and are not valid in standalone component imports - ` +
                `consider importing them in the application bootstrap instead.`));
        }
        else {
            let diagnosticNode;
            let diagnosticValue;
            if (ref instanceof partial_evaluator_1.DynamicValue) {
                diagnosticNode = ref.node;
                diagnosticValue = ref;
            }
            else if (typescript_1.default.isArrayLiteralExpression(expr) &&
                expr.elements.length === imports.length &&
                !expr.elements.some(typescript_1.default.isSpreadAssignment) &&
                !imports.some(Array.isArray)) {
                // Reporting a diagnostic on the entire array can be noisy, especially if the user has a
                // large array. The most common case is that the array will be static so we can reliably
                // trace back a `ResolvedValue` back to its node using its index. This allows us to report
                // the exact node that caused the issue.
                diagnosticNode = expr.elements[i];
                diagnosticValue = ref;
            }
            else {
                diagnosticNode = expr;
                diagnosticValue = imports;
            }
            diagnostics.push((0, common_1.createValueHasWrongTypeError)(diagnosticNode, diagnosticValue, errorMessage).toDiagnostic());
        }
    }
    return { imports: flattened, diagnostics };
}
/**
 * Inspects `value` to determine if it resembles a `ModuleWithProviders` value. This is an
 * approximation only suitable for error reporting as any resolved object with an `ngModule`
 * key is considered a `ModuleWithProviders`.
 */
function isLikelyModuleWithProviders(value) {
    if (value instanceof partial_evaluator_1.SyntheticValue && (0, ng_module_1.isResolvedModuleWithProviders)(value)) {
        // This is a `ModuleWithProviders` as extracted from a foreign function call.
        return true;
    }
    if (value instanceof Map && value.has('ngModule')) {
        // A resolved `Map` with `ngModule` property would have been extracted from locally declared
        // functions that return a `ModuleWithProviders` object.
        return true;
    }
    return false;
}
