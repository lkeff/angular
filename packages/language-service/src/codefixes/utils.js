"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixIdForCodeFixesAll = void 0;
exports.convertFileTextChangeInTcb = convertFileTextChangeInTcb;
exports.isFixAllAvailable = isFixAllAvailable;
const compiler_cli_1 = require("@angular/compiler-cli");
/**
 * Convert the span of `textChange` in the TCB to the span of the template.
 */
function convertFileTextChangeInTcb(changes, compiler) {
    const ttc = compiler.getTemplateTypeChecker();
    const fileTextChanges = [];
    for (const fileTextChange of changes) {
        if (!ttc.isTrackedTypeCheckFile((0, compiler_cli_1.absoluteFrom)(fileTextChange.fileName))) {
            fileTextChanges.push(fileTextChange);
            continue;
        }
        const textChanges = [];
        let fileName;
        const seenTextChangeInTemplate = new Set();
        for (const textChange of fileTextChange.textChanges) {
            const sourceLocation = ttc.getSourceMappingAtTcbLocation({
                tcbPath: (0, compiler_cli_1.absoluteFrom)(fileTextChange.fileName),
                isShimFile: true,
                positionInFile: textChange.span.start,
            });
            if (sourceLocation === null) {
                continue;
            }
            const mapping = sourceLocation.sourceMapping;
            if (mapping.type === 'external') {
                fileName = mapping.templateUrl;
            }
            else if (mapping.type === 'direct') {
                fileName = mapping.node.getSourceFile().fileName;
            }
            else {
                continue;
            }
            const start = sourceLocation.span.start.offset;
            const length = sourceLocation.span.end.offset - sourceLocation.span.start.offset;
            const changeSpanKey = `${start},${length}`;
            if (seenTextChangeInTemplate.has(changeSpanKey)) {
                continue;
            }
            seenTextChangeInTemplate.add(changeSpanKey);
            textChanges.push({
                newText: textChange.newText,
                span: {
                    start,
                    length,
                },
            });
        }
        if (fileName === undefined) {
            continue;
        }
        fileTextChanges.push({
            fileName,
            isNewFile: fileTextChange.isNewFile,
            textChanges,
        });
    }
    return fileTextChanges;
}
/**
 * 'fix all' is only available when there are multiple diagnostics that the code action meta
 * indicates it can fix.
 */
function isFixAllAvailable(meta, diagnostics) {
    const errorCodes = meta.errorCodes;
    let maybeFixableDiagnostics = 0;
    for (const diag of diagnostics) {
        if (errorCodes.includes(diag.code))
            maybeFixableDiagnostics++;
        if (maybeFixableDiagnostics > 1)
            return true;
    }
    return false;
}
var FixIdForCodeFixesAll;
(function (FixIdForCodeFixesAll) {
    FixIdForCodeFixesAll["FIX_SPELLING"] = "fixSpelling";
    FixIdForCodeFixesAll["FIX_MISSING_MEMBER"] = "fixMissingMember";
    FixIdForCodeFixesAll["FIX_INVALID_BANANA_IN_BOX"] = "fixInvalidBananaInBox";
    FixIdForCodeFixesAll["FIX_MISSING_IMPORT"] = "fixMissingImport";
    FixIdForCodeFixesAll["FIX_UNUSED_STANDALONE_IMPORTS"] = "fixUnusedStandaloneImports";
})(FixIdForCodeFixesAll || (exports.FixIdForCodeFixesAll = FixIdForCodeFixesAll = {}));
