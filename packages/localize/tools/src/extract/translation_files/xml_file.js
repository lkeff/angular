"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlFile = void 0;
class XmlFile {
    constructor() {
        this.output = '<?xml version="1.0" encoding="UTF-8" ?>\n';
        this.indent = '';
        this.elements = [];
        this.preservingWhitespace = false;
    }
    toString() {
        return this.output;
    }
    startTag(name, attributes = {}, { selfClosing = false, preserveWhitespace } = {}) {
        if (!this.preservingWhitespace) {
            this.output += this.indent;
        }
        this.output += `<${name}`;
        for (const [attrName, attrValue] of Object.entries(attributes)) {
            if (attrValue) {
                this.output += ` ${attrName}="${escapeXml(attrValue)}"`;
            }
        }
        if (selfClosing) {
            this.output += '/>';
        }
        else {
            this.output += '>';
            this.elements.push(name);
            this.incIndent();
        }
        if (preserveWhitespace !== undefined) {
            this.preservingWhitespace = preserveWhitespace;
        }
        if (!this.preservingWhitespace) {
            this.output += `\n`;
        }
        return this;
    }
    endTag(name, { preserveWhitespace } = {}) {
        const expectedTag = this.elements.pop();
        if (expectedTag !== name) {
            throw new Error(`Unexpected closing tag: "${name}", expected: "${expectedTag}"`);
        }
        this.decIndent();
        if (!this.preservingWhitespace) {
            this.output += this.indent;
        }
        this.output += `</${name}>`;
        if (preserveWhitespace !== undefined) {
            this.preservingWhitespace = preserveWhitespace;
        }
        if (!this.preservingWhitespace) {
            this.output += `\n`;
        }
        return this;
    }
    text(str) {
        this.output += escapeXml(str);
        return this;
    }
    rawText(str) {
        this.output += str;
        return this;
    }
    incIndent() {
        this.indent = this.indent + '  ';
    }
    decIndent() {
        this.indent = this.indent.slice(0, -2);
    }
}
exports.XmlFile = XmlFile;
const _ESCAPED_CHARS = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;'],
];
function escapeXml(text) {
    return _ESCAPED_CHARS.reduce((text, entry) => text.replace(entry[0], entry[1]), text);
}
