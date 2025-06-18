"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotFound = exports.NotFoundError = exports.NOT_FOUND = exports.getCurrentInjector = exports.setCurrentInjector = void 0;
var injector_1 = require("./src/injector");
Object.defineProperty(exports, "setCurrentInjector", { enumerable: true, get: function () { return injector_1.setCurrentInjector; } });
Object.defineProperty(exports, "getCurrentInjector", { enumerable: true, get: function () { return injector_1.getCurrentInjector; } });
var not_found_1 = require("./src/not_found");
Object.defineProperty(exports, "NOT_FOUND", { enumerable: true, get: function () { return not_found_1.NOT_FOUND; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return not_found_1.NotFoundError; } });
Object.defineProperty(exports, "isNotFound", { enumerable: true, get: function () { return not_found_1.isNotFound; } });
