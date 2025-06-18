"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEventsPlugin = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const event_manager_1 = require("./event_manager");
/**
 * Defines supported modifiers for key events.
 */
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
// The following values are here for cross-browser compatibility and to match the W3C standard
// cf https://www.w3.org/TR/DOM-Level-3-Events-key/
const _keyMap = {
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS',
};
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey,
};
/**
 * A browser plug-in that provides support for handling of key events in Angular.
 */
let KeyEventsPlugin = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = event_manager_1.EventManagerPlugin;
    var KeyEventsPlugin = _classThis = class extends _classSuper {
        /**
         * Initializes an instance of the browser plug-in.
         * @param doc The document in which key events will be detected.
         */
        constructor(doc) {
            super(doc);
        }
        /**
         * Reports whether a named key event is supported.
         * @param eventName The event name to query.
         * @return True if the named key event is supported.
         */
        supports(eventName) {
            return KeyEventsPlugin.parseEventName(eventName) != null;
        }
        /**
         * Registers a handler for a specific element and key event.
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the key event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns The key event that was registered.
         */
        addEventListener(element, eventName, handler, options) {
            const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => {
                return (0, common_1.ɵgetDOM)().onAndCancel(element, parsedEvent['domEventName'], outsideHandler, options);
            });
        }
        /**
         * Parses the user provided full keyboard event definition and normalizes it for
         * later internal use. It ensures the string is all lowercase, converts special
         * characters to a standard spelling, and orders all the values consistently.
         *
         * @param eventName The name of the key event to listen for.
         * @returns an object with the full, normalized string, and the dom event name
         * or null in the case when the event doesn't match a keyboard event.
         */
        static parseEventName(eventName) {
            const parts = eventName.toLowerCase().split('.');
            const domEventName = parts.shift();
            if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
                return null;
            }
            const key = KeyEventsPlugin._normalizeKey(parts.pop());
            let fullKey = '';
            let codeIX = parts.indexOf('code');
            if (codeIX > -1) {
                parts.splice(codeIX, 1);
                fullKey = 'code.';
            }
            MODIFIER_KEYS.forEach((modifierName) => {
                const index = parts.indexOf(modifierName);
                if (index > -1) {
                    parts.splice(index, 1);
                    fullKey += modifierName + '.';
                }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
                // returning null instead of throwing to let another plugin process the event
                return null;
            }
            // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
            //       The code must remain in the `result['domEventName']` form.
            // return {domEventName, fullKey};
            const result = {};
            result['domEventName'] = domEventName;
            result['fullKey'] = fullKey;
            return result;
        }
        /**
         * Determines whether the actual keys pressed match the configured key code string.
         * The `fullKeyCode` event is normalized in the `parseEventName` method when the
         * event is attached to the DOM during the `addEventListener` call. This is unseen
         * by the end user and is normalized for internal consistency and parsing.
         *
         * @param event The keyboard event.
         * @param fullKeyCode The normalized user defined expected key event string
         * @returns boolean.
         */
        static matchEventFullKeyCode(event, fullKeyCode) {
            let keycode = _keyMap[event.key] || event.key;
            let key = '';
            if (fullKeyCode.indexOf('code.') > -1) {
                keycode = event.code;
                key = 'code.';
            }
            // the keycode could be unidentified so we have to check here
            if (keycode == null || !keycode)
                return false;
            keycode = keycode.toLowerCase();
            if (keycode === ' ') {
                keycode = 'space'; // for readability
            }
            else if (keycode === '.') {
                keycode = 'dot'; // because '.' is used as a separator in event names
            }
            MODIFIER_KEYS.forEach((modifierName) => {
                if (modifierName !== keycode) {
                    const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                    if (modifierGetter(event)) {
                        key += modifierName + '.';
                    }
                }
            });
            key += keycode;
            return key === fullKeyCode;
        }
        /**
         * Configures a handler callback for a key event.
         * @param fullKey The event name that combines all simultaneous keystrokes.
         * @param handler The function that responds to the key event.
         * @param zone The zone in which the event occurred.
         * @returns A callback function.
         */
        static eventCallback(fullKey, handler, zone) {
            return (event) => {
                if (KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
                    zone.runGuarded(() => handler(event));
                }
            };
        }
        /** @internal */
        static _normalizeKey(keyName) {
            return keyName === 'esc' ? 'escape' : keyName;
        }
    };
    __setFunctionName(_classThis, "KeyEventsPlugin");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        KeyEventsPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return KeyEventsPlugin = _classThis;
})();
exports.KeyEventsPlugin = KeyEventsPlugin;
