"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapAppScopedEarlyEventContract = bootstrapAppScopedEarlyEventContract;
exports.getAppScopedQueuedEventInfos = getAppScopedQueuedEventInfos;
exports.registerAppScopedDispatcher = registerAppScopedDispatcher;
exports.removeAllAppScopedEventListeners = removeAllAppScopedEventListeners;
exports.clearAppScopedEarlyEventContract = clearAppScopedEarlyEventContract;
const earlyeventcontract_1 = require("./earlyeventcontract");
/**
 * Creates an `EarlyJsactionData`, adds events to it, and populates it on a nested object on
 * the window.
 */
function bootstrapAppScopedEarlyEventContract(container, appId, bubbleEventTypes, captureEventTypes, dataContainer = window) {
    const earlyJsactionData = (0, earlyeventcontract_1.createEarlyJsactionData)(container);
    if (!dataContainer._ejsas) {
        dataContainer._ejsas = {};
    }
    dataContainer._ejsas[appId] = earlyJsactionData;
    (0, earlyeventcontract_1.addEvents)(earlyJsactionData, bubbleEventTypes);
    (0, earlyeventcontract_1.addEvents)(earlyJsactionData, captureEventTypes, /* capture= */ true);
}
/** Get the queued `EventInfo` objects that were dispatched before a dispatcher was registered. */
function getAppScopedQueuedEventInfos(appId, dataContainer = window) {
    var _a;
    return (0, earlyeventcontract_1.getQueuedEventInfos)((_a = dataContainer._ejsas) === null || _a === void 0 ? void 0 : _a[appId]);
}
/**
 * Registers a dispatcher function on the `EarlyJsactionData` present on the nested object on the
 * window.
 */
function registerAppScopedDispatcher(restriction, appId, dispatcher, dataContainer = window) {
    var _a;
    (0, earlyeventcontract_1.registerDispatcher)((_a = dataContainer._ejsas) === null || _a === void 0 ? void 0 : _a[appId], dispatcher);
}
/** Removes all event listener handlers. */
function removeAllAppScopedEventListeners(appId, dataContainer = window) {
    var _a;
    (0, earlyeventcontract_1.removeAllEventListeners)((_a = dataContainer._ejsas) === null || _a === void 0 ? void 0 : _a[appId]);
}
/** Clear the early event contract. */
function clearAppScopedEarlyEventContract(appId, dataContainer = window) {
    if (!dataContainer._ejsas) {
        return;
    }
    dataContainer._ejsas[appId] = undefined;
}
