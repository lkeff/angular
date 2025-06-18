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
exports.generateAdvance = generateAdvance;
const ir = __importStar(require("../../ir"));
/**
 * Generate `ir.AdvanceOp`s in between `ir.UpdateOp`s that ensure the runtime's implicit slot
 * context will be advanced correctly.
 */
function generateAdvance(job) {
    for (const unit of job.units) {
        // First build a map of all of the declarations in the view that have assigned slots.
        const slotMap = new Map();
        for (const op of unit.create) {
            if (!ir.hasConsumesSlotTrait(op)) {
                continue;
            }
            else if (op.handle.slot === null) {
                throw new Error(`AssertionError: expected slots to have been allocated before generating advance() calls`);
            }
            slotMap.set(op.xref, op.handle.slot);
        }
        // Next, step through the update operations and generate `ir.AdvanceOp`s as required to ensure
        // the runtime's implicit slot counter will be set to the correct slot before executing each
        // update operation which depends on it.
        //
        // To do that, we track what the runtime's slot counter will be through the update operations.
        let slotContext = 0;
        for (const op of unit.update) {
            let consumer = null;
            if (ir.hasDependsOnSlotContextTrait(op)) {
                consumer = op;
            }
            else {
                ir.visitExpressionsInOp(op, (expr) => {
                    if (consumer === null && ir.hasDependsOnSlotContextTrait(expr)) {
                        consumer = expr;
                    }
                });
            }
            if (consumer === null) {
                continue;
            }
            if (!slotMap.has(consumer.target)) {
                // We expect ops that _do_ depend on the slot counter to point at declarations that exist in
                // the `slotMap`.
                throw new Error(`AssertionError: reference to unknown slot for target ${consumer.target}`);
            }
            const slot = slotMap.get(consumer.target);
            // Does the slot counter need to be adjusted?
            if (slotContext !== slot) {
                // If so, generate an `ir.AdvanceOp` to advance the counter.
                const delta = slot - slotContext;
                if (delta < 0) {
                    throw new Error(`AssertionError: slot counter should never need to move backwards`);
                }
                ir.OpList.insertBefore(ir.createAdvanceOp(delta, consumer.sourceSpan), op);
                slotContext = slot;
            }
        }
    }
}
