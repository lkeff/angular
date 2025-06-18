"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventInfoForA11yClick = updateEventInfoForA11yClick;
exports.preventDefaultForA11yClick = preventDefaultForA11yClick;
exports.populateClickOnlyAction = populateClickOnlyAction;
const eventLib = __importStar(require("./event"));
const eventInfoLib = __importStar(require("./event_info"));
const event_type_1 = require("./event_type");
/**
 * Update `EventInfo` to be `eventType = 'click'` and sets `a11yClickKey` if it
 * is a a11y click.
 */
function updateEventInfoForA11yClick(eventInfo) {
    if (!eventLib.isActionKeyEvent(eventInfoLib.getEvent(eventInfo))) {
        return;
    }
    eventInfoLib.setA11yClickKey(eventInfo, true);
    // A 'click' triggered by a DOM keypress should be mapped to the 'click'
    // jsaction.
    eventInfoLib.setEventType(eventInfo, event_type_1.EventType.CLICK);
}
/**
 * Call `preventDefault` on an a11y click if it is space key or to prevent the
 * browser's default action for native HTML controls.
 */
function preventDefaultForA11yClick(eventInfo) {
    if (!eventInfoLib.getA11yClickKey(eventInfo) ||
        (!eventLib.isSpaceKeyEvent(eventInfoLib.getEvent(eventInfo)) &&
            !eventLib.shouldCallPreventDefaultOnNativeHtmlControl(eventInfoLib.getEvent(eventInfo)))) {
        return;
    }
    eventLib.preventDefault(eventInfoLib.getEvent(eventInfo));
}
/**
 * Sets the `action` to `clickonly` for a click event that is not an a11y click
 * and if there is not already a click action.
 */
function populateClickOnlyAction(actionElement, eventInfo, actionMap) {
    if (
    // If there's already an action, don't attempt to set a CLICKONLY
    eventInfoLib.getAction(eventInfo) ||
        // Only attempt CLICKONLY if the type is CLICK
        eventInfoLib.getEventType(eventInfo) !== event_type_1.EventType.CLICK ||
        // a11y clicks are never CLICKONLY
        eventInfoLib.getA11yClickKey(eventInfo) ||
        actionMap[event_type_1.EventType.CLICKONLY] === undefined) {
        return;
    }
    eventInfoLib.setEventType(eventInfo, event_type_1.EventType.CLICKONLY);
    eventInfoLib.setAction(eventInfo, actionMap[event_type_1.EventType.CLICKONLY], actionElement);
}
