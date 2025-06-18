"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app/app.component");
const app_config_1 = __importDefault(require("./app/app.config"));
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, app_config_1.default);
