"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = isFunction;
exports.isBoolean = isBoolean;
exports.isCanLoad = isCanLoad;
exports.isCanActivate = isCanActivate;
exports.isCanActivateChild = isCanActivateChild;
exports.isCanDeactivate = isCanDeactivate;
exports.isCanMatch = isCanMatch;
exports.isEmptyError = isEmptyError;
const rxjs_1 = require("rxjs");
/**
 * Simple function check, but generic so type inference will flow. Example:
 *
 * function product(a: number, b: number) {
 *   return a * b;
 * }
 *
 * if (isFunction<product>(fn)) {
 *   return fn(1, 2);
 * } else {
 *   throw "Must provide the `product` function";
 * }
 */
function isFunction(v) {
    return typeof v === 'function';
}
function isBoolean(v) {
    return typeof v === 'boolean';
}
function isCanLoad(guard) {
    return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
    return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
    return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
    return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
    return guard && isFunction(guard.canMatch);
}
function isEmptyError(e) {
    return e instanceof rxjs_1.EmptyError || (e === null || e === void 0 ? void 0 : e.name) === 'EmptyError';
}
