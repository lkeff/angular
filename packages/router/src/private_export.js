"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵafterNextNavigation = exports.ɵROUTER_PROVIDERS = exports.ɵloadChildren = exports.ɵEmptyOutletComponent = void 0;
var empty_outlet_1 = require("./components/empty_outlet");
Object.defineProperty(exports, "\u0275EmptyOutletComponent", { enumerable: true, get: function () { return empty_outlet_1.ɵEmptyOutletComponent; } });
var router_config_loader_1 = require("./router_config_loader");
Object.defineProperty(exports, "\u0275loadChildren", { enumerable: true, get: function () { return router_config_loader_1.loadChildren; } });
var router_module_1 = require("./router_module");
Object.defineProperty(exports, "\u0275ROUTER_PROVIDERS", { enumerable: true, get: function () { return router_module_1.ROUTER_PROVIDERS; } });
var navigations_1 = require("./utils/navigations");
Object.defineProperty(exports, "\u0275afterNextNavigation", { enumerable: true, get: function () { return navigations_1.afterNextNavigation; } });
