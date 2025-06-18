"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRequest = exports.provideHttpClientTesting = exports.HttpClientTestingModule = exports.HttpTestingController = void 0;
var api_1 = require("./src/api");
Object.defineProperty(exports, "HttpTestingController", { enumerable: true, get: function () { return api_1.HttpTestingController; } });
var module_1 = require("./src/module");
Object.defineProperty(exports, "HttpClientTestingModule", { enumerable: true, get: function () { return module_1.HttpClientTestingModule; } });
var provider_1 = require("./src/provider");
Object.defineProperty(exports, "provideHttpClientTesting", { enumerable: true, get: function () { return provider_1.provideHttpClientTesting; } });
var request_1 = require("./src/request");
Object.defineProperty(exports, "TestRequest", { enumerable: true, get: function () { return request_1.TestRequest; } });
