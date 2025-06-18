"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEngine = createEngine;
const animation_style_normalizer_1 = require("./dsl/style_normalization/animation_style_normalizer");
const web_animations_style_normalizer_1 = require("./dsl/style_normalization/web_animations_style_normalizer");
const animation_driver_1 = require("./render/animation_driver");
const animation_engine_next_1 = require("./render/animation_engine_next");
const web_animations_driver_1 = require("./render/web_animations/web_animations_driver");
function createEngine(type, doc) {
    // TODO: find a way to make this tree shakable.
    if (type === 'noop') {
        return new animation_engine_next_1.AnimationEngine(doc, new animation_driver_1.NoopAnimationDriver(), new animation_style_normalizer_1.NoopAnimationStyleNormalizer());
    }
    return new animation_engine_next_1.AnimationEngine(doc, new web_animations_driver_1.WebAnimationsDriver(), new web_animations_style_normalizer_1.WebAnimationsStyleNormalizer());
}
