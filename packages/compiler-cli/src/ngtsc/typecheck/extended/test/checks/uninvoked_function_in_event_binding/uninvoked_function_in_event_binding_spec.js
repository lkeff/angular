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
const diagnostics_1 = require("../../../../../diagnostics");
const file_system_1 = require("../../../../../file_system");
const testing_1 = require("../../../../../file_system/testing");
const testing_2 = require("../../../../../testing");
const testing_3 = require("../../../../testing");
const uninvoked_function_in_event_binding_1 = require("../../../checks/uninvoked_function_in_event_binding");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('UninvokedFunctionInEventBindingFactoryCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(uninvoked_function_in_event_binding_1.factory.code).toBe(diagnostics_1.ErrorCode.UNINVOKED_FUNCTION_IN_EVENT_BINDING);
            expect(uninvoked_function_in_event_binding_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.UNINVOKED_FUNCTION_IN_EVENT_BINDING);
        });
        it('should produce a diagnostic when a function in an event binding is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="increment"></button>`, `increment() { }`);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNINVOKED_FUNCTION_IN_EVENT_BINDING));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="increment"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('increment()'));
        });
        it('should produce a diagnostic when a nested function in an event binding is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="nested.nested1.nested2.increment"></button>`, `nested = { nested1: { nested2: { increment() { } } } }`);
            expect(diags.length).toBe(1);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="nested.nested1.nested2.increment"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('nested.nested1.nested2.increment()'));
        });
        it('should produce a diagnostic when a nested function that uses key read in an event binding is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="nested.nested1['nested2'].increment"></button>`, `nested = { nested1: { nested2: { increment() { } } } }`);
            expect(diags.length).toBe(1);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="nested.nested1['nested2'].increment"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText(`nested.nested1['nested2'].increment()`));
        });
        it('should produce a diagnostic when a function in a chain is not invoked', () => {
            const diags = setupTestComponent(`
          <button (click)="increment; decrement"></button>
          <button (click)="increment; decrement()"></button>
          <button (click)="increment(); decrement"></button>
        `, `increment() { } decrement() { }`);
            expect(diags.length).toBe(4);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="increment; decrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('increment()'));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[1])).toBe(`(click)="increment; decrement"`);
            expect(diags[1].messageText).toBe(generateDiagnosticText('decrement()'));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[2])).toBe(`(click)="increment; decrement()"`);
            expect(diags[2].messageText).toBe(generateDiagnosticText('increment()'));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[3])).toBe(`(click)="increment(); decrement"`);
            expect(diags[3].messageText).toBe(generateDiagnosticText('decrement()'));
        });
        it('should produce a diagnostic when a function in a conditional is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="true ? increment : decrement"></button>`, `increment() { } decrement() { }`);
            expect(diags.length).toBe(2);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="true ? increment : decrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('increment()'));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[1])).toBe(`(click)="true ? increment : decrement"`);
            expect(diags[1].messageText).toBe(generateDiagnosticText('decrement()'));
        });
        it('should produce a diagnostic when a function in a conditional is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="true ? increment() : decrement"></button>`, `increment() { } decrement() { }`);
            expect(diags.length).toBe(1);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="true ? increment() : decrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('decrement()'));
        });
        it('should produce a diagnostic when a nested function in a conditional is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="true ? counter.increment : nested['nested1'].nested2?.source().decrement"></button>`, `
          counter = { increment() { } }
          nested = { nested1: { nested2?: { source() { return { decrement() } { } } } } }
        `);
            expect(diags.length).toBe(2);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="true ? counter.increment : nested['nested1'].nested2?.source().decrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('counter.increment()'));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[1])).toBe(`(click)="true ? counter.increment : nested['nested1'].nested2?.source().decrement"`);
            expect(diags[1].messageText).toBe(generateDiagnosticText(`nested['nested1'].nested2?.source().decrement()`));
        });
        it('should produce a diagnostic when a function in a function is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="nested.nested1.nested2.source().decrement"></button>`, `nested = { nested1: { nested2: { source() { return { decrement() { } } } } } }`);
            expect(diags.length).toBe(1);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="nested.nested1.nested2.source().decrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('nested.nested1.nested2.source().decrement()'));
        });
        it('should produce a diagnostic when a function that returns a function is not invoked', () => {
            const diags = setupTestComponent(`<button (click)="incrementAndLaterDecrement"></button>`, `incrementAndLaterDecrement(): () => void { return () => {} }`);
            expect(diags.length).toBe(1);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`(click)="incrementAndLaterDecrement"`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('incrementAndLaterDecrement()'));
        });
        it('should not produce a diagnostic when an invoked function returns a function', () => {
            const diags = setupTestComponent(`<button (click)="incrementAndLaterDecrement()"></button>`, `incrementAndLaterDecrement(): () => void { return () => {} }`);
            expect(diags.length).toBe(0);
        });
        it('should not produce a warning when the function is not invoked in two-way-binding', () => {
            const diags = setupTestComponent(`<button [(event)]="increment"></button>`, `increment() { }`);
            expect(diags.length).toBe(0);
        });
        it('should not produce a warning when the function is invoked', () => {
            const diags = setupTestComponent(`
          <button (click)="increment()"></button>
          <button (click)="counter.increment()"></button>
          <button (click)="increment?.()"></button>
        `, `
        counter = { increment() { } }
        increment() { }
        `);
            expect(diags.length).toBe(0);
        });
    });
});
function setupTestComponent(template, classField) {
    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
    const { program, templateTypeChecker } = (0, testing_3.setup)([
        {
            fileName,
            templates: { 'TestCmp': template },
            source: `export class TestCmp { ${classField} }`,
        },
    ]);
    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
    const component = (0, testing_3.getClass)(sf, 'TestCmp');
    const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [uninvoked_function_in_event_binding_1.factory], {} /* options */);
    return extendedTemplateChecker.getDiagnosticsForComponent(component);
}
function generateDiagnosticText(text) {
    return `Function in event binding should be invoked: ${text}`;
}
