"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app/app.component");
const router_1 = require("@angular/router");
const routes_1 = __importDefault(require("./app/routes"));
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, {
    providers: [(0, platform_browser_1.provideProtractorTestingSupport)(), (0, router_1.provideRouter)(routes_1.default)],
}).catch((err) => console.error(err));
