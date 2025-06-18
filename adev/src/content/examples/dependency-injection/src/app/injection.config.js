"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HERO_DI_CONFIG = exports.APP_CONFIG = void 0;
// #docregion token
const core_1 = require("@angular/core");
exports.APP_CONFIG = new core_1.InjectionToken('app.config');
// #enddocregion token
exports.HERO_DI_CONFIG = {
    apiEndpoint: 'api.heroes.com',
    title: 'Dependency Injection',
};
