"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/lib/browser/rollup-main");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const module_1 = require("./module");
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(module_1.AppModule);
