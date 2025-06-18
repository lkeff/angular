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
exports.createSyntheticAngularCoreDecoratorAccess = createSyntheticAngularCoreDecoratorAccess;
exports.castAsAny = castAsAny;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Creates an import and access for a given Angular core import while
 * ensuring the decorator symbol access can be traced back to an Angular core
 * import in order to make the synthetic decorator compatible with the JIT
 * decorator downlevel transform.
 */
function createSyntheticAngularCoreDecoratorAccess(factory, importManager, ngClassDecorator, sourceFile, decoratorName) {
    const classDecoratorIdentifier = typescript_1.default.isIdentifier(ngClassDecorator.identifier)
        ? ngClassDecorator.identifier
        : ngClassDecorator.identifier.expression;
    return factory.createPropertyAccessExpression(importManager.addImport({
        exportModuleSpecifier: '@angular/core',
        exportSymbolName: null,
        requestedFile: sourceFile,
    }), 
    // The synthetic identifier may be checked later by the downlevel decorators
    // transform to resolve to an Angular import using `getSymbolAtLocation`. We trick
    // the transform to think it's not synthetic and comes from Angular core.
    typescript_1.default.setOriginalNode(factory.createIdentifier(decoratorName), classDecoratorIdentifier));
}
/** Casts the given expression as `any`. */
function castAsAny(factory, expr) {
    return factory.createAsExpression(expr, factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
}
