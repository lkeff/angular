"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUTPUT_INITIALIZER_FNS = void 0;
exports.tryParseInitializerBasedOutput = tryParseInitializerBasedOutput;
const diagnostics_1 = require("../../../diagnostics");
const reflection_1 = require("../../../reflection");
const initializer_function_access_1 = require("./initializer_function_access");
const initializer_functions_1 = require("./initializer_functions");
const input_output_parse_options_1 = require("./input_output_parse_options");
// Outputs are accessed from parents, via the `listener` instruction.
// Conceptually, the fields need to be publicly readable, but in practice,
// accessing `protected` or `private` members works at runtime, so we can allow
// such outputs that may not want to expose the `OutputRef` as part of the
// component API, programmatically.
// Note: `private` is omitted intentionally as this would be a conceptual confusion point.
const allowedAccessLevels = [
    reflection_1.ClassMemberAccessLevel.PublicWritable,
    reflection_1.ClassMemberAccessLevel.PublicReadonly,
    reflection_1.ClassMemberAccessLevel.Protected,
];
/** Possible functions that can declare an output. */
exports.OUTPUT_INITIALIZER_FNS = [
    {
        functionName: 'output',
        owningModule: '@angular/core',
        allowedAccessLevels,
    },
    {
        functionName: 'outputFromObservable',
        owningModule: '@angular/core/rxjs-interop',
        allowedAccessLevels,
    },
];
/**
 * Attempts to parse a signal output class member. Returns the parsed
 * input mapping if possible.
 */
function tryParseInitializerBasedOutput(member, reflector, importTracker) {
    var _a;
    if (member.value === null) {
        return null;
    }
    const output = (0, initializer_functions_1.tryParseInitializerApi)(exports.OUTPUT_INITIALIZER_FNS, member.value, reflector, importTracker);
    if (output === null) {
        return null;
    }
    if (output.isRequired) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.INITIALIZER_API_NO_REQUIRED_FUNCTION, output.call, `Output does not support ".required()".`);
    }
    (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(output, member);
    // Options are the first parameter for `output()`, while for
    // the interop `outputFromObservable()` they are the second argument.
    const optionsNode = (output.api.functionName === 'output' ? output.call.arguments[0] : output.call.arguments[1]);
    const options = optionsNode !== undefined ? (0, input_output_parse_options_1.parseAndValidateInputAndOutputOptions)(optionsNode) : null;
    const classPropertyName = member.name;
    return {
        call: output.call,
        metadata: {
            // Outputs are not signal-based.
            isSignal: false,
            classPropertyName,
            bindingPropertyName: (_a = options === null || options === void 0 ? void 0 : options.alias) !== null && _a !== void 0 ? _a : classPropertyName,
        },
    };
}
