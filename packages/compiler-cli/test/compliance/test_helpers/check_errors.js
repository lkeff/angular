"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = checkErrors;
exports.checkNoUnexpectedErrors = checkNoUnexpectedErrors;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const util_1 = require("util");
function checkErrors(testPath, failureMessage, expectedErrors, actualErrors) {
    for (const expectedError of expectedErrors) {
        if (!actualErrors.some((actualError) => expectedError.message.test(actualError) && expectedError.location.test(actualError))) {
            throw new Error(`When checking expected errors for test case at "${testPath}"\n` +
                failureMessage +
                '\n' +
                `Expected errors: ${(0, util_1.inspect)(expectedErrors)}\n` +
                `Actual errors: ${(0, util_1.inspect)(actualErrors)}.`);
        }
    }
}
function checkNoUnexpectedErrors(testPath, actualErrors) {
    if (actualErrors.length > 0) {
        throw new Error(`Unexpected errors occurred for test case at "${testPath}"\n` +
            `Errors: ${(0, util_1.inspect)(actualErrors)}.`);
    }
}
