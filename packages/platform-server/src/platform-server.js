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
exports.VERSION = exports.renderModule = exports.renderApplication = exports.INITIAL_CONFIG = exports.BEFORE_APP_SERIALIZED = exports.ServerModule = exports.platformServer = exports.provideServerRendering = exports.PlatformState = void 0;
var platform_state_1 = require("./platform_state");
Object.defineProperty(exports, "PlatformState", { enumerable: true, get: function () { return platform_state_1.PlatformState; } });
var provide_server_1 = require("./provide_server");
Object.defineProperty(exports, "provideServerRendering", { enumerable: true, get: function () { return provide_server_1.provideServerRendering; } });
var server_1 = require("./server");
Object.defineProperty(exports, "platformServer", { enumerable: true, get: function () { return server_1.platformServer; } });
Object.defineProperty(exports, "ServerModule", { enumerable: true, get: function () { return server_1.ServerModule; } });
var tokens_1 = require("./tokens");
Object.defineProperty(exports, "BEFORE_APP_SERIALIZED", { enumerable: true, get: function () { return tokens_1.BEFORE_APP_SERIALIZED; } });
Object.defineProperty(exports, "INITIAL_CONFIG", { enumerable: true, get: function () { return tokens_1.INITIAL_CONFIG; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "renderApplication", { enumerable: true, get: function () { return utils_1.renderApplication; } });
Object.defineProperty(exports, "renderModule", { enumerable: true, get: function () { return utils_1.renderModule; } });
__exportStar(require("./private_export"), exports);
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
