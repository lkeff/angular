"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = isPromise;
exports.isSubscribable = isSubscribable;
/**
 * Determine if the argument is shaped like a Promise
 */
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is a Subscribable
 */
function isSubscribable(obj) {
    return !!obj && typeof obj.subscribe === 'function';
}
