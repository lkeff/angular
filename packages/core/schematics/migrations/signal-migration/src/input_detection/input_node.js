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
exports.isInputContainerNode = isInputContainerNode;
const typescript_1 = __importDefault(require("typescript"));
const class_member_names_1 = require("../utils/class_member_names");
/** Checks whether the given node can be an `@Input()` declaration node. */
function isInputContainerNode(node) {
    return (((typescript_1.default.isAccessor(node) && typescript_1.default.isClassDeclaration(node.parent)) ||
        typescript_1.default.isPropertyDeclaration(node)) &&
        (0, class_member_names_1.getMemberName)(node) !== null);
}
