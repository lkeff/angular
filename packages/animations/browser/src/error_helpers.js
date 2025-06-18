"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidTimingValue = invalidTimingValue;
exports.negativeStepValue = negativeStepValue;
exports.negativeDelayValue = negativeDelayValue;
exports.invalidStyleParams = invalidStyleParams;
exports.invalidParamValue = invalidParamValue;
exports.invalidNodeType = invalidNodeType;
exports.invalidCssUnitValue = invalidCssUnitValue;
exports.invalidTrigger = invalidTrigger;
exports.invalidDefinition = invalidDefinition;
exports.invalidState = invalidState;
exports.invalidStyleValue = invalidStyleValue;
exports.invalidProperty = invalidProperty;
exports.invalidParallelAnimation = invalidParallelAnimation;
exports.invalidKeyframes = invalidKeyframes;
exports.invalidOffset = invalidOffset;
exports.keyframeOffsetsOutOfOrder = keyframeOffsetsOutOfOrder;
exports.keyframesMissingOffsets = keyframesMissingOffsets;
exports.invalidStagger = invalidStagger;
exports.invalidQuery = invalidQuery;
exports.invalidExpression = invalidExpression;
exports.invalidTransitionAlias = invalidTransitionAlias;
exports.validationFailed = validationFailed;
exports.buildingFailed = buildingFailed;
exports.triggerBuildFailed = triggerBuildFailed;
exports.animationFailed = animationFailed;
exports.registerFailed = registerFailed;
exports.missingOrDestroyedAnimation = missingOrDestroyedAnimation;
exports.createAnimationFailed = createAnimationFailed;
exports.missingPlayer = missingPlayer;
exports.missingTrigger = missingTrigger;
exports.missingEvent = missingEvent;
exports.unsupportedTriggerEvent = unsupportedTriggerEvent;
exports.unregisteredTrigger = unregisteredTrigger;
exports.triggerTransitionsFailed = triggerTransitionsFailed;
exports.triggerParsingFailed = triggerParsingFailed;
exports.transitionFailed = transitionFailed;
const core_1 = require("@angular/core");
const LINE_START = '\n - ';
function invalidTimingValue(exp) {
    return new core_1.ɵRuntimeError(3000 /* RuntimeErrorCode.INVALID_TIMING_VALUE */, ngDevMode && `The provided timing value "${exp}" is invalid.`);
}
function negativeStepValue() {
    return new core_1.ɵRuntimeError(3100 /* RuntimeErrorCode.NEGATIVE_STEP_VALUE */, ngDevMode && 'Duration values below 0 are not allowed for this animation step.');
}
function negativeDelayValue() {
    return new core_1.ɵRuntimeError(3101 /* RuntimeErrorCode.NEGATIVE_DELAY_VALUE */, ngDevMode && 'Delay values below 0 are not allowed for this animation step.');
}
function invalidStyleParams(varName) {
    return new core_1.ɵRuntimeError(3001 /* RuntimeErrorCode.INVALID_STYLE_PARAMS */, ngDevMode &&
        `Unable to resolve the local animation param ${varName} in the given list of values`);
}
function invalidParamValue(varName) {
    return new core_1.ɵRuntimeError(3003 /* RuntimeErrorCode.INVALID_PARAM_VALUE */, ngDevMode && `Please provide a value for the animation param ${varName}`);
}
function invalidNodeType(nodeType) {
    return new core_1.ɵRuntimeError(3004 /* RuntimeErrorCode.INVALID_NODE_TYPE */, ngDevMode && `Unable to resolve animation metadata node #${nodeType}`);
}
function invalidCssUnitValue(userProvidedProperty, value) {
    return new core_1.ɵRuntimeError(3005 /* RuntimeErrorCode.INVALID_CSS_UNIT_VALUE */, ngDevMode && `Please provide a CSS unit value for ${userProvidedProperty}:${value}`);
}
function invalidTrigger() {
    return new core_1.ɵRuntimeError(3006 /* RuntimeErrorCode.INVALID_TRIGGER */, ngDevMode &&
        "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))");
}
function invalidDefinition() {
    return new core_1.ɵRuntimeError(3007 /* RuntimeErrorCode.INVALID_DEFINITION */, ngDevMode && 'only state() and transition() definitions can sit inside of a trigger()');
}
function invalidState(metadataName, missingSubs) {
    return new core_1.ɵRuntimeError(3008 /* RuntimeErrorCode.INVALID_STATE */, ngDevMode &&
        `state("${metadataName}", ...) must define default values for all the following style substitutions: ${missingSubs.join(', ')}`);
}
function invalidStyleValue(value) {
    return new core_1.ɵRuntimeError(3002 /* RuntimeErrorCode.INVALID_STYLE_VALUE */, ngDevMode && `The provided style string value ${value} is not allowed.`);
}
function invalidProperty(prop) {
    return new core_1.ɵRuntimeError(3009 /* RuntimeErrorCode.INVALID_PROPERTY */, ngDevMode &&
        `The provided animation property "${prop}" is not a supported CSS property for animations`);
}
function invalidParallelAnimation(prop, firstStart, firstEnd, secondStart, secondEnd) {
    return new core_1.ɵRuntimeError(3010 /* RuntimeErrorCode.INVALID_PARALLEL_ANIMATION */, ngDevMode &&
        `The CSS property "${prop}" that exists between the times of "${firstStart}ms" and "${firstEnd}ms" is also being animated in a parallel animation between the times of "${secondStart}ms" and "${secondEnd}ms"`);
}
function invalidKeyframes() {
    return new core_1.ɵRuntimeError(3011 /* RuntimeErrorCode.INVALID_KEYFRAMES */, ngDevMode && `keyframes() must be placed inside of a call to animate()`);
}
function invalidOffset() {
    return new core_1.ɵRuntimeError(3012 /* RuntimeErrorCode.INVALID_OFFSET */, ngDevMode && `Please ensure that all keyframe offsets are between 0 and 1`);
}
function keyframeOffsetsOutOfOrder() {
    return new core_1.ɵRuntimeError(3200 /* RuntimeErrorCode.KEYFRAME_OFFSETS_OUT_OF_ORDER */, ngDevMode && `Please ensure that all keyframe offsets are in order`);
}
function keyframesMissingOffsets() {
    return new core_1.ɵRuntimeError(3202 /* RuntimeErrorCode.KEYFRAMES_MISSING_OFFSETS */, ngDevMode && `Not all style() steps within the declared keyframes() contain offsets`);
}
function invalidStagger() {
    return new core_1.ɵRuntimeError(3013 /* RuntimeErrorCode.INVALID_STAGGER */, ngDevMode && `stagger() can only be used inside of query()`);
}
function invalidQuery(selector) {
    return new core_1.ɵRuntimeError(3014 /* RuntimeErrorCode.INVALID_QUERY */, ngDevMode &&
        `\`query("${selector}")\` returned zero elements. (Use \`query("${selector}", { optional: true })\` if you wish to allow this.)`);
}
function invalidExpression(expr) {
    return new core_1.ɵRuntimeError(3015 /* RuntimeErrorCode.INVALID_EXPRESSION */, ngDevMode && `The provided transition expression "${expr}" is not supported`);
}
function invalidTransitionAlias(alias) {
    return new core_1.ɵRuntimeError(3016 /* RuntimeErrorCode.INVALID_TRANSITION_ALIAS */, ngDevMode && `The transition alias value "${alias}" is not supported`);
}
function validationFailed(errors) {
    return new core_1.ɵRuntimeError(3500 /* RuntimeErrorCode.VALIDATION_FAILED */, ngDevMode && `animation validation failed:\n${errors.map((err) => err.message).join('\n')}`);
}
function buildingFailed(errors) {
    return new core_1.ɵRuntimeError(3501 /* RuntimeErrorCode.BUILDING_FAILED */, ngDevMode && `animation building failed:\n${errors.map((err) => err.message).join('\n')}`);
}
function triggerBuildFailed(name, errors) {
    return new core_1.ɵRuntimeError(3404 /* RuntimeErrorCode.TRIGGER_BUILD_FAILED */, ngDevMode &&
        `The animation trigger "${name}" has failed to build due to the following errors:\n - ${errors
            .map((err) => err.message)
            .join('\n - ')}`);
}
function animationFailed(errors) {
    return new core_1.ɵRuntimeError(3502 /* RuntimeErrorCode.ANIMATION_FAILED */, ngDevMode &&
        `Unable to animate due to the following errors:${LINE_START}${errors
            .map((err) => err.message)
            .join(LINE_START)}`);
}
function registerFailed(errors) {
    return new core_1.ɵRuntimeError(3503 /* RuntimeErrorCode.REGISTRATION_FAILED */, ngDevMode &&
        `Unable to build the animation due to the following errors: ${errors
            .map((err) => err.message)
            .join('\n')}`);
}
function missingOrDestroyedAnimation() {
    return new core_1.ɵRuntimeError(3300 /* RuntimeErrorCode.MISSING_OR_DESTROYED_ANIMATION */, ngDevMode && "The requested animation doesn't exist or has already been destroyed");
}
function createAnimationFailed(errors) {
    return new core_1.ɵRuntimeError(3504 /* RuntimeErrorCode.CREATE_ANIMATION_FAILED */, ngDevMode &&
        `Unable to create the animation due to the following errors:${errors
            .map((err) => err.message)
            .join('\n')}`);
}
function missingPlayer(id) {
    return new core_1.ɵRuntimeError(3301 /* RuntimeErrorCode.MISSING_PLAYER */, ngDevMode && `Unable to find the timeline player referenced by ${id}`);
}
function missingTrigger(phase, name) {
    return new core_1.ɵRuntimeError(3302 /* RuntimeErrorCode.MISSING_TRIGGER */, ngDevMode &&
        `Unable to listen on the animation trigger event "${phase}" because the animation trigger "${name}" doesn\'t exist!`);
}
function missingEvent(name) {
    return new core_1.ɵRuntimeError(3303 /* RuntimeErrorCode.MISSING_EVENT */, ngDevMode &&
        `Unable to listen on the animation trigger "${name}" because the provided event is undefined!`);
}
function unsupportedTriggerEvent(phase, name) {
    return new core_1.ɵRuntimeError(3400 /* RuntimeErrorCode.UNSUPPORTED_TRIGGER_EVENT */, ngDevMode &&
        `The provided animation trigger event "${phase}" for the animation trigger "${name}" is not supported!`);
}
function unregisteredTrigger(name) {
    return new core_1.ɵRuntimeError(3401 /* RuntimeErrorCode.UNREGISTERED_TRIGGER */, ngDevMode && `The provided animation trigger "${name}" has not been registered!`);
}
function triggerTransitionsFailed(errors) {
    return new core_1.ɵRuntimeError(3402 /* RuntimeErrorCode.TRIGGER_TRANSITIONS_FAILED */, ngDevMode &&
        `Unable to process animations due to the following failed trigger transitions\n ${errors
            .map((err) => err.message)
            .join('\n')}`);
}
function triggerParsingFailed(name, errors) {
    return new core_1.ɵRuntimeError(3403 /* RuntimeErrorCode.TRIGGER_PARSING_FAILED */, ngDevMode &&
        `Animation parsing for the ${name} trigger have failed:${LINE_START}${errors
            .map((err) => err.message)
            .join(LINE_START)}`);
}
function transitionFailed(name, errors) {
    return new core_1.ɵRuntimeError(3505 /* RuntimeErrorCode.TRANSITION_FAILED */, ngDevMode && `@${name} has failed due to:\n ${errors.map((err) => err.message).join('\n- ')}`);
}
