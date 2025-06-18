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
exports.isNamedClassDeclaration = isNamedClassDeclaration;
exports.isNamedFunctionDeclaration = isNamedFunctionDeclaration;
exports.isNamedVariableDeclaration = isNamedVariableDeclaration;
exports.classMemberAccessLevelToString = classMemberAccessLevelToString;
const typescript_1 = __importDefault(require("typescript"));
const host_1 = require("./host");
function isNamedClassDeclaration(node) {
    return typescript_1.default.isClassDeclaration(node) && isIdentifier(node.name);
}
function isNamedFunctionDeclaration(node) {
    return typescript_1.default.isFunctionDeclaration(node) && isIdentifier(node.name);
}
function isNamedVariableDeclaration(node) {
    return typescript_1.default.isVariableDeclaration(node) && isIdentifier(node.name);
}
function isIdentifier(node) {
    return node !== undefined && typescript_1.default.isIdentifier(node);
}
/**
 * Converts the given class member access level to a string.
 * Useful fo error messages.
 */
function classMemberAccessLevelToString(level) {
    switch (level) {
        case host_1.ClassMemberAccessLevel.EcmaScriptPrivate:
            return 'ES private';
        case host_1.ClassMemberAccessLevel.Private:
            return 'private';
        case host_1.ClassMemberAccessLevel.Protected:
            return 'protected';
        case host_1.ClassMemberAccessLevel.PublicReadonly:
            return 'public readonly';
        case host_1.ClassMemberAccessLevel.PublicWritable:
        default:
            return 'public';
    }
}
