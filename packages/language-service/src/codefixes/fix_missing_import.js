"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingImportMeta = void 0;
const compiler_1 = require("@angular/compiler");
const index_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics/index");
const template_target_1 = require("../template_target");
const ts_utils_1 = require("../utils/ts_utils");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const errorCodes = [
    (0, index_1.ngErrorCode)(index_1.ErrorCode.SCHEMA_INVALID_ELEMENT),
    (0, index_1.ngErrorCode)(index_1.ErrorCode.MISSING_PIPE),
];
/**
 * This code action will generate a new import for an unknown selector.
 */
exports.missingImportMeta = {
    errorCodes,
    getCodeActions,
    fixIds: [utils_2.FixIdForCodeFixesAll.FIX_MISSING_IMPORT],
    // TODO(dylhunn): implement "Fix All"
    getAllCodeActions: ({ tsLs, scope, fixId, formatOptions, preferences, compiler, diagnostics }) => {
        return {
            changes: [],
        };
    },
};
function getCodeActions({ typeCheckInfo, start, compiler }) {
    var _a;
    if (typeCheckInfo === null) {
        return [];
    }
    let codeActions = [];
    const checker = compiler.getTemplateTypeChecker();
    const target = (0, template_target_1.getTargetAtPosition)(typeCheckInfo.nodes, start);
    if (target === null) {
        return [];
    }
    let matches;
    if (target.context.kind === template_target_1.TargetNodeKind.ElementInTagContext &&
        target.context.node instanceof compiler_1.TmplAstElement) {
        const allPossibleDirectives = checker.getPotentialTemplateDirectives(typeCheckInfo.declaration);
        matches = (0, utils_1.getDirectiveMatchesForElementTag)(target.context.node, allPossibleDirectives);
    }
    else if (target.context.kind === template_target_1.TargetNodeKind.RawExpression &&
        target.context.node instanceof compiler_1.ASTWithName) {
        const name = target.context.node.name;
        const allPossiblePipes = checker.getPotentialPipes(typeCheckInfo.declaration);
        matches = new Set(allPossiblePipes.filter((p) => p.name === name));
    }
    else {
        return [];
    }
    // Find all possible importable directives with a matching selector.
    const importOn = (0, ts_utils_1.standaloneTraitOrNgModule)(checker, typeCheckInfo.declaration);
    if (importOn === null) {
        return [];
    }
    for (const currMatch of matches.values()) {
        const currentMatchCodeAction = (_a = (0, ts_utils_1.getCodeActionToImportTheDirectiveDeclaration)(compiler, importOn, currMatch)) !== null && _a !== void 0 ? _a : [];
        codeActions.push(...currentMatchCodeAction.map((action) => {
            return Object.assign({ fixName: utils_2.FixIdForCodeFixesAll.FIX_MISSING_IMPORT }, action);
        }));
    }
    return codeActions;
}
