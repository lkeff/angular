"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const app_module_1 = require("./app/app.module");
window['doBootstrap'] = () => {
    (0, platform_browser_1.platformBrowser)().bootstrapModule(app_module_1.AppModule);
};
