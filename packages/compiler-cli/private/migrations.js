"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportManager = exports.PotentialImportMode = exports.PotentialImportKind = exports.TypeScriptReflectionHost = exports.reflectObjectLiteral = exports.StaticInterpreter = exports.PartialEvaluator = exports.DynamicValue = exports.Reference = exports.createForwardRefResolver = void 0;
/**
 * @fileoverview The API from compiler-cli that the `@angular/core`
 * package requires for migration schematics.
 */
var annotations_1 = require("../src/ngtsc/annotations");
Object.defineProperty(exports, "createForwardRefResolver", { enumerable: true, get: function () { return annotations_1.createForwardRefResolver; } });
var imports_1 = require("../src/ngtsc/imports");
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return imports_1.Reference; } });
var partial_evaluator_1 = require("../src/ngtsc/partial_evaluator");
Object.defineProperty(exports, "DynamicValue", { enumerable: true, get: function () { return partial_evaluator_1.DynamicValue; } });
Object.defineProperty(exports, "PartialEvaluator", { enumerable: true, get: function () { return partial_evaluator_1.PartialEvaluator; } });
Object.defineProperty(exports, "StaticInterpreter", { enumerable: true, get: function () { return partial_evaluator_1.StaticInterpreter; } });
var reflection_1 = require("../src/ngtsc/reflection");
Object.defineProperty(exports, "reflectObjectLiteral", { enumerable: true, get: function () { return reflection_1.reflectObjectLiteral; } });
Object.defineProperty(exports, "TypeScriptReflectionHost", { enumerable: true, get: function () { return reflection_1.TypeScriptReflectionHost; } });
var api_1 = require("../src/ngtsc/typecheck/api");
Object.defineProperty(exports, "PotentialImportKind", { enumerable: true, get: function () { return api_1.PotentialImportKind; } });
Object.defineProperty(exports, "PotentialImportMode", { enumerable: true, get: function () { return api_1.PotentialImportMode; } });
var translator_1 = require("../src/ngtsc/translator");
Object.defineProperty(exports, "ImportManager", { enumerable: true, get: function () { return translator_1.ImportManager; } });
