"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵlistener = ɵɵlistener;
exports.ɵɵsyntheticHostListener = ɵɵsyntheticHostListener;
exports.listenerInternal = listenerInternal;
const view_1 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const state_1 = require("../state");
const directive_outputs_1 = require("../view/directive_outputs");
const listeners_1 = require("../view/listeners");
const shared_1 = require("./shared");
/**
 * Adds an event listener to the current node.
 *
 * If an output exists on one of the node's directives, it also subscribes to the output
 * and saves the subscription for later cleanup.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
function ɵɵlistener(eventName, listenerFn, eventTargetResolver) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const tNode = (0, state_1.getCurrentTNode)();
    listenerInternal(tView, lView, lView[view_1.RENDERER], tNode, eventName, listenerFn, eventTargetResolver);
    return ɵɵlistener;
}
/**
 * Registers a synthetic host listener (e.g. `(@foo.start)`) on a component or directive.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host listener (e.g. `@HostListener('@foo.start')`) properly gets rendered
 * in the component's renderer. Normally all host listeners are evaluated with the
 * parent component's renderer, but, in the case of animation @triggers, they need
 * to be evaluated with the sub component's renderer (because that's where the
 * animation triggers are defined).
 *
 * Do not use this instruction as a replacement for `listener`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
function ɵɵsyntheticHostListener(eventName, listenerFn) {
    const tNode = (0, state_1.getCurrentTNode)();
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const currentDef = (0, state_1.getCurrentDirectiveDef)(tView.data);
    const renderer = (0, shared_1.loadComponentRenderer)(currentDef, tNode, lView);
    listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn);
    return ɵɵsyntheticHostListener;
}
function listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn, eventTargetResolver) {
    var _a, _b;
    ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */);
    let processOutputs = true;
    let wrappedListener = null;
    // Adding a native event listener is applicable when:
    // - The corresponding TNode represents a DOM element.
    // - The event target has a resolver (usually resulting in a global object,
    //   such as `window` or `document`).
    if (tNode.type & 3 /* TNodeType.AnyRNode */ || eventTargetResolver) {
        wrappedListener !== null && wrappedListener !== void 0 ? wrappedListener : (wrappedListener = (0, listeners_1.wrapListener)(tNode, lView, listenerFn));
        const hasCoalescedDomEvent = (0, listeners_1.listenToDomEvent)(tNode, tView, lView, eventTargetResolver, renderer, eventName, listenerFn, wrappedListener);
        // Context: https://github.com/angular/angular/pull/30144
        if (hasCoalescedDomEvent) {
            processOutputs = false;
        }
    }
    if (processOutputs) {
        const outputConfig = (_a = tNode.outputs) === null || _a === void 0 ? void 0 : _a[eventName];
        const hostDirectiveOutputConfig = (_b = tNode.hostDirectiveOutputs) === null || _b === void 0 ? void 0 : _b[eventName];
        if (hostDirectiveOutputConfig && hostDirectiveOutputConfig.length) {
            for (let i = 0; i < hostDirectiveOutputConfig.length; i += 2) {
                const index = hostDirectiveOutputConfig[i];
                const lookupName = hostDirectiveOutputConfig[i + 1];
                wrappedListener !== null && wrappedListener !== void 0 ? wrappedListener : (wrappedListener = (0, listeners_1.wrapListener)(tNode, lView, listenerFn));
                (0, directive_outputs_1.listenToOutput)(tNode, lView, index, lookupName, eventName, wrappedListener);
            }
        }
        if (outputConfig && outputConfig.length) {
            for (const index of outputConfig) {
                wrappedListener !== null && wrappedListener !== void 0 ? wrappedListener : (wrappedListener = (0, listeners_1.wrapListener)(tNode, lView, listenerFn));
                (0, directive_outputs_1.listenToOutput)(tNode, lView, index, eventName, eventName, wrappedListener);
            }
        }
    }
}
