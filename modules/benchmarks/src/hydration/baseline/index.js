"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const init_1 = require("../init");
const table_1 = require("../table");
(0, init_1.syncUrlParamsToForm)();
(0, platform_browser_1.bootstrapApplication)(table_1.AppComponent, {
    providers: [(0, platform_browser_1.provideProtractorTestingSupport)()],
}).then((appRef) => (0, init_1.init)(appRef, false /* insertSsrContent */));
