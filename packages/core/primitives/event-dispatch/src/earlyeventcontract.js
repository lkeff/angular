"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyEventContract = void 0;
exports.createEarlyJsactionData = createEarlyJsactionData;
exports.addEvents = addEvents;
exports.getQueuedEventInfos = getQueuedEventInfos;
exports.registerDispatcher = registerDispatcher;
exports.removeAllEventListeners = removeAllEventListeners;
const event_info_1 = require("./event_info");
/**
 * EarlyEventContract intercepts events in the bubbling phase at the
 * boundary of the document body. This mapping will be passed to the
 * late-loaded EventContract.
 */
class EarlyEventContract {
    constructor(dataContainer = window, container = window.document.documentElement) {
        this.dataContainer = dataContainer;
        dataContainer._ejsa = createEarlyJsactionData(container);
    }
    /**
     * Installs a list of event types for container .
     */
    addEvents(types, capture) {
        addEvents(this.dataContainer._ejsa, types, capture);
    }
}
exports.EarlyEventContract = EarlyEventContract;
/** Creates an `EarlyJsactionData` object. */
function createEarlyJsactionData(container) {
    const q = [];
    const d = (eventInfo) => {
        q.push(eventInfo);
    };
    const h = (event) => {
        d((0, event_info_1.createEventInfoFromParameters)(event.type, event, event.target, container, Date.now()));
    };
    return {
        c: container,
        q,
        et: [],
        etc: [],
        d,
        h,
    };
}
/** Add all the events to the container stored in the `EarlyJsactionData`. */
function addEvents(earlyJsactionData, types, capture) {
    for (let i = 0; i < types.length; i++) {
        const eventType = types[i];
        const eventTypes = capture ? earlyJsactionData.etc : earlyJsactionData.et;
        eventTypes.push(eventType);
        earlyJsactionData.c.addEventListener(eventType, earlyJsactionData.h, capture);
    }
}
/** Get the queued `EventInfo` objects that were dispatched before a dispatcher was registered. */
function getQueuedEventInfos(earlyJsactionData) {
    var _a;
    return (_a = earlyJsactionData === null || earlyJsactionData === void 0 ? void 0 : earlyJsactionData.q) !== null && _a !== void 0 ? _a : [];
}
/** Register a different dispatcher function on the `EarlyJsactionData`. */
function registerDispatcher(earlyJsactionData, dispatcher) {
    if (!earlyJsactionData) {
        return;
    }
    earlyJsactionData.d = dispatcher;
}
/** Removes all event listener handlers. */
function removeAllEventListeners(earlyJsactionData) {
    if (!earlyJsactionData) {
        return;
    }
    removeEventListeners(earlyJsactionData.c, earlyJsactionData.et, earlyJsactionData.h);
    removeEventListeners(earlyJsactionData.c, earlyJsactionData.etc, earlyJsactionData.h, true);
}
function removeEventListeners(container, eventTypes, earlyEventHandler, capture) {
    for (let i = 0; i < eventTypes.length; i++) {
        container.removeEventListener(eventTypes[i], earlyEventHandler, /* useCapture */ capture);
    }
}
