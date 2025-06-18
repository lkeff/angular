"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonClickEvents = void 0;
exports.advance = advance;
exports.click = click;
const testing_1 = require("@angular/core/testing");
__exportStar(require("./async-observable-helpers"), exports);
__exportStar(require("./jasmine-matchers"), exports);
///// Short utilities /////
/** Wait a tick, then detect changes */
function advance(f) {
    (0, testing_1.tick)();
    f.detectChanges();
}
// See https://developer.mozilla.org/docs/Web/API/MouseEvent/button
// #docregion click-event
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
exports.ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 },
};
/** Simulate element click. Defaults to mouse left-button click event. */
function click(el, eventObj = exports.ButtonClickEvents.left) {
    if (el instanceof HTMLElement) {
        el.click();
    }
    else {
        el.triggerEventHandler('click', eventObj);
    }
}
// #enddocregion click-event
