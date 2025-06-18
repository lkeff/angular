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
exports.ZoneStablePendingTask = exports.PROVIDED_NG_ZONE = exports.NgZoneChangeDetectionScheduler = void 0;
exports.internalProvideZoneChangeDetection = internalProvideZoneChangeDetection;
exports.provideZoneChangeDetection = provideZoneChangeDetection;
exports.getNgZoneOptions = getNgZoneOptions;
const rxjs_1 = require("rxjs");
const application_ref_1 = require("../../application/application_ref");
const di_1 = require("../../di");
const errors_1 = require("../../errors");
const pending_tasks_1 = require("../../pending_tasks");
const performance_1 = require("../../util/performance");
const zone_1 = require("../../zone");
const zoneless_scheduling_1 = require("./zoneless_scheduling");
const flags_1 = require("./flags");
const error_handler_1 = require("../../error_handler");
let NgZoneChangeDetectionScheduler = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgZoneChangeDetectionScheduler = _classThis = class {
        constructor() {
            this.zone = (0, di_1.inject)(zone_1.NgZone);
            this.changeDetectionScheduler = (0, di_1.inject)(zoneless_scheduling_1.ChangeDetectionScheduler);
            this.applicationRef = (0, di_1.inject)(application_ref_1.ApplicationRef);
            this.applicationErrorHandler = (0, di_1.inject)(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER);
        }
        initialize() {
            if (this._onMicrotaskEmptySubscription) {
                return;
            }
            this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    // `onMicroTaskEmpty` can happen _during_ the zoneless scheduler change detection because
                    // zone.run(() => {}) will result in `checkStable` at the end of the `zone.run` closure
                    // and emit `onMicrotaskEmpty` synchronously if run coalsecing is false.
                    if (this.changeDetectionScheduler.runningTick) {
                        return;
                    }
                    this.zone.run(() => {
                        try {
                            this.applicationRef.tick();
                        }
                        catch (e) {
                            this.applicationErrorHandler(e);
                        }
                    });
                },
            });
        }
        ngOnDestroy() {
            var _a;
            (_a = this._onMicrotaskEmptySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        }
    };
    __setFunctionName(_classThis, "NgZoneChangeDetectionScheduler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgZoneChangeDetectionScheduler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgZoneChangeDetectionScheduler = _classThis;
})();
exports.NgZoneChangeDetectionScheduler = NgZoneChangeDetectionScheduler;
/**
 * Internal token used to verify that `provideZoneChangeDetection` is not used
 * with the bootstrapModule API.
 */
exports.PROVIDED_NG_ZONE = new di_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'provideZoneChangeDetection token' : '', { factory: () => false });
function internalProvideZoneChangeDetection({ ngZoneFactory, ignoreChangesOutsideZone, scheduleInRootZone, }) {
    ngZoneFactory !== null && ngZoneFactory !== void 0 ? ngZoneFactory : (ngZoneFactory = () => new zone_1.NgZone(Object.assign(Object.assign({}, getNgZoneOptions()), { scheduleInRootZone })));
    return [
        { provide: zone_1.NgZone, useFactory: ngZoneFactory },
        {
            provide: di_1.ENVIRONMENT_INITIALIZER,
            multi: true,
            useFactory: () => {
                const ngZoneChangeDetectionScheduler = (0, di_1.inject)(NgZoneChangeDetectionScheduler, {
                    optional: true,
                });
                if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
                    ngZoneChangeDetectionScheduler === null) {
                    throw new errors_1.RuntimeError(402 /* RuntimeErrorCode.MISSING_REQUIRED_INJECTABLE_IN_BOOTSTRAP */, `A required Injectable was not found in the dependency injection tree. ` +
                        'If you are bootstrapping an NgModule, make sure that the `BrowserModule` is imported.');
                }
                return () => ngZoneChangeDetectionScheduler.initialize();
            },
        },
        {
            provide: di_1.ENVIRONMENT_INITIALIZER,
            multi: true,
            useFactory: () => {
                const service = (0, di_1.inject)(ZoneStablePendingTask);
                return () => {
                    service.initialize();
                };
            },
        },
        // Always disable scheduler whenever explicitly disabled, even if another place called
        // `provideZoneChangeDetection` without the 'ignore' option.
        ignoreChangesOutsideZone === true ? { provide: zoneless_scheduling_1.ZONELESS_SCHEDULER_DISABLED, useValue: true } : [],
        {
            provide: zoneless_scheduling_1.SCHEDULE_IN_ROOT_ZONE,
            useValue: scheduleInRootZone !== null && scheduleInRootZone !== void 0 ? scheduleInRootZone : flags_1.SCHEDULE_IN_ROOT_ZONE_DEFAULT,
        },
        {
            provide: error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER,
            useFactory: () => {
                const zone = (0, di_1.inject)(zone_1.NgZone);
                const injector = (0, di_1.inject)(di_1.EnvironmentInjector);
                let userErrorHandler;
                return (e) => {
                    userErrorHandler !== null && userErrorHandler !== void 0 ? userErrorHandler : (userErrorHandler = injector.get(error_handler_1.ErrorHandler));
                    zone.runOutsideAngular(() => userErrorHandler.handleError(e));
                };
            },
        },
    ];
}
/**
 * Provides `NgZone`-based change detection for the application bootstrapped using
 * `bootstrapApplication`.
 *
 * `NgZone` is already provided in applications by default. This provider allows you to configure
 * options like `eventCoalescing` in the `NgZone`.
 * This provider is not available for `platformBrowser().bootstrapModule`, which uses
 * `BootstrapOptions` instead.
 *
 * @usageNotes
 * ```ts
 * bootstrapApplication(MyApp, {providers: [
 *   provideZoneChangeDetection({eventCoalescing: true}),
 * ]});
 * ```
 *
 * @publicApi
 * @see {@link /api/platform-browser/bootstrapApplication bootstrapApplication}
 * @see {@link NgZoneOptions}
 */
function provideZoneChangeDetection(options) {
    const ignoreChangesOutsideZone = options === null || options === void 0 ? void 0 : options.ignoreChangesOutsideZone;
    const scheduleInRootZone = options === null || options === void 0 ? void 0 : options.scheduleInRootZone;
    const zoneProviders = internalProvideZoneChangeDetection({
        ngZoneFactory: () => {
            const ngZoneOptions = getNgZoneOptions(options);
            ngZoneOptions.scheduleInRootZone = scheduleInRootZone;
            if (ngZoneOptions.shouldCoalesceEventChangeDetection) {
                (0, performance_1.performanceMarkFeature)('NgZone_CoalesceEvent');
            }
            return new zone_1.NgZone(ngZoneOptions);
        },
        ignoreChangesOutsideZone,
        scheduleInRootZone,
    });
    return (0, di_1.makeEnvironmentProviders)([
        { provide: exports.PROVIDED_NG_ZONE, useValue: true },
        { provide: zoneless_scheduling_1.ZONELESS_ENABLED, useValue: false },
        zoneProviders,
    ]);
}
// Transforms a set of `BootstrapOptions` (supported by the NgModule-based bootstrap APIs) ->
// `NgZoneOptions` that are recognized by the NgZone constructor. Passing no options will result in
// a set of default options returned.
function getNgZoneOptions(options) {
    var _a, _b;
    return {
        enableLongStackTrace: typeof ngDevMode === 'undefined' ? false : !!ngDevMode,
        shouldCoalesceEventChangeDetection: (_a = options === null || options === void 0 ? void 0 : options.eventCoalescing) !== null && _a !== void 0 ? _a : false,
        shouldCoalesceRunChangeDetection: (_b = options === null || options === void 0 ? void 0 : options.runCoalescing) !== null && _b !== void 0 ? _b : false,
    };
}
let ZoneStablePendingTask = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ZoneStablePendingTask = _classThis = class {
        constructor() {
            this.subscription = new rxjs_1.Subscription();
            this.initialized = false;
            this.zone = (0, di_1.inject)(zone_1.NgZone);
            this.pendingTasks = (0, di_1.inject)(pending_tasks_1.PendingTasksInternal);
        }
        initialize() {
            if (this.initialized) {
                return;
            }
            this.initialized = true;
            let task = null;
            if (!this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks) {
                task = this.pendingTasks.add();
            }
            this.zone.runOutsideAngular(() => {
                this.subscription.add(this.zone.onStable.subscribe(() => {
                    zone_1.NgZone.assertNotInAngularZone();
                    // Check whether there are no pending macro/micro tasks in the next tick
                    // to allow for NgZone to update the state.
                    queueMicrotask(() => {
                        if (task !== null &&
                            !this.zone.hasPendingMacrotasks &&
                            !this.zone.hasPendingMicrotasks) {
                            this.pendingTasks.remove(task);
                            task = null;
                        }
                    });
                }));
            });
            this.subscription.add(this.zone.onUnstable.subscribe(() => {
                zone_1.NgZone.assertInAngularZone();
                task !== null && task !== void 0 ? task : (task = this.pendingTasks.add());
            }));
        }
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
    };
    __setFunctionName(_classThis, "ZoneStablePendingTask");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ZoneStablePendingTask = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ZoneStablePendingTask = _classThis;
})();
exports.ZoneStablePendingTask = ZoneStablePendingTask;
