"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDocument = exports.MockScriptElement = void 0;
class MockScriptElement {
    constructor(ownerDocument) {
        this.ownerDocument = ownerDocument;
        this.listeners = {};
    }
    addEventListener(event, handler) {
        this.listeners[event] = handler;
    }
    removeEventListener(event) {
        delete this.listeners[event];
    }
    remove() {
        this.ownerDocument.removeNode(this);
    }
}
exports.MockScriptElement = MockScriptElement;
class MockDocument {
    constructor() {
        this.body = this;
        this.implementation = {
            createHTMLDocument: () => new MockDocument(),
        };
    }
    createElement(tag) {
        return new MockScriptElement(this);
    }
    appendChild(node) {
        this.mock = node;
    }
    removeNode(node) {
        if (this.mock === node) {
            this.mock = null;
        }
    }
    adoptNode(node) {
        node.ownerDocument = this;
    }
    mockLoad() {
        // Mimic behavior described by
        // https://html.spec.whatwg.org/multipage/scripting.html#execute-the-script-block
        if (this.mock.ownerDocument === this) {
            this.mock.listeners.load(null);
        }
    }
    mockError(err) {
        // Mimic behavior described by
        // https://html.spec.whatwg.org/multipage/scripting.html#execute-the-script-block
        if (this.mock.ownerDocument === this) {
            this.mock.listeners.error(err);
        }
    }
}
exports.MockDocument = MockDocument;
