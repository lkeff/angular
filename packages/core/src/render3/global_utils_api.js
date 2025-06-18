"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootComponents = exports.getOwningComponent = exports.getListeners = exports.getInjector = exports.getHostElement = exports.getDirectives = exports.getDirectiveMetadata = exports.getContext = exports.getComponent = exports.enableProfiling = exports.applyChanges = void 0;
/**
 * @fileoverview
 * This file is the index file collecting all of the symbols published on the global.ng namespace.
 *
 * The reason why this file/module is separate global_utils.ts file is that we use this file
 * to generate a d.ts file containing all the published symbols that is then compared to the golden
 * file in the public_api_guard test.
 */
var change_detection_utils_1 = require("./util/change_detection_utils");
Object.defineProperty(exports, "applyChanges", { enumerable: true, get: function () { return change_detection_utils_1.applyChanges; } });
var chrome_dev_tools_performance_1 = require("./debug/chrome_dev_tools_performance");
Object.defineProperty(exports, "enableProfiling", { enumerable: true, get: function () { return chrome_dev_tools_performance_1.enableProfiling; } });
var discovery_utils_1 = require("./util/discovery_utils");
Object.defineProperty(exports, "getComponent", { enumerable: true, get: function () { return discovery_utils_1.getComponent; } });
Object.defineProperty(exports, "getContext", { enumerable: true, get: function () { return discovery_utils_1.getContext; } });
Object.defineProperty(exports, "getDirectiveMetadata", { enumerable: true, get: function () { return discovery_utils_1.getDirectiveMetadata; } });
Object.defineProperty(exports, "getDirectives", { enumerable: true, get: function () { return discovery_utils_1.getDirectives; } });
Object.defineProperty(exports, "getHostElement", { enumerable: true, get: function () { return discovery_utils_1.getHostElement; } });
Object.defineProperty(exports, "getInjector", { enumerable: true, get: function () { return discovery_utils_1.getInjector; } });
Object.defineProperty(exports, "getListeners", { enumerable: true, get: function () { return discovery_utils_1.getListeners; } });
Object.defineProperty(exports, "getOwningComponent", { enumerable: true, get: function () { return discovery_utils_1.getOwningComponent; } });
Object.defineProperty(exports, "getRootComponents", { enumerable: true, get: function () { return discovery_utils_1.getRootComponents; } });
