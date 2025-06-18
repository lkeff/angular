"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeAdapterRef = exports.UpgradeAdapter = exports.VERSION = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of this package. allowing
 * Angular 1 and Angular 2+ to run side by side in the same application.
 */
var version_1 = require("./src/common/src/version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var upgrade_adapter_1 = require("./src/dynamic/src/upgrade_adapter");
Object.defineProperty(exports, "UpgradeAdapter", { enumerable: true, get: function () { return upgrade_adapter_1.UpgradeAdapter; } });
Object.defineProperty(exports, "UpgradeAdapterRef", { enumerable: true, get: function () { return upgrade_adapter_1.UpgradeAdapterRef; } });
// This file only re-exports content of the `src` folder. Keep it that way.
