"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTrigger = makeTrigger;
const animations_1 = require("../../src/animations");
const animation_ast_builder_1 = require("../src/dsl/animation_ast_builder");
const animation_trigger_1 = require("../src/dsl/animation_trigger");
const animation_style_normalizer_1 = require("../src/dsl/style_normalization/animation_style_normalizer");
const error_helpers_1 = require("../src/error_helpers");
const warning_helpers_1 = require("../src/warning_helpers");
const mock_animation_driver_1 = require("../testing/src/mock_animation_driver");
function makeTrigger(name, steps, skipErrors = false) {
    const driver = new mock_animation_driver_1.MockAnimationDriver();
    const errors = [];
    const warnings = [];
    const triggerData = (0, animations_1.trigger)(name, steps);
    const triggerAst = (0, animation_ast_builder_1.buildAnimationAst)(driver, triggerData, errors, warnings);
    if (!skipErrors && errors.length) {
        throw (0, error_helpers_1.triggerParsingFailed)(name, errors);
    }
    if (warnings.length) {
        (0, warning_helpers_1.triggerParsingWarnings)(name, warnings);
    }
    return (0, animation_trigger_1.buildTrigger)(name, triggerAst, new animation_style_normalizer_1.NoopAnimationStyleNormalizer());
}
