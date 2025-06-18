"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = element;
exports.elementStart = elementStart;
exports.elementEnd = elementEnd;
exports.elementContainerStart = elementContainerStart;
exports.elementContainer = elementContainer;
exports.elementContainerEnd = elementContainerEnd;
exports.template = template;
exports.disableBindings = disableBindings;
exports.enableBindings = enableBindings;
exports.listener = listener;
exports.twoWayBindingSet = twoWayBindingSet;
exports.twoWayListener = twoWayListener;
exports.pipe = pipe;
exports.namespaceHTML = namespaceHTML;
exports.namespaceSVG = namespaceSVG;
exports.namespaceMath = namespaceMath;
exports.advance = advance;
exports.reference = reference;
exports.nextContext = nextContext;
exports.getCurrentView = getCurrentView;
exports.restoreView = restoreView;
exports.resetView = resetView;
exports.text = text;
exports.defer = defer;
exports.deferOn = deferOn;
exports.projectionDef = projectionDef;
exports.projection = projection;
exports.i18nStart = i18nStart;
exports.conditionalCreate = conditionalCreate;
exports.conditionalBranchCreate = conditionalBranchCreate;
exports.repeaterCreate = repeaterCreate;
exports.repeater = repeater;
exports.deferWhen = deferWhen;
exports.declareLet = declareLet;
exports.storeLet = storeLet;
exports.readContextLet = readContextLet;
exports.i18n = i18n;
exports.i18nEnd = i18nEnd;
exports.i18nAttributes = i18nAttributes;
exports.property = property;
exports.twoWayProperty = twoWayProperty;
exports.attribute = attribute;
exports.styleProp = styleProp;
exports.classProp = classProp;
exports.styleMap = styleMap;
exports.classMap = classMap;
exports.pipeBind = pipeBind;
exports.pipeBindV = pipeBindV;
exports.textInterpolate = textInterpolate;
exports.i18nExp = i18nExp;
exports.i18nApply = i18nApply;
exports.propertyInterpolate = propertyInterpolate;
exports.attributeInterpolate = attributeInterpolate;
exports.stylePropInterpolate = stylePropInterpolate;
exports.styleMapInterpolate = styleMapInterpolate;
exports.classMapInterpolate = classMapInterpolate;
exports.domProperty = domProperty;
exports.syntheticHostProperty = syntheticHostProperty;
exports.pureFunction = pureFunction;
exports.attachSourceLocation = attachSourceLocation;
exports.conditional = conditional;
const o = __importStar(require("../../../output/output_ast"));
const r3_identifiers_1 = require("../../../render3/r3_identifiers");
const ir = __importStar(require("../ir"));
// This file contains helpers for generating calls to Ivy instructions. In particular, each
// instruction type is represented as a function, which may select a specific instruction variant
// depending on the exact arguments.
function element(slot, tag, constIndex, localRefIndex, sourceSpan) {
    return elementOrContainerBase(r3_identifiers_1.Identifiers.element, slot, tag, constIndex, localRefIndex, sourceSpan);
}
function elementStart(slot, tag, constIndex, localRefIndex, sourceSpan) {
    return elementOrContainerBase(r3_identifiers_1.Identifiers.elementStart, slot, tag, constIndex, localRefIndex, sourceSpan);
}
function elementOrContainerBase(instruction, slot, tag, constIndex, localRefIndex, sourceSpan) {
    const args = [o.literal(slot)];
    if (tag !== null) {
        args.push(o.literal(tag));
    }
    if (localRefIndex !== null) {
        args.push(o.literal(constIndex), // might be null, but that's okay.
        o.literal(localRefIndex));
    }
    else if (constIndex !== null) {
        args.push(o.literal(constIndex));
    }
    return call(instruction, args, sourceSpan);
}
function elementEnd(sourceSpan) {
    return call(r3_identifiers_1.Identifiers.elementEnd, [], sourceSpan);
}
function elementContainerStart(slot, constIndex, localRefIndex, sourceSpan) {
    return elementOrContainerBase(r3_identifiers_1.Identifiers.elementContainerStart, slot, 
    /* tag */ null, constIndex, localRefIndex, sourceSpan);
}
function elementContainer(slot, constIndex, localRefIndex, sourceSpan) {
    return elementOrContainerBase(r3_identifiers_1.Identifiers.elementContainer, slot, 
    /* tag */ null, constIndex, localRefIndex, sourceSpan);
}
function elementContainerEnd() {
    return call(r3_identifiers_1.Identifiers.elementContainerEnd, [], null);
}
function template(slot, templateFnRef, decls, vars, tag, constIndex, localRefs, sourceSpan) {
    const args = [
        o.literal(slot),
        templateFnRef,
        o.literal(decls),
        o.literal(vars),
        o.literal(tag),
        o.literal(constIndex),
    ];
    if (localRefs !== null) {
        args.push(o.literal(localRefs));
        args.push(o.importExpr(r3_identifiers_1.Identifiers.templateRefExtractor));
    }
    while (args[args.length - 1].isEquivalent(o.NULL_EXPR)) {
        args.pop();
    }
    return call(r3_identifiers_1.Identifiers.templateCreate, args, sourceSpan);
}
function disableBindings() {
    return call(r3_identifiers_1.Identifiers.disableBindings, [], null);
}
function enableBindings() {
    return call(r3_identifiers_1.Identifiers.enableBindings, [], null);
}
function listener(name, handlerFn, eventTargetResolver, syntheticHost, sourceSpan) {
    const args = [o.literal(name), handlerFn];
    if (eventTargetResolver !== null) {
        args.push(o.importExpr(eventTargetResolver));
    }
    return call(syntheticHost ? r3_identifiers_1.Identifiers.syntheticHostListener : r3_identifiers_1.Identifiers.listener, args, sourceSpan);
}
function twoWayBindingSet(target, value) {
    return o.importExpr(r3_identifiers_1.Identifiers.twoWayBindingSet).callFn([target, value]);
}
function twoWayListener(name, handlerFn, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.twoWayListener, [o.literal(name), handlerFn], sourceSpan);
}
function pipe(slot, name) {
    return call(r3_identifiers_1.Identifiers.pipe, [o.literal(slot), o.literal(name)], null);
}
function namespaceHTML() {
    return call(r3_identifiers_1.Identifiers.namespaceHTML, [], null);
}
function namespaceSVG() {
    return call(r3_identifiers_1.Identifiers.namespaceSVG, [], null);
}
function namespaceMath() {
    return call(r3_identifiers_1.Identifiers.namespaceMathML, [], null);
}
function advance(delta, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.advance, delta > 1 ? [o.literal(delta)] : [], sourceSpan);
}
function reference(slot) {
    return o.importExpr(r3_identifiers_1.Identifiers.reference).callFn([o.literal(slot)]);
}
function nextContext(steps) {
    return o.importExpr(r3_identifiers_1.Identifiers.nextContext).callFn(steps === 1 ? [] : [o.literal(steps)]);
}
function getCurrentView() {
    return o.importExpr(r3_identifiers_1.Identifiers.getCurrentView).callFn([]);
}
function restoreView(savedView) {
    return o.importExpr(r3_identifiers_1.Identifiers.restoreView).callFn([savedView]);
}
function resetView(returnValue) {
    return o.importExpr(r3_identifiers_1.Identifiers.resetView).callFn([returnValue]);
}
function text(slot, initialValue, sourceSpan) {
    const args = [o.literal(slot, null)];
    if (initialValue !== '') {
        args.push(o.literal(initialValue));
    }
    return call(r3_identifiers_1.Identifiers.text, args, sourceSpan);
}
function defer(selfSlot, primarySlot, dependencyResolverFn, loadingSlot, placeholderSlot, errorSlot, loadingConfig, placeholderConfig, enableTimerScheduling, sourceSpan, flags) {
    const args = [
        o.literal(selfSlot),
        o.literal(primarySlot),
        dependencyResolverFn !== null && dependencyResolverFn !== void 0 ? dependencyResolverFn : o.literal(null),
        o.literal(loadingSlot),
        o.literal(placeholderSlot),
        o.literal(errorSlot),
        loadingConfig !== null && loadingConfig !== void 0 ? loadingConfig : o.literal(null),
        placeholderConfig !== null && placeholderConfig !== void 0 ? placeholderConfig : o.literal(null),
        enableTimerScheduling ? o.importExpr(r3_identifiers_1.Identifiers.deferEnableTimerScheduling) : o.literal(null),
        o.literal(flags),
    ];
    let expr;
    while ((expr = args[args.length - 1]) !== null &&
        expr instanceof o.LiteralExpr &&
        expr.value === null) {
        args.pop();
    }
    return call(r3_identifiers_1.Identifiers.defer, args, sourceSpan);
}
const deferTriggerToR3TriggerInstructionsMap = new Map([
    [
        ir.DeferTriggerKind.Idle,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnIdle,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnIdle,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnIdle,
        },
    ],
    [
        ir.DeferTriggerKind.Immediate,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnImmediate,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnImmediate,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnImmediate,
        },
    ],
    [
        ir.DeferTriggerKind.Timer,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnTimer,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnTimer,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnTimer,
        },
    ],
    [
        ir.DeferTriggerKind.Hover,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnHover,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnHover,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnHover,
        },
    ],
    [
        ir.DeferTriggerKind.Interaction,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnInteraction,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnInteraction,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnInteraction,
        },
    ],
    [
        ir.DeferTriggerKind.Viewport,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferOnViewport,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferPrefetchOnViewport,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateOnViewport,
        },
    ],
    [
        ir.DeferTriggerKind.Never,
        {
            ["none" /* ir.DeferOpModifierKind.NONE */]: r3_identifiers_1.Identifiers.deferHydrateNever,
            ["prefetch" /* ir.DeferOpModifierKind.PREFETCH */]: r3_identifiers_1.Identifiers.deferHydrateNever,
            ["hydrate" /* ir.DeferOpModifierKind.HYDRATE */]: r3_identifiers_1.Identifiers.deferHydrateNever,
        },
    ],
]);
function deferOn(trigger, args, modifier, sourceSpan) {
    var _a;
    const instructionToCall = (_a = deferTriggerToR3TriggerInstructionsMap.get(trigger)) === null || _a === void 0 ? void 0 : _a[modifier];
    if (instructionToCall === undefined) {
        throw new Error(`Unable to determine instruction for trigger ${trigger}`);
    }
    return call(instructionToCall, args.map((a) => o.literal(a)), sourceSpan);
}
function projectionDef(def) {
    return call(r3_identifiers_1.Identifiers.projectionDef, def ? [def] : [], null);
}
function projection(slot, projectionSlotIndex, attributes, fallbackFnName, fallbackDecls, fallbackVars, sourceSpan) {
    const args = [o.literal(slot)];
    if (projectionSlotIndex !== 0 || attributes !== null || fallbackFnName !== null) {
        args.push(o.literal(projectionSlotIndex));
        if (attributes !== null) {
            args.push(attributes);
        }
        if (fallbackFnName !== null) {
            if (attributes === null) {
                args.push(o.literal(null));
            }
            args.push(o.variable(fallbackFnName), o.literal(fallbackDecls), o.literal(fallbackVars));
        }
    }
    return call(r3_identifiers_1.Identifiers.projection, args, sourceSpan);
}
function i18nStart(slot, constIndex, subTemplateIndex, sourceSpan) {
    const args = [o.literal(slot), o.literal(constIndex)];
    if (subTemplateIndex !== null) {
        args.push(o.literal(subTemplateIndex));
    }
    return call(r3_identifiers_1.Identifiers.i18nStart, args, sourceSpan);
}
function conditionalCreate(slot, templateFnRef, decls, vars, tag, constIndex, localRefs, sourceSpan) {
    const args = [
        o.literal(slot),
        templateFnRef,
        o.literal(decls),
        o.literal(vars),
        o.literal(tag),
        o.literal(constIndex),
    ];
    if (localRefs !== null) {
        args.push(o.literal(localRefs));
        args.push(o.importExpr(r3_identifiers_1.Identifiers.templateRefExtractor));
    }
    while (args[args.length - 1].isEquivalent(o.NULL_EXPR)) {
        args.pop();
    }
    return call(r3_identifiers_1.Identifiers.conditionalCreate, args, sourceSpan);
}
function conditionalBranchCreate(slot, templateFnRef, decls, vars, tag, constIndex, localRefs, sourceSpan) {
    const args = [
        o.literal(slot),
        templateFnRef,
        o.literal(decls),
        o.literal(vars),
        o.literal(tag),
        o.literal(constIndex),
    ];
    if (localRefs !== null) {
        args.push(o.literal(localRefs));
        args.push(o.importExpr(r3_identifiers_1.Identifiers.templateRefExtractor));
    }
    while (args[args.length - 1].isEquivalent(o.NULL_EXPR)) {
        args.pop();
    }
    return call(r3_identifiers_1.Identifiers.conditionalBranchCreate, args, sourceSpan);
}
function repeaterCreate(slot, viewFnName, decls, vars, tag, constIndex, trackByFn, trackByUsesComponentInstance, emptyViewFnName, emptyDecls, emptyVars, emptyTag, emptyConstIndex, sourceSpan) {
    const args = [
        o.literal(slot),
        o.variable(viewFnName),
        o.literal(decls),
        o.literal(vars),
        o.literal(tag),
        o.literal(constIndex),
        trackByFn,
    ];
    if (trackByUsesComponentInstance || emptyViewFnName !== null) {
        args.push(o.literal(trackByUsesComponentInstance));
        if (emptyViewFnName !== null) {
            args.push(o.variable(emptyViewFnName), o.literal(emptyDecls), o.literal(emptyVars));
            if (emptyTag !== null || emptyConstIndex !== null) {
                args.push(o.literal(emptyTag));
            }
            if (emptyConstIndex !== null) {
                args.push(o.literal(emptyConstIndex));
            }
        }
    }
    return call(r3_identifiers_1.Identifiers.repeaterCreate, args, sourceSpan);
}
function repeater(collection, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.repeater, [collection], sourceSpan);
}
function deferWhen(modifier, expr, sourceSpan) {
    if (modifier === "prefetch" /* ir.DeferOpModifierKind.PREFETCH */) {
        return call(r3_identifiers_1.Identifiers.deferPrefetchWhen, [expr], sourceSpan);
    }
    else if (modifier === "hydrate" /* ir.DeferOpModifierKind.HYDRATE */) {
        return call(r3_identifiers_1.Identifiers.deferHydrateWhen, [expr], sourceSpan);
    }
    return call(r3_identifiers_1.Identifiers.deferWhen, [expr], sourceSpan);
}
function declareLet(slot, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.declareLet, [o.literal(slot)], sourceSpan);
}
function storeLet(value, sourceSpan) {
    return o.importExpr(r3_identifiers_1.Identifiers.storeLet).callFn([value], sourceSpan);
}
function readContextLet(slot) {
    return o.importExpr(r3_identifiers_1.Identifiers.readContextLet).callFn([o.literal(slot)]);
}
function i18n(slot, constIndex, subTemplateIndex, sourceSpan) {
    const args = [o.literal(slot), o.literal(constIndex)];
    if (subTemplateIndex) {
        args.push(o.literal(subTemplateIndex));
    }
    return call(r3_identifiers_1.Identifiers.i18n, args, sourceSpan);
}
function i18nEnd(endSourceSpan) {
    return call(r3_identifiers_1.Identifiers.i18nEnd, [], endSourceSpan);
}
function i18nAttributes(slot, i18nAttributesConfig) {
    const args = [o.literal(slot), o.literal(i18nAttributesConfig)];
    return call(r3_identifiers_1.Identifiers.i18nAttributes, args, null);
}
function property(name, expression, sanitizer, sourceSpan) {
    const args = [o.literal(name), expression];
    if (sanitizer !== null) {
        args.push(sanitizer);
    }
    return call(r3_identifiers_1.Identifiers.property, args, sourceSpan);
}
function twoWayProperty(name, expression, sanitizer, sourceSpan) {
    const args = [o.literal(name), expression];
    if (sanitizer !== null) {
        args.push(sanitizer);
    }
    return call(r3_identifiers_1.Identifiers.twoWayProperty, args, sourceSpan);
}
function attribute(name, expression, sanitizer, namespace) {
    const args = [o.literal(name), expression];
    if (sanitizer !== null || namespace !== null) {
        args.push(sanitizer !== null && sanitizer !== void 0 ? sanitizer : o.literal(null));
    }
    if (namespace !== null) {
        args.push(o.literal(namespace));
    }
    return call(r3_identifiers_1.Identifiers.attribute, args, null);
}
function styleProp(name, expression, unit, sourceSpan) {
    const args = [o.literal(name), expression];
    if (unit !== null) {
        args.push(o.literal(unit));
    }
    return call(r3_identifiers_1.Identifiers.styleProp, args, sourceSpan);
}
function classProp(name, expression, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.classProp, [o.literal(name), expression], sourceSpan);
}
function styleMap(expression, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.styleMap, [expression], sourceSpan);
}
function classMap(expression, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.classMap, [expression], sourceSpan);
}
const PIPE_BINDINGS = [
    r3_identifiers_1.Identifiers.pipeBind1,
    r3_identifiers_1.Identifiers.pipeBind2,
    r3_identifiers_1.Identifiers.pipeBind3,
    r3_identifiers_1.Identifiers.pipeBind4,
];
function pipeBind(slot, varOffset, args) {
    if (args.length < 1 || args.length > PIPE_BINDINGS.length) {
        throw new Error(`pipeBind() argument count out of bounds`);
    }
    const instruction = PIPE_BINDINGS[args.length - 1];
    return o.importExpr(instruction).callFn([o.literal(slot), o.literal(varOffset), ...args]);
}
function pipeBindV(slot, varOffset, args) {
    return o.importExpr(r3_identifiers_1.Identifiers.pipeBindV).callFn([o.literal(slot), o.literal(varOffset), args]);
}
function textInterpolate(strings, expressions, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    return callVariadicInstruction(TEXT_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function i18nExp(expr, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.i18nExp, [expr], sourceSpan);
}
function i18nApply(slot, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.i18nApply, [o.literal(slot)], sourceSpan);
}
function propertyInterpolate(name, strings, expressions, sanitizer, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    const extraArgs = [];
    if (sanitizer !== null) {
        extraArgs.push(sanitizer);
    }
    return callVariadicInstruction(PROPERTY_INTERPOLATE_CONFIG, [o.literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function attributeInterpolate(name, strings, expressions, sanitizer, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    const extraArgs = [];
    if (sanitizer !== null) {
        extraArgs.push(sanitizer);
    }
    return callVariadicInstruction(ATTRIBUTE_INTERPOLATE_CONFIG, [o.literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function stylePropInterpolate(name, strings, expressions, unit, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    const extraArgs = [];
    if (unit !== null) {
        extraArgs.push(o.literal(unit));
    }
    return callVariadicInstruction(STYLE_PROP_INTERPOLATE_CONFIG, [o.literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function styleMapInterpolate(strings, expressions, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    return callVariadicInstruction(STYLE_MAP_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function classMapInterpolate(strings, expressions, sourceSpan) {
    const interpolationArgs = collateInterpolationArgs(strings, expressions);
    return callVariadicInstruction(CLASS_MAP_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function domProperty(name, expression, sanitizer, sourceSpan) {
    const args = [o.literal(name), expression];
    if (sanitizer !== null) {
        args.push(sanitizer);
    }
    return call(r3_identifiers_1.Identifiers.domProperty, args, sourceSpan);
}
function syntheticHostProperty(name, expression, sourceSpan) {
    return call(r3_identifiers_1.Identifiers.syntheticHostProperty, [o.literal(name), expression], sourceSpan);
}
function pureFunction(varOffset, fn, args) {
    return callVariadicInstructionExpr(PURE_FUNCTION_CONFIG, [o.literal(varOffset), fn], args, [], null);
}
function attachSourceLocation(templatePath, locations) {
    return call(r3_identifiers_1.Identifiers.attachSourceLocations, [o.literal(templatePath), locations], null);
}
/**
 * Collates the string an expression arguments for an interpolation instruction.
 */
function collateInterpolationArgs(strings, expressions) {
    if (strings.length < 1 || expressions.length !== strings.length - 1) {
        throw new Error(`AssertionError: expected specific shape of args for strings/expressions in interpolation`);
    }
    const interpolationArgs = [];
    if (expressions.length === 1 && strings[0] === '' && strings[1] === '') {
        interpolationArgs.push(expressions[0]);
    }
    else {
        let idx;
        for (idx = 0; idx < expressions.length; idx++) {
            interpolationArgs.push(o.literal(strings[idx]), expressions[idx]);
        }
        // idx points at the last string.
        interpolationArgs.push(o.literal(strings[idx]));
    }
    return interpolationArgs;
}
function call(instruction, args, sourceSpan) {
    const expr = o.importExpr(instruction).callFn(args, sourceSpan);
    return ir.createStatementOp(new o.ExpressionStatement(expr, sourceSpan));
}
function conditional(condition, contextValue, sourceSpan) {
    const args = [condition];
    if (contextValue !== null) {
        args.push(contextValue);
    }
    return call(r3_identifiers_1.Identifiers.conditional, args, sourceSpan);
}
/**
 * `InterpolationConfig` for the `textInterpolate` instruction.
 */
const TEXT_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.textInterpolate,
        r3_identifiers_1.Identifiers.textInterpolate1,
        r3_identifiers_1.Identifiers.textInterpolate2,
        r3_identifiers_1.Identifiers.textInterpolate3,
        r3_identifiers_1.Identifiers.textInterpolate4,
        r3_identifiers_1.Identifiers.textInterpolate5,
        r3_identifiers_1.Identifiers.textInterpolate6,
        r3_identifiers_1.Identifiers.textInterpolate7,
        r3_identifiers_1.Identifiers.textInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.textInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
/**
 * `InterpolationConfig` for the `propertyInterpolate` instruction.
 */
const PROPERTY_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.propertyInterpolate,
        r3_identifiers_1.Identifiers.propertyInterpolate1,
        r3_identifiers_1.Identifiers.propertyInterpolate2,
        r3_identifiers_1.Identifiers.propertyInterpolate3,
        r3_identifiers_1.Identifiers.propertyInterpolate4,
        r3_identifiers_1.Identifiers.propertyInterpolate5,
        r3_identifiers_1.Identifiers.propertyInterpolate6,
        r3_identifiers_1.Identifiers.propertyInterpolate7,
        r3_identifiers_1.Identifiers.propertyInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.propertyInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
/**
 * `InterpolationConfig` for the `stylePropInterpolate` instruction.
 */
const STYLE_PROP_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.styleProp,
        r3_identifiers_1.Identifiers.stylePropInterpolate1,
        r3_identifiers_1.Identifiers.stylePropInterpolate2,
        r3_identifiers_1.Identifiers.stylePropInterpolate3,
        r3_identifiers_1.Identifiers.stylePropInterpolate4,
        r3_identifiers_1.Identifiers.stylePropInterpolate5,
        r3_identifiers_1.Identifiers.stylePropInterpolate6,
        r3_identifiers_1.Identifiers.stylePropInterpolate7,
        r3_identifiers_1.Identifiers.stylePropInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.stylePropInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
/**
 * `InterpolationConfig` for the `attributeInterpolate` instruction.
 */
const ATTRIBUTE_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.attribute,
        r3_identifiers_1.Identifiers.attributeInterpolate1,
        r3_identifiers_1.Identifiers.attributeInterpolate2,
        r3_identifiers_1.Identifiers.attributeInterpolate3,
        r3_identifiers_1.Identifiers.attributeInterpolate4,
        r3_identifiers_1.Identifiers.attributeInterpolate5,
        r3_identifiers_1.Identifiers.attributeInterpolate6,
        r3_identifiers_1.Identifiers.attributeInterpolate7,
        r3_identifiers_1.Identifiers.attributeInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.attributeInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
/**
 * `InterpolationConfig` for the `styleMapInterpolate` instruction.
 */
const STYLE_MAP_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.styleMap,
        r3_identifiers_1.Identifiers.styleMapInterpolate1,
        r3_identifiers_1.Identifiers.styleMapInterpolate2,
        r3_identifiers_1.Identifiers.styleMapInterpolate3,
        r3_identifiers_1.Identifiers.styleMapInterpolate4,
        r3_identifiers_1.Identifiers.styleMapInterpolate5,
        r3_identifiers_1.Identifiers.styleMapInterpolate6,
        r3_identifiers_1.Identifiers.styleMapInterpolate7,
        r3_identifiers_1.Identifiers.styleMapInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.styleMapInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
/**
 * `InterpolationConfig` for the `classMapInterpolate` instruction.
 */
const CLASS_MAP_INTERPOLATE_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.classMap,
        r3_identifiers_1.Identifiers.classMapInterpolate1,
        r3_identifiers_1.Identifiers.classMapInterpolate2,
        r3_identifiers_1.Identifiers.classMapInterpolate3,
        r3_identifiers_1.Identifiers.classMapInterpolate4,
        r3_identifiers_1.Identifiers.classMapInterpolate5,
        r3_identifiers_1.Identifiers.classMapInterpolate6,
        r3_identifiers_1.Identifiers.classMapInterpolate7,
        r3_identifiers_1.Identifiers.classMapInterpolate8,
    ],
    variable: r3_identifiers_1.Identifiers.classMapInterpolateV,
    mapping: (n) => {
        if (n % 2 === 0) {
            throw new Error(`Expected odd number of arguments`);
        }
        return (n - 1) / 2;
    },
};
const PURE_FUNCTION_CONFIG = {
    constant: [
        r3_identifiers_1.Identifiers.pureFunction0,
        r3_identifiers_1.Identifiers.pureFunction1,
        r3_identifiers_1.Identifiers.pureFunction2,
        r3_identifiers_1.Identifiers.pureFunction3,
        r3_identifiers_1.Identifiers.pureFunction4,
        r3_identifiers_1.Identifiers.pureFunction5,
        r3_identifiers_1.Identifiers.pureFunction6,
        r3_identifiers_1.Identifiers.pureFunction7,
        r3_identifiers_1.Identifiers.pureFunction8,
    ],
    variable: r3_identifiers_1.Identifiers.pureFunctionV,
    mapping: (n) => n,
};
function callVariadicInstructionExpr(config, baseArgs, interpolationArgs, extraArgs, sourceSpan) {
    // mapping need to be done before potentially dropping the last interpolation argument
    const n = config.mapping(interpolationArgs.length);
    // In the case the interpolation instruction ends with a empty string we drop it
    // And the runtime will take care of it.
    const lastInterpolationArg = interpolationArgs.at(-1);
    if (extraArgs.length === 0 &&
        interpolationArgs.length > 1 &&
        lastInterpolationArg instanceof o.LiteralExpr &&
        lastInterpolationArg.value === '') {
        interpolationArgs.pop();
    }
    if (n < config.constant.length) {
        // Constant calling pattern.
        return o
            .importExpr(config.constant[n])
            .callFn([...baseArgs, ...interpolationArgs, ...extraArgs], sourceSpan);
    }
    else if (config.variable !== null) {
        // Variable calling pattern.
        return o
            .importExpr(config.variable)
            .callFn([...baseArgs, o.literalArr(interpolationArgs), ...extraArgs], sourceSpan);
    }
    else {
        throw new Error(`AssertionError: unable to call variadic function`);
    }
}
function callVariadicInstruction(config, baseArgs, interpolationArgs, extraArgs, sourceSpan) {
    return ir.createStatementOp(callVariadicInstructionExpr(config, baseArgs, interpolationArgs, extraArgs, sourceSpan).toStmt());
}
