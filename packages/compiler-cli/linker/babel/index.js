"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEs2015LinkerPlugin = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const babel_plugin_1 = require("./src/babel_plugin");
var es2015_linker_plugin_1 = require("./src/es2015_linker_plugin");
Object.defineProperty(exports, "createEs2015LinkerPlugin", { enumerable: true, get: function () { return es2015_linker_plugin_1.createEs2015LinkerPlugin; } });
exports.default = babel_plugin_1.defaultLinkerPlugin;
