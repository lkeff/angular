"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegatingPerfRecorder = exports.ActivePerfRecorder = void 0;
const api_1 = require("./api");
const clock_1 = require("./clock");
/**
 * A `PerfRecorder` that actively tracks performance statistics.
 */
class ActivePerfRecorder {
    /**
     * Creates an `ActivePerfRecorder` with its zero point set to the current time.
     */
    static zeroedToNow() {
        return new ActivePerfRecorder((0, clock_1.mark)());
    }
    constructor(zeroTime) {
        this.zeroTime = zeroTime;
        this.currentPhase = api_1.PerfPhase.Unaccounted;
        this.currentPhaseEntered = this.zeroTime;
        this.counters = Array(api_1.PerfEvent.LAST).fill(0);
        this.phaseTime = Array(api_1.PerfPhase.LAST).fill(0);
        this.bytes = Array(api_1.PerfCheckpoint.LAST).fill(0);
        // Take an initial memory snapshot before any other compilation work begins.
        this.memory(api_1.PerfCheckpoint.Initial);
    }
    reset() {
        this.counters = Array(api_1.PerfEvent.LAST).fill(0);
        this.phaseTime = Array(api_1.PerfPhase.LAST).fill(0);
        this.bytes = Array(api_1.PerfCheckpoint.LAST).fill(0);
        this.zeroTime = (0, clock_1.mark)();
        this.currentPhase = api_1.PerfPhase.Unaccounted;
        this.currentPhaseEntered = this.zeroTime;
    }
    memory(after) {
        this.bytes[after] = process.memoryUsage().heapUsed;
    }
    phase(phase) {
        const previous = this.currentPhase;
        this.phaseTime[this.currentPhase] += (0, clock_1.timeSinceInMicros)(this.currentPhaseEntered);
        this.currentPhase = phase;
        this.currentPhaseEntered = (0, clock_1.mark)();
        return previous;
    }
    inPhase(phase, fn) {
        const previousPhase = this.phase(phase);
        try {
            return fn();
        }
        finally {
            this.phase(previousPhase);
        }
    }
    eventCount(counter, incrementBy = 1) {
        this.counters[counter] += incrementBy;
    }
    /**
     * Return the current performance metrics as a serializable object.
     */
    finalize() {
        // Track the last segment of time spent in `this.currentPhase` in the time array.
        this.phase(api_1.PerfPhase.Unaccounted);
        const results = {
            events: {},
            phases: {},
            memory: {},
        };
        for (let i = 0; i < this.phaseTime.length; i++) {
            if (this.phaseTime[i] > 0) {
                results.phases[api_1.PerfPhase[i]] = this.phaseTime[i];
            }
        }
        for (let i = 0; i < this.phaseTime.length; i++) {
            if (this.counters[i] > 0) {
                results.events[api_1.PerfEvent[i]] = this.counters[i];
            }
        }
        for (let i = 0; i < this.bytes.length; i++) {
            if (this.bytes[i] > 0) {
                results.memory[api_1.PerfCheckpoint[i]] = this.bytes[i];
            }
        }
        return results;
    }
}
exports.ActivePerfRecorder = ActivePerfRecorder;
/**
 * A `PerfRecorder` that delegates to a target `PerfRecorder` which can be updated later.
 *
 * `DelegatingPerfRecorder` is useful when a compiler class that needs a `PerfRecorder` can outlive
 * the current compilation. This is true for most compiler classes as resource-only changes reuse
 * the same `NgCompiler` for a new compilation.
 */
class DelegatingPerfRecorder {
    constructor(target) {
        this.target = target;
    }
    eventCount(counter, incrementBy) {
        this.target.eventCount(counter, incrementBy);
    }
    phase(phase) {
        return this.target.phase(phase);
    }
    inPhase(phase, fn) {
        // Note: this doesn't delegate to `this.target.inPhase` but instead is implemented manually here
        // to avoid adding an additional frame of noise to the stack when debugging.
        const previousPhase = this.target.phase(phase);
        try {
            return fn();
        }
        finally {
            this.target.phase(previousPhase);
        }
    }
    memory(after) {
        this.target.memory(after);
    }
    reset() {
        this.target.reset();
    }
}
exports.DelegatingPerfRecorder = DelegatingPerfRecorder;
