"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalEmitScope = void 0;
const emit_scope_1 = require("./emit_scope");
/**
 * This class is a specialization of the `EmitScope` class that is designed for the situation where
 * there is no clear shared scope for constant statements. In this case they are bundled with the
 * translated definition and will be emitted into an IIFE.
 */
class LocalEmitScope extends emit_scope_1.EmitScope {
    /**
     * Translate the given Output AST definition expression into a generic `TExpression`.
     *
     * Merges the `ConstantPool` statements with the definition statements when generating the
     * definition expression. This means that `ConstantPool` statements will be emitted into an IIFE.
     */
    translateDefinition(definition) {
        // Treat statements from the ConstantPool as definition statements.
        return super.translateDefinition({
            expression: definition.expression,
            statements: [...this.constantPool.statements, ...definition.statements],
        });
    }
    /**
     * It is not valid to call this method, since there will be no shared constant statements - they
     * are already emitted in the IIFE alongside the translated definition.
     */
    getConstantStatements() {
        throw new Error('BUG - LocalEmitScope should not expose any constant statements');
    }
}
exports.LocalEmitScope = LocalEmitScope;
