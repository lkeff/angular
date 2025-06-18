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
exports.provideLocationMocks = exports.MockPlatformLocation = exports.MOCK_PLATFORM_LOCATION_CONFIG = exports.MockLocationStrategy = exports.SpyLocation = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of the common/testing package.
 */
__exportStar(require("./private_export"), exports);
var location_mock_1 = require("./location_mock");
Object.defineProperty(exports, "SpyLocation", { enumerable: true, get: function () { return location_mock_1.SpyLocation; } });
var mock_location_strategy_1 = require("./mock_location_strategy");
Object.defineProperty(exports, "MockLocationStrategy", { enumerable: true, get: function () { return mock_location_strategy_1.MockLocationStrategy; } });
var mock_platform_location_1 = require("./mock_platform_location");
Object.defineProperty(exports, "MOCK_PLATFORM_LOCATION_CONFIG", { enumerable: true, get: function () { return mock_platform_location_1.MOCK_PLATFORM_LOCATION_CONFIG; } });
Object.defineProperty(exports, "MockPlatformLocation", { enumerable: true, get: function () { return mock_platform_location_1.MockPlatformLocation; } });
var provide_location_mocks_1 = require("./provide_location_mocks");
Object.defineProperty(exports, "provideLocationMocks", { enumerable: true, get: function () { return provide_location_mocks_1.provideLocationMocks; } });
