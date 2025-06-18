"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRendererFactory = void 0;
const core_1 = require("../../../src/core");
class MockRendererFactory {
    constructor() {
        this.wasCalled = false;
    }
    createRenderer(hostElement, rendererType) {
        this.wasCalled = true;
        return new MockRenderer();
    }
}
exports.MockRendererFactory = MockRendererFactory;
class MockRenderer {
    constructor() {
        this.data = {};
        this.destroyNode = null;
    }
    destroy() { }
    createComment(value) {
        return document.createComment(value);
    }
    createElement(name, namespace) {
        return namespace
            ? document.createElementNS(namespace, name)
            : document.createElement(name);
    }
    createText(value) {
        return document.createTextNode(value);
    }
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        parent.insertBefore(newChild, refChild);
    }
    removeChild(_parent, oldChild) {
        oldChild.remove();
    }
    selectRootElement(selectorOrNode) {
        return typeof selectorOrNode === 'string'
            ? document.querySelector(selectorOrNode)
            : selectorOrNode;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        // set all synthetic attributes as properties
        if (name[0] === '@') {
            this.setProperty(el, name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) { }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & (core_1.RendererStyleFlags2.DashCase | core_1.RendererStyleFlags2.Important)) {
            el.style.setProperty(style, value, flags & core_1.RendererStyleFlags2.Important ? 'important' : '');
        }
        else {
            el.style.setProperty(style, value);
        }
    }
    removeStyle(el, style, flags) {
        el.style.removeProperty(style);
    }
    setProperty(el, name, value) {
        el[name] = value;
    }
    setValue(node, value) {
        node.textContent = value;
    }
    // TODO: Deprecate in favor of addEventListener/removeEventListener
    listen(target, eventName, callback) {
        return () => { };
    }
}
