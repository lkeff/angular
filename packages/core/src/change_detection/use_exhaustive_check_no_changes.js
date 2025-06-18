"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseExhaustiveCheckNoChanges = exports.USE_EXHAUSTIVE_CHECK_NO_CHANGES_DEFAULT = void 0;
const di_1 = require("../di");
exports.USE_EXHAUSTIVE_CHECK_NO_CHANGES_DEFAULT = false;
exports.UseExhaustiveCheckNoChanges = new di_1.InjectionToken(ngDevMode ? 'exhaustive checkNoChanges' : '');
