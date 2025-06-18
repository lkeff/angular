"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../../diagnostics");
const api_1 = require("../../../api");
const api_2 = require("../../api");
/**
 * Ensures the left side of an optional chain operation is nullable.
 * Returns diagnostics for the cases where the operator is useless.
 * This check should only be use if `strictNullChecks` is enabled,
 * otherwise it would produce inaccurate results.
 */
class OptionalChainNotNullableCheck extends api_2.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.canVisitStructuralAttributes = false;
        this.code = diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE;
    }
    visitNode(ctx, component, node) {
        if (!(node instanceof compiler_1.SafeCall) &&
            !(node instanceof compiler_1.SafePropertyRead) &&
            !(node instanceof compiler_1.SafeKeyedRead))
            return [];
        const symbolLeft = ctx.templateTypeChecker.getSymbolOfNode(node.receiver, component);
        if (symbolLeft === null || symbolLeft.kind !== api_1.SymbolKind.Expression) {
            return [];
        }
        const typeLeft = symbolLeft.tsType;
        if (typeLeft.flags & (typescript_1.default.TypeFlags.Any | typescript_1.default.TypeFlags.Unknown)) {
            // We should not make assumptions about the any and unknown types; using a nullish coalescing
            // operator is acceptable for those.
            return [];
        }
        // If the left operand's type is different from its non-nullable self, then it must
        // contain a null or undefined so this nullish coalescing operator is useful. No diagnostic to
        // report.
        if (typeLeft.getNonNullableType() !== typeLeft)
            return [];
        const symbol = ctx.templateTypeChecker.getSymbolOfNode(node, component);
        if (symbol.kind !== api_1.SymbolKind.Expression) {
            return [];
        }
        const templateMapping = ctx.templateTypeChecker.getSourceMappingAtTcbLocation(symbol.tcbLocation);
        if (templateMapping === null) {
            return [];
        }
        const advice = node instanceof compiler_1.SafePropertyRead
            ? `the '?.' operator can be replaced with the '.' operator`
            : `the '?.' operator can be safely removed`;
        const diagnostic = ctx.makeTemplateDiagnostic(templateMapping.span, `The left side of this optional chain operation does not include 'null' or 'undefined' in its type, therefore ${advice}.`);
        return [diagnostic];
    }
}
exports.factory = {
    code: diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.OPTIONAL_CHAIN_NOT_NULLABLE,
    create: (options) => {
        // Require `strictNullChecks` to be enabled.
        const strictNullChecks = options.strictNullChecks === undefined ? !!options.strict : !!options.strictNullChecks;
        if (!strictNullChecks) {
            return null;
        }
        return new OptionalChainNotNullableCheck();
    },
};
