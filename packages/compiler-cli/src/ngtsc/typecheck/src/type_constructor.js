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
exports.generateTypeCtorDeclarationFn = generateTypeCtorDeclarationFn;
exports.generateInlineTypeCtor = generateInlineTypeCtor;
exports.requiresInlineTypeCtor = requiresInlineTypeCtor;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const tcb_util_1 = require("./tcb_util");
const ts_util_1 = require("./ts_util");
function generateTypeCtorDeclarationFn(env, meta, nodeTypeRef, typeParams) {
    const rawTypeArgs = typeParams !== undefined ? generateGenericArgs(typeParams) : undefined;
    const rawType = typescript_1.default.factory.createTypeReferenceNode(nodeTypeRef, rawTypeArgs);
    const initParam = constructTypeCtorParameter(env, meta, rawType);
    const typeParameters = typeParametersWithDefaultTypes(typeParams);
    if (meta.body) {
        const fnType = typescript_1.default.factory.createFunctionTypeNode(
        /* typeParameters */ typeParameters, 
        /* parameters */ [initParam], 
        /* type */ rawType);
        const decl = typescript_1.default.factory.createVariableDeclaration(
        /* name */ meta.fnName, 
        /* exclamationToken */ undefined, 
        /* type */ fnType, 
        /* body */ typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull()));
        const declList = typescript_1.default.factory.createVariableDeclarationList([decl], typescript_1.default.NodeFlags.Const);
        return typescript_1.default.factory.createVariableStatement(
        /* modifiers */ undefined, 
        /* declarationList */ declList);
    }
    else {
        return typescript_1.default.factory.createFunctionDeclaration(
        /* modifiers */ [typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.DeclareKeyword)], 
        /* asteriskToken */ undefined, 
        /* name */ meta.fnName, 
        /* typeParameters */ typeParameters, 
        /* parameters */ [initParam], 
        /* type */ rawType, 
        /* body */ undefined);
    }
}
/**
 * Generate an inline type constructor for the given class and metadata.
 *
 * An inline type constructor is a specially shaped TypeScript static method, intended to be placed
 * within a directive class itself, that permits type inference of any generic type parameters of
 * the class from the types of expressions bound to inputs or outputs, and the types of elements
 * that match queries performed by the directive. It also catches any errors in the types of these
 * expressions. This method is never called at runtime, but is used in type-check blocks to
 * construct directive types.
 *
 * An inline type constructor for NgFor looks like:
 *
 * static ngTypeCtor<T>(init: Pick<NgForOf<T>, 'ngForOf'|'ngForTrackBy'|'ngForTemplate'>):
 *   NgForOf<T>;
 *
 * A typical constructor would be:
 *
 * NgForOf.ngTypeCtor(init: {
 *   ngForOf: ['foo', 'bar'],
 *   ngForTrackBy: null as any,
 *   ngForTemplate: null as any,
 * }); // Infers a type of NgForOf<string>.
 *
 * Any inputs declared on the type for which no property binding is present are assigned a value of
 * type `any`, to avoid producing any type errors for unset inputs.
 *
 * Inline type constructors are used when the type being created has bounded generic types which
 * make writing a declared type constructor (via `generateTypeCtorDeclarationFn`) difficult or
 * impossible.
 *
 * @param node the `ClassDeclaration<ts.ClassDeclaration>` for which a type constructor will be
 * generated.
 * @param meta additional metadata required to generate the type constructor.
 * @returns a `ts.MethodDeclaration` for the type constructor.
 */
function generateInlineTypeCtor(env, node, meta) {
    // Build rawType, a `ts.TypeNode` of the class with its generic parameters passed through from
    // the definition without any type bounds. For example, if the class is
    // `FooDirective<T extends Bar>`, its rawType would be `FooDirective<T>`.
    const rawTypeArgs = node.typeParameters !== undefined ? generateGenericArgs(node.typeParameters) : undefined;
    const rawType = typescript_1.default.factory.createTypeReferenceNode(node.name, rawTypeArgs);
    const initParam = constructTypeCtorParameter(env, meta, rawType);
    // If this constructor is being generated into a .ts file, then it needs a fake body. The body
    // is set to a return of `null!`. If the type constructor is being generated into a .d.ts file,
    // it needs no body.
    let body = undefined;
    if (meta.body) {
        body = typescript_1.default.factory.createBlock([
            typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createNull())),
        ]);
    }
    // Create the type constructor method declaration.
    return typescript_1.default.factory.createMethodDeclaration(
    /* modifiers */ [typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.StaticKeyword)], 
    /* asteriskToken */ undefined, 
    /* name */ meta.fnName, 
    /* questionToken */ undefined, 
    /* typeParameters */ typeParametersWithDefaultTypes(node.typeParameters), 
    /* parameters */ [initParam], 
    /* type */ rawType, 
    /* body */ body);
}
function constructTypeCtorParameter(env, meta, rawType) {
    // initType is the type of 'init', the single argument to the type constructor method.
    // If the Directive has any inputs, its initType will be:
    //
    // Pick<rawType, 'inputA'|'inputB'>
    //
    // Pick here is used to select only those fields from which the generic type parameters of the
    // directive will be inferred.
    //
    // In the special case there are no inputs, initType is set to {}.
    let initType = null;
    const plainKeys = [];
    const coercedKeys = [];
    const signalInputKeys = [];
    for (const { classPropertyName, transform, isSignal } of meta.fields.inputs) {
        if (isSignal) {
            signalInputKeys.push(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral(classPropertyName)));
        }
        else if (!meta.coercedInputFields.has(classPropertyName)) {
            plainKeys.push(typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral(classPropertyName)));
        }
        else {
            const coercionType = transform != null
                ? transform.type.node
                : (0, ts_util_1.tsCreateTypeQueryForCoercedInput)(rawType.typeName, classPropertyName);
            coercedKeys.push(typescript_1.default.factory.createPropertySignature(
            /* modifiers */ undefined, 
            /* name */ classPropertyName, 
            /* questionToken */ undefined, 
            /* type */ coercionType));
        }
    }
    if (plainKeys.length > 0) {
        // Construct a union of all the field names.
        const keyTypeUnion = typescript_1.default.factory.createUnionTypeNode(plainKeys);
        // Construct the Pick<rawType, keyTypeUnion>.
        initType = typescript_1.default.factory.createTypeReferenceNode('Pick', [rawType, keyTypeUnion]);
    }
    if (coercedKeys.length > 0) {
        const coercedLiteral = typescript_1.default.factory.createTypeLiteralNode(coercedKeys);
        initType =
            initType !== null
                ? typescript_1.default.factory.createIntersectionTypeNode([initType, coercedLiteral])
                : coercedLiteral;
    }
    if (signalInputKeys.length > 0) {
        const keyTypeUnion = typescript_1.default.factory.createUnionTypeNode(signalInputKeys);
        // Construct the UnwrapDirectiveSignalInputs<rawType, keyTypeUnion>.
        const unwrapDirectiveSignalInputsExpr = env.referenceExternalType(compiler_1.R3Identifiers.UnwrapDirectiveSignalInputs.moduleName, compiler_1.R3Identifiers.UnwrapDirectiveSignalInputs.name, [
            // TODO:
            new compiler_1.ExpressionType(new compiler_1.WrappedNodeExpr(rawType)),
            new compiler_1.ExpressionType(new compiler_1.WrappedNodeExpr(keyTypeUnion)),
        ]);
        initType =
            initType !== null
                ? typescript_1.default.factory.createIntersectionTypeNode([initType, unwrapDirectiveSignalInputsExpr])
                : unwrapDirectiveSignalInputsExpr;
    }
    if (initType === null) {
        // Special case - no inputs, outputs, or other fields which could influence the result type.
        initType = typescript_1.default.factory.createTypeLiteralNode([]);
    }
    // Create the 'init' parameter itself.
    return typescript_1.default.factory.createParameterDeclaration(
    /* modifiers */ undefined, 
    /* dotDotDotToken */ undefined, 
    /* name */ 'init', 
    /* questionToken */ undefined, 
    /* type */ initType, 
    /* initializer */ undefined);
}
function generateGenericArgs(params) {
    return params.map((param) => typescript_1.default.factory.createTypeReferenceNode(param.name, undefined));
}
function requiresInlineTypeCtor(node, host, env) {
    // The class requires an inline type constructor if it has generic type bounds that can not be
    // emitted into the provided type-check environment.
    return !(0, tcb_util_1.checkIfGenericTypeBoundsCanBeEmitted)(node, host, env);
}
/**
 * Add a default `= any` to type parameters that don't have a default value already.
 *
 * TypeScript uses the default type of a type parameter whenever inference of that parameter
 * fails. This can happen when inferring a complex type from 'any'. For example, if `NgFor`'s
 * inference is done with the TCB code:
 *
 * ```ts
 * class NgFor<T> {
 *   ngForOf: T[];
 * }
 *
 * declare function ctor<T>(o: Pick<NgFor<T>, 'ngForOf'|'ngForTrackBy'|'ngForTemplate'>):
 * NgFor<T>;
 * ```
 *
 * An invocation looks like:
 *
 * ```ts
 * var _t1 = ctor({ngForOf: [1, 2], ngForTrackBy: null as any, ngForTemplate: null as any});
 * ```
 *
 * This correctly infers the type `NgFor<number>` for `_t1`, since `T` is inferred from the
 * assignment of type `number[]` to `ngForOf`'s type `T[]`. However, if `any` is passed instead:
 *
 * ```ts
 * var _t2 = ctor({ngForOf: [1, 2] as any, ngForTrackBy: null as any, ngForTemplate: null as
 * any});
 * ```
 *
 * then inference for `T` fails (it cannot be inferred from `T[] = any`). In this case, `T`
 * takes the type `{}`, and so `_t2` is inferred as `NgFor<{}>`. This is obviously wrong.
 *
 * Adding a default type to the generic declaration in the constructor solves this problem, as
 * the default type will be used in the event that inference fails.
 *
 * ```ts
 * declare function ctor<T = any>(o: Pick<NgFor<T>, 'ngForOf'>): NgFor<T>;
 *
 * var _t3 = ctor({ngForOf: [1, 2] as any});
 * ```
 *
 * This correctly infers `T` as `any`, and therefore `_t3` as `NgFor<any>`.
 */
function typeParametersWithDefaultTypes(params) {
    if (params === undefined) {
        return undefined;
    }
    return params.map((param) => {
        if (param.default === undefined) {
            return typescript_1.default.factory.updateTypeParameterDeclaration(param, param.modifiers, param.name, param.constraint, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
        }
        else {
            return param;
        }
    });
}
