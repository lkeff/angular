"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceGraph = exports.checkForPrivateExports = exports.findFlatIndexEntryPoint = exports.FlatIndexGenerator = void 0;
var generator_1 = require("./src/generator");
Object.defineProperty(exports, "FlatIndexGenerator", { enumerable: true, get: function () { return generator_1.FlatIndexGenerator; } });
var logic_1 = require("./src/logic");
Object.defineProperty(exports, "findFlatIndexEntryPoint", { enumerable: true, get: function () { return logic_1.findFlatIndexEntryPoint; } });
var private_export_checker_1 = require("./src/private_export_checker");
Object.defineProperty(exports, "checkForPrivateExports", { enumerable: true, get: function () { return private_export_checker_1.checkForPrivateExports; } });
var reference_graph_1 = require("./src/reference_graph");
Object.defineProperty(exports, "ReferenceGraph", { enumerable: true, get: function () { return reference_graph_1.ReferenceGraph; } });
