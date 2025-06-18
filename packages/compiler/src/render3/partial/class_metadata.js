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
exports.compileDeclareClassMetadata = compileDeclareClassMetadata;
exports.compileComponentDeclareClassMetadata = compileComponentDeclareClassMetadata;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("../../output/output_ast"));
const r3_class_metadata_compiler_1 = require("../r3_class_metadata_compiler");
const r3_identifiers_1 = require("../r3_identifiers");
const util_1 = require("../view/util");
/**
 * Every time we make a breaking change to the declaration interface or partial-linker behavior, we
 * must update this constant to prevent old partial-linkers from incorrectly processing the
 * declaration.
 *
 * Do not include any prerelease in these versions as they are ignored.
 */
const MINIMUM_PARTIAL_LINKER_VERSION = '12.0.0';
/**
 * Minimum version at which deferred blocks are supported in the linker.
 */
const MINIMUM_PARTIAL_LINKER_DEFER_SUPPORT_VERSION = '18.0.0';
function compileDeclareClassMetadata(metadata) {
    const definitionMap = new util_1.DefinitionMap();
    definitionMap.set('minVersion', o.literal(MINIMUM_PARTIAL_LINKER_VERSION));
    definitionMap.set('version', o.literal('0.0.0-PLACEHOLDER'));
    definitionMap.set('ngImport', o.importExpr(r3_identifiers_1.Identifiers.core));
    definitionMap.set('type', metadata.type);
    definitionMap.set('decorators', metadata.decorators);
    definitionMap.set('ctorParameters', metadata.ctorParameters);
    definitionMap.set('propDecorators', metadata.propDecorators);
    return o.importExpr(r3_identifiers_1.Identifiers.declareClassMetadata).callFn([definitionMap.toLiteralMap()]);
}
function compileComponentDeclareClassMetadata(metadata, dependencies) {
    var _a, _b;
    if (dependencies === null || dependencies.length === 0) {
        return compileDeclareClassMetadata(metadata);
    }
    const definitionMap = new util_1.DefinitionMap();
    const callbackReturnDefinitionMap = new util_1.DefinitionMap();
    callbackReturnDefinitionMap.set('decorators', metadata.decorators);
    callbackReturnDefinitionMap.set('ctorParameters', (_a = metadata.ctorParameters) !== null && _a !== void 0 ? _a : o.literal(null));
    callbackReturnDefinitionMap.set('propDecorators', (_b = metadata.propDecorators) !== null && _b !== void 0 ? _b : o.literal(null));
    definitionMap.set('minVersion', o.literal(MINIMUM_PARTIAL_LINKER_DEFER_SUPPORT_VERSION));
    definitionMap.set('version', o.literal('0.0.0-PLACEHOLDER'));
    definitionMap.set('ngImport', o.importExpr(r3_identifiers_1.Identifiers.core));
    definitionMap.set('type', metadata.type);
    definitionMap.set('resolveDeferredDeps', (0, r3_class_metadata_compiler_1.compileComponentMetadataAsyncResolver)(dependencies));
    definitionMap.set('resolveMetadata', o.arrowFn(dependencies.map((dep) => new o.FnParam(dep.symbolName, o.DYNAMIC_TYPE)), callbackReturnDefinitionMap.toLiteralMap()));
    return o.importExpr(r3_identifiers_1.Identifiers.declareClassMetadataAsync).callFn([definitionMap.toLiteralMap()]);
}
