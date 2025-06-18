"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlCodec = exports.AngularJSUrlCodec = exports.LocationUpgradeModule = exports.LOCATION_UPGRADE_CONFIGURATION = exports.$locationShimProvider = exports.$locationShim = void 0;
var location_shim_1 = require("./location_shim");
Object.defineProperty(exports, "$locationShim", { enumerable: true, get: function () { return location_shim_1.$locationShim; } });
Object.defineProperty(exports, "$locationShimProvider", { enumerable: true, get: function () { return location_shim_1.$locationShimProvider; } });
var location_upgrade_module_1 = require("./location_upgrade_module");
Object.defineProperty(exports, "LOCATION_UPGRADE_CONFIGURATION", { enumerable: true, get: function () { return location_upgrade_module_1.LOCATION_UPGRADE_CONFIGURATION; } });
Object.defineProperty(exports, "LocationUpgradeModule", { enumerable: true, get: function () { return location_upgrade_module_1.LocationUpgradeModule; } });
var params_1 = require("./params");
Object.defineProperty(exports, "AngularJSUrlCodec", { enumerable: true, get: function () { return params_1.AngularJSUrlCodec; } });
Object.defineProperty(exports, "UrlCodec", { enumerable: true, get: function () { return params_1.UrlCodec; } });
