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
const jsactionEvent = __importStar(require("../src/event"));
const event_type_1 = require("../src/event_type");
const key_code_1 = require("../src/key_code");
function validTarget() {
    const target = document.createElement('div');
    target.setAttribute('tabIndex', '0');
    target.setAttribute('role', 'button');
    return target;
}
function invalidTarget() {
    return document.createElement('div');
}
function roleTarget() {
    const target = document.createElement('div');
    target.setAttribute('tabIndex', '0');
    target.setAttribute('role', 'textbox');
    return target;
}
/**
 * Returns true if the given key or keyCode acts as a click event for the
 * target element.
 * @param keyCodeOrKey A numeric key code or string key value.
 * @param target Optional target element of the keydown event.
 *     Defaults to a button element.
 * @param originalTarget Optional originalTarget of the keydown
 *     Defaults to `opt_target`.
 */
function baseIsActionKeyEvent(keyCodeOrKey, target, originalTarget) {
    var _a;
    const key = typeof keyCodeOrKey === 'string' ? keyCodeOrKey : undefined;
    const keyCode = typeof keyCodeOrKey === 'number' ? keyCodeOrKey : undefined;
    const event = {
        type: event_type_1.EventType.KEYDOWN,
        which: keyCode,
        key,
        target: target !== null && target !== void 0 ? target : validTarget(),
        originalTarget: (_a = originalTarget !== null && originalTarget !== void 0 ? originalTarget : target) !== null && _a !== void 0 ? _a : validTarget(),
    };
    try {
        // isFocusable() in IE calls getBoundingClientRect(), which fails on orphans
        document.body.appendChild(event.target);
        event.target.style.height = '4px'; // Make sure we don't report as hidden.
        event.target.style.width = '4px';
        return jsactionEvent.isActionKeyEvent(event);
    }
    finally {
        document.body.removeChild(event.target);
    }
}
describe('event test.ts', () => {
    let divInternal;
    beforeEach(() => {
        divInternal = document.createElement('div');
    });
    it('add event listener click w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'click', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('click', handler, false);
        expect(eventInfo.eventType).toBe('click');
        expect(eventInfo.capture).toBe(false);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener focus w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'focus', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('focus', handler, true);
        expect(eventInfo.eventType).toBe('focus');
        expect(eventInfo.capture).toBe(true);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener blur w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'blur', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('blur', handler, true);
        expect(eventInfo.eventType).toBe('blur');
        expect(eventInfo.capture).toBe(true);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener error w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'error', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('error', handler, true);
        expect(eventInfo.eventType).toBe('error');
        expect(eventInfo.capture).toBe(true);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener load w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'load', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('load', handler, true);
        expect(eventInfo.eventType).toBe('load');
        expect(eventInfo.capture).toBe(true);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener toggle w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'toggle', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('toggle', handler, true);
        expect(eventInfo.eventType).toBe('toggle');
        expect(eventInfo.capture).toBe(true);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener touchstart w3 c', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, false);
        expect(eventInfo.eventType).toBe('touchstart');
        expect(eventInfo.capture).toBe(false);
        expect(eventInfo.passive).toBeUndefined();
    });
    it('add event listener touchstart w3 c with passive:false', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler, false);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, {
            capture: false,
            passive: false,
        });
        expect(eventInfo.eventType).toBe('touchstart');
        expect(eventInfo.capture).toBe(false);
        expect(eventInfo.passive).toBe(false);
    });
    it('add event listener touchstart w3 c with passive:true', () => {
        const addEventListenerSpy = spyOn(divInternal, 'addEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler, true);
        expect(addEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, {
            capture: false,
            passive: true,
        });
        expect(eventInfo.eventType).toBe('touchstart');
        expect(eventInfo.capture).toBe(false);
        expect(eventInfo.passive).toBe(true);
    });
    it('remove event listener touchstart w3 c', () => {
        const removeEventListenerSpy = spyOn(divInternal, 'removeEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler);
        jsactionEvent.removeEventListener(divInternal, eventInfo);
        expect(removeEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, false);
    });
    it('remove event listener touchstart w3 c with passive:false', () => {
        const removeEventListenerSpy = spyOn(divInternal, 'removeEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler, false);
        jsactionEvent.removeEventListener(divInternal, eventInfo);
        expect(removeEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, {
            capture: false,
        });
    });
    it('remove event listener touchstart w3 c with passive:true', () => {
        const removeEventListenerSpy = spyOn(divInternal, 'removeEventListener').and.callThrough();
        const handler = () => { };
        const eventInfo = jsactionEvent.addEventListener(divInternal, 'touchstart', handler, true);
        jsactionEvent.removeEventListener(divInternal, eventInfo);
        expect(removeEventListenerSpy).toHaveBeenCalledOnceWith('touchstart', handler, {
            capture: false,
        });
    });
    it('is modified click event mac meta key', () => {
        const event = { metaKey: true };
        jsactionEvent.testing.setIsMac(true);
        expect(jsactionEvent.isModifiedClickEvent(event)).toBe(true);
    });
    it('is modified click event non mac ctrl key', () => {
        const event = { ctrlKey: true };
        jsactionEvent.testing.setIsMac(false);
        expect(jsactionEvent.isModifiedClickEvent(event)).toBe(true);
    });
    it('is modified click event middle click', () => {
        const event = { which: 2 };
        expect(jsactionEvent.isModifiedClickEvent(event)).toBe(true);
    });
    it('is modified click event middle click IE', () => {
        const event = { button: 4 };
        expect(jsactionEvent.isModifiedClickEvent(event)).toBe(true);
    });
    it('is modified click event shift key', () => {
        const event = { shiftKey: true };
        expect(jsactionEvent.isModifiedClickEvent(event)).toBe(true);
    });
    it('is valid action key target', () => {
        const div = document.createElement('div');
        div.setAttribute('role', 'checkbox');
        const textarea = document.createElement('textarea');
        const input = document.createElement('input');
        input.type = 'password';
        expect(jsactionEvent.isValidActionKeyTarget(div)).toBe(true);
        expect(jsactionEvent.isValidActionKeyTarget(textarea)).toBe(false);
        expect(jsactionEvent.isValidActionKeyTarget(input)).toBe(false);
        input.setAttribute('role', 'combobox');
        expect(input.getAttribute('role')).toBe('combobox');
        expect(jsactionEvent.isValidActionKeyTarget(input)).toBe(false);
        const search = document.createElement('search');
        search.type = 'search';
        expect(search.type).toBe('search');
        expect(jsactionEvent.isValidActionKeyTarget(search)).toBe(false);
        const holder = document.createElement('div');
        const num = document.createElement('input');
        num.type = 'number';
        holder.appendChild(num);
        expect(jsactionEvent.isValidActionKeyTarget(num)).toBe(false);
        const div2 = document.createElement('div');
        // contentEditable only works on non-orphaned elements.
        document.body.appendChild(div2);
        div2.contentEditable = 'true';
        div2.setAttribute('role', 'combobox');
        expect(jsactionEvent.isValidActionKeyTarget(div2)).toBe(false);
        div2.removeAttribute('role');
        expect(jsactionEvent.isValidActionKeyTarget(div2)).toBe(false);
        div.removeAttribute('role');
        expect(jsactionEvent.isValidActionKeyTarget(div)).toBe(true);
        document.body.removeChild(div2);
    });
    it('is action key event fails on click', () => {
        const event = { type: 'click', target: validTarget };
        expect(jsactionEvent.isActionKeyEvent(event)).toBe(false);
    });
    it('is action key event fails on invalid key', () => {
        expect(baseIsActionKeyEvent(64)).toBe(false);
        expect(baseIsActionKeyEvent('@')).toBe(false);
    });
    it('is action key event enter', () => {
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER)).toBe(true);
        expect(baseIsActionKeyEvent('Enter')).toBe(true);
    });
    it('is action key event space', () => {
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE)).toBe(true);
        expect(baseIsActionKeyEvent('Enter')).toBe(true);
    });
    it('is action key real check box', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE, checkbox)).toBe(false);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, checkbox)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', checkbox)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', checkbox)).toBe(false);
    });
    it('is action key fake check box', () => {
        const checkbox = document.createElement('div');
        checkbox.setAttribute('tabIndex', '0');
        checkbox.setAttribute('role', 'checkbox');
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE, checkbox)).toBe(true);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, checkbox)).toBe(false);
        expect(baseIsActionKeyEvent(' ', checkbox)).toBe(true);
        expect(baseIsActionKeyEvent('Enter', checkbox)).toBe(false);
    });
    it('is action key event mac enter', () => {
        if (!jsactionEvent.isWebKit) {
            return;
        }
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.MAC_ENTER)).toBe(true);
    });
    it('is action key non control', () => {
        const control = document.createElement('div');
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(false);
    });
    it('is action key disabled control', () => {
        const control = document.createElement('button');
        control.disabled = true;
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(false);
    });
    it('is action key non tabbable control', () => {
        const control = document.createElement('div');
        // Adding role=button will make jsaction treat the div (normally not
        // interactable) as a control, although it will remain non-tabbable.
        control.setAttribute('role', 'button');
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(false);
    });
    it('is action key natively activatable control', () => {
        const control = document.createElement('button');
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE, control)).toBe(false);
        expect(baseIsActionKeyEvent(' ', control)).toBe(false);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(false);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.MAC_ENTER, control)).toBe(false);
    });
    it('is action key file input', () => {
        const control = document.createElement('input');
        control.type = 'file';
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE, control)).toBe(false);
        expect(baseIsActionKeyEvent(' ', control)).toBe(false);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(false);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(false);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.MAC_ENTER, control)).toBe(false);
    });
    it('is action key event not in map', () => {
        const control = document.createElement('div');
        control.setAttribute('tabIndex', '0');
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.ENTER, control)).toBe(true);
        expect(baseIsActionKeyEvent('Enter', control)).toBe(true);
        expect(baseIsActionKeyEvent(key_code_1.KeyCode.SPACE, control)).toBe(false);
        expect(baseIsActionKeyEvent(' ', control)).toBe(false);
    });
    it('is mouse special event mouseenter', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.MOUSEOVER,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, child)).toBe(true);
    });
    it('is mouse special event not mouseenter', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.MOUSEOVER,
            target: root,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, child)).toBe(false);
    });
    it('is mouse special event mouseover', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const subchild = document.createElement('div');
        child.appendChild(subchild);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.MOUSEOVER,
            target: subchild,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSEENTER, subchild)).toBe(true);
    });
    it('is mouse special event mouseleave', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.MOUSEOUT,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, child)).toBe(true);
    });
    it('is mouse special event not mouseleave', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.MOUSEOUT,
            target: root,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, child)).toBe(false);
    });
    it('is mouse special event mouseout', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const subchild = document.createElement('div');
        child.appendChild(subchild);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.MOUSEOUT,
            target: subchild,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, subchild)).toBe(true);
    });
    it('is mouse special event not mouse', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.CLICK,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.MOUSELEAVE, child)).toBe(false);
    });
    it('create mouse special event mouseenter', () => {
        const div = document.createElement('div');
        const event = document.createEvent('MouseEvent');
        event.initEvent('mouseover', false, false);
        div.dispatchEvent(event);
        const copiedEvent = jsactionEvent.createMouseSpecialEvent(event, div);
        expect(copiedEvent.type).toBe(event_type_1.EventType.MOUSEENTER);
        expect(copiedEvent.target).toBe(div);
        expect(copiedEvent.bubbles).toBe(false);
    });
    it('create mouse special event mouseleave', () => {
        const div = document.createElement('div');
        const event = document.createEvent('MouseEvent');
        event.initEvent('mouseout', false, false);
        div.dispatchEvent(event);
        const copiedEvent = jsactionEvent.createMouseSpecialEvent(event, div);
        expect(copiedEvent.type).toBe(event_type_1.EventType.MOUSELEAVE);
        expect(copiedEvent.target).toBe(div);
        expect(copiedEvent.bubbles).toBe(false);
    });
    it('is mouse special event pointerenter', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.POINTEROVER,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, child)).toBe(true);
    });
    it('is mouse special event not pointerenter', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.POINTEROVER,
            target: root,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, child)).toBe(false);
    });
    it('is mouse special event pointerover', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const subchild = document.createElement('div');
        child.appendChild(subchild);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.POINTEROVER,
            target: subchild,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERENTER, subchild)).toBe(true);
    });
    it('is mouse special event pointerleave', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.POINTEROUT,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, child)).toBe(true);
    });
    it('is mouse special event not pointerleave', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.POINTEROUT,
            target: root,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, child)).toBe(false);
    });
    it('is mouse special event pointerout', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const subchild = document.createElement('div');
        child.appendChild(subchild);
        const event = {
            relatedTarget: child,
            type: event_type_1.EventType.POINTEROUT,
            target: subchild,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, root)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, subchild)).toBe(true);
    });
    it('is mouse special event not mouse', () => {
        const root = document.createElement('div');
        const child = document.createElement('div');
        root.appendChild(child);
        const event = {
            relatedTarget: root,
            type: event_type_1.EventType.CLICK,
            target: child,
        };
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, child)).toBe(false);
        expect(jsactionEvent.isMouseSpecialEvent(event, event_type_1.EventType.POINTERLEAVE, child)).toBe(false);
    });
    it('create mouse special event pointerenter', () => {
        const div = document.createElement('div');
        const originalEvent = document.createEvent('MouseEvent');
        originalEvent.initEvent('pointerover', false, false);
        div.dispatchEvent(originalEvent);
        const event = jsactionEvent.createMouseSpecialEvent(originalEvent, div);
        expect(event.type).toBe(event_type_1.EventType.POINTERENTER);
        expect(event.target).toBe(div);
        expect(event.bubbles).toBe(false);
    });
    it('create mouse special event pointerleave', () => {
        const div = document.createElement('div');
        const originalEvent = document.createEvent('MouseEvent');
        originalEvent.initEvent('pointerout', false, false);
        div.dispatchEvent(originalEvent);
        const event = jsactionEvent.createMouseSpecialEvent(originalEvent, div);
        expect(event.type).toBe(event_type_1.EventType.POINTERLEAVE);
        expect(event.target).toBe(div);
        expect(event.bubbles).toBe(false);
    });
    it('recreate touch event with touches as click', () => {
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // touches is readonly.
        originalEvent.touches = [
            { clientX: 1, clientY: 2, screenX: 3, screenY: 4, pageX: 5, pageY: 6 },
            {},
        ];
        const event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        expect(event.type).toBe('click');
        expect(event.clientX).toBe(1);
        expect(event.clientY).toBe(2);
        expect(event.screenX).toBe(3);
        expect(event.screenY).toBe(4);
    });
    it('recreate touch event with changed touches as click', () => {
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // changedTouches is readonly.
        originalEvent.changedTouches = [
            {
                clientX: 'other',
                clientY: 2,
                screenX: 3,
                screenY: 4,
                pageX: 5,
                pageY: 6,
            },
        ];
        const event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        expect(event.type).toBe('click');
        expect(String(event.clientX)).toBe('other');
        expect(event.clientY).toBe(2);
        expect(event.screenX).toBe(3);
        expect(event.screenY).toBe(4);
        // originalEventType is a non-standard added property.
        expect(event.originalEventType).toBe('touchend');
    });
    it('recreate touch event with empty changedTouches and touches as click', () => {
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // changedTouches is readonly.
        originalEvent.changedTouches = [];
        // touches is readonly.
        originalEvent.touches = [{ clientX: 1 }, {}];
        const event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        expect(event.type).toBe('click');
        expect(event.clientX).toBe(1);
    });
    it('recreate touch event as click, has touch data', () => {
        const div = document.createElement('div');
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // touches is readonly.
        originalEvent.touches = [
            { 'clientX': 101, 'clientY': 102, 'screenX': 201, 'screenY': 202 },
        ];
        let event;
        div.addEventListener('touchend', (originalEvent) => {
            event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        });
        div.dispatchEvent(originalEvent);
        expect(event.type).toBe(event_type_1.EventType.CLICK);
        // originalEventType is a non-standard added property.
        expect(event.originalEventType).toBe(event_type_1.EventType.TOUCHEND);
        expect(event.target).toBe(div);
        expect(event.clientX).toBe(101);
        expect(event.clientY).toBe(102);
        expect(event.screenX).toBe(201);
        expect(event.screenY).toBe(202);
    });
    it('recreate touch event as click, no touch data', () => {
        const div = document.createElement('div');
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        let event;
        div.addEventListener('touchend', (originalEvent) => {
            event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        });
        div.dispatchEvent(originalEvent);
        expect(event.type).toBe(event_type_1.EventType.CLICK);
        // originalEventType is a non-standard added property.
        expect(event.originalEventType).toBe(event_type_1.EventType.TOUCHEND);
        expect(event.target).toBe(div);
        expect(event.clientX).toBeUndefined();
        expect(event.clientY).toBeUndefined();
        expect(event.screenX).toBeUndefined();
        expect(event.screenY).toBeUndefined();
    });
    it('recreate touch event as click, behavior', () => {
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // touches is readonly.
        originalEvent.touches = [
            { clientX: 1, clientY: 2, screenX: 3, screenY: 4, pageX: 5, pageY: 6 },
            {},
        ];
        const event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        expect(event.type).toBe('click');
        expect(event.defaultPrevented).toBe(false);
        event.preventDefault();
        expect(event.defaultPrevented).toBe(true);
        // _propagationStopped is a non-standard added property.
        expect(event['_propagationStopped']).toBe(false);
        event.stopPropagation();
        // _propagationStopped is a non-standard added property.
        expect(event['_propagationStopped']).toBe(true);
    });
    it('recreate touch event as click, time stamp', () => {
        const originalEvent = document.createEvent('UIEvent');
        originalEvent.initEvent('touchend', false, false);
        // touches is readonly.
        originalEvent.touches = [
            { clientX: 1, clientY: 2, screenX: 3, screenY: 4, pageX: 5, pageY: 6 },
            {},
        ];
        const event = jsactionEvent.recreateTouchEventAsClick(originalEvent);
        expect(event.type).toBe('click');
        expect(event.timeStamp >= Date.now() - 500).toBe(true);
    });
    it('is space key event', () => {
        let event = {
            target: validTarget(),
            keyCode: key_code_1.KeyCode.SPACE,
        };
        expect(jsactionEvent.isSpaceKeyEvent(event)).toBe(true);
        const input = document.createElement('input');
        input.type = 'checkbox';
        event = { target: input, keyCode: key_code_1.KeyCode.SPACE };
        expect(jsactionEvent.isSpaceKeyEvent(event)).toBe(false);
    });
    it('should call prevent default on native html control', () => {
        let event = { target: validTarget() };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(true);
        event = { target: invalidTarget() };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        event = { target: roleTarget() };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const button = document.createElement('button');
        event = { target: button };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(true);
        const divWithButtonRole = document.createElement('div');
        divWithButtonRole.setAttribute('role', 'button');
        event = { target: divWithButtonRole };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(true);
        const input = document.createElement('input');
        input.type = 'button';
        event = { target: input };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(true);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        event = { target: checkbox };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const radio = document.createElement('input');
        radio.type = 'radio';
        event = { target: radio };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const select = document.createElement('select');
        event = { target: select };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const option = document.createElement('option');
        event = { target: option };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const link = document.createElement('a');
        link.setAttribute('href', 'http://www.google.com');
        event = { target: link };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
        const linkWithRole = document.createElement('a');
        linkWithRole.setAttribute('href', 'http://www.google.com');
        linkWithRole.setAttribute('role', 'menuitem');
        event = { target: linkWithRole };
        expect(jsactionEvent.shouldCallPreventDefaultOnNativeHtmlControl(event)).toBe(false);
    });
});
