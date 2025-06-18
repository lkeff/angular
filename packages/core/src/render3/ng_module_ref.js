"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentNgModuleRefAdapter = exports.NgModuleFactory = exports.NgModuleRef = exports.createNgModuleRef = void 0;
exports.createNgModule = createNgModule;
exports.createNgModuleRefWithProviders = createNgModuleRefWithProviders;
exports.createEnvironmentInjector = createEnvironmentInjector;
const create_injector_1 = require("../di/create_injector");
const r3_injector_1 = require("../di/r3_injector");
const component_factory_resolver_1 = require("../linker/component_factory_resolver");
const ng_module_factory_1 = require("../linker/ng_module_factory");
const assert_1 = require("../util/assert");
const stringify_1 = require("../util/stringify");
const component_ref_1 = require("./component_ref");
const def_getters_1 = require("./def_getters");
const misc_utils_1 = require("./util/misc_utils");
/**
 * Returns a new NgModuleRef instance based on the NgModule class and parent injector provided.
 *
 * @param ngModule NgModule class.
 * @param parentInjector Optional injector instance to use as a parent for the module injector. If
 *     not provided, `NullInjector` will be used instead.
 * @returns NgModuleRef that represents an NgModule instance.
 *
 * @publicApi
 */
function createNgModule(ngModule, parentInjector) {
    return new NgModuleRef(ngModule, parentInjector !== null && parentInjector !== void 0 ? parentInjector : null, []);
}
/**
 * The `createNgModule` function alias for backwards-compatibility.
 * Please avoid using it directly and use `createNgModule` instead.
 *
 * @deprecated Use `createNgModule` instead.
 */
exports.createNgModuleRef = createNgModule;
class NgModuleRef extends ng_module_factory_1.NgModuleRef {
    constructor(ngModuleType, _parent, additionalProviders, runInjectorInitializers = true) {
        super();
        this.ngModuleType = ngModuleType;
        this._parent = _parent;
        // tslint:disable-next-line:require-internal-with-underscore
        this._bootstrapComponents = [];
        this.destroyCbs = [];
        // When bootstrapping a module we have a dependency graph that looks like this:
        // ApplicationRef -> ComponentFactoryResolver -> NgModuleRef. The problem is that if the
        // module being resolved tries to inject the ComponentFactoryResolver, it'll create a
        // circular dependency which will result in a runtime error, because the injector doesn't
        // exist yet. We work around the issue by creating the ComponentFactoryResolver ourselves
        // and providing it, rather than letting the injector resolve it.
        this.componentFactoryResolver = new component_ref_1.ComponentFactoryResolver(this);
        const ngModuleDef = (0, def_getters_1.getNgModuleDef)(ngModuleType);
        ngDevMode &&
            (0, assert_1.assertDefined)(ngModuleDef, `NgModule '${(0, stringify_1.stringify)(ngModuleType)}' is not a subtype of 'NgModuleType'.`);
        this._bootstrapComponents = (0, misc_utils_1.maybeUnwrapFn)(ngModuleDef.bootstrap);
        this._r3Injector = (0, create_injector_1.createInjectorWithoutInjectorInstances)(ngModuleType, _parent, [
            { provide: ng_module_factory_1.NgModuleRef, useValue: this },
            {
                provide: component_factory_resolver_1.ComponentFactoryResolver,
                useValue: this.componentFactoryResolver,
            },
            ...additionalProviders,
        ], (0, stringify_1.stringify)(ngModuleType), new Set(['environment']));
        // We need to resolve the injector types separately from the injector creation, because
        // the module might be trying to use this ref in its constructor for DI which will cause a
        // circular error that will eventually error out, because the injector isn't created yet.
        if (runInjectorInitializers) {
            this.resolveInjectorInitializers();
        }
    }
    resolveInjectorInitializers() {
        this._r3Injector.resolveInjectorInitializers();
        this.instance = this._r3Injector.get(this.ngModuleType);
    }
    get injector() {
        return this._r3Injector;
    }
    destroy() {
        ngDevMode && (0, assert_1.assertDefined)(this.destroyCbs, 'NgModule already destroyed');
        const injector = this._r3Injector;
        !injector.destroyed && injector.destroy();
        this.destroyCbs.forEach((fn) => fn());
        this.destroyCbs = null;
    }
    onDestroy(callback) {
        ngDevMode && (0, assert_1.assertDefined)(this.destroyCbs, 'NgModule already destroyed');
        this.destroyCbs.push(callback);
    }
}
exports.NgModuleRef = NgModuleRef;
class NgModuleFactory extends ng_module_factory_1.NgModuleFactory {
    constructor(moduleType) {
        super();
        this.moduleType = moduleType;
    }
    create(parentInjector) {
        return new NgModuleRef(this.moduleType, parentInjector, []);
    }
}
exports.NgModuleFactory = NgModuleFactory;
function createNgModuleRefWithProviders(moduleType, parentInjector, additionalProviders) {
    return new NgModuleRef(moduleType, parentInjector, additionalProviders, false);
}
class EnvironmentNgModuleRefAdapter extends ng_module_factory_1.NgModuleRef {
    constructor(config) {
        super();
        this.componentFactoryResolver = new component_ref_1.ComponentFactoryResolver(this);
        this.instance = null;
        const injector = new r3_injector_1.R3Injector([
            ...config.providers,
            { provide: ng_module_factory_1.NgModuleRef, useValue: this },
            { provide: component_factory_resolver_1.ComponentFactoryResolver, useValue: this.componentFactoryResolver },
        ], config.parent || (0, r3_injector_1.getNullInjector)(), config.debugName, new Set(['environment']));
        this.injector = injector;
        if (config.runEnvironmentInitializers) {
            injector.resolveInjectorInitializers();
        }
    }
    destroy() {
        this.injector.destroy();
    }
    onDestroy(callback) {
        this.injector.onDestroy(callback);
    }
}
exports.EnvironmentNgModuleRefAdapter = EnvironmentNgModuleRefAdapter;
/**
 * Create a new environment injector.
 *
 * @param providers An array of providers.
 * @param parent A parent environment injector.
 * @param debugName An optional name for this injector instance, which will be used in error
 *     messages.
 *
 * @publicApi
 */
function createEnvironmentInjector(providers, parent, debugName = null) {
    const adapter = new EnvironmentNgModuleRefAdapter({
        providers,
        parent,
        debugName,
        runEnvironmentInitializers: true,
    });
    return adapter.injector;
}
