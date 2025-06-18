"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../../diagnostics");
const api_1 = require("../../api");
/**
 * Ensures a user doesn't forget to omit `let` when using ngfor.
 * Will return diagnostic information when `let` is missing.
 */
class MissingNgForOfLetCheck extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.MISSING_NGFOROF_LET;
    }
    visitNode(ctx, component, node) {
        const isTemplate = node instanceof compiler_1.TmplAstTemplate;
        if (!(node instanceof compiler_1.TmplAstTemplate)) {
            return [];
        }
        if (node.templateAttrs.length === 0) {
            return [];
        }
        const attr = node.templateAttrs.find((x) => x.name === 'ngFor');
        if (attr === undefined) {
            return [];
        }
        if (node.variables.length > 0) {
            return [];
        }
        const errorString = 'Your ngFor is missing a value. Did you forget to add the `let` keyword?';
        const diagnostic = ctx.makeTemplateDiagnostic(attr.sourceSpan, errorString);
        return [diagnostic];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.MISSING_NGFOROF_LET,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.MISSING_NGFOROF_LET,
    create: () => new MissingNgForOfLetCheck(),
};
