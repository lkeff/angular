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
exports.compileDeclareNgModuleFromMetadata = compileDeclareNgModuleFromMetadata;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("../../output/output_ast"));
const r3_identifiers_1 = require("../r3_identifiers");
const r3_module_compiler_1 = require("../r3_module_compiler");
const util_1 = require("../util");
const util_2 = require("../view/util");
/**
 * Every time we make a breaking change to the declaration interface or partial-linker behavior, we
 * must update this constant to prevent old partial-linkers from incorrectly processing the
 * declaration.
 *
 * Do not include any prerelease in these versions as they are ignored.
 */
const MINIMUM_PARTIAL_LINKER_VERSION = '14.0.0';
function compileDeclareNgModuleFromMetadata(meta) {
    const definitionMap = createNgModuleDefinitionMap(meta);
    const expression = o.importExpr(r3_identifiers_1.Identifiers.declareNgModule).callFn([definitionMap.toLiteralMap()]);
    const type = (0, r3_module_compiler_1.createNgModuleType)(meta);
    return { expression, type, statements: [] };
}
/**
 * Gathers the declaration fields for an NgModule into a `DefinitionMap`.
 */
function createNgModuleDefinitionMap(meta) {
    const definitionMap = new util_2.DefinitionMap();
    if (meta.kind === r3_module_compiler_1.R3NgModuleMetadataKind.Local) {
        throw new Error('Invalid path! Local compilation mode should not get into the partial compilation path');
    }
    definitionMap.set('minVersion', o.literal(MINIMUM_PARTIAL_LINKER_VERSION));
    definitionMap.set('version', o.literal('0.0.0-PLACEHOLDER'));
    definitionMap.set('ngImport', o.importExpr(r3_identifiers_1.Identifiers.core));
    definitionMap.set('type', meta.type.value);
    // We only generate the keys in the metadata if the arrays contain values.
    // We must wrap the arrays inside a function if any of the values are a forward reference to a
    // not-yet-declared class. This is to support JIT execution of the `ɵɵngDeclareNgModule()` call.
    // In the linker these wrappers are stripped and then reapplied for the `ɵɵdefineNgModule()` call.
    if (meta.bootstrap.length > 0) {
        definitionMap.set('bootstrap', (0, util_1.refsToArray)(meta.bootstrap, meta.containsForwardDecls));
    }
    if (meta.declarations.length > 0) {
        definitionMap.set('declarations', (0, util_1.refsToArray)(meta.declarations, meta.containsForwardDecls));
    }
    if (meta.imports.length > 0) {
        definitionMap.set('imports', (0, util_1.refsToArray)(meta.imports, meta.containsForwardDecls));
    }
    if (meta.exports.length > 0) {
        definitionMap.set('exports', (0, util_1.refsToArray)(meta.exports, meta.containsForwardDecls));
    }
    if (meta.schemas !== null && meta.schemas.length > 0) {
        definitionMap.set('schemas', o.literalArr(meta.schemas.map((ref) => ref.value)));
    }
    if (meta.id !== null) {
        definitionMap.set('id', meta.id);
    }
    return definitionMap;
}
