"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchedProgramIncrementalBuildStrategy = exports.TrackedIncrementalBuildStrategy = exports.NoopIncrementalBuildStrategy = void 0;
/**
 * A noop implementation of `IncrementalBuildStrategy` which neither returns nor tracks any
 * incremental data.
 */
class NoopIncrementalBuildStrategy {
    getIncrementalState() {
        return null;
    }
    setIncrementalState() { }
    toNextBuildStrategy() {
        return this;
    }
}
exports.NoopIncrementalBuildStrategy = NoopIncrementalBuildStrategy;
/**
 * Tracks an `IncrementalState` within the strategy itself.
 */
class TrackedIncrementalBuildStrategy {
    constructor() {
        this.state = null;
        this.isSet = false;
    }
    getIncrementalState() {
        return this.state;
    }
    setIncrementalState(state) {
        this.state = state;
        this.isSet = true;
    }
    toNextBuildStrategy() {
        const strategy = new TrackedIncrementalBuildStrategy();
        // Only reuse state that was explicitly set via `setIncrementalState`.
        strategy.state = this.isSet ? this.state : null;
        return strategy;
    }
}
exports.TrackedIncrementalBuildStrategy = TrackedIncrementalBuildStrategy;
/**
 * Manages the `IncrementalState` associated with a `ts.Program` by monkey-patching it onto the
 * program under `SYM_INCREMENTAL_STATE`.
 */
class PatchedProgramIncrementalBuildStrategy {
    getIncrementalState(program) {
        const state = program[SYM_INCREMENTAL_STATE];
        if (state === undefined) {
            return null;
        }
        return state;
    }
    setIncrementalState(state, program) {
        program[SYM_INCREMENTAL_STATE] = state;
    }
    toNextBuildStrategy() {
        return this;
    }
}
exports.PatchedProgramIncrementalBuildStrategy = PatchedProgramIncrementalBuildStrategy;
/**
 * Symbol under which the `IncrementalState` is stored on a `ts.Program`.
 *
 * The TS model of incremental compilation is based around reuse of a previous `ts.Program` in the
 * construction of a new one. The `NgCompiler` follows this abstraction - passing in a previous
 * `ts.Program` is sufficient to trigger incremental compilation. This previous `ts.Program` need
 * not be from an Angular compilation (that is, it need not have been created from `NgCompiler`).
 *
 * If it is, though, Angular can benefit from reusing previous analysis work. This reuse is managed
 * by the `IncrementalState`, which is inherited from the old program to the new program. To
 * support this behind the API of passing an old `ts.Program`, the `IncrementalState` is stored on
 * the `ts.Program` under this symbol.
 */
const SYM_INCREMENTAL_STATE = Symbol('NgIncrementalState');
