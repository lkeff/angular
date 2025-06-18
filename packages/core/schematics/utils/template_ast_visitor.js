"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateAstVisitor = void 0;
/**
 * A base class that can be used to implement a Render3 Template AST visitor.
 * Schematics are also currently required to be CommonJS to support execution within the Angular
 * CLI. As a result, the ESM `@angular/compiler` package must be loaded via a native dynamic import.
 * Using a dynamic import makes classes extending from classes present in `@angular/compiler`
 * complicated due to the class not being present at module evaluation time. The classes using a
 * base class found within `@angular/compiler` must be wrapped in a factory to allow the class value
 * to be accessible at runtime after the dynamic import has completed. This class implements the
 * interface of the `TmplAstRecursiveVisitor` class (but does not extend) as the
 * `TmplAstRecursiveVisitor` as an interface provides the required set of visit methods. The base
 * interface `Visitor<T>` is not exported.
 */
class TemplateAstVisitor {
    /**
     * Creates a new Render3 Template AST visitor using an instance of the `@angular/compiler`
     * package. Passing in the compiler is required due to the need to dynamically import the
     * ESM `@angular/compiler` into a CommonJS schematic.
     *
     * @param compilerModule The compiler instance that should be used within the visitor.
     */
    constructor(compilerModule) {
        this.compilerModule = compilerModule;
    }
    visitElement(element) { }
    visitTemplate(template) { }
    visitContent(content) { }
    visitVariable(variable) { }
    visitReference(reference) { }
    visitTextAttribute(attribute) { }
    visitBoundAttribute(attribute) { }
    visitBoundEvent(attribute) { }
    visitText(text) { }
    visitBoundText(text) { }
    visitIcu(icu) { }
    visitDeferredBlock(deferred) { }
    visitDeferredBlockPlaceholder(block) { }
    visitDeferredBlockError(block) { }
    visitDeferredBlockLoading(block) { }
    visitDeferredTrigger(trigger) { }
    visitUnknownBlock(block) { }
    visitSwitchBlock(block) { }
    visitSwitchBlockCase(block) { }
    visitForLoopBlock(block) { }
    visitForLoopBlockEmpty(block) { }
    visitIfBlock(block) { }
    visitIfBlockBranch(block) { }
    visitLetDeclaration(decl) { }
    visitComponent(component) { }
    visitDirective(directive) { }
    /**
     * Visits all the provided nodes in order using this Visitor's visit methods.
     * This is a simplified variant of the `visitAll` function found inside of (but not
     * exported from) the `@angular/compiler` that does not support returning a value
     * since the migrations do not directly transform the nodes.
     *
     * @param nodes An iterable of nodes to visit using this visitor.
     */
    visitAll(nodes) {
        for (const node of nodes) {
            node.visit(this);
        }
    }
}
exports.TemplateAstVisitor = TemplateAstVisitor;
