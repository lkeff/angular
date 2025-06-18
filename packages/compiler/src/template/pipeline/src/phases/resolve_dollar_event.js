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
exports.resolveDollarEvent = resolveDollarEvent;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * Any variable inside a listener with the name `$event` will be transformed into a output lexical
 * read immediately, and does not participate in any of the normal logic for handling variables.
 */
function resolveDollarEvent(job) {
    for (const unit of job.units) {
        transformDollarEvent(unit.create);
        transformDollarEvent(unit.update);
    }
}
function transformDollarEvent(ops) {
    for (const op of ops) {
        if (op.kind === ir.OpKind.Listener || op.kind === ir.OpKind.TwoWayListener) {
            ir.transformExpressionsInOp(op, (expr) => {
                if (expr instanceof ir.LexicalReadExpr && expr.name === '$event') {
                    // Two-way listeners always consume `$event` so they omit this field.
                    if (op.kind === ir.OpKind.Listener) {
                        op.consumesDollarEvent = true;
                    }
                    return new o.ReadVarExpr(expr.name);
                }
                return expr;
            }, ir.VisitorContextFlag.InChildOperation);
        }
    }
}
