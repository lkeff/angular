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
exports.RoutedComponentInputBinder = exports.INPUT_BINDER = exports.RouterOutlet = exports.ROUTER_OUTLET_DATA = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const router_outlet_context_1 = require("../router_outlet_context");
const router_state_1 = require("../router_state");
const shared_1 = require("../shared");
/**
 * An `InjectionToken` provided by the `RouterOutlet` and can be set using the `routerOutletData`
 * input.
 *
 * When unset, this value is `null` by default.
 *
 * @usageNotes
 *
 * To set the data from the template of the component with `router-outlet`:
 * ```html
 * <router-outlet [routerOutletData]="{name: 'Angular'}" />
 * ```
 *
 * To read the data in the routed component:
 * ```ts
 * data = inject(ROUTER_OUTLET_DATA) as Signal<{name: string}>;
 * ```
 *
 * @publicApi
 */
exports.ROUTER_OUTLET_DATA = new core_1.InjectionToken(ngDevMode ? 'RouterOutlet data' : '');
/**
 * @description
 *
 * Acts as a placeholder that Angular dynamically fills based on the current router state.
 *
 * Each outlet can have a unique name, determined by the optional `name` attribute.
 * The name cannot be set or changed dynamically. If not set, default value is "primary".
 *
 * ```html
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * Named outlets can be the targets of secondary routes.
 * The `Route` object for a secondary route has an `outlet` property to identify the target outlet:
 *
 * `{path: <base-path>, component: <component>, outlet: <target_outlet_name>}`
 *
 * Using named outlets and secondary routes, you can target multiple outlets in
 * the same `RouterLink` directive.
 *
 * The router keeps track of separate branches in a navigation tree for each named outlet and
 * generates a representation of that tree in the URL.
 * The URL for a secondary route uses the following syntax to specify both the primary and secondary
 * routes at the same time:
 *
 * `http://base-path/primary-route-path(outlet-name:route-path)`
 *
 * A router outlet emits an activate event when a new component is instantiated,
 * deactivate event when a component is destroyed.
 * An attached event emits when the `RouteReuseStrategy` instructs the outlet to reattach the
 * subtree, and the detached event emits when the `RouteReuseStrategy` instructs the outlet to
 * detach the subtree.
 *
 * ```html
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'
 *   (attach)='onAttach($event)'
 *   (detach)='onDetach($event)'></router-outlet>
 * ```
 *
 * @see {@link RouterLink}
 * @see {@link Route}
 * @ngModule RouterModule
 *
 * @publicApi
 */
let RouterOutlet = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'router-outlet',
            exportAs: 'outlet',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _activateEvents_decorators;
    let _activateEvents_initializers = [];
    let _activateEvents_extraInitializers = [];
    let _deactivateEvents_decorators;
    let _deactivateEvents_initializers = [];
    let _deactivateEvents_extraInitializers = [];
    let _attachEvents_decorators;
    let _attachEvents_initializers = [];
    let _attachEvents_extraInitializers = [];
    let _detachEvents_decorators;
    let _detachEvents_initializers = [];
    let _detachEvents_extraInitializers = [];
    var RouterOutlet = _classThis = class {
        constructor() {
            this.activated = null;
            this._activatedRoute = null;
            /**
             * The name of the outlet
             *
             */
            this.name = __runInitializers(this, _name_initializers, shared_1.PRIMARY_OUTLET);
            this.activateEvents = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _activateEvents_initializers, new core_1.EventEmitter()));
            this.deactivateEvents = (__runInitializers(this, _activateEvents_extraInitializers), __runInitializers(this, _deactivateEvents_initializers, new core_1.EventEmitter()));
            /**
             * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
             * previously detached subtree.
             **/
            this.attachEvents = (__runInitializers(this, _deactivateEvents_extraInitializers), __runInitializers(this, _attachEvents_initializers, new core_1.EventEmitter()));
            /**
             * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
             * subtree.
             */
            this.detachEvents = (__runInitializers(this, _attachEvents_extraInitializers), __runInitializers(this, _detachEvents_initializers, new core_1.EventEmitter()));
            /**
             * Data that will be provided to the child injector through the `ROUTER_OUTLET_DATA` token.
             *
             * When unset, the value of the token is `undefined` by default.
             */
            this.routerOutletData = (__runInitializers(this, _detachEvents_extraInitializers), (0, core_1.input)(undefined));
            this.parentContexts = (0, core_1.inject)(router_outlet_context_1.ChildrenOutletContexts);
            this.location = (0, core_1.inject)(core_1.ViewContainerRef);
            this.changeDetector = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.inputBinder = (0, core_1.inject)(exports.INPUT_BINDER, { optional: true });
            /** @nodoc */
            this.supportsBindingToComponentInputs = true;
        }
        /** @internal */
        get activatedComponentRef() {
            return this.activated;
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (changes['name']) {
                const { firstChange, previousValue } = changes['name'];
                if (firstChange) {
                    // The first change is handled by ngOnInit. Because ngOnChanges doesn't get called when no
                    // input is set at all, we need to centrally handle the first change there.
                    return;
                }
                // unregister with the old name
                if (this.isTrackedInParentContexts(previousValue)) {
                    this.deactivate();
                    this.parentContexts.onChildOutletDestroyed(previousValue);
                }
                // register the new name
                this.initializeOutletWithName();
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            // Ensure that the registered outlet is this one before removing it on the context.
            if (this.isTrackedInParentContexts(this.name)) {
                this.parentContexts.onChildOutletDestroyed(this.name);
            }
            (_a = this.inputBinder) === null || _a === void 0 ? void 0 : _a.unsubscribeFromRouteData(this);
        }
        isTrackedInParentContexts(outletName) {
            var _a;
            return ((_a = this.parentContexts.getContext(outletName)) === null || _a === void 0 ? void 0 : _a.outlet) === this;
        }
        /** @nodoc */
        ngOnInit() {
            this.initializeOutletWithName();
        }
        initializeOutletWithName() {
            this.parentContexts.onChildOutletCreated(this.name, this);
            if (this.activated) {
                return;
            }
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.parentContexts.getContext(this.name);
            if (context === null || context === void 0 ? void 0 : context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                }
                else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.injector);
                }
            }
        }
        get isActivated() {
            return !!this.activated;
        }
        /**
         * @returns The currently activated component instance.
         * @throws An error if the outlet is not activated.
         */
        get component() {
            if (!this.activated)
                throw new core_1.ɵRuntimeError(4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, (typeof ngDevMode === 'undefined' || ngDevMode) && 'Outlet is not activated');
            return this.activated.instance;
        }
        get activatedRoute() {
            if (!this.activated)
                throw new core_1.ɵRuntimeError(4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, (typeof ngDevMode === 'undefined' || ngDevMode) && 'Outlet is not activated');
            return this._activatedRoute;
        }
        get activatedRouteData() {
            if (this._activatedRoute) {
                return this._activatedRoute.snapshot.data;
            }
            return {};
        }
        /**
         * Called when the `RouteReuseStrategy` instructs to detach the subtree
         */
        detach() {
            if (!this.activated)
                throw new core_1.ɵRuntimeError(4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, (typeof ngDevMode === 'undefined' || ngDevMode) && 'Outlet is not activated');
            this.location.detach();
            const cmp = this.activated;
            this.activated = null;
            this._activatedRoute = null;
            this.detachEvents.emit(cmp.instance);
            return cmp;
        }
        /**
         * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
         */
        attach(ref, activatedRoute) {
            var _a;
            this.activated = ref;
            this._activatedRoute = activatedRoute;
            this.location.insert(ref.hostView);
            (_a = this.inputBinder) === null || _a === void 0 ? void 0 : _a.bindActivatedRouteToOutletComponent(this);
            this.attachEvents.emit(ref.instance);
        }
        deactivate() {
            if (this.activated) {
                const c = this.component;
                this.activated.destroy();
                this.activated = null;
                this._activatedRoute = null;
                this.deactivateEvents.emit(c);
            }
        }
        activateWith(activatedRoute, environmentInjector) {
            var _a;
            if (this.isActivated) {
                throw new core_1.ɵRuntimeError(4013 /* RuntimeErrorCode.OUTLET_ALREADY_ACTIVATED */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'Cannot activate an already activated outlet');
            }
            this._activatedRoute = activatedRoute;
            const location = this.location;
            const snapshot = activatedRoute.snapshot;
            const component = snapshot.component;
            const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            const injector = new OutletInjector(activatedRoute, childContexts, location.injector, this.routerOutletData);
            this.activated = location.createComponent(component, {
                index: location.length,
                injector,
                environmentInjector: environmentInjector,
            });
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            this.changeDetector.markForCheck();
            (_a = this.inputBinder) === null || _a === void 0 ? void 0 : _a.bindActivatedRouteToOutletComponent(this);
            this.activateEvents.emit(this.activated.instance);
        }
    };
    __setFunctionName(_classThis, "RouterOutlet");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, core_1.Input)()];
        _activateEvents_decorators = [(0, core_1.Output)('activate')];
        _deactivateEvents_decorators = [(0, core_1.Output)('deactivate')];
        _attachEvents_decorators = [(0, core_1.Output)('attach')];
        _detachEvents_decorators = [(0, core_1.Output)('detach')];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _activateEvents_decorators, { kind: "field", name: "activateEvents", static: false, private: false, access: { has: obj => "activateEvents" in obj, get: obj => obj.activateEvents, set: (obj, value) => { obj.activateEvents = value; } }, metadata: _metadata }, _activateEvents_initializers, _activateEvents_extraInitializers);
        __esDecorate(null, null, _deactivateEvents_decorators, { kind: "field", name: "deactivateEvents", static: false, private: false, access: { has: obj => "deactivateEvents" in obj, get: obj => obj.deactivateEvents, set: (obj, value) => { obj.deactivateEvents = value; } }, metadata: _metadata }, _deactivateEvents_initializers, _deactivateEvents_extraInitializers);
        __esDecorate(null, null, _attachEvents_decorators, { kind: "field", name: "attachEvents", static: false, private: false, access: { has: obj => "attachEvents" in obj, get: obj => obj.attachEvents, set: (obj, value) => { obj.attachEvents = value; } }, metadata: _metadata }, _attachEvents_initializers, _attachEvents_extraInitializers);
        __esDecorate(null, null, _detachEvents_decorators, { kind: "field", name: "detachEvents", static: false, private: false, access: { has: obj => "detachEvents" in obj, get: obj => obj.detachEvents, set: (obj, value) => { obj.detachEvents = value; } }, metadata: _metadata }, _detachEvents_initializers, _detachEvents_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterOutlet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterOutlet = _classThis;
})();
exports.RouterOutlet = RouterOutlet;
class OutletInjector {
    constructor(route, childContexts, parent, outletData) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
        this.outletData = outletData;
    }
    get(token, notFoundValue) {
        if (token === router_state_1.ActivatedRoute) {
            return this.route;
        }
        if (token === router_outlet_context_1.ChildrenOutletContexts) {
            return this.childContexts;
        }
        if (token === exports.ROUTER_OUTLET_DATA) {
            return this.outletData;
        }
        return this.parent.get(token, notFoundValue);
    }
}
exports.INPUT_BINDER = new core_1.InjectionToken('');
/**
 * Injectable used as a tree-shakable provider for opting in to binding router data to component
 * inputs.
 *
 * The RouterOutlet registers itself with this service when an `ActivatedRoute` is attached or
 * activated. When this happens, the service subscribes to the `ActivatedRoute` observables (params,
 * queryParams, data) and sets the inputs of the component using `ComponentRef.setInput`.
 * Importantly, when an input does not have an item in the route data with a matching key, this
 * input is set to `undefined`. If it were not done this way, the previous information would be
 * retained if the data got removed from the route (i.e. if a query parameter is removed).
 *
 * The `RouterOutlet` should unregister itself when destroyed via `unsubscribeFromRouteData` so that
 * the subscriptions are cleaned up.
 */
let RoutedComponentInputBinder = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoutedComponentInputBinder = _classThis = class {
        constructor() {
            this.outletDataSubscriptions = new Map();
        }
        bindActivatedRouteToOutletComponent(outlet) {
            this.unsubscribeFromRouteData(outlet);
            this.subscribeToRouteData(outlet);
        }
        unsubscribeFromRouteData(outlet) {
            var _a;
            (_a = this.outletDataSubscriptions.get(outlet)) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.outletDataSubscriptions.delete(outlet);
        }
        subscribeToRouteData(outlet) {
            const { activatedRoute } = outlet;
            const dataSubscription = (0, rxjs_1.combineLatest)([
                activatedRoute.queryParams,
                activatedRoute.params,
                activatedRoute.data,
            ])
                .pipe((0, operators_1.switchMap)(([queryParams, params, data], index) => {
                data = Object.assign(Object.assign(Object.assign({}, queryParams), params), data);
                // Get the first result from the data subscription synchronously so it's available to
                // the component as soon as possible (and doesn't require a second change detection).
                if (index === 0) {
                    return (0, rxjs_1.of)(data);
                }
                // Promise.resolve is used to avoid synchronously writing the wrong data when
                // two of the Observables in the `combineLatest` stream emit one after
                // another.
                return Promise.resolve(data);
            }))
                .subscribe((data) => {
                // Outlet may have been deactivated or changed names to be associated with a different
                // route
                if (!outlet.isActivated ||
                    !outlet.activatedComponentRef ||
                    outlet.activatedRoute !== activatedRoute ||
                    activatedRoute.component === null) {
                    this.unsubscribeFromRouteData(outlet);
                    return;
                }
                const mirror = (0, core_1.reflectComponentType)(activatedRoute.component);
                if (!mirror) {
                    this.unsubscribeFromRouteData(outlet);
                    return;
                }
                for (const { templateName } of mirror.inputs) {
                    outlet.activatedComponentRef.setInput(templateName, data[templateName]);
                }
            });
            this.outletDataSubscriptions.set(outlet, dataSubscription);
        }
    };
    __setFunctionName(_classThis, "RoutedComponentInputBinder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutedComponentInputBinder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutedComponentInputBinder = _classThis;
})();
exports.RoutedComponentInputBinder = RoutedComponentInputBinder;
