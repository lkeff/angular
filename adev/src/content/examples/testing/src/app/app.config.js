"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.appProviders = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
const app_routes_1 = require("./app.routes");
const in_memory_data_service_1 = require("./in-memory-data.service");
const hero_service_1 = require("./model/hero.service");
const user_service_1 = require("./model/user.service");
const twain_service_1 = require("./twain/twain.service");
exports.appProviders = [
    (0, router_1.provideRouter)(app_routes_1.routes),
    (0, http_1.provideHttpClient)(),
    (0, platform_browser_1.provideProtractorTestingSupport)(),
    (0, core_1.importProvidersFrom)(
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService, { dataEncapsulation: false })),
    hero_service_1.HeroService,
    twain_service_1.TwainService,
    user_service_1.UserService,
];
exports.appConfig = {
    providers: exports.appProviders,
};
