"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformBrowserDynamic = exports.JitCompilerFactory = exports.VERSION = void 0;
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var compiler_factory_1 = require("./compiler_factory");
Object.defineProperty(exports, "JitCompilerFactory", { enumerable: true, get: function () { return compiler_factory_1.JitCompilerFactory; } });
var platform_providers_1 = require("./platform_providers");
Object.defineProperty(exports, "platformBrowserDynamic", { enumerable: true, get: function () { return platform_providers_1.platformBrowserDynamic; } });
__exportStar(require("./private_export"), exports);
