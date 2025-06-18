"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.NOT_FOUND = void 0;
exports.isNotFound = isNotFound;
/**
 * Value returned if the key-value pair couldn't be found in the context
 * hierarchy.
 */
exports.NOT_FOUND = Symbol('NotFound');
/**
 * Error thrown when the key-value pair couldn't be found in the context
 * hierarchy. Context can be attached below.
 */
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ɵNotFound';
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Type guard for checking if an unknown value is a NotFound.
 */
function isNotFound(e) {
    return e === exports.NOT_FOUND || (e === null || e === void 0 ? void 0 : e.name) === 'ɵNotFound';
}
