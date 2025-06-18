"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵgetCleanupHook = exports.ɵFakeNavigation = void 0;
var testing_1 = require("../../primitives/dom-navigation/testing");
Object.defineProperty(exports, "\u0275FakeNavigation", { enumerable: true, get: function () { return testing_1.FakeNavigation; } });
var test_hooks_1 = require("./test_hooks");
Object.defineProperty(exports, "\u0275getCleanupHook", { enumerable: true, get: function () { return test_hooks_1.getCleanupHook; } });
