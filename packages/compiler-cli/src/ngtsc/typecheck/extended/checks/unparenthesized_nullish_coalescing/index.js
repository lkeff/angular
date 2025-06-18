"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../../diagnostics");
const api_1 = require("../../../api");
const api_2 = require("../../api");
/**
 * Ensures that parentheses are used to disambiguate precedence when nullish coalescing is mixed
 * with logical and/or. Returns diagnostics for the cases where parentheses are needed.
 */
class UnparenthesizedNullishCoalescing extends api_2.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING;
    }
    visitNode(ctx, component, node) {
        if (node instanceof compiler_1.Binary) {
            if (node.operation === '&&' || node.operation === '||') {
                if ((node.left instanceof compiler_1.Binary && node.left.operation === '??') ||
                    (node.right instanceof compiler_1.Binary && node.right.operation === '??')) {
                    const symbol = ctx.templateTypeChecker.getSymbolOfNode(node, component);
                    if ((symbol === null || symbol === void 0 ? void 0 : symbol.kind) !== api_1.SymbolKind.Expression) {
                        return [];
                    }
                    const sourceMapping = ctx.templateTypeChecker.getSourceMappingAtTcbLocation(symbol.tcbLocation);
                    if (sourceMapping === null) {
                        return [];
                    }
                    const diagnostic = ctx.makeTemplateDiagnostic(sourceMapping.span, `Parentheses are required to disambiguate precedence when mixing '??' with '&&' and '||'.`);
                    return [diagnostic];
                }
            }
        }
        return [];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.UNPARENTHESIZED_NULLISH_COALESCING,
    create: () => new UnparenthesizedNullishCoalescing(),
};
