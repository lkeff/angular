"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElementOrContainerOp = isElementOrContainerOp;
exports.createElementStartOp = createElementStartOp;
exports.createTemplateOp = createTemplateOp;
exports.createConditionalCreateOp = createConditionalCreateOp;
exports.createConditionalBranchCreateOp = createConditionalBranchCreateOp;
exports.createRepeaterCreateOp = createRepeaterCreateOp;
exports.createElementEndOp = createElementEndOp;
exports.createDisableBindingsOp = createDisableBindingsOp;
exports.createEnableBindingsOp = createEnableBindingsOp;
exports.createTextOp = createTextOp;
exports.createListenerOp = createListenerOp;
exports.createTwoWayListenerOp = createTwoWayListenerOp;
exports.createPipeOp = createPipeOp;
exports.createNamespaceOp = createNamespaceOp;
exports.createProjectionDefOp = createProjectionDefOp;
exports.createProjectionOp = createProjectionOp;
exports.createExtractedAttributeOp = createExtractedAttributeOp;
exports.createDeferOp = createDeferOp;
exports.createDeferOnOp = createDeferOnOp;
exports.createDeclareLetOp = createDeclareLetOp;
exports.createI18nMessageOp = createI18nMessageOp;
exports.createI18nStartOp = createI18nStartOp;
exports.createI18nEndOp = createI18nEndOp;
exports.createIcuStartOp = createIcuStartOp;
exports.createIcuEndOp = createIcuEndOp;
exports.createIcuPlaceholderOp = createIcuPlaceholderOp;
exports.createI18nContextOp = createI18nContextOp;
exports.createI18nAttributesOp = createI18nAttributesOp;
exports.createSourceLocationOp = createSourceLocationOp;
const enums_1 = require("../enums");
const handle_1 = require("../handle");
const operations_1 = require("../operations");
const traits_1 = require("../traits");
const shared_1 = require("./shared");
/**
 * The set of OpKinds that represent the creation of an element or container
 */
const elementContainerOpKinds = new Set([
    enums_1.OpKind.Element,
    enums_1.OpKind.ElementStart,
    enums_1.OpKind.Container,
    enums_1.OpKind.ContainerStart,
    enums_1.OpKind.Template,
    enums_1.OpKind.RepeaterCreate,
    enums_1.OpKind.ConditionalCreate,
    enums_1.OpKind.ConditionalBranchCreate,
]);
/**
 * Checks whether the given operation represents the creation of an element or container.
 */
function isElementOrContainerOp(op) {
    return elementContainerOpKinds.has(op.kind);
}
/**
 * Create an `ElementStartOp`.
 */
function createElementStartOp(tag, xref, namespace, i18nPlaceholder, startSourceSpan, wholeSourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.ElementStart, xref,
        tag, handle: new handle_1.SlotHandle(), attributes: null, localRefs: [], nonBindable: false, namespace,
        i18nPlaceholder,
        startSourceSpan,
        wholeSourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
/**
 * Create a `TemplateOp`.
 */
function createTemplateOp(xref, templateKind, tag, functionNameSuffix, namespace, i18nPlaceholder, startSourceSpan, wholeSourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.Template, xref,
        templateKind, attributes: null, tag, handle: new handle_1.SlotHandle(), functionNameSuffix, decls: null, vars: null, localRefs: [], nonBindable: false, namespace,
        i18nPlaceholder,
        startSourceSpan,
        wholeSourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
function createConditionalCreateOp(xref, templateKind, tag, functionNameSuffix, namespace, i18nPlaceholder, startSourceSpan, wholeSourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.ConditionalCreate, xref,
        templateKind, attributes: null, tag, handle: new handle_1.SlotHandle(), functionNameSuffix, decls: null, vars: null, localRefs: [], nonBindable: false, namespace,
        i18nPlaceholder,
        startSourceSpan,
        wholeSourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
function createConditionalBranchCreateOp(xref, templateKind, tag, functionNameSuffix, namespace, i18nPlaceholder, startSourceSpan, wholeSourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.ConditionalBranchCreate, xref,
        templateKind, attributes: null, tag, handle: new handle_1.SlotHandle(), functionNameSuffix, decls: null, vars: null, localRefs: [], nonBindable: false, namespace,
        i18nPlaceholder,
        startSourceSpan,
        wholeSourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
function createRepeaterCreateOp(primaryView, emptyView, tag, track, varNames, emptyTag, i18nPlaceholder, emptyI18nPlaceholder, startSourceSpan, wholeSourceSpan) {
    return Object.assign(Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.RepeaterCreate, attributes: null, xref: primaryView, handle: new handle_1.SlotHandle(), emptyView,
        track, trackByFn: null, trackByOps: null, tag,
        emptyTag, emptyAttributes: null, functionNameSuffix: 'For', namespace: enums_1.Namespace.HTML, nonBindable: false, localRefs: [], decls: null, vars: null, varNames, usesComponentInstance: false, i18nPlaceholder,
        emptyI18nPlaceholder,
        startSourceSpan,
        wholeSourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_VARS), { numSlotsUsed: emptyView === null ? 2 : 3 });
}
/**
 * Create an `ElementEndOp`.
 */
function createElementEndOp(xref, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.ElementEnd, xref,
        sourceSpan }, shared_1.NEW_OP);
}
function createDisableBindingsOp(xref) {
    return Object.assign({ kind: enums_1.OpKind.DisableBindings, xref }, shared_1.NEW_OP);
}
function createEnableBindingsOp(xref) {
    return Object.assign({ kind: enums_1.OpKind.EnableBindings, xref }, shared_1.NEW_OP);
}
/**
 * Create a `TextOp`.
 */
function createTextOp(xref, initialValue, icuPlaceholder, sourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.Text, xref, handle: new handle_1.SlotHandle(), initialValue,
        icuPlaceholder,
        sourceSpan }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
/**
 * Create a `ListenerOp`. Host bindings reuse all the listener logic.
 */
function createListenerOp(target, targetSlot, name, tag, handlerOps, animationPhase, eventTarget, hostListener, sourceSpan) {
    const handlerList = new operations_1.OpList();
    handlerList.push(handlerOps);
    return Object.assign({ kind: enums_1.OpKind.Listener, target,
        targetSlot,
        tag,
        hostListener,
        name, handlerOps: handlerList, handlerFnName: null, consumesDollarEvent: false, isAnimationListener: animationPhase !== null, animationPhase,
        eventTarget,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Create a `TwoWayListenerOp`.
 */
function createTwoWayListenerOp(target, targetSlot, name, tag, handlerOps, sourceSpan) {
    const handlerList = new operations_1.OpList();
    handlerList.push(handlerOps);
    return Object.assign({ kind: enums_1.OpKind.TwoWayListener, target,
        targetSlot,
        tag,
        name, handlerOps: handlerList, handlerFnName: null, sourceSpan }, shared_1.NEW_OP);
}
function createPipeOp(xref, slot, name) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.Pipe, xref, handle: slot, name }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_SLOT);
}
function createNamespaceOp(namespace) {
    return Object.assign({ kind: enums_1.OpKind.Namespace, active: namespace }, shared_1.NEW_OP);
}
function createProjectionDefOp(def) {
    return Object.assign({ kind: enums_1.OpKind.ProjectionDef, def }, shared_1.NEW_OP);
}
function createProjectionOp(xref, selector, i18nPlaceholder, fallbackView, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.Projection, xref, handle: new handle_1.SlotHandle(), selector,
        i18nPlaceholder,
        fallbackView, projectionSlotIndex: 0, attributes: null, localRefs: [], sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_SLOT), { numSlotsUsed: fallbackView === null ? 1 : 2 });
}
/**
 * Create an `ExtractedAttributeOp`.
 */
function createExtractedAttributeOp(target, bindingKind, namespace, name, expression, i18nContext, i18nMessage, securityContext) {
    return Object.assign({ kind: enums_1.OpKind.ExtractedAttribute, target,
        bindingKind,
        namespace,
        name,
        expression,
        i18nContext,
        i18nMessage,
        securityContext, trustedValueFn: null }, shared_1.NEW_OP);
}
function createDeferOp(xref, main, mainSlot, ownResolverFn, resolverFn, sourceSpan) {
    return Object.assign(Object.assign(Object.assign({ kind: enums_1.OpKind.Defer, xref, handle: new handle_1.SlotHandle(), mainView: main, mainSlot, loadingView: null, loadingSlot: null, loadingConfig: null, loadingMinimumTime: null, loadingAfterTime: null, placeholderView: null, placeholderSlot: null, placeholderConfig: null, placeholderMinimumTime: null, errorView: null, errorSlot: null, ownResolverFn,
        resolverFn, flags: null, sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_SLOT), { numSlotsUsed: 2 });
}
function createDeferOnOp(defer, trigger, modifier, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.DeferOn, defer,
        trigger,
        modifier,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Creates a `DeclareLetOp`.
 */
function createDeclareLetOp(xref, declaredName, sourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.DeclareLet, xref,
        declaredName,
        sourceSpan, handle: new handle_1.SlotHandle() }, traits_1.TRAIT_CONSUMES_SLOT), shared_1.NEW_OP);
}
/**
 * Create an `ExtractedMessageOp`.
 */
function createI18nMessageOp(xref, i18nContext, i18nBlock, message, messagePlaceholder, params, postprocessingParams, needsPostprocessing) {
    return Object.assign({ kind: enums_1.OpKind.I18nMessage, xref,
        i18nContext,
        i18nBlock,
        message,
        messagePlaceholder,
        params,
        postprocessingParams,
        needsPostprocessing, subMessages: [] }, shared_1.NEW_OP);
}
/**
 * Create an `I18nStartOp`.
 */
function createI18nStartOp(xref, message, root, sourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.I18nStart, xref, handle: new handle_1.SlotHandle(), root: root !== null && root !== void 0 ? root : xref, message, messageIndex: null, subTemplateIndex: null, context: null, sourceSpan }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_SLOT);
}
/**
 * Create an `I18nEndOp`.
 */
function createI18nEndOp(xref, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.I18nEnd, xref,
        sourceSpan }, shared_1.NEW_OP);
}
/**
 * Creates an ICU start op.
 */
function createIcuStartOp(xref, message, messagePlaceholder, sourceSpan) {
    return Object.assign({ kind: enums_1.OpKind.IcuStart, xref,
        message,
        messagePlaceholder, context: null, sourceSpan }, shared_1.NEW_OP);
}
/**
 * Creates an ICU end op.
 */
function createIcuEndOp(xref) {
    return Object.assign({ kind: enums_1.OpKind.IcuEnd, xref }, shared_1.NEW_OP);
}
/**
 * Creates an ICU placeholder op.
 */
function createIcuPlaceholderOp(xref, name, strings) {
    return Object.assign({ kind: enums_1.OpKind.IcuPlaceholder, xref,
        name,
        strings, expressionPlaceholders: [] }, shared_1.NEW_OP);
}
function createI18nContextOp(contextKind, xref, i18nBlock, message, sourceSpan) {
    if (i18nBlock === null && contextKind !== enums_1.I18nContextKind.Attr) {
        throw new Error('AssertionError: i18nBlock must be provided for non-attribute contexts.');
    }
    return Object.assign({ kind: enums_1.OpKind.I18nContext, contextKind,
        xref,
        i18nBlock,
        message,
        sourceSpan, params: new Map(), postprocessingParams: new Map() }, shared_1.NEW_OP);
}
function createI18nAttributesOp(xref, handle, target) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.I18nAttributes, xref,
        handle,
        target, i18nAttributesConfig: null }, shared_1.NEW_OP), traits_1.TRAIT_CONSUMES_SLOT);
}
/** Create a `SourceLocationOp`. */
function createSourceLocationOp(templatePath, locations) {
    return Object.assign({ kind: enums_1.OpKind.SourceLocation, templatePath,
        locations }, shared_1.NEW_OP);
}
