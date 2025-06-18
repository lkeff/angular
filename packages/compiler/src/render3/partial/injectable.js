"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDeclareInjectableFromMetadata = compileDeclareInjectableFromMetadata;
exports.createInjectableDefinitionMap = createInjectableDefinitionMap;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const injectable_compiler_2_1 = require("../../injectable_compiler_2");
const o = __importStar(require("../../output/output_ast"));
const r3_identifiers_1 = require("../r3_identifiers");
const util_1 = require("../util");
const util_2 = require("../view/util");
const util_3 = require("./util");
/**
 * Every time we make a breaking change to the declaration interface or partial-linker behavior, we
 * must update this constant to prevent old partial-linkers from incorrectly processing the
 * declaration.
 *
 * Do not include any prerelease in these versions as they are ignored.
 */
const MINIMUM_PARTIAL_LINKER_VERSION = '12.0.0';
/**
 * Compile a Injectable declaration defined by the `R3InjectableMetadata`.
 */
function compileDeclareInjectableFromMetadata(meta) {
    const definitionMap = createInjectableDefinitionMap(meta);
    const expression = o.importExpr(r3_identifiers_1.Identifiers.declareInjectable).callFn([definitionMap.toLiteralMap()]);
    const type = (0, injectable_compiler_2_1.createInjectableType)(meta);
    return { expression, type, statements: [] };
}
/**
 * Gathers the declaration fields for a Injectable into a `DefinitionMap`.
 */
function createInjectableDefinitionMap(meta) {
    const definitionMap = new util_2.DefinitionMap();
    definitionMap.set('minVersion', o.literal(MINIMUM_PARTIAL_LINKER_VERSION));
    definitionMap.set('version', o.literal('0.0.0-PLACEHOLDER'));
    definitionMap.set('ngImport', o.importExpr(r3_identifiers_1.Identifiers.core));
    definitionMap.set('type', meta.type.value);
    // Only generate providedIn property if it has a non-null value
    if (meta.providedIn !== undefined) {
        const providedIn = (0, util_1.convertFromMaybeForwardRefExpression)(meta.providedIn);
        if (providedIn.value !== null) {
            definitionMap.set('providedIn', providedIn);
        }
    }
    if (meta.useClass !== undefined) {
        definitionMap.set('useClass', (0, util_1.convertFromMaybeForwardRefExpression)(meta.useClass));
    }
    if (meta.useExisting !== undefined) {
        definitionMap.set('useExisting', (0, util_1.convertFromMaybeForwardRefExpression)(meta.useExisting));
    }
    if (meta.useValue !== undefined) {
        definitionMap.set('useValue', (0, util_1.convertFromMaybeForwardRefExpression)(meta.useValue));
    }
    // Factories do not contain `ForwardRef`s since any types are already wrapped in a function call
    // so the types will not be eagerly evaluated. Therefore we do not need to process this expression
    // with `convertFromProviderExpression()`.
    if (meta.useFactory !== undefined) {
        definitionMap.set('useFactory', meta.useFactory);
    }
    if (meta.deps !== undefined) {
        definitionMap.set('deps', o.literalArr(meta.deps.map(util_3.compileDependency)));
    }
    return definitionMap;
}
