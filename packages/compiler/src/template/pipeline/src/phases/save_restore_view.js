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
exports.saveAndRestoreView = saveAndRestoreView;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * When inside of a listener, we may need access to one or more enclosing views. Therefore, each
 * view should save the current view, and each listener must have the ability to restore the
 * appropriate view. We eagerly generate all save view variables; they will be optimized away later.
 */
function saveAndRestoreView(job) {
    for (const unit of job.units) {
        unit.create.prepend([
            ir.createVariableOp(unit.job.allocateXrefId(), {
                kind: ir.SemanticVariableKind.SavedView,
                name: null,
                view: unit.xref,
            }, new ir.GetCurrentViewExpr(), ir.VariableFlags.None),
        ]);
        for (const op of unit.create) {
            if (op.kind !== ir.OpKind.Listener && op.kind !== ir.OpKind.TwoWayListener) {
                continue;
            }
            // Embedded views always need the save/restore view operation.
            let needsRestoreView = unit !== job.root;
            if (!needsRestoreView) {
                for (const handlerOp of op.handlerOps) {
                    ir.visitExpressionsInOp(handlerOp, (expr) => {
                        if (expr instanceof ir.ReferenceExpr || expr instanceof ir.ContextLetReferenceExpr) {
                            // Listeners that reference() a local ref need the save/restore view operation.
                            needsRestoreView = true;
                        }
                    });
                }
            }
            if (needsRestoreView) {
                addSaveRestoreViewOperationToListener(unit, op);
            }
        }
    }
}
function addSaveRestoreViewOperationToListener(unit, op) {
    op.handlerOps.prepend([
        ir.createVariableOp(unit.job.allocateXrefId(), {
            kind: ir.SemanticVariableKind.Context,
            name: null,
            view: unit.xref,
        }, new ir.RestoreViewExpr(unit.xref), ir.VariableFlags.None),
    ]);
    // The "restore view" operation in listeners requires a call to `resetView` to reset the
    // context prior to returning from the listener operation. Find any `return` statements in
    // the listener body and wrap them in a call to reset the view.
    for (const handlerOp of op.handlerOps) {
        if (handlerOp.kind === ir.OpKind.Statement &&
            handlerOp.statement instanceof o.ReturnStatement) {
            handlerOp.statement.value = new ir.ResetViewExpr(handlerOp.statement.value);
        }
    }
}
