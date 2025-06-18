"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLinker = exports.NO_STATEMENTS = void 0;
const ast_value_1 = require("../ast/ast_value");
const emit_scope_1 = require("./emit_scopes/emit_scope");
const local_emit_scope_1 = require("./emit_scopes/local_emit_scope");
const partial_linker_selector_1 = require("./partial_linkers/partial_linker_selector");
exports.NO_STATEMENTS = [];
/**
 * This class is responsible for linking all the partial declarations found in a single file.
 */
class FileLinker {
    constructor(linkerEnvironment, sourceUrl, code) {
        this.linkerEnvironment = linkerEnvironment;
        this.emitScopes = new Map();
        this.linkerSelector = new partial_linker_selector_1.PartialLinkerSelector((0, partial_linker_selector_1.createLinkerMap)(this.linkerEnvironment, sourceUrl, code), this.linkerEnvironment.logger, this.linkerEnvironment.options.unknownDeclarationVersionHandling);
    }
    /**
     * Return true if the given callee name matches a partial declaration that can be linked.
     */
    isPartialDeclaration(calleeName) {
        return this.linkerSelector.supportsDeclaration(calleeName);
    }
    /**
     * Link the metadata extracted from the args of a call to a partial declaration function.
     *
     * The `declarationScope` is used to determine the scope and strategy of emission of the linked
     * definition and any shared constant statements.
     *
     * @param declarationFn the name of the function used to declare the partial declaration - e.g.
     *     `ɵɵngDeclareDirective`.
     * @param args the arguments passed to the declaration function, should be a single object that
     *     corresponds to the `R3DeclareDirectiveMetadata` or `R3DeclareComponentMetadata` interfaces.
     * @param declarationScope the scope that contains this call to the declaration function.
     */
    linkPartialDeclaration(declarationFn, args, declarationScope) {
        if (args.length !== 1) {
            throw new Error(`Invalid function call: It should have only a single object literal argument, but contained ${args.length}.`);
        }
        const metaObj = ast_value_1.AstObject.parse(args[0], this.linkerEnvironment.host);
        const ngImport = metaObj.getNode('ngImport');
        const emitScope = this.getEmitScope(ngImport, declarationScope);
        const minVersion = metaObj.getString('minVersion');
        const version = metaObj.getString('version');
        const linker = this.linkerSelector.getLinker(declarationFn, minVersion, version);
        const definition = linker.linkPartialDeclaration(emitScope.constantPool, metaObj, version);
        return emitScope.translateDefinition(definition);
    }
    /**
     * Return all the shared constant statements and their associated constant scope references, so
     * that they can be inserted into the source code.
     */
    getConstantStatements() {
        const results = [];
        for (const [constantScope, emitScope] of this.emitScopes.entries()) {
            const statements = emitScope.getConstantStatements();
            results.push({ constantScope, statements });
        }
        return results;
    }
    getEmitScope(ngImport, declarationScope) {
        const constantScope = declarationScope.getConstantScopeRef(ngImport);
        if (constantScope === null) {
            // There is no constant scope so we will emit extra statements into the definition IIFE.
            return new local_emit_scope_1.LocalEmitScope(ngImport, this.linkerEnvironment.translator, this.linkerEnvironment.factory);
        }
        if (!this.emitScopes.has(constantScope)) {
            this.emitScopes.set(constantScope, new emit_scope_1.EmitScope(ngImport, this.linkerEnvironment.translator, this.linkerEnvironment.factory));
        }
        return this.emitScopes.get(constantScope);
    }
}
exports.FileLinker = FileLinker;
