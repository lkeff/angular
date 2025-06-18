"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInheritanceOfKnownFields = checkInheritanceOfKnownFields;
const imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const class_member_names_1 = require("../../utils/class_member_names");
/**
 * Phase that propagates incompatibilities to derived classes or
 * base classes. For example, consider:
 *
 * ```ts
 * class Base {
 *   bla = true;
 * }
 *
 * class Derived extends Base {
 *   @Input() bla = false;
 * }
 * ```
 *
 * Whenever we migrate `Derived`, the inheritance would fail
 * and result in a build breakage because `Base#bla` is not an Angular input.
 *
 * The logic here detects such cases and marks `bla` as incompatible. If `Derived`
 * would then have other derived classes as well, it would propagate the status.
 */
function checkInheritanceOfKnownFields(inheritanceGraph, metaRegistry, fields, opts) {
    const allInputClasses = Array.from(inheritanceGraph.allClassesInInheritance).filter((t) => typescript_1.default.isClassDeclaration(t) && opts.isClassWithKnownFields(t));
    for (const inputClass of allInputClasses) {
        // Note: Class parents of `inputClass` were already checked by
        // the previous iterations (given the reverse topological sort)—
        // hence it's safe to assume that incompatibility of parent classes will
        // not change again, at a later time.
        (0, assert_1.default)(typescript_1.default.isClassDeclaration(inputClass), 'Expected input graph node to be always a class.');
        const classFields = opts.getFieldsForClass(inputClass);
        const inputFieldNamesFromMetadataArray = new Set();
        // Iterate through derived class chains and determine all inputs that are overridden
        // via class metadata fields. e.g `@Component#inputs`. This is later used to mark a
        // potential similar class input as incompatible— because those cannot be migrated.
        if (metaRegistry !== null) {
            for (const derivedClasses of inheritanceGraph.traceDerivedClasses(inputClass)) {
                const derivedMeta = typescript_1.default.isClassDeclaration(derivedClasses) && derivedClasses.name !== undefined
                    ? metaRegistry.getDirectiveMetadata(new imports_1.Reference(derivedClasses))
                    : null;
                if (derivedMeta !== null && derivedMeta.inputFieldNamesFromMetadataArray !== null) {
                    derivedMeta.inputFieldNamesFromMetadataArray.forEach((b) => inputFieldNamesFromMetadataArray.add(b));
                }
            }
        }
        // Check inheritance of every input in the given "directive class".
        inputCheck: for (const fieldDescr of classFields) {
            const inputNode = fieldDescr.node;
            const { derivedMembers, inherited } = inheritanceGraph.checkOverlappingMembers(inputClass, inputNode, (0, class_member_names_1.getMemberName)(inputNode));
            // If we discover a derived, input re-declared via class metadata, then it
            // will cause conflicts as we cannot migrate it/ nor mark it as signal-based.
            if (fieldDescr.node.name !== undefined &&
                (typescript_1.default.isIdentifier(fieldDescr.node.name) || typescript_1.default.isStringLiteralLike(fieldDescr.node.name)) &&
                inputFieldNamesFromMetadataArray.has(fieldDescr.node.name.text)) {
                fields.captureUnknownDerivedField(fieldDescr);
            }
            for (const derived of derivedMembers) {
                const derivedInput = fields.attemptRetrieveDescriptorFromSymbol(derived);
                if (derivedInput !== null) {
                    // Note: We always track dependencies from the child to the parent,
                    // so skip here for now.
                    continue;
                }
                // If we discover a derived, non-input member, then it will cause
                // conflicts, and we mark the current input as incompatible.
                fields.captureUnknownDerivedField(fieldDescr);
                continue inputCheck;
            }
            // If there is no parent, we are done. Otherwise, check the parent
            // to either inherit or check the incompatibility with the inheritance.
            if (inherited === undefined) {
                continue;
            }
            const inheritedMemberInput = fields.attemptRetrieveDescriptorFromSymbol(inherited);
            // Parent is not an input, and hence will conflict..
            if (inheritedMemberInput === null) {
                fields.captureUnknownParentField(fieldDescr);
                continue;
            }
            fields.captureKnownFieldInheritanceRelationship(fieldDescr, inheritedMemberInput);
        }
    }
}
