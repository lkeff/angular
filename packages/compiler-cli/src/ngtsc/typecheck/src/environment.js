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
exports.Environment = void 0;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const translator_1 = require("../../translator");
const reference_emit_environment_1 = require("./reference_emit_environment");
const ts_util_1 = require("./ts_util");
const type_constructor_1 = require("./type_constructor");
const type_parameter_emitter_1 = require("./type_parameter_emitter");
/**
 * A context which hosts one or more Type Check Blocks (TCBs).
 *
 * An `Environment` supports the generation of TCBs by tracking necessary imports, declarations of
 * type constructors, and other statements beyond the type-checking code within the TCB itself.
 * Through method calls on `Environment`, the TCB generator can request `ts.Expression`s which
 * reference declarations in the `Environment` for these artifacts`.
 *
 * `Environment` can be used in a standalone fashion, or can be extended to support more specialized
 * usage.
 */
class Environment extends reference_emit_environment_1.ReferenceEmitEnvironment {
    constructor(config, importManager, refEmitter, reflector, contextFile) {
        super(importManager, refEmitter, reflector, contextFile);
        this.config = config;
        this.nextIds = {
            pipeInst: 1,
            typeCtor: 1,
        };
        this.typeCtors = new Map();
        this.typeCtorStatements = [];
        this.pipeInsts = new Map();
        this.pipeInstStatements = [];
    }
    /**
     * Get an expression referring to a type constructor for the given directive.
     *
     * Depending on the shape of the directive itself, this could be either a reference to a declared
     * type constructor, or to an inline type constructor.
     */
    typeCtorFor(dir) {
        const dirRef = dir.ref;
        const node = dirRef.node;
        if (this.typeCtors.has(node)) {
            return this.typeCtors.get(node);
        }
        if ((0, type_constructor_1.requiresInlineTypeCtor)(node, this.reflector, this)) {
            // The constructor has already been created inline, we just need to construct a reference to
            // it.
            const ref = this.reference(dirRef);
            const typeCtorExpr = typescript_1.default.factory.createPropertyAccessExpression(ref, 'ngTypeCtor');
            this.typeCtors.set(node, typeCtorExpr);
            return typeCtorExpr;
        }
        else {
            const fnName = `_ctor${this.nextIds.typeCtor++}`;
            const nodeTypeRef = this.referenceType(dirRef);
            if (!typescript_1.default.isTypeReferenceNode(nodeTypeRef)) {
                throw new Error(`Expected TypeReferenceNode from reference to ${dirRef.debugName}`);
            }
            const meta = {
                fnName,
                body: true,
                fields: {
                    inputs: dir.inputs,
                    // TODO: support queries
                    queries: dir.queries,
                },
                coercedInputFields: dir.coercedInputFields,
            };
            const typeParams = this.emitTypeParameters(node);
            const typeCtor = (0, type_constructor_1.generateTypeCtorDeclarationFn)(this, meta, nodeTypeRef.typeName, typeParams);
            this.typeCtorStatements.push(typeCtor);
            const fnId = typescript_1.default.factory.createIdentifier(fnName);
            this.typeCtors.set(node, fnId);
            return fnId;
        }
    }
    /*
     * Get an expression referring to an instance of the given pipe.
     */
    pipeInst(ref) {
        if (this.pipeInsts.has(ref.node)) {
            return this.pipeInsts.get(ref.node);
        }
        const pipeType = this.referenceType(ref);
        const pipeInstId = typescript_1.default.factory.createIdentifier(`_pipe${this.nextIds.pipeInst++}`);
        this.pipeInstStatements.push((0, ts_util_1.tsDeclareVariable)(pipeInstId, pipeType));
        this.pipeInsts.set(ref.node, pipeInstId);
        return pipeInstId;
    }
    /**
     * Generate a `ts.Expression` that references the given node.
     *
     * This may involve importing the node into the file if it's not declared there already.
     */
    reference(ref) {
        // Disable aliasing for imports generated in a template type-checking context, as there is no
        // guarantee that any alias re-exports exist in the .d.ts files. It's safe to use direct imports
        // in these cases as there is no strict dependency checking during the template type-checking
        // pass.
        const ngExpr = this.refEmitter.emit(ref, this.contextFile, imports_1.ImportFlags.NoAliasing);
        (0, imports_1.assertSuccessfulReferenceEmit)(ngExpr, this.contextFile, 'class');
        // Use `translateExpression` to convert the `Expression` into a `ts.Expression`.
        return (0, translator_1.translateExpression)(this.contextFile, ngExpr.expression, this.importManager);
    }
    emitTypeParameters(declaration) {
        const emitter = new type_parameter_emitter_1.TypeParameterEmitter(declaration.typeParameters, this.reflector);
        return emitter.emit((ref) => this.referenceType(ref));
    }
    getPreludeStatements() {
        return [...this.pipeInstStatements, ...this.typeCtorStatements];
    }
}
exports.Environment = Environment;
