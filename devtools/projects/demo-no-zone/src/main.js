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
const app_component_1 = require("./app/app.component");
const core_1 = require("@angular/core");
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, {
    providers: [(0, core_1.provideZonelessChangeDetection)()],
}).catch((err) => console.error(err));
