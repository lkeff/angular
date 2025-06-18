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
exports.applyI18nExpressions = applyI18nExpressions;
const ir = __importStar(require("../../ir"));
/**
 * Adds apply operations after i18n expressions.
 */
function applyI18nExpressions(job) {
    const i18nContexts = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.I18nContext) {
                i18nContexts.set(op.xref, op);
            }
        }
    }
    for (const unit of job.units) {
        for (const op of unit.update) {
            // Only add apply after expressions that are not followed by more expressions.
            if (op.kind === ir.OpKind.I18nExpression && needsApplication(i18nContexts, op)) {
                // TODO: what should be the source span for the apply op?
                ir.OpList.insertAfter(ir.createI18nApplyOp(op.i18nOwner, op.handle, null), op);
            }
        }
    }
}
/**
 * Checks whether the given expression op needs to be followed with an apply op.
 */
function needsApplication(i18nContexts, op) {
    var _a;
    // If the next op is not another expression, we need to apply.
    if (((_a = op.next) === null || _a === void 0 ? void 0 : _a.kind) !== ir.OpKind.I18nExpression) {
        return true;
    }
    const context = i18nContexts.get(op.context);
    const nextContext = i18nContexts.get(op.next.context);
    if (context === undefined) {
        throw new Error("AssertionError: expected an I18nContextOp to exist for the I18nExpressionOp's context");
    }
    if (nextContext === undefined) {
        throw new Error("AssertionError: expected an I18nContextOp to exist for the next I18nExpressionOp's context");
    }
    // If the next op is an expression targeting a different i18n block (or different element, in the
    // case of i18n attributes), we need to apply.
    // First, handle the case of i18n blocks.
    if (context.i18nBlock !== null) {
        // This is a block context. Compare the blocks.
        if (context.i18nBlock !== nextContext.i18nBlock) {
            return true;
        }
        return false;
    }
    // Second, handle the case of i18n attributes.
    if (op.i18nOwner !== op.next.i18nOwner) {
        return true;
    }
    return false;
}
