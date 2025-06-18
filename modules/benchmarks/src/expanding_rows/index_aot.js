"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// This benchmark uses i18n in its `ExpandingRowSummary` component so `$localize` must be loaded.
require("@angular/localize/init");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const benchmark_1 = require("./benchmark");
(0, core_1.enableProdMode)();
(0, platform_browser_1.platformBrowser)().bootstrapModule(benchmark_1.ExpandingRowBenchmarkModule);
