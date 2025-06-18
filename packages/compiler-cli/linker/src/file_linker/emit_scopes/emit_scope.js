"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitScope = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const linker_import_generator_1 = require("../../linker_import_generator");
/**
 * This class represents (from the point of view of the `FileLinker`) the scope in which
 * statements and expressions related to a linked partial declaration will be emitted.
 *
 * It holds a copy of a `ConstantPool` that is used to capture any constant statements that need to
 * be emitted in this context.
 *
 * This implementation will emit the definition and the constant statements separately.
 */
class EmitScope {
    constructor(ngImport, translator, factory) {
        this.ngImport = ngImport;
        this.translator = translator;
        this.factory = factory;
        this.constantPool = new compiler_1.ConstantPool();
    }
    /**
     * Translate the given Output AST definition expression into a generic `TExpression`.
     *
     * Use a `LinkerImportGenerator` to handle any imports in the definition.
     */
    translateDefinition(definition) {
        const expression = this.translator.translateExpression(definition.expression, new linker_import_generator_1.LinkerImportGenerator(this.factory, this.ngImport));
        if (definition.statements.length > 0) {
            // Definition statements must be emitted "after" the declaration for which the definition is
            // being emitted. However, the linker only transforms individual declaration calls, and can't
            // insert statements after definitions. To work around this, the linker transforms the
            // definition into an IIFE which executes the definition statements before returning the
            // definition expression.
            const importGenerator = new linker_import_generator_1.LinkerImportGenerator(this.factory, this.ngImport);
            return this.wrapInIifeWithStatements(expression, definition.statements.map((statement) => this.translator.translateStatement(statement, importGenerator)));
        }
        else {
            // Since there are no definition statements, just return the definition expression directly.
            return expression;
        }
    }
    /**
     * Return any constant statements that are shared between all uses of this `EmitScope`.
     */
    getConstantStatements() {
        const importGenerator = new linker_import_generator_1.LinkerImportGenerator(this.factory, this.ngImport);
        return this.constantPool.statements.map((statement) => this.translator.translateStatement(statement, importGenerator));
    }
    wrapInIifeWithStatements(expression, statements) {
        const returnStatement = this.factory.createReturnStatement(expression);
        const body = this.factory.createBlock([...statements, returnStatement]);
        const fn = this.factory.createFunctionExpression(/* name */ null, /* args */ [], body);
        return this.factory.createCallExpression(fn, /* args */ [], /* pure */ false);
    }
}
exports.EmitScope = EmitScope;
