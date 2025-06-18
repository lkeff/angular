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
 * Ensures the two-way binding syntax is correct.
 * Parentheses should be inside the brackets "[()]".
 * Will return diagnostic information when "([])" is found.
 */
class InvalidBananaInBoxCheck extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX;
    }
    visitNode(ctx, component, node) {
        if (!(node instanceof compiler_1.TmplAstBoundEvent))
            return [];
        const name = node.name;
        if (!name.startsWith('[') || !name.endsWith(']'))
            return [];
        const boundSyntax = node.sourceSpan.toString();
        const expectedBoundSyntax = boundSyntax.replace(`(${name})`, `[(${name.slice(1, -1)})]`);
        const diagnostic = ctx.makeTemplateDiagnostic(node.sourceSpan, `In the two-way binding syntax the parentheses should be inside the brackets, ex. '${expectedBoundSyntax}'.
        Find more at https://angular.dev/guide/templates/two-way-binding`);
        return [diagnostic];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.INVALID_BANANA_IN_BOX,
    create: () => new InvalidBananaInBoxCheck(),
};
