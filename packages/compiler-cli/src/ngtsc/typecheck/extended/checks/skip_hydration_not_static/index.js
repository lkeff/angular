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
const NG_SKIP_HYDRATION_ATTR_NAME = 'ngSkipHydration';
/**
 * Ensures that the special attribute `ngSkipHydration` is not a binding and has no other
 * value than `"true"` or an empty value.
 */
class NgSkipHydrationSpec extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC;
    }
    visitNode(ctx, component, node) {
        /** Binding should always error */
        if (node instanceof compiler_1.TmplAstBoundAttribute && node.name === NG_SKIP_HYDRATION_ATTR_NAME) {
            const errorString = `ngSkipHydration should not be used as a binding.`;
            const diagnostic = ctx.makeTemplateDiagnostic(node.sourceSpan, errorString);
            return [diagnostic];
        }
        /** No value, empty string or `"true"` are the only valid values */
        const acceptedValues = ['true', '' /* empty string */];
        if (node instanceof compiler_1.TmplAstTextAttribute &&
            node.name === NG_SKIP_HYDRATION_ATTR_NAME &&
            !acceptedValues.includes(node.value) &&
            node.value !== undefined) {
            const errorString = `ngSkipHydration only accepts "true" or "" as value or no value at all. For example 'ngSkipHydration="true"' or 'ngSkipHydration'`;
            const diagnostic = ctx.makeTemplateDiagnostic(node.sourceSpan, errorString);
            return [diagnostic];
        }
        return [];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.SKIP_HYDRATION_NOT_STATIC,
    create: () => new NgSkipHydrationSpec(),
};
