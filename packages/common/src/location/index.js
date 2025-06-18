"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformLocation = exports.LOCATION_INITIALIZED = exports.BrowserPlatformLocation = exports.PathLocationStrategy = exports.LocationStrategy = exports.APP_BASE_HREF = exports.Location = exports.HashLocationStrategy = void 0;
var hash_location_strategy_1 = require("./hash_location_strategy");
Object.defineProperty(exports, "HashLocationStrategy", { enumerable: true, get: function () { return hash_location_strategy_1.HashLocationStrategy; } });
var location_1 = require("./location");
Object.defineProperty(exports, "Location", { enumerable: true, get: function () { return location_1.Location; } });
var location_strategy_1 = require("./location_strategy");
Object.defineProperty(exports, "APP_BASE_HREF", { enumerable: true, get: function () { return location_strategy_1.APP_BASE_HREF; } });
Object.defineProperty(exports, "LocationStrategy", { enumerable: true, get: function () { return location_strategy_1.LocationStrategy; } });
Object.defineProperty(exports, "PathLocationStrategy", { enumerable: true, get: function () { return location_strategy_1.PathLocationStrategy; } });
var platform_location_1 = require("./platform_location");
Object.defineProperty(exports, "BrowserPlatformLocation", { enumerable: true, get: function () { return platform_location_1.BrowserPlatformLocation; } });
Object.defineProperty(exports, "LOCATION_INITIALIZED", { enumerable: true, get: function () { return platform_location_1.LOCATION_INITIALIZED; } });
Object.defineProperty(exports, "PlatformLocation", { enumerable: true, get: function () { return platform_location_1.PlatformLocation; } });
