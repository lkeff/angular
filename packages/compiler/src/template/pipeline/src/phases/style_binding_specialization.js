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
exports.specializeStyleBindings = specializeStyleBindings;
const ir = __importStar(require("../../ir"));
/**
 * Transforms special-case bindings with 'style' or 'class' in their names. Must run before the
 * main binding specialization pass.
 */
function specializeStyleBindings(job) {
    for (const unit of job.units) {
        for (const op of unit.update) {
            if (op.kind !== ir.OpKind.Binding) {
                continue;
            }
            switch (op.bindingKind) {
                case ir.BindingKind.ClassName:
                    if (op.expression instanceof ir.Interpolation) {
                        throw new Error(`Unexpected interpolation in ClassName binding`);
                    }
                    ir.OpList.replace(op, ir.createClassPropOp(op.target, op.name, op.expression, op.sourceSpan));
                    break;
                case ir.BindingKind.StyleProperty:
                    ir.OpList.replace(op, ir.createStylePropOp(op.target, op.name, op.expression, op.unit, op.sourceSpan));
                    break;
                case ir.BindingKind.Property:
                case ir.BindingKind.Template:
                    if (op.name === 'style') {
                        ir.OpList.replace(op, ir.createStyleMapOp(op.target, op.expression, op.sourceSpan));
                    }
                    else if (op.name === 'class') {
                        ir.OpList.replace(op, ir.createClassMapOp(op.target, op.expression, op.sourceSpan));
                    }
                    break;
            }
        }
    }
}
