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
const index_1 = require("../../../checks/missing_ngforof_let/index");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TemplateChecks', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(index_1.factory.code).toBe(diagnostics_1.ErrorCode.MISSING_NGFOROF_LET);
            expect(index_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.MISSING_NGFOROF_LET);
        });
        it('should produce missing ngforof let warning', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<ul><li *ngFor="thing of items">{{thing["name"]}}</li></ul>',
                    },
                    source: "export class TestCmp { items: [] = [{'name': 'diana'}, {'name': 'prince'}] }",
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.MISSING_NGFOROF_LET));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('ngFor="thing ');
        });
        it('should not produce missing ngforof let warning if written correctly', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<ul><li *ngFor="let item of items">{{item["name"]}};</li></ul>',
                    },
                    source: "export class TestCmp { items: [] = [{'name': 'diana'}, {'name': 'prince'}] }",
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it('should not produce missing ngforof let warning if written correctly in longhand', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': '<ng-template ngFor let-item [ngForOf]="items">{{item["name"]}}</ng-template>',
                    },
                    source: "export class TestCmp { items: [] = [{'name': 'diana'}, {'name': 'prince'}] }",
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [index_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
});
