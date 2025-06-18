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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache = __importStar(require("../src/cache"));
const event_info_1 = require("../src/event_info");
const dispatcher_1 = require("../src/dispatcher");
const eventcontract_1 = require("../src/eventcontract");
const event_contract_container_1 = require("../src/event_contract_container");
const html_1 = require("./html");
const action_resolver_1 = require("../src/action_resolver");
const a11y_click_1 = require("../src/a11y_click");
const property_1 = require("../src/property");
const domContent = `
<div id="click-container">
  <div id="click-action-element" jsaction="handleClick">
    <div id="click-target-element"></div>
  </div>
</div>

<div id="keydown-container">
  <div id="keydown-action-element" jsaction="keydown:handleKeydown">
    <div id="keydown-target-element"></div>
  </div>
</div>

<div id="self-click-container">
  <div id="self-click-target-element" jsaction="handleClick"></div>
</div>

<div id="parent-and-child-container">
  <div>
    <div jsaction="parentHandleClick">
      <div id="parent-and-child-action-element" jsaction="childHandleClick">
        <div id="parent-and-child-target-element"></div>
      </div>
    </div>
  </div>
</div>

<div id="owner-click-container">
  <div id="owner-click-action-element" jsaction="ownerHandleClick">
  </div>
  <div id="owner-click-target-element">
  </div>
</div>

<div id="clickmod-container">
  <div id="clickmod-action-element" jsaction="clickmod:handleClickMod">
    <div id="clickmod-target-element"></div>
  </div>
</div>

<div id="trailing-semicolon-container">
  <div id="trailing-semicolon-action-element" jsaction="handleClick;">
    <div id="trailing-semicolon-target-element"></div>
  </div>
</div>

<div id="no-action-name-container">
  <div id="no-action-name-action-element" jsaction="keydown:;;keyup:">
    <div id="no-action-name-target-element"></div>
  </div>
</div>

<div id="shadow-dom-container">
  <div id="shadow-dom-action-element" jsaction="handleClick">
  </div>
</div>

<div id="anchor-click-container">
  <a id="anchor-click-action-element" href="javascript:void(0);" jsaction="handleClick">
    <span id="anchor-click-target-element"></span>
  </a>
</div>

<div id="a11y-click-container">
  <div id="a11y-click-action-element" jsaction="handleClick">
    <div id="a11y-click-target-element" tabindex="0"></div>
  </a>
</div>

<div id="a11y-clickonly-container">
  <div id="a11y-clickonly-action-element" jsaction="clickonly:handleClickOnly">
    <div id="a11y-clickonly-target-element" tabindex="0"></div>
  </a>
</div>

<div id="a11y-click-clickonly-container">
  <div id="a11y-click-clickonly-action-element" jsaction="clickonly:handleClickOnly;click:handleClick">
    <div id="a11y-click-clickonly-target-element" tabindex="0"></div>
  </a>
</div>

<div id="anchor-clickmod-container">
  <a id="anchor-clickmod-action-element" href="javascript:void(0);" jsaction="clickmod: handleClickMod">
    <span id="anchor-clickmod-target-element"></span>
  </a>
</div>

<div id="clickmod-container">
  <div id="clickmod-action-element" jsaction="clickmod:handleClickMod">
    <div id="clickmod-target-element"></div>
  </div>
</div>

<div id="a11y-anchor-click-container">
  <a id="a11y-anchor-click-action-element" href="javascript:void(0);" jsaction="handleClick">
    <span id="a11y-anchor-click-target-element" tabindex="0"></span>
  </a>
</div>


<div id="mouseenter-container">
  <div id="mouseenter-action-element" jsaction="mouseenter:handleMouseEnter">
    <div id="mouseenter-target-element"></div>
  </div>
</div>

<div id="mouseleave-container">
  <div id="mouseleave-action-element" jsaction="mouseleave:handleMouseLeave">
    <div id="mouseleave-target-element"></div>
  </div>
</div>

<div id="pointerenter-container">
  <div id="pointerenter-action-element" jsaction="pointerenter:handlePointerEnter">
    <div id="pointerenter-target-element"></div>
  </div>
</div>

<div id="pointerleave-container">
  <div id="pointerleave-action-element" jsaction="pointerleave:handlePointerLeave">
    <div id="pointerleave-target-element"></div>
  </div>
</div>
`;
function getRequiredElementById(id) {
    const element = document.getElementById(id);
    expect(element).not.toBeNull();
    return element;
}
function createEventContract({ container, eventTypes, }) {
    const eventContract = new eventcontract_1.EventContract(new event_contract_container_1.EventContractContainer(container));
    for (const eventType of eventTypes) {
        if (typeof eventType === 'string') {
            eventContract.addEvent(eventType);
        }
        else {
            const [aliasedEventType, aliasEventType] = eventType;
            eventContract.addEvent(aliasedEventType, aliasEventType);
        }
    }
    return eventContract;
}
function createClickEvent() {
    return new MouseEvent('click', { bubbles: true, cancelable: true });
}
function dispatchMouseEvent(target, { type = 'click', ctrlKey = false, altKey = false, shiftKey = false, metaKey = false, relatedTarget = null, } = {}) {
    // createEvent/initMouseEvent is used to support IE11
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, ctrlKey, altKey, shiftKey, metaKey, 0, relatedTarget);
    // tslint:enable:deprecation
    spyOn(event, 'preventDefault').and.callThrough();
    target.dispatchEvent(event);
    return event;
}
function dispatchKeyboardEvent(target, { type = 'keydown', key = '', location = 0, ctrlKey = false, altKey = false, shiftKey = false, metaKey = false, } = {}) {
    // createEvent/initKeyboardEvent is used to support IE11
    const event = document.createEvent('KeyboardEvent');
    event.initKeyboardEvent(type, true, true, window, key, location, ctrlKey, altKey, shiftKey, metaKey);
    // tslint:enable:deprecation
    // This is necessary as Chrome does not respect the key parameter in
    // `initKeyboardEvent`.
    Object.defineProperty(event, 'key', { value: key });
    spyOn(event, 'preventDefault').and.callThrough();
    target.dispatchEvent(event);
    return event;
}
function createTestActionInfo({ name = 'handleClick', element = document.createElement('div'), } = {}) {
    return { name, element };
}
function createTestEventInfoWrapper({ eventType = 'click', event = createClickEvent(), targetElement = document.createElement('div'), container = document.createElement('div'), timestamp = 0, action = createTestActionInfo(), isReplay = undefined, } = {}) {
    return new event_info_1.EventInfoWrapper((0, event_info_1.createEventInfo)({
        event,
        eventType,
        targetElement,
        container,
        timestamp,
        action,
        isReplay,
    }));
}
function createDispatchDelegateSpy() {
    return jasmine.createSpy('dispatchDelegate');
}
function createDispatcher({ dispatchDelegate, eventContract, eventReplayer, a11yClickSupport = false, syntheticMouseEventSupport = false, }) {
    const actionResolver = new action_resolver_1.ActionResolver({ syntheticMouseEventSupport });
    if (a11yClickSupport) {
        actionResolver.addA11yClickSupport(a11y_click_1.updateEventInfoForA11yClick, a11y_click_1.preventDefaultForA11yClick, a11y_click_1.populateClickOnlyAction);
    }
    const dispatcher = new dispatcher_1.Dispatcher(dispatchDelegate, { actionResolver, eventReplayer });
    if (eventContract) {
        (0, dispatcher_1.registerDispatcher)(eventContract, dispatcher);
    }
    return dispatcher;
}
describe('Dispatcher', () => {
    beforeEach(() => {
        html_1.safeElement.setInnerHtml(document.body, (0, html_1.testonlyHtml)(domContent));
        // Normalize timestamp.
        spyOn(Date, 'now').and.returnValue(0);
    });
    it('dispatches event', () => {
        var _a, _b;
        const container = getRequiredElementById('click-container');
        const actionElement = getRequiredElementById('click-action-element');
        const targetElement = getRequiredElementById('click-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('dispatches event when targetElement is actionElement', () => {
        var _a, _b;
        const container = getRequiredElementById('self-click-container');
        const targetElement = getRequiredElementById('self-click-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(targetElement);
    });
    it('dispatch event to child and ignore parent', () => {
        var _a, _b;
        const container = getRequiredElementById('parent-and-child-container');
        const actionElement = getRequiredElementById('parent-and-child-action-element');
        const targetElement = getRequiredElementById('parent-and-child-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('childHandleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('dispatch event through owner', () => {
        var _a, _b;
        const container = getRequiredElementById('owner-click-container');
        const actionElement = getRequiredElementById('owner-click-action-element');
        const targetElement = getRequiredElementById('owner-click-target-element');
        targetElement[property_1.Property.OWNER] = actionElement;
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('ownerHandleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('dispatches modified click event', () => {
        var _a, _b;
        const container = getRequiredElementById('clickmod-container');
        const actionElement = getRequiredElementById('clickmod-action-element');
        const targetElement = getRequiredElementById('clickmod-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement, { shiftKey: true });
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('clickmod');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClickMod');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('caches jsaction attribute', () => {
        var _a, _b, _c, _d;
        const container = getRequiredElementById('click-container');
        const actionElement = getRequiredElementById('click-action-element');
        const targetElement = getRequiredElementById('click-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        let clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        let eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        actionElement.setAttribute('jsaction', 'renamedHandleClick');
        dispatchDelegate.calls.reset();
        clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_c = eventInfoWrapper.getAction()) === null || _c === void 0 ? void 0 : _c.name).toBe('handleClick');
        expect((_d = eventInfoWrapper.getAction()) === null || _d === void 0 ? void 0 : _d.element).toBe(actionElement);
    });
    it('re-parses jsaction attribute if the action cache is cleared', () => {
        var _a, _b, _c, _d;
        const container = getRequiredElementById('click-container');
        const actionElement = getRequiredElementById('click-action-element');
        const targetElement = getRequiredElementById('click-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        let clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        let eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        actionElement.setAttribute('jsaction', 'renamedHandleClick');
        // Clear attribute cache.
        cache.clear(actionElement);
        dispatchDelegate.calls.reset();
        clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_c = eventInfoWrapper.getAction()) === null || _c === void 0 ? void 0 : _c.name).toBe('renamedHandleClick');
        expect((_d = eventInfoWrapper.getAction()) === null || _d === void 0 ? void 0 : _d.element).toBe(actionElement);
    });
    it('handles trailing semicolon in jsaction attribute', () => {
        var _a, _b;
        const container = getRequiredElementById('trailing-semicolon-container');
        const actionElement = getRequiredElementById('trailing-semicolon-action-element');
        const targetElement = getRequiredElementById('trailing-semicolon-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('handles jsaction attributes without action names, first action', () => {
        var _a, _b;
        const container = getRequiredElementById('no-action-name-container');
        const actionElement = getRequiredElementById('no-action-name-action-element');
        const targetElement = getRequiredElementById('no-action-name-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click', 'keydown', 'keyup'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const keydownEvent = dispatchKeyboardEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('keydown');
        expect(eventInfoWrapper.getEvent()).toBe(keydownEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('handles jsaction attributes without action names, last action', () => {
        var _a, _b;
        const container = getRequiredElementById('no-action-name-container');
        const actionElement = getRequiredElementById('no-action-name-action-element');
        const targetElement = getRequiredElementById('no-action-name-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click', 'keydown', 'keyup'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const keyupEvent = dispatchKeyboardEvent(targetElement, { type: 'keyup' });
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('keyup');
        expect(eventInfoWrapper.getEvent()).toBe(keyupEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('does not handle jsaction attributes without event type or action name', () => {
        const container = getRequiredElementById('no-action-name-container');
        const targetElement = getRequiredElementById('no-action-name-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click', 'keydown', 'keyup'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect(eventInfoWrapper.getAction()).toBeUndefined();
    });
    it('dispatches event from shadow dom', () => {
        var _a, _b;
        const container = getRequiredElementById('shadow-dom-container');
        const actionElement = getRequiredElementById('shadow-dom-action-element');
        // Not supported in ie11.
        if (!actionElement.attachShadow) {
            return;
        }
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const shadow = actionElement.attachShadow({ mode: 'open' });
        const shadowChild = document.createElement('div');
        shadow.appendChild(shadowChild);
        shadowChild.click();
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        // Target element is set to the host from the event.
        expect(eventInfoWrapper.getTargetElement()).toBe(actionElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
    });
    it('replays to dispatchDelegate', () => {
        const dispatchDelegate = createDispatchDelegateSpy();
        const dispatcher = createDispatcher({ dispatchDelegate });
        const eventInfoWrappers = [
            createTestEventInfoWrapper({ isReplay: true }),
            createTestEventInfoWrapper({ isReplay: true }),
            createTestEventInfoWrapper({ isReplay: true }),
        ];
        for (const eventInfoWrapper of eventInfoWrappers) {
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
        }
        expect(dispatchDelegate).toHaveBeenCalledTimes(3);
        for (let i = 0; i < eventInfoWrappers.length; i++) {
            expect(dispatchDelegate.calls.argsFor(i)).toEqual([eventInfoWrappers[i]]);
        }
    });
    it('replays to event replayer', () => __awaiter(void 0, void 0, void 0, function* () {
        const dispatchDelegate = createDispatchDelegateSpy();
        const eventReplayer = jasmine.createSpy('eventReplayer');
        const dispatcher = createDispatcher({ dispatchDelegate, eventReplayer });
        const eventInfoWrappers = [
            createTestEventInfoWrapper({ isReplay: true }),
            createTestEventInfoWrapper({ isReplay: true }),
            createTestEventInfoWrapper({ isReplay: true }),
        ];
        for (const eventInfoWrapper of eventInfoWrappers) {
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
        }
        yield Promise.resolve();
        expect(dispatchDelegate).toHaveBeenCalledTimes(0);
        expect(eventReplayer).toHaveBeenCalledWith(eventInfoWrappers);
    }));
    it('prevents default for click on anchor child', () => {
        var _a, _b;
        const container = getRequiredElementById('anchor-click-container');
        const actionElement = getRequiredElementById('anchor-click-action-element');
        const targetElement = getRequiredElementById('anchor-click-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement);
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('click');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        expect(clickEvent.preventDefault).toHaveBeenCalled();
    });
    it('prevents default for modified click on anchor child', () => {
        var _a, _b;
        const container = getRequiredElementById('anchor-clickmod-container');
        const actionElement = getRequiredElementById('anchor-clickmod-action-element');
        const targetElement = getRequiredElementById('anchor-clickmod-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = jasmine.createSpy('dispatchDelegate');
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement, { shiftKey: true });
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('clickmod');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClickMod');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        expect(clickEvent.preventDefault).toHaveBeenCalled();
    });
    it('does not prevent default for modified click on non-anchor child', () => {
        var _a, _b;
        const container = getRequiredElementById('clickmod-container');
        const actionElement = getRequiredElementById('clickmod-action-element');
        const targetElement = getRequiredElementById('clickmod-target-element');
        const eventContract = createEventContract({
            container,
            eventTypes: ['click'],
        });
        const dispatchDelegate = createDispatchDelegateSpy();
        createDispatcher({ dispatchDelegate, eventContract });
        const clickEvent = dispatchMouseEvent(targetElement, { shiftKey: true });
        expect(dispatchDelegate).toHaveBeenCalledTimes(1);
        const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
        expect(eventInfoWrapper.getEventType()).toBe('clickmod');
        expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
        expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
        expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClickMod');
        expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        expect(clickEvent.preventDefault).not.toHaveBeenCalled();
    });
    describe('a11y click', () => {
        it('dispatches keydown as click event', () => {
            var _a, _b;
            const container = getRequiredElementById('a11y-click-container');
            const actionElement = getRequiredElementById('a11y-click-action-element');
            const targetElement = getRequiredElementById('a11y-click-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['click', 'keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const keydownEvent = dispatchKeyboardEvent(targetElement, { key: 'Enter' });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('click');
            expect(eventInfoWrapper.getEvent()).toBe(keydownEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('dispatches keydown event', () => {
            var _a, _b;
            const container = getRequiredElementById('keydown-container');
            const actionElement = getRequiredElementById('keydown-action-element');
            const targetElement = getRequiredElementById('keydown-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const keydownEvent = dispatchKeyboardEvent(targetElement, { key: 'a' });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('keydown');
            expect(eventInfoWrapper.getEvent()).toBe(keydownEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleKeydown');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('dispatches clickonly event', () => {
            var _a, _b;
            const container = getRequiredElementById('a11y-clickonly-container');
            const actionElement = getRequiredElementById('a11y-clickonly-action-element');
            const targetElement = getRequiredElementById('a11y-clickonly-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['click', 'keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const clickEvent = dispatchMouseEvent(targetElement);
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('clickonly');
            expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClickOnly');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('dispatches click event to click handler rather than clickonly', () => {
            var _a, _b;
            const container = getRequiredElementById('a11y-click-clickonly-container');
            const actionElement = getRequiredElementById('a11y-click-clickonly-action-element');
            const targetElement = getRequiredElementById('a11y-click-clickonly-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['click', 'keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const clickEvent = dispatchMouseEvent(targetElement);
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('click');
            expect(eventInfoWrapper.getEvent()).toBe(clickEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('prevents default for enter key on anchor child', () => {
            var _a, _b;
            const container = getRequiredElementById('a11y-anchor-click-container');
            const actionElement = getRequiredElementById('a11y-anchor-click-action-element');
            const targetElement = getRequiredElementById('a11y-anchor-click-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['click', 'keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const keydownEvent = dispatchKeyboardEvent(targetElement, { key: 'Enter' });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('click');
            expect(eventInfoWrapper.getEvent()).toBe(keydownEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
            expect(keydownEvent.preventDefault).toHaveBeenCalled();
        });
        it('prevents default for enter key on anchor child', () => {
            var _a, _b;
            const container = getRequiredElementById('a11y-anchor-click-container');
            const actionElement = getRequiredElementById('a11y-anchor-click-action-element');
            const targetElement = getRequiredElementById('a11y-anchor-click-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['click', 'keydown'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, a11yClickSupport: true });
            const keydownEvent = dispatchKeyboardEvent(targetElement, { key: 'Enter' });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('click');
            expect(eventInfoWrapper.getEvent()).toBe(keydownEvent);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleClick');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
            expect(keydownEvent.preventDefault).toHaveBeenCalled();
        });
    });
    describe('non-bubbling mouse events', () => {
        beforeEach(() => {
            eventcontract_1.EventContract.MOUSE_SPECIAL_SUPPORT = true;
        });
        afterEach(() => {
            eventcontract_1.EventContract.MOUSE_SPECIAL_SUPPORT = false;
        });
        it('dispatches matching mouseover as mouseenter event', () => {
            var _a, _b;
            const container = getRequiredElementById('mouseenter-container');
            const actionElement = getRequiredElementById('mouseenter-action-element');
            const targetElement = getRequiredElementById('mouseenter-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['mouseenter'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'mouseover',
                // Indicates that the mouse exited the container and entered the
                // target element.
                relatedTarget: container,
            });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('mouseenter');
            const syntheticMouseEvent = eventInfoWrapper.getEvent();
            expect(syntheticMouseEvent.type).toBe('mouseenter');
            expect(syntheticMouseEvent.target).toBe(actionElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(actionElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleMouseEnter');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('does not dispatch non-matching mouseover event as mouseenter', () => {
            const container = getRequiredElementById('mouseenter-container');
            const actionElement = getRequiredElementById('mouseenter-action-element');
            const targetElement = getRequiredElementById('mouseenter-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['mouseenter'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'mouseover',
                // Indicates that the mouse exited the action element and entered the
                // target element.
                relatedTarget: actionElement,
            });
            // For failed `mouseenter` events, a global event is still dispatched without an action.
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('mouseenter');
            const mouseEvent = eventInfoWrapper.getEvent();
            expect(mouseEvent.type).toBe('mouseover');
            expect(mouseEvent.target).toBe(targetElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect(eventInfoWrapper.getAction()).toBeUndefined();
        });
        it('dispatches matching mouseout as mouseleave event', () => {
            var _a, _b;
            const container = getRequiredElementById('mouseleave-container');
            const actionElement = getRequiredElementById('mouseleave-action-element');
            const targetElement = getRequiredElementById('mouseleave-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['mouseleave'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'mouseout',
                // Indicates that the mouse entered the container and exited the
                // target element.
                relatedTarget: container,
            });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('mouseleave');
            const syntheticMouseEvent = eventInfoWrapper.getEvent();
            expect(syntheticMouseEvent.type).toBe('mouseleave');
            expect(syntheticMouseEvent.target).toBe(actionElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(actionElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handleMouseLeave');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('does not dispatch non-matching mouseout event as mouseleave', () => {
            const container = getRequiredElementById('mouseleave-container');
            const actionElement = getRequiredElementById('mouseleave-action-element');
            const targetElement = getRequiredElementById('mouseleave-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['mouseleave'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'mouseout',
                // Indicates that the mouse entered the action element and exited the
                // target element.
                relatedTarget: actionElement,
            });
            // For failed `mouseleave` events, a global event is still dispatched without an action.
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('mouseleave');
            const mouseEvent = eventInfoWrapper.getEvent();
            expect(mouseEvent.type).toBe('mouseout');
            expect(mouseEvent.target).toBe(targetElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect(eventInfoWrapper.getAction()).toBeUndefined();
        });
        it('dispatches matching pointerover as pointerenter event', () => {
            var _a, _b;
            const container = getRequiredElementById('pointerenter-container');
            const actionElement = getRequiredElementById('pointerenter-action-element');
            const targetElement = getRequiredElementById('pointerenter-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['pointerenter'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'pointerover',
                // Indicates that the pointer exited the container and entered the
                // target element.
                relatedTarget: container,
            });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('pointerenter');
            const syntheticMouseEvent = eventInfoWrapper.getEvent();
            expect(syntheticMouseEvent.type).toBe('pointerenter');
            expect(syntheticMouseEvent.target).toBe(actionElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(actionElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handlePointerEnter');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('does not dispatch non-matching pointerover event as pointerenter', () => {
            const container = getRequiredElementById('pointerenter-container');
            const actionElement = getRequiredElementById('pointerenter-action-element');
            const targetElement = getRequiredElementById('pointerenter-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['pointerenter'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'pointerover',
                // Indicates that the pointer exited the action element and entered the
                // target element.
                relatedTarget: actionElement,
            });
            // For failed `pointerenter` events, a global event is still dispatched without an action.
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('pointerenter');
            const mouseEvent = eventInfoWrapper.getEvent();
            expect(mouseEvent.type).toBe('pointerover');
            expect(mouseEvent.target).toBe(targetElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect(eventInfoWrapper.getAction()).toBeUndefined();
        });
        it('dispatches matching pointerout as pointerleave event', () => {
            var _a, _b;
            const container = getRequiredElementById('pointerleave-container');
            const actionElement = getRequiredElementById('pointerleave-action-element');
            const targetElement = getRequiredElementById('pointerleave-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['pointerleave'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'pointerout',
                // Indicates that the pointer entered the container and exited the
                // target element.
                relatedTarget: container,
            });
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('pointerleave');
            const syntheticMouseEvent = eventInfoWrapper.getEvent();
            expect(syntheticMouseEvent.type).toBe('pointerleave');
            expect(syntheticMouseEvent.target).toBe(actionElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(actionElement);
            expect((_a = eventInfoWrapper.getAction()) === null || _a === void 0 ? void 0 : _a.name).toBe('handlePointerLeave');
            expect((_b = eventInfoWrapper.getAction()) === null || _b === void 0 ? void 0 : _b.element).toBe(actionElement);
        });
        it('does not dispatch non-matching pointerout event as pointerleave', () => {
            const container = getRequiredElementById('pointerleave-container');
            const actionElement = getRequiredElementById('pointerleave-action-element');
            const targetElement = getRequiredElementById('pointerleave-target-element');
            const eventContract = createEventContract({
                container,
                eventTypes: ['pointerleave'],
            });
            const dispatchDelegate = createDispatchDelegateSpy();
            createDispatcher({ dispatchDelegate, eventContract, syntheticMouseEventSupport: true });
            dispatchMouseEvent(targetElement, {
                type: 'pointerout',
                // Indicates that the pointer entered the action element and exited the
                // target element.
                relatedTarget: actionElement,
            });
            // For failed `pointerleave` events, a global event is still dispatched without an action.
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            const eventInfoWrapper = dispatchDelegate.calls.mostRecent().args[0];
            expect(eventInfoWrapper.getEventType()).toBe('pointerleave');
            const mouseEvent = eventInfoWrapper.getEvent();
            expect(mouseEvent.type).toBe('pointerout');
            expect(mouseEvent.target).toBe(targetElement);
            expect(eventInfoWrapper.getTargetElement()).toBe(targetElement);
            expect(eventInfoWrapper.getAction()).toBeUndefined();
        });
    });
});
