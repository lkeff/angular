"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUnknownComponentImportDiagnostic = exports.makeNotStandaloneDiagnostic = exports.TypeCheckScopeRegistry = exports.SelectorlessComponentScopeReader = exports.LocalModuleScopeRegistry = exports.MetadataDtsModuleScopeResolver = exports.CompoundComponentScopeReader = exports.ComponentScopeKind = void 0;
var api_1 = require("./src/api");
Object.defineProperty(exports, "ComponentScopeKind", { enumerable: true, get: function () { return api_1.ComponentScopeKind; } });
var component_scope_1 = require("./src/component_scope");
Object.defineProperty(exports, "CompoundComponentScopeReader", { enumerable: true, get: function () { return component_scope_1.CompoundComponentScopeReader; } });
var dependency_1 = require("./src/dependency");
Object.defineProperty(exports, "MetadataDtsModuleScopeResolver", { enumerable: true, get: function () { return dependency_1.MetadataDtsModuleScopeResolver; } });
var local_1 = require("./src/local");
Object.defineProperty(exports, "LocalModuleScopeRegistry", { enumerable: true, get: function () { return local_1.LocalModuleScopeRegistry; } });
var selectorless_scope_1 = require("./src/selectorless_scope");
Object.defineProperty(exports, "SelectorlessComponentScopeReader", { enumerable: true, get: function () { return selectorless_scope_1.SelectorlessComponentScopeReader; } });
var typecheck_1 = require("./src/typecheck");
Object.defineProperty(exports, "TypeCheckScopeRegistry", { enumerable: true, get: function () { return typecheck_1.TypeCheckScopeRegistry; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "makeNotStandaloneDiagnostic", { enumerable: true, get: function () { return util_1.makeNotStandaloneDiagnostic; } });
Object.defineProperty(exports, "makeUnknownComponentImportDiagnostic", { enumerable: true, get: function () { return util_1.makeUnknownComponentImportDiagnostic; } });
