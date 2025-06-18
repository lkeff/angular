"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.markFieldIncompatibleInMetadata = markFieldIncompatibleInMetadata;
exports.filterBestEffortIncompatibilities = filterBestEffortIncompatibilities;
const incompatibility_1 = require("../signal-migration/src/passes/problematic_patterns/incompatibility");
function markFieldIncompatibleInMetadata(data, id, reason) {
    const existing = data[id];
    if (existing === undefined) {
        data[id] = {
            fieldReason: reason,
            classReason: null,
        };
    }
    else if (existing.fieldReason === null) {
        existing.fieldReason = reason;
    }
    else {
        existing.fieldReason = (0, incompatibility_1.pickFieldIncompatibility)({ reason, context: null }, { reason: existing.fieldReason, context: null }).reason;
    }
}
function filterBestEffortIncompatibilities(knownQueries) {
    for (const query of Object.values(knownQueries.globalMetadata.problematicQueries)) {
        if (query.fieldReason !== null &&
            !incompatibility_1.nonIgnorableFieldIncompatibilities.includes(query.fieldReason)) {
            query.fieldReason = null;
        }
    }
}
