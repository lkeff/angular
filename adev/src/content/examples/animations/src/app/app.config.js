"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const app_routes_1 = require("./app.routes");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
exports.appConfig = {
    providers: [
        // needed for supporting e2e tests
        (0, platform_browser_1.provideProtractorTestingSupport)(),
        (0, router_1.provideRouter)(app_routes_1.routes),
        (0, animations_1.provideAnimations)(),
    ],
};
