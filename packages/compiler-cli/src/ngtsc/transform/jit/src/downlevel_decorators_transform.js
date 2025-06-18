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
exports.getDownlevelDecoratorsTransform = getDownlevelDecoratorsTransform;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../../imports");
/**
 * Whether a given decorator should be treated as an Angular decorator.
 * Either it's used in @angular/core, or it's imported from there.
 */
function isAngularDecorator(decorator, isCore) {
    return isCore || (decorator.import !== null && decorator.import.from === '@angular/core');
}
/*
 #####################################################################
  Code below has been extracted from the tsickle decorator downlevel transformer
  and a few local modifications have been applied:

    1. Tsickle by default processed all decorators that had the `@Annotation` JSDoc.
       We modified the transform to only be concerned with known Angular decorators.
    2. Tsickle by default added `@nocollapse` to all generated `ctorParameters` properties.
       We only do this when `annotateForClosureCompiler` is enabled.
    3. Tsickle does not handle union types for dependency injection. i.e. if a injected type
       is denoted with `@Optional`, the actual type could be set to `T | null`.
       See: https://github.com/angular/angular-cli/commit/826803d0736b807867caff9f8903e508970ad5e4.
    4. Tsickle relied on `emitDecoratorMetadata` to be set to `true`. This is due to a limitation
       in TypeScript transformers that never has been fixed. We were able to work around this
       limitation so that `emitDecoratorMetadata` doesn't need to be specified.
       See: `patchAliasReferenceResolution` for more details.

  Here is a link to the tsickle revision on which this transformer is based:
  https://github.com/angular/tsickle/blob/fae06becb1570f491806060d83f29f2d50c43cdd/src/decorator_downlevel_transformer.ts
 #####################################################################
*/
const DECORATOR_INVOCATION_JSDOC_TYPE = '!Array<{type: !Function, args: (undefined|!Array<?>)}>';
/**
 * Extracts the type of the decorator (the function or expression invoked), as well as all the
 * arguments passed to the decorator. Returns an AST with the form:
 *
 *     // For @decorator(arg1, arg2)
 *     { type: decorator, args: [arg1, arg2] }
 */
function extractMetadataFromSingleDecorator(decorator, diagnostics) {
    const metadataProperties = [];
    const expr = decorator.expression;
    switch (expr.kind) {
        case typescript_1.default.SyntaxKind.Identifier:
            // The decorator was a plain @Foo.
            metadataProperties.push(typescript_1.default.factory.createPropertyAssignment('type', expr));
            break;
        case typescript_1.default.SyntaxKind.CallExpression:
            // The decorator was a call, like @Foo(bar).
            const call = expr;
            metadataProperties.push(typescript_1.default.factory.createPropertyAssignment('type', call.expression));
            if (call.arguments.length) {
                const args = [];
                for (const arg of call.arguments) {
                    args.push(arg);
                }
                const argsArrayLiteral = typescript_1.default.factory.createArrayLiteralExpression(typescript_1.default.factory.createNodeArray(args, true));
                metadataProperties.push(typescript_1.default.factory.createPropertyAssignment('args', argsArrayLiteral));
            }
            break;
        default:
            diagnostics.push({
                file: decorator.getSourceFile(),
                start: decorator.getStart(),
                length: decorator.getEnd() - decorator.getStart(),
                messageText: `${typescript_1.default.SyntaxKind[decorator.kind]} not implemented in gathering decorator metadata.`,
                category: typescript_1.default.DiagnosticCategory.Error,
                code: 0,
            });
            break;
    }
    return typescript_1.default.factory.createObjectLiteralExpression(metadataProperties);
}
/**
 * createCtorParametersClassProperty creates a static 'ctorParameters' property containing
 * downleveled decorator information.
 *
 * The property contains an arrow function that returns an array of object literals of the shape:
 *     static ctorParameters = () => [{
 *       type: SomeClass|undefined,  // the type of the param that's decorated, if it's a value.
 *       decorators: [{
 *         type: DecoratorFn,  // the type of the decorator that's invoked.
 *         args: [ARGS],       // the arguments passed to the decorator.
 *       }]
 *     }];
 */
function createCtorParametersClassProperty(diagnostics, entityNameToExpression, ctorParameters, isClosureCompilerEnabled) {
    const params = [];
    for (const ctorParam of ctorParameters) {
        if (!ctorParam.type && ctorParam.decorators.length === 0) {
            params.push(typescript_1.default.factory.createNull());
            continue;
        }
        const paramType = ctorParam.type
            ? typeReferenceToExpression(entityNameToExpression, ctorParam.type)
            : undefined;
        const members = [
            typescript_1.default.factory.createPropertyAssignment('type', paramType || typescript_1.default.factory.createIdentifier('undefined')),
        ];
        const decorators = [];
        for (const deco of ctorParam.decorators) {
            decorators.push(extractMetadataFromSingleDecorator(deco, diagnostics));
        }
        if (decorators.length) {
            members.push(typescript_1.default.factory.createPropertyAssignment('decorators', typescript_1.default.factory.createArrayLiteralExpression(decorators)));
        }
        params.push(typescript_1.default.factory.createObjectLiteralExpression(members));
    }
    const initializer = typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createArrayLiteralExpression(params, true));
    const ctorProp = typescript_1.default.factory.createPropertyDeclaration([typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.StaticKeyword)], 'ctorParameters', undefined, undefined, initializer);
    if (isClosureCompilerEnabled) {
        typescript_1.default.setSyntheticLeadingComments(ctorProp, [
            {
                kind: typescript_1.default.SyntaxKind.MultiLineCommentTrivia,
                text: [
                    `*`,
                    ` * @type {function(): !Array<(null|{`,
                    ` *   type: ?,`,
                    ` *   decorators: (undefined|${DECORATOR_INVOCATION_JSDOC_TYPE}),`,
                    ` * })>}`,
                    ` * @nocollapse`,
                    ` `,
                ].join('\n'),
                pos: -1,
                end: -1,
                hasTrailingNewLine: true,
            },
        ]);
    }
    return ctorProp;
}
/**
 * Returns an expression representing the (potentially) value part for the given node.
 *
 * This is a partial re-implementation of TypeScript's serializeTypeReferenceNode. This is a
 * workaround for https://github.com/Microsoft/TypeScript/issues/17516 (serializeTypeReferenceNode
 * not being exposed). In practice this implementation is sufficient for Angular's use of type
 * metadata.
 */
function typeReferenceToExpression(entityNameToExpression, node) {
    let kind = node.kind;
    if (typescript_1.default.isLiteralTypeNode(node)) {
        // Treat literal types like their base type (boolean, string, number).
        kind = node.literal.kind;
    }
    switch (kind) {
        case typescript_1.default.SyntaxKind.FunctionType:
        case typescript_1.default.SyntaxKind.ConstructorType:
            return typescript_1.default.factory.createIdentifier('Function');
        case typescript_1.default.SyntaxKind.ArrayType:
        case typescript_1.default.SyntaxKind.TupleType:
            return typescript_1.default.factory.createIdentifier('Array');
        case typescript_1.default.SyntaxKind.TypePredicate:
        case typescript_1.default.SyntaxKind.TrueKeyword:
        case typescript_1.default.SyntaxKind.FalseKeyword:
        case typescript_1.default.SyntaxKind.BooleanKeyword:
            return typescript_1.default.factory.createIdentifier('Boolean');
        case typescript_1.default.SyntaxKind.StringLiteral:
        case typescript_1.default.SyntaxKind.StringKeyword:
            return typescript_1.default.factory.createIdentifier('String');
        case typescript_1.default.SyntaxKind.ObjectKeyword:
            return typescript_1.default.factory.createIdentifier('Object');
        case typescript_1.default.SyntaxKind.NumberKeyword:
        case typescript_1.default.SyntaxKind.NumericLiteral:
            return typescript_1.default.factory.createIdentifier('Number');
        case typescript_1.default.SyntaxKind.TypeReference:
            const typeRef = node;
            // Ignore any generic types, just return the base type.
            return entityNameToExpression(typeRef.typeName);
        case typescript_1.default.SyntaxKind.UnionType:
            const childTypeNodes = node.types.filter((t) => !(typescript_1.default.isLiteralTypeNode(t) && t.literal.kind === typescript_1.default.SyntaxKind.NullKeyword));
            return childTypeNodes.length === 1
                ? typeReferenceToExpression(entityNameToExpression, childTypeNodes[0])
                : undefined;
        default:
            return undefined;
    }
}
/**
 * Checks whether a given symbol refers to a value that exists at runtime (as distinct from a type).
 *
 * Expands aliases, which is important for the case where
 *   import * as x from 'some-module';
 * and x is now a value (the module object).
 */
function symbolIsRuntimeValue(typeChecker, symbol) {
    if (symbol.flags & typescript_1.default.SymbolFlags.Alias) {
        symbol = typeChecker.getAliasedSymbol(symbol);
    }
    // Note that const enums are a special case, because
    // while they have a value, they don't exist at runtime.
    return (symbol.flags & typescript_1.default.SymbolFlags.Value & typescript_1.default.SymbolFlags.ConstEnumExcludes) !== 0;
}
/**
 * Gets a transformer for downleveling Angular constructor parameter and property decorators.
 *
 * Note that Angular class decorators are never processed as those rely on side effects that
 * would otherwise no longer be executed. i.e. the creation of a component definition.
 *
 * @param typeChecker Reference to the program's type checker.
 * @param host Reflection host that is used for determining decorators.
 * @param diagnostics List which will be populated with diagnostics if any.
 * @param isCore Whether the current TypeScript program is for the `@angular/core` package.
 * @param isClosureCompilerEnabled Whether closure annotations need to be added where needed.
 * @param shouldTransformClass Optional function to check if a given class should be transformed.
 */
function getDownlevelDecoratorsTransform(typeChecker, host, diagnostics, isCore, isClosureCompilerEnabled, shouldTransformClass) {
    function addJSDocTypeAnnotation(node, jsdocType) {
        if (!isClosureCompilerEnabled) {
            return;
        }
        typescript_1.default.setSyntheticLeadingComments(node, [
            {
                kind: typescript_1.default.SyntaxKind.MultiLineCommentTrivia,
                text: `* @type {${jsdocType}} `,
                pos: -1,
                end: -1,
                hasTrailingNewLine: true,
            },
        ]);
    }
    /**
     * createPropDecoratorsClassProperty creates a static 'propDecorators'
     * property containing type information for every property that has a
     * decorator applied.
     *
     *     static propDecorators: {[key: string]: {type: Function, args?:
     * any[]}[]} = { propA: [{type: MyDecorator, args: [1, 2]}, ...],
     *       ...
     *     };
     */
    function createPropDecoratorsClassProperty(diagnostics, properties) {
        //  `static propDecorators: {[key: string]: ` + {type: Function, args?:
        //  any[]}[] + `} = {\n`);
        const entries = [];
        for (const [name, decorators] of properties.entries()) {
            entries.push(typescript_1.default.factory.createPropertyAssignment(name, typescript_1.default.factory.createArrayLiteralExpression(decorators.map((deco) => extractMetadataFromSingleDecorator(deco, diagnostics)))));
        }
        const initializer = typescript_1.default.factory.createObjectLiteralExpression(entries, true);
        const prop = typescript_1.default.factory.createPropertyDeclaration([typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.StaticKeyword)], 'propDecorators', undefined, undefined, initializer);
        addJSDocTypeAnnotation(prop, `!Object<string, ${DECORATOR_INVOCATION_JSDOC_TYPE}>`);
        return prop;
    }
    return (context) => {
        // Ensure that referenced type symbols are not elided by TypeScript. Imports for
        // such parameter type symbols previously could be type-only, but now might be also
        // used in the `ctorParameters` static property as a value. We want to make sure
        // that TypeScript does not elide imports for such type references. Read more
        // about this in the description for `loadIsReferencedAliasDeclarationPatch`.
        const referencedParameterTypes = (0, imports_1.loadIsReferencedAliasDeclarationPatch)(context);
        /**
         * Converts an EntityName (from a type annotation) to an expression (accessing a value).
         *
         * For a given qualified name, this walks depth first to find the leftmost identifier,
         * and then converts the path into a property access that can be used as expression.
         */
        function entityNameToExpression(name) {
            const symbol = typeChecker.getSymbolAtLocation(name);
            // Check if the entity name references a symbol that is an actual value. If it is not, it
            // cannot be referenced by an expression, so return undefined.
            if (!symbol ||
                !symbolIsRuntimeValue(typeChecker, symbol) ||
                !symbol.declarations ||
                symbol.declarations.length === 0) {
                return undefined;
            }
            // If we deal with a qualified name, build up a property access expression
            // that could be used in the JavaScript output.
            if (typescript_1.default.isQualifiedName(name)) {
                const containerExpr = entityNameToExpression(name.left);
                if (containerExpr === undefined) {
                    return undefined;
                }
                return typescript_1.default.factory.createPropertyAccessExpression(containerExpr, name.right);
            }
            const decl = symbol.declarations[0];
            // If the given entity name has been resolved to an alias import declaration,
            // ensure that the alias declaration is not elided by TypeScript, and use its
            // name identifier to reference it at runtime.
            if ((0, imports_1.isAliasImportDeclaration)(decl)) {
                referencedParameterTypes === null || referencedParameterTypes === void 0 ? void 0 : referencedParameterTypes.add(decl);
                // If the entity name resolves to an alias import declaration, we reference the
                // entity based on the alias import name. This ensures that TypeScript properly
                // resolves the link to the import. Cloning the original entity name identifier
                // could lead to an incorrect resolution at local scope. e.g. Consider the following
                // snippet: `constructor(Dep: Dep) {}`. In such a case, the local `Dep` identifier
                // would resolve to the actual parameter name, and not to the desired import.
                // This happens because the entity name identifier symbol is internally considered
                // as type-only and therefore TypeScript tries to resolve it as value manually.
                // We can help TypeScript and avoid this non-reliable resolution by using an identifier
                // that is not type-only and is directly linked to the import alias declaration.
                if (decl.name !== undefined) {
                    return typescript_1.default.setOriginalNode(typescript_1.default.factory.createIdentifier(decl.name.text), decl.name);
                }
            }
            // Clone the original entity name identifier so that it can be used to reference
            // its value at runtime. This is used when the identifier is resolving to a file
            // local declaration (otherwise it would resolve to an alias import declaration).
            return typescript_1.default.setOriginalNode(typescript_1.default.factory.createIdentifier(name.text), name);
        }
        /**
         * Transforms a class element. Returns a three tuple of name, transformed element, and
         * decorators found. Returns an undefined name if there are no decorators to lower on the
         * element, or the element has an exotic name.
         */
        function transformClassElement(element) {
            element = typescript_1.default.visitEachChild(element, decoratorDownlevelVisitor, context);
            const decoratorsToKeep = [];
            const toLower = [];
            const decorators = host.getDecoratorsOfDeclaration(element) || [];
            for (const decorator of decorators) {
                // We only deal with concrete nodes in TypeScript sources, so we don't
                // need to handle synthetically created decorators.
                const decoratorNode = decorator.node;
                if (!isAngularDecorator(decorator, isCore)) {
                    decoratorsToKeep.push(decoratorNode);
                    continue;
                }
                toLower.push(decoratorNode);
            }
            if (!toLower.length)
                return [undefined, element, []];
            if (!element.name || !typescript_1.default.isIdentifier(element.name)) {
                // Method has a weird name, e.g.
                //   [Symbol.foo]() {...}
                diagnostics.push({
                    file: element.getSourceFile(),
                    start: element.getStart(),
                    length: element.getEnd() - element.getStart(),
                    messageText: `Cannot process decorators for class element with non-analyzable name.`,
                    category: typescript_1.default.DiagnosticCategory.Error,
                    code: 0,
                });
                return [undefined, element, []];
            }
            const elementModifiers = typescript_1.default.canHaveModifiers(element) ? typescript_1.default.getModifiers(element) : undefined;
            let modifiers;
            if (decoratorsToKeep.length || (elementModifiers === null || elementModifiers === void 0 ? void 0 : elementModifiers.length)) {
                modifiers = typescript_1.default.setTextRange(typescript_1.default.factory.createNodeArray([...decoratorsToKeep, ...(elementModifiers || [])]), element.modifiers);
            }
            return [element.name.text, cloneClassElementWithModifiers(element, modifiers), toLower];
        }
        /**
         * Transforms a constructor. Returns the transformed constructor and the list of parameter
         * information collected, consisting of decorators and optional type.
         */
        function transformConstructor(ctor) {
            ctor = typescript_1.default.visitEachChild(ctor, decoratorDownlevelVisitor, context);
            const newParameters = [];
            const oldParameters = ctor.parameters;
            const parametersInfo = [];
            for (const param of oldParameters) {
                const decoratorsToKeep = [];
                const paramInfo = { decorators: [], type: null };
                const decorators = host.getDecoratorsOfDeclaration(param) || [];
                for (const decorator of decorators) {
                    // We only deal with concrete nodes in TypeScript sources, so we don't
                    // need to handle synthetically created decorators.
                    const decoratorNode = decorator.node;
                    if (!isAngularDecorator(decorator, isCore)) {
                        decoratorsToKeep.push(decoratorNode);
                        continue;
                    }
                    paramInfo.decorators.push(decoratorNode);
                }
                if (param.type) {
                    // param has a type provided, e.g. "foo: Bar".
                    // The type will be emitted as a value expression in entityNameToExpression, which takes
                    // care not to emit anything for types that cannot be expressed as a value (e.g.
                    // interfaces).
                    paramInfo.type = param.type;
                }
                parametersInfo.push(paramInfo);
                // Must pass 'undefined' to avoid emitting decorator metadata.
                let modifiers;
                const paramModifiers = typescript_1.default.getModifiers(param);
                if (decoratorsToKeep.length || (paramModifiers === null || paramModifiers === void 0 ? void 0 : paramModifiers.length)) {
                    modifiers = [...decoratorsToKeep, ...(paramModifiers || [])];
                }
                const newParam = typescript_1.default.factory.updateParameterDeclaration(param, modifiers, param.dotDotDotToken, param.name, param.questionToken, param.type, param.initializer);
                newParameters.push(newParam);
            }
            const updated = typescript_1.default.factory.updateConstructorDeclaration(ctor, typescript_1.default.getModifiers(ctor), newParameters, ctor.body);
            return [updated, parametersInfo];
        }
        /**
         * Transforms a single class declaration:
         * - dispatches to strip decorators on members
         * - converts decorators on the class to annotations
         * - creates a ctorParameters property
         * - creates a propDecorators property
         */
        function transformClassDeclaration(classDecl) {
            const newMembers = [];
            const decoratedProperties = new Map();
            let classParameters = null;
            for (const member of classDecl.members) {
                switch (member.kind) {
                    case typescript_1.default.SyntaxKind.PropertyDeclaration:
                    case typescript_1.default.SyntaxKind.GetAccessor:
                    case typescript_1.default.SyntaxKind.SetAccessor:
                    case typescript_1.default.SyntaxKind.MethodDeclaration: {
                        const [name, newMember, decorators] = transformClassElement(member);
                        newMembers.push(newMember);
                        if (name)
                            decoratedProperties.set(name, decorators);
                        continue;
                    }
                    case typescript_1.default.SyntaxKind.Constructor: {
                        const ctor = member;
                        if (!ctor.body)
                            break;
                        const [newMember, parametersInfo] = transformConstructor(member);
                        classParameters = parametersInfo;
                        newMembers.push(newMember);
                        continue;
                    }
                    default:
                        break;
                }
                newMembers.push(typescript_1.default.visitEachChild(member, decoratorDownlevelVisitor, context));
            }
            // Note: The `ReflectionHost.getDecoratorsOfDeclaration()` method will not
            // return all decorators, but only ones that could be possible Angular decorators.
            const possibleAngularDecorators = host.getDecoratorsOfDeclaration(classDecl) || [];
            // Keep track if we come across an Angular class decorator. This is used
            // to determine whether constructor parameters should be captured or not.
            const hasAngularDecorator = possibleAngularDecorators.some((d) => isAngularDecorator(d, isCore));
            if (classParameters) {
                if (hasAngularDecorator || classParameters.some((p) => !!p.decorators.length)) {
                    // Capture constructor parameters if the class has Angular decorator applied,
                    // or if any of the parameters has decorators applied directly.
                    newMembers.push(createCtorParametersClassProperty(diagnostics, entityNameToExpression, classParameters, isClosureCompilerEnabled));
                }
            }
            if (decoratedProperties.size) {
                newMembers.push(createPropDecoratorsClassProperty(diagnostics, decoratedProperties));
            }
            const members = typescript_1.default.setTextRange(typescript_1.default.factory.createNodeArray(newMembers, classDecl.members.hasTrailingComma), classDecl.members);
            return typescript_1.default.factory.updateClassDeclaration(classDecl, classDecl.modifiers, classDecl.name, classDecl.typeParameters, classDecl.heritageClauses, members);
        }
        /**
         * Transformer visitor that looks for Angular decorators and replaces them with
         * downleveled static properties. Also collects constructor type metadata for
         * class declaration that are decorated with an Angular decorator.
         */
        function decoratorDownlevelVisitor(node) {
            if (typescript_1.default.isClassDeclaration(node) &&
                (shouldTransformClass === undefined || shouldTransformClass(node))) {
                return transformClassDeclaration(node);
            }
            return typescript_1.default.visitEachChild(node, decoratorDownlevelVisitor, context);
        }
        return (sf) => {
            // Downlevel decorators and constructor parameter types. We will keep track of all
            // referenced constructor parameter types so that we can instruct TypeScript to
            // not elide their imports if they previously were only type-only.
            return typescript_1.default.visitEachChild(sf, decoratorDownlevelVisitor, context);
        };
    };
}
function cloneClassElementWithModifiers(node, modifiers) {
    let clone;
    if (typescript_1.default.isMethodDeclaration(node)) {
        clone = typescript_1.default.factory.createMethodDeclaration(modifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
    }
    else if (typescript_1.default.isPropertyDeclaration(node)) {
        clone = typescript_1.default.factory.createPropertyDeclaration(modifiers, node.name, node.questionToken, node.type, node.initializer);
    }
    else if (typescript_1.default.isGetAccessor(node)) {
        clone = typescript_1.default.factory.createGetAccessorDeclaration(modifiers, node.name, node.parameters, node.type, node.body);
    }
    else if (typescript_1.default.isSetAccessor(node)) {
        clone = typescript_1.default.factory.createSetAccessorDeclaration(modifiers, node.name, node.parameters, node.body);
    }
    else {
        throw new Error(`Unsupported decorated member with kind ${typescript_1.default.SyntaxKind[node.kind]}`);
    }
    return typescript_1.default.setOriginalNode(clone, node);
}
