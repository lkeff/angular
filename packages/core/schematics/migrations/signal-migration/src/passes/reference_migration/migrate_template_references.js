"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateTemplateReferences = migrateTemplateReferences;
const tsurge_1 = require("../../../../../utils/tsurge");
const reference_kinds_1 = require("../reference_resolution/reference_kinds");
/**
 * Phase that migrates Angular template references to
 * unwrap signals.
 */
function migrateTemplateReferences(host, references) {
    const seenFileReferences = new Set();
    for (const reference of references) {
        // This pass only deals with HTML template references.
        if (!(0, reference_kinds_1.isTemplateReference)(reference)) {
            continue;
        }
        // Skip references to incompatible inputs.
        if (!host.shouldMigrateReferencesToField(reference.target)) {
            continue;
        }
        // Skip duplicate references. E.g. if a template is shared.
        const fileReferenceId = `${reference.from.templateFile.id}:${reference.from.read.sourceSpan.end}`;
        if (seenFileReferences.has(fileReferenceId)) {
            continue;
        }
        seenFileReferences.add(fileReferenceId);
        // Expand shorthands like `{bla}` to `{bla: bla()}`.
        const appendText = reference.from.isObjectShorthandExpression
            ? `: ${reference.from.read.name}()`
            : `()`;
        host.replacements.push(new tsurge_1.Replacement(reference.from.templateFile, new tsurge_1.TextUpdate({
            position: reference.from.read.sourceSpan.end,
            end: reference.from.read.sourceSpan.end,
            toInsert: appendText,
        })));
    }
}
