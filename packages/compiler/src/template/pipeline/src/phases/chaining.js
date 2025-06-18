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
exports.chain = chain;
const o = __importStar(require("../../../../output/output_ast"));
const r3_identifiers_1 = require("../../../../render3/r3_identifiers");
const ir = __importStar(require("../../ir"));
const CHAIN_COMPATIBILITY = new Map([
    [r3_identifiers_1.Identifiers.attribute, r3_identifiers_1.Identifiers.attribute],
    [r3_identifiers_1.Identifiers.classProp, r3_identifiers_1.Identifiers.classProp],
    [r3_identifiers_1.Identifiers.element, r3_identifiers_1.Identifiers.element],
    [r3_identifiers_1.Identifiers.elementContainer, r3_identifiers_1.Identifiers.elementContainer],
    [r3_identifiers_1.Identifiers.elementContainerEnd, r3_identifiers_1.Identifiers.elementContainerEnd],
    [r3_identifiers_1.Identifiers.elementContainerStart, r3_identifiers_1.Identifiers.elementContainerStart],
    [r3_identifiers_1.Identifiers.elementEnd, r3_identifiers_1.Identifiers.elementEnd],
    [r3_identifiers_1.Identifiers.elementStart, r3_identifiers_1.Identifiers.elementStart],
    [r3_identifiers_1.Identifiers.domProperty, r3_identifiers_1.Identifiers.domProperty],
    [r3_identifiers_1.Identifiers.i18nExp, r3_identifiers_1.Identifiers.i18nExp],
    [r3_identifiers_1.Identifiers.listener, r3_identifiers_1.Identifiers.listener],
    [r3_identifiers_1.Identifiers.listener, r3_identifiers_1.Identifiers.listener],
    [r3_identifiers_1.Identifiers.property, r3_identifiers_1.Identifiers.property],
    [r3_identifiers_1.Identifiers.styleProp, r3_identifiers_1.Identifiers.styleProp],
    [r3_identifiers_1.Identifiers.stylePropInterpolate1, r3_identifiers_1.Identifiers.stylePropInterpolate1],
    [r3_identifiers_1.Identifiers.stylePropInterpolate2, r3_identifiers_1.Identifiers.stylePropInterpolate2],
    [r3_identifiers_1.Identifiers.stylePropInterpolate3, r3_identifiers_1.Identifiers.stylePropInterpolate3],
    [r3_identifiers_1.Identifiers.stylePropInterpolate4, r3_identifiers_1.Identifiers.stylePropInterpolate4],
    [r3_identifiers_1.Identifiers.stylePropInterpolate5, r3_identifiers_1.Identifiers.stylePropInterpolate5],
    [r3_identifiers_1.Identifiers.stylePropInterpolate6, r3_identifiers_1.Identifiers.stylePropInterpolate6],
    [r3_identifiers_1.Identifiers.stylePropInterpolate7, r3_identifiers_1.Identifiers.stylePropInterpolate7],
    [r3_identifiers_1.Identifiers.stylePropInterpolate8, r3_identifiers_1.Identifiers.stylePropInterpolate8],
    [r3_identifiers_1.Identifiers.stylePropInterpolateV, r3_identifiers_1.Identifiers.stylePropInterpolateV],
    [r3_identifiers_1.Identifiers.syntheticHostListener, r3_identifiers_1.Identifiers.syntheticHostListener],
    [r3_identifiers_1.Identifiers.syntheticHostProperty, r3_identifiers_1.Identifiers.syntheticHostProperty],
    [r3_identifiers_1.Identifiers.templateCreate, r3_identifiers_1.Identifiers.templateCreate],
    [r3_identifiers_1.Identifiers.twoWayProperty, r3_identifiers_1.Identifiers.twoWayProperty],
    [r3_identifiers_1.Identifiers.twoWayListener, r3_identifiers_1.Identifiers.twoWayListener],
    [r3_identifiers_1.Identifiers.declareLet, r3_identifiers_1.Identifiers.declareLet],
    [r3_identifiers_1.Identifiers.conditionalCreate, r3_identifiers_1.Identifiers.conditionalBranchCreate],
    [r3_identifiers_1.Identifiers.conditionalBranchCreate, r3_identifiers_1.Identifiers.conditionalBranchCreate],
]);
/**
 * Chaining results in repeated call expressions, causing a deep AST of receiver expressions. To prevent running out of
 * stack depth the maximum number of chained instructions is limited to this threshold, which has been selected
 * arbitrarily.
 */
const MAX_CHAIN_LENGTH = 256;
/**
 * Post-process a reified view compilation and convert sequential calls to chainable instructions
 * into chain calls.
 *
 * For example, two `elementStart` operations in sequence:
 *
 * ```ts
 * elementStart(0, 'div');
 * elementStart(1, 'span');
 * ```
 *
 * Can be called as a chain instead:
 *
 * ```ts
 * elementStart(0, 'div')(1, 'span');
 * ```
 */
function chain(job) {
    for (const unit of job.units) {
        chainOperationsInList(unit.create);
        chainOperationsInList(unit.update);
    }
}
function chainOperationsInList(opList) {
    let chain = null;
    for (const op of opList) {
        if (op.kind !== ir.OpKind.Statement || !(op.statement instanceof o.ExpressionStatement)) {
            // This type of statement isn't chainable.
            chain = null;
            continue;
        }
        if (!(op.statement.expr instanceof o.InvokeFunctionExpr) ||
            !(op.statement.expr.fn instanceof o.ExternalExpr)) {
            // This is a statement, but not an instruction-type call, so not chainable.
            chain = null;
            continue;
        }
        const instruction = op.statement.expr.fn.value;
        if (!CHAIN_COMPATIBILITY.has(instruction)) {
            // This instruction isn't chainable.
            chain = null;
            continue;
        }
        // This instruction can be chained. It can either be added on to the previous chain (if
        // compatible) or it can be the start of a new chain.
        if (chain !== null &&
            CHAIN_COMPATIBILITY.get(chain.instruction) === instruction &&
            chain.length < MAX_CHAIN_LENGTH) {
            // This instruction can be added onto the previous chain.
            const expression = chain.expression.callFn(op.statement.expr.args, op.statement.expr.sourceSpan, op.statement.expr.pure);
            chain.expression = expression;
            chain.op.statement = expression.toStmt();
            chain.length++;
            ir.OpList.remove(op);
        }
        else {
            // Leave this instruction alone for now, but consider it the start of a new chain.
            chain = {
                op,
                instruction,
                expression: op.statement.expr,
                length: 1,
            };
        }
    }
}
