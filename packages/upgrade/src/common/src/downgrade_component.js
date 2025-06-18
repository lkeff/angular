"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.downgradeComponent = downgradeComponent;
const core_1 = require("@angular/core");
const constants_1 = require("./constants");
const downgrade_component_adapter_1 = require("./downgrade_component_adapter");
const promise_util_1 = require("./promise_util");
const util_1 = require("./util");
/**
 * @description
 *
 * A helper function that allows an Angular component to be used from AngularJS.
 *
 * *Part of the [upgrade/static](api?query=upgrade%2Fstatic)
 * library for hybrid upgrade apps that support AOT compilation*
 *
 * This helper function returns a factory function to be used for registering
 * an AngularJS wrapper directive for "downgrading" an Angular component.
 *
 * @usageNotes
 * ### Examples
 *
 * Let's assume that you have an Angular component called `ng2Heroes` that needs
 * to be made available in AngularJS templates.
 *
 * {@example upgrade/static/ts/full/module.ts region="ng2-heroes"}
 *
 * We must create an AngularJS [directive](https://docs.angularjs.org/guide/directive)
 * that will make this Angular component available inside AngularJS templates.
 * The `downgradeComponent()` function returns a factory function that we
 * can use to define the AngularJS directive that wraps the "downgraded" component.
 *
 * {@example upgrade/static/ts/full/module.ts region="ng2-heroes-wrapper"}
 *
 * For more details and examples on downgrading Angular components to AngularJS components please
 * visit the [Upgrade guide](https://angular.io/guide/upgrade#using-angular-components-from-angularjs-code).
 *
 * @param info contains information about the Component that is being downgraded:
 *
 * - `component: Type<any>`: The type of the Component that will be downgraded
 * - `downgradedModule?: string`: The name of the downgraded module (if any) that the component
 *   "belongs to", as returned by a call to `downgradeModule()`. It is the module, whose
 *   corresponding Angular module will be bootstrapped, when the component needs to be instantiated.
 *   <br />
 *   (This option is only necessary when using `downgradeModule()` to downgrade more than one
 *   Angular module.)
 * - `propagateDigest?: boolean`: Whether to perform {@link /api/core/ChangeDetectorRef#detectChanges detectChanges} on the
 * component on every {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest $digest}.
 *   If set to `false`, change detection will still be performed when any of the component's inputs changes.
 *   (Default: true)
 *
 * @returns a factory function that can be used to register the component in an
 * AngularJS module.
 *
 * @publicApi
 */
function downgradeComponent(info) {
    const directiveFactory = function ($compile, $injector, $parse) {
        var _a;
        const unsafelyOverwriteSignalInputs = (_a = info.unsafelyOverwriteSignalInputs) !== null && _a !== void 0 ? _a : false;
        // When using `downgradeModule()`, we need to handle certain things specially. For example:
        // - We always need to attach the component view to the `ApplicationRef` for it to be
        //   dirty-checked.
        // - We need to ensure callbacks to Angular APIs (e.g. change detection) are run inside the
        //   Angular zone.
        //   NOTE: This is not needed, when using `UpgradeModule`, because `$digest()` will be run
        //         inside the Angular zone (except if explicitly escaped, in which case we shouldn't
        //         force it back in).
        const isNgUpgradeLite = (0, util_1.getUpgradeAppType)($injector) === 3 /* UpgradeAppType.Lite */;
        const wrapCallback = !isNgUpgradeLite
            ? (cb) => cb
            : (cb) => () => (core_1.NgZone.isInAngularZone() ? cb() : ngZone.run(cb));
        let ngZone;
        // When downgrading multiple modules, special handling is needed wrt injectors.
        const hasMultipleDowngradedModules = isNgUpgradeLite && (0, util_1.getDowngradedModuleCount)($injector) > 1;
        return {
            restrict: 'E',
            terminal: true,
            require: [constants_1.REQUIRE_INJECTOR, constants_1.REQUIRE_NG_MODEL],
            // Controller needs to be set so that `angular-component-router.js` (from beta Angular 2)
            // configuration properties can be made available. See:
            // See G3: javascript/angular2/angular1_router_lib.js
            // https://github.com/angular/angular.js/blob/47bf11ee94664367a26ed8c91b9b586d3dd420f5/src/ng/compile.js#L1670-L1691.
            controller: function () { },
            link: (scope, element, attrs, required) => {
                // We might have to compile the contents asynchronously, because this might have been
                // triggered by `UpgradeNg1ComponentAdapterBuilder`, before the Angular templates have
                // been compiled.
                var _a;
                const ngModel = required[1];
                const parentInjector = required[0];
                let moduleInjector = undefined;
                let ranAsync = false;
                if (!parentInjector || hasMultipleDowngradedModules) {
                    const downgradedModule = info.downgradedModule || '';
                    const lazyModuleRefKey = `${constants_1.LAZY_MODULE_REF}${downgradedModule}`;
                    const attemptedAction = `instantiating component '${(0, util_1.getTypeName)(info.component)}'`;
                    (0, util_1.validateInjectionKey)($injector, downgradedModule, lazyModuleRefKey, attemptedAction);
                    const lazyModuleRef = $injector.get(lazyModuleRefKey);
                    moduleInjector = (_a = lazyModuleRef.injector) !== null && _a !== void 0 ? _a : lazyModuleRef.promise;
                }
                // Notes:
                //
                // There are two injectors: `finalModuleInjector` and `finalParentInjector` (they might be
                // the same instance, but that is irrelevant):
                // - `finalModuleInjector` is used to retrieve `ComponentFactoryResolver`, thus it must be
                //   on the same tree as the `NgModule` that declares this downgraded component.
                // - `finalParentInjector` is used for all other injection purposes.
                //   (Note that Angular knows to only traverse the component-tree part of that injector,
                //   when looking for an injectable and then switch to the module injector.)
                //
                // There are basically three cases:
                // - If there is no parent component (thus no `parentInjector`), we bootstrap the downgraded
                //   `NgModule` and use its injector as both `finalModuleInjector` and
                //   `finalParentInjector`.
                // - If there is a parent component (and thus a `parentInjector`) and we are sure that it
                //   belongs to the same `NgModule` as this downgraded component (e.g. because there is only
                //   one downgraded module, we use that `parentInjector` as both `finalModuleInjector` and
                //   `finalParentInjector`.
                // - If there is a parent component, but it may belong to a different `NgModule`, then we
                //   use the `parentInjector` as `finalParentInjector` and this downgraded component's
                //   declaring `NgModule`'s injector as `finalModuleInjector`.
                //   Note 1: If the `NgModule` is already bootstrapped, we just get its injector (we don't
                //           bootstrap again).
                //   Note 2: It is possible that (while there are multiple downgraded modules) this
                //           downgraded component and its parent component both belong to the same NgModule.
                //           In that case, we could have used the `parentInjector` as both
                //           `finalModuleInjector` and `finalParentInjector`, but (for simplicity) we are
                //           treating this case as if they belong to different `NgModule`s. That doesn't
                //           really affect anything, since `parentInjector` has `moduleInjector` as ancestor
                //           and trying to resolve `ComponentFactoryResolver` from either one will return
                //           the same instance.
                // If there is a parent component, use its injector as parent injector.
                // If this is a "top-level" Angular component, use the module injector.
                const finalParentInjector = parentInjector || moduleInjector;
                // If this is a "top-level" Angular component or the parent component may belong to a
                // different `NgModule`, use the module injector for module-specific dependencies.
                // If there is a parent component that belongs to the same `NgModule`, use its injector.
                const finalModuleInjector = moduleInjector || parentInjector;
                const doDowngrade = (injector, moduleInjector) => {
                    // Retrieve `ComponentFactoryResolver` from the injector tied to the `NgModule` this
                    // component belongs to.
                    const componentFactoryResolver = moduleInjector.get(core_1.ComponentFactoryResolver);
                    const componentFactory = componentFactoryResolver.resolveComponentFactory(info.component);
                    if (!componentFactory) {
                        throw new Error(`Expecting ComponentFactory for: ${(0, util_1.getTypeName)(info.component)}`);
                    }
                    const injectorPromise = new ParentInjectorPromise(element);
                    const facade = new downgrade_component_adapter_1.DowngradeComponentAdapter(element, attrs, scope, ngModel, injector, $compile, $parse, componentFactory, wrapCallback, unsafelyOverwriteSignalInputs);
                    const projectableNodes = facade.compileContents();
                    const componentRef = facade.createComponentAndSetup(projectableNodes, isNgUpgradeLite, info.propagateDigest);
                    injectorPromise.resolve(componentRef.injector);
                    if (ranAsync) {
                        // If this is run async, it is possible that it is not run inside a
                        // digest and initial input values will not be detected.
                        scope.$evalAsync(() => { });
                    }
                };
                const downgradeFn = !isNgUpgradeLite
                    ? doDowngrade
                    : (pInjector, mInjector) => {
                        if (!ngZone) {
                            ngZone = pInjector.get(core_1.NgZone);
                        }
                        wrapCallback(() => doDowngrade(pInjector, mInjector))();
                    };
                // NOTE:
                // Not using `ParentInjectorPromise.all()` (which is inherited from `SyncPromise`), because
                // Closure Compiler (or some related tool) complains:
                // `TypeError: ...$src$downgrade_component_ParentInjectorPromise.all is not a function`
                promise_util_1.SyncPromise.all([finalParentInjector, finalModuleInjector]).then(([pInjector, mInjector]) => downgradeFn(pInjector, mInjector));
                ranAsync = true;
            },
        };
    };
    // bracket-notation because of closure - see #14441
    directiveFactory['$inject'] = [constants_1.$COMPILE, constants_1.$INJECTOR, constants_1.$PARSE];
    return directiveFactory;
}
/**
 * Synchronous promise-like object to wrap parent injectors,
 * to preserve the synchronous nature of AngularJS's `$compile`.
 */
class ParentInjectorPromise extends promise_util_1.SyncPromise {
    constructor(element) {
        super();
        this.element = element;
        this.injectorKey = (0, util_1.controllerKey)(constants_1.INJECTOR_KEY);
        // Store the promise on the element.
        element.data(this.injectorKey, this);
    }
    resolve(injector) {
        // Store the real injector on the element.
        this.element.data(this.injectorKey, injector);
        // Release the element to prevent memory leaks.
        this.element = null;
        // Resolve the promise.
        super.resolve(injector);
    }
}
