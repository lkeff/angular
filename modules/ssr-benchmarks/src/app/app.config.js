"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
exports.appConfig = {
    providers: [(0, core_1.provideZonelessChangeDetection)(), (0, platform_browser_1.provideClientHydration)((0, platform_browser_1.withEventReplay)())],
};
