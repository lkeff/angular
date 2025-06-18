"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportGraph = exports.CycleAnalyzer = exports.Cycle = void 0;
var analyzer_1 = require("./src/analyzer");
Object.defineProperty(exports, "Cycle", { enumerable: true, get: function () { return analyzer_1.Cycle; } });
Object.defineProperty(exports, "CycleAnalyzer", { enumerable: true, get: function () { return analyzer_1.CycleAnalyzer; } });
var imports_1 = require("./src/imports");
Object.defineProperty(exports, "ImportGraph", { enumerable: true, get: function () { return imports_1.ImportGraph; } });
