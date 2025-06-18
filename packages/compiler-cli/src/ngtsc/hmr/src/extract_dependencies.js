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
exports.extractHmrDependencies = extractHmrDependencies;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const partial_evaluator_1 = require("../../partial_evaluator");
/**
 * Determines the file-level dependencies that the HMR initializer needs to capture and pass along.
 * @param sourceFile File in which the file is being compiled.
 * @param definition Compiled component definition.
 * @param factory Compiled component factory.
 * @param deferBlockMetadata Metadata about the defer blocks in the component.
 * @param classMetadata Compiled `setClassMetadata` expression, if any.
 * @param debugInfo Compiled `setClassDebugInfo` expression, if any.
 */
function extractHmrDependencies(node, definition, factory, deferBlockMetadata, classMetadata, debugInfo, reflection, evaluator) {
    var _a, _b;
    const name = typescript_1.default.isClassDeclaration(node) && node.name ? node.name.text : null;
    const visitor = new PotentialTopLevelReadsVisitor();
    const sourceFile = typescript_1.default.getOriginalNode(node).getSourceFile();
    // Visit all of the compiled expressions to look for potential
    // local references that would have to be retained.
    definition.expression.visitExpression(visitor, null);
    definition.statements.forEach((statement) => statement.visitStatement(visitor, null));
    (_a = factory.initializer) === null || _a === void 0 ? void 0 : _a.visitExpression(visitor, null);
    factory.statements.forEach((statement) => statement.visitStatement(visitor, null));
    classMetadata === null || classMetadata === void 0 ? void 0 : classMetadata.visitStatement(visitor, null);
    debugInfo === null || debugInfo === void 0 ? void 0 : debugInfo.visitStatement(visitor, null);
    if (deferBlockMetadata.mode === compiler_1.DeferBlockDepsEmitMode.PerBlock) {
        deferBlockMetadata.blocks.forEach((loader) => loader === null || loader === void 0 ? void 0 : loader.visitExpression(visitor, null));
    }
    else {
        (_b = deferBlockMetadata.dependenciesFn) === null || _b === void 0 ? void 0 : _b.visitExpression(visitor, null);
    }
    // Filter out only the references to defined top-level symbols. This allows us to ignore local
    // variables inside of functions. Note that we filter out the class name since it is always
    // defined and it saves us having to repeat this logic wherever the locals are consumed.
    const availableTopLevel = getTopLevelDeclarationNames(sourceFile);
    const local = [];
    const seenLocals = new Set();
    for (const readNode of visitor.allReads) {
        const readName = readNode instanceof compiler_1.outputAst.ReadVarExpr ? readNode.name : readNode.text;
        if (readName !== name && !seenLocals.has(readName) && availableTopLevel.has(readName)) {
            const runtimeRepresentation = getRuntimeRepresentation(readNode, reflection, evaluator);
            if (runtimeRepresentation === null) {
                return null;
            }
            local.push({ name: readName, runtimeRepresentation });
            seenLocals.add(readName);
        }
    }
    return {
        local,
        external: Array.from(visitor.namespaceReads, (name, index) => ({
            moduleName: name,
            assignedName: `ɵhmr${index}`,
        })),
    };
}
/**
 * Gets a node that can be used to represent an identifier in the HMR replacement code at runtime.
 */
function getRuntimeRepresentation(node, reflection, evaluator) {
    if (node instanceof compiler_1.outputAst.ReadVarExpr) {
        return compiler_1.outputAst.variable(node.name);
    }
    // Const enums can't be passed by reference, because their values are inlined.
    // Pass in an object literal with all of the values instead.
    if (isConstEnumReference(node, reflection)) {
        const evaluated = evaluator.evaluate(node);
        if (evaluated instanceof Map) {
            const members = [];
            for (const [name, value] of evaluated.entries()) {
                if (value instanceof partial_evaluator_1.EnumValue &&
                    (value.resolved == null ||
                        typeof value.resolved === 'string' ||
                        typeof value.resolved === 'boolean' ||
                        typeof value.resolved === 'number')) {
                    members.push({
                        key: name,
                        quoted: false,
                        value: compiler_1.outputAst.literal(value.resolved),
                    });
                }
                else {
                    // TS is pretty restrictive about what values can be in a const enum so our evaluator
                    // should be able to handle them, however if we happen to hit such a case, we return null
                    // so the HMR update can be invalidated.
                    return null;
                }
            }
            return compiler_1.outputAst.literalMap(members);
        }
    }
    return compiler_1.outputAst.variable(node.text);
}
/**
 * Gets the names of all top-level declarations within the file (imports, declared classes etc).
 * @param sourceFile File in which to search for locals.
 */
function getTopLevelDeclarationNames(sourceFile) {
    const results = new Set();
    // Only look through the top-level statements.
    for (const node of sourceFile.statements) {
        // Class, function and const enum declarations need to be captured since they correspond
        // to runtime code. Intentionally excludes interfaces and type declarations.
        if (typescript_1.default.isClassDeclaration(node) ||
            typescript_1.default.isFunctionDeclaration(node) ||
            typescript_1.default.isEnumDeclaration(node)) {
            if (node.name) {
                results.add(node.name.text);
            }
            continue;
        }
        // Variable declarations.
        if (typescript_1.default.isVariableStatement(node)) {
            for (const decl of node.declarationList.declarations) {
                trackBindingName(decl.name, results);
            }
            continue;
        }
        // Import declarations.
        if (typescript_1.default.isImportDeclaration(node) && node.importClause) {
            const importClause = node.importClause;
            // Skip over type-only imports since they won't be emitted to JS.
            if (importClause.isTypeOnly) {
                continue;
            }
            // import foo from 'foo'
            if (importClause.name) {
                results.add(importClause.name.text);
            }
            if (importClause.namedBindings) {
                const namedBindings = importClause.namedBindings;
                if (typescript_1.default.isNamespaceImport(namedBindings)) {
                    // import * as foo from 'foo';
                    results.add(namedBindings.name.text);
                }
                else {
                    // import {foo} from 'foo';
                    namedBindings.elements.forEach((el) => {
                        if (!el.isTypeOnly) {
                            results.add(el.name.text);
                        }
                    });
                }
            }
            continue;
        }
    }
    return results;
}
/**
 * Adds all the variables declared through a `ts.BindingName` to a set of results.
 * @param node Node from which to start searching for variables.
 * @param results Set to which to add the matches.
 */
function trackBindingName(node, results) {
    if (typescript_1.default.isIdentifier(node)) {
        results.add(node.text);
    }
    else {
        for (const el of node.elements) {
            if (!typescript_1.default.isOmittedExpression(el)) {
                trackBindingName(el.name, results);
            }
        }
    }
}
/**
 * Visitor that will traverse an AST looking for potential top-level variable reads.
 * The reads are "potential", because the visitor doesn't account for local variables
 * inside functions.
 */
class PotentialTopLevelReadsVisitor extends compiler_1.outputAst.RecursiveAstVisitor {
    constructor() {
        super(...arguments);
        this.allReads = new Set();
        this.namespaceReads = new Set();
        /**
         * Traverses a TypeScript AST and tracks all the top-level reads.
         * @param node Node from which to start the traversal.
         */
        this.addAllTopLevelIdentifiers = (node) => {
            if (typescript_1.default.isIdentifier(node) && this.isTopLevelIdentifierReference(node)) {
                this.allReads.add(node);
            }
            else {
                typescript_1.default.forEachChild(node, this.addAllTopLevelIdentifiers);
            }
        };
    }
    visitExternalExpr(ast, context) {
        if (ast.value.moduleName !== null) {
            this.namespaceReads.add(ast.value.moduleName);
        }
        super.visitExternalExpr(ast, context);
    }
    visitReadVarExpr(ast, context) {
        this.allReads.add(ast);
        super.visitReadVarExpr(ast, context);
    }
    visitWrappedNodeExpr(ast, context) {
        if (this.isTypeScriptNode(ast.node)) {
            this.addAllTopLevelIdentifiers(ast.node);
        }
        super.visitWrappedNodeExpr(ast, context);
    }
    /**
     * TypeScript identifiers are used both when referring to a variable (e.g. `console.log(foo)`)
     * and for names (e.g. `{foo: 123}`). This function determines if the identifier is a top-level
     * variable read, rather than a nested name.
     * @param identifier Identifier to check.
     */
    isTopLevelIdentifierReference(identifier) {
        let node = identifier;
        let parent = node.parent;
        // The parent might be undefined for a synthetic node or if `setParentNodes` is set to false
        // when the SourceFile was created. We can account for such cases using the type checker, at
        // the expense of performance. At the moment of writing, we're keeping it simple since the
        // compiler sets `setParentNodes: true`.
        if (!parent) {
            return false;
        }
        // Unwrap parenthesized identifiers, but use the closest parenthesized expression
        // as the reference node so that we can check cases like `{prop: ((value))}`.
        if (typescript_1.default.isParenthesizedExpression(parent) && parent.expression === node) {
            while (parent && typescript_1.default.isParenthesizedExpression(parent)) {
                node = parent;
                parent = parent.parent;
            }
        }
        // Identifier referenced at the top level. Unlikely.
        if (typescript_1.default.isSourceFile(parent)) {
            return true;
        }
        // Identifier used inside a call is only top-level if it's an argument.
        // This also covers decorators since their expression is usually a call.
        if (typescript_1.default.isCallExpression(parent)) {
            return parent.expression === node || parent.arguments.includes(node);
        }
        // Identifier used in a nested expression is only top-level if it's the actual expression.
        if (typescript_1.default.isExpressionStatement(parent) ||
            typescript_1.default.isPropertyAccessExpression(parent) ||
            typescript_1.default.isComputedPropertyName(parent) ||
            typescript_1.default.isTemplateSpan(parent) ||
            typescript_1.default.isSpreadAssignment(parent) ||
            typescript_1.default.isSpreadElement(parent) ||
            typescript_1.default.isAwaitExpression(parent) ||
            typescript_1.default.isNonNullExpression(parent) ||
            typescript_1.default.isIfStatement(parent) ||
            typescript_1.default.isDoStatement(parent) ||
            typescript_1.default.isWhileStatement(parent) ||
            typescript_1.default.isSwitchStatement(parent) ||
            typescript_1.default.isCaseClause(parent) ||
            typescript_1.default.isThrowStatement(parent) ||
            typescript_1.default.isNewExpression(parent)) {
            return parent.expression === node;
        }
        // Identifier used in an array is only top-level if it's one of the elements.
        if (typescript_1.default.isArrayLiteralExpression(parent)) {
            return parent.elements.includes(node);
        }
        // If the parent is an initialized node, the identifier is
        // at the top level if it's the initializer itself.
        if (typescript_1.default.isPropertyAssignment(parent) ||
            typescript_1.default.isParameter(parent) ||
            typescript_1.default.isBindingElement(parent) ||
            typescript_1.default.isPropertyDeclaration(parent) ||
            typescript_1.default.isEnumMember(parent)) {
            return parent.initializer === node;
        }
        // Identifier in a function is top level if it's either the name or the initializer.
        if (typescript_1.default.isVariableDeclaration(parent)) {
            return parent.name === node || parent.initializer === node;
        }
        // Identifier in a declaration is only top level if it's the name.
        // In shorthand assignments the name is also the value.
        if (typescript_1.default.isClassDeclaration(parent) ||
            typescript_1.default.isFunctionDeclaration(parent) ||
            typescript_1.default.isShorthandPropertyAssignment(parent)) {
            return parent.name === node;
        }
        if (typescript_1.default.isElementAccessExpression(parent)) {
            return parent.expression === node || parent.argumentExpression === node;
        }
        if (typescript_1.default.isBinaryExpression(parent)) {
            return parent.left === node || parent.right === node;
        }
        if (typescript_1.default.isForInStatement(parent) || typescript_1.default.isForOfStatement(parent)) {
            return parent.expression === node || parent.initializer === node;
        }
        if (typescript_1.default.isForStatement(parent)) {
            return (parent.condition === node || parent.initializer === node || parent.incrementor === node);
        }
        if (typescript_1.default.isArrowFunction(parent)) {
            return parent.body === node;
        }
        // It's unlikely that we'll run into imports/exports in this use case.
        // We handle them since it's simple and for completeness' sake.
        if (typescript_1.default.isImportSpecifier(parent) || typescript_1.default.isExportSpecifier(parent)) {
            return (parent.propertyName || parent.name) === node;
        }
        if (typescript_1.default.isConditionalExpression(parent)) {
            return parent.condition === node || parent.whenFalse === node || parent.whenTrue === node;
        }
        // Otherwise it's not top-level.
        return false;
    }
    /** Checks if a value is a TypeScript AST node. */
    isTypeScriptNode(value) {
        // If this is too permissive, we can also check for `getSourceFile`. This code runs
        // on a narrow set of use cases so checking for `kind` should be enough.
        return !!value && typeof value.kind === 'number';
    }
}
/** Checks whether a node is a reference to a const enum. */
function isConstEnumReference(node, reflection) {
    var _a;
    const parent = node.parent;
    // Only check identifiers that are in the form of `Foo.bar` where `Foo` is the node being checked.
    if (!parent ||
        !typescript_1.default.isPropertyAccessExpression(parent) ||
        parent.expression !== node ||
        !typescript_1.default.isIdentifier(parent.name)) {
        return false;
    }
    const declaration = reflection.getDeclarationOfIdentifier(node);
    return (declaration !== null &&
        typescript_1.default.isEnumDeclaration(declaration.node) &&
        !!((_a = declaration.node.modifiers) === null || _a === void 0 ? void 0 : _a.some((m) => m.kind === typescript_1.default.SyntaxKind.ConstKeyword)));
}
