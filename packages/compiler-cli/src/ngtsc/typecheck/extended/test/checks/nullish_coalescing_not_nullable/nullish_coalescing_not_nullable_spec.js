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
const nullish_coalescing_not_nullable_1 = require("../../../checks/nullish_coalescing_not_nullable");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('NullishCoalescingNotNullableCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(nullish_coalescing_not_nullable_1.factory.code).toBe(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE);
            expect(nullish_coalescing_not_nullable_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.NULLISH_COALESCING_NOT_NULLABLE);
        });
        it('should return a check if `strictNullChecks` is enabled', () => {
            expect(nullish_coalescing_not_nullable_1.factory.create({ strictNullChecks: true })).toBeDefined();
        });
        it('should return a check if `strictNullChecks` is not configured but `strict` is enabled', () => {
            expect(nullish_coalescing_not_nullable_1.factory.create({ strict: true })).toBeDefined();
        });
        it('should not return a check if `strictNullChecks` is disabled', () => {
            expect(nullish_coalescing_not_nullable_1.factory.create({ strictNullChecks: false })).toBeNull();
            expect(nullish_coalescing_not_nullable_1.factory.create({})).toBeNull(); // Defaults disabled.
        });
        it('should not return a check if `strict` is enabled but `strictNullChecks` is disabled', () => {
            expect(nullish_coalescing_not_nullable_1.factory.create({ strict: true, strictNullChecks: false })).toBeNull();
        });
        it('should produce nullish coalescing warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`var1 ?? 'foo'`);
        });
        it('should produce nullish coalescing warning for classes with inline TCBs', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'class TestCmp { var1: string = "text"; }',
                },
            ], { inlining: true });
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`var1 ?? 'foo'`);
        });
        it('should not produce nullish coalescing warning for a nullable type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: string | null = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce diagnostics for nullish coalescing in a chain', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 !== '' && (items?.length ?? 0) > 0 }}`,
                    },
                    source: 'export class TestCmp { var1 = "text"; items: string[] | undefined = [] }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce nullish coalescing warning for the any type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: any; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce nullish coalescing warning for the unknown type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: unknown; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce nullish coalescing warning for a type that includes undefined', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: string | undefined = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('warns for pipe arguments which are likely configured incorrectly (?? operates on "format" here)', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ 123 | date: 'format' ?? 'invalid date' }}`,
                    },
                    source: `
            export class TestCmp { var1: string | undefined = "text"; }
            export class DatePipe {
              transform(value: string, format: string): string[] {
              }
            `,
                    declarations: [
                        {
                            type: 'pipe',
                            name: 'DatePipe',
                            pipeName: 'date',
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`'format' ?? 'invalid date'`);
        });
        it('does not warn for pipe arguments when parens are used', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ (123 | date: 'format') ?? 'invalid date' }}`,
                    },
                    source: `
            export class TestCmp { var1: string | undefined = "text"; }
            export class DatePipe {
              transform(value: string, format: string): string[] {
              }
          `,
                    declarations: [
                        {
                            type: 'pipe',
                            name: 'DatePipe',
                            pipeName: 'date',
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce nullish coalescing warning when the left side is a nullable expression', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ func() ?? 'foo' }}`,
                    },
                    source: `
               export class TestCmp {
                 func = (): string | null => null;
               }
             `,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should respect configured diagnostic category', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1 ?? 'foo' }}`,
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [nullish_coalescing_not_nullable_1.factory], {
                strictNullChecks: true,
                extendedDiagnostics: {
                    checks: {
                        nullishCoalescingNotNullable: api_1.DiagnosticCategoryLabel.Error,
                    },
                },
            });
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE));
        });
    });
});
