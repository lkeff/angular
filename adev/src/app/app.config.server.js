"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@angular/core");
const ssr_1 = require("@angular/ssr");
const app_config_1 = require("./app.config");
const serverConfig = {
    providers: [(0, ssr_1.provideServerRendering)((0, ssr_1.withRoutes)([{ path: '**', renderMode: ssr_1.RenderMode.Prerender }]))],
};
exports.config = (0, core_1.mergeApplicationConfig)(app_config_1.appConfig, serverConfig);
