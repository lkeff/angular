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
exports.stripNonrequiredParentheses = stripNonrequiredParentheses;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * In most cases we can drop user added parentheses from expressions. However, in some cases
 * parentheses are needed for the expression to be considered valid JavaScript or for Typescript to
 * generate the correct output. This phases strips all parentheses except in the following
 * siturations where they are required:
 *
 * 1. Unary operators in the base of an exponentiation expression. For example, `-2 ** 3` is not
 *    valid JavaScript, but `(-2) ** 3` is.
 * 2. When mixing nullish coalescing (`??`) and logical and/or operators (`&&`, `||`), we need
 *    parentheses. For example, `a ?? b && c` is not valid JavaScript, but `a ?? (b && c)` is.
 * 3. Ternary expression used as an operand for nullish coalescing. Typescript generates incorrect
 *    code if the parentheses are missing. For example when `(a ? b : c) ?? d` is translated to
 *    typescript AST, the parentheses node is removed, and then the remaining AST is printed, it
 *    incorrectly prints `a ? b : c ?? d`. This is different from how it handles the same situation
 *    with `||` and `&&` where it prints the parentheses even if they are not present in the AST.
 *    Note: We may be able to remove this case if Typescript resolves the following issue:
 *    https://github.com/microsoft/TypeScript/issues/61369
 */
function stripNonrequiredParentheses(job) {
    // Check which parentheses are required.
    const requiredParens = new Set();
    for (const unit of job.units) {
        for (const op of unit.ops()) {
            ir.visitExpressionsInOp(op, (expr) => {
                if (expr instanceof o.BinaryOperatorExpr) {
                    switch (expr.operator) {
                        case o.BinaryOperator.Exponentiation:
                            checkExponentiationParens(expr, requiredParens);
                            break;
                        case o.BinaryOperator.NullishCoalesce:
                            checkNullishCoalescingParens(expr, requiredParens);
                            break;
                    }
                }
            });
        }
    }
    // Remove any non-required parentheses.
    for (const unit of job.units) {
        for (const op of unit.ops()) {
            ir.transformExpressionsInOp(op, (expr) => {
                if (expr instanceof o.ParenthesizedExpr) {
                    return requiredParens.has(expr) ? expr : expr.expr;
                }
                return expr;
            }, ir.VisitorContextFlag.None);
        }
    }
}
function checkExponentiationParens(expr, requiredParens) {
    if (expr.lhs instanceof o.ParenthesizedExpr && expr.lhs.expr instanceof o.UnaryOperatorExpr) {
        requiredParens.add(expr.lhs);
    }
}
function checkNullishCoalescingParens(expr, requiredParens) {
    if (expr.lhs instanceof o.ParenthesizedExpr &&
        (isLogicalAndOr(expr.lhs.expr) || expr.lhs.expr instanceof o.ConditionalExpr)) {
        requiredParens.add(expr.lhs);
    }
    if (expr.rhs instanceof o.ParenthesizedExpr &&
        (isLogicalAndOr(expr.rhs.expr) || expr.rhs.expr instanceof o.ConditionalExpr)) {
        requiredParens.add(expr.rhs);
    }
}
function isLogicalAndOr(expr) {
    return (expr instanceof o.BinaryOperatorExpr &&
        (expr.operator === o.BinaryOperator.And || expr.operator === o.BinaryOperator.Or));
}
