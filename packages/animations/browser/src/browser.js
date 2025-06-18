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
exports.NoopAnimationDriver = exports.AnimationDriver = void 0;
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
var animation_driver_1 = require("./render/animation_driver");
Object.defineProperty(exports, "AnimationDriver", { enumerable: true, get: function () { return animation_driver_1.AnimationDriver; } });
Object.defineProperty(exports, "NoopAnimationDriver", { enumerable: true, get: function () { return animation_driver_1.NoopAnimationDriver; } });
__exportStar(require("./private_export"), exports);
