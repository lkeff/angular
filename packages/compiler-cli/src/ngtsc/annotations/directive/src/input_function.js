"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INPUT_INITIALIZER_FN = void 0;
exports.tryParseSignalInputMapping = tryParseSignalInputMapping;
const reflection_1 = require("../../../reflection");
const initializer_function_access_1 = require("./initializer_function_access");
const initializer_functions_1 = require("./initializer_functions");
const input_output_parse_options_1 = require("./input_output_parse_options");
/** Represents a function that can declare an input. */
exports.INPUT_INITIALIZER_FN = {
    functionName: 'input',
    owningModule: '@angular/core',
    // Inputs are accessed from parents, via the `property` instruction.
    // Conceptually, the fields need to be publicly readable, but in practice,
    // accessing `protected` or `private` members works at runtime, so we can allow
    // cases where the input is intentionally not part of the public API, programmatically.
    // Note: `private` is omitted intentionally as this would be a conceptual confusion point.
    allowedAccessLevels: [
        reflection_1.ClassMemberAccessLevel.PublicWritable,
        reflection_1.ClassMemberAccessLevel.PublicReadonly,
        reflection_1.ClassMemberAccessLevel.Protected,
    ],
};
/**
 * Attempts to parse a signal input class member. Returns the parsed
 * input mapping if possible.
 */
function tryParseSignalInputMapping(member, reflector, importTracker) {
    var _a;
    if (member.value === null) {
        return null;
    }
    const signalInput = (0, initializer_functions_1.tryParseInitializerApi)([exports.INPUT_INITIALIZER_FN], member.value, reflector, importTracker);
    if (signalInput === null) {
        return null;
    }
    (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(signalInput, member);
    const optionsNode = (signalInput.isRequired ? signalInput.call.arguments[0] : signalInput.call.arguments[1]);
    const options = optionsNode !== undefined ? (0, input_output_parse_options_1.parseAndValidateInputAndOutputOptions)(optionsNode) : null;
    const classPropertyName = member.name;
    return {
        isSignal: true,
        classPropertyName,
        bindingPropertyName: (_a = options === null || options === void 0 ? void 0 : options.alias) !== null && _a !== void 0 ? _a : classPropertyName,
        required: signalInput.isRequired,
        // Signal inputs do not capture complex transform metadata.
        // See more details in the `transform` type of `InputMapping`.
        transform: null,
    };
}
