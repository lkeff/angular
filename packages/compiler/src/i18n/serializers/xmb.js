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
exports.Xmb = void 0;
exports.digest = digest;
exports.toPublicName = toPublicName;
const digest_1 = require("../digest");
const serializer_1 = require("./serializer");
const xml = __importStar(require("./xml_helper"));
/**
 * Defines the `handler` value on the serialized XMB, indicating that Angular
 * generated the bundle. This is useful for analytics in Translation Console.
 *
 * NOTE: Keep in sync with
 * packages/localize/tools/src/extract/translation_files/xmb_translation_serializer.ts.
 */
const _XMB_HANDLER = 'angular';
const _MESSAGES_TAG = 'messagebundle';
const _MESSAGE_TAG = 'msg';
const _PLACEHOLDER_TAG = 'ph';
const _EXAMPLE_TAG = 'ex';
const _SOURCE_TAG = 'source';
const _DOCTYPE = `<!ELEMENT messagebundle (msg)*>
<!ATTLIST messagebundle class CDATA #IMPLIED>

<!ELEMENT msg (#PCDATA|ph|source)*>
<!ATTLIST msg id CDATA #IMPLIED>
<!ATTLIST msg seq CDATA #IMPLIED>
<!ATTLIST msg name CDATA #IMPLIED>
<!ATTLIST msg desc CDATA #IMPLIED>
<!ATTLIST msg meaning CDATA #IMPLIED>
<!ATTLIST msg obsolete (obsolete) #IMPLIED>
<!ATTLIST msg xml:space (default|preserve) "default">
<!ATTLIST msg is_hidden CDATA #IMPLIED>

<!ELEMENT source (#PCDATA)>

<!ELEMENT ph (#PCDATA|ex)*>
<!ATTLIST ph name CDATA #REQUIRED>

<!ELEMENT ex (#PCDATA)>`;
class Xmb extends serializer_1.Serializer {
    write(messages, locale) {
        const exampleVisitor = new ExampleVisitor();
        const visitor = new _Visitor();
        const rootNode = new xml.Tag(_MESSAGES_TAG);
        rootNode.attrs['handler'] = _XMB_HANDLER;
        messages.forEach((message) => {
            const attrs = { id: message.id };
            if (message.description) {
                attrs['desc'] = message.description;
            }
            if (message.meaning) {
                attrs['meaning'] = message.meaning;
            }
            let sourceTags = [];
            message.sources.forEach((source) => {
                sourceTags.push(new xml.Tag(_SOURCE_TAG, {}, [
                    new xml.Text(`${source.filePath}:${source.startLine}${source.endLine !== source.startLine ? ',' + source.endLine : ''}`),
                ]));
            });
            rootNode.children.push(new xml.CR(2), new xml.Tag(_MESSAGE_TAG, attrs, [...sourceTags, ...visitor.serialize(message.nodes)]));
        });
        rootNode.children.push(new xml.CR());
        return xml.serialize([
            new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }),
            new xml.CR(),
            new xml.Doctype(_MESSAGES_TAG, _DOCTYPE),
            new xml.CR(),
            exampleVisitor.addDefaultExamples(rootNode),
            new xml.CR(),
        ]);
    }
    load(content, url) {
        throw new Error('Unsupported');
    }
    digest(message) {
        return digest(message);
    }
    createNameMapper(message) {
        return new serializer_1.SimplePlaceholderMapper(message, toPublicName);
    }
}
exports.Xmb = Xmb;
class _Visitor {
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
        const startTagAsText = new xml.Text(`<${ph.tag}>`);
        const startEx = new xml.Tag(_EXAMPLE_TAG, {}, [startTagAsText]);
        // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
        const startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.startName }, [
            startEx,
            startTagAsText,
        ]);
        if (ph.isVoid) {
            // void tags have no children nor closing tags
            return [startTagPh];
        }
        const closeTagAsText = new xml.Text(`</${ph.tag}>`);
        const closeEx = new xml.Tag(_EXAMPLE_TAG, {}, [closeTagAsText]);
        // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
        const closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.closeName }, [
            closeEx,
            closeTagAsText,
        ]);
        return [startTagPh, ...this.serialize(ph.children), closeTagPh];
    }
    visitPlaceholder(ph, context) {
        const interpolationAsText = new xml.Text(`{{${ph.value}}}`);
        // Example tag needs to be not-empty for TC.
        const exTag = new xml.Tag(_EXAMPLE_TAG, {}, [interpolationAsText]);
        return [
            // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
            new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name }, [exTag, interpolationAsText]),
        ];
    }
    visitBlockPlaceholder(ph, context) {
        const startAsText = new xml.Text(`@${ph.name}`);
        const startEx = new xml.Tag(_EXAMPLE_TAG, {}, [startAsText]);
        // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
        const startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.startName }, [startEx, startAsText]);
        const closeAsText = new xml.Text(`}`);
        const closeEx = new xml.Tag(_EXAMPLE_TAG, {}, [closeAsText]);
        // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
        const closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.closeName }, [closeEx, closeAsText]);
        return [startTagPh, ...this.serialize(ph.children), closeTagPh];
    }
    visitIcuPlaceholder(ph, context) {
        const icuExpression = ph.value.expression;
        const icuType = ph.value.type;
        const icuCases = Object.keys(ph.value.cases)
            .map((value) => value + ' {...}')
            .join(' ');
        const icuAsText = new xml.Text(`{${icuExpression}, ${icuType}, ${icuCases}}`);
        const exTag = new xml.Tag(_EXAMPLE_TAG, {}, [icuAsText]);
        return [
            // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
            new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name }, [exTag, icuAsText]),
        ];
    }
    serialize(nodes) {
        return [].concat(...nodes.map((node) => node.visit(this)));
    }
}
function digest(message) {
    return (0, digest_1.decimalDigest)(message);
}
// TC requires at least one non-empty example on placeholders
class ExampleVisitor {
    addDefaultExamples(node) {
        node.visit(this);
        return node;
    }
    visitTag(tag) {
        if (tag.name === _PLACEHOLDER_TAG) {
            if (!tag.children || tag.children.length == 0) {
                const exText = new xml.Text(tag.attrs['name'] || '...');
                tag.children = [new xml.Tag(_EXAMPLE_TAG, {}, [exText])];
            }
        }
        else if (tag.children) {
            tag.children.forEach((node) => node.visit(this));
        }
    }
    visitText(text) { }
    visitDeclaration(decl) { }
    visitDoctype(doctype) { }
}
// XMB/XTB placeholders can only contain A-Z, 0-9 and _
function toPublicName(internalName) {
    return internalName.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
}
