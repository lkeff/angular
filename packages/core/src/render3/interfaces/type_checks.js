"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLView = isLView;
exports.isLContainer = isLContainer;
exports.isContentQueryHost = isContentQueryHost;
exports.isComponentHost = isComponentHost;
exports.isDirectiveHost = isDirectiveHost;
exports.isComponentDef = isComponentDef;
exports.isRootView = isRootView;
exports.isProjectionTNode = isProjectionTNode;
exports.hasI18n = hasI18n;
exports.isDestroyed = isDestroyed;
const container_1 = require("./container");
const view_1 = require("./view");
/**
 * True if `value` is `LView`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function isLView(value) {
    return Array.isArray(value) && typeof value[container_1.TYPE] === 'object';
}
/**
 * True if `value` is `LContainer`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function isLContainer(value) {
    return Array.isArray(value) && value[container_1.TYPE] === true;
}
function isContentQueryHost(tNode) {
    return (tNode.flags & 4 /* TNodeFlags.hasContentQuery */) !== 0;
}
function isComponentHost(tNode) {
    return tNode.componentOffset > -1;
}
function isDirectiveHost(tNode) {
    return (tNode.flags & 1 /* TNodeFlags.isDirectiveHost */) === 1 /* TNodeFlags.isDirectiveHost */;
}
function isComponentDef(def) {
    return !!def.template;
}
function isRootView(target) {
    // Determines whether a given LView is marked as a root view.
    return (target[view_1.FLAGS] & 512 /* LViewFlags.IsRoot */) !== 0;
}
function isProjectionTNode(tNode) {
    return (tNode.type & 16 /* TNodeType.Projection */) === 16 /* TNodeType.Projection */;
}
function hasI18n(lView) {
    return (lView[view_1.FLAGS] & 32 /* LViewFlags.HasI18n */) === 32 /* LViewFlags.HasI18n */;
}
function isDestroyed(lView) {
    // Determines whether a given LView is marked as destroyed.
    return (lView[view_1.FLAGS] & 256 /* LViewFlags.Destroyed */) === 256 /* LViewFlags.Destroyed */;
}
