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
 * Ensures that all `@let` declarations in a template are used.
 */
class UnusedLetDeclarationCheck extends api_1.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.UNUSED_LET_DECLARATION;
        this.analysis = new Map();
    }
    run(ctx, component, template) {
        super.run(ctx, component, template);
        const diagnostics = [];
        const { allLetDeclarations, usedLetDeclarations } = this.getAnalysis(component);
        for (const decl of allLetDeclarations) {
            if (!usedLetDeclarations.has(decl)) {
                diagnostics.push(ctx.makeTemplateDiagnostic(decl.sourceSpan, `@let ${decl.name} is declared but its value is never read.`));
            }
        }
        this.analysis.clear();
        return diagnostics;
    }
    visitNode(ctx, component, node) {
        if (node instanceof compiler_1.TmplAstLetDeclaration) {
            this.getAnalysis(component).allLetDeclarations.add(node);
        }
        else if (node instanceof compiler_1.AST) {
            const unwrappedNode = node instanceof compiler_1.ASTWithSource ? node.ast : node;
            const target = ctx.templateTypeChecker.getExpressionTarget(unwrappedNode, component);
            if (target !== null && target instanceof compiler_1.TmplAstLetDeclaration) {
                this.getAnalysis(component).usedLetDeclarations.add(target);
            }
        }
        return [];
    }
    getAnalysis(node) {
        if (!this.analysis.has(node)) {
            this.analysis.set(node, { allLetDeclarations: new Set(), usedLetDeclarations: new Set() });
        }
        return this.analysis.get(node);
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.UNUSED_LET_DECLARATION,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.UNUSED_LET_DECLARATION,
    create: () => new UnusedLetDeclarationCheck(),
};
