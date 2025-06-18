"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceQueryListFirstAndLastReferences = replaceQueryListFirstAndLastReferences;
const tsurge_1 = require("../../utils/tsurge");
const reference_kinds_1 = require("../signal-migration/src/passes/reference_resolution/reference_kinds");
const property_accesses_1 = require("./property_accesses");
const mapping = new Map([
    ['first', 'at(0)!'],
    ['last', 'at(-1)!'],
]);
function replaceQueryListFirstAndLastReferences(ref, info, globalMetadata, knownQueries, replacements) {
    var _a, _b, _c;
    if (!(0, reference_kinds_1.isHostBindingReference)(ref) && !(0, reference_kinds_1.isTemplateReference)(ref) && !(0, reference_kinds_1.isTsReference)(ref)) {
        return;
    }
    if (knownQueries.isFieldIncompatible(ref.target)) {
        return;
    }
    if (!((_a = globalMetadata.knownQueryFields[ref.target.key]) === null || _a === void 0 ? void 0 : _a.isMulti)) {
        return;
    }
    if ((0, reference_kinds_1.isTsReference)(ref)) {
        const expr = (_b = (0, property_accesses_1.checkTsReferenceAccessesField)(ref, 'first')) !== null && _b !== void 0 ? _b : (0, property_accesses_1.checkTsReferenceAccessesField)(ref, 'last');
        if (expr === null) {
            return;
        }
        replacements.push(new tsurge_1.Replacement((0, tsurge_1.projectFile)(expr.getSourceFile(), info), new tsurge_1.TextUpdate({
            position: expr.name.getStart(),
            end: expr.name.getEnd(),
            toInsert: mapping.get(expr.name.text),
        })));
        return;
    }
    // Template and host binding references.
    const expr = (_c = (0, property_accesses_1.checkNonTsReferenceAccessesField)(ref, 'first')) !== null && _c !== void 0 ? _c : (0, property_accesses_1.checkNonTsReferenceAccessesField)(ref, 'last');
    if (expr === null) {
        return;
    }
    const file = (0, reference_kinds_1.isHostBindingReference)(ref) ? ref.from.file : ref.from.templateFile;
    const offset = (0, reference_kinds_1.isHostBindingReference)(ref) ? ref.from.hostPropertyNode.getStart() + 1 : 0;
    replacements.push(new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
        position: offset + expr.nameSpan.start,
        end: offset + expr.nameSpan.end,
        toInsert: mapping.get(expr.name),
    })));
}
