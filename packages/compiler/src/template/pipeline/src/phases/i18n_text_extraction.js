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
exports.convertI18nText = convertI18nText;
const ir = __importStar(require("../../ir"));
/**
 * Removes text nodes within i18n blocks since they are already hardcoded into the i18n message.
 * Also, replaces interpolations on these text nodes with i18n expressions of the non-text portions,
 * which will be applied later.
 */
function convertI18nText(job) {
    var _a, _b, _c;
    for (const unit of job.units) {
        // Remove all text nodes within i18n blocks, their content is already captured in the i18n
        // message.
        let currentI18n = null;
        let currentIcu = null;
        const textNodeI18nBlocks = new Map();
        const textNodeIcus = new Map();
        const icuPlaceholderByText = new Map();
        for (const op of unit.create) {
            switch (op.kind) {
                case ir.OpKind.I18nStart:
                    if (op.context === null) {
                        throw Error('I18n op should have its context set.');
                    }
                    currentI18n = op;
                    break;
                case ir.OpKind.I18nEnd:
                    currentI18n = null;
                    break;
                case ir.OpKind.IcuStart:
                    if (op.context === null) {
                        throw Error('Icu op should have its context set.');
                    }
                    currentIcu = op;
                    break;
                case ir.OpKind.IcuEnd:
                    currentIcu = null;
                    break;
                case ir.OpKind.Text:
                    if (currentI18n !== null) {
                        textNodeI18nBlocks.set(op.xref, currentI18n);
                        textNodeIcus.set(op.xref, currentIcu);
                        if (op.icuPlaceholder !== null) {
                            // Create an op to represent the ICU placeholder. Initially set its static text to the
                            // value of the text op, though this may be overwritten later if this text op is a
                            // placeholder for an interpolation.
                            const icuPlaceholderOp = ir.createIcuPlaceholderOp(job.allocateXrefId(), op.icuPlaceholder, [op.initialValue]);
                            ir.OpList.replace(op, icuPlaceholderOp);
                            icuPlaceholderByText.set(op.xref, icuPlaceholderOp);
                        }
                        else {
                            // Otherwise just remove the text op, since its value is already accounted for in the
                            // translated message.
                            ir.OpList.remove(op);
                        }
                    }
                    break;
            }
        }
        // Update any interpolations to the removed text, and instead represent them as a series of i18n
        // expressions that we then apply.
        for (const op of unit.update) {
            switch (op.kind) {
                case ir.OpKind.InterpolateText:
                    if (!textNodeI18nBlocks.has(op.target)) {
                        continue;
                    }
                    const i18nOp = textNodeI18nBlocks.get(op.target);
                    const icuOp = textNodeIcus.get(op.target);
                    const icuPlaceholder = icuPlaceholderByText.get(op.target);
                    const contextId = icuOp ? icuOp.context : i18nOp.context;
                    const resolutionTime = icuOp
                        ? ir.I18nParamResolutionTime.Postproccessing
                        : ir.I18nParamResolutionTime.Creation;
                    const ops = [];
                    for (let i = 0; i < op.interpolation.expressions.length; i++) {
                        const expr = op.interpolation.expressions[i];
                        // For now, this i18nExpression depends on the slot context of the enclosing i18n block.
                        // Later, we will modify this, and advance to a different point.
                        ops.push(ir.createI18nExpressionOp(contextId, i18nOp.xref, i18nOp.xref, i18nOp.handle, expr, (_a = icuPlaceholder === null || icuPlaceholder === void 0 ? void 0 : icuPlaceholder.xref) !== null && _a !== void 0 ? _a : null, (_b = op.interpolation.i18nPlaceholders[i]) !== null && _b !== void 0 ? _b : null, resolutionTime, ir.I18nExpressionFor.I18nText, '', (_c = expr.sourceSpan) !== null && _c !== void 0 ? _c : op.sourceSpan));
                    }
                    ir.OpList.replaceWithMany(op, ops);
                    // If this interpolation is part of an ICU placeholder, add the strings and expressions to
                    // the placeholder.
                    if (icuPlaceholder !== undefined) {
                        icuPlaceholder.strings = op.interpolation.strings;
                    }
                    break;
            }
        }
    }
}
