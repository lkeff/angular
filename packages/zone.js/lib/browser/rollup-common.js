"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCommon = patchCommon;
const promise_1 = require("../common/promise");
const to_string_1 = require("../common/to-string");
const api_util_1 = require("./api-util");
function patchCommon(Zone) {
    (0, promise_1.patchPromise)(Zone);
    (0, to_string_1.patchToString)(Zone);
    (0, api_util_1.patchUtil)(Zone);
}
