"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app/app.component");
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, { providers: [(0, platform_browser_1.provideProtractorTestingSupport)()] }).catch((err) => console.error(err));
