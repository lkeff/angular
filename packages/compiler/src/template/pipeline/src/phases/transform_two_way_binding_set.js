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
exports.transformTwoWayBindingSet = transformTwoWayBindingSet;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
const ng = __importStar(require("../instruction"));
/**
 * Transforms a `TwoWayBindingSet` expression into an expression that either
 * sets a value through the `twoWayBindingSet` instruction or falls back to setting
 * the value directly. E.g. the expression `TwoWayBindingSet(target, value)` becomes:
 * `ng.twoWayBindingSet(target, value) || (target = value)`.
 */
function transformTwoWayBindingSet(job) {
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.TwoWayListener) {
                ir.transformExpressionsInOp(op, (expr) => {
                    if (!(expr instanceof ir.TwoWayBindingSetExpr)) {
                        return expr;
                    }
                    const { target, value } = expr;
                    if (target instanceof o.ReadPropExpr || target instanceof o.ReadKeyExpr) {
                        return ng.twoWayBindingSet(target, value).or(target.set(value));
                    }
                    // ASSUMPTION: here we're assuming that `ReadVariableExpr` will be a reference
                    // to a local template variable. This appears to be the case at the time of writing.
                    // If the expression is targeting a variable read, we only emit the `twoWayBindingSet`
                    // since the fallback would be attempting to write into a constant. Invalid usages will be
                    // flagged during template type checking.
                    if (target instanceof ir.ReadVariableExpr) {
                        return ng.twoWayBindingSet(target, value);
                    }
                    throw new Error(`Unsupported expression in two-way action binding.`);
                }, ir.VisitorContextFlag.InChildOperation);
            }
        }
    }
}
