"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwUpdate = exports.SwPush = exports.SwRegistrationOptions = exports.provideServiceWorker = exports.ServiceWorkerModule = void 0;
var module_1 = require("./module");
Object.defineProperty(exports, "ServiceWorkerModule", { enumerable: true, get: function () { return module_1.ServiceWorkerModule; } });
var provider_1 = require("./provider");
Object.defineProperty(exports, "provideServiceWorker", { enumerable: true, get: function () { return provider_1.provideServiceWorker; } });
Object.defineProperty(exports, "SwRegistrationOptions", { enumerable: true, get: function () { return provider_1.SwRegistrationOptions; } });
var push_1 = require("./push");
Object.defineProperty(exports, "SwPush", { enumerable: true, get: function () { return push_1.SwPush; } });
var update_1 = require("./update");
Object.defineProperty(exports, "SwUpdate", { enumerable: true, get: function () { return update_1.SwUpdate; } });
