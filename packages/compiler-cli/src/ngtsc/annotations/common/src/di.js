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
exports.getConstructorDependencies = getConstructorDependencies;
exports.unwrapConstructorDependencies = unwrapConstructorDependencies;
exports.getValidConstructorDependencies = getValidConstructorDependencies;
exports.validateConstructorDependencies = validateConstructorDependencies;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const util_1 = require("./util");
function getConstructorDependencies(clazz, reflector, isCore) {
    const deps = [];
    const errors = [];
    let ctorParams = reflector.getConstructorParameters(clazz);
    if (ctorParams === null) {
        if (reflector.hasBaseClass(clazz)) {
            return null;
        }
        else {
            ctorParams = [];
        }
    }
    ctorParams.forEach((param, idx) => {
        let token = (0, util_1.valueReferenceToExpression)(param.typeValueReference);
        let attributeNameType = null;
        let optional = false, self = false, skipSelf = false, host = false;
        (param.decorators || [])
            .filter((dec) => isCore || (0, util_1.isAngularCore)(dec))
            .forEach((dec) => {
            const name = isCore || dec.import === null ? dec.name : dec.import.name;
            if (name === 'Inject') {
                if (dec.args === null || dec.args.length !== 1) {
                    throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, dec.node, `Unexpected number of arguments to @Inject().`);
                }
                token = new compiler_1.WrappedNodeExpr(dec.args[0]);
            }
            else if (name === 'Optional') {
                optional = true;
            }
            else if (name === 'SkipSelf') {
                skipSelf = true;
            }
            else if (name === 'Self') {
                self = true;
            }
            else if (name === 'Host') {
                host = true;
            }
            else if (name === 'Attribute') {
                if (dec.args === null || dec.args.length !== 1) {
                    throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, dec.node, `Unexpected number of arguments to @Attribute().`);
                }
                const attributeName = dec.args[0];
                token = new compiler_1.WrappedNodeExpr(attributeName);
                if (typescript_1.default.isStringLiteralLike(attributeName)) {
                    attributeNameType = new compiler_1.LiteralExpr(attributeName.text);
                }
                else {
                    attributeNameType = new compiler_1.WrappedNodeExpr(typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.UnknownKeyword));
                }
            }
            else {
                throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_UNEXPECTED, dec.node, `Unexpected decorator ${name} on parameter.`);
            }
        });
        if (token === null) {
            if (param.typeValueReference.kind !== 2 /* TypeValueReferenceKind.UNAVAILABLE */) {
                throw new Error('Illegal state: expected value reference to be unavailable if no token is present');
            }
            errors.push({
                index: idx,
                param,
                reason: param.typeValueReference.reason,
            });
        }
        else {
            deps.push({ token, attributeNameType, optional, self, skipSelf, host });
        }
    });
    if (errors.length === 0) {
        return { deps };
    }
    else {
        return { deps: null, errors };
    }
}
/**
 * Convert `ConstructorDeps` into the `R3DependencyMetadata` array for those deps if they're valid,
 * or into an `'invalid'` signal if they're not.
 *
 * This is a companion function to `validateConstructorDependencies` which accepts invalid deps.
 */
function unwrapConstructorDependencies(deps) {
    if (deps === null) {
        return null;
    }
    else if (deps.deps !== null) {
        // These constructor dependencies are valid.
        return deps.deps;
    }
    else {
        // These deps are invalid.
        return 'invalid';
    }
}
function getValidConstructorDependencies(clazz, reflector, isCore) {
    return validateConstructorDependencies(clazz, getConstructorDependencies(clazz, reflector, isCore));
}
/**
 * Validate that `ConstructorDeps` does not have any invalid dependencies and convert them into the
 * `R3DependencyMetadata` array if so, or raise a diagnostic if some deps are invalid.
 *
 * This is a companion function to `unwrapConstructorDependencies` which does not accept invalid
 * deps.
 */
function validateConstructorDependencies(clazz, deps) {
    if (deps === null) {
        return null;
    }
    else if (deps.deps !== null) {
        return deps.deps;
    }
    else {
        // There is at least one error.
        const error = deps.errors[0];
        throw createUnsuitableInjectionTokenError(clazz, error);
    }
}
/**
 * Creates a fatal error with diagnostic for an invalid injection token.
 * @param clazz The class for which the injection token was unavailable.
 * @param error The reason why no valid injection token is available.
 */
function createUnsuitableInjectionTokenError(clazz, error) {
    const { param, index, reason } = error;
    let chainMessage = undefined;
    let hints = undefined;
    switch (reason.kind) {
        case 5 /* ValueUnavailableKind.UNSUPPORTED */:
            chainMessage = 'Consider using the @Inject decorator to specify an injection token.';
            hints = [
                (0, diagnostics_1.makeRelatedInformation)(reason.typeNode, 'This type is not supported as injection token.'),
            ];
            break;
        case 1 /* ValueUnavailableKind.NO_VALUE_DECLARATION */:
            chainMessage = 'Consider using the @Inject decorator to specify an injection token.';
            hints = [
                (0, diagnostics_1.makeRelatedInformation)(reason.typeNode, 'This type does not have a value, so it cannot be used as injection token.'),
            ];
            if (reason.decl !== null) {
                hints.push((0, diagnostics_1.makeRelatedInformation)(reason.decl, 'The type is declared here.'));
            }
            break;
        case 2 /* ValueUnavailableKind.TYPE_ONLY_IMPORT */:
            chainMessage =
                'Consider changing the type-only import to a regular import, or use the @Inject decorator to specify an injection token.';
            hints = [
                (0, diagnostics_1.makeRelatedInformation)(reason.typeNode, 'This type is imported using a type-only import, which prevents it from being usable as an injection token.'),
                (0, diagnostics_1.makeRelatedInformation)(reason.node, 'The type-only import occurs here.'),
            ];
            break;
        case 4 /* ValueUnavailableKind.NAMESPACE */:
            chainMessage = 'Consider using the @Inject decorator to specify an injection token.';
            hints = [
                (0, diagnostics_1.makeRelatedInformation)(reason.typeNode, 'This type corresponds with a namespace, which cannot be used as injection token.'),
                (0, diagnostics_1.makeRelatedInformation)(reason.importClause, 'The namespace import occurs here.'),
            ];
            break;
        case 3 /* ValueUnavailableKind.UNKNOWN_REFERENCE */:
            chainMessage = 'The type should reference a known declaration.';
            hints = [(0, diagnostics_1.makeRelatedInformation)(reason.typeNode, 'This type could not be resolved.')];
            break;
        case 0 /* ValueUnavailableKind.MISSING_TYPE */:
            chainMessage =
                'Consider adding a type to the parameter or use the @Inject decorator to specify an injection token.';
            break;
    }
    const chain = {
        messageText: `No suitable injection token for parameter '${param.name || index}' of class '${clazz.name.text}'.`,
        category: typescript_1.default.DiagnosticCategory.Error,
        code: 0,
        next: [
            {
                messageText: chainMessage,
                category: typescript_1.default.DiagnosticCategory.Message,
                code: 0,
            },
        ],
    };
    return new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.PARAM_MISSING_TOKEN, param.nameNode, chain, hints);
}
