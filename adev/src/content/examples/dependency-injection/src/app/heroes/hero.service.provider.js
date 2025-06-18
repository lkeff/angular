"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroServiceProvider = void 0;
// #docregion
const hero_service_1 = require("./hero.service");
const logger_service_1 = require("../logger.service");
const user_service_1 = require("../user.service");
// #docregion factory
const heroServiceFactory = (logger, userService) => new hero_service_1.HeroService(logger, userService.user.isAuthorized);
// #enddocregion factory
// #docregion provider
exports.heroServiceProvider = {
    provide: hero_service_1.HeroService,
    useFactory: heroServiceFactory,
    deps: [logger_service_1.Logger, user_service_1.UserService],
};
// #enddocregion provider
