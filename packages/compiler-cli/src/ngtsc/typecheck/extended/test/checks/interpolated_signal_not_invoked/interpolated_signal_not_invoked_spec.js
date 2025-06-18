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
const interpolated_signal_not_invoked_1 = require("../../../checks/interpolated_signal_not_invoked");
const extended_template_checker_1 = require("../../../src/extended_template_checker");
(0, testing_1.runInEachFileSystem)(() => {
    describe('Interpolated Signal', () => {
        it('binds the error code to its extended template diagnostic name', () => {
            expect(interpolated_signal_not_invoked_1.factory.code).toBe(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED);
            expect(interpolated_signal_not_invoked_1.factory.name).toBe(diagnostics_1.ExtendedTemplateDiagnosticName.INTERPOLATED_SIGNAL_NOT_INVOKED);
        });
        it('should not produce a warning when a signal getter is invoked', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div>{{ mySignal() }}</div>`,
                    },
                    source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal(0);
          }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
    it('should produce a warning when a signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ mySignal1 }} {{ mySignal2 }}</div>`,
                },
                source: `
          import {signal, Signal} from '@angular/core';

          export class TestCmp {
            mySignal1 = signal<number>(0);
            mySignal2: Signal<number>;
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(2);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal1`);
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[1])).toBe(`mySignal2`);
    });
    it('should produce a warning when a readonly signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ count }}</div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            count = signal(0).asReadonly();
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('count');
    });
    it('should produce a warning when a computed signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ mySignal2 }}</div>`,
                },
                source: `
          import {signal, computed} from '@angular/core';

          export class TestCmp {
            mySignal1 = signal<number>(0);
            mySignal2 = computed(() => mySignal() * 2);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal2`);
    });
    it('should produce a warning when an input signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myInput }}</div>`,
                },
                source: `
          import {input} from '@angular/core';

          export class TestCmp {
            myInput = input(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`myInput`);
    });
    it('should produce a warning when a required input signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myRequiredInput }}</div>`,
                },
                source: `
          import {input} from '@angular/core';

          export class TestCmp {
            myRequiredInput = input.required(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`myRequiredInput`);
    });
    it('should produce a warning when a model signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myModel }}</div>`,
                },
                source: `
          import {model} from '@angular/core';

          export class TestCmp {
            myModel = model(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`myModel`);
    });
    it('should produce a warning when a required model signal is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myRequiredModel }}</div>`,
                },
                source: `
          import {model} from '@angular/core';

          export class TestCmp {
            myRequiredModel = model.required(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`myRequiredModel`);
    });
    it('should not produce a warning when a signal is not invoked in a banana in box binding', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div [(value)]="signal">{{ myRequiredModel }}</div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should not produce a warning when a signal is not invoked in an input binding as they are skipped', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div dir [myInput]="mySignal"></div>`,
                },
                source: `
          import {signal, input} from '@angular/core';

          export class TestDir {
            myInput = input.required();
          }
          export class TestCmp {
            mySignal = signal(0);
          }`,
                declarations: [
                    {
                        type: 'directive',
                        name: 'TestDir',
                        selector: '[dir]',
                        inputs: {
                            myInput: {
                                isSignal: true,
                                bindingPropertyName: 'myInput',
                                classPropertyName: 'myInput',
                                required: true,
                                transform: null,
                            },
                        },
                    },
                ],
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should produce a warning when a signal in a nested property read is not invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ obj.nested.prop.signal }}</div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            obj = {
              nested: {
                prop: {
                  signal: signal<number>(0)
                }
              }
            }
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`signal`);
    });
    it('should not produce a warning when model signals are invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myModel() }} - {{ myRequiredModel() }}</div>`,
                },
                source: `
          import {model} from '@angular/core';

          export class TestCmp {
            myModel = model(0);
            myRequiredModel = model.required(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should not produce a warning when a computed signal is invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ mySignal2() }}</div>`,
                },
                source: `
          import {signal, computed} from '@angular/core';

          export class TestCmp {
            mySignal1 = signal<number>(0);
            mySignal2 = computed(() => mySignal() * 2);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should not produce a warning when input signals are invoked', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ myInput() }} - {{ myRequiredInput() }}</div>`,
                },
                source: `
          import {input} from '@angular/core';

          export class TestCmp {
            myInput = input(0);
            myRequiredInput = input.required(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should produce a warning when signal is not invoked on interpolated binding', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div id="{{mySignal}}"></div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal`);
    });
    it('should not produce a warning when signal is invoked on interpolated binding', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div id="{{mySignal()}}"></div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should produce a warning when signal is invoked in attribute binding interpolation ', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div attr.id="my-{{mySignal}}-item"></div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal`);
    });
    it('should not produce a warning when signal is invoked in attribute binding interpolation ', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div attr.id="my-{{mySignal()}}-item"></div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should produce a warning when nested signal is not invoked on interpolated binding', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div id="{{myObject.myObject2.myNestedSignal}}"></div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            myObject = {myObject2: {myNestedSignal: signal<number>(0)}};
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(1);
        expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
        expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
        expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`myNestedSignal`);
    });
    [
        ['dom property', 'id'],
        ['class', 'class.green'],
        ['style', 'style.width'],
        ['attribute', 'attr.role'],
        ['animation', '@triggerName'],
    ].forEach(([name, binding]) => {
        it(`should produce a warning when signal isn't invoked on ${name} binding`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [${binding}]="mySignal"></div>`,
                    },
                    source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal`);
        });
        it(`should not produce a warning when signal is invoked on ${name} binding`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div [${binding}]="mySignal()"></div>`,
                    },
                    source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal<number>(0);
          }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
    it('should not produce a warning with other Signal type', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ mySignal }} {{ mySignal2 }}</div>`,
                },
                source: `
          import {signal} from '@not-angular/core';

          export class TestCmp {
            mySignal = signal(0);
            mySignal2 = signal(2);
          }`,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    it('should not produce a warning with other Signal type', () => {
        const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
        const { program, templateTypeChecker } = (0, testing_3.setup)([
            {
                fileName,
                templates: {
                    'TestCmp': `<div>{{ foo(mySignal) }} </div>`,
                },
                source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            mySignal = signal(0);

            foo(signal: Signal) {
              return 'foo'
            }
          }
          `,
            },
        ]);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = (0, testing_3.getClass)(sf, 'TestCmp');
        const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {} /* options */);
        const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
        expect(diags.length).toBe(0);
    });
    ['name', 'length', 'prototype', 'set', 'update', 'asReadonly'].forEach((functionInstanceProperty) => {
        it(`should produce a warning when a property named '${functionInstanceProperty}' of a not invoked signal is used in interpolation`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div>{{myObject.mySignal.${functionInstanceProperty}}}</div>`,
                    },
                    source: `
          import {signal} from '@angular/core';

          export class TestCmp {
            myObject = { mySignal: signal<{ ${functionInstanceProperty}: string }>({ ${functionInstanceProperty}: 'foo' }) };
          }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe(`mySignal`);
        });
        it(`should not produce a warning when a property named ${functionInstanceProperty} of an invoked signal is used in interpolation`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div>{{mySignal().${functionInstanceProperty}}}</div>`,
                    },
                    source: `
            import {signal} from '@angular/core';

            export class TestCmp {
              mySignal = signal<{ ${functionInstanceProperty}: string }>({ ${functionInstanceProperty}: 'foo' });
            }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
        it(`should not produce a warning when a property named ${functionInstanceProperty} of an object is used in interpolation`, () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {
                        'TestCmp': `<div>{{myObject.${functionInstanceProperty}}}</div>`,
                    },
                    source: `
            import {signal} from '@angular/core';

            export class TestCmp {
              myObject = { ${functionInstanceProperty}: 'foo' };
            }`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            const component = (0, testing_3.getClass)(sf, 'TestCmp');
            const extendedTemplateChecker = new extended_template_checker_1.ExtendedTemplateCheckerImpl(templateTypeChecker, program.getTypeChecker(), [interpolated_signal_not_invoked_1.factory], {});
            const diags = extendedTemplateChecker.getDiagnosticsForComponent(component);
            expect(diags.length).toBe(0);
        });
    });
});
