"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵtwoWayProperty = ɵɵtwoWayProperty;
exports.ɵɵtwoWayBindingSet = ɵɵtwoWayBindingSet;
exports.ɵɵtwoWayListener = ɵɵtwoWayListener;
const bindings_1 = require("../bindings");
const view_1 = require("../interfaces/view");
const signal_1 = require("../reactivity/signal");
const state_1 = require("../state");
const listener_1 = require("./listener");
const shared_1 = require("./shared");
/**
 * Update a two-way bound property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * @param propName Name of property.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 * (e.g. `twoWayProperty('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
function ɵɵtwoWayProperty(propName, value, sanitizer) {
    // TODO(crisbeto): perf impact of re-evaluating this on each change detection?
    if ((0, signal_1.isWritableSignal)(value)) {
        value = value();
    }
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, value, lView[view_1.RENDERER], sanitizer);
        ngDevMode && (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, bindingIndex);
    }
    return ɵɵtwoWayProperty;
}
/**
 * Function used inside two-way listeners to conditionally set the value of the bound expression.
 *
 * @param target Field on which to set the value.
 * @param value Value to be set to the field.
 *
 * @codeGenApi
 */
function ɵɵtwoWayBindingSet(target, value) {
    const canWrite = (0, signal_1.isWritableSignal)(target);
    canWrite && target.set(value);
    return canWrite;
}
/**
 * Adds an event listener that updates a two-way binding to the current node.
 *
 * @param eventName Name of the event.
 * @param listenerFn The function to be called when event emits.
 *
 * @codeGenApi
 */
function ɵɵtwoWayListener(eventName, listenerFn) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const tNode = (0, state_1.getCurrentTNode)();
    (0, listener_1.listenerInternal)(tView, lView, lView[view_1.RENDERER], tNode, eventName, listenerFn);
    return ɵɵtwoWayListener;
}
