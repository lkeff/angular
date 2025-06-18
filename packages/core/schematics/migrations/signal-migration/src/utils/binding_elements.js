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
exports.resolveBindingElement = resolveBindingElement;
exports.getBindingElementDeclaration = getBindingElementDeclaration;
const typescript_1 = __importDefault(require("typescript"));
/** Gets the pattern and property name for a given binding element. */
function resolveBindingElement(node) {
    var _a;
    const name = (_a = node.propertyName) !== null && _a !== void 0 ? _a : node.name;
    // If we are discovering a non-analyzable element in the path, abort.
    if (!typescript_1.default.isStringLiteralLike(name) && !typescript_1.default.isIdentifier(name)) {
        return null;
    }
    return {
        pattern: node.parent,
        propertyName: name.text,
    };
}
/** Gets the declaration node of the given binding element. */
function getBindingElementDeclaration(node) {
    while (true) {
        if (typescript_1.default.isBindingElement(node.parent.parent)) {
            node = node.parent.parent;
        }
        else {
            return node.parent.parent;
        }
    }
}
