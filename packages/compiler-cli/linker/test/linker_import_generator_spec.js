"use strict";
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
const typescript_1 = __importDefault(require("typescript"));
const translator_1 = require("../../src/ngtsc/translator");
const linker_import_generator_1 = require("../src/linker_import_generator");
const ngImport = typescript_1.default.factory.createIdentifier('ngImport');
describe('LinkerImportGenerator<TExpression>', () => {
    describe('generateNamespaceImport()', () => {
        it('should error if the import is not `@angular/core`', () => {
            const generator = new linker_import_generator_1.LinkerImportGenerator(new translator_1.TypeScriptAstFactory(false), ngImport);
            expect(() => generator.addImport({
                exportModuleSpecifier: 'other/import',
                exportSymbolName: null,
                requestedFile: null,
            })).toThrowError(`Unable to import from anything other than '@angular/core'`);
        });
        it('should return the ngImport expression for `@angular/core`', () => {
            const generator = new linker_import_generator_1.LinkerImportGenerator(new translator_1.TypeScriptAstFactory(false), ngImport);
            expect(generator.addImport({
                exportModuleSpecifier: '@angular/core',
                exportSymbolName: null,
                requestedFile: null,
            })).toBe(ngImport);
        });
    });
    describe('generateNamedImport()', () => {
        it('should error if the import is not `@angular/core`', () => {
            const generator = new linker_import_generator_1.LinkerImportGenerator(new translator_1.TypeScriptAstFactory(false), ngImport);
            expect(() => generator.addImport({
                exportModuleSpecifier: 'other/import',
                exportSymbolName: 'someSymbol',
                requestedFile: null,
            })).toThrowError(`Unable to import from anything other than '@angular/core'`);
        });
        it('should return a `NamedImport` object containing the ngImport expression', () => {
            const generator = new linker_import_generator_1.LinkerImportGenerator(new translator_1.TypeScriptAstFactory(false), ngImport);
            const result = generator.addImport({
                exportModuleSpecifier: '@angular/core',
                exportSymbolName: 'someSymbol',
                requestedFile: null,
            });
            expect(typescript_1.default.isPropertyAccessExpression(result)).toBe(true);
            expect(result.name.text).toBe('someSymbol');
            expect(result.expression).toBe(ngImport);
        });
    });
});
