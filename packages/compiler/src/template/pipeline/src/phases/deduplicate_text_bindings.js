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
exports.deduplicateTextBindings = deduplicateTextBindings;
const ir = __importStar(require("../../ir"));
/**
 * Deduplicate text bindings, e.g. <div class="cls1" class="cls2">
 */
function deduplicateTextBindings(job) {
    const seen = new Map();
    for (const unit of job.units) {
        for (const op of unit.update.reversed()) {
            if (op.kind === ir.OpKind.Binding && op.isTextAttribute) {
                const seenForElement = seen.get(op.target) || new Set();
                if (seenForElement.has(op.name)) {
                    if (job.compatibility === ir.CompatibilityMode.TemplateDefinitionBuilder) {
                        // For most duplicated attributes, TemplateDefinitionBuilder lists all of the values in
                        // the consts array. However, for style and class attributes it only keeps the last one.
                        // We replicate that behavior here since it has actual consequences for apps with
                        // duplicate class or style attrs.
                        if (op.name === 'style' || op.name === 'class') {
                            ir.OpList.remove(op);
                        }
                    }
                    else {
                        // TODO: Determine the correct behavior. It would probably make sense to merge multiple
                        // style and class attributes. Alternatively we could just throw an error, as HTML
                        // doesn't permit duplicate attributes.
                    }
                }
                seenForElement.add(op.name);
                seen.set(op.target, seenForElement);
            }
        }
    }
}
