"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const zone_1 = require("../zone");
const browser_1 = require("./browser");
const browser_legacy_1 = require("./browser-legacy");
const rollup_common_1 = require("./rollup-common");
const Zone = (0, zone_1.loadZone)();
(0, rollup_common_1.patchCommon)(Zone);
(0, browser_legacy_1.patchBrowserLegacy)();
(0, browser_1.patchBrowser)(Zone);
