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
exports.ApplicationRef = exports.NgProbeToken = exports.APP_BOOTSTRAP_LISTENER = void 0;
exports.publishDefaultGlobalUtils = publishDefaultGlobalUtils;
exports.publishSignalConfiguration = publishSignalConfiguration;
exports.isBoundToModule = isBoundToModule;
exports.optionsReducer = optionsReducer;
exports.remove = remove;
require("../util/ng_hmr_mode");
require("../util/ng_jit_mode");
require("../util/ng_server_mode");
const signals_1 = require("../../primitives/signals");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const zoneless_scheduling_1 = require("../change_detection/scheduling/zoneless_scheduling");
const console_1 = require("../console");
const di_1 = require("../di");
const injectable_1 = require("../di/injectable");
const injection_token_1 = require("../di/injection_token");
const injector_1 = require("../di/injector");
const r3_injector_1 = require("../di/r3_injector");
const errors_1 = require("../errors");
const error_handler_1 = require("../error_handler");
const component_factory_1 = require("../linker/component_factory");
const component_factory_resolver_1 = require("../linker/component_factory_resolver");
const ng_module_factory_1 = require("../linker/ng_module_factory");
const pending_tasks_1 = require("../pending_tasks");
const api_1 = require("../render/api");
const manager_1 = require("../render3/after_render/manager");
const def_getters_1 = require("../render3/def_getters");
const change_detection_1 = require("../render3/instructions/change_detection");
const global_utils_1 = require("../render3/util/global_utils");
const view_utils_1 = require("../render3/util/view_utils");
const testability_1 = require("../testability/testability");
const ng_zone_1 = require("../zone/ng_zone");
const profiler_1 = require("../render3/profiler");
const root_effect_scheduler_1 = require("../render3/reactivity/root_effect_scheduler");
const reactive_lview_consumer_1 = require("../render3/reactive_lview_consumer");
const application_init_1 = require("./application_init");
const tracing_1 = require("./tracing");
/**
 * A DI token that provides a set of callbacks to
 * be called for every component that is bootstrapped.
 *
 * Each callback must take a `ComponentRef` instance and return nothing.
 *
 * `(componentRef: ComponentRef) => void`
 *
 * @publicApi
 */
exports.APP_BOOTSTRAP_LISTENER = new injection_token_1.InjectionToken(ngDevMode ? 'appBootstrapListener' : '');
function publishDefaultGlobalUtils() {
    ngDevMode && (0, global_utils_1.publishDefaultGlobalUtils)();
}
/**
 * Sets the error for an invalid write to a signal to be an Angular `RuntimeError`.
 */
function publishSignalConfiguration() {
    (0, signals_1.setThrowInvalidWriteToSignalError)(() => {
        let errorMessage = '';
        if (ngDevMode) {
            const activeConsumer = (0, signals_1.getActiveConsumer)();
            errorMessage =
                activeConsumer && (0, reactive_lview_consumer_1.isReactiveLViewConsumer)(activeConsumer)
                    ? 'Writing to signals is not allowed while Angular renders the template (eg. interpolations)'
                    : 'Writing to signals is not allowed in a `computed`';
        }
        throw new errors_1.RuntimeError(600 /* RuntimeErrorCode.SIGNAL_WRITE_FROM_ILLEGAL_CONTEXT */, errorMessage);
    });
}
function isBoundToModule(cf) {
    return cf.isBoundToModule;
}
/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * @deprecated
 * @publicApi
 */
class NgProbeToken {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
exports.NgProbeToken = NgProbeToken;
/** Maximum number of times ApplicationRef will refresh all attached views in a single tick. */
const MAXIMUM_REFRESH_RERUNS = 10;
function optionsReducer(dst, objs) {
    if (Array.isArray(objs)) {
        return objs.reduce(optionsReducer, dst);
    }
    return Object.assign(Object.assign({}, dst), objs);
}
/**
 * A reference to an Angular application running on a page.
 *
 * @usageNotes
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```ts
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```ts
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * @publicApi
 */
let ApplicationRef = (() => {
    let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApplicationRef = _classThis = class {
        /** @internal */
        get allViews() {
            return [...this.externalTestViews.keys(), ...this._views];
        }
        /**
         * Indicates whether this instance was destroyed.
         */
        get destroyed() {
            return this._destroyed;
        }
        /**
         * Returns an Observable that indicates when the application is stable or unstable.
         */
        get isStable() {
            // This is a getter because it might be invoked after the application has been destroyed.
            return this.internalPendingTask.hasPendingTasksObservable.pipe((0, operators_1.map)((pending) => !pending));
        }
        constructor() {
            /** @internal */
            this._runningTick = false;
            this._destroyed = false;
            this._destroyListeners = [];
            /** @internal */
            this._views = [];
            this.internalErrorHandler = (0, di_1.inject)(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER);
            this.afterRenderManager = (0, di_1.inject)(manager_1.AfterRenderManager);
            this.zonelessEnabled = (0, di_1.inject)(zoneless_scheduling_1.ZONELESS_ENABLED);
            this.rootEffectScheduler = (0, di_1.inject)(root_effect_scheduler_1.EffectScheduler);
            /**
             * Current dirty state of the application across a number of dimensions (views, afterRender hooks,
             * etc).
             *
             * A flag set here means that `tick()` will attempt to resolve the dirtiness when executed.
             *
             * @internal
             */
            this.dirtyFlags = 0 /* ApplicationRefDirtyFlags.None */;
            /**
             * Most recent snapshot from the `TracingService`, if any.
             *
             * This snapshot attempts to capture the context when `tick()` was first
             * scheduled. It then runs wrapped in this context.
             *
             * @internal
             */
            this.tracingSnapshot = null;
            // Needed for ComponentFixture temporarily during migration of autoDetect behavior
            // Eventually the hostView of the fixture should just attach to ApplicationRef.
            this.externalTestViews = new Set();
            /** @internal */
            this.afterTick = new rxjs_1.Subject();
            /**
             * Get a list of component types registered to this application.
             * This list is populated even before the component is created.
             */
            this.componentTypes = [];
            /**
             * Get a list of components registered to this application.
             */
            this.components = [];
            this.internalPendingTask = (0, di_1.inject)(pending_tasks_1.PendingTasksInternal);
            this._injector = (0, di_1.inject)(r3_injector_1.EnvironmentInjector);
            this._rendererFactory = null;
            this.tickImpl = () => {
                var _a;
                (typeof ngDevMode === 'undefined' || ngDevMode) && warnIfDestroyed(this._destroyed);
                if (this._runningTick) {
                    throw new errors_1.RuntimeError(101 /* RuntimeErrorCode.RECURSIVE_APPLICATION_REF_TICK */, ngDevMode && 'ApplicationRef.tick is called recursively');
                }
                const prevConsumer = (0, signals_1.setActiveConsumer)(null);
                try {
                    this._runningTick = true;
                    this.synchronize();
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        for (let view of this.allViews) {
                            view.checkNoChanges();
                        }
                    }
                }
                finally {
                    this._runningTick = false;
                    (_a = this.tracingSnapshot) === null || _a === void 0 ? void 0 : _a.dispose();
                    this.tracingSnapshot = null;
                    (0, signals_1.setActiveConsumer)(prevConsumer);
                    this.afterTick.next();
                    (0, profiler_1.profiler)(13 /* ProfilerEvent.ChangeDetectionEnd */);
                }
            };
            // Inject the tracing service to initialize it.
            (0, di_1.inject)(tracing_1.TracingService, { optional: true });
        }
        /**
         * @returns A promise that resolves when the application becomes stable
         */
        whenStable() {
            let subscription;
            return new Promise((resolve) => {
                subscription = this.isStable.subscribe({
                    next: (stable) => {
                        if (stable) {
                            resolve();
                        }
                    },
                });
            }).finally(() => {
                subscription.unsubscribe();
            });
        }
        /**
         * The `EnvironmentInjector` used to create this application.
         */
        get injector() {
            return this._injector;
        }
        /**
         * Bootstrap a component onto the element identified by its selector or, optionally, to a
         * specified element.
         *
         * @usageNotes
         * ### Bootstrap process
         *
         * When bootstrapping a component, Angular mounts it onto a target DOM element
         * and kicks off automatic change detection. The target DOM element can be
         * provided using the `rootSelectorOrNode` argument.
         *
         * If the target DOM element is not provided, Angular tries to find one on a page
         * using the `selector` of the component that is being bootstrapped
         * (first matched element is used).
         *
         * ### Example
         *
         * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
         * but it requires us to know the component while writing the application code.
         *
         * Imagine a situation where we have to wait for an API call to decide about the component to
         * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
         * dynamically bootstrap a component.
         *
         * {@example core/ts/platform/platform.ts region='componentSelector'}
         *
         * Optionally, a component can be mounted onto a DOM element that does not match the
         * selector of the bootstrapped component.
         *
         * In the following example, we are providing a CSS selector to match the target element.
         *
         * {@example core/ts/platform/platform.ts region='cssSelector'}
         *
         * While in this example, we are providing reference to a DOM node.
         *
         * {@example core/ts/platform/platform.ts region='domNode'}
         */
        bootstrap(componentOrFactory, rootSelectorOrNode) {
            return this.bootstrapImpl(componentOrFactory, rootSelectorOrNode);
        }
        bootstrapImpl(componentOrFactory, rootSelectorOrNode, injector = injector_1.Injector.NULL) {
            const ngZone = this._injector.get(ng_zone_1.NgZone);
            return ngZone.run(() => {
                (0, profiler_1.profiler)(10 /* ProfilerEvent.BootstrapComponentStart */);
                (typeof ngDevMode === 'undefined' || ngDevMode) && warnIfDestroyed(this._destroyed);
                const isComponentFactory = componentOrFactory instanceof component_factory_1.ComponentFactory;
                const initStatus = this._injector.get(application_init_1.ApplicationInitStatus);
                if (!initStatus.done) {
                    let errorMessage = '';
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        const standalone = !isComponentFactory && (0, def_getters_1.isStandalone)(componentOrFactory);
                        errorMessage =
                            'Cannot bootstrap as there are still asynchronous initializers running.' +
                                (standalone
                                    ? ''
                                    : ' Bootstrap components in the `ngDoBootstrap` method of the root module.');
                    }
                    throw new errors_1.RuntimeError(405 /* RuntimeErrorCode.ASYNC_INITIALIZERS_STILL_RUNNING */, errorMessage);
                }
                let componentFactory;
                if (isComponentFactory) {
                    componentFactory = componentOrFactory;
                }
                else {
                    const resolver = this._injector.get(component_factory_resolver_1.ComponentFactoryResolver);
                    componentFactory = resolver.resolveComponentFactory(componentOrFactory);
                }
                this.componentTypes.push(componentFactory.componentType);
                // Create a factory associated with the current module if it's not bound to some other
                const ngModule = isBoundToModule(componentFactory)
                    ? undefined
                    : this._injector.get(ng_module_factory_1.NgModuleRef);
                const selectorOrNode = rootSelectorOrNode || componentFactory.selector;
                const compRef = componentFactory.create(injector, [], selectorOrNode, ngModule);
                const nativeElement = compRef.location.nativeElement;
                const testability = compRef.injector.get(testability_1.TESTABILITY, null);
                testability === null || testability === void 0 ? void 0 : testability.registerApplication(nativeElement);
                compRef.onDestroy(() => {
                    this.detachView(compRef.hostView);
                    remove(this.components, compRef);
                    testability === null || testability === void 0 ? void 0 : testability.unregisterApplication(nativeElement);
                });
                this._loadComponent(compRef);
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    const _console = this._injector.get(console_1.Console);
                    _console.log(`Angular is running in development mode.`);
                }
                (0, profiler_1.profiler)(11 /* ProfilerEvent.BootstrapComponentEnd */, compRef);
                return compRef;
            });
        }
        /**
         * Invoke this method to explicitly process change detection and its side-effects.
         *
         * In development mode, `tick()` also performs a second change detection cycle to ensure that no
         * further changes are detected. If additional changes are picked up during this second cycle,
         * bindings in the app have side-effects that cannot be resolved in a single change detection
         * pass.
         * In this case, Angular throws an error, since an Angular application can only have one change
         * detection pass during which all change detection must complete.
         */
        tick() {
            if (!this.zonelessEnabled) {
                this.dirtyFlags |= 1 /* ApplicationRefDirtyFlags.ViewTreeGlobal */;
            }
            this._tick();
        }
        /** @internal */
        _tick() {
            (0, profiler_1.profiler)(12 /* ProfilerEvent.ChangeDetectionStart */);
            if (this.tracingSnapshot !== null) {
                // Ensure we always run `tickImpl()` in the context of the most recent snapshot,
                // if one exists. Snapshots may be reference counted by the implementation so
                // we want to ensure that if we request a snapshot that we use it.
                this.tracingSnapshot.run(tracing_1.TracingAction.CHANGE_DETECTION, this.tickImpl);
            }
            else {
                this.tickImpl();
            }
        }
        /**
         * Performs the core work of synchronizing the application state with the UI, resolving any
         * pending dirtiness (potentially in a loop).
         */
        synchronize() {
            if (this._rendererFactory === null && !this._injector.destroyed) {
                this._rendererFactory = this._injector.get(api_1.RendererFactory2, null, { optional: true });
            }
            let runs = 0;
            while (this.dirtyFlags !== 0 /* ApplicationRefDirtyFlags.None */ && runs++ < MAXIMUM_REFRESH_RERUNS) {
                (0, profiler_1.profiler)(14 /* ProfilerEvent.ChangeDetectionSyncStart */);
                this.synchronizeOnce();
                (0, profiler_1.profiler)(15 /* ProfilerEvent.ChangeDetectionSyncEnd */);
            }
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && runs >= MAXIMUM_REFRESH_RERUNS) {
                throw new errors_1.RuntimeError(103 /* RuntimeErrorCode.INFINITE_CHANGE_DETECTION */, ngDevMode &&
                    'Infinite change detection while refreshing application views. ' +
                        'Ensure views are not calling `markForCheck` on every template execution or ' +
                        'that afterRender hooks always mark views for check.');
            }
        }
        /**
         * Perform a single synchronization pass.
         */
        synchronizeOnce() {
            var _a, _b, _c, _d;
            // First, process any dirty root effects.
            if (this.dirtyFlags & 16 /* ApplicationRefDirtyFlags.RootEffects */) {
                this.dirtyFlags &= ~16 /* ApplicationRefDirtyFlags.RootEffects */;
                this.rootEffectScheduler.flush();
            }
            // First check dirty views, if there are any.
            let ranDetectChanges = false;
            if (this.dirtyFlags & 7 /* ApplicationRefDirtyFlags.ViewTreeAny */) {
                // Change detection on views starts in targeted mode (only check components if they're
                // marked as dirty) unless global checking is specifically requested via APIs like
                // `ApplicationRef.tick()` and the `NgZone` integration.
                const useGlobalCheck = Boolean(this.dirtyFlags & 1 /* ApplicationRefDirtyFlags.ViewTreeGlobal */);
                // Clear the view-related dirty flags.
                this.dirtyFlags &= ~7 /* ApplicationRefDirtyFlags.ViewTreeAny */;
                // Set the AfterRender bit, as we're checking views and will need to run afterRender hooks.
                this.dirtyFlags |= 8 /* ApplicationRefDirtyFlags.AfterRender */;
                // Check all potentially dirty views.
                for (let { _lView } of this.allViews) {
                    // When re-checking, only check views which actually need it.
                    if (!useGlobalCheck && !(0, view_utils_1.requiresRefreshOrTraversal)(_lView)) {
                        continue;
                    }
                    const mode = useGlobalCheck && !this.zonelessEnabled
                        ? // Global mode includes `CheckAlways` views.
                            0 /* ChangeDetectionMode.Global */
                        : // Only refresh views with the `RefreshView` flag or views is a changed signal
                            1 /* ChangeDetectionMode.Targeted */;
                    (0, change_detection_1.detectChangesInternal)(_lView, mode);
                    ranDetectChanges = true;
                }
                // If `markForCheck()` was called during view checking, it will have set the `ViewTreeCheck`
                // flag. We clear the flag here because, for backwards compatibility, `markForCheck()`
                // during view checking doesn't cause the view to be re-checked.
                this.dirtyFlags &= ~4 /* ApplicationRefDirtyFlags.ViewTreeCheck */;
                // Check if any views are still dirty after checking and we need to loop back.
                this.syncDirtyFlagsWithViews();
                if (this.dirtyFlags &
                    (7 /* ApplicationRefDirtyFlags.ViewTreeAny */ | 16 /* ApplicationRefDirtyFlags.RootEffects */)) {
                    // If any views or effects are still dirty after checking, loop back before running render
                    // hooks.
                    return;
                }
            }
            if (!ranDetectChanges) {
                // If we skipped refreshing views above, there might still be unflushed animations
                // because we never called `detectChangesInternal` on the views.
                (_b = (_a = this._rendererFactory) === null || _a === void 0 ? void 0 : _a.begin) === null || _b === void 0 ? void 0 : _b.call(_a);
                (_d = (_c = this._rendererFactory) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            // Even if there were no dirty views, afterRender hooks might still be dirty.
            if (this.dirtyFlags & 8 /* ApplicationRefDirtyFlags.AfterRender */) {
                this.dirtyFlags &= ~8 /* ApplicationRefDirtyFlags.AfterRender */;
                this.afterRenderManager.execute();
                // afterRender hooks might influence dirty flags.
            }
            this.syncDirtyFlagsWithViews();
        }
        /**
         * Checks `allViews` for views which require refresh/traversal, and updates `dirtyFlags`
         * accordingly, with two potential behaviors:
         *
         * 1. If any of our views require updating, then this adds the `ViewTreeTraversal` dirty flag.
         *    This _should_ be a no-op, since the scheduler should've added the flag at the same time the
         *    view was marked as needing updating.
         *
         *    TODO(alxhub): figure out if this behavior is still needed for edge cases.
         *
         * 2. If none of our views require updating, then clear the view-related `dirtyFlag`s. This
         *    happens when the scheduler is notified of a view becoming dirty, but the view itself isn't
         *    reachable through traversal from our roots (e.g. it's detached from the CD tree).
         */
        syncDirtyFlagsWithViews() {
            if (this.allViews.some(({ _lView }) => (0, view_utils_1.requiresRefreshOrTraversal)(_lView))) {
                // If after running all afterRender callbacks new views are dirty, ensure we loop back.
                this.dirtyFlags |= 2 /* ApplicationRefDirtyFlags.ViewTreeTraversal */;
                return;
            }
            else {
                // Even though this flag may be set, none of _our_ views require traversal, and so the
                // `ApplicationRef` doesn't require any repeated checking.
                this.dirtyFlags &= ~7 /* ApplicationRefDirtyFlags.ViewTreeAny */;
            }
        }
        /**
         * Attaches a view so that it will be dirty checked.
         * The view will be automatically detached when it is destroyed.
         * This will throw if the view is already attached to a ViewContainer.
         */
        attachView(viewRef) {
            (typeof ngDevMode === 'undefined' || ngDevMode) && warnIfDestroyed(this._destroyed);
            const view = viewRef;
            this._views.push(view);
            view.attachToAppRef(this);
        }
        /**
         * Detaches a view from dirty checking again.
         */
        detachView(viewRef) {
            (typeof ngDevMode === 'undefined' || ngDevMode) && warnIfDestroyed(this._destroyed);
            const view = viewRef;
            remove(this._views, view);
            view.detachFromAppRef();
        }
        _loadComponent(componentRef) {
            this.attachView(componentRef.hostView);
            try {
                this.tick();
            }
            catch (e) {
                this.internalErrorHandler(e);
            }
            this.components.push(componentRef);
            // Get the listeners lazily to prevent DI cycles.
            const listeners = this._injector.get(exports.APP_BOOTSTRAP_LISTENER, []);
            if (ngDevMode && !Array.isArray(listeners)) {
                throw new errors_1.RuntimeError(-209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */, 'Unexpected type of the `APP_BOOTSTRAP_LISTENER` token value ' +
                    `(expected an array, but got ${typeof listeners}). ` +
                    'Please check that the `APP_BOOTSTRAP_LISTENER` token is configured as a ' +
                    '`multi: true` provider.');
            }
            listeners.forEach((listener) => listener(componentRef));
        }
        /** @internal */
        ngOnDestroy() {
            if (this._destroyed)
                return;
            try {
                // Call all the lifecycle hooks.
                this._destroyListeners.forEach((listener) => listener());
                // Destroy all registered views.
                this._views.slice().forEach((view) => view.destroy());
            }
            finally {
                // Indicate that this instance is destroyed.
                this._destroyed = true;
                // Release all references.
                this._views = [];
                this._destroyListeners = [];
            }
        }
        /**
         * Registers a listener to be called when an instance is destroyed.
         *
         * @param callback A callback function to add as a listener.
         * @returns A function which unregisters a listener.
         */
        onDestroy(callback) {
            (typeof ngDevMode === 'undefined' || ngDevMode) && warnIfDestroyed(this._destroyed);
            this._destroyListeners.push(callback);
            return () => remove(this._destroyListeners, callback);
        }
        /**
         * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
         * will destroy the associated environment injectors as well as all the bootstrapped components
         * with their views.
         */
        destroy() {
            if (this._destroyed) {
                throw new errors_1.RuntimeError(406 /* RuntimeErrorCode.APPLICATION_REF_ALREADY_DESTROYED */, ngDevMode && 'This instance of the `ApplicationRef` has already been destroyed.');
            }
            const injector = this._injector;
            // Check that this injector instance supports destroy operation.
            if (injector.destroy && !injector.destroyed) {
                // Destroying an underlying injector will trigger the `ngOnDestroy` lifecycle
                // hook, which invokes the remaining cleanup actions.
                injector.destroy();
            }
        }
        /**
         * Returns the number of attached views.
         */
        get viewCount() {
            return this._views.length;
        }
    };
    __setFunctionName(_classThis, "ApplicationRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApplicationRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApplicationRef = _classThis;
})();
exports.ApplicationRef = ApplicationRef;
function warnIfDestroyed(destroyed) {
    if (destroyed) {
        console.warn((0, errors_1.formatRuntimeError)(406 /* RuntimeErrorCode.APPLICATION_REF_ALREADY_DESTROYED */, 'This instance of the `ApplicationRef` has already been destroyed.'));
    }
}
function remove(list, el) {
    const index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}
