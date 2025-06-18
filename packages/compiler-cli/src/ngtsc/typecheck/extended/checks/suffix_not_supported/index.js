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
const STYLE_SUFFIXES = ['px', '%', 'em'];
/**
 * A check which detects when the `.px`, `.%`, and `.em` suffixes are used with an attribute
 * binding. These suffixes are only available for style bindings.
 */
class SuffixNotSupportedCheck extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.SUFFIX_NOT_SUPPORTED;
    }
    visitNode(ctx, component, node) {
        if (!(node instanceof compiler_1.TmplAstBoundAttribute))
            return [];
        if (!node.keySpan.toString().startsWith('attr.') ||
            !STYLE_SUFFIXES.some((suffix) => node.name.endsWith(`.${suffix}`))) {
            return [];
        }
        const diagnostic = ctx.makeTemplateDiagnostic(node.keySpan, `The ${STYLE_SUFFIXES.map((suffix) => `'.${suffix}'`).join(', ')} suffixes are only supported on style bindings.`);
        return [diagnostic];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.SUFFIX_NOT_SUPPORTED,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.SUFFIX_NOT_SUPPORTED,
    create: () => new SuffixNotSupportedCheck(),
};
