"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilePipe = compilePipe;
const compiler_facade_1 = require("../../compiler/compiler_facade");
const util_1 = require("../../di/jit/util");
const fields_1 = require("../fields");
const environment_1 = require("./environment");
function compilePipe(type, meta) {
    let ngPipeDef = null;
    let ngFactoryDef = null;
    Object.defineProperty(type, fields_1.NG_FACTORY_DEF, {
        get: () => {
            if (ngFactoryDef === null) {
                const metadata = getPipeMetadata(type, meta);
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'pipe',
                    type: metadata.type,
                });
                ngFactoryDef = compiler.compileFactory(environment_1.angularCoreEnv, `ng:///${metadata.name}/ɵfac.js`, {
                    name: metadata.name,
                    type: metadata.type,
                    typeArgumentCount: 0,
                    deps: (0, util_1.reflectDependencies)(type),
                    target: compiler.FactoryTarget.Pipe,
                });
            }
            return ngFactoryDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    Object.defineProperty(type, fields_1.NG_PIPE_DEF, {
        get: () => {
            if (ngPipeDef === null) {
                const metadata = getPipeMetadata(type, meta);
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'pipe',
                    type: metadata.type,
                });
                ngPipeDef = compiler.compilePipe(environment_1.angularCoreEnv, `ng:///${metadata.name}/ɵpipe.js`, metadata);
            }
            return ngPipeDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
function getPipeMetadata(type, meta) {
    return {
        type: type,
        name: type.name,
        pipeName: meta.name,
        pure: meta.pure !== undefined ? meta.pure : true,
        isStandalone: meta.standalone === undefined ? true : !!meta.standalone,
    };
}
