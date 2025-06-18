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
exports.Xliff = void 0;
const ml = __importStar(require("../../ml_parser/ast"));
const xml_parser_1 = require("../../ml_parser/xml_parser");
const digest_1 = require("../digest");
const i18n = __importStar(require("../i18n_ast"));
const parse_util_1 = require("../parse_util");
const serializer_1 = require("./serializer");
const xml = __importStar(require("./xml_helper"));
const _VERSION = '1.2';
const _XMLNS = 'urn:oasis:names:tc:xliff:document:1.2';
// TODO(vicb): make this a param (s/_/-/)
const _DEFAULT_SOURCE_LANG = 'en';
const _PLACEHOLDER_TAG = 'x';
const _MARKER_TAG = 'mrk';
const _FILE_TAG = 'file';
const _SOURCE_TAG = 'source';
const _SEGMENT_SOURCE_TAG = 'seg-source';
const _ALT_TRANS_TAG = 'alt-trans';
const _TARGET_TAG = 'target';
const _UNIT_TAG = 'trans-unit';
const _CONTEXT_GROUP_TAG = 'context-group';
const _CONTEXT_TAG = 'context';
// https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
// https://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
class Xliff extends serializer_1.Serializer {
    write(messages, locale) {
        const visitor = new _WriteVisitor();
        const transUnits = [];
        messages.forEach((message) => {
            let contextTags = [];
            message.sources.forEach((source) => {
                let contextGroupTag = new xml.Tag(_CONTEXT_GROUP_TAG, { purpose: 'location' });
                contextGroupTag.children.push(new xml.CR(10), new xml.Tag(_CONTEXT_TAG, { 'context-type': 'sourcefile' }, [
                    new xml.Text(source.filePath),
                ]), new xml.CR(10), new xml.Tag(_CONTEXT_TAG, { 'context-type': 'linenumber' }, [
                    new xml.Text(`${source.startLine}`),
                ]), new xml.CR(8));
                contextTags.push(new xml.CR(8), contextGroupTag);
            });
            const transUnit = new xml.Tag(_UNIT_TAG, { id: message.id, datatype: 'html' });
            transUnit.children.push(new xml.CR(8), new xml.Tag(_SOURCE_TAG, {}, visitor.serialize(message.nodes)), ...contextTags);
            if (message.description) {
                transUnit.children.push(new xml.CR(8), new xml.Tag('note', { priority: '1', from: 'description' }, [
                    new xml.Text(message.description),
                ]));
            }
            if (message.meaning) {
                transUnit.children.push(new xml.CR(8), new xml.Tag('note', { priority: '1', from: 'meaning' }, [new xml.Text(message.meaning)]));
            }
            transUnit.children.push(new xml.CR(6));
            transUnits.push(new xml.CR(6), transUnit);
        });
        const body = new xml.Tag('body', {}, [...transUnits, new xml.CR(4)]);
        const file = new xml.Tag('file', {
            'source-language': locale || _DEFAULT_SOURCE_LANG,
            datatype: 'plaintext',
            original: 'ng2.template',
        }, [new xml.CR(4), body, new xml.CR(2)]);
        const xliff = new xml.Tag('xliff', { version: _VERSION, xmlns: _XMLNS }, [
            new xml.CR(2),
            file,
            new xml.CR(),
        ]);
        return xml.serialize([
            new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }),
            new xml.CR(),
            xliff,
            new xml.CR(),
        ]);
    }
    load(content, url) {
        // xliff to xml nodes
        const xliffParser = new XliffParser();
        const { locale, msgIdToHtml, errors } = xliffParser.parse(content, url);
        // xml nodes to i18n nodes
        const i18nNodesByMsgId = {};
        const converter = new XmlToI18n();
        Object.keys(msgIdToHtml).forEach((msgId) => {
            const { i18nNodes, errors: e } = converter.convert(msgIdToHtml[msgId], url);
            errors.push(...e);
            i18nNodesByMsgId[msgId] = i18nNodes;
        });
        if (errors.length) {
            throw new Error(`xliff parse errors:\n${errors.join('\n')}`);
        }
        return { locale: locale, i18nNodesByMsgId };
    }
    digest(message) {
        return (0, digest_1.digest)(message);
    }
}
exports.Xliff = Xliff;
class _WriteVisitor {
    visitText(text, context) {
        return [new xml.Text(text.value)];
    }
    visitContainer(container, context) {
        const nodes = [];
        container.children.forEach((node) => nodes.push(...node.visit(this)));
        return nodes;
    }
    visitIcu(icu, context) {
        const nodes = [new xml.Text(`{${icu.expressionPlaceholder}, ${icu.type}, `)];
        Object.keys(icu.cases).forEach((c) => {
            nodes.push(new xml.Text(`${c} {`), ...icu.cases[c].visit(this), new xml.Text(`} `));
        });
        nodes.push(new xml.Text(`}`));
        return nodes;
    }
    visitTagPlaceholder(ph, context) {
        const ctype = getCtypeForTag(ph.tag);
        if (ph.isVoid) {
            // void tags have no children nor closing tags
            return [
                new xml.Tag(_PLACEHOLDER_TAG, { id: ph.startName, ctype, 'equiv-text': `<${ph.tag}/>` }),
            ];
        }
        const startTagPh = new xml.Tag(_PLACEHOLDER_TAG, {
            id: ph.startName,
            ctype,
            'equiv-text': `<${ph.tag}>`,
        });
        const closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, {
            id: ph.closeName,
            ctype,
            'equiv-text': `</${ph.tag}>`,
        });
        return [startTagPh, ...this.serialize(ph.children), closeTagPh];
    }
    visitPlaceholder(ph, context) {
        return [new xml.Tag(_PLACEHOLDER_TAG, { id: ph.name, 'equiv-text': `{{${ph.value}}}` })];
    }
    visitBlockPlaceholder(ph, context) {
        const ctype = `x-${ph.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const startTagPh = new xml.Tag(_PLACEHOLDER_TAG, {
            id: ph.startName,
            ctype,
            'equiv-text': `@${ph.name}`,
        });
        const closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { id: ph.closeName, ctype, 'equiv-text': `}` });
        return [startTagPh, ...this.serialize(ph.children), closeTagPh];
    }
    visitIcuPlaceholder(ph, context) {
        const equivText = `{${ph.value.expression}, ${ph.value.type}, ${Object.keys(ph.value.cases)
            .map((value) => value + ' {...}')
            .join(' ')}}`;
        return [new xml.Tag(_PLACEHOLDER_TAG, { id: ph.name, 'equiv-text': equivText })];
    }
    serialize(nodes) {
        return [].concat(...nodes.map((node) => node.visit(this)));
    }
}
// TODO(vicb): add error management (structure)
// Extract messages as xml nodes from the xliff file
class XliffParser {
    constructor() {
        this._locale = null;
    }
    parse(xliff, url) {
        this._unitMlString = null;
        this._msgIdToHtml = {};
        const xml = new xml_parser_1.XmlParser().parse(xliff, url);
        this._errors = xml.errors;
        ml.visitAll(this, xml.rootNodes, null);
        return {
            msgIdToHtml: this._msgIdToHtml,
            errors: this._errors,
            locale: this._locale,
        };
    }
    visitElement(element, context) {
        switch (element.name) {
            case _UNIT_TAG:
                this._unitMlString = null;
                const idAttr = element.attrs.find((attr) => attr.name === 'id');
                if (!idAttr) {
                    this._addError(element, `<${_UNIT_TAG}> misses the "id" attribute`);
                }
                else {
                    const id = idAttr.value;
                    if (this._msgIdToHtml.hasOwnProperty(id)) {
                        this._addError(element, `Duplicated translations for msg ${id}`);
                    }
                    else {
                        ml.visitAll(this, element.children, null);
                        if (typeof this._unitMlString === 'string') {
                            this._msgIdToHtml[id] = this._unitMlString;
                        }
                        else {
                            this._addError(element, `Message ${id} misses a translation`);
                        }
                    }
                }
                break;
            // ignore those tags
            case _SOURCE_TAG:
            case _SEGMENT_SOURCE_TAG:
            case _ALT_TRANS_TAG:
                break;
            case _TARGET_TAG:
                const innerTextStart = element.startSourceSpan.end.offset;
                const innerTextEnd = element.endSourceSpan.start.offset;
                const content = element.startSourceSpan.start.file.content;
                const innerText = content.slice(innerTextStart, innerTextEnd);
                this._unitMlString = innerText;
                break;
            case _FILE_TAG:
                const localeAttr = element.attrs.find((attr) => attr.name === 'target-language');
                if (localeAttr) {
                    this._locale = localeAttr.value;
                }
                ml.visitAll(this, element.children, null);
                break;
            default:
                // TODO(vicb): assert file structure, xliff version
                // For now only recurse on unhandled nodes
                ml.visitAll(this, element.children, null);
        }
    }
    visitAttribute(attribute, context) { }
    visitText(text, context) { }
    visitComment(comment, context) { }
    visitExpansion(expansion, context) { }
    visitExpansionCase(expansionCase, context) { }
    visitBlock(block, context) { }
    visitBlockParameter(parameter, context) { }
    visitLetDeclaration(decl, context) { }
    visitComponent(component, context) { }
    visitDirective(directive, context) { }
    _addError(node, message) {
        this._errors.push(new parse_util_1.I18nError(node.sourceSpan, message));
    }
}
// Convert ml nodes (xliff syntax) to i18n nodes
class XmlToI18n {
    convert(message, url) {
        const xmlIcu = new xml_parser_1.XmlParser().parse(message, url, { tokenizeExpansionForms: true });
        this._errors = xmlIcu.errors;
        const i18nNodes = this._errors.length > 0 || xmlIcu.rootNodes.length == 0
            ? []
            : [].concat(...ml.visitAll(this, xmlIcu.rootNodes));
        return {
            i18nNodes: i18nNodes,
            errors: this._errors,
        };
    }
    visitText(text, context) {
        return new i18n.Text(text.value, text.sourceSpan);
    }
    visitElement(el, context) {
        if (el.name === _PLACEHOLDER_TAG) {
            const nameAttr = el.attrs.find((attr) => attr.name === 'id');
            if (nameAttr) {
                return new i18n.Placeholder('', nameAttr.value, el.sourceSpan);
            }
            this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "id" attribute`);
            return null;
        }
        if (el.name === _MARKER_TAG) {
            return [].concat(...ml.visitAll(this, el.children));
        }
        this._addError(el, `Unexpected tag`);
        return null;
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
    visitComment(comment, context) { }
    visitAttribute(attribute, context) { }
    visitBlock(block, context) { }
    visitBlockParameter(parameter, context) { }
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
function getCtypeForTag(tag) {
    switch (tag.toLowerCase()) {
        case 'br':
            return 'lb';
        case 'img':
            return 'image';
        default:
            return `x-${tag}`;
    }
}
