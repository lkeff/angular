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
exports.DocsExtractor = void 0;
const typescript_1 = __importDefault(require("typescript"));
const reflection_1 = require("../../reflection");
const class_extractor_1 = require("./class_extractor");
const constant_extractor_1 = require("./constant_extractor");
const decorator_extractor_1 = require("./decorator_extractor");
const enum_extractor_1 = require("./enum_extractor");
const filters_1 = require("./filters");
const function_extractor_1 = require("./function_extractor");
const initializer_api_function_extractor_1 = require("./initializer_api_function_extractor");
const type_alias_extractor_1 = require("./type_alias_extractor");
const import_extractor_1 = require("./import_extractor");
/**
 * Extracts all information from a source file that may be relevant for generating
 * public API documentation.
 */
class DocsExtractor {
    constructor(typeChecker, metadataReader) {
        this.typeChecker = typeChecker;
        this.metadataReader = metadataReader;
    }
    /**
     * Gets the set of all documentable entries from a source file, including
     * declarations that are re-exported from this file as an entry-point.
     *
     * @param sourceFile The file from which to extract documentable entries.
     */
    extractAll(sourceFile, rootDir, privateModules) {
        const entries = [];
        const symbols = new Map();
        const exportedDeclarations = this.getExportedDeclarations(sourceFile);
        for (const [exportName, node] of exportedDeclarations) {
            // Skip any symbols with an Angular-internal name.
            if ((0, filters_1.isAngularPrivateName)(exportName)) {
                continue;
            }
            const entry = this.extractDeclaration(node);
            if (entry && !isIgnoredDocEntry(entry)) {
                // The source file parameter is the package entry: the index.ts
                // We want the real source file of the declaration.
                const realSourceFile = node.getSourceFile();
                /**
                 * The `sourceFile` from `extractAll` is the main entry-point file of a package.
                 * Usually following a format like `export * from './public_api';`, simply re-exporting.
                 * It is necessary to pick-up every import from the actual source files
                 * where declarations are living, so that we can determine what symbols
                 * are actually referenced in the context of that particular declaration
                 * By doing this, the generation remains independent from other packages
                 */
                const importedSymbols = (0, import_extractor_1.getImportedSymbols)(realSourceFile);
                importedSymbols.forEach((moduleName, symbolName) => {
                    if (symbolName.startsWith('ɵ') || privateModules.has(moduleName)) {
                        return;
                    }
                    if (symbols.has(symbolName) && symbols.get(symbolName) !== moduleName) {
                        // If this ever throws, we need to improve the symbol extraction strategy
                        throw new Error(`Ambigous symbol \`${symbolName}\` exported by both ${symbols.get(symbolName)} & ${moduleName}`);
                    }
                    symbols.set(symbolName, moduleName);
                });
                // Set the source code references for the extracted entry.
                entry.source = {
                    filePath: getRelativeFilePath(realSourceFile, rootDir),
                    // Start & End are off by 1
                    startLine: typescript_1.default.getLineAndCharacterOfPosition(realSourceFile, node.getStart()).line + 1,
                    endLine: typescript_1.default.getLineAndCharacterOfPosition(realSourceFile, node.getEnd()).line + 1,
                };
                // The exported name of an API may be different from its declaration name, so
                // use the declaration name.
                entries.push(Object.assign(Object.assign({}, entry), { name: exportName }));
            }
        }
        return { entries, symbols };
    }
    /** Extract the doc entry for a single declaration. */
    extractDeclaration(node) {
        // Ignore anonymous classes.
        if ((0, reflection_1.isNamedClassDeclaration)(node)) {
            return (0, class_extractor_1.extractClass)(node, this.metadataReader, this.typeChecker);
        }
        if ((0, initializer_api_function_extractor_1.isInitializerApiFunction)(node, this.typeChecker)) {
            return (0, initializer_api_function_extractor_1.extractInitializerApiFunction)(node, this.typeChecker);
        }
        if (typescript_1.default.isInterfaceDeclaration(node) && !isIgnoredInterface(node)) {
            return (0, class_extractor_1.extractInterface)(node, this.typeChecker);
        }
        if (typescript_1.default.isFunctionDeclaration(node)) {
            // Name is guaranteed to be set, because it's exported directly.
            const functionExtractor = new function_extractor_1.FunctionExtractor(node.name.getText(), node, this.typeChecker);
            return functionExtractor.extract();
        }
        if (typescript_1.default.isVariableDeclaration(node) && !(0, constant_extractor_1.isSyntheticAngularConstant)(node)) {
            return (0, decorator_extractor_1.isDecoratorDeclaration)(node)
                ? (0, decorator_extractor_1.extractorDecorator)(node, this.typeChecker)
                : (0, constant_extractor_1.extractConstant)(node, this.typeChecker);
        }
        if (typescript_1.default.isTypeAliasDeclaration(node)) {
            return (0, type_alias_extractor_1.extractTypeAlias)(node);
        }
        if (typescript_1.default.isEnumDeclaration(node)) {
            return (0, enum_extractor_1.extractEnum)(node, this.typeChecker);
        }
        return null;
    }
    /** Gets the list of exported declarations for doc extraction. */
    getExportedDeclarations(sourceFile) {
        var _a;
        // Use the reflection host to get all the exported declarations from this
        // source file entry point.
        const reflector = new reflection_1.TypeScriptReflectionHost(this.typeChecker, false, true);
        const exportedDeclarationMap = reflector.getExportsOfModule(sourceFile);
        // Augment each declaration with the exported name in the public API.
        let exportedDeclarations = Array.from((_a = exportedDeclarationMap === null || exportedDeclarationMap === void 0 ? void 0 : exportedDeclarationMap.entries()) !== null && _a !== void 0 ? _a : []).map(([exportName, declaration]) => [exportName, declaration.node]);
        // Sort the declaration nodes into declaration position because their order is lost in
        // reading from the export map. This is primarily useful for testing and debugging.
        return exportedDeclarations.sort(([a, declarationA], [b, declarationB]) => declarationA.pos - declarationB.pos);
    }
}
exports.DocsExtractor = DocsExtractor;
/** Gets whether an interface should be ignored for docs extraction. */
function isIgnoredInterface(node) {
    // We filter out all interfaces that end with "Decorator" because we capture their
    // types as part of the main decorator entry (which are declared as constants).
    // This approach to dealing with decorators is admittedly fuzzy, but this aspect of
    // the framework's source code is unlikely to change. We also filter out the interfaces
    // that contain the decorator options.
    return node.name.getText().endsWith('Decorator') || (0, decorator_extractor_1.isDecoratorOptionsInterface)(node);
}
/**
 * Whether the doc entry should be ignored.
 *
 * Note: We cannot check whether a node is marked as docs private
 * before extraction because the extractor may find the attached
 * JSDoc tags on different AST nodes. For example, a variable declaration
 * never has JSDoc tags attached, but rather the parent variable statement.
 */
function isIgnoredDocEntry(entry) {
    const isDocsPrivate = entry.jsdocTags.find((e) => e.name === 'docsPrivate');
    if (isDocsPrivate !== undefined && isDocsPrivate.comment === '') {
        throw new Error(`Docs extraction: Entry "${entry.name}" is marked as ` +
            `"@docsPrivate" but without reasoning.`);
    }
    return isDocsPrivate !== undefined;
}
function getRelativeFilePath(sourceFile, rootDir) {
    const fullPath = sourceFile.fileName;
    const relativePath = fullPath.replace(rootDir, '');
    return relativePath;
}
