"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITS_JUST_ANGULAR = exports.ɵnoSideEffects = exports.NgModuleFactory = exports.setClassMetadataAsync = exports.setClassMetadata = exports.ɵɵdefineNgModule = exports.ɵɵdefineInjector = exports.ɵɵdefineInjectable = exports.ɵɵinject = void 0;
/*
 * This file exists to support compilation of @angular/core in Ivy mode.
 *
 * When the Angular compiler processes a compilation unit, it normally writes imports to
 * @angular/core. When compiling the core package itself this strategy isn't usable. Instead, the
 * compiler writes imports to this file.
 *
 * Only a subset of such imports are supported - core is not allowed to declare components or pipes.
 * A check in ngtsc's `R3SymbolsImportRewriter` validates this condition. The rewriter is only used
 * when compiling @angular/core and is responsible for translating an external name (prefixed with
 * ɵ) to the internal symbol name as exported below.
 *
 * The below symbols are used for @Injectable and @NgModule compilation.
 */
var injector_compatibility_1 = require("./di/injector_compatibility");
Object.defineProperty(exports, "\u0275\u0275inject", { enumerable: true, get: function () { return injector_compatibility_1.ɵɵinject; } });
var defs_1 = require("./di/interface/defs");
Object.defineProperty(exports, "\u0275\u0275defineInjectable", { enumerable: true, get: function () { return defs_1.ɵɵdefineInjectable; } });
Object.defineProperty(exports, "\u0275\u0275defineInjector", { enumerable: true, get: function () { return defs_1.ɵɵdefineInjector; } });
var definition_1 = require("./render3/definition");
Object.defineProperty(exports, "\u0275\u0275defineNgModule", { enumerable: true, get: function () { return definition_1.ɵɵdefineNgModule; } });
var metadata_1 = require("./render3/metadata");
Object.defineProperty(exports, "setClassMetadata", { enumerable: true, get: function () { return metadata_1.setClassMetadata; } });
Object.defineProperty(exports, "setClassMetadataAsync", { enumerable: true, get: function () { return metadata_1.setClassMetadataAsync; } });
var ng_module_ref_1 = require("./render3/ng_module_ref");
Object.defineProperty(exports, "NgModuleFactory", { enumerable: true, get: function () { return ng_module_ref_1.NgModuleFactory; } });
var closure_1 = require("./util/closure");
Object.defineProperty(exports, "\u0275noSideEffects", { enumerable: true, get: function () { return closure_1.noSideEffects; } });
/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
exports.ITS_JUST_ANGULAR = true;
