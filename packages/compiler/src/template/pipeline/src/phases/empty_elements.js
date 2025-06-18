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
exports.collapseEmptyInstructions = collapseEmptyInstructions;
const ir = __importStar(require("../../ir"));
const REPLACEMENTS = new Map([
    [ir.OpKind.ElementEnd, [ir.OpKind.ElementStart, ir.OpKind.Element]],
    [ir.OpKind.ContainerEnd, [ir.OpKind.ContainerStart, ir.OpKind.Container]],
    [ir.OpKind.I18nEnd, [ir.OpKind.I18nStart, ir.OpKind.I18n]],
]);
/**
 * Op kinds that should not prevent merging of start/end ops.
 */
const IGNORED_OP_KINDS = new Set([ir.OpKind.Pipe]);
/**
 * Replace sequences of mergable instructions (e.g. `ElementStart` and `ElementEnd`) with a
 * consolidated instruction (e.g. `Element`).
 */
function collapseEmptyInstructions(job) {
    for (const unit of job.units) {
        for (const op of unit.create) {
            // Find end ops that may be able to be merged.
            const opReplacements = REPLACEMENTS.get(op.kind);
            if (opReplacements === undefined) {
                continue;
            }
            const [startKind, mergedKind] = opReplacements;
            // Locate the previous (non-ignored) op.
            let prevOp = op.prev;
            while (prevOp !== null && IGNORED_OP_KINDS.has(prevOp.kind)) {
                prevOp = prevOp.prev;
            }
            // If the previous op is the corresponding start op, we can megre.
            if (prevOp !== null && prevOp.kind === startKind) {
                // Transmute the start instruction to the merged version. This is safe as they're designed
                // to be identical apart from the `kind`.
                prevOp.kind = mergedKind;
                // Remove the end instruction.
                ir.OpList.remove(op);
            }
        }
    }
}
