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
exports.ReferenceResolver = exports.UniqueItemTracker = void 0;
exports.getNodeLookup = getNodeLookup;
exports.offsetsToNodes = offsetsToNodes;
exports.findClassDeclaration = findClassDeclaration;
exports.findLiteralProperty = findLiteralProperty;
exports.getRelativeImportPath = getRelativeImportPath;
exports.knownInternalAliasRemapper = knownInternalAliasRemapper;
exports.closestOrSelf = closestOrSelf;
exports.isClassReferenceInAngularModule = isClassReferenceInAngularModule;
exports.getTestingImports = getTestingImports;
exports.isTestCall = isTestCall;
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const nodes_1 = require("../../utils/typescript/nodes");
const symbol_1 = require("../../utils/typescript/symbol");
const imports_1 = require("../../utils/typescript/imports");
/** Utility class used to track a one-to-many relationship where all the items are unique. */
class UniqueItemTracker {
    constructor() {
        this._nodes = new Map();
    }
    track(key, item) {
        const set = this._nodes.get(key);
        if (set) {
            set.add(item);
        }
        else {
            this._nodes.set(key, new Set([item]));
        }
    }
    get(key) {
        return this._nodes.get(key);
    }
    getEntries() {
        return this._nodes.entries();
    }
    isEmpty() {
        return this._nodes.size === 0;
    }
}
exports.UniqueItemTracker = UniqueItemTracker;
/** Resolves references to nodes. */
class ReferenceResolver {
    constructor(_program, _host, _rootFileNames, _basePath, _excludedFiles) {
        this._program = _program;
        this._host = _host;
        this._rootFileNames = _rootFileNames;
        this._basePath = _basePath;
        this._excludedFiles = _excludedFiles;
        /**
         * If set, allows the language service to *only* read a specific file.
         * Used to speed up single-file lookups.
         */
        this._tempOnlyFile = null;
    }
    /** Finds all references to a node within the entire project. */
    findReferencesInProject(node) {
        const languageService = this._getLanguageService();
        const fileName = node.getSourceFile().fileName;
        const start = node.getStart();
        let referencedSymbols;
        // The language service can throw if it fails to read a file.
        // Silently continue since we're making the lookup on a best effort basis.
        try {
            referencedSymbols = languageService.findReferences(fileName, start) || [];
        }
        catch (e) {
            console.error('Failed reference lookup for node ' + node.getText(), e.message);
            referencedSymbols = [];
        }
        const results = new Map();
        for (const symbol of referencedSymbols) {
            for (const ref of symbol.references) {
                if (!ref.isDefinition || symbol.definition.kind === typescript_1.default.ScriptElementKind.alias) {
                    if (!results.has(ref.fileName)) {
                        results.set(ref.fileName, []);
                    }
                    results
                        .get(ref.fileName)
                        .push([ref.textSpan.start, ref.textSpan.start + ref.textSpan.length]);
                }
            }
        }
        return results;
    }
    /** Finds all references to a node within a single file. */
    findSameFileReferences(node, fileName) {
        // Even though we're only passing in a single file into `getDocumentHighlights`, the language
        // service ends up traversing the entire project. Prevent it from reading any files aside from
        // the one we're interested in by intercepting it at the compiler host level.
        // This is an order of magnitude faster on a large project.
        this._tempOnlyFile = fileName;
        const nodeStart = node.getStart();
        const results = [];
        let highlights;
        // The language service can throw if it fails to read a file.
        // Silently continue since we're making the lookup on a best effort basis.
        try {
            highlights = this._getLanguageService().getDocumentHighlights(fileName, nodeStart, [
                fileName,
            ]);
        }
        catch (e) {
            console.error('Failed reference lookup for node ' + node.getText(), e.message);
        }
        if (highlights) {
            for (const file of highlights) {
                // We are pretty much guaranteed to only have one match from the current file since it is
                // the only one being passed in `getDocumentHighlight`, but we check here just in case.
                if (file.fileName === fileName) {
                    for (const { textSpan: { start, length }, kind, } of file.highlightSpans) {
                        if (kind !== typescript_1.default.HighlightSpanKind.none) {
                            results.push([start, start + length]);
                        }
                    }
                }
            }
        }
        // Restore full project access to the language service.
        this._tempOnlyFile = null;
        return results;
    }
    /** Used by the language service  */
    _readFile(path) {
        var _a;
        if ((this._tempOnlyFile !== null && path !== this._tempOnlyFile) ||
            ((_a = this._excludedFiles) === null || _a === void 0 ? void 0 : _a.test(path))) {
            return '';
        }
        return this._host.readFile(path);
    }
    /** Gets a language service that can be used to perform lookups. */
    _getLanguageService() {
        if (!this._languageService) {
            const rootFileNames = this._rootFileNames.slice();
            this._program
                .getTsProgram()
                .getSourceFiles()
                .forEach(({ fileName }) => {
                var _a;
                if (!((_a = this._excludedFiles) === null || _a === void 0 ? void 0 : _a.test(fileName)) && !rootFileNames.includes(fileName)) {
                    rootFileNames.push(fileName);
                }
            });
            this._languageService = typescript_1.default.createLanguageService({
                getCompilationSettings: () => this._program.getTsProgram().getCompilerOptions(),
                getScriptFileNames: () => rootFileNames,
                // The files won't change so we can return the same version.
                getScriptVersion: () => '0',
                getScriptSnapshot: (path) => {
                    const content = this._readFile(path);
                    return content ? typescript_1.default.ScriptSnapshot.fromString(content) : undefined;
                },
                getCurrentDirectory: () => this._basePath,
                getDefaultLibFileName: (options) => typescript_1.default.getDefaultLibFilePath(options),
                readFile: (path) => this._readFile(path),
                fileExists: (path) => this._host.fileExists(path),
            }, typescript_1.default.createDocumentRegistry(), typescript_1.default.LanguageServiceMode.PartialSemantic);
        }
        return this._languageService;
    }
}
exports.ReferenceResolver = ReferenceResolver;
/** Creates a NodeLookup object from a source file. */
function getNodeLookup(sourceFile) {
    const lookup = new Map();
    sourceFile.forEachChild(function walk(node) {
        const nodesAtStart = lookup.get(node.getStart());
        if (nodesAtStart) {
            nodesAtStart.push(node);
        }
        else {
            lookup.set(node.getStart(), [node]);
        }
        node.forEachChild(walk);
    });
    return lookup;
}
/**
 * Converts node offsets to the nodes they correspond to.
 * @param lookup Data structure used to look up nodes at particular positions.
 * @param offsets Offsets of the nodes.
 * @param results Set in which to store the results.
 */
function offsetsToNodes(lookup, offsets, results) {
    var _a;
    for (const [start, end] of offsets) {
        const match = (_a = lookup.get(start)) === null || _a === void 0 ? void 0 : _a.find((node) => node.getEnd() === end);
        if (match) {
            results.add(match);
        }
    }
    return results;
}
/**
 * Finds the class declaration that is being referred to by a node.
 * @param reference Node referring to a class declaration.
 * @param typeChecker
 */
function findClassDeclaration(reference, typeChecker) {
    var _a, _b;
    return (((_b = (_a = typeChecker
        .getTypeAtLocation(reference)
        .getSymbol()) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b.find(typescript_1.default.isClassDeclaration)) || null);
}
/** Finds a property with a specific name in an object literal expression. */
function findLiteralProperty(literal, name) {
    return literal.properties.find((prop) => prop.name && typescript_1.default.isIdentifier(prop.name) && prop.name.text === name);
}
/** Gets a relative path between two files that can be used inside a TypeScript import. */
function getRelativeImportPath(fromFile, toFile) {
    let path = (0, path_1.relative)((0, path_1.dirname)(fromFile), toFile).replace(/\.ts$/, '');
    // `relative` returns paths inside the same directory without `./`
    if (!path.startsWith('.')) {
        path = './' + path;
    }
    // Using the Node utilities can yield paths with forward slashes on Windows.
    return (0, change_tracker_1.normalizePath)(path);
}
/** Function used to remap the generated `imports` for a component to known shorter aliases. */
function knownInternalAliasRemapper(imports) {
    return imports.map((current) => current.moduleSpecifier === '@angular/common' && current.symbolName === 'NgForOf'
        ? Object.assign(Object.assign({}, current), { symbolName: 'NgFor' }) : current);
}
/**
 * Gets the closest node that matches a predicate, including the node that the search started from.
 * @param node Node from which to start the search.
 * @param predicate Predicate that the result needs to pass.
 */
function closestOrSelf(node, predicate) {
    return predicate(node) ? node : (0, nodes_1.closestNode)(node, predicate);
}
/**
 * Checks whether a node is referring to a specific class declaration.
 * @param node Node that is being checked.
 * @param className Name of the class that the node might be referring to.
 * @param moduleName Name of the Angular module that should contain the class.
 * @param typeChecker
 */
function isClassReferenceInAngularModule(node, className, moduleName, typeChecker) {
    var _a;
    const symbol = typeChecker.getTypeAtLocation(node).getSymbol();
    const externalName = `@angular/${moduleName}`;
    const internalName = `angular2/rc/packages/${moduleName}`;
    return !!((_a = symbol === null || symbol === void 0 ? void 0 : symbol.declarations) === null || _a === void 0 ? void 0 : _a.some((decl) => {
        const closestClass = closestOrSelf(decl, typescript_1.default.isClassDeclaration);
        const closestClassFileName = closestClass === null || closestClass === void 0 ? void 0 : closestClass.getSourceFile().fileName;
        if (!closestClass ||
            !closestClassFileName ||
            !closestClass.name ||
            !typescript_1.default.isIdentifier(closestClass.name) ||
            (!closestClassFileName.includes(externalName) && !closestClassFileName.includes(internalName))) {
            return false;
        }
        return typeof className === 'string'
            ? closestClass.name.text === className
            : className.test(closestClass.name.text);
    }));
}
/**
 * Finds the imports of testing libraries in a file.
 */
function getTestingImports(sourceFile) {
    return {
        testBed: (0, imports_1.getImportSpecifier)(sourceFile, '@angular/core/testing', 'TestBed'),
        catalyst: (0, imports_1.getImportSpecifier)(sourceFile, /testing\/catalyst(\/(fake_)?async)?$/, 'setupModule'),
    };
}
/**
 * Determines if a node is a call to a testing API.
 * @param typeChecker Type checker to use when resolving references.
 * @param node Node to check.
 * @param testBedImport Import of TestBed within the file.
 * @param catalystImport Import of Catalyst within the file.
 */
function isTestCall(typeChecker, node, testBedImport, catalystImport) {
    const isObjectLiteralCall = typescript_1.default.isCallExpression(node) &&
        node.arguments.length > 0 &&
        // `arguments[0]` is the testing module config.
        typescript_1.default.isObjectLiteralExpression(node.arguments[0]);
    const isTestBedCall = isObjectLiteralCall &&
        testBedImport &&
        typescript_1.default.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'configureTestingModule' &&
        (0, symbol_1.isReferenceToImport)(typeChecker, node.expression.expression, testBedImport);
    const isCatalystCall = isObjectLiteralCall &&
        catalystImport &&
        typescript_1.default.isIdentifier(node.expression) &&
        (0, symbol_1.isReferenceToImport)(typeChecker, node.expression, catalystImport);
    return !!(isTestBedCall || isCatalystCall);
}
