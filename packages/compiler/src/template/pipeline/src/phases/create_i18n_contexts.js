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
exports.createI18nContexts = createI18nContexts;
const ir = __importStar(require("../../ir"));
/**
 * Create one helper context op per i18n block (including generate descending blocks).
 *
 * Also, if an ICU exists inside an i18n block that also contains other localizable content (such as
 * string), create an additional helper context op for the ICU.
 *
 * These context ops are later used for generating i18n messages. (Although we generate at least one
 * context op per nested view, we will collect them up the tree later, to generate a top-level
 * message.)
 */
function createI18nContexts(job) {
    // Create i18n context ops for i18n attrs.
    const attrContextByMessage = new Map();
    for (const unit of job.units) {
        for (const op of unit.ops()) {
            switch (op.kind) {
                case ir.OpKind.Binding:
                case ir.OpKind.Property:
                case ir.OpKind.Attribute:
                case ir.OpKind.ExtractedAttribute:
                    if (op.i18nMessage === null) {
                        continue;
                    }
                    if (!attrContextByMessage.has(op.i18nMessage)) {
                        const i18nContext = ir.createI18nContextOp(ir.I18nContextKind.Attr, job.allocateXrefId(), null, op.i18nMessage, null);
                        unit.create.push(i18nContext);
                        attrContextByMessage.set(op.i18nMessage, i18nContext.xref);
                    }
                    op.i18nContext = attrContextByMessage.get(op.i18nMessage);
                    break;
            }
        }
    }
    // Create i18n context ops for root i18n blocks.
    const blockContextByI18nBlock = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            switch (op.kind) {
                case ir.OpKind.I18nStart:
                    if (op.xref === op.root) {
                        const contextOp = ir.createI18nContextOp(ir.I18nContextKind.RootI18n, job.allocateXrefId(), op.xref, op.message, null);
                        unit.create.push(contextOp);
                        op.context = contextOp.xref;
                        blockContextByI18nBlock.set(op.xref, contextOp);
                    }
                    break;
            }
        }
    }
    // Assign i18n contexts for child i18n blocks. These don't need their own conext, instead they
    // should inherit from their root i18n block.
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.I18nStart && op.xref !== op.root) {
                const rootContext = blockContextByI18nBlock.get(op.root);
                if (rootContext === undefined) {
                    throw Error('AssertionError: Root i18n block i18n context should have been created.');
                }
                op.context = rootContext.xref;
                blockContextByI18nBlock.set(op.xref, rootContext);
            }
        }
    }
    // Create or assign i18n contexts for ICUs.
    let currentI18nOp = null;
    for (const unit of job.units) {
        for (const op of unit.create) {
            switch (op.kind) {
                case ir.OpKind.I18nStart:
                    currentI18nOp = op;
                    break;
                case ir.OpKind.I18nEnd:
                    currentI18nOp = null;
                    break;
                case ir.OpKind.IcuStart:
                    if (currentI18nOp === null) {
                        throw Error('AssertionError: Unexpected ICU outside of an i18n block.');
                    }
                    if (op.message.id !== currentI18nOp.message.id) {
                        // This ICU is a sub-message inside its parent i18n block message. We need to give it
                        // its own context.
                        const contextOp = ir.createI18nContextOp(ir.I18nContextKind.Icu, job.allocateXrefId(), currentI18nOp.root, op.message, null);
                        unit.create.push(contextOp);
                        op.context = contextOp.xref;
                    }
                    else {
                        // This ICU is the only translatable content in its parent i18n block. We need to
                        // convert the parent's context into an ICU context.
                        op.context = currentI18nOp.context;
                        blockContextByI18nBlock.get(currentI18nOp.xref).contextKind = ir.I18nContextKind.Icu;
                    }
                    break;
            }
        }
    }
}
