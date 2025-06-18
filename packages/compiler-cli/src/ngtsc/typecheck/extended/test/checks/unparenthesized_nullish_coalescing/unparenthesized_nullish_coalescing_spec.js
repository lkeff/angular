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
const api_1 = require("../../../../../core/api");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../../../diagnostics");
const file_system_1 = require("../../../../../file_system");
const testing_1 = require("../../../../../file_system/testing");
const testing_2 = require("../../../../../testing");
const testing_3 = require("../../../../testing");
const unparenthesized_nullish_coalescing_1 = require("../../../checks/unparenthesized_nullish_coalescing");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('UnparenthesizedNullishCoalescingCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(unparenthesized_nullish_coalescing_1.factory.code).toBe(diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING);
            expect(unparenthesized_nullish_coalescing_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.UNPARENTHESIZED_NULLISH_COALESCING);
        });
        it('should produce warning when mixing nullish coalescing with logical and', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ a && b ?? c }}`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [unparenthesized_nullish_coalescing_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`a && b ?? c`);
        });
        it('should produce warning when mixing nullish coalescing with logical or', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ a ?? b || c }}`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [unparenthesized_nullish_coalescing_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`a ?? b || c`);
        });
        it('should not produce warning when mixing nullish coalescing with logical and with parens', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ a && (b ?? c) }}`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [unparenthesized_nullish_coalescing_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should produce warning when mixing nullish coalescing with logical or', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ a ?? (b || c) }}`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [unparenthesized_nullish_coalescing_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should respect configured diagnostic category', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ a && b ?? c }}`,
                    },
                    source: 'export class TestCmp { }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [unparenthesized_nullish_coalescing_1.factory], {
                extendedDiagnostics: {
                    checks: {
                        unparenthesizedNullishCoalescing: api_1.DiagnosticCategoryLabel.Error,
                    },
                },
            });
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.UNPARENTHESIZED_NULLISH_COALESCING));
        });
    });
});
