"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentSymbol = void 0;
const semantic_graph_1 = require("../../../incremental/semantic_graph");
const directive_1 = require("../../directive");
/**
 * Represents an Angular component.
 */
class ComponentSymbol extends directive_1.DirectiveSymbol {
    constructor() {
        super(...arguments);
        this.usedDirectives = [];
        this.usedPipes = [];
        this.isRemotelyScoped = false;
    }
    isEmitAffected(previousSymbol, publicApiAffected) {
        if (!(previousSymbol instanceof ComponentSymbol)) {
            return true;
        }
        // Create an equality function that considers symbols equal if they represent the same
        // declaration, but only if the symbol in the current compilation does not have its public API
        // affected.
        const isSymbolUnaffected = (current, previous) => (0, semantic_graph_1.isReferenceEqual)(current, previous) && !publicApiAffected.has(current.symbol);
        // The emit of a component is affected if either of the following is true:
        //  1. The component used to be remotely scoped but no longer is, or vice versa.
        //  2. The list of used directives has changed or any of those directives have had their public
        //     API changed. If the used directives have been reordered but not otherwise affected then
        //     the component must still be re-emitted, as this may affect directive instantiation order.
        //  3. The list of used pipes has changed, or any of those pipes have had their public API
        //     changed.
        return (this.isRemotelyScoped !== previousSymbol.isRemotelyScoped ||
            !(0, semantic_graph_1.isArrayEqual)(this.usedDirectives, previousSymbol.usedDirectives, isSymbolUnaffected) ||
            !(0, semantic_graph_1.isArrayEqual)(this.usedPipes, previousSymbol.usedPipes, isSymbolUnaffected));
    }
    isTypeCheckBlockAffected(previousSymbol, typeCheckApiAffected) {
        if (!(previousSymbol instanceof ComponentSymbol)) {
            return true;
        }
        // To verify that a used directive is not affected we need to verify that its full inheritance
        // chain is not present in `typeCheckApiAffected`.
        const isInheritanceChainAffected = (symbol) => {
            let currentSymbol = symbol;
            while (currentSymbol instanceof directive_1.DirectiveSymbol) {
                if (typeCheckApiAffected.has(currentSymbol)) {
                    return true;
                }
                currentSymbol = currentSymbol.baseClass;
            }
            return false;
        };
        // Create an equality function that considers directives equal if they represent the same
        // declaration and if the symbol and all symbols it inherits from in the current compilation
        // do not have their type-check API affected.
        const isDirectiveUnaffected = (current, previous) => (0, semantic_graph_1.isReferenceEqual)(current, previous) && !isInheritanceChainAffected(current.symbol);
        // Create an equality function that considers pipes equal if they represent the same
        // declaration and if the symbol in the current compilation does not have its type-check
        // API affected.
        const isPipeUnaffected = (current, previous) => (0, semantic_graph_1.isReferenceEqual)(current, previous) && !typeCheckApiAffected.has(current.symbol);
        // The emit of a type-check block of a component is affected if either of the following is true:
        //  1. The list of used directives has changed or any of those directives have had their
        //     type-check API changed.
        //  2. The list of used pipes has changed, or any of those pipes have had their type-check API
        //     changed.
        return (!(0, semantic_graph_1.isArrayEqual)(this.usedDirectives, previousSymbol.usedDirectives, isDirectiveUnaffected) ||
            !(0, semantic_graph_1.isArrayEqual)(this.usedPipes, previousSymbol.usedPipes, isPipeUnaffected));
    }
}
exports.ComponentSymbol = ComponentSymbol;
