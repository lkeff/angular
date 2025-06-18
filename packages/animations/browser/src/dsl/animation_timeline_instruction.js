"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimelineInstruction = createTimelineInstruction;
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing = null, subTimeline = false) {
    return {
        type: 1 /* AnimationTransitionInstructionType.TimelineAnimation */,
        element,
        keyframes,
        preStyleProps,
        postStyleProps,
        duration,
        delay,
        totalTime: duration + delay,
        easing,
        subTimeline,
    };
}
