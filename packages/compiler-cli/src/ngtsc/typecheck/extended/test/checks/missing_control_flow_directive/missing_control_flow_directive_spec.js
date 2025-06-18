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
const missing_control_flow_directive_1 = require("../../../checks/missing_control_flow_directive");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('MissingControlFlowDirectiveCheck', () => {
        missing_control_flow_directive_1.KNOWN_CONTROL_FLOW_DIRECTIVES.forEach((correspondingImport, directive) => {
            ['div', 'ng-template', 'ng-container', 'ng-content'].forEach((element) => {
                it(`should produce a warning when the '${directive}' directive is not imported ` +
                    `(when used on the '${element}' element)`, () => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const { program, templateTypeChecker } = (0, testing_3.setup)([
                        {
                            fileName,
                            templates: {
                                'TestCmp': `<${element} *${directive}="exp"></${element}>`,
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
                    const component = (0, testing_3.getClass)(sf, 'TestCmp');
                    const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_control_flow_directive_1.factory], {} /* options */);
                    const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
                    expect(diags.length).toBe(1);
                    expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
                    expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.MISSING_CONTROL_FLOW_DIRECTIVE));
                    expect(diags[0].messageText).toContain(`The \`*${directive}\` directive was used`);
                    expect(diags[0].messageText).toContain(`neither the \`${correspondingImport.directive}\` directive nor the \`CommonModule\` was imported. `);
                    expect(diags[0].messageText).toContain(`Use Angular's built-in control flow ${correspondingImport === null || correspondingImport === void 0 ? void 0 : correspondingImport.builtIn}`);
                    expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(directive);
                });
                it(`should *not* produce a warning when the '${directive}' directive is not imported ` +
                    `into a non-standalone component scope (when used on the '${element}' element)`, () => {
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const { program, templateTypeChecker } = (0, testing_3.setup)([
                        {
                            fileName,
                            templates: {
                                'TestCmp': `<${element} *${directive}="exp"></${element}>`,
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
                    const component = (0, testing_3.getClass)(sf, 'TestCmp');
                    const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_control_flow_directive_1.factory], {} /* options */);
                    const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
                    // No diagnostic messages are expected.
                    expect(diags.length).toBe(0);
                });
                it(`should *not* produce a warning when the '${directive}' directive is imported ` +
                    `(when used on the '${element}' element)`, () => {
                    const className = directive.charAt(0).toUpperCase() + directive.substr(1);
                    const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                    const { program, templateTypeChecker } = (0, testing_3.setup)([
                        {
                            fileName,
                            templates: {
                                'TestCmp': `<${element} *${directive}="exp"></${element}>`,
                            },
                            source: `
                export class TestCmp {}
                export class ${className} {}
              `,
                            declarations: [
                                {
                                    type: 'directive',
                                    name: className,
                                    selector: `[${directive}]`,
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
                    const component = (0, testing_3.getClass)(sf, 'TestCmp');
                    const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_control_flow_directive_1.factory], { strictNullChecks: true } /* options */);
                    const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
                    // No diagnostic messages are expected.
                    expect(diags.length).toBe(0);
                });
            });
        });
        it(`should *not* produce a warning for other missing structural directives`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
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
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [missing_control_flow_directive_1.factory], { strictNullChecks: true } /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            // No diagnostic messages are expected.
            expect(diags.length).toBe(0);
        });
    });
});
