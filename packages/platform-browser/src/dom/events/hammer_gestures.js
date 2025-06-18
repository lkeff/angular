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
exports.HammerModule = exports.HammerGesturesPlugin = exports.HammerGestureConfig = exports.HAMMER_LOADER = exports.HAMMER_GESTURE_CONFIG = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const event_manager_1 = require("./event_manager");
/**
 * Supported HammerJS recognizer event names.
 */
const EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
    'doubletap': true,
};
/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see {@link HammerGestureConfig}
 *
 * @ngModule HammerModule
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
exports.HAMMER_GESTURE_CONFIG = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'HammerGestureConfig' : '');
/**
 * Injection token used to provide a HammerLoader to Angular.
 *
 * @see {@link HammerLoader}
 *
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
exports.HAMMER_LOADER = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'HammerLoader' : '');
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
let HammerGestureConfig = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HammerGestureConfig = _classThis = class {
        constructor() {
            /**
             * A set of supported event names for gestures to be used in Angular.
             * Angular supports all built-in recognizers, as listed in
             * [HammerJS documentation](https://hammerjs.github.io/).
             */
            this.events = [];
            /**
             * Maps gesture event names to a set of configuration options
             * that specify overrides to the default values for specific properties.
             *
             * The key is a supported event name to be configured,
             * and the options object contains a set of properties, with override values
             * to be applied to the named recognizer event.
             * For example, to disable recognition of the rotate event, specify
             *  `{"rotate": {"enable": false}}`.
             *
             * Properties that are not present take the HammerJS default values.
             * For information about which properties are supported for which events,
             * and their allowed and default values, see
             * [HammerJS documentation](https://hammerjs.github.io/).
             *
             */
            this.overrides = {};
        }
        /**
         * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
         * and attaches it to a given HTML element.
         * @param element The element that will recognize gestures.
         * @returns A HammerJS event-manager object.
         */
        buildHammer(element) {
            const mc = new Hammer(element, this.options);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            for (const eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        }
    };
    __setFunctionName(_classThis, "HammerGestureConfig");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HammerGestureConfig = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HammerGestureConfig = _classThis;
})();
exports.HammerGestureConfig = HammerGestureConfig;
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
let HammerGesturesPlugin = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = event_manager_1.EventManagerPlugin;
    var HammerGesturesPlugin = _classThis = class extends _classSuper {
        constructor(doc, _config, _injector, loader) {
            super(doc);
            this._config = _config;
            this._injector = _injector;
            this.loader = loader;
            this._loaderPromise = null;
        }
        supports(eventName) {
            if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
                return false;
            }
            if (!window.Hammer && !this.loader) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    // Get a `Console` through an injector to tree-shake the
                    // class when it is unused in production.
                    const _console = this._injector.get(core_1.ɵConsole);
                    _console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` +
                        `loaded and no custom loader has been specified.`);
                }
                return false;
            }
            return true;
        }
        addEventListener(element, eventName, handler) {
            const zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            // If Hammer is not present but a loader is specified, we defer adding the event listener
            // until Hammer is loaded.
            if (!window.Hammer && this.loader) {
                this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
                // This `addEventListener` method returns a function to remove the added listener.
                // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
                // than remove anything.
                let cancelRegistration = false;
                let deregister = () => {
                    cancelRegistration = true;
                };
                zone.runOutsideAngular(() => this._loaderPromise.then(() => {
                    // If Hammer isn't actually loaded when the custom loader resolves, give up.
                    if (!window.Hammer) {
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            const _console = this._injector.get(core_1.ɵConsole);
                            _console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                        }
                        deregister = () => { };
                        return;
                    }
                    if (!cancelRegistration) {
                        // Now that Hammer is loaded and the listener is being loaded for real,
                        // the deregistration function changes from canceling registration to
                        // removal.
                        deregister = this.addEventListener(element, eventName, handler);
                    }
                }).catch(() => {
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        const _console = this._injector.get(core_1.ɵConsole);
                        _console.warn(`The "${eventName}" event cannot be bound because the custom ` +
                            `Hammer.JS loader failed.`);
                    }
                    deregister = () => { };
                }));
                // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
                // can change the behavior of `deregister` once the listener is added. Using a closure in
                // this way allows us to avoid any additional data structures to track listener removal.
                return () => {
                    deregister();
                };
            }
            return zone.runOutsideAngular(() => {
                // Creating the manager bind events, must be done outside of angular
                const mc = this._config.buildHammer(element);
                const callback = function (eventObj) {
                    zone.runGuarded(function () {
                        handler(eventObj);
                    });
                };
                mc.on(eventName, callback);
                return () => {
                    mc.off(eventName, callback);
                    // destroy mc to prevent memory leak
                    if (typeof mc.destroy === 'function') {
                        mc.destroy();
                    }
                };
            });
        }
        isCustomEvent(eventName) {
            return this._config.events.indexOf(eventName) > -1;
        }
    };
    __setFunctionName(_classThis, "HammerGesturesPlugin");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HammerGesturesPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HammerGesturesPlugin = _classThis;
})();
exports.HammerGesturesPlugin = HammerGesturesPlugin;
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's `EventManager`.
 *
 * @publicApi
 *
 * @deprecated The hammer integration is deprecated. Replace it by your own implementation.
 */
let HammerModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            providers: [
                {
                    provide: event_manager_1.EVENT_MANAGER_PLUGINS,
                    useClass: HammerGesturesPlugin,
                    multi: true,
                    deps: [common_1.DOCUMENT, exports.HAMMER_GESTURE_CONFIG, core_1.Injector, [new core_1.Optional(), exports.HAMMER_LOADER]],
                },
                { provide: exports.HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HammerModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HammerModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HammerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HammerModule = _classThis;
})();
exports.HammerModule = HammerModule;
