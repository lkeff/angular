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
exports.WhitespaceVisitor = exports.PRESERVE_WS_ATTR_NAME = void 0;
exports.replaceNgsp = replaceNgsp;
exports.removeWhitespaces = removeWhitespaces;
exports.visitAllWithSiblings = visitAllWithSiblings;
const html = __importStar(require("./ast"));
const entities_1 = require("./entities");
const parser_1 = require("./parser");
exports.PRESERVE_WS_ATTR_NAME = 'ngPreserveWhitespaces';
const SKIP_WS_TRIM_TAGS = new Set(['pre', 'template', 'textarea', 'script', 'style']);
// Equivalent to \s with \u00a0 (non-breaking space) excluded.
// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const WS_CHARS = ' \f\n\r\t\v\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';
const NO_WS_REGEXP = new RegExp(`[^${WS_CHARS}]`);
const WS_REPLACE_REGEXP = new RegExp(`[${WS_CHARS}]{2,}`, 'g');
function hasPreserveWhitespacesAttr(attrs) {
    return attrs.some((attr) => attr.name === exports.PRESERVE_WS_ATTR_NAME);
}
/**
 * &ngsp; is a placeholder for non-removable space
 * &ngsp; is converted to the 0xE500 PUA (Private Use Areas) unicode character
 * and later on replaced by a space.
 */
function replaceNgsp(value) {
    // lexer is replacing the &ngsp; pseudo-entity with NGSP_UNICODE
    return value.replace(new RegExp(entities_1.NGSP_UNICODE, 'g'), ' ');
}
/**
 * This visitor can walk HTML parse tree and remove / trim text nodes using the following rules:
 * - consider spaces, tabs and new lines as whitespace characters;
 * - drop text nodes consisting of whitespace characters only;
 * - for all other text nodes replace consecutive whitespace characters with one space;
 * - convert &ngsp; pseudo-entity to a single space;
 *
 * Removal and trimming of whitespaces have positive performance impact (less code to generate
 * while compiling templates, faster view creation). At the same time it can be "destructive"
 * in some cases (whitespaces can influence layout). Because of the potential of breaking layout
 * this visitor is not activated by default in Angular 5 and people need to explicitly opt-in for
 * whitespace removal. The default option for whitespace removal will be revisited in Angular 6
 * and might be changed to "on" by default.
 *
 * If `originalNodeMap` is provided, the transformed nodes will be mapped back to their original
 * inputs. Any output nodes not in the map were not transformed. This supports correlating and
 * porting information between the trimmed nodes and original nodes (such as `i18n` properties)
 * such that trimming whitespace does not does not drop required information from the node.
 */
class WhitespaceVisitor {
    constructor(preserveSignificantWhitespace, originalNodeMap, requireContext = true) {
        this.preserveSignificantWhitespace = preserveSignificantWhitespace;
        this.originalNodeMap = originalNodeMap;
        this.requireContext = requireContext;
        // How many ICU expansions which are currently being visited. ICUs can be nested, so this
        // tracks the current depth of nesting. If this depth is greater than 0, then this visitor is
        // currently processing content inside an ICU expansion.
        this.icuExpansionDepth = 0;
    }
    visitElement(element, context) {
        var _a, _b;
        if (SKIP_WS_TRIM_TAGS.has(element.name) || hasPreserveWhitespacesAttr(element.attrs)) {
            // don't descent into elements where we need to preserve whitespaces
            // but still visit all attributes to eliminate one used as a market to preserve WS
            const newElement = new html.Element(element.name, visitAllWithSiblings(this, element.attrs), visitAllWithSiblings(this, element.directives), element.children, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
            (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(newElement, element);
            return newElement;
        }
        const newElement = new html.Element(element.name, element.attrs, element.directives, visitAllWithSiblings(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
        (_b = this.originalNodeMap) === null || _b === void 0 ? void 0 : _b.set(newElement, element);
        return newElement;
    }
    visitAttribute(attribute, context) {
        return attribute.name !== exports.PRESERVE_WS_ATTR_NAME ? attribute : null;
    }
    visitText(text, context) {
        var _a;
        const isNotBlank = text.value.match(NO_WS_REGEXP);
        const hasExpansionSibling = context && (context.prev instanceof html.Expansion || context.next instanceof html.Expansion);
        // Do not trim whitespace within ICU expansions when preserving significant whitespace.
        // Historically, ICU whitespace was never trimmed and this is really a bug. However fixing it
        // would change message IDs which we can't easily do. Instead we only trim ICU whitespace within
        // ICU expansions when not preserving significant whitespace, which is the new behavior where it
        // most matters.
        const inIcuExpansion = this.icuExpansionDepth > 0;
        if (inIcuExpansion && this.preserveSignificantWhitespace)
            return text;
        if (isNotBlank || hasExpansionSibling) {
            // Process the whitespace in the tokens of this Text node
            const tokens = text.tokens.map((token) => token.type === 5 /* TokenType.TEXT */ ? createWhitespaceProcessedTextToken(token) : token);
            // Fully trim message when significant whitespace is not preserved.
            if (!this.preserveSignificantWhitespace && tokens.length > 0) {
                // The first token should only call `.trimStart()` and the last token
                // should only call `.trimEnd()`, but there might be only one token which
                // needs to call both.
                const firstToken = tokens[0];
                tokens.splice(0, 1, trimLeadingWhitespace(firstToken, context));
                const lastToken = tokens[tokens.length - 1]; // Could be the same as the first token.
                tokens.splice(tokens.length - 1, 1, trimTrailingWhitespace(lastToken, context));
            }
            // Process the whitespace of the value of this Text node. Also trim the leading/trailing
            // whitespace when we don't need to preserve significant whitespace.
            const processed = processWhitespace(text.value);
            const value = this.preserveSignificantWhitespace
                ? processed
                : trimLeadingAndTrailingWhitespace(processed, context);
            const result = new html.Text(value, text.sourceSpan, tokens, text.i18n);
            (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(result, text);
            return result;
        }
        return null;
    }
    visitComment(comment, context) {
        return comment;
    }
    visitExpansion(expansion, context) {
        var _a;
        this.icuExpansionDepth++;
        let newExpansion;
        try {
            newExpansion = new html.Expansion(expansion.switchValue, expansion.type, visitAllWithSiblings(this, expansion.cases), expansion.sourceSpan, expansion.switchValueSourceSpan, expansion.i18n);
        }
        finally {
            this.icuExpansionDepth--;
        }
        (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(newExpansion, expansion);
        return newExpansion;
    }
    visitExpansionCase(expansionCase, context) {
        var _a;
        const newExpansionCase = new html.ExpansionCase(expansionCase.value, visitAllWithSiblings(this, expansionCase.expression), expansionCase.sourceSpan, expansionCase.valueSourceSpan, expansionCase.expSourceSpan);
        (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(newExpansionCase, expansionCase);
        return newExpansionCase;
    }
    visitBlock(block, context) {
        var _a;
        const newBlock = new html.Block(block.name, block.parameters, visitAllWithSiblings(this, block.children), block.sourceSpan, block.nameSpan, block.startSourceSpan, block.endSourceSpan);
        (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(newBlock, block);
        return newBlock;
    }
    visitBlockParameter(parameter, context) {
        return parameter;
    }
    visitLetDeclaration(decl, context) {
        return decl;
    }
    visitComponent(node, context) {
        var _a, _b;
        if ((node.tagName && SKIP_WS_TRIM_TAGS.has(node.tagName)) ||
            hasPreserveWhitespacesAttr(node.attrs)) {
            // don't descent into elements where we need to preserve whitespaces
            // but still visit all attributes to eliminate one used as a market to preserve WS
            const newElement = new html.Component(node.componentName, node.tagName, node.fullName, visitAllWithSiblings(this, node.attrs), visitAllWithSiblings(this, node.directives), node.children, node.sourceSpan, node.startSourceSpan, node.endSourceSpan, node.i18n);
            (_a = this.originalNodeMap) === null || _a === void 0 ? void 0 : _a.set(newElement, node);
            return newElement;
        }
        const newElement = new html.Component(node.componentName, node.tagName, node.fullName, node.attrs, node.directives, visitAllWithSiblings(this, node.children), node.sourceSpan, node.startSourceSpan, node.endSourceSpan, node.i18n);
        (_b = this.originalNodeMap) === null || _b === void 0 ? void 0 : _b.set(newElement, node);
        return newElement;
    }
    visitDirective(directive, context) {
        return directive;
    }
    visit(_node, context) {
        // `visitAllWithSiblings` provides context necessary for ICU messages to be handled correctly.
        // Prefer that over calling `html.visitAll` directly on this visitor.
        if (this.requireContext && !context) {
            throw new Error(`WhitespaceVisitor requires context. Visit via \`visitAllWithSiblings\` to get this context.`);
        }
        return false;
    }
}
exports.WhitespaceVisitor = WhitespaceVisitor;
function trimLeadingWhitespace(token, context) {
    if (token.type !== 5 /* TokenType.TEXT */)
        return token;
    const isFirstTokenInTag = !(context === null || context === void 0 ? void 0 : context.prev);
    if (!isFirstTokenInTag)
        return token;
    return transformTextToken(token, (text) => text.trimStart());
}
function trimTrailingWhitespace(token, context) {
    if (token.type !== 5 /* TokenType.TEXT */)
        return token;
    const isLastTokenInTag = !(context === null || context === void 0 ? void 0 : context.next);
    if (!isLastTokenInTag)
        return token;
    return transformTextToken(token, (text) => text.trimEnd());
}
function trimLeadingAndTrailingWhitespace(text, context) {
    const isFirstTokenInTag = !(context === null || context === void 0 ? void 0 : context.prev);
    const isLastTokenInTag = !(context === null || context === void 0 ? void 0 : context.next);
    const maybeTrimmedStart = isFirstTokenInTag ? text.trimStart() : text;
    const maybeTrimmed = isLastTokenInTag ? maybeTrimmedStart.trimEnd() : maybeTrimmedStart;
    return maybeTrimmed;
}
function createWhitespaceProcessedTextToken({ type, parts, sourceSpan }) {
    return { type, parts: [processWhitespace(parts[0])], sourceSpan };
}
function transformTextToken({ type, parts, sourceSpan }, transform) {
    // `TextToken` only ever has one part as defined in its type, so we just transform the first element.
    return { type, parts: [transform(parts[0])], sourceSpan };
}
function processWhitespace(text) {
    return replaceNgsp(text).replace(WS_REPLACE_REGEXP, ' ');
}
function removeWhitespaces(htmlAstWithErrors, preserveSignificantWhitespace) {
    return new parser_1.ParseTreeResult(visitAllWithSiblings(new WhitespaceVisitor(preserveSignificantWhitespace), htmlAstWithErrors.rootNodes), htmlAstWithErrors.errors);
}
function visitAllWithSiblings(visitor, nodes) {
    const result = [];
    nodes.forEach((ast, i) => {
        const context = { prev: nodes[i - 1], next: nodes[i + 1] };
        const astResult = ast.visit(visitor, context);
        if (astResult) {
            result.push(astResult);
        }
    });
    return result;
}
