"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const platform_browser_1 = require("@angular/platform-browser");
const environment_1 = __importDefault(require("./environment"));
const previews_1 = require("./../assets/previews/previews");
const analytics_service_1 = require("./core/services/analytics/analytics.service");
const content_loader_service_1 = require("./core/services/content-loader.service");
const error_handler_1 = require("./core/services/errors-handling/error-handler");
const example_content_loader_service_1 = require("./core/services/example-content-loader.service");
const router_providers_1 = require("./router_providers");
exports.appConfig = {
    providers: [
        router_providers_1.routerProviders,
        (0, core_1.provideZonelessChangeDetection)(),
        (0, platform_browser_1.provideClientHydration)(),
        (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
        (0, core_1.provideEnvironmentInitializer)(() => (0, core_1.inject)(analytics_service_1.AnalyticsService)),
        (0, docs_1.provideAlgoliaSearchClient)(environment_1.default),
        { provide: docs_1.ENVIRONMENT, useValue: environment_1.default },
        { provide: core_1.ErrorHandler, useClass: error_handler_1.CustomErrorHandler },
        { provide: docs_1.PREVIEWS_COMPONENTS, useValue: previews_1.PREVIEWS_COMPONENTS_MAP },
        { provide: docs_1.DOCS_CONTENT_LOADER, useClass: content_loader_service_1.ContentLoader },
        { provide: docs_1.EXAMPLE_VIEWER_CONTENT_LOADER, useClass: example_content_loader_service_1.ExampleContentLoader },
        {
            provide: docs_1.WINDOW,
            useFactory: (document) => (0, docs_1.windowProvider)(document),
            deps: [common_1.DOCUMENT],
        },
    ],
};
