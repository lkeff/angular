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
exports.AbstractJsEmitterVisitor = void 0;
const abstract_emitter_1 = require("./abstract_emitter");
const o = __importStar(require("./output_ast"));
/**
 * In TypeScript, tagged template functions expect a "template object", which is an array of
 * "cooked" strings plus a `raw` property that contains an array of "raw" strings. This is
 * typically constructed with a function called `__makeTemplateObject(cooked, raw)`, but it may not
 * be available in all environments.
 *
 * This is a JavaScript polyfill that uses __makeTemplateObject when it's available, but otherwise
 * creates an inline helper with the same functionality.
 *
 * In the inline function, if `Object.defineProperty` is available we use that to attach the `raw`
 * array.
 */
const makeTemplateObjectPolyfill = '(this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e})';
class AbstractJsEmitterVisitor extends abstract_emitter_1.AbstractEmitterVisitor {
    constructor() {
        super(false);
    }
    visitWrappedNodeExpr(ast, ctx) {
        throw new Error('Cannot emit a WrappedNodeExpr in Javascript.');
    }
    visitDeclareVarStmt(stmt, ctx) {
        ctx.print(stmt, `var ${stmt.name}`);
        if (stmt.value) {
            ctx.print(stmt, ' = ');
            stmt.value.visitExpression(this, ctx);
        }
        ctx.println(stmt, `;`);
        return null;
    }
    visitTaggedTemplateLiteralExpr(ast, ctx) {
        // The following convoluted piece of code is effectively the downlevelled equivalent of
        // ```
        // tag`...`
        // ```
        // which is effectively like:
        // ```
        // tag(__makeTemplateObject(cooked, raw), expression1, expression2, ...);
        // ```
        const elements = ast.template.elements;
        ast.tag.visitExpression(this, ctx);
        ctx.print(ast, `(${makeTemplateObjectPolyfill}(`);
        ctx.print(ast, `[${elements.map((part) => (0, abstract_emitter_1.escapeIdentifier)(part.text, false)).join(', ')}], `);
        ctx.print(ast, `[${elements.map((part) => (0, abstract_emitter_1.escapeIdentifier)(part.rawText, false)).join(', ')}])`);
        ast.template.expressions.forEach((expression) => {
            ctx.print(ast, ', ');
            expression.visitExpression(this, ctx);
        });
        ctx.print(ast, ')');
        return null;
    }
    visitTemplateLiteralExpr(expr, ctx) {
        ctx.print(expr, '`');
        for (let i = 0; i < expr.elements.length; i++) {
            expr.elements[i].visitExpression(this, ctx);
            const expression = i < expr.expressions.length ? expr.expressions[i] : null;
            if (expression !== null) {
                ctx.print(expression, '${');
                expression.visitExpression(this, ctx);
                ctx.print(expression, '}');
            }
        }
        ctx.print(expr, '`');
    }
    visitTemplateLiteralElementExpr(expr, ctx) {
        ctx.print(expr, expr.rawText);
        return null;
    }
    visitFunctionExpr(ast, ctx) {
        ctx.print(ast, `function${ast.name ? ' ' + ast.name : ''}(`);
        this._visitParams(ast.params, ctx);
        ctx.println(ast, `) {`);
        ctx.incIndent();
        this.visitAllStatements(ast.statements, ctx);
        ctx.decIndent();
        ctx.print(ast, `}`);
        return null;
    }
    visitArrowFunctionExpr(ast, ctx) {
        ctx.print(ast, '(');
        this._visitParams(ast.params, ctx);
        ctx.print(ast, ') =>');
        if (Array.isArray(ast.body)) {
            ctx.println(ast, `{`);
            ctx.incIndent();
            this.visitAllStatements(ast.body, ctx);
            ctx.decIndent();
            ctx.print(ast, `}`);
        }
        else {
            const isObjectLiteral = ast.body instanceof o.LiteralMapExpr;
            if (isObjectLiteral) {
                ctx.print(ast, '(');
            }
            ast.body.visitExpression(this, ctx);
            if (isObjectLiteral) {
                ctx.print(ast, ')');
            }
        }
        return null;
    }
    visitDeclareFunctionStmt(stmt, ctx) {
        ctx.print(stmt, `function ${stmt.name}(`);
        this._visitParams(stmt.params, ctx);
        ctx.println(stmt, `) {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println(stmt, `}`);
        return null;
    }
    visitLocalizedString(ast, ctx) {
        // The following convoluted piece of code is effectively the downlevelled equivalent of
        // ```
        // $localize `...`
        // ```
        // which is effectively like:
        // ```
        // $localize(__makeTemplateObject(cooked, raw), expression1, expression2, ...);
        // ```
        ctx.print(ast, `$localize(${makeTemplateObjectPolyfill}(`);
        const parts = [ast.serializeI18nHead()];
        for (let i = 1; i < ast.messageParts.length; i++) {
            parts.push(ast.serializeI18nTemplatePart(i));
        }
        ctx.print(ast, `[${parts.map((part) => (0, abstract_emitter_1.escapeIdentifier)(part.cooked, false)).join(', ')}], `);
        ctx.print(ast, `[${parts.map((part) => (0, abstract_emitter_1.escapeIdentifier)(part.raw, false)).join(', ')}])`);
        ast.expressions.forEach((expression) => {
            ctx.print(ast, ', ');
            expression.visitExpression(this, ctx);
        });
        ctx.print(ast, ')');
        return null;
    }
    _visitParams(params, ctx) {
        this.visitAllObjects((param) => ctx.print(null, param.name), params, ctx, ',');
    }
}
exports.AbstractJsEmitterVisitor = AbstractJsEmitterVisitor;
