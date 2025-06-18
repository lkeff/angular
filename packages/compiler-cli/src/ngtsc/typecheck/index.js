"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHostElement = exports.typeCheckFilePath = exports.TypeCheckShimGenerator = exports.getTemplateDiagnostics = exports.TypeCheckContextImpl = exports.TemplateTypeCheckerImpl = void 0;
var checker_1 = require("./src/checker");
Object.defineProperty(exports, "TemplateTypeCheckerImpl", { enumerable: true, get: function () { return checker_1.TemplateTypeCheckerImpl; } });
var context_1 = require("./src/context");
Object.defineProperty(exports, "TypeCheckContextImpl", { enumerable: true, get: function () { return context_1.TypeCheckContextImpl; } });
Object.defineProperty(exports, "getTemplateDiagnostics", { enumerable: true, get: function () { return context_1.getTemplateDiagnostics; } });
var shim_1 = require("./src/shim");
Object.defineProperty(exports, "TypeCheckShimGenerator", { enumerable: true, get: function () { return shim_1.TypeCheckShimGenerator; } });
var type_check_file_1 = require("./src/type_check_file");
Object.defineProperty(exports, "typeCheckFilePath", { enumerable: true, get: function () { return type_check_file_1.typeCheckFilePath; } });
var host_bindings_1 = require("./src/host_bindings");
Object.defineProperty(exports, "createHostElement", { enumerable: true, get: function () { return host_bindings_1.createHostElement; } });
