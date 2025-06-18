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
require("zone.js/lib/zone-spec/task-tracking");
// okd
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const test_module_1 = require("./test_module");
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(test_module_1.TestsAppModule);
