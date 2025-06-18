"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassIncompatibilityReason = exports.nonIgnorableFieldIncompatibilities = exports.FieldIncompatibilityReason = void 0;
exports.isFieldIncompatibility = isFieldIncompatibility;
exports.pickFieldIncompatibility = pickFieldIncompatibility;
/**
 * Reasons why a field cannot be migrated.
 *
 * Higher values of incompatibility reasons indicate a more significant
 * incompatibility reason. Lower ones may be overridden by higher ones.
 * */
var FieldIncompatibilityReason;
(function (FieldIncompatibilityReason) {
    FieldIncompatibilityReason[FieldIncompatibilityReason["OverriddenByDerivedClass"] = 1] = "OverriddenByDerivedClass";
    FieldIncompatibilityReason[FieldIncompatibilityReason["RedeclaredViaDerivedClassInputsArray"] = 2] = "RedeclaredViaDerivedClassInputsArray";
    FieldIncompatibilityReason[FieldIncompatibilityReason["TypeConflictWithBaseClass"] = 3] = "TypeConflictWithBaseClass";
    FieldIncompatibilityReason[FieldIncompatibilityReason["ParentIsIncompatible"] = 4] = "ParentIsIncompatible";
    FieldIncompatibilityReason[FieldIncompatibilityReason["DerivedIsIncompatible"] = 5] = "DerivedIsIncompatible";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SpyOnThatOverwritesField"] = 6] = "SpyOnThatOverwritesField";
    FieldIncompatibilityReason[FieldIncompatibilityReason["PotentiallyNarrowedInTemplateButNoSupportYet"] = 7] = "PotentiallyNarrowedInTemplateButNoSupportYet";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SignalIncompatibleWithHostBinding"] = 8] = "SignalIncompatibleWithHostBinding";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SignalInput__RequiredButNoGoodExplicitTypeExtractable"] = 9] = "SignalInput__RequiredButNoGoodExplicitTypeExtractable";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SignalInput__QuestionMarkButNoGoodExplicitTypeExtractable"] = 10] = "SignalInput__QuestionMarkButNoGoodExplicitTypeExtractable";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SignalQueries__QueryListProblematicFieldAccessed"] = 11] = "SignalQueries__QueryListProblematicFieldAccessed";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SignalQueries__IncompatibleMultiUnionType"] = 12] = "SignalQueries__IncompatibleMultiUnionType";
    FieldIncompatibilityReason[FieldIncompatibilityReason["WriteAssignment"] = 13] = "WriteAssignment";
    FieldIncompatibilityReason[FieldIncompatibilityReason["Accessor"] = 14] = "Accessor";
    FieldIncompatibilityReason[FieldIncompatibilityReason["OutsideOfMigrationScope"] = 15] = "OutsideOfMigrationScope";
    FieldIncompatibilityReason[FieldIncompatibilityReason["SkippedViaConfigFilter"] = 16] = "SkippedViaConfigFilter";
})(FieldIncompatibilityReason || (exports.FieldIncompatibilityReason = FieldIncompatibilityReason = {}));
/** Field reasons that cannot be ignored. */
exports.nonIgnorableFieldIncompatibilities = [
    // Outside of scope fields should not be migrated. E.g. references to inputs in `node_modules/`.
    FieldIncompatibilityReason.OutsideOfMigrationScope,
    // Explicitly filtered fields cannot be skipped via best effort mode.
    FieldIncompatibilityReason.SkippedViaConfigFilter,
    // There is no good output for accessor fields.
    FieldIncompatibilityReason.Accessor,
    // There is no good output for such inputs. We can't perform "conversion".
    FieldIncompatibilityReason.SignalInput__RequiredButNoGoodExplicitTypeExtractable,
    FieldIncompatibilityReason.SignalInput__QuestionMarkButNoGoodExplicitTypeExtractable,
];
/** Reasons why a whole class and its fields cannot be migrated. */
var ClassIncompatibilityReason;
(function (ClassIncompatibilityReason) {
    ClassIncompatibilityReason[ClassIncompatibilityReason["ClassManuallyInstantiated"] = 0] = "ClassManuallyInstantiated";
    ClassIncompatibilityReason[ClassIncompatibilityReason["OwningClassReferencedInClassProperty"] = 1] = "OwningClassReferencedInClassProperty";
})(ClassIncompatibilityReason || (exports.ClassIncompatibilityReason = ClassIncompatibilityReason = {}));
/** Whether the given value refers to an field incompatibility. */
function isFieldIncompatibility(value) {
    return (value.reason !== undefined &&
        value.context !== undefined &&
        FieldIncompatibilityReason.hasOwnProperty(value.reason));
}
/** Picks the more significant field compatibility. */
function pickFieldIncompatibility(a, b) {
    if (b === null) {
        return a;
    }
    if (a.reason < b.reason) {
        return b;
    }
    return a;
}
