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
exports.AmbientImport = exports.ClassMemberAccessLevel = exports.ClassMemberKind = void 0;
exports.isDecoratorIdentifier = isDecoratorIdentifier;
const typescript_1 = __importDefault(require("typescript"));
function isDecoratorIdentifier(exp) {
    return (typescript_1.default.isIdentifier(exp) ||
        (typescript_1.default.isPropertyAccessExpression(exp) &&
            typescript_1.default.isIdentifier(exp.expression) &&
            typescript_1.default.isIdentifier(exp.name)));
}
/**
 * An enumeration of possible kinds of class members.
 */
var ClassMemberKind;
(function (ClassMemberKind) {
    ClassMemberKind[ClassMemberKind["Constructor"] = 0] = "Constructor";
    ClassMemberKind[ClassMemberKind["Getter"] = 1] = "Getter";
    ClassMemberKind[ClassMemberKind["Setter"] = 2] = "Setter";
    ClassMemberKind[ClassMemberKind["Property"] = 3] = "Property";
    ClassMemberKind[ClassMemberKind["Method"] = 4] = "Method";
})(ClassMemberKind || (exports.ClassMemberKind = ClassMemberKind = {}));
/** Possible access levels of a class member. */
var ClassMemberAccessLevel;
(function (ClassMemberAccessLevel) {
    ClassMemberAccessLevel[ClassMemberAccessLevel["PublicWritable"] = 0] = "PublicWritable";
    ClassMemberAccessLevel[ClassMemberAccessLevel["PublicReadonly"] = 1] = "PublicReadonly";
    ClassMemberAccessLevel[ClassMemberAccessLevel["Protected"] = 2] = "Protected";
    ClassMemberAccessLevel[ClassMemberAccessLevel["Private"] = 3] = "Private";
    ClassMemberAccessLevel[ClassMemberAccessLevel["EcmaScriptPrivate"] = 4] = "EcmaScriptPrivate";
})(ClassMemberAccessLevel || (exports.ClassMemberAccessLevel = ClassMemberAccessLevel = {}));
/** Indicates that a declaration is referenced through an ambient type. */
exports.AmbientImport = {};
