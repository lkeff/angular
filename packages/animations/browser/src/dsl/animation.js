"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
const error_helpers_1 = require("../error_helpers");
const util_1 = require("../util");
const warning_helpers_1 = require("../warning_helpers");
const animation_ast_builder_1 = require("./animation_ast_builder");
const animation_timeline_builder_1 = require("./animation_timeline_builder");
const element_instruction_map_1 = require("./element_instruction_map");
class Animation {
    constructor(_driver, input) {
        this._driver = _driver;
        const errors = [];
        const warnings = [];
        const ast = (0, animation_ast_builder_1.buildAnimationAst)(_driver, input, errors, warnings);
        if (errors.length) {
            throw (0, error_helpers_1.validationFailed)(errors);
        }
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (warnings.length) {
                (0, warning_helpers_1.warnValidation)(warnings);
            }
        }
        this._animationAst = ast;
    }
    buildTimelines(element, startingStyles, destinationStyles, options, subInstructions) {
        const start = Array.isArray(startingStyles)
            ? (0, util_1.normalizeStyles)(startingStyles)
            : startingStyles;
        const dest = Array.isArray(destinationStyles)
            ? (0, util_1.normalizeStyles)(destinationStyles)
            : destinationStyles;
        const errors = [];
        subInstructions = subInstructions || new element_instruction_map_1.ElementInstructionMap();
        const result = (0, animation_timeline_builder_1.buildAnimationTimelines)(this._driver, element, this._animationAst, util_1.ENTER_CLASSNAME, util_1.LEAVE_CLASSNAME, start, dest, options, subInstructions, errors);
        if (errors.length) {
            throw (0, error_helpers_1.buildingFailed)(errors);
        }
        return result;
    }
}
exports.Animation = Animation;
