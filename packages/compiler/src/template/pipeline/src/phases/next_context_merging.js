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
exports.mergeNextContextExpressions = mergeNextContextExpressions;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * Merges logically sequential `NextContextExpr` operations.
 *
 * `NextContextExpr` can be referenced repeatedly, "popping" the runtime's context stack each time.
 * When two such expressions appear back-to-back, it's possible to merge them together into a single
 * `NextContextExpr` that steps multiple contexts. This merging is possible if all conditions are
 * met:
 *
 *   * The result of the `NextContextExpr` that's folded into the subsequent one is not stored (that
 *     is, the call is purely side-effectful).
 *   * No operations in between them uses the implicit context.
 */
function mergeNextContextExpressions(job) {
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.Listener || op.kind === ir.OpKind.TwoWayListener) {
                mergeNextContextsInOps(op.handlerOps);
            }
        }
        mergeNextContextsInOps(unit.update);
    }
}
function mergeNextContextsInOps(ops) {
    for (const op of ops) {
        // Look for a candidate operation to maybe merge.
        if (op.kind !== ir.OpKind.Statement ||
            !(op.statement instanceof o.ExpressionStatement) ||
            !(op.statement.expr instanceof ir.NextContextExpr)) {
            continue;
        }
        const mergeSteps = op.statement.expr.steps;
        // Try to merge this `ir.NextContextExpr`.
        let tryToMerge = true;
        for (let candidate = op.next; candidate.kind !== ir.OpKind.ListEnd && tryToMerge; candidate = candidate.next) {
            ir.visitExpressionsInOp(candidate, (expr, flags) => {
                if (!ir.isIrExpression(expr)) {
                    return expr;
                }
                if (!tryToMerge) {
                    // Either we've already merged, or failed to merge.
                    return;
                }
                if (flags & ir.VisitorContextFlag.InChildOperation) {
                    // We cannot merge into child operations.
                    return;
                }
                switch (expr.kind) {
                    case ir.ExpressionKind.NextContext:
                        // Merge the previous `ir.NextContextExpr` into this one.
                        expr.steps += mergeSteps;
                        ir.OpList.remove(op);
                        tryToMerge = false;
                        break;
                    case ir.ExpressionKind.GetCurrentView:
                    case ir.ExpressionKind.Reference:
                    case ir.ExpressionKind.ContextLetReference:
                        // Can't merge past a dependency on the context.
                        tryToMerge = false;
                        break;
                }
                return;
            });
        }
    }
}
