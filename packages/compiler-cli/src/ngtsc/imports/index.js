"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleResolver = exports.Reference = exports.loadIsReferencedAliasDeclarationPatch = exports.isAliasImportDeclaration = exports.LocalCompilationExtraImportsTracker = exports.ImportedSymbolsTracker = exports.UnifiedModulesStrategy = exports.RelativePathStrategy = exports.ReferenceEmitter = exports.ReferenceEmitKind = exports.LogicalProjectStrategy = exports.LocalIdentifierStrategy = exports.ImportFlags = exports.assertSuccessfulReferenceEmit = exports.AbsoluteModuleStrategy = exports.DeferredSymbolTracker = exports.DefaultImportTracker = exports.validateAndRewriteCoreSymbol = exports.R3SymbolsImportRewriter = exports.NoopImportRewriter = exports.UnifiedModulesAliasingHost = exports.PrivateExportAliasingHost = exports.AliasStrategy = void 0;
var alias_1 = require("./src/alias");
Object.defineProperty(exports, "AliasStrategy", { enumerable: true, get: function () { return alias_1.AliasStrategy; } });
Object.defineProperty(exports, "PrivateExportAliasingHost", { enumerable: true, get: function () { return alias_1.PrivateExportAliasingHost; } });
Object.defineProperty(exports, "UnifiedModulesAliasingHost", { enumerable: true, get: function () { return alias_1.UnifiedModulesAliasingHost; } });
var core_1 = require("./src/core");
Object.defineProperty(exports, "NoopImportRewriter", { enumerable: true, get: function () { return core_1.NoopImportRewriter; } });
Object.defineProperty(exports, "R3SymbolsImportRewriter", { enumerable: true, get: function () { return core_1.R3SymbolsImportRewriter; } });
Object.defineProperty(exports, "validateAndRewriteCoreSymbol", { enumerable: true, get: function () { return core_1.validateAndRewriteCoreSymbol; } });
var default_1 = require("./src/default");
Object.defineProperty(exports, "DefaultImportTracker", { enumerable: true, get: function () { return default_1.DefaultImportTracker; } });
var deferred_symbol_tracker_1 = require("./src/deferred_symbol_tracker");
Object.defineProperty(exports, "DeferredSymbolTracker", { enumerable: true, get: function () { return deferred_symbol_tracker_1.DeferredSymbolTracker; } });
var emitter_1 = require("./src/emitter");
Object.defineProperty(exports, "AbsoluteModuleStrategy", { enumerable: true, get: function () { return emitter_1.AbsoluteModuleStrategy; } });
Object.defineProperty(exports, "assertSuccessfulReferenceEmit", { enumerable: true, get: function () { return emitter_1.assertSuccessfulReferenceEmit; } });
Object.defineProperty(exports, "ImportFlags", { enumerable: true, get: function () { return emitter_1.ImportFlags; } });
Object.defineProperty(exports, "LocalIdentifierStrategy", { enumerable: true, get: function () { return emitter_1.LocalIdentifierStrategy; } });
Object.defineProperty(exports, "LogicalProjectStrategy", { enumerable: true, get: function () { return emitter_1.LogicalProjectStrategy; } });
Object.defineProperty(exports, "ReferenceEmitKind", { enumerable: true, get: function () { return emitter_1.ReferenceEmitKind; } });
Object.defineProperty(exports, "ReferenceEmitter", { enumerable: true, get: function () { return emitter_1.ReferenceEmitter; } });
Object.defineProperty(exports, "RelativePathStrategy", { enumerable: true, get: function () { return emitter_1.RelativePathStrategy; } });
Object.defineProperty(exports, "UnifiedModulesStrategy", { enumerable: true, get: function () { return emitter_1.UnifiedModulesStrategy; } });
var imported_symbols_tracker_1 = require("./src/imported_symbols_tracker");
Object.defineProperty(exports, "ImportedSymbolsTracker", { enumerable: true, get: function () { return imported_symbols_tracker_1.ImportedSymbolsTracker; } });
var local_compilation_extra_imports_tracker_1 = require("./src/local_compilation_extra_imports_tracker");
Object.defineProperty(exports, "LocalCompilationExtraImportsTracker", { enumerable: true, get: function () { return local_compilation_extra_imports_tracker_1.LocalCompilationExtraImportsTracker; } });
var patch_alias_reference_resolution_1 = require("./src/patch_alias_reference_resolution");
Object.defineProperty(exports, "isAliasImportDeclaration", { enumerable: true, get: function () { return patch_alias_reference_resolution_1.isAliasImportDeclaration; } });
Object.defineProperty(exports, "loadIsReferencedAliasDeclarationPatch", { enumerable: true, get: function () { return patch_alias_reference_resolution_1.loadIsReferencedAliasDeclarationPatch; } });
var references_1 = require("./src/references");
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return references_1.Reference; } });
var resolver_1 = require("./src/resolver");
Object.defineProperty(exports, "ModuleResolver", { enumerable: true, get: function () { return resolver_1.ModuleResolver; } });
