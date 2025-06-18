"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const key_events_1 = require("../../../src/dom/events/key_events");
describe('KeyEventsPlugin', () => {
    it('should ignore unrecognized events', () => {
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown')).toEqual(null);
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup')).toEqual(null);
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.unknownmodifier.enter')).toEqual(null);
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.unknownmodifier.enter')).toEqual(null);
        expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.control.shift.enter')).toEqual(null);
        expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.enter')).toEqual(null);
    });
    it('should correctly parse event names', () => {
        // key with no modifier
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.enter')).toEqual({
            'domEventName': 'keydown',
            'fullKey': 'enter',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.enter')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'enter',
        });
        // key with modifiers:
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift.enter')).toEqual({
            'domEventName': 'keydown',
            'fullKey': 'control.shift.enter',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift.enter')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'control.shift.enter',
        });
        // key with modifiers in a different order:
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control.enter')).toEqual({
            'domEventName': 'keydown',
            'fullKey': 'control.shift.enter',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control.enter')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'control.shift.enter',
        });
        // key that is also a modifier:
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control')).toEqual({
            'domEventName': 'keydown',
            'fullKey': 'shift.control',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'shift.control',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift')).toEqual({
            'domEventName': 'keydown',
            'fullKey': 'control.shift',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'control.shift',
        });
        // key code ordering
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.code.control.shift')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'code.control.shift',
        });
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.code.shift')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'code.control.shift',
        });
        // capitalization gets lowercased
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.code.shift.KeyS')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'code.control.shift.keys',
        });
        // user provided order of `code.` does not matter
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift.code.KeyS')).toEqual({
            'domEventName': 'keyup',
            'fullKey': 'code.control.shift.keys',
        });
        // except for putting `code` at the end
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift.KeyS.code')).toBeNull();
    });
    it('should alias esc to escape', () => {
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.esc')).toEqual(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.escape'));
        expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.Esc')).toEqual(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.escape'));
    });
    it('should match key field', () => {
        const baseKeyboardEvent = {
            isTrusted: true,
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            composed: true,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            type: 'keydown',
        };
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ß', code: 'KeyS', altKey: true })), 'alt.ß')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'S', code: 'KeyS', altKey: true })), 'alt.s')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'F', code: 'KeyF', metaKey: true })), 'meta.f')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ArrowUp', code: 'ArrowUp' })), 'arrowup')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ArrowDown', code: 'ArrowDown' })), 'arrowdown')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'A', code: 'KeyA' })), 'a')).toBeTruthy();
        // special characters
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Esc', code: 'Escape' })), 'escape')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: '\x1B', code: 'Escape' })), 'escape')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: '\b', code: 'Backspace' })), 'backspace')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: '\t', code: 'Tab' })), 'tab')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Del', code: 'Delete' })), 'delete')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: '\x7F', code: 'Delete' })), 'delete')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Left', code: 'ArrowLeft' })), 'arrowleft')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Right', code: 'ArrowRight' })), 'arrowright')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Up', code: 'ArrowUp' })), 'arrowup')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Down', code: 'ArrowDown' })), 'arrowdown')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Menu', code: 'ContextMenu' })), 'contextmenu')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Scroll', code: 'ScrollLock' })), 'scrolllock')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Win', code: 'OS' })), 'os')).toBeTruthy();
    });
    it('should match code field', () => {
        const baseKeyboardEvent = {
            isTrusted: true,
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            composed: true,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            type: 'keydown',
        };
        // Windows
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 's', code: 'KeyS', altKey: true })), 'code.alt.keys')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 's', code: 'KeyS', altKey: true })), 'alt.s')).toBeTruthy();
        // MacOS
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ß', code: 'KeyS', altKey: true })), 'code.alt.keys')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ß', code: 'KeyS', altKey: true })), 'alt.s')).toBeFalsy();
        // Arrow Keys
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ArrowUp', code: 'ArrowUp' })), 'code.arrowup')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'ArrowDown', code: 'ArrowDown' })), 'arrowdown')).toBeTruthy();
        // Basic key match
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'A', code: 'KeyA' })), 'a')).toBeTruthy();
        // Basic code match
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'A', code: 'KeyA' })), 'code.a')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'A', code: 'KeyA' })), 'code.keya')).toBeTruthy();
        // basic special key
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Shift', code: 'LeftShift' })), 'code.shift')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Shift', code: 'LeftShift' })), 'code.leftshift')).toBeTruthy();
        // combination keys with code match
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'AltLeft', shiftKey: true, altKey: true })), 'code.alt.shift.altleft')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'AltLeft', shiftKey: true, altKey: true })), 'code.shift.altleft')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Meta', code: 'MetaLeft', shiftKey: true, metaKey: true })), 'code.meta.shift.metaleft')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'MetaLeft', shiftKey: true, metaKey: true })), 'code.shift.meta')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'S', code: 'KeyS', shiftKey: true, metaKey: true })), 'code.meta.shift.keys')).toBeTruthy();
        // combination keys without code match
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'AltLeft', shiftKey: true, altKey: true })), 'shift.alt')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Meta', code: 'MetaLeft', shiftKey: true, metaKey: true })), 'shift.meta')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'S', code: 'KeyS', shiftKey: true, metaKey: true })), 'meta.shift.s')).toBeTruthy();
        // OS mismatch
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Meta', code: 'MetaLeft', shiftKey: true, metaKey: true })), 'shift.alt')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'AltLeft', shiftKey: true, altKey: true })), 'shift.meta')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Meta', code: 'MetaLeft', shiftKey: true, metaKey: true })), 'code.shift.altleft')).toBeFalsy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: 'Alt', code: 'AltLeft', shiftKey: true, altKey: true })), 'code.shift.metaleft')).toBeFalsy();
        // special key character cases
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: ' ', code: 'Space', shiftKey: false, altKey: false })), 'space')).toBeTruthy();
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { key: '.', code: 'Period', shiftKey: false, altKey: false })), 'dot')).toBeTruthy();
    });
    // unidentified key
    it('should return false when key is unidentified', () => {
        const baseKeyboardEvent = {
            isTrusted: true,
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            composed: true,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            type: 'keydown',
        };
        expect(key_events_1.KeyEventsPlugin.matchEventFullKeyCode(new KeyboardEvent('keydown', Object.assign(Object.assign({}, baseKeyboardEvent), { shiftKey: false, altKey: false })), '')).toBeFalsy();
    });
});
