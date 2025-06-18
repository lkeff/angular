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
const uninvoked_track_function_1 = require("../../../checks/uninvoked_track_function");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('UninvokedTrackFunctionCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(uninvoked_track_function_1.factory.code).toBe(diagnostics_1.ErrorCode.UNINVOKED_TRACK_FUNCTION);
            expect(uninvoked_track_function_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.UNINVOKED_TRACK_FUNCTION);
        });
        it('should produce a diagnostic when a track function in a @for block is not invoked', () => {
            const diags = diagnoseTestComponent(`
          @for (item of items; track trackByName) {}
        `, `trackByName(item) { return item.name; }`);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNINVOKED_TRACK_FUNCTION));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`@for (item of items; track trackByName) {}`);
            expect(diags[0].messageText).toBe(generateDiagnosticText('trackByName'));
        });
        it('should not produce a warning when track is set to a getter', () => {
            const diags = diagnoseTestComponent(`
          @for (item of items; track nameGetter) {}
        `, `get nameGetter() { return this.items[0].name; }`);
            expect(diags.length).toBe(0);
        });
        it('should not produce a warning when the function is invoked', () => {
            const diags = diagnoseTestComponent(`
          @for (item of items; track trackByName(item)) {}
        `, `trackByName(item) { return item.name; }`);
            expect(diags.length).toBe(0);
        });
        it('should not produce a warning when track is item.name', () => {
            const diags = diagnoseTestComponent(`
          @for (item of items; track item.name) {}
        `, ``);
            expect(diags.length).toBe(0);
        });
    });
});
function diagnoseTestComponent(template, classField) {
    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
    const { program, templateTypeChecker } = (0, testing_3.setup)([
        {
            fileName,
            templates: { 'TestCmp': template },
            source: `
      export class TestCmp {
        items = [{name: 'a'}, {name: 'b'}];
        signalItems = [{name: signal('a')}, {name: signal('b')}];
        ${classField}
      }`,
        },
    ]);
    const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
    const component = (0, testing_3.getClass)(sf, 'TestCmp');
    const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [uninvoked_track_function_1.factory], {} /* options */);
    return extendedTemplateChecker.getDiagnosticsForComponent(component);
}
function generateDiagnosticText(method) {
    return `The track function in the @for block should be invoked: ${method}(/* arguments */)`;
}
