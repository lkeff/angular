"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparse = unparse;
exports.unparseWithSpan = unparseWithSpan;
const ast_1 = require("../../../src/expression_parser/ast");
const defaults_1 = require("../../../src/ml_parser/defaults");
class Unparser {
    unparse(ast, interpolationConfig) {
        this._expression = '';
        this._interpolationConfig = interpolationConfig;
        this._visit(ast);
        return this._expression;
    }
    visitPropertyRead(ast, context) {
        this._visit(ast.receiver);
        this._expression += ast.receiver instanceof ast_1.ImplicitReceiver ? `${ast.name}` : `.${ast.name}`;
    }
    visitPropertyWrite(ast, context) {
        this._visit(ast.receiver);
        this._expression +=
            ast.receiver instanceof ast_1.ImplicitReceiver ? `${ast.name} = ` : `.${ast.name} = `;
        this._visit(ast.value);
    }
    visitUnary(ast, context) {
        this._expression += ast.operator;
        this._visit(ast.expr);
    }
    visitBinary(ast, context) {
        this._visit(ast.left);
        this._expression += ` ${ast.operation} `;
        this._visit(ast.right);
    }
    visitChain(ast, context) {
        const len = ast.expressions.length;
        for (let i = 0; i < len; i++) {
            this._visit(ast.expressions[i]);
            this._expression += i == len - 1 ? ';' : '; ';
        }
    }
    visitConditional(ast, context) {
        this._visit(ast.condition);
        this._expression += ' ? ';
        this._visit(ast.trueExp);
        this._expression += ' : ';
        this._visit(ast.falseExp);
    }
    visitPipe(ast, context) {
        this._expression += '(';
        this._visit(ast.exp);
        this._expression += ` | ${ast.name}`;
        ast.args.forEach((arg) => {
            this._expression += ':';
            this._visit(arg);
        });
        this._expression += ')';
    }
    visitCall(ast, context) {
        this._visit(ast.receiver);
        this._expression += '(';
        let isFirst = true;
        ast.args.forEach((arg) => {
            if (!isFirst)
                this._expression += ', ';
            isFirst = false;
            this._visit(arg);
        });
        this._expression += ')';
    }
    visitSafeCall(ast, context) {
        this._visit(ast.receiver);
        this._expression += '?.(';
        let isFirst = true;
        ast.args.forEach((arg) => {
            if (!isFirst)
                this._expression += ', ';
            isFirst = false;
            this._visit(arg);
        });
        this._expression += ')';
    }
    visitImplicitReceiver(ast, context) { }
    visitThisReceiver(ast, context) { }
    visitInterpolation(ast, context) {
        for (let i = 0; i < ast.strings.length; i++) {
            this._expression += ast.strings[i];
            if (i < ast.expressions.length) {
                this._expression += `${this._interpolationConfig.start} `;
                this._visit(ast.expressions[i]);
                this._expression += ` ${this._interpolationConfig.end}`;
            }
        }
    }
    visitKeyedRead(ast, context) {
        this._visit(ast.receiver);
        this._expression += '[';
        this._visit(ast.key);
        this._expression += ']';
    }
    visitKeyedWrite(ast, context) {
        this._visit(ast.receiver);
        this._expression += '[';
        this._visit(ast.key);
        this._expression += '] = ';
        this._visit(ast.value);
    }
    visitLiteralArray(ast, context) {
        this._expression += '[';
        let isFirst = true;
        ast.expressions.forEach((expression) => {
            if (!isFirst)
                this._expression += ', ';
            isFirst = false;
            this._visit(expression);
        });
        this._expression += ']';
    }
    visitLiteralMap(ast, context) {
        this._expression += '{';
        let isFirst = true;
        for (let i = 0; i < ast.keys.length; i++) {
            if (!isFirst)
                this._expression += ', ';
            isFirst = false;
            const key = ast.keys[i];
            this._expression += key.quoted ? JSON.stringify(key.key) : key.key;
            this._expression += ': ';
            this._visit(ast.values[i]);
        }
        this._expression += '}';
    }
    visitLiteralPrimitive(ast, context) {
        if (typeof ast.value === 'string') {
            this._expression += `"${ast.value.replace(Unparser._quoteRegExp, '"')}"`;
        }
        else {
            this._expression += `${ast.value}`;
        }
    }
    visitPrefixNot(ast, context) {
        this._expression += '!';
        this._visit(ast.expression);
    }
    visitTypeofExpression(ast, context) {
        this._expression += 'typeof ';
        this._visit(ast.expression);
    }
    visitVoidExpression(ast, context) {
        this._expression += 'void ';
        this._visit(ast.expression);
    }
    visitNonNullAssert(ast, context) {
        this._visit(ast.expression);
        this._expression += '!';
    }
    visitSafePropertyRead(ast, context) {
        this._visit(ast.receiver);
        this._expression += `?.${ast.name}`;
    }
    visitSafeKeyedRead(ast, context) {
        this._visit(ast.receiver);
        this._expression += '?.[';
        this._visit(ast.key);
        this._expression += ']';
    }
    visitTemplateLiteral(ast, context) {
        this._expression += '`';
        for (let i = 0; i < ast.elements.length; i++) {
            this._visit(ast.elements[i]);
            const expression = i < ast.expressions.length ? ast.expressions[i] : null;
            if (expression !== null) {
                this._expression += '${';
                this._visit(expression);
                this._expression += '}';
            }
        }
        this._expression += '`';
    }
    visitTemplateLiteralElement(ast, context) {
        this._expression += ast.text;
    }
    visitTaggedTemplateLiteral(ast, context) {
        this._visit(ast.tag);
        this._visit(ast.template);
    }
    visitParenthesizedExpression(ast, context) {
        this._expression += '(';
        this._visit(ast.expression);
        this._expression += ')';
    }
    _visit(ast) {
        ast.visit(this);
    }
}
Unparser._quoteRegExp = /"/g;
const sharedUnparser = new Unparser();
function unparse(ast, interpolationConfig = defaults_1.DEFAULT_INTERPOLATION_CONFIG) {
    return sharedUnparser.unparse(ast, interpolationConfig);
}
function unparseWithSpan(ast, interpolationConfig = defaults_1.DEFAULT_INTERPOLATION_CONFIG) {
    const unparsed = [];
    const source = ast.source;
    const recursiveSpanUnparser = new (class extends ast_1.RecursiveAstVisitor {
        recordUnparsed(ast, spanKey, unparsedList) {
            const span = ast[spanKey];
            const prefix = spanKey === 'span' ? '' : `[${spanKey}] `;
            const src = source.substring(span.start, span.end);
            unparsedList.push([unparse(ast, interpolationConfig), prefix + src]);
        }
        visit(ast, unparsedList) {
            this.recordUnparsed(ast, 'span', unparsedList);
            if (ast.hasOwnProperty('nameSpan')) {
                this.recordUnparsed(ast, 'nameSpan', unparsedList);
            }
            if (ast.hasOwnProperty('argumentSpan')) {
                this.recordUnparsed(ast, 'argumentSpan', unparsedList);
            }
            ast.visit(this, unparsedList);
        }
    })();
    recursiveSpanUnparser.visitAll([ast.ast], unparsed);
    return unparsed;
}
