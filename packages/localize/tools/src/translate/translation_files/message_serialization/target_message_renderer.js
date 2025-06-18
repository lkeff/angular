"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetMessageRenderer = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const index_1 = require("../../../../../index");
/**
 * A message renderer that outputs `ɵParsedTranslation` objects.
 */
class TargetMessageRenderer {
    constructor() {
        this.current = { messageParts: [], placeholderNames: [], text: '' };
        this.icuDepth = 0;
    }
    get message() {
        const { messageParts, placeholderNames } = this.current;
        return (0, index_1.ɵmakeParsedTranslation)(messageParts, placeholderNames);
    }
    startRender() { }
    endRender() {
        this.storeMessagePart();
    }
    text(text) {
        this.current.text += text;
    }
    placeholder(name, body) {
        this.renderPlaceholder(name);
    }
    startPlaceholder(name) {
        this.renderPlaceholder(name);
    }
    closePlaceholder(name) {
        this.renderPlaceholder(name);
    }
    startContainer() { }
    closeContainer() { }
    startIcu() {
        this.icuDepth++;
        this.text('{');
    }
    endIcu() {
        this.icuDepth--;
        this.text('}');
    }
    normalizePlaceholderName(name) {
        return name.replace(/-/g, '_');
    }
    renderPlaceholder(name) {
        name = this.normalizePlaceholderName(name);
        if (this.icuDepth > 0) {
            this.text(`{${name}}`);
        }
        else {
            this.storeMessagePart();
            this.current.placeholderNames.push(name);
        }
    }
    storeMessagePart() {
        this.current.messageParts.push(this.current.text);
        this.current.text = '';
    }
}
exports.TargetMessageRenderer = TargetMessageRenderer;
