"use strict";
/*!
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
exports.getHmrUpdateDeclaration = getHmrUpdateDeclaration;
const compiler_1 = require("@angular/compiler");
const translator_1 = require("../../translator");
const typescript_1 = __importDefault(require("typescript"));
/**
 * Gets the declaration for the function that replaces the metadata of a class during HMR.
 * @param compilationResults Code generated for the class during compilation.
 * @param meta HMR metadata about the class.
 * @param declaration Class for which the update declaration is being generated.
 */
function getHmrUpdateDeclaration(compilationResults, constantStatements, meta, declaration) {
    const namespaceSpecifiers = meta.namespaceDependencies.reduce((result, current) => {
        result.set(current.moduleName, current.assignedName);
        return result;
    }, new Map());
    const importRewriter = new HmrModuleImportRewriter(namespaceSpecifiers);
    const importManager = new translator_1.ImportManager(Object.assign(Object.assign({}, translator_1.presetImportManagerForceNamespaceImports), { rewriter: importRewriter }));
    const callback = (0, compiler_1.compileHmrUpdateCallback)(compilationResults, constantStatements, meta);
    const sourceFile = typescript_1.default.getOriginalNode(declaration).getSourceFile();
    const node = (0, translator_1.translateStatement)(sourceFile, callback, importManager);
    // The output AST doesn't support modifiers so we have to emit to
    // TS and then update the declaration to add `export default`.
    return typescript_1.default.factory.updateFunctionDeclaration(node, [
        typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.ExportKeyword),
        typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.DefaultKeyword),
    ], node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body);
}
class HmrModuleImportRewriter {
    constructor(lookup) {
        this.lookup = lookup;
    }
    rewriteNamespaceImportIdentifier(specifier, moduleName) {
        return this.lookup.has(moduleName) ? this.lookup.get(moduleName) : specifier;
    }
    rewriteSymbol(symbol) {
        return symbol;
    }
    rewriteSpecifier(specifier) {
        return specifier;
    }
}
