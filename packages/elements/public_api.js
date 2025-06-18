"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.NgElement = exports.createCustomElement = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of the `elements` package.
 */
var create_custom_element_1 = require("./src/create-custom-element");
Object.defineProperty(exports, "createCustomElement", { enumerable: true, get: function () { return create_custom_element_1.createCustomElement; } });
Object.defineProperty(exports, "NgElement", { enumerable: true, get: function () { return create_custom_element_1.NgElement; } });
var version_1 = require("./src/version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
// This file only reexports content of the `src` folder. Keep it that way.
