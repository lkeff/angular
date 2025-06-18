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
exports.specializeBindings = specializeBindings;
const tags_1 = require("../../../../ml_parser/tags");
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
const compilation_1 = require("../compilation");
/**
 * Looks up an element in the given map by xref ID.
 */
function lookupElement(elements, xref) {
    const el = elements.get(xref);
    if (el === undefined) {
        throw new Error('All attributes should have an element-like target.');
    }
    return el;
}
function specializeBindings(job) {
    const elements = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (!ir.isElementOrContainerOp(op)) {
                continue;
            }
            elements.set(op.xref, op);
        }
    }
    for (const unit of job.units) {
        for (const op of unit.ops()) {
            if (op.kind !== ir.OpKind.Binding) {
                continue;
            }
            switch (op.bindingKind) {
                case ir.BindingKind.Attribute:
                    if (op.name === 'ngNonBindable') {
                        ir.OpList.remove(op);
                        const target = lookupElement(elements, op.target);
                        target.nonBindable = true;
                    }
                    else {
                        const [namespace, name] = (0, tags_1.splitNsName)(op.name);
                        ir.OpList.replace(op, ir.createAttributeOp(op.target, namespace, name, op.expression, op.securityContext, op.isTextAttribute, op.isStructuralTemplateAttribute, op.templateKind, op.i18nMessage, op.sourceSpan));
                    }
                    break;
                case ir.BindingKind.Property:
                case ir.BindingKind.Animation:
                    if (job.kind === compilation_1.CompilationJobKind.Host) {
                        ir.OpList.replace(op, ir.createDomPropertyOp(op.name, op.expression, op.bindingKind === ir.BindingKind.Animation, op.i18nContext, op.securityContext, op.sourceSpan));
                    }
                    else {
                        ir.OpList.replace(op, ir.createPropertyOp(op.target, op.name, op.expression, op.bindingKind === ir.BindingKind.Animation, op.securityContext, op.isStructuralTemplateAttribute, op.templateKind, op.i18nContext, op.i18nMessage, op.sourceSpan));
                    }
                    break;
                case ir.BindingKind.TwoWayProperty:
                    if (!(op.expression instanceof o.Expression)) {
                        // We shouldn't be able to hit this code path since interpolations in two-way bindings
                        // result in a parser error. We assert here so that downstream we can assume that
                        // the value is always an expression.
                        throw new Error(`Expected value of two-way property binding "${op.name}" to be an expression`);
                    }
                    ir.OpList.replace(op, ir.createTwoWayPropertyOp(op.target, op.name, op.expression, op.securityContext, op.isStructuralTemplateAttribute, op.templateKind, op.i18nContext, op.i18nMessage, op.sourceSpan));
                    break;
                case ir.BindingKind.I18n:
                case ir.BindingKind.ClassName:
                case ir.BindingKind.StyleProperty:
                    throw new Error(`Unhandled binding of kind ${ir.BindingKind[op.bindingKind]}`);
            }
        }
    }
}
