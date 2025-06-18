"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #docregion global-locale
require("@angular/common/locales/global/fr");
// #enddocregion global-locale
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_2 = require("@angular/platform-browser");
const app_component_1 = require("./app/app.component");
(0, platform_browser_2.bootstrapApplication)(app_component_1.AppComponent, {
    providers: [
        (0, platform_browser_1.provideProtractorTestingSupport)(), // essential for e2e testing
    ],
});
