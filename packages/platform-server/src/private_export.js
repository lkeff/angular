"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵENABLE_DOM_EMULATION = exports.ɵrenderInternal = exports.ɵSERVER_CONTEXT = exports.ɵSERVER_RENDER_PROVIDERS = exports.ɵINTERNAL_SERVER_PLATFORM_PROVIDERS = void 0;
var server_1 = require("./server");
Object.defineProperty(exports, "\u0275INTERNAL_SERVER_PLATFORM_PROVIDERS", { enumerable: true, get: function () { return server_1.INTERNAL_SERVER_PLATFORM_PROVIDERS; } });
Object.defineProperty(exports, "\u0275SERVER_RENDER_PROVIDERS", { enumerable: true, get: function () { return server_1.SERVER_RENDER_PROVIDERS; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "\u0275SERVER_CONTEXT", { enumerable: true, get: function () { return utils_1.SERVER_CONTEXT; } });
Object.defineProperty(exports, "\u0275renderInternal", { enumerable: true, get: function () { return utils_1.renderInternal; } });
var tokens_1 = require("./tokens");
Object.defineProperty(exports, "\u0275ENABLE_DOM_EMULATION", { enumerable: true, get: function () { return tokens_1.ENABLE_DOM_EMULATION; } });
