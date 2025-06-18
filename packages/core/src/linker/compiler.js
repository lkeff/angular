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
exports.CompilerFactory = exports.COMPILER_OPTIONS = exports.Compiler = exports.ModuleWithComponentFactories = void 0;
const injectable_1 = require("../di/injectable");
const injection_token_1 = require("../di/injection_token");
const component_ref_1 = require("../render3/component_ref");
const def_getters_1 = require("../render3/def_getters");
const ng_module_ref_1 = require("../render3/ng_module_ref");
const misc_utils_1 = require("../render3/util/misc_utils");
/**
 * Combination of NgModuleFactory and ComponentFactories.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
class ModuleWithComponentFactories {
    constructor(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
}
exports.ModuleWithComponentFactories = ModuleWithComponentFactories;
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
let Compiler = (() => {
    let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Compiler = _classThis = class {
        /**
         * Compiles the given NgModule and all of its components. All templates of the components
         * have to be inlined.
         */
        compileModuleSync(moduleType) {
            return new ng_module_ref_1.NgModuleFactory(moduleType);
        }
        /**
         * Compiles the given NgModule and all of its components
         */
        compileModuleAsync(moduleType) {
            return Promise.resolve(this.compileModuleSync(moduleType));
        }
        /**
         * Same as {@link Compiler#compileModuleSync compileModuleSync} but also creates ComponentFactories for all components.
         */
        compileModuleAndAllComponentsSync(moduleType) {
            const ngModuleFactory = this.compileModuleSync(moduleType);
            const moduleDef = (0, def_getters_1.getNgModuleDef)(moduleType);
            const componentFactories = (0, misc_utils_1.maybeUnwrapFn)(moduleDef.declarations).reduce((factories, declaration) => {
                const componentDef = (0, def_getters_1.getComponentDef)(declaration);
                componentDef && factories.push(new component_ref_1.ComponentFactory(componentDef));
                return factories;
            }, []);
            return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
        }
        /**
         * Same as {@link Compiler#compileModuleAsync compileModuleAsync} but also creates ComponentFactories for all components.
         */
        compileModuleAndAllComponentsAsync(moduleType) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(moduleType));
        }
        /**
         * Clears all caches.
         */
        clearCache() { }
        /**
         * Clears the cache for the given component/ngModule.
         */
        clearCacheFor(type) { }
        /**
         * Returns the id for a given NgModule, if one is defined and known to the compiler.
         */
        getModuleId(moduleType) {
            return undefined;
        }
    };
    __setFunctionName(_classThis, "Compiler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Compiler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Compiler = _classThis;
})();
exports.Compiler = Compiler;
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
exports.COMPILER_OPTIONS = new injection_token_1.InjectionToken(ngDevMode ? 'compilerOptions' : '');
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
class CompilerFactory {
}
exports.CompilerFactory = CompilerFactory;
