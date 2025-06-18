"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOOP_PERF_RECORDER = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const api_1 = require("./api");
class NoopPerfRecorder {
    eventCount() { }
    memory() { }
    phase() {
        return api_1.PerfPhase.Unaccounted;
    }
    inPhase(phase, fn) {
        return fn();
    }
    reset() { }
}
exports.NOOP_PERF_RECORDER = new NoopPerfRecorder();
