"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeTemplateForSelectorless = analyzeTemplateForSelectorless;
const compiler_1 = require("@angular/compiler");
/**
 * Analyzes a component's template to determine if it's using selectorless syntax
 * and to extract the names of the selectorless symbols that are referenced.
 */
function analyzeTemplateForSelectorless(template) {
    const analyzer = new SelectorlessDirectivesAnalyzer();
    (0, compiler_1.tmplAstVisitAll)(analyzer, template);
    const isSelectorless = analyzer.symbols !== null && analyzer.symbols.size > 0;
    const localReferencedSymbols = analyzer.symbols;
    // The template is considered selectorless only if there
    // are direct references to directives or pipes.
    return { isSelectorless, localReferencedSymbols };
}
/**
 * Visitor that traverses all the template nodes and
 * expressions to look for selectorless references.
 */
class SelectorlessDirectivesAnalyzer extends compiler_1.CombinedRecursiveAstVisitor {
    constructor() {
        super(...arguments);
        this.symbols = null;
    }
    visit(node) {
        if (node instanceof compiler_1.BindingPipe && node.type === compiler_1.BindingPipeType.ReferencedDirectly) {
            this.trackSymbol(node.name);
        }
        super.visit(node);
    }
    visitComponent(component) {
        this.trackSymbol(component.componentName);
        super.visitComponent(component);
    }
    visitDirective(directive) {
        this.trackSymbol(directive.name);
        super.visitDirective(directive);
    }
    trackSymbol(name) {
        var _a;
        (_a = this.symbols) !== null && _a !== void 0 ? _a : (this.symbols = new Set());
        this.symbols.add(name);
    }
}
