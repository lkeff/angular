"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixInvalidBananaInBoxMeta = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const template_target_1 = require("../template_target");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
/**
 * fix [invalid banana-in-box](https://angular.io/extended-diagnostics/NG8101)
 */
exports.fixInvalidBananaInBoxMeta = {
    errorCodes: [(0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX)],
    getCodeActions({ start, fileName, typeCheckInfo }) {
        const boundEvent = typeCheckInfo === null ? null : getTheBoundEventAtPosition(typeCheckInfo, start);
        if (boundEvent === null) {
            return [];
        }
        const textChanges = convertBoundEventToTsTextChange(boundEvent);
        return [
            {
                fixName: utils_2.FixIdForCodeFixesAll.FIX_INVALID_BANANA_IN_BOX,
                fixId: utils_2.FixIdForCodeFixesAll.FIX_INVALID_BANANA_IN_BOX,
                fixAllDescription: 'fix all invalid banana-in-box',
                description: `fix invalid banana-in-box for '${boundEvent.sourceSpan.toString()}'`,
                changes: [
                    {
                        fileName,
                        textChanges,
                    },
                ],
            },
        ];
    },
    fixIds: [utils_2.FixIdForCodeFixesAll.FIX_INVALID_BANANA_IN_BOX],
    getAllCodeActions({ diagnostics, compiler }) {
        var _a;
        const fileNameToTextChangesMap = new Map();
        for (const diag of diagnostics) {
            const fileName = (_a = diag.file) === null || _a === void 0 ? void 0 : _a.fileName;
            if (fileName === undefined) {
                continue;
            }
            const start = diag.start;
            if (start === undefined) {
                continue;
            }
            const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, start, compiler);
            if (typeCheckInfo === undefined) {
                continue;
            }
            /**
             * This diagnostic has detected a likely mistake that puts the square brackets inside the
             * parens (the BoundEvent `([thing])`) when it should be the other way around `[(thing)]` so
             * this function is trying to find the bound event in order to flip the syntax.
             */
            const boundEvent = getTheBoundEventAtPosition(typeCheckInfo, start);
            if (boundEvent === null) {
                continue;
            }
            if (!fileNameToTextChangesMap.has(fileName)) {
                fileNameToTextChangesMap.set(fileName, []);
            }
            const fileTextChanges = fileNameToTextChangesMap.get(fileName);
            const textChanges = convertBoundEventToTsTextChange(boundEvent);
            fileTextChanges.push(...textChanges);
        }
        const fileTextChanges = [];
        for (const [fileName, textChanges] of fileNameToTextChangesMap) {
            fileTextChanges.push({
                fileName,
                textChanges,
            });
        }
        return {
            changes: fileTextChanges,
        };
    },
};
function getTheBoundEventAtPosition(typeCheckInfo, start) {
    // It's safe to get the bound event at the position `start + 1` because the `start` is at the
    // start of the diagnostic, and the node outside the attribute key and value spans are skipped by
    // the function `getTargetAtPosition`.
    // https://github.com/angular/vscode-ng-language-service/blob/8553115972ca40a55602747667c3d11d6f47a6f8/server/src/session.ts#L220
    // https://github.com/angular/angular/blob/4e10a7494130b9bb4772ee8f76b66675867b2145/packages/language-service/src/template_target.ts#L347-L356
    const positionDetail = (0, template_target_1.getTargetAtPosition)(typeCheckInfo.nodes, start + 1);
    if (positionDetail === null) {
        return null;
    }
    if (positionDetail.context.kind !== template_target_1.TargetNodeKind.AttributeInKeyContext ||
        !(positionDetail.context.node instanceof compiler_1.TmplAstBoundEvent)) {
        return null;
    }
    return positionDetail.context.node;
}
/**
 * Flip the invalid "box in a banana" `([thing])` to the correct "banana in a box" `[(thing)]`.
 */
function convertBoundEventToTsTextChange(node) {
    const name = node.name;
    const boundSyntax = node.sourceSpan.toString();
    const expectedBoundSyntax = boundSyntax.replace(`(${name})`, `[(${name.slice(1, -1)})]`);
    return [
        {
            span: {
                start: node.sourceSpan.start.offset,
                length: boundSyntax.length,
            },
            newText: expectedBoundSyntax,
        },
    ];
}
