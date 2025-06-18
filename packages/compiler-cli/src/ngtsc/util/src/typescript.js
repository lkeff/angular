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
exports.isSymbolWithValueDeclaration = isSymbolWithValueDeclaration;
exports.isDtsPath = isDtsPath;
exports.isNonDeclarationTsPath = isNonDeclarationTsPath;
exports.isFromDtsFile = isFromDtsFile;
exports.nodeNameForError = nodeNameForError;
exports.getSourceFile = getSourceFile;
exports.getSourceFileOrNull = getSourceFileOrNull;
exports.getTokenAtPosition = getTokenAtPosition;
exports.identifierOfNode = identifierOfNode;
exports.isDeclaration = isDeclaration;
exports.isValueDeclaration = isValueDeclaration;
exports.isTypeDeclaration = isTypeDeclaration;
exports.isNamedDeclaration = isNamedDeclaration;
exports.isExported = isExported;
exports.getRootDirs = getRootDirs;
exports.nodeDebugInfo = nodeDebugInfo;
exports.resolveModuleName = resolveModuleName;
exports.isAssignment = isAssignment;
exports.toUnredirectedSourceFile = toUnredirectedSourceFile;
const TS = /\.tsx?$/i;
const D_TS = /\.d\.ts$/i;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
function isSymbolWithValueDeclaration(symbol) {
    // If there is a value declaration set, then the `declarations` property is never undefined. We
    // still check for the property to exist as this matches with the type that `symbol` is narrowed
    // to.
    return (symbol != null && symbol.valueDeclaration !== undefined && symbol.declarations !== undefined);
}
function isDtsPath(filePath) {
    return D_TS.test(filePath);
}
function isNonDeclarationTsPath(filePath) {
    return TS.test(filePath) && !D_TS.test(filePath);
}
function isFromDtsFile(node) {
    let sf = node.getSourceFile();
    if (sf === undefined) {
        sf = typescript_1.default.getOriginalNode(node).getSourceFile();
    }
    return sf !== undefined && sf.isDeclarationFile;
}
function nodeNameForError(node) {
    if (node.name !== undefined && typescript_1.default.isIdentifier(node.name)) {
        return node.name.text;
    }
    else {
        const kind = typescript_1.default.SyntaxKind[node.kind];
        const { line, character } = typescript_1.default.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart());
        return `${kind}@${line}:${character}`;
    }
}
function getSourceFile(node) {
    // In certain transformation contexts, `ts.Node.getSourceFile()` can actually return `undefined`,
    // despite the type signature not allowing it. In that event, get the `ts.SourceFile` via the
    // original node instead (which works).
    const directSf = node.getSourceFile();
    return directSf !== undefined ? directSf : typescript_1.default.getOriginalNode(node).getSourceFile();
}
function getSourceFileOrNull(program, fileName) {
    return program.getSourceFile(fileName) || null;
}
function getTokenAtPosition(sf, pos) {
    // getTokenAtPosition is part of TypeScript's private API.
    return typescript_1.default.getTokenAtPosition(sf, pos);
}
function identifierOfNode(decl) {
    if (decl.name !== undefined && typescript_1.default.isIdentifier(decl.name)) {
        return decl.name;
    }
    else {
        return null;
    }
}
function isDeclaration(node) {
    return isValueDeclaration(node) || isTypeDeclaration(node);
}
function isValueDeclaration(node) {
    return (typescript_1.default.isClassDeclaration(node) || typescript_1.default.isFunctionDeclaration(node) || typescript_1.default.isVariableDeclaration(node));
}
function isTypeDeclaration(node) {
    return (typescript_1.default.isEnumDeclaration(node) || typescript_1.default.isTypeAliasDeclaration(node) || typescript_1.default.isInterfaceDeclaration(node));
}
function isNamedDeclaration(node) {
    const namedNode = node;
    return namedNode.name !== undefined && typescript_1.default.isIdentifier(namedNode.name);
}
function isExported(node) {
    let topLevel = node;
    if (typescript_1.default.isVariableDeclaration(node) && typescript_1.default.isVariableDeclarationList(node.parent)) {
        topLevel = node.parent.parent;
    }
    const modifiers = typescript_1.default.canHaveModifiers(topLevel) ? typescript_1.default.getModifiers(topLevel) : undefined;
    return (modifiers !== undefined &&
        modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.ExportKeyword));
}
function getRootDirs(host, options) {
    const rootDirs = [];
    const cwd = host.getCurrentDirectory();
    const fs = (0, file_system_1.getFileSystem)();
    if (options.rootDirs !== undefined) {
        rootDirs.push(...options.rootDirs);
    }
    else if (options.rootDir !== undefined) {
        rootDirs.push(options.rootDir);
    }
    else {
        rootDirs.push(cwd);
    }
    // In Windows the above might not always return posix separated paths
    // See:
    // https://github.com/Microsoft/TypeScript/blob/3f7357d37f66c842d70d835bc925ec2a873ecfec/src/compiler/sys.ts#L650
    // Also compiler options might be set via an API which doesn't normalize paths
    return rootDirs.map((rootDir) => fs.resolve(cwd, host.getCanonicalFileName(rootDir)));
}
function nodeDebugInfo(node) {
    const sf = getSourceFile(node);
    const { line, character } = typescript_1.default.getLineAndCharacterOfPosition(sf, node.pos);
    return `[${sf.fileName}: ${typescript_1.default.SyntaxKind[node.kind]} @ ${line}:${character}]`;
}
/**
 * Resolve the specified `moduleName` using the given `compilerOptions` and `compilerHost`.
 *
 * This helper will attempt to use the `CompilerHost.resolveModuleNames()` method if available.
 * Otherwise it will fallback on the `ts.ResolveModuleName()` function.
 */
function resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost, moduleResolutionCache) {
    if (compilerHost.resolveModuleNames) {
        return compilerHost.resolveModuleNames([moduleName], containingFile, undefined, // reusedNames
        undefined, // redirectedReference
        compilerOptions)[0];
    }
    else {
        return typescript_1.default.resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost, moduleResolutionCache !== null ? moduleResolutionCache : undefined).resolvedModule;
    }
}
/** Returns true if the node is an assignment expression. */
function isAssignment(node) {
    return typescript_1.default.isBinaryExpression(node) && node.operatorToken.kind === typescript_1.default.SyntaxKind.EqualsToken;
}
/**
 * Obtains the non-redirected source file for `sf`.
 */
function toUnredirectedSourceFile(sf) {
    const redirectInfo = sf.redirectInfo;
    if (redirectInfo === undefined) {
        return sf;
    }
    return redirectInfo.unredirected;
}
