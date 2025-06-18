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
exports.getPropertyNameText = getPropertyNameText;
exports.hasPropertyNameText = hasPropertyNameText;
exports.findLiteralProperty = findLiteralProperty;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Gets the text of the given property name. Returns null if the property
 * name couldn't be determined statically.
 */
function getPropertyNameText(node) {
    if (typescript_1.default.isIdentifier(node) || typescript_1.default.isStringLiteralLike(node)) {
        return node.text;
    }
    return null;
}
/** Checks whether the given property name has a text. */
function hasPropertyNameText(node) {
    return typescript_1.default.isStringLiteral(node) || typescript_1.default.isNumericLiteral(node) || typescript_1.default.isIdentifier(node);
}
/** Finds a property with a specific name in an object literal expression. */
function findLiteralProperty(literal, name) {
    return literal.properties.find((prop) => prop.name && typescript_1.default.isIdentifier(prop.name) && prop.name.text === name);
}
