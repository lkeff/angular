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
exports.Xtb = void 0;
const ml = __importStar(require("../../ml_parser/ast"));
const xml_parser_1 = require("../../ml_parser/xml_parser");
const i18n = __importStar(require("../i18n_ast"));
const parse_util_1 = require("../parse_util");
const serializer_1 = require("./serializer");
const xmb_1 = require("./xmb");
const _TRANSLATIONS_TAG = 'translationbundle';
const _TRANSLATION_TAG = 'translation';
const _PLACEHOLDER_TAG = 'ph';
class Xtb extends serializer_1.Serializer {
    write(messages, locale) {
        throw new Error('Unsupported');
    }
    load(content, url) {
        // xtb to xml nodes
        const xtbParser = new XtbParser();
        const { locale, msgIdToHtml, errors } = xtbParser.parse(content, url);
        // xml nodes to i18n nodes
        const i18nNodesByMsgId = {};
        const converter = new XmlToI18n();
        // Because we should be able to load xtb files that rely on features not supported by angular,
        // we need to delay the conversion of html to i18n nodes so that non angular messages are not
        // converted
        Object.keys(msgIdToHtml).forEach((msgId) => {
            const valueFn = function () {
                const { i18nNodes, errors } = converter.convert(msgIdToHtml[msgId], url);
                if (errors.length) {
                    throw new Error(`xtb parse errors:\n${errors.join('\n')}`);
                }
                return i18nNodes;
            };
            createLazyProperty(i18nNodesByMsgId, msgId, valueFn);
        });
        if (errors.length) {
            throw new Error(`xtb parse errors:\n${errors.join('\n')}`);
        }
        return { locale: locale, i18nNodesByMsgId };
    }
    digest(message) {
        return (0, xmb_1.digest)(message);
    }
    createNameMapper(message) {
        return new serializer_1.SimplePlaceholderMapper(message, xmb_1.toPublicName);
    }
}
exports.Xtb = Xtb;
function createLazyProperty(messages, id, valueFn) {
    Object.defineProperty(messages, id, {
        configurable: true,
        enumerable: true,
        get: function () {
            const value = valueFn();
            Object.defineProperty(messages, id, { enumerable: true, value });
            return value;
        },
        set: (_) => {
            throw new Error('Could not overwrite an XTB translation');
        },
    });
}
// Extract messages as xml nodes from the xtb file
class XtbParser {
    constructor() {
        this._locale = null;
    }
    parse(xtb, url) {
        this._bundleDepth = 0;
        this._msgIdToHtml = {};
        // We can not parse the ICU messages at this point as some messages might not originate
        // from Angular that could not be lex'd.
        const xml = new xml_parser_1.XmlParser().parse(xtb, url);
        this._errors = xml.errors;
        ml.visitAll(this, xml.rootNodes);
        return {
            msgIdToHtml: this._msgIdToHtml,
            errors: this._errors,
            locale: this._locale,
        };
    }
    visitElement(element, context) {
        switch (element.name) {
            case _TRANSLATIONS_TAG:
                this._bundleDepth++;
                if (this._bundleDepth > 1) {
                    this._addError(element, `<${_TRANSLATIONS_TAG}> elements can not be nested`);
                }
                const langAttr = element.attrs.find((attr) => attr.name === 'lang');
                if (langAttr) {
                    this._locale = langAttr.value;
                }
                ml.visitAll(this, element.children, null);
                this._bundleDepth--;
                break;
            case _TRANSLATION_TAG:
                const idAttr = element.attrs.find((attr) => attr.name === 'id');
                if (!idAttr) {
                    this._addError(element, `<${_TRANSLATION_TAG}> misses the "id" attribute`);
                }
                else {
                    const id = idAttr.value;
                    if (this._msgIdToHtml.hasOwnProperty(id)) {
                        this._addError(element, `Duplicated translations for msg ${id}`);
                    }
                    else {
                        const innerTextStart = element.startSourceSpan.end.offset;
                        const innerTextEnd = element.endSourceSpan.start.offset;
                        const content = element.startSourceSpan.start.file.content;
                        const innerText = content.slice(innerTextStart, innerTextEnd);
                        this._msgIdToHtml[id] = innerText;
                    }
                }
                break;
            default:
                this._addError(element, 'Unexpected tag');
        }
    }
    visitAttribute(attribute, context) { }
    visitText(text, context) { }
    visitComment(comment, context) { }
    visitExpansion(expansion, context) { }
    visitExpansionCase(expansionCase, context) { }
    visitBlock(block, context) { }
    visitBlockParameter(block, context) { }
    visitLetDeclaration(decl, context) { }
    visitComponent(component, context) {
        this._addError(component, 'Unexpected node');
    }
    visitDirective(directive, context) {
        this._addError(directive, 'Unexpected node');
    }
    _addError(node, message) {
        this._errors.push(new parse_util_1.I18nError(node.sourceSpan, message));
    }
}
// Convert ml nodes (xtb syntax) to i18n nodes
class XmlToI18n {
    convert(message, url) {
        const xmlIcu = new xml_parser_1.XmlParser().parse(message, url, { tokenizeExpansionForms: true });
        this._errors = xmlIcu.errors;
        const i18nNodes = this._errors.length > 0 || xmlIcu.rootNodes.length == 0
            ? []
            : ml.visitAll(this, xmlIcu.rootNodes);
        return {
            i18nNodes,
            errors: this._errors,
        };
    }
    visitText(text, context) {
        return new i18n.Text(text.value, text.sourceSpan);
    }
    visitExpansion(icu, context) {
        const caseMap = {};
        ml.visitAll(this, icu.cases).forEach((c) => {
            caseMap[c.value] = new i18n.Container(c.nodes, icu.sourceSpan);
        });
        return new i18n.Icu(icu.switchValue, icu.type, caseMap, icu.sourceSpan);
    }
    visitExpansionCase(icuCase, context) {
        return {
            value: icuCase.value,
            nodes: ml.visitAll(this, icuCase.expression),
        };
    }
    visitElement(el, context) {
        if (el.name === _PLACEHOLDER_TAG) {
            const nameAttr = el.attrs.find((attr) => attr.name === 'name');
            if (nameAttr) {
                return new i18n.Placeholder('', nameAttr.value, el.sourceSpan);
            }
            this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "name" attribute`);
        }
        else {
            this._addError(el, `Unexpected tag`);
        }
        return null;
    }
    visitComment(comment, context) { }
    visitAttribute(attribute, context) { }
    visitBlock(block, context) { }
    visitBlockParameter(block, context) { }
    visitLetDeclaration(decl, context) { }
    visitComponent(component, context) {
        this._addError(component, 'Unexpected node');
    }
    visitDirective(directive, context) {
        this._addError(directive, 'Unexpected node');
    }
    _addError(node, message) {
        this._errors.push(new parse_util_1.I18nError(node.sourceSpan, message));
    }
}
