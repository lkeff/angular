"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextNode = createTextNode;
exports.updateTextNode = updateTextNode;
exports.createCommentNode = createCommentNode;
exports.createElementNode = createElementNode;
exports.nativeInsertBefore = nativeInsertBefore;
exports.nativeAppendChild = nativeAppendChild;
exports.nativeAppendOrInsertBefore = nativeAppendOrInsertBefore;
exports.nativeRemoveNode = nativeRemoveNode;
exports.clearElementContents = clearElementContents;
exports.setupStaticAttributes = setupStaticAttributes;
const dom_1 = require("../util/dom");
const assert_1 = require("../util/assert");
const attrs_utils_1 = require("./util/attrs_utils");
function createTextNode(renderer, value) {
    return renderer.createText(value);
}
function updateTextNode(renderer, rNode, value) {
    renderer.setValue(rNode, value);
}
function createCommentNode(renderer, value) {
    return renderer.createComment((0, dom_1.escapeCommentText)(value));
}
/**
 * Creates a native element from a tag name, using a renderer.
 * @param renderer A renderer to use
 * @param name the tag name
 * @param namespace Optional namespace for element.
 * @returns the element created
 */
function createElementNode(renderer, name, namespace) {
    return renderer.createElement(name, namespace);
}
/**
 * Inserts a native node before another native node for a given parent.
 * This is a utility function that can be used when native nodes were determined.
 */
function nativeInsertBefore(renderer, parent, child, beforeNode, isMove) {
    renderer.insertBefore(parent, child, beforeNode, isMove);
}
function nativeAppendChild(renderer, parent, child) {
    ngDevMode && (0, assert_1.assertDefined)(parent, 'parent node must be defined');
    renderer.appendChild(parent, child);
}
function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode, isMove) {
    if (beforeNode !== null) {
        nativeInsertBefore(renderer, parent, child, beforeNode, isMove);
    }
    else {
        nativeAppendChild(renderer, parent, child);
    }
}
/**
 * Removes a native node itself using a given renderer. To remove the node we are looking up its
 * parent from the native tree as not all platforms / browsers support the equivalent of
 * node.remove().
 *
 * @param renderer A renderer to be used
 * @param rNode The native node that should be removed
 * @param isHostElement A flag indicating if a node to be removed is a host of a component.
 */
function nativeRemoveNode(renderer, rNode, isHostElement) {
    renderer.removeChild(null, rNode, isHostElement);
}
/**
 * Clears the contents of a given RElement.
 *
 * @param rElement the native RElement to be cleared
 */
function clearElementContents(rElement) {
    rElement.textContent = '';
}
/**
 * Write `cssText` to `RElement`.
 *
 * This function does direct write without any reconciliation. Used for writing initial values, so
 * that static styling values do not pull in the style parser.
 *
 * @param renderer Renderer to use
 * @param element The element which needs to be updated.
 * @param newValue The new class list to write.
 */
function writeDirectStyle(renderer, element, newValue) {
    ngDevMode && (0, assert_1.assertString)(newValue, "'newValue' should be a string");
    renderer.setAttribute(element, 'style', newValue);
}
/**
 * Write `className` to `RElement`.
 *
 * This function does direct write without any reconciliation. Used for writing initial values, so
 * that static styling values do not pull in the style parser.
 *
 * @param renderer Renderer to use
 * @param element The element which needs to be updated.
 * @param newValue The new class list to write.
 */
function writeDirectClass(renderer, element, newValue) {
    ngDevMode && (0, assert_1.assertString)(newValue, "'newValue' should be a string");
    if (newValue === '') {
        // There are tests in `google3` which expect `element.getAttribute('class')` to be `null`.
        renderer.removeAttribute(element, 'class');
    }
    else {
        renderer.setAttribute(element, 'class', newValue);
    }
}
/** Sets up the static DOM attributes on an `RNode`. */
function setupStaticAttributes(renderer, element, tNode) {
    const { mergedAttrs, classes, styles } = tNode;
    if (mergedAttrs !== null) {
        (0, attrs_utils_1.setUpAttributes)(renderer, element, mergedAttrs);
    }
    if (classes !== null) {
        writeDirectClass(renderer, element, classes);
    }
    if (styles !== null) {
        writeDirectStyle(renderer, element, styles);
    }
}
