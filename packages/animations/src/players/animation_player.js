"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopAnimationPlayer = void 0;
/**
 * An empty programmatic controller for reusable animations.
 * Used internally when animations are disabled, to avoid
 * checking for the null case when an animation player is expected.
 *
 * @see {@link animate}
 * @see {@link AnimationPlayer}
 *
 * @publicApi
 */
class NoopAnimationPlayer {
    constructor(duration = 0, delay = 0) {
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._originalOnDoneFns = [];
        this._originalOnStartFns = [];
        this._started = false;
        this._destroyed = false;
        this._finished = false;
        this._position = 0;
        this.parentPlayer = null;
        this.totalTime = duration + delay;
    }
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach((fn) => fn());
            this._onDoneFns = [];
        }
    }
    onStart(fn) {
        this._originalOnStartFns.push(fn);
        this._onStartFns.push(fn);
    }
    onDone(fn) {
        this._originalOnDoneFns.push(fn);
        this._onDoneFns.push(fn);
    }
    onDestroy(fn) {
        this._onDestroyFns.push(fn);
    }
    hasStarted() {
        return this._started;
    }
    init() { }
    play() {
        if (!this.hasStarted()) {
            this._onStart();
            this.triggerMicrotask();
        }
        this._started = true;
    }
    /** @internal */
    triggerMicrotask() {
        queueMicrotask(() => this._onFinish());
    }
    _onStart() {
        this._onStartFns.forEach((fn) => fn());
        this._onStartFns = [];
    }
    pause() { }
    restart() { }
    finish() {
        this._onFinish();
    }
    destroy() {
        if (!this._destroyed) {
            this._destroyed = true;
            if (!this.hasStarted()) {
                this._onStart();
            }
            this.finish();
            this._onDestroyFns.forEach((fn) => fn());
            this._onDestroyFns = [];
        }
    }
    reset() {
        this._started = false;
        this._finished = false;
        this._onStartFns = this._originalOnStartFns;
        this._onDoneFns = this._originalOnDoneFns;
    }
    setPosition(position) {
        this._position = this.totalTime ? position * this.totalTime : 1;
    }
    getPosition() {
        return this.totalTime ? this._position / this.totalTime : 1;
    }
    /** @internal */
    triggerCallback(phaseName) {
        const methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
        methods.forEach((fn) => fn());
        methods.length = 0;
    }
}
exports.NoopAnimationPlayer = NoopAnimationPlayer;
