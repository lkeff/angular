"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAnimationPlayer = exports.MockAnimationDriver = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../../src/animations");
const browser_1 = require("../../../browser");
/**
 * @publicApi
 */
class MockAnimationDriver {
    validateStyleProperty(prop) {
        return (0, browser_1.ɵvalidateStyleProperty)(prop);
    }
    validateAnimatableStyleProperty(prop) {
        const cssProp = (0, browser_1.ɵcamelCaseToDashCase)(prop);
        return (0, browser_1.ɵvalidateWebAnimatableStyleProperty)(cssProp);
    }
    containsElement(elm1, elm2) {
        return (0, browser_1.ɵcontainsElement)(elm1, elm2);
    }
    getParentElement(element) {
        return (0, browser_1.ɵgetParentElement)(element);
    }
    query(element, selector, multi) {
        return (0, browser_1.ɵinvokeQuery)(element, selector, multi);
    }
    computeStyle(element, prop, defaultValue) {
        return defaultValue || '';
    }
    animate(element, keyframes, duration, delay, easing, previousPlayers = []) {
        const player = new MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers);
        MockAnimationDriver.log.push(player);
        return player;
    }
}
exports.MockAnimationDriver = MockAnimationDriver;
MockAnimationDriver.log = [];
/**
 * @publicApi
 */
class MockAnimationPlayer extends animations_1.NoopAnimationPlayer {
    constructor(element, keyframes, duration, delay, easing, previousPlayers) {
        super(duration, delay);
        this.element = element;
        this.keyframes = keyframes;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
        this.previousPlayers = previousPlayers;
        this.__finished = false;
        this.__started = false;
        this.previousStyles = new Map();
        this._onInitFns = [];
        this.currentSnapshot = new Map();
        this._keyframes = [];
        this._keyframes = (0, browser_1.ɵnormalizeKeyframes)(keyframes);
        if ((0, browser_1.ɵallowPreviousPlayerStylesMerge)(duration, delay)) {
            previousPlayers.forEach((player) => {
                if (player instanceof MockAnimationPlayer) {
                    const styles = player.currentSnapshot;
                    styles.forEach((val, prop) => this.previousStyles.set(prop, val));
                }
            });
        }
    }
    /** @internal */
    onInit(fn) {
        this._onInitFns.push(fn);
    }
    /** @internal */
    init() {
        super.init();
        this._onInitFns.forEach((fn) => fn());
        this._onInitFns = [];
    }
    reset() {
        super.reset();
        this.__started = false;
    }
    finish() {
        super.finish();
        this.__finished = true;
    }
    destroy() {
        super.destroy();
        this.__finished = true;
    }
    /** @internal */
    triggerMicrotask() { }
    play() {
        super.play();
        this.__started = true;
    }
    hasStarted() {
        return this.__started;
    }
    beforeDestroy() {
        const captures = new Map();
        this.previousStyles.forEach((val, prop) => captures.set(prop, val));
        if (this.hasStarted()) {
            // when assembling the captured styles, it's important that
            // we build the keyframe styles in the following order:
            // {other styles within keyframes, ... previousStyles }
            this._keyframes.forEach((kf) => {
                for (let [prop, val] of kf) {
                    if (prop !== 'offset') {
                        captures.set(prop, this.__finished ? val : animations_1.AUTO_STYLE);
                    }
                }
            });
        }
        this.currentSnapshot = captures;
    }
}
exports.MockAnimationPlayer = MockAnimationPlayer;
