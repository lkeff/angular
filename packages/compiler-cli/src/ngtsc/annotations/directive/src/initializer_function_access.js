"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessOfInitializerApiMember = validateAccessOfInitializerApiMember;
const diagnostics_1 = require("../../../diagnostics");
const util_1 = require("../../../reflection/src/util");
/**
 * Validates that the initializer member is compatible with the given class
 * member in terms of field access and visibility.
 *
 * @throws {FatalDiagnosticError} If the recognized initializer API is
 *   incompatible.
 */
function validateAccessOfInitializerApiMember({ api, call }, member) {
    if (!api.allowedAccessLevels.includes(member.accessLevel)) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY, call, (0, diagnostics_1.makeDiagnosticChain)(`Cannot use "${api.functionName}" on a class member that is declared as ${(0, util_1.classMemberAccessLevelToString)(member.accessLevel)}.`, [
            (0, diagnostics_1.makeDiagnosticChain)(`Update the class field to be either: ` +
                api.allowedAccessLevels.map((l) => (0, util_1.classMemberAccessLevelToString)(l)).join(', ')),
        ]));
    }
}
