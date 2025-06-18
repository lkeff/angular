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
exports.CORE_MODULE = void 0;
exports.valueReferenceToExpression = valueReferenceToExpression;
exports.toR3Reference = toR3Reference;
exports.isAngularCore = isAngularCore;
exports.isAngularCoreReferenceWithPotentialAliasing = isAngularCoreReferenceWithPotentialAliasing;
exports.findAngularDecorator = findAngularDecorator;
exports.isAngularDecorator = isAngularDecorator;
exports.getAngularDecorators = getAngularDecorators;
exports.unwrapExpression = unwrapExpression;
exports.tryUnwrapForwardRef = tryUnwrapForwardRef;
exports.createForwardRefResolver = createForwardRefResolver;
exports.combineResolvers = combineResolvers;
exports.isExpressionForwardReference = isExpressionForwardReference;
exports.isWrappedTsNodeExpr = isWrappedTsNodeExpr;
exports.readBaseClass = readBaseClass;
exports.wrapFunctionExpressionsInParens = wrapFunctionExpressionsInParens;
exports.resolveProvidersRequiringFactory = resolveProvidersRequiringFactory;
exports.wrapTypeReference = wrapTypeReference;
exports.createSourceSpan = createSourceSpan;
exports.compileResults = compileResults;
exports.toFactoryMetadata = toFactoryMetadata;
exports.resolveImportedFile = resolveImportedFile;
exports.getOriginNodeForDiagnostics = getOriginNodeForDiagnostics;
exports.isAbstractClassDeclaration = isAbstractClassDeclaration;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../../imports");
const default_1 = require("../../../imports/src/default");
/** Module name of the framework core. */
exports.CORE_MODULE = '@angular/core';
function valueReferenceToExpression(valueRef) {
    if (valueRef.kind === 2 /* TypeValueReferenceKind.UNAVAILABLE */) {
        return null;
    }
    else if (valueRef.kind === 0 /* TypeValueReferenceKind.LOCAL */) {
        const expr = new compiler_1.WrappedNodeExpr(valueRef.expression);
        if (valueRef.defaultImportStatement !== null) {
            (0, default_1.attachDefaultImportDeclaration)(expr, valueRef.defaultImportStatement);
        }
        return expr;
    }
    else {
        let importExpr = new compiler_1.ExternalExpr({
            moduleName: valueRef.moduleName,
            name: valueRef.importedName,
        });
        if (valueRef.nestedPath !== null) {
            for (const property of valueRef.nestedPath) {
                importExpr = new compiler_1.ReadPropExpr(importExpr, property);
            }
        }
        return importExpr;
    }
}
function toR3Reference(origin, ref, context, refEmitter) {
    const emittedValueRef = refEmitter.emit(ref, context);
    (0, imports_1.assertSuccessfulReferenceEmit)(emittedValueRef, origin, 'class');
    const emittedTypeRef = refEmitter.emit(ref, context, imports_1.ImportFlags.ForceNewImport | imports_1.ImportFlags.AllowTypeImports);
    (0, imports_1.assertSuccessfulReferenceEmit)(emittedTypeRef, origin, 'class');
    return {
        value: emittedValueRef.expression,
        type: emittedTypeRef.expression,
    };
}
function isAngularCore(decorator) {
    return decorator.import !== null && decorator.import.from === exports.CORE_MODULE;
}
/**
 * This function is used for verifying that a given reference is declared
 * inside `@angular/core` and corresponds to the given symbol name.
 *
 * In some cases, due to the compiler face duplicating many symbols as
 * an independent bridge between core and the compiler, the dts bundler may
 * decide to alias declarations in the `.d.ts`, to avoid conflicts.
 *
 * e.g.
 *
 * ```
 * declare enum ViewEncapsulation {} // from the facade
 * declare enum ViewEncapsulation$1 {} // the real one exported to users.
 * ```
 *
 * This function accounts for such potential re-namings.
 */
function isAngularCoreReferenceWithPotentialAliasing(reference, symbolName, isCore) {
    var _a;
    return ((reference.ownedByModuleGuess === exports.CORE_MODULE || isCore) &&
        ((_a = reference.debugName) === null || _a === void 0 ? void 0 : _a.replace(/\$\d+$/, '')) === symbolName);
}
function findAngularDecorator(decorators, name, isCore) {
    return decorators.find((decorator) => isAngularDecorator(decorator, name, isCore));
}
function isAngularDecorator(decorator, name, isCore) {
    if (isCore) {
        return decorator.name === name;
    }
    else if (isAngularCore(decorator)) {
        return decorator.import.name === name;
    }
    return false;
}
function getAngularDecorators(decorators, names, isCore) {
    return decorators.filter((decorator) => {
        var _a;
        const name = isCore ? decorator.name : (_a = decorator.import) === null || _a === void 0 ? void 0 : _a.name;
        if (name === undefined || !names.includes(name)) {
            return false;
        }
        return isCore || isAngularCore(decorator);
    });
}
/**
 * Unwrap a `ts.Expression`, removing outer type-casts or parentheses until the expression is in its
 * lowest level form.
 *
 * For example, the expression "(foo as Type)" unwraps to "foo".
 */
function unwrapExpression(node) {
    while (typescript_1.default.isAsExpression(node) || typescript_1.default.isParenthesizedExpression(node)) {
        node = node.expression;
    }
    return node;
}
function expandForwardRef(arg) {
    arg = unwrapExpression(arg);
    if (!typescript_1.default.isArrowFunction(arg) && !typescript_1.default.isFunctionExpression(arg)) {
        return null;
    }
    const body = arg.body;
    // Either the body is a ts.Expression directly, or a block with a single return statement.
    if (typescript_1.default.isBlock(body)) {
        // Block body - look for a single return statement.
        if (body.statements.length !== 1) {
            return null;
        }
        const stmt = body.statements[0];
        if (!typescript_1.default.isReturnStatement(stmt) || stmt.expression === undefined) {
            return null;
        }
        return stmt.expression;
    }
    else {
        // Shorthand body - return as an expression.
        return body;
    }
}
/**
 * If the given `node` is a forwardRef() expression then resolve its inner value, otherwise return
 * `null`.
 *
 * @param node the forwardRef() expression to resolve
 * @param reflector a ReflectionHost
 * @returns the resolved expression, if the original expression was a forwardRef(), or `null`
 *     otherwise.
 */
function tryUnwrapForwardRef(node, reflector) {
    node = unwrapExpression(node);
    if (!typescript_1.default.isCallExpression(node) || node.arguments.length !== 1) {
        return null;
    }
    const fn = typescript_1.default.isPropertyAccessExpression(node.expression)
        ? node.expression.name
        : node.expression;
    if (!typescript_1.default.isIdentifier(fn)) {
        return null;
    }
    const expr = expandForwardRef(node.arguments[0]);
    if (expr === null) {
        return null;
    }
    const imp = reflector.getImportOfIdentifier(fn);
    if (imp === null || imp.from !== '@angular/core' || imp.name !== 'forwardRef') {
        return null;
    }
    return expr;
}
/**
 * A foreign function resolver for `staticallyResolve` which unwraps forwardRef() expressions.
 *
 * @param ref a Reference to the declaration of the function being called (which might be
 * forwardRef)
 * @param args the arguments to the invocation of the forwardRef expression
 * @returns an unwrapped argument if `ref` pointed to forwardRef, or null otherwise
 */
function createForwardRefResolver(isCore) {
    return (fn, callExpr, resolve, unresolvable) => {
        if (!isAngularCoreReferenceWithPotentialAliasing(fn, 'forwardRef', isCore) ||
            callExpr.arguments.length !== 1) {
            return unresolvable;
        }
        const expanded = expandForwardRef(callExpr.arguments[0]);
        if (expanded !== null) {
            return resolve(expanded);
        }
        else {
            return unresolvable;
        }
    };
}
/**
 * Combines an array of resolver functions into a one.
 * @param resolvers Resolvers to be combined.
 */
function combineResolvers(resolvers) {
    return (fn, callExpr, resolve, unresolvable) => {
        for (const resolver of resolvers) {
            const resolved = resolver(fn, callExpr, resolve, unresolvable);
            if (resolved !== unresolvable) {
                return resolved;
            }
        }
        return unresolvable;
    };
}
function isExpressionForwardReference(expr, context, contextSource) {
    if (isWrappedTsNodeExpr(expr)) {
        const node = typescript_1.default.getOriginalNode(expr.node);
        return node.getSourceFile() === contextSource && context.pos < node.pos;
    }
    else {
        return false;
    }
}
function isWrappedTsNodeExpr(expr) {
    return expr instanceof compiler_1.WrappedNodeExpr;
}
function readBaseClass(node, reflector, evaluator) {
    const baseExpression = reflector.getBaseClassExpression(node);
    if (baseExpression !== null) {
        const baseClass = evaluator.evaluate(baseExpression);
        if (baseClass instanceof imports_1.Reference && reflector.isClass(baseClass.node)) {
            return baseClass;
        }
        else {
            return 'dynamic';
        }
    }
    return null;
}
const parensWrapperTransformerFactory = (context) => {
    const visitor = (node) => {
        const visited = typescript_1.default.visitEachChild(node, visitor, context);
        if (typescript_1.default.isArrowFunction(visited) || typescript_1.default.isFunctionExpression(visited)) {
            return typescript_1.default.factory.createParenthesizedExpression(visited);
        }
        return visited;
    };
    return (node) => typescript_1.default.visitEachChild(node, visitor, context);
};
/**
 * Wraps all functions in a given expression in parentheses. This is needed to avoid problems
 * where Tsickle annotations added between analyse and transform phases in Angular may trigger
 * automatic semicolon insertion, e.g. if a function is the expression in a `return` statement.
 * More
 * info can be found in Tsickle source code here:
 * https://github.com/angular/tsickle/blob/d7974262571c8a17d684e5ba07680e1b1993afdd/src/jsdoc_transformer.ts#L1021
 *
 * @param expression Expression where functions should be wrapped in parentheses
 */
function wrapFunctionExpressionsInParens(expression) {
    return typescript_1.default.transform(expression, [parensWrapperTransformerFactory]).transformed[0];
}
/**
 * Resolves the given `rawProviders` into `ClassDeclarations` and returns
 * a set containing those that are known to require a factory definition.
 * @param rawProviders Expression that declared the providers array in the source.
 */
function resolveProvidersRequiringFactory(rawProviders, reflector, evaluator) {
    const providers = new Set();
    const resolvedProviders = evaluator.evaluate(rawProviders);
    if (!Array.isArray(resolvedProviders)) {
        return providers;
    }
    resolvedProviders.forEach(function processProviders(provider) {
        let tokenClass = null;
        if (Array.isArray(provider)) {
            // If we ran into an array, recurse into it until we've resolve all the classes.
            provider.forEach(processProviders);
        }
        else if (provider instanceof imports_1.Reference) {
            tokenClass = provider;
        }
        else if (provider instanceof Map && provider.has('useClass') && !provider.has('deps')) {
            const useExisting = provider.get('useClass');
            if (useExisting instanceof imports_1.Reference) {
                tokenClass = useExisting;
            }
        }
        // TODO(alxhub): there was a bug where `getConstructorParameters` would return `null` for a
        // class in a .d.ts file, always, even if the class had a constructor. This was fixed for
        // `getConstructorParameters`, but that fix causes more classes to be recognized here as needing
        // provider checks, which is a breaking change in g3. Avoid this breakage for now by skipping
        // classes from .d.ts files here directly, until g3 can be cleaned up.
        if (tokenClass !== null &&
            !tokenClass.node.getSourceFile().isDeclarationFile &&
            reflector.isClass(tokenClass.node)) {
            const constructorParameters = reflector.getConstructorParameters(tokenClass.node);
            // Note that we only want to capture providers with a non-trivial constructor,
            // because they're the ones that might be using DI and need to be decorated.
            if (constructorParameters !== null && constructorParameters.length > 0) {
                providers.add(tokenClass);
            }
        }
    });
    return providers;
}
/**
 * Create an R3Reference for a class.
 *
 * The `value` is the exported declaration of the class from its source file.
 * The `type` is an expression that would be used in the typings (.d.ts) files.
 */
function wrapTypeReference(reflector, clazz) {
    const value = new compiler_1.WrappedNodeExpr(clazz.name);
    const type = value;
    return { value, type };
}
/** Creates a ParseSourceSpan for a TypeScript node. */
function createSourceSpan(node) {
    const sf = node.getSourceFile();
    const [startOffset, endOffset] = [node.getStart(), node.getEnd()];
    const { line: startLine, character: startCol } = sf.getLineAndCharacterOfPosition(startOffset);
    const { line: endLine, character: endCol } = sf.getLineAndCharacterOfPosition(endOffset);
    const parseSf = new compiler_1.ParseSourceFile(sf.getFullText(), sf.fileName);
    // +1 because values are zero-indexed.
    return new compiler_1.ParseSourceSpan(new compiler_1.ParseLocation(parseSf, startOffset, startLine + 1, startCol + 1), new compiler_1.ParseLocation(parseSf, endOffset, endLine + 1, endCol + 1));
}
/**
 * Collate the factory and definition compiled results into an array of CompileResult objects.
 */
function compileResults(fac, def, metadataStmt, propName, additionalFields, deferrableImports, debugInfo = null, hmrInitializer = null) {
    const statements = def.statements;
    if (metadataStmt !== null) {
        statements.push(metadataStmt);
    }
    if (debugInfo !== null) {
        statements.push(debugInfo);
    }
    if (hmrInitializer !== null) {
        statements.push(hmrInitializer);
    }
    const results = [
        fac,
        {
            name: propName,
            initializer: def.expression,
            statements: def.statements,
            type: def.type,
            deferrableImports,
        },
    ];
    if (additionalFields !== null) {
        results.push(...additionalFields);
    }
    return results;
}
function toFactoryMetadata(meta, target) {
    return {
        name: meta.name,
        type: meta.type,
        typeArgumentCount: meta.typeArgumentCount,
        deps: meta.deps,
        target,
    };
}
function resolveImportedFile(moduleResolver, importedFile, expr, origin) {
    // If `importedFile` is not 'unknown' then it accurately reflects the source file that is
    // being imported.
    if (importedFile !== 'unknown') {
        return importedFile;
    }
    // Otherwise `expr` has to be inspected to determine the file that is being imported. If `expr`
    // is not an `ExternalExpr` then it does not correspond with an import, so return null in that
    // case.
    if (!(expr instanceof compiler_1.ExternalExpr)) {
        return null;
    }
    // Figure out what file is being imported.
    return moduleResolver.resolveModule(expr.value.moduleName, origin.fileName);
}
/**
 * Determines the most appropriate expression for diagnostic reporting purposes. If `expr` is
 * contained within `container` then `expr` is used as origin node, otherwise `container` itself is
 * used.
 */
function getOriginNodeForDiagnostics(expr, container) {
    const nodeSf = expr.getSourceFile();
    const exprSf = container.getSourceFile();
    if (nodeSf === exprSf && expr.pos >= container.pos && expr.end <= container.end) {
        // `expr` occurs within the same source file as `container` and is contained within it, so
        // `expr` is appropriate to use as origin node for diagnostics.
        return expr;
    }
    else {
        return container;
    }
}
function isAbstractClassDeclaration(clazz) {
    return typescript_1.default.canHaveModifiers(clazz) && clazz.modifiers !== undefined
        ? clazz.modifiers.some((mod) => mod.kind === typescript_1.default.SyntaxKind.AbstractKeyword)
        : false;
}
