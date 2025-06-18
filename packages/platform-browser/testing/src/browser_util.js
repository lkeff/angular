"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchEvent = dispatchEvent;
exports.createMouseEvent = createMouseEvent;
exports.el = el;
exports.stringifyElement = stringifyElement;
exports.createNgZone = createNgZone;
exports.isCommentNode = isCommentNode;
exports.isTextNode = isTextNode;
exports.getContent = getContent;
exports.templateAwareRoot = templateAwareRoot;
exports.setCookie = setCookie;
exports.hasStyle = hasStyle;
exports.hasClass = hasClass;
exports.sortedClassList = sortedClassList;
exports.createTemplate = createTemplate;
exports.childNodesAsList = childNodesAsList;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
function dispatchEvent(element, eventType) {
    const evt = (0, common_1.ɵgetDOM)().getDefaultDocument().createEvent('Event');
    evt.initEvent(eventType, true, true);
    (0, common_1.ɵgetDOM)().dispatchEvent(element, evt);
    return evt;
}
function createMouseEvent(eventType) {
    const evt = (0, common_1.ɵgetDOM)().getDefaultDocument().createEvent('MouseEvent');
    evt.initEvent(eventType, true, true);
    return evt;
}
function el(html) {
    return getContent(createTemplate(html)).firstChild;
}
function getAttributeMap(element) {
    const res = new Map();
    const elAttrs = element.attributes;
    for (let i = 0; i < elAttrs.length; i++) {
        const attrib = elAttrs.item(i);
        res.set(attrib.name, attrib.value);
    }
    return res;
}
const _selfClosingTags = ['br', 'hr', 'input'];
function stringifyElement(el) {
    let result = '';
    if ((0, common_1.ɵgetDOM)().isElementNode(el)) {
        const tagName = el.tagName.toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        const attributeMap = getAttributeMap(el);
        const sortedKeys = Array.from(attributeMap.keys()).sort();
        for (const key of sortedKeys) {
            const lowerCaseKey = key.toLowerCase();
            let attValue = attributeMap.get(key);
            if (typeof attValue !== 'string') {
                result += ` ${lowerCaseKey}`;
            }
            else {
                // Browsers order style rules differently. Order them alphabetically for consistency.
                if (lowerCaseKey === 'style') {
                    attValue = attValue
                        .split(/; ?/)
                        .filter((s) => !!s)
                        .sort()
                        .map((s) => `${s};`)
                        .join(' ');
                }
                result += ` ${lowerCaseKey}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        const childrenRoot = templateAwareRoot(el);
        const children = childrenRoot ? childrenRoot.childNodes : [];
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_selfClosingTags.indexOf(tagName) == -1) {
            result += `</${tagName}>`;
        }
    }
    else if (isCommentNode(el)) {
        result += `<!--${el.nodeValue}-->`;
    }
    else {
        result += el.textContent;
    }
    return result;
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: true, shouldCoalesceEventChangeDetection: false });
}
function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
function getContent(node) {
    if ('content' in node) {
        return node.content;
    }
    else {
        return node;
    }
}
function templateAwareRoot(el) {
    return (0, common_1.ɵgetDOM)().isElementNode(el) && el.nodeName === 'TEMPLATE' ? getContent(el) : el;
}
function setCookie(name, value) {
    // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
    // not clear other cookies.
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
function hasStyle(element, styleName, styleValue) {
    const value = element.style[styleName] || '';
    return styleValue ? value == styleValue : value.length > 0;
}
function hasClass(element, className) {
    return element.classList.contains(className);
}
function sortedClassList(element) {
    return Array.prototype.slice.call(element.classList, 0).sort();
}
function createTemplate(html) {
    const t = (0, common_1.ɵgetDOM)().getDefaultDocument().createElement('template');
    t.innerHTML = html;
    return t;
}
function childNodesAsList(el) {
    const childNodes = el.childNodes;
    const res = [];
    for (let i = 0; i < childNodes.length; i++) {
        res[i] = childNodes[i];
    }
    return res;
}
