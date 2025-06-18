"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForIncompatibleQueryListAccesses = checkForIncompatibleQueryListAccesses;
const reference_kinds_1 = require("../signal-migration/src/passes/reference_resolution/reference_kinds");
const property_accesses_1 = require("./property_accesses");
const problematicQueryListMethods = [
    'dirty',
    'changes',
    'setDirty',
    'reset',
    'notifyOnChanges',
    'destroy',
];
function checkForIncompatibleQueryListAccesses(ref, result) {
    if ((0, reference_kinds_1.isTsReference)(ref)) {
        for (const problematicFn of problematicQueryListMethods) {
            const access = (0, property_accesses_1.checkTsReferenceAccessesField)(ref, problematicFn);
            if (access !== null) {
                result.potentialProblematicReferenceForMultiQueries[ref.target.key] = true;
                return;
            }
        }
    }
    if ((0, reference_kinds_1.isHostBindingReference)(ref) || (0, reference_kinds_1.isTemplateReference)(ref)) {
        for (const problematicFn of problematicQueryListMethods) {
            const access = (0, property_accesses_1.checkNonTsReferenceAccessesField)(ref, problematicFn);
            if (access !== null) {
                result.potentialProblematicReferenceForMultiQueries[ref.target.key] = true;
                return;
            }
        }
    }
}
