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
exports.TypeEntityToDeclarationError = exports.TypeScriptReflectionHost = void 0;
exports.reflectNameOfDeclaration = reflectNameOfDeclaration;
exports.reflectIdentifierOfDeclaration = reflectIdentifierOfDeclaration;
exports.reflectTypeEntityToDeclaration = reflectTypeEntityToDeclaration;
exports.filterToMembersWithDecorator = filterToMembersWithDecorator;
exports.reflectClassMember = reflectClassMember;
exports.findMember = findMember;
exports.reflectObjectLiteral = reflectObjectLiteral;
exports.getContainingImportDeclaration = getContainingImportDeclaration;
const typescript_1 = __importDefault(require("typescript"));
const host_1 = require("./host");
const type_to_value_1 = require("./type_to_value");
const util_1 = require("./util");
/**
 * reflector.ts implements static reflection of declarations using the TypeScript `ts.TypeChecker`.
 */
class TypeScriptReflectionHost {
    /**
     * @param skipPrivateValueDeclarationTypes Avoids using a value declaration that is considered private (using a ɵ-prefix),
     * instead using the first available declaration. This is needed for the {@link FormControl} API of
     * which the type declaration documents the type and the value declaration corresponds with an implementation detail.
     */
    constructor(checker, isLocalCompilation = false, skipPrivateValueDeclarationTypes = false) {
        this.checker = checker;
        this.isLocalCompilation = isLocalCompilation;
        this.skipPrivateValueDeclarationTypes = skipPrivateValueDeclarationTypes;
    }
    getDecoratorsOfDeclaration(declaration) {
        const decorators = typescript_1.default.canHaveDecorators(declaration)
            ? typescript_1.default.getDecorators(declaration)
            : undefined;
        return decorators !== undefined && decorators.length
            ? decorators
                .map((decorator) => this._reflectDecorator(decorator))
                .filter((dec) => dec !== null)
            : null;
    }
    getMembersOfClass(clazz) {
        const tsClazz = castDeclarationToClassOrDie(clazz);
        return tsClazz.members
            .map((member) => {
            const result = reflectClassMember(member);
            if (result === null) {
                return null;
            }
            return Object.assign(Object.assign({}, result), { decorators: this.getDecoratorsOfDeclaration(member) });
        })
            .filter((member) => member !== null);
    }
    getConstructorParameters(clazz) {
        const tsClazz = castDeclarationToClassOrDie(clazz);
        const isDeclaration = tsClazz.getSourceFile().isDeclarationFile;
        // For non-declaration files, we want to find the constructor with a `body`. The constructors
        // without a `body` are overloads whereas we want the implementation since it's the one that'll
        // be executed and which can have decorators. For declaration files, we take the first one that
        // we get.
        const ctor = tsClazz.members.find((member) => typescript_1.default.isConstructorDeclaration(member) && (isDeclaration || member.body !== undefined));
        if (ctor === undefined) {
            return null;
        }
        return ctor.parameters.map((node) => {
            // The name of the parameter is easy.
            const name = parameterName(node.name);
            const decorators = this.getDecoratorsOfDeclaration(node);
            // It may or may not be possible to write an expression that refers to the value side of the
            // type named for the parameter.
            let originalTypeNode = node.type || null;
            let typeNode = originalTypeNode;
            // Check if we are dealing with a simple nullable union type e.g. `foo: Foo|null`
            // and extract the type. More complex union types e.g. `foo: Foo|Bar` are not supported.
            // We also don't need to support `foo: Foo|undefined` because Angular's DI injects `null` for
            // optional tokes that don't have providers.
            if (typeNode && typescript_1.default.isUnionTypeNode(typeNode)) {
                let childTypeNodes = typeNode.types.filter((childTypeNode) => !(typescript_1.default.isLiteralTypeNode(childTypeNode) &&
                    childTypeNode.literal.kind === typescript_1.default.SyntaxKind.NullKeyword));
                if (childTypeNodes.length === 1) {
                    typeNode = childTypeNodes[0];
                }
            }
            const typeValueReference = (0, type_to_value_1.typeToValue)(typeNode, this.checker, this.isLocalCompilation);
            return {
                name,
                nameNode: node.name,
                typeValueReference,
                typeNode: originalTypeNode,
                decorators,
            };
        });
    }
    getImportOfIdentifier(id) {
        const directImport = this.getDirectImportOfIdentifier(id);
        if (directImport !== null) {
            return directImport;
        }
        else if (typescript_1.default.isQualifiedName(id.parent) && id.parent.right === id) {
            return this.getImportOfNamespacedIdentifier(id, getQualifiedNameRoot(id.parent));
        }
        else if (typescript_1.default.isPropertyAccessExpression(id.parent) && id.parent.name === id) {
            return this.getImportOfNamespacedIdentifier(id, getFarLeftIdentifier(id.parent));
        }
        else {
            return null;
        }
    }
    getExportsOfModule(node) {
        // In TypeScript code, modules are only ts.SourceFiles. Throw if the node isn't a module.
        if (!typescript_1.default.isSourceFile(node)) {
            throw new Error(`getExportsOfModule() called on non-SourceFile in TS code`);
        }
        // Reflect the module to a Symbol, and use getExportsOfModule() to get a list of exported
        // Symbols.
        const symbol = this.checker.getSymbolAtLocation(node);
        if (symbol === undefined) {
            return null;
        }
        const map = new Map();
        this.checker.getExportsOfModule(symbol).forEach((exportSymbol) => {
            // Map each exported Symbol to a Declaration and add it to the map.
            const decl = this.getDeclarationOfSymbol(exportSymbol, null);
            if (decl !== null) {
                map.set(exportSymbol.name, decl);
            }
        });
        return map;
    }
    isClass(node) {
        // For our purposes, classes are "named" ts.ClassDeclarations;
        // (`node.name` can be undefined in unnamed default exports: `default export class { ... }`).
        return (0, util_1.isNamedClassDeclaration)(node);
    }
    hasBaseClass(clazz) {
        return this.getBaseClassExpression(clazz) !== null;
    }
    getBaseClassExpression(clazz) {
        if (!(typescript_1.default.isClassDeclaration(clazz) || typescript_1.default.isClassExpression(clazz)) ||
            clazz.heritageClauses === undefined) {
            return null;
        }
        const extendsClause = clazz.heritageClauses.find((clause) => clause.token === typescript_1.default.SyntaxKind.ExtendsKeyword);
        if (extendsClause === undefined) {
            return null;
        }
        const extendsType = extendsClause.types[0];
        if (extendsType === undefined) {
            return null;
        }
        return extendsType.expression;
    }
    getDeclarationOfIdentifier(id) {
        // Resolve the identifier to a Symbol, and return the declaration of that.
        let symbol = this.checker.getSymbolAtLocation(id);
        if (symbol === undefined) {
            return null;
        }
        return this.getDeclarationOfSymbol(symbol, id);
    }
    getDefinitionOfFunction(node) {
        if (!typescript_1.default.isFunctionDeclaration(node) &&
            !typescript_1.default.isMethodDeclaration(node) &&
            !typescript_1.default.isFunctionExpression(node) &&
            !typescript_1.default.isArrowFunction(node)) {
            return null;
        }
        let body = null;
        if (node.body !== undefined) {
            // The body might be an expression if the node is an arrow function.
            body = typescript_1.default.isBlock(node.body)
                ? Array.from(node.body.statements)
                : [typescript_1.default.factory.createReturnStatement(node.body)];
        }
        const type = this.checker.getTypeAtLocation(node);
        const signatures = this.checker.getSignaturesOfType(type, typescript_1.default.SignatureKind.Call);
        return {
            node,
            body,
            signatureCount: signatures.length,
            typeParameters: node.typeParameters === undefined ? null : Array.from(node.typeParameters),
            parameters: node.parameters.map((param) => {
                const name = parameterName(param.name);
                const initializer = param.initializer || null;
                return { name, node: param, initializer, type: param.type || null };
            }),
        };
    }
    getGenericArityOfClass(clazz) {
        if (!typescript_1.default.isClassDeclaration(clazz)) {
            return null;
        }
        return clazz.typeParameters !== undefined ? clazz.typeParameters.length : 0;
    }
    getVariableValue(declaration) {
        return declaration.initializer || null;
    }
    isStaticallyExported(decl) {
        // First check if there's an `export` modifier directly on the declaration.
        let topLevel = decl;
        if (typescript_1.default.isVariableDeclaration(decl) && typescript_1.default.isVariableDeclarationList(decl.parent)) {
            topLevel = decl.parent.parent;
        }
        const modifiers = typescript_1.default.canHaveModifiers(topLevel) ? typescript_1.default.getModifiers(topLevel) : undefined;
        if (modifiers !== undefined &&
            modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.ExportKeyword)) {
            // The node is part of a declaration that's directly exported.
            return true;
        }
        // If `topLevel` is not directly exported via a modifier, then it might be indirectly exported,
        // e.g.:
        //
        // class Foo {}
        // export {Foo};
        //
        // The only way to check this is to look at the module level for exports of the class. As a
        // performance optimization, this check is only performed if the class is actually declared at
        // the top level of the file and thus eligible for exporting in the first place.
        if (topLevel.parent === undefined || !typescript_1.default.isSourceFile(topLevel.parent)) {
            return false;
        }
        const localExports = this.getLocalExportedDeclarationsOfSourceFile(decl.getSourceFile());
        return localExports.has(decl);
    }
    getDirectImportOfIdentifier(id) {
        const symbol = this.checker.getSymbolAtLocation(id);
        if (symbol === undefined ||
            symbol.declarations === undefined ||
            symbol.declarations.length !== 1) {
            return null;
        }
        const decl = symbol.declarations[0];
        const importDecl = getContainingImportDeclaration(decl);
        // Ignore declarations that are defined locally (not imported).
        if (importDecl === null) {
            return null;
        }
        // The module specifier is guaranteed to be a string literal, so this should always pass.
        if (!typescript_1.default.isStringLiteral(importDecl.moduleSpecifier)) {
            // Not allowed to happen in TypeScript ASTs.
            return null;
        }
        return {
            from: importDecl.moduleSpecifier.text,
            name: getExportedName(decl, id),
            node: importDecl,
        };
    }
    /**
     * Try to get the import info for this identifier as though it is a namespaced import.
     *
     * For example, if the identifier is the `Directive` part of a qualified type chain like:
     *
     * ```ts
     * core.Directive
     * ```
     *
     * then it might be that `core` is a namespace import such as:
     *
     * ```ts
     * import * as core from 'tslib';
     * ```
     *
     * @param id the TypeScript identifier to find the import info for.
     * @returns The import info if this is a namespaced import or `null`.
     */
    getImportOfNamespacedIdentifier(id, namespaceIdentifier) {
        if (namespaceIdentifier === null) {
            return null;
        }
        const namespaceSymbol = this.checker.getSymbolAtLocation(namespaceIdentifier);
        if (!namespaceSymbol || namespaceSymbol.declarations === undefined) {
            return null;
        }
        const declaration = namespaceSymbol.declarations.length === 1 ? namespaceSymbol.declarations[0] : null;
        if (!declaration) {
            return null;
        }
        const namespaceDeclaration = typescript_1.default.isNamespaceImport(declaration) ? declaration : null;
        if (!namespaceDeclaration) {
            return null;
        }
        const importDeclaration = namespaceDeclaration.parent.parent;
        if (!typescript_1.default.isImportDeclaration(importDeclaration) ||
            !typescript_1.default.isStringLiteral(importDeclaration.moduleSpecifier)) {
            // Should not happen as this would be invalid TypesScript
            return null;
        }
        return {
            from: importDeclaration.moduleSpecifier.text,
            name: id.text,
            node: importDeclaration,
        };
    }
    /**
     * Resolve a `ts.Symbol` to its declaration, keeping track of the `viaModule` along the way.
     */
    getDeclarationOfSymbol(symbol, originalId) {
        // If the symbol points to a ShorthandPropertyAssignment, resolve it.
        let valueDeclaration = undefined;
        if (symbol.valueDeclaration !== undefined) {
            valueDeclaration = symbol.valueDeclaration;
        }
        else if (symbol.declarations !== undefined && symbol.declarations.length > 0) {
            valueDeclaration = symbol.declarations[0];
        }
        if (valueDeclaration !== undefined && typescript_1.default.isShorthandPropertyAssignment(valueDeclaration)) {
            const shorthandSymbol = this.checker.getShorthandAssignmentValueSymbol(valueDeclaration);
            if (shorthandSymbol === undefined) {
                return null;
            }
            return this.getDeclarationOfSymbol(shorthandSymbol, originalId);
        }
        else if (valueDeclaration !== undefined && typescript_1.default.isExportSpecifier(valueDeclaration)) {
            const targetSymbol = this.checker.getExportSpecifierLocalTargetSymbol(valueDeclaration);
            if (targetSymbol === undefined) {
                return null;
            }
            return this.getDeclarationOfSymbol(targetSymbol, originalId);
        }
        const importInfo = originalId && this.getImportOfIdentifier(originalId);
        // Now, resolve the Symbol to its declaration by following any and all aliases.
        while (symbol.flags & typescript_1.default.SymbolFlags.Alias) {
            symbol = this.checker.getAliasedSymbol(symbol);
        }
        // Look at the resolved Symbol's declarations and pick one of them to return.
        // Value declarations are given precedence over type declarations if not specified otherwise
        if (symbol.valueDeclaration !== undefined &&
            (!this.skipPrivateValueDeclarationTypes || !isPrivateSymbol(this.checker, symbol))) {
            return {
                node: symbol.valueDeclaration,
                viaModule: this._viaModule(symbol.valueDeclaration, originalId, importInfo),
            };
        }
        else if (symbol.declarations !== undefined && symbol.declarations.length > 0) {
            return {
                node: symbol.declarations[0],
                viaModule: this._viaModule(symbol.declarations[0], originalId, importInfo),
            };
        }
        else {
            return null;
        }
    }
    _reflectDecorator(node) {
        // Attempt to resolve the decorator expression into a reference to a concrete Identifier. The
        // expression may contain a call to a function which returns the decorator function, in which
        // case we want to return the arguments.
        let decoratorExpr = node.expression;
        let args = null;
        // Check for call expressions.
        if (typescript_1.default.isCallExpression(decoratorExpr)) {
            args = Array.from(decoratorExpr.arguments);
            decoratorExpr = decoratorExpr.expression;
        }
        // The final resolved decorator should be a `ts.Identifier` - if it's not, then something is
        // wrong and the decorator can't be resolved statically.
        if (!(0, host_1.isDecoratorIdentifier)(decoratorExpr)) {
            return null;
        }
        const decoratorIdentifier = typescript_1.default.isIdentifier(decoratorExpr) ? decoratorExpr : decoratorExpr.name;
        const importDecl = this.getImportOfIdentifier(decoratorIdentifier);
        return {
            name: decoratorIdentifier.text,
            identifier: decoratorExpr,
            import: importDecl,
            node,
            args,
        };
    }
    /**
     * Get the set of declarations declared in `file` which are exported.
     */
    getLocalExportedDeclarationsOfSourceFile(file) {
        const cacheSf = file;
        if (cacheSf[LocalExportedDeclarations] !== undefined) {
            // TS does not currently narrow symbol-keyed fields, hence the non-null assert is needed.
            return cacheSf[LocalExportedDeclarations];
        }
        const exportSet = new Set();
        cacheSf[LocalExportedDeclarations] = exportSet;
        const sfSymbol = this.checker.getSymbolAtLocation(cacheSf);
        if (sfSymbol === undefined || sfSymbol.exports === undefined) {
            return exportSet;
        }
        // Scan the exported symbol of the `ts.SourceFile` for the original `symbol` of the class
        // declaration.
        //
        // Note: when checking multiple classes declared in the same file, this repeats some operations.
        // In theory, this could be expensive if run in the context of a massive input file. If
        // performance does become an issue here, it should be possible to create a `Set<>`
        // Unfortunately, `ts.Iterator` doesn't implement the iterator protocol, so iteration here is
        // done manually.
        const iter = sfSymbol.exports.values();
        let item = iter.next();
        while (item.done !== true) {
            let exportedSymbol = item.value;
            // If this exported symbol comes from an `export {Foo}` statement, then the symbol is actually
            // for the export declaration, not the original declaration. Such a symbol will be an alias,
            // so unwrap aliasing if necessary.
            if (exportedSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
                exportedSymbol = this.checker.getAliasedSymbol(exportedSymbol);
            }
            if (exportedSymbol.valueDeclaration !== undefined &&
                exportedSymbol.valueDeclaration.getSourceFile() === file) {
                exportSet.add(exportedSymbol.valueDeclaration);
            }
            item = iter.next();
        }
        return exportSet;
    }
    _viaModule(declaration, originalId, importInfo) {
        if (importInfo === null &&
            originalId !== null &&
            declaration.getSourceFile() !== originalId.getSourceFile()) {
            return host_1.AmbientImport;
        }
        return importInfo !== null && importInfo.from !== null && !importInfo.from.startsWith('.')
            ? importInfo.from
            : null;
    }
}
exports.TypeScriptReflectionHost = TypeScriptReflectionHost;
function reflectNameOfDeclaration(decl) {
    const id = reflectIdentifierOfDeclaration(decl);
    return (id && id.text) || null;
}
function reflectIdentifierOfDeclaration(decl) {
    if (typescript_1.default.isClassDeclaration(decl) || typescript_1.default.isFunctionDeclaration(decl)) {
        return decl.name || null;
    }
    else if (typescript_1.default.isVariableDeclaration(decl)) {
        if (typescript_1.default.isIdentifier(decl.name)) {
            return decl.name;
        }
    }
    return null;
}
class TypeEntityToDeclarationError extends Error {
    constructor(message) {
        super(message);
        // Extending `Error` ends up breaking some internal tests. This appears to be a known issue
        // when extending errors in TS and the workaround is to explicitly set the prototype.
        // https://stackoverflow.com/questions/41102060/typescript-extending-error-class
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TypeEntityToDeclarationError = TypeEntityToDeclarationError;
/**
 * @throws {TypeEntityToDeclarationError} if the type cannot be converted
 *   to a declaration.
 */
function reflectTypeEntityToDeclaration(type, checker) {
    let realSymbol = checker.getSymbolAtLocation(type);
    if (realSymbol === undefined) {
        throw new TypeEntityToDeclarationError(`Cannot resolve type entity ${type.getText()} to symbol`);
    }
    while (realSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
        realSymbol = checker.getAliasedSymbol(realSymbol);
    }
    let node = null;
    if (realSymbol.valueDeclaration !== undefined) {
        node = realSymbol.valueDeclaration;
    }
    else if (realSymbol.declarations !== undefined && realSymbol.declarations.length === 1) {
        node = realSymbol.declarations[0];
    }
    else {
        throw new TypeEntityToDeclarationError(`Cannot resolve type entity symbol to declaration`);
    }
    if (typescript_1.default.isQualifiedName(type)) {
        if (!typescript_1.default.isIdentifier(type.left)) {
            throw new TypeEntityToDeclarationError(`Cannot handle qualified name with non-identifier lhs`);
        }
        const symbol = checker.getSymbolAtLocation(type.left);
        if (symbol === undefined ||
            symbol.declarations === undefined ||
            symbol.declarations.length !== 1) {
            throw new TypeEntityToDeclarationError(`Cannot resolve qualified type entity lhs to symbol`);
        }
        const decl = symbol.declarations[0];
        if (typescript_1.default.isNamespaceImport(decl)) {
            const clause = decl.parent;
            const importDecl = clause.parent;
            if (!typescript_1.default.isStringLiteral(importDecl.moduleSpecifier)) {
                throw new TypeEntityToDeclarationError(`Module specifier is not a string`);
            }
            return { node, from: importDecl.moduleSpecifier.text };
        }
        else if (typescript_1.default.isModuleDeclaration(decl)) {
            return { node, from: null };
        }
        else {
            throw new TypeEntityToDeclarationError(`Unknown import type?`);
        }
    }
    else {
        return { node, from: null };
    }
}
function filterToMembersWithDecorator(members, name, module) {
    return members
        .filter((member) => !member.isStatic)
        .map((member) => {
        if (member.decorators === null) {
            return null;
        }
        const decorators = member.decorators.filter((dec) => {
            if (dec.import !== null) {
                return dec.import.name === name && (module === undefined || dec.import.from === module);
            }
            else {
                return dec.name === name && module === undefined;
            }
        });
        if (decorators.length === 0) {
            return null;
        }
        return { member, decorators };
    })
        .filter((value) => value !== null);
}
function extractModifiersOfMember(node) {
    const modifiers = typescript_1.default.getModifiers(node);
    let isStatic = false;
    let isReadonly = false;
    let accessLevel = host_1.ClassMemberAccessLevel.PublicWritable;
    if (modifiers !== undefined) {
        for (const modifier of modifiers) {
            switch (modifier.kind) {
                case typescript_1.default.SyntaxKind.StaticKeyword:
                    isStatic = true;
                    break;
                case typescript_1.default.SyntaxKind.PrivateKeyword:
                    accessLevel = host_1.ClassMemberAccessLevel.Private;
                    break;
                case typescript_1.default.SyntaxKind.ProtectedKeyword:
                    accessLevel = host_1.ClassMemberAccessLevel.Protected;
                    break;
                case typescript_1.default.SyntaxKind.ReadonlyKeyword:
                    isReadonly = true;
                    break;
            }
        }
    }
    if (isReadonly && accessLevel === host_1.ClassMemberAccessLevel.PublicWritable) {
        accessLevel = host_1.ClassMemberAccessLevel.PublicReadonly;
    }
    if (node.name !== undefined && typescript_1.default.isPrivateIdentifier(node.name)) {
        accessLevel = host_1.ClassMemberAccessLevel.EcmaScriptPrivate;
    }
    return { accessLevel, isStatic };
}
/**
 * Reflects a class element and returns static information about the
 * class member.
 *
 * Note: Decorator information is not included in this helper as it relies
 * on type checking to resolve originating import.
 */
function reflectClassMember(node) {
    let kind = null;
    let value = null;
    let name = null;
    let nameNode = null;
    if (typescript_1.default.isPropertyDeclaration(node)) {
        kind = host_1.ClassMemberKind.Property;
        value = node.initializer || null;
    }
    else if (typescript_1.default.isGetAccessorDeclaration(node)) {
        kind = host_1.ClassMemberKind.Getter;
    }
    else if (typescript_1.default.isSetAccessorDeclaration(node)) {
        kind = host_1.ClassMemberKind.Setter;
    }
    else if (typescript_1.default.isMethodDeclaration(node)) {
        kind = host_1.ClassMemberKind.Method;
    }
    else if (typescript_1.default.isConstructorDeclaration(node)) {
        kind = host_1.ClassMemberKind.Constructor;
    }
    else {
        return null;
    }
    if (typescript_1.default.isConstructorDeclaration(node)) {
        name = 'constructor';
    }
    else if (typescript_1.default.isIdentifier(node.name)) {
        name = node.name.text;
        nameNode = node.name;
    }
    else if (typescript_1.default.isStringLiteral(node.name)) {
        name = node.name.text;
        nameNode = node.name;
    }
    else if (typescript_1.default.isPrivateIdentifier(node.name)) {
        name = node.name.text;
        nameNode = node.name;
    }
    else {
        return null;
    }
    const { accessLevel, isStatic } = extractModifiersOfMember(node);
    return {
        node,
        implementation: node,
        kind,
        type: node.type || null,
        accessLevel,
        name,
        nameNode,
        value,
        isStatic,
    };
}
function findMember(members, name, isStatic = false) {
    return members.find((member) => member.isStatic === isStatic && member.name === name) || null;
}
function reflectObjectLiteral(node) {
    const map = new Map();
    node.properties.forEach((prop) => {
        if (typescript_1.default.isPropertyAssignment(prop)) {
            const name = propertyNameToString(prop.name);
            if (name === null) {
                return;
            }
            map.set(name, prop.initializer);
        }
        else if (typescript_1.default.isShorthandPropertyAssignment(prop)) {
            map.set(prop.name.text, prop.name);
        }
        else {
            return;
        }
    });
    return map;
}
function castDeclarationToClassOrDie(declaration) {
    if (!typescript_1.default.isClassDeclaration(declaration)) {
        throw new Error(`Reflecting on a ${typescript_1.default.SyntaxKind[declaration.kind]} instead of a ClassDeclaration.`);
    }
    return declaration;
}
function parameterName(name) {
    if (typescript_1.default.isIdentifier(name)) {
        return name.text;
    }
    else {
        return null;
    }
}
function propertyNameToString(node) {
    if (typescript_1.default.isIdentifier(node) || typescript_1.default.isStringLiteral(node) || typescript_1.default.isNumericLiteral(node)) {
        return node.text;
    }
    else {
        return null;
    }
}
/** Determines whether a given symbol represents a private API (symbols with names that start with `ɵ`) */
function isPrivateSymbol(typeChecker, symbol) {
    var _a;
    if (symbol.valueDeclaration !== undefined) {
        const symbolType = typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        return ((_a = symbolType === null || symbolType === void 0 ? void 0 : symbolType.symbol) === null || _a === void 0 ? void 0 : _a.name.startsWith('ɵ')) === true;
    }
    return false;
}
/**
 * Compute the left most identifier in a qualified type chain. E.g. the `a` of `a.b.c.SomeType`.
 * @param qualifiedName The starting property access expression from which we want to compute
 * the left most identifier.
 * @returns the left most identifier in the chain or `null` if it is not an identifier.
 */
function getQualifiedNameRoot(qualifiedName) {
    while (typescript_1.default.isQualifiedName(qualifiedName.left)) {
        qualifiedName = qualifiedName.left;
    }
    return typescript_1.default.isIdentifier(qualifiedName.left) ? qualifiedName.left : null;
}
/**
 * Compute the left most identifier in a property access chain. E.g. the `a` of `a.b.c.d`.
 * @param propertyAccess The starting property access expression from which we want to compute
 * the left most identifier.
 * @returns the left most identifier in the chain or `null` if it is not an identifier.
 */
function getFarLeftIdentifier(propertyAccess) {
    while (typescript_1.default.isPropertyAccessExpression(propertyAccess.expression)) {
        propertyAccess = propertyAccess.expression;
    }
    return typescript_1.default.isIdentifier(propertyAccess.expression) ? propertyAccess.expression : null;
}
/**
 * Gets the closest ancestor `ImportDeclaration` to a node.
 */
function getContainingImportDeclaration(node) {
    let parent = node.parent;
    while (parent && !typescript_1.default.isSourceFile(parent)) {
        if (typescript_1.default.isImportDeclaration(parent)) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}
/**
 * Compute the name by which the `decl` was exported, not imported.
 * If no such declaration can be found (e.g. it is a namespace import)
 * then fallback to the `originalId`.
 */
function getExportedName(decl, originalId) {
    return typescript_1.default.isImportSpecifier(decl)
        ? (decl.propertyName !== undefined ? decl.propertyName : decl.name).text
        : originalId.text;
}
const LocalExportedDeclarations = Symbol('LocalExportedDeclarations');
