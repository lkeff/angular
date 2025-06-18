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
exports.parse = parse;
exports.hyphenate = hyphenate;
exports.parseExtractedStyles = parseExtractedStyles;
const core_1 = require("../../../../core");
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
/**
 * Parses string representation of a style and converts it into object literal.
 *
 * @param value string representation of style as used in the `style` attribute in HTML.
 *   Example: `color: red; height: auto`.
 * @returns An array of style property name and value pairs, e.g. `['color', 'red', 'height',
 * 'auto']`
 */
function parse(value) {
    // we use a string array here instead of a string map
    // because a string-map is not guaranteed to retain the
    // order of the entries whereas a string array can be
    // constructed in a [key, value, key, value] format.
    const styles = [];
    let i = 0;
    let parenDepth = 0;
    let quote = 0 /* Char.QuoteNone */;
    let valueStart = 0;
    let propStart = 0;
    let currentProp = null;
    while (i < value.length) {
        const token = value.charCodeAt(i++);
        switch (token) {
            case 40 /* Char.OpenParen */:
                parenDepth++;
                break;
            case 41 /* Char.CloseParen */:
                parenDepth--;
                break;
            case 39 /* Char.QuoteSingle */:
                // valueStart needs to be there since prop values don't
                // have quotes in CSS
                if (quote === 0 /* Char.QuoteNone */) {
                    quote = 39 /* Char.QuoteSingle */;
                }
                else if (quote === 39 /* Char.QuoteSingle */ && value.charCodeAt(i - 1) !== 92 /* Char.BackSlash */) {
                    quote = 0 /* Char.QuoteNone */;
                }
                break;
            case 34 /* Char.QuoteDouble */:
                // same logic as above
                if (quote === 0 /* Char.QuoteNone */) {
                    quote = 34 /* Char.QuoteDouble */;
                }
                else if (quote === 34 /* Char.QuoteDouble */ && value.charCodeAt(i - 1) !== 92 /* Char.BackSlash */) {
                    quote = 0 /* Char.QuoteNone */;
                }
                break;
            case 58 /* Char.Colon */:
                if (!currentProp && parenDepth === 0 && quote === 0 /* Char.QuoteNone */) {
                    // TODO: Do not hyphenate CSS custom property names like: `--intentionallyCamelCase`
                    currentProp = hyphenate(value.substring(propStart, i - 1).trim());
                    valueStart = i;
                }
                break;
            case 59 /* Char.Semicolon */:
                if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0 /* Char.QuoteNone */) {
                    const styleVal = value.substring(valueStart, i - 1).trim();
                    styles.push(currentProp, styleVal);
                    propStart = i;
                    valueStart = 0;
                    currentProp = null;
                }
                break;
        }
    }
    if (currentProp && valueStart) {
        const styleVal = value.slice(valueStart).trim();
        styles.push(currentProp, styleVal);
    }
    return styles;
}
function hyphenate(value) {
    return value
        .replace(/[a-z][A-Z]/g, (v) => {
        return v.charAt(0) + '-' + v.charAt(1);
    })
        .toLowerCase();
}
/**
 * Parses extracted style and class attributes into separate ExtractedAttributeOps per style or
 * class property.
 */
function parseExtractedStyles(job) {
    const elements = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (ir.isElementOrContainerOp(op)) {
                elements.set(op.xref, op);
            }
        }
    }
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.ExtractedAttribute &&
                op.bindingKind === ir.BindingKind.Attribute &&
                ir.isStringLiteral(op.expression)) {
                const target = elements.get(op.target);
                if (target !== undefined &&
                    (target.kind === ir.OpKind.Template ||
                        target.kind === ir.OpKind.ConditionalCreate ||
                        target.kind === ir.OpKind.ConditionalBranchCreate) &&
                    target.templateKind === ir.TemplateKind.Structural) {
                    // TemplateDefinitionBuilder will not apply class and style bindings to structural
                    // directives; instead, it will leave them as attributes.
                    // (It's not clear what that would mean, anyway -- classes and styles on a structural
                    // element should probably be a parse error.)
                    // TODO: We may be able to remove this once Template Pipeline is the default.
                    continue;
                }
                if (op.name === 'style') {
                    const parsedStyles = parse(op.expression.value);
                    for (let i = 0; i < parsedStyles.length - 1; i += 2) {
                        ir.OpList.insertBefore(ir.createExtractedAttributeOp(op.target, ir.BindingKind.StyleProperty, null, parsedStyles[i], o.literal(parsedStyles[i + 1]), null, null, core_1.SecurityContext.STYLE), op);
                    }
                    ir.OpList.remove(op);
                }
                else if (op.name === 'class') {
                    const parsedClasses = op.expression.value.trim().split(/\s+/g);
                    for (const parsedClass of parsedClasses) {
                        ir.OpList.insertBefore(ir.createExtractedAttributeOp(op.target, ir.BindingKind.ClassName, null, parsedClass, null, null, null, core_1.SecurityContext.NONE), op);
                    }
                    ir.OpList.remove(op);
                }
            }
        }
    }
}
