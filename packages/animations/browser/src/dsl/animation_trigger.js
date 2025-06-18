"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationTrigger = void 0;
exports.buildTrigger = buildTrigger;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../../src/animations");
const animation_transition_factory_1 = require("./animation_transition_factory");
function buildTrigger(name, ast, normalizer) {
    return new AnimationTrigger(name, ast, normalizer);
}
class AnimationTrigger {
    constructor(name, ast, _normalizer) {
        this.name = name;
        this.ast = ast;
        this._normalizer = _normalizer;
        this.transitionFactories = [];
        this.states = new Map();
        ast.states.forEach((ast) => {
            const defaultParams = (ast.options && ast.options.params) || {};
            this.states.set(ast.name, new animation_transition_factory_1.AnimationStateStyles(ast.style, defaultParams, _normalizer));
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach((ast) => {
            this.transitionFactories.push(new animation_transition_factory_1.AnimationTransitionFactory(name, ast, this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states, this._normalizer);
    }
    get containsQueries() {
        return this.ast.queryCount > 0;
    }
    matchTransition(currentState, nextState, element, params) {
        const entry = this.transitionFactories.find((f) => f.match(currentState, nextState, element, params));
        return entry || null;
    }
    matchStyles(currentState, params, errors) {
        return this.fallbackTransition.buildStyles(currentState, params, errors);
    }
}
exports.AnimationTrigger = AnimationTrigger;
function createFallbackTransition(triggerName, states, normalizer) {
    const matchers = [(fromState, toState) => true];
    const animation = { type: animations_1.AnimationMetadataType.Sequence, steps: [], options: null };
    const transition = {
        type: animations_1.AnimationMetadataType.Transition,
        animation,
        matchers,
        options: null,
        queryCount: 0,
        depCount: 0,
    };
    return new animation_transition_factory_1.AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(stateMap, key1, key2) {
    if (stateMap.has(key1)) {
        if (!stateMap.has(key2)) {
            stateMap.set(key2, stateMap.get(key1));
        }
    }
    else if (stateMap.has(key2)) {
        stateMap.set(key1, stateMap.get(key2));
    }
}
