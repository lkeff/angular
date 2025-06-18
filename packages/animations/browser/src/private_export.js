"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵnormalizeKeyframes = exports.ɵcamelCaseToDashCase = exports.ɵallowPreviousPlayerStylesMerge = exports.ɵWebAnimationsPlayer = exports.ɵWebAnimationsDriver = exports.ɵvalidateWebAnimatableStyleProperty = exports.ɵvalidateStyleProperty = exports.ɵinvokeQuery = exports.ɵgetParentElement = exports.ɵcontainsElement = exports.ɵBaseAnimationRenderer = exports.ɵAnimationRenderer = exports.ɵAnimationRendererFactory = exports.ɵAnimationEngine = exports.ɵWebAnimationsStyleNormalizer = exports.ɵNoopAnimationStyleNormalizer = exports.ɵAnimationStyleNormalizer = exports.ɵAnimation = exports.ɵcreateEngine = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var create_engine_1 = require("./create_engine");
Object.defineProperty(exports, "\u0275createEngine", { enumerable: true, get: function () { return create_engine_1.createEngine; } });
var animation_1 = require("./dsl/animation");
Object.defineProperty(exports, "\u0275Animation", { enumerable: true, get: function () { return animation_1.Animation; } });
var animation_style_normalizer_1 = require("./dsl/style_normalization/animation_style_normalizer");
Object.defineProperty(exports, "\u0275AnimationStyleNormalizer", { enumerable: true, get: function () { return animation_style_normalizer_1.AnimationStyleNormalizer; } });
Object.defineProperty(exports, "\u0275NoopAnimationStyleNormalizer", { enumerable: true, get: function () { return animation_style_normalizer_1.NoopAnimationStyleNormalizer; } });
var web_animations_style_normalizer_1 = require("./dsl/style_normalization/web_animations_style_normalizer");
Object.defineProperty(exports, "\u0275WebAnimationsStyleNormalizer", { enumerable: true, get: function () { return web_animations_style_normalizer_1.WebAnimationsStyleNormalizer; } });
var animation_engine_next_1 = require("./render/animation_engine_next");
Object.defineProperty(exports, "\u0275AnimationEngine", { enumerable: true, get: function () { return animation_engine_next_1.AnimationEngine; } });
var animation_renderer_1 = require("./render/animation_renderer");
Object.defineProperty(exports, "\u0275AnimationRendererFactory", { enumerable: true, get: function () { return animation_renderer_1.AnimationRendererFactory; } });
var renderer_1 = require("./render/renderer");
Object.defineProperty(exports, "\u0275AnimationRenderer", { enumerable: true, get: function () { return renderer_1.AnimationRenderer; } });
Object.defineProperty(exports, "\u0275BaseAnimationRenderer", { enumerable: true, get: function () { return renderer_1.BaseAnimationRenderer; } });
var shared_1 = require("./render/shared");
Object.defineProperty(exports, "\u0275containsElement", { enumerable: true, get: function () { return shared_1.containsElement; } });
Object.defineProperty(exports, "\u0275getParentElement", { enumerable: true, get: function () { return shared_1.getParentElement; } });
Object.defineProperty(exports, "\u0275invokeQuery", { enumerable: true, get: function () { return shared_1.invokeQuery; } });
Object.defineProperty(exports, "\u0275validateStyleProperty", { enumerable: true, get: function () { return shared_1.validateStyleProperty; } });
Object.defineProperty(exports, "\u0275validateWebAnimatableStyleProperty", { enumerable: true, get: function () { return shared_1.validateWebAnimatableStyleProperty; } });
var web_animations_driver_1 = require("./render/web_animations/web_animations_driver");
Object.defineProperty(exports, "\u0275WebAnimationsDriver", { enumerable: true, get: function () { return web_animations_driver_1.WebAnimationsDriver; } });
var web_animations_player_1 = require("./render/web_animations/web_animations_player");
Object.defineProperty(exports, "\u0275WebAnimationsPlayer", { enumerable: true, get: function () { return web_animations_player_1.WebAnimationsPlayer; } });
var util_1 = require("./util");
Object.defineProperty(exports, "\u0275allowPreviousPlayerStylesMerge", { enumerable: true, get: function () { return util_1.allowPreviousPlayerStylesMerge; } });
Object.defineProperty(exports, "\u0275camelCaseToDashCase", { enumerable: true, get: function () { return util_1.camelCaseToDashCase; } });
Object.defineProperty(exports, "\u0275normalizeKeyframes", { enumerable: true, get: function () { return util_1.normalizeKeyframes; } });
