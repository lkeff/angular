"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mark = mark;
exports.timeSinceInMicros = timeSinceInMicros;
/// <reference types="node" />
function mark() {
    return process.hrtime();
}
function timeSinceInMicros(mark) {
    const delta = process.hrtime(mark);
    return delta[0] * 1000000 + Math.floor(delta[1] / 1000);
}
