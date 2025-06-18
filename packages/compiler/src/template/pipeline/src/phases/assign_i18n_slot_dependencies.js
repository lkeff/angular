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
exports.assignI18nSlotDependencies = assignI18nSlotDependencies;
const ir = __importStar(require("../../ir"));
/**
 * Updates i18n expression ops to target the last slot in their owning i18n block, and moves them
 * after the last update instruction that depends on that slot.
 */
function assignI18nSlotDependencies(job) {
    for (const unit of job.units) {
        // The first update op.
        let updateOp = unit.update.head;
        // I18n expressions currently being moved during the iteration.
        let i18nExpressionsInProgress = [];
        // Non-null  while we are iterating through an i18nStart/i18nEnd pair
        let state = null;
        for (const createOp of unit.create) {
            if (createOp.kind === ir.OpKind.I18nStart) {
                state = {
                    blockXref: createOp.xref,
                    lastSlotConsumer: createOp.xref,
                };
            }
            else if (createOp.kind === ir.OpKind.I18nEnd) {
                for (const op of i18nExpressionsInProgress) {
                    op.target = state.lastSlotConsumer;
                    ir.OpList.insertBefore(op, updateOp);
                }
                i18nExpressionsInProgress.length = 0;
                state = null;
            }
            if (ir.hasConsumesSlotTrait(createOp)) {
                if (state !== null) {
                    state.lastSlotConsumer = createOp.xref;
                }
                while (true) {
                    if (updateOp.next === null) {
                        break;
                    }
                    if (state !== null &&
                        updateOp.kind === ir.OpKind.I18nExpression &&
                        updateOp.usage === ir.I18nExpressionFor.I18nText &&
                        updateOp.i18nOwner === state.blockXref) {
                        const opToRemove = updateOp;
                        updateOp = updateOp.next;
                        ir.OpList.remove(opToRemove);
                        i18nExpressionsInProgress.push(opToRemove);
                        continue;
                    }
                    if (ir.hasDependsOnSlotContextTrait(updateOp) && updateOp.target !== createOp.xref) {
                        break;
                    }
                    updateOp = updateOp.next;
                }
            }
        }
    }
}
