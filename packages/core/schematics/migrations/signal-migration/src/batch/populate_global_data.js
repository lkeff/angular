"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateKnownInputsFromGlobalData = populateKnownInputsFromGlobalData;
function populateKnownInputsFromGlobalData(knownInputs, globalData) {
    // Populate from batch metadata.
    for (const [_key, info] of Object.entries(globalData.knownInputs)) {
        const key = _key;
        // irrelevant for this compilation unit.
        if (!knownInputs.has({ key })) {
            continue;
        }
        const inputMetadata = knownInputs.get({ key });
        if (info.memberIncompatibility !== null) {
            knownInputs.markFieldIncompatible(inputMetadata.descriptor, {
                context: null, // No context serializable.
                reason: info.memberIncompatibility,
            });
        }
        if (info.owningClassIncompatibility !== null) {
            knownInputs.markClassIncompatible(inputMetadata.container.clazz, info.owningClassIncompatibility);
        }
    }
}
