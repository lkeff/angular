"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const ast_1 = require("../../../src/expression_parser/ast");
const unparser_1 = require("./unparser");
class ASTValidator extends ast_1.RecursiveAstVisitor {
    visit(ast) {
        this.parentSpan = undefined;
        ast.visit(this);
    }
    validate(ast, cb) {
        if (!inSpan(ast.span, this.parentSpan)) {
            if (this.parentSpan) {
                const parentSpan = this.parentSpan;
                throw Error(`Invalid AST span [expected (${ast.span.start}, ${ast.span.end}) to be in (${parentSpan.start},  ${parentSpan.end}) for ${(0, unparser_1.unparse)(ast)}`);
            }
            else {
                throw Error(`Invalid root AST span for ${(0, unparser_1.unparse)(ast)}`);
            }
        }
        const oldParent = this.parentSpan;
        this.parentSpan = ast.span;
        cb();
        this.parentSpan = oldParent;
    }
    visitUnary(ast, context) {
        this.validate(ast, () => super.visitUnary(ast, context));
    }
    visitBinary(ast, context) {
        this.validate(ast, () => super.visitBinary(ast, context));
    }
    visitChain(ast, context) {
        this.validate(ast, () => super.visitChain(ast, context));
    }
    visitConditional(ast, context) {
        this.validate(ast, () => super.visitConditional(ast, context));
    }
    visitImplicitReceiver(ast, context) {
        this.validate(ast, () => super.visitImplicitReceiver(ast, context));
    }
    visitInterpolation(ast, context) {
        this.validate(ast, () => super.visitInterpolation(ast, context));
    }
    visitKeyedRead(ast, context) {
        this.validate(ast, () => super.visitKeyedRead(ast, context));
    }
    visitKeyedWrite(ast, context) {
        this.validate(ast, () => super.visitKeyedWrite(ast, context));
    }
    visitLiteralArray(ast, context) {
        this.validate(ast, () => super.visitLiteralArray(ast, context));
    }
    visitLiteralMap(ast, context) {
        this.validate(ast, () => super.visitLiteralMap(ast, context));
    }
    visitLiteralPrimitive(ast, context) {
        this.validate(ast, () => super.visitLiteralPrimitive(ast, context));
    }
    visitPipe(ast, context) {
        this.validate(ast, () => super.visitPipe(ast, context));
    }
    visitPrefixNot(ast, context) {
        this.validate(ast, () => super.visitPrefixNot(ast, context));
    }
    visitTypeofExpression(ast, context) {
        this.validate(ast, () => super.visitTypeofExpression(ast, context));
    }
    visitVoidExpression(ast, context) {
        this.validate(ast, () => super.visitVoidExpression(ast, context));
    }
    visitPropertyRead(ast, context) {
        this.validate(ast, () => super.visitPropertyRead(ast, context));
    }
    visitPropertyWrite(ast, context) {
        this.validate(ast, () => super.visitPropertyWrite(ast, context));
    }
    visitSafePropertyRead(ast, context) {
        this.validate(ast, () => super.visitSafePropertyRead(ast, context));
    }
    visitSafeKeyedRead(ast, context) {
        this.validate(ast, () => super.visitSafeKeyedRead(ast, context));
    }
    visitCall(ast, context) {
        this.validate(ast, () => super.visitCall(ast, context));
    }
    visitSafeCall(ast, context) {
        this.validate(ast, () => super.visitSafeCall(ast, context));
    }
    visitTemplateLiteral(ast, context) {
        this.validate(ast, () => super.visitTemplateLiteral(ast, context));
    }
    visitTemplateLiteralElement(ast, context) {
        this.validate(ast, () => super.visitTemplateLiteralElement(ast, context));
    }
    visitTaggedTemplateLiteral(ast, context) {
        this.validate(ast, () => super.visitTaggedTemplateLiteral(ast, context));
    }
    visitParenthesizedExpression(ast, context) {
        this.validate(ast, () => super.visitParenthesizedExpression(ast, context));
    }
}
function inSpan(span, parentSpan) {
    return !parentSpan || (span.start >= parentSpan.start && span.end <= parentSpan.end);
}
const sharedValidator = new ASTValidator();
function validate(ast) {
    sharedValidator.visit(ast);
    return ast;
}
