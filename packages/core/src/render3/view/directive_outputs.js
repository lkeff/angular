"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutputListener = createOutputListener;
exports.listenToOutput = listenToOutput;
const errors_1 = require("../../errors");
const assert_1 = require("../../util/assert");
const view_1 = require("../interfaces/view");
const stringify_utils_1 = require("../util/stringify_utils");
const listeners_1 = require("./listeners");
function createOutputListener(tNode, lView, listenerFn, targetDef, eventName) {
    // TODO(pk): decouple checks from the actual binding
    const wrappedListener = (0, listeners_1.wrapListener)(tNode, lView, listenerFn);
    const hasBound = listenToDirectiveOutput(tNode, lView, targetDef, eventName, wrappedListener);
    if (!hasBound && ngDevMode) {
        throw new errors_1.RuntimeError(316 /* RuntimeErrorCode.INVALID_BINDING_TARGET */, `${(0, stringify_utils_1.stringifyForError)(targetDef.type)} does not have an output with a public name of "${eventName}".`);
    }
}
/** Listens to an output on a specific directive. */
function listenToDirectiveOutput(tNode, lView, target, eventName, listenerFn) {
    var _a, _b;
    let hostIndex = null;
    let hostDirectivesStart = null;
    let hostDirectivesEnd = null;
    let hasOutput = false;
    if (ngDevMode && !((_a = tNode.directiveToIndex) === null || _a === void 0 ? void 0 : _a.has(target.type))) {
        throw new Error(`Node does not have a directive with type ${target.type.name}`);
    }
    const data = tNode.directiveToIndex.get(target.type);
    if (typeof data === 'number') {
        hostIndex = data;
    }
    else {
        [hostIndex, hostDirectivesStart, hostDirectivesEnd] = data;
    }
    if (hostDirectivesStart !== null &&
        hostDirectivesEnd !== null &&
        ((_b = tNode.hostDirectiveOutputs) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(eventName))) {
        const hostDirectiveOutputs = tNode.hostDirectiveOutputs[eventName];
        for (let i = 0; i < hostDirectiveOutputs.length; i += 2) {
            const index = hostDirectiveOutputs[i];
            if (index >= hostDirectivesStart && index <= hostDirectivesEnd) {
                ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
                hasOutput = true;
                listenToOutput(tNode, lView, index, hostDirectiveOutputs[i + 1], eventName, listenerFn);
            }
            else if (index > hostDirectivesEnd) {
                break;
            }
        }
    }
    if (target.outputs.hasOwnProperty(eventName)) {
        ngDevMode && (0, assert_1.assertIndexInRange)(lView, hostIndex);
        hasOutput = true;
        listenToOutput(tNode, lView, hostIndex, eventName, eventName, listenerFn);
    }
    return hasOutput;
}
function listenToOutput(tNode, lView, directiveIndex, lookupName, eventName, listenerFn) {
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, directiveIndex);
    const instance = lView[directiveIndex];
    const tView = lView[view_1.TVIEW];
    const def = tView.data[directiveIndex];
    const propertyName = def.outputs[lookupName];
    const output = instance[propertyName];
    if (ngDevMode && !isOutputSubscribable(output)) {
        throw new Error(`@Output ${propertyName} not initialized in '${instance.constructor.name}'.`);
    }
    const subscription = output.subscribe(listenerFn);
    (0, listeners_1.storeListenerCleanup)(tNode.index, tView, lView, eventName, listenerFn, subscription, true);
}
/**
 * Whether the given value represents a subscribable output.
 *
 * For example, an `EventEmitter, a `Subject`, an `Observable` or an
 * `OutputEmitter`.
 */
function isOutputSubscribable(value) {
    return (value != null && typeof value.subscribe === 'function');
}
