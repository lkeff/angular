"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventInfoWrapper = void 0;
exports.getEventType = getEventType;
exports.setEventType = setEventType;
exports.getEvent = getEvent;
exports.setEvent = setEvent;
exports.getTargetElement = getTargetElement;
exports.setTargetElement = setTargetElement;
exports.getContainer = getContainer;
exports.setContainer = setContainer;
exports.getTimestamp = getTimestamp;
exports.setTimestamp = setTimestamp;
exports.getAction = getAction;
exports.setAction = setAction;
exports.unsetAction = unsetAction;
exports.getActionName = getActionName;
exports.getActionElement = getActionElement;
exports.getIsReplay = getIsReplay;
exports.setIsReplay = setIsReplay;
exports.getA11yClickKey = getA11yClickKey;
exports.setA11yClickKey = setA11yClickKey;
exports.getResolved = getResolved;
exports.setResolved = setResolved;
exports.cloneEventInfo = cloneEventInfo;
exports.createEventInfoFromParameters = createEventInfoFromParameters;
exports.createEventInfo = createEventInfo;
/** Added for readability when accessing stable property names. */
function getEventType(eventInfo) {
    return eventInfo.eventType;
}
/** Added for readability when accessing stable property names. */
function setEventType(eventInfo, eventType) {
    eventInfo.eventType = eventType;
}
/** Added for readability when accessing stable property names. */
function getEvent(eventInfo) {
    return eventInfo.event;
}
/** Added for readability when accessing stable property names. */
function setEvent(eventInfo, event) {
    eventInfo.event = event;
}
/** Added for readability when accessing stable property names. */
function getTargetElement(eventInfo) {
    return eventInfo.targetElement;
}
/** Added for readability when accessing stable property names. */
function setTargetElement(eventInfo, targetElement) {
    eventInfo.targetElement = targetElement;
}
/** Added for readability when accessing stable property names. */
function getContainer(eventInfo) {
    return eventInfo.eic;
}
/** Added for readability when accessing stable property names. */
function setContainer(eventInfo, container) {
    eventInfo.eic = container;
}
/** Added for readability when accessing stable property names. */
function getTimestamp(eventInfo) {
    return eventInfo.timeStamp;
}
/** Added for readability when accessing stable property names. */
function setTimestamp(eventInfo, timestamp) {
    eventInfo.timeStamp = timestamp;
}
/** Added for readability when accessing stable property names. */
function getAction(eventInfo) {
    return eventInfo.eia;
}
/** Added for readability when accessing stable property names. */
function setAction(eventInfo, actionName, actionElement) {
    eventInfo.eia = [actionName, actionElement];
}
/** Added for readability when accessing stable property names. */
function unsetAction(eventInfo) {
    eventInfo.eia = undefined;
}
/** Added for readability when accessing stable property names. */
function getActionName(actionInfo) {
    return actionInfo[0];
}
/** Added for readability when accessing stable property names. */
function getActionElement(actionInfo) {
    return actionInfo[1];
}
/** Added for readability when accessing stable property names. */
function getIsReplay(eventInfo) {
    return eventInfo.eirp;
}
/** Added for readability when accessing stable property names. */
function setIsReplay(eventInfo, replay) {
    eventInfo.eirp = replay;
}
/** Added for readability when accessing stable property names. */
function getA11yClickKey(eventInfo) {
    return eventInfo.eiack;
}
/** Added for readability when accessing stable property names. */
function setA11yClickKey(eventInfo, a11yClickKey) {
    eventInfo.eiack = a11yClickKey;
}
/** Added for readability when accessing stable property names. */
function getResolved(eventInfo) {
    return eventInfo.eir;
}
/** Added for readability when accessing stable property names. */
function setResolved(eventInfo, resolved) {
    eventInfo.eir = resolved;
}
/** Clones an `EventInfo` */
function cloneEventInfo(eventInfo) {
    return {
        eventType: eventInfo.eventType,
        event: eventInfo.event,
        targetElement: eventInfo.targetElement,
        eic: eventInfo.eic,
        eia: eventInfo.eia,
        timeStamp: eventInfo.timeStamp,
        eirp: eventInfo.eirp,
        eiack: eventInfo.eiack,
        eir: eventInfo.eir,
    };
}
/**
 * Utility function for creating an `EventInfo`.
 *
 * This can be used from code-size sensitive compilation units, as taking
 * parameters vs. an `Object` literal reduces code size.
 */
function createEventInfoFromParameters(eventType, event, targetElement, container, timestamp, action, isReplay, a11yClickKey) {
    return {
        eventType,
        event,
        targetElement,
        eic: container,
        timeStamp: timestamp,
        eia: action,
        eirp: isReplay,
        eiack: a11yClickKey,
    };
}
/**
 * Utility function for creating an `EventInfo`.
 *
 * This should be used in compilation units that are less sensitive to code
 * size.
 */
function createEventInfo({ eventType, event, targetElement, container, timestamp, action, isReplay, a11yClickKey, }) {
    return {
        eventType,
        event,
        targetElement,
        eic: container,
        timeStamp: timestamp,
        eia: action ? [action.name, action.element] : undefined,
        eirp: isReplay,
        eiack: a11yClickKey,
    };
}
/**
 * Utility class around an `EventInfo`.
 *
 * This should be used in compilation units that are less sensitive to code
 * size.
 */
class EventInfoWrapper {
    constructor(eventInfo) {
        this.eventInfo = eventInfo;
    }
    getEventType() {
        return getEventType(this.eventInfo);
    }
    setEventType(eventType) {
        setEventType(this.eventInfo, eventType);
    }
    getEvent() {
        return getEvent(this.eventInfo);
    }
    setEvent(event) {
        setEvent(this.eventInfo, event);
    }
    getTargetElement() {
        return getTargetElement(this.eventInfo);
    }
    setTargetElement(targetElement) {
        setTargetElement(this.eventInfo, targetElement);
    }
    getContainer() {
        return getContainer(this.eventInfo);
    }
    setContainer(container) {
        setContainer(this.eventInfo, container);
    }
    getTimestamp() {
        return getTimestamp(this.eventInfo);
    }
    setTimestamp(timestamp) {
        setTimestamp(this.eventInfo, timestamp);
    }
    getAction() {
        const action = getAction(this.eventInfo);
        if (!action)
            return undefined;
        return {
            name: action[0],
            element: action[1],
        };
    }
    setAction(action) {
        if (!action) {
            unsetAction(this.eventInfo);
            return;
        }
        setAction(this.eventInfo, action.name, action.element);
    }
    getIsReplay() {
        return getIsReplay(this.eventInfo);
    }
    setIsReplay(replay) {
        setIsReplay(this.eventInfo, replay);
    }
    getResolved() {
        return getResolved(this.eventInfo);
    }
    setResolved(resolved) {
        setResolved(this.eventInfo, resolved);
    }
    clone() {
        return new EventInfoWrapper(cloneEventInfo(this.eventInfo));
    }
}
exports.EventInfoWrapper = EventInfoWrapper;
