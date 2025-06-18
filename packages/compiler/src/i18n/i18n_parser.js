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
exports.createI18nMessageFactory = createI18nMessageFactory;
const lexer_1 = require("../expression_parser/lexer");
const parser_1 = require("../expression_parser/parser");
const serializer_1 = require("../expression_parser/serializer");
const html = __importStar(require("../ml_parser/ast"));
const html_tags_1 = require("../ml_parser/html_tags");
const parse_util_1 = require("../parse_util");
const i18n = __importStar(require("./i18n_ast"));
const placeholder_1 = require("./serializers/placeholder");
const _expParser = new parser_1.Parser(new lexer_1.Lexer());
/**
 * Returns a function converting html nodes to an i18n Message given an interpolationConfig
 */
function createI18nMessageFactory(interpolationConfig, containerBlocks, retainEmptyTokens, preserveExpressionWhitespace) {
    const visitor = new _I18nVisitor(_expParser, interpolationConfig, containerBlocks, retainEmptyTokens, preserveExpressionWhitespace);
    return (nodes, meaning, description, customId, visitNodeFn) => visitor.toI18nMessage(nodes, meaning, description, customId, visitNodeFn);
}
function noopVisitNodeFn(_html, i18n) {
    return i18n;
}
class _I18nVisitor {
    constructor(_expressionParser, _interpolationConfig, _containerBlocks, _retainEmptyTokens, _preserveExpressionWhitespace) {
        this._expressionParser = _expressionParser;
        this._interpolationConfig = _interpolationConfig;
        this._containerBlocks = _containerBlocks;
        this._retainEmptyTokens = _retainEmptyTokens;
        this._preserveExpressionWhitespace = _preserveExpressionWhitespace;
    }
    toI18nMessage(nodes, meaning = '', description = '', customId = '', visitNodeFn) {
        const context = {
            isIcu: nodes.length == 1 && nodes[0] instanceof html.Expansion,
            icuDepth: 0,
            placeholderRegistry: new placeholder_1.PlaceholderRegistry(),
            placeholderToContent: {},
            placeholderToMessage: {},
            visitNodeFn: visitNodeFn || noopVisitNodeFn,
        };
        const i18nodes = html.visitAll(this, nodes, context);
        return new i18n.Message(i18nodes, context.placeholderToContent, context.placeholderToMessage, meaning, description, customId);
    }
    visitElement(el, context) {
        return this._visitElementLike(el, context);
    }
    visitComponent(component, context) {
        return this._visitElementLike(component, context);
    }
    visitDirective(directive, context) {
        throw new Error('Unreachable code');
    }
    visitAttribute(attribute, context) {
        const node = attribute.valueTokens === undefined || attribute.valueTokens.length === 1
            ? new i18n.Text(attribute.value, attribute.valueSpan || attribute.sourceSpan)
            : this._visitTextWithInterpolation(attribute.valueTokens, attribute.valueSpan || attribute.sourceSpan, context, attribute.i18n);
        return context.visitNodeFn(attribute, node);
    }
    visitText(text, context) {
        const node = text.tokens.length === 1
            ? new i18n.Text(text.value, text.sourceSpan)
            : this._visitTextWithInterpolation(text.tokens, text.sourceSpan, context, text.i18n);
        return context.visitNodeFn(text, node);
    }
    visitComment(comment, context) {
        return null;
    }
    visitExpansion(icu, context) {
        context.icuDepth++;
        const i18nIcuCases = {};
        const i18nIcu = new i18n.Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
        icu.cases.forEach((caze) => {
            i18nIcuCases[caze.value] = new i18n.Container(caze.expression.map((node) => node.visit(this, context)), caze.expSourceSpan);
        });
        context.icuDepth--;
        if (context.isIcu || context.icuDepth > 0) {
            // Returns an ICU node when:
            // - the message (vs a part of the message) is an ICU message, or
            // - the ICU message is nested.
            const expPh = context.placeholderRegistry.getUniquePlaceholder(`VAR_${icu.type}`);
            i18nIcu.expressionPlaceholder = expPh;
            context.placeholderToContent[expPh] = {
                text: icu.switchValue,
                sourceSpan: icu.switchValueSourceSpan,
            };
            return context.visitNodeFn(icu, i18nIcu);
        }
        // Else returns a placeholder
        // ICU placeholders should not be replaced with their original content but with the their
        // translations.
        // TODO(vicb): add a html.Node -> i18n.Message cache to avoid having to re-create the msg
        const phName = context.placeholderRegistry.getPlaceholderName('ICU', icu.sourceSpan.toString());
        context.placeholderToMessage[phName] = this.toI18nMessage([icu], '', '', '', undefined);
        const node = new i18n.IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
        return context.visitNodeFn(icu, node);
    }
    visitExpansionCase(_icuCase, _context) {
        throw new Error('Unreachable code');
    }
    visitBlock(block, context) {
        var _a;
        const children = html.visitAll(this, block.children, context);
        if (this._containerBlocks.has(block.name)) {
            return new i18n.Container(children, block.sourceSpan);
        }
        const parameters = block.parameters.map((param) => param.expression);
        const startPhName = context.placeholderRegistry.getStartBlockPlaceholderName(block.name, parameters);
        const closePhName = context.placeholderRegistry.getCloseBlockPlaceholderName(block.name);
        context.placeholderToContent[startPhName] = {
            text: block.startSourceSpan.toString(),
            sourceSpan: block.startSourceSpan,
        };
        context.placeholderToContent[closePhName] = {
            text: block.endSourceSpan ? block.endSourceSpan.toString() : '}',
            sourceSpan: (_a = block.endSourceSpan) !== null && _a !== void 0 ? _a : block.sourceSpan,
        };
        const node = new i18n.BlockPlaceholder(block.name, parameters, startPhName, closePhName, children, block.sourceSpan, block.startSourceSpan, block.endSourceSpan);
        return context.visitNodeFn(block, node);
    }
    visitBlockParameter(_parameter, _context) {
        throw new Error('Unreachable code');
    }
    visitLetDeclaration(decl, context) {
        return null;
    }
    _visitElementLike(node, context) {
        var _a;
        const children = html.visitAll(this, node.children, context);
        const attrs = {};
        const visitAttribute = (attr) => {
            // Do not visit the attributes, translatable ones are top-level ASTs
            attrs[attr.name] = attr.value;
        };
        let nodeName;
        let isVoid;
        if (node instanceof html.Element) {
            nodeName = node.name;
            isVoid = (0, html_tags_1.getHtmlTagDefinition)(node.name).isVoid;
        }
        else {
            nodeName = node.fullName;
            isVoid = node.tagName ? (0, html_tags_1.getHtmlTagDefinition)(node.tagName).isVoid : false;
        }
        node.attrs.forEach(visitAttribute);
        node.directives.forEach((dir) => dir.attrs.forEach(visitAttribute));
        const startPhName = context.placeholderRegistry.getStartTagPlaceholderName(nodeName, attrs, isVoid);
        context.placeholderToContent[startPhName] = {
            text: node.startSourceSpan.toString(),
            sourceSpan: node.startSourceSpan,
        };
        let closePhName = '';
        if (!isVoid) {
            closePhName = context.placeholderRegistry.getCloseTagPlaceholderName(nodeName);
            context.placeholderToContent[closePhName] = {
                text: `</${nodeName}>`,
                sourceSpan: (_a = node.endSourceSpan) !== null && _a !== void 0 ? _a : node.sourceSpan,
            };
        }
        const i18nNode = new i18n.TagPlaceholder(nodeName, attrs, startPhName, closePhName, children, isVoid, node.sourceSpan, node.startSourceSpan, node.endSourceSpan);
        return context.visitNodeFn(node, i18nNode);
    }
    /**
     * Convert, text and interpolated tokens up into text and placeholder pieces.
     *
     * @param tokens The text and interpolated tokens.
     * @param sourceSpan The span of the whole of the `text` string.
     * @param context The current context of the visitor, used to compute and store placeholders.
     * @param previousI18n Any i18n metadata associated with this `text` from a previous pass.
     */
    _visitTextWithInterpolation(tokens, sourceSpan, context, previousI18n) {
        // Return a sequence of `Text` and `Placeholder` nodes grouped in a `Container`.
        const nodes = [];
        // We will only create a container if there are actually interpolations,
        // so this flag tracks that.
        let hasInterpolation = false;
        for (const token of tokens) {
            switch (token.type) {
                case 8 /* TokenType.INTERPOLATION */:
                case 17 /* TokenType.ATTR_VALUE_INTERPOLATION */:
                    hasInterpolation = true;
                    const [startMarker, expression, endMarker] = token.parts;
                    const baseName = extractPlaceholderName(expression) || 'INTERPOLATION';
                    const phName = context.placeholderRegistry.getPlaceholderName(baseName, expression);
                    if (this._preserveExpressionWhitespace) {
                        context.placeholderToContent[phName] = {
                            text: token.parts.join(''),
                            sourceSpan: token.sourceSpan,
                        };
                        nodes.push(new i18n.Placeholder(expression, phName, token.sourceSpan));
                    }
                    else {
                        const normalized = this.normalizeExpression(token);
                        context.placeholderToContent[phName] = {
                            text: `${startMarker}${normalized}${endMarker}`,
                            sourceSpan: token.sourceSpan,
                        };
                        nodes.push(new i18n.Placeholder(normalized, phName, token.sourceSpan));
                    }
                    break;
                default:
                    // Try to merge text tokens with previous tokens. We do this even for all tokens
                    // when `retainEmptyTokens == true` because whitespace tokens may have non-zero
                    // length, but will be trimmed by `WhitespaceVisitor` in one extraction pass and
                    // be considered "empty" there. Therefore a whitespace token with
                    // `retainEmptyTokens === true` should be treated like an empty token and either
                    // retained or merged into the previous node. Since extraction does two passes with
                    // different trimming behavior, the second pass needs to have identical node count
                    // to reuse source spans, so we need this check to get the same answer when both
                    // trimming and not trimming.
                    if (token.parts[0].length > 0 || this._retainEmptyTokens) {
                        // This token is text or an encoded entity.
                        // If it is following on from a previous text node then merge it into that node
                        // Otherwise, if it is following an interpolation, then add a new node.
                        const previous = nodes[nodes.length - 1];
                        if (previous instanceof i18n.Text) {
                            previous.value += token.parts[0];
                            previous.sourceSpan = new parse_util_1.ParseSourceSpan(previous.sourceSpan.start, token.sourceSpan.end, previous.sourceSpan.fullStart, previous.sourceSpan.details);
                        }
                        else {
                            nodes.push(new i18n.Text(token.parts[0], token.sourceSpan));
                        }
                    }
                    else {
                        // Retain empty tokens to avoid breaking dropping entire nodes such that source
                        // spans should not be reusable across multiple parses of a template. We *should*
                        // do this all the time, however we need to maintain backwards compatibility
                        // with existing message IDs so we can't do it by default and should only enable
                        // this when removing significant whitespace.
                        if (this._retainEmptyTokens) {
                            nodes.push(new i18n.Text(token.parts[0], token.sourceSpan));
                        }
                    }
                    break;
            }
        }
        if (hasInterpolation) {
            // Whitespace removal may have invalidated the interpolation source-spans.
            reusePreviousSourceSpans(nodes, previousI18n);
            return new i18n.Container(nodes, sourceSpan);
        }
        else {
            return nodes[0];
        }
    }
    // Normalize expression whitespace by parsing and re-serializing it. This makes
    // message IDs more durable to insignificant whitespace changes.
    normalizeExpression(token) {
        const expression = token.parts[1];
        const expr = this._expressionParser.parseBinding(expression, 
        /* location */ token.sourceSpan.start.toString(), 
        /* absoluteOffset */ token.sourceSpan.start.offset, this._interpolationConfig);
        return (0, serializer_1.serialize)(expr);
    }
}
/**
 * Re-use the source-spans from `previousI18n` metadata for the `nodes`.
 *
 * Whitespace removal can invalidate the source-spans of interpolation nodes, so we
 * reuse the source-span stored from a previous pass before the whitespace was removed.
 *
 * @param nodes The `Text` and `Placeholder` nodes to be processed.
 * @param previousI18n Any i18n metadata for these `nodes` stored from a previous pass.
 */
function reusePreviousSourceSpans(nodes, previousI18n) {
    if (previousI18n instanceof i18n.Message) {
        // The `previousI18n` is an i18n `Message`, so we are processing an `Attribute` with i18n
        // metadata. The `Message` should consist only of a single `Container` that contains the
        // parts (`Text` and `Placeholder`) to process.
        assertSingleContainerMessage(previousI18n);
        previousI18n = previousI18n.nodes[0];
    }
    if (previousI18n instanceof i18n.Container) {
        // The `previousI18n` is a `Container`, which means that this is a second i18n extraction pass
        // after whitespace has been removed from the AST nodes.
        assertEquivalentNodes(previousI18n.children, nodes);
        // Reuse the source-spans from the first pass.
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].sourceSpan = previousI18n.children[i].sourceSpan;
        }
    }
}
/**
 * Asserts that the `message` contains exactly one `Container` node.
 */
function assertSingleContainerMessage(message) {
    const nodes = message.nodes;
    if (nodes.length !== 1 || !(nodes[0] instanceof i18n.Container)) {
        throw new Error('Unexpected previous i18n message - expected it to consist of only a single `Container` node.');
    }
}
/**
 * Asserts that the `previousNodes` and `node` collections have the same number of elements and
 * corresponding elements have the same node type.
 */
function assertEquivalentNodes(previousNodes, nodes) {
    if (previousNodes.length !== nodes.length) {
        throw new Error(`
The number of i18n message children changed between first and second pass.

First pass (${previousNodes.length} tokens):
${previousNodes.map((node) => `"${node.sourceSpan.toString()}"`).join('\n')}

Second pass (${nodes.length} tokens):
${nodes.map((node) => `"${node.sourceSpan.toString()}"`).join('\n')}
    `.trim());
    }
    if (previousNodes.some((node, i) => nodes[i].constructor !== node.constructor)) {
        throw new Error('The types of the i18n message children changed between first and second pass.');
    }
}
const _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*("|')([\s\S]*?)\1[\s\S]*\)/g;
function extractPlaceholderName(input) {
    return input.split(_CUSTOM_PH_EXP)[2];
}
