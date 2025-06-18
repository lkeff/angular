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
exports.extractPureFunctions = extractPureFunctions;
const constant_pool_1 = require("../../../../constant_pool");
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
function extractPureFunctions(job) {
    for (const view of job.units) {
        for (const op of view.ops()) {
            ir.visitExpressionsInOp(op, (expr) => {
                if (!(expr instanceof ir.PureFunctionExpr) || expr.body === null) {
                    return;
                }
                const constantDef = new PureFunctionConstant(expr.args.length);
                expr.fn = job.pool.getSharedConstant(constantDef, expr.body);
                expr.body = null;
            });
        }
    }
}
class PureFunctionConstant extends constant_pool_1.GenericKeyFn {
    constructor(numArgs) {
        super();
        this.numArgs = numArgs;
    }
    keyOf(expr) {
        if (expr instanceof ir.PureFunctionParameterExpr) {
            return `param(${expr.index})`;
        }
        else {
            return super.keyOf(expr);
        }
    }
    // TODO: Use the new pool method `getSharedFunctionReference`
    toSharedConstantDeclaration(declName, keyExpr) {
        const fnParams = [];
        for (let idx = 0; idx < this.numArgs; idx++) {
            fnParams.push(new o.FnParam('a' + idx));
        }
        // We will never visit `ir.PureFunctionParameterExpr`s that don't belong to us, because this
        // transform runs inside another visitor which will visit nested pure functions before this one.
        const returnExpr = ir.transformExpressionsInExpression(keyExpr, (expr) => {
            if (!(expr instanceof ir.PureFunctionParameterExpr)) {
                return expr;
            }
            return o.variable('a' + expr.index);
        }, ir.VisitorContextFlag.None);
        return new o.DeclareVarStmt(declName, new o.ArrowFunctionExpr(fnParams, returnExpr), undefined, o.StmtModifier.Final);
    }
}
