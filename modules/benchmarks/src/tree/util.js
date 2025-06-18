"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyTree = exports.TreeNode = void 0;
exports.getMaxDepth = getMaxDepth;
exports.initTreeUtils = initTreeUtils;
exports.buildTree = buildTree;
exports.flattenTree = flattenTree;
exports.newArray = newArray;
const util_1 = require("../util");
class TreeNode {
    constructor(value, depth, maxDepth, left, right) {
        this.value = value;
        this.depth = depth;
        this.maxDepth = maxDepth;
        this.left = left;
        this.right = right;
        this.transitiveChildCount = Math.pow(2, this.maxDepth - this.depth + 1) - 1;
        this.children = this.left ? [this.left, this.right] : [];
    }
    // Needed for Polymer as it does not support ternary nor modulo operator
    // in expressions
    get style() {
        return this.depth % 2 === 0 ? 'background-color: grey' : '';
    }
}
exports.TreeNode = TreeNode;
let treeCreateCount;
let maxDepth;
let numberData;
let charData;
function getMaxDepth() {
    return maxDepth;
}
function initTreeUtils() {
    maxDepth = (0, util_1.getIntParameter)('depth');
    treeCreateCount = 0;
    numberData = _buildTree(0, numberValues);
    charData = _buildTree(0, charValues);
}
function _buildTree(currDepth, valueFn) {
    const children = currDepth < maxDepth ? _buildTree(currDepth + 1, valueFn) : null;
    return new TreeNode(valueFn(currDepth), currDepth, maxDepth, children, children);
}
exports.emptyTree = new TreeNode('', 0, 0, null, null);
function buildTree() {
    treeCreateCount++;
    return treeCreateCount % 2 ? numberData : charData;
}
function numberValues(depth) {
    return depth.toString();
}
function charValues(depth) {
    return String.fromCharCode('A'.charCodeAt(0) + (depth % 26));
}
function flattenTree(node, target = []) {
    target.push(node);
    if (node.left) {
        flattenTree(node.left, target);
    }
    if (node.right) {
        flattenTree(node.right, target);
    }
    return target;
}
function newArray(size, value) {
    const list = [];
    for (let i = 0; i < size; i++) {
        list.push(value);
    }
    return list;
}
