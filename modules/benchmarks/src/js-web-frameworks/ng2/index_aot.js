"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const init_1 = require("./init");
const rows_1 = require("./rows");
(0, core_1.enableProdMode)();
(0, platform_browser_1.platformBrowser)()
    .bootstrapModule(rows_1.JsWebFrameworksModule, {
    ngZone: 'noop',
})
    .then(init_1.init);
