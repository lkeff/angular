"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateExpression = translateExpression;
exports.translateStatement = translateStatement;
const context_1 = require("./context");
const translator_1 = require("./translator");
const typescript_ast_factory_1 = require("./typescript_ast_factory");
function translateExpression(contextFile, expression, imports, options = {}) {
    return expression.visitExpression(new translator_1.ExpressionTranslatorVisitor(new typescript_ast_factory_1.TypeScriptAstFactory(options.annotateForClosureCompiler === true), imports, contextFile, options), new context_1.Context(false));
}
function translateStatement(contextFile, statement, imports, options = {}) {
    return statement.visitStatement(new translator_1.ExpressionTranslatorVisitor(new typescript_ast_factory_1.TypeScriptAstFactory(options.annotateForClosureCompiler === true), imports, contextFile, options), new context_1.Context(true));
}
