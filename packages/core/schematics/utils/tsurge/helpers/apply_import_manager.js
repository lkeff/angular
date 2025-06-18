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
exports.applyImportManagerChanges = applyImportManagerChanges;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const replacement_1 = require("../replacement");
const project_paths_1 = require("../project_paths");
/**
 * Applies import manager changes, and writes them as replacements the
 * given result array.
 */
function applyImportManagerChanges(importManager, replacements, sourceFiles, info) {
    const { newImports, updatedImports, deletedImports } = importManager.finalize();
    const printer = typescript_1.default.createPrinter({});
    const pathToFile = new Map(sourceFiles.map((s) => [s.fileName, s]));
    // Capture new imports
    newImports.forEach((newImports, fileName) => {
        newImports.forEach((newImport) => {
            const printedImport = printer.printNode(typescript_1.default.EmitHint.Unspecified, newImport, pathToFile.get(fileName));
            replacements.push(new replacement_1.Replacement((0, project_paths_1.projectFile)((0, file_system_1.absoluteFrom)(fileName), info), new replacement_1.TextUpdate({ position: 0, end: 0, toInsert: `${printedImport}\n` })));
        });
    });
    // Capture updated imports
    for (const [oldBindings, newBindings] of updatedImports.entries()) {
        // The import will be generated as multi-line if it already is multi-line,
        // or if the number of elements significantly increased and it previously
        // consisted of very few specifiers.
        const isMultiline = oldBindings.getText().includes('\n') ||
            (newBindings.elements.length >= 6 && oldBindings.elements.length <= 3);
        const hasSpaceBetweenBraces = oldBindings.getText().startsWith('{ ');
        let formatFlags = typescript_1.default.ListFormat.NamedImportsOrExportsElements |
            typescript_1.default.ListFormat.Indented |
            typescript_1.default.ListFormat.Braces |
            typescript_1.default.ListFormat.PreserveLines |
            (isMultiline ? typescript_1.default.ListFormat.MultiLine : typescript_1.default.ListFormat.SingleLine);
        if (hasSpaceBetweenBraces) {
            formatFlags |= typescript_1.default.ListFormat.SpaceBetweenBraces;
        }
        else {
            formatFlags &= ~typescript_1.default.ListFormat.SpaceBetweenBraces;
        }
        const printedBindings = printer.printList(formatFlags, newBindings.elements, oldBindings.getSourceFile());
        replacements.push(new replacement_1.Replacement((0, project_paths_1.projectFile)(oldBindings.getSourceFile(), info), new replacement_1.TextUpdate({
            position: oldBindings.getStart(),
            end: oldBindings.getEnd(),
            // TS uses four spaces as indent. We migrate to two spaces as we
            // assume this to be more common.
            toInsert: printedBindings.replace(/^ {4}/gm, '  '),
        })));
    }
    // Update removed imports
    for (const removedImport of deletedImports) {
        replacements.push(new replacement_1.Replacement((0, project_paths_1.projectFile)(removedImport.getSourceFile(), info), new replacement_1.TextUpdate({
            position: removedImport.getStart(),
            end: removedImport.getEnd(),
            toInsert: '',
        })));
    }
}
