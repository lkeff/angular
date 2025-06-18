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
exports.NoopAnimationPlayer = exports.useAnimation = exports.trigger = exports.transition = exports.style = exports.state = exports.stagger = exports.sequence = exports.query = exports.keyframes = exports.group = exports.AUTO_STYLE = exports.AnimationMetadataType = exports.animation = exports.animateChild = exports.animate = exports.AnimationFactory = exports.AnimationBuilder = void 0;
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation package.
 */
var animation_builder_1 = require("./animation_builder");
Object.defineProperty(exports, "AnimationBuilder", { enumerable: true, get: function () { return animation_builder_1.AnimationBuilder; } });
Object.defineProperty(exports, "AnimationFactory", { enumerable: true, get: function () { return animation_builder_1.AnimationFactory; } });
var animation_metadata_1 = require("./animation_metadata");
Object.defineProperty(exports, "animate", { enumerable: true, get: function () { return animation_metadata_1.animate; } });
Object.defineProperty(exports, "animateChild", { enumerable: true, get: function () { return animation_metadata_1.animateChild; } });
Object.defineProperty(exports, "animation", { enumerable: true, get: function () { return animation_metadata_1.animation; } });
Object.defineProperty(exports, "AnimationMetadataType", { enumerable: true, get: function () { return animation_metadata_1.AnimationMetadataType; } });
Object.defineProperty(exports, "AUTO_STYLE", { enumerable: true, get: function () { return animation_metadata_1.AUTO_STYLE; } });
Object.defineProperty(exports, "group", { enumerable: true, get: function () { return animation_metadata_1.group; } });
Object.defineProperty(exports, "keyframes", { enumerable: true, get: function () { return animation_metadata_1.keyframes; } });
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return animation_metadata_1.query; } });
Object.defineProperty(exports, "sequence", { enumerable: true, get: function () { return animation_metadata_1.sequence; } });
Object.defineProperty(exports, "stagger", { enumerable: true, get: function () { return animation_metadata_1.stagger; } });
Object.defineProperty(exports, "state", { enumerable: true, get: function () { return animation_metadata_1.state; } });
Object.defineProperty(exports, "style", { enumerable: true, get: function () { return animation_metadata_1.style; } });
Object.defineProperty(exports, "transition", { enumerable: true, get: function () { return animation_metadata_1.transition; } });
Object.defineProperty(exports, "trigger", { enumerable: true, get: function () { return animation_metadata_1.trigger; } });
Object.defineProperty(exports, "useAnimation", { enumerable: true, get: function () { return animation_metadata_1.useAnimation; } });
var animation_player_1 = require("./players/animation_player");
Object.defineProperty(exports, "NoopAnimationPlayer", { enumerable: true, get: function () { return animation_player_1.NoopAnimationPlayer; } });
__exportStar(require("./private_export"), exports);
