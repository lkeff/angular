"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
const translator_1 = require("../../../src/ngtsc/translator");
/**
 * Generic translator helper class, which exposes methods for translating expressions and
 * statements.
 */
class Translator {
    constructor(factory) {
        this.factory = factory;
    }
    /**
     * Translate the given output AST in the context of an expression.
     */
    translateExpression(expression, imports, options = {}) {
        return expression.visitExpression(new translator_1.ExpressionTranslatorVisitor(this.factory, imports, null, options), new translator_1.Context(false));
    }
    /**
     * Translate the given output AST in the context of a statement.
     */
    translateStatement(statement, imports, options = {}) {
        return statement.visitStatement(new translator_1.ExpressionTranslatorVisitor(this.factory, imports, null, options), new translator_1.Context(true));
    }
}
exports.Translator = Translator;
