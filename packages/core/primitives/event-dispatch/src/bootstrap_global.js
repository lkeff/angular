"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapGlobalEarlyEventContract = bootstrapGlobalEarlyEventContract;
exports.getGlobalQueuedEventInfos = getGlobalQueuedEventInfos;
exports.registerGlobalDispatcher = registerGlobalDispatcher;
exports.removeAllGlobalEventListeners = removeAllGlobalEventListeners;
exports.clearGlobalEarlyEventContract = clearGlobalEarlyEventContract;
const earlyeventcontract_1 = require("./earlyeventcontract");
/** Creates an `EarlyJsactionData`, adds events to it, and populates it on the window. */
function bootstrapGlobalEarlyEventContract(bubbleEventTypes, captureEventTypes) {
    const earlyJsactionData = (0, earlyeventcontract_1.createEarlyJsactionData)(window.document.documentElement);
    (0, earlyeventcontract_1.addEvents)(earlyJsactionData, bubbleEventTypes);
    (0, earlyeventcontract_1.addEvents)(earlyJsactionData, captureEventTypes, /* capture= */ true);
    window._ejsa = earlyJsactionData;
}
/** Get the queued `EventInfo` objects that were dispatched before a dispatcher was registered. */
function getGlobalQueuedEventInfos() {
    return (0, earlyeventcontract_1.getQueuedEventInfos)(window._ejsa);
}
/** Registers a dispatcher function on the `EarlyJsactionData` present on the window. */
function registerGlobalDispatcher(restriction, dispatcher) {
    (0, earlyeventcontract_1.registerDispatcher)(window._ejsa, dispatcher);
}
/** Removes all event listener handlers. */
function removeAllGlobalEventListeners() {
    (0, earlyeventcontract_1.removeAllEventListeners)(window._ejsa);
}
/** Removes the global early event contract. */
function clearGlobalEarlyEventContract() {
    window._ejsa = undefined;
}
