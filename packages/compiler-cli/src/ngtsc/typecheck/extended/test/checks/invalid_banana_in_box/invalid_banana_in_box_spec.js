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
const api_1 = require("../../../../../core/api");
const diagnostics_1 = require("../../../../../diagnostics");
const file_system_1 = require("../../../../../file_system");
const testing_1 = require("../../../../../file_system/testing");
const testing_2 = require("../../../../../testing");
const testing_3 = require("../../../../testing");
const index_1 = require("../../../checks/invalid_banana_in_box/index");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TemplateChecks', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(index_1.factory.code).toBe(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX);
            expect(index_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.INVALID_BANANA_IN_BOX);
        });
        it('should produce invalid banana in a box warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<div ([notARealThing])="var1"> </div>',
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('([notARealThing])="var1"');
        });
        it('should not produce invalid banana in a box warning if written correctly', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<div [(notARealThing)]="var1"> </div>',
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce invalid banana in a box warning with bracket in the middle of the name', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<div (not[AReal]Thing)="var1"> </div>',
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should produce invalid banana in a box warnings for *ngIf and ng-template', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div>
             <div *ngIf="false" ([notARealThing])="var1"> </div>
             <ng-template #elseBlock ([notARealThing2])="var1">Content to render when condition is false.</ng-template>
           </div>`,
                    },
                    source: `export class TestCmp {
           var1: string = "text";
         }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(2);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('([notARealThing])="var1"');
            expect(diags[1].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[1].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[1])).toBe('([notARealThing2])="var1"');
        });
        it('should respect configured category', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<div ([notARealThing])="var1"> </div>',
                    },
                    source: 'export class TestCmp { var1: string = "text"; }',
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], { extendedDiagnostics: { checks: { invalidBananaInBox: api_1.DiagnosticCategoryLabel.Error } } });
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Error);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
        });
    });
});
