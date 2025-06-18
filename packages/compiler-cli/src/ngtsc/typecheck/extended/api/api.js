"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCheckWithVisitor = void 0;
const compiler_1 = require("@angular/compiler");
/**
 * This abstract class provides a base implementation for the run method.
 */
class TemplateCheckWithVisitor {
    constructor() {
        /**
         * When extended diagnostics were first introduced, the visitor wasn't implemented correctly
         * which meant that it wasn't visiting the `templateAttrs` of structural directives (e.g.
         * the expression of `*ngIf`). Fixing the issue causes a lot of internal breakages and will likely
         * need to be done in a major version to avoid external breakages. This flag is used to opt out
         * pre-existing diagnostics from the correct behavior until the breakages have been fixed while
         * ensuring that newly-written diagnostics are correct from the beginning.
         * TODO(crisbeto): remove this flag and fix the internal brekages.
         */
        this.canVisitStructuralAttributes = true;
    }
    /**
     * Base implementation for run function, visits all nodes in template and calls
     * `visitNode()` for each one.
     */
    run(ctx, component, template) {
        const visitor = new TemplateVisitor(ctx, component, this);
        return visitor.getDiagnostics(template);
    }
}
exports.TemplateCheckWithVisitor = TemplateCheckWithVisitor;
/**
 * Visits all nodes in a template (TmplAstNode and AST) and calls `visitNode` for each one.
 */
class TemplateVisitor extends compiler_1.CombinedRecursiveAstVisitor {
    constructor(ctx, component, check) {
        super();
        this.ctx = ctx;
        this.component = component;
        this.check = check;
        this.diagnostics = [];
    }
    visit(node) {
        this.diagnostics.push(...this.check.visitNode(this.ctx, this.component, node));
        super.visit(node);
    }
    visitTemplate(template) {
        const isInlineTemplate = template.tagName === 'ng-template';
        this.visitAllTemplateNodes(template.attributes);
        if (isInlineTemplate) {
            // Only visit input/outputs if this isn't an inline template node generated for a structural
            // directive (like `<div *ngIf></div>`). These nodes would be visited when the underlying
            // element of an inline template node is processed.
            this.visitAllTemplateNodes(template.inputs);
            this.visitAllTemplateNodes(template.outputs);
        }
        this.visitAllTemplateNodes(template.directives);
        // TODO(crisbeto): remove this condition when deleting `canVisitStructuralAttributes`.
        if (this.check.canVisitStructuralAttributes || isInlineTemplate) {
            // `templateAttrs` aren't transferred over to the inner element so we always have to visit them.
            this.visitAllTemplateNodes(template.templateAttrs);
        }
        this.visitAllTemplateNodes(template.variables);
        this.visitAllTemplateNodes(template.references);
        this.visitAllTemplateNodes(template.children);
    }
    getDiagnostics(template) {
        this.diagnostics = [];
        this.visitAllTemplateNodes(template);
        return this.diagnostics;
    }
}
