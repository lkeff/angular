"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeParameterEmitter = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const reflection_1 = require("../../reflection");
const translator_1 = require("../../translator");
/**
 * See `TypeEmitter` for more information on the emitting process.
 */
class TypeParameterEmitter {
    constructor(typeParameters, reflector) {
        this.typeParameters = typeParameters;
        this.reflector = reflector;
    }
    /**
     * Determines whether the type parameters can be emitted. If this returns true, then a call to
     * `emit` is known to succeed. Vice versa, if false is returned then `emit` should not be
     * called, as it would fail.
     */
    canEmit(canEmitReference) {
        if (this.typeParameters === undefined) {
            return true;
        }
        return this.typeParameters.every((typeParam) => {
            return (this.canEmitType(typeParam.constraint, canEmitReference) &&
                this.canEmitType(typeParam.default, canEmitReference));
        });
    }
    canEmitType(type, canEmitReference) {
        if (type === undefined) {
            return true;
        }
        return (0, translator_1.canEmitType)(type, (typeReference) => {
            const reference = this.resolveTypeReference(typeReference);
            if (reference === null) {
                return false;
            }
            if (reference instanceof imports_1.Reference) {
                return canEmitReference(reference);
            }
            return true;
        });
    }
    /**
     * Emits the type parameters using the provided emitter function for `Reference`s.
     */
    emit(emitReference) {
        if (this.typeParameters === undefined) {
            return undefined;
        }
        const emitter = new translator_1.TypeEmitter((type) => this.translateTypeReference(type, emitReference));
        return this.typeParameters.map((typeParam) => {
            const constraint = typeParam.constraint !== undefined ? emitter.emitType(typeParam.constraint) : undefined;
            const defaultType = typeParam.default !== undefined ? emitter.emitType(typeParam.default) : undefined;
            return typescript_1.default.factory.updateTypeParameterDeclaration(typeParam, typeParam.modifiers, typeParam.name, constraint, defaultType);
        });
    }
    resolveTypeReference(type) {
        const target = typescript_1.default.isIdentifier(type.typeName) ? type.typeName : type.typeName.right;
        const declaration = this.reflector.getDeclarationOfIdentifier(target);
        // If no declaration could be resolved or does not have a `ts.Declaration`, the type cannot be
        // resolved.
        if (declaration === null || declaration.node === null) {
            return null;
        }
        // If the declaration corresponds with a local type parameter, the type reference can be used
        // as is.
        if (this.isLocalTypeParameter(declaration.node)) {
            return type;
        }
        let owningModule = null;
        if (typeof declaration.viaModule === 'string') {
            owningModule = {
                specifier: declaration.viaModule,
                resolutionContext: type.getSourceFile().fileName,
            };
        }
        return new imports_1.Reference(declaration.node, declaration.viaModule === reflection_1.AmbientImport ? reflection_1.AmbientImport : owningModule);
    }
    translateTypeReference(type, emitReference) {
        const reference = this.resolveTypeReference(type);
        if (!(reference instanceof imports_1.Reference)) {
            return reference;
        }
        const typeNode = emitReference(reference);
        if (typeNode === null) {
            return null;
        }
        if (!typescript_1.default.isTypeReferenceNode(typeNode)) {
            throw new Error(`Expected TypeReferenceNode for emitted reference, got ${typescript_1.default.SyntaxKind[typeNode.kind]}.`);
        }
        return typeNode;
    }
    isLocalTypeParameter(decl) {
        // Checking for local type parameters only occurs during resolution of type parameters, so it is
        // guaranteed that type parameters are present.
        return this.typeParameters.some((param) => param === decl);
    }
}
exports.TypeParameterEmitter = TypeParameterEmitter;
