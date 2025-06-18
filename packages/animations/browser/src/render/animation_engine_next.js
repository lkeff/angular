"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationEngine = void 0;
const animation_ast_builder_1 = require("../dsl/animation_ast_builder");
const animation_trigger_1 = require("../dsl/animation_trigger");
const error_helpers_1 = require("../error_helpers");
const warning_helpers_1 = require("../warning_helpers");
const shared_1 = require("./shared");
const timeline_animation_engine_1 = require("./timeline_animation_engine");
const transition_animation_engine_1 = require("./transition_animation_engine");
class AnimationEngine {
    constructor(doc, _driver, _normalizer) {
        this._driver = _driver;
        this._normalizer = _normalizer;
        this._triggerCache = {};
        // this method is designed to be overridden by the code that uses this engine
        this.onRemovalComplete = (element, context) => { };
        this._transitionEngine = new transition_animation_engine_1.TransitionAnimationEngine(doc.body, _driver, _normalizer);
        this._timelineEngine = new timeline_animation_engine_1.TimelineAnimationEngine(doc.body, _driver, _normalizer);
        this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
    }
    registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
        const cacheKey = componentId + '-' + name;
        let trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            const errors = [];
            const warnings = [];
            const ast = (0, animation_ast_builder_1.buildAnimationAst)(this._driver, metadata, errors, warnings);
            if (errors.length) {
                throw (0, error_helpers_1.triggerBuildFailed)(name, errors);
            }
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (warnings.length) {
                    (0, warning_helpers_1.warnTriggerBuild)(name, warnings);
                }
            }
            trigger = (0, animation_trigger_1.buildTrigger)(name, ast, this._normalizer);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    }
    register(namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    }
    destroy(namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    }
    onInsert(namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    }
    onRemove(namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    }
    disableAnimations(element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    }
    process(namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            const [id, action] = (0, shared_1.parseTimelineCommand)(property);
            const args = value;
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    }
    listen(namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            const [id, action] = (0, shared_1.parseTimelineCommand)(eventName);
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    }
    flush(microtaskId = -1) {
        this._transitionEngine.flush(microtaskId);
    }
    get players() {
        return [...this._transitionEngine.players, ...this._timelineEngine.players];
    }
    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone();
    }
    afterFlushAnimationsDone(cb) {
        this._transitionEngine.afterFlushAnimationsDone(cb);
    }
}
exports.AnimationEngine = AnimationEngine;
