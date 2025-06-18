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
exports.resolveNames = resolveNames;
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * Resolves lexical references in views (`ir.LexicalReadExpr`) to either a target variable or to
 * property reads on the top-level component context.
 *
 * Also matches `ir.RestoreViewExpr` expressions with the variables of their corresponding saved
 * views.
 */
function resolveNames(job) {
    for (const unit of job.units) {
        processLexicalScope(unit, unit.create, null);
        processLexicalScope(unit, unit.update, null);
    }
}
function processLexicalScope(unit, ops, savedView) {
    // Maps names defined in the lexical scope of this template to the `ir.XrefId`s of the variable
    // declarations which represent those values.
    //
    // Since variables are generated in each view for the entire lexical scope (including any
    // identifiers from parent templates) only local variables need be considered here.
    const scope = new Map();
    // Symbols defined within the current scope. They take precedence over ones defined outside.
    const localDefinitions = new Map();
    // First, step through the operations list and:
    // 1) build up the `scope` mapping
    // 2) recurse into any listener functions
    for (const op of ops) {
        switch (op.kind) {
            case ir.OpKind.Variable:
                switch (op.variable.kind) {
                    case ir.SemanticVariableKind.Identifier:
                        if (op.variable.local) {
                            if (localDefinitions.has(op.variable.identifier)) {
                                continue;
                            }
                            localDefinitions.set(op.variable.identifier, op.xref);
                        }
                        else if (scope.has(op.variable.identifier)) {
                            continue;
                        }
                        scope.set(op.variable.identifier, op.xref);
                        break;
                    case ir.SemanticVariableKind.Alias:
                        // This variable represents some kind of identifier which can be used in the template.
                        if (scope.has(op.variable.identifier)) {
                            continue;
                        }
                        scope.set(op.variable.identifier, op.xref);
                        break;
                    case ir.SemanticVariableKind.SavedView:
                        // This variable represents a snapshot of the current view context, and can be used to
                        // restore that context within listener functions.
                        savedView = {
                            view: op.variable.view,
                            variable: op.xref,
                        };
                        break;
                }
                break;
            case ir.OpKind.Listener:
            case ir.OpKind.TwoWayListener:
                // Listener functions have separate variable declarations, so process them as a separate
                // lexical scope.
                processLexicalScope(unit, op.handlerOps, savedView);
                break;
            case ir.OpKind.RepeaterCreate:
                if (op.trackByOps !== null) {
                    processLexicalScope(unit, op.trackByOps, savedView);
                }
                break;
        }
    }
    // Next, use the `scope` mapping to match `ir.LexicalReadExpr` with defined names in the lexical
    // scope. Also, look for `ir.RestoreViewExpr`s and match them with the snapshotted view context
    // variable.
    for (const op of ops) {
        if (op.kind == ir.OpKind.Listener || op.kind === ir.OpKind.TwoWayListener) {
            // Listeners were already processed above with their own scopes.
            continue;
        }
        ir.transformExpressionsInOp(op, (expr) => {
            if (expr instanceof ir.LexicalReadExpr) {
                // `expr` is a read of a name within the lexical scope of this view.
                // Either that name is defined within the current view, or it represents a property from the
                // main component context.
                if (localDefinitions.has(expr.name)) {
                    return new ir.ReadVariableExpr(localDefinitions.get(expr.name));
                }
                else if (scope.has(expr.name)) {
                    // This was a defined variable in the current scope.
                    return new ir.ReadVariableExpr(scope.get(expr.name));
                }
                else {
                    // Reading from the component context.
                    return new o.ReadPropExpr(new ir.ContextExpr(unit.job.root.xref), expr.name);
                }
            }
            else if (expr instanceof ir.RestoreViewExpr && typeof expr.view === 'number') {
                // `ir.RestoreViewExpr` happens in listener functions and restores a saved view from the
                // parent creation list. We expect to find that we captured the `savedView` previously, and
                // that it matches the expected view to be restored.
                if (savedView === null || savedView.view !== expr.view) {
                    throw new Error(`AssertionError: no saved view ${expr.view} from view ${unit.xref}`);
                }
                expr.view = new ir.ReadVariableExpr(savedView.variable);
                return expr;
            }
            else {
                return expr;
            }
        }, ir.VisitorContextFlag.None);
    }
    for (const op of ops) {
        ir.visitExpressionsInOp(op, (expr) => {
            if (expr instanceof ir.LexicalReadExpr) {
                throw new Error(`AssertionError: no lexical reads should remain, but found read of ${expr.name}`);
            }
        });
    }
}
