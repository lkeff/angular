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
exports.LEADING_TRIVIA_CHARS = void 0;
exports.parseTemplate = parseTemplate;
exports.makeBindingParser = makeBindingParser;
const lexer_1 = require("../../expression_parser/lexer");
const parser_1 = require("../../expression_parser/parser");
const html = __importStar(require("../../ml_parser/ast"));
const defaults_1 = require("../../ml_parser/defaults");
const html_parser_1 = require("../../ml_parser/html_parser");
const html_whitespaces_1 = require("../../ml_parser/html_whitespaces");
const dom_element_schema_registry_1 = require("../../schema/dom_element_schema_registry");
const binding_parser_1 = require("../../template_parser/binding_parser");
const r3_template_transform_1 = require("../r3_template_transform");
const meta_1 = require("./i18n/meta");
exports.LEADING_TRIVIA_CHARS = [' ', '\n', '\r', '\t'];
/**
 * Parse a template into render3 `Node`s and additional metadata, with no other dependencies.
 *
 * @param template text of the template to parse
 * @param templateUrl URL to use for source mapping of the parsed template
 * @param options options to modify how the template is parsed
 */
function parseTemplate(template, templateUrl, options = {}) {
    var _a, _b, _c, _d;
    const { interpolationConfig, preserveWhitespaces, enableI18nLegacyMessageIdFormat } = options;
    const selectorlessEnabled = (_a = options.enableSelectorless) !== null && _a !== void 0 ? _a : false;
    const bindingParser = makeBindingParser(interpolationConfig, selectorlessEnabled);
    const htmlParser = new html_parser_1.HtmlParser();
    const parseResult = htmlParser.parse(template, templateUrl, Object.assign(Object.assign({ leadingTriviaChars: exports.LEADING_TRIVIA_CHARS }, options), { tokenizeExpansionForms: true, tokenizeBlocks: (_b = options.enableBlockSyntax) !== null && _b !== void 0 ? _b : true, tokenizeLet: (_c = options.enableLetSyntax) !== null && _c !== void 0 ? _c : true, selectorlessEnabled }));
    if (!options.alwaysAttemptHtmlToR3AstConversion &&
        parseResult.errors &&
        parseResult.errors.length > 0) {
        const parsedTemplate = {
            interpolationConfig,
            preserveWhitespaces,
            errors: parseResult.errors,
            nodes: [],
            styleUrls: [],
            styles: [],
            ngContentSelectors: [],
        };
        if (options.collectCommentNodes) {
            parsedTemplate.commentNodes = [];
        }
        return parsedTemplate;
    }
    let rootNodes = parseResult.rootNodes;
    // We need to use the same `retainEmptyTokens` value for both parses to avoid
    // causing a mismatch when reusing source spans, even if the
    // `preserveSignificantWhitespace` behavior is different between the two
    // parses.
    const retainEmptyTokens = !((_d = options.preserveSignificantWhitespace) !== null && _d !== void 0 ? _d : true);
    // process i18n meta information (scan attributes, generate ids)
    // before we run whitespace removal process, because existing i18n
    // extraction process (ng extract-i18n) relies on a raw content to generate
    // message ids
    const i18nMetaVisitor = new meta_1.I18nMetaVisitor(interpolationConfig, 
    /* keepI18nAttrs */ !preserveWhitespaces, enableI18nLegacyMessageIdFormat, 
    /* containerBlocks */ undefined, options.preserveSignificantWhitespace, retainEmptyTokens);
    const i18nMetaResult = i18nMetaVisitor.visitAllWithErrors(rootNodes);
    if (!options.alwaysAttemptHtmlToR3AstConversion &&
        i18nMetaResult.errors &&
        i18nMetaResult.errors.length > 0) {
        const parsedTemplate = {
            interpolationConfig,
            preserveWhitespaces,
            errors: i18nMetaResult.errors,
            nodes: [],
            styleUrls: [],
            styles: [],
            ngContentSelectors: [],
        };
        if (options.collectCommentNodes) {
            parsedTemplate.commentNodes = [];
        }
        return parsedTemplate;
    }
    rootNodes = i18nMetaResult.rootNodes;
    if (!preserveWhitespaces) {
        // Always preserve significant whitespace here because this is used to generate the `goog.getMsg`
        // and `$localize` calls which should retain significant whitespace in order to render the
        // correct output. We let this diverge from the message IDs generated earlier which might not
        // have preserved significant whitespace.
        //
        // This should use `visitAllWithSiblings` to set `WhitespaceVisitor` context correctly, however
        // there is an existing bug where significant whitespace is not properly retained in the JS
        // output of leading/trailing whitespace for ICU messages due to the existing lack of context\
        // in `WhitespaceVisitor`. Using `visitAllWithSiblings` here would fix that bug and retain the
        // whitespace, however it would also change the runtime representation which we don't want to do
        // right now.
        rootNodes = html.visitAll(new html_whitespaces_1.WhitespaceVisitor(
        /* preserveSignificantWhitespace */ true, 
        /* originalNodeMap */ undefined, 
        /* requireContext */ false), rootNodes);
        // run i18n meta visitor again in case whitespaces are removed (because that might affect
        // generated i18n message content) and first pass indicated that i18n content is present in a
        // template. During this pass i18n IDs generated at the first pass will be preserved, so we can
        // mimic existing extraction process (ng extract-i18n)
        if (i18nMetaVisitor.hasI18nMeta) {
            rootNodes = html.visitAll(new meta_1.I18nMetaVisitor(interpolationConfig, 
            /* keepI18nAttrs */ false, 
            /* enableI18nLegacyMessageIdFormat */ undefined, 
            /* containerBlocks */ undefined, 
            /* preserveSignificantWhitespace */ true, retainEmptyTokens), rootNodes);
        }
    }
    const { nodes, errors, styleUrls, styles, ngContentSelectors, commentNodes } = (0, r3_template_transform_1.htmlAstToRender3Ast)(rootNodes, bindingParser, { collectCommentNodes: !!options.collectCommentNodes });
    errors.push(...parseResult.errors, ...i18nMetaResult.errors);
    const parsedTemplate = {
        interpolationConfig,
        preserveWhitespaces,
        errors: errors.length > 0 ? errors : null,
        nodes,
        styleUrls,
        styles,
        ngContentSelectors,
    };
    if (options.collectCommentNodes) {
        parsedTemplate.commentNodes = commentNodes;
    }
    return parsedTemplate;
}
const elementRegistry = new dom_element_schema_registry_1.DomElementSchemaRegistry();
/**
 * Construct a `BindingParser` with a default configuration.
 */
function makeBindingParser(interpolationConfig = defaults_1.DEFAULT_INTERPOLATION_CONFIG, selectorlessEnabled = false) {
    return new binding_parser_1.BindingParser(new parser_1.Parser(new lexer_1.Lexer(), selectorlessEnabled), interpolationConfig, elementRegistry, []);
}
