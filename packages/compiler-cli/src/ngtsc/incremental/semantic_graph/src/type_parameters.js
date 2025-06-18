"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSemanticTypeParameters = extractSemanticTypeParameters;
exports.areTypeParametersEqual = areTypeParametersEqual;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const util_1 = require("./util");
/**
 * Converts the type parameters of the given class into their semantic representation. If the class
 * does not have any type parameters, then `null` is returned.
 */
function extractSemanticTypeParameters(node) {
    if (!typescript_1.default.isClassDeclaration(node) || node.typeParameters === undefined) {
        return null;
    }
    return node.typeParameters.map((typeParam) => ({
        hasGenericTypeBound: typeParam.constraint !== undefined,
    }));
}
/**
 * Compares the list of type parameters to determine if they can be considered equal.
 */
function areTypeParametersEqual(current, previous) {
    // First compare all type parameters one-to-one; any differences mean that the list of type
    // parameters has changed.
    if (!(0, util_1.isArrayEqual)(current, previous, isTypeParameterEqual)) {
        return false;
    }
    // If there is a current list of type parameters and if any of them has a generic type constraint,
    // then the meaning of that type parameter may have changed without us being aware; as such we
    // have to assume that the type parameters have in fact changed.
    if (current !== null && current.some((typeParam) => typeParam.hasGenericTypeBound)) {
        return false;
    }
    return true;
}
function isTypeParameterEqual(a, b) {
    return a.hasGenericTypeBound === b.hasGenericTypeBound;
}
