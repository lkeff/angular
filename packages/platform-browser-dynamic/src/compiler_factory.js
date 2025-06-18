"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitCompilerFactory = exports.COMPILER_PROVIDERS = void 0;
const compiler_1 = require("@angular/compiler");
const core_1 = require("@angular/core");
exports.COMPILER_PROVIDERS = [
    { provide: core_1.Compiler, useFactory: () => new core_1.Compiler() },
];
/**
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
class JitCompilerFactory {
    /** @internal */
    constructor(defaultOptions) {
        const compilerOptions = {
            defaultEncapsulation: core_1.ViewEncapsulation.Emulated,
        };
        this._defaultOptions = [compilerOptions, ...defaultOptions];
    }
    createCompiler(options = []) {
        const opts = _mergeOptions(this._defaultOptions.concat(options));
        const injector = core_1.Injector.create({
            providers: [
                exports.COMPILER_PROVIDERS,
                {
                    provide: compiler_1.CompilerConfig,
                    useFactory: () => {
                        return new compiler_1.CompilerConfig({
                            defaultEncapsulation: opts.defaultEncapsulation,
                            preserveWhitespaces: opts.preserveWhitespaces,
                        });
                    },
                    deps: [],
                },
                opts.providers,
            ],
        });
        return injector.get(core_1.Compiler);
    }
}
exports.JitCompilerFactory = JitCompilerFactory;
function _mergeOptions(optionsArr) {
    return {
        defaultEncapsulation: _lastDefined(optionsArr.map((options) => options.defaultEncapsulation)),
        providers: _mergeArrays(optionsArr.map((options) => options.providers)),
        preserveWhitespaces: _lastDefined(optionsArr.map((options) => options.preserveWhitespaces)),
    };
}
function _lastDefined(args) {
    for (let i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
function _mergeArrays(parts) {
    const result = [];
    parts.forEach((part) => part && result.push(...part));
    return result;
}
