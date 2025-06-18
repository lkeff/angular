"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpolation = void 0;
exports.createInterpolateTextOp = createInterpolateTextOp;
exports.createBindingOp = createBindingOp;
exports.createPropertyOp = createPropertyOp;
exports.createTwoWayPropertyOp = createTwoWayPropertyOp;
exports.createStylePropOp = createStylePropOp;
exports.createClassPropOp = createClassPropOp;
exports.createStyleMapOp = createStyleMapOp;
exports.createClassMapOp = createClassMapOp;
exports.createAttributeOp = createAttributeOp;
exports.createAdvanceOp = createAdvanceOp;
exports.createConditionalOp = createConditionalOp;
exports.createRepeaterOp = createRepeaterOp;
exports.createDeferWhenOp = createDeferWhenOp;
exports.createI18nExpressionOp = createI18nExpressionOp;
exports.createI18nApplyOp = createI18nApplyOp;
exports.createStoreLetOp = createStoreLetOp;
const enums_1 = require("../enums");
const traits_1 = require("../traits");
const shared_1 = require("./shared");
/**
 * Create an `InterpolationTextOp`.
 */
function createInterpolateTextOp(xref, interpolation, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.InterpolateText, target: xref, interpolation,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
class Interpolation {
    constructor(strings, expressions, i18nPlaceholders) {
        this.strings = strings;
        this.expressions = expressions;
        this.i18nPlaceholders = i18nPlaceholders;
        if (i18nPlaceholders.length !== 0 && i18nPlaceholders.length !== expressions.length) {
            throw new Error(`Expected ${expressions.length} placeholders to match interpolation expression count, but got ${i18nPlaceholders.length}`);
        }
    }
}
exports.Interpolation = Interpolation;
/**
 * Create a `BindingOp`, not yet transformed into a particular type of binding.
 */
function createBindingOp(target, kind, name, expression, unit, securityContext, isTextAttribute, isStructuralTemplateAttribute, templateKind, i18nMessage, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.Binding, bindingKind: kind, target,
        name,
        expression,
        unit,
        securityContext,
        isTextAttribute,
        isStructuralTemplateAttribute,
        templateKind, i18nContext: null, i18nMessage,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Create a `PropertyOp`.
 */
function createPropertyOp(target, name, expression, isAnimationTrigger, securityContext, isStructuralTemplateAttribute, templateKind, i18nContext, i18nMessage, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.Property, target,
        name,
        expression,
        isAnimationTrigger,
        securityContext, sanitizer: null, isStructuralTemplateAttribute,
        templateKind,
        i18nContext,
        i18nMessage,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/**
 * Create a `TwoWayPropertyOp`.
 */
function createTwoWayPropertyOp(target, name, expression, securityContext, isStructuralTemplateAttribute, templateKind, i18nContext, i18nMessage, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.TwoWayProperty, target,
        name,
        expression,
        securityContext, sanitizer: null, isStructuralTemplateAttribute,
        templateKind,
        i18nContext,
        i18nMessage,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/** Create a `StylePropOp`. */
function createStylePropOp(xref, name, expression, unit, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.StyleProp, target: xref, name,
        expression,
        unit,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/**
 * Create a `ClassPropOp`.
 */
function createClassPropOp(xref, name, expression, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.ClassProp, target: xref, name,
        expression,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/** Create a `StyleMapOp`. */
function createStyleMapOp(xref, expression, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.StyleMap, target: xref, expression,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/**
 * Create a `ClassMapOp`.
 */
function createClassMapOp(xref, expression, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.ClassMap, target: xref, expression,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/**
 * Create an `AttributeOp`.
 */
function createAttributeOp(target, namespace, name, expression, securityContext, isTextAttribute, isStructuralTemplateAttribute, templateKind, i18nMessage, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.Attribute, target,
        namespace,
        name,
        expression,
        securityContext, sanitizer: null, isTextAttribute,
        isStructuralTemplateAttribute,
        templateKind, i18nContext: null, i18nMessage,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
/**
 * Create an `AdvanceOp`.
 */
function createAdvanceOp(delta, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.Advance, delta,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Create a conditional op, which will display an embedded view according to a condtion.
 */
function createConditionalOp(target, test, conditions, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.Conditional, target,
        test,
        conditions, processed: null, sourceSpan, contextValue: null }, shared_1.NEW_OP), traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS);
}
function createRepeaterOp(repeaterCreate, targetSlot, collection, sourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.Repeater, target: repeaterCreate, targetSlot,
        collection,
        sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT);
}
function createDeferWhenOp(target, expr, modifier, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.DeferWhen, target,
        expr,
        modifier,
        sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS);
}
/**
 * Create an i18n expression op.
 */
function createI18nExpressionOp(context, target, i18nOwner, handle, expression, icuPlaceholder, i18nPlaceholder, resolutionTime, usage, name, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.I18nExpression, context,
        target,
        i18nOwner,
        handle,
        expression,
        icuPlaceholder,
        i18nPlaceholder,
        resolutionTime,
        usage,
        name,
        sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_VARS), traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT);
}
/**
 * Creates an op to apply i18n expression ops.
 */
function createI18nApplyOp(owner, handle, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.I18nApply, owner,
        handle,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Creates a `StoreLetOp`.
 */
function createStoreLetOp(target, declaredName, value, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.StoreLet, target,
        declaredName,
        value,
        sourceSpan }, traits_1.TRAIT_DEPENDS_ON_SLOT_CONTEXT), traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
