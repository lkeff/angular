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
exports.ExampleModule = exports.KeyEventsApp = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
let KeyEventsApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'key-events-app',
            template: `Click in the following area and press a key to display its name:<br />
    <div (keydown)="onKeyDown($event)" class="sample-area" tabindex="0">{{ lastKey }}</div>
    <br />
    Click in the following area and press shift.enter:<br />
    <div
      (keydown.shift.enter)="onShiftEnter($event)"
      (click)="resetShiftEnter()"
      class="sample-area"
      tabindex="0"
    >
      {{ shiftEnter ? 'You pressed shift.enter!' : '' }}
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var KeyEventsApp = _classThis = class {
        constructor() {
            this.lastKey = '(none)';
            this.shiftEnter = false;
        }
        onKeyDown(event) {
            this.lastKey = KeyEventsApp._getEventFullKey(event);
            event.preventDefault();
        }
        onShiftEnter(event) {
            this.shiftEnter = true;
            event.preventDefault();
        }
        resetShiftEnter() {
            this.shiftEnter = false;
        }
        /**
         * Get a more readable version of current pressed keys.
         * @see KeyEventsPlugin.getEventFullKey
         */
        static _getEventFullKey(event) {
            const modifierKeys = ['alt', 'control', 'meta', 'shift'];
            const modifierKeyGetters = {
                'alt': (event) => event.altKey,
                'control': (event) => event.ctrlKey,
                'meta': (event) => event.metaKey,
                'shift': (event) => event.shiftKey,
            };
            let fullKey = '';
            let key = event.key.toLowerCase();
            if (key === ' ') {
                key = 'space'; // for readability
            }
            else if (key === '.') {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            modifierKeys.forEach((modifierName) => {
                if (modifierName != key) {
                    const modifierGetter = modifierKeyGetters[modifierName];
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            return fullKey + key;
        }
    };
    __setFunctionName(_classThis, "KeyEventsApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        KeyEventsApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return KeyEventsApp = _classThis;
})();
exports.KeyEventsApp = KeyEventsApp;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [KeyEventsApp], bootstrap: [KeyEventsApp], imports: [platform_browser_1.BrowserModule] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule = _classThis;
})();
exports.ExampleModule = ExampleModule;
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(ExampleModule);
