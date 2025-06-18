"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app/app.component");
const app_config_server_1 = require("./app/app.config.server");
const platform_server_1 = require("@angular/platform-server");
const bootstrap = () => (0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, app_config_server_1.config);
/**
 * Function that will profile the server-side rendering
 *
 * @param DISABLE_DOM_EMULATION will prevent the platform-server from using the DominoAdapter, `false` by default
 * (But won't prevent the monkey patching of DOM apis as this is introduced by the CLI)
 */
const render = (DISABLE_DOM_EMULATION = false) => {
    (0, core_1.ɵenableProfiling)();
    let doc;
    if (DISABLE_DOM_EMULATION) {
        doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = '<app-root></app-root>';
    }
    else {
        doc = '<html><head></head><body><app-root></app-root></body></html>';
    }
    return (0, platform_server_1.renderApplication)(bootstrap, {
        document: doc,
        platformProviders: [{ provide: platform_server_1.ɵENABLE_DOM_EMULATION, useValue: !DISABLE_DOM_EMULATION }],
    });
};
exports.render = render;
// Tooling expects a default export but we don't use/need it.
exports.default = bootstrap;
