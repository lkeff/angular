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
const testing_2 = require("../../../../testing");
const missing_structural_directive_1 = require("../../../checks/missing_structural_directive");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
const api_1 = require("../../../../api");
(0, testing_1.runInEachFileSystem)(() => {
    describe('missingStructuralDirectiveCheck', () => {
        it('should produce a warning for missing unknown structural directives in standalone components', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.MISSING_STRUCTURAL_DIRECTIVE));
        });
        it('should produce a warning if ngTemplateOutlet is used without importing the directive', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<ng-container *ngTemplateOutlet="svk; context: myContext"></ng-container>
                        <ng-template #svk let-person="localSk"><span>Ahoj {{ person }}!</span></ng-template>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.MISSING_STRUCTURAL_DIRECTIVE));
        });
        it('should *not* produce a warning for custom structural directives that are imported when there is a non-exported class', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                        'BarCmp': '',
                    },
                    source: `
          class BarCmp{}

          export class TestCmp {}
          export class Foo {}

        `,
                    declarations: [
                        {
                            type: 'directive',
                            name: 'Foo',
                            selector: `[foo]`,
                        },
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                        {
                            name: 'BarCmp',
                            type: 'directive',
                            selector: `[bar-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should *not* produce a warning for custom structural directives that are imported', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                    },
                    source: `
          export class TestCmp {}
          export class Foo {}
        `,
                    declarations: [
                        {
                            type: 'directive',
                            name: 'Foo',
                            selector: `[foo]`,
                        },
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should *not* produce a warning for non-standalone components', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *foo="exp"></div>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: false,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should *not* produce a warning for non-structural directives in standalone components', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [foo]="exp"></div>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should *not* produce a warning when known control flow directives are used', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div *ngIf="exp as value">
                          <li *ngFor="let item of items; index as i; trackBy: trackByFn">
                            {{ item.name }}
                          </li>
                          <container-element [ngSwitch]="switch_exp">
                            <div *ngSwitchCase="match_exp"></div>
                            <div *ngSwitchDefault></div>
                          </container-element>
                        </div>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should *not* produce a warning for templates with no structural directives', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_2.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div></div>`,
                    },
                    declarations: [
                        {
                            name: 'TestCmp',
                            type: 'directive',
                            selector: `[test-cmp]`,
                            isStandalone: true,
                        },
                    ],
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_2.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_structural_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
        it('should trigger diagnostic for nested component in function', () => {
            // This test is more complex as we're testing the diagnostic against a component
            // that can't be referenced because it's nested in a function.
            const { compiler, sourceFile } = (0, testing_2.createNgCompilerForFile)(`import {Component, Directive} from '@angular/core';

          @Directive({ selector: '[foo]' })
          export class FooDir {}

          export function foo() {
            @Component({
              imports: [FooDir],
              template: '<div *foo></div>',
            })
            class MyCmp {}
          }`);
            const diags = compiler.getDiagnosticsForFile(sourceFile, api_1.OptimizeFor.SingleFile);
            // Note sure why we get this diagnostic
            // It is still raised if we pass `lib: ['dom']` to the compiler options
            expect(diags.length).toBe(1);
            expect(diags[0].messageText).toContain(`Cannot find name 'document'. Do you need to change your target library? `);
            // What matters is that we don't get the missing structural directive diagnostic.
        });
    });
});
