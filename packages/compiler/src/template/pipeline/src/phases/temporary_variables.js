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
exports.generateTemporaryVariables = generateTemporaryVariables;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * Find all assignments and usages of temporary variables, which are linked to each other with cross
 * references. Generate names for each cross-reference, and add a `DeclareVarStmt` to initialize
 * them at the beginning of the update block.
 *
 * TODO: Sometimes, it will be possible to reuse names across different subexpressions. For example,
 * in the double keyed read `a?.[f()]?.[f()]`, the two function calls have non-overlapping scopes.
 * Implement an algorithm for reuse.
 */
function generateTemporaryVariables(job) {
    for (const unit of job.units) {
        unit.create.prepend(generateTemporaries(unit.create));
        unit.update.prepend(generateTemporaries(unit.update));
    }
}
function generateTemporaries(ops) {
    let opCount = 0;
    let generatedStatements = [];
    // For each op, search for any variables that are assigned or read. For each variable, generate a
    // name and produce a `DeclareVarStmt` to the beginning of the block.
    for (const op of ops) {
        // Identify the final time each temp var is read.
        const finalReads = new Map();
        ir.visitExpressionsInOp(op, (expr, flag) => {
            if (flag & ir.VisitorContextFlag.InChildOperation) {
                return;
            }
            if (expr instanceof ir.ReadTemporaryExpr) {
                finalReads.set(expr.xref, expr);
            }
        });
        // Name the temp vars, accounting for the fact that a name can be reused after it has been
        // read for the final time.
        let count = 0;
        const assigned = new Set();
        const released = new Set();
        const defs = new Map();
        ir.visitExpressionsInOp(op, (expr, flag) => {
            if (flag & ir.VisitorContextFlag.InChildOperation) {
                return;
            }
            if (expr instanceof ir.AssignTemporaryExpr) {
                if (!assigned.has(expr.xref)) {
                    assigned.add(expr.xref);
                    // TODO: Exactly replicate the naming scheme used by `TemplateDefinitionBuilder`.
                    // It seems to rely on an expression index instead of an op index.
                    defs.set(expr.xref, `tmp_${opCount}_${count++}`);
                }
                assignName(defs, expr);
            }
            else if (expr instanceof ir.ReadTemporaryExpr) {
                if (finalReads.get(expr.xref) === expr) {
                    released.add(expr.xref);
                    count--;
                }
                assignName(defs, expr);
            }
        });
        // Add declarations for the temp vars.
        generatedStatements.push(...Array.from(new Set(defs.values())).map((name) => ir.createStatementOp(new o.DeclareVarStmt(name))));
        opCount++;
        if (op.kind === ir.OpKind.Listener || op.kind === ir.OpKind.TwoWayListener) {
            op.handlerOps.prepend(generateTemporaries(op.handlerOps));
        }
        else if (op.kind === ir.OpKind.RepeaterCreate && op.trackByOps !== null) {
            op.trackByOps.prepend(generateTemporaries(op.trackByOps));
        }
    }
    return generatedStatements;
}
/**
 * Assigns a name to the temporary variable in the given temporary variable expression.
 */
function assignName(names, expr) {
    const name = names.get(expr.xref);
    if (name === undefined) {
        throw new Error(`Found xref with unassigned name: ${expr.xref}`);
    }
    expr.name = name;
}
