"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewEvent = createNewEvent;
function createNewEvent(eventName, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}
