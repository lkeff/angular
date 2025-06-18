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
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../../file_system");
const testing_1 = require("../../../file_system/testing");
const partial_evaluator_1 = require("../../../partial_evaluator");
const reflection_1 = require("../../../reflection");
const testing_2 = require("../../../testing");
const diagnostics_1 = require("../src/diagnostics");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc annotation diagnostics', () => {
        describe('createValueError()', () => {
            it('should include a trace for dynamic values', () => {
                const { error, program } = createError('', 'nonexistent', 'Error message');
                const entrySf = (0, file_system_1.getSourceFileOrError)(program, (0, file_system_1.absoluteFrom)('/entry.ts'));
                if (typeof error.diagnosticMessage === 'string') {
                    return fail('Created error must have a message chain');
                }
                expect(error.diagnosticMessage.messageText).toBe('Error message');
                expect(error.diagnosticMessage.next.length).toBe(1);
                expect(error.diagnosticMessage.next[0].messageText).toBe(`Value could not be determined statically.`);
                expect(error.relatedInformation).toBeDefined();
                expect(error.relatedInformation.length).toBe(1);
                expect(error.relatedInformation[0].messageText).toBe('Unknown reference.');
                expect(error.relatedInformation[0].file.fileName).toBe(entrySf.fileName);
                expect(getSourceCode(error.relatedInformation[0])).toBe('nonexistent');
            });
            it('should include a pointer for a reference to a named declaration', () => {
                const { error, program } = createError(`import {Foo} from './foo';`, 'Foo', 'Error message', [
                    { name: (0, file_system_1.absoluteFrom)('/foo.ts'), contents: 'export class Foo {}' },
                ]);
                const fooSf = (0, file_system_1.getSourceFileOrError)(program, (0, file_system_1.absoluteFrom)('/foo.ts'));
                if (typeof error.diagnosticMessage === 'string') {
                    return fail('Created error must have a message chain');
                }
                expect(error.diagnosticMessage.messageText).toBe('Error message');
                expect(error.diagnosticMessage.next.length).toBe(1);
                expect(error.diagnosticMessage.next[0].messageText).toBe(`Value is a reference to 'Foo'.`);
                expect(error.relatedInformation).toBeDefined();
                expect(error.relatedInformation.length).toBe(1);
                expect(error.relatedInformation[0].messageText).toBe('Reference is declared here.');
                expect(error.relatedInformation[0].file.fileName).toBe(fooSf.fileName);
                expect(getSourceCode(error.relatedInformation[0])).toBe('Foo');
            });
            it('should include a pointer for a reference to an anonymous declaration', () => {
                const { error, program } = createError(`import Foo from './foo';`, 'Foo', 'Error message', [
                    { name: (0, file_system_1.absoluteFrom)('/foo.ts'), contents: 'export default class {}' },
                ]);
                const fooSf = (0, file_system_1.getSourceFileOrError)(program, (0, file_system_1.absoluteFrom)('/foo.ts'));
                if (typeof error.diagnosticMessage === 'string') {
                    return fail('Created error must have a message chain');
                }
                expect(error.diagnosticMessage.messageText).toBe('Error message');
                expect(error.diagnosticMessage.next.length).toBe(1);
                expect(error.diagnosticMessage.next[0].messageText).toBe(`Value is a reference to an anonymous declaration.`);
                expect(error.relatedInformation).toBeDefined();
                expect(error.relatedInformation.length).toBe(1);
                expect(error.relatedInformation[0].messageText).toBe('Reference is declared here.');
                expect(error.relatedInformation[0].file.fileName).toBe(fooSf.fileName);
                expect(getSourceCode(error.relatedInformation[0])).toBe('export default class {}');
            });
            it("should include a representation of the value's type", () => {
                const { error } = createError('', '{a: 2}', 'Error message');
                if (typeof error.diagnosticMessage === 'string') {
                    return fail('Created error must have a message chain');
                }
                expect(error.diagnosticMessage.messageText).toBe('Error message');
                expect(error.diagnosticMessage.next.length).toBe(1);
                expect(error.diagnosticMessage.next[0].messageText).toBe(`Value is of type '{ a: number }'.`);
                expect(error.relatedInformation).not.toBeDefined();
            });
        });
    });
});
function getSourceCode(diag) {
    const text = diag.file.text;
    return text.slice(diag.start, diag.start + diag.length);
}
function createError(code, expr, messageText, supportingFiles = []) {
    const { program } = (0, testing_2.makeProgram)([{ name: (0, file_system_1.absoluteFrom)('/entry.ts'), contents: `${code}; const target$ = ${expr}` }, ...supportingFiles], 
    /* options */ undefined, 
    /* host */ undefined, 
    /* checkForErrors */ false);
    const checker = program.getTypeChecker();
    const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/entry.ts'), 'target$', typescript_1.default.isVariableDeclaration);
    const valueExpr = decl.initializer;
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflectionHost, checker, /* dependencyTracker */ null);
    const value = evaluator.evaluate(valueExpr);
    const error = (0, diagnostics_1.createValueHasWrongTypeError)(valueExpr, value, messageText);
    return { error, program };
}
