"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptAstFactory = void 0;
exports.createTemplateMiddle = createTemplateMiddle;
exports.createTemplateTail = createTemplateTail;
exports.attachComments = attachComments;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const ts_util_1 = require("./ts_util");
/**
 * Different optimizers use different annotations on a function or method call to indicate its pure
 * status.
 */
var PureAnnotation;
(function (PureAnnotation) {
    /**
     * Closure's annotation for purity is `@pureOrBreakMyCode`, but this needs to be in a semantic
     * (jsdoc) enabled comment. Thus, the actual comment text for Closure must include the `*` that
     * turns a `/*` comment into a `/**` comment, as well as surrounding whitespace.
     */
    PureAnnotation["CLOSURE"] = "* @pureOrBreakMyCode ";
    PureAnnotation["TERSER"] = "@__PURE__";
})(PureAnnotation || (PureAnnotation = {}));
const UNARY_OPERATORS = {
    '+': typescript_1.default.SyntaxKind.PlusToken,
    '-': typescript_1.default.SyntaxKind.MinusToken,
    '!': typescript_1.default.SyntaxKind.ExclamationToken,
};
const BINARY_OPERATORS = {
    '&&': typescript_1.default.SyntaxKind.AmpersandAmpersandToken,
    '>': typescript_1.default.SyntaxKind.GreaterThanToken,
    '>=': typescript_1.default.SyntaxKind.GreaterThanEqualsToken,
    '&': typescript_1.default.SyntaxKind.AmpersandToken,
    '|': typescript_1.default.SyntaxKind.BarToken,
    '/': typescript_1.default.SyntaxKind.SlashToken,
    '==': typescript_1.default.SyntaxKind.EqualsEqualsToken,
    '===': typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken,
    '<': typescript_1.default.SyntaxKind.LessThanToken,
    '<=': typescript_1.default.SyntaxKind.LessThanEqualsToken,
    '-': typescript_1.default.SyntaxKind.MinusToken,
    '%': typescript_1.default.SyntaxKind.PercentToken,
    '*': typescript_1.default.SyntaxKind.AsteriskToken,
    '**': typescript_1.default.SyntaxKind.AsteriskAsteriskToken,
    '!=': typescript_1.default.SyntaxKind.ExclamationEqualsToken,
    '!==': typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken,
    '||': typescript_1.default.SyntaxKind.BarBarToken,
    '+': typescript_1.default.SyntaxKind.PlusToken,
    '??': typescript_1.default.SyntaxKind.QuestionQuestionToken,
    'in': typescript_1.default.SyntaxKind.InKeyword,
};
const VAR_TYPES = {
    'const': typescript_1.default.NodeFlags.Const,
    'let': typescript_1.default.NodeFlags.Let,
    'var': typescript_1.default.NodeFlags.None,
};
/**
 * A TypeScript flavoured implementation of the AstFactory.
 */
class TypeScriptAstFactory {
    constructor(annotateForClosureCompiler) {
        this.annotateForClosureCompiler = annotateForClosureCompiler;
        this.externalSourceFiles = new Map();
        this.attachComments = attachComments;
        this.createArrayLiteral = typescript_1.default.factory.createArrayLiteralExpression;
        this.createElementAccess = typescript_1.default.factory.createElementAccessExpression;
        this.createExpressionStatement = typescript_1.default.factory.createExpressionStatement;
        this.createIdentifier = typescript_1.default.factory.createIdentifier;
        this.createParenthesizedExpression = typescript_1.default.factory.createParenthesizedExpression;
        this.createPropertyAccess = typescript_1.default.factory.createPropertyAccessExpression;
        this.createThrowStatement = typescript_1.default.factory.createThrowStatement;
        this.createTypeOfExpression = typescript_1.default.factory.createTypeOfExpression;
        this.createVoidExpression = typescript_1.default.factory.createVoidExpression;
    }
    createAssignment(target, value) {
        return typescript_1.default.factory.createBinaryExpression(target, typescript_1.default.SyntaxKind.EqualsToken, value);
    }
    createBinaryExpression(leftOperand, operator, rightOperand) {
        return typescript_1.default.factory.createBinaryExpression(leftOperand, BINARY_OPERATORS[operator], rightOperand);
    }
    createBlock(body) {
        return typescript_1.default.factory.createBlock(body);
    }
    createCallExpression(callee, args, pure) {
        const call = typescript_1.default.factory.createCallExpression(callee, undefined, args);
        if (pure) {
            typescript_1.default.addSyntheticLeadingComment(call, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, this.annotateForClosureCompiler ? PureAnnotation.CLOSURE : PureAnnotation.TERSER, 
            /* trailing newline */ false);
        }
        return call;
    }
    createConditional(condition, whenTrue, whenFalse) {
        return typescript_1.default.factory.createConditionalExpression(condition, undefined, whenTrue, undefined, whenFalse);
    }
    createDynamicImport(url) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.ImportKeyword), 
        /* type */ undefined, [typeof url === 'string' ? typescript_1.default.factory.createStringLiteral(url) : url]);
    }
    createFunctionDeclaration(functionName, parameters, body) {
        if (!typescript_1.default.isBlock(body)) {
            throw new Error(`Invalid syntax, expected a block, but got ${typescript_1.default.SyntaxKind[body.kind]}.`);
        }
        return typescript_1.default.factory.createFunctionDeclaration(undefined, undefined, functionName, undefined, parameters.map((param) => typescript_1.default.factory.createParameterDeclaration(undefined, undefined, param)), undefined, body);
    }
    createFunctionExpression(functionName, parameters, body) {
        if (!typescript_1.default.isBlock(body)) {
            throw new Error(`Invalid syntax, expected a block, but got ${typescript_1.default.SyntaxKind[body.kind]}.`);
        }
        return typescript_1.default.factory.createFunctionExpression(undefined, undefined, functionName !== null && functionName !== void 0 ? functionName : undefined, undefined, parameters.map((param) => typescript_1.default.factory.createParameterDeclaration(undefined, undefined, param)), undefined, body);
    }
    createArrowFunctionExpression(parameters, body) {
        if (typescript_1.default.isStatement(body) && !typescript_1.default.isBlock(body)) {
            throw new Error(`Invalid syntax, expected a block, but got ${typescript_1.default.SyntaxKind[body.kind]}.`);
        }
        return typescript_1.default.factory.createArrowFunction(undefined, undefined, parameters.map((param) => typescript_1.default.factory.createParameterDeclaration(undefined, undefined, param)), undefined, undefined, body);
    }
    createIfStatement(condition, thenStatement, elseStatement) {
        return typescript_1.default.factory.createIfStatement(condition, thenStatement, elseStatement !== null && elseStatement !== void 0 ? elseStatement : undefined);
    }
    createLiteral(value) {
        if (value === undefined) {
            return typescript_1.default.factory.createIdentifier('undefined');
        }
        else if (value === null) {
            return typescript_1.default.factory.createNull();
        }
        else if (typeof value === 'boolean') {
            return value ? typescript_1.default.factory.createTrue() : typescript_1.default.factory.createFalse();
        }
        else if (typeof value === 'number') {
            return (0, ts_util_1.tsNumericExpression)(value);
        }
        else {
            return typescript_1.default.factory.createStringLiteral(value);
        }
    }
    createNewExpression(expression, args) {
        return typescript_1.default.factory.createNewExpression(expression, undefined, args);
    }
    createObjectLiteral(properties) {
        return typescript_1.default.factory.createObjectLiteralExpression(properties.map((prop) => typescript_1.default.factory.createPropertyAssignment(prop.quoted
            ? typescript_1.default.factory.createStringLiteral(prop.propertyName)
            : typescript_1.default.factory.createIdentifier(prop.propertyName), prop.value)));
    }
    createReturnStatement(expression) {
        return typescript_1.default.factory.createReturnStatement(expression !== null && expression !== void 0 ? expression : undefined);
    }
    createTaggedTemplate(tag, template) {
        return typescript_1.default.factory.createTaggedTemplateExpression(tag, undefined, this.createTemplateLiteral(template));
    }
    createTemplateLiteral(template) {
        let templateLiteral;
        const length = template.elements.length;
        const head = template.elements[0];
        if (length === 1) {
            templateLiteral = typescript_1.default.factory.createNoSubstitutionTemplateLiteral(head.cooked, head.raw);
        }
        else {
            const spans = [];
            // Create the middle parts
            for (let i = 1; i < length - 1; i++) {
                const { cooked, raw, range } = template.elements[i];
                const middle = createTemplateMiddle(cooked, raw);
                if (range !== null) {
                    this.setSourceMapRange(middle, range);
                }
                spans.push(typescript_1.default.factory.createTemplateSpan(template.expressions[i - 1], middle));
            }
            // Create the tail part
            const resolvedExpression = template.expressions[length - 2];
            const templatePart = template.elements[length - 1];
            const templateTail = createTemplateTail(templatePart.cooked, templatePart.raw);
            if (templatePart.range !== null) {
                this.setSourceMapRange(templateTail, templatePart.range);
            }
            spans.push(typescript_1.default.factory.createTemplateSpan(resolvedExpression, templateTail));
            // Put it all together
            templateLiteral = typescript_1.default.factory.createTemplateExpression(typescript_1.default.factory.createTemplateHead(head.cooked, head.raw), spans);
        }
        if (head.range !== null) {
            this.setSourceMapRange(templateLiteral, head.range);
        }
        return templateLiteral;
    }
    createUnaryExpression(operator, operand) {
        return typescript_1.default.factory.createPrefixUnaryExpression(UNARY_OPERATORS[operator], operand);
    }
    createVariableDeclaration(variableName, initializer, type) {
        return typescript_1.default.factory.createVariableStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([
            typescript_1.default.factory.createVariableDeclaration(variableName, undefined, undefined, initializer !== null && initializer !== void 0 ? initializer : undefined),
        ], VAR_TYPES[type]));
    }
    setSourceMapRange(node, sourceMapRange) {
        if (sourceMapRange === null) {
            return node;
        }
        const url = sourceMapRange.url;
        if (!this.externalSourceFiles.has(url)) {
            this.externalSourceFiles.set(url, typescript_1.default.createSourceMapSource(url, sourceMapRange.content, (pos) => pos));
        }
        const source = this.externalSourceFiles.get(url);
        typescript_1.default.setSourceMapRange(node, {
            pos: sourceMapRange.start.offset,
            end: sourceMapRange.end.offset,
            source,
        });
        return node;
    }
}
exports.TypeScriptAstFactory = TypeScriptAstFactory;
// HACK: Use this in place of `ts.createTemplateMiddle()`.
// Revert once https://github.com/microsoft/TypeScript/issues/35374 is fixed.
function createTemplateMiddle(cooked, raw) {
    const node = typescript_1.default.factory.createTemplateHead(cooked, raw);
    node.kind = typescript_1.default.SyntaxKind.TemplateMiddle;
    return node;
}
// HACK: Use this in place of `ts.createTemplateTail()`.
// Revert once https://github.com/microsoft/TypeScript/issues/35374 is fixed.
function createTemplateTail(cooked, raw) {
    const node = typescript_1.default.factory.createTemplateHead(cooked, raw);
    node.kind = typescript_1.default.SyntaxKind.TemplateTail;
    return node;
}
/**
 * Attach the given `leadingComments` to the `statement` node.
 *
 * @param statement The statement that will have comments attached.
 * @param leadingComments The comments to attach to the statement.
 */
function attachComments(statement, leadingComments) {
    for (const comment of leadingComments) {
        const commentKind = comment.multiline
            ? typescript_1.default.SyntaxKind.MultiLineCommentTrivia
            : typescript_1.default.SyntaxKind.SingleLineCommentTrivia;
        if (comment.multiline) {
            typescript_1.default.addSyntheticLeadingComment(statement, commentKind, comment.toString(), comment.trailingNewline);
        }
        else {
            for (const line of comment.toString().split('\n')) {
                typescript_1.default.addSyntheticLeadingComment(statement, commentKind, line, comment.trailingNewline);
            }
        }
    }
}
