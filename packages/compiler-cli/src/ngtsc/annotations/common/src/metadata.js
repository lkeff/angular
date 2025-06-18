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
exports.extractClassMetadata = extractClassMetadata;
exports.removeIdentifierReferences = removeIdentifierReferences;
const diagnostics_1 = require("../../../diagnostics");
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const util_1 = require("./util");
/**
 * Given a class declaration, generate a call to `setClassMetadata` with the Angular metadata
 * present on the class or its member fields. An ngDevMode guard is used to allow the call to be
 * tree-shaken away, as the `setClassMetadata` invocation is only needed for testing purposes.
 *
 * If no such metadata is present, this function returns `null`. Otherwise, the call is returned
 * as a `Statement` for inclusion along with the class.
 */
function extractClassMetadata(clazz, reflection, isCore, annotateForClosureCompiler, angularDecoratorTransform = (dec) => dec) {
    var _a;
    if (!reflection.isClass(clazz)) {
        return null;
    }
    const id = clazz.name;
    // Reflect over the class decorators. If none are present, or those that are aren't from
    // Angular, then return null. Otherwise, turn them into metadata.
    const classDecorators = reflection.getDecoratorsOfDeclaration(clazz);
    if (classDecorators === null) {
        return null;
    }
    const ngClassDecorators = classDecorators
        .filter((dec) => isAngularDecorator(dec, isCore))
        .map((decorator) => decoratorToMetadata(angularDecoratorTransform(decorator), annotateForClosureCompiler))
        // Since the `setClassMetadata` call is intended to be emitted after the class
        // declaration, we have to strip references to the existing identifiers or
        // TypeScript might generate invalid code when it emits to JS. In particular
        // this can break when emitting a class to ES5 which has a custom decorator
        // and is referenced inside of its own metadata (see #39509 for more information).
        .map((decorator) => removeIdentifierReferences(decorator, id.text));
    if (ngClassDecorators.length === 0) {
        return null;
    }
    const metaDecorators = new compiler_1.WrappedNodeExpr(typescript_1.default.factory.createArrayLiteralExpression(ngClassDecorators));
    // Convert the constructor parameters to metadata, passing null if none are present.
    let metaCtorParameters = null;
    const classCtorParameters = reflection.getConstructorParameters(clazz);
    if (classCtorParameters !== null) {
        const ctorParameters = classCtorParameters.map((param) => ctorParameterToMetadata(param, isCore));
        metaCtorParameters = new compiler_1.ArrowFunctionExpr([], new compiler_1.LiteralArrayExpr(ctorParameters));
    }
    // Do the same for property decorators.
    let metaPropDecorators = null;
    const classMembers = reflection
        .getMembersOfClass(clazz)
        .filter((member) => !member.isStatic && member.decorators !== null && member.decorators.length > 0);
    const duplicateDecoratedMembers = classMembers.filter((member, i, arr) => arr.findIndex((arrayMember) => arrayMember.name === member.name) < i);
    if (duplicateDecoratedMembers.length > 0) {
        // This should theoretically never happen, because the only way to have duplicate instance
        // member names is getter/setter pairs and decorators cannot appear in both a getter and the
        // corresponding setter.
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DUPLICATE_DECORATED_PROPERTIES, (_a = duplicateDecoratedMembers[0].nameNode) !== null && _a !== void 0 ? _a : clazz, `Duplicate decorated properties found on class '${clazz.name.text}': ` +
            duplicateDecoratedMembers.map((member) => member.name).join(', '));
    }
    const decoratedMembers = classMembers.map((member) => { var _a; return classMemberToMetadata((_a = member.nameNode) !== null && _a !== void 0 ? _a : member.name, member.decorators, isCore); });
    if (decoratedMembers.length > 0) {
        metaPropDecorators = new compiler_1.WrappedNodeExpr(typescript_1.default.factory.createObjectLiteralExpression(decoratedMembers));
    }
    return {
        type: new compiler_1.WrappedNodeExpr(id),
        decorators: metaDecorators,
        ctorParameters: metaCtorParameters,
        propDecorators: metaPropDecorators,
    };
}
/**
 * Convert a reflected constructor parameter to metadata.
 */
function ctorParameterToMetadata(param, isCore) {
    // Parameters sometimes have a type that can be referenced. If so, then use it, otherwise
    // its type is undefined.
    const type = param.typeValueReference.kind !== 2 /* TypeValueReferenceKind.UNAVAILABLE */
        ? (0, util_1.valueReferenceToExpression)(param.typeValueReference)
        : new compiler_1.LiteralExpr(undefined);
    const mapEntries = [
        { key: 'type', value: type, quoted: false },
    ];
    // If the parameter has decorators, include the ones from Angular.
    if (param.decorators !== null) {
        const ngDecorators = param.decorators
            .filter((dec) => isAngularDecorator(dec, isCore))
            .map((decorator) => decoratorToMetadata(decorator));
        const value = new compiler_1.WrappedNodeExpr(typescript_1.default.factory.createArrayLiteralExpression(ngDecorators));
        mapEntries.push({ key: 'decorators', value, quoted: false });
    }
    return (0, compiler_1.literalMap)(mapEntries);
}
/**
 * Convert a reflected class member to metadata.
 */
function classMemberToMetadata(name, decorators, isCore) {
    const ngDecorators = decorators
        .filter((dec) => isAngularDecorator(dec, isCore))
        .map((decorator) => decoratorToMetadata(decorator));
    const decoratorMeta = typescript_1.default.factory.createArrayLiteralExpression(ngDecorators);
    return typescript_1.default.factory.createPropertyAssignment(name, decoratorMeta);
}
/**
 * Convert a reflected decorator to metadata.
 */
function decoratorToMetadata(decorator, wrapFunctionsInParens) {
    if (decorator.identifier === null) {
        throw new Error('Illegal state: synthesized decorator cannot be emitted in class metadata.');
    }
    // Decorators have a type.
    const properties = [
        typescript_1.default.factory.createPropertyAssignment('type', decorator.identifier),
    ];
    // Sometimes they have arguments.
    if (decorator.args !== null && decorator.args.length > 0) {
        const args = decorator.args.map((arg) => {
            return wrapFunctionsInParens ? (0, util_1.wrapFunctionExpressionsInParens)(arg) : arg;
        });
        properties.push(typescript_1.default.factory.createPropertyAssignment('args', typescript_1.default.factory.createArrayLiteralExpression(args)));
    }
    return typescript_1.default.factory.createObjectLiteralExpression(properties, true);
}
/**
 * Whether a given decorator should be treated as an Angular decorator.
 *
 * Either it's used in @angular/core, or it's imported from there.
 */
function isAngularDecorator(decorator, isCore) {
    return isCore || (decorator.import !== null && decorator.import.from === '@angular/core');
}
/**
 * Recursively recreates all of the `Identifier` descendant nodes with a particular name inside
 * of an AST node, thus removing any references to them. Useful if a particular node has to be
 * taken from one place any emitted to another one exactly as it has been written.
 */
function removeIdentifierReferences(node, names) {
    const result = typescript_1.default.transform(node, [
        (context) => (root) => typescript_1.default.visitNode(root, function walk(current) {
            return (typescript_1.default.isIdentifier(current) &&
                (typeof names === 'string' ? current.text === names : names.has(current.text))
                ? typescript_1.default.factory.createIdentifier(current.text)
                : typescript_1.default.visitEachChild(current, walk, context));
        }),
    ]);
    return result.transformed[0];
}
