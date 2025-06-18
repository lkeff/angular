"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵEmptyOutletComponent = exports.ɵɵRouterLinkActive = exports.ɵɵRouterLink = exports.ɵɵRouterOutlet = exports.RouterTestingHarness = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of the router/testing package.
 */
__exportStar(require("./router_testing_module"), exports);
var router_testing_harness_1 = require("./router_testing_harness");
Object.defineProperty(exports, "RouterTestingHarness", { enumerable: true, get: function () { return router_testing_harness_1.RouterTestingHarness; } });
// Re-export the symbols that are exposed by the `RouterTestingModule` (which re-exports
// the symbols from the `RouterModule`). Re-exports are needed for the Angular compiler
// to overcome its limitation (on the consumer side) of not knowing where to import import
// symbols when relative imports are used within the package.
// Note: These exports need to be stable and shouldn't be renamed unnecessarily because
// consuming libraries might have references to them in their own partial compilation output.
var router_outlet_1 = require("../../src/directives/router_outlet");
Object.defineProperty(exports, "\u0275\u0275RouterOutlet", { enumerable: true, get: function () { return router_outlet_1.RouterOutlet; } });
var router_link_1 = require("../../src/directives/router_link");
Object.defineProperty(exports, "\u0275\u0275RouterLink", { enumerable: true, get: function () { return router_link_1.RouterLink; } });
var router_link_active_1 = require("../../src/directives/router_link_active");
Object.defineProperty(exports, "\u0275\u0275RouterLinkActive", { enumerable: true, get: function () { return router_link_active_1.RouterLinkActive; } });
var empty_outlet_1 = require("../../src/components/empty_outlet");
Object.defineProperty(exports, "\u0275\u0275EmptyOutletComponent", { enumerable: true, get: function () { return empty_outlet_1.EmptyOutletComponent; } });
