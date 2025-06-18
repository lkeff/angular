"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass3__checkIncompatiblePatterns = pass3__checkIncompatiblePatterns;
const common_incompatible_patterns_1 = require("./problematic_patterns/common_incompatible_patterns");
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const incompatibility_1 = require("./problematic_patterns/incompatibility");
/**
 * Phase where problematic patterns are detected and advise
 * the migration to skip certain inputs.
 *
 * For example, detects classes that are instantiated manually. Those
 * cannot be migrated as `input()` requires an injection context.
 *
 * In addition, spying onto an input may be problematic- so we skip migrating
 * such.
 */
function pass3__checkIncompatiblePatterns(host, inheritanceGraph, checker, groupedTsAstVisitor, knownInputs) {
    (0, common_incompatible_patterns_1.checkIncompatiblePatterns)(inheritanceGraph, checker, groupedTsAstVisitor, knownInputs, () => knownInputs.getAllInputContainingClasses());
    for (const input of knownInputs.knownInputIds.values()) {
        const hostBindingDecorators = (0, annotations_1.getAngularDecorators)(input.metadata.fieldDecorators, ['HostBinding'], host.isMigratingCore);
        if (hostBindingDecorators.length > 0) {
            knownInputs.markFieldIncompatible(input.descriptor, {
                context: hostBindingDecorators[0].node,
                reason: incompatibility_1.FieldIncompatibilityReason.SignalIncompatibleWithHostBinding,
            });
        }
    }
}
