"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_INITIALIZER_FN = void 0;
exports.tryParseSignalModelMapping = tryParseSignalModelMapping;
const reflection_1 = require("../../../reflection");
const initializer_function_access_1 = require("./initializer_function_access");
const initializer_functions_1 = require("./initializer_functions");
const input_output_parse_options_1 = require("./input_output_parse_options");
/** Represents a function that can declare a model. */
exports.MODEL_INITIALIZER_FN = {
    functionName: 'model',
    owningModule: '@angular/core',
    // Inputs are accessed from parents, via the `property` instruction.
    // Conceptually, the fields need to be publicly readable, but in practice,
    // accessing `protected` or `private` members works at runtime, so we can allow
    // cases where the input is intentionally not part of the public API, programmatically.
    allowedAccessLevels: [
        reflection_1.ClassMemberAccessLevel.PublicWritable,
        reflection_1.ClassMemberAccessLevel.PublicReadonly,
        reflection_1.ClassMemberAccessLevel.Protected,
    ],
};
/**
 * Attempts to parse a model class member. Returns the parsed model mapping if possible.
 */
function tryParseSignalModelMapping(member, reflector, importTracker) {
    var _a;
    if (member.value === null) {
        return null;
    }
    const model = (0, initializer_functions_1.tryParseInitializerApi)([exports.MODEL_INITIALIZER_FN], member.value, reflector, importTracker);
    if (model === null) {
        return null;
    }
    (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(model, member);
    const optionsNode = (model.isRequired ? model.call.arguments[0] : model.call.arguments[1]);
    const options = optionsNode !== undefined ? (0, input_output_parse_options_1.parseAndValidateInputAndOutputOptions)(optionsNode) : null;
    const classPropertyName = member.name;
    const bindingPropertyName = (_a = options === null || options === void 0 ? void 0 : options.alias) !== null && _a !== void 0 ? _a : classPropertyName;
    return {
        call: model.call,
        input: {
            isSignal: true,
            transform: null,
            classPropertyName,
            bindingPropertyName,
            required: model.isRequired,
        },
        output: {
            isSignal: false,
            classPropertyName,
            bindingPropertyName: bindingPropertyName + 'Change',
        },
    };
}
