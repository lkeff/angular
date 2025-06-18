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
exports.EventManagerPlugin = exports.EventManager = exports.EVENT_MANAGER_PLUGINS = void 0;
const core_1 = require("@angular/core");
/**
 * The injection token for plugins of the `EventManager` service.
 *
 * @publicApi
 */
exports.EVENT_MANAGER_PLUGINS = new core_1.InjectionToken(ngDevMode ? 'EventManagerPlugins' : '');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
let EventManager = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventManager = _classThis = class {
        /**
         * Initializes an instance of the event-manager service.
         */
        constructor(plugins, _zone) {
            this._zone = _zone;
            this._eventNameToPlugin = new Map();
            plugins.forEach((plugin) => {
                plugin.manager = this;
            });
            this._plugins = plugins.slice().reverse();
        }
        /**
         * Registers a handler for a specific element and event.
         *
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @param options Options that configure how the event listener is bound.
         * @returns  A callback function that can be used to remove the handler.
         */
        addEventListener(element, eventName, handler, options) {
            const plugin = this._findPluginFor(eventName);
            return plugin.addEventListener(element, eventName, handler, options);
        }
        /**
         * Retrieves the compilation zone in which event listeners are registered.
         */
        getZone() {
            return this._zone;
        }
        /** @internal */
        _findPluginFor(eventName) {
            let plugin = this._eventNameToPlugin.get(eventName);
            if (plugin) {
                return plugin;
            }
            const plugins = this._plugins;
            plugin = plugins.find((plugin) => plugin.supports(eventName));
            if (!plugin) {
                throw new core_1.ɵRuntimeError(5101 /* RuntimeErrorCode.NO_PLUGIN_FOR_EVENT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `No event manager plugin found for event ${eventName}`);
            }
            this._eventNameToPlugin.set(eventName, plugin);
            return plugin;
        }
    };
    __setFunctionName(_classThis, "EventManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventManager = _classThis;
})();
exports.EventManager = EventManager;
/**
 * The plugin definition for the `EventManager` class
 *
 * It can be used as a base class to create custom manager plugins, i.e. you can create your own
 * class that extends the `EventManagerPlugin` one.
 *
 * @publicApi
 */
class EventManagerPlugin {
    // TODO: remove (has some usage in G3)
    constructor(_doc) {
        this._doc = _doc;
    }
}
exports.EventManagerPlugin = EventManagerPlugin;
