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
const skip_hydration_not_static_1 = require("../../../checks/skip_hydration_not_static");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('SkipHydrationNotStatic', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(skip_hydration_not_static_1.factory.code).toBe(diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC);
            expect(skip_hydration_not_static_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.SKIP_HYDRATION_NOT_STATIC);
        });
        it('should produce class binding warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [ngSkipHydration]="true"></div>`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [skip_hydration_not_static_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`[ngSkipHydration]="true"`);
        });
        it('should produce an attribute binding warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [ngSkipHydration]="''"></div>`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [skip_hydration_not_static_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`[ngSkipHydration]="''"`);
        });
        it('should produce a wrong value warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div ngSkipHydration="XXX"></div>`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [skip_hydration_not_static_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SKIP_HYDRATION_NOT_STATIC));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`ngSkipHydration="XXX"`);
        });
        it('should not produce a warning when there is no value', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div ngSkipHydration></div>`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [skip_hydration_not_static_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce a warning with a correct value ', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div ngSkipHydration="true"></div>`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [skip_hydration_not_static_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
});
