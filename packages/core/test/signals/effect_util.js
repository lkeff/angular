"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingEffect = testingEffect;
exports.flushEffects = flushEffects;
exports.resetEffects = resetEffects;
const signals_1 = require("../../primitives/signals");
let queue = new Set();
/**
 * A wrapper around `Watch` that emulates the `effect` API and allows for more streamlined testing.
 */
function testingEffect(effectFn) {
    const w = (0, signals_1.createWatch)(effectFn, queue.add.bind(queue), true);
    // Effects start dirty.
    w.notify();
    return () => {
        queue.delete(w);
        w.destroy();
    };
}
function flushEffects() {
    for (const watch of queue) {
        queue.delete(watch);
        watch.run();
    }
}
function resetEffects() {
    queue.clear();
}
