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
const optional_chain_not_nullable_1 = require("../../../checks/optional_chain_not_nullable");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('OptionalChainNotNullableCheck', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(optional_chain_not_nullable_1.factory.code).toBe(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE);
            expect(optional_chain_not_nullable_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.OPTIONAL_CHAIN_NOT_NULLABLE);
        });
        it('should return a check if `strictNullChecks` is enabled', () => {
            expect(optional_chain_not_nullable_1.factory.create({ strictNullChecks: true })).toBeDefined();
        });
        it('should return a check if `strictNullChecks` is not configured but `strict` is enabled', () => {
            expect(optional_chain_not_nullable_1.factory.create({ strict: true })).toBeDefined();
        });
        it('should not return a check if `strictNullChecks` is disabled', () => {
            expect(optional_chain_not_nullable_1.factory.create({ strictNullChecks: false })).toBeNull();
            expect(optional_chain_not_nullable_1.factory.create({})).toBeNull(); // Defaults disabled.
        });
        it('should not return a check if `strict` is enabled but `strictNullChecks` is disabled', () => {
            expect(optional_chain_not_nullable_1.factory.create({ strict: true, strictNullChecks: false })).toBeNull();
        });
        it('should produce optional chain warning for property access', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: { foo: string } = { foo: "bar" }; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE));
            expect(diags[0].messageText).toContain(`the '?.' operator can be replaced with the '.' operator`);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`bar`);
        });
        it('should produce optional chain warning for indexed access', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.['bar'] }}`,
                    },
                    source: 'export class TestCmp { var1: { foo: string } = { foo: "bar" }; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE));
            expect(diags[0].messageText).toContain(`the '?.' operator can be safely removed`);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`var1?.['bar']`);
        });
        it('should produce optional chain warning for method call', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ foo?.() }}`,
                    },
                    source: 'export class TestCmp { foo: () => string }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE));
            expect(diags[0].messageText).toContain(`the '?.' operator can be safely removed`);
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`foo?.()`);
        });
        it('should produce optional chain warning for classes with inline TCBs', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'class TestCmp { var1: { foo: string } = { foo: "bar" }; }',
                },
            ], { inlining: true });
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`bar`);
        });
        it('should not produce optional chain warning for a nullable type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: string | null = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce optional chain warning for the any type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: any; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce optional chain warning for the unknown type', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: unknown; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce optional chain warning for a type that includes undefined', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: string | undefined = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce optional chain warning when the left side is a nullable expression', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ func()?.foo }}`,
                    },
                    source: `
               export class TestCmp {
                 func = (): { foo: string } | null => null;
               }
             `,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should respect configured diagnostic category', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `{{ var1?.bar }}`,
                    },
                    source: 'export class TestCmp { var1: { foo: string } = { foo: "bar" }; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [optional_chain_not_nullable_1.factory], {
                strictNullChecks: true,
                extendedDiagnostics: {
                    checks: {
                        optionalChainNotNullable: api_1.DiagnosticCategoryLabel.Error,
                    },
                },
            });
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.OPTIONAL_CHAIN_NOT_NULLABLE));
        });
    });
});
