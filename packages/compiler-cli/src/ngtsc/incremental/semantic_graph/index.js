"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSymbolEqual = exports.isSetEqual = exports.isReferenceEqual = exports.isArrayEqual = exports.extractSemanticTypeParameters = exports.areTypeParametersEqual = exports.SemanticDepGraphUpdater = exports.SemanticDepGraph = exports.SemanticSymbol = void 0;
var api_1 = require("./src/api");
Object.defineProperty(exports, "SemanticSymbol", { enumerable: true, get: function () { return api_1.SemanticSymbol; } });
var graph_1 = require("./src/graph");
Object.defineProperty(exports, "SemanticDepGraph", { enumerable: true, get: function () { return graph_1.SemanticDepGraph; } });
Object.defineProperty(exports, "SemanticDepGraphUpdater", { enumerable: true, get: function () { return graph_1.SemanticDepGraphUpdater; } });
var type_parameters_1 = require("./src/type_parameters");
Object.defineProperty(exports, "areTypeParametersEqual", { enumerable: true, get: function () { return type_parameters_1.areTypeParametersEqual; } });
Object.defineProperty(exports, "extractSemanticTypeParameters", { enumerable: true, get: function () { return type_parameters_1.extractSemanticTypeParameters; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "isArrayEqual", { enumerable: true, get: function () { return util_1.isArrayEqual; } });
Object.defineProperty(exports, "isReferenceEqual", { enumerable: true, get: function () { return util_1.isReferenceEqual; } });
Object.defineProperty(exports, "isSetEqual", { enumerable: true, get: function () { return util_1.isSetEqual; } });
Object.defineProperty(exports, "isSymbolEqual", { enumerable: true, get: function () { return util_1.isSymbolEqual; } });
