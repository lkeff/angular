"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheticValue = exports.KnownFn = exports.EnumValue = exports.StaticInterpreter = exports.PartialEvaluator = exports.DynamicValue = exports.traceDynamicValue = exports.describeResolvedType = void 0;
var diagnostics_1 = require("./src/diagnostics");
Object.defineProperty(exports, "describeResolvedType", { enumerable: true, get: function () { return diagnostics_1.describeResolvedType; } });
Object.defineProperty(exports, "traceDynamicValue", { enumerable: true, get: function () { return diagnostics_1.traceDynamicValue; } });
var dynamic_1 = require("./src/dynamic");
Object.defineProperty(exports, "DynamicValue", { enumerable: true, get: function () { return dynamic_1.DynamicValue; } });
var interface_1 = require("./src/interface");
Object.defineProperty(exports, "PartialEvaluator", { enumerable: true, get: function () { return interface_1.PartialEvaluator; } });
var interpreter_1 = require("./src/interpreter");
Object.defineProperty(exports, "StaticInterpreter", { enumerable: true, get: function () { return interpreter_1.StaticInterpreter; } });
var result_1 = require("./src/result");
Object.defineProperty(exports, "EnumValue", { enumerable: true, get: function () { return result_1.EnumValue; } });
Object.defineProperty(exports, "KnownFn", { enumerable: true, get: function () { return result_1.KnownFn; } });
var synthetic_1 = require("./src/synthetic");
Object.defineProperty(exports, "SyntheticValue", { enumerable: true, get: function () { return synthetic_1.SyntheticValue; } });
