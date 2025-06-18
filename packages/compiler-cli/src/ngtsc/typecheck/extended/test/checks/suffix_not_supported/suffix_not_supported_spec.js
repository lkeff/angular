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
const suffix_not_supported_1 = require("../../../checks/suffix_not_supported");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('SuffixNotSupportedCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(suffix_not_supported_1.factory.code).toBe(diagnostics_1.ErrorCode.SUFFIX_NOT_SUPPORTED);
            expect(suffix_not_supported_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.SUFFIX_NOT_SUPPORTED);
        });
        it('should produce suffix not supported warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [attr.width.px]="1"></div>`,
                    },
                    source: 'export class TestCmp {}',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [suffix_not_supported_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SUFFIX_NOT_SUPPORTED));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`attr.width.px`);
        });
        it('should not produce suffix not supported warning on a style binding', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [style.width.px]="1"></div>`,
                    },
                    source: 'export class TestCmp {}',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [suffix_not_supported_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce suffix not supported warning on an input', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [myInput.px]="1"></div>`,
                    },
                    source: 'export class TestCmp {}',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [suffix_not_supported_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
});
