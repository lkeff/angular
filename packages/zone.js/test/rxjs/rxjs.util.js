"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportFeature = supportFeature;
function supportFeature(Observable, method) {
    const func = function () {
        return !!Observable.prototype[method];
    };
    func.message = `Observable.${method} not support`;
}
