"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_CONFIGURATION = void 0;
const core_1 = require("@angular/core");
/**
 * A DI token for the router service.
 *
 * @publicApi
 */
exports.ROUTER_CONFIGURATION = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'router config' : '', {
    providedIn: 'root',
    factory: () => ({}),
});
