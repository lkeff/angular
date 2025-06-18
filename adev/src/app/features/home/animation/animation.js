"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
const core_1 = require("@angular/core");
const parser_1 = require("./parser");
const calculations_1 = require("./calculations");
// The string seperator between a layed ID and an object selector.
const SEL_SEPARATOR = '>>';
// One millisecond.
const MS = 1000;
// Default config.
const DEFAULT_CONFIG = {
    timestep: 100,
};
const getStartTime = (r) => r.timeframe ? r.timeframe[0] : r.at;
const getEndTime = (r) => r.timeframe ? r.timeframe[1] : r.at;
const getEndStyles = (r) => r.timeframe ? r.to : r.styles;
/**
 * CSS animation player/processor.
 */
class Animation {
    constructor(layers, injector, config) {
        /** Parsed rules. Time is in milliseconds. */
        this.rules = [];
        this.currentTime = 0;
        this.allObjects = new Map(); // selector; element(s)
        this.activeStyles = new Map(); // selector; ParsedStyles
        this.animationFrameId = null;
        this.completed = false;
        this.plugins = [];
        this._duration = 0;
        this._isPlaying = (0, core_1.signal)(false);
        this._progress = (0, core_1.signal)(0);
        /** Returns whether the animation is playing or not */
        this.isPlaying = this._isPlaying.asReadonly();
        /** Returns the animation progress (`[0,1]`) */
        this.progress = this._progress.asReadonly();
        this.renderer = injector.get(core_1.RendererFactory2).createRenderer(null, null);
        this.config = Object.assign(Object.assign({}, DEFAULT_CONFIG), (config || {}));
        // Set layer elements in the objects map.
        this.allObjects = new Map(layers.map((f) => [f.id(), f.elementRef.nativeElement]));
    }
    /** Animation duration. In milliseconds */
    get duration() {
        return this._duration;
    }
    /** Animation timestep (config). In milliseconds */
    get timestep() {
        return this.config.timestep;
    }
    /**
     * Define the animation.
     *
     * @param definition Definition (i.e. `AnimationRule` array)
     * @returns The animation
     */
    define(definition) {
        this.reset();
        this.extractObjectsAndValidateRules(definition);
        // Parse the rules.
        // IMPORTANT: Parsed rules use milliseconds instead of seconds.
        this.rules = definition
            .sort((a, b) => getStartTime(a) - getStartTime(b))
            .map((rule) => {
            if (rule.timeframe) {
                const from = {};
                const to = {};
                for (const [prop, val] of Object.entries(rule.from)) {
                    from[prop] = (0, parser_1.cssValueParser)(val);
                }
                for (const [prop, val] of Object.entries(rule.to)) {
                    to[prop] = (0, parser_1.cssValueParser)(val);
                }
                // Convert to milliseconds.
                const msTimeframe = rule.timeframe.map((t) => t * MS);
                return Object.assign(Object.assign({}, rule), { from, to, timeframe: msTimeframe });
            }
            else {
                const styles = {};
                for (const [prop, val] of Object.entries(rule.styles)) {
                    styles[prop] = (0, parser_1.cssValueParser)(val);
                }
                // Convert to milliseconds.
                const msAt = rule.at * MS;
                return Object.assign(Object.assign({}, rule), { styles, at: msAt });
            }
        });
        // Calculate the duration of the animation.
        // IMPORTANT: Use parsed rules with milliseconds.
        this._duration = Math.max(...this.rules.map((r) => getEndTime(r)));
        return this;
    }
    /** Play the animation. */
    play() {
        if (this.animationFrameId !== null) {
            return;
        }
        if (!this.rules.length) {
            console.warn("Animation: Can't play without a definition");
            return;
        }
        if (this.completed) {
            this.reset();
            this.completed = false;
        }
        this._isPlaying.set(true);
        // Start the animation.
        this.animate(Date.now(), 0);
    }
    /** Pause the animation. */
    pause() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this._isPlaying.set(false);
        }
    }
    /**
     * Fast-forward or go back at a specific time.
     *
     * @param progress Time (in percent) at which the player should render the animation
     * @returns
     */
    seek(progress) {
        this.pause();
        if (!this.rules.length) {
            console.warn("Animation: Can't  without a definition");
            return;
        }
        progress = Math.max(0, Math.min(progress, 1));
        const time = Math.round(progress * this._duration);
        this.updateFrame(time);
        this.completed = progress === 1;
    }
    /**
     * Go forward in time.
     *
     * @param timestep Custom timestep different from the config one
     * @returns
     */
    forward(timestep) {
        this.pause();
        if (!this.rules.length) {
            console.warn("Animation: Can't go forward without a definition");
            return;
        }
        timestep = timestep !== null && timestep !== void 0 ? timestep : this.config.timestep;
        const time = this.currentTime + timestep;
        if (time <= this._duration) {
            this.updateFrame(time);
        }
        else {
            this.completed = true;
        }
    }
    /**
     * Go back in time.
     *
     * @param timestep Custom timestep different from the config one
     * @returns
     */
    back(timestep) {
        this.pause();
        if (!this.rules.length) {
            console.warn("Animation: Can't go back without a definition");
            return;
        }
        timestep = timestep !== null && timestep !== void 0 ? timestep : this.config.timestep;
        const time = this.currentTime - timestep;
        if (time >= 0) {
            this.updateFrame(time);
            // Un-complete the animation, if it was completed.
            this.completed = false;
        }
    }
    /** Reset the animation. */
    reset() {
        this.pause();
        this.currentTime = 0;
        this._progress.set(0);
        for (const [selector, styles] of this.activeStyles) {
            for (const style of Object.keys(styles)) {
                this.removeStyle(selector, style);
            }
            this.activeStyles.delete(selector);
        }
    }
    /** Alias for `reset`. */
    stop() {
        this.reset();
    }
    /**
     * Add and initialize `AnimationPlugin` to the animation.
     *
     * @param plugin Plugin to be added
     * @returns The animation
     */
    addPlugin(plugin) {
        plugin.init(this);
        this.plugins.push(plugin);
        return this;
    }
    /**
     * Cleans all of the resources that might cause memory leaks (e.g. plugins).
     * Resets the animation and cleans the definition.
     */
    dispose() {
        for (const plugin of this.plugins) {
            plugin.destroy();
        }
        this.reset();
        this.rules = [];
        this._duration = 0;
        this.plugins = [];
    }
    /**
     * Update the frame/animation by a given time.
     *
     * @param time Time at which the animation should be rendered.
     */
    updateFrame(time) {
        const completedRules = this.rules.filter((r) => time >= getEndTime(r));
        const inProgressDynamicRules = this.rules.filter((r) => {
            const start = getStartTime(r);
            const end = getEndTime(r);
            // We exclude the static animation rules by `start < end` since `start == end`.
            return start < end && start <= time && time <= end;
        });
        // All styles/styles state at `time`.
        const stylesState = new Map();
        // Extract the completed rules (their styles) directly ...
        for (const rule of completedRules) {
            let objectStyles = stylesState.get(rule.selector) || {};
            objectStyles = Object.assign(Object.assign({}, objectStyles), getEndStyles(rule));
            stylesState.set(rule.selector, objectStyles);
        }
        const deltaTime = time - this.currentTime;
        // ... and then calculate the change of the dynamic rules in progress.
        for (const rule of inProgressDynamicRules) {
            let timespan;
            let targetStyles; // Direction styles
            let sourceStyles; // Opposite direction styles
            let relativeDeltaT;
            // Determine the change direction. Negative Dt means going back in time; postive – forward.
            //
            // It's important to calculate the relative time since the global current time might go out of
            // rule boundaries which will scew the final change rate calculations.
            //
            // For example:
            // If the currentTime = 0; time = 2; for a rule active between [1, 5];
            // the Dt = 2, but only one second has passed from the rule's timespan,
            // i.e. we have to use a relative time which in this case is equal to timespan[0].
            // relativeDt = 1 (not 2); timespan = 4 (not 5); changeRate = 0.25 (not 0.4)
            if (deltaTime > 0) {
                const relativeTime = rule.timeframe[0];
                relativeDeltaT = time - relativeTime;
                timespan = getEndTime(rule) - relativeTime;
                targetStyles = rule.to;
                sourceStyles = rule.from;
            }
            else {
                const relativeTime = rule.timeframe[1];
                relativeDeltaT = time - relativeTime;
                timespan = relativeTime - getStartTime(rule);
                targetStyles = rule.from;
                sourceStyles = rule.to;
            }
            const changeRate = Math.abs(relativeDeltaT / timespan);
            const styles = stylesState.get(rule.selector) || {};
            for (const [prop, target] of Object.entries(targetStyles)) {
                const source = sourceStyles[prop];
                styles[prop] = (0, calculations_1.calculateNextCssValue)(source, target, changeRate);
            }
            stylesState.set(rule.selector, styles);
        }
        // Get rid of any active styles that are not part of the current styles state
        for (const [selector, styles] of this.activeStyles) {
            const newStyles = stylesState.get(selector);
            for (const prop of Object.keys(styles)) {
                if (!newStyles || !newStyles[prop]) {
                    this.removeStyle(selector, prop);
                }
            }
        }
        // Apply the new rule styles.
        for (const [selector, styles] of stylesState) {
            for (const [prop, value] of Object.entries(styles)) {
                this.setStyle(selector, prop, value);
            }
        }
        this.currentTime = time;
        this._progress.set(time / this.duration);
    }
    /** Set active style. */
    setStyle(selector, property, value) {
        const elements = this.allObjects.get(selector);
        const valueString = (0, parser_1.stringifyParsedValue)(value);
        if (elements instanceof Element) {
            this.renderer.setStyle(elements, property, valueString);
        }
        else {
            for (const e of elements) {
                this.renderer.setStyle(e, property, valueString);
            }
        }
        const activeStyles = this.activeStyles.get(selector) || {};
        activeStyles[property] = value;
        this.activeStyles.set(selector, activeStyles);
    }
    /** Remove active style. */
    removeStyle(selector, property) {
        const elements = this.allObjects.get(selector);
        if (elements instanceof Element) {
            this.renderer.removeStyle(elements, property);
        }
        else {
            for (const e of elements) {
                this.renderer.removeStyle(e, property);
            }
        }
        const activeStyles = this.activeStyles.get(selector) || {};
        delete activeStyles[property];
    }
    /** Animate function. */
    animate(then, elapsed) {
        this.animationFrameId = requestAnimationFrame(() => this.animate(then, elapsed));
        const now = Date.now();
        elapsed = now - then;
        if (elapsed >= this.config.timestep) {
            // Subtract the overflowed time from Now to maintain steady fps.
            then = now - (elapsed % this.config.timestep);
            const time = this.currentTime + elapsed;
            if (time <= this._duration) {
                this.updateFrame(time);
            }
            else {
                // Pause the animation and mark it as completed
                // when we go over the duration.
                this.pause();
                this.completed = true;
                // Since the last frame can be few milliseconds behind the duration
                // (e.g. duration = 5000; current time = 4998) when the animation is
                // completed, we perform one additional call to updateFrame in order
                // to visualize any remaining static rules that match exactly the end
                // of the animation.
                if (this.duration > this.currentTime) {
                    requestAnimationFrame(() => this.updateFrame(this.duration));
                }
            }
        }
    }
    /** Extract the objects from the selectors and validate their rules. */
    extractObjectsAndValidateRules(definition) {
        for (const rule of definition) {
            this.validateRules(rule);
            this.extractObjects(rule);
        }
    }
    /** Check whether the start and end styles match and the time frame is correct. */
    validateRules(rule) {
        if (!rule.timeframe) {
            return;
        }
        const duration = rule.timeframe[1] - rule.timeframe[0];
        if (duration < 0) {
            throw new Error(`Animation: Incorrect time frame for selector '${rule.selector}'. Start time is greater than end time`);
        }
        else if (duration === 0) {
            throw new Error(`Animation: Duration for selector '${rule.selector}' is zero. Use 'at' time selector instead`);
        }
        const fromStyles = Object.keys(rule.from);
        const toStyles = Object.keys(rule.to);
        if (fromStyles.length !== toStyles.length) {
            throw new Error(`Animation: There is a mismatch between the number of "from" and "to" styles for selector '${rule.selector}'`);
        }
        for (const prop of toStyles) {
            if (!rule.from[prop]) {
                throw new Error(`Animation: "from" style '${prop}' is missing for selector '${rule.selector}'`);
            }
        }
    }
    /**
     * Extracts all objects (layer elements and layer child elements) by their provided selectors.
     */
    extractObjects(rule) {
        let [layerId, objectSelector] = rule.selector.split(SEL_SEPARATOR);
        layerId = layerId.trim();
        objectSelector = (objectSelector !== null && objectSelector !== void 0 ? objectSelector : '').trim();
        const layer = this.allObjects.get(layerId);
        if (!layer) {
            throw new Error(`Animation: Missing layer ID: ${layerId}`);
        }
        if (objectSelector && !this.allObjects.has(rule.selector)) {
            const objects = layer.getElementsByClassName(objectSelector.replaceAll('.', ' ').trim());
            if (!objects.length) {
                throw new Error(`Animation: Missing layer object(s): ${rule.selector}`);
            }
            if (!this.allObjects.has(rule.selector)) {
                this.allObjects.set(rule.selector, objects.length === 1 ? objects[0] : Array.from(objects));
            }
        }
    }
}
exports.Animation = Animation;
