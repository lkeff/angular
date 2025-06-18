"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// BEGIN-EXTERNAL
require("zone.js/lib/browser/rollup-main");
// END-EXTERNAL
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_1 = require("./app");
const init_1 = require("./init");
(0, core_1.enableProdMode)();
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(app_1.AppModule).then(init_1.init);
