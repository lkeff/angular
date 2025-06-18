"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterIncompatibilitiesForBestEffortMode = filterIncompatibilitiesForBestEffortMode;
const incompatibility_1 = require("./passes/problematic_patterns/incompatibility");
/** Filters ignorable input incompatibilities when best effort mode is enabled. */
function filterIncompatibilitiesForBestEffortMode(knownInputs) {
    knownInputs.knownInputIds.forEach(({ container: c }) => {
        // All class incompatibilities are "filterable" right now.
        c.incompatible = null;
        for (const [key, i] of c.memberIncompatibility.entries()) {
            if (!incompatibility_1.nonIgnorableFieldIncompatibilities.includes(i.reason)) {
                c.memberIncompatibility.delete(key);
            }
        }
    });
}
