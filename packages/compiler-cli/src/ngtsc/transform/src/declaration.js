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
exports.IvyDeclarationDtsTransform = exports.DtsTransformRegistry = void 0;
exports.declarationTransformFactory = declarationTransformFactory;
const typescript_1 = __importDefault(require("typescript"));
const translator_1 = require("../../translator");
/**
 * Keeps track of `DtsTransform`s per source file, so that it is known which source files need to
 * have their declaration file transformed.
 */
class DtsTransformRegistry {
    constructor() {
        this.ivyDeclarationTransforms = new Map();
    }
    getIvyDeclarationTransform(sf) {
        if (!this.ivyDeclarationTransforms.has(sf)) {
            this.ivyDeclarationTransforms.set(sf, new IvyDeclarationDtsTransform());
        }
        return this.ivyDeclarationTransforms.get(sf);
    }
    /**
     * Gets the dts transforms to be applied for the given source file, or `null` if no transform is
     * necessary.
     */
    getAllTransforms(sf) {
        // No need to transform if it's not a declarations file, or if no changes have been requested
        // to the input file. Due to the way TypeScript afterDeclarations transformers work, the
        // `ts.SourceFile` path is the same as the original .ts. The only way we know it's actually a
        // declaration file is via the `isDeclarationFile` property.
        if (!sf.isDeclarationFile) {
            return null;
        }
        const originalSf = typescript_1.default.getOriginalNode(sf);
        let transforms = null;
        if (this.ivyDeclarationTransforms.has(originalSf)) {
            transforms = [];
            transforms.push(this.ivyDeclarationTransforms.get(originalSf));
        }
        return transforms;
    }
}
exports.DtsTransformRegistry = DtsTransformRegistry;
function declarationTransformFactory(transformRegistry, reflector, refEmitter, importRewriter) {
    return (context) => {
        const transformer = new DtsTransformer(context, reflector, refEmitter, importRewriter);
        return (fileOrBundle) => {
            if (typescript_1.default.isBundle(fileOrBundle)) {
                // Only attempt to transform source files.
                return fileOrBundle;
            }
            const transforms = transformRegistry.getAllTransforms(fileOrBundle);
            if (transforms === null) {
                return fileOrBundle;
            }
            return transformer.transform(fileOrBundle, transforms);
        };
    };
}
/**
 * Processes .d.ts file text and adds static field declarations, with types.
 */
class DtsTransformer {
    constructor(ctx, reflector, refEmitter, importRewriter) {
        this.ctx = ctx;
        this.reflector = reflector;
        this.refEmitter = refEmitter;
        this.importRewriter = importRewriter;
    }
    /**
     * Transform the declaration file and add any declarations which were recorded.
     */
    transform(sf, transforms) {
        const imports = new translator_1.ImportManager(Object.assign(Object.assign({}, translator_1.presetImportManagerForceNamespaceImports), { rewriter: this.importRewriter }));
        const visitor = (node) => {
            if (typescript_1.default.isClassDeclaration(node)) {
                return this.transformClassDeclaration(node, transforms, imports);
            }
            else if (typescript_1.default.isFunctionDeclaration(node)) {
                return this.transformFunctionDeclaration(node, transforms, imports);
            }
            else {
                // Otherwise return node as is.
                return typescript_1.default.visitEachChild(node, visitor, this.ctx);
            }
        };
        // Recursively scan through the AST and process all nodes as desired.
        sf = typescript_1.default.visitNode(sf, visitor, typescript_1.default.isSourceFile) || sf;
        // Update/insert needed imports.
        return imports.transformTsFile(this.ctx, sf);
    }
    transformClassDeclaration(clazz, transforms, imports) {
        let elements = clazz.members;
        let elementsChanged = false;
        for (const transform of transforms) {
            if (transform.transformClassElement !== undefined) {
                for (let i = 0; i < elements.length; i++) {
                    const res = transform.transformClassElement(elements[i], imports);
                    if (res !== elements[i]) {
                        if (!elementsChanged) {
                            elements = [...elements];
                            elementsChanged = true;
                        }
                        elements[i] = res;
                    }
                }
            }
        }
        let newClazz = clazz;
        for (const transform of transforms) {
            if (transform.transformClass !== undefined) {
                // If no DtsTransform has changed the class yet, then the (possibly mutated) elements have
                // not yet been incorporated. Otherwise, `newClazz.members` holds the latest class members.
                const inputMembers = clazz === newClazz ? elements : newClazz.members;
                newClazz = transform.transformClass(newClazz, inputMembers, this.reflector, this.refEmitter, imports);
            }
        }
        // If some elements have been transformed but the class itself has not been transformed, create
        // an updated class declaration with the updated elements.
        if (elementsChanged && clazz === newClazz) {
            newClazz = typescript_1.default.factory.updateClassDeclaration(
            /* node */ clazz, 
            /* modifiers */ clazz.modifiers, 
            /* name */ clazz.name, 
            /* typeParameters */ clazz.typeParameters, 
            /* heritageClauses */ clazz.heritageClauses, 
            /* members */ elements);
        }
        return newClazz;
    }
    transformFunctionDeclaration(declaration, transforms, imports) {
        let newDecl = declaration;
        for (const transform of transforms) {
            if (transform.transformFunctionDeclaration !== undefined) {
                newDecl = transform.transformFunctionDeclaration(newDecl, imports);
            }
        }
        return newDecl;
    }
}
class IvyDeclarationDtsTransform {
    constructor() {
        this.declarationFields = new Map();
    }
    addFields(decl, fields) {
        this.declarationFields.set(decl, fields);
    }
    transformClass(clazz, members, reflector, refEmitter, imports) {
        const original = typescript_1.default.getOriginalNode(clazz);
        if (!this.declarationFields.has(original)) {
            return clazz;
        }
        const fields = this.declarationFields.get(original);
        const newMembers = fields.map((decl) => {
            const modifiers = [typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.StaticKeyword)];
            const typeRef = (0, translator_1.translateType)(decl.type, original.getSourceFile(), reflector, refEmitter, imports);
            markForEmitAsSingleLine(typeRef);
            return typescript_1.default.factory.createPropertyDeclaration(
            /* modifiers */ modifiers, 
            /* name */ decl.name, 
            /* questionOrExclamationToken */ undefined, 
            /* type */ typeRef, 
            /* initializer */ undefined);
        });
        return typescript_1.default.factory.updateClassDeclaration(
        /* node */ clazz, 
        /* modifiers */ clazz.modifiers, 
        /* name */ clazz.name, 
        /* typeParameters */ clazz.typeParameters, 
        /* heritageClauses */ clazz.heritageClauses, 
        /* members */ [...members, ...newMembers]);
    }
}
exports.IvyDeclarationDtsTransform = IvyDeclarationDtsTransform;
function markForEmitAsSingleLine(node) {
    typescript_1.default.setEmitFlags(node, typescript_1.default.EmitFlags.SingleLine);
    typescript_1.default.forEachChild(node, markForEmitAsSingleLine);
}
