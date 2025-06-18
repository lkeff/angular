"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
// #docplaster
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_2 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const http_1 = require("@angular/common/http");
const app_routes_1 = require("./app.routes");
const angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
const in_memory_data_service_1 = require("./in-memory-data.service");
exports.appConfig = {
    providers: [
        (0, router_1.provideRouter)(app_routes_1.routes),
        (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
        (0, platform_browser_2.provideClientHydration)((0, platform_browser_1.withEventReplay)()),
        (0, platform_browser_1.provideProtractorTestingSupport)(), // essential for e2e testing
        // TODO: Remove from production apps
        (0, core_1.importProvidersFrom)(
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService, { dataEncapsulation: false })),
        // ...
    ],
};
