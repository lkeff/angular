"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchQueueMicrotask = patchQueueMicrotask;
function patchQueueMicrotask(global, api) {
    api.patchMethod(global, 'queueMicrotask', (delegate) => {
        return function (self, args) {
            Zone.current.scheduleMicroTask('queueMicrotask', args[0]);
        };
    });
}
