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
exports.generatePureLiteralStructures = generatePureLiteralStructures;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
function generatePureLiteralStructures(job) {
    for (const unit of job.units) {
        for (const op of unit.update) {
            ir.transformExpressionsInOp(op, (expr, flags) => {
                if (flags & ir.VisitorContextFlag.InChildOperation) {
                    return expr;
                }
                if (expr instanceof o.LiteralArrayExpr) {
                    return transformLiteralArray(expr);
                }
                else if (expr instanceof o.LiteralMapExpr) {
                    return transformLiteralMap(expr);
                }
                return expr;
            }, ir.VisitorContextFlag.None);
        }
    }
}
function transformLiteralArray(expr) {
    const derivedEntries = [];
    const nonConstantArgs = [];
    for (const entry of expr.entries) {
        if (entry.isConstant()) {
            derivedEntries.push(entry);
        }
        else {
            const idx = nonConstantArgs.length;
            nonConstantArgs.push(entry);
            derivedEntries.push(new ir.PureFunctionParameterExpr(idx));
        }
    }
    return new ir.PureFunctionExpr(o.literalArr(derivedEntries), nonConstantArgs);
}
function transformLiteralMap(expr) {
    let derivedEntries = [];
    const nonConstantArgs = [];
    for (const entry of expr.entries) {
        if (entry.value.isConstant()) {
            derivedEntries.push(entry);
        }
        else {
            const idx = nonConstantArgs.length;
            nonConstantArgs.push(entry.value);
            derivedEntries.push(new o.LiteralMapEntry(entry.key, new ir.PureFunctionParameterExpr(idx), entry.quoted));
        }
    }
    return new ir.PureFunctionExpr(o.literalMap(derivedEntries), nonConstantArgs);
}
