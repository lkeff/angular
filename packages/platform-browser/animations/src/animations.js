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
exports.provideNoopAnimations = exports.provideAnimations = exports.NoopAnimationsModule = exports.BrowserAnimationsModule = exports.ANIMATION_MODULE_TYPE = void 0;
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
var core_1 = require("@angular/core");
Object.defineProperty(exports, "ANIMATION_MODULE_TYPE", { enumerable: true, get: function () { return core_1.ANIMATION_MODULE_TYPE; } });
var module_1 = require("./module");
Object.defineProperty(exports, "BrowserAnimationsModule", { enumerable: true, get: function () { return module_1.BrowserAnimationsModule; } });
Object.defineProperty(exports, "NoopAnimationsModule", { enumerable: true, get: function () { return module_1.NoopAnimationsModule; } });
Object.defineProperty(exports, "provideAnimations", { enumerable: true, get: function () { return module_1.provideAnimations; } });
Object.defineProperty(exports, "provideNoopAnimations", { enumerable: true, get: function () { return module_1.provideNoopAnimations; } });
__exportStar(require("./private_export"), exports);
