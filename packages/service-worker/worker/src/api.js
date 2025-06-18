"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCacheStatus = void 0;
var UpdateCacheStatus;
(function (UpdateCacheStatus) {
    UpdateCacheStatus[UpdateCacheStatus["NOT_CACHED"] = 0] = "NOT_CACHED";
    UpdateCacheStatus[UpdateCacheStatus["CACHED_BUT_UNUSED"] = 1] = "CACHED_BUT_UNUSED";
    UpdateCacheStatus[UpdateCacheStatus["CACHED"] = 2] = "CACHED";
})(UpdateCacheStatus || (exports.UpdateCacheStatus = UpdateCacheStatus = {}));
