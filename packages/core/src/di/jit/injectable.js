"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileInjectable = compileInjectable;
const compiler_facade_1 = require("../../compiler/compiler_facade");
const fields_1 = require("../../render3/fields");
const property_1 = require("../../util/property");
const defs_1 = require("../interface/defs");
const environment_1 = require("./environment");
const util_1 = require("./util");
/**
 * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
 * injectable def (`ɵprov`) onto the injectable type.
 */
function compileInjectable(type, meta) {
    let ngInjectableDef = null;
    let ngFactoryDef = null;
    // if NG_PROV_DEF is already defined on this class then don't overwrite it
    if (!type.hasOwnProperty(defs_1.NG_PROV_DEF)) {
        Object.defineProperty(type, defs_1.NG_PROV_DEF, {
            get: () => {
                if (ngInjectableDef === null) {
                    const compiler = (0, compiler_facade_1.getCompilerFacade)({
                        usage: 0 /* JitCompilerUsage.Decorator */,
                        kind: 'injectable',
                        type,
                    });
                    ngInjectableDef = compiler.compileInjectable(environment_1.angularCoreDiEnv, `ng:///${type.name}/ɵprov.js`, getInjectableMetadata(type, meta));
                }
                return ngInjectableDef;
            },
        });
    }
    // if NG_FACTORY_DEF is already defined on this class then don't overwrite it
    if (!type.hasOwnProperty(fields_1.NG_FACTORY_DEF)) {
        Object.defineProperty(type, fields_1.NG_FACTORY_DEF, {
            get: () => {
                if (ngFactoryDef === null) {
                    const compiler = (0, compiler_facade_1.getCompilerFacade)({
                        usage: 0 /* JitCompilerUsage.Decorator */,
                        kind: 'injectable',
                        type,
                    });
                    ngFactoryDef = compiler.compileFactory(environment_1.angularCoreDiEnv, `ng:///${type.name}/ɵfac.js`, {
                        name: type.name,
                        type,
                        typeArgumentCount: 0, // In JIT mode types are not available nor used.
                        deps: (0, util_1.reflectDependencies)(type),
                        target: compiler.FactoryTarget.Injectable,
                    });
                }
                return ngFactoryDef;
            },
            // Leave this configurable so that the factories from directives or pipes can take precedence.
            configurable: true,
        });
    }
}
const USE_VALUE = (0, property_1.getClosureSafeProperty)({
    provide: String,
    useValue: property_1.getClosureSafeProperty,
});
function isUseClassProvider(meta) {
    return meta.useClass !== undefined;
}
function isUseValueProvider(meta) {
    return USE_VALUE in meta;
}
function isUseFactoryProvider(meta) {
    return meta.useFactory !== undefined;
}
function isUseExistingProvider(meta) {
    return meta.useExisting !== undefined;
}
function getInjectableMetadata(type, srcMeta) {
    // Allow the compilation of a class with a `@Injectable()` decorator without parameters
    const meta = srcMeta || { providedIn: null };
    const compilerMeta = {
        name: type.name,
        type: type,
        typeArgumentCount: 0,
        providedIn: meta.providedIn,
    };
    if ((isUseClassProvider(meta) || isUseFactoryProvider(meta)) && meta.deps !== undefined) {
        compilerMeta.deps = (0, util_1.convertDependencies)(meta.deps);
    }
    // Check to see if the user explicitly provided a `useXxxx` property.
    if (isUseClassProvider(meta)) {
        compilerMeta.useClass = meta.useClass;
    }
    else if (isUseValueProvider(meta)) {
        compilerMeta.useValue = meta.useValue;
    }
    else if (isUseFactoryProvider(meta)) {
        compilerMeta.useFactory = meta.useFactory;
    }
    else if (isUseExistingProvider(meta)) {
        compilerMeta.useExisting = meta.useExisting;
    }
    return compilerMeta;
}
