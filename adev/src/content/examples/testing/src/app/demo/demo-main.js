"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main app entry point
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const demo_1 = require("./demo");
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(demo_1.DemoModule);
