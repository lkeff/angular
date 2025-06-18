"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵPlatformNavigation = exports.ɵsetRootDomAdapter = exports.ɵgetDOM = exports.ɵDomAdapter = void 0;
var dom_adapter_1 = require("./dom_adapter");
Object.defineProperty(exports, "\u0275DomAdapter", { enumerable: true, get: function () { return dom_adapter_1.DomAdapter; } });
Object.defineProperty(exports, "\u0275getDOM", { enumerable: true, get: function () { return dom_adapter_1.getDOM; } });
Object.defineProperty(exports, "\u0275setRootDomAdapter", { enumerable: true, get: function () { return dom_adapter_1.setRootDomAdapter; } });
var platform_navigation_1 = require("./navigation/platform_navigation");
Object.defineProperty(exports, "\u0275PlatformNavigation", { enumerable: true, get: function () { return platform_navigation_1.PlatformNavigation; } });
