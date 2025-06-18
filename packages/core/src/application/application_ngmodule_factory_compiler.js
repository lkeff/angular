"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileNgModuleFactory = compileNgModuleFactory;
const compiler_facade_1 = require("../compiler/compiler_facade");
const injector_1 = require("../di/injector");
const compiler_1 = require("../linker/compiler");
const resource_loading_1 = require("../metadata/resource_loading");
const assert_1 = require("../render3/assert");
const jit_options_1 = require("../render3/jit/jit_options");
const ng_module_ref_1 = require("../render3/ng_module_ref");
function compileNgModuleFactory(injector, options, moduleType) {
    ngDevMode && (0, assert_1.assertNgModuleType)(moduleType);
    const moduleFactory = new ng_module_ref_1.NgModuleFactory(moduleType);
    // All of the logic below is irrelevant for AOT-compiled code.
    if (typeof ngJitMode !== 'undefined' && !ngJitMode) {
        return Promise.resolve(moduleFactory);
    }
    const compilerOptions = injector.get(compiler_1.COMPILER_OPTIONS, []).concat(options);
    // Configure the compiler to use the provided options. This call may fail when multiple modules
    // are bootstrapped with incompatible options, as a component can only be compiled according to
    // a single set of options.
    (0, jit_options_1.setJitOptions)({
        defaultEncapsulation: _lastDefined(compilerOptions.map((opts) => opts.defaultEncapsulation)),
        preserveWhitespaces: _lastDefined(compilerOptions.map((opts) => opts.preserveWhitespaces)),
    });
    if ((0, resource_loading_1.isComponentResourceResolutionQueueEmpty)()) {
        return Promise.resolve(moduleFactory);
    }
    const compilerProviders = compilerOptions.flatMap((option) => { var _a; return (_a = option.providers) !== null && _a !== void 0 ? _a : []; });
    // In case there are no compiler providers, we just return the module factory as
    // there won't be any resource loader. This can happen with Ivy, because AOT compiled
    // modules can be still passed through "bootstrapModule". In that case we shouldn't
    // unnecessarily require the JIT compiler.
    if (compilerProviders.length === 0) {
        return Promise.resolve(moduleFactory);
    }
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 0 /* JitCompilerUsage.Decorator */,
        kind: 'NgModule',
        type: moduleType,
    });
    const compilerInjector = injector_1.Injector.create({ providers: compilerProviders });
    const resourceLoader = compilerInjector.get(compiler.ResourceLoader);
    // The resource loader can also return a string while the "resolveComponentResources"
    // always expects a promise. Therefore we need to wrap the returned value in a promise.
    return (0, resource_loading_1.resolveComponentResources)((url) => Promise.resolve(resourceLoader.get(url))).then(() => moduleFactory);
}
function _lastDefined(args) {
    for (let i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
