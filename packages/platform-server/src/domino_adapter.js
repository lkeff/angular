"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DominoAdapter = void 0;
exports.setDomTypes = setDomTypes;
exports.parseDocument = parseDocument;
exports.serializeDocument = serializeDocument;
const common_1 = require("@angular/common");
const platform_browser_1 = require("@angular/platform-browser");
const bundled_domino_1 = __importDefault(require("./bundled-domino"));
function setDomTypes() {
    // Make all Domino types available in the global env.
    // NB: Any changes here should also be done in `packages/platform-server/init/src/shims.ts`.
    Object.assign(globalThis, bundled_domino_1.default.impl);
    globalThis['KeyboardEvent'] = bundled_domino_1.default.impl.Event;
}
/**
 * Parses a document string to a Document object.
 */
function parseDocument(html, url = '/') {
    let window = bundled_domino_1.default.createWindow(html, url);
    let doc = window.document;
    return doc;
}
/**
 * Serializes a document to string.
 */
function serializeDocument(doc) {
    return doc.serialize();
}
/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
class DominoAdapter extends platform_browser_1.ɵBrowserDomAdapter {
    constructor() {
        super(...arguments);
        this.supportsDOMEvents = false;
    }
    static makeCurrent() {
        setDomTypes();
        (0, common_1.ɵsetRootDomAdapter)(new DominoAdapter());
    }
    createHtmlDocument() {
        return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
    }
    getDefaultDocument() {
        if (!DominoAdapter.defaultDoc) {
            DominoAdapter.defaultDoc = bundled_domino_1.default.createDocument();
        }
        return DominoAdapter.defaultDoc;
    }
    isElementNode(node) {
        return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
    }
    isShadowRoot(node) {
        return node.shadowRoot == node;
    }
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return doc.defaultView;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    getBaseHref(doc) {
        var _a;
        // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
        return ((_a = doc.documentElement.querySelector('base')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
        // Dispatch the event to the window also.
        const doc = el.ownerDocument || el;
        const win = doc.defaultView;
        if (win) {
            win.dispatchEvent(evt);
        }
    }
    getUserAgent() {
        return 'Fake user agent';
    }
    getCookie(name) {
        throw new Error('getCookie has not been implemented');
    }
}
exports.DominoAdapter = DominoAdapter;
