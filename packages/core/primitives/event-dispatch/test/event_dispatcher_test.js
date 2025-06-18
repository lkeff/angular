"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
const event_dispatcher_1 = require("../src/event_dispatcher");
const event_info_1 = require("../src/event_info");
const html_1 = require("./html");
const domContent = `
<div id="click-container">
  <div id="click-action-element" jsaction="click:handleClick">
    <div id="click-target-element"></div>
  </div>
</div>

<div id="bubbling-container">
  <div id="bubbling-third-action-element" jsaction="click:thirdHandleClick">
    <div id="bubbling-second-action-element" jsaction="click:secondHandleClick">
      <div id="bubbling-first-action-element" jsaction="click:firstHandleClick">
        <div id="bubbling-target-element"></div>
      </div>
    </div>
  </div>
</div>
`;
function getRequiredElementById(id) {
    const element = document.getElementById(id);
    expect(element).not.toBeNull();
    return element;
}
function createClickEvent() {
    return new MouseEvent('click', { bubbles: true, cancelable: true });
}
function createTestEventInfoWrapper({ eventType = 'click', event = createClickEvent(), targetElement = getRequiredElementById('click-target-element'), container = getRequiredElementById('click-container'), timestamp = 0, isReplay, } = {}) {
    return new event_info_1.EventInfoWrapper((0, event_info_1.createEventInfo)({
        event,
        eventType,
        targetElement,
        container,
        timestamp,
        isReplay,
    }));
}
describe('EventDispatcher', () => {
    beforeEach(() => {
        html_1.safeElement.setInnerHtml(document.body, (0, html_1.testonlyHtml)(domContent));
    });
    it('dispatches to dispatchDelegate', () => {
        const dispatchDelegate = jasmine
            .createSpy('dispatchDelegate')
            .and.callFake((event) => {
            expect(event.currentTarget).toBe(getRequiredElementById('click-action-element'));
        });
        const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
        const eventInfoWrapper = createTestEventInfoWrapper();
        dispatcher.dispatch(eventInfoWrapper.eventInfo);
        expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'handleClick');
    });
    it('replays to dispatchDelegate', () => __awaiter(void 0, void 0, void 0, function* () {
        const dispatchDelegate = jasmine
            .createSpy('dispatchDelegate')
            .and.callFake((event) => {
            expect(event.currentTarget).toBe(getRequiredElementById('click-action-element'));
            expect(event.target).toBe(getRequiredElementById('click-target-element'));
            expect(event.eventPhase).toBe(event_dispatcher_1.EventPhase.REPLAY);
            expect(() => {
                event.preventDefault();
            }).toThrow();
            expect(() => {
                event.composedPath();
            }).toThrow();
        });
        const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
        const eventInfoWrapper = createTestEventInfoWrapper({ isReplay: true });
        dispatcher.dispatch(eventInfoWrapper.eventInfo);
        yield Promise.resolve();
        expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'handleClick');
    }));
    describe('bubbling', () => {
        it('dispatches to multiple elements', () => {
            const container = getRequiredElementById('bubbling-container');
            const targetElement = getRequiredElementById('bubbling-target-element');
            const currentTarget = jasmine.createSpy('currentTarget');
            const dispatchDelegate = jasmine
                .createSpy('dispatchDelegate')
                .and.callFake((event) => {
                currentTarget(event.currentTarget);
            });
            const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
            const eventInfoWrapper = createTestEventInfoWrapper({ container, targetElement });
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
            expect(dispatchDelegate).toHaveBeenCalledTimes(3);
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'firstHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-first-action-element'));
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'secondHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-second-action-element'));
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'thirdHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-third-action-element'));
        });
        it('dispatches to multiple elements in replay', () => __awaiter(void 0, void 0, void 0, function* () {
            const container = getRequiredElementById('bubbling-container');
            const targetElement = getRequiredElementById('bubbling-target-element');
            const currentTarget = jasmine.createSpy('currentTarget');
            const dispatchDelegate = jasmine
                .createSpy('dispatchDelegate')
                .and.callFake((event) => {
                currentTarget(event.currentTarget);
            });
            const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
            const eventInfoWrapper = createTestEventInfoWrapper({
                container,
                targetElement,
                isReplay: true,
            });
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
            yield Promise.resolve();
            expect(dispatchDelegate).toHaveBeenCalledTimes(3);
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'firstHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-first-action-element'));
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'secondHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-second-action-element'));
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'thirdHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-third-action-element'));
        }));
        it('stops dispatch if `stopPropagation` is called', () => {
            const container = getRequiredElementById('bubbling-container');
            const targetElement = getRequiredElementById('bubbling-target-element');
            const currentTarget = jasmine.createSpy('currentTarget');
            const dispatchDelegate = jasmine
                .createSpy('dispatchDelegate')
                .and.callFake((event) => {
                currentTarget(event.currentTarget);
                event.stopPropagation();
            });
            const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
            const eventInfoWrapper = createTestEventInfoWrapper({ container, targetElement });
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'firstHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-first-action-element'));
        });
        it('stops dispatch if `stopPropagation` is called in replay', () => __awaiter(void 0, void 0, void 0, function* () {
            const container = getRequiredElementById('bubbling-container');
            const targetElement = getRequiredElementById('bubbling-target-element');
            const currentTarget = jasmine.createSpy('currentTarget');
            const dispatchDelegate = jasmine
                .createSpy('dispatchDelegate')
                .and.callFake((event) => {
                currentTarget(event.currentTarget);
                event.stopPropagation();
            });
            const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
            const eventInfoWrapper = createTestEventInfoWrapper({
                container,
                targetElement,
                isReplay: true,
            });
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
            yield Promise.resolve();
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'firstHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-first-action-element'));
        }));
        it('stops dispatch if `stopImmediatePropagation` is called', () => {
            const container = getRequiredElementById('bubbling-container');
            const targetElement = getRequiredElementById('bubbling-target-element');
            const currentTarget = jasmine.createSpy('currentTarget');
            const dispatchDelegate = jasmine
                .createSpy('dispatchDelegate')
                .and.callFake((event) => {
                currentTarget(event.currentTarget);
                event.stopImmediatePropagation();
            });
            const dispatcher = new event_dispatcher_1.EventDispatcher(dispatchDelegate);
            const eventInfoWrapper = createTestEventInfoWrapper({ container, targetElement });
            dispatcher.dispatch(eventInfoWrapper.eventInfo);
            expect(dispatchDelegate).toHaveBeenCalledTimes(1);
            expect(dispatchDelegate).toHaveBeenCalledWith(eventInfoWrapper.getEvent(), 'firstHandleClick');
            expect(currentTarget).toHaveBeenCalledWith(getRequiredElementById('bubbling-first-action-element'));
        });
    });
});
