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
const index_1 = require("../../../checks/unused_let_declaration/index");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('UnusedLetDeclarationCheck', () => {
        function diagnose(template) {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': template,
                    },
                    source: `
            export class TestCmp {
              eventCallback(value: any) {}
            }
          `,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {});
            return extendedTemplateChecker.getDiagnosticsForComponent(component);
        }
        it('binds the error code to its extended template diagnostic name', () => {
            expect(index_1.factory.code).toBe(diagnostics_1.ErrorCode.UNUSED_LET_DECLARATION);
            expect(index_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.UNUSED_LET_DECLARATION);
        });
        it('should report a @let declaration that is not used', () => {
            const diags = diagnose(`
        @let used = 1;
        @let unused = 2;
        {{used}}
      `);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNUSED_LET_DECLARATION));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('@let unused = 2');
        });
        it('should report a @let declaration that is not used', () => {
            const diags = diagnose(`
        @let foo = 1;

        @if (true) {
          @let foo = 2;
          {{foo}}
        }
      `);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNUSED_LET_DECLARATION));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('@let foo = 1');
        });
        it('should not report a @let declaration that is only used in other @let declarations', () => {
            const diags = diagnose(`
        @let one = 1;
        @let two = 2;
        @let three = one + two;
        {{three}}
      `);
            expect(diags.length).toBe(0);
        });
        it('should not report a @let declaration that is only used in an event listener', () => {
            const diags = diagnose(`
        @let foo = 1;
        <button (click)="eventCallback(foo + 1)">Click me</button>
      `);
            expect(diags.length).toBe(0);
        });
        it('should not report a @let declaration that is only used in a structural directive', () => {
            const diags = diagnose(`
        @let foo = null;
        <div *ngIf="foo"></div>
      `);
            expect(diags.length).toBe(0);
        });
        it('should not report a @let declaration that is only used in an ICU', () => {
            const diags = diagnose(`
        @let value = 1;
        <h1 i18n>{value, select, 1 {one} 2 {two} other {other}}</h1>
      `);
            expect(diags.length).toBe(0);
        });
    });
});
