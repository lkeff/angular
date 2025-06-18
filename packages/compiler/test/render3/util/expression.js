"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanizeExpressionSource = humanizeExpressionSource;
const e = __importStar(require("../../../src/expression_parser/ast"));
const t = __importStar(require("../../../src/render3/r3_ast"));
const unparser_1 = require("../../expression_parser/utils/unparser");
class ExpressionSourceHumanizer extends e.RecursiveAstVisitor {
    constructor() {
        super(...arguments);
        this.result = [];
    }
    recordAst(ast) {
        this.result.push([(0, unparser_1.unparse)(ast), ast.sourceSpan]);
    }
    // This method is defined to reconcile the type of ExpressionSourceHumanizer
    // since both RecursiveAstVisitor and Visitor define the visit() method in
    // their interfaces.
    visit(node, context) {
        if (node instanceof e.AST) {
            node.visit(this, context);
        }
        else {
            node.visit(this);
        }
    }
    visitASTWithSource(ast) {
        this.recordAst(ast);
        this.visitAll([ast.ast], null);
    }
    visitBinary(ast) {
        this.recordAst(ast);
        super.visitBinary(ast, null);
    }
    visitChain(ast) {
        this.recordAst(ast);
        super.visitChain(ast, null);
    }
    visitConditional(ast) {
        this.recordAst(ast);
        super.visitConditional(ast, null);
    }
    visitImplicitReceiver(ast) {
        this.recordAst(ast);
        super.visitImplicitReceiver(ast, null);
    }
    visitInterpolation(ast) {
        this.recordAst(ast);
        super.visitInterpolation(ast, null);
    }
    visitKeyedRead(ast) {
        this.recordAst(ast);
        super.visitKeyedRead(ast, null);
    }
    visitKeyedWrite(ast) {
        this.recordAst(ast);
        super.visitKeyedWrite(ast, null);
    }
    visitLiteralPrimitive(ast) {
        this.recordAst(ast);
        super.visitLiteralPrimitive(ast, null);
    }
    visitLiteralArray(ast) {
        this.recordAst(ast);
        super.visitLiteralArray(ast, null);
    }
    visitLiteralMap(ast) {
        this.recordAst(ast);
        super.visitLiteralMap(ast, null);
    }
    visitNonNullAssert(ast) {
        this.recordAst(ast);
        super.visitNonNullAssert(ast, null);
    }
    visitPipe(ast) {
        this.recordAst(ast);
        super.visitPipe(ast, null);
    }
    visitPrefixNot(ast) {
        this.recordAst(ast);
        super.visitPrefixNot(ast, null);
    }
    visitTypeofExpression(ast) {
        this.recordAst(ast);
        super.visitTypeofExpression(ast, null);
    }
    visitVoidExpression(ast) {
        this.recordAst(ast);
        super.visitVoidExpression(ast, null);
    }
    visitPropertyRead(ast) {
        this.recordAst(ast);
        super.visitPropertyRead(ast, null);
    }
    visitPropertyWrite(ast) {
        this.recordAst(ast);
        super.visitPropertyWrite(ast, null);
    }
    visitSafePropertyRead(ast) {
        this.recordAst(ast);
        super.visitSafePropertyRead(ast, null);
    }
    visitSafeKeyedRead(ast) {
        this.recordAst(ast);
        super.visitSafeKeyedRead(ast, null);
    }
    visitCall(ast) {
        this.recordAst(ast);
        super.visitCall(ast, null);
    }
    visitSafeCall(ast) {
        this.recordAst(ast);
        super.visitSafeCall(ast, null);
    }
    visitTemplateLiteral(ast, context) {
        this.recordAst(ast);
        super.visitTemplateLiteral(ast, null);
    }
    visitTemplateLiteralElement(ast, context) {
        this.recordAst(ast);
        super.visitTemplateLiteralElement(ast, null);
    }
    visitTaggedTemplateLiteral(ast, context) {
        this.recordAst(ast);
        super.visitTaggedTemplateLiteral(ast, null);
    }
    visitParenthesizedExpression(ast, context) {
        this.recordAst(ast);
        super.visitParenthesizedExpression(ast, null);
    }
    visitTemplate(ast) {
        t.visitAll(this, ast.directives);
        t.visitAll(this, ast.children);
        t.visitAll(this, ast.templateAttrs);
    }
    visitElement(ast) {
        t.visitAll(this, ast.directives);
        t.visitAll(this, ast.children);
        t.visitAll(this, ast.inputs);
        t.visitAll(this, ast.outputs);
    }
    visitReference(ast) { }
    visitVariable(ast) { }
    visitEvent(ast) {
        ast.handler.visit(this);
    }
    visitTextAttribute(ast) { }
    visitBoundAttribute(ast) {
        ast.value.visit(this);
    }
    visitBoundEvent(ast) {
        ast.handler.visit(this);
    }
    visitBoundText(ast) {
        ast.value.visit(this);
    }
    visitContent(ast) {
        t.visitAll(this, ast.children);
    }
    visitText(ast) { }
    visitUnknownBlock(block) { }
    visitIcu(ast) {
        for (const key of Object.keys(ast.vars)) {
            ast.vars[key].visit(this);
        }
        for (const key of Object.keys(ast.placeholders)) {
            ast.placeholders[key].visit(this);
        }
    }
    visitDeferredBlock(deferred) {
        deferred.visitAll(this);
    }
    visitDeferredTrigger(trigger) {
        if (trigger instanceof t.BoundDeferredTrigger) {
            this.recordAst(trigger.value);
        }
    }
    visitDeferredBlockPlaceholder(block) {
        t.visitAll(this, block.children);
    }
    visitDeferredBlockError(block) {
        t.visitAll(this, block.children);
    }
    visitDeferredBlockLoading(block) {
        t.visitAll(this, block.children);
    }
    visitSwitchBlock(block) {
        block.expression.visit(this);
        t.visitAll(this, block.cases);
    }
    visitSwitchBlockCase(block) {
        var _a;
        (_a = block.expression) === null || _a === void 0 ? void 0 : _a.visit(this);
        t.visitAll(this, block.children);
    }
    visitForLoopBlock(block) {
        var _a;
        block.item.visit(this);
        t.visitAll(this, block.contextVariables);
        block.expression.visit(this);
        t.visitAll(this, block.children);
        (_a = block.empty) === null || _a === void 0 ? void 0 : _a.visit(this);
    }
    visitForLoopBlockEmpty(block) {
        t.visitAll(this, block.children);
    }
    visitIfBlock(block) {
        t.visitAll(this, block.branches);
    }
    visitIfBlockBranch(block) {
        var _a, _b;
        (_a = block.expression) === null || _a === void 0 ? void 0 : _a.visit(this);
        (_b = block.expressionAlias) === null || _b === void 0 ? void 0 : _b.visit(this);
        t.visitAll(this, block.children);
    }
    visitLetDeclaration(decl) {
        decl.value.visit(this);
    }
    visitComponent(ast) {
        t.visitAll(this, ast.children);
        t.visitAll(this, ast.directives);
        t.visitAll(this, ast.inputs);
        t.visitAll(this, ast.outputs);
    }
    visitDirective(ast) {
        t.visitAll(this, ast.inputs);
        t.visitAll(this, ast.outputs);
    }
}
/**
 * Humanizes expression AST source spans in a template by returning an array of tuples
 *   [unparsed AST, AST source span]
 * for each expression in the template.
 * @param templateAsts template AST to humanize
 */
function humanizeExpressionSource(templateAsts) {
    const humanizer = new ExpressionSourceHumanizer();
    t.visitAll(humanizer, templateAsts);
    return humanizer.result;
}
