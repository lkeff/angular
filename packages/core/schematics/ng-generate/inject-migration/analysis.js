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
exports.DI_PARAM_SYMBOLS = void 0;
exports.analyzeFile = analyzeFile;
exports.getConstructorUnusedParameters = getConstructorUnusedParameters;
exports.getSuperParameters = getSuperParameters;
exports.parameterReferencesOtherParameters = parameterReferencesOtherParameters;
exports.parameterDeclaresProperty = parameterDeclaresProperty;
exports.isNullableType = isNullableType;
exports.hasGenerics = hasGenerics;
exports.isAccessedViaThis = isAccessedViaThis;
exports.isInlineFunction = isInlineFunction;
const typescript_1 = __importDefault(require("typescript"));
const ng_decorators_1 = require("../../utils/ng_decorators");
const imports_1 = require("../../utils/typescript/imports");
const nodes_1 = require("../../utils/typescript/nodes");
/** Names of decorators that enable DI on a class declaration. */
const DECORATORS_SUPPORTING_DI = new Set([
    'Component',
    'Directive',
    'Pipe',
    'NgModule',
    'Injectable',
]);
/** Names of symbols used for DI on parameters. */
exports.DI_PARAM_SYMBOLS = new Set([
    'Inject',
    'Attribute',
    'Optional',
    'SkipSelf',
    'Self',
    'Host',
    'forwardRef',
]);
/** Kinds of nodes which aren't injectable when set as a type of a parameter. */
const UNINJECTABLE_TYPE_KINDS = new Set([
    typescript_1.default.SyntaxKind.TrueKeyword,
    typescript_1.default.SyntaxKind.FalseKeyword,
    typescript_1.default.SyntaxKind.NumberKeyword,
    typescript_1.default.SyntaxKind.StringKeyword,
    typescript_1.default.SyntaxKind.NullKeyword,
    typescript_1.default.SyntaxKind.VoidKeyword,
]);
/**
 * Finds the necessary information for the `inject` migration in a file.
 * @param sourceFile File which to analyze.
 * @param localTypeChecker Type checker scoped to the specific file.
 */
function analyzeFile(sourceFile, localTypeChecker, options) {
    const coreSpecifiers = (0, imports_1.getNamedImports)(sourceFile, '@angular/core');
    // Exit early if there are no Angular imports.
    if (coreSpecifiers === null || coreSpecifiers.elements.length === 0) {
        return null;
    }
    const classes = [];
    const nonDecoratorReferences = {};
    const importsToSpecifiers = coreSpecifiers.elements.reduce((map, specifier) => {
        const symbolName = (specifier.propertyName || specifier.name).text;
        if (exports.DI_PARAM_SYMBOLS.has(symbolName)) {
            map.set(symbolName, specifier);
        }
        return map;
    }, new Map());
    sourceFile.forEachChild(function walk(node) {
        var _a, _b;
        // Skip import declarations since they can throw off the identifier
        // could below and we don't care about them in this migration.
        if (typescript_1.default.isImportDeclaration(node)) {
            return;
        }
        if (typescript_1.default.isParameter(node)) {
            const closestConstructor = (0, nodes_1.closestNode)(node, typescript_1.default.isConstructorDeclaration);
            // Visiting the same parameters that we're about to remove can throw off the reference
            // counting logic below. If we run into an initializer, we always visit its initializer
            // and optionally visit the modifiers/decorators if it's not due to be deleted. Note that
            // here we technically aren't dealing with the the full list of classes, but the parent class
            // will have been visited by the time we reach the parameters.
            if (node.initializer) {
                walk(node.initializer);
            }
            if (closestConstructor === null ||
                // This is meant to avoid the case where this is a
                // parameter inside a function placed in a constructor.
                !closestConstructor.parameters.includes(node) ||
                !classes.some((c) => c.constructor === closestConstructor)) {
                (_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.forEach(walk);
            }
            return;
        }
        if (typescript_1.default.isIdentifier(node) && importsToSpecifiers.size > 0) {
            let symbol;
            for (const [name, specifier] of importsToSpecifiers) {
                const localName = (specifier.propertyName || specifier.name).text;
                // Quick exit if the two symbols don't match up.
                if (localName === node.text) {
                    if (!symbol) {
                        symbol = localTypeChecker.getSymbolAtLocation(node);
                        // If the symbol couldn't be resolved the first time, it won't be resolved the next
                        // time either. Stop the loop since we won't be able to get an accurate result.
                        if (!symbol || !symbol.declarations) {
                            break;
                        }
                        else if (symbol.declarations.some((decl) => decl === specifier)) {
                            nonDecoratorReferences[name] = (nonDecoratorReferences[name] || 0) + 1;
                        }
                    }
                }
            }
        }
        else if (typescript_1.default.isClassDeclaration(node)) {
            const decorators = (0, ng_decorators_1.getAngularDecorators)(localTypeChecker, typescript_1.default.getDecorators(node) || []);
            const isAbstract = !!((_b = node.modifiers) === null || _b === void 0 ? void 0 : _b.some((m) => m.kind === typescript_1.default.SyntaxKind.AbstractKeyword));
            const supportsDI = decorators.some((dec) => DECORATORS_SUPPORTING_DI.has(dec.name));
            const constructorNode = node.members.find((member) => typescript_1.default.isConstructorDeclaration(member) &&
                member.body != null &&
                member.parameters.length > 0);
            // Basic check to determine if all parameters are injectable. This isn't exhaustive, but it
            // should catch the majority of cases. An exhaustive check would require a full type checker
            // which we don't have in this migration.
            const allParamsInjectable = !!(constructorNode === null || constructorNode === void 0 ? void 0 : constructorNode.parameters.every((param) => {
                if (!param.type || !UNINJECTABLE_TYPE_KINDS.has(param.type.kind)) {
                    return true;
                }
                return (0, ng_decorators_1.getAngularDecorators)(localTypeChecker, typescript_1.default.getDecorators(param) || []).some((dec) => dec.name === 'Inject' || dec.name === 'Attribute');
            }));
            // Don't migrate abstract classes by default, because
            // their parameters aren't guaranteed to be injectable.
            if (supportsDI &&
                constructorNode &&
                allParamsInjectable &&
                (!isAbstract || options.migrateAbstractClasses)) {
                classes.push({
                    node,
                    constructor: constructorNode,
                    superCall: node.heritageClauses ? findSuperCall(constructorNode) : null,
                });
            }
        }
        node.forEachChild(walk);
    });
    return { classes, nonDecoratorReferences };
}
/**
 * Returns the parameters of a function that aren't used within its body.
 * @param declaration Function in which to search for unused parameters.
 * @param localTypeChecker Type checker scoped to the file in which the function was declared.
 * @param removedStatements Statements that were already removed from the constructor.
 */
function getConstructorUnusedParameters(declaration, localTypeChecker, removedStatements) {
    const accessedTopLevelParameters = new Set();
    const topLevelParameters = new Set();
    const topLevelParameterNames = new Set();
    const unusedParams = new Set();
    // Prepare the parameters for quicker checks further down.
    for (const param of declaration.parameters) {
        if (typescript_1.default.isIdentifier(param.name)) {
            topLevelParameters.add(param);
            topLevelParameterNames.add(param.name.text);
        }
    }
    if (!declaration.body) {
        return topLevelParameters;
    }
    const analyze = (node) => {
        var _a, _b;
        // Don't descend into statements that were removed already.
        if (typescript_1.default.isStatement(node) && removedStatements.has(node)) {
            return;
        }
        if (!typescript_1.default.isIdentifier(node) || !topLevelParameterNames.has(node.text)) {
            node.forEachChild(analyze);
            return;
        }
        // Don't consider `this.<name>` accesses as being references to
        // parameters since they'll be moved to property declarations.
        if (isAccessedViaThis(node)) {
            return;
        }
        (_b = (_a = localTypeChecker.getSymbolAtLocation(node)) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b.forEach((decl) => {
            if (typescript_1.default.isParameter(decl) && topLevelParameters.has(decl)) {
                accessedTopLevelParameters.add(decl);
            }
            if (typescript_1.default.isShorthandPropertyAssignment(decl)) {
                const symbol = localTypeChecker.getShorthandAssignmentValueSymbol(decl);
                if (symbol && symbol.valueDeclaration && typescript_1.default.isParameter(symbol.valueDeclaration)) {
                    accessedTopLevelParameters.add(symbol.valueDeclaration);
                }
            }
        });
    };
    declaration.parameters.forEach((param) => {
        if (param.initializer) {
            analyze(param.initializer);
        }
    });
    declaration.body.forEachChild(analyze);
    for (const param of topLevelParameters) {
        if (!accessedTopLevelParameters.has(param)) {
            unusedParams.add(param);
        }
    }
    return unusedParams;
}
/**
 * Determines which parameters of a function declaration are used within its `super` call.
 * @param declaration Function whose parameters to search for.
 * @param superCall `super()` call within the function.
 * @param localTypeChecker Type checker scoped to the file in which the function is declared.
 */
function getSuperParameters(declaration, superCall, localTypeChecker) {
    const usedParams = new Set();
    const topLevelParameters = new Set();
    const topLevelParameterNames = new Set();
    // Prepare the parameters for quicker checks further down.
    for (const param of declaration.parameters) {
        if (typescript_1.default.isIdentifier(param.name)) {
            topLevelParameters.add(param);
            topLevelParameterNames.add(param.name.text);
        }
    }
    superCall.forEachChild(function walk(node) {
        var _a, _b;
        if (typescript_1.default.isIdentifier(node) && topLevelParameterNames.has(node.text)) {
            (_b = (_a = localTypeChecker.getSymbolAtLocation(node)) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b.forEach((decl) => {
                if (typescript_1.default.isParameter(decl) && topLevelParameters.has(decl)) {
                    usedParams.add(decl);
                }
                else if (typescript_1.default.isShorthandPropertyAssignment(decl) &&
                    topLevelParameterNames.has(decl.name.text)) {
                    for (const param of topLevelParameters) {
                        if (typescript_1.default.isIdentifier(param.name) && decl.name.text === param.name.text) {
                            usedParams.add(param);
                            break;
                        }
                    }
                }
            });
            // Parameters referenced inside callbacks can be used directly
            // within `super` so don't descend into inline functions.
        }
        else if (!isInlineFunction(node)) {
            node.forEachChild(walk);
        }
    });
    return usedParams;
}
/**
 * Determines if a specific parameter has references to other parameters.
 * @param param Parameter to check.
 * @param allParameters All parameters of the containing function.
 * @param localTypeChecker Type checker scoped to the current file.
 */
function parameterReferencesOtherParameters(param, allParameters, localTypeChecker) {
    // A parameter can only reference other parameters through its initializer.
    if (!param.initializer || allParameters.length < 2) {
        return false;
    }
    const paramNames = new Set();
    for (const current of allParameters) {
        if (current !== param && typescript_1.default.isIdentifier(current.name)) {
            paramNames.add(current.name.text);
        }
    }
    let result = false;
    const analyze = (node) => {
        var _a;
        if (typescript_1.default.isIdentifier(node) && paramNames.has(node.text) && !isAccessedViaThis(node)) {
            const symbol = localTypeChecker.getSymbolAtLocation(node);
            const referencesOtherParam = (_a = symbol === null || symbol === void 0 ? void 0 : symbol.declarations) === null || _a === void 0 ? void 0 : _a.some((decl) => {
                return allParameters.includes(decl);
            });
            if (referencesOtherParam) {
                result = true;
            }
        }
        if (!result) {
            node.forEachChild(analyze);
        }
    };
    analyze(param.initializer);
    return result;
}
/** Checks whether a parameter node declares a property on its class. */
function parameterDeclaresProperty(node) {
    var _a;
    return !!((_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.some(({ kind }) => kind === typescript_1.default.SyntaxKind.PublicKeyword ||
        kind === typescript_1.default.SyntaxKind.PrivateKeyword ||
        kind === typescript_1.default.SyntaxKind.ProtectedKeyword ||
        kind === typescript_1.default.SyntaxKind.ReadonlyKeyword));
}
/** Checks whether a type node is nullable. */
function isNullableType(node) {
    // Apparently `foo: null` is `Parameter<TypeNode<NullKeyword>>`,
    // while `foo: undefined` is `Parameter<UndefinedKeyword>`...
    if (node.kind === typescript_1.default.SyntaxKind.UndefinedKeyword || node.kind === typescript_1.default.SyntaxKind.VoidKeyword) {
        return true;
    }
    if (typescript_1.default.isLiteralTypeNode(node)) {
        return node.literal.kind === typescript_1.default.SyntaxKind.NullKeyword;
    }
    if (typescript_1.default.isUnionTypeNode(node)) {
        return node.types.some(isNullableType);
    }
    return false;
}
/** Checks whether a type node has generic arguments. */
function hasGenerics(node) {
    if (typescript_1.default.isTypeReferenceNode(node)) {
        return node.typeArguments != null && node.typeArguments.length > 0;
    }
    if (typescript_1.default.isUnionTypeNode(node)) {
        return node.types.some(hasGenerics);
    }
    return false;
}
/** Checks whether an identifier is accessed through `this`, e.g. `this.<some identifier>`. */
function isAccessedViaThis(node) {
    return (typescript_1.default.isPropertyAccessExpression(node.parent) &&
        node.parent.expression.kind === typescript_1.default.SyntaxKind.ThisKeyword &&
        node.parent.name === node);
}
/** Finds a `super` call inside of a specific node. */
function findSuperCall(root) {
    let result = null;
    root.forEachChild(function find(node) {
        if (typescript_1.default.isCallExpression(node) && node.expression.kind === typescript_1.default.SyntaxKind.SuperKeyword) {
            result = node;
        }
        else if (result === null) {
            node.forEachChild(find);
        }
    });
    return result;
}
/** Checks whether a node is an inline function. */
function isInlineFunction(node) {
    return (typescript_1.default.isFunctionDeclaration(node) || typescript_1.default.isFunctionExpression(node) || typescript_1.default.isArrowFunction(node));
}
