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
exports.resolveI18nExpressionPlaceholders = resolveI18nExpressionPlaceholders;
const ir = __importStar(require("../../ir"));
/**
 * Resolve the i18n expression placeholders in i18n messages.
 */
function resolveI18nExpressionPlaceholders(job) {
    var _a;
    // Record all of the i18n context ops, and the sub-template index for each i18n op.
    const subTemplateIndices = new Map();
    const i18nContexts = new Map();
    const icuPlaceholders = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            switch (op.kind) {
                case ir.OpKind.I18nStart:
                    subTemplateIndices.set(op.xref, op.subTemplateIndex);
                    break;
                case ir.OpKind.I18nContext:
                    i18nContexts.set(op.xref, op);
                    break;
                case ir.OpKind.IcuPlaceholder:
                    icuPlaceholders.set(op.xref, op);
                    break;
            }
        }
    }
    // Keep track of the next available expression index for each i18n message.
    const expressionIndices = new Map();
    // Keep track of a reference index for each expression.
    // We use different references for normal i18n expressio and attribute i18n expressions. This is
    // because child i18n blocks in templates don't get their own context, since they're rolled into
    // the translated message of the parent, but they may target a different slot.
    const referenceIndex = (op) => op.usage === ir.I18nExpressionFor.I18nText ? op.i18nOwner : op.context;
    for (const unit of job.units) {
        for (const op of unit.update) {
            if (op.kind === ir.OpKind.I18nExpression) {
                const index = expressionIndices.get(referenceIndex(op)) || 0;
                const subTemplateIndex = (_a = subTemplateIndices.get(op.i18nOwner)) !== null && _a !== void 0 ? _a : null;
                const value = {
                    value: index,
                    subTemplateIndex: subTemplateIndex,
                    flags: ir.I18nParamValueFlags.ExpressionIndex,
                };
                updatePlaceholder(op, value, i18nContexts, icuPlaceholders);
                expressionIndices.set(referenceIndex(op), index + 1);
            }
        }
    }
}
function updatePlaceholder(op, value, i18nContexts, icuPlaceholders) {
    if (op.i18nPlaceholder !== null) {
        const i18nContext = i18nContexts.get(op.context);
        const params = op.resolutionTime === ir.I18nParamResolutionTime.Creation
            ? i18nContext.params
            : i18nContext.postprocessingParams;
        const values = params.get(op.i18nPlaceholder) || [];
        values.push(value);
        params.set(op.i18nPlaceholder, values);
    }
    if (op.icuPlaceholder !== null) {
        const icuPlaceholderOp = icuPlaceholders.get(op.icuPlaceholder);
        icuPlaceholderOp === null || icuPlaceholderOp === void 0 ? void 0 : icuPlaceholderOp.expressionPlaceholders.push(value);
    }
}
