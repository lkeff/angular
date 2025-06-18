"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQueryListToArrayCall = removeQueryListToArrayCall;
const tsurge_1 = require("../../utils/tsurge");
const reference_kinds_1 = require("../signal-migration/src/passes/reference_resolution/reference_kinds");
const property_accesses_1 = require("./property_accesses");
function removeQueryListToArrayCall(ref, info, globalMetadata, knownQueries, replacements) {
    var _a;
    if (!(0, reference_kinds_1.isHostBindingReference)(ref) && !(0, reference_kinds_1.isTemplateReference)(ref) && !(0, reference_kinds_1.isTsReference)(ref)) {
        return;
    }
    if (knownQueries.isFieldIncompatible(ref.target)) {
        return;
    }
    if (!((_a = globalMetadata.knownQueryFields[ref.target.key]) === null || _a === void 0 ? void 0 : _a.isMulti)) {
        return;
    }
    // TS references.
    if ((0, reference_kinds_1.isTsReference)(ref)) {
        const toArrayCallExpr = (0, property_accesses_1.checkTsReferenceCallsField)(ref, 'toArray');
        if (toArrayCallExpr === null) {
            return;
        }
        const toArrayExpr = toArrayCallExpr.expression;
        replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(toArrayExpr.getSourceFile(), info), new tsurge_1.TextUpdate({
            // Delete from expression end to call end. E.g. `.toArray(<..>)`.
            position: toArrayExpr.expression.getEnd(),
            end: toArrayCallExpr.getEnd(),
            toInsert: '',
        })));
        return;
    }
    // Template and host binding references.
    const callExpr = (0, property_accesses_1.checkNonTsReferenceCallsField)(ref, 'toArray');
    if (callExpr === null) {
        return;
    }
    const file = (0, reference_kinds_1.isHostBindingReference)(ref) ? ref.from.file : ref.from.templateFile;
    const offset = (0, reference_kinds_1.isHostBindingReference)(ref) ? ref.from.hostPropertyNode.getStart() + 1 : 0;
    replacements.push(new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
        // Delete from expression end to call end. E.g. `.toArray(<..>)`.
        position: offset + callExpr.receiver.receiver.sourceSpan.end,
        end: offset + callExpr.sourceSpan.end,
        toInsert: '',
    })));
}
