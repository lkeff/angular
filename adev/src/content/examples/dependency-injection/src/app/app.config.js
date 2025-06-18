"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("./logger.service");
const user_service_1 = require("./user.service");
const injection_config_1 = require("./injection.config");
const platform_browser_1 = require("@angular/platform-browser");
const appConfig = {
    providers: [
        (0, platform_browser_1.provideProtractorTestingSupport)(),
        logger_service_1.Logger,
        user_service_1.UserService,
        { provide: injection_config_1.APP_CONFIG, useValue: injection_config_1.HERO_DI_CONFIG },
    ],
};
exports.default = appConfig;
