"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSemanticsCheckerImpl = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const symbol_util_1 = require("../../src/symbol_util");
class TemplateSemanticsCheckerImpl {
    constructor(templateTypeChecker) {
        this.templateTypeChecker = templateTypeChecker;
    }
    getDiagnosticsForComponent(component) {
        const template = this.templateTypeChecker.getTemplate(component);
        return template !== null
            ? TemplateSemanticsVisitor.visit(template, component, this.templateTypeChecker)
            : [];
    }
}
exports.TemplateSemanticsCheckerImpl = TemplateSemanticsCheckerImpl;
/** Visitor that verifies the semantics of a template. */
class TemplateSemanticsVisitor extends compiler_1.TmplAstRecursiveVisitor {
    constructor(expressionVisitor) {
        super();
        this.expressionVisitor = expressionVisitor;
    }
    static visit(nodes, component, templateTypeChecker) {
        const diagnostics = [];
        const expressionVisitor = new ExpressionsSemanticsVisitor(templateTypeChecker, component, diagnostics);
        const templateVisitor = new TemplateSemanticsVisitor(expressionVisitor);
        nodes.forEach((node) => node.visit(templateVisitor));
        return diagnostics;
    }
    visitBoundEvent(event) {
        super.visitBoundEvent(event);
        event.handler.visit(this.expressionVisitor, event);
    }
}
/** Visitor that verifies the semantics of the expressions within a template. */
class ExpressionsSemanticsVisitor extends compiler_1.RecursiveAstVisitor {
    constructor(templateTypeChecker, component, diagnostics) {
        super();
        this.templateTypeChecker = templateTypeChecker;
        this.component = component;
        this.diagnostics = diagnostics;
    }
    visitPropertyWrite(ast, context) {
        super.visitPropertyWrite(ast, context);
        this.checkForIllegalWriteInEventBinding(ast, context);
    }
    visitPropertyRead(ast, context) {
        super.visitPropertyRead(ast, context);
        this.checkForIllegalWriteInTwoWayBinding(ast, context);
    }
    checkForIllegalWriteInEventBinding(ast, context) {
        if (!(context instanceof compiler_1.TmplAstBoundEvent) || !(ast.receiver instanceof compiler_1.ImplicitReceiver)) {
            return;
        }
        const target = this.templateTypeChecker.getExpressionTarget(ast, this.component);
        if (target instanceof compiler_1.TmplAstVariable) {
            const errorMessage = `Cannot use variable '${target.name}' as the left-hand side of an assignment expression. Template variables are read-only.`;
            this.diagnostics.push(this.makeIllegalTemplateVarDiagnostic(target, context, errorMessage));
        }
    }
    checkForIllegalWriteInTwoWayBinding(ast, context) {
        // Only check top-level property reads inside two-way bindings for illegal assignments.
        if (!(context instanceof compiler_1.TmplAstBoundEvent) ||
            context.type !== compiler_1.ParsedEventType.TwoWay ||
            !(ast.receiver instanceof compiler_1.ImplicitReceiver) ||
            ast !== unwrapAstWithSource(context.handler)) {
            return;
        }
        const target = this.templateTypeChecker.getExpressionTarget(ast, this.component);
        const isVariable = target instanceof compiler_1.TmplAstVariable;
        const isLet = target instanceof compiler_1.TmplAstLetDeclaration;
        if (!isVariable && !isLet) {
            return;
        }
        // Two-way bindings to template variables are only allowed if the variables are signals.
        const symbol = this.templateTypeChecker.getSymbolOfNode(target, this.component);
        if (symbol !== null && !(0, symbol_util_1.isSignalReference)(symbol)) {
            let errorMessage;
            if (isVariable) {
                errorMessage = `Cannot use a non-signal variable '${target.name}' in a two-way binding expression. Template variables are read-only.`;
            }
            else {
                errorMessage = `Cannot use non-signal @let declaration '${target.name}' in a two-way binding expression. @let declarations are read-only.`;
            }
            this.diagnostics.push(this.makeIllegalTemplateVarDiagnostic(target, context, errorMessage));
        }
    }
    makeIllegalTemplateVarDiagnostic(target, expressionNode, errorMessage) {
        const span = target instanceof compiler_1.TmplAstVariable ? target.valueSpan || target.sourceSpan : target.sourceSpan;
        return this.templateTypeChecker.makeTemplateDiagnostic(this.component, expressionNode.handlerSpan, typescript_1.default.DiagnosticCategory.Error, (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.WRITE_TO_READ_ONLY_VARIABLE), errorMessage, [
            {
                text: `'${target.name}' is declared here.`,
                start: span.start.offset,
                end: span.end.offset,
                sourceFile: this.component.getSourceFile(),
            },
        ]);
    }
}
function unwrapAstWithSource(ast) {
    return ast instanceof compiler_1.ASTWithSource ? ast.ast : ast;
}
