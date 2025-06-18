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
exports.nameFunctionsAndVariables = nameFunctionsAndVariables;
const parse_util_1 = require("../../../../parse_util");
const ir = __importStar(require("../../ir"));
const parse_extracted_styles_1 = require("./parse_extracted_styles");
const compilation_1 = require("../compilation");
/**
 * Generate names for functions and variables across all views.
 *
 * This includes propagating those names into any `ir.ReadVariableExpr`s of those variables, so that
 * the reads can be emitted correctly.
 */
function nameFunctionsAndVariables(job) {
    addNamesToView(job.root, job.componentName, { index: 0 }, job.compatibility === ir.CompatibilityMode.TemplateDefinitionBuilder);
}
function addNamesToView(unit, baseName, state, compatibility) {
    if (unit.fnName === null) {
        // Ensure unique names for view units. This is necessary because there might be multiple
        // components with same names in the context of the same pool. Only add the suffix
        // if really needed.
        unit.fnName = unit.job.pool.uniqueName((0, parse_util_1.sanitizeIdentifier)(`${baseName}_${unit.job.fnSuffix}`), 
        /* alwaysIncludeSuffix */ false);
    }
    // Keep track of the names we assign to variables in the view. We'll need to propagate these
    // into reads of those variables afterwards.
    const varNames = new Map();
    for (const op of unit.ops()) {
        switch (op.kind) {
            case ir.OpKind.Property:
            case ir.OpKind.DomProperty:
                if (op.isAnimationTrigger) {
                    op.name = '@' + op.name;
                }
                break;
            case ir.OpKind.Listener:
                if (op.handlerFnName !== null) {
                    break;
                }
                if (!op.hostListener && op.targetSlot.slot === null) {
                    throw new Error(`Expected a slot to be assigned`);
                }
                let animation = '';
                if (op.isAnimationListener) {
                    op.name = `@${op.name}.${op.animationPhase}`;
                    animation = 'animation';
                }
                if (op.hostListener) {
                    op.handlerFnName = `${baseName}_${animation}${op.name}_HostBindingHandler`;
                }
                else {
                    op.handlerFnName = `${unit.fnName}_${op.tag.replace('-', '_')}_${animation}${op.name}_${op.targetSlot.slot}_listener`;
                }
                op.handlerFnName = (0, parse_util_1.sanitizeIdentifier)(op.handlerFnName);
                break;
            case ir.OpKind.TwoWayListener:
                if (op.handlerFnName !== null) {
                    break;
                }
                if (op.targetSlot.slot === null) {
                    throw new Error(`Expected a slot to be assigned`);
                }
                op.handlerFnName = (0, parse_util_1.sanitizeIdentifier)(`${unit.fnName}_${op.tag.replace('-', '_')}_${op.name}_${op.targetSlot.slot}_listener`);
                break;
            case ir.OpKind.Variable:
                varNames.set(op.xref, getVariableName(unit, op.variable, state));
                break;
            case ir.OpKind.RepeaterCreate:
                if (!(unit instanceof compilation_1.ViewCompilationUnit)) {
                    throw new Error(`AssertionError: must be compiling a component`);
                }
                if (op.handle.slot === null) {
                    throw new Error(`Expected slot to be assigned`);
                }
                if (op.emptyView !== null) {
                    const emptyView = unit.job.views.get(op.emptyView);
                    // Repeater empty view function is at slot +2 (metadata is in the first slot).
                    addNamesToView(emptyView, `${baseName}_${op.functionNameSuffix}Empty_${op.handle.slot + 2}`, state, compatibility);
                }
                // Repeater primary view function is at slot +1 (metadata is in the first slot).
                addNamesToView(unit.job.views.get(op.xref), `${baseName}_${op.functionNameSuffix}_${op.handle.slot + 1}`, state, compatibility);
                break;
            case ir.OpKind.Projection:
                if (!(unit instanceof compilation_1.ViewCompilationUnit)) {
                    throw new Error(`AssertionError: must be compiling a component`);
                }
                if (op.handle.slot === null) {
                    throw new Error(`Expected slot to be assigned`);
                }
                if (op.fallbackView !== null) {
                    const fallbackView = unit.job.views.get(op.fallbackView);
                    addNamesToView(fallbackView, `${baseName}_ProjectionFallback_${op.handle.slot}`, state, compatibility);
                }
                break;
            case ir.OpKind.ConditionalCreate:
            case ir.OpKind.ConditionalBranchCreate:
            case ir.OpKind.Template:
                if (!(unit instanceof compilation_1.ViewCompilationUnit)) {
                    throw new Error(`AssertionError: must be compiling a component`);
                }
                const childView = unit.job.views.get(op.xref);
                if (op.handle.slot === null) {
                    throw new Error(`Expected slot to be assigned`);
                }
                const suffix = op.functionNameSuffix.length === 0 ? '' : `_${op.functionNameSuffix}`;
                addNamesToView(childView, `${baseName}${suffix}_${op.handle.slot}`, state, compatibility);
                break;
            case ir.OpKind.StyleProp:
                op.name = normalizeStylePropName(op.name);
                if (compatibility) {
                    op.name = stripImportant(op.name);
                }
                break;
            case ir.OpKind.ClassProp:
                if (compatibility) {
                    op.name = stripImportant(op.name);
                }
                break;
        }
    }
    // Having named all variables declared in the view, now we can push those names into the
    // `ir.ReadVariableExpr` expressions which represent reads of those variables.
    for (const op of unit.ops()) {
        ir.visitExpressionsInOp(op, (expr) => {
            if (!(expr instanceof ir.ReadVariableExpr) || expr.name !== null) {
                return;
            }
            if (!varNames.has(expr.xref)) {
                throw new Error(`Variable ${expr.xref} not yet named`);
            }
            expr.name = varNames.get(expr.xref);
        });
    }
}
function getVariableName(unit, variable, state) {
    if (variable.name === null) {
        switch (variable.kind) {
            case ir.SemanticVariableKind.Context:
                variable.name = `ctx_r${state.index++}`;
                break;
            case ir.SemanticVariableKind.Identifier:
                if (unit.job.compatibility === ir.CompatibilityMode.TemplateDefinitionBuilder) {
                    // TODO: Prefix increment and `_r` are for compatibility with the old naming scheme.
                    // This has the potential to cause collisions when `ctx` is the identifier, so we need a
                    // special check for that as well.
                    const compatPrefix = variable.identifier === 'ctx' ? 'i' : '';
                    variable.name = `${variable.identifier}_${compatPrefix}r${++state.index}`;
                }
                else {
                    variable.name = `${variable.identifier}_i${state.index++}`;
                }
                break;
            default:
                // TODO: Prefix increment for compatibility only.
                variable.name = `_r${++state.index}`;
                break;
        }
    }
    return variable.name;
}
/**
 * Normalizes a style prop name by hyphenating it (unless its a CSS variable).
 */
function normalizeStylePropName(name) {
    return name.startsWith('--') ? name : (0, parse_extracted_styles_1.hyphenate)(name);
}
/**
 * Strips `!important` out of the given style or class name.
 */
function stripImportant(name) {
    const importantIndex = name.indexOf('!important');
    if (importantIndex > -1) {
        return name.substring(0, importantIndex);
    }
    return name;
}
