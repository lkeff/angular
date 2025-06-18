"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NG_ANIMATING_SELECTOR = exports.NG_ANIMATING_CLASSNAME = exports.NG_TRIGGER_SELECTOR = exports.NG_TRIGGER_CLASSNAME = exports.LEAVE_CLASSNAME = exports.ENTER_CLASSNAME = exports.SUBSTITUTION_EXPR_END = exports.SUBSTITUTION_EXPR_START = void 0;
exports.resolveTimingValue = resolveTimingValue;
exports.resolveTiming = resolveTiming;
exports.normalizeKeyframes = normalizeKeyframes;
exports.normalizeStyles = normalizeStyles;
exports.setStyles = setStyles;
exports.eraseStyles = eraseStyles;
exports.normalizeAnimationEntry = normalizeAnimationEntry;
exports.validateStyleParams = validateStyleParams;
exports.extractStyleParams = extractStyleParams;
exports.interpolateParams = interpolateParams;
exports.dashCaseToCamelCase = dashCaseToCamelCase;
exports.camelCaseToDashCase = camelCaseToDashCase;
exports.allowPreviousPlayerStylesMerge = allowPreviousPlayerStylesMerge;
exports.balancePreviousStylesIntoKeyframes = balancePreviousStylesIntoKeyframes;
exports.visitDslNode = visitDslNode;
exports.computeStyle = computeStyle;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../src/animations");
const error_helpers_1 = require("./error_helpers");
const ONE_SECOND = 1000;
exports.SUBSTITUTION_EXPR_START = '{{';
exports.SUBSTITUTION_EXPR_END = '}}';
exports.ENTER_CLASSNAME = 'ng-enter';
exports.LEAVE_CLASSNAME = 'ng-leave';
exports.NG_TRIGGER_CLASSNAME = 'ng-trigger';
exports.NG_TRIGGER_SELECTOR = '.ng-trigger';
exports.NG_ANIMATING_CLASSNAME = 'ng-animating';
exports.NG_ANIMATING_SELECTOR = '.ng-animating';
function resolveTimingValue(value) {
    if (typeof value == 'number')
        return value;
    const matches = value.match(/^(-?[\.\d]+)(m?s)/);
    if (!matches || matches.length < 2)
        return 0;
    return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
    switch (unit) {
        case 's':
            return value * ONE_SECOND;
        default: // ms or something else
            return value;
    }
}
function resolveTiming(timings, errors, allowNegativeValues) {
    return timings.hasOwnProperty('duration')
        ? timings
        : parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
    const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    let duration;
    let delay = 0;
    let easing = '';
    if (typeof exp === 'string') {
        const matches = exp.match(regex);
        if (matches === null) {
            errors.push((0, error_helpers_1.invalidTimingValue)(exp));
            return { duration: 0, delay: 0, easing: '' };
        }
        duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        const delayMatch = matches[3];
        if (delayMatch != null) {
            delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
        }
        const easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    }
    else {
        duration = exp;
    }
    if (!allowNegativeValues) {
        let containsErrors = false;
        let startIndex = errors.length;
        if (duration < 0) {
            errors.push((0, error_helpers_1.negativeStepValue)());
            containsErrors = true;
        }
        if (delay < 0) {
            errors.push((0, error_helpers_1.negativeDelayValue)());
            containsErrors = true;
        }
        if (containsErrors) {
            errors.splice(startIndex, 0, (0, error_helpers_1.invalidTimingValue)(exp));
        }
    }
    return { duration, delay, easing };
}
function normalizeKeyframes(keyframes) {
    if (!keyframes.length) {
        return [];
    }
    if (keyframes[0] instanceof Map) {
        return keyframes;
    }
    return keyframes.map((kf) => new Map(Object.entries(kf)));
}
function normalizeStyles(styles) {
    return Array.isArray(styles) ? new Map(...styles) : new Map(styles);
}
function setStyles(element, styles, formerStyles) {
    styles.forEach((val, prop) => {
        const camelProp = dashCaseToCamelCase(prop);
        if (formerStyles && !formerStyles.has(prop)) {
            formerStyles.set(prop, element.style[camelProp]);
        }
        element.style[camelProp] = val;
    });
}
function eraseStyles(element, styles) {
    styles.forEach((_, prop) => {
        const camelProp = dashCaseToCamelCase(prop);
        element.style[camelProp] = '';
    });
}
function normalizeAnimationEntry(steps) {
    if (Array.isArray(steps)) {
        if (steps.length == 1)
            return steps[0];
        return (0, animations_1.sequence)(steps);
    }
    return steps;
}
function validateStyleParams(value, options, errors) {
    const params = options.params || {};
    const matches = extractStyleParams(value);
    if (matches.length) {
        matches.forEach((varName) => {
            if (!params.hasOwnProperty(varName)) {
                errors.push((0, error_helpers_1.invalidStyleParams)(varName));
            }
        });
    }
}
const PARAM_REGEX = /* @__PURE__ */ new RegExp(`${exports.SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${exports.SUBSTITUTION_EXPR_END}`, 'g');
function extractStyleParams(value) {
    let params = [];
    if (typeof value === 'string') {
        let match;
        while ((match = PARAM_REGEX.exec(value))) {
            params.push(match[1]);
        }
        PARAM_REGEX.lastIndex = 0;
    }
    return params;
}
function interpolateParams(value, params, errors) {
    const original = `${value}`;
    const str = original.replace(PARAM_REGEX, (_, varName) => {
        let localVal = params[varName];
        // this means that the value was never overridden by the data passed in by the user
        if (localVal == null) {
            errors.push((0, error_helpers_1.invalidParamValue)(varName));
            localVal = '';
        }
        return localVal.toString();
    });
    // we do this to assert that numeric values stay as they are
    return str == original ? value : str;
}
const DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function camelCaseToDashCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function allowPreviousPlayerStylesMerge(duration, delay) {
    return duration === 0 || delay === 0;
}
function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
    if (previousStyles.size && keyframes.length) {
        let startingKeyframe = keyframes[0];
        let missingStyleProps = [];
        previousStyles.forEach((val, prop) => {
            if (!startingKeyframe.has(prop)) {
                missingStyleProps.push(prop);
            }
            startingKeyframe.set(prop, val);
        });
        if (missingStyleProps.length) {
            for (let i = 1; i < keyframes.length; i++) {
                let kf = keyframes[i];
                missingStyleProps.forEach((prop) => kf.set(prop, computeStyle(element, prop)));
            }
        }
    }
    return keyframes;
}
function visitDslNode(visitor, node, context) {
    switch (node.type) {
        case animations_1.AnimationMetadataType.Trigger:
            return visitor.visitTrigger(node, context);
        case animations_1.AnimationMetadataType.State:
            return visitor.visitState(node, context);
        case animations_1.AnimationMetadataType.Transition:
            return visitor.visitTransition(node, context);
        case animations_1.AnimationMetadataType.Sequence:
            return visitor.visitSequence(node, context);
        case animations_1.AnimationMetadataType.Group:
            return visitor.visitGroup(node, context);
        case animations_1.AnimationMetadataType.Animate:
            return visitor.visitAnimate(node, context);
        case animations_1.AnimationMetadataType.Keyframes:
            return visitor.visitKeyframes(node, context);
        case animations_1.AnimationMetadataType.Style:
            return visitor.visitStyle(node, context);
        case animations_1.AnimationMetadataType.Reference:
            return visitor.visitReference(node, context);
        case animations_1.AnimationMetadataType.AnimateChild:
            return visitor.visitAnimateChild(node, context);
        case animations_1.AnimationMetadataType.AnimateRef:
            return visitor.visitAnimateRef(node, context);
        case animations_1.AnimationMetadataType.Query:
            return visitor.visitQuery(node, context);
        case animations_1.AnimationMetadataType.Stagger:
            return visitor.visitStagger(node, context);
        default:
            throw (0, error_helpers_1.invalidNodeType)(node.type);
    }
}
function computeStyle(element, prop) {
    return window.getComputedStyle(element)[prop];
}
