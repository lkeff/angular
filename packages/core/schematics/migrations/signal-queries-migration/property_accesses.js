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
exports.checkTsReferenceAccessesField = checkTsReferenceAccessesField;
exports.checkNonTsReferenceAccessesField = checkNonTsReferenceAccessesField;
exports.checkTsReferenceCallsField = checkTsReferenceCallsField;
exports.checkNonTsReferenceCallsField = checkNonTsReferenceCallsField;
const typescript_1 = __importDefault(require("typescript"));
const traverse_access_1 = require("../signal-migration/src/utils/traverse_access");
const compiler_1 = require("@angular/compiler");
/**
 * Gets whether the given field is accessed via the
 * given reference.
 *
 * E.g. whether `<my-read>.toArray` is detected.
 */
function checkTsReferenceAccessesField(ref, fieldName) {
    const accessNode = (0, traverse_access_1.traverseAccess)(ref.from.node);
    // Check if the reference is part of a property access.
    if (!typescript_1.default.isPropertyAccessExpression(accessNode.parent) ||
        !typescript_1.default.isIdentifier(accessNode.parent.name)) {
        return null;
    }
    // Check if the reference is refers to the given field name.
    if (accessNode.parent.name.text !== fieldName) {
        return null;
    }
    return accessNode.parent;
}
/**
 * Gets whether the given read is used to access
 * the specified field.
 *
 * E.g. whether `<my-read>.toArray` is detected.
 */
function checkNonTsReferenceAccessesField(ref, fieldName) {
    const readFromPath = ref.from.readAstPath.at(-1);
    const parentRead = ref.from.readAstPath.at(-2);
    if (ref.from.read !== readFromPath) {
        return null;
    }
    if (!(parentRead instanceof compiler_1.PropertyRead) || parentRead.name !== fieldName) {
        return null;
    }
    return parentRead;
}
/**
 * Gets whether the given reference is accessed to call the
 * specified function on it.
 *
 * E.g. whether `<my-read>.toArray()` is detected.
 */
function checkTsReferenceCallsField(ref, fieldName) {
    const propertyAccess = checkTsReferenceAccessesField(ref, fieldName);
    if (propertyAccess === null) {
        return null;
    }
    if (typescript_1.default.isCallExpression(propertyAccess.parent) &&
        propertyAccess.parent.expression === propertyAccess) {
        return propertyAccess.parent;
    }
    return null;
}
/**
 * Gets whether the given reference is accessed to call the
 * specified function on it.
 *
 * E.g. whether `<my-read>.toArray()` is detected.
 */
function checkNonTsReferenceCallsField(ref, fieldName) {
    const propertyAccess = checkNonTsReferenceAccessesField(ref, fieldName);
    if (propertyAccess === null) {
        return null;
    }
    const accessIdx = ref.from.readAstPath.indexOf(propertyAccess);
    if (accessIdx === -1) {
        return null;
    }
    const potentialCall = ref.from.readAstPath[accessIdx - 1];
    if (potentialCall === undefined || !(potentialCall instanceof compiler_1.Call)) {
        return null;
    }
    return potentialCall;
}
