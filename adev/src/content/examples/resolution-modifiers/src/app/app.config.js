"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const appConfig = {
    providers: [
        (0, platform_browser_1.provideProtractorTestingSupport)(), //only needed for docs e2e testing
    ],
};
exports.default = appConfig;
