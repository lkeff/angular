"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../browser/browser");
const rollup_common_1 = require("../browser/rollup-common");
const node_1 = require("../node/node");
const zone_1 = require("../zone");
const Zone = (0, zone_1.loadZone)();
(0, rollup_common_1.patchCommon)(Zone);
(0, browser_1.patchBrowser)(Zone);
(0, node_1.patchNode)(Zone);
