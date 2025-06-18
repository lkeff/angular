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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const o = __importStar(require("@angular/compiler"));
const translator_1 = require("../../../src/ngtsc/translator");
const typescript_1 = __importDefault(require("typescript"));
const translator_2 = require("../../src/file_linker/translator");
const linker_import_generator_1 = require("../../src/linker_import_generator");
const helpers_1 = require("./helpers");
const ngImport = typescript_1.default.factory.createIdentifier('ngImport');
describe('Translator', () => {
    let factory;
    let importGenerator;
    beforeEach(() => {
        factory = new translator_1.TypeScriptAstFactory(/* annotateForClosureCompiler */ false);
        importGenerator = new linker_import_generator_1.LinkerImportGenerator(factory, ngImport);
    });
    describe('translateExpression()', () => {
        it('should generate expression specific output', () => {
            const translator = new translator_2.Translator(factory);
            const outputAst = new o.WriteVarExpr('foo', new o.LiteralExpr(42));
            const translated = translator.translateExpression(outputAst, importGenerator);
            expect((0, helpers_1.generate)(translated)).toEqual('(foo = 42)');
        });
    });
    describe('translateStatement()', () => {
        it('should generate statement specific output', () => {
            const translator = new translator_2.Translator(factory);
            const outputAst = new o.ExpressionStatement(new o.WriteVarExpr('foo', new o.LiteralExpr(42)));
            const translated = translator.translateStatement(outputAst, importGenerator);
            expect((0, helpers_1.generate)(translated)).toEqual('foo = 42;');
        });
    });
});
