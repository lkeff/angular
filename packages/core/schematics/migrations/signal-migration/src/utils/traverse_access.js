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
exports.traverseAccess = traverseAccess;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Expands the given reference to its containing expression, capturing
 * the full context.
 *
 * E.g. `traverseAccess(ref<`bla`>)` may return `this.bla`
 *   or `traverseAccess(ref<`bla`>)` may return `this.someObj.a.b.c.bla`.
 *
 * This helper is useful as we will replace the full access with a temporary
 * variable for narrowing. Replacing just the identifier is wrong.
 */
function traverseAccess(access) {
    if (typescript_1.default.isPropertyAccessExpression(access.parent) && access.parent.name === access) {
        return access.parent;
    }
    else if (typescript_1.default.isElementAccessExpression(access.parent) &&
        access.parent.argumentExpression === access) {
        return access.parent;
    }
    return access;
}
