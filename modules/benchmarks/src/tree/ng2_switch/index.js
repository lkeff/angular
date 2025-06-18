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
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const init_1 = require("./init");
const tree_1 = require("./tree");
(0, core_1.enableProdMode)();
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(tree_1.AppModule).then(init_1.init);
