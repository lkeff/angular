"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const http_1 = require("@angular/common/http");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const app_routes_1 = require("./app.routes");
exports.appConfig = {
    providers: [
        (0, router_1.provideRouter)(app_routes_1.routes),
        (0, platform_browser_1.provideClientHydration)((0, platform_browser_1.withIncrementalHydration)()),
        (0, http_1.provideHttpClient)(),
    ],
};
