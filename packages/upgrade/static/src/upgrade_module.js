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
exports.UpgradeModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("../common");
const angular1_providers_1 = require("./angular1_providers");
const util_1 = require("./util");
/**
 * @description
 *
 * An `NgModule`, which you import to provide AngularJS core services,
 * and has an instance method used to bootstrap the hybrid upgrade application.
 *
 * *Part of the [upgrade/static](api?query=upgrade/static)
 * library for hybrid upgrade apps that support AOT compilation*
 *
 * The `upgrade/static` package contains helpers that allow AngularJS and Angular components
 * to be used together inside a hybrid upgrade application, which supports AOT compilation.
 *
 * Specifically, the classes and functions in the `upgrade/static` module allow the following:
 *
 * 1. Creation of an Angular directive that wraps and exposes an AngularJS component so
 *    that it can be used in an Angular template. See `UpgradeComponent`.
 * 2. Creation of an AngularJS directive that wraps and exposes an Angular component so
 *    that it can be used in an AngularJS template. See `downgradeComponent`.
 * 3. Creation of an Angular root injector provider that wraps and exposes an AngularJS
 *    service so that it can be injected into an Angular context. See
 *    {@link UpgradeModule#upgrading-an-angular-1-service Upgrading an AngularJS service} below.
 * 4. Creation of an AngularJS service that wraps and exposes an Angular injectable
 *    so that it can be injected into an AngularJS context. See `downgradeInjectable`.
 * 5. Bootstrapping of a hybrid Angular application which contains both of the frameworks
 *    coexisting in a single application.
 *
 * @usageNotes
 *
 * ```ts
 * import {UpgradeModule} from '@angular/upgrade/static';
 * ```
 *
 * See also the {@link UpgradeModule#examples examples} below.
 *
 * ### Mental Model
 *
 * When reasoning about how a hybrid application works it is useful to have a mental model which
 * describes what is happening and explains what is happening at the lowest level.
 *
 * 1. There are two independent frameworks running in a single application, each framework treats
 *    the other as a black box.
 * 2. Each DOM element on the page is owned exactly by one framework. Whichever framework
 *    instantiated the element is the owner. Each framework only updates/interacts with its own
 *    DOM elements and ignores others.
 * 3. AngularJS directives always execute inside the AngularJS framework codebase regardless of
 *    where they are instantiated.
 * 4. Angular components always execute inside the Angular framework codebase regardless of
 *    where they are instantiated.
 * 5. An AngularJS component can be "upgraded"" to an Angular component. This is achieved by
 *    defining an Angular directive, which bootstraps the AngularJS component at its location
 *    in the DOM. See `UpgradeComponent`.
 * 6. An Angular component can be "downgraded" to an AngularJS component. This is achieved by
 *    defining an AngularJS directive, which bootstraps the Angular component at its location
 *    in the DOM. See `downgradeComponent`.
 * 7. Whenever an "upgraded"/"downgraded" component is instantiated the host element is owned by
 *    the framework doing the instantiation. The other framework then instantiates and owns the
 *    view for that component.
 *    1. This implies that the component bindings will always follow the semantics of the
 *       instantiation framework.
 *    2. The DOM attributes are parsed by the framework that owns the current template. So
 *       attributes in AngularJS templates must use kebab-case, while AngularJS templates must use
 *       camelCase.
 *    3. However the template binding syntax will always use the Angular style, e.g. square
 *       brackets (`[...]`) for property binding.
 * 8. Angular is bootstrapped first; AngularJS is bootstrapped second. AngularJS always owns the
 *    root component of the application.
 * 9. The new application is running in an Angular zone, and therefore it no longer needs calls to
 *    `$apply()`.
 *
 * ### The `UpgradeModule` class
 *
 * This class is an `NgModule`, which you import to provide AngularJS core services,
 * and has an instance method used to bootstrap the hybrid upgrade application.
 *
 * * Core AngularJS services<br />
 *   Importing this `NgModule` will add providers for the core
 *   [AngularJS services](https://docs.angularjs.org/api/ng/service) to the root injector.
 *
 * * Bootstrap<br />
 *   The runtime instance of this class contains a {@link UpgradeModule#bootstrap `bootstrap()`}
 *   method, which you use to bootstrap the top level AngularJS module onto an element in the
 *   DOM for the hybrid upgrade app.
 *
 *   It also contains properties to access the {@link UpgradeModule#injector root injector}, the
 *   bootstrap `NgZone` and the
 *   [AngularJS $injector](https://docs.angularjs.org/api/auto/service/$injector).
 *
 * ### Examples
 *
 * Import the `UpgradeModule` into your top level Angular {@link NgModule NgModule}.
 *
 * {@example upgrade/static/ts/full/module.ts region='ng2-module'}
 *
 * Then inject `UpgradeModule` into your Angular `NgModule` and use it to bootstrap the top level
 * [AngularJS module](https://docs.angularjs.org/api/ng/type/angular.Module) in the
 * `ngDoBootstrap()` method.
 *
 * {@example upgrade/static/ts/full/module.ts region='bootstrap-ng1'}
 *
 * Finally, kick off the whole process, by bootstrapping your top level Angular `NgModule`.
 *
 * {@example upgrade/static/ts/full/module.ts region='bootstrap-ng2'}
 *
 * ### Upgrading an AngularJS service
 *
 * There is no specific API for upgrading an AngularJS service. Instead you should just follow the
 * following recipe:
 *
 * Let's say you have an AngularJS service:
 *
 * {@example upgrade/static/ts/full/module.ts region="ng1-text-formatter-service"}
 *
 * Then you should define an Angular provider to be included in your `NgModule` `providers`
 * property.
 *
 * {@example upgrade/static/ts/full/module.ts region="upgrade-ng1-service"}
 *
 * Then you can use the "upgraded" AngularJS service by injecting it into an Angular component
 * or service.
 *
 * {@example upgrade/static/ts/full/module.ts region="use-ng1-upgraded-service"}
 *
 * @publicApi
 */
let UpgradeModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ providers: [angular1_providers_1.angular1Providers] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UpgradeModule = _classThis = class {
        constructor(
        /** The root `Injector` for the upgrade application. */
        injector, 
        /** The bootstrap zone for the upgrade application */
        ngZone, 
        /**
         * The owning `NgModuleRef`s `PlatformRef` instance.
         * This is used to tie the lifecycle of the bootstrapped AngularJS apps to that of the Angular
         * `PlatformRef`.
         */
        platformRef) {
            this.ngZone = ngZone;
            this.platformRef = platformRef;
            this.injector = new util_1.NgAdapterInjector(injector);
        }
        /**
         * Bootstrap an AngularJS application from this NgModule
         * @param element the element on which to bootstrap the AngularJS application
         * @param [modules] the AngularJS modules to bootstrap for this application
         * @param [config] optional extra AngularJS bootstrap configuration
         * @return The value returned by
         *     [angular.bootstrap()](https://docs.angularjs.org/api/ng/function/angular.bootstrap).
         */
        bootstrap(element, modules = [], config /*angular.IAngularBootstrapConfig*/) {
            const INIT_MODULE_NAME = common_1.ɵconstants.UPGRADE_MODULE_NAME + '.init';
            // Create an ng1 module to bootstrap
            common_1.ɵangular1
                .module_(INIT_MODULE_NAME, [])
                .constant(common_1.ɵconstants.UPGRADE_APP_TYPE_KEY, 2 /* ɵutil.UpgradeAppType.Static */)
                .value(common_1.ɵconstants.INJECTOR_KEY, this.injector)
                .factory(common_1.ɵconstants.LAZY_MODULE_REF, [
                common_1.ɵconstants.INJECTOR_KEY,
                (injector) => ({ injector }),
            ])
                .config([
                common_1.ɵconstants.$PROVIDE,
                common_1.ɵconstants.$INJECTOR,
                ($provide, $injector) => {
                    if ($injector.has(common_1.ɵconstants.$$TESTABILITY)) {
                        $provide.decorator(common_1.ɵconstants.$$TESTABILITY, [
                            common_1.ɵconstants.$DELEGATE,
                            (testabilityDelegate) => {
                                const originalWhenStable = testabilityDelegate.whenStable;
                                const injector = this.injector;
                                // Cannot use arrow function below because we need the context
                                const newWhenStable = function (callback) {
                                    originalWhenStable.call(testabilityDelegate, function () {
                                        const ng2Testability = injector.get(core_1.Testability);
                                        if (ng2Testability.isStable()) {
                                            callback();
                                        }
                                        else {
                                            ng2Testability.whenStable(newWhenStable.bind(testabilityDelegate, callback));
                                        }
                                    });
                                };
                                testabilityDelegate.whenStable = newWhenStable;
                                return testabilityDelegate;
                            },
                        ]);
                    }
                    if ($injector.has(common_1.ɵconstants.$INTERVAL)) {
                        $provide.decorator(common_1.ɵconstants.$INTERVAL, [
                            common_1.ɵconstants.$DELEGATE,
                            (intervalDelegate) => {
                                // Wrap the $interval service so that setInterval is called outside NgZone,
                                // but the callback is still invoked within it. This is so that $interval
                                // won't block stability, which preserves the behavior from AngularJS.
                                let wrappedInterval = (fn, delay, count, invokeApply, ...pass) => {
                                    return this.ngZone.runOutsideAngular(() => {
                                        return intervalDelegate((...args) => {
                                            // Run callback in the next VM turn - $interval calls
                                            // $rootScope.$apply, and running the callback in NgZone will
                                            // cause a '$digest already in progress' error if it's in the
                                            // same vm turn.
                                            setTimeout(() => {
                                                this.ngZone.run(() => fn(...args));
                                            });
                                        }, delay, count, invokeApply, ...pass);
                                    });
                                };
                                Object.keys(intervalDelegate).forEach((prop) => (wrappedInterval[prop] = intervalDelegate[prop]));
                                // the `flush` method will be present when ngMocks is used
                                if (intervalDelegate.hasOwnProperty('flush')) {
                                    wrappedInterval['flush'] = () => {
                                        intervalDelegate['flush']();
                                        return wrappedInterval;
                                    };
                                }
                                return wrappedInterval;
                            },
                        ]);
                    }
                },
            ])
                .run([
                common_1.ɵconstants.$INJECTOR,
                ($injector) => {
                    this.$injector = $injector;
                    const $rootScope = $injector.get('$rootScope');
                    // Initialize the ng1 $injector provider
                    (0, angular1_providers_1.setTempInjectorRef)($injector);
                    this.injector.get(common_1.ɵconstants.$INJECTOR);
                    // Put the injector on the DOM, so that it can be "required"
                    common_1.ɵangular1.element(element).data(common_1.ɵutil.controllerKey(common_1.ɵconstants.INJECTOR_KEY), this.injector);
                    // Destroy the AngularJS app once the Angular `PlatformRef` is destroyed.
                    // This does not happen in a typical SPA scenario, but it might be useful for
                    // other use-cases where disposing of an Angular/AngularJS app is necessary
                    // (such as Hot Module Replacement (HMR)).
                    // See https://github.com/angular/angular/issues/39935.
                    this.platformRef.onDestroy(() => common_1.ɵutil.destroyApp($injector));
                    // Wire up the ng1 rootScope to run a digest cycle whenever the zone settles
                    // We need to do this in the next tick so that we don't prevent the bootup stabilizing
                    setTimeout(() => {
                        const subscription = this.ngZone.onMicrotaskEmpty.subscribe(() => {
                            if ($rootScope.$$phase) {
                                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                                    console.warn('A digest was triggered while one was already in progress. This may mean that something is triggering digests outside the Angular zone.');
                                }
                                return $rootScope.$evalAsync();
                            }
                            return $rootScope.$digest();
                        });
                        $rootScope.$on('$destroy', () => {
                            subscription.unsubscribe();
                        });
                    }, 0);
                },
            ]);
            const upgradeModule = common_1.ɵangular1.module_(common_1.ɵconstants.UPGRADE_MODULE_NAME, [INIT_MODULE_NAME].concat(modules));
            // Make sure resumeBootstrap() only exists if the current bootstrap is deferred
            const windowAngular = window['angular'];
            windowAngular.resumeBootstrap = undefined;
            // Bootstrap the AngularJS application inside our zone
            const returnValue = this.ngZone.run(() => common_1.ɵangular1.bootstrap(element, [upgradeModule.name], config));
            // Patch resumeBootstrap() to run inside the ngZone
            if (windowAngular.resumeBootstrap) {
                const originalResumeBootstrap = windowAngular.resumeBootstrap;
                const ngZone = this.ngZone;
                windowAngular.resumeBootstrap = function () {
                    let args = arguments;
                    windowAngular.resumeBootstrap = originalResumeBootstrap;
                    return ngZone.run(() => windowAngular.resumeBootstrap.apply(this, args));
                };
            }
            return returnValue;
        }
    };
    __setFunctionName(_classThis, "UpgradeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpgradeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpgradeModule = _classThis;
})();
exports.UpgradeModule = UpgradeModule;
