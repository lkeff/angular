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
exports.MessageBundle = void 0;
const html_whitespaces_1 = require("../ml_parser/html_whitespaces");
const extractor_merger_1 = require("./extractor_merger");
const i18n = __importStar(require("./i18n_ast"));
/**
 * A container for message extracted from the templates.
 */
class MessageBundle {
    constructor(_htmlParser, _implicitTags, _implicitAttrs, _locale = null, _preserveWhitespace = true) {
        this._htmlParser = _htmlParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        this._locale = _locale;
        this._preserveWhitespace = _preserveWhitespace;
        this._messages = [];
    }
    updateFromTemplate(source, url, interpolationConfig) {
        const htmlParserResult = this._htmlParser.parse(source, url, {
            tokenizeExpansionForms: true,
            interpolationConfig,
        });
        if (htmlParserResult.errors.length) {
            return htmlParserResult.errors;
        }
        // Trim unnecessary whitespace from extracted messages if requested. This
        // makes the messages more durable to trivial whitespace changes without
        // affected message IDs.
        const rootNodes = this._preserveWhitespace
            ? htmlParserResult.rootNodes
            : (0, html_whitespaces_1.visitAllWithSiblings)(new html_whitespaces_1.WhitespaceVisitor(/* preserveSignificantWhitespace */ false), htmlParserResult.rootNodes);
        const i18nParserResult = (0, extractor_merger_1.extractMessages)(rootNodes, interpolationConfig, this._implicitTags, this._implicitAttrs, 
        /* preserveSignificantWhitespace */ this._preserveWhitespace);
        if (i18nParserResult.errors.length) {
            return i18nParserResult.errors;
        }
        this._messages.push(...i18nParserResult.messages);
        return [];
    }
    // Return the message in the internal format
    // The public (serialized) format might be different, see the `write` method.
    getMessages() {
        return this._messages;
    }
    write(serializer, filterSources) {
        const messages = {};
        const mapperVisitor = new MapPlaceholderNames();
        // Deduplicate messages based on their ID
        this._messages.forEach((message) => {
            const id = serializer.digest(message);
            if (!messages.hasOwnProperty(id)) {
                messages[id] = message;
            }
            else {
                messages[id].sources.push(...message.sources);
            }
        });
        // Transform placeholder names using the serializer mapping
        const msgList = Object.keys(messages).map((id) => {
            const mapper = serializer.createNameMapper(messages[id]);
            const src = messages[id];
            const nodes = mapper ? mapperVisitor.convert(src.nodes, mapper) : src.nodes;
            let transformedMessage = new i18n.Message(nodes, {}, {}, src.meaning, src.description, id);
            transformedMessage.sources = src.sources;
            if (filterSources) {
                transformedMessage.sources.forEach((source) => (source.filePath = filterSources(source.filePath)));
            }
            return transformedMessage;
        });
        return serializer.write(msgList, this._locale);
    }
}
exports.MessageBundle = MessageBundle;
// Transform an i18n AST by renaming the placeholder nodes with the given mapper
class MapPlaceholderNames extends i18n.CloneVisitor {
    convert(nodes, mapper) {
        return mapper ? nodes.map((n) => n.visit(this, mapper)) : nodes;
    }
    visitTagPlaceholder(ph, mapper) {
        const startName = mapper.toPublicName(ph.startName);
        const closeName = ph.closeName ? mapper.toPublicName(ph.closeName) : ph.closeName;
        const children = ph.children.map((n) => n.visit(this, mapper));
        return new i18n.TagPlaceholder(ph.tag, ph.attrs, startName, closeName, children, ph.isVoid, ph.sourceSpan, ph.startSourceSpan, ph.endSourceSpan);
    }
    visitBlockPlaceholder(ph, mapper) {
        const startName = mapper.toPublicName(ph.startName);
        const closeName = ph.closeName ? mapper.toPublicName(ph.closeName) : ph.closeName;
        const children = ph.children.map((n) => n.visit(this, mapper));
        return new i18n.BlockPlaceholder(ph.name, ph.parameters, startName, closeName, children, ph.sourceSpan, ph.startSourceSpan, ph.endSourceSpan);
    }
    visitPlaceholder(ph, mapper) {
        return new i18n.Placeholder(ph.value, mapper.toPublicName(ph.name), ph.sourceSpan);
    }
    visitIcuPlaceholder(ph, mapper) {
        return new i18n.IcuPlaceholder(ph.value, mapper.toPublicName(ph.name), ph.sourceSpan);
    }
}
