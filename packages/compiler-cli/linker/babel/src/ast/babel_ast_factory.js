"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BabelAstFactory = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@babel/core");
const linker_1 = require("../../../../linker");
/**
 * A Babel flavored implementation of the AstFactory.
 */
class BabelAstFactory {
    constructor(
    /** The absolute path to the source file being compiled. */
    sourceUrl) {
        this.sourceUrl = sourceUrl;
        this.createArrayLiteral = core_1.types.arrayExpression;
        this.createBlock = core_1.types.blockStatement;
        this.createConditional = core_1.types.conditionalExpression;
        this.createExpressionStatement = core_1.types.expressionStatement;
        this.createIdentifier = core_1.types.identifier;
        this.createIfStatement = core_1.types.ifStatement;
        this.createNewExpression = core_1.types.newExpression;
        this.createParenthesizedExpression = core_1.types.parenthesizedExpression;
        this.createReturnStatement = core_1.types.returnStatement;
        this.createThrowStatement = core_1.types.throwStatement;
        this.createUnaryExpression = core_1.types.unaryExpression;
    }
    attachComments(statement, leadingComments) {
        // We must process the comments in reverse because `t.addComment()` will add new ones in front.
        for (let i = leadingComments.length - 1; i >= 0; i--) {
            const comment = leadingComments[i];
            core_1.types.addComment(statement, 'leading', comment.toString(), !comment.multiline);
        }
    }
    createAssignment(target, value) {
        (0, linker_1.assert)(target, isLExpression, 'must be a left hand side expression');
        return core_1.types.assignmentExpression('=', target, value);
    }
    createBinaryExpression(leftOperand, operator, rightOperand) {
        switch (operator) {
            case '&&':
            case '||':
            case '??':
                return core_1.types.logicalExpression(operator, leftOperand, rightOperand);
            default:
                return core_1.types.binaryExpression(operator, leftOperand, rightOperand);
        }
    }
    createCallExpression(callee, args, pure) {
        const call = core_1.types.callExpression(callee, args);
        if (pure) {
            core_1.types.addComment(call, 'leading', ' @__PURE__ ', /* line */ false);
        }
        return call;
    }
    createElementAccess(expression, element) {
        return core_1.types.memberExpression(expression, element, /* computed */ true);
    }
    createFunctionDeclaration(functionName, parameters, body) {
        (0, linker_1.assert)(body, core_1.types.isBlockStatement, 'a block');
        return core_1.types.functionDeclaration(core_1.types.identifier(functionName), parameters.map((param) => core_1.types.identifier(param)), body);
    }
    createArrowFunctionExpression(parameters, body) {
        if (core_1.types.isStatement(body)) {
            (0, linker_1.assert)(body, core_1.types.isBlockStatement, 'a block');
        }
        return core_1.types.arrowFunctionExpression(parameters.map((param) => core_1.types.identifier(param)), body);
    }
    createFunctionExpression(functionName, parameters, body) {
        (0, linker_1.assert)(body, core_1.types.isBlockStatement, 'a block');
        const name = functionName !== null ? core_1.types.identifier(functionName) : null;
        return core_1.types.functionExpression(name, parameters.map((param) => core_1.types.identifier(param)), body);
    }
    createDynamicImport(url) {
        return this.createCallExpression(core_1.types.import(), [typeof url === 'string' ? core_1.types.stringLiteral(url) : url], false /* pure */);
    }
    createLiteral(value) {
        if (typeof value === 'string') {
            return core_1.types.stringLiteral(value);
        }
        else if (typeof value === 'number') {
            return core_1.types.numericLiteral(value);
        }
        else if (typeof value === 'boolean') {
            return core_1.types.booleanLiteral(value);
        }
        else if (value === undefined) {
            return core_1.types.identifier('undefined');
        }
        else if (value === null) {
            return core_1.types.nullLiteral();
        }
        else {
            throw new Error(`Invalid literal: ${value} (${typeof value})`);
        }
    }
    createObjectLiteral(properties) {
        return core_1.types.objectExpression(properties.map((prop) => {
            const key = prop.quoted
                ? core_1.types.stringLiteral(prop.propertyName)
                : core_1.types.identifier(prop.propertyName);
            return core_1.types.objectProperty(key, prop.value);
        }));
    }
    createPropertyAccess(expression, propertyName) {
        return core_1.types.memberExpression(expression, core_1.types.identifier(propertyName), /* computed */ false);
    }
    createTaggedTemplate(tag, template) {
        return core_1.types.taggedTemplateExpression(tag, this.createTemplateLiteral(template));
    }
    createTemplateLiteral(template) {
        const elements = template.elements.map((element, i) => this.setSourceMapRange(core_1.types.templateElement(element, i === template.elements.length - 1), element.range));
        return core_1.types.templateLiteral(elements, template.expressions);
    }
    createTypeOfExpression(expression) {
        return core_1.types.unaryExpression('typeof', expression);
    }
    createVoidExpression(expression) {
        return core_1.types.unaryExpression('void', expression);
    }
    createVariableDeclaration(variableName, initializer, type) {
        return core_1.types.variableDeclaration(type, [
            core_1.types.variableDeclarator(core_1.types.identifier(variableName), initializer),
        ]);
    }
    setSourceMapRange(node, sourceMapRange) {
        if (sourceMapRange === null) {
            return node;
        }
        node.loc = {
            // Add in the filename so that we can map to external template files.
            // Note that Babel gets confused if you specify a filename when it is the original source
            // file. This happens when the template is inline, in which case just use `undefined`.
            filename: sourceMapRange.url !== this.sourceUrl ? sourceMapRange.url : undefined,
            start: {
                line: sourceMapRange.start.line + 1, // lines are 1-based in Babel.
                column: sourceMapRange.start.column,
            },
            end: {
                line: sourceMapRange.end.line + 1, // lines are 1-based in Babel.
                column: sourceMapRange.end.column,
            },
        }; // Needed because the Babel typings for `loc` don't include `filename`.
        node.start = sourceMapRange.start.offset;
        node.end = sourceMapRange.end.offset;
        return node;
    }
}
exports.BabelAstFactory = BabelAstFactory;
function isLExpression(expr) {
    // Some LVal types are not expressions, which prevents us from using `t.isLVal()`
    // directly with `assert()`.
    return core_1.types.isLVal(expr);
}
