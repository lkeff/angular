"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/common/http");
const app_component_1 = require("./app/app.component");
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, {
    // HttpClientModule is only used in deprecated HeroListComponent
    providers: [
        (0, http_1.provideHttpClient)(),
        (0, platform_browser_1.provideProtractorTestingSupport)(), // essential for e2e testing
    ],
});
