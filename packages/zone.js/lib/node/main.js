"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupMain = rollupMain;
const promise_1 = require("../common/promise");
const to_string_1 = require("../common/to-string");
const zone_1 = require("../zone");
const node_1 = require("./node");
function rollupMain() {
    const Zone = (0, zone_1.loadZone)();
    (0, node_1.patchNode)(Zone); // Node needs to come first.
    (0, promise_1.patchPromise)(Zone);
    (0, to_string_1.patchToString)(Zone);
    return Zone;
}
