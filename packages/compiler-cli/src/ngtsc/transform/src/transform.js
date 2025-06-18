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
exports.ivyTransformFactory = ivyTransformFactory;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const default_1 = require("../../imports/src/default");
const perf_1 = require("../../perf");
const translator_1 = require("../../translator");
const visitor_1 = require("../../util/src/visitor");
const NO_DECORATORS = new Set();
const CLOSURE_FILE_OVERVIEW_REGEXP = /\s+@fileoverview\s+/i;
function ivyTransformFactory(compilation, reflector, importRewriter, defaultImportTracker, localCompilationExtraImportsTracker, perf, isCore, isClosureCompilerEnabled) {
    const recordWrappedNode = createRecorderFn(defaultImportTracker);
    return (context) => {
        return (file) => {
            return perf.inPhase(perf_1.PerfPhase.Compile, () => transformIvySourceFile(compilation, context, reflector, importRewriter, localCompilationExtraImportsTracker, file, isCore, isClosureCompilerEnabled, recordWrappedNode));
        };
    };
}
/**
 * Visits all classes, performs Ivy compilation where Angular decorators are present and collects
 * result in a Map that associates a ts.ClassDeclaration with Ivy compilation results. This visitor
 * does NOT perform any TS transformations.
 */
class IvyCompilationVisitor extends visitor_1.Visitor {
    constructor(compilation, constantPool) {
        super();
        this.compilation = compilation;
        this.constantPool = constantPool;
        this.classCompilationMap = new Map();
        this.deferrableImports = new Set();
    }
    visitClassDeclaration(node) {
        // Determine if this class has an Ivy field that needs to be added, and compile the field
        // to an expression if so.
        const result = this.compilation.compile(node, this.constantPool);
        if (result !== null) {
            this.classCompilationMap.set(node, result);
            // Collect all deferrable imports declarations into a single set,
            // so that we can pass it to the transform visitor that will drop
            // corresponding regular import declarations.
            for (const classResult of result) {
                if (classResult.deferrableImports !== null && classResult.deferrableImports.size > 0) {
                    classResult.deferrableImports.forEach((importDecl) => this.deferrableImports.add(importDecl));
                }
            }
        }
        return { node };
    }
}
/**
 * Visits all classes and performs transformation of corresponding TS nodes based on the Ivy
 * compilation results (provided as an argument).
 */
class IvyTransformationVisitor extends visitor_1.Visitor {
    constructor(compilation, classCompilationMap, reflector, importManager, recordWrappedNodeExpr, isClosureCompilerEnabled, isCore, deferrableImports) {
        super();
        this.compilation = compilation;
        this.classCompilationMap = classCompilationMap;
        this.reflector = reflector;
        this.importManager = importManager;
        this.recordWrappedNodeExpr = recordWrappedNodeExpr;
        this.isClosureCompilerEnabled = isClosureCompilerEnabled;
        this.isCore = isCore;
        this.deferrableImports = deferrableImports;
    }
    visitClassDeclaration(node) {
        // If this class is not registered in the map, it means that it doesn't have Angular decorators,
        // thus no further processing is required.
        if (!this.classCompilationMap.has(node)) {
            return { node };
        }
        const translateOptions = {
            recordWrappedNode: this.recordWrappedNodeExpr,
            annotateForClosureCompiler: this.isClosureCompilerEnabled,
        };
        // There is at least one field to add.
        const statements = [];
        const members = [...node.members];
        // Note: Class may be already transformed by e.g. Tsickle and
        // not have a direct reference to the source file.
        const sourceFile = typescript_1.default.getOriginalNode(node).getSourceFile();
        for (const field of this.classCompilationMap.get(node)) {
            // Type-only member.
            if (field.initializer === null) {
                continue;
            }
            // Translate the initializer for the field into TS nodes.
            const exprNode = (0, translator_1.translateExpression)(sourceFile, field.initializer, this.importManager, translateOptions);
            // Create a static property declaration for the new field.
            const property = typescript_1.default.factory.createPropertyDeclaration([typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.StaticKeyword)], field.name, undefined, undefined, exprNode);
            if (this.isClosureCompilerEnabled) {
                // Closure compiler transforms the form `Service.ɵprov = X` into `Service$ɵprov = X`. To
                // prevent this transformation, such assignments need to be annotated with @nocollapse.
                // Note that tsickle is typically responsible for adding such annotations, however it
                // doesn't yet handle synthetic fields added during other transformations.
                typescript_1.default.addSyntheticLeadingComment(property, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, '* @nocollapse ', 
                /* hasTrailingNewLine */ false);
            }
            field.statements
                .map((stmt) => (0, translator_1.translateStatement)(sourceFile, stmt, this.importManager, translateOptions))
                .forEach((stmt) => statements.push(stmt));
            members.push(property);
        }
        const filteredDecorators = 
        // Remove the decorator which triggered this compilation, leaving the others alone.
        maybeFilterDecorator(typescript_1.default.getDecorators(node), this.compilation.decoratorsFor(node));
        const nodeModifiers = typescript_1.default.getModifiers(node);
        let updatedModifiers;
        if ((filteredDecorators === null || filteredDecorators === void 0 ? void 0 : filteredDecorators.length) || (nodeModifiers === null || nodeModifiers === void 0 ? void 0 : nodeModifiers.length)) {
            updatedModifiers = [...(filteredDecorators || []), ...(nodeModifiers || [])];
        }
        // Replace the class declaration with an updated version.
        node = typescript_1.default.factory.updateClassDeclaration(node, updatedModifiers, node.name, node.typeParameters, node.heritageClauses || [], 
        // Map over the class members and remove any Angular decorators from them.
        members.map((member) => this._stripAngularDecorators(member)));
        return { node, after: statements };
    }
    visitOtherNode(node) {
        if (typescript_1.default.isImportDeclaration(node) && this.deferrableImports.has(node)) {
            // Return `null` as an indication that this node should not be present
            // in the final AST. Symbols from this import would be imported via
            // dynamic imports.
            return null;
        }
        return node;
    }
    /**
     * Return all decorators on a `Declaration` which are from @angular/core, or an empty set if none
     * are.
     */
    _angularCoreDecorators(decl) {
        const decorators = this.reflector.getDecoratorsOfDeclaration(decl);
        if (decorators === null) {
            return NO_DECORATORS;
        }
        const coreDecorators = decorators
            .filter((dec) => this.isCore || isFromAngularCore(dec))
            .map((dec) => dec.node);
        if (coreDecorators.length > 0) {
            return new Set(coreDecorators);
        }
        else {
            return NO_DECORATORS;
        }
    }
    _nonCoreDecoratorsOnly(node) {
        const decorators = typescript_1.default.getDecorators(node);
        // Shortcut if the node has no decorators.
        if (decorators === undefined) {
            return undefined;
        }
        // Build a Set of the decorators on this node from @angular/core.
        const coreDecorators = this._angularCoreDecorators(node);
        if (coreDecorators.size === decorators.length) {
            // If all decorators are to be removed, return `undefined`.
            return undefined;
        }
        else if (coreDecorators.size === 0) {
            // If no decorators need to be removed, return the original decorators array.
            return nodeArrayFromDecoratorsArray(decorators);
        }
        // Filter out the core decorators.
        const filtered = decorators.filter((dec) => !coreDecorators.has(dec));
        // If no decorators survive, return `undefined`. This can only happen if a core decorator is
        // repeated on the node.
        if (filtered.length === 0) {
            return undefined;
        }
        // Create a new `NodeArray` with the filtered decorators that sourcemaps back to the original.
        return nodeArrayFromDecoratorsArray(filtered);
    }
    /**
     * Remove Angular decorators from a `ts.Node` in a shallow manner.
     *
     * This will remove decorators from class elements (getters, setters, properties, methods) as well
     * as parameters of constructors.
     */
    _stripAngularDecorators(node) {
        const modifiers = typescript_1.default.canHaveModifiers(node) ? typescript_1.default.getModifiers(node) : undefined;
        const nonCoreDecorators = typescript_1.default.canHaveDecorators(node)
            ? this._nonCoreDecoratorsOnly(node)
            : undefined;
        const combinedModifiers = [...(nonCoreDecorators || []), ...(modifiers || [])];
        if (typescript_1.default.isParameter(node)) {
            // Strip decorators from parameters (probably of the constructor).
            node = typescript_1.default.factory.updateParameterDeclaration(node, combinedModifiers, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer);
        }
        else if (typescript_1.default.isMethodDeclaration(node)) {
            // Strip decorators of methods.
            node = typescript_1.default.factory.updateMethodDeclaration(node, combinedModifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
        }
        else if (typescript_1.default.isPropertyDeclaration(node)) {
            // Strip decorators of properties.
            node = typescript_1.default.factory.updatePropertyDeclaration(node, combinedModifiers, node.name, node.questionToken, node.type, node.initializer);
        }
        else if (typescript_1.default.isGetAccessor(node)) {
            // Strip decorators of getters.
            node = typescript_1.default.factory.updateGetAccessorDeclaration(node, combinedModifiers, node.name, node.parameters, node.type, node.body);
        }
        else if (typescript_1.default.isSetAccessor(node)) {
            // Strip decorators of setters.
            node = typescript_1.default.factory.updateSetAccessorDeclaration(node, combinedModifiers, node.name, node.parameters, node.body);
        }
        else if (typescript_1.default.isConstructorDeclaration(node)) {
            // For constructors, strip decorators of the parameters.
            const parameters = node.parameters.map((param) => this._stripAngularDecorators(param));
            node = typescript_1.default.factory.updateConstructorDeclaration(node, modifiers, parameters, node.body);
        }
        return node;
    }
}
/**
 * A transformer which operates on ts.SourceFiles and applies changes from an `IvyCompilation`.
 */
function transformIvySourceFile(compilation, context, reflector, importRewriter, localCompilationExtraImportsTracker, file, isCore, isClosureCompilerEnabled, recordWrappedNode) {
    const constantPool = new compiler_1.ConstantPool(isClosureCompilerEnabled);
    const importManager = new translator_1.ImportManager(Object.assign(Object.assign({}, translator_1.presetImportManagerForceNamespaceImports), { rewriter: importRewriter }));
    // The transformation process consists of 2 steps:
    //
    //  1. Visit all classes, perform compilation and collect the results.
    //  2. Perform actual transformation of required TS nodes using compilation results from the first
    //     step.
    //
    // This is needed to have all `o.Expression`s generated before any TS transforms happen. This
    // allows `ConstantPool` to properly identify expressions that can be shared across multiple
    // components declared in the same file.
    // Step 1. Go though all classes in AST, perform compilation and collect the results.
    const compilationVisitor = new IvyCompilationVisitor(compilation, constantPool);
    (0, visitor_1.visit)(file, compilationVisitor, context);
    // Step 2. Scan through the AST again and perform transformations based on Ivy compilation
    // results obtained at Step 1.
    const transformationVisitor = new IvyTransformationVisitor(compilation, compilationVisitor.classCompilationMap, reflector, importManager, recordWrappedNode, isClosureCompilerEnabled, isCore, compilationVisitor.deferrableImports);
    let sf = (0, visitor_1.visit)(file, transformationVisitor, context);
    // Generate the constant statements first, as they may involve adding additional imports
    // to the ImportManager.
    const downlevelTranslatedCode = getLocalizeCompileTarget(context) < typescript_1.default.ScriptTarget.ES2015;
    const constants = constantPool.statements.map((stmt) => (0, translator_1.translateStatement)(file, stmt, importManager, {
        recordWrappedNode,
        downlevelTaggedTemplates: downlevelTranslatedCode,
        downlevelVariableDeclarations: downlevelTranslatedCode,
        annotateForClosureCompiler: isClosureCompilerEnabled,
    }));
    // Preserve @fileoverview comments required by Closure, since the location might change as a
    // result of adding extra imports and constant pool statements.
    const fileOverviewMeta = isClosureCompilerEnabled ? getFileOverviewComment(sf.statements) : null;
    // Add extra imports.
    if (localCompilationExtraImportsTracker !== null) {
        for (const moduleName of localCompilationExtraImportsTracker.getImportsForFile(sf)) {
            importManager.addSideEffectImport(sf, moduleName);
        }
    }
    // Add new imports for this file.
    sf = importManager.transformTsFile(context, sf, constants);
    if (fileOverviewMeta !== null) {
        sf = insertFileOverviewComment(sf, fileOverviewMeta);
    }
    return sf;
}
/**
 * Compute the correct target output for `$localize` messages generated by Angular
 *
 * In some versions of TypeScript, the transformation of synthetic `$localize` tagged template
 * literals is broken. See https://github.com/microsoft/TypeScript/issues/38485
 *
 * Here we compute what the expected final output target of the compilation will
 * be so that we can generate ES5 compliant `$localize` calls instead of relying upon TS to do the
 * downleveling for us.
 */
function getLocalizeCompileTarget(context) {
    const target = context.getCompilerOptions().target || typescript_1.default.ScriptTarget.ES2015;
    return target !== typescript_1.default.ScriptTarget.JSON ? target : typescript_1.default.ScriptTarget.ES2015;
}
function getFileOverviewComment(statements) {
    if (statements.length > 0) {
        const host = statements[0];
        let trailing = false;
        let comments = typescript_1.default.getSyntheticLeadingComments(host);
        // If @fileoverview tag is not found in source file, tsickle produces fake node with trailing
        // comment and inject it at the very beginning of the generated file. So we need to check for
        // leading as well as trailing comments.
        if (!comments || comments.length === 0) {
            trailing = true;
            comments = typescript_1.default.getSyntheticTrailingComments(host);
        }
        if (comments && comments.length > 0 && CLOSURE_FILE_OVERVIEW_REGEXP.test(comments[0].text)) {
            return { comments, host, trailing };
        }
    }
    return null;
}
function insertFileOverviewComment(sf, fileoverview) {
    const { comments, host, trailing } = fileoverview;
    // If host statement is no longer the first one, it means that extra statements were added at the
    // very beginning, so we need to relocate @fileoverview comment and cleanup the original statement
    // that hosted it.
    if (sf.statements.length > 0 && host !== sf.statements[0]) {
        if (trailing) {
            typescript_1.default.setSyntheticTrailingComments(host, undefined);
        }
        else {
            typescript_1.default.setSyntheticLeadingComments(host, undefined);
        }
        // Note: Do not use the first statement as it may be elided at runtime.
        // E.g. an import declaration that is type only.
        const commentNode = typescript_1.default.factory.createNotEmittedStatement(sf);
        typescript_1.default.setSyntheticLeadingComments(commentNode, comments);
        return typescript_1.default.factory.updateSourceFile(sf, [commentNode, ...sf.statements], sf.isDeclarationFile, sf.referencedFiles, sf.typeReferenceDirectives, sf.hasNoDefaultLib, sf.libReferenceDirectives);
    }
    return sf;
}
function maybeFilterDecorator(decorators, toRemove) {
    if (decorators === undefined) {
        return undefined;
    }
    const filtered = decorators.filter((dec) => toRemove.find((decToRemove) => typescript_1.default.getOriginalNode(dec) === decToRemove) === undefined);
    if (filtered.length === 0) {
        return undefined;
    }
    return typescript_1.default.factory.createNodeArray(filtered);
}
function isFromAngularCore(decorator) {
    return decorator.import !== null && decorator.import.from === '@angular/core';
}
function createRecorderFn(defaultImportTracker) {
    return (node) => {
        const importDecl = (0, default_1.getDefaultImportDeclaration)(node);
        if (importDecl !== null) {
            defaultImportTracker.recordUsedImport(importDecl);
        }
    };
}
/** Creates a `NodeArray` with the correct offsets from an array of decorators. */
function nodeArrayFromDecoratorsArray(decorators) {
    const array = typescript_1.default.factory.createNodeArray(decorators);
    if (array.length > 0) {
        array.pos = decorators[0].pos;
        array.end = decorators[decorators.length - 1].end;
    }
    return array;
}
