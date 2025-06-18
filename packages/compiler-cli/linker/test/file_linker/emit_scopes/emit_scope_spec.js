"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("@angular/compiler/src/output/output_ast"));
const translator_1 = require("../../../../src/ngtsc/translator");
const emit_scope_1 = require("../../../src/file_linker/emit_scopes/emit_scope");
const translator_2 = require("../../../src/file_linker/translator");
const helpers_1 = require("../helpers");
describe('EmitScope', () => {
    describe('translateDefinition()', () => {
        it('should translate the given output AST into a TExpression', () => {
            const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
            const translator = new translator_2.Translator(factory);
            const ngImport = factory.createIdentifier('core');
            const emitScope = new emit_scope_1.EmitScope(ngImport, translator, factory);
            const def = emitScope.translateDefinition({
                expression: o.fn([], [], null, null, 'foo'),
                statements: [],
            });
            expect((0, helpers_1.generate)(def)).toEqual('function foo() { }');
        });
        it('should use an IIFE if the definition being emitted includes associated statements', () => {
            const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
            const translator = new translator_2.Translator(factory);
            const ngImport = factory.createIdentifier('core');
            const emitScope = new emit_scope_1.EmitScope(ngImport, translator, factory);
            const def = emitScope.translateDefinition({
                expression: o.fn([], [], null, null, 'foo'),
                statements: [o.variable('testFn').callFn([]).toStmt()],
            });
            expect((0, helpers_1.generate)(def)).toEqual('function () { testFn(); return function foo() { }; }()');
        });
        it('should use the `ngImport` identifier for imports when translating', () => {
            const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
            const translator = new translator_2.Translator(factory);
            const ngImport = factory.createIdentifier('core');
            const emitScope = new emit_scope_1.EmitScope(ngImport, translator, factory);
            const coreImportRef = new o.ExternalReference('@angular/core', 'foo');
            const def = emitScope.translateDefinition({
                expression: o.importExpr(coreImportRef).prop('bar').callFn([]),
                statements: [],
            });
            expect((0, helpers_1.generate)(def)).toEqual('core.foo.bar()');
        });
        it('should not emit any shared constants in the replacement expression', () => {
            const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
            const translator = new translator_2.Translator(factory);
            const ngImport = factory.createIdentifier('core');
            const emitScope = new emit_scope_1.EmitScope(ngImport, translator, factory);
            const constArray = o.literalArr([o.literal('CONST')]);
            // We have to add the constant twice or it will not create a shared statement
            emitScope.constantPool.getConstLiteral(constArray);
            emitScope.constantPool.getConstLiteral(constArray);
            const def = emitScope.translateDefinition({
                expression: o.fn([], [], null, null, 'foo'),
                statements: [],
            });
            expect((0, helpers_1.generate)(def)).toEqual('function foo() { }');
        });
    });
    describe('getConstantStatements()', () => {
        it('should return any constant statements that were added to the `constantPool`', () => {
            const factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
            const translator = new translator_2.Translator(factory);
            const ngImport = factory.createIdentifier('core');
            const emitScope = new emit_scope_1.EmitScope(ngImport, translator, factory);
            const constArray = o.literalArr([o.literal('CONST')]);
            // We have to add the constant twice or it will not create a shared statement
            emitScope.constantPool.getConstLiteral(constArray);
            emitScope.constantPool.getConstLiteral(constArray);
            const statements = emitScope.getConstantStatements();
            expect(statements.map(helpers_1.generate)).toEqual(['const _c0 = ["CONST"];']);
        });
    });
});
