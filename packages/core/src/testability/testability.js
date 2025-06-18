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
exports.TestabilityRegistry = exports.Testability = exports.TESTABILITY_GETTER = exports.TESTABILITY = void 0;
exports.setTestabilityGetter = setTestabilityGetter;
const di_1 = require("../di");
const ng_zone_1 = require("../zone/ng_zone");
/**
 * Internal injection token that can used to access an instance of a Testability class.
 *
 * This token acts as a bridge between the core bootstrap code and the `Testability` class. This is
 * needed to ensure that there are no direct references to the `Testability` class, so it can be
 * tree-shaken away (if not referenced). For the environments/setups when the `Testability` class
 * should be available, this token is used to add a provider that references the `Testability`
 * class. Otherwise, only this token is retained in a bundle, but the `Testability` class is not.
 */
exports.TESTABILITY = new di_1.InjectionToken('');
/**
 * Internal injection token to retrieve Testability getter class instance.
 */
exports.TESTABILITY_GETTER = new di_1.InjectionToken('');
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser.
 *
 * Angular applications bootstrapped using an NgModule (via `@NgModule.bootstrap` field) will also
 * instantiate Testability by default (in both development and production modes).
 *
 * For applications bootstrapped using the `bootstrapApplication` function, Testability is not
 * included by default. You can include it into your applications by getting the list of necessary
 * providers using the `provideProtractorTestingSupport()` function and adding them into the
 * `options.providers` array. Example:
 *
 * ```ts
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, providers: [provideProtractorTestingSupport()]);
 * ```
 *
 * @publicApi
 */
let Testability = (() => {
    let _classDecorators = [(0, di_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Testability = _classThis = class {
        constructor(_ngZone, registry, testabilityGetter) {
            this._ngZone = _ngZone;
            this.registry = registry;
            this._isZoneStable = true;
            this._callbacks = [];
            this.taskTrackingZone = null;
            // If there was no Testability logic registered in the global scope
            // before, register the current testability getter as a global one.
            if (!_testabilityGetter) {
                setTestabilityGetter(testabilityGetter);
                testabilityGetter.addToWindow(registry);
            }
            this._watchAngularEvents();
            _ngZone.run(() => {
                this.taskTrackingZone =
                    typeof Zone == 'undefined' ? null : Zone.current.get('TaskTrackingZone');
            });
        }
        _watchAngularEvents() {
            this._ngZone.onUnstable.subscribe({
                next: () => {
                    this._isZoneStable = false;
                },
            });
            this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.subscribe({
                    next: () => {
                        ng_zone_1.NgZone.assertNotInAngularZone();
                        queueMicrotask(() => {
                            this._isZoneStable = true;
                            this._runCallbacksIfReady();
                        });
                    },
                });
            });
        }
        /**
         * Whether an associated application is stable
         */
        isStable() {
            return this._isZoneStable && !this._ngZone.hasPendingMacrotasks;
        }
        _runCallbacksIfReady() {
            if (this.isStable()) {
                // Schedules the call backs in a new frame so that it is always async.
                queueMicrotask(() => {
                    while (this._callbacks.length !== 0) {
                        let cb = this._callbacks.pop();
                        clearTimeout(cb.timeoutId);
                        cb.doneCb();
                    }
                });
            }
            else {
                // Still not stable, send updates.
                let pending = this.getPendingTasks();
                this._callbacks = this._callbacks.filter((cb) => {
                    if (cb.updateCb && cb.updateCb(pending)) {
                        clearTimeout(cb.timeoutId);
                        return false;
                    }
                    return true;
                });
            }
        }
        getPendingTasks() {
            if (!this.taskTrackingZone) {
                return [];
            }
            // Copy the tasks data so that we don't leak tasks.
            return this.taskTrackingZone.macroTasks.map((t) => {
                return {
                    source: t.source,
                    // From TaskTrackingZone:
                    // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
                    creationLocation: t.creationLocation,
                    data: t.data,
                };
            });
        }
        addCallback(cb, timeout, updateCb) {
            let timeoutId = -1;
            if (timeout && timeout > 0) {
                timeoutId = setTimeout(() => {
                    this._callbacks = this._callbacks.filter((cb) => cb.timeoutId !== timeoutId);
                    cb();
                }, timeout);
            }
            this._callbacks.push({ doneCb: cb, timeoutId: timeoutId, updateCb: updateCb });
        }
        /**
         * Wait for the application to be stable with a timeout. If the timeout is reached before that
         * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
         *
         * @param doneCb The callback to invoke when Angular is stable or the timeout expires
         *    whichever comes first.
         * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
         *    specified, whenStable() will wait forever.
         * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
         *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
         *    and no further updates will be issued.
         */
        whenStable(doneCb, timeout, updateCb) {
            if (updateCb && !this.taskTrackingZone) {
                throw new Error('Task tracking zone is required when passing an update callback to ' +
                    'whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
            }
            this.addCallback(doneCb, timeout, updateCb);
            this._runCallbacksIfReady();
        }
        /**
         * Registers an application with a testability hook so that it can be tracked.
         * @param token token of application, root element
         *
         * @internal
         */
        registerApplication(token) {
            this.registry.registerApplication(token, this);
        }
        /**
         * Unregisters an application.
         * @param token token of application, root element
         *
         * @internal
         */
        unregisterApplication(token) {
            this.registry.unregisterApplication(token);
        }
        /**
         * Find providers by name
         * @param using The root element to search from
         * @param provider The name of binding variable
         * @param exactMatch Whether using exactMatch
         */
        findProviders(using, provider, exactMatch) {
            // TODO(juliemr): implement.
            return [];
        }
    };
    __setFunctionName(_classThis, "Testability");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Testability = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Testability = _classThis;
})();
exports.Testability = Testability;
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
let TestabilityRegistry = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'platform' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestabilityRegistry = _classThis = class {
        constructor() {
            /** @internal */
            this._applications = new Map();
        }
        /**
         * Registers an application with a testability hook so that it can be tracked
         * @param token token of application, root element
         * @param testability Testability hook
         */
        registerApplication(token, testability) {
            this._applications.set(token, testability);
        }
        /**
         * Unregisters an application.
         * @param token token of application, root element
         */
        unregisterApplication(token) {
            this._applications.delete(token);
        }
        /**
         * Unregisters all applications
         */
        unregisterAllApplications() {
            this._applications.clear();
        }
        /**
         * Get a testability hook associated with the application
         * @param elem root element
         */
        getTestability(elem) {
            return this._applications.get(elem) || null;
        }
        /**
         * Get all registered testabilities
         */
        getAllTestabilities() {
            return Array.from(this._applications.values());
        }
        /**
         * Get all registered applications(root elements)
         */
        getAllRootElements() {
            return Array.from(this._applications.keys());
        }
        /**
         * Find testability of a node in the Tree
         * @param elem node
         * @param findInAncestors whether finding testability in ancestors if testability was not found in
         * current node
         */
        findTestabilityInTree(elem, findInAncestors = true) {
            var _a;
            return (_a = _testabilityGetter === null || _testabilityGetter === void 0 ? void 0 : _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors)) !== null && _a !== void 0 ? _a : null;
        }
    };
    __setFunctionName(_classThis, "TestabilityRegistry");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestabilityRegistry = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestabilityRegistry = _classThis;
})();
exports.TestabilityRegistry = TestabilityRegistry;
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @publicApi
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
let _testabilityGetter;
