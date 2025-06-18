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
exports.removeIllegalLetReferences = removeIllegalLetReferences;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * It's not allowed to access a `@let` declaration before it has been defined. This is enforced
 * already via template type checking, however it can trip some of the assertions in the pipeline.
 * E.g. the naming phase can fail because we resolved the variable here, but the variable doesn't
 * exist anymore because the optimization phase removed it since it's invalid. To avoid surfacing
 * confusing errors to users in the case where template type checking isn't running (e.g. in JIT
 * mode) this phase detects illegal forward references and replaces them with `undefined`.
 * Eventually users will see the proper error from the template type checker.
 */
function removeIllegalLetReferences(job) {
    for (const unit of job.units) {
        for (const op of unit.update) {
            if (op.kind !== ir.OpKind.Variable ||
                op.variable.kind !== ir.SemanticVariableKind.Identifier ||
                !(op.initializer instanceof ir.StoreLetExpr)) {
                continue;
            }
            const name = op.variable.identifier;
            let current = op;
            while (current && current.kind !== ir.OpKind.ListEnd) {
                ir.transformExpressionsInOp(current, (expr) => expr instanceof ir.LexicalReadExpr && expr.name === name ? o.literal(undefined) : expr, ir.VisitorContextFlag.None);
                current = current.prev;
            }
        }
    }
}
