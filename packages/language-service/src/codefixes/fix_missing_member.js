"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingMemberMeta = void 0;
const template_target_1 = require("../template_target");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const errorCodes = [
    2551, // https://github.com/microsoft/TypeScript/blob/8e6e87fea6463e153822e88431720f846c3b8dfa/src/compiler/diagnosticMessages.json#L2493
    2339, // https://github.com/microsoft/TypeScript/blob/8e6e87fea6463e153822e88431720f846c3b8dfa/src/compiler/diagnosticMessages.json#L1717
];
/**
 * This code action will fix the missing member of a type. For example, add the missing member to
 * the type or try to get the spelling suggestion for the name from the type.
 */
exports.missingMemberMeta = {
    errorCodes,
    getCodeActions: function ({ typeCheckInfo, start, compiler, formatOptions, preferences, errorCode, tsLs, }) {
        const tcbNodesInfo = typeCheckInfo === null
            ? null
            : (0, template_target_1.getTcbNodesOfTemplateAtPosition)(typeCheckInfo, start, compiler);
        if (tcbNodesInfo === null) {
            return [];
        }
        const codeActions = [];
        const tcb = tcbNodesInfo.componentTcbNode;
        for (const tcbNode of tcbNodesInfo.nodes) {
            const tsLsCodeActions = tsLs.getCodeFixesAtPosition(tcb.getSourceFile().fileName, tcbNode.getStart(), tcbNode.getEnd(), [errorCode], formatOptions, preferences);
            codeActions.push(...tsLsCodeActions);
        }
        return codeActions.map((codeAction) => {
            return {
                fixName: codeAction.fixName,
                fixId: codeAction.fixId,
                fixAllDescription: codeAction.fixAllDescription,
                description: codeAction.description,
                changes: (0, utils_2.convertFileTextChangeInTcb)(codeAction.changes, compiler),
                commands: codeAction.commands,
            };
        });
    },
    fixIds: [utils_2.FixIdForCodeFixesAll.FIX_SPELLING, utils_2.FixIdForCodeFixesAll.FIX_MISSING_MEMBER],
    getAllCodeActions: function ({ tsLs, scope, fixId, formatOptions, preferences, compiler, diagnostics, }) {
        var _a, _b;
        const changes = [];
        const seen = new Set();
        for (const diag of diagnostics) {
            if (!errorCodes.includes(diag.code)) {
                continue;
            }
            const fileName = (_a = diag.file) === null || _a === void 0 ? void 0 : _a.fileName;
            if (fileName === undefined) {
                continue;
            }
            if (diag.start === undefined) {
                continue;
            }
            const declaration = (_b = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, diag.start, compiler)) === null || _b === void 0 ? void 0 : _b.declaration;
            if (declaration === undefined) {
                continue;
            }
            if (seen.has(declaration)) {
                continue;
            }
            seen.add(declaration);
            const tcb = compiler.getTemplateTypeChecker().getTypeCheckBlock(declaration);
            if (tcb === null) {
                continue;
            }
            const combinedCodeActions = tsLs.getCombinedCodeFix({
                type: scope.type,
                fileName: tcb.getSourceFile().fileName,
            }, fixId, formatOptions, preferences);
            changes.push(...combinedCodeActions.changes);
        }
        return {
            changes: (0, utils_2.convertFileTextChangeInTcb)(changes, compiler),
        };
    },
};
